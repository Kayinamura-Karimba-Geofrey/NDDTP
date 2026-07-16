# NDDTP Leave Service — Database Design

## Database: `nddtp_leave`

| Table | Purpose |
|-------|---------|
| `leave_types` | Leave category catalog with accrual rules |
| `leave_balances` | Per-user, per-type, per-year balance tracking |
| `leave_requests` | Leave applications with approval workflow |
| `leave_approvals` | Approver decisions with comments |
| `leave_status_history` | Append-only status change audit |

### Balance Model

`available = total_days - used_days - pending_days`

- **Submit:** `pending_days += total_days`
- **Approve:** `pending_days -= total_days`, `used_days += total_days`
- **Reject/Cancel:** `pending_days -= total_days`

### Events

`leave.request.submitted/approved/rejected/cancelled`, `leave.balance.updated`
