# NDDTP Logistics Service — Business Overview

## Purpose

The Logistics Service manages defence supply chain transport — locations, routes, shipments, cargo manifests, and real-time tracking.

## Responsibilities

- Logistics location catalog (depots, bases, field sites, checkpoints)
- Transport route definitions with distance and ETA
- Shipment creation with cargo manifest (inventory item references)
- Shipment lifecycle (draft → scheduled → dispatched → in transit → delivered)
- Append-only tracking events with location updates and delay reporting
- Event publishing for inventory, fleet, and procurement integration

## Key Business Rules

- Origin and destination must differ for routes and shipments
- Shipments require at least one cargo item
- Status transitions follow defined workflow (no skipping stages)
- All status changes create tracking events
- Driver and vehicle assignments set at scheduling

## Permissions

- `logistics:read:locations` / `logistics:manage:locations`
- `logistics:read:routes` / `logistics:manage:routes`
- `logistics:read:shipments` / `logistics:manage:shipments`
- `logistics:read:tracking` / `logistics:manage:tracking`

## Dependencies

PostgreSQL (`nddtp_logistics`), Redis (DB 14), RabbitMQ, Auth Service (JWT)
