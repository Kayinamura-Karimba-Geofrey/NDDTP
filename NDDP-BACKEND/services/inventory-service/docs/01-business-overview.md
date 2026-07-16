# NDDTP Inventory Service — Business Overview

## Purpose

The Inventory Service manages defence supply chain stock — warehouses, item catalog, stock levels, movements, and requisition workflow.

## Responsibilities

- Warehouse management (HQ, field, medical supply stores)
- Inventory item catalog with SKU, category, and reorder levels
- Stock level tracking per warehouse with reserved quantity support
- Stock operations: receive, issue, adjust with movement audit trail
- Stock requisition workflow (submit → approve → fulfill)
- Low-stock alerting via reorder level queries
- Event publishing for procurement, logistics, and asset integration

## Key Business Rules

- Stock cannot be issued below available quantity (quantity - reserved)
- Approved request quantity cannot exceed requested quantity
- Fulfillment issues stock and marks request FULFILLED
- All stock changes create append-only movement records
- One stock level record per warehouse/item pair

## Permissions

- `inventory:read:warehouses` / `inventory:manage:warehouses`
- `inventory:read:items` / `inventory:manage:items`
- `inventory:read:stock` / `inventory:manage:stock`
- `inventory:read:requests` / `inventory:manage:requests`

## Dependencies

PostgreSQL (`nddtp_inventory`), Redis (DB 13), RabbitMQ, Auth Service (JWT)
