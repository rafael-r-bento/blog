import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPageContent(pageName: string): Observable<string | null> {
    return this.httpClient.get(`/assets/${pageName}.html`, { responseType: 'text' });
  }
}
