import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-page',
  imports: [Book, RouterLink],
  templateUrl: './books-page.html',
  styleUrls: ['./books-page.css'],
})
export class BooksPage implements OnInit, AfterViewInit {
  booksService = inject(BookService);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = signal('');

  books = computed(() => this.booksService.books());
  filteredBooks = computed(() =>
    this.books().filter(
      (b) =>
        b.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        b.authors.some((a) => a.toLowerCase().includes(this.searchTerm().toLowerCase())),
    ),
  );
  ngOnInit() {
    this.booksService.getBooks().subscribe({
      next: (books) => console.log('Books fetched successfully:', books),
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  ngAfterViewInit() {
    // view is fully rendered — DOM elements are accessible via @ViewChild
    this.searchInput.nativeElement.focus();
    console.log('Search input focused after view init');
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, { pages: event.pages }).subscribe({
      next: (updatedBook) => console.log('Book updated successfully:', updatedBook),
      error: (err) => console.error('Error updating book:', err),
    });
  }
}
