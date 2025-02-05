"use client";

import React, { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { useExchangeRates } from "../hooks/useExchangeRates";

const Swap = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("VND");
  const [toCurrency, setToCurrency] = useState<string>("TWD");
  const [amountToSend, setAmountToSend] = useState<number>(0);
  const [amountToReceive, setAmountToReceive] = useState<number>(0);

 
  const { exchangeRates, loading, error } = useExchangeRates();

  useEffect(() => {
    if (
      amountToSend > 0 &&
      fromCurrency &&
      toCurrency &&
      exchangeRates[fromCurrency] &&
      exchangeRates[toCurrency]
    ) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      setAmountToReceive(amountToSend * rate);
    }
  }, [amountToSend, fromCurrency, toCurrency, exchangeRates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      fromCurrency,
      toCurrency,
      amountToSend,
      amountToReceive,
    };
    console.log("Form submitted:", formData);
  };

  if (loading) {
    return <div>Loading exchange rates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-indigo-400 p-10 rounded-lg shadow-lg w-full max-w-lg relative"
        >
          <h5 className="text-center mb-8 text-xl">Swap Currencies</h5>
          <ThemeSwitch />

          <div className="mt-4 mb-4">
            <label
              htmlFor="input-amount"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Amount to send
            </label>
            <input
              id="input-amount"
              type="number"
              value={amountToSend}
              onChange={(e) => setAmountToSend(Number(e.target.value))}
              placeholder="Enter amount"
              required
              className="w-full p-3 mt-2 border text-gray-950 border-neutral-300 rounded-md"
            />
          </div>

          <div className="mt-4 mb-4">
            <label
              htmlFor="from-currency"
              className="block text-sm font-medium text-gray-700"
            >
              From Currency
            </label>
            <select
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 mt-2 border text-gray-950 border-neutral-300 rounded-md"
            >
              {Object.keys(exchangeRates).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 mb-4">
            <label
              htmlFor="to-currency"
              className="block text-sm font-medium text-gray-700"
            >
              To Currency
            </label>
            <select
              id="to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 mt-2 border text-gray-950 border-neutral-300 rounded-md"
            >
              {Object.keys(exchangeRates).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="output-amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to receive
            </label>
            <input
              id="output-amount"
              type="number"
              value={amountToReceive}
              readOnly
              className="w-full p-3 mt-2 border text-gray-950 border-neutral-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-400 focus:ring-2 focus:ring-green-300 active:bg-green-600 focus:outline-none"
          >
            CONFIRM SWAP
          </button>
        </form>
      </div>
    </>
  );
};

export default Swap;
