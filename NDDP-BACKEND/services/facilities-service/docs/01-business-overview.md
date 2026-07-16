# NDDTP Facilities Service — Business Overview

## Purpose

The Facilities Service manages defence infrastructure — facility types, facilities, bookable spaces, and space booking workflows for barracks, offices, training grounds, and other installations.

## Responsibilities

- Facility type catalog (barracks, office, training, medical, warehouse)
- Facility registration and status tracking
- Space management within facilities (rooms, halls, offices)
- Space booking workflow (submit → approve/reject → activate → complete)
- Booking conflict detection and capacity enforcement
- Append-only booking activity logs
- Event publishing for cross-service integration

## Key Business Rules

- Spaces must be AVAILABLE to accept new bookings
- Attendees cannot exceed space capacity
- Overlapping bookings for the same space are blocked (PENDING, APPROVED, ACTIVE)
- Bookings must start in the future with end time after start time
- Only the booking owner can cancel (unless staff with manage permission)
- All status changes create booking log entries

## Booking Workflow

```
PENDING → APPROVED → ACTIVE → COMPLETED
      ↘ REJECTED / CANCELLED
```

## Permissions

- `facilities:read/manage:types`
- `facilities:read/manage:facilities`
- `facilities:read/manage:spaces`
- `facilities:read/manage:bookings`

## Dependencies

PostgreSQL (`nddtp_facilities`), Redis (DB 18), RabbitMQ, Auth Service (JWT)
