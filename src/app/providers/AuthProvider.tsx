"use client";
import { useContext, useEffect, useState, ReactNode } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { AuthContext, AuthContextType } from "../contexts/authContext";
import { auth } from "@/configs/firebaseConfig";

export default function AuthProvider({ children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, (user) => {  
            console.log(user)          
            setUser(user);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utiliser avec un AuthProvider");
    }
    return context;
};