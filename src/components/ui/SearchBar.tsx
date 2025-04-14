
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTrendingQueries } from '@/services/api';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  showTrending?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  initialValue = '', 
  showTrending = false 
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [trendingQueries, setTrendingQueries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTrending) {
      fetchTrendingQueries();
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTrending]);

  const fetchTrendingQueries = async () => {
    try {
      setIsLoading(true);
      const queries = await getTrendingQueries();
      setTrendingQueries(queries);
    } catch (error) {
      console.error('Failed to fetch trending queries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Explore historical connections (e.g., 'Key events leading to World War II')"
            className="pl-10 pr-10 py-6 w-full bg-background/80 backdrop-blur-sm border-amber-100/20 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {query && (
            <X
              className="absolute right-[70px] top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={handleClearSearch}
            />
          )}
          <Button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-700 hover:bg-amber-800"
          >
            Search
          </Button>
        </div>
      </form>

      {isFocused && showTrending && trendingQueries.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-background/95 backdrop-blur-sm border border-border rounded-md shadow-lg py-1 max-h-60 overflow-y-auto"
        >
          <p className="px-4 py-2 text-sm font-medium text-muted-foreground">Trending Queries</p>
          <ul>
            {trendingQueries.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 text-sm hover:bg-accent cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
