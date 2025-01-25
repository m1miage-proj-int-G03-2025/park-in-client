"use client";
import { createContext } from "react";
import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);