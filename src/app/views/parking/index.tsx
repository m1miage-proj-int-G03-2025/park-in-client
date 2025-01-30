"use client";
import { useEffect, useMemo, useState } from "react";
import PlaceSelector from "./components/place-selector";
import TypePlaceSelector from "./components/type-place-selector";
import InputField from "@/common/components/inputField";
import { colors } from "@/common/constants/colors";
import { timeOpts } from "@/common/constants/timeOpts";
import TotalPriceBar from "./components/total-price";
import InfoField from "./components/info-field";
import ReservationDetailsModal from "./components/reservation-details-modal";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, Skeleton } from "@heroui/react";
import { getParkingDetails, getPlacesDisponibles, reservePlace } from "@/common/services/parkingsService";
import { getTypeVoitureByKey } from "@/common/utils/enum-key-helper";
import dynamic from "next/dynamic";
import { useUserContext } from "@/common/providers/UserProvider";
import { MdCalendarToday, MdSchedule, MdStairs } from "react-icons/md";
import { CreateReservationParams } from "@/common/types/create-reservation-params";
import { useError } from "@/common/contexts/errorContext";
import { useReservationData } from "@/common/providers/ReservationDataProvider";
import { ErrorMessages } from "@/common/utils/error-messages-helper";
import { useLoading } from "@/common/contexts/loadingContext";

const LeafletMap = dynamic(() => import('@/common/components/LeafletMap'), {
  ssr: false,
});

