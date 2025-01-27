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
}

const ReservationsListView = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 6; 

    const router = useRouter();
    const { setIsLoading } = useLoading();
    const { userId, isInitialized } = useUserContext();

    const handleReservationClick = (id: string) => {
        router.push(`/reservations/${id}`);
    };

    const fetchReservations = async () => {
        if (userId) {
            setIsLoading(true);
            try {
                const response = await getUserReservations(userId);
                setReservations(
                    response
                        .map((res) => ({
                            ...res,
                            dateDebut: new Date(res.heureDebut),
                            dateFin: new Date(res.heureFin),
                            typeVoiture: getTypeVoitureByKey(res.typeDePlaceEnum),
                        }))
                        .sort((a, b) => b.dateDebut.getTime() - a.dateFin.getTime())
                );
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push("/login");
        }
    };

    const handleCancelReservation = async (id: string) => {
        setIsLoading(true);
        await cancelReservation(id)
            .then(() => {
                fetchReservations();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (isInitialized) {
            fetchReservations();
        }
    }, [isInitialized]);

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
