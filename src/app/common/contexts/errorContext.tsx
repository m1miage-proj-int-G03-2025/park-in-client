import React, { createContext, useContext, useState } from 'react';
import { Alert } from '@heroui/react';

interface ErrorContextType {
    setErrorMessage: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an Error Provider');
    }
    return context;
};

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <ErrorContext.Provider value={{ setErrorMessage }}>
            {children}
            {errorMessage?.length > 0 && (
                <div
                    className="fixed top-0 right-0 z-50 w-full flex justify-end"
                >
                    <Alert title={errorMessage} color='danger' variant='faded' radius='lg' className="mx-auto mt-4 max-w-md" onClose={() => setErrorMessage("")} />
                </div>
            )}
        </ErrorContext.Provider>
    );
};
