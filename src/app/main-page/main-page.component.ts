import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {AdvantagesComponent} from "../components/advantages/advantages.component";
import {ClientsComponent} from "../components/clients/clients.component";
import {HowWeWorkComponent} from "../components/how-we-work/how-we-work.component";
import {KeyStatsComponent} from "../components/key-stats/key-stats.component";
import {MainBannerComponent} from "../components/main-banner/main-banner.component";
import {TextPresentationComponent} from "../components/text-presentation/text-presentation.component";
import { SectionAnimationService } from '../../services/section-animation.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    AdvantagesComponent,
    ClientsComponent,
    HowWeWorkComponent,
    KeyStatsComponent,
    MainBannerComponent,
    TextPresentationComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }
}
