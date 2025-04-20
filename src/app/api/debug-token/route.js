// /app/api/debug-token/route.ts
import { jwtVerify } from 'jose'

export async function GET(request) {
  const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0]
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    const { payload } = await jwtVerify(token, secret)
    console.log("TOKEN PAYLOAD:", payload)
    return new Response(JSON.stringify({ payload }), { status: 200 })
  } catch (err) {
    console.error("JWT ERROR", err)
    return new Response("Invalid token", { status: 401 })
  }
}