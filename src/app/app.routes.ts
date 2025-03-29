import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:page', component: PostComponent },
  { path: 'snippets', component: SnippetsComponent },
  { path: 'contact', component: ContactComponent }
];
