import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-value',
  standalone: true,
  imports: [],
  templateUrl: './value.component.html',
  styleUrl: './value.component.scss'
})
export class ValueComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() text!: string;
}
