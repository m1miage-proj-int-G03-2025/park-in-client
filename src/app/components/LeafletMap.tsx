"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LeafletMarker from "./LeafletMarker";

export interface Marker {
    nom: string;
    marker: [number, number];
    oneLoc?: boolean;
}

interface LeafletMapProps {
    locations: Marker[];
    locationClicked: string
    oneLoc?: boolean;
}

export default function LeafletMap({ locations, locationClicked, oneLoc }: LeafletMapProps) {
    const popupRefs = useRef<(L.Popup | null)[]>([]);
    const [indexClicked, setIndexClicked] = useState<number>();

    const handleMapCenter = (): [number, number] => {
        const centerLat = locations.reduce((acc, current) => acc + current.marker[0], 0) / locations.length;
        const centerLong = locations.reduce((acc, current) => acc + current.marker[1], 0) / locations.length;
        return oneLoc? locations[0].marker : [centerLat, centerLong];
    }

    useEffect(() => {
        const handleLocationClicked = (nomParking: string) => {
            const index = locations.findIndex(location => location.nom === nomParking);
            setIndexClicked(oneLoc? 0 : index);
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
               oneLoc? <LeafletMarker position={locations[0].marker} nom={locations[0].nom} popupRefs={popupRefs} indexClicked={0} index={0} oneLoc={true}/>
               :locations.map((location, index) => (
                    <LeafletMarker key={index} index={index} position={location.marker} nom={location.nom} popupRefs={popupRefs} indexClicked={indexClicked!}/>
                ))
            }
        </MapContainer>
        
    )
}