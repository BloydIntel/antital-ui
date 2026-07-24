import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Legacy auth paths → current sign-in / create-account routes
  if (
    pathname === '/login' ||
    pathname === '/auth/sign-in' ||
    pathname === '/auth/sign-in-2' ||
    pathname === '/auth/sign-in-3'
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (
    pathname === '/register' ||
    pathname === '/auth/sign-up' ||
    pathname === '/auth/create-account'
  ) {
    return NextResponse.redirect(new URL('/create-account', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico|favicon-dark.ico).*)',
  ],
}
