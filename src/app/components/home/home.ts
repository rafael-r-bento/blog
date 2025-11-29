import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostsRowsData } from '../../services/posts-rows-data/posts-rows-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [PostsRowsData]
})
export class Home {
  private postsService = inject(PostsRowsData);

  items: Post[] = [];
  
  constructor() {
    this.showPosts();
  }

  showPosts(): void {
    this.postsService.listPosts().subscribe((response: Post[]) => {
      this.items = response;
      this.items.sort((a: Post, b: Post) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    });
  }
}
