import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  loginStatus: Observable<boolean>;
  user: Observable<string>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loginStatus = this.userService.isLoggesIn;
    this.user = this.userService.currentUser;
  }

  logout() {
    localStorage.clear();
  }

}
