import React, { useState } from 'react';
import { Bot, Send, ShieldCheck, FileText, Cpu } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI_COPILOT';
  text: string;
  sopReference?: string;
  timestamp: string;
}

export const DefenseAiCopilotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI_COPILOT',
      text: 'Greetings Commander. I am your air-gapped Defense SOP Intelligence Assistant. Ask me any tactical query regarding Rules of Engagement (ROE), Cyber Incident SOPs, or Perimeter Protocols.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'USER',
      text: inputQuery,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const q = inputQuery;
    setInputQuery('');
    setLoading(true);

    setTimeout(() => {
      let aiReply = 'No relevant SOP found in current military vector index.';
      let refCode = undefined;

      if (q.toLowerCase().includes('engagement') || q.toLowerCase().includes('roe') || q.toLowerCase().includes('breach')) {
        aiReply = 'According to SOP DEF-ROE-2026 (Rules of Engagement - Base Perimeter Defense): In the event of an unauthorized perimeter breach during DEFCON 3 or higher, armed forces are authorized to engage non-compliant hostile actors following three verbal warnings over broadcast speakers.';
        refCode = 'DEF-ROE-2026';
      } else if (q.toLowerCase().includes('cyber') || q.toLowerCase().includes('attack') || q.toLowerCase().includes('intrusion')) {
        aiReply = 'According to SOP DEF-CYBER-90 (Cyber Intrusion Containment Protocol): Upon detection of unauthorized root access on any microservice host node, immediately isolate the subnet, revoke all JWT bearer tokens, and trigger WORM log seal in audit-service.';
        refCode = 'DEF-CYBER-90';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI_COPILOT',
        text: aiReply,
        sopReference: refCode,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-mono rounded-lg border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-purple-400" />
          <h1 className="text-sm font-bold tracking-wider text-purple-400">
            AIR-GAPPED DEFENSE SOP INTELLIGENCE COPILOT (VECTOR RAG)
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 bg-purple-950 text-purple-400 border border-purple-800 rounded flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> MODEL: LOCAL DEFENSE LLM 3.8B
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-950">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl p-4 rounded-lg text-xs space-y-2 border ${
                  isUser
                    ? 'bg-blue-950/80 border-blue-800 text-blue-100'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/60 pb-1">
                  <span>{isUser ? 'COMMANDER' : 'DEFENSE AI COPILOT'}</span>
                  {msg.sopReference && (
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <FileText className="w-3 h-3" /> REF: {msg.sopReference}
                    </span>
                  )}
                </div>
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="text-xs text-purple-400 animate-pulse flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Vector RAG search in progress...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask a defense query (e.g., 'What are the rules of engagement for perimeter breach?')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
        />
        <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded transition flex items-center gap-2">
          <Send className="w-4 h-4" /> ASK SOP
        </button>
      </form>
    </div>
  );
};
