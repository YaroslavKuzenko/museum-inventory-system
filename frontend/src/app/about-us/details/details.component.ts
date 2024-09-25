import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {aboutUsDetailsConfig, socialNetworksConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  data = aboutUsDetailsConfig;
  socials = socialNetworksConfig;
}
