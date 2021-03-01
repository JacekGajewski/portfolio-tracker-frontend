import {PositionDTO} from './PositionDTO';

export class PortfolioDTO {
  public portfolioId: number;
  public name: string;
  public value: number;
  public positions: Array<PositionDTO>;


  constructor() {
  }
}
