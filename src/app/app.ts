import { Component } from '@angular/core';
import { Book } from './book/book';

@Component({
  selector: 'app-root',
  imports: [Book],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
