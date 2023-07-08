import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapfdingbatsComponent } from './zapfdingbats.component';

describe('ZapfdingbatsComponent', () => {
  let component: ZapfdingbatsComponent;
  let fixture: ComponentFixture<ZapfdingbatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZapfdingbatsComponent]
    });
    fixture = TestBed.createComponent(ZapfdingbatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
