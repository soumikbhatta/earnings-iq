import { Worker, Job } from 'bullmq'
import { connection } from '../lib/queue/connection'
import { TranscriptJobData, AnalysisResult } from '../lib/queue/jobs'

/**
 * Process a single earnings transcript job
 */
async function processEarningsJob(job: Job<TranscriptJobData, AnalysisResult>) {
    console.log(`[Job ${job.id}] Starting processing for ${job.data.ticker}...`)

    // Update progress
    await job.updateProgress(10)

    try {
        // Simulate processing steps
        console.log(`[Job ${job.id}] Fetching transcript...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await job.updateProgress(30)

        console.log(`[Job ${job.id}] Running LangGraph agents...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        await job.updateProgress(70)

        console.log(`[Job ${job.id}] Storing results in vector DB...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await job.updateProgress(100)

        // Return dummy result
        return {
            sentiment: {
                score: 0.85,
                label: 'positive',
            },
            confidence: 0.92,
            keyPoints: [
                'Revenue beat expectations by 5%',
                'Guidance raised for next fiscal year',
                'CEO emphasized AI adoption'
            ],
            prediction: 'beat'
        } as AnalysisResult

    } catch (error) {
        console.error(`[Job ${job.id}] Failed:`, error)
        throw error
    }
}

// Create the worker instance
const worker = new Worker<TranscriptJobData, AnalysisResult>(
    'earnings-queue',
    processEarningsJob,
    {
        connection,
        concurrency: 5, // Process 5 jobs concurrently
        limiter: {
            max: 10,
            duration: 1000,
        },
    }
)

// Event listeners for logging
worker.on('active', (job) => {
    console.log(`[Worker] Job ${job.id} active! processing ${job.data.ticker}`)
})

worker.on('completed', (job, returnValue) => {
    console.log(`[Worker] Job ${job.id} completed! Sentiment: ${returnValue.sentiment.label}`)
})

worker.on('failed', (job, error) => {
    console.error(`[Worker] Job ${job?.id} failed: ${error.message}`)
})

console.log('[Worker] Earnings Worker Started 🚀 Listening for jobs...')
