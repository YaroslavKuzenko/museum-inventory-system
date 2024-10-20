import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {ContainerComponent} from "../../components/shared/container/container.component";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ContainerComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('User registered successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
