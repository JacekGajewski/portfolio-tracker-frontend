import {Component, OnInit} from '@angular/core';
import {StockService} from '../../stock.service';
import {PositionDTO} from '../../model/PositionDTO';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: Array<PositionDTO>;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getPortfolio().subscribe(
      (response) => {
        this.stockService.onEmit(response.body);
      });

    this.stockService.portfolioListener.subscribe(
      data => {
        this.stocks = data;
      }
    );
  }
}
