import { Component, OnInit } from '@angular/core';
import { TradeService, TradeRequest, PortfolioResponse, TradeResponse } from '../../services/trade.service';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-trade-dashboardng',
  imports: [
    DecimalPipe,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './trade-dashboardng.component.html',
  standalone: true,
  styleUrl: './trade-dashboardng.component.css'
})
export class TradeDashboardComponent implements OnInit {
  portfolio: PortfolioResponse[] = [];
  history: TradeResponse[] = [];
  symbol = '';
  quantity = 1;
  type: 'BUY' | 'SELL' = 'BUY';
  loading = false;
  message = '';

  constructor(private tradeService: TradeService,private router: Router) {}

  ngOnInit(): void {
    this.loadPortfolio();
    this.loadHistory();
  }

  loadPortfolio(): void {
    this.tradeService.getPortfolio().subscribe((data) => {
      this.portfolio = data;
    });
  }

  loadHistory(): void {
    this.tradeService.getTradeHistory().subscribe((data) => {
      this.history = data;
    });
  }

  execute(): void {
    this.loading = true;
    const req: TradeRequest = {
      symbol: this.symbol,
      quantity: this.quantity,
      type: this.type
    };
    this.tradeService.executeTrade(req).subscribe({
      next: (res) => {
        this.message = res;
        this.loadPortfolio();
        this.loadHistory();
      },
      error: (err) => {
        this.message = err.error;
      },
      complete: () => (this.loading = false)
    });
  }

  toggleType(type: 'BUY' | 'SELL'): void {
    this.type = type;
  }

  trade() {
    this.router.navigate(['/trade']);
  }

  portfolioo() {

    this.router.navigate(['/portfolio']);
  }

  historyG() {

    this.router.navigate(['/history']);
  }

  wallet() {

    this.router.navigate(['/wallet']);
  }
}
