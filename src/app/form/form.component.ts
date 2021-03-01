import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortfolioDTO} from '../model/PortfolioDTO';
import {StockService} from '../stock.service';
import {PositionDTO} from '../model/PositionDTO';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  tickerForm: FormGroup;

  portfolio: PortfolioDTO;
  ticker = '';
  stockExchange: any;
  amount: number;

  data: {
    'ticker': 'fgh'
  };

  constructor(private http: HttpClient,
              private stockService: StockService) {
    this.tickerForm = new FormGroup({
      ticker: new FormControl(null, Validators.required),
      stockExchange: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  postData(positionDTO: PositionDTO): void {
    this.stockService.addPositionToPortfolio(positionDTO).subscribe(
      (response) => {
        this.stockService.onEmit(response);
        this.portfolio = response;
      });
  }

  onSubmit(): void {
    const dto = new PositionDTO(
      this.tickerForm.get('ticker').value,
      this.tickerForm.get('amount').value,
      this.tickerForm.get('stockExchange').value,
      'STOCK'
    );
    this.postData(dto);
  }
}
