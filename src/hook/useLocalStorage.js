import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null || jsonValue === undefined) {
      if (typeof initialValue === 'function') {
        return initialValue;
      } else {
        return initialValue;
      }
    } else {
      if (jsonValue === undefined || jsonValue === 'undefined') return;
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    if (value) {
      let simpleObject = {};
      for (let prop in value) {
        if (!value?.hasOwnProperty(prop)) {
          continue;
        }

        if (typeof value[prop] == 'function') {
          continue;
        }

        simpleObject[prop] = value[prop];
      }

      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
}
