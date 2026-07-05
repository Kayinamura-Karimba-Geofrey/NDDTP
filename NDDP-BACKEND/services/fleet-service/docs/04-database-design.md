# NDDTP Fleet Service — Database Design

## Database: `nddtp_fleet`

| Table | Purpose |
|-------|---------|
| `vehicle_types` | Vehicle category catalog |
| `vehicles` | Fleet vehicle registry |
| `vehicle_assignments` | Driver assignment records |
| `trip_logs` | Trip/mileage/fuel logs |
| `vehicle_inspections` | Safety inspection records |

### Vehicle Lifecycle

```
REGISTERED → AVAILABLE ↔ ASSIGNED
                ↕ IN_MAINTENANCE / OUT_OF_SERVICE → DECOMMISSIONED
```

### Events

`fleet.type.created`, `fleet.vehicle.registered/assigned/returned`, `fleet.trip.logged`, `fleet.inspection.completed`
