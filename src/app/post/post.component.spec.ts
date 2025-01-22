import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PostComponent } from './post.component';
import { PostService } from './post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ 'page': 'install_arch_linux' })
            }
          }
        },
        PostService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PostService);
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
