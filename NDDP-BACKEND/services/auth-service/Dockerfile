# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci --omit=dev

# Security: Switch to non-root user after npm install
USER node

COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/v1/health/live || exit 1

CMD ["node", "dist/main.js"]
