import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  content = '';
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    const pageName = this.activateRoute.snapshot.paramMap.get('page');
    this.http.get(`/assets/${pageName}.html`, { responseType: 'text'}).subscribe(data => { this.content = data });
  }
}
