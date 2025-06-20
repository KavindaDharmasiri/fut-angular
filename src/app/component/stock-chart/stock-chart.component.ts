import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './stock-chart.component.html'
})
export class StockChartComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stock Price',
        fill: false,
        borderColor: 'blue'
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  ngOnInit(): void {
    this.simulatePriceFeed();
  }

  simulatePriceFeed() {
    let t = 0;
    setInterval(() => {
      t++;
      const price = 100 + Math.sin(t / 5) * 10 + Math.random() * 5;
      this.lineChartData.labels?.push(`${t}s`);
      this.lineChartData.datasets[0].data.push(price);
      // @ts-ignore
      if (this.lineChartData.labels.length > 20) {
        // @ts-ignore
        this.lineChartData.labels.shift();
        this.lineChartData.datasets[0].data.shift();
      }
    }, 1000);
  }
}
