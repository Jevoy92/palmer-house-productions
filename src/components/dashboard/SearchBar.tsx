import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TOOLS = [
  { id: 'video-series-builder', name: 'Video Series Builder', keywords: 'video series content' },
  { id: 'persona-generator', name: 'Persona Generator', keywords: 'persona audience brand' },
  { id: 'production-assistant', name: 'Production Assistant', keywords: 'production pre-production workflow' },
  { id: 'content-maximizer', name: 'Content Maximizer', keywords: 'content repurpose maximize' },
  { id: 'engagement-responder', name: 'Engagement Responder', keywords: 'engagement community automate' },
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const filteredTools = query.trim()
    ? TOOLS.filter((tool) =>
        `${tool.name} ${tool.keywords}`.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = useCallback((toolId: string) => {
    navigate(`/tools/${toolId}`);
    setQuery('');
    setIsOpen(false);
  }, [navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredTools.length > 0) {
      handleSelect(filteredTools[0].id);
    } else if (e.key === 'Escape') {
      setQuery('');
      setIsOpen(false);
    }
  }, [filteredTools, handleSelect]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search your tools..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-9 bg-muted/50 border-border/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && filteredTools.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleSelect(tool.id)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{tool.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && filteredTools.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-muted-foreground text-center">No tools found</p>
        </div>
      )}
    </div>
  );
}
