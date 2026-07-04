# NDDTP Asset Service — Business Overview

## Purpose

The Asset Service manages defence equipment and property — categories, asset registry, assignments, movements, and periodic audits.

## Responsibilities

- Asset category catalog (equipment, vehicles, weapons, IT, furniture)
- Asset registration and lifecycle management
- Assignment of assets to personnel with return tracking
- Movement history (assignments, returns, transfers, disposals)
- Unit-level asset audits with findings
- Event publishing for inventory, maintenance, and audit integration

## Key Business Rules

- Assets progress: REGISTERED → AVAILABLE → ASSIGNED → (return) AVAILABLE
- Only available assets can be assigned
- One active assignment per asset
- Transfers update unit ownership and log movement
- Disposal is terminal status
- Audits follow scheduled → in-progress → completed workflow

## Permissions

- `asset:read:categories` / `asset:manage:categories`
- `asset:read:assets` / `asset:manage:assets`
- `asset:read:assignments` / `asset:manage:assignments`
- `asset:read:audits` / `asset:manage:audits`

## Dependencies

PostgreSQL (`nddtp_asset`), Redis (DB 12), RabbitMQ, Auth Service (JWT)
