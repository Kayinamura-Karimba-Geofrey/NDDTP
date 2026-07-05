# NDDTP Search Service — Database Design

## Database Name

`nddtp_search`

## ERD

```
search_indexes (1) ──────< search_documents (N)

search_synonyms (standalone)

search_queries (standalone, optional FK to search_indexes)
```

## Tables

### search_indexes

**Purpose:** Registered searchable content indexes.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| index_type | index_type_enum | NOT NULL |
| status | index_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### search_documents

**Purpose:** Indexed searchable documents.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| index_id | UUID | FK → search_indexes |
| external_id | VARCHAR(100) | NOT NULL |
| title | VARCHAR(500) | NOT NULL |
| content | TEXT | NOT NULL |
| status | document_status_enum | NOT NULL, DEFAULT 'PENDING' |
| UNIQUE | (index_id, external_id) | |

### search_synonyms

**Purpose:** Query expansion synonym mappings.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| term | VARCHAR(100) | NOT NULL, UNIQUE |
| synonyms | JSONB | NOT NULL |

### search_queries

**Purpose:** Search query execution records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| query_number | VARCHAR(50) | NOT NULL, UNIQUE |
| requested_by | UUID | NOT NULL |
| index_id | UUID | FK → search_indexes, nullable |
| query | VARCHAR(500) | NOT NULL |
| status | query_status_enum | NOT NULL, DEFAULT 'PENDING' |
| hit_count | INT | NOT NULL, DEFAULT 0 |
| results | JSONB | nullable |
