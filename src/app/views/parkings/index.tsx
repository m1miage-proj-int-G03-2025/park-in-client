"use client";
import { searchParkings } from "@/services/parkingsService";
import { Suspense } from "react";
import { Parkings } from "./components/Parkings";
import ParkingSkeleton from "./components/ParkingSkeleton";
import { useRouter } from "next/navigation";

export interface ParkingsParams {
    inseeVille: string;
    date: Date;
    duree: number;
    typeVoiture: string;
}

export default function ParkingsView(params: ParkingsParams) {
    const parkings = searchParkings(params);
    
    const router = useRouter();
    const handleParkingSelected = (parkingId: string) => {
        const queryString = encodeURIComponent(JSON.stringify(params));
        router.push(`/parkings/${parkingId}?searchQuery=${queryString}`)
    };
    
    return (
        <div className="min-h-screen pt-26">
            <Suspense fallback={<ParkingSkeleton />}>
                <Parkings data={parkings} onParkingSelected={(parkingId) => handleParkingSelected(parkingId)} />
            </Suspense>
        </div>
    );
}