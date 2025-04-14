import { PineconeClient } from '@pinecone-database/pinecone'
import { env } from '../config/env'
import { Connection } from '../types'

let pineconeClient: PineconeClient | null = null

async function getPineconeClient(): Promise<PineconeClient> {
    if (!pineconeClient) {
        if (!env.PINECONE_API_KEY) {
            throw new Error('Pinecone API key not configured')
        }

        pineconeClient = new PineconeClient()
        await pineconeClient.init({
            apiKey: env.PINECONE_API_KEY,
            environment: env.PINECONE_ENVIRONMENT
        })
    }
    return pineconeClient
}

export async function queryPinecone(embedding: number[], limit: number): Promise<Connection[]> {
    try {
        const client = await getPineconeClient()
        const indexName = env.PINECONE_INDEX

        const pineconeIndex = client.Index(indexName)

        const queryResponse = await pineconeIndex.query({
            vector: embedding,
            topK: limit,
            includeMetadata: true
        })

        // Map Pinecone results to our Connection type
        return queryResponse.matches?.map(match => {
            const metadata = match.metadata as any
            return {
                event: metadata.event || 'Unknown Event',
                figure: metadata.figure || 'Unknown Figure',
                location: metadata.location || 'Unknown Location',
                year: metadata.year || '',
                description: metadata.description || ''
            }
        }) || []

    } catch (error) {
        console.error('Pinecone query error:', error)
        return [] // Return empty array on error to allow fallback to Wikipedia
    }
}
