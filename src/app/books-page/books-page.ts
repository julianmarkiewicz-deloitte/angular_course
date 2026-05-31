import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookService } from '../book.service';
import { NotificationService } from '../notification.service';
import { Book } from '../book/book';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-books-page',
  imports: [Book, RouterLink],
  templateUrl: './books-page.html',
  styleUrls: ['./books-page.css'],
})
export class BooksPage implements OnInit, AfterViewInit {
  booksService = inject(BookService);
  notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = signal('');
  private search$ = new BehaviorSubject<string>('');

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
      next: (books) => this.notificationService.notify(`${books.length} books loaded!`),
      error: (err) => this.notificationService.notify('Failed to load books'),
    });

    this.search$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => this.searchTerm.set(term));
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search$.next(input.value);
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();

    // Alternative: fromEvent approach (no BehaviorSubject needed, but requires @ViewChild)
    // fromEvent(this.searchInput.nativeElement, 'input')
    //   .pipe(
    //     debounceTime(300),
    //     map((event) => (event.target as HTMLInputElement).value),
    //     takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe((term) => this.searchTerm.set(term));
  }

  handlePageUpdate(event: { id: string; pages: number }) {
    this.booksService.updateBook(event.id, { pages: event.pages }).subscribe({
      next: (updatedBook) => console.log('Book updated successfully:', updatedBook),
      error: (err) => console.error('Error updating book:', err),
    });
  }
}
