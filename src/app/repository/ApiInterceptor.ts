import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.auth.idToken.pipe(
      take(1),
      switchMap((idToken) => {
        const authReq = req.clone({
            headers: req.headers
              .set('Authorization', idToken)
              .set('Content-Type', 'application/json')
        })

        return next.handle(authReq);
    }))
  }
}