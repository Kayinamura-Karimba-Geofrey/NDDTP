export enum PersonnelType {
  OFFICER = 'OFFICER',
  NCO = 'NCO',
  ENLISTED = 'ENLISTED',
  CIVILIAN = 'CIVILIAN',
  CONTRACTOR = 'CONTRACTOR',
}

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  RESERVE = 'RESERVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  RETIRED = 'RETIRED',
  SEPARATED = 'SEPARATED',
}

export enum ServiceBranch {
  ARMY = 'ARMY',
  NAVY = 'NAVY',
  AIR_FORCE = 'AIR_FORCE',
  JOINT = 'JOINT',
  CIVILIAN = 'CIVILIAN',
}

export enum RankCategory {
  OFFICER = 'OFFICER',
  ENLISTED = 'ENLISTED',
  CIVILIAN = 'CIVILIAN',
}

export enum UnitType {
  HEADQUARTERS = 'HEADQUARTERS',
  DIVISION = 'DIVISION',
  BRIGADE = 'BRIGADE',
  BATTALION = 'BATTALION',
  COMPANY = 'COMPANY',
  PLATOON = 'PLATOON',
  SECTION = 'SECTION',
  DEPARTMENT = 'DEPARTMENT',
}

export enum AssignmentType {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  DEPLOYMENT = 'DEPLOYMENT',
  DETACHMENT = 'DETACHMENT',
}

export enum QualificationCategory {
  MILITARY = 'MILITARY',
  TECHNICAL = 'TECHNICAL',
  EDUCATION = 'EDUCATION',
  CERTIFICATION = 'CERTIFICATION',
  LANGUAGE = 'LANGUAGE',
}

export enum QualificationStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING',
}

export enum ServiceEventType {
  ENLISTMENT = 'ENLISTMENT',
  PROMOTION = 'PROMOTION',
  DEMOTION = 'DEMOTION',
  TRANSFER = 'TRANSFER',
  DEPLOYMENT = 'DEPLOYMENT',
  SEPARATION = 'SEPARATION',
  AWARD = 'AWARD',
  DISCIPLINARY = 'DISCIPLINARY',
  TRAINING = 'TRAINING',
}

export enum PersonnelPublishedEvent {
  RECORD_CREATED = 'personnel.record.created',
  RECORD_UPDATED = 'personnel.record.updated',
  RECORD_SEPARATED = 'personnel.record.separated',
  RANK_PROMOTED = 'personnel.rank.promoted',
  ASSIGNMENT_CREATED = 'personnel.assignment.created',
  ASSIGNMENT_ENDED = 'personnel.assignment.ended',
  QUALIFICATION_ADDED = 'personnel.qualification.added',
  SERVICE_EVENT_RECORDED = 'personnel.service.event.recorded',
}
