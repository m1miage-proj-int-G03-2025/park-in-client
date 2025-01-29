import  { createContext } from 'react';
import { UserDetails } from '../types/user-details';

interface UserContextType {
  userInfo: UserDetails | null; 
  addUserInfo: (userInfo: UserDetails | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);