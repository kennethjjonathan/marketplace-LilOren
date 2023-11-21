import { useEffect, useRef } from 'react';

const useDebounce = (callback: any, delay: number) => {
  const waitRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (waitRef.current) {
        clearTimeout(waitRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any[]) => {
    if (waitRef.current) {
      clearTimeout(waitRef.current);
    }

    waitRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
