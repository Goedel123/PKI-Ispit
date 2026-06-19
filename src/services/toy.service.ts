import { ToyModel } from '../models/toy.model';
import data from '../../public/data.json';

export class ToyServiceTs {
  static getToys(): ToyModel[]{
    const bong:ToyModel[] = data as ToyModel[];
    return bong;
  }
}
