import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card shadow">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">
                <i class="fas fa-book me-2"></i>Bokappen
              </h2>
              <h5 class="card-title text-center mb-4">Registrera dig</h5>

              <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <div *ngIf="successMessage" class="alert alert-success">{{ successMessage }}</div>

              <div class="mb-3">
                <label class="form-label">Användarnamn</label>
                <input type="text" class="form-control" [(ngModel)]="username" placeholder="Välj användarnamn" />
              </div>

              <div class="mb-3">
                <label class="form-label">Lösenord</label>
                <input type="password" class="form-control" [(ngModel)]="password" placeholder="Välj lösenord" />
              </div>

              <button class="btn btn-success w-100 mb-3" (click)="register()">
                <i class="fas fa-user-plus me-2"></i>Registrera
              </button>

              <p class="text-center">
                Har du redan ett konto? <a routerLink="/login">Logga in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Konto skapat! Omdirigerar till inloggning...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMessage = 'Användarnamnet finns redan';
      }
    });
  }
}