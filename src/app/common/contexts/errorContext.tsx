import React, { createContext, useContext, useState } from 'react';
import { Alert } from '@heroui/react';

interface ErrorContextType {
    showErrorMessage: (message: string) => void;
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

    const showErrorMessage = (message: string) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage("");
        }, 2000);
    }

    return (
        <ErrorContext.Provider value={{ showErrorMessage }}>
            {children}
            {errorMessage?.length > 0 && (
                <div className="fixed z-50 fixed top-28 right-4">
                    <Alert title={errorMessage} color='danger' variant='flat' radius='lg' onClose={() => setErrorMessage("")} />
                </div>
            )}
        </ErrorContext.Provider>
    );
};
