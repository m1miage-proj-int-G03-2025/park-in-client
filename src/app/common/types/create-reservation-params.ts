export type CreateReservationParams = {
    numeroPlace: string; 
    idUtilisateur?: string; 
    dateDebut: string; 
    duree: string; 
    idParking?: string;
    typePlace: string;
}