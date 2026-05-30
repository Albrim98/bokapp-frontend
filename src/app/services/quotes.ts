import { Injectable } from '@angular/core';

export interface Quote {
  id: number;
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotes: Quote[] = [
    { id: 1, text: 'Det är inte om du faller, utan om du reser dig.', author: 'Nelson Mandela' },
    { id: 2, text: 'Den som ger upp frihet för säkerhet förtjänar ingendera.', author: 'Benjamin Franklin' },
    { id: 3, text: 'Livet är vad som händer medan du planerar annat.', author: 'John Lennon' },
    { id: 4, text: 'Du missar 100% av skotten du inte tar.', author: 'Wayne Gretzky' },
    { id: 5, text: 'Var den förändring du vill se i världen.', author: 'Mahatma Gandhi' },
  ];

  getAll() {
    return this.quotes;
  }

  add(quote: Omit<Quote, 'id'>) {
    const newQuote = {
      ...quote,
      id: this.quotes.length > 0 ? Math.max(...this.quotes.map(q => q.id)) + 1 : 1
    };
    this.quotes.push(newQuote);
  }

  update(id: number, updated: Omit<Quote, 'id'>) {
    const quote = this.quotes.find(q => q.id === id);
    if (quote) {
      quote.text = updated.text;
      quote.author = updated.author;
    }
  }

  delete(id: number) {
    this.quotes = this.quotes.filter(q => q.id !== id);
  }
}