import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AiAssistantDashboardPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantDashboardPage').then((m) => ({ default: m.AiAssistantDashboardPage })));
const AiAssistantAgentsPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantAgentsPage').then((m) => ({ default: m.AiAssistantAgentsPage })));
const AiAssistantCreateAgentPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantCreateAgentPage').then((m) => ({ default: m.AiAssistantCreateAgentPage })));
const AiAssistantAgentDetailPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantAgentDetailPage').then((m) => ({ default: m.AiAssistantAgentDetailPage })));
const AiAssistantConversationsPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantConversationsPage').then((m) => ({ default: m.AiAssistantConversationsPage })));
const AiAssistantMyConversationsPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantMyConversationsPage').then((m) => ({ default: m.AiAssistantMyConversationsPage })));
const AiAssistantNewConversationPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantNewConversationPage').then((m) => ({ default: m.AiAssistantNewConversationPage })));
const AiAssistantConversationDetailPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantConversationDetailPage').then((m) => ({ default: m.AiAssistantConversationDetailPage })));
const AiAssistantReportsPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantReportsPage').then((m) => ({ default: m.AiAssistantReportsPage })));
const AiAssistantSettingsPage = lazy(() => import('@/modules/ai-assistant/pages/AiAssistantSettingsPage').then((m) => ({ default: m.AiAssistantSettingsPage })));

export const aiAssistantRoutes: RouteObject[] = [
  { path: 'ai-assistant', element: <Navigate to="/ai-assistant/dashboard" replace /> },
  { path: 'ai-assistant/dashboard', element: wrap(<AiAssistantDashboardPage />) },
  { path: 'ai-assistant/agents', element: wrap(<AiAssistantAgentsPage />) },
  { path: 'ai-assistant/agents/new', element: wrap(<AiAssistantCreateAgentPage />) },
  { path: 'ai-assistant/agents/:id', element: wrap(<AiAssistantAgentDetailPage />) },
  { path: 'ai-assistant/conversations', element: wrap(<AiAssistantConversationsPage />) },
  { path: 'ai-assistant/conversations/mine', element: wrap(<AiAssistantMyConversationsPage />) },
  { path: 'ai-assistant/conversations/new', element: wrap(<AiAssistantNewConversationPage />) },
  { path: 'ai-assistant/conversations/:id', element: wrap(<AiAssistantConversationDetailPage />) },
  { path: 'ai-assistant/reports', element: wrap(<AiAssistantReportsPage />) },
  { path: 'ai-assistant/settings', element: wrap(<AiAssistantSettingsPage />) },
];
