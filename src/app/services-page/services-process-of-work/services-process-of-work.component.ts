import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {LeadingZeroPipe} from "../../../pipes/leading-zero.pipe";
import {ProcessItemComponent} from "./process-item/process-item.component";
import {mockProcessOfWork} from "../../../mockData/mock-process-of-work";
import {ProcessOfWorkModel} from "../../../models/process-of-work.interface";

@Component({
  selector: 'app-services-process-of-work',
  standalone: true,
  imports: [
    ContainerComponent,
    LeadingZeroPipe,
    ProcessItemComponent
  ],
  templateUrl: './services-process-of-work.component.html',
  styleUrl: './services-process-of-work.component.scss'
})
export class ServicesProcessOfWorkComponent {
  data: ProcessOfWorkModel[] = mockProcessOfWork;
}
