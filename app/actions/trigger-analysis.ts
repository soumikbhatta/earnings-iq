'use server'

import { earningsQueue } from '@/lib/queue/queues'
import { supabase } from '@/lib/supabase'

export async function triggerAnalysis(ticker: string) {
    if (!ticker) {
        return { success: false, error: 'Ticker is required' }
    }

    try {
        const capsTicker = ticker.toUpperCase()

        // 1. Add job to BullMQ
        const job = await earningsQueue.add('analyze-transcript', {
            ticker: capsTicker,
            quarter: 'Q4', // Placeholder defaults
            year: 2024
        })

        console.log(`[Server Action] Enqueued job ${job.id} for ${capsTicker}`)

        // 2. Create record in Supabase (optional, for persistence tracking outside queue)
        // Note: ensure 'analysis_jobs' table exists in Supabase
        const { error: dbError } = await supabase
            .from('analysis_jobs')
            .insert({
                signal_id: job.id, // Using job ID as signal ID for now
                workflow_id: job.id,
                status: 'pending',
                progress: 0
            })

        // Handle DB error - job is still enqueued, but tracking record failed
        if (dbError) {
            console.warn('[Server Action] Failed to save to DB (table might be missing):', dbError.message)
            return {
                success: true,
                jobId: job.id,
                message: `Analysis started for ${capsTicker}`,
                warning: `Job enqueued but database tracking failed: ${dbError.message}`
            }
        }

        return {
            success: true,
            jobId: job.id,
            message: `Analysis started for ${capsTicker}`
        }

    } catch (error) {
        console.error('Failed to trigger analysis:', error)
        return {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            }
        }
    }
}
