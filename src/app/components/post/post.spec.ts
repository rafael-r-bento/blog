import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { Post } from './post';
import { PostData } from 'src/app/services/post-data/post-data';

describe('Post', () => {
  let component: Post;
  let fixture: ComponentFixture<Post>;
  let postServiceSpy: jasmine.SpyObj<PostData>;

  const mockPost = '# title';

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostData', [
      'getPageContent'
    ]);

    postServiceSpy.getPageContent.and.returnValue(of(mockPost));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ 'page': 'install_arch_linux' })
            }
          }
        },
        { provide: PostData, useValue: postServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Post);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPage on ngOnInit', () => {
    const spy = spyOn(component, 'loadPage');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('Should call getPageContent and return page content', () => {
    component.loadPage();
    expect(component.content).toEqual(mockPost);
  });
});
