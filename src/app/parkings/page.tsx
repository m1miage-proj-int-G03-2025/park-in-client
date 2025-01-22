"use client"

import ParkingsView, { ParkingsParams } from "@/views/parkings";
import { useSearchParams } from "next/navigation";

const Parkings = () => {
    const searchParams = useSearchParams();
    const searchQuery: ParkingsParams = JSON.parse(searchParams.get('searchQuery')!);

    return (
        <div>
            <ParkingsView {...searchQuery} />
        </div>
    );
}
export default Parkings;