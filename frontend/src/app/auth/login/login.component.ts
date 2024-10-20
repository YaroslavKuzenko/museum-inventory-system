import { Component } from '@angular/core';
import {ContainerComponent} from "../../components/shared/container/container.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ContainerComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
