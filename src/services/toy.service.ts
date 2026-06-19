import { ToyModel } from '../models/toy.model';
import data from '../../public/data.json';
export class ToyService {
  static getToys(): ToyModel[]{
    const bong:ToyModel[] = data as ToyModel[];
    return bong;
  }
}
