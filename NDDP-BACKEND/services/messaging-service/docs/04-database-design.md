# NDDTP Messaging Service — Database Design

## Database Name

`nddtp_messaging`

## ERD

```
message_channels (1) ──────< channel_members (N)
        │
        └──────< messages (N) ──────< message_receipts (N)
```

## Tables

### message_channels

**Purpose:** Communication channels for messaging.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| channel_type | channel_type_enum | NOT NULL |
| created_by | UUID | NOT NULL |
| status | channel_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### channel_members

**Purpose:** Channel membership and roles.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| channel_id | UUID | FK → message_channels |
| user_id | UUID | NOT NULL |
| role | member_role_enum | NOT NULL, DEFAULT 'MEMBER' |
| UNIQUE | (channel_id, user_id) | |

### messages

**Purpose:** Messages sent within channels.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| channel_id | UUID | FK → message_channels |
| sender_id | UUID | NOT NULL |
| content | TEXT | NOT NULL |
| message_type | message_type_enum | NOT NULL, DEFAULT 'TEXT' |
| status | message_status_enum | NOT NULL, DEFAULT 'SENT' |

### message_receipts

**Purpose:** Per-recipient delivery and read acknowledgements.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| message_id | UUID | FK → messages |
| recipient_id | UUID | NOT NULL |
| status | receipt_status_enum | NOT NULL |
| acknowledged_at | TIMESTAMPTZ | NOT NULL |
| UNIQUE | (message_id, recipient_id) | |
