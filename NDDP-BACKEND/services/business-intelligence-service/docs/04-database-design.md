# NDDTP Business Intelligence Service — Database Design

## Database Name

`nddtp_business_intelligence`

## ERD

```
bi_datasets (1) ──────< semantic_models (N) ──────< bi_report_definitions (N)
                                                          │
                                                          └──────< bi_report_executions (N)
```

## Tables

### bi_datasets

**Purpose:** Registered BI data sources and marts.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| source_type | data_source_type_enum | NOT NULL |
| schema | JSONB | nullable |
| status | dataset_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### semantic_models

**Purpose:** OLAP-style models with dimensions and measures.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| dataset_id | UUID | FK → bi_datasets |
| dimensions | JSONB | NOT NULL, DEFAULT '[]' |
| measures | JSONB | NOT NULL, DEFAULT '[]' |
| status | model_status_enum | NOT NULL, DEFAULT 'DRAFT' |

### bi_report_definitions

**Purpose:** BI report templates linked to semantic models.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| model_id | UUID | FK → semantic_models |
| report_type | bi_report_type_enum | NOT NULL |
| layout | JSONB | nullable |
| status | report_definition_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### bi_report_executions

**Purpose:** Report run execution tracking.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| execution_number | VARCHAR(50) | NOT NULL, UNIQUE |
| report_id | UUID | FK → bi_report_definitions |
| requested_by | UUID | NOT NULL |
| status | execution_status_enum | NOT NULL, DEFAULT 'PENDING' |
| parameters | JSONB | nullable |
| result | JSONB | nullable |
| completed_at | TIMESTAMPTZ | nullable |
