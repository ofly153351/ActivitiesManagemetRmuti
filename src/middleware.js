import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// ตัวแปรลับสำหรับ decode (ถ้าต้องการ verify จริงจัง ให้ใช้ secret จาก env)


export function middleware(request) {
  const token = request.cookies.get('access_token')?.value;
  const homeUrl = new URL('/Home', request.url);

  let role = null;

  // แกะ token
  if (token) {
    try {
      const decoded = jwt.decode(token); // ใช้ decode แบบไม่ verify
      role = decoded?.role;
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }

  const path = request.nextUrl.pathname;

  // เช็คสิทธิ์เส้นทาง /Admin
  if (path.startsWith('/Admin')) {
    if (!['admin', 'teacher', 'superadmin'].includes(role)) {
      console.log('❌ ไม่มีสิทธิ์เข้า /Admin -> redirect ไป /Home');
      return NextResponse.redirect(homeUrl);
    }
  }

  // เช็คสิทธิ์เส้นทาง /Information (ต้อง login อย่างน้อย)
  if (path.startsWith('/Information')) {
    if (!role) {
      console.log('❌ ไม่พบ role -> redirect ไป /Home');
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next(); // ให้ผ่านปกติ
}

export const config = {
  matcher: ['/Admin/:path*', '/Information/:path*'], // ระบุเส้นทางที่ middleware ใช้งาน
};