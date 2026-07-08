export type AiStatus =
  | 'ACTIVE' | 'INACTIVE' | 'CLOSED' | 'ARCHIVED'
  | 'PENDING' | 'COMPLETED' | 'FAILED';

export type AgentType = 'GENERAL' | 'HR' | 'OPERATIONS' | 'CUSTOM';
export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';
export type ConversationStatus = 'ACTIVE' | 'CLOSED' | 'ARCHIVED';
export type MessageStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface AiAgentRecord {
  id: string;
  code: string;
  name: string;
  agentType: AgentType;
  modelName: string;
  description: string;
  systemPrompt: string;
  conversationCount: number;
  status: AiStatus;
}

export interface AiConversationRecord {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  status: ConversationStatus;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
}

export interface AiMessageRecord {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  tokenCount: number;
  createdAt: string;
}

export const AI_DASHBOARD_KPIS = {
  activeAgents: 4,
  activeConversations: 38,
  closedToday: 12,
  messagesToday: 214,
  avgTokens: 320,
  pendingReplies: 5,
  failedMessages: 2,
  archived: 86,
  satisfaction: '4.6/5',
  avgLatencyMs: 890,
};

export const MESSAGES_BY_DAY = [
  { day: 'Mon', count: 160 },
  { day: 'Tue', count: 188 },
  { day: 'Wed', count: 175 },
  { day: 'Thu', count: 214 },
  { day: 'Fri', count: 196 },
  { day: 'Sat', count: 42 },
  { day: 'Sun', count: 28 },
];

export const AGENTS_BY_TYPE = [
  { name: 'General', value: 1 },
  { name: 'HR', value: 1 },
  { name: 'Operations', value: 1 },
  { name: 'Custom', value: 1 },
];

export const CONVERSATION_STATUS = [
  { name: 'Active', value: 38 },
  { name: 'Closed', value: 54 },
  { name: 'Archived', value: 86 },
];

export const MOCK_AGENTS: AiAgentRecord[] = [
  { id: 'AGT-01', code: 'GEN-CORE', name: 'NDDTP General Assistant', agentType: 'GENERAL', modelName: 'nddtp-lite-v1', description: 'General Q&A across platform modules', systemPrompt: 'You are a helpful platform assistant for MoD digital services.', conversationCount: 120, status: 'ACTIVE' },
  { id: 'AGT-02', code: 'HR-HELP', name: 'HR Policy Assistant', agentType: 'HR', modelName: 'nddtp-lite-v1', description: 'Leave, welfare, and personnel policy guidance', systemPrompt: 'Answer HR policy questions using approved circulars only.', conversationCount: 86, status: 'ACTIVE' },
  { id: 'AGT-03', code: 'OPS-DESK', name: 'Operations Desk Assistant', agentType: 'OPERATIONS', modelName: 'nddtp-ops-v1', description: 'Logistics, facilities, and maintenance triage', systemPrompt: 'Help ops staff triage requests and suggest next actions.', conversationCount: 64, status: 'ACTIVE' },
  { id: 'AGT-04', code: 'CUST-AUD', name: 'Audit Copilot', agentType: 'CUSTOM', modelName: 'nddtp-secure-v1', description: 'Audit and compliance wording helper', systemPrompt: 'Draft audit notes without inventing findings.', conversationCount: 22, status: 'INACTIVE' },
];

export const MOCK_CONVERSATIONS: AiConversationRecord[] = [
  { id: 'CNV-801', title: 'Leave balance check', agentId: 'AGT-02', agentName: 'HR Policy Assistant', status: 'ACTIVE', messageCount: 6, lastMessageAt: '2026-07-08 10:15', createdAt: '2026-07-08 09:40' },
  { id: 'CNV-802', title: 'Facility booking help', agentId: 'AGT-03', agentName: 'Operations Desk Assistant', status: 'ACTIVE', messageCount: 4, lastMessageAt: '2026-07-08 09:55', createdAt: '2026-07-08 09:30' },
  { id: 'CNV-803', title: 'How to submit a requisition', agentId: 'AGT-01', agentName: 'NDDTP General Assistant', status: 'CLOSED', messageCount: 8, lastMessageAt: '2026-07-07 16:20', createdAt: '2026-07-07 15:50' },
  { id: 'CNV-804', title: 'Shipment delay escalation', agentId: 'AGT-03', agentName: 'Operations Desk Assistant', status: 'ACTIVE', messageCount: 5, lastMessageAt: '2026-07-08 08:12', createdAt: '2026-07-08 07:45' },
  { id: 'CNV-805', title: 'Audit wording draft', agentId: 'AGT-04', agentName: 'Audit Copilot', status: 'ARCHIVED', messageCount: 10, lastMessageAt: '2026-07-02 11:00', createdAt: '2026-07-02 10:10' },
];

export const MOCK_MY_CONVERSATIONS = MOCK_CONVERSATIONS.filter((c) => ['CNV-801', 'CNV-802', 'CNV-803'].includes(c.id));

export const MOCK_MESSAGES: AiMessageRecord[] = [
  { id: 'MSG-01', conversationId: 'CNV-801', role: 'USER', content: 'How do I check my annual leave balance?', status: 'COMPLETED', tokenCount: 18, createdAt: '2026-07-08 09:40' },
  { id: 'MSG-02', conversationId: 'CNV-801', role: 'ASSISTANT', content: 'Open Leave → My Balances, or ask your HR desk if balances are frozen during a cycle close.', status: 'COMPLETED', tokenCount: 42, createdAt: '2026-07-08 09:41' },
  { id: 'MSG-03', conversationId: 'CNV-801', role: 'USER', content: 'Can I carry over unused leave?', status: 'COMPLETED', tokenCount: 12, createdAt: '2026-07-08 10:14' },
  { id: 'MSG-04', conversationId: 'CNV-801', role: 'ASSISTANT', content: 'Carry-over follows the current HR circular. Typically a limited number of days may roll over with director approval before year-end.', status: 'COMPLETED', tokenCount: 48, createdAt: '2026-07-08 10:15' },
  { id: 'MSG-05', conversationId: 'CNV-802', role: 'USER', content: 'How do I book the HQ Boardroom?', status: 'COMPLETED', tokenCount: 14, createdAt: '2026-07-08 09:30' },
  { id: 'MSG-06', conversationId: 'CNV-802', role: 'ASSISTANT', content: 'Go to Facilities → Available Spaces, select HQ Boardroom, then submit a booking for approval.', status: 'COMPLETED', tokenCount: 36, createdAt: '2026-07-08 09:31' },
  { id: 'MSG-07', conversationId: 'CNV-802', role: 'USER', content: 'Who approves it?', status: 'COMPLETED', tokenCount: 8, createdAt: '2026-07-08 09:54' },
  { id: 'MSG-08', conversationId: 'CNV-802', role: 'ASSISTANT', content: 'Facility bookings usually route to the facilities desk or your unit manager depending on space clearance.', status: 'PENDING', tokenCount: 0, createdAt: '2026-07-08 09:55' },
  { id: 'MSG-09', conversationId: 'CNV-804', role: 'USER', content: 'Shipment SHP-2026-0504 is delayed. What next?', status: 'COMPLETED', tokenCount: 16, createdAt: '2026-07-08 07:45' },
  { id: 'MSG-10', conversationId: 'CNV-804', role: 'ASSISTANT', content: 'Open Logistics → Tracking for that shipment, record the delay event, and notify the requester if ETA slips beyond policy.', status: 'FAILED', tokenCount: 0, createdAt: '2026-07-08 07:46' },
];
