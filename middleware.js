import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone()

    console.log(token);


    //   if (!token) {
    //     console.log("No token found in cookies")
    //     url.pathname = '/Home'
    //     return NextResponse.redirect(url)
    //   }

    //   try {
    //     const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    //     const { payload } = await jwtVerify(token, secret)

    //     if (!['admin', 'teacher'].includes(payload.role)) {
    //       console.log("Unauthorized role:", payload.role)
    //       url.pathname = '/Home'
    //       return NextResponse.redirect(url)
    //     }
    //   } catch (e) {
    //     console.error("JWT Verify Error:", e)
    //     url.pathname = '/Home'
    //     return NextResponse.redirect(url)
    //   }

    //   return NextResponse.next()
}

// export const config = {
//   matcher: ['/Admin/:path*', '/Information/:path*']
// }