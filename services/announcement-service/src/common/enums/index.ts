export enum AnnouncementPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum AnnouncementStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  EXPIRED = 'EXPIRED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum AudienceType {
  ALL = 'ALL',
  DEPARTMENT = 'DEPARTMENT',
  ROLE = 'ROLE',
  UNIT = 'UNIT',
}

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AnnouncementPublishedEvent {
  CATEGORY_CREATED = 'announcement.category.created',
  CREATED = 'announcement.created',
  PUBLISHED = 'announcement.published',
  WITHDRAWN = 'announcement.withdrawn',
  ACKNOWLEDGED = 'announcement.acknowledged',
}
