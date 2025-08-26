import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  title: string;
  page: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsRowsService {
  private http = inject(HttpClient);


  listPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('assets/data_posts.json');
  }
}
