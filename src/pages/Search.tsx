import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Calendar, Network, Loader2, Compass, ArrowLeft } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import SearchBar from '@/components/ui/SearchBar';
import ConnectionCard from '@/components/ui/ConnectionCard';
import ConnectionsTimeline from '@/components/ui/ConnectionsTimeline';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';

import { searchHistoricalConnections } from '@/services/api';
import { saveSearchToHistory, getSearchHistory } from '@/utils/historyStorage';
import { exploreDeeper } from '@/utils/exploreUtils';
import { SearchResponse, Connection, ApiError } from '@/types';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [viewType, setViewType] = useState<'cards' | 'timeline'>('cards');
  const [explorationHistory, setExplorationHistory] = useState<SearchResponse[]>([]);
  const [explorationDepth, setExplorationDepth] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q');
    
    if (queryParam) {
      setSearchQuery(queryParam);
      handleSearch(queryParam);
    }
    
    const history = getSearchHistory();
    setRecentSearches(history.slice(0, 5).map(item => item.query));
  }, [location.search]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedConnection(null);
    setExplorationDepth(0);
    setExplorationHistory([]);
    
    try {
      const response = await searchHistoricalConnections(query);
      setSearchResults(response);
      
      saveSearchToHistory(query, response);
      
      navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      
      toast.success('Search completed successfully', {
        description: 'Found historical connections related to your query'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search historical connections';
      setError({ message: errorMessage });
      setSearchResults(null);
      
      toast.error('Search failed', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectionSelect = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleExploreDeeper = async (connection: Connection) => {
    if (searchResults && explorationDepth === 0) {
      setExplorationHistory([searchResults]);
    } else if (searchResults) {
      setExplorationHistory([...explorationHistory]);
    }
    
    setIsLoading(true);
    try {
      const deeperResults = await exploreDeeper(connection);
      
      setSearchResults(deeperResults);
      setExplorationDepth(prevDepth => prevDepth + 1);
      setSelectedConnection(null);
      
    } catch (err) {
      toast.error('Exploration failed', {
        description: 'Could not retrieve deeper connections'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (explorationDepth > 0 && explorationHistory.length > 0) {
      const previousResults = explorationHistory[explorationHistory.length - 1];
      
      setSearchResults(previousResults);
      setExplorationDepth(prevDepth => prevDepth - 1);
      setSelectedConnection(null);
      
      setExplorationHistory(prev => prev.slice(0, -1));
      
      toast.info('Returned to previous view', {
        description: 'Navigated back in your exploration journey'
      });
    }
  };

  return (
    <PageLayout className="bg-paper-texture bg-cover bg-fixed bg-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={searchQuery} 
              showTrending={!searchResults}
            />
          </motion.div>
        </div>
        
        {recentSearches.length > 0 && !searchResults && !isLoading && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HistoryIcon className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-lg font-medium">Recent Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-background/70 backdrop-blur-sm hover:bg-accent"
                  onClick={() => handleRecentSearchClick(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">
              {explorationDepth > 0 ? 'Exploring deeper connections...' : 'Searching historical connections...'}
            </p>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8"
          >
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {searchResults && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {explorationDepth > 0 && (
              <div className="mb-6 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-700 mr-2"
                  onClick={handleGoBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <span className="text-sm text-muted-foreground">
                  Exploration depth: {explorationDepth}
                </span>
              </div>
            )}
            
            <div className="history-card p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold mb-3">Summary</h2>
              <p className="text-foreground leading-relaxed font-source">{searchResults.summary}</p>
            </div>
            
            <div className="mb-8">
              <Tabs 
                defaultValue="cards" 
                value={viewType} 
                onValueChange={(v) => setViewType(v as 'cards' | 'timeline')}
                className="w-full"
              >
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="cards" className="flex items-center gap-1">
                    <Network className="h-4 w-4" />
                    <span>Cards</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Timeline</span>
                  </TabsTrigger>
                </TabsList>
              
                <TabsContent value="cards" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.connections.map((connection, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ConnectionCard 
                          connection={connection} 
                          onSelect={() => handleConnectionSelect(connection)}
                          onExplore={() => handleExploreDeeper(connection)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-4 w-full">
                  <ConnectionsTimeline 
                    connections={searchResults.connections}
                    onSelectConnection={handleConnectionSelect}
                    onExploreConnection={handleExploreDeeper}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            {selectedConnection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="history-card p-6 mb-8"
              >
                <h3 className="text-xl font-playfair font-bold mb-3">{selectedConnection.event}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Key Figure</p>
                    <p className="text-foreground">{selectedConnection.figure}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">{selectedConnection.location}</p>
                  </div>
                  {selectedConnection.year && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Year</p>
                      <p className="text-foreground">{selectedConnection.year}</p>
                    </div>
                  )}
                </div>
                {selectedConnection.description && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-foreground">{selectedConnection.description}</p>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-amber-100/30 flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleSearch(`${selectedConnection.event} ${selectedConnection.figure}`)}
                    className="text-amber-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50"
                  >
                    Search Related
                  </Button>
                  
                  <Button
                    variant="default"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleExploreDeeper(selectedConnection)}
                  >
                    <Compass className="mr-2 h-4 w-4" />
                    Explore Deeper
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {!isLoading && !searchResults && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="max-w-md history-card p-8">
              <h2 className="text-2xl font-playfair font-bold mb-3">Begin Your Historical Journey</h2>
              <p className="text-muted-foreground mb-6">
                Enter a query to explore connections between historical events, figures, and locations.
              </p>
              <p className="text-sm text-muted-foreground mb-4">Try questions like:</p>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSearch("Key events leading to World War II")}
                  className="border-amber-200 hover:bg-amber-50"
                >
                  Key events leading to World War II
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSearch("French Revolution connections")}
                  className="border-amber-200 hover:bg-amber-50"
                >
                  French Revolution connections
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSearch("American Civil War and its key figures")}
                  className="border-amber-200 hover:bg-amber-50"
                >
                  American Civil War and its key figures
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Search;
