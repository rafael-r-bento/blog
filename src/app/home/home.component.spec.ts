import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Posts, PostsRowsService } from '../posts-rows.service';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: PostsRowsService;
  let posts: Posts = { items: [
    {
      "title": "Parabola GNU/Linux-libre (x86_64) Installation",
      "page": "install_parabola",
      "category": "Operating Systems"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux",
      "category": "Operating Systems"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux",
      "category": "Operating Systems"
    },
    {
      "title": "Build a Package from APT repository and Create a Patch",
      "page": "build_from_source_with_apt",
      "category": "Software"
    }
  ] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideAnimations(), PostsRowsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PostsRowsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listPosts and return list of posts', () => {
    spyOn(service, 'listPosts').and.returnValue(of(posts));
    component.showPosts();
    expect(component.items).toEqual(posts.items);
  });
});
