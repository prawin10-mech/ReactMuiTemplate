import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
// import { AllUsers } from '../api/Users';
import localStorageAvailable from '../utils/localStorageAvailable';
import { API_URL } from '../config-global';
import {
  percentageChange,
  todayRegistered,
  yesterdayRegistered,
  weekData,
  addIdCode,
} from '../utils/todayRegistered';
import { isValidToken, setSession } from './utils';
import { CountMonthWiseData } from '../redux/slices/booking';

const initialState = {
  allUsers: null,
  todayUsers: null,
  percentageChange: null,
  allLandlords: null,
  allTenants: null,
  allMaintainers: null,
  allRoommates: null,
  todayLandlords: null,
  landlordPercentage: null,
  landlordProperties: [],
};

const reducer = (state, action) => {
  if (action.type === 'ALL_USERS') {
    return {
      ...state,
      allUsers: action.payload.allUsers,
      todayUsers: action.payload.todayUsers,
      usersPercentage: action.payload.usersPercentage,
      usersWeekData: action.payload.usersWeekData,
      usersMonthWiseData: action.payload.usersMonthWiseData,
    };
  }
  if (action.type === 'ALL_LANDLORDS') {
    return {
      ...state,
      allLandlords: action.payload.allLandlords,
      todayLandlords: action.payload.todayLandlords,
      landlordPercentage: action.payload.landlordPercentage,
      landlordWeekData: action.payload.landlordWeekData,
      LandlordMonthWiseData: action.payload.LandlordMonthWiseData,
    };
  }

  if (action.type === 'ALL_MAINTAINERS') {
    return {
      ...state,
      allMaintainers: action.payload.allMaintainers,
      todayMaintainers: action.payload.todayMaintainers,
      maintainerPercentage: action.payload.maintainerPercentage,
      maintainersWeekData: action.payload.maintainersWeekData,
      maintainersMonthWiseData: action.payload.maintainersMonthWiseData,
    };
  }

  if (action.type === 'ALL_ROOMMATES') {
    return {
      ...state,
      allRoommates: action.payload.allRoommates,
      todayRoommates: action.payload.todayRoommates,
      roommatePercentage: action.payload.roommatePercentage,
      roommateWeekData: action.payload.roommateWeekData,
      roommateMonthWiseData: action.payload.roommateMonthWiseData,
    };
  }

  if (action.type === 'ALL_TENANTS') {
    return {
      ...state,
      allTenants: action.payload.allTenants,
      todayTenants: action.payload.todayTenants,
      tenantsPercentage: action.payload.tenantsPercentage,
      tenantsWeekData: action.payload.tenantsWeekData,
      tenantsMonthWiseData: action.payload.tenantsMonthWiseData,
    };
  }

  if (action.type === 'LANDLORD_PROPERTIES') {
    return {
      ...state,
      landlordProperties: action.payload.landlordProperties,
      PropertyMonthWiseData: action.payload.PropertyMonthWiseData,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AdminContext = createContext(null);

// ----------------------------------------------------------------------

AdminProvider.propTypes = {
  children: PropTypes.node,
};

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  const landlords = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/landlord/all-landlords-with-properties`);

      const allLandlords = data.reverse();
      const todayLandlords = todayRegistered(allLandlords);
      const yesterdayLandlords = yesterdayRegistered(allLandlords);

      const landlordPercentage = percentageChange(todayLandlords.length, yesterdayLandlords.length);
      const landlordWeekData = weekData(data);
      const LandlordMonthWiseData = CountMonthWiseData(data);

      dispatch({
        type: 'ALL_LANDLORDS',
        payload: {
          allLandlords,
          todayLandlords,
          landlordPercentage,
          landlordWeekData,
          LandlordMonthWiseData,
        },
      });

      return {
        allLandlords,
        todayLandlords,
        landlordPercentage,
        landlordWeekData,
        LandlordMonthWiseData,
      };
    } catch (error) {
      return {};
    }
  }, []);

  const roommates = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/roommate/all-roommates-with-ads`);
      const allRoommates = data.reverse();
      const todayRoommates = todayRegistered(allRoommates);
      const yesterdayRoommates = yesterdayRegistered(allRoommates);
      const roommatePercentage = percentageChange(todayRoommates.length, yesterdayRoommates.length);
      const roommateWeekData = weekData(allRoommates);
      const roommateMonthWiseData = CountMonthWiseData(allRoommates);
      dispatch({
        type: 'ALL_ROOMMATES',
        payload: {
          allRoommates,
          todayRoommates,
          roommatePercentage,
          roommateWeekData,
          roommateMonthWiseData,
        },
      });
      return {
        allRoommates,
        todayRoommates,
        roommatePercentage,
        roommateWeekData,
        roommateMonthWiseData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  const tenants = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/roommate/all-users-without-ads`);

      const allTenants = data.reverse();
      const todayTenants = todayRegistered(allTenants);
      const yesterdayTenants = yesterdayRegistered(allTenants);
      const tenantsPercentage = percentageChange(todayTenants.length, yesterdayTenants.length);
      const tenantsWeekData = weekData(allTenants);
      const tenantsMonthWiseData = CountMonthWiseData(allTenants);
      dispatch({
        type: 'ALL_TENANTS',
        payload: {
          allTenants,
          todayTenants,
          tenantsPercentage,
          tenantsWeekData,
          tenantsMonthWiseData,
        },
      });
      return {
        allTenants,
        todayTenants,
        tenantsPercentage,
        tenantsWeekData,
        tenantsMonthWiseData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  const maintenance = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users/all-users`);

      const allMaintainers = data.filter((landlord) => landlord.type === 'maintainer').reverse();

      const todayMaintainers = todayRegistered(allMaintainers);
      const yesterdayMaintainers = yesterdayRegistered(allMaintainers);
      const maintainerPercentage = percentageChange(
        todayMaintainers.length,
        yesterdayMaintainers.length
      );
      const maintainersWeekData = weekData(allMaintainers);
      const maintainersMonthWiseData = CountMonthWiseData(allMaintainers);

      dispatch({
        type: 'ALL_MAINTAINERS',
        payload: {
          allMaintainers,
          todayMaintainers,
          maintainerPercentage,
          maintainersWeekData,
          maintainersMonthWiseData,
        },
      });

      return {
        allMaintainers,
        todayMaintainers,
        maintainerPercentage,
        maintainersWeekData,
        maintainersMonthWiseData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  const users = useCallback(async () => {
    try {
      const responseForAllUser = await axios.get(`${API_URL}/users/all-users`);
      const roommatesOfAllUser = await axios.get(`${API_URL}/roommate/all-users-with-ads`);
      const allUsers = addIdCode(responseForAllUser.data, '', roommatesOfAllUser).reverse();
      const todayUsers = todayRegistered(allUsers);
      const yesterdayUsers = yesterdayRegistered(allUsers);
      const usersPercentage = percentageChange(todayUsers.length, yesterdayUsers.length);
      const usersWeekData = weekData(allUsers);
      const usersMonthWiseData = CountMonthWiseData(allUsers);
      dispatch({
        type: 'ALL_USERS',
        payload: {
          allUsers,
          todayUsers,
          usersPercentage,
          usersWeekData,
          usersMonthWiseData,
        },
      });
      return {
        allUsers,
        todayUsers,
        usersPercentage,
        usersWeekData,
        usersMonthWiseData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  const landlordProperty = useCallback(async (id) => {
    try {
      const response = await axios.post(`${API_URL}/landlord/landlord-properties`, { id });
      const landlordProperties = response.data.reverse();
      const PropertyMonthWiseData = CountMonthWiseData(landlordProperties);

      dispatch({
        type: 'LANDLORD_PROPERTIES',
        payload: {
          landlordProperties,
          PropertyMonthWiseData,
        },
      });
      return {
        landlordProperties,
        PropertyMonthWiseData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    await landlords();
    await roommates();
    await tenants();
    await maintenance();
    await users();
  }, [landlords, roommates, tenants, maintenance, users]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedValue = useMemo(
    () => ({
      allUsers: state.allUsers,
      todayUsers: state.todayUsers,
      usersPercentage: state.usersPercentage,
      usersWeekData: state.usersWeekData,
      usersMonthWiseData: state.usersMonthWiseData,
      users,

      allLandlords: state.allLandlords,
      todayLandlords: state.todayLandlords,
      landlordPercentage: state.landlordPercentage,
      landlordWeekData: state.landlordWeekData,
      LandlordMonthWiseData: state.LandlordMonthWiseData,
      landlords,

      allMaintainers: state.allMaintainers,
      todayMaintainers: state.todayMaintainers,
      maintainerPercentage: state.maintainerPercentage,
      maintainersWeekData: state.maintainersWeekData,
      maintainersMonthWiseData: state.maintainersMonthWiseData,
      maintenance,

      allRoommates: state.allRoommates,
      todayRoommates: state.todayRoommates,
      roommatePercentage: state.roommatePercentage,
      roommateWeekData: state.roommateWeekData,
      roommateMonthWiseData: state.roommateMonthWiseData,
      roommates,

      allTenants: state.allTenants,
      todayTenants: state.todayTenants,
      tenantsPercentage: state.tenantsPercentage,
      tenantsWeekData: state.tenantsWeekData,
      tenantsMonthWiseData: state.tenantsMonthWiseData,
      tenants,

      landlordProperties: state.landlordProperties,
      PropertyMonthWiseData: state.PropertyMonthWiseData,
      landlordProperty,

      fetchAllUsers,
    }),
    [
      state.allUsers,
      state.todayUsers,
      state.usersPercentage,
      state.usersWeekData,
      state.usersMonthWiseData,
      users,
      state.allLandlords,
      state.todayLandlords,
      state.landlordPercentage,
      state.landlordWeekData,
      state.LandlordMonthWiseData,
      landlords,
      state.allMaintainers,
      state.todayMaintainers,
      state.maintainerPercentage,
      state.maintainersWeekData,
      state.maintainersMonthWiseData,
      maintenance,
      state.allRoommates,
      state.todayRoommates,
      state.roommatePercentage,
      state.roommateWeekData,
      roommates,
      state.allTenants,
      state.todayTenants,
      state.tenantsPercentage,
      state.tenantsWeekData,
      state.roommateMonthWiseData,
      state.tenantsMonthWiseData,
      tenants,
      state.landlordProperties,
      state.PropertyMonthWiseData,
      landlordProperty,

      fetchAllUsers,
    ]
  );

  return <AdminContext.Provider value={memoizedValue}>{children}</AdminContext.Provider>;
}
