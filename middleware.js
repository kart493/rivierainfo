import { NextResponse } from 'next/server';
import { rateLimiter } from './app/lib/rate-limit';
import { generateNonce } from './app/utils/nonce';

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
    const nonce = generateNonce();
    
    // Store nonce in response headers to access it in layout
    response.headers.set('x-nonce', nonce);
    
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('Content-Security-Policy', 
      `default-src 'self'; ` +
      `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; ` +
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
      `font-src 'self' https://fonts.gstatic.com data:; ` +
      `img-src 'self' https: data:; ` +
      `connect-src 'self' https://vitapi.riviera.vit.ac.in https://*.upstash.io; ` +
      `frame-ancestors 'none';`
    );
    
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