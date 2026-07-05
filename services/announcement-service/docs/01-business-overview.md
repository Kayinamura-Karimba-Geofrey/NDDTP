# NDDTP Announcement Service — Business Overview

## Purpose

The Announcement Service manages official defence platform communications — categorized announcements, targeted publishing, and personnel acknowledgement tracking.

## Responsibilities

- Announcement category catalog
- Draft announcement creation with audience targeting
- Publishing workflow with priority levels and expiry
- User acknowledgement tracking for published announcements
- Event publishing for notifications and audit integration

## Key Business Rules

- Only ACTIVE categories accept new announcements
- Targeted announcements require an audience reference
- Publish workflow: DRAFT → PUBLISHED → EXPIRED / WITHDRAWN
- Only published announcements can be acknowledged
- Each user can acknowledge an announcement only once
- Only creator or publisher can withdraw an announcement

## Publish Workflow

```
DRAFT → PUBLISHED → EXPIRED
              ↘ WITHDRAWN
```

## Permissions

- `announcement:read/manage:categories`
- `announcement:read/manage:announcements`
- `announcement:read:acknowledgements`

## Dependencies

PostgreSQL (`nddtp_announcement`), Redis (DB 27), RabbitMQ, Auth Service (JWT)
