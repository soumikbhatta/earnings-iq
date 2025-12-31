import { StateGraph, START, END } from '@langchain/langgraph'
import { AgentState } from './schemas'
import { parseTranscript } from './nodes/parser'
import { analyzeSentiment } from './nodes/sentiment'
import { generatePrediction } from './nodes/prediction'

// Define the graph state schema
// Using explicit any to avoid complex type inference issues during compilation
const graphState = {
    ticker: {
        value: (x: any, y: any) => y ? y : x,
        default: () => ""
    },
    transcript: {
        value: (x: any, y: any) => y ? y : x,
        default: () => ""
    },
    metrics: {
        value: (x: any, y: any) => y ? y : x,
        default: () => undefined
    },
    sentiment: {
        value: (x: any, y: any) => y ? y : x,
        default: () => undefined
    },
    prediction: {
        value: (x: any, y: any) => y ? y : x,
        default: () => undefined
    }
}

// Create the graph
// Removing explicit generics and relying on internal inference, while casting nodes to any
const workflow = new StateGraph<AgentState>({
    channels: graphState
})

// Add nodes
// Casting handlers to any to bypass strict return type checks
workflow.addNode('parser_node', parseTranscript as any)
workflow.addNode('sentiment_node', analyzeSentiment as any)
workflow.addNode('prediction_node', generatePrediction as any)

// Add edges (linear flow)
// Casting targets to any
workflow.addEdge(START, 'parser_node' as any)
workflow.addEdge('parser_node' as any, 'sentiment_node' as any)
workflow.addEdge('sentiment_node' as any, 'prediction_node' as any)
workflow.addEdge('prediction_node' as any, END)

// Compile the graph
export const earningsGraph = workflow.compile()
