import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatus } from '../Model/Status';
import { StatusService } from '../Service/status.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  status: IStatus;
  errorMessage: String;
  loginStatus: Observable<boolean>;

  constructor(private statusService: StatusService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginStatus = this.userService.isLoggesIn;
    this.getStatus();
  }

  getStatus() {
    this.statusService.getStatus().subscribe({
      next: status => this.status = status,
      error: err => this.errorMessage = err
    });
  }

}
