import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get('http://localhost:3000/posts').pipe();
  }

  publishPost(post: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/posts', post, { headers: headers })
      .pipe(map((res: any) => res.json));
  }
  deletePost(id: any) {
    return this.http
      .delete(`http://localhost:3000/posts/${id}`)
      .pipe(map((res: any) => res.json));
  }
}
