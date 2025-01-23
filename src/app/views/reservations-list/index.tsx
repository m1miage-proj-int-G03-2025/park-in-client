import { Suspense, useState } from "react";
import ReservationsSkeleton from "./components/reservation-skeleton";
import ListElement from "./components/list-element";
import { useRouter } from "next/navigation";
const dummyResData = [
    {
    idReservation: 129383,
    dateDebut: new Date(),
    dateFin: new Date(),
    typeVoiture: 'Voiture',
    nomParking: 'Parking de la gare',
    adresseParking: '12 rue de la gare',
    statut: 'PLANIFIEE'
    },
    {
    idReservation: 129384,
    dateDebut: new Date(),
    dateFin: new Date(),
    typeVoiture: 'PMR',
    nomParking: 'Parking de la gare',
    adresseParking: '12 rue de la gare',
    statut: 'ENCOURS'
    },
    {
    idReservation: 129385,
    dateDebut: new Date(),
    dateFin: new Date(),
    typeVoiture: 'Voiture',
    nomParking: 'Parking de la gare',
    adresseParking: '12 rue de la gare',
    statut: 'TERMINEE'
    },
    {
        idReservation: 129386,
        dateDebut: new Date(),
        dateFin: new Date(),
        typeVoiture: 'Voiture',
        nomParking: 'Parking de la gare',
        adresseParking: '12 rue de la gare',
        statut: 'ANNULEE'
        },
        {
            idReservation: 129387,
            dateDebut: new Date(),
            dateFin: new Date(),
            typeVoiture: 'Voiture',
            nomParking: 'Parking de la gare',
            adresseParking: '12 rue de la gare',
            statut: 'PLANIFIEE'
            },
            {
            idReservation: 129388,
            dateDebut: new Date(),
            dateFin: new Date(),
            typeVoiture: 'PMR',
            nomParking: 'Parking de la gare',
            adresseParking: '12 rue de la gare',
            statut: 'ENCOURS'
            },
            {
            idReservation: 129365,
            dateDebut: new Date(),
            dateFin: new Date(),
            typeVoiture: 'Voiture',
            nomParking: 'Parking de la gare',
            adresseParking: '12 rue de la gare',
            statut: 'TERMINEE'
            },
            {
                idReservation: 129396,
                dateDebut: new Date(),
                dateFin: new Date(),
                typeVoiture: 'Voiture',
                nomParking: 'Parking de la gare',
                adresseParking: '12 rue de la gare',
                statut: 'ANNULEE'
                }
]

const ReservationsListView = () => {
    const [reservations, setReservations] = useState(dummyResData);
    const router = useRouter()

    const handleReservationClick = (id: number) => {
        router.push(`/reservations/${id}`)
    }

    const handleCancelReservation = (id: number) => {
        //send delete req to BE
        //this is temporary just to bypass the es-lint error
        setReservations(reservations.filter(res => res.idReservation !== id))
    }

    return (
            <Suspense fallback={<ReservationsSkeleton />}>
          <div className="flex min-h-screen justify-center items-center flex-col">
            <div className="mt-20 pt-8 pb-8">
                </div>
                <div className="justify-center align-center w-2/3">
            {
                reservations?.map((reservation) => {
                    return <ListElement key={reservation.idReservation} {...reservation} handleReservationClicked={handleReservationClick} onCancelClick={handleCancelReservation}/>
                })
            }
            </div>
                </div>

            </Suspense>
    );
}

export default ReservationsListView;