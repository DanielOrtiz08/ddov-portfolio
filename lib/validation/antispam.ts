import { ContactFormData } from '@/lib/types/contact';
import { NextRequest } from 'next/server';
import { getRedis } from '@/lib/utils/redis';

type ValidatorResult =
  | { ok: true }
  | { ok: false; status: number; error: string; retryAfter?: number };

// Fallback in-memory stores (used when Redis isn't configured)
const ipWindowMap: Map<string, number[]> = new Map();
const emailWindowMap: Map<string, number[]> = new Map();
const lastMessageMap: Map<string, { text: string; ts: number; count: number }> = new Map();
const blockedUntilMap: Map<string, number> = new Map();
const violationMap: Map<string, { count: number; ts: number }> = new Map();

// Configuration
const WINDOW_MS = Number(process.env.ANTISPAM_WINDOW_MS || 60_000); // 60 seconds
const MAX_PER_WINDOW = Number(process.env.ANTISPAM_MAX_PER_WINDOW || 3);
const REPEAT_WINDOW_MS = Number(process.env.ANTISPAM_REPEAT_MS || 10_000);
const BLOCK_MS = Number(process.env.ANTISPAM_BLOCK_MS || 15 * 60_000);
const BLOCK_AFTER_VIOLATIONS = Number(process.env.ANTISPAM_BLOCK_AFTER_VIOLATIONS || 2);

const bannedWords = (process.env.ANTISPAM_PROFANITY || `
hp,hpta,hijueputa,jueputa,gonorrea,gono,marica,marico,mrk,mka,mk,malparido,malparida,careverga,carechimba,caremonda,chimba,verga,monda,culo,culero,culera,pene,pinga,vagina,chucha, teta,tetas,puta,puto,putos,perra,zorra,mierda,mierdero,joder,jodete,cabron,cabrón,idiota,imbecil,imbécil,estupido,estúpido,pendejo,pendeja,mamaguevo,sapoperro,cacorro,huevon,huevón,guevon,guevón,coño,carajo,ojete,mamón,mamon,culiao,culiada,culiado,pelotudo,pelotuda,tarado,tarada,retrasado,retrasada,
fuck,fucking,fucker,motherfucker,mf,wtf,shit,bullshit,ass,asshole,bitch,bastard,dick,cock,penis,vagina,pussy,cunt,whore,slut,hoe,damn,goddamn,jackass,moron,idiot,stupid,retard,retarded,loser,jerk,prick,twat,douche,douchebag,nigger,nigga,fag,faggot,gaylord,suck,sucker,screwyou,
bitcoin,crypto,forex,casino,bet,betting,gambling,lottery,jackpot,winner,earnmoney,makemoney,passiveincome,investment,investnow,freecash,freemoney,airdrop,clickhere,buyfollowers,followers,likes,promotion,marketingservice,seoagency,seoservice,backlinks,traffic,telegramgroup,whatsappgroup,discountcode,coupon,giftcard,loan,creditrepair,easyloan,workfromhome,earnfromhome,guaranteedincome,quickcash,100profit,limitedoffer,actnow,urgentoffer,
fck,fvck,phuck,sh1t,b1tch,a55hole,d1ck,p0rn,pr0n,n1gga,hpta,hpt4,gon0rrea,m4rica,put4,cul0,m13rda,idi0ta,imb3cil,p3ndejo
`)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/4/g, 'a')
    .replace(/3/g, 'e')
    .replace(/1/g, 'i')
    .replace(/0/g, 'o')
    .replace(/\s+/g, ' ');
}

function containsBadWords(text: string) {
  const normalized = normalizeText(text);
  return bannedWords.some((word) => {
    if (!word) return false;
    return normalized.includes(word);
  });
}

function now() {
  return Date.now();
}

function getClientKey(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  const ip = xff ? xff.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
  const ua = req.headers.get('user-agent') || 'ua-unknown';
  return `${ip}::${ua.substring(0, 64)}`;
}

function pruneWindow(arr: number[], cutoff: number) {
  while (arr.length && arr[0] < cutoff) arr.shift();
}

function retryAfterSeconds(milliseconds: number) {
  return Math.max(1, Math.ceil(milliseconds / 1000));
}

function blockMessage(retryAfter: number) {
  return `Demasiados intentos. El envío queda bloqueado temporalmente; intenta de nuevo en ${retryAfter} segundos.`;
}

function getMemoryBlock(scope: string): ValidatorResult | null {
  const blockedUntil = blockedUntilMap.get(scope);
  if (!blockedUntil) return null;

  const remaining = blockedUntil - now();
  if (remaining <= 0) {
    blockedUntilMap.delete(scope);
    return null;
  }

  const retryAfter = retryAfterSeconds(remaining);
  return { ok: false, status: 429, error: blockMessage(retryAfter), retryAfter };
}

