import SelectorCard from "./selector-card";
import getPlaceType from "@/utils/place-icon-helper";

interface PlaceSelectorProps {
  places: { numeroPlace: string; typePlace: string }[];
  selectedPlace: string;
  selectedTypePlace: string;
  onSelectPlace: (numPlace: string) => void;
}

const PlaceSelector = (props: PlaceSelectorProps) => {
  const { places, selectedPlace, selectedTypePlace, onSelectPlace } = props;


  return (
    <div className="grid grid-cols-8 gap-3 p-3 justify-center items-center w-2/3">
      {places.map((place, index) => {
        const isDisabled = selectedTypePlace !== place.typePlace;
        const isSelected = place.numeroPlace === selectedPlace;

        return (
            <SelectorCard 
                isDisabled={isDisabled}
                isSelected={isSelected}
                key={index}
                onSelect={() => onSelectPlace(place.numeroPlace)}
                iconName={getPlaceType(place.typePlace)}
                label={place.numeroPlace}
                size={24}
            />
        );
      })}
    </div>
  );
};

export default PlaceSelector;
