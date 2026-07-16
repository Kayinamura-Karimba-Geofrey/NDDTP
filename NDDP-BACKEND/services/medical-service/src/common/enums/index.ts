export enum FacilityType {
  CLINIC = 'CLINIC',
  HOSPITAL = 'HOSPITAL',
  FIELD_UNIT = 'FIELD_UNIT',
  DENTAL = 'DENTAL',
  MENTAL_HEALTH = 'MENTAL_HEALTH',
}

export enum FacilityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum AppointmentType {
  CHECKUP = 'CHECKUP',
  CONSULTATION = 'CONSULTATION',
  VACCINATION = 'VACCINATION',
  FOLLOW_UP = 'FOLLOW_UP',
  EMERGENCY = 'EMERGENCY',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum RecordType {
  CONSULTATION = 'CONSULTATION',
  LAB_RESULT = 'LAB_RESULT',
  DIAGNOSIS = 'DIAGNOSIS',
  PRESCRIPTION = 'PRESCRIPTION',
  PROCEDURE = 'PROCEDURE',
  VACCINATION = 'VACCINATION',
}

export enum FitnessClassification {
  FIT = 'FIT',
  TEMPORARILY_UNFIT = 'TEMPORARILY_UNFIT',
  PERMANENTLY_UNFIT = 'PERMANENTLY_UNFIT',
  LIMITED_DUTY = 'LIMITED_DUTY',
}

export enum FitnessStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum CertificateType {
  SICK_LEAVE = 'SICK_LEAVE',
  FITNESS = 'FITNESS',
  MEDICAL_CLEARANCE = 'MEDICAL_CLEARANCE',
  TRAVEL_CLEARANCE = 'TRAVEL_CLEARANCE',
}

export enum CertificateStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}

export enum MedicalPublishedEvent {
  FACILITY_CREATED = 'medical.facility.created',
  APPOINTMENT_SCHEDULED = 'medical.appointment.scheduled',
  APPOINTMENT_CONFIRMED = 'medical.appointment.confirmed',
  APPOINTMENT_COMPLETED = 'medical.appointment.completed',
  APPOINTMENT_CANCELLED = 'medical.appointment.cancelled',
  RECORD_CREATED = 'medical.record.created',
  FITNESS_ASSESSED = 'medical.fitness.assessed',
  CERTIFICATE_ISSUED = 'medical.certificate.issued',
  CERTIFICATE_REVOKED = 'medical.certificate.revoked',
}
