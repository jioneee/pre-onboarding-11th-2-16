import { createContext } from 'react';

interface Context {
  url: string;
}

const initialContext: Context = {
  url: 'https://api.github.com/repos/facebook/react/issues',
};

export const ApiContext = createContext(initialContext);

export const ApiContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const url = 'https://api.github.com/repos/facebook/react/issues';

  const contextValue = {
    url,
  };
  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
