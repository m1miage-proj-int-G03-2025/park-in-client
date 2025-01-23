"use client";

import dayjs from "@/configs/dayjsConfig";
import DetailsInfo from "./components/detailsInfo";
import QRCode from "react-qr-code";
import { MdLocationPin } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross2, RxLapTimer } from "react-icons/rx";
import { Button } from "@heroui/react";

export const reservation = {
    idReservation: 12345,
    statut: "confirmé",
    tarif: 15.0,
    dateDebut: "2025-01-22T09:00:00Z",
    dateFin: "2025-01-22T17:00:00Z",
    nomParking: "Parking Central",
    adresseParking: "123 Rue Principale, 38000 Grenoble",
    typePlace: "voiture",
    numeroPlace: "1-1-A-185"
};

export default function ReservationView() {
    const details = reservation;

    const heureDebut = dayjs(details.dateDebut).utc().format('HH[h]mm');
    const heureFin = dayjs(details.dateFin).utc().format('HH[h]mm');
    const [bloc, etage, aile, numero] = details.numeroPlace.split("-");
    const dateDebut = dayjs(details.dateDebut).tz('Europe/Paris').format('dddd, DD MMMM');
    const dateFin = dayjs(details.dateFin).tz('Europe/Paris').format('dddd, DD MMMM');

    return (
        <div className="flex">
            <div className="flex w-screen pt-28">
                <div className="flex w-[70%] px-8">
                    <div className="flex flex-col w-full bg-white shadow-lg rounded-3xl py-6 pl-6 pr-12">
                        <div className="flex mb-8">
                            <div className="flex flex-col w-2/3 px-6">
                                <div className="flex mb-8 justify-between">
                                    <DetailsInfo title="ID de reservation" value={details.idReservation} className="w-44" />
                                    <DetailsInfo title="Type de place" value={details.typePlace} className="w-44" />
                                </div>
                                <div className="flex mb-8 justify-between">
                                    <DetailsInfo title="Paiement" value={details.tarif} currency="&euro;" className="w-44" />
                                    <DetailsInfo title="Statut" value={details.statut} className="w-44" />
                                </div>

                                <div className="flex mt-10 justify-center items-center">
                                    <div className="flex flex-col">
                                        <DetailsInfo title="Entrer à" value={heureDebut} />
                                        <div className="text-slate-500 text-sm">{dateDebut}</div>
                                    </div>
                                    <div className="flex border-2 border-slate-300 h-1 w-52 border-dashed justify-center items-center">
                                        <RxLapTimer size={25} />
                                    </div>
                                    <div>
                                        <DetailsInfo title="Sortir avant" value={heureFin} />
                                        <div className="text-slate-500 text-sm">{dateDebut !== dateFin && dateFin}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-1/3 h-full items-center">
                                <div>
                                    <QRCode value={details.numeroPlace} fgColor="#2b77c4" />
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
                        details.statut === "confirmé" && (
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-2xl text-[#449A1D] mb-4">Reservation confirmée</div>
                                <FiCheckCircle size={100} color="#449A1D" />
                                <div className="text-slate-500 text-2xl mt-8">
                                    <Button className="bg-[#FF0000] px-3 py-2 rounded-full text-xl font-semibold text-white">Annuler</Button>
                                </div>
                            </div>
                        )
                    }
                    {
                        details.statut === "annulé" && (
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