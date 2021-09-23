import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userState: String;
  auth: boolean;

  constructor(private router: Router, authServ: AuthService) {
    // authServ.user.subscribe(userVal => userVal ? this.userState = 'ADMIN' : this.userState = 'USER');
    // this.auth = !authServ.userValue;
    authServ.user.subscribe(userVal => {
      if (userVal) {
        this.userState = 'ADMIN ADRIÁN';
        this.auth = false;
      } else {
        this.userState = 'USER UBUL';
        this.auth = true;
      }
    });
  }

  ngOnInit(): void {
  }

  goAuth() {
    this.router.navigateByUrl('/auth');
  }

  goSubjects() {
    this.router.navigateByUrl('/subjects/1');
  }

  goWarehouses() {
    this.router.navigateByUrl('/warehouses/1');
  }
}
