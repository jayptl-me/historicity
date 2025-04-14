
import React from 'react';
import { Connection } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Calendar, AlertCircle, Compass } from 'lucide-react';
import { Button } from './button';

interface ConnectionCardProps {
  connection: Connection;
  onSelect?: () => void;
  onExplore?: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ connection, onSelect, onExplore }) => {
  const { event, figure, location, year, description } = connection;

  return (
    <Card 
      className="w-full hover:shadow-antique transition-all duration-300 cursor-pointer history-card"
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-playfair">{event}</CardTitle>
        {year && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{year}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {figure && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-amber-600" />
              <span className="font-medium">{figure}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              <span>{location}</span>
            </div>
          )}
          {description && (
            <div className="flex items-start mt-2">
              <AlertCircle className="h-4 w-4 mr-2 mt-1 text-slate-500" />
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-amber-100/30">
        <Button 
          variant="ghost" 
          className="ml-auto text-amber-700 hover:text-amber-900 hover:bg-amber-50"
          onClick={(e) => {
            e.stopPropagation();
            onExplore && onExplore();
          }}
        >
          <Compass className="mr-1 h-4 w-4" />
          Explore Deeper
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
