import { getEmbedding } from './embeddings'
import { queryPinecone } from './pinecone'
import { searchWikipedia } from './wikipedia'
import { generateResponse } from './llm'
import { Connection, SearchResponse } from '../types'

export async function searchHistoricalConnections(query: string, limit: number = 10): Promise<SearchResponse> {
    try {
        // 1. Get query embedding
        const embedding = await getEmbedding(query)

        // 2. Search Pinecone for similar embeddings
        const pineconeResults = await queryPinecone(embedding, limit)

        // 3. If we don't have enough results, augment with Wikipedia
        let connections: Connection[] = pineconeResults

        if (connections.length < limit) {
            // Get additional info from Wikipedia
            const wikipediaResults = await searchWikipedia(query, limit - connections.length)
            connections = [...connections, ...wikipediaResults]
        }

        // 4. Generate a summary using Groq (LLM)
        const summary = await generateResponse(query, connections)

        return {
            summary,
            connections
        }
    } catch (error) {
        console.error("Search error:", error)
        throw new Error('Failed to process historical search')
    }
}
