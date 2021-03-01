import {Component, OnInit} from '@angular/core';
import {StockService} from './stock.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockService, AuthService]
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

