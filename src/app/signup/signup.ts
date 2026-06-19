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
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue]
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      this.utils.showError('Invalid form data!')
      return
    }

    if (this.form.value.password !== this.form.value.repeat) {
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
