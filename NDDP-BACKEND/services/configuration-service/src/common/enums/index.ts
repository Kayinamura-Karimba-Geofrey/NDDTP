export enum NamespaceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EntryValueType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  JSON = 'JSON',
}

export enum EntryStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  DEPRECATED = 'DEPRECATED',
}

export enum EnvironmentScope {
  ALL = 'ALL',
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export enum ConfigurationPublishedEvent {
  NAMESPACE_CREATED = 'configuration.namespace.created',
  ENTRY_CREATED = 'configuration.entry.created',
  ENTRY_UPDATED = 'configuration.entry.updated',
  ENTRY_ACTIVATED = 'configuration.entry.activated',
  ENTRY_DEPRECATED = 'configuration.entry.deprecated',
}
