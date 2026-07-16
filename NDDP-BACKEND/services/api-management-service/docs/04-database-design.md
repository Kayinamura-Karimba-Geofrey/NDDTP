# NDDTP API Management Service — Database Design

## Database Name

`nddtp_api_management`

## ERD

```
api_products (1) ──────< api_routes (N)

api_consumers (1) ──────< api_keys (N)
```

## Tables

### api_products

**Purpose:** API product catalog definitions.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| version | VARCHAR(20) | NOT NULL, DEFAULT 'v1' |
| base_path | VARCHAR(200) | NOT NULL |
| protocol | api_protocol_enum | NOT NULL, DEFAULT 'REST' |
| status | product_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### api_routes

**Purpose:** Route mappings per API product.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| product_id | UUID | FK → api_products |
| code | VARCHAR(50) | NOT NULL |
| path | VARCHAR(500) | NOT NULL |
| http_method | http_method_enum | NOT NULL |
| upstream_url | VARCHAR(500) | NOT NULL |
| status | route_status_enum | NOT NULL, DEFAULT 'ACTIVE' |
| UNIQUE | (product_id, code) | |

### api_consumers

**Purpose:** Registered API consumer applications.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| contact_email | VARCHAR(200) | nullable |
| status | consumer_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### api_keys

**Purpose:** Issued API keys per consumer.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| consumer_id | UUID | FK → api_consumers |
| key_prefix | VARCHAR(20) | NOT NULL, UNIQUE |
| key_hash | VARCHAR(128) | NOT NULL |
| status | api_key_status_enum | NOT NULL, DEFAULT 'ACTIVE' |
| issued_by | UUID | NOT NULL |
| expires_at | TIMESTAMPTZ | nullable |
