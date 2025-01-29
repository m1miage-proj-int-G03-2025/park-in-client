import { UserContext } from "@/common/contexts/userContext";
import { ReactNode, useContext, useEffect, useState } from "react";
import { UserDetails } from "../types/user-details";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserDetails | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    }
  });

  const addUserInfo = (userInfo: UserDetails | null) => {
    setUserInfo(userInfo);
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    setUserInfo(storedUserInfo ? JSON.parse(storedUserInfo) : null);
  }, []);


  return (
    <UserContext.Provider value={{ userInfo, addUserInfo }}>
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