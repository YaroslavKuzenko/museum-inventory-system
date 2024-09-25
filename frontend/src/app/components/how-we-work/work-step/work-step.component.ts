import {Component, Input} from '@angular/core';
import {LeadingZeroPipe} from "../../../../pipes/leading-zero.pipe";
import {WorkStepModel} from "../../../../models/work-step.interface";

@Component({
  selector: 'app-work-step',
  standalone: true,
  imports: [
    LeadingZeroPipe
  ],
  templateUrl: './work-step.component.html',
  styleUrl: './work-step.component.scss'
})
export class WorkStepComponent {
  @Input() data!: WorkStepModel;
}
