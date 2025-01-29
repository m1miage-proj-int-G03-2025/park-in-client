import { createContext } from "react";
import { CreateReservationParams } from "../types/create-reservation-params";

export interface ReservationDataContextType {
    reservationData: CreateReservationParams | null;
    saveReservationData: (data: CreateReservationParams | null) => void
}

export const ReservationDataContext = createContext<ReservationDataContextType | undefined>(undefined);