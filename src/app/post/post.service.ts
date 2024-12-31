import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPageContent(pageName: string) {
    return this.http.get(`/assets/${pageName}.html`, { responseType: 'text'});
  }
}
