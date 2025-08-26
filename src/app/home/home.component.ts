import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostsRowsService } from '../posts-rows.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PostsRowsService]
})
export class HomeComponent {
  private postsService = inject(PostsRowsService);

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
