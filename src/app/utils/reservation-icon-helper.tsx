import { colors } from "@/constants/colors";
import { MdBrowseGallery, MdCancel, MdCheckCircle, MdEventBusy, MdIncompleteCircle } from "react-icons/md";

const getReservationStatusIcon = (status: string) => { 
    switch(status) {
        case "PLANIFIEE":
            return <MdBrowseGallery color={colors.darkGrey} size={43} />
        case "ENCOURS":
            return <MdIncompleteCircle color={colors.main} size={43} />;
        case "TERMINEE":
            return <MdCheckCircle color={colors.secondary} size={43} />;
        case "ANNULEE":
            return <MdCancel color={colors.errorRed} size={43} />;
        default:
            return <MdEventBusy color={colors.main} size={43} />;
}
}

export default getReservationStatusIcon;