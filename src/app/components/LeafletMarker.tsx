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
  oneLoc?: boolean;
}

const LeafletMarker: React.FC<PopupMarkerProps> = ({ position, index, popupRefs, nom, indexClicked, oneLoc }) => {
 
  const map = useMap();
  
    useEffect(() => {
        const handleLocationClicked = (indexClicked: number) => {
                if (popupRefs.current[indexClicked] && !oneLoc) {
                    map.openPopup(popupRefs.current[indexClicked]);
                }
        }
       handleLocationClicked(indexClicked)
    }, [indexClicked]);

  return (
    <>
      <Marker position={position}>
{ !oneLoc && <Popup ref={(el) => { if (el) popupRefs.current[index] = el; }}>
          {nom}
        </Popup>
        }
      </Marker>
    </>
  );
};

export default LeafletMarker;