function recordMemoryViolation(scope: string): ValidatorResult {
  const ts = now();
  const current = violationMap.get(scope);
  const nextCount = current && ts - current.ts < BLOCK_MS ? current.count + 1 : 1;
  violationMap.set(scope, { count: nextCount, ts });

  if (nextCount >= BLOCK_AFTER_VIOLATIONS) {
    blockedUntilMap.set(scope, ts + BLOCK_MS);
    const retryAfter = retryAfterSeconds(BLOCK_MS);
    return { ok: false, status: 429, error: blockMessage(retryAfter), retryAfter };
  }

  const retryAfter = retryAfterSeconds(WINDOW_MS);
  return { ok: false, status: 429, error: 'Demasiadas solicitudes. Intenta más tarde.', retryAfter };
}

async function getRedisBlock(redis: Awaited<ReturnType<typeof getRedis>>, scope: string): Promise<ValidatorResult | null> {
  if (!redis) return null;

  const blockedKey = `antispam:block:${scope}`;
  const ttl = await redis.pttl(blockedKey);
  if (ttl > 0) {
    const retryAfter = retryAfterSeconds(ttl);
    return { ok: false, status: 429, error: blockMessage(retryAfter), retryAfter };
  }

  return null;
}

async function recordRedisViolation(redis: Awaited<ReturnType<typeof getRedis>>, scope: string): Promise<ValidatorResult> {
  if (!redis) return recordMemoryViolation(scope);

  const violationKey = `antispam:violations:${scope}`;
  const blockedKey = `antispam:block:${scope}`;
  const violations = await redis.incr(violationKey);
  await redis.pexpire(violationKey, BLOCK_MS);

  if (violations >= BLOCK_AFTER_VIOLATIONS) {
    await redis.set(blockedKey, '1', 'PX', BLOCK_MS);
    const retryAfter = retryAfterSeconds(BLOCK_MS);
    return { ok: false, status: 429, error: blockMessage(retryAfter), retryAfter };
  }

  const retryAfter = retryAfterSeconds(WINDOW_MS);
  return { ok: false, status: 429, error: 'Demasiadas solicitudes. Intenta más tarde.', retryAfter };
}

