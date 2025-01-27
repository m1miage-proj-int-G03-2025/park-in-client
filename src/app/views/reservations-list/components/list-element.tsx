import Icon from "@/common/components/iconElement";
import getPlaceType from "@/common/utils/place-icon-helper";
import getReservationStatusIcon from "@/common/utils/reservation-icon-helper";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { FaLocationDot } from "react-icons/fa6";
import * as MaterialIcons from "react-icons/md";

interface ListElementProps {
    idReservation: number,
    dateDebut: Date,
    dateFin: Date,
    typeVoiture: string,
    nomParking: string,
    adresseParking: string,
    statut: string,
    handleReservationClicked: (resId: number) => void
    onCancelClick: (resId: number) => void
}
const ListElement = ({ idReservation, dateDebut, dateFin, typeVoiture, nomParking, adresseParking, statut, handleReservationClicked, onCancelClick }: ListElementProps) => {

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    }

    const formatHeure = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(date).replace(':', 'h');
    }

    return (
        <div className="flex bg-white rounded-xl w-full p-6 2xl:p-7 my-3 shadow-xl cursor-pointer" onClick={() => handleReservationClicked(idReservation)}>
            <div className="">
            <div className=""> <Icon name={getReservationStatusIcon(statut).icon as keyof typeof MaterialIcons} size={43} color={getReservationStatusIcon(statut).color}/></div>
            </div>
            <div className="flex flex-col justify-between pl-4 pr-2">
                <div className="flex flex-col">
                    <div className="text-xs 2xl:text-xl font-semibold mb-3">{formatDate(dateDebut)}</div>
                    <div className="mb-3">
                        <span className="text-sm 2xl:text-lg font-semibold text-[#0466C8]">{nomParking}</span>
                    </div>
                    <div className="flex items-baseline text-slate-400">
                        <FaLocationDot className="inline" />
                        <div className="mb-2">
                            <span className="text-xs 2xl:text-lg">{adresseParking}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm 2xl:text-xl font-normal">Entrer à</span>
                    <span className="text-gray-500 text-sm 2xl:text-xl mr-3 font-semibold">{formatHeure(dateDebut)}</span>
                </div>
                <div className="flex border-2 border-slate-300 h-1 w-52 border-dashed justify-center items-center mt-8">
                    <Image src="../../../logo-transp-bg.png" alt="logo" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm 2xl:text-xl font-normal">Sortir avant</span>
                    <span className="text-gray-500 text-sm 2xl:text-xl font-semibold">{formatHeure(dateFin)}</span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center px-9">
                <div className="mb-3 flex">
                    {getPlaceType(typeVoiture)}
                </div>
                {statut === 'PLANIFIEE' && <Button  onPress={() => onCancelClick(idReservation)}className="py-2 px-4 2xl:px-8 mx-2 2xl:mx-9 rounded-full text-sm text-white font-semibold bg-error">Annuler</Button>}
            </div>
            <div>
            </div>
        </div>
    )

}
export default ListElement;
