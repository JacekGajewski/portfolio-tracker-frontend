import { Component, OnInit } from '@angular/core';
import {StockService} from '../../stock.service';
import {StockDTO} from '../../model/StockDTO';
import {PositionDTO} from '../../model/PositionDTO';
import {PortfolioDTO} from '../../model/PortfolioDTO';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: Array<PositionDTO>;
  portfolioUrl = 'http://localhost:8080/portfolio/1';

  constructor(private stockService: StockService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.portfolioUrl).subscribe(
      (response: PortfolioDTO) => {
        this.stockService.onEmit(response);
      });

    this.stockService.portfolioListener.subscribe(
      data => this.stocks = data
    );
  }

}
