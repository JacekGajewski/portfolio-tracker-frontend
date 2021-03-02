export class PositionDTO {
  public id: number;
  public ticker: string;
  public stockExchange: string;
  public amount: number;
  public stockPrice: number;
  public value: number;
  public sector: string;

  constructor(ticker: string, amount: number, stockExchange: string, sector: string) {
    this.ticker = ticker;
    this.amount = amount;
    this.stockExchange = stockExchange;
    this.sector = sector;
  }
}
