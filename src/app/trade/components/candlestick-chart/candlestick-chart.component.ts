import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { createChart, IChartApi, ISeriesApi, LineStyle } from 'lightweight-charts';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  standalone: true,
  styleUrl: './candlestick-chart.component.css',
  imports: [
    FormsModule,
    DecimalPipe,
    NgIf,
    NgStyle
  ]
})
export class CandlestickChartComponent implements OnInit, AfterViewInit, OnDestroy {
  symbol: string = '';
  prices: any[] = [];
  chart: IChartApi | null = null;
  candleSeries: ISeriesApi<'Candlestick'> | null = null;

  tpLevels: number[] = []; // Example: [31000, 31500, 32000]
  slLevel: number = 0;     // Example: 30500

  currentPrice: number = 0;
  liveRoi: number = 0;

  // Simulation
  investment: number = 0;
  entry: number = 0;
  leverage: number = 5;
  direction: string = 'LONG';
  outcome: number = 0.2; // 0.2 = TP1, 1.0 = TP5
  simulationResult: number | null = null;
  tpHit: number = 2;

  private resizeObserver: ResizeObserver | null = null;
  pnl: number = 0;
  roi: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol')!.toLowerCase();

    this.route.queryParams.subscribe(params => {
      this.tpLevels = ['tp1', 'tp2', 'tp3', 'tp4', 'tp5']
        .map(key => parseFloat(params[key]))
        .filter(tp => !isNaN(tp));
      this.slLevel = parseFloat(params['sl']) || 0;
      this.entry = parseFloat(params['entry']) || 0;
      this.leverage = parseFloat(params['leverage']) || 0;
      this.tpHit = parseFloat(params['tp1']) || 0;
      this.direction = params['direction'];
    });

    this.startWebSocket();
  }

  ngAfterViewInit(): void {
    const container = document.getElementById('chart');
    if (!container) return;

    // Create chart with container's initial size
    this.chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: '#1e1e1e' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
    });

    this.candleSeries = this.chart.addCandlestickSeries({
      priceFormat: {
        type: 'price',
        precision: 3,  // ✅ Shows 3 decimal places
        minMove: 0.001
      }
    });
    // Add TP lines (green)
    this.tpLevels.forEach(tp => {
      this.candleSeries!.createPriceLine({
        price: tp,
        color: '#4caf50',
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: `TP ${tp}`,
      });
    });

    // Add SL line (red)
    if (this.slLevel > 0) {
      this.candleSeries.createPriceLine({
        price: this.slLevel,
        color: '#f44336',
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: `SL ${this.slLevel}`,
      });
    }

    // Update chart data every second
    setInterval(() => {
      if (this.candleSeries) {
        this.candleSeries.setData(this.prices);
      }
    }, 1000);

    // Resize chart dynamically on container resize
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === container && this.chart) {
          const { width, height } = entry.contentRect;
          this.chart.resize(width, height);
        }
      }
    });

    this.resizeObserver.observe(container);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  startWebSocket(): void {
    const interval = '1m';
    const socket = webSocket(`wss://fstream.binance.com/ws/${this.symbol}@kline_${interval}`);

    socket.subscribe({
      next: (msg: any) => {
        const kline = msg.k;

        const candle = {
          time: Math.floor(kline.t / 1000),
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };
        this.currentPrice = candle.close;

        // ✅ Live ROI calculation (only if simulation inputs are present)
        if (this.investment > 0 && this.entry > 0 && this.leverage > 0) {
          const priceDiff = this.direction === 'LONG'
            ? (this.currentPrice - this.entry)
            : (this.entry - this.currentPrice);
          const positionSize = (this.investment * this.leverage) / this.entry;
          const profit = priceDiff * positionSize;
          this.liveRoi = (profit / this.investment) * 100;
        }

        const last = this.prices[this.prices.length - 1];
        if (last && last.time === candle.time) {
          this.prices[this.prices.length - 1] = candle;
        } else {
          this.prices.push(candle);
          if (this.prices.length > 50) {
            this.prices.shift();
          }
        }
      },
      error: err => console.error('WebSocket error', err),
      complete: () => console.log('WebSocket closed'),
    });
  }

  simulateTrade(): void {
    const tp = this.tpHit;
    const entry = this.entry;
    const leverage = this.leverage;
    const amount = this.investment;

    const positionSize = (amount * leverage) / entry;
    let priceDiff = 0;

    if (this.direction === 'LONG') {
      priceDiff = tp - entry;
    } else {
      priceDiff = entry - tp;
    }

    const profit = priceDiff * positionSize;

    this.simulationResult = amount + profit;
    this.pnl = profit;
    this.roi = (profit / amount) * 100;
  }


}
