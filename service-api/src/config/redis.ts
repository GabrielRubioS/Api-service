import Redis from 'ioredis';

const redisClient = new Redis({
    host: '127.0.0.1', // Dirección IP de tu servidor Redis
    port: 6379,        // Puerto de tu servidor Redis
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

export default redisClient;
