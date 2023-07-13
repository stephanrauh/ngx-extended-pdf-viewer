/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PdfShyButtonService } from './pdf-shy-button-service';

describe('Service: PdfShyButtonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfShyButtonService],
    });
  });

  it('should ...', inject([PdfShyButtonService], (service: PdfShyButtonService) => {
    expect(service).toBeTruthy();
  }));
});
