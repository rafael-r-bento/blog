import { TestBed } from '@angular/core/testing';

import { PostsRowsService } from './posts-rows.service';

describe('PostsRowsService', () => {
  let service: PostsRowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsRowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
