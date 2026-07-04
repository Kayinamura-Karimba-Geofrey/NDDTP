# NDDTP Procurement Service — Database Design

## Database: `nddtp_procurement`

| Table | Purpose |
|-------|---------|
| `vendors` | Supplier catalog |
| `purchase_requisitions` | Internal buy requests |
| `requisition_items` | Requisition line items |
| `purchase_orders` | Vendor purchase orders |
| `purchase_order_items` | Order line items with received qty |
| `goods_receipts` | Goods receipt records |

### Requisition Workflow

```
DRAFT → SUBMITTED → APPROVED → ORDERED
              ↘ REJECTED / CANCELLED
```

### Order Workflow

```
DRAFT → ISSUED → PARTIALLY_RECEIVED → RECEIVED
```

### Events

`procurement.vendor.created`, `procurement.requisition.submitted/approved/rejected`, `procurement.order.created/issued`, `procurement.receipt.recorded`
