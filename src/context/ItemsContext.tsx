import { useState, useEffect, type ReactNode } from 'react';
import { type Item, initialItems, type ItemStatus } from '../data/mockData';
import { differenceInDays } from 'date-fns';
import { ItemsContext } from './ItemsContextDef';

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>(initialItems);

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
    const newItem: Item = {
      ...newItemData,
      id: `ITM-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'Pending',
    };
    
    // Check for duplicates (simple name + studentId check)
    const isDuplicate = items.some(item => 
      item.name.toLowerCase() === newItem.name.toLowerCase() && 
      item.studentId === newItem.studentId &&
      item.status === 'Pending'
    );

    if (!isDuplicate) {
      setItems(prev => [newItem, ...prev]);
    } else {
      console.warn('Duplicate item report detected.');
    }
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemStatus = (id: string, status: ItemStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const assignItem = (id: string, adminName: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Assigned', assignedTo: adminName } : item
    ));
  };

  const getDashboardStats = () => {
    const baseLost = 1246;
    const baseFound = 930;
    const basePendingClaims = 313;
    const baseResolved = 811;

    return {
      totalLost: baseLost + items.filter(i => i.type === 'Lost').length,
      totalFound: baseFound + items.filter(i => i.type === 'Found').length,
      totalClaimed: items.filter(i => i.status === 'Claimed').length,
      activeItems: items.filter(i => i.status === 'Pending').length,
      pendingClaims: basePendingClaims + items.filter(i => i.type === 'Claim' || i.status === 'Under Review').length,
      resolvedCases: baseResolved + items.filter(i => i.status === 'Resolved' || i.status === 'Claimed').length,
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
