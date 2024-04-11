import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    {
        path: "welcome", component: WelcomeComponent, canActivate: [authGuardGuard]
    }];
