import { round } from "lodash";


export function formatLargeNumber(data: any) {

  // Define suffixes for large numbers
  const suffixes = ["", "K", "M", "B", "T"];
  data = data.toString();
  const parts = data.split(".");
  const wholePart = parts[0];

  // Find the index of appropriate suffix
  const suffixIndex = Math.floor(("" + wholePart).length / 3);

  // Calculate the number with corresponding suffix
  const formattedNumber = parseFloat((wholePart / Math.pow(1000, suffixIndex)).toFixed(2)) + suffixes[suffixIndex];

  // Format the number with thousands and decimal separators
  return formatNumber(formattedNumber);
}
export const format = (total: number): string => {
 
  return round(total, 2)
  .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Function to format numbers with thousands and decimal separators
export function formatNumber(data: any) {

  // Convert the number to string
  data = data.toString();

  // Separate decimals from the number
  const parts = data.split(".");
  let wholePart = parts[0];
  const decimalPart = parts.length > 1 ? "," + parts[1] : "";

  // Add commas for thousands separator
  wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Join the whole part and the decimal part
  return wholePart + decimalPart;
}
