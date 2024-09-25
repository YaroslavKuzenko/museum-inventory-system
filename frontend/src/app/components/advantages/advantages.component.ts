import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {advantagesConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './advantages.component.html',
  styleUrl: './advantages.component.scss'
})
export class AdvantagesComponent {
  dataConfig = advantagesConfig;
}
