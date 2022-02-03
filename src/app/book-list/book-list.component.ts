import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../state/books.repository';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input()
  books!: Array<Book> | null;

  @Output() add = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
