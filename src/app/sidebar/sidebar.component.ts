import { Component, Output, EventEmitter, Input } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {ThemeService} from '../services/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink
  ]
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(protected themeService: ThemeService) {
  }

  logout() {

  }
}
