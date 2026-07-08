export type FleetStatus =
  | 'AVAILABLE' | 'ASSIGNED' | 'ON_TRIP' | 'UNDER_MAINTENANCE' | 'OUT_OF_SERVICE'
  | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS'
  | 'COMPLETED' | 'CANCELLED' | 'SCHEDULED' | 'PASSED' | 'REQUIRES_REPAIR' | 'FAILED'
  | 'OPEN' | 'CLOSED' | 'INVESTIGATING' | 'RETURNED' | 'RETIRED' | 'DRAFT';

export interface Vehicle {
  id: string;
  fleetNumber: string;
  registrationNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  year: number;
  department?: string;
  driver?: string;
  status: FleetStatus;
  location?: string;
  vin?: string;
  color?: string;
  engineNumber?: string;
  purchaseDate?: string;
  odometer?: number;
  fuelType?: string;
  transmission?: string;
  seatingCapacity?: number;
  condition?: string;
}

export interface Driver {
  id: string;
  driverNumber: string;
  personnelNumber: string;
  fullName: string;
  department: string;
  licenseClass: string;
  licenseExpiry: string;
  medicalClearance: string;
  assignment?: string;
  experience: string;
  status: FleetStatus;
}

export interface DriverLicense {
  id: string;
  driver: string;
  category: string;
  expiry: string;
  endorsements?: string;
  restrictions?: string;
  medicalFitness: string;
  status: FleetStatus;
}

export interface VehicleAssignment {
  id: string;
  vehicle: string;
  driver: string;
  department: string;
  assignmentDate: string;
  expectedReturn?: string;
  purpose: string;
  status: FleetStatus;
}

export interface TripRequest {
  id: string;
  tripNumber: string;
  requester: string;
  department: string;
  destination: string;
  purpose: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  priority: string;
  status: FleetStatus;
  vehicle?: string;
  driver?: string;
}

export interface FuelTransaction {
  id: string;
  transactionNumber: string;
  vehicle: string;
  driver: string;
  station: string;
  fuelType: string;
  quantity: number;
  cost: number;
  odometer: number;
  date: string;
}

export interface MaintenanceOrder {
  id: string;
  workOrder: string;
  vehicle: string;
  type: string;
  provider: string;
  date: string;
  cost: number;
  status: FleetStatus;
}

export interface VehicleInspection {
  id: string;
  inspectionNumber: string;
  vehicle: string;
  date: string;
  inspector: string;
  result: FleetStatus;
  notes?: string;
}

export interface FleetIncident {
  id: string;
  incidentNumber: string;
  vehicle: string;
  driver: string;
  date: string;
  location: string;
  description: string;
  severity: string;
  status: FleetStatus;
}

export interface ParkingSlot {
  id: string;
  garage: string;
  slot: string;
  capacity: number;
  occupied: number;
  vehicle?: string;
  type: string;
}

export interface FleetApproval {
  id: string;
  type: string;
  reference: string;
  requester: string;
  submittedDate: string;
  status: FleetStatus;
}

export const FLEET_DASHBOARD_KPIS = {
  totalVehicles: 148,
  activeVehicles: 112,
  underMaintenance: 9,
  tripsToday: 24,
  activeTrips: 11,
  availableDrivers: 38,
  fuelConsumption: '12,450 L',
  accidentReports: 3,
  inspectionCompliance: '94%',
  utilizationRate: '78%',
};

export const FLEET_BY_TYPE = [
  { name: 'Passenger', value: 52 },
  { name: 'Trucks', value: 28 },
  { name: 'Buses', value: 14 },
  { name: 'Motorcycles', value: 22 },
  { name: 'Ambulances', value: 8 },
  { name: 'Utility', value: 24 },
];

export const VEHICLE_STATUS_BREAKDOWN = [
  { name: 'Available', value: 45 },
  { name: 'Assigned', value: 52 },
  { name: 'On Trip', value: 11 },
  { name: 'Maintenance', value: 9 },
  { name: 'Out of Service', value: 5 },
];

export const MONTHLY_FUEL = [
  { month: 'Jan', liters: 9800 }, { month: 'Feb', liters: 10200 },
  { month: 'Mar', liters: 11000 }, { month: 'Apr', liters: 10800 },
  { month: 'May', liters: 11500 }, { month: 'Jun', liters: 12100 },
  { month: 'Jul', liters: 12450 },
];

export const MAINTENANCE_TREND = [
  { month: 'Jan', scheduled: 12, completed: 11 },
  { month: 'Feb', scheduled: 14, completed: 13 },
  { month: 'Mar', scheduled: 10, completed: 10 },
  { month: 'Apr', scheduled: 15, completed: 12 },
  { month: 'May', scheduled: 13, completed: 13 },
  { month: 'Jun', scheduled: 16, completed: 14 },
];

