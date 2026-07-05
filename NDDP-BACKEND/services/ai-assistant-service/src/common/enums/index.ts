export enum AgentType {
  GENERAL = 'GENERAL',
  HR = 'HR',
  OPERATIONS = 'OPERATIONS',
  CUSTOM = 'CUSTOM',
}

export enum AgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ConversationStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export enum MessageStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum AiAssistantPublishedEvent {
  AGENT_CREATED = 'aiassistant.agent.created',
  CONVERSATION_CREATED = 'aiassistant.conversation.created',
  MESSAGE_SENT = 'aiassistant.message.sent',
  MESSAGE_COMPLETED = 'aiassistant.message.completed',
  MESSAGE_FAILED = 'aiassistant.message.failed',
}
