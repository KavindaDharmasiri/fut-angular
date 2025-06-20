import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

export interface TradeRequest {
  symbol: string;
  quantity: number;
  type: 'BUY' | 'SELL';
}

export interface PortfolioResponse {
  symbol: string;
  stockName: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
}

export interface TradeResponse {
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class TradeService {
  private baseUrl = '/api/trade';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  executeTrade(request: TradeRequest): Observable<string> {
    return this.http.post(this.baseUrl + '/execute', request, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  getPortfolio(): Observable<PortfolioResponse[]> {
    return this.http.get<PortfolioResponse[]>(this.baseUrl + '/portfolio', {
      headers: this.getAuthHeaders()
    });
  }

  getTradeHistory(): Observable<TradeResponse[]> {
    return this.http.get<TradeResponse[]>(this.baseUrl + '/history', {
      headers: this.getAuthHeaders()
    });
  }


  private SIGNAL_API_URL = 'http://localhost:8081/api/signals';
  private OHLC_API_URL = 'http://localhost:8081/api/ohlc';
  private MODEL_TRAINING_URL = 'http://localhost:8081/api/train-model';
  /**
   * Fetch all trade signals
   */
  getSignals(): Observable<any[]> {
    return this.http.get(this.SIGNAL_API_URL).pipe(
      map((response: any) => {
        const headers = response[0];
        const rows = response.slice(1);
        return rows.map((row: any[]) => {
          const signal: { [key: string]: any } = {};
          headers.forEach((key: string, i: number) => {
            signal[key] = row[i];
          });
          return signal;
        }).reverse(); // Newest at top
      }),
      catchError(error => {
        console.error('Error fetching signals:', error);
        return throwError(() => new Error('Failed to fetch signals'));
      })
    );
  }

  /**
   * Fetch OHLC data for a given symbol
   * @param symbol Coin symbol (e.g., BTCUSDT)
   */

  /**
   * Log a new trade signal
   * @param signal The generated signal object
   */
  logTradeSignal(signal: any): Observable<any> {
    return this.http.post(`${this.SIGNAL_API_URL}/log`, signal).pipe(
      catchError(error => {
        console.error('Error logging trade signal:', error);
        return throwError(() => new Error('Failed to log trade signal'));
      })
    );
  }

  /**
   * Update outcome of a trade (success or failure)
   * @param symbol Coin symbol
   * @param outcome 1 for success, 0 for failure
   */
  updateTradeOutcome(symbol: string, outcome: number): Observable<any> {
    return this.http.post(`${this.SIGNAL_API_URL}/update-outcome`, {
      symbol,
      outcome
    }).pipe(
      catchError(error => {
        console.error(`Error updating outcome for ${symbol}:`, error);
        return throwError(() => new Error(`Failed to update outcome for ${symbol}`));
      })
    );
  }

  /**
   * Trigger retraining of the ML model
   */
  trainModel(): Observable<any> {
    return this.http.post(this.MODEL_TRAINING_URL, {}).pipe(
      catchError(error => {
        console.error('Error training model:', error);
        return throwError(() => new Error('Failed to train ML model'));
      })
    );
  }
}
