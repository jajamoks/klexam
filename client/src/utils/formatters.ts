// Utility functions for formatting data

export const formatCurrency = (
  amount: number,
  currency: "AUD" | "GBP" | "USD"
): string => {
  const symbol = currency === "GBP" ? "£" : currency === "AUD" ? "A$" : "$";
  return `${symbol}${amount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}; 