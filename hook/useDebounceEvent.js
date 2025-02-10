import { useEffect, useCallback } from "react";

export function useDebounceEvent(eventName, callback, delay = 250) {
  const debouncedCallback = useCallback(
    debounce((...args) => callback(...args), delay),
    [callback, delay]
  );

  useEffect(() => {
    window.addEventListener(eventName, debouncedCallback);
    return () => window.removeEventListener(eventName, debouncedCallback);
  }, [eventName, debouncedCallback]);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
