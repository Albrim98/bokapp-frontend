import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
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
              <h5 class="card-title text-center mb-4">Logga in</h5>

              @if (errorMessage) {
                <div class="alert alert-danger">{{ errorMessage }}</div>
              }

              <div class="mb-3">
                <label class="form-label">Användarnamn</label>
                <input type="text" class="form-control" [(ngModel)]="username" placeholder="Ange användarnamn" />
              </div>

              <div class="mb-3">
                <label class="form-label">Lösenord</label>
                <input type="password" class="form-control" [(ngModel)]="password" placeholder="Ange lösenord" />
              </div>

              <button class="btn btn-primary w-100 mb-3" (click)="login()">
                <i class="fas fa-sign-in-alt me-2"></i>Logga in
              </button>

              <p class="text-center">
                Inget konto? <a routerLink="/register">Registrera dig</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/books']);
      },
      error: () => {
        this.errorMessage = 'Fel användarnamn eller lösenord';
      }
    });
  }
}