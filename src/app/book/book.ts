import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface BookI {
  id: string;
  title: string;
  synopsis: string;
  pages: number;
  price: number;
  authors: string[];
}

@Component({
  selector: 'app-book',
  imports: [CurrencyPipe],
  templateUrl: './book.html',
  styleUrls: ['./book.css'],
})
export class Book {
  book = signal<BookI>({
    id: '1',
    title: 'The Lord of the Rings',
    synopsis: 'An epic fantasy novel by J.R.R. Tolkien.',
    pages: 1178,
    price: 29.99,
    authors: ['J.R.R. Tolkien', 'Another Author'],
  });

  longBook = computed(() => this.book().pages > 1000);

  buttonDisabled = signal(false);

  handleClick() {
    this.book.update((book) => ({
      ...book,
      pages: book.pages + 100,
    }));
  }
}
