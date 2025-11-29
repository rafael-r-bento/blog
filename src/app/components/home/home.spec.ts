import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Post, PostsRowsData } from '../../services/posts-rows-data/posts-rows-data';

import { Home } from './home';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let service: PostsRowsData;
  const posts: Post[] = [
    {
      "title": "Parabola GNU/Linux-libre (x86_64) Installation",
      "page": "install_parabola"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux"
    },
    {
      "title": "Build a Package from APT repository and Create a Patch",
      "page": "build_from_source_with_apt"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideAnimations(), PostsRowsData]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PostsRowsData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listPosts and return list of posts', () => {
    spyOn(service, 'listPosts').and.returnValue(of(posts));
    component.showPosts();
    expect(component.items).toEqual(posts);
  });
});
