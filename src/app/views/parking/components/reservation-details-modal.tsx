import { Modal, ModalBody, ModalContent, ModalFooter, Button, ModalHeader } from "@heroui/react";

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
  return (  <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <p>{reservationDetails.TypePlace}</p>

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