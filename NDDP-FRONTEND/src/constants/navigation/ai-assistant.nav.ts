import type { NavItem } from '@/types';

export const aiAssistantNav: NavItem = {
    id: 'ai-assistant',
    label: 'AI Assistant',
    path: '/ai-assistant/dashboard',
    icon: 'FiCpu',
    module: 'ai-assistant',
    permissions: ['aiassistant:read:conversations'],
    children: [
      { id: 'ai-dashboard', label: 'Dashboard', path: '/ai-assistant/dashboard', icon: 'FiGrid', module: 'ai-assistant' },
      { id: 'ai-agents', label: 'Agents', path: '/ai-assistant/agents', icon: 'FiCpu', module: 'ai-assistant' },
      { id: 'ai-conversations', label: 'Conversations', path: '/ai-assistant/conversations', icon: 'FiMessageSquare', module: 'ai-assistant' },
      { id: 'ai-mine', label: 'My Chats', path: '/ai-assistant/conversations/mine', icon: 'FiInbox', module: 'ai-assistant' },
      { id: 'ai-reports', label: 'Reports', path: '/ai-assistant/reports', icon: 'FiBarChart2', module: 'ai-assistant' },
      { id: 'ai-settings', label: 'Settings', path: '/ai-assistant/settings', icon: 'FiSliders', module: 'ai-assistant' },
    ],
  };
