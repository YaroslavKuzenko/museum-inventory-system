import {Component} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {mockClients} from "../../../mockData/mock-clients";
import {CarouselModule} from "primeng/carousel";
import {ClientModel} from "../../../models/client.interface";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ContainerComponent,
    CarouselModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clientsData: ClientModel[] = mockClients;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
  ];
}
