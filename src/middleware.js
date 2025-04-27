// middleware.js
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl.clone()

  console.log("🔥 Middleware called")
  console.log("Token:", token)

  if (!token) {
    console.log("❌ No token")
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    console.log("✅ JWT Verified:", payload)

    // เช็ก role ว่าไม่ใช่ 4 ตัวที่อนุญาต
    if (!['admin', 'teacher', 'superadmin', 'student'].includes(payload.role)) {
      console.log("❌ Unauthorized role:", payload.role)
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    // 👉 เช็กเพิ่มเติม ถ้า role เป็น student แล้วพยายามเข้า /Admin
    if (payload.role === 'student' && req.nextUrl.pathname.startsWith('/Admin')) {
      console.log("❌ Student not allowed to access /Admin")
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    if (!payload && req.nextUrl.pathname.startsWith('/Infomation')) {
      console.log("❌ Gueast user not allowed to access /Infomation")
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  } catch (err) {
    console.error("❌ JWT Error:", err)
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// ให้ middleware ทำงานเฉพาะ /Admin และ /Information
export const config = {
  matcher: ['/Admin/:path*', '/Information/:path*'],
}