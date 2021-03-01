import {EventEmitter, Injectable, Output} from '@angular/core';
import {PortfolioDTO} from './model/PortfolioDTO';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Injectable()
export class StockService {

  @Output() portfolioListener = new EventEmitter();

  portfolioId: number;
  portfolioUrl = 'http://localhost:8080/portfolio/user/';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  getPortfolio(): Observable<HttpResponse<PortfolioDTO>>{
    return this.http.get<PortfolioDTO>(this.getPortfolioUrl(),
      {
        observe: 'response',
        headers: new HttpHeaders({Authorization: this.authService.user.token})
      });
  }

  private getPortfolioUrl(): string {
    return this.portfolioUrl + this.authService.user.id;
  }

  onEmit(portfolio: PortfolioDTO): void {
    this.portfolioId = portfolio.portfolioId;
    this.portfolioListener.emit(portfolio.positions);
  }


}
