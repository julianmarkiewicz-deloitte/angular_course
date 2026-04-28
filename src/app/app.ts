import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './book.service';
import { BookI } from './book/book';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  booksService = inject(BookService);

  books = signal<BookI[]>([]);

  constructor() {
    this.booksService.getBooks();
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, event.pages);
  }
}
