/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)", // Apply headers to all routes
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups",
            },
            {
              key: "Cross-Origin-Resource-Policy",
              value: "same-site",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  