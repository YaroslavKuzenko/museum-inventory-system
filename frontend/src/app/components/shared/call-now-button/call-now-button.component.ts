import { Component } from '@angular/core';
import { callNowButtonConfig } from '../../../../config/config-schema';

@Component({
  selector: 'app-call-now-button',
  standalone: true,
  imports: [],
  templateUrl: './call-now-button.component.html',
  styleUrl: './call-now-button.component.scss',
})
export class CallNowButtonComponent {
  data = callNowButtonConfig;
}
