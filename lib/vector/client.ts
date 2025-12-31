import { QdrantClient } from '@qdrant/js-client-rest'

const qdrantUrl = process.env.QDRANT_URL || 'http://localhost:6333'

export const qdrant = new QdrantClient({
    url: qdrantUrl,
})

export async function ensureCollection(collectionName: string) {
    try {
        // Verify connection first
        try {
            await qdrant.getCollections()
        } catch (connError) {
            console.error('Qdrant connection failed. Ensure Docker container is running.', connError)
            throw new Error('Qdrant connection failed')
        }

        const result = await qdrant.getCollections()
        const exists = result.collections.some((c) => c.name === collectionName)

        if (!exists) {
            console.log(`Creating collection: ${collectionName}`)
            await qdrant.createCollection(collectionName, {
                vectors: {
                    size: 1536, // Standard embedding size compatible with most models
                    distance: 'Cosine',
                },
            })
        }
    } catch (error) {
        console.error('Error ensuring Qdrant collection:', error)
        throw new Error(`Failed to ensure Qdrant collection "${collectionName}": ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}
