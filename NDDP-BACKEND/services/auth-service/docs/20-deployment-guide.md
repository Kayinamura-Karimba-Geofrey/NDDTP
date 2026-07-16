# NDDTP Authentication Service — Deployment Guide

## Prerequisites

- Docker 24+ and Docker Compose v2
- Node.js 20+ (for local development)
- PostgreSQL 16+ (if not using Docker)
- Redis 7+ (if not using Docker)
- RabbitMQ 3.13+ (if not using Docker)

## Docker Deployment (Recommended)

```bash
cd services/auth-service/docker

# Copy and configure environment
cp ../.env.example ../.env
# Edit .env with production secrets

# Start all services
docker compose up -d

# Verify health
curl http://localhost:3001/api/v1/health/live
```

## Local Development

```bash
cd services/auth-service

# Install dependencies
npm install

# Copy environment
cp .env.example .env

# Start infrastructure (from docker directory)
cd docker && docker compose up -d auth-postgres auth-redis auth-rabbitmq

# Run migrations
npm run migration:run

# Start development server
npm run start:dev
```

## Environment Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_ACCESS_SECRET` | Yes | Min 32 characters, unique per environment |
| `JWT_REFRESH_SECRET` | Yes | Min 32 characters, different from access secret |
| `DB_PASSWORD` | Yes | PostgreSQL password |
| `RABBITMQ_URL` | Yes | AMQP connection string |
| `REDIS_HOST` | Yes | Redis hostname |

## Migration Strategy

1. Migrations are in `src/database/migrations/`
2. Run `npm run migration:run` before deploying new versions
3. Never use `synchronize: true` in production
4. Always backup database before migrations

```bash
# Generate new migration after entity changes
npm run migration:generate -- src/database/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Backup Strategy

### PostgreSQL
```bash
# Daily backup
pg_dump -h localhost -p 5433 -U nddtp_auth nddtp_auth > backup_$(date +%Y%m%d).sql

# Restore
psql -h localhost -p 5433 -U nddtp_auth nddtp_auth < backup_20260101.sql
```

### Redis
Redis data is ephemeral (session cache). No backup required. Sessions rebuild from PostgreSQL on cache miss.

## Monitoring Strategy

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| HTTP request latency | Prometheus/Grafana | p95 > 500ms |
| Error rate | Prometheus/Grafana | > 1% over 5min |
| Failed login rate | Custom metric | > 100/min |
| Database connections | pg_stat_activity | > 80% pool |
| Redis memory | Redis INFO | > 80% maxmemory |
| RabbitMQ queue depth | RabbitMQ Management | > 1000 messages |

### Health Endpoints

- `GET /api/v1/health/live` — Liveness (process alive)
- `GET /api/v1/health/ready` — Readiness (DB connected)
- `GET /api/v1/health` — Full health check

## Production Checklist

- [ ] Change all default secrets in `.env`
- [ ] Enable SSL for PostgreSQL (`DB_SSL=true`)
- [ ] Configure Redis password
- [ ] Set `NODE_ENV=production`
- [ ] Disable `synchronize` in TypeORM config
- [ ] Run database migrations
- [ ] Configure log aggregation (ELK/Datadog)
- [ ] Set up monitoring alerts
- [ ] Configure backup cron jobs
- [ ] Review CORS origins
- [ ] Enable rate limiting appropriate for load
