import {Component, OnInit} from '@angular/core';
import {StockService} from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockService]
})
export class AppComponent implements OnInit {
  price = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  newPrice(newPrice: string): void {
    this.price = newPrice;
  }
}

