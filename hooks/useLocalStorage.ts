'use client';

import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = typeof value === 'function' ? (value as (prevValue: T) => T)(prev) : value;

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
          window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key } }));
        }

        return nextValue;
      });
    },
    [key],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(key);
      const nextValue = item ? (JSON.parse(item) as T) : initialValue;
      queueMicrotask(() => setStoredValue(nextValue));
    } catch {
      queueMicrotask(() => setStoredValue(initialValue));
    }

    const handleStorage = (event: StorageEvent | CustomEvent<{ key?: string }>) => {
      const nextKey = 'key' in event ? event.key : event.detail?.key;

      if (nextKey === key) {
        try {
          const item = window.localStorage.getItem(key);
          setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
        } catch {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorage as EventListener);
    window.addEventListener('local-storage-update', handleStorage as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage as EventListener);
      window.removeEventListener('local-storage-update', handleStorage as EventListener);
    };
  }, [initialValue, key]);

  return [storedValue, setValue] as const;
}
