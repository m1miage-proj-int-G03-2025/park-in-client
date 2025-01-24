import { axios } from "@/configs/axios";


export async function getUserData(email: string): Promise<{nom: string, prenom: string, idUtilisateur: string}> {
 const response = await axios.get(`/utilisateurs/${email}`)
 console.log(response.data)
 return response.data
}