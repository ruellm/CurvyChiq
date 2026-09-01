import { NextResponse, type NextRequest } from 'next/server'

// /admin has no access control and its product actions write to columns that no longer exist.
// It stays dark until Phase 2 builds real auth. Set ADMIN_ENABLED=true locally to work on it.
export function middleware(request: NextRequest) {
  if (process.env.ADMIN_ENABLED === 'true') {
    return NextResponse.next()
  }
  return new NextResponse(null, { status: 404 })
}

export const config = {
  matcher: '/admin/:path*',
}
