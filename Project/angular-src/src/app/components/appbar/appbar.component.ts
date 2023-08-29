import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppbarComponent {
  constructor(public authService: AuthService, private router: Router) {}
  onLogoutClick() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
    return false;
  }
}
