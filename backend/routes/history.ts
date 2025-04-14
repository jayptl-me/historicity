import { Hono } from 'hono'

const router = new Hono()

// This would be a server-side history tracking system
// For now, we'll just return a placeholder response as the frontend
// is handling history in localStorage

router.get('/', (c) => {
    return c.json({
        success: true,
        message: "History is currently managed client-side"
    })
})

export default router
