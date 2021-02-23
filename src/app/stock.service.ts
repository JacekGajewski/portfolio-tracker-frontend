import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PortfolioDTO} from './model/PortfolioDTO';

@Injectable()
export class StockService {

  @Output() portfolioListener = new EventEmitter();

  onEmit(portfolio: PortfolioDTO): void {
    this.portfolioListener.emit(portfolio.positions);
  }

}
