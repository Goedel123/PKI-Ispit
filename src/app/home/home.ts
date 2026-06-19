import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlightModel } from '../../models/flight.model';
import { Utils, DaliJeUKorpi, UbaciUKorpu } from '../utils';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../../services/toy.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


  private static DESTINATION_KEY = 'pki_destination'
  private static FLIGHT_KEY = 'pki_flight'
  private static DEPARTURE_KEY = 'pki_departure'
  private static RATING_KEY = 'pki_rating'

  protected selectedDestination = this.loadValueFromLocalStorage(Home.DESTINATION_KEY, 'all')
  protected selectedFlightNumber = this.loadValueFromLocalStorage(Home.FLIGHT_KEY, 'all')
  protected selectedDepartureDate = this.loadValueFromLocalStorage(Home.DEPARTURE_KEY, 'all')
  protected selectedRating = this.loadValueFromLocalStorage(Home.RATING_KEY, 'all')

  protected tip = this.loadValueFromLocalStorage("tip", "svi")
  protected kome = this.loadValueFromLocalStorage("kome", "svi")
  protected serc = this.loadValueFromLocalStorage("serc", "")
  protected datum = this.loadValueFromLocalStorage("datum", "0")
  protected min = this.loadValueFromLocalStorage("min", 0)
  protected max = this.loadValueFromLocalStorage("max", 3000)

  protected allFlights = signal<FlightModel[]>([])
  protected flights = signal<FlightModel[]>([])
  protected sveIgracke = signal<ToyModel[]>([])
  protected igracke = signal<ToyModel[]>([])

  constructor(protected utils: Utils) {
    //this.utils.showLoading()
    this.sveIgracke.set(ToyService.getToys())
    this.search()
    Swal.close()
  }
    DaliJeUKorpi(id: number) {
     return DaliJeUKorpi(id);
    }
    UbaciUKorpu(id: number){
      return UbaciUKorpu(id);
    }
  protected getTipovi() {
    const arr = this.sveIgracke().map(f => f.tip)
    return [...new Set(arr)]
  }
  protected getDatum() {
    const arr = this.sveIgracke().map(f => f.datumProizvodnje)
    return [...new Set(arr)]
  }
  protected getDestinations() {
    const arr = this.allFlights().map(f => f.destination)
    return [...new Set(arr)]
  }

  protected getFlightNumbers() {
    const arr = this.allFlights().map(f => f.flightNumber)
    return [...new Set(arr)]
  }

  protected getDepartureDates() {
    const arr = this.allFlights().map(f => f.scheduledAt.split('T')[0])
    return [...new Set(arr)]
  }

  protected search() {
    console.log(this.tip);
    // Podesavamo vrednosti nazad svih select polja u local storage
    localStorage.setItem(Home.DESTINATION_KEY, this.selectedDestination)
    localStorage.setItem(Home.FLIGHT_KEY, this.selectedFlightNumber)
    localStorage.setItem(Home.DEPARTURE_KEY, this.selectedDepartureDate)
    localStorage.setItem(Home.RATING_KEY, this.selectedRating)

    localStorage.setItem("tip", this.tip)
    localStorage.setItem("kome", this.kome)
    localStorage.setItem("serc", this.serc)
    localStorage.setItem("datum", this.datum)
    localStorage.setItem("min", this.min)
    localStorage.setItem("max", this.max)

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
          return f.Ime.toLowerCase().includes(this.serc.toLowerCase())
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
      })
    )

    this.flights.set(this.allFlights()
      .filter(f => {
        if (this.selectedDestination != 'all')
          return f.destination == this.selectedDestination
        return true
      })
      .filter(f => {
        if (this.selectedFlightNumber != 'all')
          return f.flightNumber == this.selectedFlightNumber
        return true
      })
      .filter(f => {
        if (this.selectedDepartureDate != 'all')
          return f.scheduledAt.split('T')[0] == this.selectedDepartureDate
        return true
      })
      .filter(f => {
        if (this.selectedRating == 'all')
          return true
        if (f.rating == undefined)
          return false
        if (f.rating.likes == 0 && f.rating.dislikes == 0)
          return false
        if (this.selectedRating == 'positive')
          return f.rating.likes >= f.rating.dislikes
        if (this.selectedRating == 'negative')
          return f.rating.dislikes > f.rating.likes
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
