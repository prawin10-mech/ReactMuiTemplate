import { useContext } from 'react';
//
import { ScrollContext } from './ScrollContext';

// ----------------------------------------------------------------------

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
 

  if (!context) throw new Error('useScrollContext context must be use inside AuthProvider');

  return context;
};
