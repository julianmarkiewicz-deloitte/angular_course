import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[^0-9]*$/),
    ]),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(10)]),
    pages: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.max(999)]),
    authors: new FormControl('', [Validators.required]),
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
