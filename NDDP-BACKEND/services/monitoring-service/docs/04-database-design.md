# NDDTP Monitoring Service — Database Design

## Database Name

`nddtp_monitoring`

## ERD

```
monitoring_targets (1) ──────< monitoring_checks (N) ──────< monitoring_alerts (N)
```

## Tables

### monitoring_targets

**Purpose:** Registered monitoring targets.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| target_type | target_type_enum | NOT NULL |
| endpoint_url | VARCHAR(500) | NOT NULL |
| check_interval_seconds | INT | NOT NULL, DEFAULT 60 |
| status | target_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### monitoring_checks

**Purpose:** Health check execution records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| check_number | VARCHAR(50) | NOT NULL, UNIQUE |
| target_id | UUID | FK → monitoring_targets |
| initiated_by | UUID | NOT NULL |
| status | check_status_enum | NOT NULL, DEFAULT 'PENDING' |
| response_time_ms | INT | nullable |
| status_code | INT | nullable |

### monitoring_alerts

**Purpose:** Alert incidents from failed checks.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| alert_number | VARCHAR(50) | NOT NULL, UNIQUE |
| check_id | UUID | FK → monitoring_checks |
| severity | alert_severity_enum | NOT NULL, DEFAULT 'WARNING' |
| status | alert_status_enum | NOT NULL, DEFAULT 'OPEN' |
| message | TEXT | NOT NULL |
