import { Component, OnInit } from '@angular/core';
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
export class PostComponent implements OnInit {
  pageName: string | null = null;
  content: string | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {

  }

  ngOnInit() {
    this.pageName = this.activatedRoute.snapshot.paramMap.get('page');
    if (this.pageName) {
      this.postService.getPageContent(this.pageName).subscribe(
        data => { this.content = data }
      );
    }
  }
}
