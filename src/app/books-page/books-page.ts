import { Component, computed, inject } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book/book';

@Component({
  selector: 'app-books-page',
  imports: [Book],
  templateUrl: './books-page.html',
  styleUrls: ['./books-page.css'],
})
export class BooksPage {
  booksService = inject(BookService);

  books = computed(() => this.booksService.books());

  constructor() {
    this.booksService.getBooks();
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, event.pages);
  }
}
