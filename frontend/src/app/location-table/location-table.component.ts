import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-location-table',
  standalone: true,
  templateUrl: './location-table.component.html',
  styleUrl: './location-table.component.scss',
  imports: [
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonDirective,
    NgIf,
    ToastModule
  ],
  providers: [MessageService]
})
export class LocationTableComponent implements OnInit {
  locations: any[] = [];
  clonedLocations: { [s: string]: any } = {};

  constructor(private locationService: LocationService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getAll().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load locations' });
      }
    );
  }

  onRowEditInit(location: any) {
    this.clonedLocations[location.id] = { ...location };
  }

  onRowEditSave(location: any) {
    this.locationService.updateLocation(location.id, location).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location updated' });
        delete this.clonedLocations[location.id];
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update location' });
        this.onRowEditCancel(location);
      }
    );
  }

  onRowEditCancel(location: any) {
    this.locations[this.findIndexById(location.id)] = this.clonedLocations[location.id];
    delete this.clonedLocations[location.id];
  }

  findIndexById(id: number): number {
    return this.locations.findIndex(location => location.id === id);
  }
}
