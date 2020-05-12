import { NgZone } from '@angular/core';

export class PinchOnMobileSupport {
  private viewer: any;
  private container: HTMLDivElement;
  private startX = 0;
  private startY = 0;
  private initialPinchDistance = 0;
  private pinchScale = 1;

  constructor(private _zone: NgZone) {
    if (this.isMobile()) {
      this.initializePinchZoom();
    }
  }

  private isMobile() {
    return 'ontouchstart' in document.documentElement;
  }

  private onViewerTouchStart(event: TouchEvent): void {
    this.initialPinchDistance = 0;
    if (event.touches.length === 2) {
      const rect = this.container.getBoundingClientRect();
      // + this.container.scrollTop
      if (event.touches[0].pageX >= rect.left && event.touches[0].pageX <= rect.right) {
        if (event.touches[0].pageY >= rect.top  /* && event.touches[0].pageY <= rect.bottom */) {
          if (event.touches[1].pageX >= rect.left && event.touches[1].pageX <= rect.right) {
            if (event.touches[1].pageY >= rect.top /* && event.touches[1].pageY <= rect.bottom  */) {
              this.startX = (event.touches[0].pageX + event.touches[1].pageX) / 2;
              this.startY = (event.touches[0].pageY + event.touches[1].pageY) / 2;
              this.initialPinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }
  }

  private onViewerTouchMove(event: TouchEvent): void {
    if (this.initialPinchDistance <= 0 || event.touches.length !== 2) {
      return;
    }
    if (this.pinchScale !== 1) {
      event.preventDefault();
    }
    const pinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
    const originX = this.startX + this.container.scrollLeft;
    const originY = this.startY + this.container.scrollTop;
    this.pinchScale = pinchDistance / this.initialPinchDistance;
    this.viewer.style.transform = `scale(${this.pinchScale})`;
    this.viewer.style.transformOrigin = `${originX}px ${originY}px`;
    event.preventDefault();
    event.stopPropagation();
  }

  private onViewerTouchEnd(event: TouchEvent): void {
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;
    if (this.initialPinchDistance <= 0) {
      return;
    }
    this.viewer.style.transform = `none`;
    this.viewer.style.transformOrigin = `unset`;
    PDFViewerApplication.pdfViewer.currentScale *= this.pinchScale;
    const rect = this.container.getBoundingClientRect();
    const dx = this.startX - rect.left;
    const dy = this.startY - rect.top;
    this.container.scrollLeft += dx * (this.pinchScale - 1);
    this.container.scrollTop += dy * (this.pinchScale - 1);
    this.resetPinchZoomParams();
    event.preventDefault();
    event.stopPropagation();
  }

  private resetPinchZoomParams(): void {
    this.startX = this.startY = this.initialPinchDistance = 0;
    this.pinchScale = 1;
  }

  public initializePinchZoom(): void {
    this.viewer = document.getElementById('viewer');
    this.container = document.getElementById('viewerContainer') as HTMLDivElement;
    this._zone.runOutsideAngular(() => {
      document.addEventListener('touchstart', this.onViewerTouchStart.bind(this));
      document.addEventListener('touchmove', this.onViewerTouchMove.bind(this), { passive: false });
      document.addEventListener('touchend', this.onViewerTouchEnd.bind(this));
    });
  }

  public destroyPinchZoom(): void {
    if (this.isMobile()) {
      document.removeEventListener('touchstart', this.onViewerTouchStart);
      document.removeEventListener('touchmove', this.onViewerTouchMove);
      document.removeEventListener('touchend', this.onViewerTouchEnd);
    }
  }
}
