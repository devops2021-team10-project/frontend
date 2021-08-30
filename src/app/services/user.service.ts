import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateUser} from "../models/create-user.model";
import {UpdateUser} from "../models/update-user.model";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {PasswordReset} from "../models/pasword-reset.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  register(userToCreate: CreateUser): Observable<any> {
    return this.httpClient.post('http://localhost:5001/user-service-api/user/regular-user', userToCreate);
  }

  update(userToUpdate: UpdateUser, userId: string): Observable<any>  {
    return this.httpClient.put('http://localhost:5001/user-service-api/user/regular-user/update/' + userId, userToUpdate);
  }

  resetPassword(passwordReset: PasswordReset): Observable<any> {
    return this.httpClient.put('http://localhost:5001/user-service-api/user/regular-user/reset-password', passwordReset);
  }

  changeIsPrivate(value: boolean): Observable<any> {
    return this.httpClient.put('http://localhost:5001/user-service-api/user/regular-user/change-is-private',{isPrivate: value} );
  }

  changeIsTaggable(value: boolean): Observable<any> {
    return this.httpClient.put('http://localhost:5001/user-service-api/user/regular-user/change-is-taggable',{isTaggable: value} );
  }

  delete(): Observable<any> {
    return this.httpClient.delete('http://localhost:5001/user-service-api/user/regular-user')
  }
}
