import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ambil token dari cookies di sisi server
  const token = request.cookies.get('authToken')?.value; // Menggunakan request.cookies
  console.log(token);
  
  // Jika pengguna mencoba mengakses halaman selain /login dan tidak memiliki token
  if (pathname !== '/login' && !token) {
    // Redirect ke halaman login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika pengguna mencoba mengakses halaman /login dan sudah memiliki token
  if (pathname === '/login' && token) {
    // Redirect ke halaman utama atau halaman yang dilindungi
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika pengguna mengakses halaman login, tambahkan header untuk menghindari cache
  if (pathname === '/login') {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store'); // Menghindari cache untuk halaman login
    return response;
  }

  // Jika token ada atau pengguna mengakses halaman /login tanpa token, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
};
