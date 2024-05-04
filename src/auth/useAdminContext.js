import { useContext } from 'react';
//
import { AdminContext } from './AdminContext';

// ----------------------------------------------------------------------

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
