import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsRowsData, Post } from './posts-rows-data';

describe('PostsRowsData', () => {
  let service: PostsRowsData;
  let httpMock: HttpTestingController;

  const mockPosts = [
    {
      "title": "Parabola GNU/Linux-libre (x86_64) Installation",
      "page": "install_parabola",
      "imagePath": "assets/install_parabola3.png"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux",
      "imagePath": "assets/install_archlinux3.png"
    },
    {
      "title": "Arch Linux Installation",
      "page": "install_arch_linux",
      "imagePath": "assets/favicon.ico"
    },
    {
      "title": "Build a Package from APT repository and Create a Patch",
      "page": "build_from_source_with_apt",
      "imagePath": "assets/pluma_installed.png"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsRowsData]
    });
    service = TestBed.inject(PostsRowsData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listPosts should call expected endpoint', () => {
    const mockResponse: Post[] = mockPosts;
    service.listPosts().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/data_posts.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
