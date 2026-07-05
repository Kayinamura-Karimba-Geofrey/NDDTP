# NDDTP Integration Service — Database Design

## Database Name

`nddtp_integration`

## ERD

```
integration_connectors (1) ──────< integration_endpoints (N)

integration_connectors (1) ──────< integration_jobs (N)
integration_endpoints (1) ──────< integration_jobs (N)

integration_jobs (1) ──────< integration_job_logs (N)
```

## Tables

### integration_connectors

**Purpose:** External system connection definitions.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| connector_type | connector_type_enum | NOT NULL |
| base_url | VARCHAR(500) | NOT NULL |
| config | JSONB | nullable |
| status | connector_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### integration_endpoints

**Purpose:** API endpoint mappings per connector.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| connector_id | UUID | FK → integration_connectors |
| code | VARCHAR(50) | NOT NULL |
| path | VARCHAR(500) | NOT NULL |
| http_method | http_method_enum | NOT NULL, DEFAULT 'GET' |
| mapping | JSONB | nullable |
| status | endpoint_status_enum | NOT NULL, DEFAULT 'ACTIVE' |
| UNIQUE | (connector_id, code) | |

### integration_jobs

**Purpose:** Sync/integration job execution records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| job_number | VARCHAR(50) | NOT NULL, UNIQUE |
| connector_id | UUID | FK → integration_connectors |
| endpoint_id | UUID | FK → integration_endpoints |
| submitted_by | UUID | NOT NULL |
| status | job_status_enum | NOT NULL, DEFAULT 'PENDING' |
| payload | JSONB | nullable |

### integration_job_logs

**Purpose:** Execution log entries for integration jobs.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| job_id | UUID | FK → integration_jobs |
| level | log_level_enum | NOT NULL, DEFAULT 'INFO' |
| message | TEXT | NOT NULL |
| metadata | JSONB | nullable |
