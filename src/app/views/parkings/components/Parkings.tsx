"use client";
import { useState } from "react";
import Parking, { ParkingData } from "./Parking";
import LeafletMap, { Marker } from "@/common/components/LeafletMap";

interface ParkingsProps {
    data: ParkingData[];
    onParkingSelected: (parkingId: string) => void;
}

export function Parkings({data, onParkingSelected}: ParkingsProps) {
    const parkings = data;
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
            <div className="w-[50%] px-4 overflow-y-auto mt-24">
                    {
                        parkings.length > 0 
                            ? (
                                <div className="mb-8">
                                    <span className="text-2xl font-semibold">{parkings.length} parkings disponibles</span>
                                </div>
                            )
                            : (
                                <div className="mt-28 ml-14">
                                    <span className="text-3xl font-semibold mt-24">Pas de parking disponible</span>
                                </div>
                            )
                            
                    }
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
            <div className="mt-24 flex w-[50%] px-2">
                {
                    parkings.length > 0 && <LeafletMap locations={markers} locationClicked={nomParking} />
                }
            </div>
            {/* <div className="w-[500px] h-screen mt-24 px-2">
                {
                    parkings.length > 0 && <LeafletMap locations={markers} locationClicked={nomParking} />
                }
            </div> */}
        </div>
    )
    
}