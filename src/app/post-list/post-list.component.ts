import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../state/posts.repository';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input()
  posts!: Array<Post> | null;

  constructor() {}

  ngOnInit(): void {}
}
