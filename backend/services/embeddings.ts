import axios from 'axios'
import { env } from '../config/env'

export async function getEmbedding(text: string): Promise<number[]> {
    try {
        // This is a placeholder for a real embedding service
        // In a production app, you would use OpenAI, Cohere, or another embedding service

        // For now, we'll just return a mock embedding
        // Normally you would make an API call like:
        /*
        const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
                input: text,
                model: env.EMBED_MODEL
            },
            {
                headers: {
                    'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data.data[0].embedding
        */

        // Mock embedding - 1536 dimensions with random values
        return Array(1536).fill(0).map(() => Math.random() * 2 - 1)

    } catch (error) {
        console.error('Error generating embedding:', error)
        throw new Error('Failed to generate text embedding')
    }
}
