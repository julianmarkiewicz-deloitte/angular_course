import { Component, inject, signal } from '@angular/core';
import { Book, BookI } from './book/book';
import { BookService } from './book.service';
@Component({
  selector: 'app-root',
  imports: [Book],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  booksService = inject(BookService);

  books = signal<BookI[]>([]);

  constructor() {
    this.books.set(this.booksService.getBooks());
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.books.update((books) =>
      books.map((b) => (b.id === event.id ? { ...b, pages: event.pages } : b)),
    );
  }
}
