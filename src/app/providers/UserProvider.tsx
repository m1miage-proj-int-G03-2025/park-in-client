import { UserContext } from "@/contexts/userContext";
import { ReactNode, useContext, useState } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
  
    return (
      <UserContext.Provider value={{ userId, setUserId }}>
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