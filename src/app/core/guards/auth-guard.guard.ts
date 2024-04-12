import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token") ?? ""
  const router = inject(Router)
  if (token?.length > 0) {
    return true
  } else {
    router.navigateByUrl("/")
    return false
  }

};
