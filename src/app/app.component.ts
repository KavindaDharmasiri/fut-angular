import { Component } from '@angular/core';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {NgClass, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ThemeService} from './services/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroSectionComponent,
    RouterOutlet,
    SidebarComponent,
    NgIf,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  collapsed = true;

  constructor(private themeService: ThemeService) {
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

}
