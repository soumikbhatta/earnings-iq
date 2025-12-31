import { ChatGroq } from '@langchain/groq'

if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set')
}

export const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1,
})
