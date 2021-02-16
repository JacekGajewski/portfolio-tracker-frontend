import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/stocks/price/';

  ticker = '';
  @Output() price = new EventEmitter<string>();
  stockExchange: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  check(): void {
    this.http.get(this.getUrl()).subscribe(
      (data: string) => {
        this.price.emit(data);
        console.log(data);
      }
    );
  }

  private getUrl(): string {
    return this.baseUrl + this.stockExchange + '/' + this.ticker;
  }

}
