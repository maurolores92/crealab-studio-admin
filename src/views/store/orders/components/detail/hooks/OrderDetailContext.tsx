
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface OrderDetailContextProps {
  order: any;
  history: any;
  items: any;
  setOrder: (value: boolean) => void
  setHistory: (value: boolean) => void
  setItems: (value: boolean) => void
}

type Props = {
  children: ReactNode
}

export const OrderDetailContext = createContext<OrderDetailContextProps>({
  order: null,
  history: null,
  items: null,
  setOrder: () => null,
  setHistory: () => null,
  setItems: () => null,
});

export const useOrderDetail = () => useContext(OrderDetailContext)

export const OrderDetailProvider = ({ children }: Props) => {
  const [order, setOrder] = useState<any>(null);
  const [history, setHistory] = useState<any>([]);
  const [items, setItems] = useState<any>([]);

  const value = {
    order,
    history,
    setOrder,
    setHistory,
    items, 
    setItems,
  };

  return (
    <OrderDetailContext.Provider value={value}>
      {children}
    </OrderDetailContext.Provider>
  );
};