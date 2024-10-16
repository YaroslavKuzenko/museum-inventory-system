import {Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gray-button',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './gray-button.component.html',
  styleUrl: './gray-button.component.scss'
})
export class GrayButtonComponent {
  @Input() text!: string;
}
