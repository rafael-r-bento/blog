import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostsRowsData } from 'src/app/services/posts-rows-data/posts-rows-data';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatDividerModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private postsService = inject(PostsRowsData);

  items = signal<Post[]>([]);

  constructor() {
    this.showPosts();
  }

  showPosts(): void {
    this.postsService.listPosts().subscribe((response: Post[]) => {
      this.items.set(
        [...response].sort((a: Post, b: Post) =>
          (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
        )
      );
    });
  }
}
