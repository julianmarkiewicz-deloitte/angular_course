import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book-page',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book-page.html',
  styleUrls: ['./edit-book-page.css'],
})
export class EditBookPage implements OnInit {
  bookService = inject(BookService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  errorMessage = signal<string | null>(null);
  bookId = '';

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

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    const book = this.bookService.books().find((b) => b.id === this.bookId);
    if (!book) return;

    this.bookForm.patchValue({
      title: book.title,
      synopsis: book.synopsis,
      pages: book.pages,
      price: book.price,
      authors: book.authors.join(', '),
    });
  }

  onSubmit() {
    const { title, synopsis, pages, price, authors } = this.bookForm.value;

    this.bookService
      .updateBook(this.bookId, {
        title: title ?? '',
        synopsis: synopsis ?? '',
        pages: pages ?? 0,
        price: price ?? 0,
        authors: authors ? authors.split(',').map((a) => a.trim()) : [],
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/book']);
        },
        error: (err) => {
          this.errorMessage.set('Failed to update book. Please try again.');
          console.error('Error updating book:', err);
        },
      });
  }
}
