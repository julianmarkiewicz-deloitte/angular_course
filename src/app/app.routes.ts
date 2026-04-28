import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { BooksPage } from './books-page/books-page';

export const routes: Routes = [
  { path: '', component: BooksPage },
  { path: 'user', component: UserPage },
  { path: '**', component: UserPage },
];