export const UTILIZATION_BY_DEPT = [
  { name: 'HQ', value: 82 },
  { name: 'Medical', value: 91 },
  { name: 'Logistics', value: 76 },
  { name: 'Training', value: 64 },
  { name: 'Security', value: 88 },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'v1', fleetNumber: 'FLT-001', registrationNumber: 'RAD-482-A', vehicleType: 'Passenger', make: 'Toyota', model: 'Land Cruiser', year: 2022, department: 'HQ', driver: 'Jean Bizimana', status: 'ASSIGNED', location: 'HQ Garage A', vin: 'JTEBU5JR5N5123456', color: 'White', engineNumber: '1GD-123456', purchaseDate: '2022-03-15', odometer: 45200, fuelType: 'Diesel', transmission: 'Automatic', seatingCapacity: 7, condition: 'Good' },
  { id: 'v2', fleetNumber: 'FLT-002', registrationNumber: 'RAD-519-B', vehicleType: 'Ambulance', make: 'Toyota', model: 'Hiace Ambulance', year: 2023, department: 'Medical', driver: 'Alice Mukamana', status: 'AVAILABLE', location: 'Medical Bay 1', vin: 'JTFSX22P5P0678901', color: 'White/Red', purchaseDate: '2023-01-20', odometer: 22100, fuelType: 'Diesel', transmission: 'Manual', seatingCapacity: 5, condition: 'Excellent' },
  { id: 'v3', fleetNumber: 'FLT-003', registrationNumber: 'RAD-331-C', vehicleType: 'Truck', make: 'Isuzu', model: 'NPR', year: 2021, department: 'Logistics', driver: 'Eric Habimana', status: 'ON_TRIP', location: 'En route — Nyamata', vin: 'JALNPR85L7K234567', color: 'Blue', purchaseDate: '2021-06-10', odometer: 78500, fuelType: 'Diesel', transmission: 'Manual', seatingCapacity: 3, condition: 'Fair' },
  { id: 'v4', fleetNumber: 'FLT-004', registrationNumber: 'RAD-220-D', vehicleType: 'Bus', make: 'Yutong', model: 'ZK6122', year: 2020, department: 'Training', status: 'UNDER_MAINTENANCE', location: 'Maintenance Bay 2', vin: 'LZYTDTD26L9012345', color: 'Green', purchaseDate: '2020-09-01', odometer: 112000, fuelType: 'Diesel', transmission: 'Manual', seatingCapacity: 45, condition: 'Needs Repair' },
  { id: 'v5', fleetNumber: 'FLT-005', registrationNumber: 'RAD-118-E', vehicleType: 'Motorcycle', make: 'Honda', model: 'CBR150', year: 2024, department: 'Security', driver: 'Patrick Niyonsenga', status: 'ASSIGNED', location: 'Security Post', purchaseDate: '2024-02-14', odometer: 8400, fuelType: 'Petrol', transmission: 'Manual', seatingCapacity: 2, condition: 'Excellent' },
];

export const MOCK_DRIVERS: Driver[] = [
  { id: 'd1', driverNumber: 'DRV-001', personnelNumber: 'PER-1042', fullName: 'Jean Bizimana', department: 'HQ', licenseClass: 'B, C', licenseExpiry: '2027-04-15', medicalClearance: 'Fit', assignment: 'FLT-001', experience: '12 years', status: 'ACTIVE' },
  { id: 'd2', driverNumber: 'DRV-002', personnelNumber: 'PER-1188', fullName: 'Alice Mukamana', department: 'Medical', licenseClass: 'B', licenseExpiry: '2026-09-30', medicalClearance: 'Fit', assignment: 'FLT-002', experience: '8 years', status: 'ACTIVE' },
  { id: 'd3', driverNumber: 'DRV-003', personnelNumber: 'PER-1265', fullName: 'Eric Habimana', department: 'Logistics', licenseClass: 'C, CE', licenseExpiry: '2026-11-20', medicalClearance: 'Fit', assignment: 'FLT-003', experience: '15 years', status: 'ACTIVE' },
  { id: 'd4', driverNumber: 'DRV-004', personnelNumber: 'PER-1301', fullName: 'Grace Uwase', department: 'HQ', licenseClass: 'B', licenseExpiry: '2026-08-01', medicalClearance: 'Pending', experience: '5 years', status: 'INACTIVE' },
];

