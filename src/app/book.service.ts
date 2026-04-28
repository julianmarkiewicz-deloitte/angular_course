import { inject, Injectable, signal } from '@angular/core';
import { BookI } from './book/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http = inject(HttpClient);

  books = signal<BookI[]>([]);

  getBooks() {
    this.http.get<BookI[]>('http://localhost:3000/books').subscribe((books) => {
      this.books.set(books);
    });
  }

  updateBook(id: string, pages: number) {
    this.http
      .patch<BookI>(`http://localhost:3000/books/${id}`, { pages })
      .subscribe((updatedBook) => {
        this.books.update((books) =>
          books.map((b) => (b.id === updatedBook.id ? { ...b, pages: updatedBook.pages } : b)),
        );
      });
  }
}
