import React, { createContext, ReactNode, useContext, useState } from 'react';
import { defaultDataList, IDataList } from 'src/types/apps/listTypes';

interface ClientDetailContextProps {
  client: any;
  history: any;
  orders: IDataList;
  setClient: (value: boolean) => void
  setHistory: (value: boolean) => void
  setOrders: (value: boolean) => void
}

type Props = {
  children: ReactNode
}

export const ClientDetailContext = createContext<ClientDetailContextProps>({
  client: null,
  history: null,
  orders: defaultDataList,
  setClient: () => null,
  setHistory: () => null,
  setOrders: () => null,
});

export const useClientDetail = () => useContext(ClientDetailContext)

export const ClientDetailProvider = ({ children }: Props) => {
  const [client, setClient] = useState<any>(null);
  const [history, setHistory] = useState<any>([]);
  const [orders, setOrders] = useState<any>(defaultDataList);

  const value = {
    client, setClient,
    history, setHistory,
    orders, setOrders,
  };

  return (
    <ClientDetailContext.Provider value={value}>
      {children}
    </ClientDetailContext.Provider>
  );
};