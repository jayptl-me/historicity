import React from 'react';
import { Connection } from '@/types';
import { Button } from './button';
import { Compass } from 'lucide-react';

interface ConnectionsTimelineProps {
  connections: Connection[];
  onSelectConnection: (connection: Connection) => void;
  onExploreConnection?: (connection: Connection) => void;
}

const ConnectionsTimeline: React.FC<ConnectionsTimelineProps> = ({ 
  connections, 
  onSelectConnection,
  onExploreConnection
}) => {
  const sortedConnections = [...connections].sort((a, b) => {
    if (!a.year && !b.year) return 0;
    if (!a.year) return 1;
    if (!b.year) return -1;
    return parseInt(a.year) - parseInt(b.year);
  });

  return (
    <div className="relative py-4 w-full">
      <div className="timeline-line" />
      <div className="relative w-full">
        {sortedConnections.map((connection, index) => (
          <div 
            key={index} 
            className={`mb-12 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div 
              className={`w-[45%] ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
            >
              <div 
                className="history-card p-4 hover:bg-background/50 transition-all duration-300"
                onClick={() => onSelectConnection(connection)}
              >
                <h3 className="text-lg font-playfair font-medium">{connection.event}</h3>
                {connection.year && (
                  <p className="text-amber-700 font-medium">{connection.year}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">{connection.figure} in {connection.location}</p>
                
                {onExploreConnection && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreConnection(connection);
                      }}
                    >
                      <Compass className="mr-1 h-3 w-3" />
                      Explore
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="timeline-dot" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsTimeline;
