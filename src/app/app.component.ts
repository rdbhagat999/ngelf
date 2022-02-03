import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GoogleBooksService } from './books.service';
import { PostsService } from './posts.service';
import { BooksRepository } from './state/books.repository';
import { PostsRepository } from './state/posts.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  booksSubscription!: Subscription;
  postsSubscription!: Subscription;

  constructor(
    private booksService: GoogleBooksService,
    private postsService: PostsService,
    public booksRepo: BooksRepository,
    public postsRepo: PostsRepository
  ) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.getBooks().subscribe();
    this.postsSubscription = this.postsService.getPosts().subscribe();
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }
}
