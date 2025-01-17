import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Posts {
  items: Post[];
}

export interface Post {
  title: string;
  page: string;
  category: string;
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

  listPosts(): Observable<Posts> {
    return this.http.get<Posts>('assets/data_posts.json');
  }
}
