import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import { callNowButtonConfig, servicesPresentationConfig } from '../../../config/config-schema';
import { GrayButtonComponent } from '../../components/shared/gray-button/gray-button.component';

@Component({
  selector: 'app-services-presentation',
  standalone: true,
  imports: [
    ContainerComponent,
    GrayButtonComponent
  ],
  templateUrl: './services-presentation.component.html',
  styleUrl: './services-presentation.component.scss'
})
export class ServicesPresentationComponent {
  data = servicesPresentationConfig;
  link: string = callNowButtonConfig.link;
}
