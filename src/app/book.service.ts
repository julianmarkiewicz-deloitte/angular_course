import { inject, Injectable, signal } from '@angular/core';
import { BookI } from './book/book';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http = inject(HttpClient);

  books = signal<BookI[]>([]);

  getBooks() {
    return this.http.get<BookI[]>('http://localhost:3000/books').pipe(
      tap((books) => this.books.set(books)),
      catchError((err) => {
        console.error('Error fetching books:', err);
        throw err;
      }),
    );
  }

  createBook(book: Omit<BookI, 'id'>) {
    return this.http.post<BookI>('http://localhost:3000/books', book).pipe(
      tap((newBook) => this.books.update((books) => [...books, newBook])),
      catchError((err) => {
        console.error('Error creating book:', err);
        throw err;
      }),
    );
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
