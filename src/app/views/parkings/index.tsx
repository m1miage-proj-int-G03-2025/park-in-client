"use client";
import { searchParkings } from "@/common/services/parkingsService";
import { Suspense, useEffect, useState } from "react";
import { Parkings } from "./components/Parkings";
import ParkingSkeleton from "./components/ParkingSkeleton";
import { useRouter } from "next/navigation";
import { ParkingData } from "./components/Parking";

export interface ParkingsParams {
    inseeVille: string;
    date: Date;
    duree: number;
    typeVoiture: string;
}

export default function ParkingsView(params: ParkingsParams) {
    const [parkings, setParkings] = useState<ParkingData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchParkings() {
            try {
                const response = await searchParkings(params);
                setParkings(response);
              } catch (error) {
                console.error('Error fetching parkings:', error);
              } finally {
                setLoading(false);
              }
        }
        fetchParkings();
    }, [params]);

    const handleParkingSelected = (parkingId: string) => {
        const queryString = encodeURIComponent(JSON.stringify(params));
        router.push(`/parkings/${parkingId}?searchQuery=${queryString}`)
    };

    return (
        <div className="min-h-screen pt-26">
            {loading ? (
                <ParkingSkeleton />
            ) : (
                <Suspense fallback={<ParkingSkeleton />}>
                    <Parkings data={parkings} onParkingSelected={handleParkingSelected} />
                </Suspense>
            )}
        </div>
    );
}