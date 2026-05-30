import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BooksComponent } from './pages/books/books';
import { QuotesComponent } from './pages/quotes/quotes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BooksComponent },
  { path: 'quotes', component: QuotesComponent },
];