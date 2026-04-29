import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { BooksPage } from './books-page/books-page';
import { NewBookPage } from './new-book-page/new-book-page';
import { EditBookPage } from './edit-book-page/edit-book-page';

export const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BooksPage },
  { path: 'book/new', component: NewBookPage },
  { path: 'book/:id/edit', component: EditBookPage },
  { path: 'user', component: UserPage },
  { path: '**', component: UserPage },
];
