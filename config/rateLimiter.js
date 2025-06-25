
import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1minutes
	limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)