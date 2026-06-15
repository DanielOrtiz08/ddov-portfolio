import Redis from 'ioredis';

let client: Redis | null = null;

export async function getRedis() {
  const status = client?.status as string | undefined;
  if (status === 'ready') return client;
  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn('REDIS_URL not configured; falling back to in-memory anti-spam.');
    return null;
  }

  if (client && status !== 'ready') {
    try {
      await client.quit();
    } catch {
      client.disconnect();
    }
    client = null;
  }

  client = new Redis(url, {
    lazyConnect: true,
    connectTimeout: 10000,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
  });

  client.on('error', (err) => {
    console.error('Redis error', err);
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.warn('Redis connect failed (non-fatal):', err && err instanceof Error ? err.message : String(err));
    try {
      await client.quit();
    } catch {
      client?.disconnect();
    }
    client = null;
    return null;
  }
}
