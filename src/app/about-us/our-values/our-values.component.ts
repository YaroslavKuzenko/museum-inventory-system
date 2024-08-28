import {Component} from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {ValueComponent} from "./value/value.component";
import {mockOurValues} from "../../../mockData/mock-our-values";
import {ValueModel} from "../../../models/value.interface";

@Component({
  selector: 'app-our-values',
  standalone: true,
  imports: [
    ContainerComponent,
    ValueComponent
  ],
  templateUrl: './our-values.component.html',
  styleUrl: './our-values.component.scss'
})
export class OurValuesComponent {
  values: ValueModel[] = mockOurValues;
}
