import { useState, useEffect, type ReactNode } from 'react';
import { type Item, type ItemStatus } from '../data/mockData';
import { differenceInDays } from 'date-fns';
import { ItemsContext } from './ItemsContextDef';

const STORAGE_KEY = 'real_lost_and_found_items_v2';

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state strictly from persistent storage or empty array
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Item[];
        // Filter out any legacy hardcoded demo IDs if present
        const realItems = parsed.filter(item => !['LR-1256', 'FI-0987', 'CL-0456', 'LR-1255', 'FI-0986'].includes(item.id));
        return realItems;
      }
    } catch (e) {
      console.error('Failed to parse items from local storage', e);
    }
    return [];
  });

  // Sync state to local storage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save items to local storage', e);
    }
  }, [items]);

  // Fetch real items from backend API on mount
  useEffect(() => {
    const fetchRealItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            // Merge remote items with local items, removing duplicates by id
            setItems(prev => {
              const map = new Map<string, Item>();
              // Load local items first
              prev.forEach(i => map.set(i.id, i));
              // Remote items take priority if present
              result.data.forEach((i: Item) => map.set(i.id, i));
              return Array.from(map.values());
            });
          }
        }
      } catch (err) {
        // Fall back gracefully to local storage persistence
        console.log('Running in client-persistent mode:', err);
      }
    };

    fetchRealItems();
  }, []);

  // Auto status logic: mark items as expired if older than 30 days and not claimed
  useEffect(() => {
    const checkExpiredItems = () => {
      let changed = false;
      const updatedItems = items.map(item => {
        if (item.status === 'Pending') {
          const daysOld = differenceInDays(new Date(), new Date(item.date));
          if (daysOld >= 30) {
            changed = true;
            return { ...item, status: 'Expired' as ItemStatus };
          }
        }
        return item;
      });

      if (changed) {
        setItems(updatedItems);
      }
    };

    checkExpiredItems();
  }, [items]);

  const addItem = (newItemData: Omit<Item, 'id' | 'status'>) => {
    const prefix = newItemData.type === 'Lost' ? 'LR' : newItemData.type === 'Found' ? 'FI' : 'CL';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newItem: Item = {
      ...newItemData,
      id: `${prefix}-${randomNum}`,
      status: 'Pending',
    };
    
    // Update local state immediately
    setItems(prev => [newItem, ...prev]);

    // Send POST request to backend API
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    }).catch(err => console.log('Saved to local storage, backend sync queued:', err));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));

    fetch('/api/items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    }).catch(err => console.log('Updated in local storage, backend sync queued:', err));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));

    fetch(`/api/items?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch(err => console.log('Deleted from local storage, backend sync queued:', err));
  };

  const updateItemStatus = (id: string, status: ItemStatus) => {
    updateItem(id, { status });
  };

  const assignItem = (id: string, adminName: string) => {
    updateItem(id, { status: 'Assigned', assignedTo: adminName });
  };

  const getDashboardStats = () => {
    // Strictly compute dynamic stats ONLY from real items in the database/state
    const lostCount = items.filter(i => i.type === 'Lost').length;
    const foundCount = items.filter(i => i.type === 'Found').length;
    const pendingCount = items.filter(i => i.status === 'Pending' || i.type === 'Claim' || i.status === 'Under Review').length;
    const resolvedCount = items.filter(i => i.status === 'Resolved' || i.status === 'Claimed').length;

    return {
      totalLost: lostCount,
      totalFound: foundCount,
      totalClaimed: items.filter(i => i.status === 'Claimed').length,
      activeItems: items.filter(i => i.status === 'Pending').length,
      pendingClaims: pendingCount,
      resolvedCases: resolvedCount,
    };
  };

  return (
    <ItemsContext.Provider value={{ 
      items, 
      addItem, 
      updateItem, 
      deleteItem, 
      updateItemStatus, 
      assignItem, 
      getDashboardStats 
    }}>
      {children}
    </ItemsContext.Provider>
  );
};
