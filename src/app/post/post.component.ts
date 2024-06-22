import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',  
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  content = '';
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    const pageName = this.activateRoute.snapshot.paramMap.get('page');
    this.http.get(`../../assets/${pageName}.html`, { responseType: 'text'}).subscribe(data => { this.content = data });
    Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.margin = "0 auto" });
    Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.maxWidth = "1280px" });
    Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.width = "90%" });
    Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.flex = "1 0 auto" });

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width >= 601)
      Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.width = "85%" });
    else if (width >= 993)
      Array.from(document.getElementsByTagName("app-post") as HTMLCollectionOf<HTMLElement>).forEach(post => { post.style.width = "70%" });
  }
}
