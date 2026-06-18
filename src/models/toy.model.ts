import { ReservationModel } from "./reservation.model";

export interface ToyModel {
    Ime: string,
    Opis: string,
    tip: string,
    uzrast: Number,
    cijnaGrupa: 'devojcica' | 'decak' | 'svi',
    datumProizvodnje: string,
    cena: Number,
    status: string,
    ocena: Number,

}