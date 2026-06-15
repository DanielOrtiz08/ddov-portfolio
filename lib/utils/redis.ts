import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedis() {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) return null;

  // Use lazyConnect and limit retries to avoid noisy ETIMEDOUT logs
  client = new Redis(url, {
    lazyConnect: true,
    connectTimeout: 10000,
    maxRetriesPerRequest: 1,
    // disable aggressive retry strategy
    retryStrategy: () => {
      return null;
    },
  });

  client.on('error', (err) => {
    console.error('Redis error', err);
  });

  // Try to connect once (non-blocking). Failures will be non-fatal.
  client.connect().catch((err) => {
    console.warn('Redis connect failed (non-fatal):', err && err.message ? err.message : err);
  });

  return client;
}
