export default () => {
  const explicitUri = process.env.MONGO_URI ?? process.env.MONGO_URL ?? process.env.MONGODB_URI;

  if (explicitUri) {
    return {
      mongoUri: explicitUri,
      redisHost: process.env.REDIS_HOST ?? 'localhost',
      redisPort: Number(process.env.REDIS_PORT ?? 6379),
      throttle: {
        ttl: Number(process.env.THROTTLE_TTL ?? 60),
        limit: Number(process.env.THROTTLE_LIMIT ?? 10),
      },
    };
  }

  const user = process.env.MONGO_INITDB_ROOT_USERNAME;
  const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const database = process.env.MONGO_INITDB_DATABASE ?? process.env.MONGO_DB ?? 'pow_mvp';
  const host = process.env.MONGO_HOST ?? process.env.MONGO_HOSTNAME ?? 'localhost';
  const port = process.env.MONGO_PORT ?? '27017';

  const authPart = user && pass ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : '';
  const authQuery = user && pass ? '?authSource=admin' : '';
  const mongoUri = `mongodb://${authPart}${host}:${port}/${database}${authQuery}`;

  return {
    mongoUri,
    redisHost: process.env.REDIS_HOST ?? 'localhost',
    redisPort: Number(process.env.REDIS_PORT ?? 6379),
    throttle: {
      ttl: Number(process.env.THROTTLE_TTL ?? 60),
      limit: Number(process.env.THROTTLE_LIMIT ?? 10),
    },
  };
};
