/**
 * Utility functions for FX rate calculations and validations
 */

const OVERRIDE_THRESHOLD_PERCENTAGE = 2; // 2% threshold

/**
 * Calculates the percentage difference between two rates
 */
export const calculatePercentageDifference = (
  rate1: number,
  rate2: number
): number => {
  return Math.abs(((rate1 - rate2) / rate2) * 100);
};

/**
 * Checks if an override rate is valid (within 2% of the real-time rate)
 */
export const isOverrideRateValid = (
  overrideRate: number,
  realTimeRate: number
): boolean => {
  const difference = calculatePercentageDifference(overrideRate, realTimeRate);
  return difference <= OVERRIDE_THRESHOLD_PERCENTAGE;
};

/**
 * Determines which rate to use for conversion
 * Returns the override rate if it's valid, otherwise returns the real-time rate
 */
export const getEffectiveRate = (
  overrideRate: number | null,
  realTimeRate: number
): { rate: number; isUsingOverride: boolean } => {
  if (overrideRate === null || overrideRate <= 0) {
    return { rate: realTimeRate, isUsingOverride: false };
  }

  const isValid = isOverrideRateValid(overrideRate, realTimeRate);
  
  return {
    rate: isValid ? overrideRate : realTimeRate,
    isUsingOverride: isValid,
  };
};
