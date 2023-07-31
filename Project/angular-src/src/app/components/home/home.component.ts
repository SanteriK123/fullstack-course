import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  posts: any;
  status: String | undefined;
  errorMessage: String | undefined;

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit(): void {
    this.getPosts();
    console.log(this.posts);
  }
  async onDelete(id: any) {
    await firstValueFrom(this.authService.deletePost(id));
    this.getPosts();
  }
  async onSubmit() {
    const post = this.postForm.value;
    await firstValueFrom(this.authService.publishPost(post));
    this.getPosts();
  }
  async getPosts() {
    const response = await firstValueFrom(this.authService.getPosts());
    this.posts = response;
  }
}
