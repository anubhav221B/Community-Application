import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginStatus: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    this.userService.isLoggesIn.subscribe(res => this.loginStatus = res);
    if (!this.loginStatus) {
      this.router.navigate(["/login"]);
    }
    return this.loginStatus;
  }

}
