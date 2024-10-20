import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Exhibit } from '../../models/exhibit.model';
import { ExhibitService } from '../../services/exhibit.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-exhibit-table',
  templateUrl: './exhibit-table.component.html',
  styleUrl: './exhibit-table.component.scss',
  providers: [MessageService, ConfirmationService],
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class ExhibitTableComponent implements OnInit {
  exhibits: Exhibit[] = [];
  selectedExhibits: Exhibit[] | null = null;
  exhibitDialog: boolean = false;
  exhibit: Exhibit = {
    name: '',
    condition: '',
    location_id: 0
  };
  submitted: boolean = false;
  conditions: any[] = [];
  locations: any[] = [];
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private exhibitService: ExhibitService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadExhibits();
    this.loadConditions();
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

  loadExhibits(): void {
    this.exhibitService.getAll().subscribe({
      next: (data: Exhibit[]) => {
        this.exhibits = data;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load exhibits.' });
        console.error('Error loading exhibits:', err);
      }
    });
  }

  loadConditions(): void {
    // Можна отримати стани з сервісу або використовувати фіксовані значення
    this.conditions = [
      { label: 'Good', value: 'Good' },
      { label: 'Fair', value: 'Fair' },
      { label: 'Poor', value: 'Poor' }
    ];
  }

  loadLocations(): void {
    // Припустимо, що у вас є сервіс для локацій
    // Якщо немає, використовуйте фіксовані значення
    this.locations = [
      { label: 'Main Gallery', value: 1 },
      { label: 'Outdoor Exhibition', value: 2 },
      { label: 'Storage', value: 3 }
    ];

    // Якщо є LocationService:
    /*
    this.locationService.getAll().subscribe({
        next: (data: Location[]) => {
            this.locations = data.map(location => ({ label: location.name, value: location.id }));
        },
        error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load locations.' });
            console.error('Error loading locations:', err);
        }
    });
    */
  }

  openNew(): void {
    this.exhibit = {
      name: '',
      condition: '',
      location_id: 0
    };
    this.submitted = false;
    this.exhibitDialog = true;
  }

  editExhibit(exhibit: Exhibit): void {
    this.exhibit = { ...exhibit };
    this.exhibitDialog = true;
  }

  deleteExhibit(exhibit: Exhibit): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete exhibit "${exhibit.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (exhibit.id !== undefined) {
          this.exhibitService.deleteExhibit(exhibit.id).subscribe({
            next: () => {
              this.exhibits = this.exhibits.filter((val) => val.id !== exhibit.id);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exhibit Deleted', life: 3000 });
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete exhibit.' });
              console.error('Error deleting exhibit:', err);
            }
          });
        }
      }
    });
  }



  hideDialog(): void {
    this.exhibitDialog = false;
    this.submitted = false;
  }

  saveExhibit(): void {
    this.submitted = true;

    //
    if (this.exhibit.name?.trim() && this.exhibit.condition && this.exhibit.location_id) {
      console.log('robeeeeeeee');
      if (this.exhibit.id !== undefined) {
        // Оновлення існуючого експонату
        this.exhibitService.updateExhibit(this.exhibit.id, this.exhibit).subscribe({
          next: (updatedExhibit: Exhibit) => {
            const index = this.exhibits.findIndex(e => e.id === updatedExhibit.id);
            if (index !== -1) {
              this.exhibits[index] = updatedExhibit;
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exhibit Updated', life: 3000 });
            this.exhibits = [...this.exhibits];
            this.exhibitDialog = false;
            this.exhibit = {
              name: '',
              condition: '',
              location_id: 0
            };
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update exhibit.' });
            console.error('Error updating exhibit:', err);
          }
        });
      } else {
        // Створення нового експонату
        this.exhibitService.addExhibit(this.exhibit).subscribe({
          next: (newExhibit: Exhibit) => {
            this.exhibits.push(newExhibit);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exhibit Created', life: 3000 });
            this.exhibits = [...this.exhibits];
            this.exhibitDialog = false;
            this.exhibit = {
              name: '',
              condition: '',
              location_id: 0
            };
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create exhibit.' });
            console.error('Error creating exhibit:', err);
          }
        });
      }
    }
  }

  exportExhibits(): void {
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
  }

  getSeverity(condition: string) {
    switch (condition.toLowerCase()) {
      case 'good':
        return 'success';
      case 'fair':
        return 'warning';
      case 'poor':
        return 'danger';
      default:
        return 'info';
    }
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
