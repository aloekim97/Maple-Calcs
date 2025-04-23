import { useEffect, useState } from 'react';

export function useLocalStorageSync() {
  const [state, setState] = useState({
    endStar: '',
    lines: {
      line1: '',
      line2: '',
      line3: ''
    },
    isLoading: true
  });

  // 1. Initial load from localStorage
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        setState(prev => ({
          ...prev,
          endStar: localStorage.getItem('endStar') || '',
          lines: {
            line1: localStorage.getItem('potLine1') || '',
            line2: localStorage.getItem('potLine2') || '',
            line3: localStorage.getItem('potLine3') || ''
          },
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to read from localStorage:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadFromStorage();
  }, []);

  // 2. Storage event handler for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;

      try {
        // Handle endStar changes
        if (e.key === 'endStar') {
          setState(prev => ({
            ...prev,
            endStar: e.newValue || ''
          }));
          return;
        }

        // Handle potLine changes
        if (e.key.startsWith('potLine')) {
          const lineNum = e.key.replace('potLine', '');
          if (['1', '2', '3'].includes(lineNum)) {
            setState(prev => ({
              ...prev,
              lines: {
                ...prev.lines,
                [`line${lineNum}`]: e.newValue || ''
              }
            }));
          }
        }
      } catch (error) {
        console.error('Failed to handle storage change:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 3. Custom event for same-tab changes
  useEffect(() => {
    const handleLocalChange = () => {
      try {
        setState(prev => ({
          ...prev,
          endStar: localStorage.getItem('endStar') || '',
          lines: {
            line1: localStorage.getItem('potLine1') || '',
            line2: localStorage.getItem('potLine2') || '',
            line3: localStorage.getItem('potLine3') || ''
          }
        }));
      } catch (error) {
        console.error('Failed to handle local change:', error);
      }
    };

    // Listen for custom event when local changes occur
    window.addEventListener('localStorageUpdated', handleLocalChange);
    return () => window.removeEventListener('localStorageUpdated', handleLocalChange);
  }, []);

  // 4. Function to update storage and dispatch events
  const updateStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      // Dispatch custom event for same-tab listeners
      window.dispatchEvent(new Event('localStorageUpdated'));
      // Storage event automatically triggers for other tabs
    } catch (error) {
      console.error('Failed to update localStorage:', error);
    }
  };

  return {
    ...state,
    updateStorage
  };
}