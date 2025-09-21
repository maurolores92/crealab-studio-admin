
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ExpenseDetailContextProps {
  expenses: any;
  history: any;
  items: any;
  setExpenses: (value: boolean) => void
  setHistory: (value: boolean) => void
  setItems: (value: boolean) => void
}

type Props = {
  children: ReactNode
}

export const ExpenseDetailContext = createContext<ExpenseDetailContextProps>({
  expenses: null,
  history: null,
  items: null,
  setExpenses: () => null,
  setHistory: () => null,
  setItems: () => null,
});

export const useExpenseDetail = () => useContext(ExpenseDetailContext)

export const ExpenseDetailProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<any>(null);
  const [history, setHistory] = useState<any>([]);
  const [items, setItems] = useState<any>([]);

  const value = {
    expenses,
    history,
    setExpenses,
    setHistory,
    items,
    setItems,
  };

  return (
    <ExpenseDetailContext.Provider value={value}>
      {children}
    </ExpenseDetailContext.Provider>
  );
};
