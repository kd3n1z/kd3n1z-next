/** @type {import('next').NextConfig} */

const appRedirects = ['/', '/index.html', '/index.php'];

const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        const redirs = appRedirects.map((src) => {
            return {
                source: src,
                permanent: true,
                has: [
                    {
                        type: 'query',
                        key: 'app',
                        value: '(?<appName>.*)'
                    }
                ],
                destination: '/app/:appName/?app='
            };
        });

        return [
            ...redirs
        ];
    }
};

module.exports = nextConfig;