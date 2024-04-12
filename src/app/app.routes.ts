import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    {
        path: "welcome", component: WelcomeComponent, canActivate: [authGuardGuard]
    }, { path: "**", component: NotFoundComponent }];
