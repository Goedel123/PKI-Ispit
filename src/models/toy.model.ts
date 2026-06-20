
export interface ToyModel {
    Id: number,
    Ime: string,
    Slika: string,
    Opis: string,
    tip: string,
    uzrast: number,
    cijnaGrupa: "devojcica" | "decak" | "svi",
    datumProizvodnje: number,
    cena: number,
    status: "na prodaji" | "rezervisano" | "pristiglo" | "otkazano",
    ocena: number,
    like: number,
    dislike: number,
}