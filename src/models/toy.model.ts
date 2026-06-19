import { ReservationModel } from "./reservation.model";

export interface ToyModel {
    Ime: string,
    Slika: string,
    Opis: string,
    tip: string,
    uzrast: number,
    cijnaGrupa: "devojcica" | "decak" | "svi",
    datumProizvodnje: number,
    cena: number,
    status: string,
    ocena: number,

}