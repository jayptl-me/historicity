
import { SearchResponse } from '@/types';

const HISTORY_KEY = 'historicalSearchHistory';
const MAX_HISTORY_ITEMS = 10;

export interface HistoryItem {
  query: string;
  timestamp: number;
  response?: SearchResponse;
}

export const saveSearchToHistory = (query: string, response?: SearchResponse): void => {
  const history = getSearchHistory();
  
  // Create new history item
  const newItem: HistoryItem = {
    query,
    timestamp: Date.now(),
    response
  };
  
  // Add to beginning of array and remove duplicates
  const updatedHistory = [
    newItem,
    ...history.filter(item => item.query !== query)
  ].slice(0, MAX_HISTORY_ITEMS); // Keep only the most recent items
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getSearchHistory = (): HistoryItem[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error parsing search history from localStorage:', error);
    return [];
  }
};

export const clearSearchHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
