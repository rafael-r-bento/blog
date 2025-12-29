import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostsRowsData } from '../../services/posts-rows-data/posts-rows-data';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatDividerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [PostsRowsData]
})
export class Home {
  private postsService = inject(PostsRowsData);

  items = signal<Post[]>([]);

  constructor() {
    this.showPosts();
  }

  showPosts(): void {
    this.postsService.listPosts().subscribe((response: Post[]) => {
      this.items.set(response);
      this.items.set(this.items().sort((a: Post, b: Post) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
    });
  }
}
