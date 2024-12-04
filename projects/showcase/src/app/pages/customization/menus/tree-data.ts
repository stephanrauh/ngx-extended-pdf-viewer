import { TreeNode } from './tree/tree-node.type';

export const TOOLBAR: TreeNode[] = [
  {
    name: '<pdf-toolbar>',
    content: 'customToolbar',
    children: [
      {
        name: ' <div id="toolbarViewer">',
        children: [
          {
            name: '<div id="toolbarViewerLeft">',
            children: [
              { name: '<pdf-toggle-sidebar>', id: 'sidebarToggle' },
              { name: '<pdf-find-button>', id: 'viewFind' },
              {
                name: '<pdf-paging-area>',
                children: [
                  { name: '<pdf-first-page>', id: 'primaryFirstPage' },
                  { name: '<pdf-previous-page>', id: 'previous' },
                  { name: '<pdf-page-number>', id: 'pageNumber' },
                  { name: '<pdf-next-page>', id: 'next' },
                  { name: '<pdf-last-page>', id: 'primaryLastPage' },
                ],
              },
            ],
          },
          {
            name: '<pdf-zoom-toolbar>',
            children: [
              { name: '<pdf-zoom-out>', id: 'zoomOut' },
              { name: '<pdf-zoom-in>', id: 'zoomIn' },
              { name: '<pdf-zoom-dropdown>', id: 'scaleSelect' },
            ],
          },
          {
            name: '<div id="toolbarViewerRight">',
            children: [
              { name: '<pdf-document-properties>', id: 'documentProperties' },
              { name: '<pdf-no-spread>', id: 'spreadNone' },
              { name: '<pdf-odd-spread>', id: 'spreadOdd' },
              { name: '<pdf-even-spread>', id: 'spreadEven' },
              { name: '<pdf-single-page-mode>', id: 'scrollPage' },
              { name: '<pdf-vertical-scroll-mode>', id: 'scrollVertical' },
              { name: '<pdf-horizontal-scroll>', id: 'scrollHorizontal' },
              { name: '<pdf-wrapped-scroll-mode>', id: 'scrollWrapped' },
              { name: '<pdf-infinite-scroll>', id: 'infiniteScroll' },
              { name: '<pdf-book-mode>', id: 'book-mode' },
              { name: '<pdf-hand-tool>', id: 'primaryCursorHandTool' },
              { name: '<pdf-select-tool>', id: 'primaryCursorSelectTool' },
              { name: '<pdf-rotate-page-cw>', id: 'primaryPageRotateCw' },
              { name: '<pdf-rotate-page-ccw>', id: 'primaryPageRotateCcw' },
              { name: '<pdf-presentation-mode>', id: 'presentationMode' },
              { name: '<pdf-open-file>', id: 'openFile' },
              { name: '<pdf-print>', id: 'print' },
              { name: '<pdf-download>', id: 'download' },
              {
                name: '<pdf-editor>',
                children: [
                  { name: '<pdf-stamp-editor>', id: 'editorStamp' },
                  { name: '<pdf-text-editor>', id: 'editorFreeText' },
                  { name: '<pdf-ink-editor>', id: 'editorInk' },
                ],
              },
              {
                name: '<pdf-toggle-secondary-toolbar>',
                id: 'secondaryToolbarToggle',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const SECONDARY_TOOLBAR: TreeNode[] = [
  {
    name: '<pdf-secondary-toolbar>',
    content: 'customSecondaryToolbar',
    children: [
      {
        name: '<div class="secondaryToolbar hidden doorHangerRight">',
        id: 'secondaryToolbar',
        children: [
          {
            name: '<button title="Switch to Presentation Mode">',
            id: 'secondaryPresentationMode',
          },
          { name: '<button title="Open (file)">', id: 'secondaryOpenFile' },
          { name: '<button title="Print">', id: 'secondaryPrint' },
          { name: '<button title="Download">', id: 'secondaryDownload' },
          { name: '<button title="Go to First Page">', id: 'firstPage' },
          { name: '<button title="Go to Last Page">', id: 'lastPage' },
          { name: '<button title="Rotate Clockwise">', id: 'pageRotateCw' },
          {
            name: '<button title="Rotate Counterclockwise">',
            id: 'pageRotateCcw',
          },
          {
            name: '<button title="Enable Text Selection Tool">',
            id: 'cursorSelectTool',
          },
          { name: '<button title="Enable Hand Tool">', id: 'cursorHandTool' },
          {
            name: '<button title="Use Vertical Scrolling">',
            id: 'scrollVertical',
          },
          {
            name: '<button title="Use Horizontal Scrolling">',
            id: 'scrollHorizontal',
          },
          {
            name: '<button title="Use Wrapped Scrolling">',
            id: 'scrollWrapped',
          },
          {
            name: '<button title="Do not join page spreads">',
            id: 'spreadNone',
          },
          {
            name: '<button title="Join page spreads starting with odd-numbered pages">',
            id: 'spreadOdd',
          },
          {
            name: '<button title="Join page spreads starting with even-numbered pages">',
            id: 'spreadEven',
          },
          {
            name: '<button title="Document Properties…">',
            id: 'documentProperties',
          },
        ],
      },
    ],
  },
];

export const FINDBAR: TreeNode[] = [
  {
    name: '<pdf-findbar>',
    expanded: true,
    children: [
      {
        name: '<div class="findbar hidden doorHanger" ...>',
        id: 'findbar',
        content: 'customFindbarButtons',
        children: [
          {
            name: '<pdf-find-input-area>',
            content: 'customFindbarInputArea',
            children: [
              {
                name: '<pdf-search-input-field>',
                id: 'findInput / findInputMultiline',
              },
              { name: '<pdf-find-previous>', id: 'findPrevious' },
              { name: '<pdf-find-next>', id: 'findNext' },
            ],
          },
          { name: '<pdf-find-highlight-all>', id: 'findHighlightAll' },
          { name: '<pdf-find-highlight-all>', id: 'findCurrentPage' },
          { name: ' <pdf-find-match-case>', id: 'findMatchCase' },
          { name: '<pdf-find-entire-word>', id: 'findEntireWord' },
          { name: '<pdf-match-diacritics>', id: 'findMatchDiacritics' },
          { name: '<pdf-find-results-count>', id: 'findResultsCount' },
          { name: '<pdf-findbar-message-container>', id: 'findMsg' },
        ],
      },
    ],
  },
];
