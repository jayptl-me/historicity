import { Hono } from 'hono'
import searchRoutes from './search'
import historyRoutes from './history'

export function setupRoutes(app: Hono) {
    // API endpoints
    const api = new Hono()

    // Search routes
    api.route('/search', searchRoutes)

    // History routes
    api.route('/history', historyRoutes)

    // Mount all API routes under /api
    app.route('/api', api)
}

export default {
    setupRoutes
}
