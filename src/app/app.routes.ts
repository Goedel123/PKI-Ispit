import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { Korpa } from './korpa/korpa';
import { Logout } from './logout/logout';

export const routes: Routes = [
    { path: 'logout', title: 'Logout', component: Logout },
    { path: 'korpa', title: 'Korpa', component: Korpa },
    { path: 'Home', title: 'Home Page', component: Home },
    { path: 'login', title: 'Login', component: Login },
    { path: 'signup', title: 'Signup', component: Signup },
    { path: 'about', title: 'About', component: About },
    { path: 'profile', title: 'User Profile', component: Profile },
    { path: '**', redirectTo: 'Home' },
]
