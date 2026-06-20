import { Component } from '@angular/core';
import { ToyService } from '../../services/toy.service';
import { DaliJeUKorpi, IzbaciIzKorpe } from '../utils';
import { ToyModel } from '../../models/toy.model';
@Component({
  selector: 'app-korpa',
  imports: [],
  templateUrl: './korpa.html',
  styleUrl: './korpa.css',
})
export class Korpa {
  addLike(id:number){
    var l = ToyService.getToys();
    var bing = l.find(z => z.Id==id) as ToyModel
    bing.like++;
    ToyService.setToys(l)
  }
  addDislike(id:number){
    var l = ToyService.getToys();
    var bing = l.find(z => z.Id==id) as ToyModel
    bing.dislike++;
    ToyService.setToys(l)
  }
  getCenaKupjenog(){
    return this.getToysKupjene().reduce((a, b)=>a + b.cena,0)
  }

  getToysKupjene(){
    var list = ToyService.getToys();
    list = list.filter(bingus => {
      console.log(JSON.stringify(bingus))
      return bingus.status == 'pristiglo'
    })
    console.log("donosim " + list.length + " premeta.")
    return list
  }
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
  kupi() {
    var arr = ToyService.getToys();
    for (var a of arr) {
      if (DaliJeUKorpi(a.Id))
        a.status = "pristiglo"
    }
    ToyService.setToys(arr)
    localStorage.setItem("korpa", "")

  }
}
