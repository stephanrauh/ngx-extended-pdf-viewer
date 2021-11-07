import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfZoomInComponent } from './pdf-zoom-in.component';

describe('PdfZoomInComponent', () => {
  let component: PdfZoomInComponent;
  let fixture: ComponentFixture<PdfZoomInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PdfZoomInComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfZoomInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
