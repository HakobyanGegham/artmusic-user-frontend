import { TestBed } from '@angular/core/testing';

import { UploadDecodeBase64Service } from './upload-decode-base64.service';

describe('UploadDecodeBase64Service', () => {
  let service: UploadDecodeBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadDecodeBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
