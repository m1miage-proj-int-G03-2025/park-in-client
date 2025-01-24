import { MdAccessible, MdCommute, MdDirectionsBike, MdDirectionsCar, MdElectricCar, MdGroup, MdLocalParking, MdLocalShipping, MdTwoWheeler } from "react-icons/md";
import { colors } from "@/constants/colors";


const getPlaceType = (type: string) => {
  switch (type) {
    case "Velo":
      return <MdDirectionsBike color={colors.main} size={60} />
    case "VoitElect":
      return <MdElectricCar color={colors.main} size={60} />;
    case "Voiture":
      return <MdDirectionsCar color={colors.main} size={60} />;
    case "PMR":
      return <MdAccessible color={colors.main} size={60} />;
    case "2RouesMotrice":
      return <MdTwoWheeler color={colors.main} size={60} />;
    case "2rEI":
      return <MdLocalShipping color={colors.main} size={60} />;
    case "AutoPartage":
      return <MdCommute color={colors.main} size={60} />;
    case "Covoiturage":
      return <MdGroup color={colors.main} size={60} />;
    case "PR":
      return <MdLocalParking color={colors.main} size={60} />;
    default:
      return <MdDirectionsCar color={colors.main} size={60} />;
  }
};

export default getPlaceType;