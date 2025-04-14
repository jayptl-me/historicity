import axios from 'axios'
import { env } from '../config/env'
import { Connection } from '../types'

export async function searchWikipedia(query: string, limit: number): Promise<Connection[]> {
    try {
        // Search Wikipedia API
        const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                list: 'search',
                srsearch: query,
                format: 'json',
                srlimit: limit,
            },
            headers: {
                'User-Agent': env.WIKIPEDIA_USER_AGENT
            }
        })

        const results = searchResponse.data.query.search

        // Get more details for each page
        const connections: Connection[] = []

        for (const result of results) {
            try {
                const pageId = result.pageid

                // Get page extract and basic info
                const pageResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
                    params: {
                        action: 'query',
                        prop: 'extracts|pageprops',
                        exintro: true,
                        explaintext: true,
                        pageids: pageId,
                        format: 'json',
                    },
                    headers: {
                        'User-Agent': env.WIKIPEDIA_USER_AGENT
                    }
                })

                const page = pageResponse.data.query.pages[pageId]
                const extract = page.extract || ''

                // Extract potential year, figure and location
                const yearMatch = extract.match(/\b(1[0-9]{3}|20[0-9]{2}|[2-9][0-9]{2})\b/) // Match years
                const year = yearMatch ? yearMatch[0] : ''

                // Create a connection from Wikipedia data
                // This is simplified - a real implementation would do more parsing
                connections.push({
                    event: result.title,
                    figure: 'Various historical figures', // Would need entity extraction
                    location: 'Various locations', // Would need entity extraction
                    year: year,
                    description: extract.slice(0, 150) + '...'
                })

                // Don't overload the Wikipedia API
                await new Promise(resolve => setTimeout(resolve, 100))

            } catch (error) {
                console.error(`Error getting details for page: ${result.title}`, error)
                continue
            }
        }

        return connections

    } catch (error) {
        console.error('Wikipedia search error:', error)
        return []
    }
}
