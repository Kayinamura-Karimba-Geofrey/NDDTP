# NDDTP AI Assistant Service — Database Design

## Database Name

`nddtp_ai_assistant`

## ERD

```
ai_agents (1) ──────< ai_conversations (N) ──────< ai_messages (N)
```

## Tables

### ai_agents

**Purpose:** AI assistant agent/persona definitions.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(200) | NOT NULL |
| agent_type | agent_type_enum | NOT NULL |
| model_name | VARCHAR(100) | NOT NULL, DEFAULT 'gpt-4' |
| system_prompt | TEXT | NOT NULL |
| status | agent_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### ai_conversations

**Purpose:** User conversation sessions with an agent.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| conversation_number | VARCHAR(50) | NOT NULL, UNIQUE |
| agent_id | UUID | FK → ai_agents |
| user_id | UUID | NOT NULL |
| title | VARCHAR(200) | nullable |
| status | conversation_status_enum | NOT NULL, DEFAULT 'ACTIVE' |

### ai_messages

**Purpose:** Individual messages within a conversation.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| conversation_id | UUID | FK → ai_conversations |
| role | message_role_enum | NOT NULL |
| content | TEXT | NOT NULL |
| status | message_status_enum | NOT NULL, DEFAULT 'COMPLETED' |
| token_count | INT | nullable |
