# NDDTP Authorization Service — Business Overview

## Purpose

Central RBAC (Role-Based Access Control) engine for NDDTP. Manages roles, permissions, user-role assignments, and real-time authorization decisions across all platform microservices.

## Responsibilities

- Role lifecycle management (CRUD, hierarchy, system roles)
- Permission registry (`module:action:resource` format)
- Role-permission mapping
- User-role assignments with optional organizational scope
- Authorization decision engine with caching
- Decision audit logging
- Event-driven integration with Auth and User services

## Business Rules

| Rule | Description |
|------|-------------|
| BR-AUTHZ-001 | Permission codes follow `module:action:resource` format |
| BR-AUTHZ-002 | System roles/permissions cannot be deleted |
| BR-AUTHZ-003 | Child roles inherit parent role permissions |
| BR-AUTHZ-004 | New users receive EMPLOYEE role on registration |
| BR-AUTHZ-005 | User deactivation revokes all role assignments |
| BR-AUTHZ-006 | SUPER_ADMIN bypasses all permission checks |
| BR-AUTHZ-007 | Scoped assignments limit access to org/dept/unit |
| BR-AUTHZ-008 | All denied access attempts are logged and published |

## Dependencies

- PostgreSQL, Redis, RabbitMQ
- Authentication Service (JWT validation, `auth.user.registered` events)
- User Service (`user.user.deleted`, `user.user.deactivated` events)
- Audit Service (consumes authorization events)
