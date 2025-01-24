import { axios } from "@/configs/axios";

export async function cancelReservation(idReservation: number) {
    return await axios.patch(`/reservations/${idReservation}/annulation`)

  }
