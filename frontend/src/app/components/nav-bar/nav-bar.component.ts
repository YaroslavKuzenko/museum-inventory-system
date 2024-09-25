import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {navbarConfig, routerConfig} from '../../../config/config-schema';
import {RouterLink} from "@angular/router";
import { ScrollService } from '../../../services/scroll.service';
import { SectionAnimationService } from '../../../services/section-animation.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements AfterViewInit {
  linksConfig = navbarConfig;
  router = routerConfig;
  isSidebarVisible : boolean  = false;

  constructor(
    private scrollService: ScrollService,
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }

  showSidebar() : void {
    this.isSidebarVisible = true;
  }

  closeSidebar() : void {
    this.isSidebarVisible = false;
  }

  scroll(anchorId: string) : void {
    this.scrollService.scrollToAnchor(anchorId);
  }
}
