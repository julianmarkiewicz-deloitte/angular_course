import { Component, computed, input, output, signal } from '@angular/core';
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

  buttonDisabled = signal(false);

  updateBookPages = output<{ id: string; pages: number }>();

  handleClick() {
    const updatedPages = this.book().pages + 100;
    this.updateBookPages.emit({ id: this.book().id, pages: updatedPages });
  }
}
