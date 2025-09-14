"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { CartItem } from './CartContext';

interface Order {
  id: string;
  code: string; 
  items: CartItem[];
  date: string;
}

type HistoryContextType = {
  history: Order[];
  addOrderToHistory: (order: Order) => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<Order[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("orderHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(history));
  }, [history]);

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
