import { ChatAnthropic } from '@langchain/anthropic'

if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set')
}

export const model = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0,
    apiKey: process.env.ANTHROPIC_API_KEY,
})
