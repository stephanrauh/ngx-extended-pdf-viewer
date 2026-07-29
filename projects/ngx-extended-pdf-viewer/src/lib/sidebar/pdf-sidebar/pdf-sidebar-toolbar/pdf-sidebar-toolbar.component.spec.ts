import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfSidebarToolbarComponent } from './pdf-sidebar-toolbar.component';

describe('PdfSidebarToolbarComponent', () => {
  let component: PdfSidebarToolbarComponent;
  let fixture: ComponentFixture<PdfSidebarToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfSidebarToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfSidebarToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(PdfSidebarToolbarComponent);
  });

  it('should default mobileFriendlyZoomScale to 1', () => {
    expect(component.mobileFriendlyZoomScale()).toBe(1);
    expect(component.height()).toBe('32px');
  });

  describe('mobileFriendlyZoomScale', () => {
    it('should scale the height of the toolbar', () => {
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 2);
      fixture.detectChanges();
      const toolbar = fixture.nativeElement.querySelector('#toolbarSidebar') as HTMLElement;
      expect(toolbar.style.height).toBe('64px');
    });

    it('should zoom every toolbar button', () => {
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 1.5);
      fixture.detectChanges();
      const buttons = fixture.nativeElement.querySelectorAll('button.toolbarButton') as NodeListOf<HTMLElement>;
      expect(buttons.length).toBeGreaterThan(0);
      // jsdom hands back `zoom` unstringified, so compare the printed value
      buttons.forEach((button) => expect(`${button.style.zoom}`).toBe('1.5'));
    });
  });
});
