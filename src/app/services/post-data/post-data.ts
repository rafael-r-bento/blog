import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostData {
  private httpClient = inject(HttpClient);


  getPageContent(pageName: string): Observable<string | null> {
    return this.httpClient.get(`/assets/${pageName}.md`, { responseType: 'text' });
  }
}
