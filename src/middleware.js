import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
    // ดึงค่า access_token จาก cookies
    const accessToken = request.cookies.get('access_token')
    const unauthorizedUrl = new URL('/Unauthorized', request.url).href;
    const homeUrl = new URL('/Home', request.url).href;

    let role = null
    if (accessToken) {
        try {
            // แยกค่า payload จาก JWT
            const decoded = jwt.decode(accessToken.value)

            // ตรวจสอบ role จาก payload
            role = decoded?.role
            console.log('Role:', role)
        } catch (error) {
            console.error('Error decoding JWT:', error)
        }
    } else {
        console.log('No access_token found')
    }

    if (request.nextUrl.pathname.startsWith('/Admin')) {
        if (role !== 'admin') {
            console.log('User role is not admin or no token found, redirecting to unauthorized');
            return NextResponse.redirect(homeUrl);
        }
    }
    // สร้าง response
    const response = NextResponse.next()
    return response
}

export const config = {
    matcher: ['/Home' , '/Admin'],
}