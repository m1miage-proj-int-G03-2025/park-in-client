import { ParkingsParams } from "@/views/parkings";
import { ParkingData } from "@/views/parkings/components/Parking";
import dayjs from "@/common/configs/dayjsConfig";
import fetchStream from "@/common/configs/fetchStreamConfig";
import { axios } from "@/common/configs/axios";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function searchParkings(data: ParkingsParams): Promise<ParkingData[]> {
    const heureDebut = dayjs(data.date).tz().format("YYYY-MM-DDTHH:mm:ss");
    const heureFin = dayjs(data.date).add(+data.duree, "minute").tz().format("YYYY-MM-DDTHH:mm:ss");

    const params = {
        inseeVille: data.inseeVille,
        heureDebut,
        heureFin,
        typeDePlace: data.typeVoiture
    };
    return await fetchStream<unknown, ParkingData, unknown>(`${serverUrl}/parkings/`, {params});
}

export async function getParkingDetails(id: string): Promise<{
    nom: string,
    adresse: string,
    urlSite: string,
    tarif1h: number,
    tarif2h: number,
    tarif3h: number,
    tarif4h: number,
    xLongitude: number,
    yLatitude: number,
}> {
    const response = await axios.get(`parkings/${id}`);
    return response.data;
}

export async function getPlacesDisponibles(data: { typePlace: string, dateDebut: string, duree: string, parkingId: string }): Promise<{ numeroPlace: string, typePlace: string }[]> {
    const dateDebut = dayjs(data.dateDebut).tz().format("YYYY-MM-DDTHH:mm:ss");
    const dateFin = dayjs(data.dateDebut).add(+data.duree, "minute").tz().format("YYYY-MM-DDTHH:mm:ss");

    const params = {
        typePlace: data.typePlace,
        dateDebut,
        dateFin,
    }
    return await fetchStream<unknown, { numeroPlace: string, typePlace: string }, unknown>(`${serverUrl}/parkings/${data.parkingId}/places`, {params});

}

export async function reservePlace(data: { numeroPlace: string, idUtilisateur: string, dateDebut: string, duree: string, idParking?: string, typePlace: string }): Promise<{ id: string }[]> {
    const heureDebut = dayjs(data.dateDebut).tz().format("YYYY-MM-DDTHH:mm:ss");
    const heureFin = dayjs(data.dateDebut).add(+data.duree, "minute").tz().format("YYYY-MM-DDTHH:mm:ss");
    if(data.numeroPlace?.length === 0 || data?.numeroPlace === undefined || data?.numeroPlace === null) {
        const params = {
            typePlace: data.typePlace,
            dateDebut: heureDebut,
            dateFin: heureFin,
          }
            await axios(`/parkings/${data.idParking}/place`, {params}).then((response) => {
        data.numeroPlace = response.data.numeroPlace
            })
    }

    const body = {
       idUtilisateur: data.idUtilisateur,
       idPlace: data.numeroPlace,
       heureDebut,
       heureFin
    }
  return await fetchStream<unknown, { id: string }, unknown >(`${serverUrl}/reservations/save`, { methode: 'POST', body });
  
}

