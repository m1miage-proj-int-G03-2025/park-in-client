import { ParkingData } from "@/views/parkings/components/Parking";
// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function searchParkings(): Promise<ParkingData[]> {
    // return axios.get<ParkingParams[]>(`${serverUrl}/parkings`, {
    //     params,
    //     responseType:'stream'
    // });
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    nom: "Parking Central",
                    adresse: "123 Rue Principale, 38000 Grenoble",
                    xLongitude: 5.7245,
                    yLatitude: 45.1885,
                    urlSite: "http://parkingcentral.com",
                    nombrePlacesDisponibles: 50,
                    tarifMin: 2.5,
                    typesPlacesDisponibles: ["voiture", "moto", "vélo"],
                    parkingId: "1"
                },
                {
                    nom: "Parking Gare",
                    adresse: "456 Avenue de la Gare, 38000 Grenoble",
                    xLongitude: 5.7169,
                    yLatitude: 45.1910,
                    urlSite: "http://parkinggare.com",
                    nombrePlacesDisponibles: 30,
                    tarifMin: 3.0,
                    typesPlacesDisponibles: ["voiture", "moto"],
                    parkingId: "2"
                },
                {
                    nom: "Parking Université",
                    adresse: "789 Boulevard des Étudiants, 38400 Saint-Martin-d'Hères",
                    xLongitude: 5.7692,
                    yLatitude: 45.1938,
                    urlSite: "http://parkinguniversite.com",
                    nombrePlacesDisponibles: 100,
                    tarifMin: 1.5,
                    typesPlacesDisponibles: ["voiture", "vélo"],
                    parkingId: "3"
                },
                {
                    nom: "Parking Centre Commercial",
                    adresse: "101 Rue du Commerce, 38100 Grenoble",
                    xLongitude: 5.7283,
                    yLatitude: 45.1642,
                    urlSite: "http://parkingcentrecommercial.com",
                    nombrePlacesDisponibles: 200,
                    tarifMin: 2.0,
                    typesPlacesDisponibles: ["voiture", "moto", "vélo", "handicapé"],
                    parkingId: "4"
                },
                {
                    nom: "Parking Parc",
                    adresse: "202 Allée des Jardins, 38000 Grenoble",
                    xLongitude: 5.7356,
                    yLatitude: 45.1821,
                    urlSite: "http://parkingparc.com",
                    nombrePlacesDisponibles: 75,
                    tarifMin: 2.2,
                    typesPlacesDisponibles: ["voiture", "vélo", "handicapé"],
                    parkingId: "5"
                }
            ]);
        }, 1000);
    });
}