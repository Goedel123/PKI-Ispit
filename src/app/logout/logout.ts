import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  constructor(private router: Router) {}
  Logout() {
    UserService.logout();
    this.router.navigate(['/home']);
  }
  cancel()
  {
    this.router.navigate(["/home"])
  }
}
