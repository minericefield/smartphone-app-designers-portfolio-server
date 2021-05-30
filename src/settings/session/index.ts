// use redis only for session

import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import redis from 'redis';

export default () => {
  const RedisStore = connectRedis(expressSession);
  const redisClient = redis.createClient(6379, process.env.REDIS_HOST, {
    prefix: process.env.REDIS_PREFIX,
  });

  return expressSession({
    secret: process.env.SESSION_SECRET,
    name: 'sessionId',
    cookie: {
      maxAge: 24 * 60 * 60 * 100 * 100,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient,
    }),
  });
};
