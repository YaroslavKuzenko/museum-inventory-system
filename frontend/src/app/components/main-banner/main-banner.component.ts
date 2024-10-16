import {Component} from '@angular/core';
import {CallNowButtonComponent} from '../shared/call-now-button/call-now-button.component';
import {mainBannerConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-main-banner',
  standalone: true,
  imports: [CallNowButtonComponent],
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.scss',
})
export class MainBannerComponent {
  textConfig = mainBannerConfig;
}
