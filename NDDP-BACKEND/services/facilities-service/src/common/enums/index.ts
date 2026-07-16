export enum FacilityTypeCategory {
  BARRACKS = 'BARRACKS',
  OFFICE = 'OFFICE',
  TRAINING = 'TRAINING',
  MEDICAL = 'MEDICAL',
  WAREHOUSE = 'WAREHOUSE',
  OTHER = 'OTHER',
}

export enum FacilityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNDER_RENOVATION = 'UNDER_RENOVATION',
  CLOSED = 'CLOSED',
}

export enum SpaceType {
  ROOM = 'ROOM',
  HALL = 'HALL',
  OFFICE = 'OFFICE',
  STORAGE = 'STORAGE',
  LAB = 'LAB',
  OTHER = 'OTHER',
}

export enum SpaceStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
  CLOSED = 'CLOSED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum FacilitiesPublishedEvent {
  TYPE_CREATED = 'facilities.type.created',
  FACILITY_CREATED = 'facilities.facility.created',
  SPACE_CREATED = 'facilities.space.created',
  BOOKING_SUBMITTED = 'facilities.booking.submitted',
  BOOKING_APPROVED = 'facilities.booking.approved',
  BOOKING_REJECTED = 'facilities.booking.rejected',
  BOOKING_COMPLETED = 'facilities.booking.completed',
}
