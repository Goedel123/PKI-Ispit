import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  protected form: FormGroup

  constructor(private formBuilder: FormBuilder, protected router: Router, private utils: Utils) {

    this.form = this.formBuilder.group({
      name: ['Marko', Validators.required],
      surname: ['Markovic', Validators.required],
      email: ['Markovic@example.com', [Validators.required, Validators.email]],
      phone: ['123 1234567',],
      password: ['lozinka', Validators.required],
      confirm: ['lozinka', Validators.required],
      checkbox: [false, Validators.requiredTrue]
    })
  }

  onSubmit() {
    if (this.form.get('username')?.hasError('required')) {
      this.utils.showError('Username is required');
      return;
    }

    if (this.form.get('email')?.hasError('required')) {
      this.utils.showError('Email is required');
      return;
    }

    if (this.form.get('email')?.hasError('email')) {
      this.utils.showError('Email is not valid');
      return;
    }

    if (this.form.get('password')?.hasError('required')) {
      this.utils.showError('Password is required');
      return;
    }
    console.log(this.form.value.password + this.form.value.confirm)
    if (this.form.value.password != this.form.value.confirm) {
      this.utils.showError(`Passwords don't match!`)
      return
    }

    try {
      const formValue: any = this.form.value
      delete formValue.repeat
      UserService.signup(formValue)
      this.router.navigateByUrl('/login')
    } catch (e) {
      console.error(e)
      this.utils.showError(String(e))
    }
  }
}
