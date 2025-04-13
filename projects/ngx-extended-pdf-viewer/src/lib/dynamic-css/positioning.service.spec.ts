/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PositioningService } from './positioning.service';

describe('Service: Positioning', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PositioningService]
    });
  });

  it('should ...', inject([PositioningService], (service: PositioningService) => {
    expect(service).toBeTruthy();
  }));
});
