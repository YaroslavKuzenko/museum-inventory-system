import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationService } from "../../services/location.service";
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-location-table',
  standalone: true,
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss'],
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    FormsModule,
    CommonModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class LocationTableComponent implements OnInit {
  locations: any[] = [];
  selectedLocations: any[] | null = null;
  locationDialog: boolean = false;
  location: any = {
    id: null,
    name: '',
    address: '',
    capacity: 0
  };
  submitted: boolean = false;
  isEdit: boolean = false;
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private locationService: LocationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadLocations();
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.userRole = user.role_id;
      },
      error: (err) => {
        console.error('Failed to get user data', err);
      }
    });

  }

  loadLocations() {
    this.locationService.getAll().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load locations' });
        console.error('Error loading locations:', error);
      }
    );
  }

  openNew() {
    this.location = {
      id: null,
      name: '',
      address: '',
      capacity: 0
    };
    this.submitted = false;
    this.isEdit = false;
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
  }

  saveLocation() {
    this.submitted = true;

    if (this.location.name?.trim() && this.location.address?.trim() && this.location.capacity > 0) {
      if (this.isEdit) {
        // Оновлення існуючої локації
        this.locationService.updateLocation(this.location.id, this.location).subscribe(
          () => {
            const index = this.locations.findIndex(loc => loc.id === this.location.id);
            if (index !== -1) {
              this.locations[index] = { ...this.location };
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Location Updated', life: 3000 });
            this.locations = [...this.locations];
            this.locationDialog = false;
            this.location = { id: null, name: '', address: '', capacity: 0 };
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update location.' });
            console.error('Error updating location:', error);
          }
        );
      } else {
        // Створення нової локації
        this.locationService.addLocation(this.location).subscribe(
          (newLocation) => {
            this.locations.push(newLocation);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Location Created', life: 3000 });
            this.locations = [...this.locations];
            this.locationDialog = false;
            this.location = { id: null, name: '', address: '', capacity: 0 };
            this.cdr.detectChanges(); // Тригерити зміну
            console.log("Locations: ", this.locations);
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create location.' });
            console.error('Error creating location:', error);
          }
        );
      }
    }
  }

  editLocation(location: any) {
    this.location = { ...location };
    this.isEdit = true;
    this.locationDialog = true;
  }

  confirmDelete(location: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete location "${location.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteLocation(location);
      }
    });
  }

  deleteLocation(location: any) {
    this.locationService.deleteLocation(location.id).subscribe(
      () => {
        this.locations = this.locations.filter(loc => loc.id !== location.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Location Deleted', life: 3000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete location.' });
        console.error('Error deleting location:', error);
      }
    );
  }
}
