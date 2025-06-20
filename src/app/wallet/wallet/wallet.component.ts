import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DecimalPipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit {
  balance: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:9090/trade/wallet/1`)
      .subscribe((res: any) => this.balance = res);
  }
}
