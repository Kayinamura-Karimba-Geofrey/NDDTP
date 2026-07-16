import { useState } from 'react';
import { FiSend, FiCpu } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { AI_SUGGESTIONS } from '@/constants/executive-dashboard';

export function AiAssistantPanel() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = (q: string) => {
    setQuery(q);
    setResponse(`Based on current platform data: This is a preview response for "${q}". Connect the AI Assistant service for live answers.`);
  };

  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <FiCpu className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm">AI Administrative Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask an administrative question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && query && handleAsk(query)}
          />
          <Button size="icon" onClick={() => query && handleAsk(query)} aria-label="Send">
            <FiSend className="h-4 w-4" />
          </Button>
        </div>
        {response && (
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground">{response}</div>
        )}
        <div className="flex flex-wrap gap-2">
          {AI_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleAsk(s)}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
