import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserDataRequest } from '../../models/userRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  })

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as UserDataRequest).subscribe({
        next: (userData) => {
          localStorage.setItem("token", userData.user.token)
          this.authService.currentUserSignal.set(userData.user)
        }, error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigateByUrl("/welcome")
          this.loginForm.reset()
        }

      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }




  get email() {
    return this.loginForm.controls.email
  }

  get password() {
    return this.loginForm.controls.password
  }
}
