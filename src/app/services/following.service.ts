import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  constructor (private httpClient: HttpClient){
  }

  follow(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/follow/' + userId, null);
  }
  unfollow(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/unfollow/' + userId, null);
  }
  approve(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/approve/' + userId, null);
  }

  mute(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/mute/' + userId, null);
  }
  unmute(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/unmute/' + userId, null);
  }
  block(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/block/' + userId, null);
  }
  unblock(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/unblock/' + userId, null);
  }

  delete(userId: string): Observable<any> {
    return this.httpClient.put('/api/v1/following/delete/' + userId, null);
  }
}
