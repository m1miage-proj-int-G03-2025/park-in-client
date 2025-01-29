import { axios } from "@/common/configs/axios";

export async function cancelReservation(idReservation: string) {
    return await axios.patch(`/reservations/${idReservation}/annulation`)
  }

export async function getReservationDetails(idReservation: string) {
    return await axios.get(`/reservations/${idReservation}`)
}