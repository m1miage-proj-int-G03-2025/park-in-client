"use client";
import { useMemo, useState } from "react";
import PlaceSelector from "./components/place-selector";
import TypePlaceSelector from "./components/type-place-selector";
import InputField from "@/components/inputField";
import { colors } from "@/constants/colors";
import { timeOpts } from "@/constants/timeOpts";
import TotalPriceBar from "./components/total-price";

const ParkingView = () => {
  const parkingDetails = {
    nom: "Parking XY",
    adresse: "Rue de Paris",
    urlSite: "www.parking-xy.com",
    typeOuvrage: "Souterrain",
    capacite: 100,
    siteWeb: "www.parking-xy.com",
    tarifs: {
      tarif1h: 2.4,
      tarif2h: 4.8,
      tarif3h: 7.2,
      tarif4h: 9.6,
    },
  };

  const [reservationInfo, setReservationInfo] = useState({
    date: new Date(),
    duree: "60",
  });
  const [selectedPlace, setSelectedPlace] = useState({
    typePlace: "Voiture",
    numeroPlace: "",
  });

  const handleSelect = (key: string, value: string) => {
    setSelectedPlace((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReservationInfoChange = (key: string, value: string | Date) => {
    setReservationInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const tarifTot = useMemo(() => {
    switch (reservationInfo.duree) {
      case "60":
        return parkingDetails.tarifs.tarif1h;
      case "120":
        return parkingDetails.tarifs.tarif2h;
      case "180":
        return parkingDetails.tarifs.tarif3h;
      case "240":
        return parkingDetails.tarifs.tarif4h;
    }
  }, [reservationInfo.duree]);

  const preSelectedFields = useMemo(() => {
    return [
      {
        label: "Date de début",
        placeholder: "Date de début",
        disabled: true,
        inputType: "datetime-local" as "datetime-local",
        value: reservationInfo.date,
        iconName: "MdCalendarToday",
        labelColor: colors.main,
        iconColor: "grey",
      },
      {
        label: "Durée",
        placeholder: "Durée de location",
        inputType: "select" as "select",
        value: reservationInfo.duree,
        options: timeOpts,
        iconName: "MdSchedule",
        labelColor: colors.main,
        onChange: (val: string | Date) =>
          handleReservationInfoChange("duree", val),
      },
    ];
  }, [reservationInfo]);

  const dummyData = [
    { numeroPlace: "A1", typePlace: "Voiture" },
    { numeroPlace: "A2", typePlace: "Velo" },
    { numeroPlace: "A3", typePlace: "VoitElect" },
    { numeroPlace: "A4", typePlace: "2rEi" },
    { numeroPlace: "A5", typePlace: "AutoPartage" },
    { numeroPlace: "A6", typePlace: "PR" },
    { numeroPlace: "A7", typePlace: "PMR" },
    { numeroPlace: "A8", typePlace: "2RouesMotrice" },
    { numeroPlace: "A9", typePlace: "Covoiturage" },
    { numeroPlace: "A10", typePlace: "Voiture" },
    { numeroPlace: "A11", typePlace: "Voiture" },
    { numeroPlace: "A12", typePlace: "Velo" },
    { numeroPlace: "A13", typePlace: "VoitElect" },
    { numeroPlace: "A14", typePlace: "2rEi" },
    { numeroPlace: "A15", typePlace: "AutoPartage" },
    { numeroPlace: "A16", typePlace: "PR" },
    { numeroPlace: "A17", typePlace: "PMR" },
    { numeroPlace: "A18", typePlace: "2RouesMotrice" },
    { numeroPlace: "A19", typePlace: "Covoiturage" },
    { numeroPlace: "A20", typePlace: "Voiture" },
    { numeroPlace: "A21", typePlace: "Voiture" },
    { numeroPlace: "A22", typePlace: "Velo" },
    { numeroPlace: "A23", typePlace: "VoitElect" },
    { numeroPlace: "A24", typePlace: "2rEi" },
    { numeroPlace: "A25", typePlace: "AutoPartage" },
    { numeroPlace: "A26", typePlace: "PR" },
    { numeroPlace: "A27", typePlace: "PMR" },
    { numeroPlace: "A28", typePlace: "2RouesMotrice" },
    { numeroPlace: "A29", typePlace: "Covoiturage" },
    { numeroPlace: "A30", typePlace: "Voiture" },
    { numeroPlace: "A31", typePlace: "Voiture" },
    { numeroPlace: "A32", typePlace: "Velo" },
    { numeroPlace: "A33", typePlace: "VoitElect" },
    { numeroPlace: "A34", typePlace: "2rEi" },
    { numeroPlace: "A35", typePlace: "AutoPartage" },
    { numeroPlace: "A36", typePlace: "PR" },
    { numeroPlace: "A37", typePlace: "PMR" },
    { numeroPlace: "A38", typePlace: "2RouesMotrice" },
    { numeroPlace: "A39", typePlace: "Covoiturage" },
    { numeroPlace: "A40", typePlace: "Voiture" },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div
        className="pt-16 pb-24 overflow-y-auto"
        style={{
          height: "calc(100vh - 80px)", 
        }}
      >
        <div className="p-6">
          <label className="text-left text-3xl font-bold text-black mb-6 block">
            {parkingDetails.nom}
          </label>
          <div className="mb-10 w-full flex flex-row space-x-4">
            {preSelectedFields.map((field, index) => {
              return (
                <InputField
                  key={index}
                  label={field.label}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  inputType={field.inputType}
                  value={field.value}
                  labelColor={field.labelColor}
                  iconName={
                    field.iconName as "MdCalendarToday" | "MdLock"
                  }
                  iconColor={field.iconColor}
                  options={field.options}
                  onChange={field.onChange}
                />
              );
            })}
          </div>

          <div className="flex items-start">
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-primary mb-3 pl-2">
                Choisissez type de place
              </label>
              <TypePlaceSelector
                selectedTypePlace={selectedPlace.typePlace}
                onSelectTypePlace={(typePlace) =>
                  handleSelect("typePlace", typePlace)
                }
              />
              <label className="text-lg font-semibold text-primary mb-3 pl-2 mt-6">
                Choisissez Une Place
              </label>
              <PlaceSelector
                places={dummyData}
                selectedPlace={selectedPlace.numeroPlace}
                selectedTypePlace={selectedPlace.typePlace}
                onSelectPlace={(numPlace) => {
                  handleSelect("numeroPlace", numPlace);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {tarifTot && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <TotalPriceBar
            prixTotal={tarifTot}
            onClick={() => console.log("clicked")}
          />
        </div>
      )}
    </div>
  );
}

export default ParkingView;
