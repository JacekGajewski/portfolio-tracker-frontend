import {StockDTO} from './StockDTO';

export class PositionDTO {
  public id: number;
  public amount: number;
  public value: number;
  public sector: string;
  public stock: StockDTO;
}
