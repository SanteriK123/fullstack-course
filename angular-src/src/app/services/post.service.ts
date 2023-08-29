import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPosts(token: any) {
    let headers = {
      headers: new HttpHeaders()
        .set('Authorization',  `${token}`)
    }
    return this.http.get('api/posts', headers).pipe();
  }

  publishPost(post: any, token: any) {
    let headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  `${token}`)
    }
    return this.http
      .post('api/posts', post, headers)
      .pipe(map((res: any) => res.json));
  }
  deletePost(id: any, token: any) {
    let headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  `${token}`)
    }
    return this.http
      .delete(`api/posts/${id}`, headers)
      .pipe(map((res: any) => res.json));
  }
}
