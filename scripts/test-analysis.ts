import { earningsQueue } from '../lib/queue/queues'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function main() {
    console.log('🚀 Triggering test analysis job...')

    try {
        const job = await earningsQueue.add('analyze-transcript', {
            ticker: 'AAPL',
            quarter: 'Q4',
            year: 2024
        })

        console.log(`✅ Job enqueued successfully!`)
        console.log(`   Job ID: ${job.id}`)
        console.log(`   Ticker: AAPL`)
        console.log(`\nMonitor the worker logs to see the agents in action.`)

        process.exit(0)
    } catch (error) {
        console.error('❌ Failed to enqueue job:', error)
        process.exit(1)
    }
}

main()
