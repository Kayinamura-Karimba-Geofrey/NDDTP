# NDDTP Workflow Service — Database Design

## Database: `nddtp_workflow`

| Table | Purpose |
|-------|---------|
| `workflow_definitions` | Workflow template catalog |
| `workflow_steps` | Approval steps per definition |
| `workflow_instances` | Running workflow instances |
| `workflow_tasks` | Per-step approval tasks |
| `workflow_logs` | Append-only activity log |

### Instance Workflow

```
DRAFT → RUNNING → COMPLETED
              ↘ REJECTED / CANCELLED
```

### Events

`workflow.definition.created`, `workflow.instance.started/completed/rejected/cancelled`, `workflow.task.assigned/approved/rejected`
