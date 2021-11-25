import { NgZone } from '@angular/core';
import { PagesLoadedEvent, SpreadModeType } from '../public_api';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';

export class RelativeCoordsSupport {
  private viewer: any;
  private startX = 0;
  private startY = 0;
  private moveX = 0;
  private moveY = 0;
  private initialPinchDistance = 0;
  private pinchScale = 1;

  private boundOnViewerTouchStart: any;
  private boundOnViewerTouchMove: any;
  private boundOnViewerTouchEnd: any;

  constructor(private _zone: NgZone, private component:NgxExtendedPdfViewerComponent) {
    console.log("RelativeCoordsSupport.constructor");
    this.boundOnViewerTouchStart = this.onViewerTouchStart.bind(this);
    this.boundOnViewerTouchMove = this.onViewerTouchMove.bind(this);
    this.boundOnViewerTouchEnd = this.onViewerTouchEnd.bind(this);

    this.initializeRelativeCoords();
  }

  private isMobile() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || ((<any>navigator).msMaxTouchPoints > 0);
  }

  private onViewerTouchStart(event: TouchEvent): void {
    this.initialPinchDistance = 0;

    if (event.touches.length === 2) {
      const container = document.getElementById('viewerContainer') as HTMLDivElement;
      const rect = container.getBoundingClientRect();
      if (event.touches[0].pageX >= rect.left && event.touches[0].pageX <= rect.right) {
        if (event.touches[0].pageY >= (rect.top + window.scrollY) && event.touches[0].pageY <= (rect.bottom + window.scrollY)) {
          if (event.touches[1].pageX >= rect.left && event.touches[1].pageX <= rect.right) {
            if (event.touches[1].pageY >= (rect.top + window.scrollY) && event.touches[1].pageY <= (rect.bottom + window.scrollY)) {
              this.startX = (event.touches[0].pageX + event.touches[1].pageX) / 2;
              this.startY = (event.touches[0].pageY + event.touches[1].pageY) / 2;
              this.initialPinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);

              if (event.cancelable) {
                event.preventDefault();
              }
              event.stopPropagation();
            }
          }
        }
      }
    }

    if (event.touches.length === 1 && false) { // && true
      let t = event.touches[0];
      this.zoomToPoint(event, t.pageX, t.pageY);

    }
  }

  private zoomToPoint(event:Event, pageX:number, pageY:number) {
    const container = document.getElementById('viewerContainer') as HTMLDivElement;
      const rect = container.getBoundingClientRect();
      const viewerRect = this.viewer.getBoundingClientRect();

      let nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 

      console.log("zoomToPoint: " + nf.format(pageX) + " / " + nf.format(pageY) )

      if (pageX >= rect.left && pageX <= rect.right) {
        if (pageY >= (rect.top + window.scrollY) && pageY <= (rect.bottom + window.scrollY)) {
      
          // let pageX = t.pageX;
          // let pageY = t.pageY;
          
          pageX -= rect.left;
          pageY -= rect.top;

          pageX += container.scrollLeft;
          pageY += container.scrollTop

          // const slNext = container.scrollLeft + slChange;
          //   const stNext = container.scrollTop + stChange;

          
          this.debugPoint(pageX, pageY);

        


        




          setTimeout(() => {

            this.pinchScale = 1.1; // Math.random() < 0.5 ? 1.1 : 0.9; // 1.1;

            // let tl = event.changedTouches.length;
            // let pageX = tl > 1 ? (event.changedTouches[1].pageX + event.changedTouches[0].pageX) / 2 : (tl > 0 ?  event.changedTouches[0].pageX : this.startX);
            // let pageY = tl > 1 ? (event.changedTouches[1].pageY + event.changedTouches[0].pageY) / 2 : (tl > 0 ? event.changedTouches[0].pageY : this.startY);
      
            const PDFViewerApplication: any = (window as any).PDFViewerApplication;
            const pdfViewer = PDFViewerApplication.pdfViewer;
            // let currentPage = PDFViewerApplication.page;
            // let pageCount = PDFViewerApplication.pageCount;
            
            // let spreadMode = PDFViewerApplication.pdfViewer.spreadMode as SpreadModeType;
            // let pagesInView = [ currentPage ];

            let pageWidth = 0;
            let pageHeight = 0;

            let pagesInView = this.getCurrentPagesInView();
            pagesInView.forEach(pageNo => {
              const pdfPage = pdfViewer._pages[pageNo - 1];
              if (!pdfPage) {
                console.log("pdfPage == false, pagesInView: " + pagesInView.join(","));
                return;
              }
              // const pageWidthScale = pdfPage.width * pdfPage.scale;
              // const pageHeightScale = pdfPage.height * pdfPage.scale;
              // const pageScale = Math.min(pageWidthScale, pageHeightScale);
              
              pageWidth += pdfPage.width;
              // console.log("pdfPage.w: "+ pdfPage.width + " -> " + pageWidth);
              pageHeight = Math.max(pageHeight, pdfPage.height);
              
            });

      
            let currentScale = PDFViewerApplication.pdfViewer.currentScale;
            let newScale = currentScale * this.pinchScale;

            let newWidth = pageWidth / currentScale * newScale;
            let newHeight = pageHeight / currentScale * newScale;


            // let viewportScaleWidth = newWidth >= viewerRect.width ? 1 : (((newWidth / viewerRect.width) - 1) / 2) + 1;
            // let viewportScaleHeight = newHeight >= viewerRect.height ? 1 : (((newHeight / viewerRect.height) - 1) / 2) + 1;
            
            // PDFViewerApplication.pdfViewer.currentScale *= this.pinchScale;
            PDFViewerApplication.pdfViewer._setScale(newScale, true);

            // const container = document.getElementById('viewerContainer') as HTMLDivElement;
            // const rect = container.getBoundingClientRect();
            // const viewerRect = this.viewer.getBoundingClientRect();
            
            // const dx = pageX - rect.left;
            // const dy = pageY - rect.top;
            const dx = pageX;
            const dy = pageY;

            const dxp = dx / viewerRect.width;
            const dyp = dy / viewerRect.height;
      
            const slChange = dx * (this.pinchScale - 1);
            const stChange = dy * (this.pinchScale - 1);
            const slNext = container.scrollLeft + slChange;
            const stNext = container.scrollTop + stChange;
      
            // console.log(
            //   "pinchScale: " + this.pinchScale + " | " + currentScale + " -> " + newScale 
            //   + " (" + PDFViewerApplication.pdfViewer._currentScale + ", " + PDFViewerApplication.pdfViewer.currentScale + ")"
            //   + ", rect.l/t: " + rect.left + " / " + rect.top
            //   // + ", startX/Y: " + this.startX + " / " + this.startY
            //   + ", dx/y " + dx + " / " + dy + ", psr: " + (this.pinchScale - 1)
            //   + ", scrollLeft: " + container.scrollLeft + " -> " + slNext
            //   + ", scrollTop: " + container.scrollTop + " -> " + stNext
            //   // + ", container: ", container
            //   ,  ", event: ", event
            //   // + ", rect.w/h: " + rect.width + " / " + rect.height
            //   // + ", sl/tChange: " + slChange + " / " + stChange
              
            // );

            console.log("pageX/Y: " + nf.format(pageX) + " / " + nf.format(pageY )
              + ", t.x/y: " + nf.format(pageX) + " / " + nf.format(pageY )
              + ", rect.left / top: " +  nf.format(rect.left) + " / " + nf.format(rect.top)
              + ", dx/yp: " +  nf.format(dxp) + " / " + nf.format(dyp )
              + ", c.scrollLeft / top: " +  nf.format(container.scrollLeft) + " / " + nf.format(container.scrollTop)
              + " -> " +  nf.format(slNext) + " / " + nf.format(stNext)
              // + ", wc; " + (viewerRect.width > rect.width) + ", hc: " + (viewerRect.height > rect.height)
              + ", pageW/H: " + nf.format(pageWidth) + " / " + nf.format(pageHeight) + ", piv: " + pagesInView.join(",")
              + ", scale: " + nf.format(currentScale) + " -> " + nf.format(newScale) + " ("+nf.format(this.pinchScale)+")"
              + ", newW/H: " + nf.format(newWidth) + " / " + nf.format(newHeight)
              // + ", viewportScaleW/: " + nf.format(viewportScaleWidth) + " / " + nf.format(viewportScaleHeight)
              // +  ", viewerRect: ", viewerRect
            );
            
            // container.scrollLeft = slNext;
            // container.scrollTop = stNext;
      
            // * viewportScaleWidth    * viewportScaleHeight



            let pageXcorr = 0;
            // if (pageWidth >= viewerRect.width  && newWidth >= viewerRect.width ) { }
            // else {
            //   pageXcorr =  (this.pinchScale - 1) * 28 * 10;  // Why 28 ? 

            //   if (pageWidth < viewerRect.width  && newWidth < viewerRect.width ) {
               
            //   } else {
            //     let minW = Math.min(pageWidth, newWidth);
            //     let maxW = Math.max(pageWidth, newWidth);
                
            //     let pageElement = document.querySelector(".page");
            //     let pageBorderWidth = pageElement ?  parseFloat(getComputedStyle(pageElement).borderWidth) : 0;
               
            //     let change = maxW - minW;
                
            //     let minToRect = viewerRect.width  - minW;
            //     let minToRectRatio = (minToRect / change) 

            //    console.log("pageXcorr: " + nf.format(pageXcorr) 
            //     + ", minToRectRatio " +nf.format(minToRectRatio) 
            //     + " = " + nf.format(pageXcorr * minToRectRatio) 
            //     + ", pageBorderWidth " +nf.format(pageBorderWidth) 
            //     + ", minToRect " +nf.format(minToRect) 
            //     // + ", minToRectRatio " +nf.format(minToRectRatio) 
                
            //     );

            //     pageXcorr *= minToRectRatio;
            //     pageXcorr -= pageBorderWidth;
            //   }
            // }
            // newWidth >= viewerRect.width ? 0 : (this.pinchScale - 1) * 28 * 10;  // 1.1 = 28, 1,15 = 42

            this.debugPoint(
              (pageX * this.pinchScale ) - pageXcorr , 
              pageY * this.pinchScale 
            );

      
            this.resetPinchZoomParams();
      
            if (event) {
              if (event.cancelable) {
                event.preventDefault();
              }
              event.stopPropagation();
            }
           

          }, 800);

          
        }
      }
  }

  private getCurrentPagesInView():number[] {
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;

    let page = PDFViewerApplication.page;
    let pageCount = PDFViewerApplication.pdfViewer._pages.length;
    
    let spreadMode = PDFViewerApplication.pdfViewer.spreadMode as SpreadModeType;

    let pages = [ page ];
    
    if (page == 1) return pages;
   
    let isSpread = spreadMode == SpreadModeType.EVEN || SpreadModeType.ODD;
    // console.log("isSpread: " + isSpread+ ", pages: " + pages.join(","));
    if (!isSpread) return pages;

    if (page % 2 == 1) {
      page--;
      pages = [ page ];
    }
    // if (page % 2 == 1)
    let nextPage = page + 1;
    if (nextPage <= pageCount) pages.push(nextPage);
    // console.log("nextPage: " + nextPage + ", pageCount: " + pageCount+ ", pages: " + pages.join(","));
    return  pages;
  }

  private debugPoint(x,y) {
    const viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    let point = document.getElementById('debug-point');
    if (!point) {
      point = document.createElement("div");
      point.id = "debug-point";
      point.style.position = "absolute";
      point.style.width = "10px";
      point.style.height = "10px";
      point.style.borderRadius = "100px";
      
      point.style.backgroundColor = "red";

      viewerContainer.appendChild(point);
    }

    point.style.left = (x-5) + "px";
    point.style.top = (y-5) + "px";
  }

  private onViewerTouchMove(event: TouchEvent): void {
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;


    if (this.initialPinchDistance <= 0 || event.touches.length !== 2) {
      return;
    }

    const pinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
    const container = document.getElementById('viewerContainer') as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();

    let pageX = (event.touches[1].pageX + event.touches[0].pageX) / 2;
    let pageY = (event.touches[1].pageY + event.touches[0].pageY) / 2;

    this.moveX = pageX;
    this.moveY = pageY;
    


    //const viewerRect = this.viewer.getBoundingClientRect();
    pageX -= containerRect.left;
    pageY -= containerRect.top;

    
    const originX = pageX + container.scrollLeft; // this.startX + container.scrollLeft;
    const originY = pageY + container.scrollTop ; //this.startY + container.scrollTop;

    this.debugPoint(originX, originY);
    

    this.pinchScale = pinchDistance / this.initialPinchDistance;
    let minZoom = Number(PDFViewerApplicationOptions.get('minZoom'));
    if (!minZoom) {
      minZoom = 0.1;
    }

    const currentZoom = PDFViewerApplication.pdfViewer._currentScale;
    if (currentZoom * this.pinchScale < minZoom) {
      this.pinchScale = minZoom / currentZoom;
    }
    let maxZoom = Number(PDFViewerApplicationOptions.get('maxZoom'));
    if (!maxZoom) {
      maxZoom = 10;
    }
    if (currentZoom * this.pinchScale > maxZoom) {
      this.pinchScale = maxZoom / currentZoom;
    }

    // let nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 
    // console.log(
    //   "move. pinchScale: " + nf.format(this.pinchScale) 
    //   + ", cr.l/t: " + nf.format(containerRect.left) + " / " + nf.format(containerRect.top) 
    //   + ", originX/Y: " + nf.format(originX) + " / " + nf.format(originY) 
    //   + ", cr.w " + nf.format(containerRect.width) 
    // );


    this.viewer.style.transform = `scale(${this.pinchScale})`;
    this.viewer.style.transformOrigin = `${originX}px ${originY}px`;

    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  private onViewerTouchEnd(event: TouchEvent): void {
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;
    if (this.initialPinchDistance <= 0) {
      return;
    }

    let to = this.viewer.style.transformOrigin;

    this.viewer.style.transform = `none`;
    this.viewer.style.transformOrigin = `unset`;

    let tl = event.changedTouches.length;
    let pageX = this.moveX;
    let pageY = this.moveY;
    
    if (tl > 1) {
      pageX = (event.changedTouches[1].pageX + event.changedTouches[0].pageX) / 2;
      pageY =  (event.changedTouches[1].pageY + event.changedTouches[0].pageY) / 2;
      
    } else console.log("end.moveX/Y: " + this.moveX + " -> " + pageX + ", moveY: " + this.moveY + " -> " + pageY + ", tl: " + tl);

    // this.pinchScale = 1;

    let currentScale = PDFViewerApplication.pdfViewer.currentScale;
    let newScale = currentScale * this.pinchScale;
    
   
    const container = document.getElementById('viewerContainer') as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const viewerRect = this.viewer.getBoundingClientRect();


    // setTimeout(() => {

    
    
    pageX -= rect.left;
    pageY -= rect.top;

    pageX += container.scrollLeft;
    pageY += container.scrollTop;


    const dx = pageX;
    const dy = pageY;


    const slCurrent = container.scrollLeft;
    const stCurrent = container.scrollTop;

    const slChange = dx * (this.pinchScale - 1);
    const stChange = dy * (this.pinchScale - 1);
    const slNext = container.scrollLeft + slChange;
    const stNext = container.scrollTop + stChange;

    
    

    let pageWidth = 0;
    let pageHeight = 0;
    let pageWidthScaled = 0;
    let pageHeightScaled = 0;


    let pagesInView = this.getCurrentPagesInView();
    pagesInView.forEach(pageNo => {
      const pdfPage = PDFViewerApplication.pdfViewer._pages[pageNo - 1];
      if (!pdfPage) {
        console.log("pdfPage == false, pagesInView: " + pagesInView.join(","));
        return;
      }
      // const pageWidthScale = pdfPage.width * pdfPage.scale;
      // const pageHeightScale = pdfPage.height * pdfPage.scale;
      // const pageScale = Math.min(pageWidthScale, pageHeightScale);
      
      pageWidth += pdfPage.width;
      // console.log("pdfPage.w: "+ pdfPage.width + " -> " + pageWidth);
      pageHeight = Math.max(pageHeight, pdfPage.height);

      pageWidthScaled += pdfPage.width * pdfPage.scale;
      pageHeightScaled = Math.max(pageHeightScaled, pdfPage.height * pdfPage.scale);
      
    });

    let pageWidthCs = pageWidth / currentScale;
    let pageHeightCs = pageHeight / currentScale;

    let newWidth = pageWidthCs * newScale;
    let newHeight = pageHeightCs * newScale;




    // PDFViewerApplication.pdfViewer.currentScale *= this.pinchScale;
    PDFViewerApplication.pdfViewer._setScale(newScale, true);

    container.scrollLeft = slNext;
    container.scrollTop = stNext;



    let nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 


    let pageXcorr = 0;
    if (pageWidth >= viewerRect.width  && newWidth >= viewerRect.width ) { }
    else {
      pageXcorr =  (this.pinchScale - 1) * 28 * 10;  // Why 28 ? 

      if (pageWidth < viewerRect.width  && newWidth < viewerRect.width ) {
       
      } else {
        let minW = Math.min(pageWidth, newWidth);
        let maxW = Math.max(pageWidth, newWidth);
        
        let pageElement = document.querySelector(".page");
        let pageBorderWidth = pageElement ?  parseFloat(getComputedStyle(pageElement).borderWidth) : 0;
       
        let change = maxW - minW;
        
        let minToRect = viewerRect.width  - minW;
        let minToRectRatio = (minToRect / change) 

       console.log("pageXcorr: " + nf.format(pageXcorr) 
        + ", minToRectRatio " +nf.format(minToRectRatio) 
        + " = " + nf.format((pageXcorr * minToRectRatio) - pageBorderWidth) 
        + ", pageBorderWidth " +nf.format(pageBorderWidth) 
        + ", minToRect " +nf.format(minToRect) 
        // + ", minToRectRatio " +nf.format(minToRectRatio) 
        
        );

        pageXcorr *= minToRectRatio;
        pageXcorr -= pageBorderWidth;
      }
    }
    // newWidth >= viewerRect.width ? 0 : (this.pinchScale - 1) * 28 * 10;  // 1.1 = 28, 1,15 = 42

    this.debugPoint(
      (pageX * this.pinchScale ) - pageXcorr , 
      pageY * this.pinchScale 
    );


    console.log(
      "pinchScale: " + nf.format(this.pinchScale) + " | " + nf.format(currentScale) + " -> " + nf.format(newScale) 
      // + " (" + nf.format(PDFViewerApplication.pdfViewer.currentScale) + ")"
      // + ", rect.l/t: " + nf.format(rect.left) + " / " + nf.format(rect.top)
      // + ", startX/Y: " + nf.format(this.startX) + " / " + nf.format(this.startY) + " ("+tl+")"
      + ", dx/y " + nf.format(dx) + " / " + nf.format(dy) + ", psr: " + nf.format(this.pinchScale - 1)
      + ", scrollLeft: " + nf.format(slCurrent) + " -> " + nf.format(slNext)
      + ", scrollTop: " + nf.format(stCurrent) + " -> " + nf.format(stNext)
      + ", viewerRect.w/h: " + nf.format(viewerRect.width) + " / " + nf.format(viewerRect.height)
      + ", pageWidth: " + nf.format(pageWidth) + " -> " + nf.format(newWidth)
      + ", pageHeight: " + nf.format(pageHeight) + " -> " + nf.format(newHeight)
      + ", pageWidthScaled " + nf.format(pageWidthScaled) + " | " + nf.format(pageWidthCs )
      + ", pageWidthScaled " + nf.format(pageHeightScaled) + " | " + nf.format(pageHeightCs )
      + ", pageXcorr: " + pageXcorr

      // ,  ", event: ", event
      // + ", rect.w/h: " + rect.width + " / " + rect.height
      // + ", sl/tChange: " + slChange + " / " + stChange
      
    );


    this.resetPinchZoomParams();

  // }, 50);

    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  private resetPinchZoomParams(): void {
    this.startX = this.startY = this.moveX = this.moveY = this.initialPinchDistance = 0;
    this.pinchScale = 1;
  }

  private getBoxStyle(
    elem: HTMLElement | SVGElement,
    name: string,
    style: CSSStyleDeclaration = window.getComputedStyle(elem)
  ) {
    const suffix = name === 'border' ? 'Width' : ''
    return {
      left: parseFloat(style[`${name}Left${suffix}`]) || 0,
      right: parseFloat(style[`${name}Right${suffix}`]) || 0,
      top: parseFloat(style[`${name}Top${suffix}`]) || 0,
      bottom: parseFloat(style[`${name}Bottom${suffix}`]) || 0,
    }
  }

  private  getDimensions(elem: HTMLElement) {
    const parent = elem.parentNode as HTMLElement
    const style = window.getComputedStyle(elem)
    const parentStyle = window.getComputedStyle(parent)
    const rectElem = elem.getBoundingClientRect()
    const rectParent = parent.getBoundingClientRect()
  
    return {
      elem: {
        style,
        width: rectElem.width,
        height: rectElem.height,
        top: rectElem.top,
        bottom: rectElem.bottom,
        left: rectElem.left,
        right: rectElem.right,
        margin: this.getBoxStyle(elem, 'margin', style),
        border: this.getBoxStyle(elem, 'border', style)
      },
      parent: {
        style: parentStyle,
        width: rectParent.width,
        height: rectParent.height,
        top: rectParent.top,
        bottom: rectParent.bottom,
        left: rectParent.left,
        right: rectParent.right,
        padding: this.getBoxStyle(parent, 'padding', parentStyle),
        border: this.getBoxStyle(parent, 'border', parentStyle)
      }
    }
  }

  private constrain(left:number,top:number): ({left:number, top:number}) {
    
    const dims = this.getDimensions(this.viewer)
    
    let result = { left: left, top: top };
    let minX = left, maxX = left, minY = top, maxY = top;

    if (dims.elem.width <= dims.parent.width) {
      // inside
      minX = (-dims.elem.margin.left - dims.parent.padding.left)
      maxX =
          (dims.parent.width -
            dims.elem.width -

            dims.parent.padding.left -
            dims.elem.margin.left -
            dims.parent.border.left -
            dims.parent.border.right
            ) 
    } else {
      // outside
      minX =
        (-( dims.elem.width - dims.parent.width) -
          dims.parent.padding.left -
          dims.parent.border.left -
          dims.parent.border.right);

      maxX = (dims.parent.padding.left)

    }
    if (dims.elem.height <= dims.parent.height) {
      // inside
      minY = (-dims.elem.margin.top - dims.parent.padding.top)
      maxY =
          (dims.parent.height -
            dims.elem.height - 
            dims.parent.padding.top -
            dims.elem.margin.top -
            dims.parent.border.top -
            dims.parent.border.bottom);
        
    } else {
      // outside

      minY =
      (-(dims.elem.height - dims.parent.height) -
        dims.parent.padding.top -
        dims.parent.border.top -
        dims.parent.border.bottom);

      maxY = (dims.parent.padding.top)
      
    }
   


    
    let cLeft = Math.max(Math.min(left, maxX), minX)
    let cTop = Math.max(Math.min(top, maxY), minY)

    console.log("constrain, left:  " + left + " -> " + cLeft + " ("+minX + "-"+maxX+")" + ", top: " + top + " -> " + cTop + " ("+minY + "-"+maxY+"), dims: ", dims);

    return { left: cLeft, top: cTop };
  }


  
  private isInsideContainer(points:({ pageX:number, pageY:number})[]) {
    const viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    const rect = viewerContainer.getBoundingClientRect();

    if (points === undefined || points.length == 0) return false;

    // let allInside = true;
    for (let point of points) {
      let pageX = point.pageX; // + viewerContainer.scrollLeft;
      let pageY = point.pageY; // + viewerContainer.scrollTop;
      

      let inside = false;
      if (pageX >= rect.left && pageX <= rect.right) {
        if (pageY >= (rect.top + window.scrollY) && pageY <= (rect.bottom + window.scrollY)) {
          inside = true;
        }
      }

      // console.log("pageX/Y: " + pageX + " / " + pageY + ", inside: " + inside + "; rect: ", rect, ", point: ", point);

      if (!inside) return false;
    }

    return true;
  }


  public updateViewerPosition() {
    let viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    this.viewer = document.getElementById('viewer') as HTMLDivElement;

    const dims = this.getDimensions(this.viewer);
    console.log("updateViewerPosition, updateLeft: " + (dims.elem.width <= dims.parent.width) + ", updateTop: " + (dims.elem.height <= dims.parent.height) + ", dims: ", dims);


    let constrain = this.constrain(dims.elem.left, dims.elem.top);

    if (dims.elem.width <= dims.parent.width || constrain.left != dims.elem.left) {
      let left = (dims.parent.width - dims.elem.width) / 2
      this.viewer.style.left = left + "px";
    }
    if (dims.elem.height <= dims.parent.height || constrain.top != dims.elem.top) {
      let top = (dims.parent.height - dims.elem.height) / 2
      this.viewer.style.top = top + "px";
    }

  }

  public initializeRelativeCoords(): void {

    let viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    this.viewer = document.getElementById('viewer') as HTMLDivElement;

    this.component.root.nativeElement.classList.add("relative-coords");
    // this.component.root.nativeElement.classList.add("stf__item");  //TODO: hack
    let stfItemHack = document.createElement("div");
    stfItemHack.classList.add("stf__item");
    viewerContainer.appendChild(stfItemHack);


    if (!this.isMobile()) {
      // viewerContainer.classList.add("pinch-to-zoom");
      // console.log("nativeElement: ", this.component.root.nativeElement);
      

      let nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 

      const rect = viewerContainer.getBoundingClientRect();
      let PDFViewerApplication: any = (window as any).PDFViewerApplication;

      let startX = 0, startY = 0, startLeft = 0, startTop = 0;
      
      // let win = window as any;
      let downEvent = (event:MouseEvent) => {
        
        let isInside = this.isInsideContainer([event])
        if (!isInside) return true; 

        let pageX = event.pageX - rect.left + viewerContainer.scrollLeft;
        let pageY = event.pageY - rect.top + viewerContainer.scrollTop;

        

        
        // this.zoomToPoint(event, event.pageX, event.pageY);
        this.debugPoint(pageX, pageY);

        startX = pageX;
        startY = pageY;
        
        startLeft = parseFloat(getComputedStyle(this.viewer).left) || 0;
        startTop = parseFloat(getComputedStyle(this.viewer).top) || 0

        console.log("mousedown: " 
          + nf.format(pageX) + " / " + nf.format(pageY) 
          + ", sl/t: " + nf.format(startLeft) + " / " + nf.format(startTop) 
          + ", isInside: " + isInside
        );

        // let constrain = this.constrain(startLeft, startTop);

        document.addEventListener('mousemove', moveEvent);
        
      }
      let moveEvent = (event:MouseEvent) => {
        let pageX = event.pageX - rect.left + viewerContainer.scrollLeft;
        let pageY = event.pageY - rect.top + viewerContainer.scrollTop;

        this.debugPoint(pageX, pageY);

        let diffX = pageX - startX;
        let diffY = pageY - startY;

        let left = startLeft + diffX;
        let top = startTop + diffY;

        let constrain = this.constrain(left, top);
        left = constrain.left;
        top = constrain.top;

        // console.log("mousemove: " 
        //   + nf.format(pageX) + " / " + nf.format(pageY)
        //   + ", diff: " + nf.format(diffX) + " / " + nf.format(diffY)
        //   + ", l/t: " + nf.format(left) + " / " + nf.format(top)
          
        // );

        // left = constrain.left;
        // top = constrain.top;


        this.viewer.style.left = left + "px";
        this.viewer.style.top = top + "px";

      }
      let upEvent = (event:MouseEvent) => {
        // console.log("mouseup: " + nf.format(event.pageX) + " / " + nf.format(event.pageY));
        document.removeEventListener("mousemove", moveEvent);
        // document.removeEventListener("mouseup", upEvent);

        startX = 0, startY = 0;
      }

      let onContainerScoll = (event:Event) => {
        //console.log("onContainerScoll: l/t: " + viewerContainer.scrollLeft + " / " + viewerContainer.scrollTop + ", event: " , event);
        if (viewerContainer.scrollLeft != 0 || viewerContainer.scrollTop != 0) viewerContainer.scroll({ left: 0, top: 0})
      }

      let onWheel = (event:Event) => {
        console.log("onWheel: event: ", event);
        //TODO: Kan brukes for å sjekke om det zoomes via hjulet på musa.
      };

      document.addEventListener('mousedown', downEvent);
      document.addEventListener('mouseup', upEvent);

      viewerContainer.addEventListener('scroll', onContainerScoll);

      window.addEventListener("wheel", onWheel, { passive: false });
      
      // let pages = document.querySelectorAll(".page");
      // console.log("pages " + pages.length);
      


      this.component.pagesLoaded.subscribe(async (event: PagesLoadedEvent) => {
        console.log("initializeRelativeCoords: scrollTop: ", viewerContainer.scrollTop);
      });

      this.component.pageChange.subscribe(async (event: any) => {
        console.log("pageChange: event: ", event, ", dims: ", this.getDimensions(this.viewer));

        setTimeout(() => {
          this.updateViewerPosition();
        }, 10);
        
      });
      // this.component.zoomChange.subscribe(async (event: any) => {
      //   console.log("zoomChange: event: ", event);
      // });
      this.component.currentZoomFactor.subscribe(async (event: any) => {
        console.log("currentZoomFactor: event: ", event);
        this.updateViewerPosition();
      });
      


     


      // setTimeout(() => {
      //   // if (PDFViewerApplication.pdfCursorTools?.handTool) PDFViewerApplication.pdfCursorTools.handTool.deactivate();
      //   // else console.log("PDFViewerApplication.pdfCursorTools.handTool  == undefined")
      //   PDFViewerApplication = (window as any).PDFViewerApplication;
      //   PDFViewerApplication.eventBus.on('pagesloaded', async (x: PagesLoadedEvent) => {
      //     console.log("initializeRelativeCoords: scrollTop: ", viewerContainer.scrollTop);
      //     viewerContainer.scrollTop = 0;

      //     // pages = document.querySelectorAll(".page");
      //     // console.log("pages " + pages.length);
      //     // pages.forEach((page) => {
      //     //   page.classList.add('stf__item');
      //     // })
        
          
      //   });
      //   PDFViewerApplication.eventBus.on('pagesloaded', async (x: PagesLoadedEvent) => {

      //   });


      //   // PDFViewerApplication.eventBus.on("updateviewarea", (event) => {
      //   //   console.log("updateviewarea: ", event);
      //   // });
      // },10);


      
      

      return;
    }
    
    //viewerContainer.classList.add("pinch-to-zoom");
    // console.log("nativeElement: ", this.component.root.nativeElement);
    // this.component.root.nativeElement.classList.add("relative-coords");
   
    //this.viewer.style.width = "fit-content";
    this._zone.runOutsideAngular(() => {
      document.addEventListener('touchstart', this.boundOnViewerTouchStart);
      document.addEventListener('touchmove', this.boundOnViewerTouchMove, { passive: false });
      document.addEventListener('touchend', this.boundOnViewerTouchEnd);
      
    });
  }

  public destroyRelativeCoords(): void {
    if (!this.isMobile()) {
      return;
    }
    document.removeEventListener('touchstart', this.boundOnViewerTouchStart);
    document.removeEventListener('touchmove', this.boundOnViewerTouchMove);
    document.removeEventListener('touchend', this.boundOnViewerTouchEnd);
  }
}
