import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FallbackContextType {
  isFallback: boolean;
  setIsFallback: (value: boolean) => void;
}

const FallbackContext = createContext<FallbackContextType>({
  isFallback: false,
  setIsFallback: () => {},
});

export const useFallback = () => useContext(FallbackContext);

export const FallbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFallback, setIsFallback] = useState(false);
  return (
    <FallbackContext.Provider value={{ isFallback, setIsFallback }}>
      {children}
    </FallbackContext.Provider>
  );
};
