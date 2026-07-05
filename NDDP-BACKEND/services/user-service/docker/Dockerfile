FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
RUN addgroup -g 1001 -S nddtp && adduser -S nddtp -u 1001 -G nddtp
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
RUN mkdir -p logs && chown -R nddtp:nddtp /app
USER nddtp
EXPOSE 3003
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3003/api/v1/health/live || exit 1
CMD ["node", "dist/main.js"]
