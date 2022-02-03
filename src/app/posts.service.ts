import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Post, PostsRepository } from './state/posts.repository';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient, private postsRepo: PostsRepository) {}

  getPosts() {
    return this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts?userId=1')
      .pipe(
        tap((data) => {
          console.log('getPosts', data);
          this.postsRepo.setPosts(data || []);
        })
      );
  }
}
