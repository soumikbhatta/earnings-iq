import { model } from '../../../lib/llm/client'
import { AgentState, SentimentAnalysisSchema } from '../schemas'
import { SystemMessage, HumanMessage } from '@langchain/core/messages'

export async function analyzeSentiment(state: AgentState): Promise<Partial<AgentState>> {
    console.log(`[Sentiment] Analyzing tone for ${state.ticker}...`)

    const structuredModel = model.withStructuredOutput(SentimentAnalysisSchema)

    const messages = [
        new SystemMessage(`You are an expert in behavioral finance. Analyze the sentiment of the earnings call based on the provided metrics and transcript excerpts. Determine if the tone is Bullish, Bearish, or Neutral.`),
        new HumanMessage(`
      Ticker: ${state.ticker}
      
      Extracted Metrics:
      Revenue: ${state.metrics?.revenue}
      Earnings: ${state.metrics?.earnings}
      Guidance: ${state.metrics?.guidance}

      (Analyze the overall tone based on these figures and the underlying context)
    `),
    ]

    const result = await structuredModel.invoke(messages)

    return {
        sentiment: result,
    }
}
