# NDDTP Logistics Service — Database Design

## Database: `nddtp_logistics`

| Table | Purpose |
|-------|---------|
| `logistics_locations` | Pickup/delivery point catalog |
| `transport_routes` | Route definitions between locations |
| `shipments` | Transport orders with lifecycle |
| `shipment_items` | Cargo manifest lines |
| `shipment_tracking` | Append-only tracking event log |

### Shipment Workflow

```
DRAFT → SCHEDULED → DISPATCHED → IN_TRANSIT → DELIVERED
                              ↘ DELAYED → IN_TRANSIT/DELIVERED
         Any pre-delivery → CANCELLED
         IN_TRANSIT/DISPATCHED → FAILED
```

### Events

`logistics.location.created`, `logistics.route.created`, `logistics.shipment.created/scheduled/dispatched/delivered/cancelled`, `logistics.tracking.updated`
