import { Component, computed, input, signal } from '@angular/core';
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
  book = input.required<BookI>();

  longBook = computed(() => this.book().pages > 1000);

  buttonDisabled = signal(true);

  handleClick() {
    // this.book.update((book) => ({
    //   ...book,
    //   pages: book.pages + 100,
    // }));
  }
}
