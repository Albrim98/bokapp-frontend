import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'https://bokapp-backend-production.up.railway.app/api/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll() {
    return this.http.get<Book[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(book: Omit<Book, 'id'>) {
    return this.http.post<Book>(this.apiUrl, book, { headers: this.getHeaders() });
  }

  update(id: number, book: Omit<Book, 'id'>) {
    return this.http.put(`${this.apiUrl}/${id}`, book, { headers: this.getHeaders() });
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}