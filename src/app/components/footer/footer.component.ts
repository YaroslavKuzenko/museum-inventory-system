import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {GrayButtonComponent} from "../shared/gray-button/gray-button.component";
import { footerConfig, routerConfig, socialNetworksConfig } from '../../../config/config-schema';
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {LetsWorkTogetherComponent} from "../lets-work-together/lets-work-together.component";
import { RouterLink } from '@angular/router';
import {ScrollService} from "../../../services/scroll.service";
import { SectionAnimationService } from '../../../services/section-animation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    GrayButtonComponent,
    ContactFormComponent,
    LetsWorkTogetherComponent,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit {
  dataConfig = footerConfig;
  router = routerConfig;
  socials = socialNetworksConfig;

  constructor(
    private scrollService: ScrollService,
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }

  scroll(anchorId: string): void {
    this.scrollService.scrollToAnchor(anchorId);
  }
}
