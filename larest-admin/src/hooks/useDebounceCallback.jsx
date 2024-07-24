import { useRef } from 'react';

const useDebouncedCallback = (callback, delay) => {
  const debounceTimeout = useRef(null);

  const debouncedCallback = (...args) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebouncedCallback;