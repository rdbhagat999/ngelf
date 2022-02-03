import { Injectable } from '@angular/core';
import { createState, propsArrayFactory, Store } from '@ngneat/elf';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  selectEntities,
  setEntities,
  selectAll,
  withEntities,
} from '@ngneat/elf-entities';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}

const {
  withCollectedBookIds,
  selectCollectedBookIds,
  addCollectedBookIds,
  removeCollectedBookIds,
  inCollectedBookIds,
} = propsArrayFactory('collectedBookIds', { initialValue: [] as string[] });

const { state, config } = createState(
  withEntities<Book>({
    initialValue: [] as Book[],
  }),
  withCollectedBookIds()
);

const store = new Store({ name: 'books', state, config });

@Injectable({ providedIn: 'root' })
export class BooksRepository {
  // list of books to display
  books$ = store.pipe(selectAll());

  // list of books in users's collection
  ownBooks$ = store.pipe(selectCollectedBookIds()).pipe(
    withLatestFrom(store.pipe(selectEntities())),
    map(([ids, books]) => {
      console.log('ids', ids);
      console.log('books', books);
      return ids.map((id) => books[id]);
    })
  );

  setBooks(books: Book[]) {
    store.update(setEntities(books));
  }

  removeFromCollection(bookId: string) {
    if (store.query(inCollectedBookIds(bookId))) {
      store.update(removeCollectedBookIds(bookId));
    }
  }

  addToCollection(bookId: string) {
    if (!store.query(inCollectedBookIds(bookId))) {
      store.update(addCollectedBookIds(bookId));
    }
  }
}
