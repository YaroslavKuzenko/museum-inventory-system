import {FormArray, FormControl} from "@angular/forms";

export interface ContactFormModel {
  services: FormArray<FormControl<string>>;
  name: FormControl<string>,
  email: FormControl<string>,
  budget: FormControl<string>,
  projectDetails: FormControl<string>
}
