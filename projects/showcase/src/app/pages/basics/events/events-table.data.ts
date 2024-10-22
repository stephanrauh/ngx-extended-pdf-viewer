/* tslint:disable:max-line-length */
import { Settings } from 'angular2-smart-table';

export const eventsSettings: Settings = {
  columns: {
    event: {
      title: 'Event',
      type: 'text',
    },
    description: {
      title: 'Description',
      type: 'html',
    },
  },
  actions: false,
  hideSubHeader: false,
  pager: {
    display: false,
    perPage: 5000,
  },
};

export const events = [
  {
    event: 'annotationEditorEvent',
    description: 'This event is fired when the user add, edits, or removes an editor annotation',
  },
  {
    event: 'afterPrint',
    description:
      "This event is fired after the print jov has either been sent to the printer, or after the user has cancelled the print job. Note there's no way to tell printing from aborting the print.",
  },
  {
    event: 'beforePrint',
    description:
      "This event is fired when the print is initiated. Note that this simply means the print preview window is opened. There's no way to predict if the user is actually going to print.",
  },
  {
    event: 'currentZoomFactor',
    description:
      "Fires each time the viewer changes the zoom level. The parameter is the numeric scale factor. Note that it's not a percentage; instead, `[zoom]=\"'100%'\"` results in `(currentZoomFactor)` sending a value of `1.0`. This event seems to fire often enough to make it reliable for detecting the current zoom factor all the time.",
  },
  {
    event: 'pageRender',
    description: 'Fires each time a page is about to be rendered. Emits an instance of `PageRenderEvent`.',
  },
  {
    event: 'pageRendered',
    description:
      'Fires each time a page has finished rendering. Emits an instance of `PageRenderedEvent`. The `pageNumber` attribute tells you which page has been rendered. When you receive this event, you can safely manipulate the page image or the text layer.',
  },
  {
    event: 'annotationLayerRendered',
    description:
      'Fires each time a page has finished rendering the annotation layer (i.e. forms or the stuff added by the editor buttons). Emits an instance of `AnnotationLayerRenderedEvent`. The `pageNumber` attribute tells you which page has been rendered. When you receive this event, you can safely add text, images, or drawings to the annotation layer.',
  },
  {
    event: 'pagesLoaded',
    description:
      '_Broken since version 19!_ Emits the number of pages when a document is loaded; more precisely: emits an instance of `PagesLoadedEvent`. The attribute `pagesCount` tells how many pages the document has. The source attribute contains a reference to the PDF viewer. You can also use this event to detect when a document has been loaded.',
  },
  {
    event: 'pdfDownloaded',
    description:
      'Fires when a user downloads a document. Strictly speaking, it fires when they click the "download" button. Caveat: Even if the user cancels the download, the event is fired.',
  },
  {
    event: 'pdfLoaded',
    description:
      'Emits when the PDF file has been load successfully. The parameter \\$event is an `PdfLoadedEvent`, containing the number of pages of the PDF file.',
  },
  {
    event: 'pdfLoadingFailed',
    description:
      'Emits when trying to load and open a PDF file has failed. The parameter `$event` is an `Error`, which may or may not contain the stacktrace and additional info about the root cause of the error.',
  },
  {
    event: 'pdfLoadingStarts',
    description: 'Emits when the PDF file is going to load soon.',
  },
  {
    event: 'progress',
    description:
      'Emits while the PDF file is loading (`type="load"`) or printing (`type="print"`) Note that the events objects are slightly different between printing and loading. To avoid confusion, check the `type` field of the `ProgressBarEvent` or rely on the field `percent`, which is populated in both cases.',
  },
  {
    event: 'textLayerRendered',
    description: 'This callback is called when the text layer is rendered.',
  },
  {
    event: 'updateFindMatchesCount',
    description:
      'This event is call during a find operation. Note that it can be called hundreds or even thousands of time, due to the asynchronous implementation of the find algorithm. It sends a `FindFindResultMatchesCount`.',
  },
  {
    event: 'updateFindState',
    description:
      'This event is called during the find operations. It sends a `FindState`(i.e. `FindState.FOUND`, `FindState.NOT_FOUND`, `FindState.PENDING` or `FindState.WRAPPED`).',
  },
  {
    event: 'zoomChange',
    description:
      "`(zoomChange)` is intended to fire when the user changes the zoom setting. If the zoom setting because of a different reason, such as resizing the window, the event does not fire. That's the difference to `(currentZoomFactor)`, which fires on every zoom event. In practice, it's a bit difficult to distinguish the two types of events, so chances are `(zoomChange)` fires too often or too seldom. However, when it fires, it fires a numeric value, basically the percentage without the percent character. It never fires when the zoom dropdown is set to `[zoom]=\"'auto'\"`, `'page-actual'\"`, `\"'page-fit'\"` or `\"'page-width'\"`. That also applies if it was the user who changed the dropdown. Putting it in simpler words: the event is not fired if the zoom is a string value.",
  },
  {
    event: 'annotationEditorModeChanged',
    description:
      'This event fires after activating or hiding on of the editors. `$event.mode` tells you what happened precisely: 0=editor has been closed; 3=text editor, 15=ink draw editor.',
  },
];
