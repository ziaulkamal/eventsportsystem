import { NextResponse } from 'next/server';

export function middleware(request) {
  // const { pathname } = request.nextUrl;
  // Ambil token dari cookies di sisi server
  const token = request.cookies.get('authToken');

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika token ada, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)']
};
