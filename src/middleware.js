import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
    const accessToken = request.cookies.get('token');
    const homeUrl = new URL('/Home', request.url).href;
    
    let role = null;
    
    // ตรวจสอบ token
    if (accessToken) {
        try {
            // แยกค่า payload จาก JWT
            const decoded = jwt.decode(accessToken.value);
            role = decoded?.role;
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    }
    
    // ตรวจสอบเส้นทาง '/Admin' และเส้นทางอื่นๆ
    if (request.nextUrl.pathname.startsWith('/Admin')) {
        if (!role || role !== 'admin') {
            console.log('User does not have the correct role or no token found, redirecting to unauthorized');
            return NextResponse.redirect(homeUrl); // เปลี่ยนเส้นทางไปที่หน้า Home
        }
    }
    

    // ตรวจสอบเส้นทาง '/home'
    if (request.nextUrl.pathname.startsWith('/home')) {
        if (role === null) {
            console.log('User role is null, redirecting to unauthorized');
            return NextResponse.redirect(homeUrl);
        }
    }

    // สร้าง response
    return NextResponse.next();
}

export const config = {
    matcher: ['/Home', '/Home/Infomation', '/Admin', '/Admin/Userlist', '/Admin/Facultylist', '/teacher'],
}