export async function validateAntiSpam(data: ContactFormData, req: NextRequest): Promise<ValidatorResult> {
  try {
    const ts = now();
    const cutoff = ts - WINDOW_MS;
    const clientKey = getClientKey(req);
    const ip = clientKey.split('::')[0];
    const emailKey = (data.email || '').toLowerCase();

    // Redis is used only when REDIS_URL is configured and connection succeeds.
    // If Redis is unavailable, the code falls back safely to in-memory anti-spam.
    const redis = await getRedis();
    if (redis) {
      try {
          const ipBlock = await getRedisBlock(redis, `ip:${ip}`);
          if (ipBlock) return ipBlock;

          if (emailKey) {
            const emailBlock = await getRedisBlock(redis, `email:${emailKey}`);
            if (emailBlock) return emailBlock;
          }

          // Redis-backed implementation (production-ready)
          const ipKey = `antispam:ip:${ip}`;
          const member = `${ts}-${Math.random().toString(36).slice(2, 8)}`;
          await redis.zremrangebyscore(ipKey, 0, cutoff);
          await redis.zadd(ipKey, ts.toString(), member);
          await redis.expire(ipKey, Math.ceil(WINDOW_MS / 1000) + 5);
          const ipCount = await redis.zcard(ipKey);
          if (ipCount > MAX_PER_WINDOW) {
            return recordRedisViolation(redis, `ip:${ip}`);
          }

          if (emailKey) {
            const eKey = `antispam:email:${emailKey}`;
            const eMember = `${ts}-${Math.random().toString(36).slice(2, 8)}`;
            await redis.zremrangebyscore(eKey, 0, cutoff);
            await redis.zadd(eKey, ts.toString(), eMember);
            await redis.expire(eKey, Math.ceil(WINDOW_MS / 1000) + 5);
            const eCount = await redis.zcard(eKey);
            if (eCount > MAX_PER_WINDOW) {
              return recordRedisViolation(redis, `email:${emailKey}`);
            }
          }

          // Basic message checks (length / words)
          const text = (data.message || '').trim();
          if (text.length < 10) {
            return { ok: false, status: 400, error: 'El mensaje es muy corto. Por favor describe tu solicitud con más detalle.' };
          }
          const words = text.split(/\s+/).filter(Boolean);
          if (words.length < 3) {
            return { ok: false, status: 400, error: 'El mensaje parece incompleto. Escribe al menos 3 palabras.' };
          }

          if (containsBadWords(text)) {
            return { ok: false, status: 400, error: 'El mensaje contiene lenguaje inapropiado.' };
          }

          const letters = (text.match(/[a-zA-ZáéíóúüñÑ]/g) || []).length;
          const ratio = letters / Math.max(1, text.length);
          if (ratio < 0.4) {
            return { ok: false, status: 400, error: 'El mensaje no parece tener contenido legible.' };
          }

          // Repeated identical messages detection using a small JSON value
          const lastKey = `antispam:last:${clientKey}`;
          const lastRaw = await redis.get(lastKey);
          if (lastRaw) {
            try {
              const last = JSON.parse(lastRaw) as { text: string; ts: number; count: number };
              if (last.text === text && ts - last.ts < REPEAT_WINDOW_MS) {
                last.count = (last.count || 1) + 1;
                last.ts = ts;
                await redis.set(lastKey, JSON.stringify(last), 'PX', REPEAT_WINDOW_MS * 3);
                if (last.count > 2) {
                  return { ok: false, status: 429, error: 'Detectado envío repetido de mensajes. Espera un momento.' };
                }
              } else {
                await redis.set(lastKey, JSON.stringify({ text, ts, count: 1 }), 'PX', REPEAT_WINDOW_MS * 3);
              }
            } catch (e) {
              await redis.set(lastKey, JSON.stringify({ text, ts, count: 1 }), 'PX', REPEAT_WINDOW_MS * 3);
            }
          } else {
            await redis.set(lastKey, JSON.stringify({ text, ts, count: 1 }), 'PX', REPEAT_WINDOW_MS * 3);
          }

          return { ok: true };
        } catch (redisError) {
          console.warn('Redis anti-spam fallback due to error:', redisError && redisError instanceof Error ? redisError.message : String(redisError));
        }
    }

    // Fallback: in-memory (development)
    const ipBlock = getMemoryBlock(`ip:${ip}`);
    if (ipBlock) return ipBlock;

    if (emailKey) {
      const emailBlock = getMemoryBlock(`email:${emailKey}`);
      if (emailBlock) return emailBlock;
    }

    // Track by IP
    const ipArr = ipWindowMap.get(ip) || [];
    pruneWindow(ipArr, cutoff);
    if (ipArr.length >= MAX_PER_WINDOW) {
      return recordMemoryViolation(`ip:${ip}`);
    }
    ipArr.push(ts);
    ipWindowMap.set(ip, ipArr);

    // Track by email (if provided)
    if (emailKey) {
      const eArr = emailWindowMap.get(emailKey) || [];
      pruneWindow(eArr, cutoff);
      if (eArr.length >= MAX_PER_WINDOW) {
        return recordMemoryViolation(`email:${emailKey}`);
      }
      eArr.push(ts);
      emailWindowMap.set(emailKey, eArr);
    }

    // Reject very short or meaningless messages
    const text = (data.message || '').trim();
    if (text.length < 10) {
      return { ok: false, status: 400, error: 'El mensaje es muy corto. Por favor describe tu solicitud con más detalle.' };
    }
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      return { ok: false, status: 400, error: 'El mensaje parece incompleto. Escribe al menos 3 palabras.' };
    }

    // Basic profanity check
    if (containsBadWords(text)) {
      return { ok: false, status: 400, error: 'El mensaje contiene lenguaje inapropiado.' };
    }

    // Simple meaningfulness heuristic: fraction of letters
    const letters = (text.match(/[a-zA-ZáéíóúüñÑ]/g) || []).length;
    const ratio = letters / Math.max(1, text.length);
    if (ratio < 0.4) {
      return { ok: false, status: 400, error: 'El mensaje no parece tener contenido legible.' };
    }

    // Detect repeated identical messages from same client
    const last = lastMessageMap.get(clientKey);
    if (last) {
      if (last.text === text && ts - last.ts < REPEAT_WINDOW_MS) {
        last.count += 1;
        last.ts = ts;
        lastMessageMap.set(clientKey, last);
        if (last.count > 2) {
          return { ok: false, status: 429, error: 'Detectado envío repetido de mensajes. Espera un momento.' };
        }
      } else {
        lastMessageMap.set(clientKey, { text, ts, count: 1 });
      }
    } else {
      lastMessageMap.set(clientKey, { text, ts, count: 1 });
    }

    return { ok: true };
  } catch (err) {
    console.error('validateAntiSpam error', err);
    return { ok: true };
  }
}
