import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(UserService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq);
  }
}
