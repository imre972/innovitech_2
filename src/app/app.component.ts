import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  auth: boolean;

  constructor(private router: Router, private authService: AuthService) {
    authService.user.subscribe(userVal => userVal ? this.auth = true : this.auth = false);
  }

  ngOnInit() {
    if (this.auth) {
      this.router.navigateByUrl('/subjects/1');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }
}
