import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  closeSesion() {
    localStorage.setItem("token", "")
    this.authService.currentUserSignal.set(null)
    this.router.navigateByUrl("/")
  }

  get authservice() {
    return this.authService
  }
}
