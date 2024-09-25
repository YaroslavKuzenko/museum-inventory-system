import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {mockKeyStatsInfo} from "../../../mockData/mock-key-stats";
import {KeyStatModel} from "../../../models/key-stat.interface";

@Component({
  selector: 'app-key-stats',
  standalone: true,
  imports: [
    ContainerComponent,
  ],
  templateUrl: './key-stats.component.html',
  styleUrl: './key-stats.component.scss'
})
export class KeyStatsComponent {
  data: KeyStatModel[] = mockKeyStatsInfo;
}
