import {PositionDTO} from './PositionDTO';

export class PortfolioDTO {
  public ticker: string;
  public amount: number;
  public sector: string;
  public stockExchange: string;
  public positions: Array<PositionDTO>;

  constructor(ticker: string, amount: number, sector: string, stockExchange: string) {
    this.ticker = ticker;
    this.amount = amount;
    this.sector = sector;
    this.stockExchange = stockExchange;
  }
}
