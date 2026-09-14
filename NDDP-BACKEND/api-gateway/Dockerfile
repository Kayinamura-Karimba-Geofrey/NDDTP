FROM node:20-alpine AS builder
WORKDIR /app
COPY NDDP-BACKEND/api-gateway/package.json NDDP-BACKEND/api-gateway/package-lock.json* ./
RUN npm ci
COPY shared /shared
COPY NDDP-BACKEND/api-gateway/tsconfig.json ./
COPY NDDP-BACKEND/api-gateway/src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node NDDP-BACKEND/api-gateway/package.json NDDP-BACKEND/api-gateway/package-lock.json* ./
RUN npm ci --omit=dev

# Security: Switch to non-root user after npm install
USER node

COPY --chown=node:node --from=builder /app/dist ./dist
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
