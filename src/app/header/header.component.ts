import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userState: String;

  constructor(private router: Router, authServ: AuthService) {
    authServ.user.subscribe(userVal => userVal ? this.userState = 'ADMIN' : this.userState = 'USER');
  }

  ngOnInit(): void {
  }

  goSubjects() {
    this.router.navigateByUrl('/subjects/1');
  }

  goWarehouses() {
    this.router.navigateByUrl('/warehouses');
  }
}
