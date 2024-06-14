"use client";

import React from "react";
import { useEffect, useState } from "react";

const useLocalStorage = <T extends any>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
  const [state, setState] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Initialize the state
    try {
      const value = window.localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      setState(value ? JSON.parse(value) : initialValue);
    } catch (error) {
      console.log(error);
    }
    setLoaded(true);
  }, []);

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // If the passed value is a callback function,
        //  then call it with the existing state.
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(value);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return [state, setValue, loaded];
};

export default useLocalStorage;
