import { TestBed } from '@angular/core/testing';

import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';

describe('NgxExtendedPdfViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxExtendedPdfViewerService = TestBed.get(NgxExtendedPdfViewerService);
    expect(service).toBeTruthy();
  });
});
