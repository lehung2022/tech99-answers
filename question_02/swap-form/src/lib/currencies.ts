export interface Currency {
  name: string;
  symbol: string;
  code: string;
}

export const currencies: Currency[] = [
  { name: "Hong Kong Dollar", symbol: "$", code: "HKD" },
  { name: "Taiwan Dollar", symbol: "NT$", code: "TWD" },
  { name: "Japanese Yen", symbol: "¥", code: "JPY" },
  { name: "South Korean Won", symbol: "₩", code: "KRW" },
  { name: "US Dollar", symbol: "$", code: "USD" },
  { name: "Vietnamese Dong", symbol: "₫", code: "VND" },
  { name: "Ukrainian Hryvnia", symbol: "₴", code: "UAH" },
  { name: "Philippine Peso", symbol: "₱", code: "PHP" },
  { name: "USDC (USD Coin)", symbol: "$", code: "USDC" }, 
  { name: "BUSD (Binance USD)", symbol: "$", code: "BUSD" },
  { name: "ETH (Ethereum)", symbol: "Ξ", code: "ETH" },
  { name: "BTC (Bitcoin)", symbol: "₿", code: "BTC" },
  // Add other cryptocurrencies as needed
];
