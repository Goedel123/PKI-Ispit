import { Component, signal } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Utils } from '../utils';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected profileForm: FormGroup
  protected passwordForm: FormGroup
  protected currentUser = signal<UserModel | null>(null)

  constructor(private formBuilder: FormBuilder, private router: Router, public utils: Utils) {
    try {
      this.currentUser.set(UserService.getActiveUser())
    } catch {
      this.router.navigate(['/login'])
    }

    this.profileForm = this.formBuilder.group({
      name: [this.currentUser()!.name, Validators.required],
      surname: [this.currentUser()!.surname, Validators.required],
      phone: [this.currentUser()!.phone, Validators.required],
      email: [this.currentUser()!.email, Validators.required],
    })

    this.passwordForm = this.formBuilder.group({
      current: ['', Validators.required],
      new: ['', Validators.required],
      repeat: ['', Validators.required]
    })

  }
  protected onProfileSubmit() {
    this.utils.showConfirm('Are you sure you want to update your profile?', () => {
      if (!this.profileForm.valid) {
        this.utils.showError('Invalid form data')
        return
      }

      UserService.updateUser(this.profileForm.value)
      this.utils.showAlert('Profile has been updated!')
    })
  }

  protected onPasswordSubmit() {
    this.utils.showConfirm('Are you sure you want to change your password?', () => {
      if (!this.passwordForm.valid) {
        this.utils.showError('Invalid password form data')
        return
      }

      const old = this.currentUser()!.password
      if (old != this.passwordForm.value.current) {
        this.utils.showError('Incorrect current password')
        return
      }

      if (this.passwordForm.value.new != this.passwordForm.value.repeat) {
        this.utils.showError("New passwords don't match!")
        return
      }

      UserService.updateUserPassword(this.passwordForm.value.new)
      this.utils.showAlert("Password has been changed! You will be redirected to the login page.")
      UserService.logout()
      this.router.navigateByUrl('/login')
    })
  }
}
