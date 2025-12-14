import { useState, useEffect } from 'react';

const INITIAL_RATE = 1.1;
const UPDATE_INTERVAL_MS = 3000; // 3 seconds
const MIN_DELTA = -0.05;
const MAX_DELTA = 0.05;

/**
 * Custom hook to manage EUR/USD foreign exchange rate
 * The rate starts at 1.1 and updates every 3 seconds with a random fluctuation
 * between -0.05 and +0.05
 */
export const useEurUsdRate = () => {
  const [rate, setRate] = useState<number>(INITIAL_RATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setRate((currentRate) => {
        // Generate random delta between -0.05 and +0.05
        const delta = Math.random() * (MAX_DELTA - MIN_DELTA) + MIN_DELTA;
        const newRate = currentRate + delta;
        
        // Return new rate with 4 decimal precision for display
        return Number(newRate.toFixed(4));
      });
    }, UPDATE_INTERVAL_MS);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return rate;
};
