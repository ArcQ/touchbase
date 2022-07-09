import { useState, useEffect, useCallback } from 'react';

export const ASYNC_SUCESS = 'success';
export const ASYNC_ERROR = 'error';
export const ASYNC_IDLE = 'idle';

// TODO deprecated, should use react-query everywhere
const useAsync = (asyncFunction, immediate = false, onError) => {
  const [state, setState] = useState({
    status: ASYNC_IDLE,
    value: null,
    error: null,
  });
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (...values) => {
      setState({
        status: ASYNC_IDLE,
        value: null,
        error: null,
      });
      return asyncFunction(...values)
        .then(response => {
          setState({
            status: ASYNC_SUCESS,
            value: response,
            error: null,
          });
        })
        .catch(error => {
          console.warn(error);
          if (onError) onError(error);
          setState({
            status: ASYNC_ERROR,
            value: null,
            error,
          });
        });
    },
    [asyncFunction],
  );
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {
    execute,
    status: state.status,
    value: state.value,
    error: state.error,
  };
};

export default useAsync;
