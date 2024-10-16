import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MainBannerComponent} from './components/main-banner/main-banner.component';
import {TextPresentationComponent} from "./components/text-presentation/text-presentation.component";
import {AdvantagesComponent} from "./components/advantages/advantages.component";
import {KeyStatsComponent} from "./components/key-stats/key-stats.component";
import {LetsWorkTogetherComponent} from "./components/lets-work-together/lets-work-together.component";
import {HowWeWorkComponent} from "./components/how-we-work/how-we-work.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ServicesPageComponent} from "./services-page/services-page.component";
import {ContactFormComponent} from "./components/contact-form/contact-form.component";
import {FooterComponent} from "./components/footer/footer.component";
import { BlogPageComponent } from './blog-page/blog-page.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MainBannerComponent, TextPresentationComponent, AdvantagesComponent, KeyStatsComponent, HowWeWorkComponent, ClientsComponent, LetsWorkTogetherComponent, ContactFormComponent, FooterComponent, BlogPageComponent, CookieBannerComponent, ServicesPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ksoft-website';
}
