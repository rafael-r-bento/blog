import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { Post } from './post';
import { PostData } from '../../services/post-data/post-data';

describe('Post', () => {
  let component: Post;
  let fixture: ComponentFixture<Post>;
  let service: PostData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Post, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ 'page': 'install_arch_linux' })
            }
          }
        },
        PostData
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Post);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PostData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getPageContent and return page content', () => {
    spyOn(service, 'getPageContent').and.returnValue(of('<h1>title</h1>'));
    component.loadPage();
    expect(component.content).toEqual('<h1>title</h1>');
  });
});
