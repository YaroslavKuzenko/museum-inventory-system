import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {ourTeamConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss'
})
export class OurTeamComponent {
  data = ourTeamConfig;
}
