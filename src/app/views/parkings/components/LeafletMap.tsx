"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LeafletMarker from "./LeafletMarker";

export interface Marker {
    nom: string;
    marker: [number, number];
}

interface LeafletMapProps {
    locations: Marker[];
    locationClicked: string
}

export default function LeafletMap({ locations, locationClicked }: LeafletMapProps) {
    const popupRefs = useRef<(L.Popup | null)[]>([]);
    const [indexClicked, setIndexClicked] = useState<number>();

    const handleMapCenter = (): [number, number] => {
        const centerLat = locations.reduce((acc, current) => acc + current.marker[0], 0) / locations.length;
        const centerLong = locations.reduce((acc, current) => acc + current.marker[1], 0) / locations.length;
        return [centerLat, centerLong];
    }

    useEffect(() => {
        const handleLocationClicked = (nomParking: string) => {
            const index = locations.findIndex(location => location.nom === nomParking);
            setIndexClicked(index);
        }

        handleLocationClicked(locationClicked)
      }, [locationClicked, locations]);

    return (
        <MapContainer className="h-full w-full z-0" center={handleMapCenter()} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                locations.map((location, index) => (
                    <LeafletMarker key={index} index={index} position={location.marker} nom={location.nom} popupRefs={popupRefs} indexClicked={indexClicked!}/>
                ))
            }
        </MapContainer>
        
    )
}