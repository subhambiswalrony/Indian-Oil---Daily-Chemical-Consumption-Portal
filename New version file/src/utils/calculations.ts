/**
 * Calculates closing balance from opening balance, received quantity, and consumption
 * 
 * @param opening - Opening balance
 * @param received - Received quantity
 * @param consumption - Consumption quantity
 * @returns Closing balance
 */
export const calculateClosingBalance = (
  opening: number,
  received: number,
  consumption: number
): number => {
  return opening + received - consumption;
};

/**
 * Formats a number to a fixed number of decimal places
 * 
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals);
};