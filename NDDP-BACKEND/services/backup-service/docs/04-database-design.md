# NDDTP Backup Service — Database Design

## Database Name

`nddtp_backup`

## ERD

```
backup_policies (1) ──────< backup_jobs (N) ──────< backup_restores (N)
```

## Tables

### backup_policies

**Purpose:** Backup policy definitions with schedule and retention.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| backup_type | backup_type_enum | NOT NULL |
| target_type | target_type_enum | NOT NULL |
| schedule | VARCHAR(100) | NOT NULL |
| retention_days | INT | NOT NULL, DEFAULT 30 |
| status | policy_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### backup_jobs

**Purpose:** Backup job execution records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| job_number | VARCHAR(50) | NOT NULL, UNIQUE |
| policy_id | UUID | FK → backup_policies |
| initiated_by | UUID | NOT NULL |
| status | job_status_enum | NOT NULL, DEFAULT 'PENDING' |
| backup_path | VARCHAR(500) | nullable |
| size_bytes | BIGINT | nullable |

### backup_restores

**Purpose:** Restore operation records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| restore_number | VARCHAR(50) | NOT NULL, UNIQUE |
| job_id | UUID | FK → backup_jobs |
| requested_by | UUID | NOT NULL |
| status | restore_status_enum | NOT NULL, DEFAULT 'PENDING' |
| target_path | VARCHAR(500) | nullable |
