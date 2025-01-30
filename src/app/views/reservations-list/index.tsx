import { Suspense, useEffect, useState } from "react";
import ReservationsSkeleton from "./components/reservation-skeleton";
import ListElement from "./components/list-element";
import { useRouter } from "next/navigation";
import { getUserReservations } from "@/common/services/userService";
import { useUserContext } from "@/common/providers/UserProvider";
import { useLoading } from "@/common/contexts/loadingContext";
import { getTypeVoitureByKey } from "@/common/utils/enum-key-helper";
import { cancelReservation } from "@/common/services/reservationsService";
import { Pagination } from "@heroui/react";

interface Reservation {
    idReservation: string;
    dateDebut: Date;
    dateFin: Date;
    typeVoiture: string;
    nomParking: string;
    adresseParking: string;
    statut: string;
    isAnnulable?: boolean;
}

const ReservationsListView = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 6; 

    const router = useRouter();
    const { setIsLoading } = useLoading();
    const { userInfo } = useUserContext();

    const handleReservationClick = (idReservation: string) => {
        router.push(`/reservations/${idReservation}`);
    };

    const fetchReservations = async () => {
        setIsLoading(true);
        try {
            const response = await getUserReservations(userInfo!.idUtilisateur);
            setReservations(
                response
                    .map((res) => {
                        const dateDebut = new Date(res.heureDebut);
                        const dateFin = new Date(res.heureFin);
                        const now = new Date();
                        const isAnnulable = (dateDebut.getTime() - now.getTime()) > 48 * 60 * 60 * 1000; 
            
                        return {
                            ...res,
                            dateDebut,
                            dateFin,
                            typeVoiture: getTypeVoitureByKey(res.typeDePlaceEnum),
                            isAnnulable, 
                        };
                    }).sort((a, b) => b.dateDebut.getTime() - a.dateFin.getTime())
            );
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelReservation = async (idReservation: string) => {
        setIsLoading(true);
        await cancelReservation(idReservation)
            .then(() => {
                fetchReservations();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (userInfo) {
            fetchReservations();
            return;
        }
        router.push("/login");
    }, [userInfo]);

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(
        indexOfFirstReservation,
        indexOfLastReservation
    );

    const totalPages = Math.ceil(reservations.length / reservationsPerPage);

    return (
        <Suspense fallback={<ReservationsSkeleton />}>
            <div className="flex min-h-screen justify-center items-center flex-col">
                <div className="flex flex-col justify-center items-center w-[60%] 2xl:[60%] mt-24">
                    {currentReservations.map((reservation) => (
                        <ListElement
                            key={reservation.idReservation}
                            {...reservation}
                            handleReservationClicked={handleReservationClick}
                            onCancelClick={handleCancelReservation}
                        />
                    ))}
                </div>
                <div className="m-4">
                    <Pagination
                        page={currentPage}
                        total={totalPages}
                        color="primary"
                        size="lg"
                        onChange={(page) => setCurrentPage(page)}
                        showControls
                    />
                </div>
            </div>
        </Suspense>
    );
};

export default ReservationsListView;
