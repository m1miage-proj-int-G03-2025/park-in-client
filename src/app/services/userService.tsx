import fetchStream from "@/configs/fetchStreamConfig";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getUserData(email: string): Promise<{nom: string, prenom: string, idUtilisateur: string}[]> {

 return await fetchStream<unknown, {nom: string, prenom: string, idUtilisateur: string}, unknown>(`${serverUrl}/utilisateurs/${email}`);
}