export const MOCK_LICENSES: DriverLicense[] = [
  { id: 'l1', driver: 'Jean Bizimana', category: 'B, C', expiry: '2027-04-15', endorsements: 'Passenger transport', medicalFitness: 'Valid', status: 'ACTIVE' },
  { id: 'l2', driver: 'Alice Mukamana', category: 'B', expiry: '2026-09-30', endorsements: 'Ambulance', medicalFitness: 'Valid', status: 'ACTIVE' },
  { id: 'l3', driver: 'Grace Uwase', category: 'B', expiry: '2026-08-01', restrictions: 'Daylight only', medicalFitness: 'Due', status: 'PENDING' },
];

export const MOCK_ASSIGNMENTS: VehicleAssignment[] = [
  { id: 'a1', vehicle: 'FLT-001 / RAD-482-A', driver: 'Jean Bizimana', department: 'HQ', assignmentDate: '2026-01-15', expectedReturn: '2026-12-31', purpose: 'Executive transport', status: 'ASSIGNED' },
  { id: 'a2', vehicle: 'FLT-002 / RAD-519-B', driver: 'Alice Mukamana', department: 'Medical', assignmentDate: '2026-03-01', purpose: 'Emergency medical response', status: 'ASSIGNED' },
  { id: 'a3', vehicle: 'FLT-005 / RAD-118-E', driver: 'Patrick Niyonsenga', department: 'Security', assignmentDate: '2026-06-01', expectedReturn: '2026-09-30', purpose: 'Perimeter patrol', status: 'ASSIGNED' },
];

export const MOCK_TRIPS: TripRequest[] = [
  { id: 't1', tripNumber: 'TRP-2026-0142', requester: 'Marie Uwase', department: 'HR', destination: 'Gako Training Centre', purpose: 'Training facilitation', departureDate: '2026-07-08', returnDate: '2026-07-08', passengers: 4, priority: 'Normal', status: 'IN_PROGRESS', vehicle: 'FLT-001', driver: 'Jean Bizimana' },
  { id: 't2', tripNumber: 'TRP-2026-0143', requester: 'Dr. Claire Mutesi', department: 'Medical', destination: 'Rwamagana Hospital', purpose: 'Medical referral escort', departureDate: '2026-07-08', passengers: 2, priority: 'Urgent', status: 'APPROVED', vehicle: 'FLT-002', driver: 'Alice Mukamana' },
  { id: 't3', tripNumber: 'TRP-2026-0144', requester: 'Patrick Habimana', department: 'IT', destination: 'Kigali Convention Centre', purpose: 'Conference attendance', departureDate: '2026-07-10', returnDate: '2026-07-10', passengers: 3, priority: 'Normal', status: 'PENDING' },
  { id: 't4', tripNumber: 'TRP-2026-0140', requester: 'Eric Niyonsenga', department: 'Finance', destination: 'MOD Warehouse', purpose: 'Stock verification', departureDate: '2026-07-07', returnDate: '2026-07-07', passengers: 2, priority: 'Normal', status: 'COMPLETED', vehicle: 'FLT-003', driver: 'Eric Habimana' },
];

export const MOCK_FUEL: FuelTransaction[] = [
  { id: 'f1', transactionNumber: 'FUEL-2026-0891', vehicle: 'FLT-001', driver: 'Jean Bizimana', station: 'Kobil Remera', fuelType: 'Diesel', quantity: 80, cost: 128000, odometer: 45150, date: '2026-07-06' },
  { id: 'f2', transactionNumber: 'FUEL-2026-0890', vehicle: 'FLT-003', driver: 'Eric Habimana', station: 'SP Oil Nyamata', fuelType: 'Diesel', quantity: 120, cost: 192000, odometer: 78420, date: '2026-07-05' },
  { id: 'f3', transactionNumber: 'FUEL-2026-0889', vehicle: 'FLT-002', driver: 'Alice Mukamana', station: 'HQ Fuel Depot', fuelType: 'Diesel', quantity: 60, cost: 96000, odometer: 22080, date: '2026-07-04' },
];

export const MOCK_MAINTENANCE: MaintenanceOrder[] = [
  { id: 'm1', workOrder: 'WO-FLT-2026-045', vehicle: 'FLT-004', type: 'Corrective', provider: 'Toyota Rwanda', date: '2026-07-05', cost: 850000, status: 'IN_PROGRESS' },
  { id: 'm2', workOrder: 'WO-FLT-2026-044', vehicle: 'FLT-001', type: 'Preventive', provider: 'In-house Workshop', date: '2026-06-20', cost: 120000, status: 'COMPLETED' },
  { id: 'm3', workOrder: 'WO-FLT-2026-043', vehicle: 'FLT-003', type: 'Preventive', provider: 'Isuzu Service Centre', date: '2026-07-15', cost: 0, status: 'SCHEDULED' },
];

