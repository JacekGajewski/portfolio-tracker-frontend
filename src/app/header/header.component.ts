import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.getId() != null;

    this.authService.logListener.subscribe(
      (data: boolean) => {
        this.loggedIn = data;
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
