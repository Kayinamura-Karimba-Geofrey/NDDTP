# NDDTP Reporting Service — Database Design

## Database: `nddtp_reporting`

| Table | Purpose |
|-------|---------|
| `report_definitions` | Report template catalog |
| `report_schedules` | Recurring report schedules |
| `report_requests` | Report generation requests |
| `report_outputs` | Generated report artifacts |

### Request Workflow

```
PENDING → PROCESSING → COMPLETED
                    ↘ FAILED / CANCELLED
```

### Events

`reporting.definition.created`, `reporting.request.submitted/processing/completed/failed`, `reporting.schedule.created`
