import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ExhibitService} from "../../services/exhibit.service";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-exhibit-table',
  standalone: true,
  templateUrl: './exhibit-table.component.html',
  styleUrl: './exhibit-table.component.scss',
  imports: [
    TableModule,
    FormsModule,
    ButtonDirective,
    Ripple,
    InputTextModule,
    ToastModule,
    NgIf
  ],
  providers: [MessageService]
})
export class ExhibitTableComponent implements OnInit {
  exhibits: any[] = [];
  clonedExhibits: { [s: string]: any } = {}; // Клоновані об'єкти для редагування

  constructor(private exhibitService: ExhibitService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadExhibits();
  }

  loadExhibits() {
    this.exhibitService.getAll().subscribe(
      data => {
        this.exhibits = data;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load exhibits' });
      }
    );
  }

  onRowEditInit(exhibit: any) {
    exhibit.initialName = exhibit.name;
    exhibit.initialAuthor = exhibit.author;
    exhibit.initialCreatedDate = exhibit.created_date;
    exhibit.initialMaterials = exhibit.materials;
    exhibit.initialDescription = exhibit.description;
    exhibit.initialCondition = exhibit.condition;
    exhibit.initialRestorationHistory = exhibit.restoration_history;
    exhibit.initialLocationId = exhibit.location_id;
  }


  onRowEditSave(exhibit: any) {
    // Створюємо об'єкт для оновлення, який включатиме тільки змінені поля
    const updatedFields: any = {};

    // Перевіряємо, які поля були змінені
    if (exhibit.name !== exhibit.initialName) {
      updatedFields.name = exhibit.name;
    }
    if (exhibit.author !== exhibit.initialAuthor) {
      updatedFields.author = exhibit.author;
    }
    if (exhibit.created_date !== exhibit.initialCreatedDate) {
      updatedFields.created_date = exhibit.created_date;
    }
    if (exhibit.materials !== exhibit.initialMaterials) {
      updatedFields.materials = exhibit.materials;
    }
    if (exhibit.description !== exhibit.initialDescription) {
      updatedFields.description = exhibit.description;
    }
    if (exhibit.condition !== exhibit.initialCondition) {
      updatedFields.condition = exhibit.condition;
    }
    if (exhibit.restoration_history !== exhibit.initialRestorationHistory) {
      updatedFields.restoration_history = exhibit.restoration_history;
    }
    if (exhibit.location_id !== exhibit.initialLocationId) {
      updatedFields.location_id = exhibit.location_id;
    }

    // Якщо є змінені поля, відправляємо запит
    if (Object.keys(updatedFields).length > 0) {
      this.exhibitService.updateExhibit(exhibit.id, updatedFields).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exhibit updated' });
          exhibit.editing = false; // Знімаємо стан редагування
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update exhibit' });
          this.onRowEditCancel(exhibit); // У разі помилки скасовуємо зміни
        }
      );
    }
  }



  onRowEditCancel(exhibit: any) {
    this.exhibits[this.findIndexById(exhibit.id)] = this.clonedExhibits[exhibit.id]; // Повертаємо оригінальні дані
    delete this.clonedExhibits[exhibit.id];
  }


  findIndexById(id: number): number {
    return this.exhibits.findIndex(exhibit => exhibit.id === id);
  }
}
