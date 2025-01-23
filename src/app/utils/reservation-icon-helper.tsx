import { colors } from "@/constants/colors";

const getReservationStatusIcon = (status: string) => { 
    switch(status) {
        case "PLANIFIEE":
            return {icon: "MdBrowseGallery", color: colors.darkGrey}
        case "ENCOURS":
            return {icon: "MdIncompleteCircle", color: colors.main};
        case "TERMINEE":
            return {icon: "MdCheckCircle", color: colors.secondary}
        case "ANNULEE":
            return {icon: "MdCancel", color: colors.errorRed}
        default:
            return {icon: "MdEventBusy", color: colors.main};
}
}

export default getReservationStatusIcon;