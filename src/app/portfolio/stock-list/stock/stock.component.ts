import {Component, Input, OnInit} from '@angular/core';
import {PositionDTO} from '../../../model/PositionDTO';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortfolioDTO} from '../../../model/PortfolioDTO';
import {HttpClient} from '@angular/common/http';
import {StockService} from '../../../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @Input() position: PositionDTO;
  tickerForm: FormGroup;
  positionUrl: string;

  constructor(private http: HttpClient, private stockService: StockService) {
  }

  ngOnInit(): void {
    this.tickerForm = new FormGroup({
      amount: new FormControl(this.position.amount, Validators.required)
    });
    this.positionUrl = 'http://localhost:8080/position/' + this.position.id;
  }

  updateVisible(): boolean {
    return +this.tickerForm.get('amount').value === this.position.amount;
  }

  onUpdate(): void{
    this.position.amount = +this.tickerForm.get('amount').value;
    this.stockService.updatePosition(this.position).subscribe(
      (response: PortfolioDTO) => {
        this.stockService.onEmit(response);
      });
  }
}
