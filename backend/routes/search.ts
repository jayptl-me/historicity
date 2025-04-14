import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { searchHistoricalConnections } from '../services/search'

const router = new Hono()

// Validate search query
const searchSchema = z.object({
    query: z.string().min(3).max(200),
    limit: z.number().optional().default(10),
})

// Search endpoint
router.post('/', zValidator('json', searchSchema), async (c) => {
    try {
        const { query, limit } = c.req.valid('json')

        const results = await searchHistoricalConnections(query, limit)

        return c.json({
            success: true,
            data: results
        })
    } catch (error: any) {
        console.error('Search error:', error)
        return c.json({
            success: false,
            error: error.message || 'Failed to process search query'
        }, 500)
    }
})

// Get trending searches
router.get('/trending', async (c) => {
    try {
        // This would ideally come from a database of popular searches
        const trendingQueries = [
            "American Civil War",
            "French Revolution",
            "Ancient Egypt and Rome connections",
            "Industrial Revolution impact",
            "Cold War major events",
            "Renaissance art and science"
        ]

        return c.json({
            success: true,
            data: trendingQueries
        })
    } catch (error: any) {
        return c.json({
            success: false,
            error: error.message || 'Failed to retrieve trending searches'
        }, 500)
    }
})

export default router
