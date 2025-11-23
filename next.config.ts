import type { NextConfig } from "next";

const nextConfig: any = {
  reactCompiler: true,
  turbopack: {},
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    },
  },

};

export default nextConfig;