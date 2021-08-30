import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterRegularUserComponent } from './components/register-regular-user/register-regular-user.component';
import { UpdateRegularUserComponent } from "./components/update-regular-user/update-regular-user.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterRegularUserComponent },
  { path: 'update-user', component: UpdateRegularUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
