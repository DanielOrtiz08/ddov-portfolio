import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedis() {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  client = new Redis(url);
  client.on('error', (err) => {
    console.error('Redis error', err);
  });
  return client;
}
