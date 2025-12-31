import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { Worker, Job } from 'bullmq'
import { connection } from '../lib/queue/connection'
import { TranscriptJobData, AnalysisResult } from '../lib/queue/jobs'
import { AgentState } from '../src/agents/schemas'

console.log('[Worker] Starting up...')

// Lazy load graph to ensure dotenv loads first and avoid top-level await issues in CJS
let earningsGraph: any = null

async function getEarningsGraph() {
    if (earningsGraph) return earningsGraph
    // Dynamic import
    const mod = await import('../src/agents/graph')
    earningsGraph = mod.earningsGraph
    console.log('[Worker] Agent Graph loaded successfully.')
    return earningsGraph
}

/**
 * Process a single earnings transcript job
 */
async function processEarningsJob(job: Job<TranscriptJobData, AnalysisResult>) {
    console.log(`[Job ${job.id}] Starting processing for ${job.data.ticker}...`)

    // Update progress
    await job.updateProgress(10)

    try {
        // Ensure graph is loaded
        const graph = await getEarningsGraph()

        // Simulate fetching transcript (mock data for now)
        const mockTranscript = `
      Operator: Good day and welcome to the ${job.data.ticker} Q4 2024 Earnings Call.
      CEO: We are thrilled to report record revenue of $50B, up 20% YoY. 
           However, we see some headwinds in the APAC region.
           Our EPS came in at $3.50, beating expectations of $3.20.
           We are raising guidance for next fiscal year to $55B-$60B.
      Analyst: Can you speak to the margins?
      CFO: Margins expanded by 200 basis points due to operational efficiencies.
      CEO: AI adoption is accelerating faster than anticipated.
    `

        console.log(`[Job ${job.id}] Running LangGraph agents...`)
        await job.updateProgress(30)

        // Invoke the agent graph
        // Cast to AgentState
        const resultState = await graph.invoke({
            ticker: job.data.ticker,
            transcript: mockTranscript
        } as any) as unknown as AgentState

        console.log(`[Job ${job.id}] Graph execution complete.`)
        await job.updateProgress(90)

        // Map sentiment label from Agent schema
        let sentimentLabel: 'positive' | 'negative' | 'neutral' = 'neutral'
        const agentSentiment = resultState.sentiment?.sentiment
        if (agentSentiment === 'bullish') sentimentLabel = 'positive'
        if (agentSentiment === 'bearish') sentimentLabel = 'negative'

        // Map graph state to AnalysisResult
        const analysisResult: AnalysisResult = {
            sentiment: {
                score: resultState.sentiment?.confidence || 0,
                label: sentimentLabel,
            },
            confidence: resultState.prediction?.confidence || 0,
            keyPoints: [
                `Revenue: ${resultState.metrics?.revenue}`,
                `Earnings: ${resultState.metrics?.earnings}`,
                `Guidance: ${resultState.metrics?.guidance}`,
                `Prediction: ${resultState.prediction?.direction?.toUpperCase()}`,
                ...(resultState.prediction?.keyFactors || [])
            ],
            prediction: resultState.prediction?.direction === 'up' ? 'beat' :
                resultState.prediction?.direction === 'down' ? 'miss' : 'inline'
        }

        // Save final result
        await job.updateProgress(100)
        return analysisResult

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
