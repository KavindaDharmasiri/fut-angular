import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './trade.component.html'
})
export class TradeComponent {
  symbol = '';
  quantity = 0;
  price = 0;
  type: 'BUY' | 'SELL' = 'BUY';
  message = '';

  constructor(private http: HttpClient) {}

  submitTrade() {
    const payload = {
      userId: 1, // replace with logged-in user ID
      symbol: this.symbol,
      quantity: this.quantity,
      price: this.price
    };

    const url = `http://localhost:9090/trade/${this.type.toLowerCase()}`;
    this.http.post(url, payload).subscribe({
      next: () => {
        this.message = `${this.type} successful`;
        this.symbol = '';
        this.quantity = 0;
        this.price = 0;
      },
      error: err => {
        this.message = `Error: ${err.error.message || 'Unknown error'}`;
      }
    });
  }
}
