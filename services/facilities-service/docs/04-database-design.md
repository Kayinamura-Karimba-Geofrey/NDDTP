# NDDTP Facilities Service — Database Design

## Database: `nddtp_facilities`

| Table | Purpose |
|-------|---------|
| `facility_types` | Facility type catalog |
| `facilities` | Registered facilities and buildings |
| `facility_spaces` | Bookable spaces within facilities |
| `space_bookings` | Space booking requests and reservations |
| `booking_logs` | Append-only booking activity log |

### Booking Workflow

```
PENDING → APPROVED → ACTIVE → COMPLETED
      ↘ REJECTED / CANCELLED
```

### Events

`facilities.type.created`, `facilities.facility.created`, `facilities.space.created`, `facilities.booking.submitted/approved/rejected/completed`
