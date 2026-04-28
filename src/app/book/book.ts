import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.html',
  styleUrls: ['./book.css'],
})
export class Book {
  book = signal({
    title: 'The Lord of the Rings',
    synopsis: 'An epic fantasy novel by J.R.R. Tolkien.',
    pages: 1178,
  });

  buttonDisabled = signal(true);
}
