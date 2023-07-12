import { createContext, useState } from 'react';

interface Context {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const initialContext: Context = {
  isLoading: false,
  setLoading: () => {},
};

export const UserContext = createContext(initialContext);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(initialContext.isLoading);

  const contextValue: Context = {
    isLoading,
    setLoading,
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
