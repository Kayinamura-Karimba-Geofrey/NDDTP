export const CACHE_KEYS = {
  AGENT: (id: string) => `aiassistant:agent:${id}`,
  AGENTS: 'aiassistant:agents:active',
  USER_CONVERSATIONS: (userId: string) => `aiassistant:user:${userId}:conversations`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  AGENT_CREATED: 'aiassistant.agent.created',
  CONVERSATION_CREATED: 'aiassistant.conversation.created',
  MESSAGE_SENT: 'aiassistant.message.sent',
  MESSAGE_COMPLETED: 'aiassistant.message.completed',
  MESSAGE_FAILED: 'aiassistant.message.failed',
} as const;

export const CONVERSATION_STATUS_TRANSITIONS: Record<string, string[]> = {
  ACTIVE: ['CLOSED', 'ARCHIVED'],
  CLOSED: ['ARCHIVED'],
  ARCHIVED: [],
};

export const MESSAGE_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['COMPLETED', 'FAILED'],
  COMPLETED: [],
  FAILED: [],
};

export const DEFAULT_AI_AGENTS = [
  { code: 'AGT-GENERAL', name: 'General Assistant', agentType: 'GENERAL', modelName: 'gpt-4', systemPrompt: 'You are a helpful general-purpose assistant for the NDDTP platform.' },
  { code: 'AGT-HR', name: 'HR Assistant', agentType: 'HR', modelName: 'gpt-4', systemPrompt: 'You are an HR specialist assistant for personnel and leave queries.' },
  { code: 'AGT-OPS', name: 'Operations Assistant', agentType: 'OPERATIONS', modelName: 'gpt-4', systemPrompt: 'You are an operations assistant for logistics and fleet management queries.' },
] as const;
