import { model } from '../../../lib/llm/client'
import { AgentState, TranscriptMetricsSchema } from '../schemas'
import { SystemMessage, HumanMessage } from '@langchain/core/messages'

export async function parseTranscript(state: AgentState): Promise<Partial<AgentState>> {
    console.log(`[Parser] Extracting metrics for ${state.ticker}...`)

    const structuredModel = model.withStructuredOutput(TranscriptMetricsSchema)

    const messages = [
        new SystemMessage(`You are a financial analyst. Extract key financial metrics (Revenue, Earnings, Guidance) from the earnings call transcript. Return exact quotes or summarized figures where possible.`),
        new HumanMessage(`Transcript for ${state.ticker}:\n\n${state.transcript}`),
    ]

    const result = await structuredModel.invoke(messages)

    return {
        metrics: result,
    }
}
