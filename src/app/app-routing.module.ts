import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HousePageComponent } from './components/house-page/house-page.component';
import { AuthLoginPageComponent } from './components/auth-login-page/auth-login-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthDataPageComponent } from './components/auth-data-page/auth-data-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'votings/houses/:house',
    component: HousePageComponent
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'data',
    component: AuthDataPageComponent
  },
  {
    path: 'auth/login',
    component: AuthLoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
