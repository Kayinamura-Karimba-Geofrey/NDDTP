# NDDTP Announcement Service — Database Design

## Database Name

`nddtp_announcement`

## ERD

```
announcement_categories (1) ──────< announcements (N)
                                        │
                                        ├──────< announcement_audiences (N)
                                        └──────< announcement_acknowledgements (N)
```

## Tables

### announcement_categories

**Purpose:** Announcement classification catalog.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| status | category_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### announcements

**Purpose:** Official announcements with publish lifecycle.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| reference_number | VARCHAR(50) | NOT NULL, UNIQUE |
| category_id | UUID | FK → announcement_categories |
| title | VARCHAR(300) | NOT NULL |
| content | TEXT | NOT NULL |
| priority | announcement_priority_enum | NOT NULL, DEFAULT 'NORMAL' |
| status | announcement_status_enum | NOT NULL, DEFAULT 'DRAFT' |
| audience_type | audience_type_enum | NOT NULL, DEFAULT 'ALL' |
| expires_at | TIMESTAMPTZ | nullable |

### announcement_audiences

**Purpose:** Additional audience targeting rules.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| announcement_id | UUID | FK → announcements |
| audience_type | VARCHAR(50) | NOT NULL |
| audience_ref | VARCHAR(100) | NOT NULL |

### announcement_acknowledgements

**Purpose:** User read/acknowledgement records.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| announcement_id | UUID | FK → announcements |
| user_id | UUID | NOT NULL |
| acknowledged_at | TIMESTAMPTZ | NOT NULL |
| UNIQUE | (announcement_id, user_id) | |
