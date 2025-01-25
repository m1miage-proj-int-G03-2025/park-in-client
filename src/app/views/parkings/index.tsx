"use client";
import { searchParkings } from "@/common/services/parkingsService";
import { useEffect, useState } from "react";
import { Parkings } from "./components/Parkings";
import ParkingSkeleton from "./components/ParkingSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { ParkingData } from "./components/Parking";

export interface ParkingsParams {
    inseeVille: string;
    date: Date;
    duree: number;
    typeVoiture: string;
}

export default function ParkingsView() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const [parkings, setParkings] = useState<ParkingData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchParkings() {
            try {
                const response = await searchParkings(JSON.parse(searchQuery!));
                setParkings(response);
            } catch (error) {
                console.error('Error fetching parkings:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchParkings();
    }, []);

    const handleParkingSelected = (parkingId: string) => {
        router.push(`/parkings/${parkingId}?searchQuery=${searchQuery}`)
    };

    return (
        <div className="min-h-screen pt-26">
            {loading ? (
                <ParkingSkeleton />
            ) : (
                <Parkings data={parkings} onParkingSelected={handleParkingSelected} />
            )}
        </div>
    );
}