import { Modal, ModalBody, ModalContent, ModalFooter, Button, ModalHeader } from "@heroui/react";
import { useMemo } from "react";
import InfoField from "./info-field";
import { timeOpts } from "@/constants/timeOpts";
import { colors } from "@/constants/colors";
import { MdInfo } from "react-icons/md";

interface ReservationDetailsModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
    reservationDetails: {
        parkingId: string;
        parkingName: string;
        parkingAddress: string;
        price: number;
        startDate: Date;
        duration: string;
        TypePlace: string;
        numeroPlace?: string;
    }
}


const ReservationDetailsModal = (props: ReservationDetailsModalProps) => {
    const { isOpen, onClose, reservationDetails, onConfirm } = props;
    const infoFields = useMemo(() => {
        return [
            {label: "Nom du parking", text: reservationDetails.parkingName},
            {label: "Adresse", text: reservationDetails.parkingAddress},
            {label: "Date de début", text: reservationDetails.startDate.toLocaleString()},
            {label: "Durée", text: timeOpts.find((opt) => opt.value == reservationDetails.duration)?.label || ""},
            {label: "Type de place", text: reservationDetails.TypePlace},
            {label: reservationDetails.numeroPlace && "Numero de place", text: reservationDetails.numeroPlace || ""},
            {label: "Prix total", text: `${reservationDetails.price}€`}
        ]

    }, [reservationDetails])

  return (  <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Voulez-vous confirmer cette reservation?</ModalHeader>
          <ModalBody>
           {
                infoFields?.map((field, index) => {
                return <InfoField key={index} {...field} />
 })}
        {reservationDetails.numeroPlace == "" && (
            <div className="flex flex-row items-center gap-1">
            <MdInfo color={colors.main} size={60} />
            <p className="text-sm font-normal text-primary">
        Vous n`avez pas choisi une place de parking, une place aleatoire vous sera attribuée automatiquement
    </p>
    </div>)}

</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Retour
            </Button>
            <Button color="secondary" className="text-white" onPress={onConfirm}>
              Confirmer
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
};
export default ReservationDetailsModal