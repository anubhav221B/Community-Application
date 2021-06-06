import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../Model/User';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails!: IUser;
  sub!: Subscription;
  errorMessage!: String;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginDetails = <IUser>{};
  }

  login(login: IUser): void {
    this.sub = this.userService.authenticate(login).subscribe({
      next: res => {
        this.loginDetails = <IUser>{};
        login = <IUser>{};
        this.router.navigate(['/welocome']);
      },
      error: err => {
        this.errorMessage = err;
        this.loginDetails = <IUser>{};
        login = <IUser>{};
        localStorage.clear();
      }
    });
  }

}
