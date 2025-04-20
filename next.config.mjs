/** @type {import('next').NextConfig} */
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
    output: 'standalone', // ✅ เพิ่มบรรทัดนี้
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/Admin/uploads/:path*',
                destination: `${API_BASE}/:path*`
            }
        ]
    }
};

export default nextConfig;