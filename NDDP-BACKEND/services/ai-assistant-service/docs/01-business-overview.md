# NDDTP AI Assistant Service — Business Overview

## Purpose

The AI Assistant Service provides intelligent conversational capabilities for the National Defence Digital Transformation Platform — AI agent management, conversation sessions, and message handling.

## Responsibilities

- AI agent/persona catalog management (General, HR, Operations)
- Conversation session lifecycle per user
- User and assistant message storage and generation tracking
- Event publishing for AI assistant activity

## Key Business Rules

- Only ACTIVE agents accept new conversations
- Users can only access their own conversations
- Messages can only be sent to ACTIVE conversations
- Assistant messages follow: PENDING → COMPLETED / FAILED
- Conversation lifecycle: ACTIVE → CLOSED → ARCHIVED

## Conversation Workflow

```
ACTIVE → CLOSED → ARCHIVED
       ↘ ARCHIVED
```

## Message Workflow (Assistant)

```
PENDING → COMPLETED
       ↘ FAILED
```

## Permissions

- `aiassistant:read/manage:agents`
- `aiassistant:read/manage:conversations`
- `aiassistant:read/manage:messages`

## Dependencies

PostgreSQL (`nddtp_ai_assistant`), Redis (DB 34), RabbitMQ, Auth Service (JWT)
