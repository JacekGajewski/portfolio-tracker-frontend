import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class StockService {

  @Output() betsListener = new EventEmitter();
  private baseUrl = 'http://localhost:8080/stocks/closed/MSFT';

  constructor(private http: HttpClient) {
  }

  getBet(id: string) {
    return this.http.get(this.baseUrl);
  }
}
