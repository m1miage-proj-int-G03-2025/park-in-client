"use client";
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

interface PopupMarkerProps {
  position: [number, number];
  nom: string;
  index: number;
  popupRefs: React.RefObject<(L.Popup | null)[]>;
  indexClicked: number
}

const LeafletMarker: React.FC<PopupMarkerProps> = ({ position, index, popupRefs, nom, indexClicked }) => {
  const map = useMap();
  
    useEffect(() => {
        const handleLocationClicked = (indexClicked: number) => {
                if (popupRefs.current[indexClicked]) {
                    map.openPopup(popupRefs.current[indexClicked]);
                }
        }
        handleLocationClicked(indexClicked)
    }, [indexClicked]);

  return (
    <>
      <Marker position={position}>
        <Popup ref={(el) => { if (el) popupRefs.current[index] = el; }}>
          {nom}
        </Popup>
      </Marker>
    </>
  );
};

export default LeafletMarker;