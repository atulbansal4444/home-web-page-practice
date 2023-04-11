import { useState, useEffect } from "react";

export const useDynamicHook = ({ delay, increment, length }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((storedIndex) => {
        return (storedIndex + increment) % length;
      });
    }, delay);
    return () => {
      clearInterval(interval);
    }
  }, [delay, increment, length]);

  return index;
};