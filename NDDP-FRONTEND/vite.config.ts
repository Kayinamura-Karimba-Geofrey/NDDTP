import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import type { IncomingMessage } from 'http';

const SERVICE_PORTS: Record<string, number> = {
  auth: 3001,
  authorization: 3002,
  user: 3003,
  notification: 3004,
  audit: 3005,
  personnel: 3006,
  recruitment: 3007,
  leave: 3008,
  welfare: 3009,
  medical: 3010,
  training: 3011,
  performance: 3012,
  asset: 3013,
  inventory: 3014,
  logistics: 3015,
  procurement: 3016,
  fleet: 3017,
  maintenance: 3018,
  facilities: 3019,
  finance: 3020,
  visitor: 3021,
  workflow: 3022,
  calendar: 3023,
  reporting: 3024,
  analytics: 3025,
  'business-intelligence': 3026,
  messaging: 3027,
  announcement: 3028,
  search: 3029,
  configuration: 3030,
  integration: 3031,
  'api-management': 3032,
  backup: 3033,
  monitoring: 3034,
  'ai-assistant': 3035,
};

function resolveServicePort(req: IncomingMessage): number {
  const match = req.url?.match(/^\/api\/svc\/([^/?]+)/);
  if (match) {
    const port = SERVICE_PORTS[match[1]];
    if (port) return port;
  }
  return 3001;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api/svc': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (reqPath: string) => reqPath.replace(/^\/api\/svc\/[^/]+/, '/api/v1'),
        router: (req: IncomingMessage) => `http://localhost:${resolveServicePort(req)}`,
      } as import('vite').ProxyOptions & { router: (req: IncomingMessage) => string },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'charts';
            if (id.includes('@reduxjs') || id.includes('react-redux')) return 'redux';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor';
          }
        },
      },
    },
  },
});
