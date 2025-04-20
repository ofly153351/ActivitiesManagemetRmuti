import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone()
  if (!token) {
    url.pathname = '/Home'
    return NextResponse.redirect(url)
  }

  try {
    const secret = new TextEncoder().encode('your-secret')
    const { payload } = await jwtVerify(token, secret)
    if (!['admin', 'teacher'].includes(payload.role)) {
      url.pathname = '/Home'
      return NextResponse.redirect(url)
    }
  } catch (e) {
    console.error(e)
    url.pathname = '/Home'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/Admin/:path*', '/Information/:path*']
}