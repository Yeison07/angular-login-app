import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)
  if (loginService.isAuth()) {
    return true
  }
  else {
    router.navigateByUrl("/")
    return false
  }

};
