"use client";

import dayjs from "@/common/configs/dayjsConfig";
import DetailsInfo from "./components/detailsInfo";
import QRCode from "react-qr-code";
import { MdLocationPin } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@heroui/react";
import { Image } from "@heroui/image"
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cancelReservation, getReservationDetails } from "@/common/services/reservationsService";
import { useLoading } from "@/common/contexts/loadingContext";
import getReservationStatusIcon from "@/common/utils/reservation-icon-helper";
import { getTypeVoitureByKey } from "@/common/utils/enum-key-helper";
import { colors } from "@/common/constants/colors";

interface ReservationDetails {
    idReservation: number;
    statut: string;
    tarif: number;
    dateDebut: string;
    dateFin: string;
    nomParking: string;
    adresseParking: string;
    typePlace: string;
    numeroPlace: string;
    isAnnulable?: boolean
}

export default function ReservationView() {

    const [details, setDetails] = useState<ReservationDetails | null>(null);
    const { reservationId } = useParams();
    const { setIsLoading } = useLoading();    

    const fetchDetailsReservation = async () => {
        setIsLoading(true);
        if (reservationId) {
            await getReservationDetails(reservationId as string).then(({ data }) => {
                setDetails({...data,
                    isAnnulable: dayjs(data.dateDebut).diff(dayjs(), 'hour') > 48
            });
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }

    const handleCancelReservation = async () => {
        if (!reservationId) return;
        setIsLoading(true);
        await cancelReservation(reservationId as string).then(() => {
            fetchDetailsReservation();
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const heureDebut = useMemo(() => {
        return dayjs(details?.dateDebut).utc().format('HH[h]mm');
    }, [details]);

    const heureFin = useMemo(() => {
        return dayjs(details?.dateFin).utc().format('HH[h]mm');
    }, [details]);

    const [, , , bloc, etage, aile, numero] = useMemo(() => {
        return details?.numeroPlace.split("-") || [];
    }, [details]);

    const dateDebut = useMemo(() => {
        return dayjs(details?.dateDebut).tz('Europe/Paris').format('dddd, DD MMMM');
    }, [details]);

    const dateFin = useMemo(() => {
        return dayjs(details?.dateFin).tz('Europe/Paris').format('dddd, DD MMMM');
    }, [details]);

    useEffect(() => {
        fetchDetailsReservation()
    }, [])


    return (
        details && <div className="flex justify-center items-center">
            <div className="flex w-screen pt-28  justify-center items-center">
                <div className="flex w-[70%] px-8  justify-center items-center">
                    <div className="flex flex-col w-full bg-white shadow-lg rounded-3xl py-6 pl-6 pr-12">
                        <div className="flex mb-8">
                            <div className="flex flex-col w-2/3 px-6">
                                {/* <div className="flex mb-8 justify-between">
                                    <DetailsInfo title="ID de reservation" value={details.idReservation} className="w-44" />
                                </div> */}
                                <div className="flex mb-8 justify-between">
                                    <DetailsInfo title="Type de place" value={getTypeVoitureByKey(details.typePlace)} className="w-44" />
                                    <DetailsInfo title="Paiement" value={details.tarif} currency="&euro;" className="w-44" />
                                    <DetailsInfo title="Statut" value={getReservationStatusIcon(details.statut).label} className="w-44" />
                                </div>

                                <div className="flex mt-10 justify-center items-center">
                                    <div className="flex flex-col">
                                        <DetailsInfo title="Entrer à" value={heureDebut} />
                                        <div className="text-slate-500 text-sm">{dateDebut}</div>
                                    </div>
                                    <div className="flex border-2 border-slate-300 h-1 w-52 border-dashed justify-center items-center">
                                        <Image src="../../logo-transp-bg.png" alt="logo" className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <DetailsInfo title="Sortir avant" value={heureFin} />
                                        <div className="text-slate-500 text-sm">{dateDebut !== dateFin && dateFin}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-1/3 h-full items-center">
                                <div className="p-8 shadow-xl rounded-sm">
                                    <QRCode value={details.numeroPlace} fgColor={details.statut == "PLANIFIEE" || details.statut == 'ENCOURS' ? "black" : colors.darkGrey} />
                                </div>
                                <div className="flex flex-col items-center mt-4">
                                    <DetailsInfo className="font-semibold" title="N° Place" value={numero} />
                                    <div className="flex justify-around">
                                        <div className="mx-2"><span className="font-semibold text-slate-500">Bloc:</span> {bloc}</div>
                                        <div className="mx-2"><span className="font-semibold text-slate-500">Etage:</span> {etage}</div>
                                        <div className="mx-2"><span className="font-semibold text-slate-500">Aile:</span> {aile}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col items-center">
                                <div className="text-xl font-semibold">{details.nomParking}</div>
                                <div className="flex items-center">
                                    <MdLocationPin color="#2b77c4" size={30} />
                                    <span className="text-lg">{details.adresseParking}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col justify-center items-center px-14">
                    {
                        details.statut === "PLANIFIEE" && (
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-2xl text-[#449A1D] mb-4">Reservation confirmée</div>
                                <FiCheckCircle size={100} color="#449A1D" />
{ details.isAnnulable && details.statut == 'PLANIFIEE' &&  <div className="text-slate-500 text-2xl mt-8">
                                  <Button className="bg-[#FF0000] px-3 py-2 rounded-full text-xl font-semibold text-white" onPress={handleCancelReservation}>Annuler</Button>
                                </div>}
                            </div>
                        )
                    }
                    {
                        details.statut === "ANNULEE" && (
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-2xl text-[#FF0000] mb-4">Reservation annulée</div>
                                <RxCross2 size={100} color="#FF0000" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}