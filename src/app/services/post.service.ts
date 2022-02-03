import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreatePost} from "../models/create-post.model";
import {ChangeIsLikedModel} from "../models/change-is-liked.model";
import {ChangeIsDislikedModel} from "../models/change-is-disliked.model";
import {CreateNewCommentModel} from "../models/create-new-comment.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  getFeed(): Observable<any> {
    return this.httpClient.get('/api/v1/post/feed');
  }

  getLiked(): Observable<any> {
    return this.httpClient.get('/api/v1/post/allILike');
  }

  getUnliked(): Observable<any> {
    return this.httpClient.get('/api/v1/post/allIDislike');
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

  createComment(data: CreateNewCommentModel): Observable<any> {
    console.log(data);
    return this.httpClient.post('/api/v1/post/createComment', data);
  }

  changeIsLiked(data: ChangeIsLikedModel): Observable<any> {
    console.log(data);
    return this.httpClient.put('/api/v1/post/changeIsLiked', data);
  }

  changeIsDisliked(data: ChangeIsDislikedModel): Observable<any> {
    console.log(data);
    return this.httpClient.put('/api/v1/post/changeIsDisliked', data);
  }

}
