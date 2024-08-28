import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";

@Component({
  selector: 'app-services-banner',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './services-banner.component.html',
  styleUrl: './services-banner.component.scss'
})
export class ServicesBannerComponent {

}
