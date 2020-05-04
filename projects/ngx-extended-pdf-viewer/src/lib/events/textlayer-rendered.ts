export interface PageViewport {
  viewBox: Array<number>;
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
}

export interface TextLayerBuilder {
    textLayerDiv: HTMLDivElement;
    textContentItemsStr: Array<String>;
    renderingDone: boolean;
    textDivs: Array<HTMLSpanElement>;
    viewPort: PageViewport;
}

export interface TextLayerRenderedEvent {
  source: TextLayerBuilder;
  pageNumber: number;
  numTextDivs: number;
}
