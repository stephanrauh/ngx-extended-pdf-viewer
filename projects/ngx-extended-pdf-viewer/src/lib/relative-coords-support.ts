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
  private startLeft = 0;
  private startTop = 0;
  private state: "idle" | "move" | "zoom" =  "idle";
  private initialPinchDistance = 0;
  private currentScale = 1.0;

  private boundOnViewerTouchStart: any;
  private boundOnViewerTouchMove: any;
  private boundOnViewerTouchEnd: any;

  private debugX = 0;
  private debugY = 0;
  private debugXv = 0;
  private debugYv = 0;
  private debugScale = 1.0;
  private next = {
    scale: 1.0,
    dims: { },
    p: { x: 0, y: 0 }
  };

  private dims:any = {
    start: { }
  };

  private nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 

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

            this.currentScale = 1.1; // Math.random() < 0.5 ? 1.1 : 0.9; // 1.1;

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
            let newScale = currentScale * this.currentScale;

            let newWidth = pageWidth / currentScale * newScale;
            let newHeight = pageHeight / currentScale * newScale;


            // let viewportScaleWidth = newWidth >= viewerRect.width ? 1 : (((newWidth / viewerRect.width) - 1) / 2) + 1;
            // let viewportScaleHeight = newHeight >= viewerRect.height ? 1 : (((newHeight / viewerRect.height) - 1) / 2) + 1;
            
            // PDFViewerApplication.pdfViewer.currentScale *= this.currentScale;
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
      
            const slChange = dx * (this.currentScale - 1);
            const stChange = dy * (this.currentScale - 1);
            const slNext = container.scrollLeft + slChange;
            const stNext = container.scrollTop + stChange;
      
            // console.log(
            //   "currentScale: " + this.currentScale + " | " + currentScale + " -> " + newScale 
            //   + " (" + PDFViewerApplication.pdfViewer._currentScale + ", " + PDFViewerApplication.pdfViewer.currentScale + ")"
            //   + ", rect.l/t: " + rect.left + " / " + rect.top
            //   // + ", startX/Y: " + this.startX + " / " + this.startY
            //   + ", dx/y " + dx + " / " + dy + ", psr: " + (this.currentScale - 1)
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
              + ", scale: " + nf.format(currentScale) + " -> " + nf.format(newScale) + " ("+nf.format(this.currentScale)+")"
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
            //   pageXcorr =  (this.currentScale - 1) * 28 * 10;  // Why 28 ? 

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
            // newWidth >= viewerRect.width ? 0 : (this.currentScale - 1) * 28 * 10;  // 1.1 = 28, 1,15 = 42

            this.debugPoint(
              (pageX * this.currentScale ) - pageXcorr , 
              pageY * this.currentScale 
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

              this.startLeft = parseFloat(getComputedStyle(this.viewer).left) || 0;
              this.startTop = parseFloat(getComputedStyle(this.viewer).top) || 0;
              this.state = "zoom";

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
    if (event.touches.length === 1) { // && true
      let touch = event.touches[0]
      if (this.isInsideContainer([ touch ]) && this.state == "idle" ) {
        const viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
        const rect = viewerContainer.getBoundingClientRect();
        // const viewerRect = this.viewer.getBoundingClientRect();

        let pageX = touch.pageX - rect.left + viewerContainer.scrollLeft;
        let pageY = touch.pageY - rect.top + viewerContainer.scrollTop;

        
        this.debugPoint(pageX, pageY);

        this.startX = pageX;
        this.startY = pageY;
        
        let left = parseFloat(getComputedStyle(this.viewer).left) || 0;
        let top = parseFloat(getComputedStyle(this.viewer).top) || 0;
        
       

        console.log("TouchStart: " 
          + this.nf.format(pageX) + " / " + this.nf.format(pageY)
          + ", startX/Y: " + this.nf.format(this.startX) + " / " + this.nf.format(this.startY)
          + ", startLeft/Top: " + this.nf.format(this.startLeft) + " -> " +  this.nf.format(left)  + " / " + this.nf.format(this.startTop) + " -> " +  this.nf.format(top)
          + ", state: " + this.state,
          ", dims: ", this.getDimensions(this.viewer)
        );

        this.startLeft = left;
        this.startTop = top;
        

        this.state = "move";

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
      } else {
        console.log("TouchStart: isInside: " +  this.isInsideContainer([ touch ]) + ", state: " + this.state);
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

  private debugPoint(x:number, y:number, viewer:boolean = false) {
    const viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    let id = 'debug-point' + (viewer ? "-viewer" : "");

    let point = document.getElementById(id);
    let size = viewer ? 10 : 5;
    if (!point) {
      point = document.createElement("div");
      point.id = id;
      point.style.position = "absolute";
      point.style.width = size + "px";
      point.style.height = size + "px";
      point.style.borderRadius = "100px";
      
      point.style.backgroundColor = viewer ? "red" : "blue"; 

      if (!viewer) viewerContainer.appendChild(point);
      else this.viewer.appendChild(point);
    }



    
    let dims = this.getDimensions(this.viewer);

    if (viewer) {
      this.debugXv = x;
      this.debugYv = y;

      // console.log("debugPoint.viewer: " + this.nf.format(x) + " / " + this.nf.format(y) + ", | " + this.nf.format(x / dims.elem.width * 100) + " % / " + this.nf.format(y / dims.elem.height * 100) + " %, dims: ", dims.elem);


      // let vts = this.getViewerTransformScale();
      // if(vts != 1.0) {
      //   x /= vts;
      //   y /= vts;
      //   console.log("debugPoint.viewer: " + this.nf.format(x) + " / " + this.nf.format(y));
      // }

    } else {

      this.debugX = x;
      this.debugY = y;

      
      // console.log("debugPoint.cont: " + this.nf.format(x) + " / " + this.nf.format(y) + " | " + this.nf.format(x / dims.parent.width * 100) + " % /  " + this.nf.format(y / dims.parent.height * 100) + " %, dims: ", dims.parent);

    }


    point.style.left = (x-(size/2)) + "px";
    point.style.top = (y-(size/2)) + "px";


  }

  private onViewerTouchMove(event: TouchEvent): void {
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;

    const viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    const rect = viewerContainer.getBoundingClientRect();
    const vr = this.viewer.getBoundingClientRect();

    if (this.initialPinchDistance <= 0 || event.touches.length !== 2) {


      if (event.touches.length == 1 && this.state == "move") {
        const touch = event.touches[0];
       

        let pageX = touch.pageX - rect.left + viewerContainer.scrollLeft;
        let pageY = touch.pageY - rect.top + viewerContainer.scrollTop;

        this.debugPoint(pageX, pageY);

        let diffX = pageX - this.startX;
        let diffY = pageY - this.startY;

        let left = this.startLeft + diffX;
        let top = this.startTop + diffY;

        let constrain = this.constrain(left, top);
        left = constrain.left;
        top = constrain.top;

        console.log("TouchMove: " 
          + this.nf.format(pageX) + " / " + this.nf.format(pageY)
          + ", startX/Y: " + this.nf.format(this.startX) + " / " + this.nf.format(this.startY)
          + ", diff: " + this.nf.format(diffX) + " / " + this.nf.format(diffY)
          + ", l/t: " + this.nf.format(left) + " / " + this.nf.format(top)
          + ", viewer.w/h: " + this.nf.format(vr.width) + " / " + this.nf.format(vr.height) 
          
        );

        this.viewer.style.left = left + "px";
        this.viewer.style.top = top + "px";

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
      }

      return;
    }

    const pinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
    // const container = document.getElementById('viewerContainer') as HTMLDivElement;
    // const containerRect = container.getBoundingClientRect();

    let pageX = (event.touches[1].pageX + event.touches[0].pageX) / 2;
    let pageY = (event.touches[1].pageY + event.touches[0].pageY) / 2;

    this.moveX = pageX;
    this.moveY = pageY;
    

    let dims = this.getDimensions(this.viewer, { pageX: pageX, pageY: pageY })


    // //const viewerRect = this.viewer.getBoundingClientRect();
    pageX -= rect.left;
    pageY -= rect.top;

    // pageX -= vr.left;
    // pageY -= vr.top;

    
    const originX = pageX; // + viewerContainer.scrollLeft; // this.startX + container.scrollLeft;
    const originY = pageY; // + viewerContainer.scrollTop ; //this.startY + container.scrollTop;

    this.debugPoint(this.moveX - rect.left , this.moveY - rect.top);
    

    this.currentScale = pinchDistance / this.initialPinchDistance;
    let minZoom = Number(PDFViewerApplicationOptions.get('minZoom'));
    if (!minZoom) {
      minZoom = 0.1;
    }

    const currentZoom = PDFViewerApplication.pdfViewer._currentScale;
    if (currentZoom * this.currentScale < minZoom) {
      this.currentScale = minZoom / currentZoom;
    }
    let maxZoom = Number(PDFViewerApplicationOptions.get('maxZoom'));
    if (!maxZoom) {
      maxZoom = 10;
    }
    if (currentZoom * this.currentScale > maxZoom) {
      this.currentScale = maxZoom / currentZoom;
    }

    


    console.log("TouchMove PINCH: " 
     + ", startX/Y: " + this.nf.format(this.startX) + " / " + this.nf.format(this.startY)
     + ", moveX/Y: " + + this.nf.format(this.moveX) + " / " + this.nf.format(this.moveY)
      + ", rect.l/t: " + this.nf.format(rect.left) + " / " + this.nf.format(rect.top)
      + ", viewer.l/t: " + this.nf.format(vr.left) + " / " + this.nf.format(vr.top) 
      // + ", viewerContainer.sl/st: " + this.nf.format(viewerContainer.scrollLeft) + " / " + this.nf.format(viewerContainer.scrollTop)
      + ", originX/Y: " + this.nf.format(originX) + " / " + this.nf.format(originY) 

      + ", viewer.w/h: " + this.nf.format(vr.width) + " / " + this.nf.format(vr.height) 
      + ", currentScale: " + this.nf.format(this.currentScale)
      + ", dims: ", dims
      
      
    );


    this.viewer.style.transform = `scale(${this.currentScale})`;
    this.viewer.style.transformOrigin = `${originX}px ${originY}px`;





    // this.viewer.style.left = left + "px";
    // this.viewer.style.top = top + "px";



    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  private onViewerTouchEnd(event: TouchEvent): void {
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;
    if(this.state == "move") {
      this.resetPinchZoomParams();
      return;
    }
    if (this.initialPinchDistance <= 0 ) {
      this.resetPinchZoomParams();
      return;
    }

    // let to = this.viewer.style.transformOrigin;

    // this.viewer.style.transform = `none`;
    // this.viewer.style.transformOrigin = `unset`;

    let dimsStart = this.getDimensions(this.viewer);


    let tl = event.changedTouches.length;
    let pageX = this.moveX;
    let pageY = this.moveY;
    
    if (tl > 1) {
      pageX = (event.changedTouches[1].pageX + event.changedTouches[0].pageX) / 2;
      pageY =  (event.changedTouches[1].pageY + event.changedTouches[0].pageY) / 2;
      
    } else console.log("end.moveX/Y: " + this.moveX + " -> " + pageX + ", moveY: " + this.moveY + " -> " + pageY + ", tl: " + tl);

    // this.currentScale = 1;

    let currentScale = PDFViewerApplication.pdfViewer.currentScale;
    let newScale = currentScale * this.currentScale;
    // let scaleChange = 1 + (newScale - currentScale) / currentScale;
   
   
    const container = document.getElementById('viewerContainer') as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const viewerRect = this.viewer.getBoundingClientRect();

    let dims = this.getDimensions(this.viewer);

    this.next.scale = this.currentScale;
    this.next.dims = dims;

    // let pageX = event.pageX - rect.left + viewerContainer.scrollLeft;
    // let pageY = event.pageY - rect.top + viewerContainer.scrollTop;

    this.debugPoint(pageX, pageY);

    let diffX = pageX - this.startX;
    let diffY = pageY - this.startY;

    let diffXs = diffX ;
    let diffYs = diffY ;


    let left = this.startLeft + diffXs;
    let top = this.startTop + diffYs;

    // let constrain = this.constrain(left, top);
    // left = constrain.left;
    // top = constrain.top;


    
    console.log("TouchEnd: " 
      + ", scale: " + this.nf.format(currentScale) + " -> " + this.nf.format(newScale) + ", cs: " + this.currentScale

      + ", pageX/Y: " + this.nf.format(pageX) + " / " + this.nf.format(pageY)
      + ", startX/Y: " + this.nf.format(this.startX) + " / " + this.nf.format(this.startY)
      + ", diff: " + this.nf.format(diffX) + " / " + this.nf.format(diffY)
      + ", diffs: " + this.nf.format(diffXs) + " / " + this.nf.format(diffYs)

      + ", l/t: " + this.nf.format(viewerRect.left) + " -> " +this.nf.format(left) + " / " + this.nf.format(viewerRect.top) + " -> " +this.nf.format(top)
      + ", viewer.w/h: " + this.nf.format(viewerRect.width) + " / " + this.nf.format(viewerRect.height) 
      + ", dims: ", dims
      
    );
    // this.viewer.style.left = left + "px";
    // this.viewer.style.top = top + "px";


    // PDFViewerApplication.pdfViewer._setScale(newScale, true);

    // this.setViewerScale(newScale, { resetTransform: true });


    this.resetPinchZoomParams();

  // }, 50);

    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  private resetPinchZoomParams(): void {
    this.startX = this.startY = this.moveX = this.moveY = this.startLeft = this.startTop = this.initialPinchDistance = 0;
    this.currentScale = 1;
    this.state = "idle";
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

  
  private  getDimensions(elem: HTMLElement, point?:({ pageX:number, pageY:number})) {
    const parent = elem.parentNode as HTMLElement
    const style = window.getComputedStyle(elem)
    const parentStyle = window.getComputedStyle(parent)
    const rectElem = elem.getBoundingClientRect()
    const rectParent = parent.getBoundingClientRect()


    const vts = this.getViewerTransformScale();
  
    let res:any = {
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
      rel: {
        width: rectElem.width,
        height: rectElem.height,
        top: rectElem.top - rectParent.top,
        left: rectElem.left - rectParent.left,
        bottom: rectElem.bottom - rectParent.top,
        right: rectElem.right - rectParent.left,
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
    };

    if (vts == 1.0) res.scaled = res.rel;
    else {
      let sw = res.rel.width / vts;
      let sh = res.rel.height / vts;
      let wd = res.rel.width - sw;  // 118
      let hd = res.rel.height - sh;


      res.scaled = {
        vts: vts,
        width: sw,
        height: sh,
        top: res.rel.top + hd / 2,
        left: res.rel.left + wd / 2,
        bottom: res.rel.bottom - hd / 2,
        right: res.rel.right - wd / 2,

        wd: wd,
        hd: hd,
      }
    }


    if (point) {
      let x = point.pageX;
      let y = point.pageY;

    }

    let vx = point ? point.pageX - rectElem.left : rectElem.width / 2;
    let vy = point ? point.pageY - rectElem.top : rectElem.height / 2;

    let cx = point ? point.pageX - rectParent.left : vx + res.rel.left;
    let cy = point ? point.pageY - rectParent.top : vy + res.rel.top;

    let vxp = vx / rectElem.width;
    let vyp = vy / rectElem.height;
    let cxp = cx / rectParent.width;
    let cyp = cy / rectParent.height;

    res.point = {
      src: point,
      v: {
        x: vx,
        y: vy,
        xp: vxp,
        yp: vyp
      },
      c: {
        x: cx,
        y: cy,
        xp: cxp,
        yp: cyp
      }
    }
  

    

    return res;
  }

    

  //   return res;
  // }

  private  getDimDiff(start: any, end: any) {
    // let se = start.elem;
    // let ee = end.elem;
    // let sp = start.parent;
    // let ep = end.parent;

    let input = {
      elem: {
        start: start.elem,
        end: end.elem
      },
      parent: {
        start: start.parent,
        end: end.parent
      },
      rel: {
        start: start.rel,
        end: end.rel
      },
      scaled: {
        start: start.scaled,
        end: end.scaled
      },
    }

    let res:any = { };
    for (let type of [ "elem", "parent", "rel", "scaled"]) {
      let s = input[type].start;
      let e = input[type].end;

      res[type] = { };
      
      for (let prop of [ "width", "height", "top", "bottom", "left", "right"]) {
        let sv = s[prop];
        let ev = e[prop];
        let diff = ev - sv;

        res[type][prop+ "Label"] =  this.nf.format(sv)  + " -> " +  this.nf.format(ev)  + ", diff: " + this.nf.format(diff) + " ("+this.nf.format(diff / sv * 100.0)+" %)";
        res[type][prop] = diff;
      }
    }

    return res;
    
    // return {
    //   elem: {
    //     width: this.nf.format(ee.width - se.width) + " ("+this.nf.format((ee.width - se.width) / se.width * 100.0)+" %)",
    //     height: this.nf.format(ee.height - se.height),
    //     top: this.nf.format(ee.top - se.top),
    //     bottom: this.nf.format(ee.bottom - se.bottom),
    //     left: this.nf.format(ee.left - se.left),
    //     right: this.nf.format(ee.right - se.right),
    //   },
    //   parent: {
    //     width: this.nf.format(ep.width - sp.width),
    //     height: this.nf.format(ep.height - sp.height),
    //     top: this.nf.format(ep.top - sp.top),
    //     bottom: this.nf.format(ep.bottom - sp.bottom),
    //     left: this.nf.format(ep.left - sp.left),
    //     right: this.nf.format(ep.right - sp.right),
    //   }
    // }

  }

  private constrain(left:number,top:number): ({left:number, top:number}) {
    
    const dims = this.getDimensions(this.viewer)
    
    // let result = { left: left, top: top };
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


  private getAvgPoint(points:({ pageX:number, pageY:number})[]) {
    if (points.length == 0) return;
    let sumX = 0;
    let sumY = 0;

    for (let point of points) {
      sumX += point.pageX;
      sumY += point.pageY;
    }

    return { pageX: sumX / points.length, pageY : sumY / points.length };
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

  private getViewerTransformScale() {
    let tf = getComputedStyle(this.viewer).transform;
    let transformScale = tf == "none" || tf.indexOf("(") < 0 ? 1.0 : parseFloat(tf.substring(tf.indexOf("(")+1, tf.indexOf(",")));
    return transformScale;
  }

  public updateViewerPosition() {
    let viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    this.viewer = document.getElementById('viewer') as HTMLDivElement;

    const dims = this.getDimensions(this.viewer);
    

    let constrain:any = false; // this.constrain(dims.elem.left, dims.elem.top);
    let transformScale = this.getViewerTransformScale();

    console.log("updateViewerPosition, updateLeft: " + (dims.elem.width <= dims.parent.width) + ", updateTop: " + (dims.elem.height <= dims.parent.height) + ", transformScale: " + transformScale + ", dims: ", dims);


    if (dims.elem.width <= dims.parent.width || (constrain && constrain.left != dims.elem.left)) {
      let left = (dims.parent.width - (dims.elem.width / transformScale)) / 2;
      // console.log("updateViewerPosition, left: " + this.viewer.style.left  + " -> " + left);
      this.viewer.style.left = left + "px";
    }
    if (dims.elem.height <= dims.parent.height || (constrain && constrain.top != dims.elem.top)) {
      let top = (dims.parent.height - (dims.elem.height / transformScale)) / 2;
      // console.log("updateViewerPosition, top: " + this.viewer.style.top  + " -> " + top);
      this.viewer.style.top = top + "px";
    }

  }

  private setViewerScale(newScale, options:any = { }) {

    let origin = options.origin;
    let resetTransform = options.resetTransform; 

    let vts = this.getViewerTransformScale();
   
    let dims = this.getDimensions(this.viewer);
    let dimsAfterTransformReset = dims; 

    let reset:any = { left: undefined, top: undefined };

    if (resetTransform && vts != 1.0) {
      // let dims = this.getDimensions(this.viewer);
        reset.left = dims.rel.left; // (parseFloat(getComputedStyle(this.viewer).left) || 0) / vts;
        reset.top = dims.rel.top; // (parseFloat(getComputedStyle(this.viewer).top) || 0) / vts;

        this.viewer.style.transform = `none`;
        this.viewer.style.transformOrigin = `unset`;

        dimsAfterTransformReset = this.getDimensions(this.viewer);

        console.log("resetTransform, vts: " + vts + ", reset: " + reset.left + " / " + reset.top + ", diff: ", this.getDimDiff(dims, dimsAfterTransformReset));
    }

    let viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    this.viewer = document.getElementById('viewer') as HTMLDivElement;

    let PDFViewerApplication: any = (window as any).PDFViewerApplication;
    let currentScale = PDFViewerApplication.pdfViewer.currentScale;
    
    let cr = viewerContainer.getBoundingClientRect();
    let vr = this.viewer.getBoundingClientRect();

    // let dims = this.getDimensions(this.viewer);

    if (origin == undefined) {
      // let originX = this.debugX || dims.parent.width / 2;
      // let originY = this.debugY || dims.parent.height / 2;
      // originX -= dims.elem.left -  dims.parent.left ;  // 676 - (416 - 226) = 
      // originY -= dims.elem.top -  dims.parent.top ;

      // let originX = dims.elem.width / 2;
      // let originY = dims.elem.height / 2;

      // console.log("setViewerScale.origin"
      //   + ", debugX/Y: " + this.nf.format( this.debugX) + " / " +  + this.nf.format( this.debugY)
      //   + ", originX/Y: " + this.nf.format( originX) + " / " +  + this.nf.format( originY)
      //   + ", parent.w/2: " + (dims.parent.width / 2)
      //   + ", elem.w/2: " + (dims.elem.width / 2) 
      //   + ", elem.left: " + dims.elem.left
      //   + ", parent.left: " + dims.parent.left
      // );

      // // let originX = event.pageX - vr.left
      // origin = { x : originX, y: originY};
      origin = { x: dims.elem.width / 2, y: dims.elem.height / 2 };
    }

    let oxp = origin.x / dims.elem.width  ;
    let oyp = origin.y / dims.elem.height ;
   
    console.log("setViewerScale, currentScale: " + currentScale + " -> " + newScale 
      + ", origin: "+ this.nf.format(origin.x) + " ("+this.nf.format(oxp* 100)+") / " + this.nf.format(origin.y) + " ("+this.nf.format(oyp* 100)+")"
      + ", debugX/Y: " + this.nf.format( this.debugX) + " / " +  + this.nf.format( this.debugY)
      +", dims: ", dims);
    

    PDFViewerApplication.pdfViewer._setScale(newScale, true);

    let dimsAfter = this.getDimensions(this.viewer);
    let dimDiff = this.getDimDiff(dims, dimsAfter);

    let dimsCorr:any = {
      left: parseFloat(getComputedStyle(this.viewer).left) || 0,
      top: parseFloat(getComputedStyle(this.viewer).top) || 0,
    }
    dimsCorr.leftDiff = - (dimDiff.elem.width * oxp);
    dimsCorr.topDiff = - (dimDiff.elem.height * oyp);
    
    dimsCorr.leftNext = dimsCorr.left + dimsCorr.leftDiff;
    dimsCorr.topNext = dimsCorr.top + dimsCorr.topDiff;

    if (reset.left) {
      console.log("dimsCorr.leftNext: " + this.nf.format(dimsCorr.leftNext) + " -> " + this.nf.format(reset.left));
      console.log("dimsCorr.topNext: " + this.nf.format(dimsCorr.topNext) + " -> " + this.nf.format(reset.top));
      dimsCorr.leftNext = reset.left;
      dimsCorr.topNext = reset.top;

    }
    

    // let corrDiff = this.getDimDiff(dimsAfter, dimsCorr);

    // this.viewer.style.top = top + "px";



    console.log("dimsAfter: ", dimsAfter.scaled);
    console.log("dimDiff: ", dimDiff.scaled);
    



    console.log("dimsCorr: ", dimsCorr);
    // console.log("corrDiff: ", corrDiff.elem);
    // console.log("beforeCorr: ", this.getDimensions(this.viewer).elem);
    console.log("this.viewer.style.left: " + this.viewer.style.left  + " -> " + dimsCorr.left);
    console.log("this.viewer.style.top: " + this.viewer.style.top  + " -> " + dimsCorr.top);

    this.viewer.style.left = dimsCorr.leftNext + "px";
    this.viewer.style.top = dimsCorr.topNext + "px";

    console.log("afterCorrDiff: ", this.getDimDiff(dimsAfter ,this.getDimensions(this.viewer)).scaled);

  }

  public initializeRelativeCoords(): void {

    let viewerContainer = document.getElementById('viewerContainer') as HTMLDivElement;
    this.viewer = document.getElementById('viewer') as HTMLDivElement;

    this.component.root.nativeElement.classList.add("relative-coords");

    let stfItemHack = document.createElement("div");
    stfItemHack.classList.add("stf__item");
    viewerContainer.appendChild(stfItemHack);




    let onContainerScoll = (event:Event) => {
      //console.log("onContainerScoll: l/t: " + viewerContainer.scrollLeft + " / " + viewerContainer.scrollTop + ", event: " , event);
      if (viewerContainer.scrollLeft != 0 || viewerContainer.scrollTop != 0) viewerContainer.scroll({ left: 0, top: 0})
    }

    viewerContainer.addEventListener('scroll', onContainerScoll);


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
      // this.updateViewerPosition();
    });
    

    let onKeyup = (event:KeyboardEvent) => {
      console.log("onKeyup: event.key: " + event.key);
      let dims = this.getDimensions(this.viewer);
      const PDFViewerApplication: any = (window as any).PDFViewerApplication;

      if (event.key == "q") {
        
       

        this.viewer.style.transform = `none`;
        this.viewer.style.transformOrigin = `unset`;
        this.currentScale = 1.0;

        let dimsAfter = this.getDimensions(this.viewer);
        console.log("dimsAfter: ", dimsAfter.scaled);
        console.log("dimsDiff: ", this.getDimDiff(dims, dimsAfter).scaled);

      } else  if (event.key == "w") {
        let originX = this.debugX || dims.parent.width / 2;
        let originY = this.debugY || dims.parent.height / 2;
        originX -= dims.elem.left -  dims.parent.left ;
        originY -= dims.elem.top -  dims.parent.top ;
        this.currentScale = 1.3;

        console.log("originX/Y: " + originX + " / " + originY + ", scale: " + this.currentScale + "; dims: ", dims);
        console.log("originX/Y (%): " + this.nf.format(originX / dims.elem.width * 100) + " / " + this.nf.format(originY / dims.elem.height * 100));
        

        this.viewer.style.transform = `scale(${this.currentScale})`;
        this.viewer.style.transformOrigin = `${originX}px ${originY}px`;

        let dimsAfter = this.getDimensions(this.viewer);
        console.log("dimsAfter: ", dimsAfter.elem);
        console.log("dimsDiff: ", this.getDimDiff(dims, dimsAfter).elem);

      } else  if (event.key == "e") {

        // this.viewer.style.transform = `none`;
        // this.viewer.style.transformOrigin = `unset`;

        
        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let newScale = currentScale * this.currentScale;

        console.log("currentScale: " + currentScale + " -> " + newScale + ", cs: " + this.currentScale + ", dims: ", dims);
        

        // PDFViewerApplication.pdfViewer._setScale(newScale, true);
        this.setViewerScale(newScale, { resetTransform: true });

        let dimsAfter = this.getDimensions(this.viewer);

        console.log("dimsAfter: ", dimsAfter.elem);
        console.log("dimsDiff: ", this.getDimDiff(dims, dimsAfter).elem);

      // } else  if (event.key == "r") { // Rotate
      } else  if (event.key == "s") {
        let originX = this.debugX || dims.parent.width / 2; 
        let originY = this.debugY || dims.parent.height / 2; 
        originX -= dims.elem.left -  dims.parent.left ;
        originY -= dims.elem.top -  dims.parent.top ;

        // reset pdfViewer.scale
        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let prevScale = currentScale / this.currentScale;
        // console.log("currentScale: " + currentScale + " -> " + prevScale + ", originX/Y: " + originX + " / " + originY);
        console.log("originX/Y: " + originX + " / " + originY + ", scale: " + currentScale + " -> " + prevScale + ", t.cs: " + this.currentScale + "; dims: ", dims);
        console.log("originX/Y (%): " + (originX / dims.elem.width) + " / " + (originY / dims.elem.height));
        
        // PDFViewerApplication.pdfViewer._setScale(prevScale, true);
        if (currentScale != prevScale) this.setViewerScale(prevScale);


        originX = this.debugX || dims.parent.width / 2; 
        originY = this.debugY || dims.parent.height / 2; 
        let dimsAfter = this.getDimensions(this.viewer);
        originX -= dimsAfter.elem.left -  dimsAfter.parent.left ;
        originY -= dimsAfter.elem.top -  dimsAfter.parent.top ;

        console.log("originX/Y: " + originX + " / " + originY + ", scale: " + currentScale + " -> " + prevScale + ", t.cs: " + this.currentScale + "; dimsAfter: ", dimsAfter);
        console.log("originX/Y (%): " + (originX / dimsAfter.elem.width) + " / " + (originY / dimsAfter.elem.height));

        this.viewer.style.transform = `scale(${this.currentScale})`;
        this.viewer.style.transformOrigin = `${originX}px ${originY}px`;

      } else  if (event.key == "t") {

        // bare PDF.js-zoom
        let originX = this.debugX || dims.parent.width / 2;
        let originY = this.debugY || dims.parent.height / 2;
        originX -= dims.elem.left -  dims.parent.left ;
        originY -= dims.elem.top -  dims.parent.top ;

        if (this.currentScale == 1.0) this.currentScale = 1.3;

        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let newScale = currentScale * this.currentScale;
        this.setViewerScale(newScale, { origin: { x: originX, y: originY } });

        
        
      } else  if (event.key == "y") {
       
        let originX = this.debugX || dims.parent.width / 2;
        let originY = this.debugY || dims.parent.height / 2;
        originX -= dims.elem.left -  dims.parent.left ;
        originY -= dims.elem.top -  dims.parent.top ;

        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let prevScale = currentScale / this.currentScale;

        console.log("y, currentScale: " + currentScale + "; prevScale: " + prevScale);
        // PDFViewerApplication.pdfViewer._setScale(prevScale, true);
        this.setViewerScale(prevScale, { origin: { x: originX, y: originY } });
        // this.currentScale = 1.0;

        // let dimsAfter = this.getDimensions(this.viewer);

        // console.log("dimsAfter: ", dimsAfter.elem);
        // console.log("dimsDiff: ", this.getDimDiff(dims, dimsAfter).elem);
      
        
      } else  if (event.key == "u") {
        this.updateViewerPosition();

      } else  if (event.key == "i") {
        let corrLeft = 200;
        console.log("beforeCorr: ", this.getDimensions(this.viewer).elem);
        console.log("this.viewer.style: ", this.viewer.style);
        console.log("this.viewer.style.left: " + this.viewer.style.left  + " -> " + corrLeft);
        this.viewer.style.left = corrLeft + "px";
        console.log("afterCorr: ", this.getDimensions(this.viewer).elem);
        console.log("this.viewer.style: ", this.viewer.style);

      } else  if (event.key == "o") {

        let originX = this.debugX || dims.parent.width / 2; 
        let originY = this.debugY || dims.parent.height / 2; 
        originX -= dims.elem.left -  dims.parent.left ;
        originY -= dims.elem.top -  dims.parent.top ;

        console.log("originX/Y: " + originX + " / " + originY + ", scale: " + this.currentScale);

        this.viewer.style.transform = `scale(${this.currentScale})`;
        this.viewer.style.transformOrigin = `${originX}px ${originY}px`;

      } else  if (event.key == "p") {
        

        console.log("dims: ", dims);
        // let originX = this.debugX || dims.parent.width / 2; 
        // let originY = this.debugY || dims.parent.height / 2; 
       

        console.log("getViewerTransformScale: ", this.getViewerTransformScale());

        this.viewer.style.transform = `none`;
        this.viewer.style.transformOrigin = `unset`;

        let dimsAfter = this.getDimensions(this.viewer);
        console.log("dimsAfter: ", dimsAfter);
        console.log("dimsDiff: ", this.getDimDiff(dims, dimsAfter));


      } else  if (event.key == "f") {
        
        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let newScale = currentScale * this.next.scale;

        this.setViewerScale(newScale, { resetTransform: true });

      } else  if (event.key == "d") {
        
        console.log("dims: ", this.getDimensions(this.viewer));

      } else  if (event.key == "z") {

        let currentScale = PDFViewerApplication.pdfViewer.currentScale;
        let newScale = currentScale / this.next.scale;

        this.setViewerScale(newScale);
        // console.log("dims: ", this.getDimensions(this.viewer).elem);
      } else  if (event.key == "x") {
        // console.log("dims: ", this.getDimensions(this.viewer).elem);
      }
    };


    window.addEventListener("keyup", onKeyup);
      

    if (!this.isMobile()) {
      // viewerContainer.classList.add("pinch-to-zoom");
      // console.log("nativeElement: ", this.component.root.nativeElement);
      

      let nf = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }); 

      const containerRect = viewerContainer.getBoundingClientRect();
     
      let PDFViewerApplication: any = (window as any).PDFViewerApplication;


      // let startX = 0, startY = 0, startLeft = 0, startTop = 0;
      
      // let win = window as any;
      let downEvent = (event:MouseEvent) => {
        
        let isInside = this.isInsideContainer([event])
        if (!isInside) return true; 

        const viewerRect = this.viewer.getBoundingClientRect();
        let pageX = event.pageX - containerRect.left;
        let pageY = event.pageY - containerRect.top;

        let viewerX = event.pageX - viewerRect.left;
        let viewerY = event.pageY - viewerRect.top;

        let dims = this.getDimensions(this.viewer, event);
        
        // this.zoomToPoint(event, event.pageX, event.pageY);
        this.debugPoint(pageX, pageY);
        this.debugPoint(viewerX, viewerY, true);

        this.startX = pageX;
        this.startY = pageY;
        
        this.startLeft = parseFloat(getComputedStyle(this.viewer).left) || 0;
        this.startTop = parseFloat(getComputedStyle(this.viewer).top) || 0

        console.log("mousedown: " 
          + nf.format(pageX) + " / " + nf.format(pageY) 
          + ", event.px/y: " + nf.format(event.pageX) + " / " + nf.format(event.pageY) 
          + ", sl/t: " + nf.format(this.startLeft) + " / " + nf.format(this.startTop) 
          + ", viewerX/Y: " + nf.format(viewerX) + " / " + nf.format(viewerY) 
          + ", viewerX/Y%: " + nf.format(viewerX / dims.elem.width * 100) + " / " + nf.format(viewerY / dims.elem.height * 100) 
          + ", isInside: " + isInside
          + ", dims: ", dims
          , ", rel: " + nf.format(dims.point.v.xp * 100)  + " / " + nf.format(dims.point.v.yp * 100) 
        );

        // let constrain = this.constrain(startLeft, startTop);

        document.addEventListener('mousemove', moveEvent);

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
      }
      let moveEvent = (event:MouseEvent) => {
        const viewerRect = this.viewer.getBoundingClientRect();
        let pageX = event.pageX - containerRect.left ;
        let pageY = event.pageY - containerRect.top;

        this.debugPoint(pageX, pageY);

        let diffX = pageX - this.startX;
        let diffY = pageY - this.startY;

        let left = this.startLeft + diffX;
        let top = this.startTop + diffY;

        let constrain = this.constrain(left, top);
        left = constrain.left;
        top = constrain.top;


        this.viewer.style.left = left + "px";
        this.viewer.style.top = top + "px";


        console.log("mousemove: " 
          + nf.format(pageX) + " / " + nf.format(pageY)
          + ", diff: " + nf.format(diffX) + " / " + nf.format(diffY)
          + ", l/t: " + nf.format(left) + " / " + nf.format(top)
          
        );

        // left = constrain.left;
        // top = constrain.top;

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();

      }
      let upEvent = (event:MouseEvent) => {
        let isInside = this.isInsideContainer([event]);
        console.log("mouseup: " + nf.format(event.pageX) + " / " + nf.format(event.pageY) + "; inside: " + isInside);
        document.removeEventListener("mousemove", moveEvent);
        // document.removeEventListener("mouseup", upEvent);

        // this.startX = 0, this.startY = 0;
        if (!isInside) return; 

        this.resetPinchZoomParams();

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
      }

      
      let onWheel = (event:Event) => {
        console.log("onWheel: event: ", event);
        //TODO: Kan brukes for å sjekke om det zoomes via hjulet på musa.
      };

      

      document.addEventListener('mousedown', downEvent);
      document.addEventListener('mouseup', upEvent);

     
      window.addEventListener("wheel", onWheel, { passive: false });
      
      
      // let pages = document.querySelectorAll(".page");
      // console.log("pages " + pages.length);
      




     


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
