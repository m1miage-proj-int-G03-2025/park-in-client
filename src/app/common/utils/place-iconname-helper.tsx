const getPlaceIcon = (type: string) => {
    switch (type) {
      case "Velo":
        return "MdDirectionsBike";
      case "VoitElect":
        return "MdElectricCar";
      case "Voiture":
        return "MdDirectionsCar";
      case "PMR":
        return "MdAccessible";
      case "2RouesMotrice":
        return "MdTwoWheeler";
      case "2rEL":
        return "MdLocalShipping";
      case "AutoPartage":
        return "MdCommute";
      case "Covoiturage":
        return "MdGroup";
      case "PR":
        return "MdLocalParking";
      default:
        return "MdDirectionsCar";
    }
  };

  export default getPlaceIcon;