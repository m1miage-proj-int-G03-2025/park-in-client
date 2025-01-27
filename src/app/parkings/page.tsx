"use client";
import ParkingsView from "@/views/parkings";
import { Suspense } from "react";

const Parkings = () => {
    return (
        <Suspense>
            <ParkingsView />
        </Suspense>
    );
}
export default Parkings;