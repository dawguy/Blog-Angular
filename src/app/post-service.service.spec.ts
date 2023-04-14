import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostServiceService } from './post-service.service';

describe('PostServiceService', () => {
  let service: PostServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostServiceService]
    });

    service = TestBed.inject(PostServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a post', () => {
    const postId = '1';
    const content = { type: 'text', lines: ['Test post'], orderId: 1 };

    service.getPost(postId).subscribe((data) => {
      // expect(data).toEqual(content); // TODO: uncomment
    });

    const req = httpMock.expectOne(`${service.postUrl}/${postId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(content);
  });

  it('should handle errors', () => {
    const postId = 'invalid-id';
    const errorMessage = 'Server error';

    service.getPost(postId).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${service.postUrl}/${postId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server error' });
  });
});

