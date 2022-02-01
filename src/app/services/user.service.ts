import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateUser} from "../models/create-user.model";
import {UpdateUser} from "../models/update-user.model";
import {PasswordReset} from "../models/pasword-reset.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getPublicUserByUsername(username: string): Observable<any> {
    return this.httpClient.get('/api/v1/user/public/byUsername/' + username);
  }

  getPublicUserById(id: string): Observable<any> {
    return this.httpClient.get('/api/v1/user/public/byId/' + id);
  }

  searchPublicUsersByName(name: string): Observable<any> {
    return this.httpClient.get('/api/v1/user/public/searchByName/' + name);
  }

  register(userToCreate: CreateUser): Observable<any> {
    return this.httpClient.post('/api/v1/user', userToCreate);
  }

  update(userToUpdate: UpdateUser, userId: string): Observable<any>  {
    return this.httpClient.put('/api/v1/user/basicData', userToUpdate);
  }

  resetPassword(passwordReset: PasswordReset): Observable<any> {
    return this.httpClient.put('/api/v1/user/resetPassword', passwordReset);
  }

  changeIsPrivate(value: boolean): Observable<any> {
    return this.httpClient.put('/api/v1/user/changeIsPrivate',{isPrivate: value} );
  }

  changeIsTaggable(value: boolean): Observable<any> {
    return this.httpClient.put('/api/v1/user/changeIsTaggable',{isTaggable: value} );
  }

  changeIsMutedProfile(toMuteUserId: string, isMuted: boolean): Observable<any> {
    return this.httpClient.put('/api/v1/user/changeMutedProfile',
      {
        toMuteUserId,
        isMuted
      });
  }

  changeIsBlockedProfile(toBlockUserId: string, isBlocked: boolean): Observable<any> {
    return this.httpClient.put('/api/v1/user/changeBlockedProfile',
      {
        toBlockUserId,
        isBlocked
      });
  }

  delete(): Observable<any> {
    return this.httpClient.delete('/api/v1/user')
  }
}
