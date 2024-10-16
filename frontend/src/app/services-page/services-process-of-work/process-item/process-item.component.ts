import {Component, Input} from '@angular/core';
import {LeadingZeroPipe} from "../../../../pipes/leading-zero.pipe";

@Component({
  selector: 'app-process-item',
  standalone: true,
  imports: [
    LeadingZeroPipe
  ],
  templateUrl: './process-item.component.html',
  styleUrl: './process-item.component.scss'
})
export class ProcessItemComponent {
  descriptionIsShown = false;
  @Input() description!: string;
  @Input() title!: string;
  @Input() number!: number;

  toggleDescription(): void {
    this.descriptionIsShown = !this.descriptionIsShown;
  }
}
