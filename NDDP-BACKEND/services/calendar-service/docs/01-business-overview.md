# NDDTP Calendar Service — Business Overview

## Purpose

The Calendar Service manages defence scheduling — organizational calendars, events, attendee invitations, and RSVP tracking for meetings, training, ceremonies, and leave blocks.

## Responsibilities

- Calendar catalog (organizational, department, personal)
- Event creation and scheduling with conflict detection
- Attendee invitation and RSVP management
- Date-range event queries
- Event publishing for notification and workflow integration

## Key Business Rules

- Events must have end time after start time
- Scheduling requires future start time
- Overlapping scheduled events on same calendar are blocked
- Attendee schedule conflicts blocked on invite and accept
- Only SCHEDULED events accept attendee invitations
- RSVP responses: ACCEPTED, DECLINED, or TENTATIVE

## Event Workflow

```
DRAFT → SCHEDULED → COMPLETED
              ↘ CANCELLED
```

## Permissions

- `calendar:read/manage:calendars`
- `calendar:read/manage:events`
- `calendar:read/manage:attendees`

## Dependencies

PostgreSQL (`nddtp_calendar`), Redis (DB 22), RabbitMQ, Auth Service (JWT)
