import { Client, Connection } from '@temporalio/client'

let client: Client | null = null

/**
 * Get or create a Temporal client instance
 * This uses a singleton pattern to reuse the same connection
 */
export async function getTemporalClient(): Promise<Client> {
    if (client) {
        return client
    }

    try {
        const connection = await Connection.connect({
            address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
        })

        client = new Client({
            connection,
            namespace: 'default',
        })

        return client
    } catch (error) {
        console.error('Failed to connect to Temporal:', error)
        throw new Error('Could not establish Temporal connection')
    }
}

/**
 * Close the Temporal client connection
 */
export async function closeTemporalClient(): Promise<void> {
    if (client) {
        await client.connection.close()
        client = null
    }
}
