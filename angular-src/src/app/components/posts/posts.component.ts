import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    public authService: AuthService
  ) {}

  posts: any;
  token: any;
  submitStatus: any;

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit(): void {
    this.token = this.authService.loadToken();
    this.getPosts();
  }
  async onDelete(id: any) {
    await firstValueFrom(this.postService.deletePost(id, this.token));
    this.getPosts();
  }
  async onSubmit() {
    const postObj: any = {};
    const user = localStorage.getItem('user');
    const userToken = localStorage.getItem('token');
    if (user === null || userToken === null || this.authService.isLoggedOut()) {
      this.submitStatus = 'Please login to submit post';
      return;
    }
    const post = this.postForm.value;
    postObj.title = post.title;
    postObj.description = post.description;
    postObj.username = JSON.parse(user).username;
    if (post.title === '' || post.description === '') {
      this.submitStatus = 'Please fill out both title and description';
    }
    await firstValueFrom(this.postService.publishPost(postObj, this.token));
    this.getPosts();
  }
  async getPosts() {
    const response = await firstValueFrom(
      this.postService.getPosts(this.token)
    );
    this.posts = response;
  }
  isMyPost() {
    const user = localStorage.getItem('user');
    if (user != null) {
      const name = JSON.parse(user).username;
      return name;
    } else {
      return '';
    }
  }
}
