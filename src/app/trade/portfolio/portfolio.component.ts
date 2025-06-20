import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  portfolio: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:9090/trade/portfolio/1`)
      .subscribe((data: any) => this.portfolio = data);
  }
}
