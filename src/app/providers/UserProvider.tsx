import { UserContext } from "@/contexts/userContext";
import { ReactNode, useContext, useEffect, useState } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false)

    const addUser = async (id: string | null) => {
      if(id && id.length >0) {}
      setUserId(id);
      if (id !== null) {
        await localStorage.setItem('userId', id);
      } else {
        await localStorage.removeItem('userId');
      }
    }

    useEffect(() => {
      if (typeof window !== 'undefined') {
          const storedUserId = localStorage.getItem('userId');
          setUserId(storedUserId || null);
          setIsInitialized(true); 
      }
  }, []);
  
  
    return (
      <UserContext.Provider value={{ userId, addUser, isInitialized }}>
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