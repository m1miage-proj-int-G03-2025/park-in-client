import { typesOpts } from "@/constants/typesOpts";
import SelectorCard from "./selector-card";
import getPlaceIcon from "@/utils/place-iconname-helper";

interface TypePlaceSelectorProps {
  selectedTypePlace: string;
  onSelectTypePlace: (plc: string) => void;
}

const TypePlaceSelector = (props: TypePlaceSelectorProps) => {
  const { selectedTypePlace, onSelectTypePlace } = props;


  return (
    <div className="grid grid-cols-10 gap-3 p-3">
      {typesOpts.map((type, index) => {
        const isSelected = type.value === selectedTypePlace;

        return (
            <SelectorCard 
                type={true}
                isSelected={isSelected}
                key={index}
                onSelect={() => onSelectTypePlace(type.value)}
                iconName={getPlaceIcon(type.value)}
                label={type.label}
                size={24}
            />
        );
      })}
    </div>
  );
};

export default TypePlaceSelector;
