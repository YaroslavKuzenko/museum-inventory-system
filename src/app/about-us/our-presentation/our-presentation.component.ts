import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {ourPresentationConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-our-presentation',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './our-presentation.component.html',
  styleUrl: './our-presentation.component.scss'
})
export class OurPresentationComponent {
  data = ourPresentationConfig;
}
