"use client";
import { useContext, useState, ReactNode } from "react";
import { RouteHistoryContext, RouteHistoryContextType } from "../contexts/routeHistoryContext";

export default function RouteHistoryProvider({ children}: { children: ReactNode }) {
    const [previousRoute, setRouteHistory] = useState<string | null>(null);

    const addRoute = (route: string) => {
        setRouteHistory(route)
    }

    return (
        <RouteHistoryContext.Provider value={{ previousRoute, addRoute }}>
            {children}
        </RouteHistoryContext.Provider>
    );
};

export const useRouteHistory = (): RouteHistoryContextType => {
    const context = useContext(RouteHistoryContext);
    if (context === undefined) {
        throw new Error("useRouterHistory doit être utiliser avec un RouteHistoryProvider");
    }
    return context;
};