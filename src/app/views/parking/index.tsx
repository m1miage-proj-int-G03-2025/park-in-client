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
import { Accordion, AccordionItem } from "@heroui/react";
import Icon from "@/components/icon";
import LeafletMap from "@/components/LeafletMap";

const ParkingView = () => {
  const parkingDetails = { //replace with GET /:id
    nom: "Parking XY",
    adresse: "Rue de Paris",
    urlSite: "www.parking-xy.com",
    tarif1h: 2.4,
    tarif2h: 4.8,
    tarif3h: 7.2,
    tarif4h: 9.6,
    xLongitude: 5.7169,
    yLatitude: 45.1910,
  };

  const dummyData = [                                        //replace with GET /:id/places the map function
    { numeroPlace: "A1", typePlace: "Voiture", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A2", typePlace: "Velo", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A3", typePlace: "VoitElect", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A4", typePlace: "2rEi", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A5", typePlace: "AutoPartage", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A6", typePlace: "PR", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A7", typePlace: "PMR", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A8", typePlace: "2RouesMotrice", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A9", typePlace: "Covoiturage", etage: 1, bloc: 1, aille: 'A' },
    { numeroPlace: "A10", typePlace: "Voiture", etage: 1, bloc: 1, aille: 'B' },
    { numeroPlace: "A11", typePlace: "Voiture", etage: 2, bloc: 1, aille: 'B' },
    { numeroPlace: "A12", typePlace: "Velo", etage: 2, bloc: 2, aille: 'B' },
    { numeroPlace: "A13", typePlace: "VoitElect", etage: 2, bloc: 2, aille: 'C' },
    { numeroPlace: "A14", typePlace: "2rEi", etage: 2, bloc: 2, aille: 'D' },
    { numeroPlace: "A15", typePlace: "AutoPartage", etage: 2, bloc: 2, aille: 'D' },
    { numeroPlace: "A16", typePlace: "PR", etage: 2, bloc: 2, aille: 'C' },
    { numeroPlace: "A17", typePlace: "PMR", etage: 2, bloc: 2, aille: 'C' },
    { numeroPlace: "A18", typePlace: "2RouesMotrice", etage: 2, bloc: 2, aille: 'D' },
    { numeroPlace: "A19", typePlace: "Covoiturage", etage: 2, bloc: 3, aille: 'C' },
    { numeroPlace: "A20", typePlace: "Voiture", etage: 2, bloc: 3, aille: 'C' },
    { numeroPlace: "A21", typePlace: "Voiture", etage: 2, bloc: 5, aille: 'C' },
    { numeroPlace: "A22", typePlace: "Velo", etage: 2, bloc: 4, aille: 'C' },
    { numeroPlace: "A23", typePlace: "VoitElect", etage: 2, bloc: 3, aille: 'C' },
    { numeroPlace: "A24", typePlace: "2rEi", etage: 2, bloc: 5, aille: 'B' },
    { numeroPlace: "A25", typePlace: "AutoPartage", etage: 2, bloc: 2, aille: 'B' },
    { numeroPlace: "A26", typePlace: "PR", etage: 2, bloc: 1, aille: 'B' },
    { numeroPlace: "A27", typePlace: "PMR", etage: 2, bloc: 1, aille: 'B' },
    { numeroPlace: "A28", typePlace: "2RouesMotrice", etage: 3, bloc: 1, aille: 'B' },

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
  const [selectedBloc, setSelectedBloc] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleSelect = (key: keyof typeof selectedPlace, value: string) => {
    if (selectedPlace[key] === value) {
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
    if (user) {
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


  const blocOptions = useMemo(() => {
    return Array.from(
      new Set(dummyData.map((place) => place.bloc))
    ).map((bloc) => ({
      label: `Bloc ${bloc}`,
      value: bloc.toString()
    }));

  }, [dummyData])

  const etageOptions = useMemo(() => {
    return Array.from(
      new Set(dummyData.map((place) => place.etage))
    ).map((etage) => ({
      label: `Etage ${etage}`,
      value: etage.toString()
    }));

  }, [dummyData])

  const placesAvailable = useMemo(() => {
    return dummyData.filter((place) => place.bloc === selectedBloc);
  }, [selectedBloc, dummyData]);

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
        className="pt-10 pb-24 overflow-y-auto"
        style={{
          height: "calc(100vh - 80px)",
        }}
      >
        <ReservationDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reservationDetails={reservationDetails} onConfirm={handleConfirmReservation} />
        <div className="p-6">
        <div className="flex flex-row justify-between">
          <div className="flex-col">
          <label className="text-left text-3xl font-bold text-black mb-6 bloc">
            {parkingDetails.nom}
          </label>
          <div className="flex flex-row items-center gap-20 mt-10 mb-10">
            {infoFields?.map((field, index) => {
              return <InfoField key={index} {...field} />
            })}
          </div>
          {preSelectedFields && <div className="mb-10 flex flex-row pl-0 gap-4">
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
          </div>
          <div
      className="top-0 right-0 rounded-lg shadow-xl m-4 w-[800px] h-[300px]" >
        <LeafletMap locations={[{nom: parkingDetails.nom, marker: [parkingDetails.yLatitude, parkingDetails.xLongitude]}]} locationClicked={parkingDetails.nom} oneLoc={true}/>
    </div>
          </div>

          <div className="flex items-start">
            <div className="flex flex-col w-full">
              <label className="text-xl font-semibold text-primary mb-3 pl-2">
                Choisissez type de place
              </label>
              <TypePlaceSelector
                selectedTypePlace={selectedPlace?.typePlace}
                onSelectTypePlace={(typePlace) =>
                  handleSelect("typePlace", typePlace)
                }
              />
              <div className="flex flex-row items-center justify-between">
                <label className="text-xl font-semibold text-primary">
                  Choisissez Une Place
                </label>
                <div className="relative w-1/6 pr-20 mb-10">
                  <InputField
                    inputType="select"
                    label=""
                    placeholder="Bloc"
                    value={selectedBloc.toString()}
                    options={blocOptions}
                    onChange={(value: string | Date) =>
                      setSelectedBloc(parseInt(value as string))
                    }
                  />
                </div>
              </div>
              <Accordion showDivider={false}>
                {
                  etageOptions?.map((etage) => {
                    return (<AccordionItem key={etage.value} aria-label={etage.label} title={etage.label} 
                      startContent={<Icon name='MdStairs' color={colors.main} size={30} />}
                      classNames={{
                      title: "bg-transparent text-slate-500 font-semibold",
                      base: "bg-transparent",
                      content: "bg-transparent",
                      heading: 'bg-white rounded-2xl px-14 shadow-lg m-4' 
                }} >
                      <PlaceSelector
                        places={placesAvailable.filter((place) => place.etage === parseInt(etage.value))}
                        selectedPlace={selectedPlace?.numeroPlace}
                        selectedTypePlace={selectedPlace?.typePlace}
                        onSelectPlace={(numPlace) => {
                          handleSelect("numeroPlace", numPlace);
                        }}
                      />

                    </AccordionItem>)
                  })

                }
              </Accordion>
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
