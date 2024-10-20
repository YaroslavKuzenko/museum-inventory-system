import {Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {ExhibitTableComponent} from "../exhibit-table/exhibit-table.component";
import {LocationTableComponent} from "../location-table/location-table.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TabViewModule,
    ExhibitTableComponent,
    LocationTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.userRole = user.role_id;
      },
      error: (err) => {
        console.error('Failed to get user data', err);
      }
    });
  }
}
