# NDDTP Procurement Service — Business Overview

## Purpose

The Procurement Service manages defence supply acquisition — vendor catalog, purchase requisitions, purchase orders, and goods receipt against orders.

## Responsibilities

- Vendor/supplier registration and catalog
- Purchase requisition workflow (draft → submit → approve/reject)
- Purchase order creation from approved requisitions
- Order issuance to vendors with line-item pricing
- Goods receipt recording with partial receive support
- Event publishing for inventory, finance, and logistics integration

## Key Business Rules

- Requisitions require at least one line item
- Only APPROVED requisitions can be converted to orders
- Orders must be ISSUED before goods can be received
- Receipt quantity cannot exceed remaining order line quantity
- Order status auto-updates to PARTIALLY_RECEIVED or RECEIVED

## Permissions

- `procurement:read/manage:vendors`
- `procurement:read/manage:requisitions`
- `procurement:read/manage:orders`
- `procurement:read/manage:receipts`

## Dependencies

PostgreSQL (`nddtp_procurement`), Redis (DB 15), RabbitMQ, Auth Service (JWT)
