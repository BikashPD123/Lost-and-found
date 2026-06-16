import { useContext } from 'react';
import { ItemsContext } from '../context/ItemsContextDef';

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
