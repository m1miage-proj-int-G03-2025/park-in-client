"use client";
import { use, useState } from "react";
import Parking, { ParkingData } from "./Parking";
import LeafletMap, { Marker } from "@/views/parkings/components/LeafletMap";

interface ParkingsProps {
    data: Promise<ParkingData[]>;
    adresse: string;
    onParkingSelected: (parkingId: string) => void;
}

export function Parkings({data, adresse, onParkingSelected}: ParkingsProps) {
    const parkings = use(data);
    const markers = parkings.map(parking => {
        return {
            nom: parking.nom,
            marker: [parking.yLatitude, parking.xLongitude]
        } as Marker
    });

    const [nomParking, setNomParking] = useState("");

    const handleParkingClicked = (nomParking: string) => {
        setNomParking(nomParking);
    };

    return (
        <div className="w-screen h-screen max-h-screen flex">
            <div className="w-1/2 px-4 overflow-y-auto mt-24">
                <div className="mb-8">
                    <span className="text-2xl font-semibold">{parkings.length} parkings disponibles à {adresse}</span>
                </div>
                <div>
                    {
                        parkings.map((parking, index) => (
                            <Parking
                                key={index} 
                                data={parking}
                                onParkingSelected={(parkingId) => onParkingSelected(parkingId)}
                                onParkingClicked={(nomParking) => handleParkingClicked(nomParking)}/>
                        ))
                    }
                </div>
            </div>
            <div className="w-1/2 h-screen">
                <LeafletMap locations={markers} locationClicked={nomParking} />
            </div>
        </div>
    )
    
}