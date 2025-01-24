"use client";
import { Button } from "@heroui/button";
import { FaLocationDot } from "react-icons/fa6";
import { LuSquareParking } from "react-icons/lu";

export interface ParkingData {
    idParking: string;
    nom: string,
    adresse: string,
    xLongitude: number,
    yLatitude: number,
    urlSite: string,
    nombrePlacesDisponibles: number,
    tarifMin: number,
    typesPlacesDisponibles: string[]
}

interface ParkingProps {
    data: ParkingData;
    onParkingSelected: (parkingId: string) => void;
    onParkingClicked: (nomParking: string) => void;
}

export default function Parking({data, onParkingSelected, onParkingClicked}: ParkingProps) {
    
    const handleParkingSelected = (parkingId: string) => onParkingSelected(parkingId);
    const handleParkingClicked = () => onParkingClicked(data.nom)

    return (
        <div className="flex bg-white rounded-xl w-[100%] p-3 my-3 h-40 shadow-xl cursor-pointer" onClick={() => handleParkingClicked()}>
            <div className=""><LuSquareParking size={50} color="#0466C8"/></div>
            <div className="flex flex-col justify-between grow pl-4">
                <div className="flex flex-col">
                    <div className="text-lg">{data.nom}</div>
                    <div className="flex items-baseline text-slate-400">
                        <FaLocationDot className="inline"/>
                        <div>
                            <span className="text-sm">{data.adresse}</span>
                        </div>
                    </div>
                    <div>
                        <a href={data.urlSite} className="text-xs text-[#0466C8]">{data.urlSite}</a>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div></div>
                    <div className="text-[#0466C8] pr-3 pb-2">{data.nombrePlacesDisponibles} places disponibles</div>
                </div>
            </div>
            <div className="flex flex-col justify-between w-1/5">
                <div className="text-[#2B77C4]">
                    <div>A partir de</div>
                    <div className="font-semibold text-xl">{data.tarifMin} &euro;</div>
                </div>
                <div>
                    <Button onPress={() => handleParkingSelected(data.idParking)} className="py-3 px-4 text-xl text-white font-semibold bg-[#449A1D]">Réserver</Button>
                </div>
            </div>
        </div>
    );
}