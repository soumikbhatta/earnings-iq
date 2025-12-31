import { Queue } from 'bullmq'
import { connection } from './connection'

/**
 * The main queue for processing earnings transcripts
 */
export const earningsQueue = new Queue('earnings-queue', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: {
            count: 100, // Keep last 100 completed jobs
        },
        removeOnFail: {
            count: 1000,
        },
    },
})
