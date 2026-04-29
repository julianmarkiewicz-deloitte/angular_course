import { Component, computed, inject } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-page',
  imports: [Book, RouterLink],
  templateUrl: './books-page.html',
  styleUrls: ['./books-page.css'],
})
export class BooksPage {
  booksService = inject(BookService);

  books = computed(() => this.booksService.books());

  constructor() {
    this.booksService.getBooks().subscribe({
      next: (books) => console.log('Books fetched successfully:', books),
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, event.pages);
  }
}