const ParkingView = () => {

  const { parkingId } = useParams() as { parkingId: string };
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useUserContext();
  const { reservationData, saveReservationData } = useReservationData();
  const { showErrorMessage } = useError();
  const { setIsLoading: setGlobalLoading } = useLoading();

  const [parkingDetails, setParkingDetails] = useState({
    nom: "",
    adresse: "",
    urlSite: "",
    tarif1h: 0,
    tarif2h: 0,
    tarif3h: 0,
    tarif4h: 0,
    tarif24h: 0,
    xLongitude: 0,
    yLatitude: 0,
  });
  const [placesDisponibles, setPlacesDisponibles] = useState<{ numeroPlace: string; bloc: number; etage: number; aille: string; typePlace: string; label: string; }[]>([]);
  const [reservationInfo, setReservationInfo] = useState(JSON.parse(searchParams.get('searchQuery') || '{}'));

  const [selectedPlace, setSelectedPlace] = useState({
    typePlace: reservationInfo?.typeVoiture,
    numeroPlace: "",
  });
  const [selectedBloc, setSelectedBloc] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchParkingDetails = async () => {
    const details = await getParkingDetails(parkingId);
    setParkingDetails(details);

  };

  const fetchPlacesDisponibles = async () => {
    const places = await getPlacesDisponibles({
      typePlace: selectedPlace.typePlace,
      dateDebut: reservationInfo.date,
      duree: reservationInfo.duree,
      parkingId: parkingId,
    });
    setPlacesDisponibles(
      places
        .map(({ numeroPlace, typePlace }) => {
          const [, , , bloc, etage, aille, numero] = numeroPlace.split("-");
          return {
            numeroPlace: numeroPlace,
            bloc: parseInt(bloc, 10),
            etage: parseInt(etage, 10),
            aille,
            typePlace: getTypeVoitureByKey(typePlace),
            label: numero
          };
        })
        .sort((a, b) => {
          return parseInt(a.numeroPlace, 10) - parseInt(b.numeroPlace, 10);
        })
    );
  }

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

  const handleReservation = async (data: CreateReservationParams) => {
    try {
      setIsLoading(true);
      const reservation = (await reservePlace(data)).at(0);
      setIsLoading(false);
      setGlobalLoading(false);
      saveReservationData(null);

      router.push(`/reservations/${reservation?.id}`);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showErrorMessage(ErrorMessages.RESERVATION_ERROR);
    }
  }

  const handleConfirmReservation = async () => {
    setIsModalOpen(false);
    if (userInfo) {
      await handleReservation({
        idUtilisateur: userInfo.idUtilisateur,
        numeroPlace: selectedPlace?.numeroPlace,
        dateDebut: reservationInfo?.date,
        duree: reservationInfo?.duree,
        typePlace: selectedPlace?.typePlace,
        idParking: parkingId,
      });
      return;
    }

    saveReservationData({
      numeroPlace: selectedPlace?.numeroPlace,
      dateDebut: reservationInfo?.date,
      duree: reservationInfo?.duree,
      typePlace: selectedPlace?.typePlace,
      idParking: parkingId,
    });
    router.push("/login");
  }

  useEffect(() => {
    if (userInfo && reservationData) {
      setGlobalLoading(true);
      const data = { ...reservationData };
      data.idUtilisateur = userInfo.idUtilisateur;
      handleReservation(data).then(() => null);
    }
  }, [userInfo, reservationData]);

  const handleReservationInfoChange = (key: string, value: string | Date) => {
    setReservationInfo((prev: typeof reservationInfo) => ({
      ...prev,
      [key]: value,
    }));
  };

  const tarifTot = useMemo(() => {
    switch (reservationInfo?.duree) {
      case "60":
        return parkingDetails?.tarif1h;
      case "120":
        return parkingDetails?.tarif2h;
      case "180":
        return parkingDetails?.tarif3h;
      case "240":
        return parkingDetails?.tarif4h;
      case "1440":
        return parkingDetails?.tarif24h;
      default:
        return 0;
    }
  }, [reservationInfo.duree, parkingDetails]);

  const preSelectedFields = useMemo(() => {
    return [
      {
        label: "Date de début",
        placeholder: "Date de début",
        disabled: true,
        inputType: "datetime-local" as const,
        value: reservationInfo.date,
        icon: <MdCalendarToday color="#2b77c4" size={20} />,
        labelColor: colors.main,
        iconColor: "grey",
      },
      {
        label: "Durée",
        placeholder: "Durée de location",
        inputType: "select" as const,
        value: reservationInfo?.duree,
        options: timeOpts,
        disabled: true,
        iconName: <MdSchedule color="#2b77c4" size={20} />,
        labelColor: colors.main,
        onChange: (val: string | Date) =>
          handleReservationInfoChange("duree", val),
      },
    ];
  }, [reservationInfo]);



  const blocOptions = useMemo(() => {
    return Array.from(
      new Set(placesDisponibles?.map((place) => place.bloc))
    ).map((bloc) => ({
      label: `Bloc ${bloc}`,
      value: bloc.toString()
    }));

  }, [placesDisponibles])

  const etageOptions = useMemo(() => {
    return Array.from(
      new Set(placesDisponibles?.map((place) => place.etage))
    ).map((etage) => ({
      label: `Etage ${etage}`,
      value: etage.toString()
    }));

  }, [placesDisponibles])

  const mapComponent = useMemo(() => {
    if (parkingDetails?.xLongitude != 0 && parkingDetails?.yLatitude != 0) {
      return <LeafletMap locations={[{ nom: parkingDetails?.nom, marker: [parkingDetails?.yLatitude, parkingDetails?.xLongitude] }]} locationClicked={parkingDetails?.nom} oneLoc={true} />
    }
    else return <Skeleton className="w-[800px] h-[300px]" />
  }, [parkingDetails])

  const placesAvailable = useMemo(() => {
    return placesDisponibles?.filter((place) => place.bloc === selectedBloc);
  }, [selectedBloc, placesDisponibles]);

  const infoFields = useMemo(() => {
    return [
      {
        text: parkingDetails.adresse,
        iconName: "MdLocationOn" as const,
      },
      {
        type: "link",
        text: parkingDetails.urlSite,
        iconName: parkingDetails?.urlSite && "MdLink" as const,
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

  useEffect(() => {
    setIsLoading(true);
    fetchParkingDetails();
    if (selectedPlace?.typePlace) {
      fetchPlacesDisponibles();
    }
    setIsLoading(false)
  }, [parkingId]);



  return (
    <div className="pt-20 min-h-screen" suppressHydrationWarning>
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
                  return <InfoField key={index} {...field} iconName={field.iconName || undefined} />
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
                        icon={field.icon}
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
              {mapComponent}
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
                      startContent={<MdStairs color={colors.main} size={30} />}
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

      {reservationInfo && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <TotalPriceBar
            prixTotal={tarifTot}
            onClick={handleReservationClick}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

export default ParkingView;