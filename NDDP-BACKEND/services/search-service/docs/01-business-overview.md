# NDDTP Search Service — Business Overview

## Purpose

The Search Service provides platform-wide full-text search — index management, document indexing, and query execution across defence data domains.

## Responsibilities

- Search index catalog (personnel, documents, assets, announcements)
- Document indexing with metadata and external ID mapping
- Full-text search query execution with ranked results
- Synonym support for query expansion (schema ready)
- Event publishing for indexing pipelines and audit integration

## Key Business Rules

- Only ACTIVE indexes accept new documents
- External IDs must be unique per index
- Search queries execute immediately on submission
- Empty queries are rejected
- Optional index scoping limits search to a single index
- Deleted documents are excluded from search results

## Query Workflow

```
PENDING → COMPLETED
       ↘ FAILED
```

## Permissions

- `search:read/manage:indexes`
- `search:read/manage:documents`
- `search:read/manage:queries`

## Dependencies

PostgreSQL (`nddtp_search`), Redis (DB 28), RabbitMQ, Auth Service (JWT)
