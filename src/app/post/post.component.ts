import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  imports: [MarkdownComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [PostService]
})
export class PostComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private postService = inject(PostService);

  pageName: string | null = null;
  content: string | null = null;

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.pageName = this.activatedRoute.snapshot.paramMap.get('page');
    console.log(this.pageName);
    if (this.pageName) {
      this.postService.getPageContent(this.pageName).subscribe(
        data => { this.content = data }
      );
    }
  }
}
