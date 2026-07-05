# NDDTP Visitor Service — Database Design

## Database: `nddtp_visitor`

| Table | Purpose |
|-------|---------|
| `visit_sites` | Gates and entry points |
| `visitors` | Registered visitor profiles |
| `visit_requests` | Visit approval workflow |
| `check_in_logs` | Check-in/check-out activity log |

### Visit Workflow

```
PENDING → APPROVED → ACTIVE → COMPLETED
      ↘ REJECTED / CANCELLED
```

### Events

`visitor.site.created`, `visitor.visitor.registered`, `visitor.visit.submitted/approved/rejected/completed`, `visitor.checkin.recorded`
