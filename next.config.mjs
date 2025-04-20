/** @type {import('next').NextConfig} */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE
const nextConfig = {
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