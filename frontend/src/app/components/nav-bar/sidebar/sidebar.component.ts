import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routerConfig } from '../../../../config/config-schema';
import { ScrollService } from '../../../../services/scroll.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private scrollService: ScrollService) {
  }

  @Output() close = new EventEmitter<void>();
  router = routerConfig;

  scroll(anchorId: string) : void {
    this.scrollService.scrollToAnchor(anchorId);
  }

  closeSidebar() : void {
    this.close.emit();
  }
}
