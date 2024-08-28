import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ContainerComponent } from '../components/shared/container/container.component';
import { TagLabelComponent } from '../components/shared/tag-label/tag-label.component';
import { privacyPolicyConfig } from '../../config/config-schema';
import { SectionAnimationService } from '../../services/section-animation.service';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [
    ContainerComponent,
    TagLabelComponent
  ],
  templateUrl: './privacy-policy-page.component.html',
  styleUrl: './privacy-policy-page.component.scss'
})
export class PrivacyPolicyPageComponent implements AfterViewInit {
  data = privacyPolicyConfig;

  constructor(
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }
}
