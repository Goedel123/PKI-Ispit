import { ToyModel } from '../models/toy.model';
import data from '../../public/data.json';
import axios from "axios";
export class ToyService {
  static getToys(): ToyModel[]{
    const bong:ToyModel[] = data as ToyModel[];
    return bong;
  }
}
