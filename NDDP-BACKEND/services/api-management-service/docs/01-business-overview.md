# NDDTP API Management Service — Business Overview

## Purpose

The API Management Service governs the platform's API gateway layer for the National Defence Digital Transformation Platform — API product catalog, route mappings, consumer registration, and API key lifecycle.

## Responsibilities

- API product catalog management (Personnel, Finance, Logistics APIs)
- Route definitions with upstream service mappings
- API consumer registration and suspension
- API key issuance and revocation with SHA-256 hashing
- Event publishing for API management activity

## Key Business Rules

- Only ACTIVE products accept new routes
- Route codes must be unique within a product
- Only ACTIVE consumers can receive new API keys
- Raw API keys are returned once at issuance; only prefix and hash are stored
- API key lifecycle: ACTIVE → REVOKED

## API Key Workflow

```
ACTIVE → REVOKED
```

## Permissions

- `apimanagement:read/manage:products`
- `apimanagement:read/manage:routes`
- `apimanagement:read/manage:consumers`

## Dependencies

PostgreSQL (`nddtp_api_management`), Redis (DB 31), RabbitMQ, Auth Service (JWT)
