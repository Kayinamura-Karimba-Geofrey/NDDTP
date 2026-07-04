# NDDTP Performance Service — Database Design

## Database: `nddtp_performance`

| Table | Purpose |
|-------|---------|
| `performance_cycles` | Review period catalog |
| `rating_criteria` | Competency rating criteria |
| `performance_goals` | Employee goals per cycle |
| `performance_reviews` | Review workflow and assessments |
| `review_ratings` | Per-criteria ratings per review |
| `improvement_plans` | Performance improvement plans |

### Review Workflow

```
DRAFT → SELF_SUBMITTED → MANAGER_REVIEW → APPROVED → FINALIZED
              ↘ REJECTED → DRAFT
```

### Improvement Plan Workflow

```
DRAFT → ACTIVE → COMPLETED
  ↘ CANCELLED
```

### Events

`performance.cycle.created`, `performance.goal.created/completed`, `performance.review.submitted/approved/finalized`, `performance.plan.created/activated/completed`
