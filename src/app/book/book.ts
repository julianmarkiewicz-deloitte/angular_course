import {
  AfterContentInit,
  Component,
  computed,
  ContentChild,
  ElementRef,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './book.html',
  styleUrls: ['./book.css'],
})
export class Book implements OnChanges, AfterContentInit {
  book = input.required<BookI>();

  @ContentChild('bookBadge') bookBadge?: ElementRef<HTMLElement>;

  hasCustomBadge = signal(false);

  ngAfterContentInit() {
    // Called after projected content (<ng-content>) has been initialized
    if (this.bookBadge) {
      this.hasCustomBadge.set(true);
      console.log(
        'Custom badge projected into book card:',
        this.bookBadge.nativeElement.textContent,
      );
    }
  }

  longBook = computed(() => this.book().pages > 1000);

  buttonDisabled = signal(false);

  updateBookPages = output<{ id: string; pages: number }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['book']) {
      const prev = changes['book'].previousValue;
      const curr = changes['book'].currentValue;

      console.log(
        `Book changed from "${prev?.title}" (${prev?.pages}p) to "${curr?.title}" (${curr?.pages}p)`,
      );

      if (curr.pages > 2000) this.buttonDisabled.set(true);
    }
  }

  handleClick() {
    const updatedPages = this.book().pages + 100;
    this.updateBookPages.emit({ id: this.book().id, pages: updatedPages });
  }
}
