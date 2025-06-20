import { Component } from '@angular/core';
import {ThemeService} from '../services/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(protected themeService : ThemeService) {
  }

  toggleSidebar() {
    // Emit event or call service to toggle sidebar
    console.log('Toggle sidebar');
  }


  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
