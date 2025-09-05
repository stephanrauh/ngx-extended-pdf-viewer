import { Injectable, NgZone } from '@angular/core';
import { IPDFViewerApplication } from '../options/pdf-viewer-application';
import { pdfDefaultOptions } from '../options/pdf-default-options';

/**
 * Pure Angular service for iOS Safari pinch-to-zoom optimization
 * Works by dynamically adjusting the maxCanvasPixels option during touch gestures
 * This approach is compatible with the existing mypdf.js MaxCanvasSize class
 */
@Injectable({
  providedIn: 'root'
})
export class IOSCanvasOptimizationService {
  private PDFViewerApplication: IPDFViewerApplication | undefined;
  private isInitialized = false;
  private isPinching = false;
  private cooldownTimer: any = null;
  private originalMaxCanvasPixels: number;
  private reducedMaxCanvasPixels: number;

  // Configuration
  private readonly cooldownDuration = 2000; // 2 seconds
  private readonly reductionFactor = 0.25; // Reduce to 25% during pinch
  private readonly iosMaxCanvasPixels = 5242880; // PDF.js iOS limit (5MP)

  constructor(private ngZone: NgZone) {
    // Store original canvas size
    this.originalMaxCanvasPixels = pdfDefaultOptions.maxCanvasPixels || this.getDefaultCanvasSize();
    this.reducedMaxCanvasPixels = Math.min(
      this.originalMaxCanvasPixels * this.reductionFactor,
      this.iosMaxCanvasPixels
    );
  }

  /**
   * Initialize the service with PDFViewerApplication
   * Called from NgxExtendedPdfViewerComponent.initialize()
   */
  initialize(pdfViewerApplication: IPDFViewerApplication): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.PDFViewerApplication = pdfViewerApplication;
    this.ngZone.runOutsideAngular(() => {
      this.setupTouchListeners();
      this.isInitialized = true;
    });
  }

  private getDefaultCanvasSize(): number {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    
    if (isIOS || isMobile) {
      return this.iosMaxCanvasPixels; // Use PDF.js iOS limit
    }
    
    return 33554432; // PDF.js desktop default (32MP)
  }

  private setupTouchListeners(): void {
    // Listen for pinch-to-zoom gestures
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        this.onPinchStart();
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.touches.length < 2 && this.isPinching) {
        this.onPinchEnd();
      }
    }, { passive: true });

    window.addEventListener('touchcancel', () => {
      if (this.isPinching) {
        this.onPinchEnd();
      }
    }, { passive: true });
  }

  private onPinchStart(): void {
    if (this.isPinching) return;

    this.isPinching = true;
    this.clearCooldown();
    
    // Reduce canvas resolution immediately for smooth pinching
    this.updateCanvasSize(this.reducedMaxCanvasPixels);
  }

  private onPinchEnd(): void {
    if (!this.isPinching) return;

    this.isPinching = false;
    this.startCooldown();
  }

  private startCooldown(): void {
    this.clearCooldown();
    this.cooldownTimer = setTimeout(() => {
      // Restore full resolution after cooldown
      this.updateCanvasSize(this.originalMaxCanvasPixels);
    }, this.cooldownDuration);
  }

  private clearCooldown(): void {
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }

  private updateCanvasSize(maxCanvasPixels: number): void {
    // Update the pdfDefaultOptions to affect new renders
    pdfDefaultOptions.maxCanvasPixels = maxCanvasPixels;

    // Update existing PDF.js instances if available
    if (this.PDFViewerApplication) {
      // Update main viewer
      if (this.PDFViewerApplication.pdfViewer) {
        this.PDFViewerApplication.pdfViewer.maxCanvasPixels = maxCanvasPixels;
      }

      // Update thumbnail viewer
      if (this.PDFViewerApplication.pdfThumbnailViewer) {
        this.PDFViewerApplication.pdfThumbnailViewer.maxCanvasPixels = maxCanvasPixels;
      }

      // Trigger a gentle re-render of visible pages only during transitions
      // (not during active pinching to avoid performance issues)
      if (!this.isPinching) {
        setTimeout(() => this.triggerVisiblePageRerender(), 100);
      }
    }
  }

  private triggerVisiblePageRerender(): void {
    if (!this.PDFViewerApplication?.pdfViewer) return;

    const pdfViewer = this.PDFViewerApplication.pdfViewer;
    
    // Only re-render currently visible pages to minimize performance impact
    pdfViewer._pages?.forEach((pageView: any) => {
      if (pageView && this.isPageVisible(pageView)) {
        // Gently trigger re-render by invalidating the current render
        if (pageView.renderingState === 3 /* FINISHED */) {
          pageView.reset();
          // Let the normal rendering queue handle the re-render
          if (pdfViewer.renderingQueue) {
            pdfViewer.renderingQueue.renderView(pageView);
          }
        }
      }
    });
  }

  private isPageVisible(pageView: any): boolean {
    if (!pageView?.div) return false;
    
    const rect = pageView.div.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= viewHeight &&
      rect.left <= viewWidth
    );
  }

  /**
   * Get current canvas size setting
   */
  getCurrentCanvasSize(): number {
    return pdfDefaultOptions.maxCanvasPixels || this.originalMaxCanvasPixels;
  }

  /**
   * Check if currently in pinch mode
   */
  isPinchingActive(): boolean {
    return this.isPinching;
  }

  /**
   * Manually override the canvas size (for advanced users)
   */
  setCanvasSize(maxCanvasPixels: number): void {
    this.originalMaxCanvasPixels = maxCanvasPixels;
    this.reducedMaxCanvasPixels = Math.min(
      maxCanvasPixels * this.reductionFactor,
      this.iosMaxCanvasPixels
    );
    
    if (!this.isPinching) {
      this.updateCanvasSize(maxCanvasPixels);
    }
  }

  /**
   * Cleanup when service is destroyed
   */
  destroy(): void {
    this.clearCooldown();
    this.isInitialized = false;
    // Touch listeners will be cleaned up when window is destroyed
  }
}