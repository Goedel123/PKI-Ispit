import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToyModel } from '../models/toy.model';
import { ToyService } from '../services/toy.service';

@Injectable({
  providedIn: 'root'
})


export class Utils {
  public bootstrapClasses = {
    popup: 'card',
    cancelButton: 'btn btn-outline-danger border-0',
    denyButton: 'btn btn-outline-secondary border-0',
    confirmButton: 'btn btn-outline-primary border-0'
  }
  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  public showAlert(text: string) {
    Swal.fire({
      icon: 'info',
      titleText: text,
      customClass: this.bootstrapClasses,
      draggable: true
    })
  }

  public showError(message: string) {
    Swal.fire({
      title: "Oops, an error occured!",
      confirmButtonText: 'Close',
      text: message,
      icon: "error",
      customClass: this.bootstrapClasses,
      draggable: true
    })
  }

  public showConfirm(message: string, callback: Function) {
    Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: "question",
      customClass: this.bootstrapClasses
    }).then(result => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }

  public showLoading() {
    Swal.fire({
      title: "Please wait",
      text: "We are fetching the latest data from our servers!",
      customClass: this.bootstrapClasses,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }
}
export function DaliJeUKorpi(id: number): boolean {
  const data = localStorage.getItem('korpa');
  let arr: any;
  try {
    arr = data ? JSON.parse(data) : [];
  } catch {
    arr = [];
  }
  if (!Array.isArray(arr)) {
    arr = [];
  }
  return arr.includes(id);
}
export function UbaciUKorpu(id: number) {
  const data = localStorage.getItem('korpa');
  let arr: any;
  try {
    arr = data ? JSON.parse(data) : [];
  } catch {
    arr = [];
  }
  if (!Array.isArray(arr)) {
    arr = [];
  }
  const set = new Set<number>(arr);
  set.add(id);
  localStorage.setItem('korpa', JSON.stringify([...set]));

  var l: ToyModel[] = ToyService.getToys();
  var b = l.find(a => a.Id==id) as ToyModel
  b.status='rezervisano'
  ToyService.setToys(l)
}
export function IzbaciIzKorpe(id: number) {
  const data = localStorage.getItem('korpa');
  let arr: any;
  try {
    arr = data ? JSON.parse(data) : [];
  } catch {
    arr = [];
  }
  if (!Array.isArray(arr)) {
    arr = [];
  }
  const set = new Set<number>(arr);
  set.delete(id);
  localStorage.setItem('korpa', JSON.stringify([...set]));

  var l: ToyModel[] = ToyService.getToys();
  var b = l.find(a => a.Id==id) as ToyModel
  b.status="na prodaji"
  ToyService.setToys(l)
}
