"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Order = {
  id: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  date: string;
};

type HistoryContextType = {
  history: Order[];
  addOrderToHistory: (order: Order) => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<Order[]>([]);

  // Load saved history from localStorage on page load
  useEffect(() => {
    const savedHistory = localStorage.getItem("orderHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(history));
  }, [history]);

  // Function to add a new order to history
  const addOrderToHistory = (order: Order) => {
    setHistory((prev) => [order, ...prev]);
  };

  return (
    <HistoryContext.Provider value={{ history, addOrderToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistoryContext must be used within a HistoryProvider");
  }
  return context;
};
