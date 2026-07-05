# NDDTP Messaging Service — Business Overview

## Purpose

The Messaging Service manages secure internal communications for National Defence personnel — channels, membership, messages, and delivery/read tracking.

## Responsibilities

- Messaging channel management (direct, group, department, broadcast)
- Channel membership with role-based access (owner, admin, member)
- Message sending and retrieval within channels
- Delivery and read receipt tracking
- Event publishing for notifications and audit integration

## Key Business Rules

- DIRECT channels require exactly one other member besides the creator
- Only channel members can send or read messages
- Only owners/admins can add members to group channels
- Archived channels block new messages and member additions
- Message workflow: SENT → DELIVERED → READ (or FAILED / DELETED)
- Users can only delete their own messages

## Message Workflow

```
SENT → DELIVERED → READ
    ↘ FAILED / DELETED
```

## Permissions

- `messaging:read/manage:channels`
- `messaging:read/manage:messages`
- `messaging:read:members`

## Dependencies

PostgreSQL (`nddtp_messaging`), Redis (DB 26), RabbitMQ, Auth Service (JWT)
