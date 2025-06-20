import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-signal-analysis',
  imports: [
    NgForOf
  ],
  templateUrl: './signal-analysis.component.html',
  standalone: true,
  styleUrl: './signal-analysis.component.css'
})
export class SignalAnalysisComponent {
  @Input() signal: any;
  @Input() indicators: string[] = [];
}
