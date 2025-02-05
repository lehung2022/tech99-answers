"use client";

import { useEffect, useState } from "react";
import { currencies } from "../lib/currencies"; // Static list of currency codes

const tokenToFiatMap: Record<string, string> = {
  USDC: "USD",
  BUSD: "USD",
  USDT: "USD",
};

export const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Map the data to a key-value pair where key = currency code and value = price
        const rates = data.reduce(
          (
            acc: Record<string, number>,
            item: { currency: string; price: number }
          ) => {
            let fiatCurrency = tokenToFiatMap[item.currency] || item.currency; // Map to fiat if available
            acc[fiatCurrency] = item.price;
            return acc;
          },
          {}
        );

        // Filter out only the currencies we care about from the static currency list
        const filteredRates: Record<string, number> = {};
        currencies.forEach((currency) => {
          if (rates[currency.code]) {
            filteredRates[currency.code] = rates[currency.code];
          }
        });

        setExchangeRates(filteredRates);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch exchange rates");
      }
    };

    fetchExchangeRates();
  }, []);

  return { exchangeRates, loading, error };
};
