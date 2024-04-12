import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserDataRequest } from '../../../shared/models/userRequest';
import { UserDataResponse } from '../../../shared/models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = "https://api.realworld.io/api"
  currentUserSignal = signal<UserDataResponse | null | undefined>(undefined)

  constructor(private http: HttpClient) { }

  login(credentials: UserDataRequest): Observable<any> {
    return this.http.post<UserDataRequest>(`${this.api}/users/login`, {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    }).pipe(
      catchError(this.handleError)
    )
  }

  register(credentials: UserDataRequest): Observable<UserDataResponse> {
    return this.http.post<UserDataRequest>(`${this.api}/users`, {
      user: {
        username: credentials.name,
        email: credentials.email,
        password: credentials.password
      }

    }).pipe(catchError(this.handleError))
  }

  isAuth() {
    return this.http.get<UserDataRequest>(`${this.api}/user`).pipe(catchError(this.handleError))
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
