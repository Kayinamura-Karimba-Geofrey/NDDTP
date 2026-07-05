# NDDTP Maintenance Service — Database Design

## Database: `nddtp_maintenance`

| Table | Purpose |
|-------|---------|
| `maintenance_categories` | Maintenance type catalog |
| `maintenance_requests` | Upkeep requests for assets |
| `work_orders` | Approved work orders |
| `work_order_tasks` | Task breakdown per work order |
| `maintenance_logs` | Append-only activity log |

### Request Workflow

```
SUBMITTED → APPROVED → IN_PROGRESS → COMPLETED
        ↘ REJECTED / CANCELLED
```

### Work Order Workflow

```
DRAFT → SCHEDULED → IN_PROGRESS → COMPLETED
```

### Events

`maintenance.category.created`, `maintenance.request.submitted/approved/rejected`, `maintenance.workorder.created/started/completed`, `maintenance.task.completed`
