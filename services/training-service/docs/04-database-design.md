# NDDTP Training Service — Database Design

## Database: `nddtp_training`

| Table | Purpose |
|-------|---------|
| `training_courses` | Course catalog |
| `training_sessions` | Scheduled course instances |
| `training_enrollments` | Enrollment requests and workflow |
| `session_attendance` | Daily attendance records |
| `training_certifications` | Completion certificates |

### Enrollment Workflow

```
PENDING → APPROVED → ENROLLED → IN_PROGRESS → COMPLETED
    ↘ REJECTED              ↘ WITHDRAWN / CANCELLED
```

### Session Workflow

```
SCHEDULED → IN_PROGRESS → COMPLETED
     ↘ CANCELLED
```

### Events

`training.course.created`, `training.session.scheduled`, `training.enrollment.submitted/approved/rejected/completed`, `training.attendance.recorded`, `training.certification.issued`
