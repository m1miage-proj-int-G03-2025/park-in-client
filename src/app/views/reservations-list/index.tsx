import { Suspense, useEffect, useState } from "react";
import ReservationsSkeleton from "./components/reservation-skeleton";
import ListElement from "./components/list-element";
import { useRouter } from "next/navigation";
import { getUserReservations } from "@/services/userService";
import { useUserContext } from "@/providers/UserProvider";
import { useLoading } from "@/contexts/loadingContext";
import { getTypeVoitureByKey } from "@/utils/enum-key-helper";
import { cancelReservation } from "@/services/reservationsService";
interface Reservation {
    idReservation: number;
    dateDebut: Date;
    dateFin: Date;
    typeVoiture: string;
    nomParking: string;
    adresseParking: string;
    statut: string;
}

const ReservationsListView = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const router = useRouter()
    const {setIsLoading} = useLoading()
    const {userId, isInitialized} = useUserContext()

    const handleReservationClick = (id: number) => {
        router.push(`/reservations/${id}`)
    }

    const fetchReservations = async () => {

        if (userId) {
            setIsLoading(true);
            try {
                const response = await getUserReservations(userId);
                setReservations(response.map((res) => ({
                    ...res,
                    typeVoiture: getTypeVoitureByKey(res.typeVoiture),
                })));
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push('/login')
        }
    };

    const handleCancelReservation = async (id: number) => {
        setIsLoading(true)
       await cancelReservation(id).then(() => {
        fetchReservations()
       }).finally(() => {
        setIsLoading(false)
       })
    }

    useEffect(() => {
        if(isInitialized) {
            fetchReservations()
        }

    },[isInitialized])

    return (
        <Suspense fallback={<ReservationsSkeleton />}>
            <div className="flex min-h-screen justify-center items-center flex-col">
                <div className="flex flex-col justify-center items-center w-[60%] 2xl:[60%] mt-24">
                    {
                        reservations?.map((reservation) => {
                            return <ListElement key={reservation.idReservation} {...reservation} handleReservationClicked={handleReservationClick} onCancelClick={handleCancelReservation} />
                        })
                    }
                </div>
            </div>

        </Suspense>
    );
}

export default ReservationsListView;