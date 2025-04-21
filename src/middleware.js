// middleware.js (อยู่ที่ root ของโปรเจกต์)
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl.clone()

  console.log("🔥 Middleware called")
  console.log("Token:", token)

  if (!token) {
    console.log("❌ No token")
    url.pathname = '/Home'
    return NextResponse.redirect(url)
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    console.log("✅ JWT Verified:", payload)

    if (!['admin', 'teacher', 'superadmin' , 'student'].includes(payload.role)) {
      console.log("❌ Unauthorized role:", payload.role)
      url.pathname = '/Home'
      return NextResponse.redirect(url)
    }
  } catch (err) {
    console.error("❌ JWT Error:", err)
    url.pathname = '/Home'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// กำหนด path ที่ middleware จะทำงาน
export const config = {
  matcher: ['/Admin/:path*', '/Information/:path*'],
}