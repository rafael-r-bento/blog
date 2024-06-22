import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsRowsService {
  constructor(
  ) { }

  getRows() {
    let posts: NodeListOf<Element> = document.querySelectorAll(".posts-line");
    return posts;
  }
}
