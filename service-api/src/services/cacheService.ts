import redisClient from '../config/redis';

export const getCache = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : null);
    });
  });
};

export const setCache = (key: string, value: any, ttl: number) => {
  redisClient.set(key, JSON.stringify(value), 'EX', ttl);
};
