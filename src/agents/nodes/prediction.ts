import { model } from '../../../lib/llm/client'
import { AgentState, PricePredictionSchema } from '../schemas'
import { SystemMessage, HumanMessage } from '@langchain/core/messages'

export async function generatePrediction(state: AgentState): Promise<Partial<AgentState>> {
    console.log(`[Prediction] Forecasting price movement for ${state.ticker}...`)

    const structuredModel = model.withStructuredOutput(PricePredictionSchema)

    const messages = [
        new SystemMessage(`You are a quantitative trader. Based on the financial metrics and sentiment analysis, predict the likely short-term price movement (Up, Down, Flat) of the stock.`),
        new HumanMessage(`
      Ticker: ${state.ticker}
      
      Metrics:
      - Revenue: ${state.metrics?.revenue}
      - Earnings: ${state.metrics?.earnings}
      - Guidance: ${state.metrics?.guidance}

      Sentiment:
      - Classification: ${state.sentiment?.sentiment}
      - Confidence: ${state.sentiment?.confidence}
      - Reasoning: ${state.sentiment?.reasoning}

      Provide a direction, confidence score, and key driving factors.
    `),
    ]

    const result = await structuredModel.invoke(messages)

    return {
        prediction: result,
    }
}
