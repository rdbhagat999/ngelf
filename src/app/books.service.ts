import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Book, BooksRepository } from './state/books.repository';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient, private booksRepo: BooksRepository) {}

  getBooks() {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=totoro'
      )
      .pipe(
        tap((data) => {
          console.log('getBooks', data?.items);
          this.booksRepo.setBooks(data.items || []);
        })
      );
  }
}
