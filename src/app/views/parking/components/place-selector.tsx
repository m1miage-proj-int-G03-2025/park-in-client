import SelectorCard from "./selector-card";
import getPlaceType from "@/utils/place-icon-helper";

interface PlaceSelectorProps {
  places: { numeroPlace: string; typePlace: string, aille: string }[];
  selectedPlace: string;
  selectedTypePlace: string;
  onSelectPlace: (numPlace: string) => void;
}

const PlaceSelector = (props: PlaceSelectorProps) => {
  const { places, selectedPlace, selectedTypePlace, onSelectPlace } = props;
  const groupedPlaces = places.reduce<Record<string, { numeroPlace: string; typePlace: string; aille: string }[]>>((acc, item) => {
    if (!acc[item.aille]) {
      acc[item.aille] = [];
    }
    acc[item.aille].push(item);
    return acc;
  }, {});


  return (
    <div className="flex flex-col gap-6 my-5 mx-2">
      {Object.entries(groupedPlaces).map(([aille, places]) => (
        <div key={aille} className="flex items-center gap-4">
          <div className="font-bold text-lg text-primary align-middle whitespace-nowrap">
            Aille {aille}
          </div>
          <div className="flex flex-wrap gap-4">
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
        </div>
      ))}
    </div>
  );
};

export default PlaceSelector;
