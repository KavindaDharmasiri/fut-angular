import {Component, EventEmitter, Output} from '@angular/core';
import {TradeService} from '../../../services/trade.service';

@Component({
  selector: 'app-signal-generator',
  imports: [],
  templateUrl: './signal-generator.component.html',
  standalone: true,
  styleUrl: './signal-generator.component.css'
})
export class SignalGeneratorComponent {
  @Output() signalGenerated = new EventEmitter<{ signal: any; indicators: string[] }>();

  constructor(private signalService: TradeService) {}

  generateSignal() {
    const mockSignal = {
      symbol: 'BTCUSDT',
      direction: 'LONG',
      entry: 30000,
      tp_levels: [30500, 31000, 31500, 32000, 32500],
      sl: 29500,
      leverage: '10X',
      order_type: 'market'
    };

    const indicatorsUsed = ['EMA Crossover', 'MACD Crossover', 'RSI'];

    // Emit signal to parent
    this.signalGenerated.emit({ signal: mockSignal, indicators: indicatorsUsed });

    // Log signal to backend
    this.signalService.logTradeSignal(mockSignal).subscribe(
      res => console.log('Signal logged successfully:', res),
      err => console.error('Failed to log signal:', err)
    );
  }
}
