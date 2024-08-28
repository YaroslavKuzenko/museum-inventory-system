import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {WorkStepComponent} from "./work-step/work-step.component";
import {mockWorkSteps} from "../../../mockData/mock-work-steps";
import {WorkStepModel} from "../../../models/work-step.interface";
import {GrayButtonComponent} from "../shared/gray-button/gray-button.component";
import { routerConfig } from '../../../config/config-schema';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-how-we-work',
  standalone: true,
  imports: [
    ContainerComponent,
    WorkStepComponent,
    GrayButtonComponent,
    RouterLink
  ],
  templateUrl: './how-we-work.component.html',
  styleUrl: './how-we-work.component.scss'
})
export class HowWeWorkComponent {
  workSteps: WorkStepModel[] = mockWorkSteps;
  router = routerConfig;
}
