/** @type {import('next').NextConfig} */
const API_BASE = 'https://localhost:8080/'
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