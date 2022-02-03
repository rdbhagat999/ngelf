import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../state/books.repository';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent implements OnInit {
  @Input()
  books!: Array<Book> | null;

  @Output() remove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
