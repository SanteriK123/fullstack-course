import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  posts: any;
  loginStatus: any;
  errorMessage: String | undefined;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  async onSubmit() {
    const user = this.loginForm.value;
    try {
      let data: any = await firstValueFrom(
        this.authService.authenticateUser(user)
      );
      this.authService.storeUserData(data.token, data.user);
      this.loginStatus = 'Login succesful';
      this.router.navigate(['posts']);
    } catch (err: any) {
      this.loginStatus = err.error.msg;
    }
  }
}
