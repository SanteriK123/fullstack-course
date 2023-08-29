import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  posts: any;
  registerStatus: any;

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  async onSubmit() {
    const user = this.registerForm.value;
    try {
      await firstValueFrom(this.authService.registerUser(user));
      this.registerStatus = "User has been registered succesfully";
    } catch (err: any) {
      this.registerStatus = err.error.msg;
    }
  }
}
