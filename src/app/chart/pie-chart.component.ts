import {Component, OnInit, ViewChild} from '@angular/core';
import {PositionDTO} from '../model/PositionDTO';
import {StockService} from '../stock.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    }];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  myMap = new Map();

  stocks: Array<PositionDTO>;

  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
    this.stockService.portfolioListener.subscribe(
      data => {
        this.shiiit(data);
        // console.log('chartUpdate');
        // console.log(data);
      }
    );
  }

  shiiit(positions: Array<PositionDTO>): void {
    if (positions.length !== this.pieChartData.length) {
      this.removeFromChart(positions);
    }
    for (const position of positions) {
      const numberr = this.pieChartLabels.indexOf(position.ticker);
      if (numberr !== -1) {
        this.pieChartData[numberr] = position.value;
      } else {
        this.pieChartLabels.push(position.ticker);
        this.pieChartData.push(position.value);
      }
    }
    this.chart.chart.update();
  }

  private removeFromChart(positions: Array<PositionDTO>): void {
    const listOfNewLabels = this.getListOfNewLabels(positions);
    console.log(listOfNewLabels);
    this.pieChartLabels.forEach((value, index) => {
      if (listOfNewLabels.indexOf(value) === -1) {
        this.pieChartLabels = this.pieChartLabels.slice(index, 1);
        this.pieChartData = this.pieChartData.slice(index, 1);
      }
    });
  }

  getListOfNewLabels(positions: Array<PositionDTO>): Array<string> {
    const result = [];
    for (const position of positions) {
      result.push(position.ticker);
    }
    return result;
  }
}
