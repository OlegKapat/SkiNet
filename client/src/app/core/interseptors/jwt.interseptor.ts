import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "src/app/account/account.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
        req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(req);;
  }
}