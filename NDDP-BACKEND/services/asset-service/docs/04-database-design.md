# NDDTP Asset Service — Database Design

## Database: `nddtp_asset`

| Table | Purpose |
|-------|---------|
| `asset_categories` | Asset type catalog |
| `assets` | Asset registry with lifecycle status |
| `asset_assignments` | Personnel assignments |
| `asset_movements` | Append-only movement log |
| `asset_audits` | Unit audit records |

### Asset Lifecycle

```
REGISTERED → AVAILABLE → ASSIGNED → AVAILABLE
                ↘ IN_MAINTENANCE → AVAILABLE / DISPOSED
                ↘ DISPOSED / LOST
```

### Events

`asset.category.created`, `asset.registered`, `asset.assigned/returned/transferred/disposed`, `asset.audit.completed`
