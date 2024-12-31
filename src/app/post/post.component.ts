import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [PostService]
})
export class PostComponent {
  content: string = '';
  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService
  ) {
    const pageName = this.activateRoute.snapshot.paramMap.get('page') || "";
    this.postService.getPageContent(pageName).subscribe(data => { this.content = data });
  }
}
