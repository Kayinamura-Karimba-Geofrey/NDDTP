# NDDP Backend

National Defence Digital Transformation Platform — **35 NestJS microservices** with shared `@nddtp/platform-core`.

## Structure

```
NDDP-BACKEND/
├── packages/platform-core/   # Shared platform library
├── services/                 # 35 microservices (ports 3001–3035)
├── scripts/                  # Build, test, and standardize automation
├── docs/                     # Architecture documentation
└── package.json              # npm workspaces root
```

## Commands

```bash
npm run build:platform   # Build shared library
npm run install:deps     # Link platform-core into services
npm run build:all        # Build all 35 services
npm run test:all         # Run all service tests
npm run standardize      # Apply platform-core migration script
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
