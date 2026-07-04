# NDDTP Notification Service

**Port:** 3004 | **Database:** `nddtp_notification`

Multi-channel notification delivery: Email (SMTP/Nodemailer), In-App inbox, SMS/Push stubs.

## Event-Driven Notifications

| Platform Event | Template | Channel |
|----------------|----------|---------|
| `auth.user.password.reset.requested` | PASSWORD_RESET | EMAIL |
| `auth.user.account.locked` | ACCOUNT_LOCKED | EMAIL |
| `user.user.created` | WELCOME | EMAIL |
| `authorization.role.assigned` | ROLE_ASSIGNED | IN_APP |
| `auth.user.mfa.enabled` | MFA_ENABLED | EMAIL |

## Published Events

`notification.sent`, `notification.delivered`, `notification.failed`, `notification.read`
