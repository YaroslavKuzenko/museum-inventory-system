import {Component, OnInit} from '@angular/core';
import {ContainerComponent} from "../shared/container/container.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactFormModel} from "../../../models/contact-form.interface";
import {NgClass} from "@angular/common";
import {contactFormConfig} from "../../../config/config-schema";
import { SendDataService } from '../../../services/send-data.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ContainerComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup<ContactFormModel>;
  dataConfig = contactFormConfig;

  constructor(private sendDataService: SendDataService) {
  }

  ngOnInit() {
    this.formInitialization();
    this.addingServiceByDefault();
  }

  formInitialization() {
    this.contactForm = new FormGroup<ContactFormModel>({
      services: new FormArray<FormControl<string>>([], {
        validators: [Validators.required]
      }),
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      budget: new FormControl<string>(this.dataConfig.budgets[1], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      projectDetails: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.minLength(3), Validators.maxLength(1000)],
      }),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.sendDataService.submitForm(this.contactForm.value).subscribe({
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.contactForm.reset();
          this.resetActiveServices();
          this.addingServiceByDefault();
        }
      })
    }
  }

  toggleService(service: string) {
    const services = this.contactForm.get('services') as FormArray;

    if (services.controls.some(control => control.value === service)) {
      const index = services.controls.findIndex(control => control.value === service);
      services.removeAt(index);
    } else {
      services.push(new FormControl(service));
    }
  }

  isServiceActive(serviceName: string): boolean {
    const services = this.contactForm.get('services') as FormArray;
    return services.controls.some(s => s.value === serviceName);
  }

  resetActiveServices(): void {
    this.contactForm.controls.services = new FormArray<FormControl<string>>([]);
  }

  addingServiceByDefault() {
    const services = this.contactForm.get('services') as FormArray;
    services.push(new FormControl(this.dataConfig.services[0]));
  }

  isInputInvalidAndUntouched(input: string): boolean {
    const control = this.contactForm.get(input);
    return control ? control.invalid && !control.untouched : false;
  }
}
