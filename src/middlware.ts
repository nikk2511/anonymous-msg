import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

// Mark the middleware function as `async`
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // If the user is authenticated and trying to access auth-related pages, redirect to the dashboard
    if (
        token && (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/' // Redirect from the home page if authenticated
        )
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is not authenticated and tries to access a restricted page, redirect to the home page
    return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}

// Note: You might want to combine this with the next-auth middleware if necessary
export { default } from "next-auth/middleware";
