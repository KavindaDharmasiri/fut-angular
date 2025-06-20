import { Routes } from '@angular/router';
import {TradeDashboardComponent} from './pages/trade-dashboardng/trade-dashboardng.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthGuard} from './guard/auth.guard';
import {StockChartComponent} from './component/stock-chart/stock-chart.component';
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {StockManagementComponent} from './admin/stock-management/stock-management.component';
import {TradeHistoryComponent} from './trade/trade-history/trade-history.component';
import {PortfolioComponent} from './trade/portfolio/portfolio.component';
import {TradeComponent} from './trade/trade/trade.component';
import {WalletComponent} from './wallet/wallet/wallet.component';
import {CandlestickChartComponent} from './trade/components/candlestick-chart/candlestick-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: TradeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: StockChartComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/stocks', component: StockManagementComponent, canActivate: [AuthGuard] },
  { path: 'trade', component: TradeComponent, canActivate: [AuthGuard] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
  { path: 'history', component: TradeHistoryComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'chart/:symbol', component: CandlestickChartComponent, canActivate: [AuthGuard] },


];
