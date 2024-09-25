import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {textPresentationConfig} from "../../../config/config-schema";

@Component({
  selector: 'app-text-presentation',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './text-presentation.component.html',
  styleUrl: './text-presentation.component.scss'
})
export class TextPresentationComponent {
  textConfig = textPresentationConfig;
}
