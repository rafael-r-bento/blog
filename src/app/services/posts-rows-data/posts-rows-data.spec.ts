import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PostsRowsData } from './posts-rows-data';

describe('PostsRowsData', () => {
  let service: PostsRowsData;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PostsRowsData,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(PostsRowsData);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
