import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";

import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  {path: 'not-found', component: NotFoundComponent}, 
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  