import { ToyModel } from '../models/toy.model';
import data from '../../public/data.json';
export class ToyService {
  constructor() {
    localStorage.setItem('toys', JSON.stringify(data as ToyModel[]))

  }
  static getToys(): ToyModel[] {
    try {
      if (!Array.isArray(JSON.parse(localStorage.getItem("toys") || ""))) {
        localStorage.setItem('toys', JSON.stringify(data as ToyModel[]))
      }
    }
    catch {
      localStorage.setItem('toys', JSON.stringify(data as ToyModel[]))
    }
    return JSON.parse(localStorage.getItem("toys") || "[]") as ToyModel[];
  }
  static setToys(newToys: ToyModel[]) {
    localStorage.setItem('toys', JSON.stringify(newToys));
  }
}
