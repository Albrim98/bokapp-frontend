import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuotesService, Quote } from '../../services/quotes';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/books">
          <i class="fas fa-book me-2"></i>Bokappen
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/books">
                <i class="fas fa-book me-1"></i>Böcker
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" routerLink="/quotes">
                <i class="fas fa-quote-left me-1"></i>Mina citat
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-quote-left me-2"></i>Mina citat</h2>
        <button class="btn btn-primary" (click)="showAddForm = true">
          <i class="fas fa-plus me-2"></i>Lägg till citat
        </button>
      </div>

      <div *ngIf="showAddForm || editingQuote" class="card mb-4 shadow">
        <div class="card-body">
          <h5>{{ editingQuote ? 'Redigera citat' : 'Lägg till nytt citat' }}</h5>
          <div class="mb-3">
            <label class="form-label">Citat</label>
            <textarea class="form-control" [(ngModel)]="formQuote.text" rows="3" placeholder="Skriv citatet här..."></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Författare</label>
            <input type="text" class="form-control" [(ngModel)]="formQuote.author" placeholder="Vem sa det?" />
          </div>
          <button class="btn btn-success me-2" (click)="saveQuote()">
            <i class="fas fa-save me-2"></i>{{ editingQuote ? 'Spara ändringar' : 'Lägg till' }}
          </button>
          <button class="btn btn-secondary" (click)="cancelForm()">
            <i class="fas fa-times me-2"></i>Avbryt
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3" *ngFor="let quote of quotes">
          <div class="card shadow-sm h-100 border-start border-primary border-4">
            <div class="card-body">
              <p class="card-text fst-italic fs-5">
                <i class="fas fa-quote-left text-primary me-2"></i>
                {{ quote.text }}
                <i class="fas fa-quote-right text-primary ms-2"></i>
              </p>
              <p class="card-text text-end fw-bold">— {{ quote.author }}</p>
            </div>
            <div class="card-footer d-flex gap-2">
              <button class="btn btn-warning btn-sm" (click)="editQuote(quote)">
                <i class="fas fa-edit me-1"></i>Redigera
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteQuote(quote.id)">
                <i class="fas fa-trash me-1"></i>Radera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];
  showAddForm = false;
  editingQuote: Quote | null = null;
  formQuote = { text: '', author: '' };

  constructor(private quotesService: QuotesService) {}

  ngOnInit() {
    this.quotes = this.quotesService.getAll();
  }

  editQuote(quote: Quote) {
    this.editingQuote = quote;
    this.formQuote = { text: quote.text, author: quote.author };
  }

  saveQuote() {
    if (this.editingQuote) {
      this.quotesService.update(this.editingQuote.id, this.formQuote);
    } else {
      this.quotesService.add(this.formQuote);
    }
    this.quotes = this.quotesService.getAll();
    this.cancelForm();
  }

  deleteQuote(id: number) {
    if (confirm('Är du säker på att du vill radera detta citat?')) {
      this.quotesService.delete(id);
      this.quotes = this.quotesService.getAll();
    }
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingQuote = null;
    this.formQuote = { text: '', author: '' };
  }
}