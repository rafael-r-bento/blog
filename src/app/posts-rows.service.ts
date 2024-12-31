import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Post {
  title: string,
  page: string,
  category: string,
}

@Injectable({
  providedIn: 'root'
})
export class PostsRowsService {
  constructor(
    private http: HttpClient
  ) { }

  getRows() {
    let posts: NodeListOf<Element> = document.querySelectorAll(".list-item");
    return posts;
  }

  listPosts() {
    return this.http.get('assets/data_posts.json');
  }
}
