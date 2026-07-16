# NDDTP Medical Service — Database Design

## Database: `nddtp_medical`

| Table | Purpose |
|-------|---------|
| `medical_facilities` | Clinic/hospital catalog |
| `medical_appointments` | Appointment scheduling and workflow |
| `medical_records` | Health record entries |
| `fitness_assessments` | Fitness-for-duty classifications |
| `medical_certificates` | Sick leave, fitness, clearance certificates |

### Appointment Workflow

```
SCHEDULED → CONFIRMED → IN_PROGRESS → COMPLETED
     ↘ CANCELLED    ↘ NO_SHOW
```

### Certificate Workflow

```
DRAFT → ISSUED → REVOKED / EXPIRED
```

### Events

`medical.facility.created`, `medical.appointment.scheduled/confirmed/completed/cancelled`, `medical.record.created`, `medical.fitness.assessed`, `medical.certificate.issued/revoked`
