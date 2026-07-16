export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  MAILING = 'MAILING',
}

export enum DepartmentType {
  HEADQUARTERS = 'HEADQUARTERS',
  COMMAND = 'COMMAND',
  UNIT = 'UNIT',
  SECTION = 'SECTION',
  DEPARTMENT = 'DEPARTMENT',
}

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserEventType {
  USER_CREATED = 'user.user.created',
  USER_UPDATED = 'user.user.updated',
  USER_DEACTIVATED = 'user.user.deactivated',
  USER_REACTIVATED = 'user.user.reactivated',
  USER_DELETED = 'user.user.deleted',
}

export enum ConsumedEventType {
  AUTH_USER_REGISTERED = 'auth.user.registered',
}
