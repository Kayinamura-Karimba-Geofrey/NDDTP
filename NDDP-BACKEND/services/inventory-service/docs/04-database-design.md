# NDDTP Inventory Service — Database Design

## Database: `nddtp_inventory`

| Table | Purpose |
|-------|---------|
| `warehouses` | Storage location catalog |
| `inventory_items` | SKU/item master data |
| `stock_levels` | Quantity per warehouse/item |
| `stock_movements` | Append-only stock transaction log |
| `stock_requests` | Requisition workflow |

### Request Workflow

```
PENDING → APPROVED → FULFILLED
    ↘ REJECTED / CANCELLED
```

### Events

`inventory.warehouse.created`, `inventory.item.created`, `inventory.stock.received/issued/adjusted`, `inventory.request.submitted/approved/fulfilled`
