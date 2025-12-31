export interface TranscriptJobData {
    ticker: string
    companyName?: string
    transcriptUrl?: string
    quarter?: string
    year?: number
}

export interface AnalysisResult {
    sentiment: {
        score: number
        label: 'positive' | 'negative' | 'neutral'
    }
    confidence: number
    keyPoints: string[]
    prediction?: 'beat' | 'miss' | 'inline'
}
