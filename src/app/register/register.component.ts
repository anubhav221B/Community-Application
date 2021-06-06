import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../Model/User';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;
  errorMessage: string;
  password1: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = <IUser>{};
  }

  register(u: IUser): void {
    this.userService.register(u).subscribe({
      next: res => {
        this.user = <IUser>{};
        this.password1 = "";
        this.router.navigate(["/login"]);
      },
      error: err => {
        this.errorMessage = err;
        this.user = <IUser>{};
        this.password1 = "";
      }
    });
  }

}
