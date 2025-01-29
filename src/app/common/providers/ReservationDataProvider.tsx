"use client";
import { useContext, useState, ReactNode } from "react";
import { CreateReservationParams } from "../types/create-reservation-params";
import { ReservationDataContext, ReservationDataContextType } from "../contexts/reservationDataContext";

export default function ReservationDataProvider({ children}: { children: ReactNode }) {
    const [reservationData, setReservationData] = useState<CreateReservationParams | null>(null);

    const saveReservationData = (data: CreateReservationParams | null) => {
        setReservationData(data);
    }

    return (
        <ReservationDataContext.Provider value={{ reservationData, saveReservationData }}>
            {children}
        </ReservationDataContext.Provider>
    );
};

export const useReservationData = (): ReservationDataContextType => {
    const context = useContext(ReservationDataContext);
    if (context === undefined) {
        throw new Error("useReservationData doit être utiliser avec un ReservationDataProvider");
    }
    return context;
};