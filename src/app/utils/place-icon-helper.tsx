const getPlaceType = (type: string) => {
    switch (type) {
      case "Velo":
        return "MdDirectionsBike";
      case "Voiture Electrique":
        return "MdElectricCar";
      case "Voiture":
        return "MdDirectionsCar";
      case "PMR":
        return "MdAccessible";
      case "2 Roues Motrices":
        return "MdTwoWheeler";
      case "2R EL":
        return "MdLocalShipping";
      case "Auto Partage":
        return "MdCommute";
      case "Covoiturage":
        return "MdGroup";
      case "PR":
        return "MdLocalParking";
      default:
        return "MdDirectionsCar";
    }
  };

  export default getPlaceType;