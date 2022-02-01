import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  getPostsByUserId(userId: string): Observable<any> {
    return this.httpClient.get('/api/v1/post/allByUser/' + userId);
  }

  getPostImageById(postId: string): Observable<any> {
    return this.httpClient.get('/api/v1/post/' + postId + '/image', { responseType: 'blob' });
  }

}
