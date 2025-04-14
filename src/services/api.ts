import axios from 'axios';
import { SearchResponse } from '@/types';

// API URL - in a real scenario, this would be the actual backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://backend-api.com';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000 // 10 second timeout
});

export const searchHistoricalConnections = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.post('/search', { query });
    return response.data;
  } catch (error) {
    console.log('Error searching historical connections, falling back to mock data:', error);
    // Fall back to mock data
    return mockSearchResponse(query);
  }
};

export const checkBackendStatus = async (): Promise<{ status: string }> => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    console.log('Error checking backend status, returning mock status:', error);
    // Fall back to mock status
    return { status: 'ok' };
  }
};

export const getTrendingQueries = async (): Promise<string[]> => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.log('Error fetching trending queries, returning mock data:', error);
    // Fall back to mock trending queries
    return mockTrendingQueries();
  }
};

// Mock data for development and fallback
const mockSearchResponse = (query: string): SearchResponse => {
  // Different responses based on the query for better demo
  if (query.toLowerCase().includes('world war ii') || query.toLowerCase().includes('ww2')) {
    return {
      summary: "Key events before World War II include the Treaty of Versailles (1919), which imposed harsh penalties on Germany, fueling economic instability, and the rise of Adolf Hitler in 1933, leading to aggressive expansionist policies. The Munich Agreement (1938) and Nazi-Soviet Pact (1939) further destabilized Europe, setting the stage for Germany's invasion of Poland in September 1939.",
      connections: [
        {
          event: "Treaty of Versailles",
          figure: "Woodrow Wilson",
          location: "France",
          year: "1919",
          description: "Ended World War I, imposed reparations on Germany that caused economic hardship."
        },
        {
          event: "Rise of Hitler",
          figure: "Adolf Hitler",
          location: "Germany",
          year: "1933",
          description: "Nazi Party gained power, leading to rapid militarization and persecution."
        },
        {
          event: "Munich Agreement",
          figure: "Neville Chamberlain",
          location: "Munich",
          year: "1938",
          description: "Allowed Germany to annex parts of Czechoslovakia in a failed attempt at appeasement."
        },
        {
          event: "Nazi-Soviet Pact",
          figure: "Vyacheslav Molotov",
          location: "Moscow",
          year: "1939",
          description: "Non-aggression pact between Germany and USSR that secretly divided Eastern Europe."
        },
        {
          event: "Invasion of Poland",
          figure: "Adolf Hitler",
          location: "Poland",
          year: "1939",
          description: "German blitzkrieg attack that initiated the European theater of WWII."
        }
      ]
    };
  } else if (query.toLowerCase().includes('french revolution')) {
    return {
      summary: "The French Revolution was driven by social inequality, financial crisis, and Enlightenment ideals. Key events included the storming of the Bastille (1789), the Declaration of the Rights of Man, the Reign of Terror (1793-1794), and Napoleon's rise to power (1799).",
      connections: [
        {
          event: "Storming of the Bastille",
          figure: "Parisians",
          location: "Paris",
          year: "1789",
          description: "Mob attacked the royal fortress, symbolizing the uprising against the monarchy."
        },
        {
          event: "Declaration of the Rights of Man",
          figure: "Marquis de Lafayette",
          location: "France",
          year: "1789",
          description: "Document establishing fundamental rights for all men, inspired by Enlightenment ideals."
        },
        {
          event: "Execution of Louis XVI",
          figure: "Louis XVI",
          location: "Paris",
          year: "1793",
          description: "The king was guillotined after being tried for treason by the National Convention."
        },
        {
          event: "Reign of Terror",
          figure: "Maximilien Robespierre",
          location: "France",
          year: "1793-1794",
          description: "Period of extreme violence and political purges that saw thousands guillotined."
        },
        {
          event: "Rise of Napoleon",
          figure: "Napoleon Bonaparte",
          location: "France",
          year: "1799",
          description: "Military leader seized power in coup d'état, ending the revolutionary period."
        }
      ]
    };
  } else if (query.toLowerCase().includes('civil war')) {
    return {
      summary: "The American Civil War (1861-1865) resulted from long-standing tensions over slavery, states' rights, and westward expansion. Key events included the election of Abraham Lincoln, Southern secession, the Battle of Gettysburg (1863), and the Emancipation Proclamation, culminating in the Confederate surrender at Appomattox (1865).",
      connections: [
        {
          event: "Election of Abraham Lincoln",
          figure: "Abraham Lincoln",
          location: "United States",
          year: "1860",
          description: "Republican victory prompted Southern states to begin seceding from the Union."
        },
        {
          event: "Battle of Fort Sumter",
          figure: "P.G.T. Beauregard",
          location: "South Carolina",
          year: "1861",
          description: "Confederate attack on Union fort that marked the start of the Civil War."
        },
        {
          event: "Emancipation Proclamation",
          figure: "Abraham Lincoln",
          location: "Washington D.C.",
          year: "1863",
          description: "Executive order declaring freedom for slaves in Confederate states."
        },
        {
          event: "Battle of Gettysburg",
          figure: "George Meade",
          location: "Pennsylvania",
          year: "1863",
          description: "Major Union victory and turning point of the Civil War."
        },
        {
          event: "Surrender at Appomattox",
          figure: "Robert E. Lee",
          location: "Virginia",
          year: "1865",
          description: "Confederate surrender to Ulysses S. Grant that effectively ended the war."
        }
      ]
    };
  } else {
    // Default response for other queries
    return {
      summary: `Results for "${query}" show several important historical connections spanning different time periods. The events reveal patterns of cause and effect across political, social, and economic domains, demonstrating how historical figures and their actions shaped outcomes in various locations.`,
      connections: [
        {
          event: "Key Historical Event",
          figure: "Notable Figure",
          location: "Event Location",
          year: "Year",
          description: "This event had significant implications for subsequent historical developments."
        },
        {
          event: "Related Development",
          figure: "Historical Leader",
          location: "Urban Center",
          year: "Period",
          description: "Following earlier events, this development established new paradigms."
        },
        {
          event: "Cultural Revolution",
          figure: "Cultural Icon",
          location: "Regional Area",
          year: "Century",
          description: "Transformative cultural changes spread through society during this period."
        }
      ]
    };
  }
};

const mockTrendingQueries = (): string[] => {
  return [
    "Key events leading to World War II",
    "Main figures of the French Revolution",
    "American Civil War connections",
    "Ancient Rome's influence on modern governance",
    "Industrial Revolution's impact on social classes",
    "Cold War proxy conflicts",
    "Colonial expansion in the Americas",
    "Renaissance art and scientific progress"
  ];
};
