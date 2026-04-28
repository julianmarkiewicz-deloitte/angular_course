import { Injectable } from '@angular/core';
import { BookI } from './book/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  getBooks(): BookI[] {
    return [
      {
        id: '1',
        title: 'The Lord of the Rings',
        synopsis: 'An epic fantasy novel by J.R.R. Tolkien.',
        pages: 1178,
        price: 29.99,
        authors: ['J.R.R. Tolkien', 'Another Author'],
      },
      {
        id: '2',
        title: 'Angular Deep Dive',
        synopsis: 'A deep dive into Angular core concepts',
        pages: 500,
        price: 39.99,
        authors: ['John Doe', 'Jane Smith'],
      },
    ];
  }
}
