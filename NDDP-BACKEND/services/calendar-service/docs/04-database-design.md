# NDDTP Calendar Service — Database Design

## Database: `nddtp_calendar`

| Table | Purpose |
|-------|---------|
| `calendars` | Calendar catalog |
| `calendar_events` | Scheduled events |
| `event_attendees` | Attendee invitations and RSVP status |

### Event Workflow

```
DRAFT → SCHEDULED → COMPLETED
              ↘ CANCELLED
```

### Events

`calendar.calendar.created`, `calendar.event.scheduled/cancelled/completed`, `calendar.attendee.invited/responded`
