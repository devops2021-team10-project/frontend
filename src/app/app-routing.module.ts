import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterRegularUserComponent } from './components/register-regular-user/register-regular-user.component';
import { UpdateRegularUserComponent } from "./components/update-regular-user/update-regular-user.component";
import {UserViewComponent} from "./components/user-view/user-view.component";
import {FeedComponent} from "./components/feed/feed.component";
import {UserSearchComponent} from "./components/user-search/user-search.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterRegularUserComponent },
  { path: 'update-user', component: UpdateRegularUserComponent },
  { path: 'users/:username', component: UserViewComponent },
  { path: 'user-search', component: UserSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
