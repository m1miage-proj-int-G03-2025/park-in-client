import  { createContext } from 'react';

interface UserContextType {
  userId: string | null;
  addUser: (id: string | null) => void;
  isInitialized: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined);