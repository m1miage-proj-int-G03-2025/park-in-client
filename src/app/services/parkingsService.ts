import { ParkingsParams } from "@/views/parkings";
import { ParkingData } from "@/views/parkings/components/Parking";
import dayjs from "@/configs/dayjsConfig";
import fetchStream from "@/configs/fetchStreamConfig";
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
    return await fetchStream<unknown, ParkingData>(`${serverUrl}/parkings/`, params);
}