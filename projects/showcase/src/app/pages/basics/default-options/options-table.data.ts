import { Settings } from 'angular2-smart-table';

export const optionsSettings: Settings = {
  columns: {
    attribute: {
      title: 'Attribute',
      type: 'text',
    },
    description: {
      title: 'Description',
      type: 'html',
    },
    coveredBy: {
      title: 'Covered By',
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

export const availableOptions = [
  {
    attribute: 'enableHWA',
    description:
      "Enable hardware acceleration. The default value is <code>true</code>. If you're running into rendering issues, try setting this flag to <code>false</code>. Note that this flag is only available in pdf.js 4.4 and above, and that it's the exact opposite of the flag <code>activateWillReadFrequentlyFlag</code> that has been removed in version 21.",
    coveredBy: '',
  },
  {
    attribute: 'assetsFolder',
    description:
      'URL of the assets folder (relative to the <code>index.html</code>). Changing this attribute modifies the value of the default options <code>cMapUrl</code> and <code>workerSrc</code>.',
    coveredBy: '',
  },
  {
    attribute: 'annotationEditorMode',
    description: '',
    coveredBy: '',
  },
  {
    attribute: 'annotationMode',
    description: 'Setting this flag to 0 disables forms.',
    coveredBy: '',
  },
  {
    attribute: 'defaultZoomDelay',
    description:
      "When you zoom a page using a pinch gesture, it's initially zoomed using fast but inaccurate CSS. After the <code>defaultZoomDelay</code>, the page is re-rendered. The default is 400 milliseconds.",
    coveredBy: '',
  },
  {
    attribute: 'cursorToolOnLoad',
    description:
      'What happens when you click and move the mouse while keeping the mouse button pressed? <ul><li>select: 0</li><li>hand tool: 1 (i.e. move the PDF with the mouse)</li> <li>zoom: 2</li> </ul>',
    coveredBy: '',
  },
  {
    attribute: 'disablePageLabels',
    description: 'Ignore the page numbers defined by the author of the PDF file; default value: <code>false</code>',
    coveredBy: '',
  },
  {
    attribute: 'disableHistory',
    description:
      'Stop storing the user settings of PDF files; default value: <code>false</code>. Note that this flag does something different from in pdf.js. With ngx-extended-pdf-viewer, it disables using the <code>LocalStore</code> entirely.',
    coveredBy: '',
  },
  {
    attribute: 'enablePermissions',
    description:
      'Evaluate the permission granted by the author of the PDF file; currently only the "copy" permission is implemented; default value: <code>false</code>',
    coveredBy: '',
  },
  {
    attribute: 'enablePrintAutoRotate',
    description: 'Rotates landscape page to portrait page when printing; default value: <code>true</code>',
    coveredBy: '',
  },
  {
    attribute: 'externalLinkRel',
    description: 'Specifies the <code>rel</code> attribute for external links. Defaults to stripping the referrer',
    coveredBy: '',
  },
  {
    attribute: 'externalLinkTarget',
    description: 'Documented <a href="/link">here</a>',
    coveredBy: '',
  },
  {
    attribute: 'ignoreDestinationZoom',
    description:
      'Ignore the zoom argument in the destination array. Among other things, this flag is useful if the PDF author has added the zoom factor to the table of contents. You can see this in the "simple demo": each time you click an entry of the table of contents, the zoom is set to "page fit". Setting <code>ignoreDestinationZoom=true</code> prevents this. The default value is <code>false</code>.',
    coveredBy: '',
  },
  {
    attribute: 'imageResourcesPath',
    description: 'Path for image resources, mainly for annotation icons. Include trailing slash',
    coveredBy: '',
  },
  {
    attribute: 'locale',
    description:
      'Allows you to set the default language of the pdf viewer. However, the recommended way to do this in ngx-extended-pdf-viewer is using the attribute <code>[language]="\'pl\'"</code>.',
    coveredBy: '',
  },
  {
    attribute: 'maxCanvasPixels',
    description:
      'The maximum supported canvas size in total pixels, i.e. width * height. Use -1 for no limit. The default value is 4096 * 4096 (16 mega-pixels). The canvas size is also limited by your browser.',
    coveredBy: '',
  },
  {
    attribute: 'forcePageColors',
    description: 'Not supported by ngx-extended-pdf-viewer',
    coveredBy: '',
  },
  {
    attribute: 'pageColorsBackground',
    description: 'Not supported by ngx-extended-pdf-viewer',
    coveredBy: '',
  },
  {
    attribute: 'pageColorsForeground',
    description: 'Not supported by ngx-extended-pdf-viewer',
    coveredBy: '',
  },
  {
    attribute: 'rangeChunkSize',
    description:
      "Let's you fine-tune page-loading by defining the size of the chunks that are loaded. The default value is 65536 bytes. Modify this setting only when you know what you're doing.",
    coveredBy: '',
  },
  {
    attribute: 'cMapPacked',
    description: 'Specifies if the Adobe CMaps are binary packed or not; the default value is <code>true</code>',
    coveredBy: '',
  },
  {
    attribute: 'cMapUrl',
    description:
      "URL of the CMap files; ngx-extended-pdf-viewer ships with the CMap files, so usually you can stick with the default value. Change this value if your application doesn't run in the root folder. More precisely, ngx-extended-pdf-viewer computes the URL automatically from the default option <code>assetsFolder</code>, so in general it's better to modify <code>assetsFolder</code>.",
    coveredBy: '',
  },
  {
    attribute: 'disableAutoFetch',
    description:
      "Caveat: this feature seems to be broken.<br> Disable pre-fetching of PDF file data. When range requests are enabled PDF.js will automatically keep fetching more data even if it isn't needed to display the current page. The default value is <code>false</code>. NOTE: It is also necessary to disable streaming, see below, in order for disabling of pre-fetching to work correctly.",
    coveredBy: '',
  },
  {
    attribute: 'disableFontFace',
    description:
      'By default, fonts are converted to OpenType fonts and loaded via <code>@font-face</code> rules. If disabled, fonts will be rendered using a built-in font renderer that constructs the glyphs with primitive path commands. The default value is <code>false</code>.',
    coveredBy: '',
  },
  {
    attribute: 'disableRange',
    description:
      'Caveat: this feature seems to be broken.<br>Disable range request loading of PDF files. When enabled, and if the server supports partial content requests, then the PDF will be fetched in chunks. The default value is <code>false</code>.',
    coveredBy: '',
  },
  {
    attribute: 'disableStream',
    description: 'Disable streaming of PDF file data. By default, PDF.js attempts to load PDF files in chunks. The default value is <code>false</code>.',
    coveredBy: '',
  },
  {
    attribute: 'docBaseUrl',
    description:
      "The base URL used when a link or an outline item uses a relative URL. These elements are supposed to use absolute URLs, but if they don't, use <code>docBaseUrl</code> as a work-around.",
    coveredBy: '',
  },
  {
    attribute: 'fontExtraProperties',
    description:
      'Include additional properties, which are unused during rendering of PDF documents, when exporting the parsed font data from the worker-thread. This may be useful for debugging purposes (and backwards compatibility), but note that it will lead to increased memory usage. The default value is <code>false</code>.',
    coveredBy: '',
  },
  {
    attribute: 'isEvalSupported',
    description:
      'Determines if we can evaluate strings as JavaScript. Primarily used to improve performance of font rendering, and when parsing PDF functions. The default value is <code>true</code>.',
    coveredBy: '',
  },
  {
    attribute: 'maxImageSize',
    description:
      "The maximum allowed image size in total pixels, i.e. width * height. Images above this value will not be rendered. Use -1 for no limit, which is also the default value. Note that the browser also limits the image size. ngx-extended-pdf-viewer tries to reduce the size of images that are larger than the browser allows, but this doesn't always work.",
    coveredBy: '',
  },
  {
    attribute: 'scrollModeOnLoad',
    description: 'Default scroll direction: <ul> <li>VERTICAL: 0 (default value)</li> <li>HORIZONTAL: 1</li> <li>WRAPPED: 2</li></ul>',
    coveredBy: '',
  },
  {
    attribute: 'viewOnLoad',
    description:
      'Tries to restore the settings of the last PDF file; almost every setting is overwritten by the attributes of ngx-extended-pdf-viewer, so <code>viewOnLoad</code> is probably useless. <ul> <li>PREVIOUS = 0 (default value).</li> <li>INITIAL = 1</li></ul>',
    coveredBy: '',
  },
  {
    attribute: 'workerPort',
    description:
      "Port of the URL of the <code>worker.min.js</code> file; used in combination with <code>workerSrc</code>; you don't need this option because the library is bundled with and loaded by ngx-extended-pdf-viewer",
    coveredBy: '',
  },
  {
    attribute: 'workerSrc',
    description:
      "URL of the worker file. By default, it's <code>./assets/pdf.worker-x.y.z.min.js</code>. You can modify this option if your worker file is at a different location or if the resolution of the relative path doesn't work for some reason. This value can either be a string or a lambda. The default implementation takes <code>pdfDefaultOptions.assetsFolder</code>, <code>[minifiedJSLibraries]</code>, and <code>[forceUsingLegacyES5]</code> into account to determine the path.",
    coveredBy: '<code>minifiedJSLibraries</code> and <code>assetsFolder</code>',
  },
  {
    attribute: 'doubleTapZoomFactor',
    description:
      'Tapping twice (or clicking twice) on a PDF file enlarges it. By default, the target zoom is <code>"page-width"</code>. You can use this attribute to use a different zoom factor, such as <code>"150%"</code>.',
    coveredBy: '',
  },
  {
    attribute: 'doubleTapZoomsInHandMode',
    description: 'By default, this toggle activates the double-tap zoom feature in hand mode. Set it to false to deactivate it.',
    coveredBy: '',
  },
  {
    attribute: 'doubleTapZoomsInTextSelectionMode',
    description: 'By default, this toggle deactivates the double-tap zoom feature in hand mode. Set it to true to activate it.',
    coveredBy: '',
  },
  {
    attribute: 'doubleTapResetsZoomOnSecondDoubleTap',
    description:
      "By default, the second double-tap doesn't do anything. Setting this toggle to true causes the double-tap to toggle between an enlarged scale and the previous scale.",
    coveredBy: '',
  },
  {
    attribute: 'enableXfa',
    description: 'Enables support for XFA forms. Since pdf.js 2.11, this feature is active by default.',
    coveredBy: '',
  },
  {
    attribute: 'defaultCacheSize',
    description:
      "Maximum number of rendered pages. Reducing this number may help you if you're running on tight memory requirements. By default, ngx-extended-pdf-viewer keeps up to 50 pages in memory.",
    coveredBy: '',
  },
  {
    attribute: 'defaultUrl',
    description: 'Covered by <code>[src]</code>',
    coveredBy: '<code>[src]</code>',
  },
  {
    attribute: 'defaultZoomValue',
    description: 'Covered by <code>[zoom]</code>',
    coveredBy: '<code>[zoom]</code>',
  },
  {
    attribute: 'printResolution',
    description: 'Covered by <code>[printResolution]</code>',
    coveredBy: '<code>[printResolution]</code>',
  },
  {
    attribute: 'sidebarViewOnLoad',
    description: 'Covered by <code>[sidebarVisible]</code>',
    coveredBy: '<code>[sidebarVisible]</code>',
  },
  {
    attribute: 'spreadModeOnLoad',
    description: 'Covered by <code>[spread]</code>',
    coveredBy: '<code>[spread]</code>',
  },
  {
    attribute: 'textLayerMode',
    description: 'Covered by <code>[textLayer]</code>',
    coveredBy: '<code>[textLayer]</code>',
  },
  {
    attribute: 'verbosity',
    description: 'Covered by <code>[logLevel]</code>',
    coveredBy: '<code>[logLevel]</code>',
  },
];
