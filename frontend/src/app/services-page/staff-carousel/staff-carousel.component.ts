import {Component} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {mockEmployees} from "../../../mockData/mock-employees";
import {ContainerComponent} from "../../components/shared/container/container.component";

@Component({
  selector: 'app-staff-carousel',
  standalone: true,
  imports: [
    CarouselModule,
    ContainerComponent
  ],
  templateUrl: './staff-carousel.component.html',
  styleUrl: './staff-carousel.component.scss'
})
export class StaffCarouselComponent {
  employees = mockEmployees;
}
