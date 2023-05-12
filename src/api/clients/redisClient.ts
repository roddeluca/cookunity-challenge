import { createClient } from 'redis'

const url = process.env.REDIS_URL;

const redisClient = createClient({ url });
export default redisClient;