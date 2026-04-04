import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Contact } from './components/contact/contact';
import { provideMarkdown } from 'ngx-markdown';
import { PostsRowsData } from './services/posts-rows-data/posts-rows-data';
import { PostData } from './services/post-data/post-data';

export const routes: Routes = [
  {
    path: '',
    providers: [PostsRowsData],
    component: Home,
  },
  {
    path: 'post/:page',
    providers: [provideMarkdown(), PostData],
    loadComponent: () => import('./components/post/post').then(m => m.Post),
  },
  { path: 'contact', component: Contact }
];
