import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {ServicesBannerComponent} from "./services-banner/services-banner.component";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {ServicesPresentationComponent} from "./services-presentation/services-presentation.component";
import {ServicesProcessOfWorkComponent} from "./services-process-of-work/services-process-of-work.component";
import {StaffCarouselComponent} from "./staff-carousel/staff-carousel.component";
import { SectionAnimationService } from '../../services/section-animation.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    ServicesBannerComponent,
    NavBarComponent,
    ServicesPresentationComponent,
    ServicesProcessOfWorkComponent,
    StaffCarouselComponent
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }
}
