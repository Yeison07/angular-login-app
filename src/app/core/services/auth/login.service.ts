import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginRequest } from '../../../shared/models/loginRequest';
import { UserData } from '../../../shared/models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<UserData> {
    return this.http.get<UserData>("././assets/data.json").pipe(
      catchError(this.handleError)
    )
  }

  isAuth() {
    let token: any = localStorage.getItem("token")
    if (token === "123") {
      return true;
    }
    else { return false }
  }

  private handleError(err: HttpErrorResponse) {

    if (err.status === 0) {
      console.error("Ocurrio un problema inesperado", err);
    }
    else {
      console.error("Ocurrio un error con el siguiente codigo de estado", err.status, err);
    }
    return throwError(() => new Error("Estamos teniendo problemas, intenta de nuevo más tarde"))
  }
}