export const MOCK_INSPECTIONS: VehicleInspection[] = [
  { id: 'i1', inspectionNumber: 'INSP-2026-078', vehicle: 'FLT-001', date: '2026-07-01', inspector: 'Fleet Officer', result: 'PASSED', notes: 'All systems OK' },
  { id: 'i2', inspectionNumber: 'INSP-2026-077', vehicle: 'FLT-004', date: '2026-06-28', inspector: 'Fleet Officer', result: 'REQUIRES_REPAIR', notes: 'Brake pads worn; AC failing' },
  { id: 'i3', inspectionNumber: 'INSP-2026-076', vehicle: 'FLT-002', date: '2026-06-25', inspector: 'Medical Fleet Lead', result: 'PASSED' },
];

export const MOCK_INCIDENTS: FleetIncident[] = [
  { id: 'inc1', incidentNumber: 'INC-2026-012', vehicle: 'FLT-003', driver: 'Eric Habimana', date: '2026-06-18', location: 'RN3 km 42', description: 'Minor collision with roadside barrier', severity: 'Minor', status: 'INVESTIGATING' },
  { id: 'inc2', incidentNumber: 'INC-2026-011', vehicle: 'FLT-005', driver: 'Patrick Niyonsenga', date: '2026-05-22', location: 'HQ Compound', description: 'Scratch on left mirror during parking', severity: 'Low', status: 'CLOSED' },
];

export const MOCK_PARKING: ParkingSlot[] = [
  { id: 'p1', garage: 'HQ Garage A', slot: 'A-01 to A-20', capacity: 20, occupied: 14, type: 'Covered' },
  { id: 'p2', garage: 'HQ Garage B', slot: 'B-01 to B-15', capacity: 15, occupied: 9, type: 'Open' },
  { id: 'p3', garage: 'Medical Bay', slot: 'MED-01 to MED-06', capacity: 6, occupied: 4, type: 'Covered', vehicle: 'FLT-002' },
  { id: 'p4', garage: 'Maintenance Bays', slot: 'M-01 to M-04', capacity: 4, occupied: 1, type: 'Workshop', vehicle: 'FLT-004' },
];

export const MOCK_APPROVALS: FleetApproval[] = [
  { id: 'ap1', type: 'Trip Request', reference: 'TRP-2026-0144', requester: 'Patrick Habimana', submittedDate: '2026-07-07', status: 'PENDING' },
  { id: 'ap2', type: 'Vehicle Assignment', reference: 'ASN-2026-019', requester: 'Fleet Officer', submittedDate: '2026-07-06', status: 'APPROVED' },
  { id: 'ap3', type: 'Maintenance Request', reference: 'WO-FLT-2026-045', requester: 'Workshop Lead', submittedDate: '2026-07-05', status: 'PENDING' },
  { id: 'ap4', type: 'Fuel Exception', reference: 'FUEL-EXC-008', requester: 'Eric Habimana', submittedDate: '2026-07-04', status: 'APPROVED' },
];

export const MOCK_HISTORY = [
  { id: 'h1', event: 'Vehicle Registered', description: 'FLT-005 Honda CBR150 registered', date: '2024-02-14' },
  { id: 'h2', event: 'Assigned', description: 'FLT-001 assigned to Jean Bizimana / HQ', date: '2026-01-15' },
  { id: 'h3', event: 'Trip Completed', description: 'TRP-2026-0140 — MOD Warehouse', date: '2026-07-07' },
  { id: 'h4', event: 'Fuel Issued', description: 'FUEL-2026-0891 — 80L diesel FLT-001', date: '2026-07-06' },
  { id: 'h5', event: 'Maintenance', description: 'WO-FLT-2026-045 — FLT-004 corrective', date: '2026-07-05' },
  { id: 'h6', event: 'Inspection', description: 'INSP-2026-078 — FLT-001 Passed', date: '2026-07-01' },
];

export const MOCK_CALENDAR_EVENTS = [
  { id: 'c1', title: 'Trip: Gako Training', date: '2026-07-08', type: 'Trip' },
  { id: 'c2', title: 'Trip: Rwamagana Referral', date: '2026-07-08', type: 'Trip' },
  { id: 'c3', title: 'Maintenance: FLT-003', date: '2026-07-15', type: 'Maintenance' },
  { id: 'c4', title: 'Inspection: FLT-005', date: '2026-07-12', type: 'Inspection' },
  { id: 'c5', title: 'License Renewal: Grace Uwase', date: '2026-08-01', type: 'License' },
];
