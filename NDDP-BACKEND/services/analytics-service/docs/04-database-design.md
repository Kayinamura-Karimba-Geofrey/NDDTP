# NDDTP Analytics Service — Database Design

## Database Name

`nddtp_analytics`

## ERD

```
metric_definitions (1) ──────< metric_snapshots (N)

dashboards (standalone, widgets JSONB)

analytics_queries (standalone)
```

## Tables

### metric_definitions

**Purpose:** Catalog of KPI/metric definitions.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| domain | metric_domain_enum | NOT NULL |
| aggregation_type | aggregation_type_enum | NOT NULL |
| unit | VARCHAR(50) | nullable |
| description | TEXT | nullable |
| status | metric_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### metric_snapshots

**Purpose:** Time-series metric values.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| metric_id | UUID | FK → metric_definitions |
| period_start | TIMESTAMPTZ | NOT NULL |
| period_end | TIMESTAMPTZ | NOT NULL |
| value | DECIMAL(18,4) | NOT NULL |
| dimensions | JSONB | nullable |
| recorded_at | TIMESTAMPTZ | NOT NULL |

### dashboards

**Purpose:** Dashboard layouts with embedded widget configuration.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| created_by | UUID | NOT NULL |
| status | dashboard_status_enum | NOT NULL, DEFAULT 'DRAFT' |
| widgets | JSONB | NOT NULL, DEFAULT '[]' |

### analytics_queries

**Purpose:** Ad-hoc analytics query execution tracking.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| query_number | VARCHAR(50) | NOT NULL, UNIQUE |
| requested_by | UUID | NOT NULL |
| status | query_status_enum | NOT NULL, DEFAULT 'PENDING' |
| parameters | JSONB | nullable |
| result | JSONB | nullable |
| error_message | TEXT | nullable |
| completed_at | TIMESTAMPTZ | nullable |
