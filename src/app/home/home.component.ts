import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Posts, Post, PostsRowsService } from '../posts-rows.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PostsRowsService]
})
export class HomeComponent {
  items: any;
  
  constructor(
    private postsService: PostsRowsService,
  ) {
    this.showPosts();
  }

  ngOnInit() {
  }

  showPosts(): void {
    this.postsService.listPosts().subscribe((response: Posts) => {
      this.items = response.items;
      this.items.sort((a: Post, b: Post) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    });
  }
}
