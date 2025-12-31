import { z } from 'zod'

export const TranscriptMetricsSchema = z.object({
    revenue: z.string().describe("Revenue figures mentioned in the transcript"),
    earnings: z.string().describe("Earnings or EPS figures mentioned"),
    guidance: z.string().describe("Future guidance or outlook statements"),
})

export type TranscriptMetrics = z.infer<typeof TranscriptMetricsSchema>

export const SentimentAnalysisSchema = z.object({
    sentiment: z.enum(['bullish', 'bearish', 'neutral']).describe("Overall sentiment of the call"),
    confidence: z.number().min(0).max(1).describe("Confidence score between 0 and 1"),
    reasoning: z.string().describe("Explanation for the sentiment classification"),
})

export type SentimentAnalysis = z.infer<typeof SentimentAnalysisSchema>

export const PricePredictionSchema = z.object({
    direction: z.enum(['up', 'down', 'flat']).describe("Predicted price direction"),
    confidence: z.number().min(0).max(1).describe("Confidence score of the prediction"),
    keyFactors: z.array(z.string()).describe("List of key factors influencing the prediction"),
})

export type PricePrediction = z.infer<typeof PricePredictionSchema>

export interface AgentState {
    ticker: string
    transcript: string
    metrics?: TranscriptMetrics
    sentiment?: SentimentAnalysis
    prediction?: PricePrediction
}
