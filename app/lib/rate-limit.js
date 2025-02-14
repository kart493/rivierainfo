import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(500, "60 s"),
  analytics: true,
  prefix: "app_ratelimit",
});

export async function rateLimiter(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous';
    
    const { success, limit, remaining, reset } = await ratelimit.limit(`ratelimit_${ip}`);

    if (!success) {
      return {
        status: 429,
        body: { error: 'Too many requests' },
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(reset - Date.now()),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      };
    }

    return null;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return null;
  }
} 