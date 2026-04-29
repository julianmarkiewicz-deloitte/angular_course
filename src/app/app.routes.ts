import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { BooksPage } from './books-page/books-page';
import { NewBookPage } from './new-book-page/new-book-page';

export const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BooksPage },
  { path: 'book/new', component: NewBookPage },
  { path: 'user', component: UserPage },
  { path: '**', component: UserPage },
];
