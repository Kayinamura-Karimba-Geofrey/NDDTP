# NDDTP Authorization Service — Database Design

**Database:** `nddtp_authorization`

## Tables

| Table | Purpose |
|-------|---------|
| `roles` | Role definitions with hierarchy (parent_role_id) |
| `permissions` | Permission registry (module:action:resource) |
| `role_permissions` | Many-to-many role ↔ permission grants |
| `user_role_assignments` | User ↔ role with scope and expiry |
| `authorization_decision_logs` | Audit trail of allow/deny decisions |

## System Seed Data

**Roles:** SUPER_ADMIN, ADMIN, HR_MANAGER, RECRUITER, EMPLOYEE, AUDITOR

**Permissions:** 12 system permissions across authorization, personnel, leave, recruitment, finance, audit modules.

Run seed: `npm run seed`
