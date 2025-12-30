import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript types for database tables
export interface Signal {
    id: string
    created_at: string
    ticker: string
    signal_type: 'earnings_beat' | 'earnings_miss' | 'revenue_growth' | 'sentiment_shift' | 'other'
    confidence: number
    metadata: Record<string, unknown>
    source: string
    status: 'active' | 'processed' | 'archived'
}

export interface AnalysisJob {
    id: string
    created_at: string
    updated_at: string
    signal_id: string
    workflow_id: string
    status: 'pending' | 'running' | 'completed' | 'failed'
    progress: number
    result: Record<string, unknown> | null
    error: string | null
}

// Database schema types (auto-generated from Supabase)
export type Database = {
    public: {
        Tables: {
            signals: {
                Row: Signal
                Insert: Omit<Signal, 'id' | 'created_at'>
                Update: Partial<Omit<Signal, 'id' | 'created_at'>>
            }
            analysis_jobs: {
                Row: AnalysisJob
                Insert: Omit<AnalysisJob, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<AnalysisJob, 'id' | 'created_at'>>
            }
        }
    }
}
