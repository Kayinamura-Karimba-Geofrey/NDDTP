# NDDTP Personnel Service — Database Design

## Database: `nddtp_personnel`

### Tables

| Table | Purpose |
|-------|---------|
| `personnel_records` | Core HR record linked to platform user |
| `ranks` | Rank catalog (code, level, category) |
| `rank_history` | Promotion/demotion timeline |
| `units` | Organizational unit hierarchy |
| `assignments` | Personnel-to-unit position assignments |
| `qualifications` | Qualification/certification catalog |
| `personnel_qualifications` | Personnel-held qualifications |
| `service_history` | Service milestone events |

### Key Relationships

- `personnel_records.user_id` → User Service (logical FK, no cross-DB constraint)
- `rank_history` → `personnel_records` + `ranks`
- `assignments` → `personnel_records` + `units`
- `units.parent_unit_id` → self-referential hierarchy
- `personnel_qualifications` → `personnel_records` + `qualifications`

### Redis (DB 5)

- `personnel:record:{id}` — full personnel detail (TTL 900s)
- `personnel:user:{userId}` — lookup cache
- `personnel:unit:{id}` — unit detail cache

### RabbitMQ

**Consumes:** `user.user.created`, `user.user.updated`, `user.user.deactivated`, `user.user.deleted`

**Publishes:** `personnel.record.created`, `personnel.record.updated`, `personnel.record.separated`, `personnel.rank.promoted`, `personnel.assignment.created`, `personnel.assignment.ended`, `personnel.qualification.added`, `personnel.service.event.recorded`
