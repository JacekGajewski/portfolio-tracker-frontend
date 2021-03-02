import {EventEmitter, Injectable, Output} from '@angular/core';
import {PortfolioDTO} from './model/PortfolioDTO';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {PositionDTO} from './model/PositionDTO';

@Injectable()
export class StockService {

  @Output() portfolioListener = new EventEmitter();

  portfolioId: number;
  portfolioUrl = 'http://localhost:8080/portfolio/';
  positionUrl = 'http://localhost:8080/position/';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  getPortfolio(): Observable<HttpResponse<PortfolioDTO>> {
    return this.http.get<PortfolioDTO>(this.getUserPortfolioUrl(),
      {
        observe: 'response',
        headers: new HttpHeaders({Authorization: this.authService.user.token})
      });
  }

  addPositionToPortfolio(positionDTO: PositionDTO): Observable<PortfolioDTO> {
    return this.http.post<PortfolioDTO>(this.getPortfolioUrl(), positionDTO,
      {
        headers: new HttpHeaders({Authorization: this.authService.user.token})
      });
  }

  updatePosition(position: PositionDTO): Observable<PortfolioDTO> {
    return this.http.post<PortfolioDTO>(this.getPositionUrl(position), position,
      {
      headers: new HttpHeaders({Authorization: this.authService.user.token})
    });
  }

  private getPositionUrl(position: PositionDTO): string {
    return this.positionUrl + position.id;
  }

  private getPortfolioUrl(): string {
    return this.portfolioUrl + this.portfolioId;
  }

  private getUserPortfolioUrl(): string {
    return this.portfolioUrl + 'user/' + this.authService.user.id;
  }

  onEmit(portfolio: PortfolioDTO): void {
    this.portfolioId = portfolio.portfolioId;
    this.portfolioListener.emit(portfolio.positions);
  }
}
