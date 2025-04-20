import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { useStore } from './store/useStore';


export function middleware(request) {
    const accessToken = request.cookies.get('token');
    const homeUrl = new URL('/Home', request.url).href;
    const { user } = useStore();
    let role = user?.role

    // ตรวจสอบ token
    // if (accessToken) {
    //     try {
    //         // แยกค่า payload จาก JWT
    //         const decoded = jwt.decode(accessToken.value);
    //         role = decoded?.role;
    //     } catch (error) {
    //         console.error('Error decoding JWT:', error);
    //     }
    // }

    // console.log(role);



    // ตรวจสอบเส้นทาง '/Admin' และเส้นทางอื่นๆ
    if (request.nextUrl.pathname.startsWith('/Admin')) {
        if (role !== 'admin' && role !== 'teacher' && role !== 'superadmin') {  // ตรวจสอบว่า role เป็น admin หรือ teacher เท่านั้น
            console.log('User does not have the correct role, redirecting to /home');
            return NextResponse.redirect(homeUrl); // เปลี่ยนเส้นทางไปที่ /home
        }
    }
    if (request.nextUrl.pathname.startsWith('/Information')) {
        if (!accessToken) {  // ตรวจสอบว่า role เป็น admin หรือ teacher เท่านั้น
            console.log('User does not have the correct role, redirecting to /home');
            return NextResponse.redirect(homeUrl); // เปลี่ยนเส้นทางไปที่ /home
        }
    }
    // ตรวจสอบเส้นทาง '/home'
    // if (request.nextUrl.pathname.startsWith('/Home/Information')) {
    //     if (role === null) {
    //         console.log('User role is null, redirecting to unauthorized');
    //         return NextResponse.redirect(homeUrl);
    //     }
    // }

    // สร้าง response
    return NextResponse.next();
}

