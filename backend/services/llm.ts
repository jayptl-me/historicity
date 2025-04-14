import { Groq } from 'groq-sdk'
import { env } from '../config/env'
import { Connection } from '../types'

const groq = new Groq({
    apiKey: env.GROQ_API_KEY
})

export async function generateResponse(query: string, connections: Connection[]): Promise<string> {
    try {
        if (!env.GROQ_API_KEY) {
            // Return a fallback summary if no API key is configured
            return `Here are some historical connections related to "${query}". The results include information about various events, figures, and locations throughout history.`
        }

        const connectionSummaries = connections
            .map(c => `- ${c.event} (${c.year || 'unknown year'}): ${c.figure} in ${c.location}. ${c.description || ''}`)
            .join('\n')

        const prompt = `
        As a historical knowledge assistant, create a concise summary (maximum 200 words) of the following historical connections related to the query: "${query}"
        
        Here are the historical connections:
        ${connectionSummaries}
        
        Create a coherent, informative summary that connects these elements and explains their historical significance and relationships. Focus on accuracy and educational value.
        `

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a historian specializing in connecting historical events, people, and places across time periods. You provide accurate, educational information in a concise and engaging way.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: env.LLM_MODEL
        })

        return completion.choices[0]?.message?.content || 'No summary could be generated.'

    } catch (error) {
        console.error('Error generating LLM response:', error)
        return `Results for "${query}" include various historical connections between events, figures, and locations.`
    }
}
