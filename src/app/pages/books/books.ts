import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksService, Book } from '../../services/books';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-books',
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
              <a class="nav-link active" routerLink="/books">
                <i class="fas fa-book me-1"></i>Böcker
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/quotes">
                <i class="fas fa-quote-left me-1"></i>Mina citat
              </a>
            </li>
          </ul>
          <div class="d-flex gap-2">
  <button class="btn btn-outline-light" (click)="toggleTheme()">
    <i class="fas" [class.fa-moon]="!isDark" [class.fa-sun]="isDark"></i>
  </button>
  <button class="btn btn-outline-light" (click)="logout()">
    <i class="fas fa-sign-out-alt me-2"></i>Logga ut
  </button>
</div>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-list me-2"></i>Alla böcker</h2>
        <button class="btn btn-primary" (click)="showAddForm = true">
          <i class="fas fa-plus me-2"></i>Lägg till ny bok
        </button>
      </div>

      <div *ngIf="showAddForm || editingBook" class="card mb-4 shadow">
        <div class="card-body">
          <h5>{{ editingBook ? 'Redigera bok' : 'Lägg till ny bok' }}</h5>
          <div class="mb-3">
            <label class="form-label">Titel</label>
            <input type="text" class="form-control" [(ngModel)]="formBook.title" placeholder="Bokens titel" />
          </div>
          <div class="mb-3">
            <label class="form-label">Författare</label>
            <input type="text" class="form-control" [(ngModel)]="formBook.author" placeholder="Författarens namn" />
          </div>
          <div class="mb-3">
            <label class="form-label">Publiceringsdatum</label>
            <input type="date" class="form-control" [(ngModel)]="formBook.publishedDate" />
          </div>
          <button class="btn btn-success me-2" (click)="saveBook()">
            <i class="fas fa-save me-2"></i>{{ editingBook ? 'Spara ändringar' : 'Lägg till' }}
          </button>
          <button class="btn btn-secondary" (click)="cancelForm()">
            <i class="fas fa-times me-2"></i>Avbryt
          </button>
        </div>
      </div>

      <div *ngIf="books.length === 0" class="alert alert-info">
        <i class="fas fa-info-circle me-2"></i>Inga böcker ännu. Lägg till din första bok!
      </div>

      <div class="row">
        <div class="col-md-4 mb-3" *ngFor="let book of books">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title"><i class="fas fa-book me-2 text-primary"></i>{{ book.title }}</h5>
              <p class="card-text"><i class="fas fa-user me-2"></i>{{ book.author }}</p>
              <p class="card-text"><i class="fas fa-calendar me-2"></i>{{ book.publishedDate | date:'yyyy-MM-dd' }}</p>
            </div>
            <div class="card-footer d-flex gap-2">
              <button class="btn btn-warning btn-sm" (click)="editBook(book)">
                <i class="fas fa-edit me-1"></i>Redigera
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteBook(book.id)">
                <i class="fas fa-trash me-1"></i>Radera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  showAddForm = false;
  editingBook: Book | null = null;
  formBook = { title: '', author: '', publishedDate: '' };

  constructor(private booksService: BooksService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService.getAll().subscribe({
      next: (books) => this.books = books,
      error: () => this.router.navigate(['/login'])
    });
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.formBook = {
      title: book.title,
      author: book.author,
      publishedDate: book.publishedDate.split('T')[0]
    };
  }

  saveBook() {
    if (this.editingBook) {
      this.booksService.update(this.editingBook.id, this.formBook).subscribe(() => {
        this.loadBooks();
        this.cancelForm();
      });
    } else {
      this.booksService.create(this.formBook).subscribe(() => {
        this.loadBooks();
        this.cancelForm();
      });
    }
  }

  deleteBook(id: number) {
    if (confirm('Är du säker på att du vill radera denna bok?')) {
      this.booksService.delete(id).subscribe(() => this.loadBooks());
    }
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingBook = null;
    this.formBook = { title: '', author: '', publishedDate: '' };
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light');
  }
}
