import { NextResponse } from 'next/server';
import { rateLimiter } from './app/lib/rate-limit';

export async function middleware(request) {
  try {
    const rateLimitResult = await rateLimiter(request);
    if (rateLimitResult) {
      return new NextResponse(JSON.stringify(rateLimitResult.body), {
        status: rateLimitResult.status,
        headers: rateLimitResult.headers,
      });
    }
    
    const response = NextResponse.next();
    
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    const cfHeaders = [
      'cf-connecting-ip',
      'x-real-ip',
      'x-forwarded-for',
      'cf-ray',
      'cf-visitor'
    ];

    cfHeaders.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        response.headers.set(header, value);
      }
    });

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|favicon.ico|images|.*\\.).*)',
  ],
}; 