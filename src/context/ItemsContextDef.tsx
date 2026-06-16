import { createContext } from 'react';
import { type Item, type ItemStatus } from '../data/mockData';

export interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'status'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  updateItemStatus: (id: string, status: ItemStatus) => void;
  assignItem: (id: string, adminName: string) => void;
  getDashboardStats: () => {
    totalLost: number;
    totalFound: number;
    totalClaimed: number;
    activeItems: number;
    pendingClaims: number;
    resolvedCases: number;
  };
}

export const ItemsContext = createContext<ItemsContextType | undefined>(undefined);
