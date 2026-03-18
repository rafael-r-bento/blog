import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostData } from './post-data';

describe('PostData', () => {
  let service: PostData;
  let httpMock: HttpTestingController;

  const mockPost = '# title';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostData]
    });
    service = TestBed.inject(PostData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPageContent should call GET with correct URL and return text', (done) => {
    service.getPageContent('test-page').subscribe((content) => {
      expect(content).toBe(mockPost);
      done();
    });

    const req = httpMock.expectOne('/assets/test-page.md');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');

    req.flush(mockPost);
  });
});
