import {Component, OnInit} from '@angular/core';
import {StockService} from '../../stock.service';
import {PositionDTO} from '../../model/PositionDTO';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: Array<PositionDTO>;
  portfolioUrl = 'http://localhost:8080/portfolio/user/';

  constructor(private stockService: StockService,
              private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.stockService.getPortfolio().subscribe(
      (response) => {
        this.stockService.onEmit(response.body);
      });

    this.stockService.portfolioListener.subscribe(
      data => {
        this.stocks = data;
        console.log('data');
        console.log(data);
      }
    );
  }

  private getPortfolioUrl(): string {
    return this.portfolioUrl + this.authService.user.id;
  }

}
