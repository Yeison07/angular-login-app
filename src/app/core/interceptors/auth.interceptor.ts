import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem("token") ?? ""
    console.error(token);

    request = request.clone({
        setHeaders: {
            Authorization: token
        }
    })
    return next(request)
}