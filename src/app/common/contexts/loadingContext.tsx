import React, { createContext, useContext, useState } from 'react';
import { Progress } from '@heroui/react';

interface LoadingContextType {
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full bg-black bg-opacity-70 h-full flex items-center justify-center z-50">
            <div className='w-1/2'>
          <Progress isIndeterminate aria-label="Loading..." size="md" color='secondary'/>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
