import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book-page',
  imports: [ReactiveFormsModule],
  templateUrl: './new-book-page.html',
  styleUrls: ['./new-book-page.css'],
})
export class NewBookPage {
  bookService = inject(BookService);
  router = inject(Router);

  errorMessage = signal<string | null>(null);

  bookForm = new FormGroup({
    title: new FormControl(''),
    synopsis: new FormControl(''),
    pages: new FormControl(0),
    price: new FormControl(0),
    authors: new FormControl(''),
  });

  onSubmit() {
    const { title, synopsis, pages, price, authors } = this.bookForm.value;

    this.bookService
      .createBook({
        title: title ?? '',
        synopsis: synopsis ?? '',
        pages: pages ?? 0,
        price: price ?? 0,
        authors: authors ? authors.split(',').map((a) => a.trim()) : [],
      })
      .subscribe({
        next: () => {
          this.bookForm.reset();
          this.router.navigate(['/book']);
        },
        error: (err) => {
          this.errorMessage.set('Failed to create book. Please try again.');
          console.error('Error creating book:', err);
        },
      });
  }
}
