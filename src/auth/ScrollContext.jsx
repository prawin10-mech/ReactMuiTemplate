import PropTypes from 'prop-types';
import { createContext, useReducer, useCallback, useMemo } from 'react';

const initialState = {
  scrollTo: '',
};

const reducer = (state, action) => {
  if (action.type === 'SCROLL') {
    return {
      scrollTo: action.payload,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const ScrollContext = createContext(null);

// ----------------------------------------------------------------------

ScrollProvider.propTypes = {
  children: PropTypes.node,
};

export function ScrollProvider({ children }) {
  const [state] = useReducer(reducer, initialState);

  const scroll = useCallback(async (to) => {
    try {
      const targetElement = document.querySelector(`[data-name="${to}"]`);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }

      return {};
    } catch (error) {
      return {};
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({ scroll, scrollTo: state.scrollTo }),
    [scroll, state.scrollTo]
  );

  return <ScrollContext.Provider value={memoizedValue}>{children}</ScrollContext.Provider>;
}
