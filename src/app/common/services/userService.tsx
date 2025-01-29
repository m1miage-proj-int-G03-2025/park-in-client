import fetchStream from "@/common/configs/fetchStreamConfig";
import { axios } from "@/common/configs/axios";
import { UserDetails } from "../types/user-details";

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

interface CreateUserParams {
    nom: string;
    prenom: string;
    email: string;
}

export async function getUserData(email: string): Promise<UserDetails[]> {
 return await fetchStream<unknown, UserDetails, unknown>(`${serverUrl}/utilisateurs/${email}`);
}

export async function getUserReservations(idUtilisateur: string): Promise<ReservationDetails[]> {
    return await fetchStream<unknown, ReservationDetails, unknown>(`${serverUrl}/utilisateurs/${idUtilisateur}/reservations`)
}


export async function createUser(createUserParams: CreateUserParams): Promise<UserDetails> {
    return (await axios.post<UserDetails>(`${serverUrl}/utilisateurs`, {...createUserParams})).data;
}