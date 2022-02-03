import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import { setEntities, selectAll, withEntities } from '@ngneat/elf-entities';

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
}

const { state, config } = createState(
  withEntities<Post>({
    initialValue: [] as Post[],
  })
);

const store = new Store({ name: 'posts', state, config });

@Injectable({ providedIn: 'root' })
export class PostsRepository {
  // list of posts to display
  posts$ = store.pipe(selectAll());

  setPosts(posts: Post[]) {
    store.update(setEntities(posts));
  }
}
