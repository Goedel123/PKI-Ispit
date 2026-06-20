import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Utils } from '../utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

  constructor(private route: ActivatedRoute, protected utils: Utils) {
    this.utils.showLoading()
  }
}
