import { UserContext } from "@/contexts/userContext";
import { ReactNode, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId') || null);
    const {setUser} = useAuth()

    const addUser = (id: string | null) => {
      if(id && id.length >0) {}
      setUserId(id);
      if (id !== null) {
        localStorage.setItem('userId', id);
      } else {
        localStorage.removeItem('userId');
        setUser(null)
      }
    }
  
  
    return (
      <UserContext.Provider value={{ userId, addUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  };