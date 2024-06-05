import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/verifyemail']

  // Get the authentication token from cookies
  const token = request.cookies.get('token')?.value || ''

  // If the user is trying to access a public path and they are authenticated, redirect them to the profile page
  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  // If the user is trying to access a protected path and they are not authenticated, redirect them to the login page
  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Default: allow the request to proceed
  return NextResponse.next()
}

// Define the paths for which the middleware should run
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}
