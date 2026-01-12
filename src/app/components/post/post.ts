import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { PostData } from 'src/app/services/post-data/post-data';

@Component({
  selector: 'app-post',
  imports: [MarkdownComponent],
  templateUrl: './post.html',
  styleUrl: './post.css',
  providers: [PostData]
})
export class Post implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private postService = inject(PostData);

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
