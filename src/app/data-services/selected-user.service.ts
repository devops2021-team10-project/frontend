import { Injectable } from '@angular/core';

import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {
  // @ts-ignore
  _selectedUser: User = null;

  setUser(selectedUser: User): void {
    this._selectedUser = selectedUser;
  }

  getUser(): User {
    return this._selectedUser;
  }
}
