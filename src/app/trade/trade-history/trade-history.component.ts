import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { SignalGeneratorComponent } from '../components/signal-generator/signal-generator.component';
import { TradeService } from '../../services/trade.service';
import { SignalAnalysisComponent } from '../components/signal-analysis/signal-analysis.component';
import { CandlestickChartComponent } from '../components/candlestick-chart/candlestick-chart.component';
import { TradeCardComponent } from '../components/trade-card/trade-card.component';

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    DecimalPipe,
    SignalGeneratorComponent,
    SignalAnalysisComponent,
    CandlestickChartComponent,
    TradeCardComponent
  ],
  templateUrl: './trade-history.component.html'
})
export class TradeHistoryComponent implements OnInit {
  allSignals: any[] = [];
  currentSignals: any[] = [];
  generatedSignal: any = null;
  indicatorsUsed: string[] = [];
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private signalService: TradeService) {}

  ngOnInit(): void {
    this.signalService.getSignals().subscribe(res => {
      console.log('Fetched signals:', res);
      this.allSignals = res;
      this.updateCurrentSignals();
    });
  }

  handleSignal($event: { signal: any; indicators: string[] }) {
    this.generatedSignal = $event.signal;
    this.indicatorsUsed = $event.indicators;
  }

  get totalPages() {
    return Math.ceil(this.allSignals.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentSignals();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentSignals();
    }
  }

  updateCurrentSignals() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.currentSignals = this.allSignals.slice(start, end);
  }

}
