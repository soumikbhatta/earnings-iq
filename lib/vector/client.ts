import { QdrantClient } from '@qdrant/js-client-rest'

const qdrantUrl = process.env.QDRANT_URL || 'http://localhost:6333'

export const qdrant = new QdrantClient({
    url: qdrantUrl,
})

export async function ensureCollection(collectionName: string) {
    try {
        const result = await qdrant.getCollections()
        const exists = result.collections.some((c) => c.name === collectionName)

        if (!exists) {
            console.log(`Creating collection: ${collectionName}`)
            await qdrant.createCollection(collectionName, {
                vectors: {
                    size: 1536, // Standard embedding size (e.g., OpenAI text-embedding-3-small)
                    distance: 'Cosine',
                },
            })
        }
    } catch (error) {
        console.error('Error ensuring Qdrant collection:', error)
    }
}
