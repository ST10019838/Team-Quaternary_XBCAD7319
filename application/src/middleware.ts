import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin')
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization,  Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Max-Age': '86400',
      },
    })
  }
  const auth = clerkMiddleware()
  return auth(request, event)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
