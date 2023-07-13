import { createContext, useState } from 'react';

interface Context {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const initialContext: Context = {
  isLoading: false,
  setLoading: () => {},
};

export const LoaderContext = createContext(initialContext);

export const LoaderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(initialContext.isLoading);

  const contextValue: Context = {
    isLoading,
    setLoading,
  };
  return <LoaderContext.Provider value={contextValue}>{children}</LoaderContext.Provider>;
};
