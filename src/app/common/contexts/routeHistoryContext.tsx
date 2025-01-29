import { createContext } from "react";

export interface RouteHistoryContextType {
    previousRoute: string | null;
    addRoute: (route: string) => void;
}

export const RouteHistoryContext = createContext<RouteHistoryContextType | undefined>(undefined);