import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {BannerComponent} from "./banner/banner.component";
import {OurPresentationComponent} from "./our-presentation/our-presentation.component";
import {OurTeamComponent} from "./our-team/our-team.component";
import {OurValuesComponent} from "./our-values/our-values.component";
import {DetailsComponent} from "./details/details.component";
import { SectionAnimationService } from '../../services/section-animation.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NavBarComponent,
    BannerComponent,
    OurPresentationComponent,
    OurTeamComponent,
    OurValuesComponent,
    DetailsComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }
}
