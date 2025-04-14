
import { toast } from '@/components/ui/sonner';
import { searchHistoricalConnections } from '@/services/api';
import { Connection, SearchResponse } from '@/types';

// Mock deep exploration data for when API fails
const mockDeepExplorationData: Record<string, SearchResponse> = {
  "Treaty of Versailles": {
    summary: "The Treaty of Versailles was a peace treaty signed on June 28, 1919, exactly five years after the assassination of Archduke Franz Ferdinand, which formally ended World War I. The treaty was extremely harsh toward Germany, forcing it to accept sole responsibility for the war and imposing severe economic reparations. These harsh conditions contributed to Germany's economic collapse and the rise of extremist movements like the Nazi Party.",
    connections: [
      {
        event: "Paris Peace Conference",
        figure: "Georges Clemenceau",
        location: "Paris, France",
        year: "1919",
        description: "Major meeting of Allied victors to decide the new borders of Europe after WWI"
      },
      {
        event: "German Hyperinflation",
        figure: "Gustav Stresemann",
        location: "Germany",
        year: "1923",
        description: "Economic crisis partly caused by war reparations requirements"
      },
      {
        event: "Beer Hall Putsch",
        figure: "Adolf Hitler",
        location: "Munich, Germany",
        year: "1923",
        description: "Failed coup attempt by Nazi Party, exploiting economic unrest"
      }
    ]
  },
  "Rise of Hitler": {
    summary: "Adolf Hitler's rise to power in Germany began during the aftermath of World War I, when he joined the German Workers' Party (later renamed the Nazi Party) in 1919. Hitler's charismatic oratory, nationalist messaging, and exploitation of economic hardship resonated with many Germans suffering from the Great Depression and the humiliation of the Treaty of Versailles. Through political maneuvering and intimidation, Hitler was appointed Chancellor of Germany on January 30, 1933, and quickly consolidated power into a totalitarian dictatorship.",
    connections: [
      {
        event: "Beer Hall Putsch",
        figure: "Adolf Hitler",
        location: "Munich, Germany",
        year: "1923",
        description: "Failed coup attempt that led to Hitler's imprisonment, where he wrote Mein Kampf"
      },
      {
        event: "Great Depression",
        figure: "Heinrich Brüning",
        location: "Germany",
        year: "1929-1932",
        description: "Economic crisis that destabilized the Weimar Republic"
      },
      {
        event: "Reichstag Fire",
        figure: "Marinus van der Lubbe",
        location: "Berlin, Germany",
        year: "1933",
        description: "Arson attack on parliament building used to suspend civil liberties"
      },
      {
        event: "Enabling Act",
        figure: "Adolf Hitler",
        location: "Berlin, Germany",
        year: "1933",
        description: "Law that gave Hitler dictatorial powers"
      }
    ]
  }
};

export async function exploreDeeper(connection: Connection): Promise<SearchResponse> {
  try {
    // Attempt to get real data from API
    const query = `Tell me more about ${connection.event} involving ${connection.figure} in ${connection.location}`;
    const response = await searchHistoricalConnections(query);
    toast.success('Found additional connections', {
      description: `Exploring deeper into ${connection.event}`
    });
    return response;
  } catch (error) {
    // Fallback to mock data
    const mockData = mockDeepExplorationData[connection.event];
    
    if (mockData) {
      toast.info('Using cached exploration data', {
        description: `Showing stored information about ${connection.event}`
      });
      return mockData;
    }
    
    // If no mock data exists for this specific connection
    toast.error('Could not explore deeper', {
      description: 'No additional information available for this connection'
    });
    
    // Return a minimal response
    return {
      summary: `Additional information about ${connection.event} involving ${connection.figure} is not available at this time.`,
      connections: []
    };
  }
}
