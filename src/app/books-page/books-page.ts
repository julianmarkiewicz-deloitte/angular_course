import { Component, inject, signal } from '@angular/core';
import { BookService } from '../book.service';
import { Book, BookI } from '../book/book';

@Component({
  selector: 'app-books-page',
  imports: [Book],
  templateUrl: './books-page.html',
  styleUrls: ['./books-page.css'],
})
export class BooksPage {
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
