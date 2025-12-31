import { earningsQueue } from '../lib/queue/queues'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkJob() {
    const jobId = '5'
    console.log(`Checking status for Job ${jobId}...`)

    const job = await earningsQueue.getJob(jobId)

    if (!job) {
        console.log('❌ Job not found!')
        process.exit(1)
    }

    const state = await job.getState()
    console.log(`Job State: ${state}`)

    if (state === 'completed') {
        const result = job.returnvalue
        console.log('\n✅ Job Completed Successfully!')
        console.log('Result:', JSON.stringify(result, null, 2))
    } else if (state === 'failed') {
        console.log('\n❌ Job Failed!')
        console.log('Reason:', job.failedReason)
        console.log('Stack:', job.stacktrace)
    } else {
        console.log(`\n⏳ Job is ${state}...`)
        console.log('Progress:', job.progress)
    }

    process.exit(0)
}

checkJob()
