import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortfolioDTO} from '../model/PortfolioDTO';
import {StockService} from '../stock.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  tickerForm: FormGroup;

  private baseUrl = 'http://localhost:8080/stocks/price/';
  private portfolioUrl = 'http://localhost:8080/portfolio/1';

  portfolio: PortfolioDTO;
  ticker = '';
  @Output() price = new EventEmitter<string>();
  stockExchange: any;
  amount: number;

  data: {
    'ticker': 'fgh'
  };

  constructor(private http: HttpClient, private stockService: StockService) {
    this.tickerForm = new FormGroup({
      ticker: new FormControl(null, Validators.required),
      stockExchange: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  private getUrl(): string {
    return this.baseUrl +
      this.tickerForm.get('stockExchange').value +
      '/' + this.tickerForm.get('ticker').value;
  }

  postData(portfolioDTO: PortfolioDTO): void {
    this.http.post(this.portfolioUrl, portfolioDTO).subscribe(
      (response: PortfolioDTO) => {
        this.stockService.onEmit(response);
        this.portfolio = response;
        // console.log(response);
      });
  }

  onSubmit(): void {
    const dto = new PortfolioDTO(
      this.tickerForm.get('ticker').value,
      this.tickerForm.get('amount').value,
      'STOCK',
      this.tickerForm.get('stockExchange').value
    );
    // console.log(dto);
    this.postData(dto);
  }
}
