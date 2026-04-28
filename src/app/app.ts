import { Component, signal } from '@angular/core';
import { Book, BookI } from './book/book';

@Component({
  selector: 'app-root',
  imports: [Book],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  book = signal<BookI>({
    id: '1',
    title: 'The Lord of the Rings',
    synopsis: 'An epic fantasy novel by J.R.R. Tolkien.',
    pages: 1178,
    price: 29.99,
    authors: ['J.R.R. Tolkien', 'Another Author'],
  });
}
