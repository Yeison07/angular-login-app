import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserDataRequest } from '../../models/userRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  registerForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    name: ["", [Validators.required]]
  })

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as UserDataRequest).subscribe({
        next: (userData) => {

        }, error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigateByUrl("/")
          this.registerForm.reset()
          alert("Usuario registrado con exito")
        }
      })
    }
  }

  get email() {
    return this.registerForm.controls.email
  }

  get password() {
    return this.registerForm.controls.password
  }

  get name() {
    return this.registerForm.controls.name
  }
}
