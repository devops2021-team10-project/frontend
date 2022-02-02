import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreatePost} from "../models/create-post.model";

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

  create(createData: CreatePost, image: any): Observable<any> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("postdata", JSON.stringify(createData));

    const httpHeaders = new HttpHeaders({
      "enctype": "multipart/form-data"
    });
    return this.httpClient.post('/api/v1/post', formData, { headers: httpHeaders });
  }

}
