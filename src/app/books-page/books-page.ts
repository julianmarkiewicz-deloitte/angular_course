import { Component, computed, inject, signal } from '@angular/core';
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

  searchTerm = signal('');

  books = computed(() => this.booksService.books());
  filteredBooks = computed(() =>
    this.books().filter(
      (b) =>
        b.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        b.authors.some((a) => a.toLowerCase().includes(this.searchTerm().toLowerCase())),
    ),
  );

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  constructor() {
    this.booksService.getBooks().subscribe({
      next: (books) => console.log('Books fetched successfully:', books),
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, { pages: event.pages }).subscribe({
      next: (updatedBook) => console.log('Book updated successfully:', updatedBook),
      error: (err) => console.error('Error updating book:', err),
    });
  }
}
