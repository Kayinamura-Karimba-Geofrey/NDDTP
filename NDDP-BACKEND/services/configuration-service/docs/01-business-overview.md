# NDDTP Configuration Service — Business Overview

## Purpose

The Configuration Service manages centralized platform settings — namespaces, configuration entries, revision history, and scoped overrides for the National Defence Digital Transformation Platform.

## Responsibilities

- Configuration namespace management (platform, security, notifications)
- Key-value configuration entries with typed values and environment scoping
- Automatic revision tracking on every value change
- Entry lifecycle: DRAFT → ACTIVE → DEPRECATED
- Event publishing for configuration change propagation

## Key Business Rules

- Only ACTIVE namespaces accept new entries
- Keys must be unique within a namespace
- Every create/update records a revision with version increment
- Deprecated entries cannot be updated
- Active entries are cached per namespace in Redis

## Entry Workflow

```
DRAFT → ACTIVE → DEPRECATED
```

## Permissions

- `configuration:read/manage:namespaces`
- `configuration:read/manage:entries`
- `configuration:read:revisions`

## Dependencies

PostgreSQL (`nddtp_configuration`), Redis (DB 29), RabbitMQ, Auth Service (JWT)
