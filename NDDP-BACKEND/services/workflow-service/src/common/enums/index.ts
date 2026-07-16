export enum WorkflowEntityType {
  LEAVE = 'LEAVE',
  EXPENDITURE = 'EXPENDITURE',
  PROCUREMENT = 'PROCUREMENT',
  VISIT = 'VISIT',
  PERSONNEL = 'PERSONNEL',
  OTHER = 'OTHER',
}

export enum DefinitionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
}

export enum InstanceStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SKIPPED = 'SKIPPED',
}

export enum WorkflowPublishedEvent {
  DEFINITION_CREATED = 'workflow.definition.created',
  INSTANCE_STARTED = 'workflow.instance.started',
  INSTANCE_COMPLETED = 'workflow.instance.completed',
  INSTANCE_REJECTED = 'workflow.instance.rejected',
  INSTANCE_CANCELLED = 'workflow.instance.cancelled',
  TASK_ASSIGNED = 'workflow.task.assigned',
  TASK_APPROVED = 'workflow.task.approved',
  TASK_REJECTED = 'workflow.task.rejected',
}
