import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ContainerComponent } from '../components/shared/container/container.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { BlogBannerComponent } from './blog-banner/blog-banner.component';
import { BlogPostsSectionComponent } from './blog-posts-section/blog-posts-section.component';
import { LetsWorkTogetherComponent } from '../components/lets-work-together/lets-work-together.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SectionAnimationService } from '../../services/section-animation.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    ContainerComponent,
    NavBarComponent,
    BlogBannerComponent,
    BlogPostsSectionComponent,
    LetsWorkTogetherComponent,
    FooterComponent
  ],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);

  }
}
