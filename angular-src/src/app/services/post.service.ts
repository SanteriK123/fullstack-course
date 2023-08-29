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
    return this.http.get('http://localhost:3000/posts', headers).pipe();
  }

  publishPost(post: any, token: any) {
    let headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  `${token}`)
    }
    return this.http
      .post('http://localhost:3000/posts', post, headers)
      .pipe(map((res: any) => res.json));
  }
  deletePost(id: any, token: any) {
    let headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  `${token}`)
    }
    return this.http
      .delete(`http://localhost:3000/posts/${id}`, headers)
      .pipe(map((res: any) => res.json));
  }
}
