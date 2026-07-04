# NDDTP Fleet Service — Business Overview

## Purpose

The Fleet Service manages defence vehicle operations — type catalog, vehicle registry, driver assignments, trip logging, and safety inspections.

## Responsibilities

- Vehicle type catalog (light, heavy, armoured, motorcycle, specialized)
- Vehicle registration with odometer tracking
- Driver assignment workflow (one active assignment per vehicle)
- Trip logging with distance and fuel consumption
- Scheduled inspections with pass/fail outcomes
- Event publishing for logistics, maintenance, and asset integration

## Key Business Rules

- Only AVAILABLE vehicles can be assigned
- One active assignment per vehicle at a time
- Odometer readings cannot decrease
- Trip end odometer must be >= start odometer
- Failed inspections mark vehicle OUT_OF_SERVICE

## Permissions

- `fleet:read/manage:types`
- `fleet:read/manage:vehicles`
- `fleet:read/manage:assignments`
- `fleet:read/manage:trips`
- `fleet:read/manage:inspections`

## Dependencies

PostgreSQL (`nddtp_fleet`), Redis (DB 16), RabbitMQ, Auth Service (JWT)
