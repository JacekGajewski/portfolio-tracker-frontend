import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

