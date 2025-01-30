"use client";
import { useContext, useState, ReactNode, useEffect } from "react";
import { CreateReservationParams } from "../types/create-reservation-params";
import { ReservationDataContext, ReservationDataContextType } from "../contexts/reservationDataContext";

export default function ReservationDataProvider({ children }: { children: ReactNode }) {
    const [reservationData, setReservationData] = useState<CreateReservationParams | null>(() => {
        if (typeof window !== 'undefined') {
            const storedReservationData = localStorage.getItem('reservationData');
            return storedReservationData ? JSON.parse(storedReservationData) : null;
        }
    });

    const saveReservationData = (data: CreateReservationParams | null) => {
        setReservationData(data);
        if (data) {
            localStorage.setItem('reservationData', JSON.stringify(data));
        } else {
            localStorage.removeItem('reservationData');
        }
    }

    useEffect(() => {
        const storedReservationData = localStorage.getItem('reservationData');
        setReservationData(storedReservationData ? JSON.parse(storedReservationData) : null);
    }, []);

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