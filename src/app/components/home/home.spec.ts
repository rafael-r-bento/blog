import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PostsRowsData } from 'src/app/services/posts-rows-data/posts-rows-data';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let postsServiceSpy: jasmine.SpyObj<PostsRowsData>;
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

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsRowsData', [
      'listPosts'
    ]);

    postsServiceSpy.listPosts.and.returnValue(of(mockPosts));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideAnimations(),
        { provide: PostsRowsData, useValue: postsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listPosts and return list of posts', () => {
    component.showPosts();
    const sortedPosts = [...mockPosts].sort((a, b) =>
      (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
    );
    expect(component.items()).toEqual(sortedPosts);
  });
});
