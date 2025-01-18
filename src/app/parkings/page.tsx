"use client"

import { useSearchParams } from "next/navigation";

const Parkings = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    console.log(searchQuery);
    return (
        <div>
            Parkings
        </div>
    );
}
export default Parkings;