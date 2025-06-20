import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {ThemeService} from '../../../services/services/theme.service';

@Component({
  selector: 'app-trade-card',
  imports: [
    NgIf
  ],
  templateUrl: './trade-card.component.html',
  standalone: true,
  styleUrl: './trade-card.component.css'
})
export class TradeCardComponent {
  @Input() signal: any;
  protected readonly Boolean = Boolean;

  constructor(private router: Router, protected themeService: ThemeService) { }

  goToChart() {
    const tpLevels = [this.signal.tp1, this.signal.tp2, this.signal.tp3, this.signal.tp4, this.signal.tp5]
      .filter(Boolean)
      .map(Number);
    const slLevel = Number(this.signal.sl);

    const queryParams = {
      symbol: this.signal.symbol,
      direction: this.signal.direction,
      entry: this.signal.entry,
      leverage: this.signal.leverage || '10X',
      tp1: this.signal.tp1 || '',
      tp2: this.signal.tp2 || '',
      tp3: this.signal.tp3 || '',
      tp4: this.signal.tp4 || '',
      tp5: this.signal.tp5 || '',
      sl: this.signal.sl || ''
    };

    this.router.navigate(['/chart', this.signal.symbol], { queryParams });
  }

  getStatusLabel(outcome: string): string {
    if (outcome === '1.0') return '✅ Success';
    if (outcome === '0.0') return '❌ Failed';
    return '⏳ Pending';
  }
}
