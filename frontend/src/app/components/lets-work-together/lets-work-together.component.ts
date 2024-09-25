import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {CallNowButtonComponent} from "../shared/call-now-button/call-now-button.component";

@Component({
  selector: 'app-lets-work-together',
  standalone: true,
  imports: [
    ContainerComponent,
    CallNowButtonComponent
  ],
  templateUrl: './lets-work-together.component.html',
  styleUrl: './lets-work-together.component.scss'
})
export class LetsWorkTogetherComponent {

}
