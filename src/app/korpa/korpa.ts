import { Component } from '@angular/core';
import { ToyService } from '../../services/toy.service';
import { Utils, DaliJeUKorpi, IzbaciIzKorpe } from '../utils';
@Component({
  selector: 'app-korpa',
  imports: [],
  templateUrl: './korpa.html',
  styleUrl: './korpa.css',
})
export class Korpa {
  getToysUKorpi() {
    var list = ToyService.getToys();
    list = list.filter(bingus => {
      console.log("BIGUS JE " + DaliJeUKorpi(bingus.Id))
      return DaliJeUKorpi(bingus.Id)
    })
    return list
  }
  getCelaCena() {
    var list = this.getToysUKorpi()
    return list.map(f => f.cena).reduce((a, b) => a + b, 0)
  }
  IzbaciIzKorpe(id: number) {
    IzbaciIzKorpe(id)
  }
}
