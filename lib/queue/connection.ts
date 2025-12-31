import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

// Create a Redis connection
// We use maxRetriesPerRequest: null as required by BullMQ
export const connection = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
})
