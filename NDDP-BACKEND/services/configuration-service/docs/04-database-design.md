# NDDTP Configuration Service — Database Design

## Database Name

`nddtp_configuration`

## ERD

```
config_namespaces (1) ──────< config_entries (N) ──────< config_revisions (N)

config_overrides (standalone)
```

## Tables

### config_namespaces

**Purpose:** Logical grouping of configuration settings.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| status | namespace_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### config_entries

**Purpose:** Individual configuration key-value entries.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| namespace_id | UUID | FK → config_namespaces |
| key | VARCHAR(200) | NOT NULL |
| value | TEXT | NOT NULL |
| value_type | entry_value_type_enum | NOT NULL |
| status | entry_status_enum | NOT NULL, DEFAULT 'DRAFT' |
| environment | environment_scope_enum | NOT NULL, DEFAULT 'ALL' |
| UNIQUE | (namespace_id, key) | |

### config_revisions

**Purpose:** Audit trail of configuration value changes.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| entry_id | UUID | FK → config_entries |
| previous_value | TEXT | nullable |
| new_value | TEXT | NOT NULL |
| changed_by | UUID | NOT NULL |
| version | INT | NOT NULL |

### config_overrides

**Purpose:** Scoped configuration overrides (department, unit, etc.).

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| scope_type | VARCHAR(50) | NOT NULL |
| scope_ref | VARCHAR(100) | NOT NULL |
| entry_key | VARCHAR(200) | NOT NULL |
| value | TEXT | NOT NULL |
| UNIQUE | (scope_type, scope_ref, entry_key) | |
