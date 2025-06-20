import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './stock-management.component.html'
})
export class StockManagementComponent implements OnInit {
  stocks: any[] = [];
  symbol = '';
  price = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.http.get(`/admin/stocks`)
      .subscribe((res: any) => this.stocks = res);
  }

  addStock() {
    this.http.post(`/admin/stocks`, {
      symbol: this.symbol,
      price: this.price
    }).subscribe(() => {
      this.symbol = '';
      this.price = 0;
      this.loadStocks();
    });
  }

  deleteStock(id: number) {
    this.http.delete(`/admin/stocks/${id}`)
      .subscribe(() => this.loadStocks());
  }
}
