import Icon from "@/common/components/iconElement";
import { Card, CardBody } from "@heroui/react";
import * as MaterialIcons from "react-icons/md";

interface SelectorCardProps {
  isDisabled?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  iconName?: keyof typeof MaterialIcons;
  label?: string;
  size?: number;
  type?: boolean;
}

const SelectorCard = (props: SelectorCardProps) => {
  const {
    isDisabled = false,
    isSelected,
    onSelect,
    iconName,
    label,
    size = 24,
    type = false,
  } = props;

  return (
    <Card
      isHoverable={!isDisabled && !isSelected}
      isPressable={!isDisabled}
      className={`cursor-pointer ${
        type ? "w-33 h-33" : "w-20 h-28"
      } ${
        isDisabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : isSelected
          ? "bg-primary text-white"
          : "bg-white text-black"
      }`}
      
      
      onPress={() => onSelect()}
    >
      <CardBody className="flex flex-col items-center justify-center">
        {iconName && (
          <Icon
            name={iconName}
            size={size}
            color={isDisabled ? "gray" : isSelected ? "white" : "black"}
          />
        )}
        {label && <span className="mt-2 text-sm">{label}</span>}
      </CardBody>
    </Card>
  );
};

export default SelectorCard;
