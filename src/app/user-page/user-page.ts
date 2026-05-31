import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, retry } from 'rxjs';
import { BookService } from '../book.service';
import { Profile, ProfileService } from '../profile.service';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage implements OnInit {
  bookService = inject(BookService);
  profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  profile = signal<Profile | null>(null);
  totalBooks = signal(0);

  ngOnInit() {
    // combineLatest emits if any source emits (after all have emitted at least once!)
    // useful when sources can emit multiple times and you always want the latest combination
    combineLatest({
      books: this.bookService.getBooks(),
      profile: this.profileService.getProfile(),
    })
      .pipe(retry(2), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ books, profile }) => {
        this.profile.set(profile);
        this.totalBooks.set(books.length);
      });

    // forkJoin waits for ALL sources to COMPLETE, then emits once
    // useful when you only need the final value of each source (e.g., parallel HTTP calls)
    // forkJoin({
    //   books: this.bookService.getBooks(),
    //   profile: this.profileService.getProfile(),
    // })
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(({ books, profile }) => {
    //     this.profile.set(profile);
    //     this.totalBooks.set(books.length);
    //   });
  }
}
