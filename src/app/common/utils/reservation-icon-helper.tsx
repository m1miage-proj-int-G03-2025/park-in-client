import { colors } from "@/common/constants/colors";

const getReservationStatusIcon = (status: string) => { 
    switch(status) {
        case "PLANIFIEE":
            return {icon: "MdBrowseGallery", color: colors.darkGrey, label: "Confirmée"};
        case "ENCOURS":
            return {icon: "MdIncompleteCircle", color: colors.main, label: "En cours"};
        case "TERMINEE":
            return {icon: "MdCheckCircle", color: colors.secondary, label: "Terminée"};
        case "ANNULEE":
            return {icon: "MdCancel", color: colors.errorRed, label: `Annulée`};
        default:
            return {icon: "MdEventBusy", color: colors.main, label: "Inconnue"};
}
}

export default getReservationStatusIcon;