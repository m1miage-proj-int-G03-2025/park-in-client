"use client";
import { useMemo, useState } from "react";
import PlaceSelector from "./components/place-selector";
import TypePlaceSelector from "./components/type-place-selector";
import InputField from "@/components/inputField";
import { colors } from "@/constants/colors";
import { timeOpts } from "@/constants/timeOpts";
import TotalPriceBar from "./components/total-price";
import InfoField from "./components/info-field";
import ReservationDetailsModal from "./components/reservation-details-modal";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const ParkingView = () => {
  const parkingDetails = { //replace with GET /:id
    nom: "Parking XY",
    adresse: "Rue de Paris",
    urlSite: "www.parking-xy.com",
      tarif1h: 2.4,
      tarif2h: 4.8,
      tarif3h: 7.2,
      tarif4h: 9.6,
    yLatitude: 48.8566,
    xLongitude: 2.3522,
  };

  const dummyData = [                                        //replace with GET /:id/places the map function
    { numeroPlace: "A1", typePlace: "Voiture", etage: 1 },
    { numeroPlace: "A2", typePlace: "Velo", etage: 1},
    { numeroPlace: "A3", typePlace: "VoitElect", etage: 1 },
    { numeroPlace: "A4", typePlace: "2rEi", etage: 1 },
    { numeroPlace: "A5", typePlace: "AutoPartage" , etage: 1},
    { numeroPlace: "A6", typePlace: "PR", etage: 1 },
    { numeroPlace: "A7", typePlace: "PMR", etage: 1 },
    { numeroPlace: "A8", typePlace: "2RouesMotrice", etage: 1 },
    { numeroPlace: "A9", typePlace: "Covoiturage" , etage: 1},
    { numeroPlace: "A10", typePlace: "Voiture", etage: 1 },
    { numeroPlace: "A11", typePlace: "Voiture" , etage: 2},
    { numeroPlace: "A12", typePlace: "Velo", etage: 2 },
    { numeroPlace: "A13", typePlace: "VoitElect" , etage: 2},
    { numeroPlace: "A14", typePlace: "2rEi", etage: 2 },
    { numeroPlace: "A15", typePlace: "AutoPartage" , etage: 2},
    { numeroPlace: "A16", typePlace: "PR", etage: 2 },
    { numeroPlace: "A17", typePlace: "PMR" , etage: 2},
    { numeroPlace: "A18", typePlace: "2RouesMotrice" , etage: 2},
    { numeroPlace: "A19", typePlace: "Covoiturage", etage: 2 },
    { numeroPlace: "A20", typePlace: "Voiture" , etage: 2},
    { numeroPlace: "A21", typePlace: "Voiture" , etage: 2},
    { numeroPlace: "A22", typePlace: "Velo" , etage: 2},
    { numeroPlace: "A23", typePlace: "VoitElect" , etage: 2},
    { numeroPlace: "A24", typePlace: "2rEi" , etage: 2},
    { numeroPlace: "A25", typePlace: "AutoPartage", etage: 2 },
    { numeroPlace: "A26", typePlace: "PR" , etage: 2},
    { numeroPlace: "A27", typePlace: "PMR", etage: 2 },
    { numeroPlace: "A28", typePlace: "2RouesMotrice" , etage: 3},
    { numeroPlace: "A29", typePlace: "Covoiturage", etage: 3 },
    { numeroPlace: "A30", typePlace: "Voiture" , etage: 3},
    { numeroPlace: "A31", typePlace: "Voiture", etage: 3 },
    { numeroPlace: "A32", typePlace: "Velo" , etage: 3},
    { numeroPlace: "A33", typePlace: "VoitElect" , etage: 3},
    { numeroPlace: "A34", typePlace: "2rEi",  etage: 4 },
    { numeroPlace: "A35", typePlace: "AutoPartage" , etage: 4},
    { numeroPlace: "A36", typePlace: "PR" , etage: 4},
    { numeroPlace: "A37", typePlace: "PMR" , etage: 4},
    { numeroPlace: "A38", typePlace: "2RouesMotrice" , etage: 4},
    { numeroPlace: "A39", typePlace: "Covoiturage" , etage: 4},
    { numeroPlace: "A40", typePlace: "Voiture", etage: 5 },
  ]
  const { parkingId } = useParams() as { parkingId: string };
  const router = useRouter();

  const [reservationInfo, setReservationInfo] = useState({
    date: new Date("2022-01-01T00:00"),                     //replace with QueryString
    duree: timeOpts[0].value,
  });
  const [selectedPlace, setSelectedPlace] = useState({
    typePlace: "Voiture",
    numeroPlace: "",
  });
  const [selectedEtage, setSelectedEtage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useAuth();

  const handleSelect = (key: keyof typeof selectedPlace, value: string) => {
    if(selectedPlace[key] === value) {
      setSelectedPlace((prev) => ({
        ...prev,
        numeroPlace: "",
      }))
    } else {
      setSelectedPlace((prev) => ({
        ...prev,
        [key]: value,
      }));

    }
  };

  const handleReservationClick = () => {
    setIsModalOpen(true);
  }

  const handleConfirmReservation = () => {
    setIsModalOpen(false);
    if(user) {
      //send post reservation request
      // navigate to confirmation page with search params confirmed
    } else {
      const queryString = encodeURIComponent(JSON.stringify({
        idPlace: selectedPlace?.numeroPlace,
        date: reservationInfo.date,
        duree: reservationInfo.duree,
      }));
      router.push(`/login?searchQuery=${queryString}`);
    }
  }

  const handleReservationInfoChange = (key: string, value: string | Date) => {
    setReservationInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const tarifTot = useMemo(() => {
    switch (reservationInfo.duree) {
      case "60":
        return parkingDetails.tarif1h;
      case "120":
        return parkingDetails.tarif2h;
      case "180":
        return parkingDetails.tarif3h;
      case "240":
        return parkingDetails.tarif4h;
      default:
        return 0;
    }
  }, [reservationInfo.duree]);

  const preSelectedFields = useMemo(() => {
    return [
      {
        label: "Date de début",
        placeholder: "Date de début",
        disabled: true,
        inputType: "datetime-local" as const,
        value: reservationInfo.date,
        iconName: "MdCalendarToday",
        labelColor: colors.main,
        iconColor: "grey",
      },
      {
        label: "Durée",
        placeholder: "Durée de location",
        inputType: "select" as const,
        value: reservationInfo.duree,
        options: timeOpts,
        disabled: true,
        iconName: "MdSchedule",
        labelColor: colors.main,
        onChange: (val: string | Date) =>
          handleReservationInfoChange("duree", val),
      },
    ];
  }, [reservationInfo]);


  const etageOptions = useMemo(()=> {
    return Array.from(
      new Set(dummyData.map((place) => place.etage))
    ).map((etage) => ({
      label: `Etage ${etage}`,
      value: etage.toString()
    }));

  }, [dummyData])

  const placesAvailable = useMemo(() => {
    return dummyData.filter((place) => place.etage === selectedEtage);
  }, [selectedEtage, dummyData]);

  const infoFields = useMemo(() => {
    return [
      {
        text: parkingDetails.adresse,
        iconName: "MdLocationOn" as const,
      },
      {
        type: "link",
        text: parkingDetails.urlSite,
        iconName: "MdLink" as const,
      },
    ]
  }, [parkingDetails])

  const reservationDetails = useMemo(() => {
    return {
      parkingId,
      parkingName: parkingDetails.nom,
      parkingAddress: parkingDetails.adresse,
      price: tarifTot,
      startDate: reservationInfo.date,
      duration: reservationInfo.duree,
      TypePlace: selectedPlace?.typePlace,
      numeroPlace: selectedPlace?.numeroPlace,
    }
  }, [parkingId, parkingDetails, tarifTot, reservationInfo, selectedPlace])



  return (
    <div className="pt-20 min-h-screen">
      <div
        className="pt-16 pb-24 overflow-y-auto"
        style={{
          height: "calc(100vh - 80px)", 
        }}
      >
        <ReservationDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reservationDetails={reservationDetails} onConfirm={handleConfirmReservation}/>
        <div className="p-6">
          <label className="text-left text-3xl font-bold text-black mb-6 block">
            {parkingDetails.nom}
          </label>
          <div className="flex flex-row items-center gap-20 mt-10 mb-10">
      {infoFields?.map((field, index) => {
      return <InfoField key={index} {...field} />
       })}     
       </div>
        { preSelectedFields && <div className="mb-10 w-1/2 flex flex-row pl-0 gap-4">
            {preSelectedFields.map((field, index) => {
              return (
                <div className="flex-1" key={index}>
                <InputField
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
                </div>
              );
            })}
          </div>}

          <div className="flex items-start">
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-primary mb-3 pl-2">
                Choisissez type de place
              </label>
              <TypePlaceSelector
                selectedTypePlace={selectedPlace?.typePlace}
                onSelectTypePlace={(typePlace) =>
                  handleSelect("typePlace", typePlace)
                }
              />
        <div className="flex flex-row items-center justify-between">
          <label className="text-lg font-semibold text-primary">
              Choisissez Une Place
         </label>
           <div className="relative w-1/6 pr-20">
            <InputField 
            inputType="select"
            label=""
            placeholder="Etage"
            value={selectedEtage.toString()}
            options={etageOptions}
            onChange={(value: string | Date) => 
            setSelectedEtage(parseInt(value as string))
         }
       />
      </div>
  </div>

              <PlaceSelector
                places={placesAvailable}
                selectedPlace={selectedPlace?.numeroPlace}
                selectedTypePlace={selectedPlace?.typePlace}
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
            onClick={handleReservationClick}
          />
        </div>
      )}
    </div>
  );
}

export default ParkingView;
