/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/whatsapp-api", destination: "/whatsapp-business-api", permanent: true },
      { source: "/bulk-sms", destination: "/sms/promotional", permanent: true },
      { source: "/sms-api", destination: "/developers/sms-api", permanent: true },
      { source: "/voice-call", destination: "/voice/tts", permanent: true },
      { source: "/missed-call-service", destination: "/numbers/missed-call", permanent: true },
      { source: "/toll-free-number", destination: "/numbers/toll-free", permanent: true },
      { source: "/number-masking", destination: "/numbers/masking", permanent: true },
      { source: "/ivr-service", destination: "/voice/ivr", permanent: true },
      { source: "/opt-in", destination: "/compliance", permanent: true },
      { source: "/facebook-promotion", destination: "/services/social-leads", permanent: true },
      { source: "/pricing", destination: "/contact", permanent: true },
      { source: "/pricing/:path*", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
