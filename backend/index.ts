import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { rateLimiter } from 'hono-rate-limiter'
import { serve } from '@hono/node-server'

import { env } from './config/env'
import { setupRoutes } from './routes/api'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({ origin: env.CORS_ORIGIN }))
app.use('*', prettyJSON())
app.use(
    '*',
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Max 100 requests per window
        standardHeaders: true,
        keyGenerator: (c) => c.req.header('x-forwarded-for') || 'anonymous',
    })
)

// Routes
setupRoutes(app)

// Status check endpoint
app.get('/status', (c) => {
    return c.json({
        status: 'ok',
        services: {
            pinecone: Boolean(env.PINECONE_API_KEY),
            groq: Boolean(env.GROQ_API_KEY),
            wikipedia: true
        }
    })
})

// Error handling
app.onError((err, c) => {
    console.error('Global error:', err.message)
    return c.json({ error: 'Unexpected error occurred' }, 500)
})

// Not found
app.notFound((c) => {
    return c.json({ error: 'Endpoint not found' }, 404)
})

// Start the server directly if not imported
if (import.meta.url === import.meta.main) {
    const port = parseInt(env.PORT, 10)
    console.log(`Server is starting on port ${port}...`)
    serve({
        fetch: app.fetch,
        port
    })
}

export default app
