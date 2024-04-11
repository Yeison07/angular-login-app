import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { LoginRequest } from '../../models/loginRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  })

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          localStorage.setItem("token", userData.auth)
          console.log(userData);
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
