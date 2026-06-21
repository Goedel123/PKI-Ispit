import { Component, signal } from '@angular/core';
import { Utils, DaliJeUKorpi, UbaciUKorpu } from '../utils';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../../services/toy.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected tip = this.loadValueFromLocalStorage("tip", "svi")
  protected kome = this.loadValueFromLocalStorage("kome", "svi")
  protected serc = this.loadValueFromLocalStorage("serc", "")
  protected datum = this.loadValueFromLocalStorage("datum", "0")
  protected min = this.loadValueFromLocalStorage("min", 0)
  protected max = this.loadValueFromLocalStorage("max", 3000)
  protected rating = this.loadValueFromLocalStorage("rating", 'svi')

  protected sveIgracke = signal<ToyModel[]>([])
  protected igracke = signal<ToyModel[]>([])

  constructor(protected utils: Utils) {
    //this.utils.showLoading()
    this.sveIgracke.set(ToyService.getToys())
    this.search()
    Swal.close()
  }
  DaliJeKupjen(id: number){
    return ToyService.getToys().find(a=> a.Id==id)?.status ==  'pristiglo'
  }

  DaliJeUKorpi(id: number) {
    return DaliJeUKorpi(id);
  }
  UbaciUKorpu(id: number) {
    UbaciUKorpu(id);
  }
  protected getTipovi() {
    const arr = this.sveIgracke().map(f => f.tip)
    return [...new Set(arr)]
  }
  protected getDatum() {
    const arr = this.sveIgracke().map(f => f.datumProizvodnje)
    return [...new Set(arr)]
  }
  protected search() {
    console.log(this.tip);
    localStorage.setItem("tip", this.tip)
    localStorage.setItem("kome", this.kome)
    localStorage.setItem("serc", this.serc)
    localStorage.setItem("datum", this.datum)
    localStorage.setItem("min", this.min)
    localStorage.setItem("max", this.max)
    localStorage.setItem("rating", this.rating)

    console.log(this.tip);
    this.igracke.set(this.sveIgracke()
      .filter(f => {
        console.log("f.tip je" + f.tip);
        if (this.tip != 'svi')
          return f.tip == this.tip
        return true
      })
      .filter(f => {
        if (this.kome != 'svi')
          return f.cijnaGrupa == this.kome
        return true
      }).filter(f => {
        if (this.serc != '')
          return ((f.Opis.toLowerCase() + " " + f.Ime.toLowerCase()).includes(this.serc.toLowerCase()))
        return true
      }).filter(f => {
        console.log(f.datumProizvodnje + "  wdwd" + this.datum)
        if (Number(this.datum) != 0)
          return f.datumProizvodnje == Number(this.datum)
        return true
      }).filter(f => {
        return f.cena > Number(this.min)
      }).filter(f => {
        return f.cena < Number(this.max)
      }).filter(f => {
        if (this.rating == 'svi')
          return true
        if (this.rating == 'pos')
          return f.like>f.dislike
        if (this.rating == 'neg')
          return f.dislike>f.like
        return true
      })
    )
  }

  protected loadValueFromLocalStorage(key: string, def: any) {
    if (!localStorage.getItem(key))
      localStorage.setItem(key, def)

    return localStorage.getItem(key)!
  }
}
