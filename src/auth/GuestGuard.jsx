import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();

  if (!user && !isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return user && user.role === 'Landlord' ? (
      <Navigate to={PATH_DASHBOARD.c_panel.user_profile(user.userId)} />
    ) : (
      <Navigate to={PATH_DASHBOARD.root} />
    );
  }

  return <> {children} </>;
}
