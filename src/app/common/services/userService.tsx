import fetchStream from "@/common/configs/fetchStreamConfig";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface ReservationDetails {
    idReservation : string,
    heureDebut : Date,
    heureFin : Date,
    typeDePlaceEnum : string,
    nomParking : string,
    adresseParking : string,
    statut: string,
}

export async function getUserData(email: string): Promise<{nom: string, prenom: string, idUtilisateur: string}[]> {
 return await fetchStream<unknown, {nom: string, prenom: string, idUtilisateur: string}, unknown>(`${serverUrl}/utilisateurs/${email}`);
}

export async function getUserReservations(idUtilisateur: string): Promise<ReservationDetails[]> {
    return await fetchStream<unknown, ReservationDetails, unknown>(`${serverUrl}/utilisateurs/${idUtilisateur}/reservations`)
  }
