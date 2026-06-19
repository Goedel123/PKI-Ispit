import { ReservationModel } from "./reservation.model";

export interface ToyModel {
    Ime: string,
    Opis: string,
    tip: string,
    uzrast: number,
    cijnaGrupa: "devojcica" | "decak" | "svi",
    datumProizvodnje: string,
    cena: number,
    status: string,
    ocena: number,

}