import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PostData } from './post-data';

describe('PostData', () => {
  let service: PostData;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PostData,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(PostData);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
