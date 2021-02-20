/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "PDFViewerApplicationOptions", ({
  enumerable: true,
  get: function get() {
    return _app_options.AppOptions;
  }
}));
Object.defineProperty(exports, "PDFViewerApplication", ({
  enumerable: true,
  get: function get() {
    return _app.PDFViewerApplication;
  }
}));

var _app_options = __webpack_require__(1);

var _app = __webpack_require__(3);

var pdfjsVersion = '2.7.673';
var pdfjsBuild = 'e50f03ecd';
window.PDFViewerApplication = _app.PDFViewerApplication;
window.PDFViewerApplicationOptions = _app_options.AppOptions;

if (!HTMLCollection.prototype[Symbol.iterator]) {
  HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

(function () {
  if (typeof window.CustomEvent === "function") {
    return;
  }

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

;
;
{
  __webpack_require__(170);
}
;
{
  __webpack_require__(176);
}

function getViewerConfiguration() {
  return {
    appContainer: document.body,
    mainContainer: document.getElementById("viewerContainer"),
    viewerContainer: document.getElementById("viewer"),
    eventBus: null,
    toolbar: {
      container: document.getElementById("toolbarViewer"),
      numPages: document.getElementById("numPages"),
      pageNumber: document.getElementById("pageNumber"),
      scaleSelectContainer: document.getElementById("scaleSelectContainer"),
      scaleSelect: document.getElementById("scaleSelect"),
      customScaleOption: document.getElementById("customScaleOption"),
      previous: document.getElementById("previous"),
      next: document.getElementById("next"),
      zoomIn: document.getElementById("zoomIn"),
      zoomOut: document.getElementById("zoomOut"),
      viewFind: document.getElementById("viewFind"),
      openFile: document.getElementById("openFile"),
      print: document.getElementById("print"),
      presentationModeButton: document.getElementById("presentationMode"),
      download: document.getElementById("download"),
      viewBookmark: document.getElementById("viewBookmark")
    },
    secondaryToolbar: {
      toolbar: document.getElementById("secondaryToolbar"),
      toggleButton: document.getElementById("secondaryToolbarToggle"),
      toolbarButtonContainer: document.getElementById("secondaryToolbarButtonContainer"),
      presentationModeButton: document.getElementById("secondaryPresentationMode"),
      openFileButton: document.getElementById("secondaryOpenFile"),
      printButton: document.getElementById("secondaryPrint"),
      downloadButton: document.getElementById("secondaryDownload"),
      viewBookmarkButton: document.getElementById("secondaryViewBookmark"),
      firstPageButton: document.getElementById("firstPage"),
      lastPageButton: document.getElementById("lastPage"),
      pageRotateCwButton: document.getElementById("pageRotateCw"),
      pageRotateCcwButton: document.getElementById("pageRotateCcw"),
      cursorSelectToolButton: document.getElementById("cursorSelectTool"),
      cursorHandToolButton: document.getElementById("cursorHandTool"),
      scrollVerticalButton: document.getElementById("scrollVertical"),
      scrollHorizontalButton: document.getElementById("scrollHorizontal"),
      scrollWrappedButton: document.getElementById("scrollWrapped"),
      spreadNoneButton: document.getElementById("spreadNone"),
      spreadOddButton: document.getElementById("spreadOdd"),
      spreadEvenButton: document.getElementById("spreadEven"),
      documentPropertiesButton: document.getElementById("documentProperties")
    },
    fullscreen: {
      contextFirstPage: document.getElementById("contextFirstPage"),
      contextLastPage: document.getElementById("contextLastPage"),
      contextPageRotateCw: document.getElementById("contextPageRotateCw"),
      contextPageRotateCcw: document.getElementById("contextPageRotateCcw")
    },
    sidebar: {
      outerContainer: document.getElementById("outerContainer"),
      viewerContainer: document.getElementById("viewerContainer"),
      toggleButton: document.getElementById("sidebarToggle"),
      thumbnailButton: document.getElementById("viewThumbnail"),
      outlineButton: document.getElementById("viewOutline"),
      attachmentsButton: document.getElementById("viewAttachments"),
      layersButton: document.getElementById("viewLayers"),
      thumbnailView: document.getElementById("thumbnailView"),
      outlineView: document.getElementById("outlineView"),
      attachmentsView: document.getElementById("attachmentsView"),
      layersView: document.getElementById("layersView"),
      outlineOptionsContainer: document.getElementById("outlineOptionsContainer"),
      currentOutlineItemButton: document.getElementById("currentOutlineItem")
    },
    sidebarResizer: {
      outerContainer: document.getElementById("outerContainer"),
      resizer: document.getElementById("sidebarResizer")
    },
    findBar: {
      bar: document.getElementById("findbar"),
      toggleButton: document.getElementById("viewFind"),
      findField: document.getElementById("findInput"),
      findFieldMultiline: document.getElementById("findInputMultiline"),
      highlightAllCheckbox: document.getElementById("findHighlightAll"),
      caseSensitiveCheckbox: document.getElementById("findMatchCase"),
      entireWordCheckbox: document.getElementById("findEntireWord"),
      findMultipleSearchTextsCheckbox: document.getElementById("findMultipleSearchTexts"),
      ignoreAccentsCheckbox: document.getElementById("findIgnoreAccents"),
      fuzzyCheckbox: document.getElementById("findFuzzy"),
      findMsg: document.getElementById("findMsg"),
      findResultsCount: document.getElementById("findResultsCount"),
      findPreviousButton: document.getElementById("findPrevious"),
      findNextButton: document.getElementById("findNext")
    },
    passwordOverlay: {
      overlayName: "passwordOverlay",
      container: document.getElementById("passwordOverlay"),
      label: document.getElementById("passwordText"),
      input: document.getElementById("password"),
      submitButton: document.getElementById("passwordSubmit"),
      cancelButton: document.getElementById("passwordCancel")
    },
    documentProperties: {
      overlayName: "documentPropertiesOverlay",
      container: document.getElementById("documentPropertiesOverlay"),
      closeButton: document.getElementById("documentPropertiesClose"),
      fields: {
        fileName: document.getElementById("fileNameField"),
        fileSize: document.getElementById("fileSizeField"),
        title: document.getElementById("titleField"),
        author: document.getElementById("authorField"),
        subject: document.getElementById("subjectField"),
        keywords: document.getElementById("keywordsField"),
        creationDate: document.getElementById("creationDateField"),
        modificationDate: document.getElementById("modificationDateField"),
        creator: document.getElementById("creatorField"),
        producer: document.getElementById("producerField"),
        version: document.getElementById("versionField"),
        pageCount: document.getElementById("pageCountField"),
        pageSize: document.getElementById("pageSizeField"),
        linearized: document.getElementById("linearizedField")
      }
    },
    errorWrapper: {
      container: document.getElementById("errorWrapper"),
      errorMessage: document.getElementById("errorMessage"),
      closeButton: document.getElementById("errorClose"),
      errorMoreInfo: document.getElementById("errorMoreInfo"),
      moreInfoButton: document.getElementById("errorShowMore"),
      lessInfoButton: document.getElementById("errorShowLess")
    },
    printContainer: document.getElementById("printContainer"),
    openFileInputName: "fileInput",
    debuggerScriptPath: "./debugger.js"
  };
}

function webViewerLoad() {
  var config = getViewerConfiguration();
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("webviewerloaded", true, true, {
    source: window
  });

  try {
    parent.document.dispatchEvent(event);
  } catch (ex) {
    console.error("webviewerloaded: ".concat(ex));
    document.dispatchEvent(event);
  }

  _app.PDFViewerApplication.run(config);
}

{
  window.webViewerLoad = webViewerLoad;
}

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionKind = exports.AppOptions = void 0;

var _viewer_compatibility = __webpack_require__(2);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OptionKind = {
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  PREFERENCE: 0x80
};
exports.OptionKind = OptionKind;
var defaultOptions = {
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  defaultUrl: {
    value: "",
    kind: OptionKind.VIEWER
  },
  defaultZoomValue: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePrintAutoRotate: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableScripting: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableWebGL: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  externalLinkRel: {
    value: "noopener noreferrer nofollow",
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  imageResourcesPath: {
    value: "./images/",
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: 16777216,
    compatibility: _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels,
    kind: OptionKind.VIEWER
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  },
  removePageBorders: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  renderer: {
    value: "canvas",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  renderInteractiveForms: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  useOnlyCssZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewerCssTheme: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: "../web/cmaps/",
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  docBaseUrl: {
    value: "",
    kind: OptionKind.API
  },
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: "./assets/pdf.worker.js",
    kind: OptionKind.WORKER
  }
};
{
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  };
  defaultOptions.locale = {
    value: typeof navigator !== "undefined" ? navigator.language : "en-US",
    kind: OptionKind.VIEWER
  };
  defaultOptions.sandboxBundleSrc = {
    value: "../build/pdf.sandbox.js",
    kind: OptionKind.VIEWER
  };
}
var userOptions = Object.create(null);

var AppOptions = /*#__PURE__*/function () {
  function AppOptions() {
    _classCallCheck(this, AppOptions);

    throw new Error("Cannot initialize AppOptions.");
  }

  _createClass(AppOptions, null, [{
    key: "get",
    value: function get(name) {
      var userOption = userOptions[name];

      if (userOption !== undefined) {
        return userOption;
      }

      var defaultOption = defaultOptions[name];

      if (defaultOption !== undefined) {
        return defaultOption.compatibility || defaultOption.value;
      }

      return undefined;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var kind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var options = Object.create(null);

      for (var name in defaultOptions) {
        var defaultOption = defaultOptions[name];

        if (kind) {
          if ((kind & defaultOption.kind) === 0) {
            continue;
          }

          if (kind === OptionKind.PREFERENCE) {
            var value = defaultOption.value,
                valueType = _typeof(value);

            if (valueType === "boolean" || valueType === "string" || valueType === "number" && Number.isInteger(value)) {
              options[name] = value;
              continue;
            }

            throw new Error("Invalid type for preference: ".concat(name));
          }
        }

        var userOption = userOptions[name];
        options[name] = userOption !== undefined ? userOption : defaultOption.compatibility || defaultOption.value;
      }

      return options;
    }
  }, {
    key: "set",
    value: function set(name, value) {
      userOptions[name] = value;
    }
  }, {
    key: "setAll",
    value: function setAll(options) {
      for (var name in options) {
        userOptions[name] = options[name];
      }
    }
  }, {
    key: "remove",
    value: function remove(name) {
      delete userOptions[name];
    }
  }]);

  return AppOptions;
}();

exports.AppOptions = AppOptions;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.viewerCompatibilityParams = void 0;
var compatibilityParams = Object.create(null);
{
  var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
  var platform = typeof navigator !== "undefined" && navigator.platform || "";
  var maxTouchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints || 1;
  var isAndroid = /Android/.test(userAgent);
  var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === "MacIntel" && maxTouchPoints > 1;
  var isIOSChrome = /CriOS/.test(userAgent);

  (function checkOnBlobSupport() {
    if (isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();

  (function checkCanvasSizeLimitation() {
    if (isIOS || isAndroid) {
      compatibilityParams.maxCanvasPixels = 5242880;
    }
  })();
}
var viewerCompatibilityParams = Object.freeze(compatibilityParams);
exports.viewerCompatibilityParams = viewerCompatibilityParams;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFViewerApplication = exports.PDFPrintServiceFactory = exports.DefaultExternalServices = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _ui_utils = __webpack_require__(6);

var _app_options = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(7);

var _pdf_cursor_tools = __webpack_require__(8);

var _pdf_rendering_queue = __webpack_require__(10);

var _overlay_manager = __webpack_require__(11);

var _password_prompt = __webpack_require__(12);

var _pdf_attachment_viewer = __webpack_require__(13);

var _pdf_document_properties = __webpack_require__(15);

var _pdf_find_bar = __webpack_require__(16);

var _pdf_find_controller = __webpack_require__(17);

var _pdf_history = __webpack_require__(21);

var _pdf_layer_viewer = __webpack_require__(22);

var _pdf_link_service = __webpack_require__(23);

var _pdf_outline_viewer = __webpack_require__(24);

var _pdf_presentation_mode = __webpack_require__(25);

var _pdf_sidebar = __webpack_require__(26);

var _pdf_sidebar_resizer = __webpack_require__(27);

var _pdf_thumbnail_viewer = __webpack_require__(28);

var _pdf_viewer = __webpack_require__(30);

var _secondary_toolbar = __webpack_require__(166);

var _toolbar = __webpack_require__(168);

var _viewer_compatibility = __webpack_require__(2);

var _view_history = __webpack_require__(169);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
var FORCE_PAGES_LOADED_TIMEOUT = 10000;
var WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
var ENABLE_PERMISSIONS_CLASS = "enablePermissions";
var ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
var ViewerCssTheme = {
  AUTOMATIC: 0,
  LIGHT: 1,
  DARK: 2
};
var KNOWN_VERSIONS = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2", "2.3"];
var KNOWN_GENERATORS = ["acrobat distiller", "acrobat pdfwriter", "adobe livecycle", "adobe pdf library", "adobe photoshop", "ghostscript", "tcpdf", "cairo", "dvipdfm", "dvips", "pdftex", "pdfkit", "itext", "prince", "quarkxpress", "mac os x", "microsoft", "openoffice", "oracle", "luradocument", "pdf-xchange", "antenna house", "aspose.cells", "fpdf"];

var DefaultExternalServices = /*#__PURE__*/function () {
  function DefaultExternalServices() {
    _classCallCheck(this, DefaultExternalServices);

    throw new Error("Cannot initialize DefaultExternalServices.");
  }

  _createClass(DefaultExternalServices, null, [{
    key: "updateFindControlState",
    value: function updateFindControlState(data) {}
  }, {
    key: "updateFindMatchesCount",
    value: function updateFindMatchesCount(data) {}
  }, {
    key: "initPassiveLoading",
    value: function initPassiveLoading(callbacks) {}
  }, {
    key: "fallback",
    value: function () {
      var _fallback = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fallback(_x) {
        return _fallback.apply(this, arguments);
      }

      return fallback;
    }()
  }, {
    key: "reportTelemetry",
    value: function reportTelemetry(data) {}
  }, {
    key: "createDownloadManager",
    value: function createDownloadManager(options) {
      throw new Error("Not implemented: createDownloadManager");
    }
  }, {
    key: "createPreferences",
    value: function createPreferences() {
      throw new Error("Not implemented: createPreferences");
    }
  }, {
    key: "createL10n",
    value: function createL10n(options) {
      throw new Error("Not implemented: createL10n");
    }
  }, {
    key: "createScripting",
    value: function createScripting(options) {
      throw new Error("Not implemented: createScripting");
    }
  }, {
    key: "supportsIntegratedFind",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "supportsIntegratedFind", false);
    }
  }, {
    key: "supportsDocumentFonts",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "supportsDocumentFonts", true);
    }
  }, {
    key: "supportedMouseWheelZoomModifierKeys",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "supportedMouseWheelZoomModifierKeys", {
        ctrlKey: true,
        metaKey: true
      });
    }
  }, {
    key: "isInAutomation",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "isInAutomation", false);
    }
  }]);

  return DefaultExternalServices;
}();

exports.DefaultExternalServices = DefaultExternalServices;
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: (0, _pdfjsLib.createPromiseCapability)(),
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfSidebarResizer: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  isInitialViewSet: false,
  downloadComplete: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  externalServices: DefaultExternalServices,
  _boundEvents: Object.create(null),
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  triggerDelayedFallback: null,
  _saveInProgress: false,
  _wheelUnusedTicks: 0,
  _idleCallbacks: new Set(),
  _scriptingInstance: null,
  _mouseState: Object.create(null),
  initialize: function initialize(appConfig) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var appContainer;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.preferences = _this.externalServices.createPreferences();
              _this.appConfig = appConfig;
              _context2.next = 4;
              return _this._readPreferences();

            case 4:
              _context2.next = 6;
              return _this._parseHashParameters();

            case 6:
              _this._forceCssTheme();

              _context2.next = 9;
              return _this._initializeL10n();

            case 9:
              if (_this.isViewerEmbedded && _app_options.AppOptions.get("externalLinkTarget") === _pdfjsLib.LinkTarget.NONE) {
                _app_options.AppOptions.set("externalLinkTarget", _pdfjsLib.LinkTarget.TOP);
              }

              _context2.next = 12;
              return _this._initializeViewerComponents();

            case 12:
              _this.bindEvents();

              _this.bindWindowEvents();

              appContainer = appConfig.appContainer || document.documentElement;

              _this.l10n.translate(appContainer).then(function () {
                _this.eventBus.dispatch("localized", {
                  source: _this
                });
              });

              _this._initializedCapability.resolve();

              _this.initializeLoadingBar();

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  _readPreferences: function _readPreferences() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!_app_options.AppOptions.get("disablePreferences")) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _context3.prev = 2;
              _context3.t0 = _app_options.AppOptions;
              _context3.next = 6;
              return _this2.preferences.getAll();

            case 6:
              _context3.t1 = _context3.sent;

              _context3.t0.setAll.call(_context3.t0, _context3.t1);

              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t2 = _context3["catch"](2);
              console.error("_readPreferences: \"".concat(_context3.t2 === null || _context3.t2 === void 0 ? void 0 : _context3.t2.message, "\"."));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 10]]);
    }))();
  },
  _parseHashParameters: function _parseHashParameters() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var hash, hashParams, waitOn, viewer, enabled;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_app_options.AppOptions.get("pdfBugEnabled")) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", undefined);

            case 2:
              hash = document.location.hash.substring(1);

              if (hash) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", undefined);

            case 5:
              hashParams = (0, _ui_utils.parseQueryString)(hash), waitOn = [];

              if ("disableworker" in hashParams && hashParams.disableworker === "true") {
                waitOn.push(loadFakeWorker());
              }

              if ("disablerange" in hashParams) {
                _app_options.AppOptions.set("disableRange", hashParams.disablerange === "true");
              }

              if ("disablestream" in hashParams) {
                _app_options.AppOptions.set("disableStream", hashParams.disablestream === "true");
              }

              if ("disableautofetch" in hashParams) {
                _app_options.AppOptions.set("disableAutoFetch", hashParams.disableautofetch === "true");
              }

              if ("disablefontface" in hashParams) {
                _app_options.AppOptions.set("disableFontFace", hashParams.disablefontface === "true");
              }

              if ("disablehistory" in hashParams) {
                _app_options.AppOptions.set("disableHistory", hashParams.disablehistory === "true");
              }

              if ("webgl" in hashParams) {
                _app_options.AppOptions.set("enableWebGL", hashParams.webgl === "true");
              }

              if ("removepageborders" in hashParams) {
                _app_options.AppOptions.set("removePageBorders", hashParams["removepageborders"] === "true");
              }

              if ("verbosity" in hashParams) {
                _app_options.AppOptions.set("verbosity", hashParams.verbosity | 0);
              }

              if (!("textlayer" in hashParams)) {
                _context4.next = 24;
                break;
              }

              _context4.t0 = hashParams.textlayer;
              _context4.next = _context4.t0 === "off" ? 19 : _context4.t0 === "visible" ? 21 : _context4.t0 === "shadow" ? 21 : _context4.t0 === "hover" ? 21 : 24;
              break;

            case 19:
              _app_options.AppOptions.set("textLayerMode", _ui_utils.TextLayerMode.DISABLE);

              return _context4.abrupt("break", 24);

            case 21:
              viewer = _this3.appConfig.viewerContainer;
              viewer.classList.add("textLayer-" + hashParams.textlayer);
              return _context4.abrupt("break", 24);

            case 24:
              if ("pdfbug" in hashParams) {
                _app_options.AppOptions.set("pdfBug", true);

                _app_options.AppOptions.set("fontExtraProperties", true);

                enabled = hashParams.pdfbug.split(",");
                waitOn.push(loadAndEnablePDFBug(enabled));
              }

              if ("locale" in hashParams) {
                _app_options.AppOptions.set("locale", hashParams.locale);
              }

              if (!(waitOn.length === 0)) {
                _context4.next = 28;
                break;
              }

              return _context4.abrupt("return", undefined);

            case 28:
              return _context4.abrupt("return", Promise.all(waitOn)["catch"](function (reason) {
                console.error("_parseHashParameters: \"".concat(reason.message, "\"."));
              }));

            case 29:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  _initializeL10n: function _initializeL10n() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var dir;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this4.l10n = _this4.externalServices.createL10n({
                locale: _app_options.AppOptions.get("locale")
              });
              _context5.next = 3;
              return _this4.l10n.getDirection();

            case 3:
              dir = _context5.sent;
              document.getElementsByTagName("html")[0].dir = dir;

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  _forceCssTheme: function _forceCssTheme() {
    var cssTheme = _app_options.AppOptions.get("viewerCssTheme");

    if (cssTheme === ViewerCssTheme.AUTOMATIC || !Object.values(ViewerCssTheme).includes(cssTheme)) {
      return;
    }

    try {
      var styleSheet = document.styleSheets[0];
      var cssRules = (styleSheet === null || styleSheet === void 0 ? void 0 : styleSheet.cssRules) || [];

      for (var i = 0, ii = cssRules.length; i < ii; i++) {
        var _rule$media;

        var rule = cssRules[i];

        if (rule instanceof CSSMediaRule && ((_rule$media = rule.media) === null || _rule$media === void 0 ? void 0 : _rule$media[0]) === "(prefers-color-scheme: dark)") {
          if (cssTheme === ViewerCssTheme.LIGHT) {
            styleSheet.deleteRule(i);
            return;
          }

          var darkRules = /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(rule.cssText);

          if (darkRules !== null && darkRules !== void 0 && darkRules[1]) {
            styleSheet.deleteRule(i);
            styleSheet.insertRule(darkRules[1], i);
          }

          return;
        }
      }
    } catch (reason) {
      console.error("_forceCssTheme: \"".concat(reason === null || reason === void 0 ? void 0 : reason.message, "\"."));
    }
  },
  _initializeViewerComponents: function _initializeViewerComponents() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var appConfig, eventBus, pdfRenderingQueue, pdfLinkService, downloadManager, findController, container, viewer;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              appConfig = _this5.appConfig;
              eventBus = appConfig.eventBus || new _ui_utils.EventBus({
                isInAutomation: _this5.externalServices.isInAutomation
              });
              _this5.eventBus = eventBus;
              _this5.overlayManager = new _overlay_manager.OverlayManager();
              pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
              pdfRenderingQueue.onIdle = _this5.cleanup.bind(_this5);
              _this5.pdfRenderingQueue = pdfRenderingQueue;
              pdfLinkService = new _pdf_link_service.PDFLinkService({
                eventBus: eventBus,
                externalLinkTarget: _app_options.AppOptions.get("externalLinkTarget"),
                externalLinkRel: _app_options.AppOptions.get("externalLinkRel"),
                ignoreDestinationZoom: _app_options.AppOptions.get("ignoreDestinationZoom")
              });
              _this5.pdfLinkService = pdfLinkService;
              downloadManager = _this5.externalServices.createDownloadManager();
              _this5.downloadManager = downloadManager;
              findController = new _pdf_find_controller.PDFFindController({
                linkService: pdfLinkService,
                eventBus: eventBus,
                pageViewMode: _app_options.AppOptions.get("pageViewMode")
              });
              _this5.findController = findController;
              container = appConfig.mainContainer;
              viewer = appConfig.viewerContainer;
              _this5.pdfViewer = new _pdf_viewer.PDFViewer({
                container: container,
                viewer: viewer,
                eventBus: eventBus,
                renderingQueue: pdfRenderingQueue,
                linkService: pdfLinkService,
                downloadManager: downloadManager,
                findController: findController,
                renderer: _app_options.AppOptions.get("renderer"),
                enableWebGL: _app_options.AppOptions.get("enableWebGL"),
                l10n: _this5.l10n,
                textLayerMode: _app_options.AppOptions.get("textLayerMode"),
                imageResourcesPath: _app_options.AppOptions.get("imageResourcesPath"),
                removePageBorders: _app_options.AppOptions.get("removePageBorders"),
                renderInteractiveForms: _app_options.AppOptions.get("renderInteractiveForms"),
                enablePrintAutoRotate: _app_options.AppOptions.get("enablePrintAutoRotate"),
                useOnlyCssZoom: _app_options.AppOptions.get("useOnlyCssZoom"),
                maxCanvasPixels: _app_options.AppOptions.get("maxCanvasPixels"),
                pageViewMode: _app_options.AppOptions.get("pageViewMode"),
                enableScripting: _app_options.AppOptions.get("enableScripting"),
                mouseState: _this5._mouseState
              });
              pdfRenderingQueue.setViewer(_this5.pdfViewer);
              pdfLinkService.setViewer(_this5.pdfViewer);
              _this5.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer({
                container: appConfig.sidebar.thumbnailView,
                eventBus: eventBus,
                renderingQueue: pdfRenderingQueue,
                linkService: pdfLinkService,
                l10n: _this5.l10n
              });
              pdfRenderingQueue.setThumbnailViewer(_this5.pdfThumbnailViewer);
              _this5.pdfHistory = new _pdf_history.PDFHistory({
                linkService: pdfLinkService,
                eventBus: eventBus
              });
              pdfLinkService.setHistory(_this5.pdfHistory);

              if (!_this5.supportsIntegratedFind) {
                _this5.findBar = new _pdf_find_bar.PDFFindBar(appConfig.findBar, eventBus, _this5.l10n);
              }

              _this5.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(appConfig.documentProperties, _this5.overlayManager, eventBus, _this5.l10n);
              _this5.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools({
                container: container,
                eventBus: eventBus,
                cursorToolOnLoad: _app_options.AppOptions.get("cursorToolOnLoad")
              });
              _this5.toolbar = new _toolbar.Toolbar(appConfig.toolbar, eventBus, _this5.l10n);
              _this5.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);

              if (_this5.supportsFullscreen) {
                _this5.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode({
                  container: container,
                  pdfViewer: _this5.pdfViewer,
                  eventBus: eventBus,
                  contextMenuItems: appConfig.fullscreen
                });
              }

              _this5.passwordPrompt = new _password_prompt.PasswordPrompt(appConfig.passwordOverlay, _this5.overlayManager, _this5.l10n);
              _this5.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer({
                container: appConfig.sidebar.outlineView,
                eventBus: eventBus,
                linkService: pdfLinkService
              });
              _this5.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer({
                container: appConfig.sidebar.attachmentsView,
                eventBus: eventBus,
                downloadManager: downloadManager
              });
              _this5.pdfLayerViewer = new _pdf_layer_viewer.PDFLayerViewer({
                container: appConfig.sidebar.layersView,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar = new _pdf_sidebar.PDFSidebar({
                elements: appConfig.sidebar,
                pdfViewer: _this5.pdfViewer,
                pdfThumbnailViewer: _this5.pdfThumbnailViewer,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar.onToggled = _this5.forceRendering.bind(_this5);
              _this5.pdfSidebarResizer = new _pdf_sidebar_resizer.PDFSidebarResizer(appConfig.sidebarResizer, eventBus, _this5.l10n);

            case 35:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  run: function run(config) {
    this.initialize(config).then(webViewerInitialized);
  },

  get initialized() {
    return this._initializedCapability.settled;
  },

  get initializedPromise() {
    return this._initializedCapability.promise;
  },

  zoomIn: function zoomIn(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    var newScale = this.pdfViewer.currentScale;
    var maxScale = Number(_app_options.AppOptions.get("maxZoom"));

    if (!maxScale) {
      maxScale = _ui_utils.MAX_SCALE;
    }

    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(maxScale, newScale);
    } while (--ticks > 0 && newScale < maxScale);

    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomOut: function zoomOut(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    var newScale = this.pdfViewer.currentScale;
    var minScale = Number(_app_options.AppOptions.get("minZoom"));

    if (!minScale) {
      minScale = _ui_utils.MIN_SCALE;
    }

    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(minScale, newScale);
    } while (--ticks > 0 && newScale > minScale);

    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomReset: function zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
  },

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },

  get supportsFullscreen() {
    var support;
    var doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen);

    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false) {
      support = false;
    }

    return (0, _pdfjsLib.shadow)(this, "supportsFullscreen", support);
  },

  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },

  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },

  initializeLoadingBar: function initializeLoadingBar() {
    var bar = new _ui_utils.ProgressBar("#loadingBar");
    bar.hide();
    return (0, _pdfjsLib.shadow)(this, "loadingBar", bar);
  },

  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },

  initPassiveLoading: function initPassiveLoading() {
    throw new Error("Not implemented: initPassiveLoading");
  },
  setTitleUsingUrl: function setTitleUsingUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    this.url = url;
    this.baseUrl = url.split("#")[0];
    var title = (0, _ui_utils.getPDFFileNameFromURL)(url, "");

    if (!title) {
      try {
        title = decodeURIComponent((0, _pdfjsLib.getFilenameFromUrl)(url)) || url;
      } catch (ex) {
        title = url;
      }
    }

    this.setTitle(title);
  },
  setTitle: function setTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }

    document.title = title;
  },

  get _docFilename() {
    return this._contentDispositionFilename || (0, _ui_utils.getPDFFileNameFromURL)(this.url);
  },

  _cancelIdleCallbacks: function _cancelIdleCallbacks() {
    if (!this._idleCallbacks.size) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(this._idleCallbacks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var callback = _step.value;
        window.cancelIdleCallback(callback);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this._idleCallbacks.clear();
  },
  _destroyScriptingInstance: function _destroyScriptingInstance() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _this6$_scriptingInst, scripting, internalEvents, domEvents, _iterator2, _step2, _step2$value, name, listener, _iterator3, _step3, _step3$value, _name, _listener;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (_this6._scriptingInstance) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              _this6$_scriptingInst = _this6._scriptingInstance, scripting = _this6$_scriptingInst.scripting, internalEvents = _this6$_scriptingInst.internalEvents, domEvents = _this6$_scriptingInst.domEvents;
              _context7.prev = 3;
              _context7.next = 6;
              return scripting.destroySandbox();

            case 6:
              _context7.next = 10;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](3);

            case 10:
              _iterator2 = _createForOfIteratorHelper(internalEvents);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _step2$value = _slicedToArray(_step2.value, 2), name = _step2$value[0], listener = _step2$value[1];

                  _this6.eventBus._off(name, listener);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              internalEvents.clear();
              _iterator3 = _createForOfIteratorHelper(domEvents);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  _step3$value = _slicedToArray(_step3.value, 2), _name = _step3$value[0], _listener = _step3$value[1];
                  window.removeEventListener(_name, _listener);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              domEvents.clear();
              delete _this6._mouseState.isDown;
              _this6._scriptingInstance = null;

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[3, 8]]);
    }))();
  },
  close: function close() {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var errorWrapper, promises;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              errorWrapper = _this7.appConfig.errorWrapper.container;
              errorWrapper.setAttribute("hidden", "true");

              if (_this7.pdfLoadingTask) {
                _context8.next = 4;
                break;
              }

              return _context8.abrupt("return", undefined);

            case 4:
              promises = [];
              promises.push(_this7.pdfLoadingTask.destroy());
              _this7.pdfLoadingTask = null;

              if (_this7.pdfDocument) {
                _this7.pdfDocument = null;

                _this7.pdfThumbnailViewer.setDocument(null);

                _this7.pdfViewer.setDocument(null);

                _this7.pdfLinkService.setDocument(null);

                _this7.pdfDocumentProperties.setDocument(null);
              }

              webViewerResetPermissions();
              _this7.store = null;
              _this7.isInitialViewSet = false;
              _this7.downloadComplete = false;
              _this7.url = "";
              _this7.baseUrl = "";
              _this7.documentInfo = null;
              _this7.metadata = null;
              _this7._contentDispositionFilename = null;
              _this7._contentLength = null;
              _this7.triggerDelayedFallback = null;
              _this7._saveInProgress = false;

              _this7._cancelIdleCallbacks();

              promises.push(_this7._destroyScriptingInstance());

              _this7.pdfSidebar.reset();

              _this7.pdfOutlineViewer.reset();

              _this7.pdfAttachmentViewer.reset();

              _this7.pdfLayerViewer.reset();

              if (_this7.pdfHistory) {
                _this7.pdfHistory.reset();
              }

              if (_this7.findBar) {
                _this7.findBar.reset();
              }

              _this7.toolbar.reset();

              _this7.secondaryToolbar.reset();

              if (typeof PDFBug !== "undefined") {
                PDFBug.cleanup();
              }

              _context8.next = 33;
              return Promise.all(promises);

            case 33:
              return _context8.abrupt("return", undefined);

            case 34:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  open: function open(file, args) {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var workerParameters, key, parameters, apiParameters, _key, value, _key2, loadingTask;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!_this8.pdfLoadingTask) {
                _context9.next = 3;
                break;
              }

              _context9.next = 3;
              return _this8.close();

            case 3:
              workerParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);

              for (key in workerParameters) {
                _pdfjsLib.GlobalWorkerOptions[key] = workerParameters[key];
              }

              parameters = Object.create(null);

              if (typeof file === "string") {
                _this8.setTitleUsingUrl(file);

                parameters.url = file;
              } else if (file && "byteLength" in file) {
                parameters.data = file;
              } else if (file.url && file.originalUrl) {
                _this8.setTitleUsingUrl(file.originalUrl);

                parameters.url = file.url;
              }

              apiParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.API);

              for (_key in apiParameters) {
                value = apiParameters[_key];

                if (_key === "docBaseUrl" && !value) {}

                parameters[_key] = value;
              }

              if (args) {
                for (_key2 in args) {
                  parameters[_key2] = args[_key2];
                }
              }

              loadingTask = (0, _pdfjsLib.getDocument)(parameters);
              _this8.pdfLoadingTask = loadingTask;

              loadingTask.onPassword = function (updateCallback, reason) {
                _this8.pdfLinkService.externalLinkEnabled = false;

                _this8.passwordPrompt.setUpdateCallback(updateCallback, reason);

                _this8.passwordPrompt.open();
              };

              loadingTask.onProgress = function (_ref) {
                var loaded = _ref.loaded,
                    total = _ref.total;

                _this8.progress(loaded / total);

                _this8.eventBus.dispatch("progress", {
                  source: _this8,
                  type: "load",
                  total: total,
                  loaded: loaded,
                  percent: 100 * loaded / total
                });
              };

              loadingTask.onUnsupportedFeature = _this8.fallback.bind(_this8);
              return _context9.abrupt("return", loadingTask.promise.then(function (pdfDocument) {
                _this8.load(pdfDocument);
              }, function (exception) {
                if (loadingTask !== _this8.pdfLoadingTask) {
                  return undefined;
                }

                var message = exception === null || exception === void 0 ? void 0 : exception.message;
                var loadingErrorMessage;

                if (exception instanceof _pdfjsLib.InvalidPDFException) {
                  loadingErrorMessage = _this8.l10n.get("invalid_file_error", null, "Invalid or corrupted PDF file.");
                } else if (exception instanceof _pdfjsLib.MissingPDFException) {
                  loadingErrorMessage = _this8.l10n.get("missing_file_error", null, "Missing PDF file.");
                } else if (exception instanceof _pdfjsLib.UnexpectedResponseException) {
                  loadingErrorMessage = _this8.l10n.get("unexpected_response_error", null, "Unexpected server response.");
                } else {
                  loadingErrorMessage = _this8.l10n.get("loading_error", null, "An error occurred while loading the PDF.");
                }

                return loadingErrorMessage.then(function (msg) {
                  _this8.error(msg, {
                    message: message
                  });

                  _this8.onError(exception);

                  throw exception;
                });
              }));

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  download: function download() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$sourceEventType = _ref2.sourceEventType,
        sourceEventType = _ref2$sourceEventType === void 0 ? "download" : _ref2$sourceEventType;

    function downloadByUrl() {
      downloadManager.downloadUrl(url, filename);
    }

    var downloadManager = this.downloadManager,
        url = this.baseUrl,
        filename = this._docFilename;

    if (!this.pdfDocument || !this.downloadComplete) {
      downloadByUrl();
      return;
    }

    this.pdfDocument.getData().then(function (data) {
      var blob = new Blob([data], {
        type: "application/pdf"
      });
      downloadManager.download(blob, url, filename, sourceEventType);
    })["catch"](downloadByUrl);
  },
  save: function save() {
    var _arguments = arguments,
        _this9 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _this9$_scriptingInst;

      var _ref3, _ref3$sourceEventType, sourceEventType, downloadManager, url, filename;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _ref3 = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {}, _ref3$sourceEventType = _ref3.sourceEventType, sourceEventType = _ref3$sourceEventType === void 0 ? "download" : _ref3$sourceEventType;

              if (!_this9._saveInProgress) {
                _context11.next = 3;
                break;
              }

              return _context11.abrupt("return");

            case 3:
              downloadManager = _this9.downloadManager, url = _this9.baseUrl, filename = _this9._docFilename;

              if (!(!_this9.pdfDocument || !_this9.downloadComplete)) {
                _context11.next = 7;
                break;
              }

              _this9.download({
                sourceEventType: sourceEventType
              });

              return _context11.abrupt("return");

            case 7:
              _this9._saveInProgress = true;
              _context11.next = 10;
              return (_this9$_scriptingInst = _this9._scriptingInstance) === null || _this9$_scriptingInst === void 0 ? void 0 : _this9$_scriptingInst.scripting.dispatchEventInSandbox({
                id: "doc",
                name: "WillSave"
              });

            case 10:
              _this9.pdfDocument.saveDocument(_this9.pdfDocument.annotationStorage).then(function (data) {
                var blob = new Blob([data], {
                  type: "application/pdf"
                });
                downloadManager.download(blob, url, filename, sourceEventType);
              })["catch"](function () {
                _this9.download({
                  sourceEventType: sourceEventType
                });
              })["finally"]( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
                var _this9$_scriptingInst2;

                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return (_this9$_scriptingInst2 = _this9._scriptingInstance) === null || _this9$_scriptingInst2 === void 0 ? void 0 : _this9$_scriptingInst2.scripting.dispatchEventInSandbox({
                          id: "doc",
                          name: "DidSave"
                        });

                      case 2:
                        _this9._saveInProgress = false;

                      case 3:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              })));

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  downloadOrSave: function downloadOrSave(options) {
    var _this$pdfDocument;

    if (((_this$pdfDocument = this.pdfDocument) === null || _this$pdfDocument === void 0 ? void 0 : _this$pdfDocument.annotationStorage.size) > 0) {
      this.save(options);
    } else {
      this.download(options);
    }
  },
  _delayedFallback: function _delayedFallback(featureId) {
    var _this10 = this;

    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId: featureId
    });

    if (!this.triggerDelayedFallback) {
      this.triggerDelayedFallback = function () {
        _this10.fallback(featureId);

        _this10.triggerDelayedFallback = null;
      };
    }
  },
  fallback: function fallback(featureId) {
    var _this11 = this;

    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId: featureId
    });

    if (this.fellback) {
      return;
    }

    this.fellback = true;
    this.externalServices.fallback({
      featureId: featureId,
      url: this.baseUrl
    }).then(function (download) {
      if (!download) {
        return;
      }

      _this11.download({
        sourceEventType: "download"
      });
    });
  },
  error: function error(message, moreInfo) {
    var moreInfoText = [this.l10n.get("error_version_info", {
      version: _pdfjsLib.version || "?",
      build: _pdfjsLib.build || "?"
    }, "PDF.js v{{version}} (build: {{build}})")];

    if (moreInfo) {
      moreInfoText.push(this.l10n.get("error_message", {
        message: moreInfo.message
      }, "Message: {{message}}"));

      if (moreInfo.stack) {
        moreInfoText.push(this.l10n.get("error_stack", {
          stack: moreInfo.stack
        }, "Stack: {{stack}}"));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(this.l10n.get("error_file", {
            file: moreInfo.filename
          }, "File: {{file}}"));
        }

        if (moreInfo.lineNumber) {
          moreInfoText.push(this.l10n.get("error_line", {
            line: moreInfo.lineNumber
          }, "Line: {{line}}"));
        }
      }
    }

    var errorWrapperConfig = this.appConfig.errorWrapper;
    var errorWrapper = errorWrapperConfig.container;
    errorWrapper.removeAttribute("hidden");
    var errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    var closeButton = errorWrapperConfig.closeButton;

    closeButton.onclick = function () {
      errorWrapper.setAttribute("hidden", "true");
    };

    var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    var moreInfoButton = errorWrapperConfig.moreInfoButton;
    var lessInfoButton = errorWrapperConfig.lessInfoButton;

    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute("hidden");
      moreInfoButton.setAttribute("hidden", "true");
      lessInfoButton.removeAttribute("hidden");
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + "px";
    };

    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute("hidden", "true");
      moreInfoButton.removeAttribute("hidden");
      lessInfoButton.setAttribute("hidden", "true");
    };

    moreInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    lessInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    closeButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    moreInfoButton.removeAttribute("hidden");
    lessInfoButton.setAttribute("hidden", "true");
    Promise.all(moreInfoText).then(function (parts) {
      errorMoreInfo.value = parts.join("\n");
    });
  },
  progress: function progress(level) {
    var _this12 = this;

    if (this.downloadComplete) {
      return;
    }

    var percent = Math.round(level * 100);

    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      var disableAutoFetch = this.pdfDocument ? this.pdfDocument.loadingParams.disableAutoFetch : _app_options.AppOptions.get("disableAutoFetch");

      if (disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
        }

        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
          _this12.loadingBar.hide();

          _this12.disableAutoFetchLoadingBarTimeout = null;
        }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
      }
    }
  },
  load: function load(pdfDocument) {
    var _this13 = this;

    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(function (_ref5) {
      var length = _ref5.length;
      _this13._contentLength = length;
      _this13.downloadComplete = true;

      _this13.loadingBar.hide();

      firstPagePromise.then(function () {
        _this13.eventBus.dispatch("documentloaded", {
          source: _this13
        });
      });
    });
    var pageLayoutPromise = pdfDocument.getPageLayout()["catch"](function () {});
    var pageModePromise = pdfDocument.getPageMode()["catch"](function () {});
    var openActionPromise = pdfDocument.getOpenAction()["catch"](function () {});
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    var baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
    var pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise,
        onePageRendered = pdfViewer.onePageRendered,
        pagesPromise = pdfViewer.pagesPromise;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    var storedPromise = (this.store = new _view_history.ViewHistory(pdfDocument.fingerprint)).getMultiple({
      page: null,
      zoom: _ui_utils.DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: _ui_utils.SidebarView.UNKNOWN,
      scrollMode: _ui_utils.ScrollMode.UNKNOWN,
      spreadMode: _ui_utils.SpreadMode.UNKNOWN
    })["catch"](function () {
      return Object.create(null);
    });
    firstPagePromise.then(function (pdfPage) {
      _this13.loadingBar.setWidth(_this13.appConfig.viewerContainer);

      _this13._initializeAnnotationStorageCallbacks(pdfDocument);

      Promise.all([_ui_utils.animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then( /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12(_ref6) {
          var _ref8, timeStamp, stored, pageLayout, pageMode, openAction, viewOnLoad, initialBookmark, zoom, hash, rotation, sidebarView, scrollMode, spreadMode;

          return _regenerator["default"].wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _ref8 = _slicedToArray(_ref6, 5), timeStamp = _ref8[0], stored = _ref8[1], pageLayout = _ref8[2], pageMode = _ref8[3], openAction = _ref8[4];
                  viewOnLoad = _app_options.AppOptions.get("viewOnLoad");

                  _this13._initializePdfHistory({
                    fingerprint: pdfDocument.fingerprint,
                    viewOnLoad: viewOnLoad,
                    initialDest: openAction && openAction.dest
                  });

                  initialBookmark = _this13.initialBookmark;
                  zoom = _app_options.AppOptions.get("defaultZoomValue");
                  hash = zoom ? "zoom=".concat(zoom) : null;
                  rotation = null;
                  sidebarView = _app_options.AppOptions.get("sidebarViewOnLoad");
                  scrollMode = _app_options.AppOptions.get("scrollModeOnLoad");
                  spreadMode = _app_options.AppOptions.get("spreadModeOnLoad");

                  if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
                    hash = "page=".concat(stored.page, "&zoom=").concat(zoom || stored.zoom, ",") + "".concat(stored.scrollLeft, ",").concat(stored.scrollTop);
                    rotation = parseInt(stored.rotation, 10);

                    if (sidebarView === _ui_utils.SidebarView.UNKNOWN) {
                      sidebarView = stored.sidebarView | 0;
                    }

                    if (scrollMode === _ui_utils.ScrollMode.UNKNOWN) {
                      scrollMode = stored.scrollMode | 0;
                    }

                    if (spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
                      spreadMode = stored.spreadMode | 0;
                    }
                  }

                  if (pageMode && sidebarView === _ui_utils.SidebarView.UNKNOWN) {
                    sidebarView = apiPageModeToSidebarView(pageMode);
                  }

                  if (pageLayout && spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
                    spreadMode = apiPageLayoutToSpreadMode(pageLayout);
                  }

                  _this13.setInitialView(hash, {
                    rotation: rotation,
                    sidebarView: sidebarView,
                    scrollMode: scrollMode,
                    spreadMode: spreadMode
                  });

                  _this13.eventBus.dispatch("documentinit", {
                    source: _this13
                  });

                  if (!_this13.isViewerEmbedded) {
                    pdfViewer.focus();
                  }

                  _this13._initializePermissions(pdfDocument);

                  _context12.next = 19;
                  return Promise.race([pagesPromise, new Promise(function (resolve) {
                    setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
                  })]);

                case 19:
                  if (!(!initialBookmark && !hash)) {
                    _context12.next = 21;
                    break;
                  }

                  return _context12.abrupt("return");

                case 21:
                  if (!pdfViewer.hasEqualPageSizes) {
                    _context12.next = 23;
                    break;
                  }

                  return _context12.abrupt("return");

                case 23:
                  _this13.initialBookmark = initialBookmark;
                  pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;

                  _this13.setInitialView(hash);

                case 26:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12);
        }));

        return function (_x2) {
          return _ref7.apply(this, arguments);
        };
      }())["catch"](function () {
        _this13.setInitialView();
      }).then(function () {
        pdfViewer.update();
      });
    });
    pagesPromise.then(function () {
      _this13._initializeAutoPrint(pdfDocument, openActionPromise);
    });
    onePageRendered.then(function () {
      pdfDocument.getOutline().then(function (outline) {
        _this13.pdfOutlineViewer.render({
          outline: outline,
          pdfDocument: pdfDocument
        });
      });
      pdfDocument.getAttachments().then(function (attachments) {
        _this13.pdfAttachmentViewer.render({
          attachments: attachments
        });
      });
      pdfViewer.optionalContentConfigPromise.then(function (optionalContentConfig) {
        _this13.pdfLayerViewer.render({
          optionalContentConfig: optionalContentConfig,
          pdfDocument: pdfDocument
        });
      });

      if ("requestIdleCallback" in window) {
        var callback = window.requestIdleCallback(function () {
          _this13._collectTelemetry(pdfDocument);

          _this13._idleCallbacks["delete"](callback);
        }, {
          timeout: 1000
        });

        _this13._idleCallbacks.add(callback);
      }

      _this13._initializeJavaScript(pdfDocument);
    });

    this._initializePageLabels(pdfDocument);

    this._initializeMetadata(pdfDocument);
  },
  _initializeJavaScript: function _initializeJavaScript(pdfDocument) {
    var _this14 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var _yield$Promise$all, _yield$Promise$all2, objects, calculationOrder, docActions, scripting, internalEvents, domEvents, updateFromSandbox, visitedPages, pageOpen, pageClose, dispatchEventInSandbox, mouseDown, mouseUp, _iterator4, _step4, _step4$value, name, listener, _iterator5, _step5, _step5$value, _name2, _listener2, _this14$metadata, _this14$metadata2;

      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (_app_options.AppOptions.get("enableScripting")) {
                _context15.next = 2;
                break;
              }

              return _context15.abrupt("return");

            case 2:
              _context15.next = 4;
              return Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);

            case 4:
              _yield$Promise$all = _context15.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              objects = _yield$Promise$all2[0];
              calculationOrder = _yield$Promise$all2[1];
              docActions = _yield$Promise$all2[2];

              if (!(!objects && !docActions)) {
                _context15.next = 11;
                break;
              }

              return _context15.abrupt("return");

            case 11:
              if (!(pdfDocument !== _this14.pdfDocument)) {
                _context15.next = 13;
                break;
              }

              return _context15.abrupt("return");

            case 13:
              scripting = _this14.externalServices.createScripting({
                sandboxBundleSrc: _app_options.AppOptions.get("sandboxBundleSrc")
              });
              internalEvents = new Map(), domEvents = new Map();
              _this14._scriptingInstance = {
                scripting: scripting,
                ready: false,
                internalEvents: internalEvents,
                domEvents: domEvents
              };

              if (_this14.documentInfo) {
                _context15.next = 21;
                break;
              }

              _context15.next = 19;
              return new Promise(function (resolve) {
                _this14.eventBus._on("metadataloaded", function (evt) {
                  resolve();
                }, {
                  once: true
                });
              });

            case 19:
              if (!(pdfDocument !== _this14.pdfDocument)) {
                _context15.next = 21;
                break;
              }

              return _context15.abrupt("return");

            case 21:
              if (_this14._contentLength) {
                _context15.next = 26;
                break;
              }

              _context15.next = 24;
              return new Promise(function (resolve) {
                _this14.eventBus._on("documentloaded", function (evt) {
                  resolve();
                }, {
                  once: true
                });
              });

            case 24:
              if (!(pdfDocument !== _this14.pdfDocument)) {
                _context15.next = 26;
                break;
              }

              return _context15.abrupt("return");

            case 26:
              updateFromSandbox = function updateFromSandbox(_ref9) {
                var detail = _ref9.detail;
                var id = detail.id,
                    command = detail.command,
                    value = detail.value;

                if (!id) {
                  switch (command) {
                    case "clear":
                      console.clear();
                      break;

                    case "error":
                      console.error(value);
                      break;

                    case "layout":
                      _this14.pdfViewer.spreadMode = apiPageLayoutToSpreadMode(value);
                      break;

                    case "page-num":
                      _this14.pdfViewer.currentPageNumber = value + 1;
                      break;

                    case "print":
                      _this14.pdfViewer.pagesPromise.then(function () {
                        _this14.triggerPrinting();
                      });

                      break;

                    case "println":
                      console.log(value);
                      break;

                    case "zoom":
                      _this14.pdfViewer.currentScaleValue = value;
                      break;
                  }

                  return;
                }

                var element = document.getElementById(id);

                if (element) {
                  element.dispatchEvent(new CustomEvent("updatefromsandbox", {
                    detail: detail
                  }));
                } else {
                  if (value !== undefined && value !== null) {
                    pdfDocument.annotationStorage.setValue(id, value);
                  }
                }
              };

              internalEvents.set("updatefromsandbox", updateFromSandbox);
              visitedPages = new Map();

              pageOpen = function pageOpen(_ref10) {
                var pageNumber = _ref10.pageNumber,
                    actionsPromise = _ref10.actionsPromise;
                visitedPages.set(pageNumber, _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
                  var _this14$_scriptingIns;

                  var actions;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          actions = null;

                          if (visitedPages.has(pageNumber)) {
                            _context13.next = 7;
                            break;
                          }

                          _context13.next = 4;
                          return actionsPromise;

                        case 4:
                          actions = _context13.sent;

                          if (!(pdfDocument !== _this14.pdfDocument)) {
                            _context13.next = 7;
                            break;
                          }

                          return _context13.abrupt("return");

                        case 7:
                          _context13.next = 9;
                          return (_this14$_scriptingIns = _this14._scriptingInstance) === null || _this14$_scriptingIns === void 0 ? void 0 : _this14$_scriptingIns.scripting.dispatchEventInSandbox({
                            id: "page",
                            name: "PageOpen",
                            pageNumber: pageNumber,
                            actions: actions
                          });

                        case 9:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }))());
              };

              pageClose = /*#__PURE__*/function () {
                var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14(_ref12) {
                  var _this14$_scriptingIns2;

                  var pageNumber, actionsPromise;
                  return _regenerator["default"].wrap(function _callee14$(_context14) {
                    while (1) {
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          pageNumber = _ref12.pageNumber;
                          actionsPromise = visitedPages.get(pageNumber);

                          if (actionsPromise) {
                            _context14.next = 4;
                            break;
                          }

                          return _context14.abrupt("return");

                        case 4:
                          visitedPages.set(pageNumber, null);
                          _context14.next = 7;
                          return actionsPromise;

                        case 7:
                          if (!(pdfDocument !== _this14.pdfDocument)) {
                            _context14.next = 9;
                            break;
                          }

                          return _context14.abrupt("return");

                        case 9:
                          _context14.next = 11;
                          return (_this14$_scriptingIns2 = _this14._scriptingInstance) === null || _this14$_scriptingIns2 === void 0 ? void 0 : _this14$_scriptingIns2.scripting.dispatchEventInSandbox({
                            id: "page",
                            name: "PageClose",
                            pageNumber: pageNumber
                          });

                        case 11:
                        case "end":
                          return _context14.stop();
                      }
                    }
                  }, _callee14);
                }));

                return function pageClose(_x3) {
                  return _ref13.apply(this, arguments);
                };
              }();

              internalEvents.set("pageopen", pageOpen);
              internalEvents.set("pageclose", pageClose);

              dispatchEventInSandbox = function dispatchEventInSandbox(_ref14) {
                var detail = _ref14.detail;
                scripting.dispatchEventInSandbox(detail);
              };

              internalEvents.set("dispatcheventinsandbox", dispatchEventInSandbox);

              mouseDown = function mouseDown(event) {
                _this14._mouseState.isDown = true;
              };

              domEvents.set("mousedown", mouseDown);

              mouseUp = function mouseUp(event) {
                _this14._mouseState.isDown = false;
              };

              domEvents.set("mouseup", mouseUp);
              _iterator4 = _createForOfIteratorHelper(internalEvents);

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  _step4$value = _slicedToArray(_step4.value, 2), name = _step4$value[0], listener = _step4$value[1];

                  _this14.eventBus._on(name, listener);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }

              _iterator5 = _createForOfIteratorHelper(domEvents);

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  _step5$value = _slicedToArray(_step5.value, 2), _name2 = _step5$value[0], _listener2 = _step5$value[1];
                  window.addEventListener(_name2, _listener2);
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }

              _context15.prev = 43;
              _context15.next = 46;
              return scripting.createSandbox({
                objects: objects,
                calculationOrder: calculationOrder,
                appInfo: {
                  platform: navigator.platform,
                  language: navigator.language
                },
                docInfo: _objectSpread(_objectSpread({}, _this14.documentInfo), {}, {
                  baseURL: _this14.baseUrl,
                  filesize: _this14._contentLength,
                  filename: _this14._docFilename,
                  metadata: (_this14$metadata = _this14.metadata) === null || _this14$metadata === void 0 ? void 0 : _this14$metadata.getRaw(),
                  authors: (_this14$metadata2 = _this14.metadata) === null || _this14$metadata2 === void 0 ? void 0 : _this14$metadata2.get("dc:creator"),
                  numPages: pdfDocument.numPages,
                  URL: _this14.url,
                  actions: docActions
                })
              });

            case 46:
              if (_this14.externalServices.isInAutomation) {
                _this14.eventBus.dispatch("sandboxcreated", {
                  source: _this14
                });
              }

              _context15.next = 54;
              break;

            case 49:
              _context15.prev = 49;
              _context15.t0 = _context15["catch"](43);
              console.error("_initializeJavaScript: \"".concat(_context15.t0 === null || _context15.t0 === void 0 ? void 0 : _context15.t0.message, "\"."));

              _this14._destroyScriptingInstance();

              return _context15.abrupt("return");

            case 54:
              _context15.next = 56;
              return scripting.dispatchEventInSandbox({
                id: "doc",
                name: "Open"
              });

            case 56:
              _context15.next = 58;
              return _this14.pdfViewer.initializeScriptingEvents();

            case 58:
              Promise.resolve().then(function () {
                if (_this14._scriptingInstance) {
                  _this14._scriptingInstance.ready = true;
                }
              });

            case 59:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[43, 49]]);
    }))();
  },
  _collectTelemetry: function _collectTelemetry(pdfDocument) {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var markInfo, tagged;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _this15.pdfDocument.getMarkInfo();

            case 2:
              markInfo = _context16.sent;

              if (!(pdfDocument !== _this15.pdfDocument)) {
                _context16.next = 5;
                break;
              }

              return _context16.abrupt("return");

            case 5:
              tagged = (markInfo === null || markInfo === void 0 ? void 0 : markInfo.Marked) || false;

              _this15.externalServices.reportTelemetry({
                type: "tagged",
                tagged: tagged
              });

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  _initializeAutoPrint: function _initializeAutoPrint(pdfDocument, openActionPromise) {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var _yield$Promise$all3, _yield$Promise$all4, openAction, javaScript, triggerAutoPrint, _iterator6, _step6, js;

      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return Promise.all([openActionPromise, !_app_options.AppOptions.get("enableScripting") ? pdfDocument.getJavaScript() : null]);

            case 2:
              _yield$Promise$all3 = _context17.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              openAction = _yield$Promise$all4[0];
              javaScript = _yield$Promise$all4[1];

              if (!(pdfDocument !== _this16.pdfDocument)) {
                _context17.next = 8;
                break;
              }

              return _context17.abrupt("return");

            case 8:
              triggerAutoPrint = false;

              if ((openAction === null || openAction === void 0 ? void 0 : openAction.action) === "Print") {
                triggerAutoPrint = true;
              }

              if (!javaScript) {
                _context17.next = 31;
                break;
              }

              javaScript.some(function (js) {
                if (!js) {
                  return false;
                }

                console.warn("Warning: JavaScript is not supported");

                _this16._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.javaScript);

                return true;
              });

              if (triggerAutoPrint) {
                _context17.next = 31;
                break;
              }

              _iterator6 = _createForOfIteratorHelper(javaScript);
              _context17.prev = 14;

              _iterator6.s();

            case 16:
              if ((_step6 = _iterator6.n()).done) {
                _context17.next = 23;
                break;
              }

              js = _step6.value;

              if (!(js && _ui_utils.AutoPrintRegExp.test(js))) {
                _context17.next = 21;
                break;
              }

              triggerAutoPrint = true;
              return _context17.abrupt("break", 23);

            case 21:
              _context17.next = 16;
              break;

            case 23:
              _context17.next = 28;
              break;

            case 25:
              _context17.prev = 25;
              _context17.t0 = _context17["catch"](14);

              _iterator6.e(_context17.t0);

            case 28:
              _context17.prev = 28;

              _iterator6.f();

              return _context17.finish(28);

            case 31:
              if (triggerAutoPrint) {
                _this16.triggerPrinting();
              }

            case 32:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[14, 25, 28, 31]]);
    }))();
  },
  _initializeMetadata: function _initializeMetadata(pdfDocument) {
    var _this17 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var _this17$_contentLengt;

      var _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, contentLength, PDFViewerApplicationOptions, pdfTitle, infoTitle, metadataTitle, versionId, generatorId, producer, formType;

      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return pdfDocument.getMetadata();

            case 2:
              _yield$pdfDocument$ge = _context18.sent;
              info = _yield$pdfDocument$ge.info;
              metadata = _yield$pdfDocument$ge.metadata;
              contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
              contentLength = _yield$pdfDocument$ge.contentLength;

              if (!(pdfDocument !== _this17.pdfDocument)) {
                _context18.next = 9;
                break;
              }

              return _context18.abrupt("return");

            case 9:
              _this17.documentInfo = info;
              _this17.metadata = metadata;
              _this17._contentDispositionFilename = contentDispositionFilename;
              (_this17$_contentLengt = _this17._contentLength) !== null && _this17$_contentLengt !== void 0 ? _this17$_contentLengt : _this17._contentLength = contentLength;
              PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

              if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
                console.log("PDF viewer: ngx-extended-pdf-viewer running on pdf.js " + (window["pdfjs-dist/build/pdf"] ? window["pdfjs-dist/build/pdf"].version : " developer version (?)"));
                console.log("PDF ".concat(pdfDocument.fingerprint, " [").concat(info.PDFFormatVersion, " ") + "".concat((info.Producer || "-").trim(), " / ").concat((info.Creator || "-").trim(), "] ") + "(PDF.js: ".concat(_pdfjsLib.version || "-") + "".concat(_this17.pdfViewer.enableWebGL ? " [WebGL]" : "", ") modified by ngx-extended-pdf-viewer)"));
              }

              infoTitle = info && info.Title;

              if (infoTitle) {
                pdfTitle = infoTitle;
              }

              metadataTitle = metadata && metadata.get("dc:title");

              if (metadataTitle) {
                if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
                  pdfTitle = metadataTitle;
                }
              }

              if (pdfTitle) {
                _this17.setTitle("".concat(pdfTitle, " - ").concat(contentDispositionFilename || document.title));
              } else if (contentDispositionFilename) {
                _this17.setTitle(contentDispositionFilename);
              }

              if (info.IsXFAPresent && !info.IsAcroFormPresent) {
                console.warn("Warning: XFA is not supported");

                _this17._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
              } else if ((info.IsAcroFormPresent || info.IsXFAPresent) && !_this17.pdfViewer.renderInteractiveForms) {
                console.warn("Warning: Interactive form support is not enabled");

                _this17._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
              }

              versionId = "other";

              if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
                versionId = "v".concat(info.PDFFormatVersion.replace(".", "_"));
              }

              generatorId = "other";

              if (info.Producer) {
                producer = info.Producer.toLowerCase();
                KNOWN_GENERATORS.some(function (generator) {
                  if (!producer.includes(generator)) {
                    return false;
                  }

                  generatorId = generator.replace(/[ .-]/g, "_");
                  return true;
                });
              }

              formType = null;

              if (info.IsXFAPresent) {
                formType = "xfa";
              } else if (info.IsAcroFormPresent) {
                formType = "acroform";
              }

              _this17.externalServices.reportTelemetry({
                type: "documentInfo",
                version: versionId,
                generator: generatorId,
                formType: formType
              });

              _this17.eventBus.dispatch("metadataloaded", {
                source: _this17
              });

            case 29:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }))();
  },
  _initializePageLabels: function _initializePageLabels(pdfDocument) {
    var _this18 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var labels, numLabels, i, pdfViewer, pdfThumbnailViewer, toolbar;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return pdfDocument.getPageLabels();

            case 2:
              labels = _context19.sent;

              if (!(pdfDocument !== _this18.pdfDocument)) {
                _context19.next = 5;
                break;
              }

              return _context19.abrupt("return");

            case 5:
              if (!(!labels || _app_options.AppOptions.get("disablePageLabels"))) {
                _context19.next = 7;
                break;
              }

              return _context19.abrupt("return");

            case 7:
              numLabels = labels.length;

              if (!(numLabels !== _this18.pagesCount)) {
                _context19.next = 11;
                break;
              }

              console.error("The number of Page Labels does not match the number of pages in the document.");
              return _context19.abrupt("return");

            case 11:
              i = 0;

              while (i < numLabels && labels[i] === (i + 1).toString()) {
                i++;
              }

              if (!(i === numLabels)) {
                _context19.next = 15;
                break;
              }

              return _context19.abrupt("return");

            case 15:
              pdfViewer = _this18.pdfViewer, pdfThumbnailViewer = _this18.pdfThumbnailViewer, toolbar = _this18.toolbar;
              pdfViewer.setPageLabels(labels);
              pdfThumbnailViewer.setPageLabels(labels);
              toolbar.setPagesCount(numLabels, true);
              toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);

            case 20:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }))();
  },
  _initializePdfHistory: function _initializePdfHistory(_ref15) {
    var fingerprint = _ref15.fingerprint,
        viewOnLoad = _ref15.viewOnLoad,
        _ref15$initialDest = _ref15.initialDest,
        initialDest = _ref15$initialDest === void 0 ? null : _ref15$initialDest;

    if (this.isViewerEmbedded || _app_options.AppOptions.get("disableHistory")) {
      return;
    }

    this.pdfHistory.initialize({
      fingerprint: fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: _app_options.AppOptions.get("historyUpdateUrl")
    });

    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }

    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },
  _initializePermissions: function _initializePermissions(pdfDocument) {
    var _this19 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var permissions;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return pdfDocument.getPermissions();

            case 2:
              permissions = _context20.sent;

              if (!(pdfDocument !== _this19.pdfDocument)) {
                _context20.next = 5;
                break;
              }

              return _context20.abrupt("return");

            case 5:
              if (!(!permissions || !_app_options.AppOptions.get("enablePermissions"))) {
                _context20.next = 7;
                break;
              }

              return _context20.abrupt("return");

            case 7:
              if (!permissions.includes(_pdfjsLib.PermissionFlag.COPY)) {
                _this19.appConfig.viewerContainer.classList.add(ENABLE_PERMISSIONS_CLASS);
              }

            case 8:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }))();
  },
  _initializeAnnotationStorageCallbacks: function _initializeAnnotationStorageCallbacks(pdfDocument) {
    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    var annotationStorage = pdfDocument.annotationStorage;

    annotationStorage.onSetModified = function () {
      window.addEventListener("beforeunload", beforeUnload);
    };

    annotationStorage.onResetModified = function () {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  },
  setInitialView: function setInitialView(storedHash) {
    var _this20 = this;

    var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        rotation = _ref16.rotation,
        sidebarView = _ref16.sidebarView,
        scrollMode = _ref16.scrollMode,
        spreadMode = _ref16.spreadMode;

    var setRotation = function setRotation(angle) {
      if ((0, _ui_utils.isValidRotation)(angle)) {
        _this20.pdfViewer.pagesRotation = angle;
      }
    };

    var setViewerModes = function setViewerModes(scroll, spread) {
      if ((0, _ui_utils.isValidScrollMode)(scroll)) {
        _this20.pdfViewer.scrollMode = scroll;
      }

      if ((0, _ui_utils.isValidSpreadMode)(spread)) {
        _this20.pdfViewer.spreadMode = spread;
      }
    };

    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(sidebarView);
    setViewerModes(scrollMode, spreadMode);

    if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      this.pdfLinkService.setHash(storedHash);
    }

    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);

    if (!this.pdfViewer.currentScaleValue) {
      var defaultZoomOption = PDFViewerApplicationOptions.get('defaultZoomValue');

      if (defaultZoomOption) {
        this.pdfViewer.currentScaleValue = defaultZoomOption;
      } else {
        this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
      }
    }
  },
  cleanup: function cleanup() {
    if (!this.pdfDocument) {
      return;
    }

    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();

    if (this.pdfViewer.renderer !== _ui_utils.RendererType.SVG) {
      this.pdfDocument.cleanup();
    }
  },
  forceRendering: function forceRendering() {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint: function beforePrint() {
    var _this$_scriptingInsta,
        _this21 = this;

    (_this$_scriptingInsta = this._scriptingInstance) === null || _this$_scriptingInsta === void 0 ? void 0 : _this$_scriptingInsta.scripting.dispatchEventInSandbox({
      id: "doc",
      name: "WillPrint"
    });

    if (this.printService) {
      return;
    }

    if (!this.supportsPrinting) {
      this.l10n.get("printing_not_supported", null, "Warning: Printing is not fully supported by this browser.").then(function (printMessage) {
        _this21.error(printMessage);
      });
      return;
    }

    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get("printing_not_ready", null, "Warning: The PDF is not fully loaded for printing.").then(function (notReadyMessage) {
        window.alert(notReadyMessage);
      });
      return;
    }

    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;

    var printResolution = _app_options.AppOptions.get("printResolution");

    var optionalContentConfigPromise = this.pdfViewer.optionalContentConfigPromise;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, this.l10n, this.pdfViewer.eventBus);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
    this.externalServices.reportTelemetry({
      type: "print"
    });
  },
  afterPrint: function afterPrint() {
    var _this$_scriptingInsta2;

    (_this$_scriptingInsta2 = this._scriptingInstance) === null || _this$_scriptingInsta2 === void 0 ? void 0 : _this$_scriptingInsta2.scripting.dispatchEventInSandbox({
      id: "doc",
      name: "DidPrint"
    });

    if (this.printService) {
      document.body.removeAttribute("data-pdfjsprinting");
      this.printService.destroy();
      this.printService = null;

      if (this.pdfDocument) {
        this.pdfDocument.annotationStorage.resetModified();
      }
    }

    this.forceRendering();
  },
  rotatePages: function rotatePages(delta) {
    if (!this.pdfDocument) {
      return;
    }

    var newRotation = (this.pdfViewer.pagesRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = newRotation;
  },
  requestPresentationMode: function requestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
    }

    this.pdfPresentationMode.request();
  },
  triggerPrinting: function triggerPrinting() {
    if (!this.supportsPrinting) {
      return;
    }

    window.printPDF();
  },
  bindEvents: function bindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;
    _boundEvents.beforePrint = this.beforePrint.bind(this);
    _boundEvents.afterPrint = this.afterPrint.bind(this);

    eventBus._on("resize", webViewerResize);

    eventBus._on("hashchange", webViewerHashchange);

    eventBus._on("beforeprint", _boundEvents.beforePrint);

    eventBus._on("afterprint", _boundEvents.afterPrint);

    eventBus._on("pagerendered", webViewerPageRendered);

    eventBus._on("updateviewarea", webViewerUpdateViewarea);

    eventBus._on("pagechanging", webViewerPageChanging);

    eventBus._on("scalechanging", webViewerScaleChanging);

    eventBus._on("rotationchanging", webViewerRotationChanging);

    eventBus._on("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._on("pagemode", webViewerPageMode);

    eventBus._on("namedaction", webViewerNamedAction);

    eventBus._on("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._on("presentationmode", webViewerPresentationMode);

    eventBus._on("print", webViewerPrint);

    eventBus._on("download", webViewerDownload);

    eventBus._on("save", webViewerSave);

    eventBus._on("firstpage", webViewerFirstPage);

    eventBus._on("lastpage", webViewerLastPage);

    eventBus._on("nextpage", webViewerNextPage);

    eventBus._on("previouspage", webViewerPreviousPage);

    eventBus._on("zoomin", webViewerZoomIn);

    eventBus._on("zoomout", webViewerZoomOut);

    eventBus._on("zoomreset", webViewerZoomReset);

    eventBus._on("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._on("scalechanged", webViewerScaleChanged);

    eventBus._on("rotatecw", webViewerRotateCw);

    eventBus._on("rotateccw", webViewerRotateCcw);

    eventBus._on("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._on("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._on("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._on("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._on("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._on("documentproperties", webViewerDocumentProperties);

    eventBus._on("find", webViewerFind);

    eventBus._on("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._on("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._on("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_app_options.AppOptions.get("pdfBug")) {
      _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

      eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
    }

    eventBus._on("fileinputchange", webViewerFileInputChange);

    eventBus._on("openfile", webViewerOpenFile);
  },
  bindWindowEvents: function bindWindowEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    _boundEvents.windowResize = function () {
      eventBus.dispatch("resize", {
        source: window
      });
    };

    _boundEvents.windowHashChange = function () {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1)
      });
    };

    _boundEvents.windowBeforePrint = function () {
      eventBus.dispatch("beforeprint", {
        source: window
      });
    };

    _boundEvents.windowAfterPrint = function () {
      eventBus.dispatch("afterprint", {
        source: window
      });
    };

    _boundEvents.windowUpdateFromSandbox = function (event) {
      eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: event.detail
      });
    };

    window.addEventListener("visibilitychange", webViewerVisibilityChange);
    window.addEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.addEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.addEventListener("click", webViewerClick);
    window.addEventListener("keydown", webViewerKeyDown);
    window.addEventListener("keyup", webViewerKeyUp);
    window.addEventListener("resize", _boundEvents.windowResize);
    window.addEventListener("hashchange", _boundEvents.windowHashChange);
    window.addEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.addEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.addEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
  },
  unbindEvents: function unbindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    eventBus._off("resize", webViewerResize);

    eventBus._off("hashchange", webViewerHashchange);

    eventBus._off("beforeprint", _boundEvents.beforePrint);

    eventBus._off("afterprint", _boundEvents.afterPrint);

    eventBus._off("pagerendered", webViewerPageRendered);

    eventBus._off("updateviewarea", webViewerUpdateViewarea);

    eventBus._off("pagechanging", webViewerPageChanging);

    eventBus._off("scalechanging", webViewerScaleChanging);

    eventBus._off("rotationchanging", webViewerRotationChanging);

    eventBus._off("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._off("pagemode", webViewerPageMode);

    eventBus._off("namedaction", webViewerNamedAction);

    eventBus._off("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._off("presentationmode", webViewerPresentationMode);

    eventBus._off("print", webViewerPrint);

    eventBus._off("download", webViewerDownload);

    eventBus._off("save", webViewerSave);

    eventBus._off("firstpage", webViewerFirstPage);

    eventBus._off("lastpage", webViewerLastPage);

    eventBus._off("nextpage", webViewerNextPage);

    eventBus._off("previouspage", webViewerPreviousPage);

    eventBus._off("zoomin", webViewerZoomIn);

    eventBus._off("zoomout", webViewerZoomOut);

    eventBus._off("zoomreset", webViewerZoomReset);

    eventBus._off("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._off("scalechanged", webViewerScaleChanged);

    eventBus._off("rotatecw", webViewerRotateCw);

    eventBus._off("rotateccw", webViewerRotateCcw);

    eventBus._off("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._off("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._off("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._off("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._off("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._off("documentproperties", webViewerDocumentProperties);

    eventBus._off("find", webViewerFind);

    eventBus._off("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._off("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._off("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_boundEvents.reportPageStatsPDFBug) {
      eventBus._off("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._off("pagechanging", _boundEvents.reportPageStatsPDFBug);

      _boundEvents.reportPageStatsPDFBug = null;
    }

    eventBus._off("fileinputchange", webViewerFileInputChange);

    eventBus._off("openfile", webViewerOpenFile);

    _boundEvents.beforePrint = null;
    _boundEvents.afterPrint = null;
  },
  unbindWindowEvents: function unbindWindowEvents() {
    var _boundEvents = this._boundEvents;
    window.removeEventListener("visibilitychange", webViewerVisibilityChange);
    window.removeEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.removeEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.removeEventListener("click", webViewerClick);
    window.removeEventListener("keydown", webViewerKeyDown);
    window.removeEventListener("keyup", webViewerKeyUp);
    window.removeEventListener("resize", _boundEvents.windowResize);
    window.removeEventListener("hashchange", _boundEvents.windowHashChange);
    window.removeEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.removeEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.removeEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
    _boundEvents.windowResize = null;
    _boundEvents.windowHashChange = null;
    _boundEvents.windowBeforePrint = null;
    _boundEvents.windowAfterPrint = null;
    _boundEvents.windowUpdateFromSandbox = null;
  },
  accumulateWheelTicks: function accumulateWheelTicks(ticks) {
    if (this._wheelUnusedTicks > 0 && ticks < 0 || this._wheelUnusedTicks < 0 && ticks > 0) {
      this._wheelUnusedTicks = 0;
    }

    this._wheelUnusedTicks += ticks;
    var wholeTicks = Math.sign(this._wheelUnusedTicks) * Math.floor(Math.abs(this._wheelUnusedTicks));
    this._wheelUnusedTicks -= wholeTicks;
    return wholeTicks;
  },

  get scriptingReady() {
    var _this$_scriptingInsta3;

    return ((_this$_scriptingInsta3 = this._scriptingInstance) === null || _this$_scriptingInsta3 === void 0 ? void 0 : _this$_scriptingInsta3.ready) || false;
  }

};
exports.PDFViewerApplication = PDFViewerApplication;
var validateFileURL;
{
  var HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];

  validateFileURL = function validateFileURL(file) {
    if (file === undefined) {
      return;
    }

    try {
      var viewerOrigin = new URL(window.location.href).origin || "null";

      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }

      var _URL = new URL(file, window.location.href),
          origin = _URL.origin,
          protocol = _URL.protocol;

      if (origin !== viewerOrigin && protocol !== "blob:") {
        throw new Error("file origin does not match viewer's");
      }
    } catch (ex) {
      var message = ex && ex.message;
      PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function (loadingErrorMessage) {
        PDFViewerApplication.error(loadingErrorMessage, {
          message: message
        });
      });
      throw ex;
    }
  };
}

function loadFakeWorker() {
  return _loadFakeWorker.apply(this, arguments);
}

function _loadFakeWorker() {
  _loadFakeWorker = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            if (!_pdfjsLib.GlobalWorkerOptions.workerSrc) {
              _pdfjsLib.GlobalWorkerOptions.workerSrc = _app_options.AppOptions.get("workerSrc");
            }

            return _context21.abrupt("return", (0, _pdfjsLib.loadScript)(_pdfjsLib.PDFWorker.getWorkerSrc()));

          case 2:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));
  return _loadFakeWorker.apply(this, arguments);
}

function loadAndEnablePDFBug(enabledTabs) {
  var appConfig = PDFViewerApplication.appConfig;
  return (0, _pdfjsLib.loadScript)(appConfig.debuggerScriptPath).then(function () {
    PDFBug.enable(enabledTabs);
    PDFBug.init({
      OPS: _pdfjsLib.OPS
    }, appConfig.mainContainer);
  });
}

function reportPageStatsPDFBug(_ref17) {
  var pageNumber = _ref17.pageNumber;

  if (typeof Stats === "undefined" || !Stats.enabled) {
    return;
  }

  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  var pageStats = pageView && pageView.pdfPage && pageView.pdfPage.stats;

  if (!pageStats) {
    return;
  }

  Stats.add(pageNumber, pageStats);
}

function webViewerInitialized() {
  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = (0, _ui_utils.parseQueryString)(queryString);
  file = "file" in params ? params.file : _app_options.AppOptions.get("defaultUrl");
  validateFileURL(file);
  var fileInput = document.createElement("input");
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = "fileInput";
  fileInput.setAttribute("accept", ".pdf,application/pdf");
  fileInput.setAttribute("type", "file");
  fileInput.oncontextmenu = _ui_utils.noContextMenuHandler;
  document.body.appendChild(fileInput);

  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.openFileButton.setAttribute("hidden", "true");
  } else {
    fileInput.value = null;
  }

  fileInput.addEventListener("change", function (evt) {
    var files = evt.target.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.target
    });
  });
  appConfig.mainContainer.addEventListener("dragover", function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  });
  appConfig.mainContainer.addEventListener("drop", function (evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.dataTransfer
    });
  });

  if (!PDFViewerApplication.supportsDocumentFonts) {
    _app_options.AppOptions.set("disableFontFace", true);

    PDFViewerApplication.l10n.get("web_fonts_disabled", null, "Web fonts are disabled: unable to use embedded PDF fonts.").then(function (msg) {
      console.warn(msg);
    });
  }

  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add("hidden");
    appConfig.secondaryToolbar.printButton.classList.add("hidden");
  }

  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add("hidden");
    appConfig.secondaryToolbar.presentationModeButton.classList.add("hidden");
  }

  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add("hidden");
  }

  appConfig.mainContainer.addEventListener("transitionend", function (evt) {
    if (evt.target === this) {
      PDFViewerApplication.eventBus.dispatch("resize", {
        source: this
      });
    }
  }, true);

  try {
    webViewerOpenFileViaURL(file);
  } catch (reason) {
    PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function (msg) {
      PDFViewerApplication.error(msg, reason);
    });
  }
}

var webViewerOpenFileViaURL;
{
  webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
    if (file && file.lastIndexOf("file:", 0) === 0) {
      PDFViewerApplication.setTitleUsingUrl(file);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        PDFViewerApplication.open(new Uint8Array(xhr.response));
      };

      xhr.open("GET", file);
      xhr.responseType = "arraybuffer";
      xhr.send();
      return;
    }

    if (file) {
      PDFViewerApplication.open(file);
    }
  };
}

function webViewerResetPermissions() {
  var appConfig = PDFViewerApplication.appConfig;

  if (!appConfig) {
    return;
  }

  appConfig.viewerContainer.classList.remove(ENABLE_PERMISSIONS_CLASS);
}

function webViewerPageRendered(_ref18) {
  var pageNumber = _ref18.pageNumber,
      timestamp = _ref18.timestamp,
      error = _ref18.error;

  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    var pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
    var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageNumber - 1);

    if (pageView && thumbnailView) {
      thumbnailView.setImage(pageView);
    }
  }

  if (error) {
    PDFViewerApplication.l10n.get("rendering_error", null, "An error occurred while rendering the page.").then(function (msg) {
      PDFViewerApplication.error(msg, error);
    });
  }

  PDFViewerApplication.externalServices.reportTelemetry({
    type: "pageInfo",
    timestamp: timestamp
  });
  PDFViewerApplication.pdfDocument.getStats().then(function (stats) {
    PDFViewerApplication.externalServices.reportTelemetry({
      type: "documentStats",
      stats: stats
    });
  });
}

function webViewerPageMode(_ref19) {
  var mode = _ref19.mode;
  var view;

  switch (mode) {
    case "thumbs":
      view = _ui_utils.SidebarView.THUMBS;
      break;

    case "bookmarks":
    case "outline":
      view = _ui_utils.SidebarView.OUTLINE;
      break;

    case "attachments":
      view = _ui_utils.SidebarView.ATTACHMENTS;
      break;

    case "layers":
      view = _ui_utils.SidebarView.LAYERS;
      break;

    case "none":
      view = _ui_utils.SidebarView.NONE;
      break;

    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}

function webViewerNamedAction(evt) {
  switch (evt.action) {
    case "GoToPage":
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;

    case "Find":
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }

      break;

    case "Print":
      PDFViewerApplication.triggerPrinting();
      break;

    case "SaveAs":
      webViewerSave();
      break;
  }
}

function webViewerPresentationModeChanged(evt) {
  PDFViewerApplication.pdfViewer.presentationModeState = evt.state;
}

function webViewerSidebarViewChanged(evt) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("sidebarView", evt.view)["catch"](function () {});
  }
}

function webViewerUpdateViewarea(evt) {
  var location = evt.location,
      store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    })["catch"](function () {});
  }

  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  var loading = (currentPage && currentPage.renderingState) !== _pdf_rendering_queue.RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}

function webViewerScrollModeChanged(evt) {
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("scrollMode", evt.mode)["catch"](function () {});
  }
}

function webViewerSpreadModeChanged(evt) {
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("spreadMode", evt.mode)["catch"](function () {});
  }
}

function webViewerResize() {
  var pdfDocument = PDFViewerApplication.pdfDocument,
      pdfViewer = PDFViewerApplication.pdfViewer;

  if (!pdfDocument) {
    return;
  }

  var currentScaleValue = pdfViewer.currentScaleValue;

  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width") {
    pdfViewer.currentScaleValue = currentScaleValue;
  }

  pdfViewer.update();
}

function webViewerHashchange(evt) {
  var hash = evt.hash;

  if (!hash) {
    return;
  }

  if (!PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.initialBookmark = hash;
  } else if (!PDFViewerApplication.pdfHistory.popStateInProgress) {
    PDFViewerApplication.pdfLinkService.setHash(hash);
  }
}

var webViewerFileInputChange, webViewerOpenFile;
{
  webViewerFileInputChange = function webViewerFileInputChange(evt) {
    if (PDFViewerApplication.pdfViewer && PDFViewerApplication.pdfViewer.isInPresentationMode) {
      return;
    }

    var file = evt.fileInput.files[0];

    if (!_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      var url = URL.createObjectURL(file);

      if (file.name) {
        url = {
          url: url,
          originalUrl: file.name
        };
      }

      PDFViewerApplication.open(url);
    } else {
      PDFViewerApplication.setTitleUsingUrl(file.name);
      var fileReader = new FileReader();

      fileReader.onload = function webViewerChangeFileReaderOnload(event) {
        var buffer = event.target.result;
        PDFViewerApplication.open(new Uint8Array(buffer));
      };

      fileReader.readAsArrayBuffer(file);
    }

    var appConfig = PDFViewerApplication.appConfig;
    appConfig.toolbar.viewBookmark.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.viewBookmarkButton.setAttribute("hidden", "true");
    appConfig.toolbar.download.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.downloadButton.setAttribute("hidden", "true");
  };

  webViewerOpenFile = function webViewerOpenFile(evt) {
    var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
    document.getElementById(openFileInputName).click();
  };
}

function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}

function webViewerPrint() {
  PDFViewerApplication.triggerPrinting();
}

function webViewerDownload() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "download"
  });
}

function webViewerSave() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "save"
  });
}

function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}

function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;

    if (PDFViewerApplication.pageViewMode === "single") {
      if (PDFViewerApplication.pdfViewer && PDFViewerApplication.pdfViewer.container) {
        PDFViewerApplication.pdfViewer.container.scrollTop = 0;
      }
    }
  }
}

function webViewerNextPage() {
  PDFViewerApplication.pdfViewer.nextPage();

  if (PDFViewerApplication.pageViewMode === "single") {
    if (PDFViewerApplication.pdfViewer && PDFViewerApplication.pdfViewer.container) {
      PDFViewerApplication.pdfViewer.container.scrollTop = 0;
    }
  }
}

function webViewerPreviousPage() {
  PDFViewerApplication.pdfViewer.previousPage();
}

function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}

function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}

function webViewerZoomReset() {
  PDFViewerApplication.zoomReset();
}

function webViewerPageNumberChanged(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;

  if (evt.value !== "") {
    PDFViewerApplication.pdfLinkService.goToPage(evt.value);
  }

  if (evt.value !== pdfViewer.currentPageNumber.toString() && evt.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}

function webViewerScaleChanged(evt) {
  PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}

function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}

function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}

function webViewerOptionalContentConfig(evt) {
  PDFViewerApplication.pdfViewer.optionalContentConfigPromise = evt.promise;
}

function webViewerSwitchScrollMode(evt) {
  PDFViewerApplication.pdfViewer.scrollMode = evt.mode;
}

function webViewerSwitchSpreadMode(evt) {
  PDFViewerApplication.pdfViewer.spreadMode = evt.mode;
}

function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}

function webViewerFind(evt) {
  PDFViewerApplication.findController.executeCommand("find" + evt.type, {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: evt.caseSensitive,
    entireWord: evt.entireWord,
    ignoreAccents: evt.ignoreAccents,
    fuzzySearch: evt.fuzzySearch,
    highlightAll: evt.highlightAll,
    findPrevious: evt.findPrevious
  });
}

function webViewerFindFromUrlHash(evt) {
  PDFViewerApplication.findController.executeCommand("find", {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: false,
    entireWord: false,
    ignoreAccents: false,
    fuzzySearch: false,
    highlightAll: true,
    findPrevious: false
  });
}

function webViewerUpdateFindMatchesCount(_ref20) {
  var matchesCount = _ref20.matchesCount;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    PDFViewerApplication.findBar.updateResultsCount(matchesCount);
  }
}

function webViewerUpdateFindControlState(_ref21) {
  var state = _ref21.state,
      previous = _ref21.previous,
      matchesCount = _ref21.matchesCount,
      rawQuery = _ref21.rawQuery;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      matchesCount: matchesCount,
      rawQuery: rawQuery
    });
  } else {
    PDFViewerApplication.findBar.updateUIState(state, previous, matchesCount);
  }
}

function webViewerScaleChanging(evt) {
  PDFViewerApplication.toolbar.setPageScale(evt.presetValue, evt.scale);
  PDFViewerApplication.pdfViewer.update();
}

function webViewerRotationChanging(evt) {
  PDFViewerApplication.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  PDFViewerApplication.forceRendering();
  PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
}

function webViewerPageChanging(_ref22) {
  var pageNumber = _ref22.pageNumber,
      pageLabel = _ref22.pageLabel;
  PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
  PDFViewerApplication.secondaryToolbar.setPageNumber(pageNumber);

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
  }

  var pageNumberInput = document.getElementById("pageNumber");

  if (pageNumberInput) {
    var pageScrollEvent = new CustomEvent("page-change");
    pageNumberInput.dispatchEvent(pageScrollEvent);
  }
}

function webViewerVisibilityChange(evt) {
  if (document.visibilityState === "visible") {
    setZoomDisabledTimeout();
  }
}

var zoomDisabledTimeout = null;

function setZoomDisabledTimeout() {
  if (zoomDisabledTimeout) {
    clearTimeout(zoomDisabledTimeout);
  }

  zoomDisabledTimeout = setTimeout(function () {
    zoomDisabledTimeout = null;
  }, WHEEL_ZOOM_DISABLED_TIMEOUT);
}

function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer,
      supportedMouseWheelZoomModifierKeys = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;

  if (pdfViewer.isInPresentationMode) {
    return;
  }

  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);

  if (window.isKeyIgnored && window.isKeyIgnored(cmd, "WHEEL")) {
    return;
  }

  if (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey || evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey) {
    evt.preventDefault();

    if (zoomDisabledTimeout || document.visibilityState === "hidden") {
      return;
    }

    var previousScale = pdfViewer.currentScale;
    var delta = (0, _ui_utils.normalizeWheelEventDirection)(evt);
    var ticks = 0;

    if (evt.deltaMode === WheelEvent.DOM_DELTA_LINE || evt.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      if (Math.abs(delta) >= 1) {
        ticks = Math.sign(delta);
      } else {
        ticks = PDFViewerApplication.accumulateWheelTicks(delta);
      }
    } else {
      var PIXELS_PER_LINE_SCALE = 30;
      ticks = PDFViewerApplication.accumulateWheelTicks(delta / PIXELS_PER_LINE_SCALE);
    }

    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else if (ticks > 0) {
      PDFViewerApplication.zoomIn(ticks);
    }

    var currentScale = pdfViewer.currentScale;

    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    setZoomDisabledTimeout();
  }
}

function webViewerTouchStart(evt) {
  if (evt.touches.length > 1) {
    evt.preventDefault();
  }
}

function webViewerClick(evt) {
  if (PDFViewerApplication.triggerDelayedFallback && PDFViewerApplication.pdfViewer.containsElement(evt.target)) {
    PDFViewerApplication.triggerDelayedFallback();
  }

  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }

  var appConfig = PDFViewerApplication.appConfig;

  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    if (evt.target && evt.target.parentElement === appConfig.secondaryToolbar.toggleButton) {
      return;
    }

    if (evt.target && evt.target.parentElement && evt.target.parentElement.parentElement === appConfig.secondaryToolbar.toggleButton) {
      return;
    }

    PDFViewerApplication.secondaryToolbar.close();
  }
}

function webViewerKeyUp(evt) {
  if (evt.keyCode === 9) {
    if (PDFViewerApplication.triggerDelayedFallback) {
      PDFViewerApplication.triggerDelayedFallback();
    }
  }
}

function webViewerKeyDown(evt) {
  if (PDFViewerApplication.overlayManager.active) {
    return;
  }

  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  var pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;

  if (window.isKeyIgnored && window.isKeyIgnored(cmd, evt.keyCode)) {
    return;
  }

  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind && !evt.shiftKey) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }

        break;

      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var findState = PDFViewerApplication.findController.state;

          if (findState) {
            PDFViewerApplication.findController.executeCommand("findagain", {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              entireWord: findState.entireWord,
              ignoreAccents: findState.ignoreAccents,
              fuzzySearch: findState.fuzzySearch,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
            });
          }

          handled = true;
        }

        break;

      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }

        handled = true;
        break;

      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }

        handled = true;
        break;

      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            PDFViewerApplication.zoomReset();
          });
          handled = false;
        }

        break;

      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;
    }
  }

  var eventBus = PDFViewerApplication.eventBus;

  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch("download", {
          source: window
        });
        handled = true;
        break;

      case 79:
        {
          eventBus.dispatch("openfile", {
            source: window
          });
          handled = true;
        }
        break;
    }
  }

  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;

      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }

  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }

    evt.preventDefault();
    return;
  }

  var curElement = (0, _ui_utils.getActiveOrFocusedElement)();
  var curElementTagName = curElement && curElement.tagName.toUpperCase();

  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElement && curElement.isContentEditable) {
    if (evt.keyCode !== 27) {
      return;
    }
  }

  if (cmd === 0) {
    var turnPage = 0,
        turnOnlyIfPageFit = false;

    switch (evt.keyCode) {
      case 38:
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 75:
      case 80:
        turnPage = -1;
        break;

      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }

        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }

        break;

      case 40:
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 74:
      case 78:
        turnPage = 1;
        break;

      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 83:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.SELECT);
        break;

      case 72:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.HAND);
        break;

      case 82:
        PDFViewerApplication.rotatePages(90);
        break;

      case 115:
        PDFViewerApplication.pdfSidebar.toggle();
        break;
    }

    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
      if (turnPage > 0) {
        pdfViewer.nextPage();
      } else {
        pdfViewer.previousPage();
      }

      handled = true;
    }
  }

  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit") {
          break;
        }

        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }

        handled = true;
        break;

      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }

  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }

  if (handled) {
    evt.preventDefault();
  }
}

function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}

function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return _ui_utils.SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return _ui_utils.SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return _ui_utils.SpreadMode.EVEN;
  }

  return _ui_utils.SpreadMode.NONE;
}

function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return _ui_utils.SidebarView.NONE;

    case "UseThumbs":
      return _ui_utils.SidebarView.THUMBS;

    case "UseOutlines":
      return _ui_utils.SidebarView.OUTLINE;

    case "UseAttachments":
      return _ui_utils.SidebarView.ATTACHMENTS;

    case "UseOC":
      return _ui_utils.SidebarView.LAYERS;
  }

  return _ui_utils.SidebarView.NONE;
}

var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function createPrintService() {
      throw new Error("Not implemented: createPrintService");
    }
  }
};
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(5);

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined;
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator;

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      context[delegate.resultName] = info.value;
      context.next = delegate.nextLoc;

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      return info;
    }

    context.delegate = null;
    return ContinueSentinel;
  }

  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse();
    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
  return exports;
}(( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.approximateFraction = approximateFraction;
exports.backtrackBeforeAllVisibleElements = backtrackBeforeAllVisibleElements;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.getActiveOrFocusedElement = getActiveOrFocusedElement;
exports.getOutputScale = getOutputScale;
exports.getPageSizeInches = getPageSizeInches;
exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
exports.getVisibleElements = getVisibleElements;
exports.isPortraitOrientation = isPortraitOrientation;
exports.isValidRotation = isValidRotation;
exports.isValidScrollMode = isValidScrollMode;
exports.isValidSpreadMode = isValidSpreadMode;
exports.moveToEndOfArray = moveToEndOfArray;
exports.noContextMenuHandler = noContextMenuHandler;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.normalizeWheelEventDirection = normalizeWheelEventDirection;
exports.parseQueryString = parseQueryString;
exports.roundToDivide = roundToDivide;
exports.scrollIntoView = scrollIntoView;
exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
exports.watchScroll = watchScroll;
exports.WaitOnType = exports.VERTICAL_PADDING = exports.UNKNOWN_SCALE = exports.TextLayerMode = exports.SpreadMode = exports.SidebarView = exports.ScrollMode = exports.SCROLLBAR_PADDING = exports.RendererType = exports.ProgressBar = exports.PresentationModeState = exports.NullL10n = exports.MIN_SCALE = exports.MAX_SCALE = exports.MAX_AUTO_SCALE = exports.EventBus = exports.DEFAULT_SCALE_VALUE = exports.DEFAULT_SCALE = exports.CSS_UNITS = exports.AutoPrintRegExp = exports.animationStarted = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CSS_UNITS = 96.0 / 72.0;
exports.CSS_UNITS = CSS_UNITS;
var DEFAULT_SCALE_VALUE = "auto";
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
var DEFAULT_SCALE = 1.0;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
var MIN_SCALE = 0.1;
exports.MIN_SCALE = MIN_SCALE;
var MAX_SCALE = 10.0;
exports.MAX_SCALE = MAX_SCALE;
var UNKNOWN_SCALE = 0;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
var MAX_AUTO_SCALE = 1.25;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
var SCROLLBAR_PADDING = 40;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
var VERTICAL_PADDING = 5;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
var LOADINGBAR_END_OFFSET_VAR = "--loadingBar-end-offset";
var PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
exports.PresentationModeState = PresentationModeState;
var SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
exports.SidebarView = SidebarView;
var RendererType = {
  CANVAS: "canvas",
  SVG: "svg"
};
exports.RendererType = RendererType;
var TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_ENHANCE: 2
};
exports.TextLayerMode = TextLayerMode;
var ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2
};
exports.ScrollMode = ScrollMode;
var SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
exports.SpreadMode = SpreadMode;
var AutoPrintRegExp = /\bprint\s*\(/;
exports.AutoPrintRegExp = AutoPrintRegExp;

function formatL10nValue(text, args) {
  if (!args) {
    return text;
  }

  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, function (all, name) {
    return name in args ? args[name] : "{{" + name + "}}";
  });
}

var NullL10n = {
  getLanguage: function getLanguage() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "en-us");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getDirection: function getDirection() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", "ltr");

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  get: function get(property, args, fallback) {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", formatL10nValue(fallback, args));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  translate: function translate(element) {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
exports.NullL10n = NullL10n;

function getOutputScale(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  var pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1
  };
}

function scrollIntoView(element, spot) {
  var skipOverflowHiddenElements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var infiniteScroll = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var parent = element.offsetParent;

  if (!parent) {
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }

  var offsetY = element.offsetTop + element.clientTop;
  var offsetX = element.offsetLeft + element.clientLeft;

  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || skipOverflowHiddenElements && getComputedStyle(parent).overflow === "hidden") {
    if (parent.dataset._scaleY) {
      offsetY /= parent.dataset._scaleY;
      offsetX /= parent.dataset._scaleX;
    }

    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;

    if (!parent) {
      if (infiniteScroll) {
        if (document.body.clientHeight > offsetY) {
          offsetY -= 32;
          window.scrollTo(window.scrollX, offsetY);
        }
      }

      return;
    }
  }

  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
    }

    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    }
  }

  parent.scrollTop = offsetY;
}

function watchScroll(viewAreaElement, callback) {
  var debounceScroll = function debounceScroll(evt) {
    if (rAF) {
      return;
    }

    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      var currentX = viewAreaElement.scrollLeft;
      var lastX = state.lastX;

      if (currentX !== lastX) {
        state.right = currentX > lastX;
      }

      state.lastX = currentX;
      var currentY = viewAreaElement.scrollTop;
      var lastY = state.lastY;

      if (currentY !== lastY) {
        state.down = currentY > lastY;
      }

      state.lastY = currentY;
      callback(state);
    });
  };

  var state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  var rAF = null;
  viewAreaElement.addEventListener("scroll", debounceScroll, true);
  return state;
}

function parseQueryString(query) {
  var parts = query.split("&");
  var params = Object.create(null);

  for (var i = 0, ii = parts.length; i < ii; ++i) {
    var param = parts[i].split("=");
    var key = param[0].toLowerCase();
    var value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
}

function binarySearchFirstItem(items, condition) {
  var minIndex = 0;
  var maxIndex = items.length - 1;

  if (maxIndex < 0 || !condition(items[maxIndex])) {
    return items.length;
  }

  if (condition(items[minIndex])) {
    return minIndex;
  }

  while (minIndex < maxIndex) {
    var currentIndex = minIndex + maxIndex >> 1;
    var currentItem = items[currentIndex];

    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }

  return minIndex;
}

function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }

  var xinv = 1 / x;
  var limit = 8;

  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }

  var x_ = x > 1 ? xinv : x;
  var a = 0,
      b = 1,
      c = 1,
      d = 1;

  while (true) {
    var p = a + c,
        q = b + d;

    if (q > limit) {
      break;
    }

    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }

  var result;

  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }

  return result;
}

function roundToDivide(x, div) {
  var r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}

function getPageSizeInches(_ref) {
  var view = _ref.view,
      userUnit = _ref.userUnit,
      rotate = _ref.rotate;

  var _view = _slicedToArray(view, 4),
      x1 = _view[0],
      y1 = _view[1],
      x2 = _view[2],
      y2 = _view[3];

  var changeOrientation = rotate % 180 !== 0;
  var width = (x2 - x1) / 72 * userUnit;
  var height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}

function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index < 2) {
    return index;
  }

  var elt = views[index].div;
  var pageTop = elt.offsetTop + elt.clientTop;

  if (pageTop >= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }

  for (var i = index - 2; i >= 0; --i) {
    elt = views[i].div;

    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
      break;
    }

    index = i;
  }

  return index;
}

function getVisibleElements(_ref2) {
  var scrollEl = _ref2.scrollEl,
      views = _ref2.views,
      _ref2$sortByVisibilit = _ref2.sortByVisibility,
      sortByVisibility = _ref2$sortByVisibilit === void 0 ? false : _ref2$sortByVisibilit,
      _ref2$horizontal = _ref2.horizontal,
      horizontal = _ref2$horizontal === void 0 ? false : _ref2$horizontal,
      _ref2$rtl = _ref2.rtl,
      rtl = _ref2$rtl === void 0 ? false : _ref2$rtl;
  var top = scrollEl.scrollTop,
      bottom = top + scrollEl.clientHeight;
  var left = scrollEl.scrollLeft,
      right = left + scrollEl.clientWidth;

  function isElementBottomAfterViewTop(view) {
    var element = view.div;
    var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }

  function isElementNextAfterViewHorizontally(view) {
    var element = view.div;
    var elementLeft = element.offsetLeft + element.clientLeft;
    var elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  }

  var visible = [],
      numViews = views.length;
  var firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);

  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }

  var lastEdge = horizontal ? right : -1;

  for (var i = firstVisibleElementInd; i < numViews; i++) {
    var view = views[i],
        element = view.div;
    var currentWidth = element.offsetLeft + element.clientLeft;
    var currentHeight = element.offsetTop + element.clientTop;
    var viewWidth = element.clientWidth,
        viewHeight = element.clientHeight;
    var viewRight = currentWidth + viewWidth;
    var viewBottom = currentHeight + viewHeight;

    if (lastEdge === -1) {
      if (viewBottom >= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
      break;
    }

    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right) {
      continue;
    }

    var hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    var hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    var fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
        fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    var percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percent,
      widthPercent: fractionWidth * 100 | 0
    });
  }

  var first = visible[0],
      last = visible[visible.length - 1];

  if (sortByVisibility) {
    visible.sort(function (a, b) {
      var pc = a.percent - b.percent;

      if (Math.abs(pc) > 0.001) {
        return -pc;
      }

      return a.id - b.id;
    });
  }

  return {
    first: first,
    last: last,
    views: visible
  };
}

function noContextMenuHandler(evt) {
  evt.preventDefault();
}

function isDataSchema(url) {
  var i = 0;
  var ii = url.length;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}

function getPDFFileNameFromURL(url) {
  var defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "document.pdf";

  if (window.PDFViewerApplication.appConfig.filenameForDownload) {
    return window.PDFViewerApplication.appConfig.filenameForDownload;
  }

  if (typeof url !== "string") {
    return defaultFilename;
  }

  if (isDataSchema(url)) {
    console.warn("getPDFFileNameFromURL: " + 'ignoring "data:" URL for performance reasons.');
    return defaultFilename;
  }

  var reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  var reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  var splitURI = reURI.exec(url);
  var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);

  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];

    if (suggestedFilename.includes("%")) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch (ex) {}
    }
  }

  return suggestedFilename || defaultFilename;
}

function normalizeWheelEventDirection(evt) {
  var delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
  var angle = Math.atan2(evt.deltaY, evt.deltaX);

  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }

  return delta;
}

function normalizeWheelEventDelta(evt) {
  var delta = normalizeWheelEventDirection(evt);
  var MOUSE_DOM_DELTA_PIXEL_MODE = 0;
  var MOUSE_DOM_DELTA_LINE_MODE = 1;
  var MOUSE_PIXELS_PER_LINE = 30;
  var MOUSE_LINES_PER_PAGE = 30;

  if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }

  return delta;
}

function isValidRotation(angle) {
  return Number.isInteger(angle) && angle % 90 === 0;
}

function isValidScrollMode(mode) {
  return Number.isInteger(mode) && Object.values(ScrollMode).includes(mode) && mode !== ScrollMode.UNKNOWN;
}

function isValidSpreadMode(mode) {
  return Number.isInteger(mode) && Object.values(SpreadMode).includes(mode) && mode !== SpreadMode.UNKNOWN;
}

function isPortraitOrientation(size) {
  return size.width <= size.height;
}

var WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
};
exports.WaitOnType = WaitOnType;

function waitOnEventOrTimeout(_ref3) {
  var target = _ref3.target,
      name = _ref3.name,
      _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay;
  return new Promise(function (resolve, reject) {
    if (_typeof(target) !== "object" || !(name && typeof name === "string") || !(Number.isInteger(delay) && delay >= 0)) {
      throw new Error("waitOnEventOrTimeout - invalid parameters.");
    }

    function handler(type) {
      if (target instanceof EventBus) {
        target._off(name, eventHandler);
      } else {
        target.removeEventListener(name, eventHandler);
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      resolve(type);
    }

    var eventHandler = handler.bind(null, WaitOnType.EVENT);

    if (target instanceof EventBus) {
      target._on(name, eventHandler);
    } else {
      target.addEventListener(name, eventHandler);
    }

    var timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
    var timeout = setTimeout(timeoutHandler, delay);
  });
}

var animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
exports.animationStarted = animationStarted;

function dispatchDOMEvent(eventName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  throw new Error("Not implemented: dispatchDOMEvent");
}

var EventBus = /*#__PURE__*/function () {
  function EventBus(options) {
    _classCallCheck(this, EventBus);

    this._listeners = Object.create(null);
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._on(eventName, listener, {
        external: true,
        once: options === null || options === void 0 ? void 0 : options.once
      });
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._off(eventName, listener, {
        external: true,
        once: options === null || options === void 0 ? void 0 : options.once
      });
    }
  }, {
    key: "dispatch",
    value: function dispatch(eventName) {
      var _this = this;

      var eventListeners = this._listeners[eventName];

      if (!eventListeners || eventListeners.length === 0) {
        return;
      }

      var args = Array.prototype.slice.call(arguments, 1);
      var externalListeners;
      eventListeners.slice(0).forEach(function (_ref4) {
        var listener = _ref4.listener,
            external = _ref4.external,
            once = _ref4.once;

        if (once) {
          _this._off(eventName, listener);
        }

        if (external) {
          (externalListeners || (externalListeners = [])).push(listener);
          return;
        }

        listener.apply(null, args);
      });

      if (externalListeners) {
        externalListeners.forEach(function (listener) {
          listener.apply(null, args);
        });
        externalListeners = null;
      }
    }
  }, {
    key: "_on",
    value: function _on(eventName, listener) {
      var _this$_listeners;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var eventListeners = (_this$_listeners = this._listeners)[eventName] || (_this$_listeners[eventName] = []);
      eventListeners.push({
        listener: listener,
        external: (options === null || options === void 0 ? void 0 : options.external) === true,
        once: (options === null || options === void 0 ? void 0 : options.once) === true
      });
    }
  }, {
    key: "_off",
    value: function _off(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var eventListeners = this._listeners[eventName];

      if (!eventListeners) {
        return;
      }

      for (var i = 0, ii = eventListeners.length; i < ii; i++) {
        if (eventListeners[i].listener === listener) {
          eventListeners.splice(i, 1);
          return;
        }
      }
    }
  }]);

  return EventBus;
}();

exports.EventBus = EventBus;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

var ProgressBar = /*#__PURE__*/function () {
  function ProgressBar(id) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        height = _ref5.height,
        width = _ref5.width,
        units = _ref5.units;

    _classCallCheck(this, ProgressBar);

    this.visible = true;
    this.div = document.querySelector(id + " .progress");

    if (this.div) {
      this.bar = this.div.parentNode;
    }

    this.height = height || 100;
    this.width = width || 100;
    this.units = units || "%";

    if (this.div) {
      this.div.style.height = this.height + this.units;
    }

    this.percent = 0;
  }

  _createClass(ProgressBar, [{
    key: "_updateBar",
    value: function _updateBar() {
      if (this._indeterminate) {
        this.div.classList.add("indeterminate");
        this.div.style.width = this.width + this.units;
        return;
      }

      if (this.div) {
        this.div.classList.remove("indeterminate");
      }

      var progressSize = this.width * this._percent / 100;

      if (this.div) {
        this.div.style.width = progressSize + this.units;
      }
    }
  }, {
    key: "setWidth",
    value: function setWidth(viewer) {
      if (!viewer) {
        return;
      }

      var container = viewer.parentNode;
      var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;

      if (scrollbarWidth > 0) {
        var doc = document.documentElement;
        doc.style.setProperty(LOADINGBAR_END_OFFSET_VAR, "".concat(scrollbarWidth, "px"));
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.visible) {
        return;
      }

      this.visible = false;
      this.div = document.querySelector(".body #mainContainer .progress");

      if (this.div) {
        this.bar = this.div.parentNode;
        this.bar.classList.add("hidden");
      }

      document.body.classList.remove("loadingInProgress");
    }
  }, {
    key: "show",
    value: function show() {
      if (this.visible) {
        return;
      }

      this.visible = true;
      this.bar.classList.remove("hidden");
    }
  }, {
    key: "percent",
    get: function get() {
      return this._percent;
    },
    set: function set(val) {
      this._indeterminate = isNaN(val);
      this._percent = clamp(val, 0, 100);

      this._updateBar();
    }
  }]);

  return ProgressBar;
}();

exports.ProgressBar = ProgressBar;

function moveToEndOfArray(arr, condition) {
  var moved = [],
      len = arr.length;
  var write = 0;

  for (var read = 0; read < len; ++read) {
    if (condition(arr[read])) {
      moved.push(arr[read]);
    } else {
      arr[write] = arr[read];
      ++write;
    }
  }

  for (var _read = 0; write < len; ++_read, ++write) {
    arr[write] = moved[_read];
  }
}

function getActiveOrFocusedElement() {
  var curRoot = document;
  var curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");

  while (curActiveOrFocused && curActiveOrFocused.shadowRoot) {
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  }

  return curActiveOrFocused;
}

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";


module.exports = window["pdfjs-dist/build/pdf"];

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFCursorTools = exports.CursorTool = void 0;

var _grab_to_pan = __webpack_require__(9);

var _ui_utils = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
};
exports.CursorTool = CursorTool;

var PDFCursorTools = /*#__PURE__*/function () {
  function PDFCursorTools(_ref) {
    var _this = this;

    var container = _ref.container,
        eventBus = _ref.eventBus,
        _ref$cursorToolOnLoad = _ref.cursorToolOnLoad,
        cursorToolOnLoad = _ref$cursorToolOnLoad === void 0 ? CursorTool.SELECT : _ref$cursorToolOnLoad;

    _classCallCheck(this, PDFCursorTools);

    this.container = container;
    this.eventBus = eventBus;
    this.active = CursorTool.SELECT;
    this.activeBeforePresentationMode = null;
    this.handTool = new _grab_to_pan.GrabToPan({
      element: this.container
    });

    this._addEventListeners();

    Promise.resolve().then(function () {
      _this.switchTool(cursorToolOnLoad);
    });
  }

  _createClass(PDFCursorTools, [{
    key: "switchTool",
    value: function switchTool(tool) {
      var _this2 = this;

      if (this.activeBeforePresentationMode !== null) {
        return;
      }

      if (tool === this.active) {
        return;
      }

      var disableActiveTool = function disableActiveTool() {
        switch (_this2.active) {
          case CursorTool.SELECT:
            break;

          case CursorTool.HAND:
            _this2.handTool.deactivate();

            break;

          case CursorTool.ZOOM:
        }
      };

      switch (tool) {
        case CursorTool.SELECT:
          disableActiveTool();
          break;

        case CursorTool.HAND:
          disableActiveTool();
          this.handTool.activate();
          break;

        case CursorTool.ZOOM:
        default:
          console.error("switchTool: \"".concat(tool, "\" is an unsupported value."));
          return;
      }

      this.active = tool;

      this._dispatchEvent();
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent() {
      this.eventBus.dispatch("cursortoolchanged", {
        source: this,
        tool: this.active
      });
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this3 = this;

      this.eventBus._on("switchcursortool", function (evt) {
        _this3.switchTool(evt.tool);
      });

      this.eventBus._on("presentationmodechanged", function (evt) {
        switch (evt.state) {
          case _ui_utils.PresentationModeState.CHANGING:
            break;

          case _ui_utils.PresentationModeState.FULLSCREEN:
            {
              var previouslyActive = _this3.active;

              _this3.switchTool(CursorTool.SELECT);

              _this3.activeBeforePresentationMode = previouslyActive;
              break;
            }

          case _ui_utils.PresentationModeState.NORMAL:
            {
              var _previouslyActive = _this3.activeBeforePresentationMode;
              _this3.activeBeforePresentationMode = null;

              _this3.switchTool(_previouslyActive);

              break;
            }
        }
      });
    }
  }, {
    key: "activeTool",
    get: function get() {
      return this.active;
    }
  }]);

  return PDFCursorTools;
}();

exports.PDFCursorTools = PDFCursorTools;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GrabToPan = GrabToPan;

function GrabToPan(options) {
  this.element = options.element;
  this.document = options.element.ownerDocument;

  if (typeof options.ignoreTarget === "function") {
    this.ignoreTarget = options.ignoreTarget;
  }

  this.onActiveChanged = options.onActiveChanged;
  this.activate = this.activate.bind(this);
  this.deactivate = this.deactivate.bind(this);
  this.toggle = this.toggle.bind(this);
  this._onmousedown = this._onmousedown.bind(this);
  this._onmousemove = this._onmousemove.bind(this);
  this._endPan = this._endPan.bind(this);
  var overlay = this.overlay = document.createElement("div");
  overlay.className = "grab-to-pan-grabbing";
}

GrabToPan.prototype = {
  CSS_CLASS_GRAB: "grab-to-pan-grab",
  activate: function GrabToPan_activate() {
    if (!this.active) {
      this.active = true;
      this.element.addEventListener("mousedown", this._onmousedown, true);
      this.element.classList.add(this.CSS_CLASS_GRAB);

      if (this.onActiveChanged) {
        this.onActiveChanged(true);
      }
    }
  },
  deactivate: function GrabToPan_deactivate() {
    if (this.active) {
      this.active = false;
      this.element.removeEventListener("mousedown", this._onmousedown, true);

      this._endPan();

      this.element.classList.remove(this.CSS_CLASS_GRAB);

      if (this.onActiveChanged) {
        this.onActiveChanged(false);
      }
    }
  },
  toggle: function GrabToPan_toggle() {
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  },
  ignoreTarget: function GrabToPan_ignoreTarget(node) {
    return node[matchesSelector]("a[href], a[href] *, input, textarea, button, button *, select, option");
  },
  _onmousedown: function GrabToPan__onmousedown(event) {
    if (event.button !== 0 || this.ignoreTarget(event.target)) {
      return;
    }

    if (event.originalTarget) {
      try {
        event.originalTarget.tagName;
      } catch (e) {
        return;
      }
    }

    this.scrollLeftStart = this.element.scrollLeft;
    this.scrollTopStart = this.element.scrollTop;
    this.clientXStart = event.clientX;
    this.clientYStart = event.clientY;

    if (isOverPerfectScrollbar(this.clientXStart, this.clientYStart, "ps__rail-x")) {
      return;
    }

    if (isOverPerfectScrollbar(this.clientXStart, this.clientYStart, "ps__rail-y")) {
      return;
    }

    this.document.addEventListener("mousemove", this._onmousemove, true);
    this.document.addEventListener("mouseup", this._endPan, true);
    this.element.addEventListener("scroll", this._endPan, true);
    event.preventDefault();
    event.stopPropagation();
    var focusedElement = document.activeElement;

    if (focusedElement && !focusedElement.contains(event.target)) {
      focusedElement.blur();
    }
  },
  _onmousemove: function GrabToPan__onmousemove(event) {
    this.element.removeEventListener("scroll", this._endPan, true);

    if (isLeftMouseReleased(event)) {
      this._endPan();

      return;
    }

    var xDiff = event.clientX - this.clientXStart;
    var yDiff = event.clientY - this.clientYStart;
    var scrollTop = this.scrollTopStart - yDiff;
    var scrollLeft = this.scrollLeftStart - xDiff;

    if (this.element.scrollTo) {
      this.element.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: "instant"
      });
    } else {
      this.element.scrollTop = scrollTop;
      this.element.scrollLeft = scrollLeft;
    }

    if (!this.overlay.parentNode) {
      document.body.appendChild(this.overlay);
    }
  },
  _endPan: function GrabToPan__endPan() {
    this.element.removeEventListener("scroll", this._endPan, true);
    this.document.removeEventListener("mousemove", this._onmousemove, true);
    this.document.removeEventListener("mouseup", this._endPan, true);
    this.overlay.remove();
  }
};
var matchesSelector;
["webkitM", "mozM", "m"].some(function (prefix) {
  var name = prefix + "atches";

  if (name in document.documentElement) {
    matchesSelector = name;
  }

  name += "Selector";

  if (name in document.documentElement) {
    matchesSelector = name;
  }

  return matchesSelector;
});
var isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
var chrome = window.chrome;
var isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
var isSafari6plus = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

function isLeftMouseReleased(event) {
  if ("buttons" in event && isNotIEorIsIE10plus) {
    return !(event.buttons & 1);
  }

  if (isChrome15OrOpera15plus || isSafari6plus) {
    return event.which === 0;
  }

  return false;
}

function isOverPerfectScrollbar(x, y, divName) {
  var perfectScrollbar = document.getElementsByClassName(divName);

  if (perfectScrollbar && perfectScrollbar.length === 1) {
    var _perfectScrollbar$0$g = perfectScrollbar[0].getBoundingClientRect(),
        top = _perfectScrollbar$0$g.top,
        right = _perfectScrollbar$0$g.right,
        bottom = _perfectScrollbar$0$g.bottom,
        left = _perfectScrollbar$0$g.left;

    if (y >= top && y <= bottom) {
      if (x <= right && x >= left) {
        return true;
      }
    }
  }

  return false;
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RenderingStates = exports.PDFRenderingQueue = void 0;

var _pdfjsLib = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CLEANUP_TIMEOUT = 30000;
var RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
exports.RenderingStates = RenderingStates;

var PDFRenderingQueue = /*#__PURE__*/function () {
  function PDFRenderingQueue() {
    _classCallCheck(this, PDFRenderingQueue);

    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
  }

  _createClass(PDFRenderingQueue, [{
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setThumbnailViewer",
    value: function setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
    }
  }, {
    key: "isHighestPriority",
    value: function isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
    }
  }, {
    key: "renderHighestPriority",
    value: function renderHighestPriority(currentlyVisiblePages) {
      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
      }

      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
        return;
      }

      if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
        if (this.pdfThumbnailViewer.forceRendering()) {
          return;
        }
      }

      if (this.printing) {
        return;
      }

      if (this.onIdle) {
        this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
      }
    }
  }, {
    key: "getHighestPriority",
    value: function getHighestPriority(visible, views, scrolledDown) {
      var visibleViews = visible.views;
      var numVisible = visibleViews.length;

      if (numVisible === 0) {
        return null;
      }

      for (var i = 0; i < numVisible; ++i) {
        var view = visibleViews[i].view;

        if (!this.isViewFinished(view)) {
          return view;
        }
      }

      if (scrolledDown) {
        var nextPageIndex = visible.last.id;

        if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
          return views[nextPageIndex];
        }
      } else {
        var previousPageIndex = visible.first.id - 2;

        if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
          return views[previousPageIndex];
        }
      }

      return null;
    }
  }, {
    key: "isViewFinished",
    value: function isViewFinished(view) {
      return view.renderingState === RenderingStates.FINISHED;
    }
  }, {
    key: "renderView",
    value: function renderView(view) {
      var _this = this;

      switch (view.renderingState) {
        case RenderingStates.FINISHED:
          return false;

        case RenderingStates.PAUSED:
          this.highestPriorityPage = view.renderingId;
          view.resume();
          break;

        case RenderingStates.RUNNING:
          this.highestPriorityPage = view.renderingId;
          break;

        case RenderingStates.INITIAL:
          this.highestPriorityPage = view.renderingId;
          view.draw()["finally"](function () {
            _this.renderHighestPriority();
          })["catch"](function (reason) {
            if (reason instanceof _pdfjsLib.RenderingCancelledException) {
              return;
            }

            console.error("renderView: \"".concat(reason, "\""));
          });
          break;
      }

      return true;
    }
  }]);

  return PDFRenderingQueue;
}();

exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OverlayManager = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OverlayManager = /*#__PURE__*/function () {
  function OverlayManager() {
    _classCallCheck(this, OverlayManager);

    this._overlays = {};
    this._active = null;
    this._keyDownBound = this._keyDown.bind(this);
  }

  _createClass(OverlayManager, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, element) {
        var callerCloseMethod,
            canForceClose,
            container,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                callerCloseMethod = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
                canForceClose = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;

                if (!(!name || !element || !(container = element.parentNode))) {
                  _context.next = 6;
                  break;
                }

                throw new Error("Not enough parameters.");

              case 6:
                if (!this._overlays[name]) {
                  _context.next = 8;
                  break;
                }

                throw new Error("The overlay is already registered.");

              case 8:
                this._overlays[name] = {
                  element: element,
                  container: container,
                  callerCloseMethod: callerCloseMethod,
                  canForceClose: canForceClose
                };

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "unregister",
    value: function () {
      var _unregister = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._overlays[name]) {
                  _context2.next = 4;
                  break;
                }

                throw new Error("The overlay does not exist.");

              case 4:
                if (!(this._active === name)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error("The overlay cannot be removed while it is active.");

              case 6:
                delete this._overlays[name];

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregister(_x3) {
        return _unregister.apply(this, arguments);
      }

      return unregister;
    }()
  }, {
    key: "open",
    value: function () {
      var _open = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._overlays[name]) {
                  _context3.next = 4;
                  break;
                }

                throw new Error("The overlay does not exist.");

              case 4:
                if (!this._active) {
                  _context3.next = 14;
                  break;
                }

                if (!this._overlays[name].canForceClose) {
                  _context3.next = 9;
                  break;
                }

                this._closeThroughCaller();

                _context3.next = 14;
                break;

              case 9:
                if (!(this._active === name)) {
                  _context3.next = 13;
                  break;
                }

                throw new Error("The overlay is already active.");

              case 13:
                throw new Error("Another overlay is currently active.");

              case 14:
                this._active = name;

                this._overlays[this._active].element.classList.remove("hidden");

                this._overlays[this._active].container.classList.remove("hidden");

                window.addEventListener("keydown", this._keyDownBound);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function open(_x4) {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(name) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._overlays[name]) {
                  _context4.next = 4;
                  break;
                }

                throw new Error("The overlay does not exist.");

              case 4:
                if (this._active) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("The overlay is currently not active.");

              case 8:
                if (!(this._active !== name)) {
                  _context4.next = 10;
                  break;
                }

                throw new Error("Another overlay is currently active.");

              case 10:
                this._overlays[this._active].container.classList.add("hidden");

                this._overlays[this._active].element.classList.add("hidden");

                this._active = null;
                window.removeEventListener("keydown", this._keyDownBound);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function close(_x5) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "_keyDown",
    value: function _keyDown(evt) {
      if (this._active && evt.keyCode === 27) {
        this._closeThroughCaller();

        evt.preventDefault();
      }
    }
  }, {
    key: "_closeThroughCaller",
    value: function _closeThroughCaller() {
      if (this._overlays[this._active].callerCloseMethod) {
        this._overlays[this._active].callerCloseMethod();
      }

      if (this._active) {
        this.close(this._active);
      }
    }
  }, {
    key: "active",
    get: function get() {
      return this._active;
    }
  }]);

  return OverlayManager;
}();

exports.OverlayManager = OverlayManager;

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PasswordPrompt = void 0;

var _ui_utils = __webpack_require__(6);

var _pdfjsLib = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PasswordPrompt = /*#__PURE__*/function () {
  function PasswordPrompt(options, overlayManager) {
    var _this = this;

    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, PasswordPrompt);

    this.overlayName = options.overlayName;
    this.container = options.container;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this.updateCallback = null;
    this.reason = null;
    this.submitButton.addEventListener("click", this.verify.bind(this));
    this.cancelButton.addEventListener("click", this.close.bind(this));
    this.input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        _this.verify();
      }
    });
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this), true);
  }

  _createClass(PasswordPrompt, [{
    key: "open",
    value: function open() {
      var _this2 = this;

      this.overlayManager.open(this.overlayName).then(function () {
        _this2.input.type = "password";

        _this2.input.focus();

        var promptString;

        if (_this2.reason === _pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
          promptString = _this2.l10n.get("password_invalid", null, "Invalid password. Please try again.");
        } else {
          promptString = _this2.l10n.get("password_label", null, "Enter the password to open this PDF file.");
        }

        promptString.then(function (msg) {
          _this2.label.textContent = msg;
        });
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      this.overlayManager.close(this.overlayName).then(function () {
        _this3.input.type = "";
        _this3.input.value = "";
      });
    }
  }, {
    key: "verify",
    value: function verify() {
      var password = this.input.value;

      if (password && password.length > 0) {
        this.close();
        this.updateCallback(password);
      }
    }
  }, {
    key: "setUpdateCallback",
    value: function setUpdateCallback(updateCallback, reason) {
      this.updateCallback = updateCallback;
      this.reason = reason;
    }
  }]);

  return PasswordPrompt;
}();

exports.PasswordPrompt = PasswordPrompt;

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFAttachmentViewer = void 0;

var _pdfjsLib = __webpack_require__(7);

var _base_tree_viewer = __webpack_require__(14);

var _viewer_compatibility = __webpack_require__(2);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PdfFileRegExp = /\.pdf$/i;

var PDFAttachmentViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFAttachmentViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFAttachmentViewer);

  function PDFAttachmentViewer(options) {
    var _this;

    _classCallCheck(this, PDFAttachmentViewer);

    _this = _super.call(this, options);
    _this.downloadManager = options.downloadManager;

    _this.eventBus._on("fileattachmentannotation", _this._appendAttachment.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PDFAttachmentViewer, [{
    key: "reset",
    value: function reset() {
      var keepRenderedCapability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _get(_getPrototypeOf(PDFAttachmentViewer.prototype), "reset", this).call(this);

      this._attachments = null;

      if (!keepRenderedCapability) {
        this._renderedCapability = (0, _pdfjsLib.createPromiseCapability)();
      }

      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
      }

      this._pendingDispatchEvent = null;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(attachmentsCount) {
      var _this2 = this;

      this._renderedCapability.resolve();

      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
        this._pendingDispatchEvent = null;
      }

      if (attachmentsCount === 0) {
        this._pendingDispatchEvent = setTimeout(function () {
          _this2.eventBus.dispatch("attachmentsloaded", {
            source: _this2,
            attachmentsCount: 0
          });

          _this2._pendingDispatchEvent = null;
        });
        return;
      }

      this.eventBus.dispatch("attachmentsloaded", {
        source: this,
        attachmentsCount: attachmentsCount
      });
    }
  }, {
    key: "_bindPdfLink",
    value: function _bindPdfLink(element, _ref) {
      var _this3 = this;

      var content = _ref.content,
          filename = _ref.filename;
      var blobUrl;

      element.onclick = function () {
        if (!blobUrl) {
          blobUrl = URL.createObjectURL(new Blob([content], {
            type: "application/pdf"
          }));
        }

        var viewerUrl;
        viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);

        try {
          window.open(viewerUrl);
        } catch (ex) {
          console.error("_bindPdfLink: ".concat(ex));
          URL.revokeObjectURL(blobUrl);
          blobUrl = null;

          _this3.downloadManager.downloadData(content, filename, "application/pdf");
        }

        return false;
      };
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref2) {
      var _this4 = this;

      var content = _ref2.content,
          filename = _ref2.filename;

      element.onclick = function () {
        var contentType = PdfFileRegExp.test(filename) ? "application/pdf" : "";

        _this4.downloadManager.downloadData(content, filename, contentType);

        return false;
      };
    }
  }, {
    key: "render",
    value: function render(_ref3) {
      var attachments = _ref3.attachments,
          _ref3$keepRenderedCap = _ref3.keepRenderedCapability,
          keepRenderedCapability = _ref3$keepRenderedCap === void 0 ? false : _ref3$keepRenderedCap;

      if (this._attachments) {
        this.reset(keepRenderedCapability);
      }

      this._attachments = attachments || null;

      if (!attachments) {
        this._dispatchEvent(0);

        return;
      }

      var names = Object.keys(attachments).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      var fragment = document.createDocumentFragment();
      var attachmentsCount = 0;

      var _iterator = _createForOfIteratorHelper(names),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;
          var item = attachments[name];
          var filename = (0, _pdfjsLib.getFilenameFromUrl)(item.filename);
          var div = document.createElement("div");
          div.className = "treeItem";
          var element = document.createElement("a");

          if (PdfFileRegExp.test(filename) && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
            this._bindPdfLink(element, {
              content: item.content,
              filename: filename
            });
          } else {
            this._bindLink(element, {
              content: item.content,
              filename: filename
            });
          }

          element.textContent = this._normalizeTextContent(filename);
          div.appendChild(element);
          fragment.appendChild(div);
          attachmentsCount++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._finishRendering(fragment, attachmentsCount);
    }
  }, {
    key: "_appendAttachment",
    value: function _appendAttachment(_ref4) {
      var _this5 = this;

      var id = _ref4.id,
          filename = _ref4.filename,
          content = _ref4.content;
      var renderedPromise = this._renderedCapability.promise;
      renderedPromise.then(function () {
        if (renderedPromise !== _this5._renderedCapability.promise) {
          return;
        }

        var attachments = _this5._attachments;

        if (!attachments) {
          attachments = Object.create(null);
        } else {
          for (var name in attachments) {
            if (id === name) {
              return;
            }
          }
        }

        attachments[id] = {
          filename: filename,
          content: content
        };

        _this5.render({
          attachments: attachments,
          keepRenderedCapability: true
        });
      });
    }
  }]);

  return PDFAttachmentViewer;
}(_base_tree_viewer.BaseTreeViewer);

exports.PDFAttachmentViewer = PDFAttachmentViewer;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseTreeViewer = void 0;

var _pdfjsLib = __webpack_require__(7);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TREEITEM_OFFSET_TOP = -100;
var TREEITEM_SELECTED_CLASS = "selected";

var BaseTreeViewer = /*#__PURE__*/function () {
  function BaseTreeViewer(options) {
    _classCallCheck(this, BaseTreeViewer);

    if (this.constructor === BaseTreeViewer) {
      throw new Error("Cannot initialize BaseTreeViewer.");
    }

    this.container = options.container;
    this.eventBus = options.eventBus;
    this.reset();
  }

  _createClass(BaseTreeViewer, [{
    key: "reset",
    value: function reset() {
      this._pdfDocument = null;
      this._lastToggleIsShow = true;
      this._currentTreeItem = null;
      this.container.textContent = "";
      this.container.classList.remove("treeWithDeepNesting");
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(count) {
      throw new Error("Not implemented: _dispatchEvent");
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, params) {
      throw new Error("Not implemented: _bindLink");
    }
  }, {
    key: "_normalizeTextContent",
    value: function _normalizeTextContent(str) {
      return (0, _pdfjsLib.removeNullCharacters)(str) || "\u2013";
    }
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div) {
      var _this = this;

      var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var toggler = document.createElement("div");
      toggler.className = "treeItemToggler";

      if (hidden) {
        toggler.classList.add("treeItemsHidden");
      }

      toggler.onclick = function (evt) {
        evt.stopPropagation();
        toggler.classList.toggle("treeItemsHidden");

        if (evt.shiftKey) {
          var shouldShowAll = !toggler.classList.contains("treeItemsHidden");

          _this._toggleTreeItem(div, shouldShowAll);
        }
      };

      div.insertBefore(toggler, div.firstChild);
    }
  }, {
    key: "_toggleTreeItem",
    value: function _toggleTreeItem(root) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._lastToggleIsShow = show;

      var _iterator = _createForOfIteratorHelper(root.querySelectorAll(".treeItemToggler")),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var toggler = _step.value;
          toggler.classList.toggle("treeItemsHidden", !show);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      this._toggleTreeItem(this.container, !this._lastToggleIsShow);
    }
  }, {
    key: "_finishRendering",
    value: function _finishRendering(fragment, count) {
      var hasAnyNesting = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (hasAnyNesting) {
        this.container.classList.add("treeWithDeepNesting");
        this._lastToggleIsShow = !fragment.querySelector(".treeItemsHidden");
      }

      this.container.appendChild(fragment);

      this._dispatchEvent(count);
    }
  }, {
    key: "render",
    value: function render(params) {
      throw new Error("Not implemented: render");
    }
  }, {
    key: "_updateCurrentTreeItem",
    value: function _updateCurrentTreeItem() {
      var treeItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this._currentTreeItem) {
        this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);

        this._currentTreeItem = null;
      }

      if (treeItem) {
        treeItem.classList.add(TREEITEM_SELECTED_CLASS);
        this._currentTreeItem = treeItem;
      }
    }
  }, {
    key: "_scrollToCurrentTreeItem",
    value: function _scrollToCurrentTreeItem(treeItem) {
      if (!treeItem) {
        return;
      }

      var currentNode = treeItem.parentNode;

      while (currentNode && currentNode !== this.container) {
        if (currentNode.classList.contains("treeItem")) {
          var toggler = currentNode.firstElementChild;
          toggler === null || toggler === void 0 ? void 0 : toggler.classList.remove("treeItemsHidden");
        }

        currentNode = currentNode.parentNode;
      }

      this._updateCurrentTreeItem(treeItem);

      this.container.scrollTo(treeItem.offsetLeft, treeItem.offsetTop + TREEITEM_OFFSET_TOP);
    }
  }]);

  return BaseTreeViewer;
}();

exports.BaseTreeViewer = BaseTreeViewer;

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFDocumentProperties = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _pdfjsLib = __webpack_require__(7);

var _ui_utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_FIELD_CONTENT = "-";
var NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];
var US_PAGE_NAMES = {
  "8.5x11": "Letter",
  "8.5x14": "Legal"
};
var METRIC_PAGE_NAMES = {
  "297x420": "A3",
  "210x297": "A4"
};

function getPageName(size, isPortrait, pageNames) {
  var width = isPortrait ? size.width : size.height;
  var height = isPortrait ? size.height : size.width;
  return pageNames["".concat(width, "x").concat(height)];
}

var PDFDocumentProperties = /*#__PURE__*/function () {
  function PDFDocumentProperties(_ref, overlayManager, eventBus) {
    var _this = this;

    var overlayName = _ref.overlayName,
        fields = _ref.fields,
        container = _ref.container,
        closeButton = _ref.closeButton;
    var l10n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ui_utils.NullL10n;

    _classCallCheck(this, PDFDocumentProperties);

    this.overlayName = overlayName;
    this.fields = fields;
    this.container = container;
    this.overlayManager = overlayManager;
    this.l10n = l10n;

    this._reset();

    closeButton.addEventListener("click", this.close.bind(this));
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this));

    eventBus._on("pagechanging", function (evt) {
      _this._currentPageNumber = evt.pageNumber;
    });

    eventBus._on("rotationchanging", function (evt) {
      _this._pagesRotation = evt.pagesRotation;
    });

    this._isNonMetricLocale = true;
    l10n.getLanguage().then(function (locale) {
      _this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
    });
  }

  _createClass(PDFDocumentProperties, [{
    key: "open",
    value: function () {
      var _open = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this2 = this;

        var freezeFieldData, currentPageNumber, pagesRotation, _yield$this$pdfDocume, info, contentDispositionFilename, contentLength, _yield$Promise$all, _yield$Promise$all2, fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized, _yield$this$pdfDocume2, length, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                freezeFieldData = function freezeFieldData(data) {
                  Object.defineProperty(_this2, "fieldData", {
                    value: Object.freeze(data),
                    writable: false,
                    enumerable: true,
                    configurable: true
                  });
                };

                _context.next = 3;
                return Promise.all([this.overlayManager.open(this.overlayName), this._dataAvailableCapability.promise]);

              case 3:
                currentPageNumber = this._currentPageNumber;
                pagesRotation = this._pagesRotation;

                if (!(this.fieldData && currentPageNumber === this.fieldData._currentPageNumber && pagesRotation === this.fieldData._pagesRotation)) {
                  _context.next = 8;
                  break;
                }

                this._updateUI();

                return _context.abrupt("return");

              case 8:
                _context.next = 10;
                return this.pdfDocument.getMetadata();

              case 10:
                _yield$this$pdfDocume = _context.sent;
                info = _yield$this$pdfDocume.info;
                contentDispositionFilename = _yield$this$pdfDocume.contentDispositionFilename;
                contentLength = _yield$this$pdfDocume.contentLength;
                _context.next = 16;
                return Promise.all([contentDispositionFilename || (0, _ui_utils.getPDFFileNameFromURL)(this.url), this._parseFileSize(contentLength), this._parseDate(info.CreationDate), this._parseDate(info.ModDate), this.pdfDocument.getPage(currentPageNumber).then(function (pdfPage) {
                  return _this2._parsePageSize((0, _ui_utils.getPageSizeInches)(pdfPage), pagesRotation);
                }), this._parseLinearization(info.IsLinearized)]);

              case 16:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 6);
                fileName = _yield$Promise$all2[0];
                fileSize = _yield$Promise$all2[1];
                creationDate = _yield$Promise$all2[2];
                modificationDate = _yield$Promise$all2[3];
                pageSize = _yield$Promise$all2[4];
                isLinearized = _yield$Promise$all2[5];
                freezeFieldData({
                  fileName: fileName,
                  fileSize: fileSize,
                  title: info.Title,
                  author: info.Author,
                  subject: info.Subject,
                  keywords: info.Keywords,
                  creationDate: creationDate,
                  modificationDate: modificationDate,
                  creator: info.Creator,
                  producer: info.Producer,
                  version: info.PDFFormatVersion,
                  pageCount: this.pdfDocument.numPages,
                  pageSize: pageSize,
                  linearized: isLinearized,
                  _currentPageNumber: currentPageNumber,
                  _pagesRotation: pagesRotation
                });

                this._updateUI();

                _context.next = 28;
                return this.pdfDocument.getDownloadInfo();

              case 28:
                _yield$this$pdfDocume2 = _context.sent;
                length = _yield$this$pdfDocume2.length;

                if (!(contentLength === length)) {
                  _context.next = 32;
                  break;
                }

                return _context.abrupt("return");

              case 32:
                data = Object.assign(Object.create(null), this.fieldData);
                _context.next = 35;
                return this._parseFileSize(length);

              case 35:
                data.fileSize = _context.sent;
                freezeFieldData(data);

                this._updateUI();

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open() {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "close",
    value: function close() {
      this.overlayManager.close(this.overlayName);
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.pdfDocument) {
        this._reset();

        this._updateUI(true);
      }

      if (!pdfDocument) {
        return;
      }

      this.pdfDocument = pdfDocument;
      this.url = url;

      this._dataAvailableCapability.resolve();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.pdfDocument = null;
      this.url = null;
      delete this.fieldData;
      this._dataAvailableCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._currentPageNumber = 1;
      this._pagesRotation = 0;
    }
  }, {
    key: "_updateUI",
    value: function _updateUI() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (reset || !this.fieldData) {
        for (var id in this.fields) {
          this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
        }

        return;
      }

      if (this.overlayManager.active !== this.overlayName) {
        return;
      }

      for (var _id in this.fields) {
        var content = this.fieldData[_id];
        this.fields[_id].textContent = content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
      }
    }
  }, {
    key: "_parseFileSize",
    value: function () {
      var _parseFileSize2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var fileSize,
            kb,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fileSize = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;
                kb = fileSize / 1024;

                if (kb) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", undefined);

              case 6:
                if (!(kb < 1024)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", this.l10n.get("document_properties_kb", {
                  size_kb: (+kb.toPrecision(3)).toLocaleString(),
                  size_b: fileSize.toLocaleString()
                }, "{{size_kb}} KB ({{size_b}} bytes)"));

              case 8:
                return _context2.abrupt("return", this.l10n.get("document_properties_mb", {
                  size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
                  size_b: fileSize.toLocaleString()
                }, "{{size_mb}} MB ({{size_b}} bytes)"));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _parseFileSize() {
        return _parseFileSize2.apply(this, arguments);
      }

      return _parseFileSize;
    }()
  }, {
    key: "_parsePageSize",
    value: function () {
      var _parsePageSize2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(pageSizeInches, pagesRotation) {
        var _this3 = this;

        var isPortrait, sizeInches, sizeMillimeters, pageName, rawName, exactMillimeters, intMillimeters;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (pageSizeInches) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", undefined);

              case 2:
                if (pagesRotation % 180 !== 0) {
                  pageSizeInches = {
                    width: pageSizeInches.height,
                    height: pageSizeInches.width
                  };
                }

                isPortrait = (0, _ui_utils.isPortraitOrientation)(pageSizeInches);
                sizeInches = {
                  width: Math.round(pageSizeInches.width * 100) / 100,
                  height: Math.round(pageSizeInches.height * 100) / 100
                };
                sizeMillimeters = {
                  width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
                  height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
                };
                pageName = null;
                rawName = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);

                if (!rawName && !(Number.isInteger(sizeMillimeters.width) && Number.isInteger(sizeMillimeters.height))) {
                  exactMillimeters = {
                    width: pageSizeInches.width * 25.4,
                    height: pageSizeInches.height * 25.4
                  };
                  intMillimeters = {
                    width: Math.round(sizeMillimeters.width),
                    height: Math.round(sizeMillimeters.height)
                  };

                  if (Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1) {
                    rawName = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);

                    if (rawName) {
                      sizeInches = {
                        width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
                        height: Math.round(intMillimeters.height / 25.4 * 100) / 100
                      };
                      sizeMillimeters = intMillimeters;
                    }
                  }
                }

                if (rawName) {
                  pageName = this.l10n.get("document_properties_page_size_name_" + rawName.toLowerCase(), null, rawName);
                }

                return _context3.abrupt("return", Promise.all([this._isNonMetricLocale ? sizeInches : sizeMillimeters, this.l10n.get("document_properties_page_size_unit_" + (this._isNonMetricLocale ? "inches" : "millimeters"), null, this._isNonMetricLocale ? "in" : "mm"), pageName, this.l10n.get("document_properties_page_size_orientation_" + (isPortrait ? "portrait" : "landscape"), null, isPortrait ? "portrait" : "landscape")]).then(function (_ref2) {
                  var _ref3 = _slicedToArray(_ref2, 4),
                      _ref3$ = _ref3[0],
                      width = _ref3$.width,
                      height = _ref3$.height,
                      unit = _ref3[1],
                      name = _ref3[2],
                      orientation = _ref3[3];

                  return _this3.l10n.get("document_properties_page_size_dimension_" + (name ? "name_" : "") + "string", {
                    width: width.toLocaleString(),
                    height: height.toLocaleString(),
                    unit: unit,
                    name: name,
                    orientation: orientation
                  }, "{{width}} × {{height}} {{unit}} (" + (name ? "{{name}}, " : "") + "{{orientation}})");
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _parsePageSize(_x, _x2) {
        return _parsePageSize2.apply(this, arguments);
      }

      return _parsePageSize;
    }()
  }, {
    key: "_parseDate",
    value: function () {
      var _parseDate2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(inputDate) {
        var dateObject;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dateObject = _pdfjsLib.PDFDateString.toDateObject(inputDate);

                if (dateObject) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", undefined);

              case 3:
                return _context4.abrupt("return", this.l10n.get("document_properties_date_string", {
                  date: dateObject.toLocaleDateString(),
                  time: dateObject.toLocaleTimeString()
                }, "{{date}}, {{time}}"));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _parseDate(_x3) {
        return _parseDate2.apply(this, arguments);
      }

      return _parseDate;
    }()
  }, {
    key: "_parseLinearization",
    value: function _parseLinearization(isLinearized) {
      return this.l10n.get("document_properties_linearized_" + (isLinearized ? "yes" : "no"), null, isLinearized ? "Yes" : "No");
    }
  }]);

  return PDFDocumentProperties;
}();

exports.PDFDocumentProperties = PDFDocumentProperties;

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFindBar = void 0;

var _pdf_find_controller = __webpack_require__(17);

var _ui_utils = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MATCHES_COUNT_LIMIT = 1000;

var PDFFindBar = /*#__PURE__*/function () {
  function PDFFindBar(options, eventBus) {
    var _this = this;

    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, PDFFindBar);

    this.opened = false;
    this.bar = options.bar || null;
    this.toggleButton = options.toggleButton || null;
    this.findField = options.findField || null;
    this.findFieldMultiline = options.findFieldMultiline || null;
    this.highlightAll = options.highlightAllCheckbox || null;
    this.caseSensitive = options.caseSensitiveCheckbox || null;
    this.entireWord = options.entireWordCheckbox || null;
    this.multipleSearchTexts = options.findMultipleSearchTextsCheckbox || null;
    this.ignoreAccents = options.ignoreAccentsCheckbox || null;
    this.fuzzySearch = options.fuzzyCheckbox || null;
    this.findMsg = options.findMsg || null;
    this.findResultsCount = options.findResultsCount || null;
    this.findPreviousButton = options.findPreviousButton || null;
    this.findNextButton = options.findNextButton || null;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.toggleButton.addEventListener("click", function () {
      _this.toggle();
    });
    this.findFieldMultiline.addEventListener("input", function () {
      _this.dispatchEvent("");
    });
    this.findField.addEventListener("input", function () {
      _this.dispatchEvent("");
    });
    this.bar.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 13:
          if (e.target === _this.findField) {
            _this.dispatchEvent("again", e.shiftKey);
          }

          break;

        case 27:
          _this.close();

          break;
      }
    });
    this.findPreviousButton.addEventListener("click", function () {
      _this.dispatchEvent("again", true);
    });
    this.findNextButton.addEventListener("click", function () {
      _this.dispatchEvent("again", false);
    });
    this.highlightAll.addEventListener("click", function () {
      _this.dispatchEvent("highlightallchange");
    });
    this.caseSensitive.addEventListener("click", function () {
      _this.dispatchEvent("casesensitivitychange");
    });
    this.entireWord.addEventListener("click", function () {
      _this.dispatchEvent("entirewordchange");
    });
    this.multipleSearchTexts.addEventListener("click", function () {
      _this.dispatchEvent("multiplesearchtextschange");
    });
    this.ignoreAccents.addEventListener("click", function () {
      _this.dispatchEvent("ignoreAccentsChange");
    });
    this.fuzzySearch.addEventListener("click", function () {
      _this.dispatchEvent("fuzzySearchChange");
    });

    this.eventBus._on("resize", this._adjustWidth.bind(this));
  }

  _createClass(PDFFindBar, [{
    key: "reset",
    value: function reset() {
      this.updateUIState();
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, findPrev) {
      this.eventBus.dispatch("find", {
        source: this,
        type: type,
        query: this.findFieldMultiline.classList.contains("hidden") ? this.findField.value : this.findFieldMultiline.value,
        phraseSearch: !this.multipleSearchTexts.checked,
        caseSensitive: this.caseSensitive.checked,
        entireWord: this.entireWord.checked,
        ignoreAccents: this.ignoreAccents.checked,
        fuzzySearch: this.fuzzySearch.checked,
        highlightAll: this.highlightAll.checked,
        findPrevious: findPrev
      });
    }
  }, {
    key: "updateUIState",
    value: function updateUIState(state, previous, matchesCount) {
      var _this2 = this;

      var findMsg = "";
      var status = "";

      switch (state) {
        case _pdf_find_controller.FindState.FOUND:
          break;

        case _pdf_find_controller.FindState.PENDING:
          status = "pending";
          break;

        case _pdf_find_controller.FindState.NOT_FOUND:
          findMsg = this.l10n.get("find_not_found", null, "Phrase not found");
          status = "notFound";
          break;

        case _pdf_find_controller.FindState.WRAPPED:
          if (previous) {
            findMsg = this.l10n.get("find_reached_top", null, "Reached top of document, continued from bottom");
          } else {
            findMsg = this.l10n.get("find_reached_bottom", null, "Reached end of document, continued from top");
          }

          break;
      }

      this.findField.setAttribute("data-status", status);
      this.findFieldMultiline.classList.toggle("notFound", status === "notFound");
      this.findFieldMultiline.setAttribute("data-status", status);
      Promise.resolve(findMsg).then(function (msg) {
        _this2.findMsg.textContent = msg;

        _this2._adjustWidth();
      });
      this.updateResultsCount(matchesCount);
    }
  }, {
    key: "updateResultsCount",
    value: function updateResultsCount() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$current = _ref.current,
          current = _ref$current === void 0 ? 0 : _ref$current,
          _ref$total = _ref.total,
          total = _ref$total === void 0 ? 0 : _ref$total;

      if (!this.findResultsCount) {
        return;
      }

      var limit = MATCHES_COUNT_LIMIT;
      var matchesCountMsg = "";

      if (total > 0) {
        if (total > limit) {
          matchesCountMsg = this.l10n.get("find_match_count_limit", {
            limit: limit
          }, "More than {{limit}} match" + (limit !== 1 ? "es" : ""));
        } else {
          matchesCountMsg = this.l10n.get("find_match_count", {
            current: current,
            total: total
          }, "{{current}} of {{total}} match" + (total !== 1 ? "es" : ""));
        }
      }

      Promise.resolve(matchesCountMsg).then(function (msg) {
        _this3.findResultsCount.textContent = msg;

        _this3.findResultsCount.classList.toggle("hidden", !total);

        _this3._adjustWidth();
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (!this.opened) {
        this.opened = true;
        this.toggleButton.classList.add("toggled");
        this.bar.classList.remove("hidden");
      }

      this.findField.select();
      this.findField.focus();
      this.dispatchEvent("");

      this._adjustWidth();
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.opened) {
        return;
      }

      this.opened = false;
      this.toggleButton.classList.remove("toggled");
      this.bar.classList.add("hidden");
      this.eventBus.dispatch("findbarclose", {
        source: this
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_adjustWidth",
    value: function _adjustWidth() {
      if (!this.opened) {
        return;
      }

      this.bar.classList.remove("wrapContainers");
      var findbarHeight = this.bar.clientHeight;
      var inputContainerHeight = this.bar.firstElementChild.clientHeight;

      if (findbarHeight > inputContainerHeight) {
        this.bar.classList.add("wrapContainers");
      }
    }
  }]);

  return PDFFindBar;
}();

exports.PDFFindBar = PDFFindBar;

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFindController = exports.FindState = void 0;

var _pdfjsLib = __webpack_require__(7);

var _index = __webpack_require__(18);

var _pdf_find_utils = __webpack_require__(19);

var _levenshtein = __webpack_require__(20);

var _ui_utils = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
exports.FindState = FindState;
var FIND_TIMEOUT = 250;
var MATCH_SCROLL_OFFSET_TOP = -50;
var MATCH_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\xBC": "1/4",
  "\xBD": "1/2",
  "\xBE": "3/4"
};
var normalizationRegex = null;

function normalize(text) {
  if (!normalizationRegex) {
    var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    normalizationRegex = new RegExp("[".concat(replace, "]"), "g");
  }

  var diffs = null;
  var normalizedText = text.replace(normalizationRegex, function (ch, index) {
    var normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
        diff = normalizedCh.length - ch.length;

    if (diff !== 0) {
      (diffs || (diffs = [])).push([index, diff]);
    }

    return normalizedCh;
  });
  return [normalizedText, diffs];
}

function getOriginalIndex(matchIndex) {
  var diffs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!diffs) {
    return matchIndex;
  }

  var totalDiff = 0;

  var _iterator = _createForOfIteratorHelper(diffs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          diff = _step$value[1];

      var currentIndex = index + totalDiff;

      if (currentIndex >= matchIndex) {
        break;
      }

      if (currentIndex + diff > matchIndex) {
        totalDiff += matchIndex - currentIndex;
        break;
      }

      totalDiff += diff;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return matchIndex - totalDiff;
}

var PDFFindController = /*#__PURE__*/function () {
  function PDFFindController(_ref) {
    var linkService = _ref.linkService,
        eventBus = _ref.eventBus,
        pageViewMode = _ref.pageViewMode;

    _classCallCheck(this, PDFFindController);

    this._linkService = linkService;
    this._eventBus = eventBus;
    this._pageViewMode = pageViewMode;

    this._reset();

    eventBus._on("findbarclose", this._onFindBarClose.bind(this));
  }

  _createClass(PDFFindController, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      if (this._pdfDocument) {
        this._reset();
      }

      if (!pdfDocument) {
        return;
      }

      this._pdfDocument = pdfDocument;

      this._firstPageCapability.resolve();
    }
  }, {
    key: "executeCommand",
    value: function executeCommand(cmd, state) {
      var _this = this;

      if (!state) {
        return;
      }

      var pdfDocument = this._pdfDocument;

      if (this._state === null || this._shouldDirtyMatch(cmd, state)) {
        this._dirtyMatch = true;
      }

      this._state = state;

      if (cmd !== "findhighlightallchange") {
        this._updateUIState(FindState.PENDING);
      }

      this._firstPageCapability.promise.then(function () {
        if (!_this._pdfDocument || pdfDocument && _this._pdfDocument !== pdfDocument) {
          return;
        }

        _this._extractText();

        var findbarClosed = !_this._highlightMatches;
        var pendingTimeout = !!_this._findTimeout;

        if (_this._findTimeout) {
          clearTimeout(_this._findTimeout);
          _this._findTimeout = null;
        }

        if (cmd === "find") {
          _this._findTimeout = setTimeout(function () {
            _this._nextMatch();

            _this._findTimeout = null;
          }, FIND_TIMEOUT);
        } else if (_this._dirtyMatch) {
          _this._nextMatch();
        } else if (cmd === "findagain") {
          _this._nextMatch();

          if (findbarClosed && _this._state.highlightAll) {
            _this._updateAllPages();
          }
        } else if (cmd === "findhighlightallchange") {
          if (pendingTimeout) {
            _this._nextMatch();
          } else {
            _this._highlightMatches = true;
          }

          _this._updateAllPages();
        } else {
          _this._nextMatch();
        }
      });
    }
  }, {
    key: "scrollMatchIntoView",
    value: function scrollMatchIntoView(_ref2) {
      var _ref2$element = _ref2.element,
          element = _ref2$element === void 0 ? null : _ref2$element,
          _ref2$pageIndex = _ref2.pageIndex,
          pageIndex = _ref2$pageIndex === void 0 ? -1 : _ref2$pageIndex,
          _ref2$matchIndex = _ref2.matchIndex,
          matchIndex = _ref2$matchIndex === void 0 ? -1 : _ref2$matchIndex;

      if (!this._scrollMatches || !element) {
        return;
      } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
        return;
      } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
        return;
      }

      this._scrollMatches = false;
      var spot = {
        top: MATCH_SCROLL_OFFSET_TOP,
        left: MATCH_SCROLL_OFFSET_LEFT
      };
      (0, _ui_utils.scrollIntoView)(element, spot, true, this._pageViewMode === 'infinite-scroll');
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._highlightMatches = false;
      this._scrollMatches = false;
      this._pdfDocument = null;
      this._pageMatches = [];
      this._pageMatchesLength = [];
      this._pageMatchesColor = [];
      this._state = null;
      this._selected = {
        pageIdx: -1,
        matchIdx: -1
      };
      this._offset = {
        pageIdx: null,
        matchIdx: null,
        wrapped: false
      };
      this._extractTextPromises = [];
      this._pageContents = [];
      this._pageDiffs = [];
      this._matchesCountTotal = 0;
      this._pagesToSearch = null;
      this._pendingFindMatches = Object.create(null);
      this._resumePageIdx = null;
      this._dirtyMatch = false;
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
      this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
    }
  }, {
    key: "_shouldDirtyMatch",
    value: function _shouldDirtyMatch(cmd, state) {
      if (state.query !== this._state.query) {
        return true;
      }

      switch (cmd) {
        case "findagain":
          var pageNumber = this._selected.pageIdx + 1;
          var linkService = this._linkService;

          if (pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !linkService.isPageVisible(pageNumber)) {
            return true;
          }

          return false;

        case "findhighlightallchange":
          return false;
      }

      return true;
    }
  }, {
    key: "_prepareMatches",
    value: function _prepareMatches(matchesWithLength, matches, matchesLength, matchesColor) {
      function isSubTerm(currentIndex) {
        var currentElem = matchesWithLength[currentIndex];
        var nextElem = matchesWithLength[currentIndex + 1];

        if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
          currentElem.skipped = true;
          return true;
        }

        for (var i = currentIndex - 1; i >= 0; i--) {
          var prevElem = matchesWithLength[i];

          if (prevElem.skipped) {
            continue;
          }

          if (prevElem.match + prevElem.matchLength < currentElem.match) {
            break;
          }

          if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
            currentElem.skipped = true;
            return true;
          }
        }

        return false;
      }

      matchesWithLength.sort(function (a, b) {
        return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
      });

      for (var i = 0, len = matchesWithLength.length; i < len; i++) {
        if (isSubTerm(i)) {
          continue;
        }

        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
        matchesColor.push(matchesWithLength[i].color);
      }
    }
  }, {
    key: "_isEntireWord",
    value: function _isEntireWord(content, startIdx, length) {
      if (startIdx > 0) {
        var first = content.charCodeAt(startIdx);
        var limit = content.charCodeAt(startIdx - 1);

        if ((0, _pdf_find_utils.getCharacterType)(first) === (0, _pdf_find_utils.getCharacterType)(limit)) {
          return false;
        }
      }

      var endIdx = startIdx + length - 1;

      if (endIdx < content.length - 1) {
        var last = content.charCodeAt(endIdx);

        var _limit = content.charCodeAt(endIdx + 1);

        if ((0, _pdf_find_utils.getCharacterType)(last) === (0, _pdf_find_utils.getCharacterType)(_limit)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_calculateFuzzyMatch",
    value: function _calculateFuzzyMatch(query, pageIndex, pageContent, pageDiffs) {
      var matches = [];
      var matchesLength = [];
      var queryLen = query.length;
      var shortLen = queryLen < 5 ? queryLen : 5;
      var maxDistance = Math.round(queryLen / 5);
      var shortQuery = query.substring(0, shortLen);
      var options = {
        useCollator: true
      };

      for (var i = 0; i < pageContent.length - queryLen; i++) {
        var shortCurrentContent = pageContent.substring(i, i + shortLen);

        if (_levenshtein.Levenshtein.distance(shortQuery, shortCurrentContent, options) < 3) {
          var currentContent = pageContent.substring(i, i + queryLen);

          var distance = _levenshtein.Levenshtein.distance(query, currentContent, options);

          if (distance <= maxDistance) {
            if (i + 1 < pageContent.length - queryLen) {
              var nextCurrentContent = pageContent.substring(i + 1, i + 1 + queryLen);

              var nextDistance = _levenshtein.Levenshtein.distance(query, nextCurrentContent, options);

              if (distance >= nextDistance) {
                continue;
              }
            }

            var originalMatchIdx = getOriginalIndex(i, pageDiffs),
                matchEnd = i + queryLen - 1,
                originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
            matches.push(originalMatchIdx);
            matchesLength.push(originalQueryLen);
            i += queryLen - 1;
          }
        }
      }

      this._pageMatches[pageIndex] = matches;
      this._pageMatchesLength[pageIndex] = matchesLength;
    }
  }, {
    key: "_calculatePhraseMatch",
    value: function _calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord, ignoreAccents) {
      if (ignoreAccents) {
        pageContent = (0, _index.deburr)(pageContent);
        query = (0, _index.deburr)(query);
      }

      var matches = [],
          matchesLength = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;

      while (true) {
        matchIdx = pageContent.indexOf(query, matchIdx + queryLen);

        if (matchIdx === -1) {
          break;
        }

        if (entireWord && !this._isEntireWord(pageContent, matchIdx, queryLen)) {
          continue;
        }

        var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
            matchEnd = matchIdx + queryLen - 1,
            originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
        matches.push(originalMatchIdx);
        matchesLength.push(originalQueryLen);
      }

      this._pageMatches[pageIndex] = matches;
      this._pageMatchesLength[pageIndex] = matchesLength;
    }
  }, {
    key: "_calculateWordMatch",
    value: function _calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord, ignoreAccents) {
      if (ignoreAccents) {
        pageContent = (0, _index.deburr)(pageContent);
        query = (0, _index.deburr)(query);
      }

      var matchesWithLength = [];
      var queryArray = query.includes("\n") ? query.trim().split(/\n+/g) : query.trim().match(/\S+/g);

      for (var i = 0, len = queryArray.length; i < len; i++) {
        var subquery = queryArray[i];
        var subqueryLen = subquery.length;

        if (subqueryLen === 0) {
          continue;
        }

        var matchIdx = -subqueryLen;

        while (true) {
          matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);

          if (matchIdx === -1) {
            break;
          }

          if (entireWord && !this._isEntireWord(pageContent, matchIdx, subqueryLen)) {
            continue;
          }

          var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
              matchEnd = matchIdx + subqueryLen - 1,
              originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
          matchesWithLength.push({
            match: originalMatchIdx,
            matchLength: originalQueryLen,
            skipped: false,
            color: i
          });
        }
      }

      this._pageMatchesLength[pageIndex] = [];
      this._pageMatchesColor[pageIndex] = [];
      this._pageMatches[pageIndex] = [];

      this._prepareMatches(matchesWithLength, this._pageMatches[pageIndex], this._pageMatchesLength[pageIndex], this._pageMatchesColor[pageIndex]);
    }
  }, {
    key: "_calculateMatch",
    value: function _calculateMatch(pageIndex) {
      var pageContent = this._pageContents[pageIndex];
      var pageDiffs = this._pageDiffs[pageIndex];
      var query = this._query;
      var _this$_state = this._state,
          caseSensitive = _this$_state.caseSensitive,
          entireWord = _this$_state.entireWord,
          ignoreAccents = _this$_state.ignoreAccents,
          fuzzySearch = _this$_state.fuzzySearch,
          phraseSearch = _this$_state.phraseSearch;

      if (query.length === 0) {
        return;
      }

      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
      }

      if (fuzzySearch) {
        if (query.length <= 2) {
          this._calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, false);
        } else {
          this._calculateFuzzyMatch(query, pageIndex, pageContent, pageDiffs);
        }
      } else if (phraseSearch) {
        this._calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord, ignoreAccents);
      } else {
        this._calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord, ignoreAccents);
      }

      if (this._state.highlightAll) {
        this._updatePage(pageIndex);
      }

      if (this._resumePageIdx === pageIndex) {
        this._resumePageIdx = null;

        this._nextPageMatch();
      }

      var pageMatchesCount = this._pageMatches[pageIndex].length;

      if (pageMatchesCount > 0) {
        this._matchesCountTotal += pageMatchesCount;

        this._updateUIResultsCount();
      }
    }
  }, {
    key: "_extractText",
    value: function _extractText() {
      var _this2 = this;

      if (this._extractTextPromises.length > 0) {
        return;
      }

      var promise = Promise.resolve();

      var _loop = function _loop(i, ii) {
        var extractTextCapability = (0, _pdfjsLib.createPromiseCapability)();
        _this2._extractTextPromises[i] = extractTextCapability.promise;
        promise = promise.then(function () {
          return _this2._pdfDocument.getPage(i + 1).then(function (pdfPage) {
            return pdfPage.getTextContent({
              normalizeWhitespace: true
            });
          }).then(function (textContent) {
            var textItems = textContent.items;
            var strBuf = [];

            for (var j = 0, jj = textItems.length; j < jj; j++) {
              strBuf.push(textItems[j].str);
            }

            var _normalize = normalize(strBuf.join(""));

            var _normalize2 = _slicedToArray(_normalize, 2);

            _this2._pageContents[i] = _normalize2[0];
            _this2._pageDiffs[i] = _normalize2[1];
            extractTextCapability.resolve(i);
          }, function (reason) {
            console.error("Unable to get text content for page ".concat(i + 1), reason);
            _this2._pageContents[i] = "";
            _this2._pageDiffs[i] = null;
            extractTextCapability.resolve(i);
          });
        });
      };

      for (var i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
        _loop(i, ii);
      }
    }
  }, {
    key: "_updatePage",
    value: function _updatePage(index) {
      if (this._scrollMatches && this._selected.pageIdx === index) {
        this._linkService.page = index + 1;
      }

      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: index
      });
    }
  }, {
    key: "_updateAllPages",
    value: function _updateAllPages() {
      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: -1
      });
    }
  }, {
    key: "_nextMatch",
    value: function _nextMatch() {
      var _this3 = this;

      var previous = this._state.findPrevious;
      var currentPageIndex = this._linkService.page - 1;
      var numPages = this._linkService.pagesCount;
      this._highlightMatches = true;

      if (this._dirtyMatch) {
        this._dirtyMatch = false;
        this._selected.pageIdx = this._selected.matchIdx = -1;
        this._offset.pageIdx = currentPageIndex;
        this._offset.matchIdx = null;
        this._offset.wrapped = false;
        this._resumePageIdx = null;
        this._pageMatches.length = 0;
        this._pageMatchesLength.length = 0;
        this._pageMatchesColor.length = 0;
        this._matchesCountTotal = 0;

        this._updateAllPages();

        for (var i = 0; i < numPages; i++) {
          if (this._pendingFindMatches[i] === true) {
            continue;
          }

          this._pendingFindMatches[i] = true;

          this._extractTextPromises[i].then(function (pageIdx) {
            delete _this3._pendingFindMatches[pageIdx];

            _this3._calculateMatch(pageIdx);
          });
        }
      }

      if (this._query === "") {
        this._updateUIState(FindState.FOUND);

        return;
      }

      if (this._resumePageIdx) {
        return;
      }

      var offset = this._offset;
      this._pagesToSearch = numPages;

      if (offset.matchIdx !== null) {
        var numPageMatches = this._pageMatches[offset.pageIdx].length;

        if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;

          this._updateMatch(true);

          return;
        }

        this._advanceOffsetPage(previous);
      }

      this._nextPageMatch();
    }
  }, {
    key: "_matchesReady",
    value: function _matchesReady(matches) {
      var offset = this._offset;
      var numMatches = matches.length;
      var previous = this._state.findPrevious;

      if (numMatches) {
        offset.matchIdx = previous ? numMatches - 1 : 0;

        this._updateMatch(true);

        return true;
      }

      this._advanceOffsetPage(previous);

      if (offset.wrapped) {
        offset.matchIdx = null;

        if (this._pagesToSearch < 0) {
          this._updateMatch(false);

          return true;
        }
      }

      return false;
    }
  }, {
    key: "_nextPageMatch",
    value: function _nextPageMatch() {
      if (this._resumePageIdx !== null) {
        console.error("There can only be one pending page.");
      }

      var matches = null;

      do {
        var pageIdx = this._offset.pageIdx;
        matches = this._pageMatches[pageIdx];

        if (!matches) {
          this._resumePageIdx = pageIdx;
          break;
        }
      } while (!this._matchesReady(matches));
    }
  }, {
    key: "_advanceOffsetPage",
    value: function _advanceOffsetPage(previous) {
      var offset = this._offset;
      var numPages = this._linkService.pagesCount;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this._pagesToSearch--;

      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
        offset.pageIdx = previous ? numPages - 1 : 0;
        offset.wrapped = true;
      }
    }
  }, {
    key: "_updateMatch",
    value: function _updateMatch() {
      var found = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var state = FindState.NOT_FOUND;
      var wrapped = this._offset.wrapped;
      this._offset.wrapped = false;

      if (found) {
        var previousPage = this._selected.pageIdx;
        this._selected.pageIdx = this._offset.pageIdx;
        this._selected.matchIdx = this._offset.matchIdx;
        state = wrapped ? FindState.WRAPPED : FindState.FOUND;

        if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
          this._updatePage(previousPage);
        }
      }

      this._updateUIState(state, this._state.findPrevious);

      if (this._selected.pageIdx !== -1) {
        this._scrollMatches = true;

        this._updatePage(this._selected.pageIdx);
      }
    }
  }, {
    key: "_onFindBarClose",
    value: function _onFindBarClose(evt) {
      var _this4 = this;

      var pdfDocument = this._pdfDocument;

      this._firstPageCapability.promise.then(function () {
        if (!_this4._pdfDocument || pdfDocument && _this4._pdfDocument !== pdfDocument) {
          return;
        }

        if (_this4._findTimeout) {
          clearTimeout(_this4._findTimeout);
          _this4._findTimeout = null;
        }

        if (_this4._resumePageIdx) {
          _this4._resumePageIdx = null;
          _this4._dirtyMatch = true;
        }

        _this4._updateUIState(FindState.FOUND);

        _this4._highlightMatches = false;

        _this4._updateAllPages();
      });
    }
  }, {
    key: "_requestMatchesCount",
    value: function _requestMatchesCount() {
      var _this$_selected = this._selected,
          pageIdx = _this$_selected.pageIdx,
          matchIdx = _this$_selected.matchIdx;
      var current = 0,
          total = this._matchesCountTotal;

      if (matchIdx !== -1) {
        for (var i = 0; i < pageIdx; i++) {
          current += this._pageMatches[i] && this._pageMatches[i].length || 0;
        }

        current += matchIdx + 1;
      }

      if (current < 1 || current > total) {
        current = total = 0;
      }

      return {
        current: current,
        total: total
      };
    }
  }, {
    key: "_updateUIResultsCount",
    value: function _updateUIResultsCount() {
      this._eventBus.dispatch("updatefindmatchescount", {
        source: this,
        matchesCount: this._requestMatchesCount()
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState(state, previous) {
      this._eventBus.dispatch("updatefindcontrolstate", {
        source: this,
        state: state,
        previous: previous,
        matchesCount: this._requestMatchesCount(),
        rawQuery: this._state ? this._state.query : null
      });
    }
  }, {
    key: "highlightMatches",
    get: function get() {
      return this._highlightMatches;
    }
  }, {
    key: "pageMatches",
    get: function get() {
      return this._pageMatches;
    }
  }, {
    key: "pageMatchesColor",
    get: function get() {
      return this._pageMatchesColor;
    }
  }, {
    key: "pageMatchesLength",
    get: function get() {
      return this._pageMatchesLength;
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "_query",
    get: function get() {
      if (this._state.query !== this._rawQuery) {
        this._rawQuery = this._state.query;

        var _normalize3 = normalize(this._state.query);

        var _normalize4 = _slicedToArray(_normalize3, 1);

        this._normalizedQuery = _normalize4[0];
      }

      return this._normalizedQuery;
    }
  }]);

  return PDFFindController;
}();

exports.PDFFindController = PDFFindController;

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.deburr = deburr;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var INFINITY = 1 / 0;
var symbolTag = '[object Symbol]';
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23",
    rsComboSymbolsRange = "\\u20d0-\\u20f0";
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
var reComboMark = RegExp(rsCombo, 'g');
var deburredLetters = {
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  "\u0100": 'A',
  "\u0102": 'A',
  "\u0104": 'A',
  "\u0101": 'a',
  "\u0103": 'a',
  "\u0105": 'a',
  "\u0106": 'C',
  "\u0108": 'C',
  "\u010A": 'C',
  "\u010C": 'C',
  "\u0107": 'c',
  "\u0109": 'c',
  "\u010B": 'c',
  "\u010D": 'c',
  "\u010E": 'D',
  "\u0110": 'D',
  "\u010F": 'd',
  "\u0111": 'd',
  "\u0112": 'E',
  "\u0114": 'E',
  "\u0116": 'E',
  "\u0118": 'E',
  "\u011A": 'E',
  "\u0113": 'e',
  "\u0115": 'e',
  "\u0117": 'e',
  "\u0119": 'e',
  "\u011B": 'e',
  "\u011C": 'G',
  "\u011E": 'G',
  "\u0120": 'G',
  "\u0122": 'G',
  "\u011D": 'g',
  "\u011F": 'g',
  "\u0121": 'g',
  "\u0123": 'g',
  "\u0124": 'H',
  "\u0126": 'H',
  "\u0125": 'h',
  "\u0127": 'h',
  "\u0128": 'I',
  "\u012A": 'I',
  "\u012C": 'I',
  "\u012E": 'I',
  "\u0130": 'I',
  "\u0129": 'i',
  "\u012B": 'i',
  "\u012D": 'i',
  "\u012F": 'i',
  "\u0131": 'i',
  "\u0134": 'J',
  "\u0135": 'j',
  "\u0136": 'K',
  "\u0137": 'k',
  "\u0138": 'k',
  "\u0139": 'L',
  "\u013B": 'L',
  "\u013D": 'L',
  "\u013F": 'L',
  "\u0141": 'L',
  "\u013A": 'l',
  "\u013C": 'l',
  "\u013E": 'l',
  "\u0140": 'l',
  "\u0142": 'l',
  "\u0143": 'N',
  "\u0145": 'N',
  "\u0147": 'N',
  "\u014A": 'N',
  "\u0144": 'n',
  "\u0146": 'n',
  "\u0148": 'n',
  "\u014B": 'n',
  "\u014C": 'O',
  "\u014E": 'O',
  "\u0150": 'O',
  "\u014D": 'o',
  "\u014F": 'o',
  "\u0151": 'o',
  "\u0154": 'R',
  "\u0156": 'R',
  "\u0158": 'R',
  "\u0155": 'r',
  "\u0157": 'r',
  "\u0159": 'r',
  "\u015A": 'S',
  "\u015C": 'S',
  "\u015E": 'S',
  "\u0160": 'S',
  "\u015B": 's',
  "\u015D": 's',
  "\u015F": 's',
  "\u0161": 's',
  "\u0162": 'T',
  "\u0164": 'T',
  "\u0166": 'T',
  "\u0163": 't',
  "\u0165": 't',
  "\u0167": 't',
  "\u0168": 'U',
  "\u016A": 'U',
  "\u016C": 'U',
  "\u016E": 'U',
  "\u0170": 'U',
  "\u0172": 'U',
  "\u0169": 'u',
  "\u016B": 'u',
  "\u016D": 'u',
  "\u016F": 'u',
  "\u0171": 'u',
  "\u0173": 'u',
  "\u0174": 'W',
  "\u0175": 'w',
  "\u0176": 'Y',
  "\u0177": 'y',
  "\u0178": 'Y',
  "\u0179": 'Z',
  "\u017B": 'Z',
  "\u017D": 'Z',
  "\u017A": 'z',
  "\u017C": 'z',
  "\u017E": 'z',
  "\u0132": 'IJ',
  "\u0133": 'ij',
  "\u0152": 'Oe',
  "\u0153": 'oe',
  "\u0149": "'n",
  "\u017F": 'ss'
};
var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();

function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

var deburrLetter = basePropertyOf(deburredLetters);
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var _Symbol = root.Symbol;
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

function toString(value) {
  return value == null ? '' : baseToString(value);
}

function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCharacterType = getCharacterType;
exports.CharacterType = void 0;
var CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
exports.CharacterType = CharacterType;

function isAlphabeticalScript(charCode) {
  return charCode < 0x2e80;
}

function isAscii(charCode) {
  return (charCode & 0xff80) === 0;
}

function isAsciiAlpha(charCode) {
  return charCode >= 0x61 && charCode <= 0x7a || charCode >= 0x41 && charCode <= 0x5a;
}

function isAsciiDigit(charCode) {
  return charCode >= 0x30 && charCode <= 0x39;
}

function isAsciiSpace(charCode) {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
}

function isHan(charCode) {
  return charCode >= 0x3400 && charCode <= 0x9fff || charCode >= 0xf900 && charCode <= 0xfaff;
}

function isKatakana(charCode) {
  return charCode >= 0x30a0 && charCode <= 0x30ff;
}

function isHiragana(charCode) {
  return charCode >= 0x3040 && charCode <= 0x309f;
}

function isHalfwidthKatakana(charCode) {
  return charCode >= 0xff60 && charCode <= 0xff9f;
}

function isThai(charCode) {
  return (charCode & 0xff80) === 0x0e00;
}

function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 0x5f) {
        return CharacterType.ALPHA_LETTER;
      }

      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 0xa0) {
      return CharacterType.SPACE;
    }

    return CharacterType.ALPHA_LETTER;
  }

  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }

  return CharacterType.ALPHA_LETTER;
}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Levenshtein = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var levenshtein_collator;

try {
  levenshtein_collator = Intl.Collator("und", {
    sensitivity: "base"
  });
} catch (missingBrowserSupport) {
  try {
    levenshtein_collator = Intl.Collator("generic", {
      sensitivity: "base"
    });
  } catch (noBrowserSupport) {
    levenshtein_collator = undefined;
  }
}

var levenshtein_prevRow = [];
var levenshtein_str2Char = [];

var Levenshtein = /*#__PURE__*/function () {
  function Levenshtein() {
    _classCallCheck(this, Levenshtein);
  }

  _createClass(Levenshtein, null, [{
    key: "distance",
    value: function distance(str1, str2, options) {
      var useCollator = options && levenshtein_collator && options.useCollator;
      var str1Len = str1.length;
      var str2Len = str2.length;

      if (str1Len === 0) {
        return str2Len;
      }

      if (str2Len === 0) {
        return str1Len;
      }

      var curCol, nextCol, i, j, tmp;

      for (i = 0; i < str2Len; ++i) {
        levenshtein_prevRow[i] = i;
        levenshtein_str2Char[i] = str2.charCodeAt(i);
      }

      levenshtein_prevRow[str2Len] = str2Len;
      var strCmp;

      if (useCollator) {
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;
            strCmp = levenshtein_collator.compare(str1.charAt(i), String.fromCharCode(levenshtein_str2Char[j])) === 0;
            nextCol = levenshtein_prevRow[j] + (strCmp ? 0 : 1);
            tmp = curCol + 1;

            if (nextCol > tmp) {
              nextCol = tmp;
            }

            tmp = levenshtein_prevRow[j + 1] + 1;

            if (nextCol > tmp) {
              nextCol = tmp;
            }

            levenshtein_prevRow[j] = curCol;
          }

          levenshtein_prevRow[j] = nextCol;
        }
      } else {
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;
            strCmp = str1.charCodeAt(i) === levenshtein_str2Char[j];
            nextCol = levenshtein_prevRow[j] + (strCmp ? 0 : 1);
            tmp = curCol + 1;

            if (nextCol > tmp) {
              nextCol = tmp;
            }

            tmp = levenshtein_prevRow[j + 1] + 1;

            if (nextCol > tmp) {
              nextCol = tmp;
            }

            levenshtein_prevRow[j] = curCol;
          }

          levenshtein_prevRow[j] = nextCol;
        }
      }

      return nextCol;
    }
  }]);

  return Levenshtein;
}();

exports.Levenshtein = Levenshtein;

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isDestArraysEqual = isDestArraysEqual;
exports.isDestHashesEqual = isDestHashesEqual;
exports.PDFHistory = void 0;

var _ui_utils = __webpack_require__(6);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HASH_CHANGE_TIMEOUT = 1000;
var POSITION_UPDATED_THRESHOLD = 50;
var UPDATE_VIEWAREA_TIMEOUT = 1000;

function getCurrentHash() {
  return document.location.hash;
}

var PDFHistory = /*#__PURE__*/function () {
  function PDFHistory(_ref) {
    var _this = this;

    var linkService = _ref.linkService,
        eventBus = _ref.eventBus;

    _classCallCheck(this, PDFHistory);

    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset();
    this._boundEvents = null;
    this._isViewerInPresentationMode = false;

    this.eventBus._on("presentationmodechanged", function (evt) {
      _this._isViewerInPresentationMode = evt.state !== _ui_utils.PresentationModeState.NORMAL;
    });

    this.eventBus._on("pagesinit", function () {
      _this._isPagesLoaded = false;

      _this.eventBus._on("pagesloaded", function (evt) {
        _this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }

  _createClass(PDFHistory, [{
    key: "initialize",
    value: function initialize(_ref2) {
      var fingerprint = _ref2.fingerprint,
          _ref2$resetHistory = _ref2.resetHistory,
          resetHistory = _ref2$resetHistory === void 0 ? false : _ref2$resetHistory,
          _ref2$updateUrl = _ref2.updateUrl,
          updateUrl = _ref2$updateUrl === void 0 ? false : _ref2$updateUrl;

      if (!fingerprint || typeof fingerprint !== "string") {
        console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
        return;
      }

      if (this._initialized) {
        this.reset();
      }

      var reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
      this._fingerprint = fingerprint;
      this._updateUrl = updateUrl === true;
      this._initialized = true;

      this._bindEvents();

      var state = window.history.state;
      this._popStateInProgress = false;
      this._blockHashChange = 0;
      this._currentHash = getCurrentHash();
      this._numPositionUpdates = 0;
      this._uid = this._maxUid = 0;
      this._destination = null;
      this._position = null;

      if (!this._isValidState(state, true) || resetHistory) {
        var _this$_parseCurrentHa = this._parseCurrentHash(true),
            hash = _this$_parseCurrentHa.hash,
            page = _this$_parseCurrentHa.page,
            rotation = _this$_parseCurrentHa.rotation;

        if (!hash || reInitialized || resetHistory) {
          this._pushOrReplaceState(null, true);

          return;
        }

        this._pushOrReplaceState({
          hash: hash,
          page: page,
          rotation: rotation
        }, true);

        return;
      }

      var destination = state.destination;

      this._updateInternalState(destination, state.uid, true);

      if (destination.rotation !== undefined) {
        this._initialRotation = destination.rotation;
      }

      if (destination.dest) {
        this._initialBookmark = JSON.stringify(destination.dest);
        this._destination.page = null;
      } else if (destination.hash) {
        this._initialBookmark = destination.hash;
      } else if (destination.page) {
        this._initialBookmark = "page=".concat(destination.page);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._initialized) {
        this._pageHide();

        this._initialized = false;

        this._unbindEvents();
      }

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      this._initialBookmark = null;
      this._initialRotation = null;
    }
  }, {
    key: "push",
    value: function push(_ref3) {
      var _this2 = this;

      var _ref3$namedDest = _ref3.namedDest,
          namedDest = _ref3$namedDest === void 0 ? null : _ref3$namedDest,
          explicitDest = _ref3.explicitDest,
          pageNumber = _ref3.pageNumber;

      if (!this._initialized) {
        return;
      }

      if (namedDest && typeof namedDest !== "string") {
        console.error("PDFHistory.push: " + "\"".concat(namedDest, "\" is not a valid namedDest parameter."));
        return;
      } else if (!Array.isArray(explicitDest)) {
        console.error("PDFHistory.push: " + "\"".concat(explicitDest, "\" is not a valid explicitDest parameter."));
        return;
      } else if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.linkService.pagesCount)) {
        if (pageNumber !== null || this._destination) {
          console.error("PDFHistory.push: " + "\"".concat(pageNumber, "\" is not a valid pageNumber parameter."));
          return;
        }
      }

      var hash = namedDest || JSON.stringify(explicitDest);

      if (!hash) {
        return;
      }

      var forceReplace = false;

      if (this._destination && (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
        if (this._destination.page) {
          return;
        }

        forceReplace = true;
      }

      if (this._popStateInProgress && !forceReplace) {
        return;
      }

      this._pushOrReplaceState({
        dest: explicitDest,
        hash: hash,
        page: pageNumber,
        rotation: this.linkService.rotation
      }, forceReplace);

      if (!this._popStateInProgress) {
        this._popStateInProgress = true;
        Promise.resolve().then(function () {
          _this2._popStateInProgress = false;
        });
      }
    }
  }, {
    key: "pushPage",
    value: function pushPage(pageNumber) {
      var _this$_destination,
          _this3 = this;

      if (!this._initialized) {
        return;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.linkService.pagesCount)) {
        console.error("PDFHistory.pushPage: \"".concat(pageNumber, "\" is not a valid page number."));
        return;
      }

      if (((_this$_destination = this._destination) === null || _this$_destination === void 0 ? void 0 : _this$_destination.page) === pageNumber) {
        return;
      }

      if (this._popStateInProgress) {
        return;
      }

      this._pushOrReplaceState({
        hash: "page=".concat(pageNumber),
        page: pageNumber,
        rotation: this.linkService.rotation
      });

      if (!this._popStateInProgress) {
        this._popStateInProgress = true;
        Promise.resolve().then(function () {
          _this3._popStateInProgress = false;
        });
      }
    }
  }, {
    key: "pushCurrentPosition",
    value: function pushCurrentPosition() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      this._tryPushCurrentPosition();
    }
  }, {
    key: "back",
    value: function back() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      var state = window.history.state;

      if (this._isValidState(state) && state.uid > 0) {
        window.history.back();
      }
    }
  }, {
    key: "forward",
    value: function forward() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      var state = window.history.state;

      if (this._isValidState(state) && state.uid < this._maxUid) {
        window.history.forward();
      }
    }
  }, {
    key: "_pushOrReplaceState",
    value: function _pushOrReplaceState(destination) {
      var forceReplace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var shouldReplace = forceReplace || !this._destination;
      var newState = {
        fingerprint: this._fingerprint,
        uid: shouldReplace ? this._uid : this._uid + 1,
        destination: destination
      };

      this._updateInternalState(destination, newState.uid);

      var newUrl;

      if (this._updateUrl && destination !== null && destination !== void 0 && destination.hash) {
        var baseUrl = document.location.href.split("#")[0];

        if (!baseUrl.startsWith("file://")) {
          newUrl = "".concat(baseUrl, "#").concat(destination.hash);
        }
      }

      if (shouldReplace) {
        window.history.replaceState(newState, "", newUrl);
      } else {
        window.history.pushState(newState, "", newUrl);
      }
    }
  }, {
    key: "_tryPushCurrentPosition",
    value: function _tryPushCurrentPosition() {
      var temporary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._position) {
        return;
      }

      var position = this._position;

      if (temporary) {
        position = Object.assign(Object.create(null), this._position);
        position.temporary = true;
      }

      if (!this._destination) {
        this._pushOrReplaceState(position);

        return;
      }

      if (this._destination.temporary) {
        this._pushOrReplaceState(position, true);

        return;
      }

      if (this._destination.hash === position.hash) {
        return;
      }

      if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)) {
        return;
      }

      var forceReplace = false;

      if (this._destination.page >= position.first && this._destination.page <= position.page) {
        if (this._destination.dest || !this._destination.first) {
          return;
        }

        forceReplace = true;
      }

      this._pushOrReplaceState(position, forceReplace);
    }
  }, {
    key: "_isValidState",
    value: function _isValidState(state) {
      var checkReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!state) {
        return false;
      }

      if (state.fingerprint !== this._fingerprint) {
        if (checkReload) {
          if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length) {
            return false;
          }

          var _performance$getEntri = performance.getEntriesByType("navigation"),
              _performance$getEntri2 = _slicedToArray(_performance$getEntri, 1),
              perfEntry = _performance$getEntri2[0];

          if ((perfEntry === null || perfEntry === void 0 ? void 0 : perfEntry.type) !== "reload") {
            return false;
          }
        } else {
          return false;
        }
      }

      if (!Number.isInteger(state.uid) || state.uid < 0) {
        return false;
      }

      if (state.destination === null || _typeof(state.destination) !== "object") {
        return false;
      }

      return true;
    }
  }, {
    key: "_updateInternalState",
    value: function _updateInternalState(destination, uid) {
      var removeTemporary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      if (removeTemporary && destination !== null && destination !== void 0 && destination.temporary) {
        delete destination.temporary;
      }

      this._destination = destination;
      this._uid = uid;
      this._maxUid = Math.max(this._maxUid, uid);
      this._numPositionUpdates = 0;
    }
  }, {
    key: "_parseCurrentHash",
    value: function _parseCurrentHash() {
      var checkNameddest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var hash = unescape(getCurrentHash()).substring(1);
      var params = (0, _ui_utils.parseQueryString)(hash);
      var nameddest = params.nameddest || "";
      var page = params.page | 0;

      if (!(Number.isInteger(page) && page > 0 && page <= this.linkService.pagesCount) || checkNameddest && nameddest.length > 0) {
        page = null;
      }

      return {
        hash: hash,
        page: page,
        rotation: this.linkService.rotation
      };
    }
  }, {
    key: "_updateViewarea",
    value: function _updateViewarea(_ref4) {
      var _this4 = this;

      var location = _ref4.location;

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      this._position = {
        hash: this._isViewerInPresentationMode ? "page=".concat(location.pageNumber) : location.pdfOpenParams.substring(1),
        page: this.linkService.page,
        first: location.pageNumber,
        rotation: location.rotation
      };

      if (this._popStateInProgress) {
        return;
      }

      if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page) {
        this._numPositionUpdates++;
      }

      if (UPDATE_VIEWAREA_TIMEOUT > 0) {
        this._updateViewareaTimeout = setTimeout(function () {
          if (!_this4._popStateInProgress) {
            _this4._tryPushCurrentPosition(true);
          }

          _this4._updateViewareaTimeout = null;
        }, UPDATE_VIEWAREA_TIMEOUT);
      }
    }
  }, {
    key: "_popState",
    value: function _popState(_ref5) {
      var _this5 = this;

      var state = _ref5.state;
      var newHash = getCurrentHash(),
          hashChanged = this._currentHash !== newHash;
      this._currentHash = newHash;

      if (!state) {
        this._uid++;

        var _this$_parseCurrentHa2 = this._parseCurrentHash(),
            hash = _this$_parseCurrentHa2.hash,
            page = _this$_parseCurrentHa2.page,
            rotation = _this$_parseCurrentHa2.rotation;

        this._pushOrReplaceState({
          hash: hash,
          page: page,
          rotation: rotation
        }, true);

        return;
      }

      if (!this._isValidState(state)) {
        return;
      }

      this._popStateInProgress = true;

      if (hashChanged) {
        this._blockHashChange++;
        (0, _ui_utils.waitOnEventOrTimeout)({
          target: window,
          name: "hashchange",
          delay: HASH_CHANGE_TIMEOUT
        }).then(function () {
          _this5._blockHashChange--;
        });
      }

      var destination = state.destination;

      this._updateInternalState(destination, state.uid, true);

      if ((0, _ui_utils.isValidRotation)(destination.rotation)) {
        this.linkService.rotation = destination.rotation;
      }

      if (destination.dest) {
        this.linkService.goToDestination(destination.dest);
      } else if (destination.hash) {
        this.linkService.setHash(destination.hash);
      } else if (destination.page) {
        this.linkService.page = destination.page;
      }

      Promise.resolve().then(function () {
        _this5._popStateInProgress = false;
      });
    }
  }, {
    key: "_pageHide",
    value: function _pageHide() {
      if (!this._destination || this._destination.temporary) {
        this._tryPushCurrentPosition();
      }
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      if (this._boundEvents) {
        return;
      }

      this._boundEvents = {
        updateViewarea: this._updateViewarea.bind(this),
        popState: this._popState.bind(this),
        pageHide: this._pageHide.bind(this)
      };

      this.eventBus._on("updateviewarea", this._boundEvents.updateViewarea);

      window.addEventListener("popstate", this._boundEvents.popState);
      window.addEventListener("pagehide", this._boundEvents.pageHide);
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (!this._boundEvents) {
        return;
      }

      this.eventBus._off("updateviewarea", this._boundEvents.updateViewarea);

      window.removeEventListener("popstate", this._boundEvents.popState);
      window.removeEventListener("pagehide", this._boundEvents.pageHide);
      this._boundEvents = null;
    }
  }, {
    key: "popStateInProgress",
    get: function get() {
      return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
    }
  }, {
    key: "initialBookmark",
    get: function get() {
      return this._initialized ? this._initialBookmark : null;
    }
  }, {
    key: "initialRotation",
    get: function get() {
      return this._initialized ? this._initialRotation : null;
    }
  }]);

  return PDFHistory;
}();

exports.PDFHistory = PDFHistory;

function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== "string" || typeof pushHash !== "string") {
    return false;
  }

  if (destHash === pushHash) {
    return true;
  }

  var _parseQueryString = (0, _ui_utils.parseQueryString)(destHash),
      nameddest = _parseQueryString.nameddest;

  if (nameddest === pushHash) {
    return true;
  }

  return false;
}

function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (_typeof(first) !== _typeof(second)) {
      return false;
    }

    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }

    if (first !== null && _typeof(first) === "object" && second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }

      for (var key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }

      return true;
    }

    return first === second || Number.isNaN(first) && Number.isNaN(second);
  }

  if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
    return false;
  }

  if (firstDest.length !== secondDest.length) {
    return false;
  }

  for (var i = 0, ii = firstDest.length; i < ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFLayerViewer = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _base_tree_viewer = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFLayerViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFLayerViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFLayerViewer);

  function PDFLayerViewer(options) {
    var _this;

    _classCallCheck(this, PDFLayerViewer);

    _this = _super.call(this, options);
    _this.l10n = options.l10n;

    _this.eventBus._on("resetlayers", _this._resetLayers.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("togglelayerstree", _this._toggleAllTreeItems.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PDFLayerViewer, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(PDFLayerViewer.prototype), "reset", this).call(this);

      this._optionalContentConfig = null;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(layersCount) {
      this.eventBus.dispatch("layersloaded", {
        source: this,
        layersCount: layersCount
      });
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref) {
      var _this2 = this;

      var groupId = _ref.groupId,
          input = _ref.input;

      var setVisibility = function setVisibility() {
        _this2._optionalContentConfig.setVisibility(groupId, input.checked);

        _this2.eventBus.dispatch("optionalcontentconfig", {
          source: _this2,
          promise: Promise.resolve(_this2._optionalContentConfig)
        });
      };

      element.onclick = function (evt) {
        if (evt.target === input) {
          setVisibility();
          return true;
        } else if (evt.target !== element) {
          return true;
        }

        input.checked = !input.checked;
        setVisibility();
        return false;
      };
    }
  }, {
    key: "_setNestedName",
    value: function () {
      var _setNestedName2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(element, _ref2) {
        var _ref2$name, name;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref2$name = _ref2.name, name = _ref2$name === void 0 ? null : _ref2$name;

                if (!(typeof name === "string")) {
                  _context.next = 4;
                  break;
                }

                element.textContent = this._normalizeTextContent(name);
                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return this.l10n.get("additional_layers", null, "Additional Layers");

              case 6:
                element.textContent = _context.sent;
                element.style.fontStyle = "italic";

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _setNestedName(_x, _x2) {
        return _setNestedName2.apply(this, arguments);
      }

      return _setNestedName;
    }()
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div, _ref3) {
      var _ref3$name = _ref3.name,
          name = _ref3$name === void 0 ? null : _ref3$name;

      _get(_getPrototypeOf(PDFLayerViewer.prototype), "_addToggleButton", this).call(this, div, name === null);
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      if (!this._optionalContentConfig) {
        return;
      }

      _get(_getPrototypeOf(PDFLayerViewer.prototype), "_toggleAllTreeItems", this).call(this);
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var optionalContentConfig = _ref4.optionalContentConfig,
          pdfDocument = _ref4.pdfDocument;

      if (this._optionalContentConfig) {
        this.reset();
      }

      this._optionalContentConfig = optionalContentConfig || null;
      this._pdfDocument = pdfDocument || null;
      var groups = optionalContentConfig && optionalContentConfig.getOrder();

      if (!groups) {
        this._dispatchEvent(0);

        return;
      }

      var fragment = document.createDocumentFragment(),
          queue = [{
        parent: fragment,
        groups: groups
      }];
      var layersCount = 0,
          hasAnyNesting = false;

      while (queue.length > 0) {
        var levelData = queue.shift();

        var _iterator = _createForOfIteratorHelper(levelData.groups),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var groupId = _step.value;
            var div = document.createElement("div");
            div.className = "treeItem";
            var element = document.createElement("a");
            div.appendChild(element);

            if (_typeof(groupId) === "object") {
              hasAnyNesting = true;

              this._addToggleButton(div, groupId);

              this._setNestedName(element, groupId);

              var itemsDiv = document.createElement("div");
              itemsDiv.className = "treeItems";
              div.appendChild(itemsDiv);
              queue.push({
                parent: itemsDiv,
                groups: groupId.order
              });
            } else {
              var group = optionalContentConfig.getGroup(groupId);
              var input = document.createElement("input");

              this._bindLink(element, {
                groupId: groupId,
                input: input
              });

              input.type = "checkbox";
              input.id = groupId;
              input.checked = group.visible;
              var label = document.createElement("label");
              label.setAttribute("for", groupId);
              label.textContent = this._normalizeTextContent(group.name);
              element.appendChild(input);
              element.appendChild(label);
              layersCount++;
            }

            levelData.parent.appendChild(div);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this._finishRendering(fragment, layersCount, hasAnyNesting);
    }
  }, {
    key: "_resetLayers",
    value: function () {
      var _resetLayers2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var optionalContentConfig;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._optionalContentConfig) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.next = 4;
                return this._pdfDocument.getOptionalContentConfig();

              case 4:
                optionalContentConfig = _context2.sent;
                this.eventBus.dispatch("optionalcontentconfig", {
                  source: this,
                  promise: Promise.resolve(optionalContentConfig)
                });
                this.render({
                  optionalContentConfig: optionalContentConfig,
                  pdfDocument: this._pdfDocument
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _resetLayers() {
        return _resetLayers2.apply(this, arguments);
      }

      return _resetLayers;
    }()
  }]);

  return PDFLayerViewer;
}(_base_tree_viewer.BaseTreeViewer);

exports.PDFLayerViewer = PDFLayerViewer;

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SimpleLinkService = exports.PDFLinkService = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _ui_utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFLinkService = /*#__PURE__*/function () {
  function PDFLinkService() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        eventBus = _ref.eventBus,
        _ref$externalLinkTarg = _ref.externalLinkTarget,
        externalLinkTarget = _ref$externalLinkTarg === void 0 ? null : _ref$externalLinkTarg,
        _ref$externalLinkRel = _ref.externalLinkRel,
        externalLinkRel = _ref$externalLinkRel === void 0 ? null : _ref$externalLinkRel,
        _ref$externalLinkEnab = _ref.externalLinkEnabled,
        externalLinkEnabled = _ref$externalLinkEnab === void 0 ? true : _ref$externalLinkEnab,
        _ref$ignoreDestinatio = _ref.ignoreDestinationZoom,
        ignoreDestinationZoom = _ref$ignoreDestinatio === void 0 ? false : _ref$ignoreDestinatio;

    _classCallCheck(this, PDFLinkService);

    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this.externalLinkEnabled = externalLinkEnabled;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }

  _createClass(PDFLinkService, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
    }
  }, {
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setHistory",
    value: function setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(dest) {
      console.error("Deprecated method: `navigateTo`, use `goToDestination` instead.");
      this.goToDestination(dest);
    }
  }, {
    key: "_goToDestinationHelper",
    value: function _goToDestinationHelper(rawDest) {
      var _this = this;

      var namedDest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var explicitDest = arguments.length > 2 ? arguments[2] : undefined;
      var destRef = explicitDest[0];
      var pageNumber;

      if (destRef instanceof Object) {
        pageNumber = this._cachedPageNumber(destRef);

        if (pageNumber === null) {
          this.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            _this.cachePageRef(pageIndex + 1, destRef);

            _this._goToDestinationHelper(rawDest, namedDest, explicitDest);
          })["catch"](function () {
            console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid page reference, for dest=\"".concat(rawDest, "\"."));
          });
          return;
        }
      } else if (Number.isInteger(destRef)) {
        pageNumber = destRef + 1;
      } else {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid destination reference, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(pageNumber, "\" is not ") + "a valid page number, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.push({
          namedDest: namedDest,
          explicitDest: explicitDest,
          pageNumber: pageNumber
        });
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber,
        destArray: explicitDest,
        ignoreDestinationZoom: this._ignoreDestinationZoom
      });
    }
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(dest) {
        var namedDest, explicitDest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pdfDocument) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(typeof dest === "string")) {
                  _context.next = 9;
                  break;
                }

                namedDest = dest;
                _context.next = 6;
                return this.pdfDocument.getDestination(dest);

              case 6:
                explicitDest = _context.sent;
                _context.next = 13;
                break;

              case 9:
                namedDest = null;
                _context.next = 12;
                return dest;

              case 12:
                explicitDest = _context.sent;

              case 13:
                if (Array.isArray(explicitDest)) {
                  _context.next = 16;
                  break;
                }

                console.error("PDFLinkService.goToDestination: \"".concat(explicitDest, "\" is not ") + "a valid destination array, for dest=\"".concat(dest, "\"."));
                return _context.abrupt("return");

              case 16:
                this._goToDestinationHelper(dest, namedDest, explicitDest);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function goToDestination(_x) {
        return _goToDestination.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("PDFLinkService.goToPage: \"".concat(val, "\" is not a valid page."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.pushPage(pageNumber);
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber
      });
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      if (typeof dest === "string") {
        if (dest.length > 0) {
          return this.getAnchorUrl("#" + escape(dest));
        }
      } else if (Array.isArray(dest)) {
        var str = JSON.stringify(dest);

        if (str.length > 0) {
          return this.getAnchorUrl("#" + escape(str));
        }
      }

      return this.getAnchorUrl("");
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(anchor) {
      return (this.baseUrl || "") + anchor;
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber, dest;

      if (hash.includes("=")) {
        var params = (0, _ui_utils.parseQueryString)(hash);

        if ("search" in params) {
          this.eventBus.dispatch("findfromurlhash", {
            source: this,
            query: params.search.replace(/"/g, ""),
            phraseSearch: params.phrase === "true"
          });
        }

        if ("page" in params) {
          pageNumber = params.page | 0 || 1;
        }

        if ("zoom" in params) {
          var zoomArgs = params.zoom.split(",");
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);

          if (!zoomArg.includes("Fit")) {
            dest = [null, {
              name: "XYZ"
            }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
          } else {
            if (zoomArg === "Fit" || zoomArg === "FitB") {
              dest = [null, {
                name: zoomArg
              }];
            } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
              dest = [null, {
                name: zoomArg
              }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
            } else if (zoomArg === "FitR") {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
              } else {
                dest = [null, {
                  name: zoomArg
                }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
              }
            } else {
              console.error("PDFLinkService.setHash: \"".concat(zoomArg, "\" is not ") + "a valid zoom value.");
            }
          }
        }

        if (dest) {
          this.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber || this.page,
            destArray: dest,
            allowNegativeOffset: true
          });
        } else if (pageNumber) {
          this.page = pageNumber;
        }

        if ("pagemode" in params) {
          this.eventBus.dispatch("pagemode", {
            source: this,
            mode: params.pagemode
          });
        }

        if ("nameddest" in params) {
          this.goToDestination(params.nameddest);
        }
      } else {
        dest = unescape(hash);

        try {
          dest = JSON.parse(dest);

          if (!Array.isArray(dest)) {
            dest = dest.toString();
          }
        } catch (ex) {}

        if (typeof dest === "string" || isValidExplicitDestination(dest)) {
          this.goToDestination(dest);
          return;
        }

        console.error("PDFLinkService.setHash: \"".concat(unescape(hash), "\" is not ") + "a valid destination.");
      }
    }
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {
      switch (action) {
        case "GoBack":
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }

          break;

        case "GoForward":
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }

          break;

        case "NextPage":
          this.pdfViewer.nextPage();
          break;

        case "PrevPage":
          this.pdfViewer.previousPage();
          break;

        case "LastPage":
          this.page = this.pagesCount;
          break;

        case "FirstPage":
          this.page = 1;
          break;

        default:
          break;
      }

      this.eventBus.dispatch("namedaction", {
        source: this,
        action: action
      });
    }
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {
      if (!pageRef) {
        return;
      }

      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      this._pagesRefCache[refStr] = pageNum;
    }
  }, {
    key: "_cachedPageNumber",
    value: function _cachedPageNumber(pageRef) {
      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      return this._pagesRefCache && this._pagesRefCache[refStr] || null;
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return this.pdfViewer.isPageVisible(pageNumber);
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return this.pdfViewer.isPageCached(pageNumber);
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function get() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function set(value) {
      this.pdfViewer.currentPageNumber = value;
    }
  }, {
    key: "rotation",
    get: function get() {
      return this.pdfViewer.pagesRotation;
    },
    set: function set(value) {
      this.pdfViewer.pagesRotation = value;
    }
  }]);

  return PDFLinkService;
}();

exports.PDFLinkService = PDFLinkService;

function isValidExplicitDestination(dest) {
  if (!Array.isArray(dest)) {
    return false;
  }

  var destLength = dest.length;

  if (destLength < 2) {
    return false;
  }

  var page = dest[0];

  if (!(_typeof(page) === "object" && Number.isInteger(page.num) && Number.isInteger(page.gen)) && !(Number.isInteger(page) && page >= 0)) {
    return false;
  }

  var zoom = dest[1];

  if (!(_typeof(zoom) === "object" && typeof zoom.name === "string")) {
    return false;
  }

  var allowNull = true;

  switch (zoom.name) {
    case "XYZ":
      if (destLength !== 5) {
        return false;
      }

      break;

    case "Fit":
    case "FitB":
      return destLength === 2;

    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (destLength !== 3) {
        return false;
      }

      break;

    case "FitR":
      if (destLength !== 6) {
        return false;
      }

      allowNull = false;
      break;

    default:
      return false;
  }

  for (var i = 2; i < destLength; i++) {
    var param = dest[i];

    if (!(typeof param === "number" || allowNull && param === null)) {
      return false;
    }
  }

  return true;
}

var SimpleLinkService = /*#__PURE__*/function () {
  function SimpleLinkService() {
    _classCallCheck(this, SimpleLinkService);

    this.externalLinkTarget = null;
    this.externalLinkRel = null;
    this.externalLinkEnabled = true;
    this._ignoreDestinationZoom = false;
  }

  _createClass(SimpleLinkService, [{
    key: "goToDestination",
    value: function () {
      var _goToDestination2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dest) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function goToDestination(_x2) {
        return _goToDestination2.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {}
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(hash) {
      return "#";
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {}
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {}
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {}
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return true;
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return true;
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return 0;
    }
  }, {
    key: "page",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }, {
    key: "rotation",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }]);

  return SimpleLinkService;
}();

exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFOutlineViewer = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _pdfjsLib = __webpack_require__(7);

var _base_tree_viewer = __webpack_require__(14);

var _ui_utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFOutlineViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFOutlineViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFOutlineViewer);

  function PDFOutlineViewer(options) {
    var _this;

    _classCallCheck(this, PDFOutlineViewer);

    _this = _super.call(this, options);
    _this.linkService = options.linkService;

    _this.eventBus._on("toggleoutlinetree", _this._toggleAllTreeItems.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("currentoutlineitem", _this._currentOutlineItem.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("pagechanging", function (evt) {
      _this._currentPageNumber = evt.pageNumber;
    });

    _this.eventBus._on("pagesloaded", function (evt) {
      _this._isPagesLoaded = !!evt.pagesCount;
    });

    _this.eventBus._on("sidebarviewchanged", function (evt) {
      _this._sidebarView = evt.view;
    });

    return _this;
  }

  _createClass(PDFOutlineViewer, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "reset", this).call(this);

      this._outline = null;
      this._pageNumberToDestHashCapability = null;
      this._currentPageNumber = 1;
      this._isPagesLoaded = false;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(outlineCount) {
      var _this$_pdfDocument;

      this.eventBus.dispatch("outlineloaded", {
        source: this,
        outlineCount: outlineCount,
        enableCurrentOutlineItemButton: outlineCount > 0 && !((_this$_pdfDocument = this._pdfDocument) !== null && _this$_pdfDocument !== void 0 && _this$_pdfDocument.loadingParams.disableAutoFetch)
      });
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref) {
      var _this2 = this;

      var url = _ref.url,
          newWindow = _ref.newWindow,
          dest = _ref.dest;
      var linkService = this.linkService;

      if (url) {
        (0, _pdfjsLib.addLinkAttributes)(element, {
          url: url,
          target: newWindow ? _pdfjsLib.LinkTarget.BLANK : linkService.externalLinkTarget,
          rel: linkService.externalLinkRel,
          enabled: linkService.externalLinkEnabled
        });
        return;
      }

      element.href = linkService.getDestinationHash(dest);

      element.onclick = function (evt) {
        _this2._updateCurrentTreeItem(evt.target.parentNode);

        if (dest) {
          linkService.goToDestination(dest);
        }

        return false;
      };
    }
  }, {
    key: "_setStyles",
    value: function _setStyles(element, _ref2) {
      var bold = _ref2.bold,
          italic = _ref2.italic;

      if (bold) {
        element.style.fontWeight = "bold";
      }

      if (italic) {
        element.style.fontStyle = "italic";
      }
    }
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div, _ref3) {
      var count = _ref3.count,
          items = _ref3.items;
      var hidden = false;

      if (count < 0) {
        var totalCount = items.length;

        if (totalCount > 0) {
          var queue = _toConsumableArray(items);

          while (queue.length > 0) {
            var _queue$shift = queue.shift(),
                nestedCount = _queue$shift.count,
                nestedItems = _queue$shift.items;

            if (nestedCount > 0 && nestedItems.length > 0) {
              totalCount += nestedItems.length;
              queue.push.apply(queue, _toConsumableArray(nestedItems));
            }
          }
        }

        if (Math.abs(count) === totalCount) {
          hidden = true;
        }
      }

      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "_addToggleButton", this).call(this, div, hidden);
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      if (!this._outline) {
        return;
      }

      _get(_getPrototypeOf(PDFOutlineViewer.prototype), "_toggleAllTreeItems", this).call(this);
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var outline = _ref4.outline,
          pdfDocument = _ref4.pdfDocument;

      if (this._outline) {
        this.reset();
      }

      this._outline = outline || null;
      this._pdfDocument = pdfDocument || null;

      if (!outline) {
        this._dispatchEvent(0);

        return;
      }

      var fragment = document.createDocumentFragment();
      var queue = [{
        parent: fragment,
        items: outline
      }];
      var outlineCount = 0,
          hasAnyNesting = false;

      while (queue.length > 0) {
        var levelData = queue.shift();

        var _iterator = _createForOfIteratorHelper(levelData.items),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var div = document.createElement("div");
            div.className = "treeItem";
            var element = document.createElement("a");

            this._bindLink(element, item);

            this._setStyles(element, item);

            element.textContent = this._normalizeTextContent(item.title);
            div.appendChild(element);

            if (item.items.length > 0) {
              hasAnyNesting = true;

              this._addToggleButton(div, item);

              var itemsDiv = document.createElement("div");
              itemsDiv.className = "treeItems";
              div.appendChild(itemsDiv);
              queue.push({
                parent: itemsDiv,
                items: item.items
              });
            }

            levelData.parent.appendChild(div);
            outlineCount++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this._finishRendering(fragment, outlineCount, hasAnyNesting);
    }
  }, {
    key: "_currentOutlineItem",
    value: function () {
      var _currentOutlineItem2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var pageNumberToDestHash, i, destHash, linkElement;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._isPagesLoaded) {
                  _context.next = 2;
                  break;
                }

                throw new Error("_currentOutlineItem: All pages have not been loaded.");

              case 2:
                if (!(!this._outline || !this._pdfDocument)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return this._getPageNumberToDestHash(this._pdfDocument);

              case 6:
                pageNumberToDestHash = _context.sent;

                if (pageNumberToDestHash) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                this._updateCurrentTreeItem(null);

                if (!(this._sidebarView !== _ui_utils.SidebarView.OUTLINE)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return");

              case 12:
                i = this._currentPageNumber;

              case 13:
                if (!(i > 0)) {
                  _context.next = 25;
                  break;
                }

                destHash = pageNumberToDestHash.get(i);

                if (destHash) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("continue", 22);

              case 17:
                linkElement = this.container.querySelector("a[href=\"".concat(destHash, "\"]"));

                if (linkElement) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("continue", 22);

              case 20:
                this._scrollToCurrentTreeItem(linkElement.parentNode);

                return _context.abrupt("break", 25);

              case 22:
                i--;
                _context.next = 13;
                break;

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _currentOutlineItem() {
        return _currentOutlineItem2.apply(this, arguments);
      }

      return _currentOutlineItem;
    }()
  }, {
    key: "_getPageNumberToDestHash",
    value: function () {
      var _getPageNumberToDestHash2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pdfDocument) {
        var pageNumberToDestHash, pageNumberNesting, queue, levelData, currentNesting, _iterator2, _step2, _step2$value, dest, items, explicitDest, pageNumber, _explicitDest, _explicitDest2, destRef, destHash;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._pageNumberToDestHashCapability) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this._pageNumberToDestHashCapability.promise);

              case 2:
                this._pageNumberToDestHashCapability = (0, _pdfjsLib.createPromiseCapability)();
                pageNumberToDestHash = new Map(), pageNumberNesting = new Map();
                queue = [{
                  nesting: 0,
                  items: this._outline
                }];

              case 5:
                if (!(queue.length > 0)) {
                  _context2.next = 56;
                  break;
                }

                levelData = queue.shift(), currentNesting = levelData.nesting;
                _iterator2 = _createForOfIteratorHelper(levelData.items);
                _context2.prev = 8;

                _iterator2.s();

              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 46;
                  break;
                }

                _step2$value = _step2.value, dest = _step2$value.dest, items = _step2$value.items;
                explicitDest = void 0, pageNumber = void 0;

                if (!(typeof dest === "string")) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 16;
                return pdfDocument.getDestination(dest);

              case 16:
                explicitDest = _context2.sent;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", null);

              case 19:
                _context2.next = 22;
                break;

              case 21:
                explicitDest = dest;

              case 22:
                if (!Array.isArray(explicitDest)) {
                  _context2.next = 43;
                  break;
                }

                _explicitDest = explicitDest, _explicitDest2 = _slicedToArray(_explicitDest, 1), destRef = _explicitDest2[0];

                if (!(_typeof(destRef) === "object")) {
                  _context2.next = 41;
                  break;
                }

                pageNumber = this.linkService._cachedPageNumber(destRef);

                if (pageNumber) {
                  _context2.next = 39;
                  break;
                }

                _context2.prev = 27;
                _context2.next = 30;
                return pdfDocument.getPageIndex(destRef);

              case 30:
                _context2.t0 = _context2.sent;
                pageNumber = _context2.t0 + 1;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 34;
                  break;
                }

                return _context2.abrupt("return", null);

              case 34:
                this.linkService.cachePageRef(pageNumber, destRef);
                _context2.next = 39;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](27);

              case 39:
                _context2.next = 42;
                break;

              case 41:
                if (Number.isInteger(destRef)) {
                  pageNumber = destRef + 1;
                }

              case 42:
                if (Number.isInteger(pageNumber) && (!pageNumberToDestHash.has(pageNumber) || currentNesting > pageNumberNesting.get(pageNumber))) {
                  destHash = this.linkService.getDestinationHash(dest);
                  pageNumberToDestHash.set(pageNumber, destHash);
                  pageNumberNesting.set(pageNumber, currentNesting);
                }

              case 43:
                if (items.length > 0) {
                  queue.push({
                    nesting: currentNesting + 1,
                    items: items
                  });
                }

              case 44:
                _context2.next = 10;
                break;

              case 46:
                _context2.next = 51;
                break;

              case 48:
                _context2.prev = 48;
                _context2.t2 = _context2["catch"](8);

                _iterator2.e(_context2.t2);

              case 51:
                _context2.prev = 51;

                _iterator2.f();

                return _context2.finish(51);

              case 54:
                _context2.next = 5;
                break;

              case 56:
                this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null);

                return _context2.abrupt("return", this._pageNumberToDestHashCapability.promise);

              case 58:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 48, 51, 54], [27, 37]]);
      }));

      function _getPageNumberToDestHash(_x) {
        return _getPageNumberToDestHash2.apply(this, arguments);
      }

      return _getPageNumberToDestHash;
    }()
  }]);

  return PDFOutlineViewer;
}(_base_tree_viewer.BaseTreeViewer);

exports.PDFOutlineViewer = PDFOutlineViewer;

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPresentationMode = void 0;

var _ui_utils = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
var DELAY_BEFORE_HIDING_CONTROLS = 3000;
var ACTIVE_SELECTOR = "pdfPresentationMode";
var CONTROLS_SELECTOR = "pdfPresentationModeControls";
var MOUSE_SCROLL_COOLDOWN_TIME = 50;
var PAGE_SWITCH_THRESHOLD = 0.1;
var SWIPE_MIN_DISTANCE_THRESHOLD = 50;
var SWIPE_ANGLE_THRESHOLD = Math.PI / 6;

var PDFPresentationMode = /*#__PURE__*/function () {
  function PDFPresentationMode(_ref) {
    var _this = this;

    var container = _ref.container,
        pdfViewer = _ref.pdfViewer,
        eventBus = _ref.eventBus,
        _ref$contextMenuItems = _ref.contextMenuItems,
        contextMenuItems = _ref$contextMenuItems === void 0 ? null : _ref$contextMenuItems;

    _classCallCheck(this, PDFPresentationMode);

    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.active = false;
    this.args = null;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;

    if (contextMenuItems) {
      contextMenuItems.contextFirstPage.addEventListener("click", function () {
        _this.contextMenuOpen = false;

        _this.eventBus.dispatch("firstpage", {
          source: _this
        });
      });
      contextMenuItems.contextLastPage.addEventListener("click", function () {
        _this.contextMenuOpen = false;

        _this.eventBus.dispatch("lastpage", {
          source: _this
        });
      });
      contextMenuItems.contextPageRotateCw.addEventListener("click", function () {
        _this.contextMenuOpen = false;

        _this.eventBus.dispatch("rotatecw", {
          source: _this
        });
      });
      contextMenuItems.contextPageRotateCcw.addEventListener("click", function () {
        _this.contextMenuOpen = false;

        _this.eventBus.dispatch("rotateccw", {
          source: _this
        });
      });
    }
  }

  _createClass(PDFPresentationMode, [{
    key: "request",
    value: function request() {
      if (this.switchInProgress || this.active || !this.pdfViewer.pagesCount) {
        return false;
      }

      this._addFullscreenChangeListeners();

      this._setSwitchInProgress();

      this._notifyStateChange();

      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if (this.container.mozRequestFullScreen) {
        this.container.mozRequestFullScreen();
      } else if (this.container.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

        this._prepareFullscreenMode();
      } else {
        return false;
      }

      this.args = {
        page: this.pdfViewer.currentPageNumber,
        previousScale: this.pdfViewer.currentScaleValue
      };
      return true;
    }
  }, {
    key: "_mouseWheel",
    value: function _mouseWheel(evt) {
      if (!this.active) {
        return;
      }

      evt.preventDefault();
      var delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
      var currentTime = new Date().getTime();
      var storedTime = this.mouseScrollTimeStamp;

      if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
        return;
      }

      if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
        this._resetMouseScrollState();
      }

      this.mouseScrollDelta += delta;

      if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
        var totalDelta = this.mouseScrollDelta;

        this._resetMouseScrollState();

        var success = totalDelta > 0 ? this.pdfViewer.previousPage() : this.pdfViewer.nextPage();

        if (success) {
          this.mouseScrollTimeStamp = currentTime;
        }
      }
    }
  }, {
    key: "_notifyStateChange",
    value: function _notifyStateChange() {
      var state = _ui_utils.PresentationModeState.NORMAL;

      if (this.switchInProgress) {
        state = _ui_utils.PresentationModeState.CHANGING;
      } else if (this.active) {
        state = _ui_utils.PresentationModeState.FULLSCREEN;
      }

      this.eventBus.dispatch("presentationmodechanged", {
        source: this,
        state: state,

        get active() {
          throw new Error("Deprecated parameter: `active`, please use `state` instead.");
        },

        get switchInProgress() {
          throw new Error("Deprecated parameter: `switchInProgress`, please use `state` instead.");
        }

      });
    }
  }, {
    key: "_setSwitchInProgress",
    value: function _setSwitchInProgress() {
      var _this2 = this;

      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
      }

      this.switchInProgress = setTimeout(function () {
        _this2._removeFullscreenChangeListeners();

        delete _this2.switchInProgress;

        _this2._notifyStateChange();
      }, DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
    }
  }, {
    key: "_resetSwitchInProgress",
    value: function _resetSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
        delete this.switchInProgress;
      }
    }
  }, {
    key: "_enter",
    value: function _enter() {
      var _this3 = this;

      this.active = true;

      this._resetSwitchInProgress();

      this._notifyStateChange();

      this.container.classList.add(ACTIVE_SELECTOR);
      setTimeout(function () {
        _this3.pdfViewer.currentPageNumber = _this3.args.page;
        _this3.pdfViewer.currentScaleValue = "page-fit";
      }, 0);

      this._addWindowListeners();

      this._showControls();

      this.contextMenuOpen = false;
      this.container.setAttribute("contextmenu", "viewerContextMenu");
      window.getSelection().removeAllRanges();
    }
  }, {
    key: "_exit",
    value: function _exit() {
      var _this4 = this;

      this._tidyUpFullscreenMode();

      var page = this.pdfViewer.currentPageNumber;
      this.container.classList.remove(ACTIVE_SELECTOR);
      setTimeout(function () {
        _this4.active = false;

        _this4._removeFullscreenChangeListeners();

        _this4._notifyStateChange();

        _this4.pdfViewer.currentScaleValue = _this4.args.previousScale;
        _this4.pdfViewer.currentPageNumber = page;
        _this4.args = null;
      }, 0);

      this._removeWindowListeners();

      this._hideControls();

      this._resetMouseScrollState();

      this.container.removeAttribute("contextmenu");
      this.contextMenuOpen = false;
    }
  }, {
    key: "_prepareFullscreenMode",
    value: function _prepareFullscreenMode() {
      var domElement = document.getElementsByClassName("zoom")[0].parentElement;
      var parent = domElement.parentElement;
      this.ngxContainer = parent;

      for (var i = 0; i < parent.childElementCount; i++) {
        if (parent.children.item(i) === domElement) {
          this.ngxContainerIndex = i;
        }
      }

      parent.removeChild(domElement);
      document.body.append(domElement);
      var siblings = document.body.children;

      for (var _i = 0; _i < siblings.length; _i++) {
        var s = siblings.item(_i);

        if (s !== domElement && s instanceof HTMLElement) {
          s.classList.add("hidden-by-fullscreen");
        }
      }

      document.getElementById("sidebarContainer").classList.add("hidden-by-fullscreen");
      document.getElementsByClassName("toolbar")[0].classList.add("hidden-by-fullscreen");
    }
  }, {
    key: "_tidyUpFullscreenMode",
    value: function _tidyUpFullscreenMode() {
      if (this.ngxContainer) {
        var domElement = document.getElementsByClassName("zoom")[0].parentElement;
        document.body.removeChild(domElement);

        if (this.ngxContainerIndex >= this.ngxContainer.childElementCount) {
          this.ngxContainer.append(domElement);
        } else {
          this.ngxContainer.insertBefore(domElement, this.ngxContainer.children.item(this.ngxContainerIndex));
        }

        this.ngxContainer = undefined;
        var siblings = document.body.children;

        for (var i = 0; i < siblings.length; i++) {
          var s = siblings.item(i);

          if (s !== domElement && s instanceof HTMLElement) {
            if (s.classList.contains("hidden-by-fullscreen")) {
              s.classList.remove("hidden-by-fullscreen");
            }
          }
        }

        document.getElementById("sidebarContainer").classList.remove("hidden-by-fullscreen");
        document.getElementsByClassName("toolbar")[0].classList.remove("hidden-by-fullscreen");
      }
    }
  }, {
    key: "_mouseDown",
    value: function _mouseDown(evt) {
      if (this.contextMenuOpen) {
        this.contextMenuOpen = false;
        evt.preventDefault();
        return;
      }

      if (evt.button === 0) {
        var isInternalLink = evt.target.href && evt.target.classList.contains("internalLink");

        if (!isInternalLink) {
          evt.preventDefault();

          if (evt.shiftKey) {
            this.pdfViewer.previousPage();
          } else {
            this.pdfViewer.nextPage();
          }
        }
      }
    }
  }, {
    key: "_contextMenu",
    value: function _contextMenu() {
      this.contextMenuOpen = true;
    }
  }, {
    key: "_showControls",
    value: function _showControls() {
      var _this5 = this;

      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
      } else {
        this.container.classList.add(CONTROLS_SELECTOR);
      }

      this.controlsTimeout = setTimeout(function () {
        _this5.container.classList.remove(CONTROLS_SELECTOR);

        delete _this5.controlsTimeout;
      }, DELAY_BEFORE_HIDING_CONTROLS);
    }
  }, {
    key: "_hideControls",
    value: function _hideControls() {
      if (!this.controlsTimeout) {
        return;
      }

      clearTimeout(this.controlsTimeout);
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    }
  }, {
    key: "_resetMouseScrollState",
    value: function _resetMouseScrollState() {
      this.mouseScrollTimeStamp = 0;
      this.mouseScrollDelta = 0;
    }
  }, {
    key: "_touchSwipe",
    value: function _touchSwipe(evt) {
      if (!this.active) {
        return;
      }

      if (evt.touches.length > 1) {
        this.touchSwipeState = null;
        return;
      }

      switch (evt.type) {
        case "touchstart":
          this.touchSwipeState = {
            startX: evt.touches[0].pageX,
            startY: evt.touches[0].pageY,
            endX: evt.touches[0].pageX,
            endY: evt.touches[0].pageY
          };
          break;

        case "touchmove":
          if (this.touchSwipeState === null) {
            return;
          }

          this.touchSwipeState.endX = evt.touches[0].pageX;
          this.touchSwipeState.endY = evt.touches[0].pageY;
          evt.preventDefault();
          break;

        case "touchend":
          if (this.touchSwipeState === null) {
            return;
          }

          var delta = 0;
          var dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
          var dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
          var absAngle = Math.abs(Math.atan2(dy, dx));

          if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
            delta = dx;
          } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
            delta = dy;
          }

          if (delta > 0) {
            this.pdfViewer.previousPage();
          } else if (delta < 0) {
            this.pdfViewer.nextPage();
          }

          break;
      }
    }
  }, {
    key: "_addWindowListeners",
    value: function _addWindowListeners() {
      this.showControlsBind = this._showControls.bind(this);
      this.mouseDownBind = this._mouseDown.bind(this);
      this.mouseWheelBind = this._mouseWheel.bind(this);
      this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
      this.contextMenuBind = this._contextMenu.bind(this);
      this.touchSwipeBind = this._touchSwipe.bind(this);
      window.addEventListener("mousemove", this.showControlsBind);
      window.addEventListener("mousedown", this.mouseDownBind);
      window.addEventListener("wheel", this.mouseWheelBind, {
        passive: false
      });
      window.addEventListener("keydown", this.resetMouseScrollStateBind);
      window.addEventListener("contextmenu", this.contextMenuBind);
      window.addEventListener("touchstart", this.touchSwipeBind);
      window.addEventListener("touchmove", this.touchSwipeBind);
      window.addEventListener("touchend", this.touchSwipeBind);
    }
  }, {
    key: "_removeWindowListeners",
    value: function _removeWindowListeners() {
      window.removeEventListener("mousemove", this.showControlsBind);
      window.removeEventListener("mousedown", this.mouseDownBind);
      window.removeEventListener("wheel", this.mouseWheelBind, {
        passive: false
      });
      window.removeEventListener("keydown", this.resetMouseScrollStateBind);
      window.removeEventListener("contextmenu", this.contextMenuBind);
      window.removeEventListener("touchstart", this.touchSwipeBind);
      window.removeEventListener("touchmove", this.touchSwipeBind);
      window.removeEventListener("touchend", this.touchSwipeBind);
      delete this.showControlsBind;
      delete this.mouseDownBind;
      delete this.mouseWheelBind;
      delete this.resetMouseScrollStateBind;
      delete this.contextMenuBind;
      delete this.touchSwipeBind;
    }
  }, {
    key: "_fullscreenChange",
    value: function _fullscreenChange() {
      if (this.isFullscreen) {
        this._enter();
      } else {
        this._exit();
      }
    }
  }, {
    key: "_addFullscreenChangeListeners",
    value: function _addFullscreenChangeListeners() {
      this.fullscreenChangeBind = this._fullscreenChange.bind(this);
      window.addEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.addEventListener("mozfullscreenchange", this.fullscreenChangeBind);
      window.addEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
    }
  }, {
    key: "_removeFullscreenChangeListeners",
    value: function _removeFullscreenChangeListeners() {
      window.removeEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.removeEventListener("mozfullscreenchange", this.fullscreenChangeBind);
      window.removeEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
      delete this.fullscreenChangeBind;
    }
  }, {
    key: "isFullscreen",
    get: function get() {
      return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen);
    }
  }]);

  return PDFPresentationMode;
}();

exports.PDFPresentationMode = PDFPresentationMode;

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSidebar = void 0;

var _ui_utils = __webpack_require__(6);

var _pdf_rendering_queue = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI_NOTIFICATION_CLASS = "pdfSidebarNotification";

var PDFSidebar = /*#__PURE__*/function () {
  function PDFSidebar(_ref) {
    var elements = _ref.elements,
        pdfViewer = _ref.pdfViewer,
        pdfThumbnailViewer = _ref.pdfThumbnailViewer,
        eventBus = _ref.eventBus,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _ui_utils.NullL10n : _ref$l10n;

    _classCallCheck(this, PDFSidebar);

    this.isOpen = false;
    this.active = _ui_utils.SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.onToggled = null;
    this.pdfViewer = pdfViewer;
    this.pdfThumbnailViewer = pdfThumbnailViewer;
    this.outerContainer = elements.outerContainer;
    this.viewerContainer = elements.viewerContainer;
    this.toggleButton = elements.toggleButton;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._outlineOptionsContainer = elements.outlineOptionsContainer;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    this.l10n = l10n;

    this._addEventListeners();
  }

  _createClass(PDFSidebar, [{
    key: "reset",
    value: function reset() {
      this.isInitialViewSet = false;

      this._hideUINotification(true);

      this.switchView(_ui_utils.SidebarView.THUMBS);
      this.outlineButton.disabled = false;
      this.attachmentsButton.disabled = false;
      this.layersButton.disabled = false;
      this.outlineButton.hidden = false;
      this.attachmentsButton.hidden = false;
      this.layersButton.hidden = false;
      this._currentOutlineItemButton.disabled = true;
    }
  }, {
    key: "setInitialView",
    value: function setInitialView() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ui_utils.SidebarView.NONE;

      if (this.isInitialViewSet) {
        return;
      }

      this.isInitialViewSet = true;

      if (view === _ui_utils.SidebarView.NONE || view === _ui_utils.SidebarView.UNKNOWN) {
        this._dispatchEvent();

        return;
      }

      if (!this._switchView(view, true)) {
        this._dispatchEvent();
      }
    }
  }, {
    key: "switchView",
    value: function switchView(view) {
      var forceOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._switchView(view, forceOpen);
    }
  }, {
    key: "_switchView",
    value: function _switchView(view) {
      var forceOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isViewChanged = view !== this.active;
      var shouldForceRendering = false;

      switch (view) {
        case _ui_utils.SidebarView.NONE:
          if (this.isOpen) {
            this.close();
            return true;
          }

          return false;

        case _ui_utils.SidebarView.THUMBS:
          if (this.isOpen && isViewChanged) {
            shouldForceRendering = true;
          }

          break;

        case _ui_utils.SidebarView.OUTLINE:
          if (this.outlineButton.disabled) {
            return false;
          }

          break;

        case _ui_utils.SidebarView.ATTACHMENTS:
          if (this.attachmentsButton.disabled) {
            return false;
          }

          break;

        case _ui_utils.SidebarView.LAYERS:
          if (this.layersButton.disabled) {
            return false;
          }

          break;

        default:
          console.error("PDFSidebar._switchView: \"".concat(view, "\" is not a valid view."));
          return false;
      }

      this.active = view;
      this.thumbnailButton.classList.toggle("toggled", view === _ui_utils.SidebarView.THUMBS);
      this.outlineButton.classList.toggle("toggled", view === _ui_utils.SidebarView.OUTLINE);
      this.attachmentsButton.classList.toggle("toggled", view === _ui_utils.SidebarView.ATTACHMENTS);
      this.layersButton.classList.toggle("toggled", view === _ui_utils.SidebarView.LAYERS);
      this.thumbnailView.classList.toggle("hidden", view !== _ui_utils.SidebarView.THUMBS);
      this.outlineView.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);
      this.attachmentsView.classList.toggle("hidden", view !== _ui_utils.SidebarView.ATTACHMENTS);
      this.layersView.classList.toggle("hidden", view !== _ui_utils.SidebarView.LAYERS);

      this._outlineOptionsContainer.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);

      if (forceOpen && !this.isOpen) {
        this.open();
        return true;
      }

      if (shouldForceRendering) {
        this._updateThumbnailViewer();

        this._forceRendering();
      }

      if (isViewChanged) {
        this._dispatchEvent();
      }

      return isViewChanged;
    }
  }, {
    key: "open",
    value: function open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      this.toggleButton.classList.add("toggled");
      this.outerContainer.classList.add("sidebarMoving", "sidebarOpen");

      if (this.active === _ui_utils.SidebarView.THUMBS) {
        this._updateThumbnailViewer();
      }

      this._forceRendering();

      this._dispatchEvent();

      this._hideUINotification();
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.toggleButton.classList.remove("toggled");
      this.outerContainer.classList.add("sidebarMoving");
      this.outerContainer.classList.remove("sidebarOpen");

      this._forceRendering();

      this._dispatchEvent();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent() {
      this.eventBus.dispatch("sidebarviewchanged", {
        source: this,
        view: this.visibleView
      });
    }
  }, {
    key: "_forceRendering",
    value: function _forceRendering() {
      if (this.onToggled) {
        this.onToggled();
      } else {
        this.pdfViewer.forceRendering();
        this.pdfThumbnailViewer.forceRendering();
      }
    }
  }, {
    key: "_updateThumbnailViewer",
    value: function _updateThumbnailViewer() {
      var pdfViewer = this.pdfViewer,
          pdfThumbnailViewer = this.pdfThumbnailViewer;
      var pagesCount = pdfViewer.pagesCount;

      for (var pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        var pageView = pdfViewer.getPageView(pageIndex);

        if (pageView && pageView.renderingState === _pdf_rendering_queue.RenderingStates.FINISHED) {
          var thumbnailView = pdfThumbnailViewer.getThumbnail(pageIndex);
          thumbnailView.setImage(pageView);
        }
      }

      pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
    }
  }, {
    key: "_showUINotification",
    value: function _showUINotification() {
      var _this = this;

      this.l10n.get("toggle_sidebar_notification2.title", null, "Toggle Sidebar (document contains outline/attachments/layers)").then(function (msg) {
        _this.toggleButton.title = msg;
      });

      if (!this.isOpen) {
        this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
      }
    }
  }, {
    key: "_hideUINotification",
    value: function _hideUINotification() {
      var _this2 = this;

      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isOpen || reset) {
        this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
      }

      if (reset) {
        this.l10n.get("toggle_sidebar.title", null, "Toggle Sidebar").then(function (msg) {
          _this2.toggleButton.title = msg;
        });
      }
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this3 = this;

      this.viewerContainer.addEventListener("transitionend", function (evt) {
        if (evt.target === _this3.viewerContainer) {
          _this3.outerContainer.classList.remove("sidebarMoving");
        }
      });
      this.toggleButton.addEventListener("click", function () {
        _this3.toggle();
      });
      this.thumbnailButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.THUMBS);
      });
      this.outlineButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.OUTLINE);
      });
      this.outlineButton.addEventListener("dblclick", function () {
        _this3.eventBus.dispatch("toggleoutlinetree", {
          source: _this3
        });
      });
      this.attachmentsButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.ATTACHMENTS);
      });
      this.layersButton.addEventListener("click", function () {
        _this3.switchView(_ui_utils.SidebarView.LAYERS);
      });
      this.layersButton.addEventListener("dblclick", function () {
        _this3.eventBus.dispatch("resetlayers", {
          source: _this3
        });
      });

      this._currentOutlineItemButton.addEventListener("click", function () {
        _this3.eventBus.dispatch("currentoutlineitem", {
          source: _this3
        });
      });

      var onTreeLoaded = function onTreeLoaded(count, button, view) {
        button.disabled = !count;
        button.hidden = !count;

        if (count) {
          _this3._showUINotification();
        } else if (_this3.active === view) {
          _this3.switchView(_ui_utils.SidebarView.THUMBS);
        }
      };

      this.eventBus._on("outlineloaded", function (evt) {
        onTreeLoaded(evt.outlineCount, _this3.outlineButton, _ui_utils.SidebarView.OUTLINE);

        if (evt.enableCurrentOutlineItemButton) {
          _this3.pdfViewer.pagesPromise.then(function () {
            _this3._currentOutlineItemButton.disabled = !_this3.isInitialViewSet;
          });
        }
      });

      this.eventBus._on("attachmentsloaded", function (evt) {
        onTreeLoaded(evt.attachmentsCount, _this3.attachmentsButton, _ui_utils.SidebarView.ATTACHMENTS);
      });

      this.eventBus._on("layersloaded", function (evt) {
        onTreeLoaded(evt.layersCount, _this3.layersButton, _ui_utils.SidebarView.LAYERS);
      });

      this.eventBus._on("presentationmodechanged", function (evt) {
        if (evt.state === _ui_utils.PresentationModeState.NORMAL && _this3.isThumbnailViewVisible) {
          _this3._updateThumbnailViewer();
        }
      });
    }
  }, {
    key: "visibleView",
    get: function get() {
      return this.isOpen ? this.active : _ui_utils.SidebarView.NONE;
    }
  }, {
    key: "isThumbnailViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.THUMBS;
    }
  }, {
    key: "isOutlineViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.OUTLINE;
    }
  }, {
    key: "isAttachmentsViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.ATTACHMENTS;
    }
  }, {
    key: "isLayersViewVisible",
    get: function get() {
      return this.isOpen && this.active === _ui_utils.SidebarView.LAYERS;
    }
  }]);

  return PDFSidebar;
}();

exports.PDFSidebar = PDFSidebar;

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSidebarResizer = void 0;

var _ui_utils = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SIDEBAR_WIDTH_VAR = "--sidebar-width";
var SIDEBAR_MIN_WIDTH = 200;
var SIDEBAR_RESIZING_CLASS = "sidebarResizing";

var PDFSidebarResizer = /*#__PURE__*/function () {
  function PDFSidebarResizer(options, eventBus) {
    var _this = this;

    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, PDFSidebarResizer);

    this.isRTL = false;
    this.sidebarOpen = false;
    this.doc = document.documentElement;
    this._width = null;
    this._outerContainerWidth = null;
    this._boundEvents = Object.create(null);
    this.outerContainer = options.outerContainer;
    this.resizer = options.resizer;
    this.eventBus = eventBus;
    l10n.getDirection().then(function (dir) {
      _this.isRTL = dir === "rtl";
    });

    this._addEventListeners();
  }

  _createClass(PDFSidebarResizer, [{
    key: "_updateWidth",
    value: function _updateWidth() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var maxWidth = Math.floor(this.outerContainerWidth / 2);

      if (width > maxWidth) {
        width = maxWidth;
      }

      if (width < SIDEBAR_MIN_WIDTH) {
        width = SIDEBAR_MIN_WIDTH;
      }

      if (width === this._width) {
        return false;
      }

      this._width = width;
      this.doc.style.setProperty(SIDEBAR_WIDTH_VAR, "".concat(width, "px"));
      return true;
    }
  }, {
    key: "_mouseMove",
    value: function _mouseMove(evt) {
      var width = evt.clientX;

      if (this.isRTL) {
        width = this.outerContainerWidth - width;
      }

      this._updateWidth(width);
    }
  }, {
    key: "_mouseUp",
    value: function _mouseUp(evt) {
      this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
      this.eventBus.dispatch("resize", {
        source: this
      });
      var _boundEvents = this._boundEvents;
      window.removeEventListener("mousemove", _boundEvents.mouseMove);
      window.removeEventListener("mouseup", _boundEvents.mouseUp);
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this2 = this;

      var _boundEvents = this._boundEvents;
      _boundEvents.mouseMove = this._mouseMove.bind(this);
      _boundEvents.mouseUp = this._mouseUp.bind(this);
      this.resizer.addEventListener("mousedown", function (evt) {
        if (evt.button !== 0) {
          return;
        }

        _this2.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);

        window.addEventListener("mousemove", _boundEvents.mouseMove);
        window.addEventListener("mouseup", _boundEvents.mouseUp);
      });

      this.eventBus._on("sidebarviewchanged", function (evt) {
        _this2.sidebarOpen = !!(evt && evt.view);
      });

      this.eventBus._on("resize", function (evt) {
        if (!evt || evt.source !== window) {
          return;
        }

        _this2._outerContainerWidth = null;

        if (!_this2._width) {
          return;
        }

        if (!_this2.sidebarOpen) {
          _this2._updateWidth(_this2._width);

          return;
        }

        _this2.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);

        var updated = _this2._updateWidth(_this2._width);

        Promise.resolve().then(function () {
          _this2.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);

          if (updated) {
            _this2.eventBus.dispatch("resize", {
              source: _this2
            });
          }
        });
      });
    }
  }, {
    key: "outerContainerWidth",
    get: function get() {
      if (!this._outerContainerWidth) {
        this._outerContainerWidth = this.outerContainer.clientWidth;
      }

      return this._outerContainerWidth;
    }
  }]);

  return PDFSidebarResizer;
}();

exports.PDFSidebarResizer = PDFSidebarResizer;

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFThumbnailViewer = void 0;

var _ui_utils = __webpack_require__(6);

var _pdf_thumbnail_view = __webpack_require__(29);

var _pdf_rendering_queue = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var THUMBNAIL_SCROLL_MARGIN = -19;
var THUMBNAIL_SELECTED_CLASS = "selected";

var PDFThumbnailViewer = /*#__PURE__*/function () {
  function PDFThumbnailViewer(_ref) {
    var _this = this;

    var container = _ref.container,
        eventBus = _ref.eventBus,
        linkService = _ref.linkService,
        renderingQueue = _ref.renderingQueue,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _ui_utils.NullL10n : _ref$l10n;

    _classCallCheck(this, PDFThumbnailViewer);

    this.container = container;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.l10n = l10n;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdated.bind(this));

    this._resetView();

    eventBus._on("optionalcontentconfigchanged", function () {
      _this._setImageDisabled = true;
    });
  }

  _createClass(PDFThumbnailViewer, [{
    key: "_scrollUpdated",
    value: function _scrollUpdated() {
      this.renderingQueue.renderHighestPriority();
    }
  }, {
    key: "getThumbnail",
    value: function getThumbnail(index) {
      return this._thumbnails[index];
    }
  }, {
    key: "_getVisibleThumbs",
    value: function _getVisibleThumbs() {
      return (0, _ui_utils.getVisibleElements)({
        scrollEl: this.container,
        views: this._thumbnails
      });
    }
  }, {
    key: "scrollThumbnailIntoView",
    value: function scrollThumbnailIntoView(pageNumber) {
      if (!this.pdfDocument) {
        return;
      }

      var thumbnailView = this._thumbnails[pageNumber - 1];

      if (!thumbnailView) {
        console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');
        return;
      }

      if (pageNumber !== this._currentPageNumber) {
        var prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
        prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
        thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
      }

      var visibleThumbs = this._getVisibleThumbs();

      var numVisibleThumbs = visibleThumbs.views.length;

      if (numVisibleThumbs > 0) {
        var first = visibleThumbs.first.id;
        var last = numVisibleThumbs > 1 ? visibleThumbs.last.id : first;
        var shouldScroll = false;

        if (pageNumber <= first || pageNumber >= last) {
          shouldScroll = true;
        } else {
          visibleThumbs.views.some(function (view) {
            if (view.id !== pageNumber) {
              return false;
            }

            shouldScroll = view.percent < 100;
            return true;
          });
        }

        if (shouldScroll) {
          (0, _ui_utils.scrollIntoView)(thumbnailView.div, {
            top: THUMBNAIL_SCROLL_MARGIN
          });
        }
      }

      this._currentPageNumber = pageNumber;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (this._thumbnails[i] && this._thumbnails[i].renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
          this._thumbnails[i].reset();
        }
      }

      _pdf_thumbnail_view.TempImageFactory.destroyCanvas();
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      this._thumbnails = [];
      this._currentPageNumber = 1;
      this._pageLabels = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._pagesRequests = new WeakMap();
      this._setImageDisabled = false;
      this.container.textContent = "";
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var _this2 = this;

      if (this.pdfDocument) {
        this._cancelRendering();

        this._resetView();
      }

      this.pdfDocument = pdfDocument;

      if (!pdfDocument) {
        return;
      }

      var firstPagePromise = pdfDocument.getPage(1);
      var optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
      firstPagePromise.then(function (firstPdfPage) {
        _this2._optionalContentConfigPromise = optionalContentConfigPromise;
        var pagesCount = pdfDocument.numPages;
        var viewport = firstPdfPage.getViewport({
          scale: 1
        });

        var checkSetImageDisabled = function checkSetImageDisabled() {
          return _this2._setImageDisabled;
        };

        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var thumbnail = new _pdf_thumbnail_view.PDFThumbnailView({
            container: _this2.container,
            id: pageNum,
            defaultViewport: viewport.clone(),
            optionalContentConfigPromise: optionalContentConfigPromise,
            linkService: _this2.linkService,
            renderingQueue: _this2.renderingQueue,
            checkSetImageDisabled: checkSetImageDisabled,
            disableCanvasToImageConversion: false,
            l10n: _this2.l10n
          });

          _this2._thumbnails.push(thumbnail);
        }

        var firstThumbnailView = _this2._thumbnails[0];

        if (firstThumbnailView) {
          firstThumbnailView.setPdfPage(firstPdfPage);
        }

        var thumbnailView = _this2._thumbnails[_this2._currentPageNumber - 1];
        thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
      })["catch"](function (reason) {
        console.error("Unable to initialize thumbnail viewer", reason);
      });
    }
  }, {
    key: "_cancelRendering",
    value: function _cancelRendering() {
      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (this._thumbnails[i]) {
          this._thumbnails[i].cancelRendering();
        }
      }
    }
  }, {
    key: "setPageLabels",
    value: function setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }

      if (!labels) {
        this._pageLabels = null;
      } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
      } else {
        this._pageLabels = labels;
      }

      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        var label = this._pageLabels && this._pageLabels[i];

        this._thumbnails[i].setPageLabel(label);
      }
    }
  }, {
    key: "_ensurePdfPageLoaded",
    value: function _ensurePdfPageLoaded(thumbView) {
      var _this3 = this;

      if (thumbView.pdfPage) {
        return Promise.resolve(thumbView.pdfPage);
      }

      if (this._pagesRequests.has(thumbView)) {
        return this._pagesRequests.get(thumbView);
      }

      var promise = this.pdfDocument.getPage(thumbView.id).then(function (pdfPage) {
        if (!thumbView.pdfPage) {
          thumbView.setPdfPage(pdfPage);
        }

        _this3._pagesRequests["delete"](thumbView);

        return pdfPage;
      })["catch"](function (reason) {
        console.error("Unable to get page for thumb view", reason);

        _this3._pagesRequests["delete"](thumbView);
      });

      this._pagesRequests.set(thumbView, promise);

      return promise;
    }
  }, {
    key: "forceRendering",
    value: function forceRendering() {
      var _this4 = this;

      var visibleThumbs = this._getVisibleThumbs();

      var thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, this.scroll.down);

      if (thumbView) {
        this._ensurePdfPageLoaded(thumbView).then(function () {
          _this4.renderingQueue.renderView(thumbView);
        });

        return true;
      }

      return false;
    }
  }, {
    key: "pagesRotation",
    get: function get() {
      return this._pagesRotation;
    },
    set: function set(rotation) {
      if (!(0, _ui_utils.isValidRotation)(rotation)) {
        throw new Error("Invalid thumbnails rotation angle.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (this._pagesRotation === rotation) {
        return;
      }

      this._pagesRotation = rotation;

      for (var i = 0, ii = this._thumbnails.length; i < ii; i++) {
        this._thumbnails[i].update(rotation);
      }
    }
  }]);

  return PDFThumbnailViewer;
}();

exports.PDFThumbnailViewer = PDFThumbnailViewer;

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TempImageFactory = exports.PDFThumbnailView = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _ui_utils = __webpack_require__(6);

var _pdfjsLib = __webpack_require__(7);

var _pdf_rendering_queue = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_NUM_SCALING_STEPS = 3;
var THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
var THUMBNAIL_WIDTH = 98;

var TempImageFactory = function TempImageFactoryClosure() {
  var tempCanvasCache = null;
  return {
    getCanvas: function getCanvas(width, height) {
      var tempCanvas = tempCanvasCache;

      if (!tempCanvas) {
        tempCanvas = document.createElement("canvas");
        tempCanvasCache = tempCanvas;
      }

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCanvas.mozOpaque = true;
      var ctx = tempCanvas.getContext("2d", {
        alpha: false
      });
      ctx.save();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      return tempCanvas;
    },
    destroyCanvas: function destroyCanvas() {
      var tempCanvas = tempCanvasCache;

      if (tempCanvas) {
        tempCanvas.width = 0;
        tempCanvas.height = 0;
      }

      tempCanvasCache = null;
    }
  };
}();

exports.TempImageFactory = TempImageFactory;

var PDFThumbnailView = /*#__PURE__*/function () {
  function PDFThumbnailView(_ref) {
    var container = _ref.container,
        id = _ref.id,
        defaultViewport = _ref.defaultViewport,
        optionalContentConfigPromise = _ref.optionalContentConfigPromise,
        linkService = _ref.linkService,
        renderingQueue = _ref.renderingQueue,
        checkSetImageDisabled = _ref.checkSetImageDisabled,
        _ref$disableCanvasToI = _ref.disableCanvasToImageConversion,
        disableCanvasToImageConversion = _ref$disableCanvasToI === void 0 ? false : _ref$disableCanvasToI,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _ui_utils.NullL10n : _ref$l10n;

    _classCallCheck(this, PDFThumbnailView);

    this.id = id;
    this.renderingId = "thumbnail" + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.resume = null;

    this._checkSetImageDisabled = checkSetImageDisabled || function () {
      return false;
    };

    this.disableCanvasToImageConversion = disableCanvasToImageConversion;
    this.pageWidth = this.viewport.width;
    this.pageHeight = this.viewport.height;
    this.pageRatio = this.pageWidth / this.pageHeight;
    this.canvasWidth = THUMBNAIL_WIDTH;
    this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
    this.scale = this.canvasWidth / this.pageWidth;
    this.l10n = l10n;

    if (window.pdfThumbnailGenerator) {
      window.pdfThumbnailGenerator(this, linkService, id, container, this._thumbPageTitle);
    } else {
      this.createThumbnail(this, linkService, id, container, this._thumbPageTitle);
    }
  }

  _createClass(PDFThumbnailView, [{
    key: "createThumbnail",
    value: function createThumbnail(pdfThumbnailView, linkService, id, container, thumbPageTitlePromise) {
      var anchor = document.createElement("a");
      anchor.href = linkService.getAnchorUrl("#page=" + id);
      thumbPageTitlePromise.then(function (msg) {
        anchor.title = msg;
      });

      anchor.onclick = function () {
        linkService.goToPage(id);
        return false;
      };

      pdfThumbnailView.anchor = anchor;
      var div = document.createElement("div");
      div.className = "thumbnail";
      div.setAttribute("data-page-number", this.id);
      pdfThumbnailView.div = div;
      var ring = document.createElement("div");
      ring.className = "thumbnailSelectionRing";
      var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
      ring.style.width = this.canvasWidth + borderAdjustment + "px";
      ring.style.height = this.canvasHeight + borderAdjustment + "px";
      pdfThumbnailView.ring = ring;
      div.appendChild(ring);
      anchor.appendChild(div);
      container.appendChild(anchor);
    }
  }, {
    key: "setPdfPage",
    value: function setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport({
        scale: 1,
        rotation: totalRotation
      });
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cancelRendering();
      this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this.pageRatio = this.pageWidth / this.pageHeight;
      this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
      this.scale = this.canvasWidth / this.pageWidth;
      this.div.removeAttribute("data-loaded");
      var ring = this.ring;
      var childNodes = ring.childNodes;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        ring.removeChild(childNodes[i]);
      }

      var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
      ring.style.width = this.canvasWidth + borderAdjustment + "px";
      ring.style.height = this.canvasHeight + borderAdjustment + "px";

      if (this.canvas) {
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }

      if (this.image) {
        this.image.removeAttribute("src");
        delete this.image;
      }
    }
  }, {
    key: "update",
    value: function update(rotation) {
      if (typeof rotation !== "undefined") {
        this.rotation = rotation;
      }

      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: 1,
        rotation: totalRotation
      });
      this.reset();
    }
  }, {
    key: "cancelRendering",
    value: function cancelRendering() {
      if (this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
      }

      this.resume = null;
    }
  }, {
    key: "_getPageDrawContext",
    value: function _getPageDrawContext() {
      var canvas = document.createElement("canvas");
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext("2d", {
        alpha: false
      });
      var outputScale = (0, _ui_utils.getOutputScale)(ctx);
      canvas.width = this.canvasWidth * outputScale.sx | 0;
      canvas.height = this.canvasHeight * outputScale.sy | 0;
      canvas.style.width = this.canvasWidth + "px";
      canvas.style.height = this.canvasHeight + "px";
      var transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
      return [ctx, transform];
    }
  }, {
    key: "_convertCanvasToImage",
    value: function _convertCanvasToImage() {
      var _this = this;

      if (!this.canvas) {
        return;
      }

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
        return;
      }

      var className = "thumbnailImage";

      if (this.disableCanvasToImageConversion) {
        this.canvas.className = className;

        this._thumbPageCanvas.then(function (msg) {
          _this.canvas.setAttribute("aria-label", msg);
        });

        this.div.setAttribute("data-loaded", true);
        this.ring.appendChild(this.canvas);
        return;
      }

      var image = document.createElement("img");
      image.className = className;

      this._thumbPageCanvas.then(function (msg) {
        image.setAttribute("aria-label", msg);
      });

      image.style.width = this.canvasWidth + "px";
      image.style.height = this.canvasHeight + "px";
      image.src = this.canvas.toDataURL();
      this.image = image;
      this.div.setAttribute("data-loaded", true);
      this.ring.appendChild(image);
      this.canvas.width = 0;
      this.canvas.height = 0;
      delete this.canvas;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        return Promise.resolve(undefined);
      }

      var pdfPage = this.pdfPage;

      if (!pdfPage) {
        this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;
        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;

      var finishRenderTask = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var error,
              _args = arguments;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  error = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;

                  if (renderTask === _this2.renderTask) {
                    _this2.renderTask = null;
                  }

                  if (!(error instanceof _pdfjsLib.RenderingCancelledException)) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  _this2.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

                  _this2._convertCanvasToImage();

                  if (!error) {
                    _context.next = 8;
                    break;
                  }

                  throw error;

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function finishRenderTask() {
          return _ref2.apply(this, arguments);
        };
      }();

      var _this$_getPageDrawCon = this._getPageDrawContext(),
          _this$_getPageDrawCon2 = _slicedToArray(_this$_getPageDrawCon, 2),
          ctx = _this$_getPageDrawCon2[0],
          transform = _this$_getPageDrawCon2[1];

      var drawViewport = this.viewport.clone({
        scale: this.scale
      });

      var renderContinueCallback = function renderContinueCallback(cont) {
        if (!_this2.renderingQueue.isHighestPriority(_this2)) {
          _this2.renderingState = _pdf_rendering_queue.RenderingStates.PAUSED;

          _this2.resume = function () {
            _this2.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
            cont();
          };

          return;
        }

        cont();
      };

      var renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: drawViewport,
        optionalContentConfigPromise: this._optionalContentConfigPromise
      };
      var renderTask = this.renderTask = pdfPage.render(renderContext);
      renderTask.onContinue = renderContinueCallback;
      var resultPromise = renderTask.promise.then(function () {
        finishRenderTask(null);
      }, function (error) {
        finishRenderTask(error);
      });
      resultPromise["finally"](function () {
        var _this2$pdfPage;

        var pageCached = _this2.linkService.isPageCached(_this2.id);

        if (pageCached) {
          return;
        }

        (_this2$pdfPage = _this2.pdfPage) === null || _this2$pdfPage === void 0 ? void 0 : _this2$pdfPage.cleanup();
      });
      return resultPromise;
    }
  }, {
    key: "setImage",
    value: function setImage(pageView) {
      if (this._checkSetImageDisabled()) {
        return;
      }

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
        return;
      }

      var img = pageView.canvas;

      if (!img) {
        return;
      }

      if (!this.pdfPage) {
        this.setPdfPage(pageView.pdfPage);
      }

      this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

      var _this$_getPageDrawCon3 = this._getPageDrawContext(),
          _this$_getPageDrawCon4 = _slicedToArray(_this$_getPageDrawCon3, 1),
          ctx = _this$_getPageDrawCon4[0];

      var canvas = ctx.canvas;

      if (img.width <= 2 * canvas.width) {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

        this._convertCanvasToImage();

        return;
      }

      var reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
      var reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
      var reducedImage = TempImageFactory.getCanvas(reducedWidth, reducedHeight);
      var reducedImageCtx = reducedImage.getContext("2d");

      while (reducedWidth > img.width || reducedHeight > img.height) {
        reducedWidth >>= 1;
        reducedHeight >>= 1;
      }

      reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);

      while (reducedWidth > 2 * canvas.width) {
        reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
        reducedWidth >>= 1;
        reducedHeight >>= 1;
      }

      ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);

      this._convertCanvasToImage();
    }
  }, {
    key: "setPageLabel",
    value: function setPageLabel(label) {
      var _this3 = this;

      this.pageLabel = typeof label === "string" ? label : null;

      this._thumbPageTitle.then(function (msg) {
        _this3.anchor.title = msg;
      });

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
        return;
      }

      this._thumbPageCanvas.then(function (msg) {
        if (_this3.image) {
          _this3.image.setAttribute("aria-label", msg);
        } else if (_this3.disableCanvasToImageConversion && _this3.canvas) {
          _this3.canvas.setAttribute("aria-label", msg);
        }
      });
    }
  }, {
    key: "_thumbPageTitle",
    get: function get() {
      var _this$pageLabel;

      return this.l10n.get("thumb_page_title", {
        page: (_this$pageLabel = this.pageLabel) !== null && _this$pageLabel !== void 0 ? _this$pageLabel : this.id
      }, "Page {{page}}");
    }
  }, {
    key: "_thumbPageCanvas",
    get: function get() {
      var _this$pageLabel2;

      return this.l10n.get("thumb_page_canvas", {
        page: (_this$pageLabel2 = this.pageLabel) !== null && _this$pageLabel2 !== void 0 ? _this$pageLabel2 : this.id
      }, "Thumbnail of Page {{page}}");
    }
  }]);

  return PDFThumbnailView;
}();

exports.PDFThumbnailView = PDFThumbnailView;

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFViewer = void 0;

var _ui_utils = __webpack_require__(6);

var _base_viewer = __webpack_require__(31);

var _pdfjsLib = __webpack_require__(7);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFViewer = /*#__PURE__*/function (_BaseViewer) {
  _inherits(PDFViewer, _BaseViewer);

  var _super = _createSuper(PDFViewer);

  function PDFViewer() {
    _classCallCheck(this, PDFViewer);

    return _super.apply(this, arguments);
  }

  _createClass(PDFViewer, [{
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;

      if (!pageSpot && !this.isInPresentationMode) {
        var left = pageDiv.offsetLeft + pageDiv.clientLeft;
        var right = left + pageDiv.clientWidth;
        var _this$container = this.container,
            scrollLeft = _this$container.scrollLeft,
            clientWidth = _this$container.clientWidth;

        if (this._isScrollModeHorizontal || left < scrollLeft || right > scrollLeft + clientWidth) {
          pageSpot = {
            left: 0,
            top: 0
          };
        }
      }

      _get(_getPrototypeOf(PDFViewer.prototype), "_scrollIntoView", this).call(this, {
        pageDiv: pageDiv,
        pageSpot: pageSpot,
        pageNumber: pageNumber
      });
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      if (this.isInPresentationMode) {
        return this._getCurrentVisiblePage();
      }

      return _get(_getPrototypeOf(PDFViewer.prototype), "_getVisiblePages", this).call(this);
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {
      if (this.isInPresentationMode) {
        return;
      }

      var currentId = this._currentPageNumber;
      var stillFullyVisible = false;

      var _iterator = _createForOfIteratorHelper(visiblePages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var page = _step.value;

          if (page.percent < 100) {
            break;
          }

          if (page.id === currentId && this._scrollMode === _ui_utils.ScrollMode.VERTICAL && this._spreadMode === _ui_utils.SpreadMode.NONE) {
            stillFullyVisible = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!stillFullyVisible) {
        currentId = visiblePages[0].id;
      }

      this._setCurrentPageNumber(currentId);
    }
  }, {
    key: "_viewerElement",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_viewerElement", this.viewer);
    }
  }]);

  return PDFViewer;
}(_base_viewer.BaseViewer);

exports.PDFViewer = PDFViewer;

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseViewer = void 0;

var _pdfjsLib = __webpack_require__(7);

var _ui_utils = __webpack_require__(6);

var _pdf_rendering_queue = __webpack_require__(10);

var _annotation_layer_builder = __webpack_require__(32);

var _pdf_page_view = __webpack_require__(33);

var _pdf_link_service = __webpack_require__(23);

var _text_layer_builder = __webpack_require__(165);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_CACHE_SIZE = 10;

function PDFPageViewBuffer(size) {
  var data = [];

  this.push = function (view) {
    var i = data.indexOf(view);

    if (i >= 0) {
      data.splice(i, 1);
    }

    data.push(view);

    if (data.length > size) {
      data.shift().destroy();
    }
  };

  this.resize = function (newSize, pagesToKeep) {
    size = newSize;

    if (pagesToKeep) {
      var pageIdsToKeep = new Set();

      for (var i = 0, iMax = pagesToKeep.length; i < iMax; ++i) {
        pageIdsToKeep.add(pagesToKeep[i].id);
      }

      (0, _ui_utils.moveToEndOfArray)(data, function (page) {
        return pageIdsToKeep.has(page.id);
      });
    }

    while (data.length > size) {
      data.shift().destroy();
    }
  };

  this.has = function (view) {
    return data.includes(view);
  };
}

function isSameScale(oldScale, newScale) {
  if (newScale === oldScale) {
    return true;
  }

  if (Math.abs(newScale - oldScale) < 1e-15) {
    return true;
  }

  return false;
}

var BaseViewer = /*#__PURE__*/function () {
  function BaseViewer(options) {
    var _this$container,
        _this$viewer,
        _this = this;

    _classCallCheck(this, BaseViewer);

    if (this.constructor === BaseViewer) {
      throw new Error("Cannot initialize BaseViewer.");
    }

    var viewerVersion = '2.7.673';

    if (_pdfjsLib.version !== viewerVersion) {
      throw new Error("The API version \"".concat(_pdfjsLib.version, "\" does not match the Viewer version \"").concat(viewerVersion, "\"."));
    }

    this._name = this.constructor.name;
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    this.pageViewMode = options.pageViewMode || "single";

    if (!(((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.tagName.toUpperCase()) === "DIV" && ((_this$viewer = this.viewer) === null || _this$viewer === void 0 ? void 0 : _this$viewer.tagName.toUpperCase()) === "DIV")) {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }

    if (getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = typeof options.renderInteractiveForms === "boolean" ? options.renderInteractiveForms : true;
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.enableWebGL = options.enableWebGL || false;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _ui_utils.NullL10n;
    this.enableScripting = options.enableScripting || false;
    this._mouseState = options.mouseState || null;
    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }

    Promise.resolve().then(function () {
      _this.eventBus.dispatch("baseviewerinit", {
        source: _this
      });
    });
  }

  _createClass(BaseViewer, [{
    key: "getPageView",
    value: function getPageView(index) {
      return this._pages[index];
    }
  }, {
    key: "hidePagesDependingOnpageViewMode",
    value: function hidePagesDependingOnpageViewMode() {
      var _this2 = this;

      if (this.pageViewMode === "single") {
        this._pages.forEach(function (page) {
          page.div.style.display = page.id === _this2.currentPageNumber ? "block" : "none";
        });
      }
    }
  }, {
    key: "_setCurrentPageNumber",
    value: function _setCurrentPageNumber(val) {
      var _this3 = this;

      var resetCurrentPageView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._currentPageNumber === val) {
        if (resetCurrentPageView) {
          this._resetCurrentPageView();
        }

        return true;
      }

      if (!(0 < val && val <= this.pagesCount)) {
        return false;
      }

      var previous = this._currentPageNumber;
      this._currentPageNumber = val;
      this.hidePagesDependingOnpageViewMode();

      if (this.pageViewMode === "single" || this.pageViewMode === "infinite-scroll") {
        var pageView = this._pages[this.currentPageNumber - 1];

        this._ensurePdfPageLoaded(pageView).then(function () {
          _this3.renderingQueue.renderView(pageView);
        });
      }

      this.eventBus.dispatch("pagechanging", {
        source: this,
        pageNumber: val,
        pageLabel: this._pageLabels && this._pageLabels[val - 1],
        previous: previous
      });

      if (resetCurrentPageView) {
        this._resetCurrentPageView();
      }

      return true;
    }
  }, {
    key: "_onePageRenderedOrForceFetch",
    value: function _onePageRenderedOrForceFetch() {
      if (!this.container.offsetParent || this._getVisiblePages().views.length === 0) {
        return Promise.resolve();
      }

      return this._onePageRenderedCapability.promise;
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var _this4 = this;

      if (this.pdfDocument) {
        this.eventBus.dispatch("pagesdestroy", {
          source: this
        });

        this._cancelRendering();

        this._resetView();

        if (this.findController) {
          this.findController.setDocument(null);
        }
      }

      this.pdfDocument = pdfDocument;

      if (!pdfDocument) {
        return;
      }

      var pagesCount = pdfDocument.numPages;
      var firstPagePromise = pdfDocument.getPage(1);
      var optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();

      this._pagesCapability.promise.then(function () {
        _this4.eventBus.dispatch("pagesloaded", {
          source: _this4,
          pagesCount: pagesCount
        });
      });

      this._onBeforeDraw = function (evt) {
        var pageView = _this4._pages[evt.pageNumber - 1];

        if (!pageView) {
          return;
        }

        _this4._buffer.push(pageView);
      };

      this.eventBus._on("pagerender", this._onBeforeDraw);

      this._onAfterDraw = function (evt) {
        if (evt.cssTransform || _this4._onePageRenderedCapability.settled) {
          return;
        }

        _this4._onePageRenderedCapability.resolve();

        _this4.eventBus._off("pagerendered", _this4._onAfterDraw);

        _this4._onAfterDraw = null;
      };

      this.eventBus._on("pagerendered", this._onAfterDraw);

      firstPagePromise.then(function (firstPdfPage) {
        _this4._firstPageCapability.resolve(firstPdfPage);

        _this4._optionalContentConfigPromise = optionalContentConfigPromise;
        var scale = _this4.currentScale;
        var viewport = firstPdfPage.getViewport({
          scale: scale * _ui_utils.CSS_UNITS
        });
        var textLayerFactory = _this4.textLayerMode !== _ui_utils.TextLayerMode.DISABLE ? _this4 : null;

        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var pageView = new _pdf_page_view.PDFPageView({
            container: _this4._viewerElement,
            eventBus: _this4.eventBus,
            id: pageNum,
            scale: scale,
            defaultViewport: viewport.clone(),
            optionalContentConfigPromise: optionalContentConfigPromise,
            renderingQueue: _this4.renderingQueue,
            textLayerFactory: textLayerFactory,
            textLayerMode: _this4.textLayerMode,
            annotationLayerFactory: _this4,
            imageResourcesPath: _this4.imageResourcesPath,
            removePageBorders: _this4.removePageBorders,
            renderInteractiveForms: _this4.renderInteractiveForms,
            renderer: _this4.renderer,
            enableWebGL: _this4.enableWebGL,
            useOnlyCssZoom: _this4.useOnlyCssZoom,
            maxCanvasPixels: _this4.maxCanvasPixels,
            l10n: _this4.l10n,
            enableScripting: _this4.enableScripting
          });

          _this4._pages.push(pageView);
        }

        var firstPageView = _this4._pages[0];

        if (firstPageView) {
          firstPageView.setPdfPage(firstPdfPage);

          _this4.linkService.cachePageRef(1, firstPdfPage.ref);
        }

        if (_this4._spreadMode !== _ui_utils.SpreadMode.NONE) {
          _this4._updateSpreadMode();
        }

        _this4._onePageRenderedOrForceFetch().then(function () {
          if (_this4.findController) {
            _this4.findController.setDocument(pdfDocument);
          }

          if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > 7500) {
            _this4._pagesCapability.resolve();

            return;
          }

          var getPagesLeft = pagesCount - 1;

          if (getPagesLeft <= 0) {
            _this4._pagesCapability.resolve();

            return;
          }

          var _loop = function _loop(_pageNum) {
            pdfDocument.getPage(_pageNum).then(function (pdfPage) {
              var pageView = _this4._pages[_pageNum - 1];

              if (!pageView.pdfPage) {
                pageView.setPdfPage(pdfPage);
              }

              _this4.linkService.cachePageRef(_pageNum, pdfPage.ref);

              if (--getPagesLeft === 0) {
                _this4._pagesCapability.resolve();
              }
            }, function (reason) {
              console.error("Unable to get page ".concat(_pageNum, " to initialize viewer"), reason);

              if (--getPagesLeft === 0) {
                _this4._pagesCapability.resolve();
              }
            });
          };

          for (var _pageNum = 2; _pageNum <= pagesCount; ++_pageNum) {
            _loop(_pageNum);
          }
        });

        _this4.hidePagesDependingOnpageViewMode();

        _this4.eventBus.dispatch("pagesinit", {
          source: _this4
        });

        if (_this4.defaultRenderingQueue) {
          _this4.update();
        }
      })["catch"](function (reason) {
        console.error("Unable to initialize viewer", reason);
      });
    }
  }, {
    key: "setPageLabels",
    value: function setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }

      if (!labels) {
        this._pageLabels = null;
      } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error("".concat(this._name, ".setPageLabels: Invalid page labels."));
      } else {
        this._pageLabels = labels;
      }

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var pageView = this._pages[i];
        var label = this._pageLabels && this._pageLabels[i];
        pageView.setPageLabel(label);
      }
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = _ui_utils.UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;
      this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
      this._location = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._pagesRequests = new WeakMap();
      this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._onePageRenderedCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._pagesCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
      this._spreadMode = _ui_utils.SpreadMode.NONE;

      if (this._onBeforeDraw) {
        this.eventBus._off("pagerender", this._onBeforeDraw);

        this._onBeforeDraw = null;
      }

      if (this._onAfterDraw) {
        this.eventBus._off("pagerendered", this._onAfterDraw);

        this._onAfterDraw = null;
      }

      this._resetScriptingEvents();

      this.viewer.textContent = "";

      this._updateScrollMode();
    }
  }, {
    key: "_scrollUpdate",
    value: function _scrollUpdate() {
      if (this.pagesCount === 0) {
        return;
      }

      this.update();
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;

      if (this.pageViewMode === "single") {
        this._pages.forEach(function () {
          pageDiv.style.display = "block";
        });
      }

      (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot, false, this.pageViewMode === 'infinite-scroll');
    }
  }, {
    key: "_setScaleUpdatePages",
    value: function _setScaleUpdatePages(newScale, newValue) {
      var noScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var preset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this._currentScaleValue = newValue.toString();

      if (isSameScale(this._currentScale, newScale)) {
        if (preset) {
          this.eventBus.dispatch("scalechanging", {
            source: this,
            scale: newScale,
            presetValue: newValue
          });
        }

        return;
      }

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        this._pages[i].update(newScale);
      }

      this._currentScale = newScale;

      if (!noScroll) {
        var page = this._currentPageNumber,
            dest;

        if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
          page = this._location.pageNumber;
          dest = [null, {
            name: "XYZ"
          }, this._location.left, this._location.top, null];
        }

        this.scrollPageIntoView({
          pageNumber: page,
          destArray: dest,
          allowNegativeOffset: true
        });
      }

      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: preset ? newValue : undefined
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }
  }, {
    key: "_setScale",
    value: function _setScale(value) {
      var noScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scale = parseFloat(value);

      if (scale > 0) {
        this._setScaleUpdatePages(scale, value, noScroll, false);
      } else {
        var currentPage = this._pages[this._currentPageNumber - 1];

        if (!currentPage) {
          return;
        }

        var noPadding = this.isInPresentationMode || this.removePageBorders;
        var verticalPadding = _ui_utils.VERTICAL_PADDING;

        if (this.pageViewMode === 'single') {
          verticalPadding += 15;
        }

        var hPadding = noPadding ? 0 : _ui_utils.SCROLLBAR_PADDING;
        var vPadding = noPadding ? this.pageViewMode === 'single' ? 10 : 0 : verticalPadding;

        if (!noPadding && this._isScrollModeHorizontal) {
          var _ref2 = [vPadding, hPadding];
          hPadding = _ref2[0];
          vPadding = _ref2[1];
        }

        var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
        var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

        switch (value) {
          case "page-actual":
            scale = 1;
            break;

          case "page-width":
            scale = pageWidthScale;
            break;

          case "page-height":
            scale = pageHeightScale;
            break;

          case "page-fit":
            scale = Math.min(pageWidthScale, pageHeightScale);
            break;

          case "auto":
            var horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
            scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
            break;

          default:
            console.error("".concat(this._name, "._setScale: \"").concat(value, "\" is an unknown zoom value."));
            return;
        }

        this._setScaleUpdatePages(scale, value, noScroll, true);
      }
    }
  }, {
    key: "_resetCurrentPageView",
    value: function _resetCurrentPageView() {
      if (this.isInPresentationMode) {
        this._setScale(this._currentScaleValue, true);
      }

      var pageView = this._pages[this._currentPageNumber - 1];

      this._scrollIntoView({
        pageDiv: pageView.div
      });
    }
  }, {
    key: "pageLabelToPageNumber",
    value: function pageLabelToPageNumber(label) {
      if (!this._pageLabels) {
        return null;
      }

      var i = this._pageLabels.indexOf(label);

      if (i < 0) {
        return null;
      }

      return i + 1;
    }
  }, {
    key: "scrollPageIntoView",
    value: function scrollPageIntoView(_ref3) {
      var _this5 = this;

      var pageNumber = _ref3.pageNumber,
          _ref3$destArray = _ref3.destArray,
          destArray = _ref3$destArray === void 0 ? null : _ref3$destArray,
          _ref3$allowNegativeOf = _ref3.allowNegativeOffset,
          allowNegativeOffset = _ref3$allowNegativeOf === void 0 ? false : _ref3$allowNegativeOf,
          _ref3$ignoreDestinati = _ref3.ignoreDestinationZoom,
          ignoreDestinationZoom = _ref3$ignoreDestinati === void 0 ? false : _ref3$ignoreDestinati;

      if (!this.pdfDocument) {
        return;
      }

      var pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];

      if (!pageView) {
        console.error("".concat(this._name, ".scrollPageIntoView: ") + "\"".concat(pageNumber, "\" is not a valid pageNumber parameter."));
        return;
      }

      if (this.isInPresentationMode || !destArray) {
        this._setCurrentPageNumber(pageNumber, true);

        return;
      }

      var x = 0,
          y = 0;
      var width = 0,
          height = 0,
          widthScale,
          heightScale;
      var changeOrientation = pageView.rotation % 180 !== 0;
      var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _ui_utils.CSS_UNITS;
      var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _ui_utils.CSS_UNITS;
      var scale = 0;

      switch (destArray[1].name) {
        case "XYZ":
          x = destArray[2];
          y = destArray[3];
          scale = destArray[4];
          x = x !== null ? x : 0;
          y = y !== null ? y : pageHeight;
          break;

        case "Fit":
        case "FitB":
          scale = "page-fit";
          break;

        case "FitH":
        case "FitBH":
          y = destArray[2];
          scale = "page-width";

          if (y === null && this._location) {
            x = this._location.left;
            y = this._location.top;
          } else if (typeof y !== "number") {
            y = pageHeight;
          }

          break;

        case "FitV":
        case "FitBV":
          x = destArray[2];
          width = pageWidth;
          height = pageHeight;
          scale = "page-height";
          break;

        case "FitR":
          x = destArray[2];
          y = destArray[3];
          width = destArray[4] - x;
          height = destArray[5] - y;
          var hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
          var vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
          widthScale = (this.container.clientWidth - hPadding) / width / _ui_utils.CSS_UNITS;
          heightScale = (this.container.clientHeight - vPadding) / height / _ui_utils.CSS_UNITS;
          scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
          break;

        default:
          console.error("".concat(this._name, ".scrollPageIntoView: ") + "\"".concat(destArray[1].name, "\" is not a valid destination type."));
          return;
      }

      if (!ignoreDestinationZoom) {
        if (scale && scale !== this._currentScale) {
          this.currentScaleValue = scale;
        } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
          this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
        }
      }

      this._ensurePdfPageLoaded(pageView).then(function () {
        _this5.renderingQueue.renderView(pageView);

        if (_this5.currentPageNumber !== pageNumber) {
          _this5.currentPageNumber = pageNumber;
        }
      });

      if (scale === "page-fit" && !destArray[4]) {
        this._scrollIntoView({
          pageDiv: pageView.div,
          pageNumber: pageNumber
        });

        return;
      }

      var boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
      var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      var top = Math.min(boundingRect[0][1], boundingRect[1][1]);

      if (!allowNegativeOffset) {
        left = Math.max(left, 0);
        top = Math.max(top, 0);
      }

      this._scrollIntoView({
        pageDiv: pageView.div,
        pageSpot: {
          left: left,
          top: top
        },
        pageNumber: pageNumber
      });
    }
  }, {
    key: "_updateLocation",
    value: function _updateLocation(firstPage) {
      var currentScale = this._currentScale;
      var currentScaleValue = this._currentScaleValue;
      var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
      var pageNumber = firstPage.id;
      var pdfOpenParams = "#page=" + pageNumber;
      pdfOpenParams += "&zoom=" + normalizedScaleValue;
      var currentPageView = this._pages[pageNumber - 1];
      var container = this.container;
      var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
      var intLeft = Math.round(topLeft[0]);
      var intTop = Math.round(topLeft[1]);
      pdfOpenParams += "," + intLeft + "," + intTop;
      this._location = {
        pageNumber: pageNumber,
        scale: normalizedScaleValue,
        top: intTop,
        left: intLeft,
        rotation: this._pagesRotation,
        pdfOpenParams: pdfOpenParams
      };
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {
      throw new Error("Not implemented: _updateHelper");
    }
  }, {
    key: "update",
    value: function update() {
      var visible = this._getVisiblePages();

      var visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

      if (numVisiblePages === 0) {
        return;
      }

      var newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);

      this._buffer.resize(newCacheSize, visiblePages);

      this.renderingQueue.renderHighestPriority(visible);

      this._updateHelper(visiblePages);

      this._updateLocation(visible.first);

      this.eventBus.dispatch("updateviewarea", {
        source: this,
        location: this._location
      });
    }
  }, {
    key: "containsElement",
    value: function containsElement(element) {
      return this.container.contains(element);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.container.focus();
    }
  }, {
    key: "_getCurrentVisiblePage",
    value: function _getCurrentVisiblePage() {
      if (!this.pagesCount) {
        return {
          views: []
        };
      }

      var pageView = this._pages[this._currentPageNumber - 1];
      var element = pageView.div;
      var view = {
        id: pageView.id,
        x: element.offsetLeft + element.clientLeft,
        y: element.offsetTop + element.clientTop,
        view: pageView
      };
      return {
        first: view,
        last: view,
        views: [view]
      };
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      if (this.pageViewMode === 'single') {
        return this._getCurrentVisiblePage();
      }

      return (0, _ui_utils.getVisibleElements)({
        scrollEl: this.container,
        views: this._pages,
        sortByVisibility: true,
        horizontal: this._isScrollModeHorizontal,
        rtl: this._isScrollModeHorizontal && this._isContainerRtl
      });
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      if (!this.pdfDocument) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("".concat(this._name, ".isPageVisible: \"").concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      return this._getVisiblePages().views.some(function (view) {
        return view.id === pageNumber;
      });
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      if (!this.pdfDocument || !this._buffer) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("".concat(this._name, ".isPageCached: \"").concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      var pageView = this._pages[pageNumber - 1];

      if (!pageView) {
        return false;
      }

      return this._buffer.has(pageView);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i] && this._pages[i].renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
          this._pages[i].reset();
        }
      }
    }
  }, {
    key: "_cancelRendering",
    value: function _cancelRendering() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i]) {
          this._pages[i].cancelRendering();
        }
      }
    }
  }, {
    key: "_ensurePdfPageLoaded",
    value: function _ensurePdfPageLoaded(pageView) {
      var _this6 = this;

      if (pageView.pdfPage) {
        return Promise.resolve(pageView.pdfPage);
      }

      if (this._pagesRequests.has(pageView)) {
        return this._pagesRequests.get(pageView);
      }

      var promise = this.pdfDocument.getPage(pageView.id).then(function (pdfPage) {
        if (!pageView.pdfPage) {
          pageView.setPdfPage(pdfPage);
        }

        _this6._pagesRequests["delete"](pageView);

        return pdfPage;
      })["catch"](function (reason) {
        console.error("Unable to get page for page view", reason);

        _this6._pagesRequests["delete"](pageView);
      });

      this._pagesRequests.set(pageView, promise);

      return promise;
    }
  }, {
    key: "forceRendering",
    value: function forceRendering(currentlyVisiblePages) {
      var _this7 = this;

      var visiblePages = currentlyVisiblePages || this._getVisiblePages();

      var scrollAhead = this._isScrollModeHorizontal ? this.scroll.right : this.scroll.down;
      var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead);

      if (pageView) {
        this._ensurePdfPageLoaded(pageView).then(function () {
          _this7.renderingQueue.renderView(pageView);
        });

        return true;
      }

      return false;
    }
  }, {
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      return new _text_layer_builder.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        eventBus: eventBus,
        pageIndex: pageIndex,
        viewport: viewport,
        findController: this.isInPresentationMode ? null : this.findController,
        enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
      });
    }
  }, {
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var _this$pdfDocument, _this$pdfDocument2;

      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderInteractiveForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ui_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      return new _annotation_layer_builder.AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage || ((_this$pdfDocument = this.pdfDocument) === null || _this$pdfDocument === void 0 ? void 0 : _this$pdfDocument.annotationStorage),
        imageResourcesPath: imageResourcesPath,
        renderInteractiveForms: renderInteractiveForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager,
        l10n: l10n,
        enableScripting: enableScripting,
        hasJSActionsPromise: hasJSActionsPromise || ((_this$pdfDocument2 = this.pdfDocument) === null || _this$pdfDocument2 === void 0 ? void 0 : _this$pdfDocument2.hasJSActions()),
        mouseState: mouseState || this._mouseState
      });
    }
  }, {
    key: "getPagesOverview",
    value: function getPagesOverview() {
      var pagesOverview = this._pages.map(function (pageView) {
        var viewport = pageView.pdfPage.getViewport({
          scale: 1
        });
        return {
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation
        };
      });

      if (!this.enablePrintAutoRotate) {
        return pagesOverview;
      }

      return pagesOverview.map(function (size) {
        if ((0, _ui_utils.isPortraitOrientation)(size)) {
          return size;
        }

        return {
          width: size.height,
          height: size.width,
          rotation: (size.rotation + 90) % 360
        };
      });
    }
  }, {
    key: "_updateScrollMode",
    value: function _updateScrollMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var scrollMode = this._scrollMode,
          viewer = this.viewer;
      viewer.classList.toggle("scrollHorizontal", scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
      viewer.classList.toggle("scrollWrapped", scrollMode === _ui_utils.ScrollMode.WRAPPED);

      if (!this.pdfDocument || !pageNumber) {
        return;
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "_updateSpreadMode",
    value: function _updateSpreadMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!this.pdfDocument) {
        return;
      }

      var viewer = this.viewer,
          pages = this._pages;
      viewer.textContent = "";

      if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
        for (var i = 0, iMax = pages.length; i < iMax; ++i) {
          viewer.appendChild(pages[i].div);
        }
      } else {
        var parity = this._spreadMode - 1;
        var spread = null;

        for (var _i = 0, _iMax = pages.length; _i < _iMax; ++_i) {
          if (spread === null) {
            spread = document.createElement("div");
            spread.className = "spread";
            viewer.appendChild(spread);
          } else if (_i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.appendChild(spread);
          }

          spread.appendChild(pages[_i].div);
        }
      }

      if (!pageNumber) {
        return;
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "_getPageAdvance",
    value: function _getPageAdvance(currentPageNumber) {
      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.isInPresentationMode) {
        return 1;
      }

      switch (this._scrollMode) {
        case _ui_utils.ScrollMode.WRAPPED:
          {
            var _this$_getVisiblePage = this._getVisiblePages(),
                views = _this$_getVisiblePage.views,
                pageLayout = new Map();

            var _iterator = _createForOfIteratorHelper(views),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _step.value,
                    id = _step$value.id,
                    y = _step$value.y,
                    percent = _step$value.percent,
                    widthPercent = _step$value.widthPercent;

                if (percent === 0 || widthPercent < 100) {
                  continue;
                }

                var yArray = pageLayout.get(y);

                if (!yArray) {
                  pageLayout.set(y, yArray || (yArray = []));
                }

                yArray.push(id);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            var _iterator2 = _createForOfIteratorHelper(pageLayout.values()),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _yArray = _step2.value;

                var currentIndex = _yArray.indexOf(currentPageNumber);

                if (currentIndex === -1) {
                  continue;
                }

                var numPages = _yArray.length;

                if (numPages === 1) {
                  break;
                }

                if (previous) {
                  for (var i = currentIndex - 1, ii = 0; i >= ii; i--) {
                    var currentId = _yArray[i],
                        expectedId = _yArray[i + 1] - 1;

                    if (currentId < expectedId) {
                      return currentPageNumber - expectedId;
                    }
                  }
                } else {
                  for (var _i2 = currentIndex + 1, _ii = numPages; _i2 < _ii; _i2++) {
                    var _currentId = _yArray[_i2],
                        _expectedId = _yArray[_i2 - 1] + 1;

                    if (_currentId > _expectedId) {
                      return _expectedId - currentPageNumber;
                    }
                  }
                }

                if (previous) {
                  var firstId = _yArray[0];

                  if (firstId < currentPageNumber) {
                    return currentPageNumber - firstId + 1;
                  }
                } else {
                  var lastId = _yArray[numPages - 1];

                  if (lastId > currentPageNumber) {
                    return lastId - currentPageNumber + 1;
                  }
                }

                break;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            break;
          }

        case _ui_utils.ScrollMode.HORIZONTAL:
          {
            break;
          }

        case _ui_utils.ScrollMode.VERTICAL:
          {
            if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
              break;
            }

            var parity = this._spreadMode - 1;

            if (previous && currentPageNumber % 2 !== parity) {
              break;
            } else if (!previous && currentPageNumber % 2 === parity) {
              break;
            }

            var _this$_getVisiblePage2 = this._getVisiblePages(),
                _views = _this$_getVisiblePage2.views,
                _expectedId2 = previous ? currentPageNumber - 1 : currentPageNumber + 1;

            var _iterator3 = _createForOfIteratorHelper(_views),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _step3$value = _step3.value,
                    _id = _step3$value.id,
                    _percent = _step3$value.percent,
                    _widthPercent = _step3$value.widthPercent;

                if (_id !== _expectedId2) {
                  continue;
                }

                if (_percent > 0 && _widthPercent === 100) {
                  return 2;
                }

                break;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            break;
          }
      }

      return 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

      if (currentPageNumber >= pagesCount) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, false) || 1;
      this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
      return true;
    }
  }, {
    key: "previousPage",
    value: function previousPage() {
      var currentPageNumber = this._currentPageNumber;

      if (currentPageNumber <= 1) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, true) || 1;
      this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
      return true;
    }
  }, {
    key: "initializeScriptingEvents",
    value: function initializeScriptingEvents() {
      var _this8 = this;

      if (!this.enableScripting || this._pageOpenPendingSet) {
        return;
      }

      var eventBus = this.eventBus,
          pageOpenPendingSet = this._pageOpenPendingSet = new Set(),
          scriptingEvents = this._scriptingEvents || (this._scriptingEvents = Object.create(null));

      var dispatchPageClose = function dispatchPageClose(pageNumber) {
        if (pageOpenPendingSet.has(pageNumber)) {
          return;
        }

        eventBus.dispatch("pageclose", {
          source: _this8,
          pageNumber: pageNumber
        });
      };

      var dispatchPageOpen = function dispatchPageOpen(pageNumber) {
        var pageView = _this8._pages[pageNumber - 1];

        if ((pageView === null || pageView === void 0 ? void 0 : pageView.renderingState) === _pdf_rendering_queue.RenderingStates.FINISHED) {
          var _pageView$pdfPage;

          pageOpenPendingSet["delete"](pageNumber);
          eventBus.dispatch("pageopen", {
            source: _this8,
            pageNumber: pageNumber,
            actionsPromise: (_pageView$pdfPage = pageView.pdfPage) === null || _pageView$pdfPage === void 0 ? void 0 : _pageView$pdfPage.getJSActions()
          });
        } else {
          pageOpenPendingSet.add(pageNumber);
        }
      };

      scriptingEvents.onPageChanging = function (_ref4) {
        var pageNumber = _ref4.pageNumber,
            previous = _ref4.previous;

        if (pageNumber === previous) {
          return;
        }

        dispatchPageClose(previous);
        dispatchPageOpen(pageNumber);
      };

      eventBus._on("pagechanging", scriptingEvents.onPageChanging);

      scriptingEvents.onPageRendered = function (_ref5) {
        var pageNumber = _ref5.pageNumber;

        if (!pageOpenPendingSet.has(pageNumber)) {
          return;
        }

        if (pageNumber !== _this8._currentPageNumber) {
          return;
        }

        dispatchPageOpen(pageNumber);
      };

      eventBus._on("pagerendered", scriptingEvents.onPageRendered);

      scriptingEvents.onPagesDestroy = function () {
        dispatchPageClose(_this8._currentPageNumber);
      };

      eventBus._on("pagesdestroy", scriptingEvents.onPagesDestroy);

      dispatchPageOpen(this._currentPageNumber);
    }
  }, {
    key: "_resetScriptingEvents",
    value: function _resetScriptingEvents() {
      if (!this.enableScripting || !this._pageOpenPendingSet) {
        return;
      }

      var eventBus = this.eventBus,
          scriptingEvents = this._scriptingEvents;

      eventBus._off("pagechanging", scriptingEvents.onPageChanging);

      scriptingEvents.onPageChanging = null;

      eventBus._off("pagerendered", scriptingEvents.onPageRendered);

      scriptingEvents.onPageRendered = null;

      eventBus._off("pagesdestroy", scriptingEvents.onPagesDestroy);

      scriptingEvents.onPagesDestroy = null;
      this._pageOpenPendingSet = null;
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this._pages.length;
    }
  }, {
    key: "pageViewsReady",
    get: function get() {
      if (!this._pagesCapability.settled) {
        return false;
      }

      return this._pages.every(function (pageView) {
        return pageView && pageView.pdfPage;
      });
    }
  }, {
    key: "currentPageNumber",
    get: function get() {
      return this._currentPageNumber;
    },
    set: function set(val) {
      if (!Number.isInteger(val)) {
        throw new Error("Invalid page number.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._setCurrentPageNumber(val, true)) {
        console.error("".concat(this._name, ".currentPageNumber: \"").concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "currentPageLabel",
    get: function get() {
      return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      var page = val | 0;

      if (this._pageLabels) {
        var i = this._pageLabels.indexOf(val);

        if (i >= 0) {
          page = i + 1;
        }
      }

      if (!this._setCurrentPageNumber(page, true)) {
        console.error("".concat(this._name, ".currentPageLabel: \"").concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "currentScale",
    get: function get() {
      return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
    },
    set: function set(val) {
      if (isNaN(val)) {
        throw new Error("Invalid numeric scale.");
      }

      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, this.pageViewMode === "single");
    }
  }, {
    key: "currentScaleValue",
    get: function get() {
      return this._currentScaleValue;
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, this.pageViewMode === "single");
    }
  }, {
    key: "pagesRotation",
    get: function get() {
      return this._pagesRotation;
    },
    set: function set(rotation) {
      if (!(0, _ui_utils.isValidRotation)(rotation)) {
        throw new Error("Invalid pages rotation angle.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (this._pagesRotation === rotation) {
        return;
      }

      this._pagesRotation = rotation;
      var pageNumber = this._currentPageNumber;

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var pageView = this._pages[i];
        pageView.update(pageView.scale, rotation);
      }

      if (this._currentScaleValue) {
        this._setScale(this._currentScaleValue, true);
      }

      this.eventBus.dispatch("rotationchanging", {
        source: this,
        pagesRotation: rotation,
        pageNumber: pageNumber
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }
  }, {
    key: "firstPagePromise",
    get: function get() {
      return this.pdfDocument ? this._firstPageCapability.promise : null;
    }
  }, {
    key: "onePageRendered",
    get: function get() {
      return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
    }
  }, {
    key: "pagesPromise",
    get: function get() {
      return this.pdfDocument ? this._pagesCapability.promise : null;
    }
  }, {
    key: "_viewerElement",
    get: function get() {
      throw new Error("Not implemented: _viewerElement");
    }
  }, {
    key: "_pageWidthScaleFactor",
    get: function get() {
      if (this.spreadMode !== _ui_utils.SpreadMode.NONE && this.scrollMode !== _ui_utils.ScrollMode.HORIZONTAL && !this.isInPresentationMode) {
        return 2;
      }

      return 1;
    }
  }, {
    key: "_isScrollModeHorizontal",
    get: function get() {
      return this.isInPresentationMode ? false : this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL;
    }
  }, {
    key: "_isContainerRtl",
    get: function get() {
      return getComputedStyle(this.container).direction === "rtl";
    }
  }, {
    key: "isInPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
    }
  }, {
    key: "isChangingPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
    }
  }, {
    key: "isHorizontalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
    }
  }, {
    key: "isVerticalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
    }
  }, {
    key: "hasEqualPageSizes",
    get: function get() {
      var firstPageView = this._pages[0];

      for (var i = 1, ii = this._pages.length; i < ii; ++i) {
        var pageView = this._pages[i];

        if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "optionalContentConfigPromise",
    get: function get() {
      if (!this.pdfDocument) {
        return Promise.resolve(null);
      }

      if (!this._optionalContentConfigPromise) {
        return this.pdfDocument.getOptionalContentConfig();
      }

      return this._optionalContentConfigPromise;
    },
    set: function set(promise) {
      if (!(promise instanceof Promise)) {
        throw new Error("Invalid optionalContentConfigPromise: ".concat(promise));
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._optionalContentConfigPromise) {
        return;
      }

      this._optionalContentConfigPromise = promise;

      var _iterator4 = _createForOfIteratorHelper(this._pages),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var pageView = _step4.value;
          pageView.update(pageView.scale, pageView.rotation, promise);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      this.update();
      this.eventBus.dispatch("optionalcontentconfigchanged", {
        source: this,
        promise: promise
      });
    }
  }, {
    key: "scrollMode",
    get: function get() {
      return this._scrollMode;
    },
    set: function set(mode) {
      if (this._scrollMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidScrollMode)(mode)) {
        throw new Error("Invalid scroll mode: ".concat(mode));
      }

      this._scrollMode = mode;
      this.eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode: mode
      });

      this._updateScrollMode(this._currentPageNumber);
    }
  }, {
    key: "spreadMode",
    get: function get() {
      return this._spreadMode;
    },
    set: function set(mode) {
      if (this._spreadMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
        throw new Error("Invalid spread mode: ".concat(mode));
      }

      this._spreadMode = mode;
      this.eventBus.dispatch("spreadmodechanged", {
        source: this,
        mode: mode
      });

      this._updateSpreadMode(this._currentPageNumber);
    }
  }]);

  return BaseViewer;
}();

exports.BaseViewer = BaseViewer;

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DefaultAnnotationLayerFactory = exports.AnnotationLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(7);

var _ui_utils = __webpack_require__(6);

var _pdf_link_service = __webpack_require__(23);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationLayerBuilder = /*#__PURE__*/function () {
  function AnnotationLayerBuilder(_ref) {
    var pageDiv = _ref.pageDiv,
        pdfPage = _ref.pdfPage,
        linkService = _ref.linkService,
        downloadManager = _ref.downloadManager,
        _ref$annotationStorag = _ref.annotationStorage,
        annotationStorage = _ref$annotationStorag === void 0 ? null : _ref$annotationStorag,
        _ref$imageResourcesPa = _ref.imageResourcesPath,
        imageResourcesPath = _ref$imageResourcesPa === void 0 ? "" : _ref$imageResourcesPa,
        _ref$renderInteractiv = _ref.renderInteractiveForms,
        renderInteractiveForms = _ref$renderInteractiv === void 0 ? true : _ref$renderInteractiv,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _ui_utils.NullL10n : _ref$l10n,
        _ref$enableScripting = _ref.enableScripting,
        enableScripting = _ref$enableScripting === void 0 ? false : _ref$enableScripting,
        _ref$hasJSActionsProm = _ref.hasJSActionsPromise,
        hasJSActionsPromise = _ref$hasJSActionsProm === void 0 ? null : _ref$hasJSActionsProm,
        _ref$mouseState = _ref.mouseState,
        mouseState = _ref$mouseState === void 0 ? null : _ref$mouseState;

    _classCallCheck(this, AnnotationLayerBuilder);

    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderInteractiveForms = renderInteractiveForms;
    this.l10n = l10n;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise;
    this._mouseState = mouseState;
    this.div = null;
    this._cancelled = false;
  }

  _createClass(AnnotationLayerBuilder, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var intent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "display";
      return Promise.all([this.pdfPage.getAnnotations({
        intent: intent
      }), this._hasJSActionsPromise]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            annotations = _ref3[0],
            _ref3$ = _ref3[1],
            hasJSActions = _ref3$ === void 0 ? false : _ref3$;

        if (_this._cancelled) {
          return;
        }

        if (annotations.length === 0) {
          return;
        }

        var parameters = {
          viewport: viewport.clone({
            dontFlip: true
          }),
          div: _this.div,
          annotations: annotations,
          page: _this.pdfPage,
          imageResourcesPath: _this.imageResourcesPath,
          removePageBorders: _this.removePageBorders,
          renderInteractiveForms: _this.renderInteractiveForms,
          linkService: _this.linkService,
          downloadManager: _this.downloadManager,
          annotationStorage: _this.annotationStorage,
          enableScripting: _this.enableScripting,
          hasJSActions: hasJSActions,
          mouseState: _this._mouseState
        };

        if (_this.div) {
          _pdfjsLib.AnnotationLayer.update(parameters);
        } else {
          _this.div = document.createElement("div");
          _this.div.className = "annotationLayer";

          _this.pageDiv.appendChild(_this.div);

          parameters.div = _this.div;

          _pdfjsLib.AnnotationLayer.render(parameters);

          _this.l10n.translate(_this.div);
        }
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.div) {
        return;
      }

      this.div.setAttribute("hidden", "true");
    }
  }]);

  return AnnotationLayerBuilder;
}();

exports.AnnotationLayerBuilder = AnnotationLayerBuilder;

var DefaultAnnotationLayerFactory = /*#__PURE__*/function () {
  function DefaultAnnotationLayerFactory() {
    _classCallCheck(this, DefaultAnnotationLayerFactory);
  }

  _createClass(DefaultAnnotationLayerFactory, [{
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderInteractiveForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ui_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      return new AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        imageResourcesPath: imageResourcesPath,
        renderInteractiveForms: renderInteractiveForms,
        linkService: new _pdf_link_service.SimpleLinkService(),
        l10n: l10n,
        annotationStorage: annotationStorage,
        enableScripting: enableScripting,
        hasJSActionsPromise: hasJSActionsPromise,
        mouseState: mouseState
      });
    }
  }]);

  return DefaultAnnotationLayerFactory;
}();

exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPageView = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _ui_utils = __webpack_require__(6);

var _pdfjsLib = __webpack_require__(7);

var _pdf_rendering_queue = __webpack_require__(10);

var _viewer_compatibility = __webpack_require__(2);

var _canvasSize = _interopRequireDefault(__webpack_require__(34));

var _util = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_CANVAS_PIXELS = _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels || 16777216;

var PDFPageView = /*#__PURE__*/function () {
  function PDFPageView(options) {
    _classCallCheck(this, PDFPageView);

    var container = options.container;
    var defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.hasRestrictedScaling = false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = typeof options.renderInteractiveForms === "boolean" ? options.renderInteractiveForms : true;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.textLayerFactory = options.textLayerFactory;
    this.annotationLayerFactory = options.annotationLayerFactory;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.enableWebGL = options.enableWebGL || false;
    this.l10n = options.l10n || _ui_utils.NullL10n;
    this.enableScripting = options.enableScripting || false;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.resume = null;
    this._renderError = null;
    this.annotationLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    var div = document.createElement("div");
    div.className = "page";
    div.style.width = Math.floor(this.viewport.width) + "px";
    div.style.height = Math.floor(this.viewport.height) + "px";
    div.setAttribute("data-page-number", this.id);
    this.div = div;
    container.appendChild(div);
  }

  _createClass(PDFPageView, [{
    key: "setPdfPage",
    value: function setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport({
        scale: this.scale * _ui_utils.CSS_UNITS,
        rotation: totalRotation
      });
      this.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.reset();

      if (this.pdfPage) {
        this.pdfPage.cleanup();
      }
    }
  }, {
    key: "_renderAnnotationLayer",
    value: function () {
      var _renderAnnotationLayer2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var error;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                error = null;
                _context.prev = 1;
                _context.next = 4;
                return this.annotationLayer.render(this.viewport, "display");

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                error = _context.t0;

              case 9:
                _context.prev = 9;
                this.eventBus.dispatch("annotationlayerrendered", {
                  source: this,
                  pageNumber: this.id,
                  error: error
                });
                return _context.finish(9);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6, 9, 12]]);
      }));

      function _renderAnnotationLayer() {
        return _renderAnnotationLayer2.apply(this, arguments);
      }

      return _renderAnnotationLayer;
    }()
  }, {
    key: "_resetZoomLayer",
    value: function _resetZoomLayer() {
      var removeFromDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.zoomLayer) {
        return;
      }

      var zoomLayerCanvas = this.zoomLayer.firstChild;
      this.paintedViewportMap["delete"](zoomLayerCanvas);
      zoomLayerCanvas.width = 0;
      zoomLayerCanvas.height = 0;

      if (removeFromDOM) {
        this.zoomLayer.remove();
      }

      this.zoomLayer = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      var keepZoomLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var keepAnnotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.cancelRendering(keepAnnotations);
      this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
      var div = this.div;
      div.style.width = Math.floor(this.viewport.width) + "px";
      div.style.height = Math.floor(this.viewport.height) + "px";
      var childNodes = div.childNodes;
      var currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
      var currentAnnotationNode = keepAnnotations && this.annotationLayer && this.annotationLayer.div || null;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        var node = childNodes[i];

        if (currentZoomLayerNode === node || currentAnnotationNode === node) {
          continue;
        }

        div.removeChild(node);
      }

      div.removeAttribute("data-loaded");

      if (currentAnnotationNode) {
        this.annotationLayer.hide();
      } else if (this.annotationLayer) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
      }

      if (!currentZoomLayerNode) {
        if (this.canvas) {
          this.paintedViewportMap["delete"](this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }

        this._resetZoomLayer();
      }

      if (this.svg) {
        this.paintedViewportMap["delete"](this.svg);
        delete this.svg;
      }

      this.loadingIconDiv = document.createElement("div");
      this.loadingIconDiv.className = "loadingIcon";
      div.appendChild(this.loadingIconDiv);
    }
  }, {
    key: "update",
    value: function update(scale, rotation) {
      var optionalContentConfigPromise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.scale = scale || this.scale;

      if (typeof rotation !== "undefined") {
        this.rotation = rotation;
      }

      if (optionalContentConfigPromise instanceof Promise) {
        this._optionalContentConfigPromise = optionalContentConfigPromise;
      }

      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: this.scale * _ui_utils.CSS_UNITS,
        rotation: totalRotation
      });

      if (this.svg) {
        this.cssTransform(this.svg, true);
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError
        });
        return;
      }

      var isScalingRestricted = false;

      if (this.canvas && this.maxCanvasPixels > 0) {
        var outputScale = this.outputScale;

        if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > this.maxCanvasPixels) {
          isScalingRestricted = true;
        }
      }

      if (this.canvas) {
        if (this.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
          this.cssTransform(this.canvas, true);
          this.eventBus.dispatch("pagerendered", {
            source: this,
            pageNumber: this.id,
            cssTransform: true,
            timestamp: performance.now(),
            error: this._renderError
          });
          return;
        }

        if (!this.zoomLayer && !this.canvas.hasAttribute("hidden")) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = "absolute";
        }
      }

      if (this.zoomLayer) {
        this.cssTransform(this.zoomLayer.firstChild);
      }

      this.reset(true, true);
    }
  }, {
    key: "cancelRendering",
    value: function cancelRendering() {
      var keepAnnotations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
      }

      this.resume = null;

      if (this.textLayer) {
        this.textLayer.cancel();
        this.textLayer = null;
      }

      if (!keepAnnotations && this.annotationLayer) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
      }
    }
  }, {
    key: "cssTransform",
    value: function cssTransform(target) {
      var redrawAnnotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var width = this.viewport.width;
      var height = this.viewport.height;
      var div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + "px";
      target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + "px";
      var relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
      var absRotation = Math.abs(relativeRotation);
      var scaleX = 1,
          scaleY = 1;

      if (absRotation === 90 || absRotation === 270) {
        scaleX = height / width;
        scaleY = width / height;
      }

      target.style.transform = "rotate(".concat(relativeRotation, "deg) scale(").concat(scaleX, ", ").concat(scaleY, ")");

      if (this.textLayer) {
        var textLayerViewport = this.textLayer.viewport;
        var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
        var textAbsRotation = Math.abs(textRelativeRotation);
        var scale = width / textLayerViewport.width;

        if (textAbsRotation === 90 || textAbsRotation === 270) {
          scale = width / textLayerViewport.height;
        }

        var textLayerDiv = this.textLayer.textLayerDiv;
        var transX, transY;

        switch (textAbsRotation) {
          case 0:
            transX = transY = 0;
            break;

          case 90:
            transX = 0;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 180:
            transX = "-" + textLayerDiv.style.width;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 270:
            transX = "-" + textLayerDiv.style.width;
            transY = 0;
            break;

          default:
            console.error("Bad rotation value.");
            break;
        }

        textLayerDiv.style.transform = "rotate(".concat(textAbsRotation, "deg) ") + "scale(".concat(scale, ") ") + "translate(".concat(transX, ", ").concat(transY, ")");
        textLayerDiv.style.transformOrigin = "0% 0%";
      }

      if (redrawAnnotations && this.annotationLayer) {
        this._renderAnnotationLayer();
      }
    }
  }, {
    key: "getPagePoint",
    value: function getPagePoint(x, y) {
      return this.viewport.convertToPdfPoint(x, y);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        this.reset();
      }

      var div = this.div,
          pdfPage = this.pdfPage;

      if (!pdfPage) {
        this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

        if (this.loadingIconDiv) {
          div.removeChild(this.loadingIconDiv);
          delete this.loadingIconDiv;
        }

        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
      var canvasWrapper = document.createElement("div");
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add("canvasWrapper");

      if (this.annotationLayer && this.annotationLayer.div) {
        div.insertBefore(canvasWrapper, this.annotationLayer.div);
      } else {
        div.appendChild(canvasWrapper);
      }

      var textLayer = null;

      if (this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && this.textLayerFactory) {
        var textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        textLayerDiv.style.width = canvasWrapper.style.width;
        textLayerDiv.style.height = canvasWrapper.style.height;

        if (this.annotationLayer && this.annotationLayer.div) {
          div.insertBefore(textLayerDiv, this.annotationLayer.div);
        } else {
          div.appendChild(textLayerDiv);
        }

        textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.textLayerMode === _ui_utils.TextLayerMode.ENABLE_ENHANCE, this.eventBus);
      }

      this.textLayer = textLayer;
      var renderContinueCallback = null;

      if (this.renderingQueue) {
        renderContinueCallback = function renderContinueCallback(cont) {
          if (!_this.renderingQueue.isHighestPriority(_this)) {
            _this.renderingState = _pdf_rendering_queue.RenderingStates.PAUSED;

            _this.resume = function () {
              _this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
              cont();
            };

            return;
          }

          cont();
        };
      }

      var finishPaintTask = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          var error,
              _args2 = arguments;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  error = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;

                  if (paintTask === _this.paintTask) {
                    _this.paintTask = null;
                  }

                  if (!(error instanceof _pdfjsLib.RenderingCancelledException)) {
                    _context2.next = 5;
                    break;
                  }

                  _this._renderError = null;
                  return _context2.abrupt("return");

                case 5:
                  _this._renderError = error;
                  _this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

                  if (_this.loadingIconDiv) {
                    div.removeChild(_this.loadingIconDiv);
                    delete _this.loadingIconDiv;
                  }

                  _this._resetZoomLayer(true);

                  _this.eventBus.dispatch("pagerendered", {
                    source: _this,
                    pageNumber: _this.id,
                    cssTransform: false,
                    timestamp: performance.now(),
                    error: _this._renderError
                  });

                  if (!error) {
                    _context2.next = 12;
                    break;
                  }

                  throw error;

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function finishPaintTask() {
          return _ref.apply(this, arguments);
        };
      }();

      var paintTask = this.renderer === _ui_utils.RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;
      var resultPromise = paintTask.promise.then(function () {
        return finishPaintTask(null).then(function () {
          if (textLayer) {
            var readableStream = pdfPage.streamTextContent({
              normalizeWhitespace: true
            });
            textLayer.setTextContentStream(readableStream);
            textLayer.render();
          }
        });
      }, function (reason) {
        return finishPaintTask(reason);
      });

      if (this.annotationLayerFactory) {
        if (!this.annotationLayer) {
          this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, null, this.imageResourcesPath, this.renderInteractiveForms, this.l10n, this.enableScripting, null, null);
        }

        this._renderAnnotationLayer();
      }

      div.setAttribute("data-loaded", true);
      this.eventBus.dispatch("pagerender", {
        source: this,
        pageNumber: this.id
      });
      return resultPromise;
    }
  }, {
    key: "paintOnCanvas",
    value: function paintOnCanvas(canvasWrapper) {
      var renderCapability = (0, _pdfjsLib.createPromiseCapability)();
      var result = {
        promise: renderCapability.promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          renderTask.cancel();
        }
      };
      var viewport = this.viewport;
      var canvas = document.createElement("canvas");
      this.l10n.get("page_canvas", {
        page: this.id
      }, "Page {{page}}").then(function (msg) {
        canvas.setAttribute("aria-label", msg);
      });
      canvas.setAttribute("hidden", "hidden");
      var isCanvasHidden = true;

      var showCanvas = function showCanvas() {
        if (isCanvasHidden) {
          canvas.removeAttribute("hidden");
          isCanvasHidden = false;
        }
      };

      canvasWrapper.appendChild(canvas);
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext("2d", {
        alpha: false
      });
      var outputScale = (0, _ui_utils.getOutputScale)(ctx);
      this.outputScale = outputScale;

      if (this.useOnlyCssZoom) {
        var actualSizeViewport = viewport.clone({
          scale: _ui_utils.CSS_UNITS
        });
        outputScale.sx *= actualSizeViewport.width / viewport.width;
        outputScale.sy *= actualSizeViewport.height / viewport.height;
        outputScale.scaled = true;
      }

      if (this.maxCanvasPixels > 0) {
        var pixelsInViewport = viewport.width * viewport.height;
        var maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);

        if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
          outputScale.sx = maxScale;
          outputScale.sy = maxScale;
          outputScale.scaled = true;
          this.hasRestrictedScaling = true;
        } else {
          this.hasRestrictedScaling = false;
        }
      }

      var sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
      var sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
      var width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
      var height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);

      if (width >= 4096 || height >= 4096) {
        if (!!this.maxWidth || !_canvasSize["default"].test({
          width: width,
          height: height
        })) {
          var max = this.determineMaxDimensions();
          var divisor = Math.max(width / max, height / max);
          var newScale = Math.floor(100 * this.scale / divisor) / 100;
          divisor = this.scale / newScale;
          this.scale = newScale;
          var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;
          PDFViewerApplicationOptions.set('maxZoom', newScale);
          PDFViewerApplication.pdfViewer.currentScaleValue = this.scale;
          viewport.width /= divisor;
          viewport.height /= divisor;
          (0, _util.warn)("Page " + this.id + ": Reduced the maximum zoom to " + newScale + " because the browser can't render larger canvases.");
        }
      }

      canvas.width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + "px";
      canvas.style.height = (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + "px";
      this.paintedViewportMap.set(canvas, viewport);
      var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
      var renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: this.viewport,
        enableWebGL: this.enableWebGL,
        renderInteractiveForms: this.renderInteractiveForms,
        optionalContentConfigPromise: this._optionalContentConfigPromise
      };
      var renderTask = this.pdfPage.render(renderContext);

      renderTask.onContinue = function (cont) {
        showCanvas();

        if (result.onRenderContinue) {
          result.onRenderContinue(cont);
        } else {
          cont();
        }
      };

      renderTask.promise.then(function () {
        showCanvas();
        renderCapability.resolve(undefined);
      }, function (error) {
        showCanvas();
        renderCapability.reject(error);
      });
      return result;
    }
  }, {
    key: "paintOnSvg",
    value: function paintOnSvg(wrapper) {
      var _this2 = this;

      var cancelled = false;

      var ensureNotCancelled = function ensureNotCancelled() {
        if (cancelled) {
          throw new _pdfjsLib.RenderingCancelledException("Rendering cancelled, page ".concat(_this2.id), "svg");
        }
      };

      var pdfPage = this.pdfPage;
      var actualSizeViewport = this.viewport.clone({
        scale: _ui_utils.CSS_UNITS
      });
      var promise = pdfPage.getOperatorList().then(function (opList) {
        ensureNotCancelled();
        var svgGfx = new _pdfjsLib.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
        return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
          ensureNotCancelled();
          _this2.svg = svg;

          _this2.paintedViewportMap.set(svg, actualSizeViewport);

          svg.style.width = wrapper.style.width;
          svg.style.height = wrapper.style.height;
          _this2.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;
          wrapper.appendChild(svg);
        });
      });
      return {
        promise: promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          cancelled = true;
        }
      };
    }
  }, {
    key: "setPageLabel",
    value: function setPageLabel(label) {
      this.pageLabel = typeof label === "string" ? label : null;

      if (this.pageLabel !== null) {
        this.div.setAttribute("data-page-label", this.pageLabel);
      } else {
        this.div.removeAttribute("data-page-label");
      }
    }
  }, {
    key: "determineMaxDimensions",
    value: function determineMaxDimensions() {
      if (this.maxWidth) {
        return this.maxWidth;
      }

      var checklist = [4096, 8192, 10836, 11180, 11402, 14188, 16384];

      for (var _i = 0, _checklist = checklist; _i < _checklist.length; _i++) {
        var width = _checklist[_i];

        if (!_canvasSize["default"].test({
          width: width + 1,
          height: width + 1
        })) {
          this.maxWidth = width;
          return this.maxWidth;
        }
      }

      return 16384;
    }
  }, {
    key: "width",
    get: function get() {
      return this.viewport.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.viewport.height;
    }
  }]);

  return PDFPageView;
}();

exports.PDFPageView = PDFPageView;

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function canvasTest(settings) {
  var size = settings.sizes.shift();
  var width = size[0];
  var height = size[1];
  var fill = [width - 1, height - 1, 1, 1];
  var job = Date.now();
  var isWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
  var cropCvs, testCvs;

  if (isWorker) {
    cropCvs = new OffscreenCanvas(1, 1);
    testCvs = new OffscreenCanvas(width, height);
  } else {
    cropCvs = document.createElement("canvas");
    cropCvs.width = 1;
    cropCvs.height = 1;
    testCvs = document.createElement("canvas");
    testCvs.width = width;
    testCvs.height = height;
  }

  var cropCtx = cropCvs.getContext("2d");
  var testCtx = testCvs.getContext("2d");

  if (testCtx) {
    testCtx.fillRect.apply(testCtx, fill);
    cropCtx.drawImage(testCvs, width - 1, height - 1, 1, 1, 0, 0, 1, 1);
  }

  var isTestPass = cropCtx && cropCtx.getImageData(0, 0, 1, 1).data[3] !== 0;
  var benchmark = Date.now() - job;

  if (isWorker) {
    postMessage({
      width: width,
      height: height,
      benchmark: benchmark,
      isTestPass: isTestPass
    });

    if (!isTestPass && settings.sizes.length) {
      canvasTest(settings);
    }
  } else if (isTestPass) {
    settings.onSuccess(width, height, benchmark);
  } else {
    settings.onError(width, height, benchmark);

    if (settings.sizes.length) {
      canvasTest(settings);
    }
  }

  return isTestPass;
}

var testSizes = {
  area: [16384, 14188, 11402, 10836, 11180, 8192, 4096, 1],
  height: [8388607, 65535, 32767, 16384, 8192, 4096, 1],
  width: [4194303, 65535, 32767, 16384, 8192, 4096, 1]
};
var defaults = {
  max: null,
  min: 1,
  sizes: [],
  step: 1024,
  usePromise: false,
  useWorker: false,
  onError: Function.prototype,
  onSuccess: Function.prototype
};
var workerJobs = {};

function createSizesArray(settings) {
  var isArea = settings.width === settings.height;
  var isWidth = settings.height === 1;
  var isHeight = settings.width === 1;
  var sizes = [];

  if (!settings.width || !settings.height) {
    settings.sizes.forEach(function (testSize) {
      var width = isArea || isWidth ? testSize : 1;
      var height = isArea || isHeight ? testSize : 1;
      sizes.push([width, height]);
    });
  } else {
    var testMin = settings.min || defaults.min;
    var testStep = settings.step || defaults.step;
    var testSize = Math.max(settings.width, settings.height);

    while (testSize >= testMin) {
      var width = isArea || isWidth ? testSize : 1;
      var height = isArea || isHeight ? testSize : 1;
      sizes.push([width, height]);
      testSize -= testStep;
    }
  }

  return sizes;
}

function handleMethod(settings) {
  var hasCanvasSupport = window && "HTMLCanvasElement" in window;
  var hasOffscreenCanvasSupport = window && "OffscreenCanvas" in window;
  var jobID = Date.now();

  var _onError = settings.onError,
      _onSuccess = settings.onSuccess,
      settingsWithoutCallbacks = _objectWithoutProperties(settings, ["onError", "onSuccess"]);

  var worker = null;

  if (!hasCanvasSupport) {
    return false;
  }

  if (settings.useWorker && hasOffscreenCanvasSupport) {
    var js = "\n            ".concat(canvasTest.toString(), "\n            onmessage = function(e) {\n                canvasTest(e.data);\n            };\n        ");
    var blob = new Blob([js], {
      type: "application/javascript"
    });
    var blobURL = URL.createObjectURL(blob);
    worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);

    worker.onmessage = function (e) {
      var _e$data = e.data,
          width = _e$data.width,
          height = _e$data.height,
          benchmark = _e$data.benchmark,
          isTestPass = _e$data.isTestPass;

      if (isTestPass) {
        workerJobs[jobID].onSuccess(width, height, benchmark);
        delete workerJobs[jobID];
      } else {
        workerJobs[jobID].onError(width, height, benchmark);
      }
    };
  }

  if (settings.usePromise) {
    return new Promise(function (resolve, reject) {
      var promiseSettings = _objectSpread2(_objectSpread2({}, settings), {}, {
        onError: function onError(width, height, benchmark) {
          var isLastTest;

          if (settings.sizes.length === 0) {
            isLastTest = true;
          } else {
            var _settings$sizes$slice = settings.sizes.slice(-1),
                _settings$sizes$slice2 = _slicedToArray(_settings$sizes$slice, 1),
                _settings$sizes$slice3 = _slicedToArray(_settings$sizes$slice2[0], 2),
                lastWidth = _settings$sizes$slice3[0],
                lastHeight = _settings$sizes$slice3[1];

            isLastTest = width === lastWidth && height === lastHeight;
          }

          _onError(width, height, benchmark);

          if (isLastTest) {
            reject({
              width: width,
              height: height,
              benchmark: benchmark
            });
          }
        },
        onSuccess: function onSuccess(width, height, benchmark) {
          _onSuccess(width, height, benchmark);

          resolve({
            width: width,
            height: height,
            benchmark: benchmark
          });
        }
      });

      if (worker) {
        var onError = promiseSettings.onError,
            onSuccess = promiseSettings.onSuccess;
        workerJobs[jobID] = {
          onError: onError,
          onSuccess: onSuccess
        };
        worker.postMessage(settingsWithoutCallbacks);
      } else {
        canvasTest(promiseSettings);
      }
    });
  } else {
    if (worker) {
      workerJobs[jobID] = {
        onError: _onError,
        onSuccess: _onSuccess
      };
      worker.postMessage(settingsWithoutCallbacks);
    } else {
      return canvasTest(settings);
    }
  }
}

var canvasSize = {
  maxArea: function maxArea() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sizes = createSizesArray({
      width: options.max,
      height: options.max,
      min: options.min,
      step: options.step,
      sizes: _toConsumableArray(testSizes.area)
    });

    var settings = _objectSpread2(_objectSpread2(_objectSpread2({}, defaults), options), {}, {
      sizes: sizes
    });

    return handleMethod(settings);
  },
  maxHeight: function maxHeight() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sizes = createSizesArray({
      width: 1,
      height: options.max,
      min: options.min,
      step: options.step,
      sizes: _toConsumableArray(testSizes.height)
    });

    var settings = _objectSpread2(_objectSpread2(_objectSpread2({}, defaults), options), {}, {
      sizes: sizes
    });

    return handleMethod(settings);
  },
  maxWidth: function maxWidth() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sizes = createSizesArray({
      width: options.max,
      height: 1,
      min: options.min,
      step: options.step,
      sizes: _toConsumableArray(testSizes.width)
    });

    var settings = _objectSpread2(_objectSpread2(_objectSpread2({}, defaults), options), {}, {
      sizes: sizes
    });

    return handleMethod(settings);
  },
  test: function test() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var settings = _objectSpread2(_objectSpread2({}, defaults), options);

    settings.sizes = _toConsumableArray(settings.sizes);

    if (settings.width && settings.height) {
      settings.sizes = [[settings.width, settings.height]];
    }

    return handleMethod(settings);
  }
};
var _default = canvasSize;
exports.default = _default;

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createPromiseCapability = createPromiseCapability;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
exports.encodeToXmlString = encodeToXmlString;
exports.escapeString = escapeString;
exports.getModificationDate = getModificationDate;
exports.getVerbosityLevel = getVerbosityLevel;
exports.info = info;
exports.isArrayBuffer = isArrayBuffer;
exports.isArrayEqual = isArrayEqual;
exports.isAscii = isAscii;
exports.isBool = isBool;
exports.isNum = isNum;
exports.isSameOrigin = isSameOrigin;
exports.isString = isString;
exports.objectFromEntries = objectFromEntries;
exports.objectSize = objectSize;
exports.removeNullCharacters = removeNullCharacters;
exports.setVerbosityLevel = setVerbosityLevel;
exports.shadow = shadow;
exports.string32 = string32;
exports.stringToBytes = stringToBytes;
exports.stringToPDFString = stringToPDFString;
exports.stringToUTF16BEString = stringToUTF16BEString;
exports.stringToUTF8String = stringToUTF8String;
exports.unreachable = unreachable;
exports.utf8StringToString = utf8StringToString;
exports.warn = warn;
exports.VerbosityLevel = exports.Util = exports.UNSUPPORTED_FEATURES = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.PageActionEventType = exports.OPS = exports.MissingPDFException = exports.IsLittleEndianCached = exports.IsEvalSupportedCached = exports.InvalidPDFException = exports.ImageKind = exports.IDENTITY_MATRIX = exports.FormatError = exports.FontType = exports.FONT_IDENTITY_MATRIX = exports.DocumentActionEventType = exports.createObjectURL = exports.CMapCompressionType = exports.BaseException = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.AnnotationActionEventType = exports.AbortException = void 0;

__webpack_require__(36);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
var FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
var PermissionFlag = {
  PRINT: 0x04,
  MODIFY_CONTENTS: 0x08,
  COPY: 0x10,
  MODIFY_ANNOTATIONS: 0x20,
  FILL_INTERACTIVE_FORMS: 0x100,
  COPY_FOR_ACCESSIBILITY: 0x200,
  ASSEMBLE: 0x400,
  PRINT_HIGH_QUALITY: 0x800
};
exports.PermissionFlag = PermissionFlag;
var TextRenderingMode = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
};
exports.TextRenderingMode = TextRenderingMode;
var ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
};
exports.ImageKind = ImageKind;
var AnnotationType = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
};
exports.AnnotationType = AnnotationType;
var AnnotationStateModelType = {
  MARKED: "Marked",
  REVIEW: "Review"
};
exports.AnnotationStateModelType = AnnotationStateModelType;
var AnnotationMarkedState = {
  MARKED: "Marked",
  UNMARKED: "Unmarked"
};
exports.AnnotationMarkedState = AnnotationMarkedState;
var AnnotationReviewState = {
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NONE: "None"
};
exports.AnnotationReviewState = AnnotationReviewState;
var AnnotationReplyType = {
  GROUP: "Group",
  REPLY: "R"
};
exports.AnnotationReplyType = AnnotationReplyType;
var AnnotationFlag = {
  INVISIBLE: 0x01,
  HIDDEN: 0x02,
  PRINT: 0x04,
  NOZOOM: 0x08,
  NOROTATE: 0x10,
  NOVIEW: 0x20,
  READONLY: 0x40,
  LOCKED: 0x80,
  TOGGLENOVIEW: 0x100,
  LOCKEDCONTENTS: 0x200
};
exports.AnnotationFlag = AnnotationFlag;
var AnnotationFieldFlag = {
  READONLY: 0x0000001,
  REQUIRED: 0x0000002,
  NOEXPORT: 0x0000004,
  MULTILINE: 0x0001000,
  PASSWORD: 0x0002000,
  NOTOGGLETOOFF: 0x0004000,
  RADIO: 0x0008000,
  PUSHBUTTON: 0x0010000,
  COMBO: 0x0020000,
  EDIT: 0x0040000,
  SORT: 0x0080000,
  FILESELECT: 0x0100000,
  MULTISELECT: 0x0200000,
  DONOTSPELLCHECK: 0x0400000,
  DONOTSCROLL: 0x0800000,
  COMB: 0x1000000,
  RICHTEXT: 0x2000000,
  RADIOSINUNISON: 0x2000000,
  COMMITONSELCHANGE: 0x4000000
};
exports.AnnotationFieldFlag = AnnotationFieldFlag;
var AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
};
exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
var AnnotationActionEventType = {
  E: "Mouse Enter",
  X: "Mouse Exit",
  D: "Mouse Down",
  U: "Mouse Up",
  Fo: "Focus",
  Bl: "Blur",
  PO: "PageOpen",
  PC: "PageClose",
  PV: "PageVisible",
  PI: "PageInvisible",
  K: "Keystroke",
  F: "Format",
  V: "Validate",
  C: "Calculate"
};
exports.AnnotationActionEventType = AnnotationActionEventType;
var DocumentActionEventType = {
  WC: "WillClose",
  WS: "WillSave",
  DS: "DidSave",
  WP: "WillPrint",
  DP: "DidPrint"
};
exports.DocumentActionEventType = DocumentActionEventType;
var PageActionEventType = {
  O: "PageOpen",
  C: "PageClose"
};
exports.PageActionEventType = PageActionEventType;
var StreamType = {
  UNKNOWN: "UNKNOWN",
  FLATE: "FLATE",
  LZW: "LZW",
  DCT: "DCT",
  JPX: "JPX",
  JBIG: "JBIG",
  A85: "A85",
  AHX: "AHX",
  CCF: "CCF",
  RLX: "RLX"
};
exports.StreamType = StreamType;
var FontType = {
  UNKNOWN: "UNKNOWN",
  TYPE1: "TYPE1",
  TYPE1C: "TYPE1C",
  CIDFONTTYPE0: "CIDFONTTYPE0",
  CIDFONTTYPE0C: "CIDFONTTYPE0C",
  TRUETYPE: "TRUETYPE",
  CIDFONTTYPE2: "CIDFONTTYPE2",
  TYPE3: "TYPE3",
  OPENTYPE: "OPENTYPE",
  TYPE0: "TYPE0",
  MMTYPE1: "MMTYPE1"
};
exports.FontType = FontType;
var VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
};
exports.VerbosityLevel = VerbosityLevel;
var CMapCompressionType = {
  NONE: 0,
  BINARY: 1,
  STREAM: 2
};
exports.CMapCompressionType = CMapCompressionType;
var OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotations: 78,
  endAnnotations: 79,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintJpegXObject: 82,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91
};
exports.OPS = OPS;
var UNSUPPORTED_FEATURES = {
  unknown: "unknown",
  forms: "forms",
  javaScript: "javaScript",
  smask: "smask",
  shadingPattern: "shadingPattern",
  font: "font",
  errorTilingPattern: "errorTilingPattern",
  errorExtGState: "errorExtGState",
  errorXObject: "errorXObject",
  errorFontLoadType3: "errorFontLoadType3",
  errorFontState: "errorFontState",
  errorFontMissing: "errorFontMissing",
  errorFontTranslate: "errorFontTranslate",
  errorColorSpace: "errorColorSpace",
  errorOperatorList: "errorOperatorList",
  errorFontToUnicode: "errorFontToUnicode",
  errorFontLoadNative: "errorFontLoadNative",
  errorFontGetPath: "errorFontGetPath",
  errorMarkedContent: "errorMarkedContent"
};
exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
var PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
exports.PasswordResponses = PasswordResponses;
var verbosity = VerbosityLevel.WARNINGS;

function setVerbosityLevel(level) {
  if (Number.isInteger(level)) {
    verbosity = level;
  }
}

function getVerbosityLevel() {
  return verbosity;
}

function info(msg) {
  if (verbosity >= VerbosityLevel.INFOS) {
    console.log("Info: ".concat(msg));
  }
}

function warn(msg) {
  if (verbosity >= VerbosityLevel.WARNINGS) {
    console.log("Warning: ".concat(msg));
  }
}

function unreachable(msg) {
  throw new Error(msg);
}

function assert(cond, msg) {
  if (!cond) {
    unreachable(msg);
  }
}

function isSameOrigin(baseUrl, otherUrl) {
  var base;

  try {
    base = new URL(baseUrl);

    if (!base.origin || base.origin === "null") {
      return false;
    }
  } catch (e) {
    return false;
  }

  var other = new URL(otherUrl, base);
  return base.origin === other.origin;
}

function _isValidProtocol(url) {
  if (!url) {
    return false;
  }

  switch (url.protocol) {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return true;

    default:
      return false;
  }
}

function createValidAbsoluteUrl(url, baseUrl) {
  if (!url) {
    return null;
  }

  try {
    var absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);

    if (_isValidProtocol(absoluteUrl)) {
      return absoluteUrl;
    }
  } catch (ex) {}

  return null;
}

function shadow(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: false
  });
  return value;
}

var BaseException = function BaseExceptionClosure() {
  function BaseException(message) {
    if (this.constructor === BaseException) {
      unreachable("Cannot initialize BaseException.");
    }

    this.message = message;
    this.name = this.constructor.name;
  }

  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();

exports.BaseException = BaseException;

var PasswordException = /*#__PURE__*/function (_BaseException) {
  _inherits(PasswordException, _BaseException);

  var _super = _createSuper(PasswordException);

  function PasswordException(msg, code) {
    var _this;

    _classCallCheck(this, PasswordException);

    _this = _super.call(this, msg);
    _this.code = code;
    return _this;
  }

  return PasswordException;
}(BaseException);

exports.PasswordException = PasswordException;

var UnknownErrorException = /*#__PURE__*/function (_BaseException2) {
  _inherits(UnknownErrorException, _BaseException2);

  var _super2 = _createSuper(UnknownErrorException);

  function UnknownErrorException(msg, details) {
    var _this2;

    _classCallCheck(this, UnknownErrorException);

    _this2 = _super2.call(this, msg);
    _this2.details = details;
    return _this2;
  }

  return UnknownErrorException;
}(BaseException);

exports.UnknownErrorException = UnknownErrorException;

var InvalidPDFException = /*#__PURE__*/function (_BaseException3) {
  _inherits(InvalidPDFException, _BaseException3);

  var _super3 = _createSuper(InvalidPDFException);

  function InvalidPDFException() {
    _classCallCheck(this, InvalidPDFException);

    return _super3.apply(this, arguments);
  }

  return InvalidPDFException;
}(BaseException);

exports.InvalidPDFException = InvalidPDFException;

var MissingPDFException = /*#__PURE__*/function (_BaseException4) {
  _inherits(MissingPDFException, _BaseException4);

  var _super4 = _createSuper(MissingPDFException);

  function MissingPDFException() {
    _classCallCheck(this, MissingPDFException);

    return _super4.apply(this, arguments);
  }

  return MissingPDFException;
}(BaseException);

exports.MissingPDFException = MissingPDFException;

var UnexpectedResponseException = /*#__PURE__*/function (_BaseException5) {
  _inherits(UnexpectedResponseException, _BaseException5);

  var _super5 = _createSuper(UnexpectedResponseException);

  function UnexpectedResponseException(msg, status) {
    var _this3;

    _classCallCheck(this, UnexpectedResponseException);

    _this3 = _super5.call(this, msg);
    _this3.status = status;
    return _this3;
  }

  return UnexpectedResponseException;
}(BaseException);

exports.UnexpectedResponseException = UnexpectedResponseException;

var FormatError = /*#__PURE__*/function (_BaseException6) {
  _inherits(FormatError, _BaseException6);

  var _super6 = _createSuper(FormatError);

  function FormatError() {
    _classCallCheck(this, FormatError);

    return _super6.apply(this, arguments);
  }

  return FormatError;
}(BaseException);

exports.FormatError = FormatError;

var AbortException = /*#__PURE__*/function (_BaseException7) {
  _inherits(AbortException, _BaseException7);

  var _super7 = _createSuper(AbortException);

  function AbortException() {
    _classCallCheck(this, AbortException);

    return _super7.apply(this, arguments);
  }

  return AbortException;
}(BaseException);

exports.AbortException = AbortException;
var NullCharactersRegExp = /\x00/g;

function removeNullCharacters(str) {
  if (typeof str !== "string") {
    warn("The argument for removeNullCharacters must be a string.");
    return str;
  }

  return str.replace(NullCharactersRegExp, "");
}

function bytesToString(bytes) {
  assert(bytes !== null && _typeof(bytes) === "object" && bytes.length !== undefined, "Invalid argument for bytesToString");
  var length = bytes.length;
  var MAX_ARGUMENT_COUNT = 8192;

  if (length < MAX_ARGUMENT_COUNT) {
    return String.fromCharCode.apply(null, bytes);
  }

  var strBuf = [];

  for (var i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
    var chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
    var chunk = bytes.subarray(i, chunkEnd);
    strBuf.push(String.fromCharCode.apply(null, chunk));
  }

  return strBuf.join("");
}

function stringToBytes(str) {
  assert(typeof str === "string", "Invalid argument for stringToBytes");
  var length = str.length;
  var bytes = new Uint8Array(length);

  for (var i = 0; i < length; ++i) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }

  return bytes;
}

function arrayByteLength(arr) {
  if (arr.length !== undefined) {
    return arr.length;
  }

  assert(arr.byteLength !== undefined, "arrayByteLength - invalid argument.");
  return arr.byteLength;
}

function arraysToBytes(arr) {
  var length = arr.length;

  if (length === 1 && arr[0] instanceof Uint8Array) {
    return arr[0];
  }

  var resultLength = 0;

  for (var i = 0; i < length; i++) {
    resultLength += arrayByteLength(arr[i]);
  }

  var pos = 0;
  var data = new Uint8Array(resultLength);

  for (var _i = 0; _i < length; _i++) {
    var item = arr[_i];

    if (!(item instanceof Uint8Array)) {
      if (typeof item === "string") {
        item = stringToBytes(item);
      } else {
        item = new Uint8Array(item);
      }
    }

    var itemLength = item.byteLength;
    data.set(item, pos);
    pos += itemLength;
  }

  return data;
}

function string32(value) {
  return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
}

function objectSize(obj) {
  return Object.keys(obj).length;
}

function objectFromEntries(iterable) {
  return Object.assign(Object.create(null), Object.fromEntries(iterable));
}

function isLittleEndian() {
  var buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  var view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}

var IsLittleEndianCached = {
  get value() {
    return shadow(this, "value", isLittleEndian());
  }

};
exports.IsLittleEndianCached = IsLittleEndianCached;

function isEvalSupported() {
  try {
    new Function("");
    return true;
  } catch (e) {
    return false;
  }
}

var IsEvalSupportedCached = {
  get value() {
    return shadow(this, "value", isEvalSupported());
  }

};
exports.IsEvalSupportedCached = IsEvalSupportedCached;

var hexNumbers = _toConsumableArray(Array(256).keys()).map(function (n) {
  return n.toString(16).padStart(2, "0");
});

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "makeHexColor",
    value: function makeHexColor(r, g, b) {
      return "#".concat(hexNumbers[r]).concat(hexNumbers[g]).concat(hexNumbers[b]);
    }
  }, {
    key: "transform",
    value: function transform(m1, m2) {
      return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
    }
  }, {
    key: "applyTransform",
    value: function applyTransform(p, m) {
      var xt = p[0] * m[0] + p[1] * m[2] + m[4];
      var yt = p[0] * m[1] + p[1] * m[3] + m[5];
      return [xt, yt];
    }
  }, {
    key: "applyInverseTransform",
    value: function applyInverseTransform(p, m) {
      var d = m[0] * m[3] - m[1] * m[2];
      var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
      var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
      return [xt, yt];
    }
  }, {
    key: "getAxialAlignedBoundingBox",
    value: function getAxialAlignedBoundingBox(r, m) {
      var p1 = Util.applyTransform(r, m);
      var p2 = Util.applyTransform(r.slice(2, 4), m);
      var p3 = Util.applyTransform([r[0], r[3]], m);
      var p4 = Util.applyTransform([r[2], r[1]], m);
      return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
    }
  }, {
    key: "inverseTransform",
    value: function inverseTransform(m) {
      var d = m[0] * m[3] - m[1] * m[2];
      return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
    }
  }, {
    key: "apply3dTransform",
    value: function apply3dTransform(m, v) {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
    }
  }, {
    key: "singularValueDecompose2dScale",
    value: function singularValueDecompose2dScale(m) {
      var transpose = [m[0], m[2], m[1], m[3]];
      var a = m[0] * transpose[0] + m[1] * transpose[2];
      var b = m[0] * transpose[1] + m[1] * transpose[3];
      var c = m[2] * transpose[0] + m[3] * transpose[2];
      var d = m[2] * transpose[1] + m[3] * transpose[3];
      var first = (a + d) / 2;
      var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
      var sx = first + second || 1;
      var sy = first - second || 1;
      return [Math.sqrt(sx), Math.sqrt(sy)];
    }
  }, {
    key: "normalizeRect",
    value: function normalizeRect(rect) {
      var r = rect.slice(0);

      if (rect[0] > rect[2]) {
        r[0] = rect[2];
        r[2] = rect[0];
      }

      if (rect[1] > rect[3]) {
        r[1] = rect[3];
        r[3] = rect[1];
      }

      return r;
    }
  }, {
    key: "intersect",
    value: function intersect(rect1, rect2) {
      function compare(a, b) {
        return a - b;
      }

      var orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare);
      var orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare);
      var result = [];
      rect1 = Util.normalizeRect(rect1);
      rect2 = Util.normalizeRect(rect2);

      if (orderedX[0] === rect1[0] && orderedX[1] === rect2[0] || orderedX[0] === rect2[0] && orderedX[1] === rect1[0]) {
        result[0] = orderedX[1];
        result[2] = orderedX[2];
      } else {
        return null;
      }

      if (orderedY[0] === rect1[1] && orderedY[1] === rect2[1] || orderedY[0] === rect2[1] && orderedY[1] === rect1[1]) {
        result[1] = orderedY[1];
        result[3] = orderedY[2];
      } else {
        return null;
      }

      return result;
    }
  }]);

  return Util;
}();

exports.Util = Util;
var PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2D8, 0x2C7, 0x2C6, 0x2D9, 0x2DD, 0x2DB, 0x2DA, 0x2DC, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203A, 0x2212, 0x2030, 0x201E, 0x201C, 0x201D, 0x2018, 0x2019, 0x201A, 0x2122, 0xFB01, 0xFB02, 0x141, 0x152, 0x160, 0x178, 0x17D, 0x131, 0x142, 0x153, 0x161, 0x17E, 0, 0x20AC];

function stringToPDFString(str) {
  var length = str.length,
      strBuf = [];

  if (str[0] === "\xFE" && str[1] === "\xFF") {
    for (var i = 2; i < length; i += 2) {
      strBuf.push(String.fromCharCode(str.charCodeAt(i) << 8 | str.charCodeAt(i + 1)));
    }
  } else if (str[0] === "\xFF" && str[1] === "\xFE") {
    for (var _i2 = 2; _i2 < length; _i2 += 2) {
      strBuf.push(String.fromCharCode(str.charCodeAt(_i2 + 1) << 8 | str.charCodeAt(_i2)));
    }
  } else {
    for (var _i3 = 0; _i3 < length; ++_i3) {
      var code = PDFStringTranslateTable[str.charCodeAt(_i3)];
      strBuf.push(code ? String.fromCharCode(code) : str.charAt(_i3));
    }
  }

  return strBuf.join("");
}

function escapeString(str) {
  return str.replace(/([()\\\n\r])/g, function (match) {
    if (match === "\n") {
      return "\\n";
    } else if (match === "\r") {
      return "\\r";
    }

    return "\\".concat(match);
  });
}

function isAscii(str) {
  return /^[\x00-\x7F]*$/.test(str);
}

function stringToUTF16BEString(str) {
  var buf = ["\xFE\xFF"];

  for (var i = 0, ii = str.length; i < ii; i++) {
    var _char = str.charCodeAt(i);

    buf.push(String.fromCharCode(_char >> 8 & 0xff));
    buf.push(String.fromCharCode(_char & 0xff));
  }

  return buf.join("");
}

function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}

function utf8StringToString(str) {
  return unescape(encodeURIComponent(str));
}

function isBool(v) {
  return typeof v === "boolean";
}

function isNum(v) {
  return typeof v === "number";
}

function isString(v) {
  return typeof v === "string";
}

function isArrayBuffer(v) {
  return _typeof(v) === "object" && v !== null && v.byteLength !== undefined;
}

function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every(function (element, index) {
    return element === arr2[index];
  });
}

function getModificationDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var buffer = [date.getUTCFullYear().toString(), (date.getUTCMonth() + 1).toString().padStart(2, "0"), date.getUTCDate().toString().padStart(2, "0"), date.getUTCHours().toString().padStart(2, "0"), date.getUTCMinutes().toString().padStart(2, "0"), date.getUTCSeconds().toString().padStart(2, "0")];
  return buffer.join("");
}

function createPromiseCapability() {
  var capability = Object.create(null);
  var isSettled = false;
  Object.defineProperty(capability, "settled", {
    get: function get() {
      return isSettled;
    }
  });
  capability.promise = new Promise(function (resolve, reject) {
    capability.resolve = function (data) {
      isSettled = true;
      resolve(data);
    };

    capability.reject = function (reason) {
      isSettled = true;
      reject(reason);
    };
  });
  return capability;
}

var createObjectURL = function createObjectURLClosure() {
  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return function createObjectURL(data, contentType) {
    var forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!forceDataSchema && URL.createObjectURL) {
      var blob = new Blob([data], {
        type: contentType
      });
      return URL.createObjectURL(blob);
    }

    var buffer = "data:".concat(contentType, ";base64,");

    for (var i = 0, ii = data.length; i < ii; i += 3) {
      var b1 = data[i] & 0xff;
      var b2 = data[i + 1] & 0xff;
      var b3 = data[i + 2] & 0xff;
      var d1 = b1 >> 2,
          d2 = (b1 & 3) << 4 | b2 >> 4;
      var d3 = i + 1 < ii ? (b2 & 0xf) << 2 | b3 >> 6 : 64;
      var d4 = i + 2 < ii ? b3 & 0x3f : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }

    return buffer;
  };
}();

exports.createObjectURL = createObjectURL;
var XMLEntities = {
  0x3c: "&lt;",
  0x3e: "&gt;",
  0x26: "&amp;",
  0x22: "&quot;",
  0x27: "&apos;"
};

function encodeToXmlString(str) {
  var buffer = [];
  var start = 0;

  for (var i = 0, ii = str.length; i < ii; i++) {
    var _char2 = str.codePointAt(i);

    if (0x20 <= _char2 && _char2 <= 0x7e) {
      var entity = XMLEntities[_char2];

      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }

        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push("&#x".concat(_char2.toString(16).toUpperCase(), ";"));

      if (_char2 > 0xd7ff && (_char2 < 0xe000 || _char2 > 0xfffd)) {
        i++;
      }

      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isNodeJS = false;

if (typeof globalThis === "undefined" || !globalThis._pdfjsCompatibilityChecked) {
  if (typeof globalThis === "undefined" || globalThis.Math !== Math) {
    globalThis = __webpack_require__(37);
  }

  globalThis._pdfjsCompatibilityChecked = true;

  (function checkNodeBtoa() {
    if (globalThis.btoa || !isNodeJS) {
      return;
    }

    globalThis.btoa = function (chars) {
      return Buffer.from(chars, "binary").toString("base64");
    };
  })();

  (function checkNodeAtob() {
    if (globalThis.atob || !isNodeJS) {
      return;
    }

    globalThis.atob = function (input) {
      return Buffer.from(input, "base64").toString("binary");
    };
  })();

  (function checkObjectFromEntries() {
    if (Object.fromEntries) {
      return;
    }

    __webpack_require__(82);
  })();

  (function checkPromise() {
    if (globalThis.Promise.allSettled) {
      return;
    }

    globalThis.Promise = __webpack_require__(112);
  })();

  (function checkURL() {
    globalThis.URL = __webpack_require__(141);
  })();

  (function checkReadableStream() {
    var isReadableStreamSupported = false;

    if (typeof ReadableStream !== "undefined") {
      try {
        new ReadableStream({
          start: function start(controller) {
            controller.close();
          }
        });
        isReadableStreamSupported = true;
      } catch (e) {}
    }

    if (isReadableStreamSupported) {
      return;
    }

    globalThis.ReadableStream = __webpack_require__(151).ReadableStream;
  })();

  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }

    __webpack_require__(152);
  })();

  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }

    __webpack_require__(158);
  })();

  (function checkObjectValues() {
    if (Object.values) {
      return;
    }

    Object.values = __webpack_require__(160);
  })();

  (function checkObjectEntries() {
    if (Object.entries) {
      return;
    }

    Object.entries = __webpack_require__(163);
  })();
}

/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(38);
module.exports = __webpack_require__(40);

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(39);
var global = __webpack_require__(40);
$({ global: true }, { globalThis: global });

/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var getOwnPropertyDescriptor = __webpack_require__(41).f;
var createNonEnumerableProperty = __webpack_require__(55);
var redefine = __webpack_require__(58);
var setGlobal = __webpack_require__(59);
var copyConstructorProperties = __webpack_require__(69);
var isForced = __webpack_require__(81);
module.exports = function (options, source) {
 var TARGET = options.target;
 var GLOBAL = options.global;
 var STATIC = options.stat;
 var FORCED, target, key, targetProperty, sourceProperty, descriptor;
 if (GLOBAL) {
  target = global;
 } else if (STATIC) {
  target = global[TARGET] || setGlobal(TARGET, {});
 } else {
  target = (global[TARGET] || {}).prototype;
 }
 if (target)
  for (key in source) {
   sourceProperty = source[key];
   if (options.noTargetGet) {
    descriptor = getOwnPropertyDescriptor(target, key);
    targetProperty = descriptor && descriptor.value;
   } else
    targetProperty = target[key];
   FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
   if (!FORCED && targetProperty !== undefined) {
    if (typeof sourceProperty === typeof targetProperty)
     continue;
    copyConstructorProperties(sourceProperty, targetProperty);
   }
   if (options.sham || targetProperty && targetProperty.sham) {
    createNonEnumerableProperty(sourceProperty, 'sham', true);
   }
   redefine(target, key, sourceProperty, options);
  }
};

/***/ }),
/* 40 */
/***/ ((module) => {

var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || function () {
 return this;
}() || Function('return this')();

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var propertyIsEnumerableModule = __webpack_require__(44);
var createPropertyDescriptor = __webpack_require__(45);
var toIndexedObject = __webpack_require__(46);
var toPrimitive = __webpack_require__(50);
var has = __webpack_require__(52);
var IE8_DOM_DEFINE = __webpack_require__(53);
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
 O = toIndexedObject(O);
 P = toPrimitive(P, true);
 if (IE8_DOM_DEFINE)
  try {
   return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
  }
 if (has(O, P))
  return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
module.exports = !fails(function () {
 return Object.defineProperty({}, 1, {
  get: function () {
   return 7;
  }
 })[1] != 7;
});

/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
 var descriptor = getOwnPropertyDescriptor(this, V);
 return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = function (bitmap, value) {
 return {
  enumerable: !(bitmap & 1),
  configurable: !(bitmap & 2),
  writable: !(bitmap & 4),
  value: value
 };
};

/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IndexedObject = __webpack_require__(47);
var requireObjectCoercible = __webpack_require__(49);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
var classof = __webpack_require__(48);
var split = ''.split;
module.exports = fails(function () {
 return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 48 */
/***/ ((module) => {

var toString = {}.toString;
module.exports = function (it) {
 return toString.call(it).slice(8, -1);
};

/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = function (it) {
 if (it == undefined)
  throw TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(51);
module.exports = function (input, PREFERRED_STRING) {
 if (!isObject(input))
  return input;
 var fn, val;
 if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = function (it) {
 return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 52 */
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
 return hasOwnProperty.call(it, key);
};

/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var fails = __webpack_require__(43);
var createElement = __webpack_require__(54);
module.exports = !DESCRIPTORS && !fails(function () {
 return Object.defineProperty(createElement('div'), 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var isObject = __webpack_require__(51);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 55 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var definePropertyModule = __webpack_require__(56);
var createPropertyDescriptor = __webpack_require__(45);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var IE8_DOM_DEFINE = __webpack_require__(53);
var anObject = __webpack_require__(57);
var toPrimitive = __webpack_require__(50);
var nativeDefineProperty = Object.defineProperty;
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
 anObject(O);
 P = toPrimitive(P, true);
 anObject(Attributes);
 if (IE8_DOM_DEFINE)
  try {
   return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
  }
 if ('get' in Attributes || 'set' in Attributes)
  throw TypeError('Accessors not supported');
 if ('value' in Attributes)
  O[P] = Attributes.value;
 return O;
};

/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(51);
module.exports = function (it) {
 if (!isObject(it)) {
  throw TypeError(String(it) + ' is not an object');
 }
 return it;
};

/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var createNonEnumerableProperty = __webpack_require__(55);
var has = __webpack_require__(52);
var setGlobal = __webpack_require__(59);
var inspectSource = __webpack_require__(60);
var InternalStateModule = __webpack_require__(62);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
 var unsafe = options ? !!options.unsafe : false;
 var simple = options ? !!options.enumerable : false;
 var noTargetGet = options ? !!options.noTargetGet : false;
 var state;
 if (typeof value == 'function') {
  if (typeof key == 'string' && !has(value, 'name')) {
   createNonEnumerableProperty(value, 'name', key);
  }
  state = enforceInternalState(value);
  if (!state.source) {
   state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
 }
 if (O === global) {
  if (simple)
   O[key] = value;
  else
   setGlobal(key, value);
  return;
 } else if (!unsafe) {
  delete O[key];
 } else if (!noTargetGet && O[key]) {
  simple = true;
 }
 if (simple)
  O[key] = value;
 else
  createNonEnumerableProperty(O, key, value);
})(Function.prototype, 'toString', function toString() {
 return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var createNonEnumerableProperty = __webpack_require__(55);
module.exports = function (key, value) {
 try {
  createNonEnumerableProperty(global, key, value);
 } catch (error) {
  global[key] = value;
 }
 return value;
};

/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(61);
var functionToString = Function.toString;
if (typeof store.inspectSource != 'function') {
 store.inspectSource = function (it) {
  return functionToString.call(it);
 };
}
module.exports = store.inspectSource;

/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var setGlobal = __webpack_require__(59);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(63);
var global = __webpack_require__(40);
var isObject = __webpack_require__(51);
var createNonEnumerableProperty = __webpack_require__(55);
var objectHas = __webpack_require__(52);
var shared = __webpack_require__(61);
var sharedKey = __webpack_require__(64);
var hiddenKeys = __webpack_require__(68);
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function (it) {
 return has(it) ? get(it) : set(it, {});
};
var getterFor = function (TYPE) {
 return function (it) {
  var state;
  if (!isObject(it) || (state = get(it)).type !== TYPE) {
   throw TypeError('Incompatible receiver, ' + TYPE + ' required');
  }
  return state;
 };
};
if (NATIVE_WEAK_MAP) {
 var store = shared.state || (shared.state = new WeakMap());
 var wmget = store.get;
 var wmhas = store.has;
 var wmset = store.set;
 set = function (it, metadata) {
  metadata.facade = it;
  wmset.call(store, it, metadata);
  return metadata;
 };
 get = function (it) {
  return wmget.call(store, it) || {};
 };
 has = function (it) {
  return wmhas.call(store, it);
 };
} else {
 var STATE = sharedKey('state');
 hiddenKeys[STATE] = true;
 set = function (it, metadata) {
  metadata.facade = it;
  createNonEnumerableProperty(it, STATE, metadata);
  return metadata;
 };
 get = function (it) {
  return objectHas(it, STATE) ? it[STATE] : {};
 };
 has = function (it) {
  return objectHas(it, STATE);
 };
}
module.exports = {
 set: set,
 get: get,
 has: has,
 enforce: enforce,
 getterFor: getterFor
};

/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var inspectSource = __webpack_require__(60);
var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(65);
var uid = __webpack_require__(67);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(66);
var store = __webpack_require__(61);
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.8.3',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 66 */
/***/ ((module) => {

module.exports = false;

/***/ }),
/* 67 */
/***/ ((module) => {

var id = 0;
var postfix = Math.random();
module.exports = function (key) {
 return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 69 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(52);
var ownKeys = __webpack_require__(70);
var getOwnPropertyDescriptorModule = __webpack_require__(41);
var definePropertyModule = __webpack_require__(56);
module.exports = function (target, source) {
 var keys = ownKeys(source);
 var defineProperty = definePropertyModule.f;
 var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
 for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  if (!has(target, key))
   defineProperty(target, key, getOwnPropertyDescriptor(source, key));
 }
};

/***/ }),
/* 70 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(71);
var getOwnPropertyNamesModule = __webpack_require__(73);
var getOwnPropertySymbolsModule = __webpack_require__(80);
var anObject = __webpack_require__(57);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 71 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(72);
var global = __webpack_require__(40);
var aFunction = function (variable) {
 return typeof variable == 'function' ? variable : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 72 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
module.exports = global;

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(74);
var enumBugKeys = __webpack_require__(79);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 74 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(52);
var toIndexedObject = __webpack_require__(46);
var indexOf = __webpack_require__(75).indexOf;
var hiddenKeys = __webpack_require__(68);
module.exports = function (object, names) {
 var O = toIndexedObject(object);
 var i = 0;
 var result = [];
 var key;
 for (key in O)
  !has(hiddenKeys, key) && has(O, key) && result.push(key);
 while (names.length > i)
  if (has(O, key = names[i++])) {
   ~indexOf(result, key) || result.push(key);
  }
 return result;
};

/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(46);
var toLength = __webpack_require__(76);
var toAbsoluteIndex = __webpack_require__(78);
var createMethod = function (IS_INCLUDES) {
 return function ($this, el, fromIndex) {
  var O = toIndexedObject($this);
  var length = toLength(O.length);
  var index = toAbsoluteIndex(fromIndex, length);
  var value;
  if (IS_INCLUDES && el != el)
   while (length > index) {
    value = O[index++];
    if (value != value)
     return true;
   }
  else
   for (; length > index; index++) {
    if ((IS_INCLUDES || index in O) && O[index] === el)
     return IS_INCLUDES || index || 0;
   }
  return !IS_INCLUDES && -1;
 };
};
module.exports = {
 includes: createMethod(true),
 indexOf: createMethod(false)
};

/***/ }),
/* 76 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(77);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 77 */
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (argument) {
 return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 78 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(77);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toInteger(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 79 */
/***/ ((module) => {

module.exports = [
 'constructor',
 'hasOwnProperty',
 'isPrototypeOf',
 'propertyIsEnumerable',
 'toLocaleString',
 'toString',
 'valueOf'
];

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 81 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
var replacement = /#|\.prototype\./;
var isForced = function (feature, detection) {
 var value = data[normalize(feature)];
 return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function (string) {
 return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(83);
__webpack_require__(102);
var path = __webpack_require__(72);
module.exports = path.Object.fromEntries;

/***/ }),
/* 83 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(46);
var addToUnscopables = __webpack_require__(84);
var Iterators = __webpack_require__(92);
var InternalStateModule = __webpack_require__(62);
var defineIterator = __webpack_require__(93);
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
 setInternalState(this, {
  type: ARRAY_ITERATOR,
  target: toIndexedObject(iterated),
  index: 0,
  kind: kind
 });
}, function () {
 var state = getInternalState(this);
 var target = state.target;
 var kind = state.kind;
 var index = state.index++;
 if (!target || index >= target.length) {
  state.target = undefined;
  return {
   value: undefined,
   done: true
  };
 }
 if (kind == 'keys')
  return {
   value: index,
   done: false
  };
 if (kind == 'values')
  return {
   value: target[index],
   done: false
  };
 return {
  value: [
   index,
   target[index]
  ],
  done: false
 };
}, 'values');
Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 84 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(85);
var create = __webpack_require__(88);
var definePropertyModule = __webpack_require__(56);
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == undefined) {
 definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
  configurable: true,
  value: create(null)
 });
}
module.exports = function (key) {
 ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),
/* 85 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var shared = __webpack_require__(65);
var has = __webpack_require__(52);
var uid = __webpack_require__(67);
var NATIVE_SYMBOL = __webpack_require__(86);
var USE_SYMBOL_AS_UID = __webpack_require__(87);
var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function (name) {
 if (!has(WellKnownSymbolsStore, name)) {
  if (NATIVE_SYMBOL && has(Symbol, name))
   WellKnownSymbolsStore[name] = Symbol[name];
  else
   WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
 }
 return WellKnownSymbolsStore[name];
};

/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 return !String(Symbol());
});

/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_SYMBOL = __webpack_require__(86);
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var defineProperties = __webpack_require__(89);
var enumBugKeys = __webpack_require__(79);
var hiddenKeys = __webpack_require__(68);
var html = __webpack_require__(91);
var documentCreateElement = __webpack_require__(54);
var sharedKey = __webpack_require__(64);
var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');
var EmptyConstructor = function () {
};
var scriptTag = function (content) {
 return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function (activeXDocument) {
 activeXDocument.write(scriptTag(''));
 activeXDocument.close();
 var temp = activeXDocument.parentWindow.Object;
 activeXDocument = null;
 return temp;
};
var NullProtoObjectViaIFrame = function () {
 var iframe = documentCreateElement('iframe');
 var JS = 'java' + SCRIPT + ':';
 var iframeDocument;
 iframe.style.display = 'none';
 html.appendChild(iframe);
 iframe.src = String(JS);
 iframeDocument = iframe.contentWindow.document;
 iframeDocument.open();
 iframeDocument.write(scriptTag('document.F=Object'));
 iframeDocument.close();
 return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function () {
 try {
  activeXDocument = document.domain && new ActiveXObject('htmlfile');
 } catch (error) {
 }
 NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
 var length = enumBugKeys.length;
 while (length--)
  delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
 return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
module.exports = Object.create || function create(O, Properties) {
 var result;
 if (O !== null) {
  EmptyConstructor[PROTOTYPE] = anObject(O);
  result = new EmptyConstructor();
  EmptyConstructor[PROTOTYPE] = null;
  result[IE_PROTO] = O;
 } else
  result = NullProtoObject();
 return Properties === undefined ? result : defineProperties(result, Properties);
};

/***/ }),
/* 89 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var definePropertyModule = __webpack_require__(56);
var anObject = __webpack_require__(57);
var objectKeys = __webpack_require__(90);
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
 anObject(O);
 var keys = objectKeys(Properties);
 var length = keys.length;
 var index = 0;
 var key;
 while (length > index)
  definePropertyModule.f(O, key = keys[index++], Properties[key]);
 return O;
};

/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(74);
var enumBugKeys = __webpack_require__(79);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(71);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 92 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 93 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var createIteratorConstructor = __webpack_require__(94);
var getPrototypeOf = __webpack_require__(96);
var setPrototypeOf = __webpack_require__(100);
var setToStringTag = __webpack_require__(99);
var createNonEnumerableProperty = __webpack_require__(55);
var redefine = __webpack_require__(58);
var wellKnownSymbol = __webpack_require__(85);
var IS_PURE = __webpack_require__(66);
var Iterators = __webpack_require__(92);
var IteratorsCore = __webpack_require__(95);
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';
var returnThis = function () {
 return this;
};
module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
 createIteratorConstructor(IteratorConstructor, NAME, next);
 var getIterationMethod = function (KIND) {
  if (KIND === DEFAULT && defaultIterator)
   return defaultIterator;
  if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
   return IterablePrototype[KIND];
  switch (KIND) {
  case KEYS:
   return function keys() {
    return new IteratorConstructor(this, KIND);
   };
  case VALUES:
   return function values() {
    return new IteratorConstructor(this, KIND);
   };
  case ENTRIES:
   return function entries() {
    return new IteratorConstructor(this, KIND);
   };
  }
  return function () {
   return new IteratorConstructor(this);
  };
 };
 var TO_STRING_TAG = NAME + ' Iterator';
 var INCORRECT_VALUES_NAME = false;
 var IterablePrototype = Iterable.prototype;
 var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
 var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
 var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
 var CurrentIteratorPrototype, methods, KEY;
 if (anyNativeIterator) {
  CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
  if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
   if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
    if (setPrototypeOf) {
     setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
    } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
     createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
    }
   }
   setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
   if (IS_PURE)
    Iterators[TO_STRING_TAG] = returnThis;
  }
 }
 if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
  INCORRECT_VALUES_NAME = true;
  defaultIterator = function values() {
   return nativeIterator.call(this);
  };
 }
 if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
  createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
 }
 Iterators[NAME] = defaultIterator;
 if (DEFAULT) {
  methods = {
   values: getIterationMethod(VALUES),
   keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
   entries: getIterationMethod(ENTRIES)
  };
  if (FORCED)
   for (KEY in methods) {
    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
     redefine(IterablePrototype, KEY, methods[KEY]);
    }
   }
  else
   $({
    target: NAME,
    proto: true,
    forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
   }, methods);
 }
 return methods;
};

/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = __webpack_require__(95).IteratorPrototype;
var create = __webpack_require__(88);
var createPropertyDescriptor = __webpack_require__(45);
var setToStringTag = __webpack_require__(99);
var Iterators = __webpack_require__(92);
var returnThis = function () {
 return this;
};
module.exports = function (IteratorConstructor, NAME, next) {
 var TO_STRING_TAG = NAME + ' Iterator';
 IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
 setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
 Iterators[TO_STRING_TAG] = returnThis;
 return IteratorConstructor;
};

/***/ }),
/* 95 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(43);
var getPrototypeOf = __webpack_require__(96);
var createNonEnumerableProperty = __webpack_require__(55);
var has = __webpack_require__(52);
var wellKnownSymbol = __webpack_require__(85);
var IS_PURE = __webpack_require__(66);
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
var returnThis = function () {
 return this;
};
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
if ([].keys) {
 arrayIterator = [].keys();
 if (!('next' in arrayIterator))
  BUGGY_SAFARI_ITERATORS = true;
 else {
  PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
  if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
   IteratorPrototype = PrototypeOfArrayIteratorPrototype;
 }
}
var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
 var test = {};
 return IteratorPrototype[ITERATOR].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE)
 IteratorPrototype = {};
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
 createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}
module.exports = {
 IteratorPrototype: IteratorPrototype,
 BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(52);
var toObject = __webpack_require__(97);
var sharedKey = __webpack_require__(64);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(98);
var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
 O = toObject(O);
 if (has(O, IE_PROTO))
  return O[IE_PROTO];
 if (typeof O.constructor == 'function' && O instanceof O.constructor) {
  return O.constructor.prototype;
 }
 return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),
/* 97 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(49);
module.exports = function (argument) {
 return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 98 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(56).f;
var has = __webpack_require__(52);
var wellKnownSymbol = __webpack_require__(85);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
module.exports = function (it, TAG, STATIC) {
 if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
  defineProperty(it, TO_STRING_TAG, {
   configurable: true,
   value: TAG
  });
 }
};

/***/ }),
/* 100 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var aPossiblePrototype = __webpack_require__(101);
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
 var CORRECT_SETTER = false;
 var test = {};
 var setter;
 try {
  setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
  setter.call(test, []);
  CORRECT_SETTER = test instanceof Array;
 } catch (error) {
 }
 return function setPrototypeOf(O, proto) {
  anObject(O);
  aPossiblePrototype(proto);
  if (CORRECT_SETTER)
   setter.call(O, proto);
  else
   O.__proto__ = proto;
  return O;
 };
}() : undefined);

/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(51);
module.exports = function (it) {
 if (!isObject(it) && it !== null) {
  throw TypeError("Can't set " + String(it) + ' as a prototype');
 }
 return it;
};

/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(39);
var iterate = __webpack_require__(103);
var createProperty = __webpack_require__(111);
$({
 target: 'Object',
 stat: true
}, {
 fromEntries: function fromEntries(iterable) {
  var obj = {};
  iterate(iterable, function (k, v) {
   createProperty(obj, k, v);
  }, { AS_ENTRIES: true });
  return obj;
 }
});

/***/ }),
/* 103 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var isArrayIteratorMethod = __webpack_require__(104);
var toLength = __webpack_require__(76);
var bind = __webpack_require__(105);
var getIteratorMethod = __webpack_require__(107);
var iteratorClose = __webpack_require__(110);
var Result = function (stopped, result) {
 this.stopped = stopped;
 this.result = result;
};
module.exports = function (iterable, unboundFunction, options) {
 var that = options && options.that;
 var AS_ENTRIES = !!(options && options.AS_ENTRIES);
 var IS_ITERATOR = !!(options && options.IS_ITERATOR);
 var INTERRUPTED = !!(options && options.INTERRUPTED);
 var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
 var iterator, iterFn, index, length, result, next, step;
 var stop = function (condition) {
  if (iterator)
   iteratorClose(iterator);
  return new Result(true, condition);
 };
 var callFn = function (value) {
  if (AS_ENTRIES) {
   anObject(value);
   return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
  }
  return INTERRUPTED ? fn(value, stop) : fn(value);
 };
 if (IS_ITERATOR) {
  iterator = iterable;
 } else {
  iterFn = getIteratorMethod(iterable);
  if (typeof iterFn != 'function')
   throw TypeError('Target is not iterable');
  if (isArrayIteratorMethod(iterFn)) {
   for (index = 0, length = toLength(iterable.length); length > index; index++) {
    result = callFn(iterable[index]);
    if (result && result instanceof Result)
     return result;
   }
   return new Result(false);
  }
  iterator = iterFn.call(iterable);
 }
 next = iterator.next;
 while (!(step = next.call(iterator)).done) {
  try {
   result = callFn(step.value);
  } catch (error) {
   iteratorClose(iterator);
   throw error;
  }
  if (typeof result == 'object' && result && result instanceof Result)
   return result;
 }
 return new Result(false);
};

/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(85);
var Iterators = __webpack_require__(92);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(106);
module.exports = function (fn, that, length) {
 aFunction(fn);
 if (that === undefined)
  return fn;
 switch (length) {
 case 0:
  return function () {
   return fn.call(that);
  };
 case 1:
  return function (a) {
   return fn.call(that, a);
  };
 case 2:
  return function (a, b) {
   return fn.call(that, a, b);
  };
 case 3:
  return function (a, b, c) {
   return fn.call(that, a, b, c);
  };
 }
 return function () {
  return fn.apply(that, arguments);
 };
};

/***/ }),
/* 106 */
/***/ ((module) => {

module.exports = function (it) {
 if (typeof it != 'function') {
  throw TypeError(String(it) + ' is not a function');
 }
 return it;
};

/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(108);
var Iterators = __webpack_require__(92);
var wellKnownSymbol = __webpack_require__(85);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (it != undefined)
  return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 108 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(109);
var classofRaw = __webpack_require__(48);
var wellKnownSymbol = __webpack_require__(85);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var CORRECT_ARGUMENTS = classofRaw(function () {
 return arguments;
}()) == 'Arguments';
var tryGet = function (it, key) {
 try {
  return it[key];
 } catch (error) {
 }
};
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
 var O, tag, result;
 return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),
/* 109 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(85);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
module.exports = function (iterator) {
 var returnMethod = iterator['return'];
 if (returnMethod !== undefined) {
  return anObject(returnMethod.call(iterator)).value;
 }
};

/***/ }),
/* 111 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(50);
var definePropertyModule = __webpack_require__(56);
var createPropertyDescriptor = __webpack_require__(45);
module.exports = function (object, key, value) {
 var propertyKey = toPrimitive(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 112 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(116);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(139);
var path = __webpack_require__(72);
module.exports = path.Promise;

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var getPrototypeOf = __webpack_require__(96);
var setPrototypeOf = __webpack_require__(100);
var create = __webpack_require__(88);
var createNonEnumerableProperty = __webpack_require__(55);
var createPropertyDescriptor = __webpack_require__(45);
var iterate = __webpack_require__(103);
var $AggregateError = function AggregateError(errors, message) {
 var that = this;
 if (!(that instanceof $AggregateError))
  return new $AggregateError(errors, message);
 if (setPrototypeOf) {
  that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
 }
 if (message !== undefined)
  createNonEnumerableProperty(that, 'message', String(message));
 var errorsArray = [];
 iterate(errors, errorsArray.push, { that: errorsArray });
 createNonEnumerableProperty(that, 'errors', errorsArray);
 return that;
};
$AggregateError.prototype = create(Error.prototype, {
 constructor: createPropertyDescriptor(5, $AggregateError),
 message: createPropertyDescriptor(5, ''),
 name: createPropertyDescriptor(5, 'AggregateError')
});
$({ global: true }, { AggregateError: $AggregateError });

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(109);
var redefine = __webpack_require__(58);
var toString = __webpack_require__(115);
if (!TO_STRING_TAG_SUPPORT) {
 redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 115 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(109);
var classof = __webpack_require__(108);
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
 return '[object ' + classof(this) + ']';
};

/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var IS_PURE = __webpack_require__(66);
var global = __webpack_require__(40);
var getBuiltIn = __webpack_require__(71);
var NativePromise = __webpack_require__(117);
var redefine = __webpack_require__(58);
var redefineAll = __webpack_require__(118);
var setToStringTag = __webpack_require__(99);
var setSpecies = __webpack_require__(119);
var isObject = __webpack_require__(51);
var aFunction = __webpack_require__(106);
var anInstance = __webpack_require__(120);
var inspectSource = __webpack_require__(60);
var iterate = __webpack_require__(103);
var checkCorrectnessOfIteration = __webpack_require__(121);
var speciesConstructor = __webpack_require__(122);
var task = __webpack_require__(123).set;
var microtask = __webpack_require__(127);
var promiseResolve = __webpack_require__(129);
var hostReportErrors = __webpack_require__(131);
var newPromiseCapabilityModule = __webpack_require__(130);
var perform = __webpack_require__(132);
var InternalStateModule = __webpack_require__(62);
var isForced = __webpack_require__(81);
var wellKnownSymbol = __webpack_require__(85);
var IS_NODE = __webpack_require__(126);
var V8_VERSION = __webpack_require__(133);
var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
 var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
 if (!GLOBAL_CORE_JS_PROMISE) {
  if (V8_VERSION === 66)
   return true;
  if (!IS_NODE && !NATIVE_REJECTION_EVENT)
   return true;
 }
 if (IS_PURE && !PromiseConstructor.prototype['finally'])
  return true;
 if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor))
  return false;
 var promise = PromiseConstructor.resolve(1);
 var FakePromise = function (exec) {
  exec(function () {
  }, function () {
  });
 };
 var constructor = promise.constructor = {};
 constructor[SPECIES] = FakePromise;
 return !(promise.then(function () {
 }) instanceof FakePromise);
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
 PromiseConstructor.all(iterable)['catch'](function () {
 });
});
var isThenable = function (it) {
 var then;
 return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (state, isReject) {
 if (state.notified)
  return;
 state.notified = true;
 var chain = state.reactions;
 microtask(function () {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var index = 0;
  while (chain.length > index) {
   var reaction = chain[index++];
   var handler = ok ? reaction.ok : reaction.fail;
   var resolve = reaction.resolve;
   var reject = reaction.reject;
   var domain = reaction.domain;
   var result, then, exited;
   try {
    if (handler) {
     if (!ok) {
      if (state.rejection === UNHANDLED)
       onHandleUnhandled(state);
      state.rejection = HANDLED;
     }
     if (handler === true)
      result = value;
     else {
      if (domain)
       domain.enter();
      result = handler(value);
      if (domain) {
       domain.exit();
       exited = true;
      }
     }
     if (result === reaction.promise) {
      reject(TypeError('Promise-chain cycle'));
     } else if (then = isThenable(result)) {
      then.call(result, resolve, reject);
     } else
      resolve(result);
    } else
     reject(value);
   } catch (error) {
    if (domain && !exited)
     domain.exit();
    reject(error);
   }
  }
  state.reactions = [];
  state.notified = false;
  if (isReject && !state.rejection)
   onUnhandled(state);
 });
};
var dispatchEvent = function (name, promise, reason) {
 var event, handler;
 if (DISPATCH_EVENT) {
  event = document.createEvent('Event');
  event.promise = promise;
  event.reason = reason;
  event.initEvent(name, false, true);
  global.dispatchEvent(event);
 } else
  event = {
   promise: promise,
   reason: reason
  };
 if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name]))
  handler(event);
 else if (name === UNHANDLED_REJECTION)
  hostReportErrors('Unhandled promise rejection', reason);
};
var onUnhandled = function (state) {
 task.call(global, function () {
  var promise = state.facade;
  var value = state.value;
  var IS_UNHANDLED = isUnhandled(state);
  var result;
  if (IS_UNHANDLED) {
   result = perform(function () {
    if (IS_NODE) {
     process.emit('unhandledRejection', value, promise);
    } else
     dispatchEvent(UNHANDLED_REJECTION, promise, value);
   });
   state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
   if (result.error)
    throw result.value;
  }
 });
};
var isUnhandled = function (state) {
 return state.rejection !== HANDLED && !state.parent;
};
var onHandleUnhandled = function (state) {
 task.call(global, function () {
  var promise = state.facade;
  if (IS_NODE) {
   process.emit('rejectionHandled', promise);
  } else
   dispatchEvent(REJECTION_HANDLED, promise, state.value);
 });
};
var bind = function (fn, state, unwrap) {
 return function (value) {
  fn(state, value, unwrap);
 };
};
var internalReject = function (state, value, unwrap) {
 if (state.done)
  return;
 state.done = true;
 if (unwrap)
  state = unwrap;
 state.value = value;
 state.state = REJECTED;
 notify(state, true);
};
var internalResolve = function (state, value, unwrap) {
 if (state.done)
  return;
 state.done = true;
 if (unwrap)
  state = unwrap;
 try {
  if (state.facade === value)
   throw TypeError("Promise can't be resolved itself");
  var then = isThenable(value);
  if (then) {
   microtask(function () {
    var wrapper = { done: false };
    try {
     then.call(value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
    } catch (error) {
     internalReject(wrapper, error, state);
    }
   });
  } else {
   state.value = value;
   state.state = FULFILLED;
   notify(state, false);
  }
 } catch (error) {
  internalReject({ done: false }, error, state);
 }
};
if (FORCED) {
 PromiseConstructor = function Promise(executor) {
  anInstance(this, PromiseConstructor, PROMISE);
  aFunction(executor);
  Internal.call(this);
  var state = getInternalState(this);
  try {
   executor(bind(internalResolve, state), bind(internalReject, state));
  } catch (error) {
   internalReject(state, error);
  }
 };
 Internal = function Promise(executor) {
  setInternalState(this, {
   type: PROMISE,
   done: false,
   notified: false,
   parent: false,
   reactions: [],
   rejection: false,
   state: PENDING,
   value: undefined
  });
 };
 Internal.prototype = redefineAll(PromiseConstructor.prototype, {
  then: function then(onFulfilled, onRejected) {
   var state = getInternalPromiseState(this);
   var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
   reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
   reaction.fail = typeof onRejected == 'function' && onRejected;
   reaction.domain = IS_NODE ? process.domain : undefined;
   state.parent = true;
   state.reactions.push(reaction);
   if (state.state != PENDING)
    notify(state, false);
   return reaction.promise;
  },
  'catch': function (onRejected) {
   return this.then(undefined, onRejected);
  }
 });
 OwnPromiseCapability = function () {
  var promise = new Internal();
  var state = getInternalState(promise);
  this.promise = promise;
  this.resolve = bind(internalResolve, state);
  this.reject = bind(internalReject, state);
 };
 newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
  return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
 };
 if (!IS_PURE && typeof NativePromise == 'function') {
  nativeThen = NativePromise.prototype.then;
  redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
   var that = this;
   return new PromiseConstructor(function (resolve, reject) {
    nativeThen.call(that, resolve, reject);
   }).then(onFulfilled, onRejected);
  }, { unsafe: true });
  if (typeof $fetch == 'function')
   $({
    global: true,
    enumerable: true,
    forced: true
   }, {
    fetch: function fetch(input) {
     return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
    }
   });
 }
}
$({
 global: true,
 wrap: true,
 forced: FORCED
}, { Promise: PromiseConstructor });
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE);
$({
 target: PROMISE,
 stat: true,
 forced: FORCED
}, {
 reject: function reject(r) {
  var capability = newPromiseCapability(this);
  capability.reject.call(undefined, r);
  return capability.promise;
 }
});
$({
 target: PROMISE,
 stat: true,
 forced: IS_PURE || FORCED
}, {
 resolve: function resolve(x) {
  return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
 }
});
$({
 target: PROMISE,
 stat: true,
 forced: INCORRECT_ITERATION
}, {
 all: function all(iterable) {
  var C = this;
  var capability = newPromiseCapability(C);
  var resolve = capability.resolve;
  var reject = capability.reject;
  var result = perform(function () {
   var $promiseResolve = aFunction(C.resolve);
   var values = [];
   var counter = 0;
   var remaining = 1;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyCalled = false;
    values.push(undefined);
    remaining++;
    $promiseResolve.call(C, promise).then(function (value) {
     if (alreadyCalled)
      return;
     alreadyCalled = true;
     values[index] = value;
     --remaining || resolve(values);
    }, reject);
   });
   --remaining || resolve(values);
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 },
 race: function race(iterable) {
  var C = this;
  var capability = newPromiseCapability(C);
  var reject = capability.reject;
  var result = perform(function () {
   var $promiseResolve = aFunction(C.resolve);
   iterate(iterable, function (promise) {
    $promiseResolve.call(C, promise).then(capability.resolve, reject);
   });
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 }
});

/***/ }),
/* 117 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
module.exports = global.Promise;

/***/ }),
/* 118 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(58);
module.exports = function (target, src, options) {
 for (var key in src)
  redefine(target, key, src[key], options);
 return target;
};

/***/ }),
/* 119 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(71);
var definePropertyModule = __webpack_require__(56);
var wellKnownSymbol = __webpack_require__(85);
var DESCRIPTORS = __webpack_require__(42);
var SPECIES = wellKnownSymbol('species');
module.exports = function (CONSTRUCTOR_NAME) {
 var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
 var defineProperty = definePropertyModule.f;
 if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
  defineProperty(Constructor, SPECIES, {
   configurable: true,
   get: function () {
    return this;
   }
  });
 }
};

/***/ }),
/* 120 */
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
 if (!(it instanceof Constructor)) {
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
 }
 return it;
};

/***/ }),
/* 121 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(85);
var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;
try {
 var called = 0;
 var iteratorWithReturn = {
  next: function () {
   return { done: !!called++ };
  },
  'return': function () {
   SAFE_CLOSING = true;
  }
 };
 iteratorWithReturn[ITERATOR] = function () {
  return this;
 };
 Array.from(iteratorWithReturn, function () {
  throw 2;
 });
} catch (error) {
}
module.exports = function (exec, SKIP_CLOSING) {
 if (!SKIP_CLOSING && !SAFE_CLOSING)
  return false;
 var ITERATION_SUPPORT = false;
 try {
  var object = {};
  object[ITERATOR] = function () {
   return {
    next: function () {
     return { done: ITERATION_SUPPORT = true };
    }
   };
  };
  exec(object);
 } catch (error) {
 }
 return ITERATION_SUPPORT;
};

/***/ }),
/* 122 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var aFunction = __webpack_require__(106);
var wellKnownSymbol = __webpack_require__(85);
var SPECIES = wellKnownSymbol('species');
module.exports = function (O, defaultConstructor) {
 var C = anObject(O).constructor;
 var S;
 return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),
/* 123 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var fails = __webpack_require__(43);
var bind = __webpack_require__(105);
var html = __webpack_require__(91);
var createElement = __webpack_require__(54);
var IS_IOS = __webpack_require__(124);
var IS_NODE = __webpack_require__(126);
var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function (id) {
 if (queue.hasOwnProperty(id)) {
  var fn = queue[id];
  delete queue[id];
  fn();
 }
};
var runner = function (id) {
 return function () {
  run(id);
 };
};
var listener = function (event) {
 run(event.data);
};
var post = function (id) {
 global.postMessage(id + '', location.protocol + '//' + location.host);
};
if (!set || !clear) {
 set = function setImmediate(fn) {
  var args = [];
  var i = 1;
  while (arguments.length > i)
   args.push(arguments[i++]);
  queue[++counter] = function () {
   (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
  };
  defer(counter);
  return counter;
 };
 clear = function clearImmediate(id) {
  delete queue[id];
 };
 if (IS_NODE) {
  defer = function (id) {
   process.nextTick(runner(id));
  };
 } else if (Dispatch && Dispatch.now) {
  defer = function (id) {
   Dispatch.now(runner(id));
  };
 } else if (MessageChannel && !IS_IOS) {
  channel = new MessageChannel();
  port = channel.port2;
  channel.port1.onmessage = listener;
  defer = bind(port.postMessage, port, 1);
 } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
  defer = post;
  global.addEventListener('message', listener, false);
 } else if (ONREADYSTATECHANGE in createElement('script')) {
  defer = function (id) {
   html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
    html.removeChild(this);
    run(id);
   };
  };
 } else {
  defer = function (id) {
   setTimeout(runner(id), 0);
  };
 }
}
module.exports = {
 set: set,
 clear: clear
};

/***/ }),
/* 124 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(125);
module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),
/* 125 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(71);
module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 126 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(48);
var global = __webpack_require__(40);
module.exports = classof(global.process) == 'process';

/***/ }),
/* 127 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var getOwnPropertyDescriptor = __webpack_require__(41).f;
var macrotask = __webpack_require__(123).set;
var IS_IOS = __webpack_require__(124);
var IS_WEBOS_WEBKIT = __webpack_require__(128);
var IS_NODE = __webpack_require__(126);
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then;
if (!queueMicrotask) {
 flush = function () {
  var parent, fn;
  if (IS_NODE && (parent = process.domain))
   parent.exit();
  while (head) {
   fn = head.fn;
   head = head.next;
   try {
    fn();
   } catch (error) {
    if (head)
     notify();
    else
     last = undefined;
    throw error;
   }
  }
  last = undefined;
  if (parent)
   parent.enter();
 };
 if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
  toggle = true;
  node = document.createTextNode('');
  new MutationObserver(flush).observe(node, { characterData: true });
  notify = function () {
   node.data = toggle = !toggle;
  };
 } else if (Promise && Promise.resolve) {
  promise = Promise.resolve(undefined);
  then = promise.then;
  notify = function () {
   then.call(promise, flush);
  };
 } else if (IS_NODE) {
  notify = function () {
   process.nextTick(flush);
  };
 } else {
  notify = function () {
   macrotask.call(global, flush);
  };
 }
}
module.exports = queueMicrotask || function (fn) {
 var task = {
  fn: fn,
  next: undefined
 };
 if (last)
  last.next = task;
 if (!head) {
  head = task;
  notify();
 }
 last = task;
};

/***/ }),
/* 128 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(125);
module.exports = /web0s(?!.*chrome)/i.test(userAgent);

/***/ }),
/* 129 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var isObject = __webpack_require__(51);
var newPromiseCapability = __webpack_require__(130);
module.exports = function (C, x) {
 anObject(C);
 if (isObject(x) && x.constructor === C)
  return x;
 var promiseCapability = newPromiseCapability.f(C);
 var resolve = promiseCapability.resolve;
 resolve(x);
 return promiseCapability.promise;
};

/***/ }),
/* 130 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(106);
var PromiseCapability = function (C) {
 var resolve, reject;
 this.promise = new C(function ($$resolve, $$reject) {
  if (resolve !== undefined || reject !== undefined)
   throw TypeError('Bad Promise constructor');
  resolve = $$resolve;
  reject = $$reject;
 });
 this.resolve = aFunction(resolve);
 this.reject = aFunction(reject);
};
module.exports.f = function (C) {
 return new PromiseCapability(C);
};

/***/ }),
/* 131 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
module.exports = function (a, b) {
 var console = global.console;
 if (console && console.error) {
  arguments.length === 1 ? console.error(a) : console.error(a, b);
 }
};

/***/ }),
/* 132 */
/***/ ((module) => {

module.exports = function (exec) {
 try {
  return {
   error: false,
   value: exec()
  };
 } catch (error) {
  return {
   error: true,
   value: error
  };
 }
};

/***/ }),
/* 133 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var userAgent = __webpack_require__(125);
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
 match = v8.split('.');
 version = match[0] + match[1];
} else if (userAgent) {
 match = userAgent.match(/Edge\/(\d+)/);
 if (!match || match[1] >= 74) {
  match = userAgent.match(/Chrome\/(\d+)/);
  if (match)
   version = match[1];
 }
}
module.exports = version && +version;

/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var aFunction = __webpack_require__(106);
var newPromiseCapabilityModule = __webpack_require__(130);
var perform = __webpack_require__(132);
var iterate = __webpack_require__(103);
$({
 target: 'Promise',
 stat: true
}, {
 allSettled: function allSettled(iterable) {
  var C = this;
  var capability = newPromiseCapabilityModule.f(C);
  var resolve = capability.resolve;
  var reject = capability.reject;
  var result = perform(function () {
   var promiseResolve = aFunction(C.resolve);
   var values = [];
   var counter = 0;
   var remaining = 1;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyCalled = false;
    values.push(undefined);
    remaining++;
    promiseResolve.call(C, promise).then(function (value) {
     if (alreadyCalled)
      return;
     alreadyCalled = true;
     values[index] = {
      status: 'fulfilled',
      value: value
     };
     --remaining || resolve(values);
    }, function (error) {
     if (alreadyCalled)
      return;
     alreadyCalled = true;
     values[index] = {
      status: 'rejected',
      reason: error
     };
     --remaining || resolve(values);
    });
   });
   --remaining || resolve(values);
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 }
});

/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var aFunction = __webpack_require__(106);
var getBuiltIn = __webpack_require__(71);
var newPromiseCapabilityModule = __webpack_require__(130);
var perform = __webpack_require__(132);
var iterate = __webpack_require__(103);
var PROMISE_ANY_ERROR = 'No one promise resolved';
$({
 target: 'Promise',
 stat: true
}, {
 any: function any(iterable) {
  var C = this;
  var capability = newPromiseCapabilityModule.f(C);
  var resolve = capability.resolve;
  var reject = capability.reject;
  var result = perform(function () {
   var promiseResolve = aFunction(C.resolve);
   var errors = [];
   var counter = 0;
   var remaining = 1;
   var alreadyResolved = false;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyRejected = false;
    errors.push(undefined);
    remaining++;
    promiseResolve.call(C, promise).then(function (value) {
     if (alreadyRejected || alreadyResolved)
      return;
     alreadyResolved = true;
     resolve(value);
    }, function (error) {
     if (alreadyRejected || alreadyResolved)
      return;
     alreadyRejected = true;
     errors[index] = error;
     --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
   });
   --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 }
});

/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var IS_PURE = __webpack_require__(66);
var NativePromise = __webpack_require__(117);
var fails = __webpack_require__(43);
var getBuiltIn = __webpack_require__(71);
var speciesConstructor = __webpack_require__(122);
var promiseResolve = __webpack_require__(129);
var redefine = __webpack_require__(58);
var NON_GENERIC = !!NativePromise && fails(function () {
 NativePromise.prototype['finally'].call({
  then: function () {
  }
 }, function () {
 });
});
$({
 target: 'Promise',
 proto: true,
 real: true,
 forced: NON_GENERIC
}, {
 'finally': function (onFinally) {
  var C = speciesConstructor(this, getBuiltIn('Promise'));
  var isFunction = typeof onFinally == 'function';
  return this.then(isFunction ? function (x) {
   return promiseResolve(C, onFinally()).then(function () {
    return x;
   });
  } : onFinally, isFunction ? function (e) {
   return promiseResolve(C, onFinally()).then(function () {
    throw e;
   });
  } : onFinally);
 }
});
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
 redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(138).charAt;
var InternalStateModule = __webpack_require__(62);
var defineIterator = __webpack_require__(93);
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
defineIterator(String, 'String', function (iterated) {
 setInternalState(this, {
  type: STRING_ITERATOR,
  string: String(iterated),
  index: 0
 });
}, function next() {
 var state = getInternalState(this);
 var string = state.string;
 var index = state.index;
 var point;
 if (index >= string.length)
  return {
   value: undefined,
   done: true
  };
 point = charAt(string, index);
 state.index += point.length;
 return {
  value: point,
  done: false
 };
});

/***/ }),
/* 138 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(77);
var requireObjectCoercible = __webpack_require__(49);
var createMethod = function (CONVERT_TO_STRING) {
 return function ($this, pos) {
  var S = String(requireObjectCoercible($this));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size)
   return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
 };
};
module.exports = {
 codeAt: createMethod(false),
 charAt: createMethod(true)
};

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var DOMIterables = __webpack_require__(140);
var ArrayIteratorMethods = __webpack_require__(83);
var createNonEnumerableProperty = __webpack_require__(55);
var wellKnownSymbol = __webpack_require__(85);
var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;
for (var COLLECTION_NAME in DOMIterables) {
 var Collection = global[COLLECTION_NAME];
 var CollectionPrototype = Collection && Collection.prototype;
 if (CollectionPrototype) {
  if (CollectionPrototype[ITERATOR] !== ArrayValues)
   try {
    createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
   } catch (error) {
    CollectionPrototype[ITERATOR] = ArrayValues;
   }
  if (!CollectionPrototype[TO_STRING_TAG]) {
   createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  if (DOMIterables[COLLECTION_NAME])
   for (var METHOD_NAME in ArrayIteratorMethods) {
    if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
     try {
      createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
     } catch (error) {
      CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
     }
   }
 }
}

/***/ }),
/* 140 */
/***/ ((module) => {

module.exports = {
 CSSRuleList: 0,
 CSSStyleDeclaration: 0,
 CSSValueList: 0,
 ClientRectList: 0,
 DOMRectList: 0,
 DOMStringList: 0,
 DOMTokenList: 1,
 DataTransferItemList: 0,
 FileList: 0,
 HTMLAllCollection: 0,
 HTMLCollection: 0,
 HTMLFormElement: 0,
 HTMLSelectElement: 0,
 MediaList: 0,
 MimeTypeArray: 0,
 NamedNodeMap: 0,
 NodeList: 1,
 PaintRequestList: 0,
 Plugin: 0,
 PluginArray: 0,
 SVGLengthList: 0,
 SVGNumberList: 0,
 SVGPathSegList: 0,
 SVGPointList: 0,
 SVGStringList: 0,
 SVGTransformList: 0,
 SourceBufferList: 0,
 StyleSheetList: 0,
 TextTrackCueList: 0,
 TextTrackList: 0,
 TouchList: 0
};

/***/ }),
/* 141 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(142);
__webpack_require__(150);
__webpack_require__(148);
var path = __webpack_require__(72);
module.exports = path.URL;

/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(137);
var $ = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(42);
var USE_NATIVE_URL = __webpack_require__(143);
var global = __webpack_require__(40);
var defineProperties = __webpack_require__(89);
var redefine = __webpack_require__(58);
var anInstance = __webpack_require__(120);
var has = __webpack_require__(52);
var assign = __webpack_require__(144);
var arrayFrom = __webpack_require__(145);
var codeAt = __webpack_require__(138).codeAt;
var toASCII = __webpack_require__(147);
var setToStringTag = __webpack_require__(99);
var URLSearchParamsModule = __webpack_require__(148);
var InternalStateModule = __webpack_require__(62);
var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;
var parseHost = function (url, input) {
 var result, codePoints, index;
 if (input.charAt(0) == '[') {
  if (input.charAt(input.length - 1) != ']')
   return INVALID_HOST;
  result = parseIPv6(input.slice(1, -1));
  if (!result)
   return INVALID_HOST;
  url.host = result;
 } else if (!isSpecial(url)) {
  if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input))
   return INVALID_HOST;
  result = '';
  codePoints = arrayFrom(input);
  for (index = 0; index < codePoints.length; index++) {
   result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
  }
  url.host = result;
 } else {
  input = toASCII(input);
  if (FORBIDDEN_HOST_CODE_POINT.test(input))
   return INVALID_HOST;
  result = parseIPv4(input);
  if (result === null)
   return INVALID_HOST;
  url.host = result;
 }
};
var parseIPv4 = function (input) {
 var parts = input.split('.');
 var partsLength, numbers, index, part, radix, number, ipv4;
 if (parts.length && parts[parts.length - 1] == '') {
  parts.pop();
 }
 partsLength = parts.length;
 if (partsLength > 4)
  return input;
 numbers = [];
 for (index = 0; index < partsLength; index++) {
  part = parts[index];
  if (part == '')
   return input;
  radix = 10;
  if (part.length > 1 && part.charAt(0) == '0') {
   radix = HEX_START.test(part) ? 16 : 8;
   part = part.slice(radix == 8 ? 1 : 2);
  }
  if (part === '') {
   number = 0;
  } else {
   if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part))
    return input;
   number = parseInt(part, radix);
  }
  numbers.push(number);
 }
 for (index = 0; index < partsLength; index++) {
  number = numbers[index];
  if (index == partsLength - 1) {
   if (number >= pow(256, 5 - partsLength))
    return null;
  } else if (number > 255)
   return null;
 }
 ipv4 = numbers.pop();
 for (index = 0; index < numbers.length; index++) {
  ipv4 += numbers[index] * pow(256, 3 - index);
 }
 return ipv4;
};
var parseIPv6 = function (input) {
 var address = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
 ];
 var pieceIndex = 0;
 var compress = null;
 var pointer = 0;
 var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
 var char = function () {
  return input.charAt(pointer);
 };
 if (char() == ':') {
  if (input.charAt(1) != ':')
   return;
  pointer += 2;
  pieceIndex++;
  compress = pieceIndex;
 }
 while (char()) {
  if (pieceIndex == 8)
   return;
  if (char() == ':') {
   if (compress !== null)
    return;
   pointer++;
   pieceIndex++;
   compress = pieceIndex;
   continue;
  }
  value = length = 0;
  while (length < 4 && HEX.test(char())) {
   value = value * 16 + parseInt(char(), 16);
   pointer++;
   length++;
  }
  if (char() == '.') {
   if (length == 0)
    return;
   pointer -= length;
   if (pieceIndex > 6)
    return;
   numbersSeen = 0;
   while (char()) {
    ipv4Piece = null;
    if (numbersSeen > 0) {
     if (char() == '.' && numbersSeen < 4)
      pointer++;
     else
      return;
    }
    if (!DIGIT.test(char()))
     return;
    while (DIGIT.test(char())) {
     number = parseInt(char(), 10);
     if (ipv4Piece === null)
      ipv4Piece = number;
     else if (ipv4Piece == 0)
      return;
     else
      ipv4Piece = ipv4Piece * 10 + number;
     if (ipv4Piece > 255)
      return;
     pointer++;
    }
    address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
    numbersSeen++;
    if (numbersSeen == 2 || numbersSeen == 4)
     pieceIndex++;
   }
   if (numbersSeen != 4)
    return;
   break;
  } else if (char() == ':') {
   pointer++;
   if (!char())
    return;
  } else if (char())
   return;
  address[pieceIndex++] = value;
 }
 if (compress !== null) {
  swaps = pieceIndex - compress;
  pieceIndex = 7;
  while (pieceIndex != 0 && swaps > 0) {
   swap = address[pieceIndex];
   address[pieceIndex--] = address[compress + swaps - 1];
   address[compress + --swaps] = swap;
  }
 } else if (pieceIndex != 8)
  return;
 return address;
};
var findLongestZeroSequence = function (ipv6) {
 var maxIndex = null;
 var maxLength = 1;
 var currStart = null;
 var currLength = 0;
 var index = 0;
 for (; index < 8; index++) {
  if (ipv6[index] !== 0) {
   if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
   }
   currStart = null;
   currLength = 0;
  } else {
   if (currStart === null)
    currStart = index;
   ++currLength;
  }
 }
 if (currLength > maxLength) {
  maxIndex = currStart;
  maxLength = currLength;
 }
 return maxIndex;
};
var serializeHost = function (host) {
 var result, index, compress, ignore0;
 if (typeof host == 'number') {
  result = [];
  for (index = 0; index < 4; index++) {
   result.unshift(host % 256);
   host = floor(host / 256);
  }
  return result.join('.');
 } else if (typeof host == 'object') {
  result = '';
  compress = findLongestZeroSequence(host);
  for (index = 0; index < 8; index++) {
   if (ignore0 && host[index] === 0)
    continue;
   if (ignore0)
    ignore0 = false;
   if (compress === index) {
    result += index ? ':' : '::';
    ignore0 = true;
   } else {
    result += host[index].toString(16);
    if (index < 7)
     result += ':';
   }
  }
  return '[' + result + ']';
 }
 return host;
};
var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
 ' ': 1,
 '"': 1,
 '<': 1,
 '>': 1,
 '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
 '#': 1,
 '?': 1,
 '{': 1,
 '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
 '/': 1,
 ':': 1,
 ';': 1,
 '=': 1,
 '@': 1,
 '[': 1,
 '\\': 1,
 ']': 1,
 '^': 1,
 '|': 1
});
var percentEncode = function (char, set) {
 var code = codeAt(char, 0);
 return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};
var specialSchemes = {
 ftp: 21,
 file: null,
 http: 80,
 https: 443,
 ws: 80,
 wss: 443
};
var isSpecial = function (url) {
 return has(specialSchemes, url.scheme);
};
var includesCredentials = function (url) {
 return url.username != '' || url.password != '';
};
var cannotHaveUsernamePasswordPort = function (url) {
 return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};
var isWindowsDriveLetter = function (string, normalized) {
 var second;
 return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ':' || !normalized && second == '|');
};
var startsWithWindowsDriveLetter = function (string) {
 var third;
 return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#'));
};
var shortenURLsPath = function (url) {
 var path = url.path;
 var pathSize = path.length;
 if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
  path.pop();
 }
};
var isSingleDot = function (segment) {
 return segment === '.' || segment.toLowerCase() === '%2e';
};
var isDoubleDot = function (segment) {
 segment = segment.toLowerCase();
 return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};
var parseURL = function (url, input, stateOverride, base) {
 var state = stateOverride || SCHEME_START;
 var pointer = 0;
 var buffer = '';
 var seenAt = false;
 var seenBracket = false;
 var seenPasswordToken = false;
 var codePoints, char, bufferCodePoints, failure;
 if (!stateOverride) {
  url.scheme = '';
  url.username = '';
  url.password = '';
  url.host = null;
  url.port = null;
  url.path = [];
  url.query = null;
  url.fragment = null;
  url.cannotBeABaseURL = false;
  input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
 }
 input = input.replace(TAB_AND_NEW_LINE, '');
 codePoints = arrayFrom(input);
 while (pointer <= codePoints.length) {
  char = codePoints[pointer];
  switch (state) {
  case SCHEME_START:
   if (char && ALPHA.test(char)) {
    buffer += char.toLowerCase();
    state = SCHEME;
   } else if (!stateOverride) {
    state = NO_SCHEME;
    continue;
   } else
    return INVALID_SCHEME;
   break;
  case SCHEME:
   if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
    buffer += char.toLowerCase();
   } else if (char == ':') {
    if (stateOverride && (isSpecial(url) != has(specialSchemes, buffer) || buffer == 'file' && (includesCredentials(url) || url.port !== null) || url.scheme == 'file' && !url.host))
     return;
    url.scheme = buffer;
    if (stateOverride) {
     if (isSpecial(url) && specialSchemes[url.scheme] == url.port)
      url.port = null;
     return;
    }
    buffer = '';
    if (url.scheme == 'file') {
     state = FILE;
    } else if (isSpecial(url) && base && base.scheme == url.scheme) {
     state = SPECIAL_RELATIVE_OR_AUTHORITY;
    } else if (isSpecial(url)) {
     state = SPECIAL_AUTHORITY_SLASHES;
    } else if (codePoints[pointer + 1] == '/') {
     state = PATH_OR_AUTHORITY;
     pointer++;
    } else {
     url.cannotBeABaseURL = true;
     url.path.push('');
     state = CANNOT_BE_A_BASE_URL_PATH;
    }
   } else if (!stateOverride) {
    buffer = '';
    state = NO_SCHEME;
    pointer = 0;
    continue;
   } else
    return INVALID_SCHEME;
   break;
  case NO_SCHEME:
   if (!base || base.cannotBeABaseURL && char != '#')
    return INVALID_SCHEME;
   if (base.cannotBeABaseURL && char == '#') {
    url.scheme = base.scheme;
    url.path = base.path.slice();
    url.query = base.query;
    url.fragment = '';
    url.cannotBeABaseURL = true;
    state = FRAGMENT;
    break;
   }
   state = base.scheme == 'file' ? FILE : RELATIVE;
   continue;
  case SPECIAL_RELATIVE_OR_AUTHORITY:
   if (char == '/' && codePoints[pointer + 1] == '/') {
    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
    pointer++;
   } else {
    state = RELATIVE;
    continue;
   }
   break;
  case PATH_OR_AUTHORITY:
   if (char == '/') {
    state = AUTHORITY;
    break;
   } else {
    state = PATH;
    continue;
   }
  case RELATIVE:
   url.scheme = base.scheme;
   if (char == EOF) {
    url.username = base.username;
    url.password = base.password;
    url.host = base.host;
    url.port = base.port;
    url.path = base.path.slice();
    url.query = base.query;
   } else if (char == '/' || char == '\\' && isSpecial(url)) {
    state = RELATIVE_SLASH;
   } else if (char == '?') {
    url.username = base.username;
    url.password = base.password;
    url.host = base.host;
    url.port = base.port;
    url.path = base.path.slice();
    url.query = '';
    state = QUERY;
   } else if (char == '#') {
    url.username = base.username;
    url.password = base.password;
    url.host = base.host;
    url.port = base.port;
    url.path = base.path.slice();
    url.query = base.query;
    url.fragment = '';
    state = FRAGMENT;
   } else {
    url.username = base.username;
    url.password = base.password;
    url.host = base.host;
    url.port = base.port;
    url.path = base.path.slice();
    url.path.pop();
    state = PATH;
    continue;
   }
   break;
  case RELATIVE_SLASH:
   if (isSpecial(url) && (char == '/' || char == '\\')) {
    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
   } else if (char == '/') {
    state = AUTHORITY;
   } else {
    url.username = base.username;
    url.password = base.password;
    url.host = base.host;
    url.port = base.port;
    state = PATH;
    continue;
   }
   break;
  case SPECIAL_AUTHORITY_SLASHES:
   state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
   if (char != '/' || buffer.charAt(pointer + 1) != '/')
    continue;
   pointer++;
   break;
  case SPECIAL_AUTHORITY_IGNORE_SLASHES:
   if (char != '/' && char != '\\') {
    state = AUTHORITY;
    continue;
   }
   break;
  case AUTHORITY:
   if (char == '@') {
    if (seenAt)
     buffer = '%40' + buffer;
    seenAt = true;
    bufferCodePoints = arrayFrom(buffer);
    for (var i = 0; i < bufferCodePoints.length; i++) {
     var codePoint = bufferCodePoints[i];
     if (codePoint == ':' && !seenPasswordToken) {
      seenPasswordToken = true;
      continue;
     }
     var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
     if (seenPasswordToken)
      url.password += encodedCodePoints;
     else
      url.username += encodedCodePoints;
    }
    buffer = '';
   } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
    if (seenAt && buffer == '')
     return INVALID_AUTHORITY;
    pointer -= arrayFrom(buffer).length + 1;
    buffer = '';
    state = HOST;
   } else
    buffer += char;
   break;
  case HOST:
  case HOSTNAME:
   if (stateOverride && url.scheme == 'file') {
    state = FILE_HOST;
    continue;
   } else if (char == ':' && !seenBracket) {
    if (buffer == '')
     return INVALID_HOST;
    failure = parseHost(url, buffer);
    if (failure)
     return failure;
    buffer = '';
    state = PORT;
    if (stateOverride == HOSTNAME)
     return;
   } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url)) {
    if (isSpecial(url) && buffer == '')
     return INVALID_HOST;
    if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null))
     return;
    failure = parseHost(url, buffer);
    if (failure)
     return failure;
    buffer = '';
    state = PATH_START;
    if (stateOverride)
     return;
    continue;
   } else {
    if (char == '[')
     seenBracket = true;
    else if (char == ']')
     seenBracket = false;
    buffer += char;
   }
   break;
  case PORT:
   if (DIGIT.test(char)) {
    buffer += char;
   } else if (char == EOF || char == '/' || char == '?' || char == '#' || char == '\\' && isSpecial(url) || stateOverride) {
    if (buffer != '') {
     var port = parseInt(buffer, 10);
     if (port > 0xFFFF)
      return INVALID_PORT;
     url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
     buffer = '';
    }
    if (stateOverride)
     return;
    state = PATH_START;
    continue;
   } else
    return INVALID_PORT;
   break;
  case FILE:
   url.scheme = 'file';
   if (char == '/' || char == '\\')
    state = FILE_SLASH;
   else if (base && base.scheme == 'file') {
    if (char == EOF) {
     url.host = base.host;
     url.path = base.path.slice();
     url.query = base.query;
    } else if (char == '?') {
     url.host = base.host;
     url.path = base.path.slice();
     url.query = '';
     state = QUERY;
    } else if (char == '#') {
     url.host = base.host;
     url.path = base.path.slice();
     url.query = base.query;
     url.fragment = '';
     state = FRAGMENT;
    } else {
     if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
      url.host = base.host;
      url.path = base.path.slice();
      shortenURLsPath(url);
     }
     state = PATH;
     continue;
    }
   } else {
    state = PATH;
    continue;
   }
   break;
  case FILE_SLASH:
   if (char == '/' || char == '\\') {
    state = FILE_HOST;
    break;
   }
   if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
    if (isWindowsDriveLetter(base.path[0], true))
     url.path.push(base.path[0]);
    else
     url.host = base.host;
   }
   state = PATH;
   continue;
  case FILE_HOST:
   if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
    if (!stateOverride && isWindowsDriveLetter(buffer)) {
     state = PATH;
    } else if (buffer == '') {
     url.host = '';
     if (stateOverride)
      return;
     state = PATH_START;
    } else {
     failure = parseHost(url, buffer);
     if (failure)
      return failure;
     if (url.host == 'localhost')
      url.host = '';
     if (stateOverride)
      return;
     buffer = '';
     state = PATH_START;
    }
    continue;
   } else
    buffer += char;
   break;
  case PATH_START:
   if (isSpecial(url)) {
    state = PATH;
    if (char != '/' && char != '\\')
     continue;
   } else if (!stateOverride && char == '?') {
    url.query = '';
    state = QUERY;
   } else if (!stateOverride && char == '#') {
    url.fragment = '';
    state = FRAGMENT;
   } else if (char != EOF) {
    state = PATH;
    if (char != '/')
     continue;
   }
   break;
  case PATH:
   if (char == EOF || char == '/' || char == '\\' && isSpecial(url) || !stateOverride && (char == '?' || char == '#')) {
    if (isDoubleDot(buffer)) {
     shortenURLsPath(url);
     if (char != '/' && !(char == '\\' && isSpecial(url))) {
      url.path.push('');
     }
    } else if (isSingleDot(buffer)) {
     if (char != '/' && !(char == '\\' && isSpecial(url))) {
      url.path.push('');
     }
    } else {
     if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
      if (url.host)
       url.host = '';
      buffer = buffer.charAt(0) + ':';
     }
     url.path.push(buffer);
    }
    buffer = '';
    if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
     while (url.path.length > 1 && url.path[0] === '') {
      url.path.shift();
     }
    }
    if (char == '?') {
     url.query = '';
     state = QUERY;
    } else if (char == '#') {
     url.fragment = '';
     state = FRAGMENT;
    }
   } else {
    buffer += percentEncode(char, pathPercentEncodeSet);
   }
   break;
  case CANNOT_BE_A_BASE_URL_PATH:
   if (char == '?') {
    url.query = '';
    state = QUERY;
   } else if (char == '#') {
    url.fragment = '';
    state = FRAGMENT;
   } else if (char != EOF) {
    url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
   }
   break;
  case QUERY:
   if (!stateOverride && char == '#') {
    url.fragment = '';
    state = FRAGMENT;
   } else if (char != EOF) {
    if (char == "'" && isSpecial(url))
     url.query += '%27';
    else if (char == '#')
     url.query += '%23';
    else
     url.query += percentEncode(char, C0ControlPercentEncodeSet);
   }
   break;
  case FRAGMENT:
   if (char != EOF)
    url.fragment += percentEncode(char, fragmentPercentEncodeSet);
   break;
  }
  pointer++;
 }
};
var URLConstructor = function URL(url) {
 var that = anInstance(this, URLConstructor, 'URL');
 var base = arguments.length > 1 ? arguments[1] : undefined;
 var urlString = String(url);
 var state = setInternalState(that, { type: 'URL' });
 var baseState, failure;
 if (base !== undefined) {
  if (base instanceof URLConstructor)
   baseState = getInternalURLState(base);
  else {
   failure = parseURL(baseState = {}, String(base));
   if (failure)
    throw TypeError(failure);
  }
 }
 failure = parseURL(state, urlString, null, baseState);
 if (failure)
  throw TypeError(failure);
 var searchParams = state.searchParams = new URLSearchParams();
 var searchParamsState = getInternalSearchParamsState(searchParams);
 searchParamsState.updateSearchParams(state.query);
 searchParamsState.updateURL = function () {
  state.query = String(searchParams) || null;
 };
 if (!DESCRIPTORS) {
  that.href = serializeURL.call(that);
  that.origin = getOrigin.call(that);
  that.protocol = getProtocol.call(that);
  that.username = getUsername.call(that);
  that.password = getPassword.call(that);
  that.host = getHost.call(that);
  that.hostname = getHostname.call(that);
  that.port = getPort.call(that);
  that.pathname = getPathname.call(that);
  that.search = getSearch.call(that);
  that.searchParams = getSearchParams.call(that);
  that.hash = getHash.call(that);
 }
};
var URLPrototype = URLConstructor.prototype;
var serializeURL = function () {
 var url = getInternalURLState(this);
 var scheme = url.scheme;
 var username = url.username;
 var password = url.password;
 var host = url.host;
 var port = url.port;
 var path = url.path;
 var query = url.query;
 var fragment = url.fragment;
 var output = scheme + ':';
 if (host !== null) {
  output += '//';
  if (includesCredentials(url)) {
   output += username + (password ? ':' + password : '') + '@';
  }
  output += serializeHost(host);
  if (port !== null)
   output += ':' + port;
 } else if (scheme == 'file')
  output += '//';
 output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
 if (query !== null)
  output += '?' + query;
 if (fragment !== null)
  output += '#' + fragment;
 return output;
};
var getOrigin = function () {
 var url = getInternalURLState(this);
 var scheme = url.scheme;
 var port = url.port;
 if (scheme == 'blob')
  try {
   return new URL(scheme.path[0]).origin;
  } catch (error) {
   return 'null';
  }
 if (scheme == 'file' || !isSpecial(url))
  return 'null';
 return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};
var getProtocol = function () {
 return getInternalURLState(this).scheme + ':';
};
var getUsername = function () {
 return getInternalURLState(this).username;
};
var getPassword = function () {
 return getInternalURLState(this).password;
};
var getHost = function () {
 var url = getInternalURLState(this);
 var host = url.host;
 var port = url.port;
 return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
};
var getHostname = function () {
 var host = getInternalURLState(this).host;
 return host === null ? '' : serializeHost(host);
};
var getPort = function () {
 var port = getInternalURLState(this).port;
 return port === null ? '' : String(port);
};
var getPathname = function () {
 var url = getInternalURLState(this);
 var path = url.path;
 return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};
var getSearch = function () {
 var query = getInternalURLState(this).query;
 return query ? '?' + query : '';
};
var getSearchParams = function () {
 return getInternalURLState(this).searchParams;
};
var getHash = function () {
 var fragment = getInternalURLState(this).fragment;
 return fragment ? '#' + fragment : '';
};
var accessorDescriptor = function (getter, setter) {
 return {
  get: getter,
  set: setter,
  configurable: true,
  enumerable: true
 };
};
if (DESCRIPTORS) {
 defineProperties(URLPrototype, {
  href: accessorDescriptor(serializeURL, function (href) {
   var url = getInternalURLState(this);
   var urlString = String(href);
   var failure = parseURL(url, urlString);
   if (failure)
    throw TypeError(failure);
   getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
  }),
  origin: accessorDescriptor(getOrigin),
  protocol: accessorDescriptor(getProtocol, function (protocol) {
   var url = getInternalURLState(this);
   parseURL(url, String(protocol) + ':', SCHEME_START);
  }),
  username: accessorDescriptor(getUsername, function (username) {
   var url = getInternalURLState(this);
   var codePoints = arrayFrom(String(username));
   if (cannotHaveUsernamePasswordPort(url))
    return;
   url.username = '';
   for (var i = 0; i < codePoints.length; i++) {
    url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
   }
  }),
  password: accessorDescriptor(getPassword, function (password) {
   var url = getInternalURLState(this);
   var codePoints = arrayFrom(String(password));
   if (cannotHaveUsernamePasswordPort(url))
    return;
   url.password = '';
   for (var i = 0; i < codePoints.length; i++) {
    url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
   }
  }),
  host: accessorDescriptor(getHost, function (host) {
   var url = getInternalURLState(this);
   if (url.cannotBeABaseURL)
    return;
   parseURL(url, String(host), HOST);
  }),
  hostname: accessorDescriptor(getHostname, function (hostname) {
   var url = getInternalURLState(this);
   if (url.cannotBeABaseURL)
    return;
   parseURL(url, String(hostname), HOSTNAME);
  }),
  port: accessorDescriptor(getPort, function (port) {
   var url = getInternalURLState(this);
   if (cannotHaveUsernamePasswordPort(url))
    return;
   port = String(port);
   if (port == '')
    url.port = null;
   else
    parseURL(url, port, PORT);
  }),
  pathname: accessorDescriptor(getPathname, function (pathname) {
   var url = getInternalURLState(this);
   if (url.cannotBeABaseURL)
    return;
   url.path = [];
   parseURL(url, pathname + '', PATH_START);
  }),
  search: accessorDescriptor(getSearch, function (search) {
   var url = getInternalURLState(this);
   search = String(search);
   if (search == '') {
    url.query = null;
   } else {
    if ('?' == search.charAt(0))
     search = search.slice(1);
    url.query = '';
    parseURL(url, search, QUERY);
   }
   getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
  }),
  searchParams: accessorDescriptor(getSearchParams),
  hash: accessorDescriptor(getHash, function (hash) {
   var url = getInternalURLState(this);
   hash = String(hash);
   if (hash == '') {
    url.fragment = null;
    return;
   }
   if ('#' == hash.charAt(0))
    hash = hash.slice(1);
   url.fragment = '';
   parseURL(url, hash, FRAGMENT);
  })
 });
}
redefine(URLPrototype, 'toJSON', function toJSON() {
 return serializeURL.call(this);
}, { enumerable: true });
redefine(URLPrototype, 'toString', function toString() {
 return serializeURL.call(this);
}, { enumerable: true });
if (NativeURL) {
 var nativeCreateObjectURL = NativeURL.createObjectURL;
 var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
 if (nativeCreateObjectURL)
  redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
   return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
 if (nativeRevokeObjectURL)
  redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
   return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}
setToStringTag(URLConstructor, 'URL');
$({
 global: true,
 forced: !USE_NATIVE_URL,
 sham: !DESCRIPTORS
}, { URL: URLConstructor });

/***/ }),
/* 143 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(43);
var wellKnownSymbol = __webpack_require__(85);
var IS_PURE = __webpack_require__(66);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = !fails(function () {
 var url = new URL('b?a=1&b=2&c=3', 'http://a');
 var searchParams = url.searchParams;
 var result = '';
 url.pathname = 'c%20d';
 searchParams.forEach(function (value, key) {
  searchParams['delete']('b');
  result += key + value;
 });
 return IS_PURE && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR] || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' || new URL('http://тест').host !== 'xn--e1aybc' || new URL('http://a#б').hash !== '#%D0%B1' || result !== 'a1c3' || new URL('http://x', undefined).host !== 'x';
});

/***/ }),
/* 144 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(42);
var fails = __webpack_require__(43);
var objectKeys = __webpack_require__(90);
var getOwnPropertySymbolsModule = __webpack_require__(80);
var propertyIsEnumerableModule = __webpack_require__(44);
var toObject = __webpack_require__(97);
var IndexedObject = __webpack_require__(47);
var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;
module.exports = !nativeAssign || fails(function () {
 if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
   enumerable: true,
   get: function () {
    defineProperty(this, 'b', {
     value: 3,
     enumerable: false
    });
   }
  }), { b: 2 })).b !== 1)
  return true;
 var A = {};
 var B = {};
 var symbol = Symbol();
 var alphabet = 'abcdefghijklmnopqrst';
 A[symbol] = 7;
 alphabet.split('').forEach(function (chr) {
  B[chr] = chr;
 });
 return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
 var T = toObject(target);
 var argumentsLength = arguments.length;
 var index = 1;
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 var propertyIsEnumerable = propertyIsEnumerableModule.f;
 while (argumentsLength > index) {
  var S = IndexedObject(arguments[index++]);
  var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
  var length = keys.length;
  var j = 0;
  var key;
  while (length > j) {
   key = keys[j++];
   if (!DESCRIPTORS || propertyIsEnumerable.call(S, key))
    T[key] = S[key];
  }
 }
 return T;
} : nativeAssign;

/***/ }),
/* 145 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(105);
var toObject = __webpack_require__(97);
var callWithSafeIterationClosing = __webpack_require__(146);
var isArrayIteratorMethod = __webpack_require__(104);
var toLength = __webpack_require__(76);
var createProperty = __webpack_require__(111);
var getIteratorMethod = __webpack_require__(107);
module.exports = function from(arrayLike) {
 var O = toObject(arrayLike);
 var C = typeof this == 'function' ? this : Array;
 var argumentsLength = arguments.length;
 var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
 var mapping = mapfn !== undefined;
 var iteratorMethod = getIteratorMethod(O);
 var index = 0;
 var length, result, step, iterator, next, value;
 if (mapping)
  mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
 if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
  iterator = iteratorMethod.call(O);
  next = iterator.next;
  result = new C();
  for (; !(step = next.call(iterator)).done; index++) {
   value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [
    step.value,
    index
   ], true) : step.value;
   createProperty(result, index, value);
  }
 } else {
  length = toLength(O.length);
  result = new C(length);
  for (; length > index; index++) {
   value = mapping ? mapfn(O[index], index) : O[index];
   createProperty(result, index, value);
  }
 }
 result.length = index;
 return result;
};

/***/ }),
/* 146 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var iteratorClose = __webpack_require__(110);
module.exports = function (iterator, fn, value, ENTRIES) {
 try {
  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
 } catch (error) {
  iteratorClose(iterator);
  throw error;
 }
};

/***/ }),
/* 147 */
/***/ ((module) => {

"use strict";

var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = '-';
var regexNonASCII = /[^\0-\u007E]/;
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
var ucs2decode = function (string) {
 var output = [];
 var counter = 0;
 var length = string.length;
 while (counter < length) {
  var value = string.charCodeAt(counter++);
  if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
   var extra = string.charCodeAt(counter++);
   if ((extra & 0xFC00) == 0xDC00) {
    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
   } else {
    output.push(value);
    counter--;
   }
  } else {
   output.push(value);
  }
 }
 return output;
};
var digitToBasic = function (digit) {
 return digit + 22 + 75 * (digit < 26);
};
var adapt = function (delta, numPoints, firstTime) {
 var k = 0;
 delta = firstTime ? floor(delta / damp) : delta >> 1;
 delta += floor(delta / numPoints);
 for (; delta > baseMinusTMin * tMax >> 1; k += base) {
  delta = floor(delta / baseMinusTMin);
 }
 return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
var encode = function (input) {
 var output = [];
 input = ucs2decode(input);
 var inputLength = input.length;
 var n = initialN;
 var delta = 0;
 var bias = initialBias;
 var i, currentValue;
 for (i = 0; i < input.length; i++) {
  currentValue = input[i];
  if (currentValue < 0x80) {
   output.push(stringFromCharCode(currentValue));
  }
 }
 var basicLength = output.length;
 var handledCPCount = basicLength;
 if (basicLength) {
  output.push(delimiter);
 }
 while (handledCPCount < inputLength) {
  var m = maxInt;
  for (i = 0; i < input.length; i++) {
   currentValue = input[i];
   if (currentValue >= n && currentValue < m) {
    m = currentValue;
   }
  }
  var handledCPCountPlusOne = handledCPCount + 1;
  if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
   throw RangeError(OVERFLOW_ERROR);
  }
  delta += (m - n) * handledCPCountPlusOne;
  n = m;
  for (i = 0; i < input.length; i++) {
   currentValue = input[i];
   if (currentValue < n && ++delta > maxInt) {
    throw RangeError(OVERFLOW_ERROR);
   }
   if (currentValue == n) {
    var q = delta;
    for (var k = base;; k += base) {
     var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
     if (q < t)
      break;
     var qMinusT = q - t;
     var baseMinusT = base - t;
     output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
     q = floor(qMinusT / baseMinusT);
    }
    output.push(stringFromCharCode(digitToBasic(q)));
    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
    delta = 0;
    ++handledCPCount;
   }
  }
  ++delta;
  ++n;
 }
 return output.join('');
};
module.exports = function (input) {
 var encoded = [];
 var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
 var i, label;
 for (i = 0; i < labels.length; i++) {
  label = labels[i];
  encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
 }
 return encoded.join('.');
};

/***/ }),
/* 148 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(83);
var $ = __webpack_require__(39);
var getBuiltIn = __webpack_require__(71);
var USE_NATIVE_URL = __webpack_require__(143);
var redefine = __webpack_require__(58);
var redefineAll = __webpack_require__(118);
var setToStringTag = __webpack_require__(99);
var createIteratorConstructor = __webpack_require__(94);
var InternalStateModule = __webpack_require__(62);
var anInstance = __webpack_require__(120);
var hasOwn = __webpack_require__(52);
var bind = __webpack_require__(105);
var classof = __webpack_require__(108);
var anObject = __webpack_require__(57);
var isObject = __webpack_require__(51);
var create = __webpack_require__(88);
var createPropertyDescriptor = __webpack_require__(45);
var getIterator = __webpack_require__(149);
var getIteratorMethod = __webpack_require__(107);
var wellKnownSymbol = __webpack_require__(85);
var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var plus = /\+/g;
var sequences = Array(4);
var percentSequence = function (bytes) {
 return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};
var percentDecode = function (sequence) {
 try {
  return decodeURIComponent(sequence);
 } catch (error) {
  return sequence;
 }
};
var deserialize = function (it) {
 var result = it.replace(plus, ' ');
 var bytes = 4;
 try {
  return decodeURIComponent(result);
 } catch (error) {
  while (bytes) {
   result = result.replace(percentSequence(bytes--), percentDecode);
  }
  return result;
 }
};
var find = /[!'()~]|%20/g;
var replace = {
 '!': '%21',
 "'": '%27',
 '(': '%28',
 ')': '%29',
 '~': '%7E',
 '%20': '+'
};
var replacer = function (match) {
 return replace[match];
};
var serialize = function (it) {
 return encodeURIComponent(it).replace(find, replacer);
};
var parseSearchParams = function (result, query) {
 if (query) {
  var attributes = query.split('&');
  var index = 0;
  var attribute, entry;
  while (index < attributes.length) {
   attribute = attributes[index++];
   if (attribute.length) {
    entry = attribute.split('=');
    result.push({
     key: deserialize(entry.shift()),
     value: deserialize(entry.join('='))
    });
   }
  }
 }
};
var updateSearchParams = function (query) {
 this.entries.length = 0;
 parseSearchParams(this.entries, query);
};
var validateArgumentsLength = function (passed, required) {
 if (passed < required)
  throw TypeError('Not enough arguments');
};
var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
 setInternalState(this, {
  type: URL_SEARCH_PARAMS_ITERATOR,
  iterator: getIterator(getInternalParamsState(params).entries),
  kind: kind
 });
}, 'Iterator', function next() {
 var state = getInternalIteratorState(this);
 var kind = state.kind;
 var step = state.iterator.next();
 var entry = step.value;
 if (!step.done) {
  step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [
   entry.key,
   entry.value
  ];
 }
 return step;
});
var URLSearchParamsConstructor = function URLSearchParams() {
 anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
 var init = arguments.length > 0 ? arguments[0] : undefined;
 var that = this;
 var entries = [];
 var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
 setInternalState(that, {
  type: URL_SEARCH_PARAMS,
  entries: entries,
  updateURL: function () {
  },
  updateSearchParams: updateSearchParams
 });
 if (init !== undefined) {
  if (isObject(init)) {
   iteratorMethod = getIteratorMethod(init);
   if (typeof iteratorMethod === 'function') {
    iterator = iteratorMethod.call(init);
    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
     entryIterator = getIterator(anObject(step.value));
     entryNext = entryIterator.next;
     if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done)
      throw TypeError('Expected sequence with length 2');
     entries.push({
      key: first.value + '',
      value: second.value + ''
     });
    }
   } else
    for (key in init)
     if (hasOwn(init, key))
      entries.push({
       key: key,
       value: init[key] + ''
      });
  } else {
   parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
  }
 }
};
var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
 append: function append(name, value) {
  validateArgumentsLength(arguments.length, 2);
  var state = getInternalParamsState(this);
  state.entries.push({
   key: name + '',
   value: value + ''
  });
  state.updateURL();
 },
 'delete': function (name) {
  validateArgumentsLength(arguments.length, 1);
  var state = getInternalParamsState(this);
  var entries = state.entries;
  var key = name + '';
  var index = 0;
  while (index < entries.length) {
   if (entries[index].key === key)
    entries.splice(index, 1);
   else
    index++;
  }
  state.updateURL();
 },
 get: function get(name) {
  validateArgumentsLength(arguments.length, 1);
  var entries = getInternalParamsState(this).entries;
  var key = name + '';
  var index = 0;
  for (; index < entries.length; index++) {
   if (entries[index].key === key)
    return entries[index].value;
  }
  return null;
 },
 getAll: function getAll(name) {
  validateArgumentsLength(arguments.length, 1);
  var entries = getInternalParamsState(this).entries;
  var key = name + '';
  var result = [];
  var index = 0;
  for (; index < entries.length; index++) {
   if (entries[index].key === key)
    result.push(entries[index].value);
  }
  return result;
 },
 has: function has(name) {
  validateArgumentsLength(arguments.length, 1);
  var entries = getInternalParamsState(this).entries;
  var key = name + '';
  var index = 0;
  while (index < entries.length) {
   if (entries[index++].key === key)
    return true;
  }
  return false;
 },
 set: function set(name, value) {
  validateArgumentsLength(arguments.length, 1);
  var state = getInternalParamsState(this);
  var entries = state.entries;
  var found = false;
  var key = name + '';
  var val = value + '';
  var index = 0;
  var entry;
  for (; index < entries.length; index++) {
   entry = entries[index];
   if (entry.key === key) {
    if (found)
     entries.splice(index--, 1);
    else {
     found = true;
     entry.value = val;
    }
   }
  }
  if (!found)
   entries.push({
    key: key,
    value: val
   });
  state.updateURL();
 },
 sort: function sort() {
  var state = getInternalParamsState(this);
  var entries = state.entries;
  var slice = entries.slice();
  var entry, entriesIndex, sliceIndex;
  entries.length = 0;
  for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
   entry = slice[sliceIndex];
   for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
    if (entries[entriesIndex].key > entry.key) {
     entries.splice(entriesIndex, 0, entry);
     break;
    }
   }
   if (entriesIndex === sliceIndex)
    entries.push(entry);
  }
  state.updateURL();
 },
 forEach: function forEach(callback) {
  var entries = getInternalParamsState(this).entries;
  var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
  var index = 0;
  var entry;
  while (index < entries.length) {
   entry = entries[index++];
   boundFunction(entry.value, entry.key, this);
  }
 },
 keys: function keys() {
  return new URLSearchParamsIterator(this, 'keys');
 },
 values: function values() {
  return new URLSearchParamsIterator(this, 'values');
 },
 entries: function entries() {
  return new URLSearchParamsIterator(this, 'entries');
 }
}, { enumerable: true });
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);
redefine(URLSearchParamsPrototype, 'toString', function toString() {
 var entries = getInternalParamsState(this).entries;
 var result = [];
 var index = 0;
 var entry;
 while (index < entries.length) {
  entry = entries[index++];
  result.push(serialize(entry.key) + '=' + serialize(entry.value));
 }
 return result.join('&');
}, { enumerable: true });
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$({
 global: true,
 forced: !USE_NATIVE_URL
}, { URLSearchParams: URLSearchParamsConstructor });
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
 $({
  global: true,
  enumerable: true,
  forced: true
 }, {
  fetch: function fetch(input) {
   var args = [input];
   var init, body, headers;
   if (arguments.length > 1) {
    init = arguments[1];
    if (isObject(init)) {
     body = init.body;
     if (classof(body) === URL_SEARCH_PARAMS) {
      headers = init.headers ? new Headers(init.headers) : new Headers();
      if (!headers.has('content-type')) {
       headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
      init = create(init, {
       body: createPropertyDescriptor(0, String(body)),
       headers: createPropertyDescriptor(0, headers)
      });
     }
    }
    args.push(init);
   }
   return $fetch.apply(this, args);
  }
 });
}
module.exports = {
 URLSearchParams: URLSearchParamsConstructor,
 getState: getInternalParamsState
};

/***/ }),
/* 149 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(57);
var getIteratorMethod = __webpack_require__(107);
module.exports = function (it) {
 var iteratorMethod = getIteratorMethod(it);
 if (typeof iteratorMethod != 'function') {
  throw TypeError(String(it) + ' is not iterable');
 }
 return anObject(iteratorMethod.call(it));
};

/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
$({
 target: 'URL',
 proto: true,
 enumerable: true
}, {
 toJSON: function toJSON() {
  return URL.prototype.toString.call(this);
 }
});

/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
  true ? factory(exports) : 0;
}(this, function (exports) {
 'use strict';
 var SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol : function (description) {
  return "Symbol(" + description + ")";
 };
 function noop() {
 }
 function getGlobals() {
  if (typeof self !== 'undefined') {
   return self;
  } else if (typeof window !== 'undefined') {
   return window;
  } else if (typeof global !== 'undefined') {
   return global;
  }
  return undefined;
 }
 var globals = getGlobals();
 function typeIsObject(x) {
  return typeof x === 'object' && x !== null || typeof x === 'function';
 }
 var rethrowAssertionErrorRejection = noop;
 var originalPromise = Promise;
 var originalPromiseThen = Promise.prototype.then;
 var originalPromiseResolve = Promise.resolve.bind(originalPromise);
 var originalPromiseReject = Promise.reject.bind(originalPromise);
 function newPromise(executor) {
  return new originalPromise(executor);
 }
 function promiseResolvedWith(value) {
  return originalPromiseResolve(value);
 }
 function promiseRejectedWith(reason) {
  return originalPromiseReject(reason);
 }
 function PerformPromiseThen(promise, onFulfilled, onRejected) {
  return originalPromiseThen.call(promise, onFulfilled, onRejected);
 }
 function uponPromise(promise, onFulfilled, onRejected) {
  PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
 }
 function uponFulfillment(promise, onFulfilled) {
  uponPromise(promise, onFulfilled);
 }
 function uponRejection(promise, onRejected) {
  uponPromise(promise, undefined, onRejected);
 }
 function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
  return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
 }
 function setPromiseIsHandledToTrue(promise) {
  PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
 }
 var queueMicrotask = function () {
  var globalQueueMicrotask = globals && globals.queueMicrotask;
  if (typeof globalQueueMicrotask === 'function') {
   return globalQueueMicrotask;
  }
  var resolvedPromise = promiseResolvedWith(undefined);
  return function (fn) {
   return PerformPromiseThen(resolvedPromise, fn);
  };
 }();
 function reflectCall(F, V, args) {
  if (typeof F !== 'function') {
   throw new TypeError('Argument is not a function');
  }
  return Function.prototype.apply.call(F, V, args);
 }
 function promiseCall(F, V, args) {
  try {
   return promiseResolvedWith(reflectCall(F, V, args));
  } catch (value) {
   return promiseRejectedWith(value);
  }
 }
 var QUEUE_MAX_ARRAY_SIZE = 16384;
 var SimpleQueue = function () {
  function SimpleQueue() {
   this._cursor = 0;
   this._size = 0;
   this._front = {
    _elements: [],
    _next: undefined
   };
   this._back = this._front;
   this._cursor = 0;
   this._size = 0;
  }
  Object.defineProperty(SimpleQueue.prototype, "length", {
   get: function () {
    return this._size;
   },
   enumerable: false,
   configurable: true
  });
  SimpleQueue.prototype.push = function (element) {
   var oldBack = this._back;
   var newBack = oldBack;
   if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
    newBack = {
     _elements: [],
     _next: undefined
    };
   }
   oldBack._elements.push(element);
   if (newBack !== oldBack) {
    this._back = newBack;
    oldBack._next = newBack;
   }
   ++this._size;
  };
  SimpleQueue.prototype.shift = function () {
   var oldFront = this._front;
   var newFront = oldFront;
   var oldCursor = this._cursor;
   var newCursor = oldCursor + 1;
   var elements = oldFront._elements;
   var element = elements[oldCursor];
   if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
    newFront = oldFront._next;
    newCursor = 0;
   }
   --this._size;
   this._cursor = newCursor;
   if (oldFront !== newFront) {
    this._front = newFront;
   }
   elements[oldCursor] = undefined;
   return element;
  };
  SimpleQueue.prototype.forEach = function (callback) {
   var i = this._cursor;
   var node = this._front;
   var elements = node._elements;
   while (i !== elements.length || node._next !== undefined) {
    if (i === elements.length) {
     node = node._next;
     elements = node._elements;
     i = 0;
     if (elements.length === 0) {
      break;
     }
    }
    callback(elements[i]);
    ++i;
   }
  };
  SimpleQueue.prototype.peek = function () {
   var front = this._front;
   var cursor = this._cursor;
   return front._elements[cursor];
  };
  return SimpleQueue;
 }();
 function ReadableStreamReaderGenericInitialize(reader, stream) {
  reader._ownerReadableStream = stream;
  stream._reader = reader;
  if (stream._state === 'readable') {
   defaultReaderClosedPromiseInitialize(reader);
  } else if (stream._state === 'closed') {
   defaultReaderClosedPromiseInitializeAsResolved(reader);
  } else {
   defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
  }
 }
 function ReadableStreamReaderGenericCancel(reader, reason) {
  var stream = reader._ownerReadableStream;
  return ReadableStreamCancel(stream, reason);
 }
 function ReadableStreamReaderGenericRelease(reader) {
  if (reader._ownerReadableStream._state === 'readable') {
   defaultReaderClosedPromiseReject(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
  } else {
   defaultReaderClosedPromiseResetToRejected(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
  }
  reader._ownerReadableStream._reader = undefined;
  reader._ownerReadableStream = undefined;
 }
 function readerLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released reader');
 }
 function defaultReaderClosedPromiseInitialize(reader) {
  reader._closedPromise = newPromise(function (resolve, reject) {
   reader._closedPromise_resolve = resolve;
   reader._closedPromise_reject = reject;
  });
 }
 function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseReject(reader, reason);
 }
 function defaultReaderClosedPromiseInitializeAsResolved(reader) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseResolve(reader);
 }
 function defaultReaderClosedPromiseReject(reader, reason) {
  if (reader._closedPromise_reject === undefined) {
   return;
  }
  setPromiseIsHandledToTrue(reader._closedPromise);
  reader._closedPromise_reject(reason);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
 }
 function defaultReaderClosedPromiseResetToRejected(reader, reason) {
  defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
 }
 function defaultReaderClosedPromiseResolve(reader) {
  if (reader._closedPromise_resolve === undefined) {
   return;
  }
  reader._closedPromise_resolve(undefined);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
 }
 var AbortSteps = SymbolPolyfill('[[AbortSteps]]');
 var ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
 var CancelSteps = SymbolPolyfill('[[CancelSteps]]');
 var PullSteps = SymbolPolyfill('[[PullSteps]]');
 var NumberIsFinite = Number.isFinite || function (x) {
  return typeof x === 'number' && isFinite(x);
 };
 var MathTrunc = Math.trunc || function (v) {
  return v < 0 ? Math.ceil(v) : Math.floor(v);
 };
 function isDictionary(x) {
  return typeof x === 'object' || typeof x === 'function';
 }
 function assertDictionary(obj, context) {
  if (obj !== undefined && !isDictionary(obj)) {
   throw new TypeError(context + " is not an object.");
  }
 }
 function assertFunction(x, context) {
  if (typeof x !== 'function') {
   throw new TypeError(context + " is not a function.");
  }
 }
 function isObject(x) {
  return typeof x === 'object' && x !== null || typeof x === 'function';
 }
 function assertObject(x, context) {
  if (!isObject(x)) {
   throw new TypeError(context + " is not an object.");
  }
 }
 function assertRequiredArgument(x, position, context) {
  if (x === undefined) {
   throw new TypeError("Parameter " + position + " is required in '" + context + "'.");
  }
 }
 function assertRequiredField(x, field, context) {
  if (x === undefined) {
   throw new TypeError(field + " is required in '" + context + "'.");
  }
 }
 function convertUnrestrictedDouble(value) {
  return Number(value);
 }
 function censorNegativeZero(x) {
  return x === 0 ? 0 : x;
 }
 function integerPart(x) {
  return censorNegativeZero(MathTrunc(x));
 }
 function convertUnsignedLongLongWithEnforceRange(value, context) {
  var lowerBound = 0;
  var upperBound = Number.MAX_SAFE_INTEGER;
  var x = Number(value);
  x = censorNegativeZero(x);
  if (!NumberIsFinite(x)) {
   throw new TypeError(context + " is not a finite number");
  }
  x = integerPart(x);
  if (x < lowerBound || x > upperBound) {
   throw new TypeError(context + " is outside the accepted range of " + lowerBound + " to " + upperBound + ", inclusive");
  }
  if (!NumberIsFinite(x) || x === 0) {
   return 0;
  }
  return x;
 }
 function assertReadableStream(x, context) {
  if (!IsReadableStream(x)) {
   throw new TypeError(context + " is not a ReadableStream.");
  }
 }
 function AcquireReadableStreamDefaultReader(stream) {
  return new ReadableStreamDefaultReader(stream);
 }
 function ReadableStreamAddReadRequest(stream, readRequest) {
  stream._reader._readRequests.push(readRequest);
 }
 function ReadableStreamFulfillReadRequest(stream, chunk, done) {
  var reader = stream._reader;
  var readRequest = reader._readRequests.shift();
  if (done) {
   readRequest._closeSteps();
  } else {
   readRequest._chunkSteps(chunk);
  }
 }
 function ReadableStreamGetNumReadRequests(stream) {
  return stream._reader._readRequests.length;
 }
 function ReadableStreamHasDefaultReader(stream) {
  var reader = stream._reader;
  if (reader === undefined) {
   return false;
  }
  if (!IsReadableStreamDefaultReader(reader)) {
   return false;
  }
  return true;
 }
 var ReadableStreamDefaultReader = function () {
  function ReadableStreamDefaultReader(stream) {
   assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
   assertReadableStream(stream, 'First parameter');
   if (IsReadableStreamLocked(stream)) {
    throw new TypeError('This stream has already been locked for exclusive reading by another reader');
   }
   ReadableStreamReaderGenericInitialize(this, stream);
   this._readRequests = new SimpleQueue();
  }
  Object.defineProperty(ReadableStreamDefaultReader.prototype, "closed", {
   get: function () {
    if (!IsReadableStreamDefaultReader(this)) {
     return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
    }
    return this._closedPromise;
   },
   enumerable: false,
   configurable: true
  });
  ReadableStreamDefaultReader.prototype.cancel = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsReadableStreamDefaultReader(this)) {
    return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
   }
   if (this._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('cancel'));
   }
   return ReadableStreamReaderGenericCancel(this, reason);
  };
  ReadableStreamDefaultReader.prototype.read = function () {
   if (!IsReadableStreamDefaultReader(this)) {
    return promiseRejectedWith(defaultReaderBrandCheckException('read'));
   }
   if (this._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('read from'));
   }
   var resolvePromise;
   var rejectPromise;
   var promise = newPromise(function (resolve, reject) {
    resolvePromise = resolve;
    rejectPromise = reject;
   });
   var readRequest = {
    _chunkSteps: function (chunk) {
     return resolvePromise({
      value: chunk,
      done: false
     });
    },
    _closeSteps: function () {
     return resolvePromise({
      value: undefined,
      done: true
     });
    },
    _errorSteps: function (e) {
     return rejectPromise(e);
    }
   };
   ReadableStreamDefaultReaderRead(this, readRequest);
   return promise;
  };
  ReadableStreamDefaultReader.prototype.releaseLock = function () {
   if (!IsReadableStreamDefaultReader(this)) {
    throw defaultReaderBrandCheckException('releaseLock');
   }
   if (this._ownerReadableStream === undefined) {
    return;
   }
   if (this._readRequests.length > 0) {
    throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
   }
   ReadableStreamReaderGenericRelease(this);
  };
  return ReadableStreamDefaultReader;
 }();
 Object.defineProperties(ReadableStreamDefaultReader.prototype, {
  cancel: { enumerable: true },
  read: { enumerable: true },
  releaseLock: { enumerable: true },
  closed: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableStreamDefaultReader',
   configurable: true
  });
 }
 function IsReadableStreamDefaultReader(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
   return false;
  }
  return true;
 }
 function ReadableStreamDefaultReaderRead(reader, readRequest) {
  var stream = reader._ownerReadableStream;
  stream._disturbed = true;
  if (stream._state === 'closed') {
   readRequest._closeSteps();
  } else if (stream._state === 'errored') {
   readRequest._errorSteps(stream._storedError);
  } else {
   stream._readableStreamController[PullSteps](readRequest);
  }
 }
 function defaultReaderBrandCheckException(name) {
  return new TypeError("ReadableStreamDefaultReader.prototype." + name + " can only be used on a ReadableStreamDefaultReader");
 }
 var _a;
 var AsyncIteratorPrototype;
 if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
  AsyncIteratorPrototype = (_a = {}, _a[SymbolPolyfill.asyncIterator] = function () {
   return this;
  }, _a);
  Object.defineProperty(AsyncIteratorPrototype, SymbolPolyfill.asyncIterator, { enumerable: false });
 }
 var ReadableStreamAsyncIteratorImpl = function () {
  function ReadableStreamAsyncIteratorImpl(reader, preventCancel) {
   this._ongoingPromise = undefined;
   this._isFinished = false;
   this._reader = reader;
   this._preventCancel = preventCancel;
  }
  ReadableStreamAsyncIteratorImpl.prototype.next = function () {
   var _this = this;
   var nextSteps = function () {
    return _this._nextSteps();
   };
   this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
   return this._ongoingPromise;
  };
  ReadableStreamAsyncIteratorImpl.prototype.return = function (value) {
   var _this = this;
   var returnSteps = function () {
    return _this._returnSteps(value);
   };
   return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
  };
  ReadableStreamAsyncIteratorImpl.prototype._nextSteps = function () {
   var _this = this;
   if (this._isFinished) {
    return Promise.resolve({
     value: undefined,
     done: true
    });
   }
   var reader = this._reader;
   if (reader._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('iterate'));
   }
   var resolvePromise;
   var rejectPromise;
   var promise = newPromise(function (resolve, reject) {
    resolvePromise = resolve;
    rejectPromise = reject;
   });
   var readRequest = {
    _chunkSteps: function (chunk) {
     _this._ongoingPromise = undefined;
     queueMicrotask(function () {
      return resolvePromise({
       value: chunk,
       done: false
      });
     });
    },
    _closeSteps: function () {
     _this._ongoingPromise = undefined;
     _this._isFinished = true;
     ReadableStreamReaderGenericRelease(reader);
     resolvePromise({
      value: undefined,
      done: true
     });
    },
    _errorSteps: function (reason) {
     _this._ongoingPromise = undefined;
     _this._isFinished = true;
     ReadableStreamReaderGenericRelease(reader);
     rejectPromise(reason);
    }
   };
   ReadableStreamDefaultReaderRead(reader, readRequest);
   return promise;
  };
  ReadableStreamAsyncIteratorImpl.prototype._returnSteps = function (value) {
   if (this._isFinished) {
    return Promise.resolve({
     value: value,
     done: true
    });
   }
   this._isFinished = true;
   var reader = this._reader;
   if (reader._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('finish iterating'));
   }
   if (!this._preventCancel) {
    var result = ReadableStreamReaderGenericCancel(reader, value);
    ReadableStreamReaderGenericRelease(reader);
    return transformPromiseWith(result, function () {
     return {
      value: value,
      done: true
     };
    });
   }
   ReadableStreamReaderGenericRelease(reader);
   return promiseResolvedWith({
    value: value,
    done: true
   });
  };
  return ReadableStreamAsyncIteratorImpl;
 }();
 var ReadableStreamAsyncIteratorPrototype = {
  next: function () {
   if (!IsReadableStreamAsyncIterator(this)) {
    return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
   }
   return this._asyncIteratorImpl.next();
  },
  return: function (value) {
   if (!IsReadableStreamAsyncIterator(this)) {
    return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
   }
   return this._asyncIteratorImpl.return(value);
  }
 };
 if (AsyncIteratorPrototype !== undefined) {
  Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
 }
 function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
  var reader = AcquireReadableStreamDefaultReader(stream);
  var impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
  iterator._asyncIteratorImpl = impl;
  return iterator;
 }
 function IsReadableStreamAsyncIterator(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
   return false;
  }
  return true;
 }
 function streamAsyncIteratorBrandCheckException(name) {
  return new TypeError("ReadableStreamAsyncIterator." + name + " can only be used on a ReadableSteamAsyncIterator");
 }
 var NumberIsNaN = Number.isNaN || function (x) {
  return x !== x;
 };
 function IsFiniteNonNegativeNumber(v) {
  if (!IsNonNegativeNumber(v)) {
   return false;
  }
  if (v === Infinity) {
   return false;
  }
  return true;
 }
 function IsNonNegativeNumber(v) {
  if (typeof v !== 'number') {
   return false;
  }
  if (NumberIsNaN(v)) {
   return false;
  }
  if (v < 0) {
   return false;
  }
  return true;
 }
 function DequeueValue(container) {
  var pair = container._queue.shift();
  container._queueTotalSize -= pair.size;
  if (container._queueTotalSize < 0) {
   container._queueTotalSize = 0;
  }
  return pair.value;
 }
 function EnqueueValueWithSize(container, value, size) {
  size = Number(size);
  if (!IsFiniteNonNegativeNumber(size)) {
   throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
  }
  container._queue.push({
   value: value,
   size: size
  });
  container._queueTotalSize += size;
 }
 function PeekQueueValue(container) {
  var pair = container._queue.peek();
  return pair.value;
 }
 function ResetQueue(container) {
  container._queue = new SimpleQueue();
  container._queueTotalSize = 0;
 }
 function CreateArrayFromList(elements) {
  return elements.slice();
 }
 function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
  new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
 }
 function TransferArrayBuffer(O) {
  return O;
 }
 function IsDetachedBuffer(O) {
  return false;
 }
 var ReadableStreamBYOBRequest = function () {
  function ReadableStreamBYOBRequest() {
   throw new TypeError('Illegal constructor');
  }
  Object.defineProperty(ReadableStreamBYOBRequest.prototype, "view", {
   get: function () {
    if (!IsReadableStreamBYOBRequest(this)) {
     throw byobRequestBrandCheckException('view');
    }
    return this._view;
   },
   enumerable: false,
   configurable: true
  });
  ReadableStreamBYOBRequest.prototype.respond = function (bytesWritten) {
   if (!IsReadableStreamBYOBRequest(this)) {
    throw byobRequestBrandCheckException('respond');
   }
   assertRequiredArgument(bytesWritten, 1, 'respond');
   bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
   if (this._associatedReadableByteStreamController === undefined) {
    throw new TypeError('This BYOB request has been invalidated');
   }
   if (IsDetachedBuffer(this._view.buffer));
   ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
  };
  ReadableStreamBYOBRequest.prototype.respondWithNewView = function (view) {
   if (!IsReadableStreamBYOBRequest(this)) {
    throw byobRequestBrandCheckException('respondWithNewView');
   }
   assertRequiredArgument(view, 1, 'respondWithNewView');
   if (!ArrayBuffer.isView(view)) {
    throw new TypeError('You can only respond with array buffer views');
   }
   if (view.byteLength === 0) {
    throw new TypeError('chunk must have non-zero byteLength');
   }
   if (view.buffer.byteLength === 0) {
    throw new TypeError("chunk's buffer must have non-zero byteLength");
   }
   if (this._associatedReadableByteStreamController === undefined) {
    throw new TypeError('This BYOB request has been invalidated');
   }
   ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
  };
  return ReadableStreamBYOBRequest;
 }();
 Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
  respond: { enumerable: true },
  respondWithNewView: { enumerable: true },
  view: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableStreamBYOBRequest',
   configurable: true
  });
 }
 var ReadableByteStreamController = function () {
  function ReadableByteStreamController() {
   throw new TypeError('Illegal constructor');
  }
  Object.defineProperty(ReadableByteStreamController.prototype, "byobRequest", {
   get: function () {
    if (!IsReadableByteStreamController(this)) {
     throw byteStreamControllerBrandCheckException('byobRequest');
    }
    if (this._byobRequest === null && this._pendingPullIntos.length > 0) {
     var firstDescriptor = this._pendingPullIntos.peek();
     var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
     var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
     SetUpReadableStreamBYOBRequest(byobRequest, this, view);
     this._byobRequest = byobRequest;
    }
    return this._byobRequest;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(ReadableByteStreamController.prototype, "desiredSize", {
   get: function () {
    if (!IsReadableByteStreamController(this)) {
     throw byteStreamControllerBrandCheckException('desiredSize');
    }
    return ReadableByteStreamControllerGetDesiredSize(this);
   },
   enumerable: false,
   configurable: true
  });
  ReadableByteStreamController.prototype.close = function () {
   if (!IsReadableByteStreamController(this)) {
    throw byteStreamControllerBrandCheckException('close');
   }
   if (this._closeRequested) {
    throw new TypeError('The stream has already been closed; do not close it again!');
   }
   var state = this._controlledReadableByteStream._state;
   if (state !== 'readable') {
    throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be closed");
   }
   ReadableByteStreamControllerClose(this);
  };
  ReadableByteStreamController.prototype.enqueue = function (chunk) {
   if (!IsReadableByteStreamController(this)) {
    throw byteStreamControllerBrandCheckException('enqueue');
   }
   assertRequiredArgument(chunk, 1, 'enqueue');
   if (!ArrayBuffer.isView(chunk)) {
    throw new TypeError('chunk must be an array buffer view');
   }
   if (chunk.byteLength === 0) {
    throw new TypeError('chunk must have non-zero byteLength');
   }
   if (chunk.buffer.byteLength === 0) {
    throw new TypeError("chunk's buffer must have non-zero byteLength");
   }
   if (this._closeRequested) {
    throw new TypeError('stream is closed or draining');
   }
   var state = this._controlledReadableByteStream._state;
   if (state !== 'readable') {
    throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be enqueued to");
   }
   ReadableByteStreamControllerEnqueue(this, chunk);
  };
  ReadableByteStreamController.prototype.error = function (e) {
   if (e === void 0) {
    e = undefined;
   }
   if (!IsReadableByteStreamController(this)) {
    throw byteStreamControllerBrandCheckException('error');
   }
   ReadableByteStreamControllerError(this, e);
  };
  ReadableByteStreamController.prototype[CancelSteps] = function (reason) {
   if (this._pendingPullIntos.length > 0) {
    var firstDescriptor = this._pendingPullIntos.peek();
    firstDescriptor.bytesFilled = 0;
   }
   ResetQueue(this);
   var result = this._cancelAlgorithm(reason);
   ReadableByteStreamControllerClearAlgorithms(this);
   return result;
  };
  ReadableByteStreamController.prototype[PullSteps] = function (readRequest) {
   var stream = this._controlledReadableByteStream;
   if (this._queueTotalSize > 0) {
    var entry = this._queue.shift();
    this._queueTotalSize -= entry.byteLength;
    ReadableByteStreamControllerHandleQueueDrain(this);
    var view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
    readRequest._chunkSteps(view);
    return;
   }
   var autoAllocateChunkSize = this._autoAllocateChunkSize;
   if (autoAllocateChunkSize !== undefined) {
    var buffer = void 0;
    try {
     buffer = new ArrayBuffer(autoAllocateChunkSize);
    } catch (bufferE) {
     readRequest._errorSteps(bufferE);
     return;
    }
    var pullIntoDescriptor = {
     buffer: buffer,
     byteOffset: 0,
     byteLength: autoAllocateChunkSize,
     bytesFilled: 0,
     elementSize: 1,
     viewConstructor: Uint8Array,
     readerType: 'default'
    };
    this._pendingPullIntos.push(pullIntoDescriptor);
   }
   ReadableStreamAddReadRequest(stream, readRequest);
   ReadableByteStreamControllerCallPullIfNeeded(this);
  };
  return ReadableByteStreamController;
 }();
 Object.defineProperties(ReadableByteStreamController.prototype, {
  close: { enumerable: true },
  enqueue: { enumerable: true },
  error: { enumerable: true },
  byobRequest: { enumerable: true },
  desiredSize: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableByteStreamController',
   configurable: true
  });
 }
 function IsReadableByteStreamController(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
   return false;
  }
  return true;
 }
 function IsReadableStreamBYOBRequest(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
   return false;
  }
  return true;
 }
 function ReadableByteStreamControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
  if (!shouldPull) {
   return;
  }
  if (controller._pulling) {
   controller._pullAgain = true;
   return;
  }
  controller._pulling = true;
  var pullPromise = controller._pullAlgorithm();
  uponPromise(pullPromise, function () {
   controller._pulling = false;
   if (controller._pullAgain) {
    controller._pullAgain = false;
    ReadableByteStreamControllerCallPullIfNeeded(controller);
   }
  }, function (e) {
   ReadableByteStreamControllerError(controller, e);
  });
 }
 function ReadableByteStreamControllerClearPendingPullIntos(controller) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  controller._pendingPullIntos = new SimpleQueue();
 }
 function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
  var done = false;
  if (stream._state === 'closed') {
   done = true;
  }
  var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
  if (pullIntoDescriptor.readerType === 'default') {
   ReadableStreamFulfillReadRequest(stream, filledView, done);
  } else {
   ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
  }
 }
 function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
  var bytesFilled = pullIntoDescriptor.bytesFilled;
  var elementSize = pullIntoDescriptor.elementSize;
  return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
 }
 function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
  controller._queue.push({
   buffer: buffer,
   byteOffset: byteOffset,
   byteLength: byteLength
  });
  controller._queueTotalSize += byteLength;
 }
 function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
  var elementSize = pullIntoDescriptor.elementSize;
  var currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
  var maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
  var maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
  var maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
  var totalBytesToCopyRemaining = maxBytesToCopy;
  var ready = false;
  if (maxAlignedBytes > currentAlignedBytes) {
   totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
   ready = true;
  }
  var queue = controller._queue;
  while (totalBytesToCopyRemaining > 0) {
   var headOfQueue = queue.peek();
   var bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
   var destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
   CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
   if (headOfQueue.byteLength === bytesToCopy) {
    queue.shift();
   } else {
    headOfQueue.byteOffset += bytesToCopy;
    headOfQueue.byteLength -= bytesToCopy;
   }
   controller._queueTotalSize -= bytesToCopy;
   ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
   totalBytesToCopyRemaining -= bytesToCopy;
  }
  return ready;
 }
 function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  pullIntoDescriptor.bytesFilled += size;
 }
 function ReadableByteStreamControllerHandleQueueDrain(controller) {
  if (controller._queueTotalSize === 0 && controller._closeRequested) {
   ReadableByteStreamControllerClearAlgorithms(controller);
   ReadableStreamClose(controller._controlledReadableByteStream);
  } else {
   ReadableByteStreamControllerCallPullIfNeeded(controller);
  }
 }
 function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
  if (controller._byobRequest === null) {
   return;
  }
  controller._byobRequest._associatedReadableByteStreamController = undefined;
  controller._byobRequest._view = null;
  controller._byobRequest = null;
 }
 function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
  while (controller._pendingPullIntos.length > 0) {
   if (controller._queueTotalSize === 0) {
    return;
   }
   var pullIntoDescriptor = controller._pendingPullIntos.peek();
   if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
    ReadableByteStreamControllerShiftPendingPullInto(controller);
    ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
   }
  }
 }
 function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
  var stream = controller._controlledReadableByteStream;
  var elementSize = 1;
  if (view.constructor !== DataView) {
   elementSize = view.constructor.BYTES_PER_ELEMENT;
  }
  var ctor = view.constructor;
  var buffer = TransferArrayBuffer(view.buffer);
  var pullIntoDescriptor = {
   buffer: buffer,
   byteOffset: view.byteOffset,
   byteLength: view.byteLength,
   bytesFilled: 0,
   elementSize: elementSize,
   viewConstructor: ctor,
   readerType: 'byob'
  };
  if (controller._pendingPullIntos.length > 0) {
   controller._pendingPullIntos.push(pullIntoDescriptor);
   ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
   return;
  }
  if (stream._state === 'closed') {
   var emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
   readIntoRequest._closeSteps(emptyView);
   return;
  }
  if (controller._queueTotalSize > 0) {
   if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
    var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
    ReadableByteStreamControllerHandleQueueDrain(controller);
    readIntoRequest._chunkSteps(filledView);
    return;
   }
   if (controller._closeRequested) {
    var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
    ReadableByteStreamControllerError(controller, e);
    readIntoRequest._errorSteps(e);
    return;
   }
  }
  controller._pendingPullIntos.push(pullIntoDescriptor);
  ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
  ReadableByteStreamControllerCallPullIfNeeded(controller);
 }
 function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
  firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
  var stream = controller._controlledReadableByteStream;
  if (ReadableStreamHasBYOBReader(stream)) {
   while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
    var pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
    ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
   }
  }
 }
 function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
  if (pullIntoDescriptor.bytesFilled + bytesWritten > pullIntoDescriptor.byteLength) {
   throw new RangeError('bytesWritten out of range');
  }
  ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
  if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
   return;
  }
  ReadableByteStreamControllerShiftPendingPullInto(controller);
  var remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
  if (remainderSize > 0) {
   var end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
   var remainder = pullIntoDescriptor.buffer.slice(end - remainderSize, end);
   ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
  }
  pullIntoDescriptor.buffer = TransferArrayBuffer(pullIntoDescriptor.buffer);
  pullIntoDescriptor.bytesFilled -= remainderSize;
  ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
  ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
 }
 function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
  var firstDescriptor = controller._pendingPullIntos.peek();
  var state = controller._controlledReadableByteStream._state;
  if (state === 'closed') {
   if (bytesWritten !== 0) {
    throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
   }
   ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
  } else {
   ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
  }
  ReadableByteStreamControllerCallPullIfNeeded(controller);
 }
 function ReadableByteStreamControllerShiftPendingPullInto(controller) {
  var descriptor = controller._pendingPullIntos.shift();
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  return descriptor;
 }
 function ReadableByteStreamControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableByteStream;
  if (stream._state !== 'readable') {
   return false;
  }
  if (controller._closeRequested) {
   return false;
  }
  if (!controller._started) {
   return false;
  }
  if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
   return true;
  }
  if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
   return true;
  }
  var desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
  if (desiredSize > 0) {
   return true;
  }
  return false;
 }
 function ReadableByteStreamControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = undefined;
  controller._cancelAlgorithm = undefined;
 }
 function ReadableByteStreamControllerClose(controller) {
  var stream = controller._controlledReadableByteStream;
  if (controller._closeRequested || stream._state !== 'readable') {
   return;
  }
  if (controller._queueTotalSize > 0) {
   controller._closeRequested = true;
   return;
  }
  if (controller._pendingPullIntos.length > 0) {
   var firstPendingPullInto = controller._pendingPullIntos.peek();
   if (firstPendingPullInto.bytesFilled > 0) {
    var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
    ReadableByteStreamControllerError(controller, e);
    throw e;
   }
  }
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamClose(stream);
 }
 function ReadableByteStreamControllerEnqueue(controller, chunk) {
  var stream = controller._controlledReadableByteStream;
  if (controller._closeRequested || stream._state !== 'readable') {
   return;
  }
  var buffer = chunk.buffer;
  var byteOffset = chunk.byteOffset;
  var byteLength = chunk.byteLength;
  var transferredBuffer = TransferArrayBuffer(buffer);
  if (ReadableStreamHasDefaultReader(stream)) {
   if (ReadableStreamGetNumReadRequests(stream) === 0) {
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
   } else {
    var transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
    ReadableStreamFulfillReadRequest(stream, transferredView, false);
   }
  } else if (ReadableStreamHasBYOBReader(stream)) {
   ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
   ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
  } else {
   ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
  }
  ReadableByteStreamControllerCallPullIfNeeded(controller);
 }
 function ReadableByteStreamControllerError(controller, e) {
  var stream = controller._controlledReadableByteStream;
  if (stream._state !== 'readable') {
   return;
  }
  ReadableByteStreamControllerClearPendingPullIntos(controller);
  ResetQueue(controller);
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e);
 }
 function ReadableByteStreamControllerGetDesiredSize(controller) {
  var state = controller._controlledReadableByteStream._state;
  if (state === 'errored') {
   return null;
  }
  if (state === 'closed') {
   return 0;
  }
  return controller._strategyHWM - controller._queueTotalSize;
 }
 function ReadableByteStreamControllerRespond(controller, bytesWritten) {
  bytesWritten = Number(bytesWritten);
  if (!IsFiniteNonNegativeNumber(bytesWritten)) {
   throw new RangeError('bytesWritten must be a finite');
  }
  ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
 }
 function ReadableByteStreamControllerRespondWithNewView(controller, view) {
  var firstDescriptor = controller._pendingPullIntos.peek();
  if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
   throw new RangeError('The region specified by view does not match byobRequest');
  }
  if (firstDescriptor.byteLength !== view.byteLength) {
   throw new RangeError('The buffer of view has different capacity than byobRequest');
  }
  firstDescriptor.buffer = view.buffer;
  ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
 }
 function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
  controller._controlledReadableByteStream = stream;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._byobRequest = null;
  controller._queue = controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._closeRequested = false;
  controller._started = false;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  controller._autoAllocateChunkSize = autoAllocateChunkSize;
  controller._pendingPullIntos = new SimpleQueue();
  stream._readableStreamController = controller;
  var startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), function () {
   controller._started = true;
   ReadableByteStreamControllerCallPullIfNeeded(controller);
  }, function (r) {
   ReadableByteStreamControllerError(controller, r);
  });
 }
 function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
  var controller = Object.create(ReadableByteStreamController.prototype);
  var startAlgorithm = function () {
   return undefined;
  };
  var pullAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  var cancelAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  if (underlyingByteSource.start !== undefined) {
   startAlgorithm = function () {
    return underlyingByteSource.start(controller);
   };
  }
  if (underlyingByteSource.pull !== undefined) {
   pullAlgorithm = function () {
    return underlyingByteSource.pull(controller);
   };
  }
  if (underlyingByteSource.cancel !== undefined) {
   cancelAlgorithm = function (reason) {
    return underlyingByteSource.cancel(reason);
   };
  }
  var autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
 }
 function SetUpReadableStreamBYOBRequest(request, controller, view) {
  request._associatedReadableByteStreamController = controller;
  request._view = view;
 }
 function byobRequestBrandCheckException(name) {
  return new TypeError("ReadableStreamBYOBRequest.prototype." + name + " can only be used on a ReadableStreamBYOBRequest");
 }
 function byteStreamControllerBrandCheckException(name) {
  return new TypeError("ReadableByteStreamController.prototype." + name + " can only be used on a ReadableByteStreamController");
 }
 function AcquireReadableStreamBYOBReader(stream) {
  return new ReadableStreamBYOBReader(stream);
 }
 function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
  stream._reader._readIntoRequests.push(readIntoRequest);
 }
 function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
  var reader = stream._reader;
  var readIntoRequest = reader._readIntoRequests.shift();
  if (done) {
   readIntoRequest._closeSteps(chunk);
  } else {
   readIntoRequest._chunkSteps(chunk);
  }
 }
 function ReadableStreamGetNumReadIntoRequests(stream) {
  return stream._reader._readIntoRequests.length;
 }
 function ReadableStreamHasBYOBReader(stream) {
  var reader = stream._reader;
  if (reader === undefined) {
   return false;
  }
  if (!IsReadableStreamBYOBReader(reader)) {
   return false;
  }
  return true;
 }
 var ReadableStreamBYOBReader = function () {
  function ReadableStreamBYOBReader(stream) {
   assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
   assertReadableStream(stream, 'First parameter');
   if (IsReadableStreamLocked(stream)) {
    throw new TypeError('This stream has already been locked for exclusive reading by another reader');
   }
   if (!IsReadableByteStreamController(stream._readableStreamController)) {
    throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' + 'source');
   }
   ReadableStreamReaderGenericInitialize(this, stream);
   this._readIntoRequests = new SimpleQueue();
  }
  Object.defineProperty(ReadableStreamBYOBReader.prototype, "closed", {
   get: function () {
    if (!IsReadableStreamBYOBReader(this)) {
     return promiseRejectedWith(byobReaderBrandCheckException('closed'));
    }
    return this._closedPromise;
   },
   enumerable: false,
   configurable: true
  });
  ReadableStreamBYOBReader.prototype.cancel = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsReadableStreamBYOBReader(this)) {
    return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
   }
   if (this._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('cancel'));
   }
   return ReadableStreamReaderGenericCancel(this, reason);
  };
  ReadableStreamBYOBReader.prototype.read = function (view) {
   if (!IsReadableStreamBYOBReader(this)) {
    return promiseRejectedWith(byobReaderBrandCheckException('read'));
   }
   if (!ArrayBuffer.isView(view)) {
    return promiseRejectedWith(new TypeError('view must be an array buffer view'));
   }
   if (view.byteLength === 0) {
    return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
   }
   if (view.buffer.byteLength === 0) {
    return promiseRejectedWith(new TypeError("view's buffer must have non-zero byteLength"));
   }
   if (this._ownerReadableStream === undefined) {
    return promiseRejectedWith(readerLockException('read from'));
   }
   var resolvePromise;
   var rejectPromise;
   var promise = newPromise(function (resolve, reject) {
    resolvePromise = resolve;
    rejectPromise = reject;
   });
   var readIntoRequest = {
    _chunkSteps: function (chunk) {
     return resolvePromise({
      value: chunk,
      done: false
     });
    },
    _closeSteps: function (chunk) {
     return resolvePromise({
      value: chunk,
      done: true
     });
    },
    _errorSteps: function (e) {
     return rejectPromise(e);
    }
   };
   ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
   return promise;
  };
  ReadableStreamBYOBReader.prototype.releaseLock = function () {
   if (!IsReadableStreamBYOBReader(this)) {
    throw byobReaderBrandCheckException('releaseLock');
   }
   if (this._ownerReadableStream === undefined) {
    return;
   }
   if (this._readIntoRequests.length > 0) {
    throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
   }
   ReadableStreamReaderGenericRelease(this);
  };
  return ReadableStreamBYOBReader;
 }();
 Object.defineProperties(ReadableStreamBYOBReader.prototype, {
  cancel: { enumerable: true },
  read: { enumerable: true },
  releaseLock: { enumerable: true },
  closed: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableStreamBYOBReader',
   configurable: true
  });
 }
 function IsReadableStreamBYOBReader(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
   return false;
  }
  return true;
 }
 function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
  var stream = reader._ownerReadableStream;
  stream._disturbed = true;
  if (stream._state === 'errored') {
   readIntoRequest._errorSteps(stream._storedError);
  } else {
   ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
  }
 }
 function byobReaderBrandCheckException(name) {
  return new TypeError("ReadableStreamBYOBReader.prototype." + name + " can only be used on a ReadableStreamBYOBReader");
 }
 function ExtractHighWaterMark(strategy, defaultHWM) {
  var highWaterMark = strategy.highWaterMark;
  if (highWaterMark === undefined) {
   return defaultHWM;
  }
  if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
   throw new RangeError('Invalid highWaterMark');
  }
  return highWaterMark;
 }
 function ExtractSizeAlgorithm(strategy) {
  var size = strategy.size;
  if (!size) {
   return function () {
    return 1;
   };
  }
  return size;
 }
 function convertQueuingStrategy(init, context) {
  assertDictionary(init, context);
  var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  var size = init === null || init === void 0 ? void 0 : init.size;
  return {
   highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
   size: size === undefined ? undefined : convertQueuingStrategySize(size, context + " has member 'size' that")
  };
 }
 function convertQueuingStrategySize(fn, context) {
  assertFunction(fn, context);
  return function (chunk) {
   return convertUnrestrictedDouble(fn(chunk));
  };
 }
 function convertUnderlyingSink(original, context) {
  assertDictionary(original, context);
  var abort = original === null || original === void 0 ? void 0 : original.abort;
  var close = original === null || original === void 0 ? void 0 : original.close;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var type = original === null || original === void 0 ? void 0 : original.type;
  var write = original === null || original === void 0 ? void 0 : original.write;
  return {
   abort: abort === undefined ? undefined : convertUnderlyingSinkAbortCallback(abort, original, context + " has member 'abort' that"),
   close: close === undefined ? undefined : convertUnderlyingSinkCloseCallback(close, original, context + " has member 'close' that"),
   start: start === undefined ? undefined : convertUnderlyingSinkStartCallback(start, original, context + " has member 'start' that"),
   write: write === undefined ? undefined : convertUnderlyingSinkWriteCallback(write, original, context + " has member 'write' that"),
   type: type
  };
 }
 function convertUnderlyingSinkAbortCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (reason) {
   return promiseCall(fn, original, [reason]);
  };
 }
 function convertUnderlyingSinkCloseCallback(fn, original, context) {
  assertFunction(fn, context);
  return function () {
   return promiseCall(fn, original, []);
  };
 }
 function convertUnderlyingSinkStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
   return reflectCall(fn, original, [controller]);
  };
 }
 function convertUnderlyingSinkWriteCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (chunk, controller) {
   return promiseCall(fn, original, [
    chunk,
    controller
   ]);
  };
 }
 function assertWritableStream(x, context) {
  if (!IsWritableStream(x)) {
   throw new TypeError(context + " is not a WritableStream.");
  }
 }
 var WritableStream = function () {
  function WritableStream(rawUnderlyingSink, rawStrategy) {
   if (rawUnderlyingSink === void 0) {
    rawUnderlyingSink = {};
   }
   if (rawStrategy === void 0) {
    rawStrategy = {};
   }
   if (rawUnderlyingSink === undefined) {
    rawUnderlyingSink = null;
   } else {
    assertObject(rawUnderlyingSink, 'First parameter');
   }
   var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
   var underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
   InitializeWritableStream(this);
   var type = underlyingSink.type;
   if (type !== undefined) {
    throw new RangeError('Invalid type is specified');
   }
   var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
   var highWaterMark = ExtractHighWaterMark(strategy, 1);
   SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
  }
  Object.defineProperty(WritableStream.prototype, "locked", {
   get: function () {
    if (!IsWritableStream(this)) {
     throw streamBrandCheckException('locked');
    }
    return IsWritableStreamLocked(this);
   },
   enumerable: false,
   configurable: true
  });
  WritableStream.prototype.abort = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsWritableStream(this)) {
    return promiseRejectedWith(streamBrandCheckException('abort'));
   }
   if (IsWritableStreamLocked(this)) {
    return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
   }
   return WritableStreamAbort(this, reason);
  };
  WritableStream.prototype.close = function () {
   if (!IsWritableStream(this)) {
    return promiseRejectedWith(streamBrandCheckException('close'));
   }
   if (IsWritableStreamLocked(this)) {
    return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
   }
   if (WritableStreamCloseQueuedOrInFlight(this)) {
    return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
   }
   return WritableStreamClose(this);
  };
  WritableStream.prototype.getWriter = function () {
   if (!IsWritableStream(this)) {
    throw streamBrandCheckException('getWriter');
   }
   return AcquireWritableStreamDefaultWriter(this);
  };
  return WritableStream;
 }();
 Object.defineProperties(WritableStream.prototype, {
  abort: { enumerable: true },
  close: { enumerable: true },
  getWriter: { enumerable: true },
  locked: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
   value: 'WritableStream',
   configurable: true
  });
 }
 function AcquireWritableStreamDefaultWriter(stream) {
  return new WritableStreamDefaultWriter(stream);
 }
 function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  if (highWaterMark === void 0) {
   highWaterMark = 1;
  }
  if (sizeAlgorithm === void 0) {
   sizeAlgorithm = function () {
    return 1;
   };
  }
  var stream = Object.create(WritableStream.prototype);
  InitializeWritableStream(stream);
  var controller = Object.create(WritableStreamDefaultController.prototype);
  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
 }
 function InitializeWritableStream(stream) {
  stream._state = 'writable';
  stream._storedError = undefined;
  stream._writer = undefined;
  stream._writableStreamController = undefined;
  stream._writeRequests = new SimpleQueue();
  stream._inFlightWriteRequest = undefined;
  stream._closeRequest = undefined;
  stream._inFlightCloseRequest = undefined;
  stream._pendingAbortRequest = undefined;
  stream._backpressure = false;
 }
 function IsWritableStream(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
   return false;
  }
  return true;
 }
 function IsWritableStreamLocked(stream) {
  if (stream._writer === undefined) {
   return false;
  }
  return true;
 }
 function WritableStreamAbort(stream, reason) {
  var state = stream._state;
  if (state === 'closed' || state === 'errored') {
   return promiseResolvedWith(undefined);
  }
  if (stream._pendingAbortRequest !== undefined) {
   return stream._pendingAbortRequest._promise;
  }
  var wasAlreadyErroring = false;
  if (state === 'erroring') {
   wasAlreadyErroring = true;
   reason = undefined;
  }
  var promise = newPromise(function (resolve, reject) {
   stream._pendingAbortRequest = {
    _promise: undefined,
    _resolve: resolve,
    _reject: reject,
    _reason: reason,
    _wasAlreadyErroring: wasAlreadyErroring
   };
  });
  stream._pendingAbortRequest._promise = promise;
  if (!wasAlreadyErroring) {
   WritableStreamStartErroring(stream, reason);
  }
  return promise;
 }
 function WritableStreamClose(stream) {
  var state = stream._state;
  if (state === 'closed' || state === 'errored') {
   return promiseRejectedWith(new TypeError("The stream (in " + state + " state) is not in the writable state and cannot be closed"));
  }
  var promise = newPromise(function (resolve, reject) {
   var closeRequest = {
    _resolve: resolve,
    _reject: reject
   };
   stream._closeRequest = closeRequest;
  });
  var writer = stream._writer;
  if (writer !== undefined && stream._backpressure && state === 'writable') {
   defaultWriterReadyPromiseResolve(writer);
  }
  WritableStreamDefaultControllerClose(stream._writableStreamController);
  return promise;
 }
 function WritableStreamAddWriteRequest(stream) {
  var promise = newPromise(function (resolve, reject) {
   var writeRequest = {
    _resolve: resolve,
    _reject: reject
   };
   stream._writeRequests.push(writeRequest);
  });
  return promise;
 }
 function WritableStreamDealWithRejection(stream, error) {
  var state = stream._state;
  if (state === 'writable') {
   WritableStreamStartErroring(stream, error);
   return;
  }
  WritableStreamFinishErroring(stream);
 }
 function WritableStreamStartErroring(stream, reason) {
  var controller = stream._writableStreamController;
  stream._state = 'erroring';
  stream._storedError = reason;
  var writer = stream._writer;
  if (writer !== undefined) {
   WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
  }
  if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
   WritableStreamFinishErroring(stream);
  }
 }
 function WritableStreamFinishErroring(stream) {
  stream._state = 'errored';
  stream._writableStreamController[ErrorSteps]();
  var storedError = stream._storedError;
  stream._writeRequests.forEach(function (writeRequest) {
   writeRequest._reject(storedError);
  });
  stream._writeRequests = new SimpleQueue();
  if (stream._pendingAbortRequest === undefined) {
   WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
   return;
  }
  var abortRequest = stream._pendingAbortRequest;
  stream._pendingAbortRequest = undefined;
  if (abortRequest._wasAlreadyErroring) {
   abortRequest._reject(storedError);
   WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
   return;
  }
  var promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
  uponPromise(promise, function () {
   abortRequest._resolve();
   WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  }, function (reason) {
   abortRequest._reject(reason);
   WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  });
 }
 function WritableStreamFinishInFlightWrite(stream) {
  stream._inFlightWriteRequest._resolve(undefined);
  stream._inFlightWriteRequest = undefined;
 }
 function WritableStreamFinishInFlightWriteWithError(stream, error) {
  stream._inFlightWriteRequest._reject(error);
  stream._inFlightWriteRequest = undefined;
  WritableStreamDealWithRejection(stream, error);
 }
 function WritableStreamFinishInFlightClose(stream) {
  stream._inFlightCloseRequest._resolve(undefined);
  stream._inFlightCloseRequest = undefined;
  var state = stream._state;
  if (state === 'erroring') {
   stream._storedError = undefined;
   if (stream._pendingAbortRequest !== undefined) {
    stream._pendingAbortRequest._resolve();
    stream._pendingAbortRequest = undefined;
   }
  }
  stream._state = 'closed';
  var writer = stream._writer;
  if (writer !== undefined) {
   defaultWriterClosedPromiseResolve(writer);
  }
 }
 function WritableStreamFinishInFlightCloseWithError(stream, error) {
  stream._inFlightCloseRequest._reject(error);
  stream._inFlightCloseRequest = undefined;
  if (stream._pendingAbortRequest !== undefined) {
   stream._pendingAbortRequest._reject(error);
   stream._pendingAbortRequest = undefined;
  }
  WritableStreamDealWithRejection(stream, error);
 }
 function WritableStreamCloseQueuedOrInFlight(stream) {
  if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
   return false;
  }
  return true;
 }
 function WritableStreamHasOperationMarkedInFlight(stream) {
  if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
   return false;
  }
  return true;
 }
 function WritableStreamMarkCloseRequestInFlight(stream) {
  stream._inFlightCloseRequest = stream._closeRequest;
  stream._closeRequest = undefined;
 }
 function WritableStreamMarkFirstWriteRequestInFlight(stream) {
  stream._inFlightWriteRequest = stream._writeRequests.shift();
 }
 function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
  if (stream._closeRequest !== undefined) {
   stream._closeRequest._reject(stream._storedError);
   stream._closeRequest = undefined;
  }
  var writer = stream._writer;
  if (writer !== undefined) {
   defaultWriterClosedPromiseReject(writer, stream._storedError);
  }
 }
 function WritableStreamUpdateBackpressure(stream, backpressure) {
  var writer = stream._writer;
  if (writer !== undefined && backpressure !== stream._backpressure) {
   if (backpressure) {
    defaultWriterReadyPromiseReset(writer);
   } else {
    defaultWriterReadyPromiseResolve(writer);
   }
  }
  stream._backpressure = backpressure;
 }
 var WritableStreamDefaultWriter = function () {
  function WritableStreamDefaultWriter(stream) {
   assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
   assertWritableStream(stream, 'First parameter');
   if (IsWritableStreamLocked(stream)) {
    throw new TypeError('This stream has already been locked for exclusive writing by another writer');
   }
   this._ownerWritableStream = stream;
   stream._writer = this;
   var state = stream._state;
   if (state === 'writable') {
    if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
     defaultWriterReadyPromiseInitialize(this);
    } else {
     defaultWriterReadyPromiseInitializeAsResolved(this);
    }
    defaultWriterClosedPromiseInitialize(this);
   } else if (state === 'erroring') {
    defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
    defaultWriterClosedPromiseInitialize(this);
   } else if (state === 'closed') {
    defaultWriterReadyPromiseInitializeAsResolved(this);
    defaultWriterClosedPromiseInitializeAsResolved(this);
   } else {
    var storedError = stream._storedError;
    defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
    defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
   }
  }
  Object.defineProperty(WritableStreamDefaultWriter.prototype, "closed", {
   get: function () {
    if (!IsWritableStreamDefaultWriter(this)) {
     return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
    }
    return this._closedPromise;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(WritableStreamDefaultWriter.prototype, "desiredSize", {
   get: function () {
    if (!IsWritableStreamDefaultWriter(this)) {
     throw defaultWriterBrandCheckException('desiredSize');
    }
    if (this._ownerWritableStream === undefined) {
     throw defaultWriterLockException('desiredSize');
    }
    return WritableStreamDefaultWriterGetDesiredSize(this);
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(WritableStreamDefaultWriter.prototype, "ready", {
   get: function () {
    if (!IsWritableStreamDefaultWriter(this)) {
     return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
    }
    return this._readyPromise;
   },
   enumerable: false,
   configurable: true
  });
  WritableStreamDefaultWriter.prototype.abort = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsWritableStreamDefaultWriter(this)) {
    return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
   }
   if (this._ownerWritableStream === undefined) {
    return promiseRejectedWith(defaultWriterLockException('abort'));
   }
   return WritableStreamDefaultWriterAbort(this, reason);
  };
  WritableStreamDefaultWriter.prototype.close = function () {
   if (!IsWritableStreamDefaultWriter(this)) {
    return promiseRejectedWith(defaultWriterBrandCheckException('close'));
   }
   var stream = this._ownerWritableStream;
   if (stream === undefined) {
    return promiseRejectedWith(defaultWriterLockException('close'));
   }
   if (WritableStreamCloseQueuedOrInFlight(stream)) {
    return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
   }
   return WritableStreamDefaultWriterClose(this);
  };
  WritableStreamDefaultWriter.prototype.releaseLock = function () {
   if (!IsWritableStreamDefaultWriter(this)) {
    throw defaultWriterBrandCheckException('releaseLock');
   }
   var stream = this._ownerWritableStream;
   if (stream === undefined) {
    return;
   }
   WritableStreamDefaultWriterRelease(this);
  };
  WritableStreamDefaultWriter.prototype.write = function (chunk) {
   if (chunk === void 0) {
    chunk = undefined;
   }
   if (!IsWritableStreamDefaultWriter(this)) {
    return promiseRejectedWith(defaultWriterBrandCheckException('write'));
   }
   if (this._ownerWritableStream === undefined) {
    return promiseRejectedWith(defaultWriterLockException('write to'));
   }
   return WritableStreamDefaultWriterWrite(this, chunk);
  };
  return WritableStreamDefaultWriter;
 }();
 Object.defineProperties(WritableStreamDefaultWriter.prototype, {
  abort: { enumerable: true },
  close: { enumerable: true },
  releaseLock: { enumerable: true },
  write: { enumerable: true },
  closed: { enumerable: true },
  desiredSize: { enumerable: true },
  ready: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
   value: 'WritableStreamDefaultWriter',
   configurable: true
  });
 }
 function IsWritableStreamDefaultWriter(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
   return false;
  }
  return true;
 }
 function WritableStreamDefaultWriterAbort(writer, reason) {
  var stream = writer._ownerWritableStream;
  return WritableStreamAbort(stream, reason);
 }
 function WritableStreamDefaultWriterClose(writer) {
  var stream = writer._ownerWritableStream;
  return WritableStreamClose(stream);
 }
 function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
  var stream = writer._ownerWritableStream;
  var state = stream._state;
  if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
   return promiseResolvedWith(undefined);
  }
  if (state === 'errored') {
   return promiseRejectedWith(stream._storedError);
  }
  return WritableStreamDefaultWriterClose(writer);
 }
 function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
  if (writer._closedPromiseState === 'pending') {
   defaultWriterClosedPromiseReject(writer, error);
  } else {
   defaultWriterClosedPromiseResetToRejected(writer, error);
  }
 }
 function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
  if (writer._readyPromiseState === 'pending') {
   defaultWriterReadyPromiseReject(writer, error);
  } else {
   defaultWriterReadyPromiseResetToRejected(writer, error);
  }
 }
 function WritableStreamDefaultWriterGetDesiredSize(writer) {
  var stream = writer._ownerWritableStream;
  var state = stream._state;
  if (state === 'errored' || state === 'erroring') {
   return null;
  }
  if (state === 'closed') {
   return 0;
  }
  return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
 }
 function WritableStreamDefaultWriterRelease(writer) {
  var stream = writer._ownerWritableStream;
  var releasedError = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
  WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
  WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
  stream._writer = undefined;
  writer._ownerWritableStream = undefined;
 }
 function WritableStreamDefaultWriterWrite(writer, chunk) {
  var stream = writer._ownerWritableStream;
  var controller = stream._writableStreamController;
  var chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
  if (stream !== writer._ownerWritableStream) {
   return promiseRejectedWith(defaultWriterLockException('write to'));
  }
  var state = stream._state;
  if (state === 'errored') {
   return promiseRejectedWith(stream._storedError);
  }
  if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
   return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
  }
  if (state === 'erroring') {
   return promiseRejectedWith(stream._storedError);
  }
  var promise = WritableStreamAddWriteRequest(stream);
  WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
  return promise;
 }
 var closeSentinel = {};
 var WritableStreamDefaultController = function () {
  function WritableStreamDefaultController() {
   throw new TypeError('Illegal constructor');
  }
  WritableStreamDefaultController.prototype.error = function (e) {
   if (e === void 0) {
    e = undefined;
   }
   if (!IsWritableStreamDefaultController(this)) {
    throw new TypeError('WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController');
   }
   var state = this._controlledWritableStream._state;
   if (state !== 'writable') {
    return;
   }
   WritableStreamDefaultControllerError(this, e);
  };
  WritableStreamDefaultController.prototype[AbortSteps] = function (reason) {
   var result = this._abortAlgorithm(reason);
   WritableStreamDefaultControllerClearAlgorithms(this);
   return result;
  };
  WritableStreamDefaultController.prototype[ErrorSteps] = function () {
   ResetQueue(this);
  };
  return WritableStreamDefaultController;
 }();
 Object.defineProperties(WritableStreamDefaultController.prototype, { error: { enumerable: true } });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
   value: 'WritableStreamDefaultController',
   configurable: true
  });
 }
 function IsWritableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
   return false;
  }
  return true;
 }
 function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledWritableStream = stream;
  stream._writableStreamController = controller;
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._started = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._writeAlgorithm = writeAlgorithm;
  controller._closeAlgorithm = closeAlgorithm;
  controller._abortAlgorithm = abortAlgorithm;
  var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
  WritableStreamUpdateBackpressure(stream, backpressure);
  var startResult = startAlgorithm();
  var startPromise = promiseResolvedWith(startResult);
  uponPromise(startPromise, function () {
   controller._started = true;
   WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (r) {
   controller._started = true;
   WritableStreamDealWithRejection(stream, r);
  });
 }
 function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
  var controller = Object.create(WritableStreamDefaultController.prototype);
  var startAlgorithm = function () {
   return undefined;
  };
  var writeAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  var closeAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  var abortAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  if (underlyingSink.start !== undefined) {
   startAlgorithm = function () {
    return underlyingSink.start(controller);
   };
  }
  if (underlyingSink.write !== undefined) {
   writeAlgorithm = function (chunk) {
    return underlyingSink.write(chunk, controller);
   };
  }
  if (underlyingSink.close !== undefined) {
   closeAlgorithm = function () {
    return underlyingSink.close();
   };
  }
  if (underlyingSink.abort !== undefined) {
   abortAlgorithm = function (reason) {
    return underlyingSink.abort(reason);
   };
  }
  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
 }
 function WritableStreamDefaultControllerClearAlgorithms(controller) {
  controller._writeAlgorithm = undefined;
  controller._closeAlgorithm = undefined;
  controller._abortAlgorithm = undefined;
  controller._strategySizeAlgorithm = undefined;
 }
 function WritableStreamDefaultControllerClose(controller) {
  EnqueueValueWithSize(controller, closeSentinel, 0);
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
 }
 function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
  try {
   return controller._strategySizeAlgorithm(chunk);
  } catch (chunkSizeE) {
   WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
   return 1;
  }
 }
 function WritableStreamDefaultControllerGetDesiredSize(controller) {
  return controller._strategyHWM - controller._queueTotalSize;
 }
 function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
  try {
   EnqueueValueWithSize(controller, chunk, chunkSize);
  } catch (enqueueE) {
   WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
   return;
  }
  var stream = controller._controlledWritableStream;
  if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
   var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
   WritableStreamUpdateBackpressure(stream, backpressure);
  }
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
 }
 function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
  var stream = controller._controlledWritableStream;
  if (!controller._started) {
   return;
  }
  if (stream._inFlightWriteRequest !== undefined) {
   return;
  }
  var state = stream._state;
  if (state === 'erroring') {
   WritableStreamFinishErroring(stream);
   return;
  }
  if (controller._queue.length === 0) {
   return;
  }
  var value = PeekQueueValue(controller);
  if (value === closeSentinel) {
   WritableStreamDefaultControllerProcessClose(controller);
  } else {
   WritableStreamDefaultControllerProcessWrite(controller, value);
  }
 }
 function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
  if (controller._controlledWritableStream._state === 'writable') {
   WritableStreamDefaultControllerError(controller, error);
  }
 }
 function WritableStreamDefaultControllerProcessClose(controller) {
  var stream = controller._controlledWritableStream;
  WritableStreamMarkCloseRequestInFlight(stream);
  DequeueValue(controller);
  var sinkClosePromise = controller._closeAlgorithm();
  WritableStreamDefaultControllerClearAlgorithms(controller);
  uponPromise(sinkClosePromise, function () {
   WritableStreamFinishInFlightClose(stream);
  }, function (reason) {
   WritableStreamFinishInFlightCloseWithError(stream, reason);
  });
 }
 function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
  var stream = controller._controlledWritableStream;
  WritableStreamMarkFirstWriteRequestInFlight(stream);
  var sinkWritePromise = controller._writeAlgorithm(chunk);
  uponPromise(sinkWritePromise, function () {
   WritableStreamFinishInFlightWrite(stream);
   var state = stream._state;
   DequeueValue(controller);
   if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
    var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
    WritableStreamUpdateBackpressure(stream, backpressure);
   }
   WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (reason) {
   if (stream._state === 'writable') {
    WritableStreamDefaultControllerClearAlgorithms(controller);
   }
   WritableStreamFinishInFlightWriteWithError(stream, reason);
  });
 }
 function WritableStreamDefaultControllerGetBackpressure(controller) {
  var desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
  return desiredSize <= 0;
 }
 function WritableStreamDefaultControllerError(controller, error) {
  var stream = controller._controlledWritableStream;
  WritableStreamDefaultControllerClearAlgorithms(controller);
  WritableStreamStartErroring(stream, error);
 }
 function streamBrandCheckException(name) {
  return new TypeError("WritableStream.prototype." + name + " can only be used on a WritableStream");
 }
 function defaultWriterBrandCheckException(name) {
  return new TypeError("WritableStreamDefaultWriter.prototype." + name + " can only be used on a WritableStreamDefaultWriter");
 }
 function defaultWriterLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released writer');
 }
 function defaultWriterClosedPromiseInitialize(writer) {
  writer._closedPromise = newPromise(function (resolve, reject) {
   writer._closedPromise_resolve = resolve;
   writer._closedPromise_reject = reject;
   writer._closedPromiseState = 'pending';
  });
 }
 function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseReject(writer, reason);
 }
 function defaultWriterClosedPromiseInitializeAsResolved(writer) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseResolve(writer);
 }
 function defaultWriterClosedPromiseReject(writer, reason) {
  if (writer._closedPromise_reject === undefined) {
   return;
  }
  setPromiseIsHandledToTrue(writer._closedPromise);
  writer._closedPromise_reject(reason);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'rejected';
 }
 function defaultWriterClosedPromiseResetToRejected(writer, reason) {
  defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
 }
 function defaultWriterClosedPromiseResolve(writer) {
  if (writer._closedPromise_resolve === undefined) {
   return;
  }
  writer._closedPromise_resolve(undefined);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'resolved';
 }
 function defaultWriterReadyPromiseInitialize(writer) {
  writer._readyPromise = newPromise(function (resolve, reject) {
   writer._readyPromise_resolve = resolve;
   writer._readyPromise_reject = reject;
  });
  writer._readyPromiseState = 'pending';
 }
 function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseReject(writer, reason);
 }
 function defaultWriterReadyPromiseInitializeAsResolved(writer) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseResolve(writer);
 }
 function defaultWriterReadyPromiseReject(writer, reason) {
  if (writer._readyPromise_reject === undefined) {
   return;
  }
  setPromiseIsHandledToTrue(writer._readyPromise);
  writer._readyPromise_reject(reason);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'rejected';
 }
 function defaultWriterReadyPromiseReset(writer) {
  defaultWriterReadyPromiseInitialize(writer);
 }
 function defaultWriterReadyPromiseResetToRejected(writer, reason) {
  defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
 }
 function defaultWriterReadyPromiseResolve(writer) {
  if (writer._readyPromise_resolve === undefined) {
   return;
  }
  writer._readyPromise_resolve(undefined);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'fulfilled';
 }
 function isAbortSignal(value) {
  if (typeof value !== 'object' || value === null) {
   return false;
  }
  try {
   return typeof value.aborted === 'boolean';
  } catch (_a) {
   return false;
  }
 }
 var NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;
 function isDOMExceptionConstructor(ctor) {
  if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
   return false;
  }
  try {
   new ctor();
   return true;
  } catch (_a) {
   return false;
  }
 }
 function createDOMExceptionPolyfill() {
  var ctor = function DOMException(message, name) {
   this.message = message || '';
   this.name = name || 'Error';
   if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
   }
  };
  ctor.prototype = Object.create(Error.prototype);
  Object.defineProperty(ctor.prototype, 'constructor', {
   value: ctor,
   writable: true,
   configurable: true
  });
  return ctor;
 }
 var DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
 function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
  var reader = AcquireReadableStreamDefaultReader(source);
  var writer = AcquireWritableStreamDefaultWriter(dest);
  source._disturbed = true;
  var shuttingDown = false;
  var currentWrite = promiseResolvedWith(undefined);
  return newPromise(function (resolve, reject) {
   var abortAlgorithm;
   if (signal !== undefined) {
    abortAlgorithm = function () {
     var error = new DOMException$1('Aborted', 'AbortError');
     var actions = [];
     if (!preventAbort) {
      actions.push(function () {
       if (dest._state === 'writable') {
        return WritableStreamAbort(dest, error);
       }
       return promiseResolvedWith(undefined);
      });
     }
     if (!preventCancel) {
      actions.push(function () {
       if (source._state === 'readable') {
        return ReadableStreamCancel(source, error);
       }
       return promiseResolvedWith(undefined);
      });
     }
     shutdownWithAction(function () {
      return Promise.all(actions.map(function (action) {
       return action();
      }));
     }, true, error);
    };
    if (signal.aborted) {
     abortAlgorithm();
     return;
    }
    signal.addEventListener('abort', abortAlgorithm);
   }
   function pipeLoop() {
    return newPromise(function (resolveLoop, rejectLoop) {
     function next(done) {
      if (done) {
       resolveLoop();
      } else {
       PerformPromiseThen(pipeStep(), next, rejectLoop);
      }
     }
     next(false);
    });
   }
   function pipeStep() {
    if (shuttingDown) {
     return promiseResolvedWith(true);
    }
    return PerformPromiseThen(writer._readyPromise, function () {
     return newPromise(function (resolveRead, rejectRead) {
      ReadableStreamDefaultReaderRead(reader, {
       _chunkSteps: function (chunk) {
        currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
        resolveRead(false);
       },
       _closeSteps: function () {
        return resolveRead(true);
       },
       _errorSteps: rejectRead
      });
     });
    });
   }
   isOrBecomesErrored(source, reader._closedPromise, function (storedError) {
    if (!preventAbort) {
     shutdownWithAction(function () {
      return WritableStreamAbort(dest, storedError);
     }, true, storedError);
    } else {
     shutdown(true, storedError);
    }
   });
   isOrBecomesErrored(dest, writer._closedPromise, function (storedError) {
    if (!preventCancel) {
     shutdownWithAction(function () {
      return ReadableStreamCancel(source, storedError);
     }, true, storedError);
    } else {
     shutdown(true, storedError);
    }
   });
   isOrBecomesClosed(source, reader._closedPromise, function () {
    if (!preventClose) {
     shutdownWithAction(function () {
      return WritableStreamDefaultWriterCloseWithErrorPropagation(writer);
     });
    } else {
     shutdown();
    }
   });
   if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
    var destClosed_1 = new TypeError('the destination writable stream closed before all data could be piped to it');
    if (!preventCancel) {
     shutdownWithAction(function () {
      return ReadableStreamCancel(source, destClosed_1);
     }, true, destClosed_1);
    } else {
     shutdown(true, destClosed_1);
    }
   }
   setPromiseIsHandledToTrue(pipeLoop());
   function waitForWritesToFinish() {
    var oldCurrentWrite = currentWrite;
    return PerformPromiseThen(currentWrite, function () {
     return oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined;
    });
   }
   function isOrBecomesErrored(stream, promise, action) {
    if (stream._state === 'errored') {
     action(stream._storedError);
    } else {
     uponRejection(promise, action);
    }
   }
   function isOrBecomesClosed(stream, promise, action) {
    if (stream._state === 'closed') {
     action();
    } else {
     uponFulfillment(promise, action);
    }
   }
   function shutdownWithAction(action, originalIsError, originalError) {
    if (shuttingDown) {
     return;
    }
    shuttingDown = true;
    if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
     uponFulfillment(waitForWritesToFinish(), doTheRest);
    } else {
     doTheRest();
    }
    function doTheRest() {
     uponPromise(action(), function () {
      return finalize(originalIsError, originalError);
     }, function (newError) {
      return finalize(true, newError);
     });
    }
   }
   function shutdown(isError, error) {
    if (shuttingDown) {
     return;
    }
    shuttingDown = true;
    if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
     uponFulfillment(waitForWritesToFinish(), function () {
      return finalize(isError, error);
     });
    } else {
     finalize(isError, error);
    }
   }
   function finalize(isError, error) {
    WritableStreamDefaultWriterRelease(writer);
    ReadableStreamReaderGenericRelease(reader);
    if (signal !== undefined) {
     signal.removeEventListener('abort', abortAlgorithm);
    }
    if (isError) {
     reject(error);
    } else {
     resolve(undefined);
    }
   }
  });
 }
 var ReadableStreamDefaultController = function () {
  function ReadableStreamDefaultController() {
   throw new TypeError('Illegal constructor');
  }
  Object.defineProperty(ReadableStreamDefaultController.prototype, "desiredSize", {
   get: function () {
    if (!IsReadableStreamDefaultController(this)) {
     throw defaultControllerBrandCheckException('desiredSize');
    }
    return ReadableStreamDefaultControllerGetDesiredSize(this);
   },
   enumerable: false,
   configurable: true
  });
  ReadableStreamDefaultController.prototype.close = function () {
   if (!IsReadableStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException('close');
   }
   if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
    throw new TypeError('The stream is not in a state that permits close');
   }
   ReadableStreamDefaultControllerClose(this);
  };
  ReadableStreamDefaultController.prototype.enqueue = function (chunk) {
   if (chunk === void 0) {
    chunk = undefined;
   }
   if (!IsReadableStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException('enqueue');
   }
   if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
    throw new TypeError('The stream is not in a state that permits enqueue');
   }
   return ReadableStreamDefaultControllerEnqueue(this, chunk);
  };
  ReadableStreamDefaultController.prototype.error = function (e) {
   if (e === void 0) {
    e = undefined;
   }
   if (!IsReadableStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException('error');
   }
   ReadableStreamDefaultControllerError(this, e);
  };
  ReadableStreamDefaultController.prototype[CancelSteps] = function (reason) {
   ResetQueue(this);
   var result = this._cancelAlgorithm(reason);
   ReadableStreamDefaultControllerClearAlgorithms(this);
   return result;
  };
  ReadableStreamDefaultController.prototype[PullSteps] = function (readRequest) {
   var stream = this._controlledReadableStream;
   if (this._queue.length > 0) {
    var chunk = DequeueValue(this);
    if (this._closeRequested && this._queue.length === 0) {
     ReadableStreamDefaultControllerClearAlgorithms(this);
     ReadableStreamClose(stream);
    } else {
     ReadableStreamDefaultControllerCallPullIfNeeded(this);
    }
    readRequest._chunkSteps(chunk);
   } else {
    ReadableStreamAddReadRequest(stream, readRequest);
    ReadableStreamDefaultControllerCallPullIfNeeded(this);
   }
  };
  return ReadableStreamDefaultController;
 }();
 Object.defineProperties(ReadableStreamDefaultController.prototype, {
  close: { enumerable: true },
  enqueue: { enumerable: true },
  error: { enumerable: true },
  desiredSize: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableStreamDefaultController',
   configurable: true
  });
 }
 function IsReadableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
   return false;
  }
  return true;
 }
 function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
  if (!shouldPull) {
   return;
  }
  if (controller._pulling) {
   controller._pullAgain = true;
   return;
  }
  controller._pulling = true;
  var pullPromise = controller._pullAlgorithm();
  uponPromise(pullPromise, function () {
   controller._pulling = false;
   if (controller._pullAgain) {
    controller._pullAgain = false;
    ReadableStreamDefaultControllerCallPullIfNeeded(controller);
   }
  }, function (e) {
   ReadableStreamDefaultControllerError(controller, e);
  });
 }
 function ReadableStreamDefaultControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableStream;
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
   return false;
  }
  if (!controller._started) {
   return false;
  }
  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
   return true;
  }
  var desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
  if (desiredSize > 0) {
   return true;
  }
  return false;
 }
 function ReadableStreamDefaultControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = undefined;
  controller._cancelAlgorithm = undefined;
  controller._strategySizeAlgorithm = undefined;
 }
 function ReadableStreamDefaultControllerClose(controller) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
   return;
  }
  var stream = controller._controlledReadableStream;
  controller._closeRequested = true;
  if (controller._queue.length === 0) {
   ReadableStreamDefaultControllerClearAlgorithms(controller);
   ReadableStreamClose(stream);
  }
 }
 function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
   return;
  }
  var stream = controller._controlledReadableStream;
  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
   ReadableStreamFulfillReadRequest(stream, chunk, false);
  } else {
   var chunkSize = void 0;
   try {
    chunkSize = controller._strategySizeAlgorithm(chunk);
   } catch (chunkSizeE) {
    ReadableStreamDefaultControllerError(controller, chunkSizeE);
    throw chunkSizeE;
   }
   try {
    EnqueueValueWithSize(controller, chunk, chunkSize);
   } catch (enqueueE) {
    ReadableStreamDefaultControllerError(controller, enqueueE);
    throw enqueueE;
   }
  }
  ReadableStreamDefaultControllerCallPullIfNeeded(controller);
 }
 function ReadableStreamDefaultControllerError(controller, e) {
  var stream = controller._controlledReadableStream;
  if (stream._state !== 'readable') {
   return;
  }
  ResetQueue(controller);
  ReadableStreamDefaultControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e);
 }
 function ReadableStreamDefaultControllerGetDesiredSize(controller) {
  var state = controller._controlledReadableStream._state;
  if (state === 'errored') {
   return null;
  }
  if (state === 'closed') {
   return 0;
  }
  return controller._strategyHWM - controller._queueTotalSize;
 }
 function ReadableStreamDefaultControllerHasBackpressure(controller) {
  if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
   return false;
  }
  return true;
 }
 function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
  var state = controller._controlledReadableStream._state;
  if (!controller._closeRequested && state === 'readable') {
   return true;
  }
  return false;
 }
 function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledReadableStream = stream;
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._started = false;
  controller._closeRequested = false;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  stream._readableStreamController = controller;
  var startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), function () {
   controller._started = true;
   ReadableStreamDefaultControllerCallPullIfNeeded(controller);
  }, function (r) {
   ReadableStreamDefaultControllerError(controller, r);
  });
 }
 function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
  var controller = Object.create(ReadableStreamDefaultController.prototype);
  var startAlgorithm = function () {
   return undefined;
  };
  var pullAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  var cancelAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  if (underlyingSource.start !== undefined) {
   startAlgorithm = function () {
    return underlyingSource.start(controller);
   };
  }
  if (underlyingSource.pull !== undefined) {
   pullAlgorithm = function () {
    return underlyingSource.pull(controller);
   };
  }
  if (underlyingSource.cancel !== undefined) {
   cancelAlgorithm = function (reason) {
    return underlyingSource.cancel(reason);
   };
  }
  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
 }
 function defaultControllerBrandCheckException(name) {
  return new TypeError("ReadableStreamDefaultController.prototype." + name + " can only be used on a ReadableStreamDefaultController");
 }
 function ReadableStreamTee(stream, cloneForBranch2) {
  var reader = AcquireReadableStreamDefaultReader(stream);
  var reading = false;
  var canceled1 = false;
  var canceled2 = false;
  var reason1;
  var reason2;
  var branch1;
  var branch2;
  var resolveCancelPromise;
  var cancelPromise = newPromise(function (resolve) {
   resolveCancelPromise = resolve;
  });
  function pullAlgorithm() {
   if (reading) {
    return promiseResolvedWith(undefined);
   }
   reading = true;
   var readRequest = {
    _chunkSteps: function (value) {
     queueMicrotask(function () {
      reading = false;
      var value1 = value;
      var value2 = value;
      if (!canceled1) {
       ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, value1);
      }
      if (!canceled2) {
       ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, value2);
      }
      resolveCancelPromise(undefined);
     });
    },
    _closeSteps: function () {
     reading = false;
     if (!canceled1) {
      ReadableStreamDefaultControllerClose(branch1._readableStreamController);
     }
     if (!canceled2) {
      ReadableStreamDefaultControllerClose(branch2._readableStreamController);
     }
    },
    _errorSteps: function () {
     reading = false;
    }
   };
   ReadableStreamDefaultReaderRead(reader, readRequest);
   return promiseResolvedWith(undefined);
  }
  function cancel1Algorithm(reason) {
   canceled1 = true;
   reason1 = reason;
   if (canceled2) {
    var compositeReason = CreateArrayFromList([
     reason1,
     reason2
    ]);
    var cancelResult = ReadableStreamCancel(stream, compositeReason);
    resolveCancelPromise(cancelResult);
   }
   return cancelPromise;
  }
  function cancel2Algorithm(reason) {
   canceled2 = true;
   reason2 = reason;
   if (canceled1) {
    var compositeReason = CreateArrayFromList([
     reason1,
     reason2
    ]);
    var cancelResult = ReadableStreamCancel(stream, compositeReason);
    resolveCancelPromise(cancelResult);
   }
   return cancelPromise;
  }
  function startAlgorithm() {
  }
  branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
  branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
  uponRejection(reader._closedPromise, function (r) {
   ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
   ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
   resolveCancelPromise(undefined);
  });
  return [
   branch1,
   branch2
  ];
 }
 function convertUnderlyingDefaultOrByteSource(source, context) {
  assertDictionary(source, context);
  var original = source;
  var autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
  var cancel = original === null || original === void 0 ? void 0 : original.cancel;
  var pull = original === null || original === void 0 ? void 0 : original.pull;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var type = original === null || original === void 0 ? void 0 : original.type;
  return {
   autoAllocateChunkSize: autoAllocateChunkSize === undefined ? undefined : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, context + " has member 'autoAllocateChunkSize' that"),
   cancel: cancel === undefined ? undefined : convertUnderlyingSourceCancelCallback(cancel, original, context + " has member 'cancel' that"),
   pull: pull === undefined ? undefined : convertUnderlyingSourcePullCallback(pull, original, context + " has member 'pull' that"),
   start: start === undefined ? undefined : convertUnderlyingSourceStartCallback(start, original, context + " has member 'start' that"),
   type: type === undefined ? undefined : convertReadableStreamType(type, context + " has member 'type' that")
  };
 }
 function convertUnderlyingSourceCancelCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (reason) {
   return promiseCall(fn, original, [reason]);
  };
 }
 function convertUnderlyingSourcePullCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
   return promiseCall(fn, original, [controller]);
  };
 }
 function convertUnderlyingSourceStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
   return reflectCall(fn, original, [controller]);
  };
 }
 function convertReadableStreamType(type, context) {
  type = "" + type;
  if (type !== 'bytes') {
   throw new TypeError(context + " '" + type + "' is not a valid enumeration value for ReadableStreamType");
  }
  return type;
 }
 function convertReaderOptions(options, context) {
  assertDictionary(options, context);
  var mode = options === null || options === void 0 ? void 0 : options.mode;
  return { mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, context + " has member 'mode' that") };
 }
 function convertReadableStreamReaderMode(mode, context) {
  mode = "" + mode;
  if (mode !== 'byob') {
   throw new TypeError(context + " '" + mode + "' is not a valid enumeration value for ReadableStreamReaderMode");
  }
  return mode;
 }
 function convertIteratorOptions(options, context) {
  assertDictionary(options, context);
  var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  return { preventCancel: Boolean(preventCancel) };
 }
 function convertPipeOptions(options, context) {
  assertDictionary(options, context);
  var preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
  var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  var preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
  var signal = options === null || options === void 0 ? void 0 : options.signal;
  if (signal !== undefined) {
   assertAbortSignal(signal, context + " has member 'signal' that");
  }
  return {
   preventAbort: Boolean(preventAbort),
   preventCancel: Boolean(preventCancel),
   preventClose: Boolean(preventClose),
   signal: signal
  };
 }
 function assertAbortSignal(signal, context) {
  if (!isAbortSignal(signal)) {
   throw new TypeError(context + " is not an AbortSignal.");
  }
 }
 function convertReadableWritablePair(pair, context) {
  assertDictionary(pair, context);
  var readable = pair === null || pair === void 0 ? void 0 : pair.readable;
  assertRequiredField(readable, 'readable', 'ReadableWritablePair');
  assertReadableStream(readable, context + " has member 'readable' that");
  var writable = pair === null || pair === void 0 ? void 0 : pair.writable;
  assertRequiredField(writable, 'writable', 'ReadableWritablePair');
  assertWritableStream(writable, context + " has member 'writable' that");
  return {
   readable: readable,
   writable: writable
  };
 }
 var ReadableStream = function () {
  function ReadableStream(rawUnderlyingSource, rawStrategy) {
   if (rawUnderlyingSource === void 0) {
    rawUnderlyingSource = {};
   }
   if (rawStrategy === void 0) {
    rawStrategy = {};
   }
   if (rawUnderlyingSource === undefined) {
    rawUnderlyingSource = null;
   } else {
    assertObject(rawUnderlyingSource, 'First parameter');
   }
   var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
   var underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
   InitializeReadableStream(this);
   if (underlyingSource.type === 'bytes') {
    if (strategy.size !== undefined) {
     throw new RangeError('The strategy for a byte stream cannot have a size function');
    }
    var highWaterMark = ExtractHighWaterMark(strategy, 0);
    SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
   } else {
    var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
    var highWaterMark = ExtractHighWaterMark(strategy, 1);
    SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
   }
  }
  Object.defineProperty(ReadableStream.prototype, "locked", {
   get: function () {
    if (!IsReadableStream(this)) {
     throw streamBrandCheckException$1('locked');
    }
    return IsReadableStreamLocked(this);
   },
   enumerable: false,
   configurable: true
  });
  ReadableStream.prototype.cancel = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsReadableStream(this)) {
    return promiseRejectedWith(streamBrandCheckException$1('cancel'));
   }
   if (IsReadableStreamLocked(this)) {
    return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
   }
   return ReadableStreamCancel(this, reason);
  };
  ReadableStream.prototype.getReader = function (rawOptions) {
   if (rawOptions === void 0) {
    rawOptions = undefined;
   }
   if (!IsReadableStream(this)) {
    throw streamBrandCheckException$1('getReader');
   }
   var options = convertReaderOptions(rawOptions, 'First parameter');
   if (options.mode === undefined) {
    return AcquireReadableStreamDefaultReader(this);
   }
   return AcquireReadableStreamBYOBReader(this);
  };
  ReadableStream.prototype.pipeThrough = function (rawTransform, rawOptions) {
   if (rawOptions === void 0) {
    rawOptions = {};
   }
   if (!IsReadableStream(this)) {
    throw streamBrandCheckException$1('pipeThrough');
   }
   assertRequiredArgument(rawTransform, 1, 'pipeThrough');
   var transform = convertReadableWritablePair(rawTransform, 'First parameter');
   var options = convertPipeOptions(rawOptions, 'Second parameter');
   if (IsReadableStreamLocked(this)) {
    throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
   }
   if (IsWritableStreamLocked(transform.writable)) {
    throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
   }
   var promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
   setPromiseIsHandledToTrue(promise);
   return transform.readable;
  };
  ReadableStream.prototype.pipeTo = function (destination, rawOptions) {
   if (rawOptions === void 0) {
    rawOptions = {};
   }
   if (!IsReadableStream(this)) {
    return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
   }
   if (destination === undefined) {
    return promiseRejectedWith("Parameter 1 is required in 'pipeTo'.");
   }
   if (!IsWritableStream(destination)) {
    return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
   }
   var options;
   try {
    options = convertPipeOptions(rawOptions, 'Second parameter');
   } catch (e) {
    return promiseRejectedWith(e);
   }
   if (IsReadableStreamLocked(this)) {
    return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
   }
   if (IsWritableStreamLocked(destination)) {
    return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
   }
   return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
  };
  ReadableStream.prototype.tee = function () {
   if (!IsReadableStream(this)) {
    throw streamBrandCheckException$1('tee');
   }
   var branches = ReadableStreamTee(this);
   return CreateArrayFromList(branches);
  };
  ReadableStream.prototype.values = function (rawOptions) {
   if (rawOptions === void 0) {
    rawOptions = undefined;
   }
   if (!IsReadableStream(this)) {
    throw streamBrandCheckException$1('values');
   }
   var options = convertIteratorOptions(rawOptions, 'First parameter');
   return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
  };
  return ReadableStream;
 }();
 Object.defineProperties(ReadableStream.prototype, {
  cancel: { enumerable: true },
  getReader: { enumerable: true },
  pipeThrough: { enumerable: true },
  pipeTo: { enumerable: true },
  tee: { enumerable: true },
  values: { enumerable: true },
  locked: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
   value: 'ReadableStream',
   configurable: true
  });
 }
 if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
  Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
   value: ReadableStream.prototype.values,
   writable: true,
   configurable: true
  });
 }
 function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  if (highWaterMark === void 0) {
   highWaterMark = 1;
  }
  if (sizeAlgorithm === void 0) {
   sizeAlgorithm = function () {
    return 1;
   };
  }
  var stream = Object.create(ReadableStream.prototype);
  InitializeReadableStream(stream);
  var controller = Object.create(ReadableStreamDefaultController.prototype);
  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
 }
 function InitializeReadableStream(stream) {
  stream._state = 'readable';
  stream._reader = undefined;
  stream._storedError = undefined;
  stream._disturbed = false;
 }
 function IsReadableStream(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
   return false;
  }
  return true;
 }
 function IsReadableStreamLocked(stream) {
  if (stream._reader === undefined) {
   return false;
  }
  return true;
 }
 function ReadableStreamCancel(stream, reason) {
  stream._disturbed = true;
  if (stream._state === 'closed') {
   return promiseResolvedWith(undefined);
  }
  if (stream._state === 'errored') {
   return promiseRejectedWith(stream._storedError);
  }
  ReadableStreamClose(stream);
  var sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
  return transformPromiseWith(sourceCancelPromise, noop);
 }
 function ReadableStreamClose(stream) {
  stream._state = 'closed';
  var reader = stream._reader;
  if (reader === undefined) {
   return;
  }
  if (IsReadableStreamDefaultReader(reader)) {
   reader._readRequests.forEach(function (readRequest) {
    readRequest._closeSteps();
   });
   reader._readRequests = new SimpleQueue();
  }
  defaultReaderClosedPromiseResolve(reader);
 }
 function ReadableStreamError(stream, e) {
  stream._state = 'errored';
  stream._storedError = e;
  var reader = stream._reader;
  if (reader === undefined) {
   return;
  }
  if (IsReadableStreamDefaultReader(reader)) {
   reader._readRequests.forEach(function (readRequest) {
    readRequest._errorSteps(e);
   });
   reader._readRequests = new SimpleQueue();
  } else {
   reader._readIntoRequests.forEach(function (readIntoRequest) {
    readIntoRequest._errorSteps(e);
   });
   reader._readIntoRequests = new SimpleQueue();
  }
  defaultReaderClosedPromiseReject(reader, e);
 }
 function streamBrandCheckException$1(name) {
  return new TypeError("ReadableStream.prototype." + name + " can only be used on a ReadableStream");
 }
 function convertQueuingStrategyInit(init, context) {
  assertDictionary(init, context);
  var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
  return { highWaterMark: convertUnrestrictedDouble(highWaterMark) };
 }
 var byteLengthSizeFunction = function size(chunk) {
  return chunk.byteLength;
 };
 var ByteLengthQueuingStrategy = function () {
  function ByteLengthQueuingStrategy(options) {
   assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
   options = convertQueuingStrategyInit(options, 'First parameter');
   this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
  }
  Object.defineProperty(ByteLengthQueuingStrategy.prototype, "highWaterMark", {
   get: function () {
    if (!IsByteLengthQueuingStrategy(this)) {
     throw byteLengthBrandCheckException('highWaterMark');
    }
    return this._byteLengthQueuingStrategyHighWaterMark;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(ByteLengthQueuingStrategy.prototype, "size", {
   get: function () {
    if (!IsByteLengthQueuingStrategy(this)) {
     throw byteLengthBrandCheckException('size');
    }
    return byteLengthSizeFunction;
   },
   enumerable: false,
   configurable: true
  });
  return ByteLengthQueuingStrategy;
 }();
 Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
  highWaterMark: { enumerable: true },
  size: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
   value: 'ByteLengthQueuingStrategy',
   configurable: true
  });
 }
 function byteLengthBrandCheckException(name) {
  return new TypeError("ByteLengthQueuingStrategy.prototype." + name + " can only be used on a ByteLengthQueuingStrategy");
 }
 function IsByteLengthQueuingStrategy(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
   return false;
  }
  return true;
 }
 var countSizeFunction = function size() {
  return 1;
 };
 var CountQueuingStrategy = function () {
  function CountQueuingStrategy(options) {
   assertRequiredArgument(options, 1, 'CountQueuingStrategy');
   options = convertQueuingStrategyInit(options, 'First parameter');
   this._countQueuingStrategyHighWaterMark = options.highWaterMark;
  }
  Object.defineProperty(CountQueuingStrategy.prototype, "highWaterMark", {
   get: function () {
    if (!IsCountQueuingStrategy(this)) {
     throw countBrandCheckException('highWaterMark');
    }
    return this._countQueuingStrategyHighWaterMark;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(CountQueuingStrategy.prototype, "size", {
   get: function () {
    if (!IsCountQueuingStrategy(this)) {
     throw countBrandCheckException('size');
    }
    return countSizeFunction;
   },
   enumerable: false,
   configurable: true
  });
  return CountQueuingStrategy;
 }();
 Object.defineProperties(CountQueuingStrategy.prototype, {
  highWaterMark: { enumerable: true },
  size: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
   value: 'CountQueuingStrategy',
   configurable: true
  });
 }
 function countBrandCheckException(name) {
  return new TypeError("CountQueuingStrategy.prototype." + name + " can only be used on a CountQueuingStrategy");
 }
 function IsCountQueuingStrategy(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
   return false;
  }
  return true;
 }
 function convertTransformer(original, context) {
  assertDictionary(original, context);
  var flush = original === null || original === void 0 ? void 0 : original.flush;
  var readableType = original === null || original === void 0 ? void 0 : original.readableType;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var transform = original === null || original === void 0 ? void 0 : original.transform;
  var writableType = original === null || original === void 0 ? void 0 : original.writableType;
  return {
   flush: flush === undefined ? undefined : convertTransformerFlushCallback(flush, original, context + " has member 'flush' that"),
   readableType: readableType,
   start: start === undefined ? undefined : convertTransformerStartCallback(start, original, context + " has member 'start' that"),
   transform: transform === undefined ? undefined : convertTransformerTransformCallback(transform, original, context + " has member 'transform' that"),
   writableType: writableType
  };
 }
 function convertTransformerFlushCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
   return promiseCall(fn, original, [controller]);
  };
 }
 function convertTransformerStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
   return reflectCall(fn, original, [controller]);
  };
 }
 function convertTransformerTransformCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (chunk, controller) {
   return promiseCall(fn, original, [
    chunk,
    controller
   ]);
  };
 }
 var TransformStream = function () {
  function TransformStream(rawTransformer, rawWritableStrategy, rawReadableStrategy) {
   if (rawTransformer === void 0) {
    rawTransformer = {};
   }
   if (rawWritableStrategy === void 0) {
    rawWritableStrategy = {};
   }
   if (rawReadableStrategy === void 0) {
    rawReadableStrategy = {};
   }
   if (rawTransformer === undefined) {
    rawTransformer = null;
   }
   var writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
   var readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
   var transformer = convertTransformer(rawTransformer, 'First parameter');
   if (transformer.readableType !== undefined) {
    throw new RangeError('Invalid readableType specified');
   }
   if (transformer.writableType !== undefined) {
    throw new RangeError('Invalid writableType specified');
   }
   var readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
   var readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
   var writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
   var writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
   var startPromise_resolve;
   var startPromise = newPromise(function (resolve) {
    startPromise_resolve = resolve;
   });
   InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
   SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
   if (transformer.start !== undefined) {
    startPromise_resolve(transformer.start(this._transformStreamController));
   } else {
    startPromise_resolve(undefined);
   }
  }
  Object.defineProperty(TransformStream.prototype, "readable", {
   get: function () {
    if (!IsTransformStream(this)) {
     throw streamBrandCheckException$2('readable');
    }
    return this._readable;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(TransformStream.prototype, "writable", {
   get: function () {
    if (!IsTransformStream(this)) {
     throw streamBrandCheckException$2('writable');
    }
    return this._writable;
   },
   enumerable: false,
   configurable: true
  });
  return TransformStream;
 }();
 Object.defineProperties(TransformStream.prototype, {
  readable: { enumerable: true },
  writable: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
   value: 'TransformStream',
   configurable: true
  });
 }
 function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
  function startAlgorithm() {
   return startPromise;
  }
  function writeAlgorithm(chunk) {
   return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
  }
  function abortAlgorithm(reason) {
   return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
  }
  function closeAlgorithm() {
   return TransformStreamDefaultSinkCloseAlgorithm(stream);
  }
  stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
  function pullAlgorithm() {
   return TransformStreamDefaultSourcePullAlgorithm(stream);
  }
  function cancelAlgorithm(reason) {
   TransformStreamErrorWritableAndUnblockWrite(stream, reason);
   return promiseResolvedWith(undefined);
  }
  stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
  stream._backpressure = undefined;
  stream._backpressureChangePromise = undefined;
  stream._backpressureChangePromise_resolve = undefined;
  TransformStreamSetBackpressure(stream, true);
  stream._transformStreamController = undefined;
 }
 function IsTransformStream(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
   return false;
  }
  return true;
 }
 function TransformStreamError(stream, e) {
  ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
  TransformStreamErrorWritableAndUnblockWrite(stream, e);
 }
 function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
  TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
  WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
  if (stream._backpressure) {
   TransformStreamSetBackpressure(stream, false);
  }
 }
 function TransformStreamSetBackpressure(stream, backpressure) {
  if (stream._backpressureChangePromise !== undefined) {
   stream._backpressureChangePromise_resolve();
  }
  stream._backpressureChangePromise = newPromise(function (resolve) {
   stream._backpressureChangePromise_resolve = resolve;
  });
  stream._backpressure = backpressure;
 }
 var TransformStreamDefaultController = function () {
  function TransformStreamDefaultController() {
   throw new TypeError('Illegal constructor');
  }
  Object.defineProperty(TransformStreamDefaultController.prototype, "desiredSize", {
   get: function () {
    if (!IsTransformStreamDefaultController(this)) {
     throw defaultControllerBrandCheckException$1('desiredSize');
    }
    var readableController = this._controlledTransformStream._readable._readableStreamController;
    return ReadableStreamDefaultControllerGetDesiredSize(readableController);
   },
   enumerable: false,
   configurable: true
  });
  TransformStreamDefaultController.prototype.enqueue = function (chunk) {
   if (chunk === void 0) {
    chunk = undefined;
   }
   if (!IsTransformStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException$1('enqueue');
   }
   TransformStreamDefaultControllerEnqueue(this, chunk);
  };
  TransformStreamDefaultController.prototype.error = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsTransformStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException$1('error');
   }
   TransformStreamDefaultControllerError(this, reason);
  };
  TransformStreamDefaultController.prototype.terminate = function () {
   if (!IsTransformStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException$1('terminate');
   }
   TransformStreamDefaultControllerTerminate(this);
  };
  return TransformStreamDefaultController;
 }();
 Object.defineProperties(TransformStreamDefaultController.prototype, {
  enqueue: { enumerable: true },
  error: { enumerable: true },
  terminate: { enumerable: true },
  desiredSize: { enumerable: true }
 });
 if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
   value: 'TransformStreamDefaultController',
   configurable: true
  });
 }
 function IsTransformStreamDefaultController(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
   return false;
  }
  return true;
 }
 function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
  controller._controlledTransformStream = stream;
  stream._transformStreamController = controller;
  controller._transformAlgorithm = transformAlgorithm;
  controller._flushAlgorithm = flushAlgorithm;
 }
 function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
  var controller = Object.create(TransformStreamDefaultController.prototype);
  var transformAlgorithm = function (chunk) {
   try {
    TransformStreamDefaultControllerEnqueue(controller, chunk);
    return promiseResolvedWith(undefined);
   } catch (transformResultE) {
    return promiseRejectedWith(transformResultE);
   }
  };
  var flushAlgorithm = function () {
   return promiseResolvedWith(undefined);
  };
  if (transformer.transform !== undefined) {
   transformAlgorithm = function (chunk) {
    return transformer.transform(chunk, controller);
   };
  }
  if (transformer.flush !== undefined) {
   flushAlgorithm = function () {
    return transformer.flush(controller);
   };
  }
  SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
 }
 function TransformStreamDefaultControllerClearAlgorithms(controller) {
  controller._transformAlgorithm = undefined;
  controller._flushAlgorithm = undefined;
 }
 function TransformStreamDefaultControllerEnqueue(controller, chunk) {
  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
   throw new TypeError('Readable side is not in a state that permits enqueue');
  }
  try {
   ReadableStreamDefaultControllerEnqueue(readableController, chunk);
  } catch (e) {
   TransformStreamErrorWritableAndUnblockWrite(stream, e);
   throw stream._readable._storedError;
  }
  var backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
  if (backpressure !== stream._backpressure) {
   TransformStreamSetBackpressure(stream, true);
  }
 }
 function TransformStreamDefaultControllerError(controller, e) {
  TransformStreamError(controller._controlledTransformStream, e);
 }
 function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
  var transformPromise = controller._transformAlgorithm(chunk);
  return transformPromiseWith(transformPromise, undefined, function (r) {
   TransformStreamError(controller._controlledTransformStream, r);
   throw r;
  });
 }
 function TransformStreamDefaultControllerTerminate(controller) {
  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;
  ReadableStreamDefaultControllerClose(readableController);
  var error = new TypeError('TransformStream terminated');
  TransformStreamErrorWritableAndUnblockWrite(stream, error);
 }
 function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
  var controller = stream._transformStreamController;
  if (stream._backpressure) {
   var backpressureChangePromise = stream._backpressureChangePromise;
   return transformPromiseWith(backpressureChangePromise, function () {
    var writable = stream._writable;
    var state = writable._state;
    if (state === 'erroring') {
     throw writable._storedError;
    }
    return TransformStreamDefaultControllerPerformTransform(controller, chunk);
   });
  }
  return TransformStreamDefaultControllerPerformTransform(controller, chunk);
 }
 function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
  TransformStreamError(stream, reason);
  return promiseResolvedWith(undefined);
 }
 function TransformStreamDefaultSinkCloseAlgorithm(stream) {
  var readable = stream._readable;
  var controller = stream._transformStreamController;
  var flushPromise = controller._flushAlgorithm();
  TransformStreamDefaultControllerClearAlgorithms(controller);
  return transformPromiseWith(flushPromise, function () {
   if (readable._state === 'errored') {
    throw readable._storedError;
   }
   ReadableStreamDefaultControllerClose(readable._readableStreamController);
  }, function (r) {
   TransformStreamError(stream, r);
   throw readable._storedError;
  });
 }
 function TransformStreamDefaultSourcePullAlgorithm(stream) {
  TransformStreamSetBackpressure(stream, false);
  return stream._backpressureChangePromise;
 }
 function defaultControllerBrandCheckException$1(name) {
  return new TypeError("TransformStreamDefaultController.prototype." + name + " can only be used on a TransformStreamDefaultController");
 }
 function streamBrandCheckException$2(name) {
  return new TypeError("TransformStream.prototype." + name + " can only be used on a TransformStream");
 }
 exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
 exports.CountQueuingStrategy = CountQueuingStrategy;
 exports.ReadableByteStreamController = ReadableByteStreamController;
 exports.ReadableStream = ReadableStream;
 exports.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
 exports.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
 exports.ReadableStreamDefaultController = ReadableStreamDefaultController;
 exports.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
 exports.TransformStream = TransformStream;
 exports.TransformStreamDefaultController = TransformStreamDefaultController;
 exports.WritableStream = WritableStream;
 exports.WritableStreamDefaultController = WritableStreamDefaultController;
 exports.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
 Object.defineProperty(exports, '__esModule', { value: true });
}));

/***/ }),
/* 152 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(153);
var entryUnbind = __webpack_require__(157);
module.exports = entryUnbind('String', 'padStart');

/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var $padStart = __webpack_require__(154).start;
var WEBKIT_BUG = __webpack_require__(156);
$({
 target: 'String',
 proto: true,
 forced: WEBKIT_BUG
}, {
 padStart: function padStart(maxLength) {
  return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 154 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(76);
var repeat = __webpack_require__(155);
var requireObjectCoercible = __webpack_require__(49);
var ceil = Math.ceil;
var createMethod = function (IS_END) {
 return function ($this, maxLength, fillString) {
  var S = String(requireObjectCoercible($this));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  var fillLen, stringFiller;
  if (intMaxLength <= stringLength || fillStr == '')
   return S;
  fillLen = intMaxLength - stringLength;
  stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen)
   stringFiller = stringFiller.slice(0, fillLen);
  return IS_END ? S + stringFiller : stringFiller + S;
 };
};
module.exports = {
 start: createMethod(false),
 end: createMethod(true)
};

/***/ }),
/* 155 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toInteger = __webpack_require__(77);
var requireObjectCoercible = __webpack_require__(49);
module.exports = ''.repeat || function repeat(count) {
 var str = String(requireObjectCoercible(this));
 var result = '';
 var n = toInteger(count);
 if (n < 0 || n == Infinity)
  throw RangeError('Wrong number of repetitions');
 for (; n > 0; (n >>>= 1) && (str += str))
  if (n & 1)
   result += str;
 return result;
};

/***/ }),
/* 156 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(125);
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

/***/ }),
/* 157 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(40);
var bind = __webpack_require__(105);
var call = Function.call;
module.exports = function (CONSTRUCTOR, METHOD, length) {
 return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};

/***/ }),
/* 158 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(159);
var entryUnbind = __webpack_require__(157);
module.exports = entryUnbind('String', 'padEnd');

/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(39);
var $padEnd = __webpack_require__(154).end;
var WEBKIT_BUG = __webpack_require__(156);
$({
 target: 'String',
 proto: true,
 forced: WEBKIT_BUG
}, {
 padEnd: function padEnd(maxLength) {
  return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 160 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(161);
var path = __webpack_require__(72);
module.exports = path.Object.values;

/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(39);
var $values = __webpack_require__(162).values;
$({
 target: 'Object',
 stat: true
}, {
 values: function values(O) {
  return $values(O);
 }
});

/***/ }),
/* 162 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(42);
var objectKeys = __webpack_require__(90);
var toIndexedObject = __webpack_require__(46);
var propertyIsEnumerable = __webpack_require__(44).f;
var createMethod = function (TO_ENTRIES) {
 return function (it) {
  var O = toIndexedObject(it);
  var keys = objectKeys(O);
  var length = keys.length;
  var i = 0;
  var result = [];
  var key;
  while (length > i) {
   key = keys[i++];
   if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
    result.push(TO_ENTRIES ? [
     key,
     O[key]
    ] : O[key]);
   }
  }
  return result;
 };
};
module.exports = {
 entries: createMethod(true),
 values: createMethod(false)
};

/***/ }),
/* 163 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(164);
var path = __webpack_require__(72);
module.exports = path.Object.entries;

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(39);
var $entries = __webpack_require__(162).entries;
$({
 target: 'Object',
 stat: true
}, {
 entries: function entries(O) {
  return $entries(O);
 }
});

/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TextLayerBuilder = exports.DefaultTextLayerFactory = void 0;

var _pdfjsLib = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EXPAND_DIVS_TIMEOUT = 300;

var TextLayerBuilder = /*#__PURE__*/function () {
  function TextLayerBuilder(_ref) {
    var textLayerDiv = _ref.textLayerDiv,
        eventBus = _ref.eventBus,
        pageIndex = _ref.pageIndex,
        viewport = _ref.viewport,
        _ref$findController = _ref.findController,
        findController = _ref$findController === void 0 ? null : _ref$findController,
        _ref$enhanceTextSelec = _ref.enhanceTextSelection,
        enhanceTextSelection = _ref$enhanceTextSelec === void 0 ? false : _ref$enhanceTextSelec;

    _classCallCheck(this, TextLayerBuilder);

    this.textLayerDiv = textLayerDiv;
    this.eventBus = eventBus;
    this.textContent = null;
    this.textContentItemsStr = [];
    this.textContentStream = null;
    this.renderingDone = false;
    this.pageIdx = pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = viewport;
    this.textDivs = [];
    this.findController = findController;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = enhanceTextSelection;
    this._onUpdateTextLayerMatches = null;

    this._bindMouse();
  }

  _createClass(TextLayerBuilder, [{
    key: "_finishRendering",
    value: function _finishRendering() {
      this.renderingDone = true;

      if (!this.enhanceTextSelection) {
        var endOfContent = document.createElement("div");
        endOfContent.className = "endOfContent";
        this.textLayerDiv.appendChild(endOfContent);
      }

      this.eventBus.dispatch("textlayerrendered", {
        source: this,
        pageNumber: this.pageNumber,
        numTextDivs: this.textDivs.length
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!(this.textContent || this.textContentStream) || this.renderingDone) {
        return;
      }

      this.cancel();
      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = (0, _pdfjsLib.renderTextLayer)({
        textContent: this.textContent,
        textContentStream: this.textContentStream,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        textContentItemsStr: this.textContentItemsStr,
        timeout: timeout,
        enhanceTextSelection: this.enhanceTextSelection
      });
      this.textLayerRenderTask.promise.then(function () {
        _this.textLayerDiv.appendChild(textLayerFrag);

        _this._finishRendering();

        _this._updateMatches();
      }, function (reason) {});

      if (!this._onUpdateTextLayerMatches) {
        this._onUpdateTextLayerMatches = function (evt) {
          if (evt.pageIndex === _this.pageIdx || evt.pageIndex === -1) {
            _this._updateMatches();
          }
        };

        this.eventBus._on("updatetextlayermatches", this._onUpdateTextLayerMatches);
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }

      if (this._onUpdateTextLayerMatches) {
        this.eventBus._off("updatetextlayermatches", this._onUpdateTextLayerMatches);

        this._onUpdateTextLayerMatches = null;
      }
    }
  }, {
    key: "setTextContentStream",
    value: function setTextContentStream(readableStream) {
      this.cancel();
      this.textContentStream = readableStream;
    }
  }, {
    key: "setTextContent",
    value: function setTextContent(textContent) {
      this.cancel();
      this.textContent = textContent;
    }
  }, {
    key: "_convertMatches",
    value: function _convertMatches(matches, matchesLength, matchesColor) {
      if (!matches) {
        return [];
      }

      var textContentItemsStr = this.textContentItemsStr;
      var i = 0,
          iIndex = 0;
      var end = textContentItemsStr.length - 1;
      var result = [];

      for (var m = 0, mm = matches.length; m < mm; m++) {
        var matchIdx = matches[m];

        while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        if (i === textContentItemsStr.length) {
          console.error("Could not find a matching mapping");
        }

        var match = {
          color: matchesColor ? matchesColor[m] : 0,
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };
        matchIdx += matchesLength[m];

        while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        result.push(match);
      }

      return result;
    }
  }, {
    key: "_renderMatches",
    value: function _renderMatches(matches) {
      if (matches.length === 0) {
        return;
      }

      var findController = this.findController,
          pageIdx = this.pageIdx,
          textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var isSelectedPage = pageIdx === findController.selected.pageIdx;
      var selectedMatchIdx = findController.selected.matchIdx;
      var highlightAll = findController.state.highlightAll;
      var prevEnd = null;
      var infinity = {
        divIdx: -1,
        offset: undefined
      };

      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = "";
        appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];
        var content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
        var node = document.createTextNode(content);

        if (className) {
          var span = document.createElement("span");
          span.className = className;
          span.appendChild(node);
          div.appendChild(span);
          return;
        }

        div.appendChild(node);
      }

      var i0 = selectedMatchIdx,
          i1 = i0 + 1;

      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
      } else if (!isSelectedPage) {
        return;
      }

      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = isSelectedPage && i === selectedMatchIdx;
        var highlightSuffix = (isSelected ? " selected" : "") + " color" + match.color;

        if (isSelected) {
          findController.scrollMatchIntoView({
            element: textDivs[begin.divIdx],
            pageIndex: pageIdx,
            matchIndex: selectedMatchIdx
          });
        }

        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }

          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }

        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
        } else {
          appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);

          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = "highlight middle" + highlightSuffix;
          }

          beginText(end, "highlight end" + highlightSuffix);
        }

        prevEnd = end;
      }

      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
    }
  }, {
    key: "_updateMatches",
    value: function _updateMatches() {
      if (!this.renderingDone) {
        return;
      }

      var findController = this.findController,
          matches = this.matches,
          pageIdx = this.pageIdx,
          textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var clearedUntilDivIdx = -1;

      for (var i = 0, ii = matches.length; i < ii; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);

        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = textContentItemsStr[n];
          div.className = "";
        }

        clearedUntilDivIdx = match.end.divIdx + 1;
      }

      if (!findController || !findController.highlightMatches) {
        return;
      }

      var pageMatches = findController.pageMatches[pageIdx] || null;
      var pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
      var pageMatchesColor = findController.pageMatchesColor[pageIdx] || null;
      this.matches = this._convertMatches(pageMatches, pageMatchesLength, pageMatchesColor);

      this._renderMatches(this.matches);
    }
  }, {
    key: "_bindMouse",
    value: function _bindMouse() {
      var _this2 = this;

      var div = this.textLayerDiv;
      var expandDivsTimer = null;
      div.addEventListener("mousedown", function (evt) {
        if (_this2.enhanceTextSelection && _this2.textLayerRenderTask) {
          _this2.textLayerRenderTask.expandTextDivs(true);

          if (expandDivsTimer) {
            clearTimeout(expandDivsTimer);
            expandDivsTimer = null;
          }

          return;
        }

        var end = div.querySelector(".endOfContent");

        if (!end) {
          return;
        }

        var adjustTop = evt.target !== div;
        adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue("-moz-user-select") !== "none";

        if (adjustTop) {
          var divBounds = div.getBoundingClientRect();
          var r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
          end.style.top = (r * 100).toFixed(2) + "%";
        }

        end.classList.add("active");
      });
      div.addEventListener("mouseup", function () {
        if (_this2.enhanceTextSelection && _this2.textLayerRenderTask) {
          expandDivsTimer = setTimeout(function () {
            if (_this2.textLayerRenderTask) {
              _this2.textLayerRenderTask.expandTextDivs(false);
            }

            expandDivsTimer = null;
          }, EXPAND_DIVS_TIMEOUT);
          return;
        }

        var end = div.querySelector(".endOfContent");

        if (!end) {
          return;
        }

        end.style.top = "";
        end.classList.remove("active");
      });
    }
  }]);

  return TextLayerBuilder;
}();

exports.TextLayerBuilder = TextLayerBuilder;

var DefaultTextLayerFactory = /*#__PURE__*/function () {
  function DefaultTextLayerFactory() {
    _classCallCheck(this, DefaultTextLayerFactory);
  }

  _createClass(DefaultTextLayerFactory, [{
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      return new TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        pageIndex: pageIndex,
        viewport: viewport,
        enhanceTextSelection: enhanceTextSelection,
        eventBus: eventBus
      });
    }
  }]);

  return DefaultTextLayerFactory;
}();

exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SecondaryToolbar = void 0;

var _ui_utils = __webpack_require__(6);

var _pdf_cursor_tools = __webpack_require__(8);

var _pdf_single_page_viewer = __webpack_require__(167);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SecondaryToolbar = /*#__PURE__*/function () {
  function SecondaryToolbar(options, mainContainer, eventBus) {
    var _this = this;

    _classCallCheck(this, SecondaryToolbar);

    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.toolbarButtonContainer = options.toolbarButtonContainer;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: "presentationmode",
      close: true
    }, {
      element: options.openFileButton,
      eventName: "openfile",
      close: true
    }, {
      element: options.printButton,
      eventName: "print",
      close: true
    }, {
      element: options.downloadButton,
      eventName: "download",
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: "firstpage",
      close: true
    }, {
      element: options.lastPageButton,
      eventName: "lastpage",
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: "rotatecw",
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: "rotateccw",
      close: false
    }, {
      element: options.cursorSelectToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.SELECT
      },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.HAND
      },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.VERTICAL
      },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.HORIZONTAL
      },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.WRAPPED
      },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.NONE
      },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.ODD
      },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.EVEN
      },
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: "documentproperties",
      close: true
    }];
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
    };
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.opened = false;
    this.containerHeight = null;
    this.previousContainerHeight = null;
    this.reset();

    this._bindClickListeners();

    this._bindCursorToolsListener(options);

    this._bindScrollModeListener(options);

    this._bindSpreadModeListener(options);

    this.eventBus._on("resize", this._setMaxHeight.bind(this));

    this.eventBus._on("baseviewerinit", function (evt) {
      if (evt.source instanceof _pdf_single_page_viewer.PDFSinglePageViewer) {
        _this.toolbarButtonContainer.classList.add("hiddenScrollModeButtons", "hiddenSpreadModeButtons");
      } else {
        _this.toolbarButtonContainer.classList.remove("hiddenScrollModeButtons", "hiddenSpreadModeButtons");
      }
    });
  }

  _createClass(SecondaryToolbar, [{
    key: "setPageNumber",
    value: function setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;

      this._updateUIState();
    }
  }, {
    key: "setPagesCount",
    value: function setPagesCount(pagesCount) {
      this.pagesCount = pagesCount;

      this._updateUIState();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pageNumber = 0;
      this.pagesCount = 0;

      this._updateUIState();

      this.eventBus.dispatch("secondarytoolbarreset", {
        source: this
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState() {
      this.items.firstPage.disabled = this.pageNumber <= 1;

      if (document.getElementById("previousPage")) {
        document.getElementById("previousPage").disabled = this.pageNumber <= 1;
      }

      this.items.lastPage.disabled = this.pageNumber >= this.pagesCount;

      if (document.getElementById("nextPage")) {
        document.getElementById("nextPage").disabled = this.pageNumber >= this.pagesCount;
      }

      this.items.pageRotateCw.disabled = this.pagesCount === 0;
      this.items.pageRotateCcw.disabled = this.pagesCount === 0;
      this.eventBus.dispatch("updateuistate", {
        source: this,
        widget: "SecondaryToolbar",
        pageNumber: this.pageNumber,
        pagesCount: this.pagesCount
      });
    }
  }, {
    key: "_bindClickListeners",
    value: function _bindClickListeners() {
      var _this2 = this;

      this.toggleButton.addEventListener("click", this.toggle.bind(this));

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
              element = _step$value.element,
              eventName = _step$value.eventName,
              close = _step$value.close,
              eventDetails = _step$value.eventDetails;
          element.addEventListener("click", function (evt) {
            if (eventName !== null) {
              var details = {
                source: _this2
              };

              for (var property in eventDetails) {
                details[property] = eventDetails[property];
              }

              _this2.eventBus.dispatch(eventName, details);
            }

            if (close) {
              _this2.close();
            }
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_bindCursorToolsListener",
    value: function _bindCursorToolsListener(buttons) {
      this.eventBus._on("cursortoolchanged", function (_ref) {
        var tool = _ref.tool;
        buttons.cursorSelectToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.SELECT);
        buttons.cursorHandToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.HAND);
      });
    }
  }, {
    key: "_bindScrollModeListener",
    value: function _bindScrollModeListener(buttons) {
      var _this3 = this;

      function scrollModeChanged(_ref2) {
        var mode = _ref2.mode;
        buttons.scrollVerticalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.VERTICAL);
        buttons.scrollHorizontalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.HORIZONTAL);
        buttons.scrollWrappedButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.WRAPPED);
        var isScrollModeHorizontal = mode === _ui_utils.ScrollMode.HORIZONTAL;
        buttons.spreadNoneButton.disabled = isScrollModeHorizontal;
        buttons.spreadOddButton.disabled = isScrollModeHorizontal;
        buttons.spreadEvenButton.disabled = isScrollModeHorizontal;
      }

      this.eventBus._on("scrollmodechanged", scrollModeChanged);

      this.eventBus._on("secondarytoolbarreset", function (evt) {
        if (evt.source === _this3) {
          scrollModeChanged({
            mode: _ui_utils.ScrollMode.VERTICAL
          });
        }
      });
    }
  }, {
    key: "_bindSpreadModeListener",
    value: function _bindSpreadModeListener(buttons) {
      var _this4 = this;

      function spreadModeChanged(_ref3) {
        var mode = _ref3.mode;
        buttons.spreadNoneButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.NONE);
        buttons.spreadOddButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.ODD);
        buttons.spreadEvenButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.EVEN);
      }

      this.eventBus._on("spreadmodechanged", spreadModeChanged);

      this.eventBus._on("secondarytoolbarreset", function (evt) {
        if (evt.source === _this4) {
          spreadModeChanged({
            mode: _ui_utils.SpreadMode.NONE
          });
        }
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (this.opened) {
        return;
      }

      this.opened = true;

      this._setMaxHeight();

      this.toggleButton.classList.add("toggled");
      this.toolbar.classList.remove("hidden");
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.opened) {
        return;
      }

      this.opened = false;
      this.toolbar.classList.add("hidden");
      this.toggleButton.classList.remove("toggled");
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "_setMaxHeight",
    value: function _setMaxHeight() {
      if (!this.opened) {
        return;
      }

      this.containerHeight = this.mainContainer.clientHeight;

      if (this.containerHeight === this.previousContainerHeight) {
        return;
      }

      this.toolbarButtonContainer.style.maxHeight = "".concat(this.containerHeight - _ui_utils.SCROLLBAR_PADDING, "px");
      this.previousContainerHeight = this.containerHeight;
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.opened;
    }
  }]);

  return SecondaryToolbar;
}();

exports.SecondaryToolbar = SecondaryToolbar;

/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSinglePageViewer = void 0;

var _base_viewer = __webpack_require__(31);

var _pdfjsLib = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFSinglePageViewer = /*#__PURE__*/function (_BaseViewer) {
  _inherits(PDFSinglePageViewer, _BaseViewer);

  var _super = _createSuper(PDFSinglePageViewer);

  function PDFSinglePageViewer(options) {
    var _this;

    _classCallCheck(this, PDFSinglePageViewer);

    _this = _super.call(this, options);

    _this.eventBus._on("pagesinit", function (evt) {
      _this._ensurePageViewVisible();
    });

    return _this;
  }

  _createClass(PDFSinglePageViewer, [{
    key: "_resetView",
    value: function _resetView() {
      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_resetView", this).call(this);

      this._previousPageNumber = 1;
      this._shadowViewer = document.createDocumentFragment();
      this._updateScrollDown = null;
    }
  }, {
    key: "_ensurePageViewVisible",
    value: function _ensurePageViewVisible() {
      var pageView = this._pages[this._currentPageNumber - 1];
      var previousPageView = this._pages[this._previousPageNumber - 1];
      var viewerNodes = this.viewer.childNodes;

      switch (viewerNodes.length) {
        case 0:
          this.viewer.appendChild(pageView.div);
          break;

        case 1:
          if (viewerNodes[0] !== previousPageView.div) {
            throw new Error("_ensurePageViewVisible: Unexpected previously visible page.");
          }

          if (pageView === previousPageView) {
            break;
          }

          this._shadowViewer.appendChild(previousPageView.div);

          this.viewer.appendChild(pageView.div);
          this.container.scrollTop = 0;
          break;

        default:
          throw new Error("_ensurePageViewVisible: Only one page should be visible at a time.");
      }

      this._previousPageNumber = this._currentPageNumber;
    }
  }, {
    key: "_scrollUpdate",
    value: function _scrollUpdate() {
      if (this._updateScrollDown) {
        this._updateScrollDown();
      }

      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_scrollUpdate", this).call(this);
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var _this2 = this;

      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;

      if (pageNumber) {
        this._setCurrentPageNumber(pageNumber);
      }

      var scrolledDown = this._currentPageNumber >= this._previousPageNumber;

      this._ensurePageViewVisible();

      this.update();

      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_scrollIntoView", this).call(this, {
        pageDiv: pageDiv,
        pageSpot: pageSpot,
        pageNumber: pageNumber
      });

      this._updateScrollDown = function () {
        _this2.scroll.down = scrolledDown;
        _this2._updateScrollDown = null;
      };
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      return this._getCurrentVisiblePage();
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {}
  }, {
    key: "_updateScrollMode",
    value: function _updateScrollMode() {}
  }, {
    key: "_updateSpreadMode",
    value: function _updateSpreadMode() {}
  }, {
    key: "_getPageAdvance",
    value: function _getPageAdvance() {
      return 1;
    }
  }, {
    key: "_viewerElement",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_viewerElement", this._shadowViewer);
    }
  }, {
    key: "_pageWidthScaleFactor",
    get: function get() {
      return 1;
    }
  }, {
    key: "_isScrollModeHorizontal",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_isScrollModeHorizontal", false);
    }
  }]);

  return PDFSinglePageViewer;
}(_base_viewer.BaseViewer);

exports.PDFSinglePageViewer = PDFSinglePageViewer;

/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Toolbar = void 0;

var _ui_utils = __webpack_require__(6);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PAGE_NUMBER_LOADING_INDICATOR = "visiblePageIsLoading";
var SCALE_SELECT_CONTAINER_WIDTH = 140;
var SCALE_SELECT_WIDTH = 162;

var Toolbar = /*#__PURE__*/function () {
  function Toolbar(options, eventBus) {
    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, Toolbar);

    this.toolbar = options.container;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.buttons = [{
      element: options.previous,
      eventName: "previouspage"
    }, {
      element: options.next,
      eventName: "nextpage"
    }, {
      element: options.zoomIn,
      eventName: "zoomin"
    }, {
      element: options.zoomOut,
      eventName: "zoomout"
    }, {
      element: options.openFile,
      eventName: "openfile"
    }, {
      element: options.print,
      eventName: "print"
    }, {
      element: options.presentationModeButton,
      eventName: "presentationmode"
    }, {
      element: options.download,
      eventName: "download"
    }, {
      element: options.viewBookmark,
      eventName: null
    }];
    this.items = {
      numPages: options.numPages,
      pageNumber: options.pageNumber,
      scaleSelectContainer: options.scaleSelectContainer,
      scaleSelect: options.scaleSelect,
      customScaleOption: options.customScaleOption,
      previous: options.previous,
      next: options.next,
      zoomIn: options.zoomIn,
      zoomOut: options.zoomOut
    };
    this._wasLocalized = false;
    this.reset();

    this._bindListeners();
  }

  _createClass(Toolbar, [{
    key: "setPageNumber",
    value: function setPageNumber(pageNumber, pageLabel) {
      this.pageNumber = pageNumber;
      this.pageLabel = pageLabel;

      this._updateUIState(false);
    }
  }, {
    key: "setPagesCount",
    value: function setPagesCount(pagesCount, hasPageLabels) {
      this.pagesCount = pagesCount;
      this.hasPageLabels = hasPageLabels;

      this._updateUIState(true);
    }
  }, {
    key: "setPageScale",
    value: function setPageScale(pageScaleValue, pageScale) {
      this.pageScaleValue = (pageScaleValue || pageScale).toString();
      this.pageScale = pageScale;

      this._updateUIState(false);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pageNumber = 0;
      this.pageLabel = null;
      this.hasPageLabels = false;
      this.pagesCount = 0;
      var defaultZoomOption = PDFViewerApplicationOptions.get('defaultZoomValue');

      if (defaultZoomOption) {
        this.pageScaleValue = defaultZoomOption;

        if (!!Number(defaultZoomOption)) {
          this.pageScale = Number(defaultZoomOption);
        }
      } else {
        this.pageScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
        this.pageScale = _ui_utils.DEFAULT_SCALE;
      }

      this._updateUIState(true);

      this.updateLoadingIndicatorState();
    }
  }, {
    key: "_bindListeners",
    value: function _bindListeners() {
      var _this = this;

      var _this$items = this.items,
          pageNumber = _this$items.pageNumber,
          scaleSelect = _this$items.scaleSelect;
      var self = this;

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
              element = _step$value.element,
              eventName = _step$value.eventName;
          element.addEventListener("click", function (evt) {
            if (eventName !== null) {
              _this.eventBus.dispatch(eventName, {
                source: _this
              });
            }
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      pageNumber.addEventListener("click", function () {
        this.select();
      });
      pageNumber.addEventListener("change", function () {
        self.eventBus.dispatch("pagenumberchanged", {
          source: self,
          value: this.value
        });
      });
      scaleSelect.addEventListener("change", function () {
        if (this.value === "custom") {
          return;
        }

        self.eventBus.dispatch("scalechanged", {
          source: self,
          value: this.value
        });
      });
      scaleSelect.oncontextmenu = _ui_utils.noContextMenuHandler;

      this.eventBus._on("localized", function () {
        _this._wasLocalized = true;

        _this._updateUIState(true);
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState() {
      var resetNumPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._wasLocalized) {
        return;
      }

      var pageNumber = this.pageNumber,
          pagesCount = this.pagesCount,
          pageScaleValue = this.pageScaleValue,
          pageScale = this.pageScale,
          items = this.items;

      if (resetNumPages) {
        if (this.hasPageLabels) {
          items.pageNumber.type = "text";
        } else {
          items.pageNumber.type = "number";
          this.l10n.get("of_pages", {
            pagesCount: pagesCount
          }, "of {{pagesCount}}").then(function (msg) {
            items.numPages.textContent = msg;
          });
        }

        items.pageNumber.max = pagesCount;
      }

      if (this.hasPageLabels) {
        items.pageNumber.value = this.pageLabel;
        this.l10n.get("page_of_pages", {
          pageNumber: pageNumber,
          pagesCount: pagesCount
        }, "({{pageNumber}} of {{pagesCount}})").then(function (msg) {
          items.numPages.textContent = msg;
        });
      } else {
        items.pageNumber.value = pageNumber;
      }

      items.previous.disabled = pageNumber <= 1;
      items.next.disabled = pageNumber >= pagesCount;
      items.zoomOut.disabled = pageScale <= _ui_utils.MIN_SCALE;
      items.zoomIn.disabled = pageScale >= _ui_utils.MAX_SCALE;
      var customScale = Math.round(pageScale * 10000) / 100;
      this.l10n.get("page_scale_percent", {
        scale: customScale
      }, "{{scale}}%").then(function (msg) {
        var predefinedValueFound = false;

        var _iterator2 = _createForOfIteratorHelper(items.scaleSelect.options),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var option = _step2.value;

            if (option.value !== pageScaleValue) {
              option.selected = false;
              continue;
            }

            option.selected = true;
            predefinedValueFound = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (!predefinedValueFound) {
          items.customScaleOption.textContent = msg;
          items.customScaleOption.selected = true;
        }
      });
      this.eventBus.dispatch("updateuistate", {
        source: this,
        widget: "Toolbar",
        pageNumber: pageNumber,
        pagesCount: pagesCount,
        pageScaleValue: pageScaleValue,
        pageScale: pageScale
      });
    }
  }, {
    key: "updateLoadingIndicatorState",
    value: function updateLoadingIndicatorState() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pageNumberInput = this.items.pageNumber;
      pageNumberInput.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);
    }
  }]);

  return Toolbar;
}();

exports.Toolbar = Toolbar;

/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ViewHistory = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

var ViewHistory = /*#__PURE__*/function () {
  function ViewHistory(fingerprint) {
    var _this = this;

    var cacheSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_VIEW_HISTORY_CACHE_SIZE;

    _classCallCheck(this, ViewHistory);

    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then(function (databaseStr) {
      var database = JSON.parse(databaseStr || "{}");
      var index = -1;

      if (!Array.isArray(database.files)) {
        database.files = [];
      } else {
        while (database.files.length >= _this.cacheSize) {
          database.files.shift();
        }

        for (var i = 0, ii = database.files.length; i < ii; i++) {
          var branch = database.files[i];

          if (branch.fingerprint === _this.fingerprint) {
            index = i;
            break;
          }
        }
      }

      if (index === -1) {
        index = database.files.push({
          fingerprint: _this.fingerprint
        }) - 1;
      }

      _this.file = database.files[index];
      _this.database = database;
    });
  }

  _createClass(ViewHistory, [{
    key: "_writeToStorage",
    value: function () {
      var _writeToStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var databaseStr;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                databaseStr = JSON.stringify(this.database);
                localStorage.setItem("pdfjs.history", databaseStr);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _writeToStorage() {
        return _writeToStorage2.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: "_readFromStorage",
    value: function () {
      var _readFromStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", localStorage.getItem("pdfjs.history"));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _readFromStorage() {
        return _readFromStorage2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, val) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._initializedPromise;

              case 2:
                this.file[name] = val;
                return _context3.abrupt("return", this._writeToStorage());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set(_x, _x2) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "setMultiple",
    value: function () {
      var _setMultiple = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(properties) {
        var name;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._initializedPromise;

              case 2:
                for (name in properties) {
                  this.file[name] = properties[name];
                }

                return _context4.abrupt("return", this._writeToStorage());

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setMultiple(_x3) {
        return _setMultiple.apply(this, arguments);
      }

      return setMultiple;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(name, defaultValue) {
        var val;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._initializedPromise;

              case 2:
                val = this.file[name];
                return _context5.abrupt("return", val !== undefined ? val : defaultValue);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x4, _x5) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getMultiple",
    value: function () {
      var _getMultiple = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(properties) {
        var values, name, val;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._initializedPromise;

              case 2:
                values = Object.create(null);

                for (name in properties) {
                  val = this.file[name];
                  values[name] = val !== undefined ? val : properties[name];
                }

                return _context6.abrupt("return", values);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getMultiple(_x6) {
        return _getMultiple.apply(this, arguments);
      }

      return getMultiple;
    }()
  }]);

  return ViewHistory;
}();

exports.ViewHistory = ViewHistory;

/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericCom = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _app = __webpack_require__(3);

var _preferences = __webpack_require__(171);

var _download_manager = __webpack_require__(172);

var _genericl10n = __webpack_require__(173);

var _generic_scripting = __webpack_require__(175);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

;
var GenericCom = {};
exports.GenericCom = GenericCom;

var GenericPreferences = /*#__PURE__*/function (_BasePreferences) {
  _inherits(GenericPreferences, _BasePreferences);

  var _super = _createSuper(GenericPreferences);

  function GenericPreferences() {
    _classCallCheck(this, GenericPreferences);

    return _super.apply(this, arguments);
  }

  _createClass(GenericPreferences, [{
    key: "_writeToStorage",
    value: function () {
      var _writeToStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(prefObj) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function _writeToStorage(_x) {
        return _writeToStorage2.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: "_readFromStorage",
    value: function () {
      var _readFromStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(prefObj) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", JSON.parse(localStorage.getItem("pdfjs.preferences")));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _readFromStorage(_x2) {
        return _readFromStorage2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }]);

  return GenericPreferences;
}(_preferences.BasePreferences);

var GenericExternalServices = /*#__PURE__*/function (_DefaultExternalServi) {
  _inherits(GenericExternalServices, _DefaultExternalServi);

  var _super2 = _createSuper(GenericExternalServices);

  function GenericExternalServices() {
    _classCallCheck(this, GenericExternalServices);

    return _super2.apply(this, arguments);
  }

  _createClass(GenericExternalServices, null, [{
    key: "createDownloadManager",
    value: function createDownloadManager(options) {
      return new _download_manager.DownloadManager();
    }
  }, {
    key: "createPreferences",
    value: function createPreferences() {
      return new GenericPreferences();
    }
  }, {
    key: "createL10n",
    value: function createL10n(_ref) {
      var _ref$locale = _ref.locale,
          locale = _ref$locale === void 0 ? "en-US" : _ref$locale;
      return new _genericl10n.GenericL10n(locale);
    }
  }, {
    key: "createScripting",
    value: function createScripting(_ref2) {
      var sandboxBundleSrc = _ref2.sandboxBundleSrc;
      return new _generic_scripting.GenericScripting(sandboxBundleSrc);
    }
  }]);

  return GenericExternalServices;
}(_app.DefaultExternalServices);

_app.PDFViewerApplication.externalServices = GenericExternalServices;

/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BasePreferences = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _app_options = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BasePreferences = /*#__PURE__*/function () {
  function BasePreferences() {
    var _this = this;

    _classCallCheck(this, BasePreferences);

    if (this.constructor === BasePreferences) {
      throw new Error("Cannot initialize BasePreferences.");
    }

    Object.defineProperty(this, "defaults", {
      value: Object.freeze({
        "cursorToolOnLoad": 0,
        "defaultZoomValue": "",
        "disablePageLabels": false,
        "enablePermissions": false,
        "enablePrintAutoRotate": false,
        "enableScripting": false,
        "enableWebGL": false,
        "externalLinkTarget": 0,
        "historyUpdateUrl": false,
        "ignoreDestinationZoom": false,
        "pdfBugEnabled": false,
        "removePageBorders": false,
        "renderer": "canvas",
        "renderInteractiveForms": true,
        "sidebarViewOnLoad": -1,
        "scrollModeOnLoad": -1,
        "spreadModeOnLoad": -1,
        "textLayerMode": 1,
        "useOnlyCssZoom": false,
        "viewerCssTheme": 0,
        "viewOnLoad": 0,
        "disableAutoFetch": false,
        "disableFontFace": false,
        "disableRange": false,
        "disableStream": false
      }),
      writable: false,
      enumerable: true,
      configurable: false
    });
    this.prefs = Object.assign(Object.create(null), this.defaults);
    this._initializedPromise = this._readFromStorage(this.defaults).then(function (prefs) {
      if (!prefs) {
        return;
      }

      for (var name in prefs) {
        var defaultValue = _this.defaults[name],
            prefValue = prefs[name];

        if (defaultValue === undefined || _typeof(prefValue) !== _typeof(defaultValue)) {
          continue;
        }

        _this.prefs[name] = prefValue;
      }
    });
  }

  _createClass(BasePreferences, [{
    key: "_writeToStorage",
    value: function () {
      var _writeToStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(prefObj) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error("Not implemented: _writeToStorage");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function _writeToStorage(_x) {
        return _writeToStorage2.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: "_readFromStorage",
    value: function () {
      var _readFromStorage2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(prefObj) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error("Not implemented: _readFromStorage");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _readFromStorage(_x2) {
        return _readFromStorage2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._initializedPromise;

              case 2:
                this.prefs = Object.assign(Object.create(null), this.defaults);
                return _context3.abrupt("return", this._writeToStorage(this.defaults));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(name, value) {
        var defaultValue, valueType, defaultType;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._initializedPromise;

              case 2:
                defaultValue = this.defaults[name];

                if (!(defaultValue === undefined)) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Set preference: \"".concat(name, "\" is undefined."));

              case 7:
                if (!(value === undefined)) {
                  _context4.next = 9;
                  break;
                }

                throw new Error("Set preference: no value is specified.");

              case 9:
                valueType = _typeof(value);
                defaultType = _typeof(defaultValue);

                if (!(valueType !== defaultType)) {
                  _context4.next = 19;
                  break;
                }

                if (!(valueType === "number" && defaultType === "string")) {
                  _context4.next = 16;
                  break;
                }

                value = value.toString();
                _context4.next = 17;
                break;

              case 16:
                throw new Error("Set preference: \"".concat(value, "\" is a ").concat(valueType, ", ") + "expected a ".concat(defaultType, "."));

              case 17:
                _context4.next = 21;
                break;

              case 19:
                if (!(valueType === "number" && !Number.isInteger(value))) {
                  _context4.next = 21;
                  break;
                }

                throw new Error("Set preference: \"".concat(value, "\" must be an integer."));

              case 21:
                this.prefs[name] = value;
                return _context4.abrupt("return", this._writeToStorage(this.prefs));

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function set(_x3, _x4) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(name) {
        var defaultValue, prefValue;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._initializedPromise;

              case 2:
                defaultValue = this.defaults[name];

                if (!(defaultValue === undefined)) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Get preference: \"".concat(name, "\" is undefined."));

              case 7:
                prefValue = this.prefs[name];

                if (!(prefValue !== undefined)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", prefValue);

              case 10:
                return _context5.abrupt("return", defaultValue);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x5) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._initializedPromise;

              case 2:
                return _context6.abrupt("return", Object.assign(Object.create(null), this.defaults, this.prefs));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);

  return BasePreferences;
}();

exports.BasePreferences = BasePreferences;

/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DownloadManager = void 0;

var _pdfjsLib = __webpack_require__(7);

var _viewer_compatibility = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

function _download(blobUrl, filename) {
  var a = document.createElement("a");

  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }

  a.href = blobUrl;
  a.target = "_parent";

  if ("download" in a) {
    a.download = filename;
  }

  (document.body || document.documentElement).appendChild(a);
  a.click();
  a.remove();
}

var DownloadManager = /*#__PURE__*/function () {
  function DownloadManager() {
    _classCallCheck(this, DownloadManager);
  }

  _createClass(DownloadManager, [{
    key: "downloadUrl",
    value: function downloadUrl(url, filename) {
      if (!(0, _pdfjsLib.createValidAbsoluteUrl)(url, "http://example.com")) {
        return;
      }

      _download(url + "#pdfjs.action=download", filename);
    }
  }, {
    key: "downloadData",
    value: function downloadData(data, filename, contentType) {
      var blobUrl = (0, _pdfjsLib.createObjectURL)(data, contentType, _viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL);

      _download(blobUrl, filename);
    }
  }, {
    key: "download",
    value: function download(blob, url, filename) {
      var sourceEventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "download";

      if (_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
        this.downloadUrl(url, filename);
        return;
      }

      var blobUrl = URL.createObjectURL(blob);

      _download(blobUrl, filename);
    }
  }]);

  return DownloadManager;
}();

exports.DownloadManager = DownloadManager;

/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericL10n = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

__webpack_require__(174);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var webL10n = document.webL10n;

var GenericL10n = /*#__PURE__*/function () {
  function GenericL10n(lang) {
    _classCallCheck(this, GenericL10n);

    this._lang = lang;
    this._ready = new Promise(function (resolve, reject) {
      webL10n.setLanguage(lang, function () {
        resolve(webL10n);
      });
    });
  }

  _createClass(GenericL10n, [{
    key: "getLanguage",
    value: function () {
      var _getLanguage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var l10n;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._ready;

              case 2:
                l10n = _context.sent;
                return _context.abrupt("return", l10n.getLanguage());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLanguage() {
        return _getLanguage.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: "getDirection",
    value: function () {
      var _getDirection = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var l10n;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._ready;

              case 2:
                l10n = _context2.sent;
                return _context2.abrupt("return", l10n.getDirection());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDirection() {
        return _getDirection.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(property, args, fallback) {
        var l10n;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ready;

              case 2:
                l10n = _context3.sent;
                return _context3.abrupt("return", l10n.get(property, args, fallback));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x, _x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "translate",
    value: function () {
      var _translate = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(element) {
        var l10n;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._ready;

              case 2:
                l10n = _context4.sent;
                return _context4.abrupt("return", l10n.translate(element));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function translate(_x4) {
        return _translate.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return GenericL10n;
}();

exports.GenericL10n = GenericL10n;

/***/ }),
/* 174 */
/***/ (() => {

"use strict";


document.webL10n = function (window, document, undefined) {
  var gL10nData = {};
  var gTextData = "";
  var gTextProp = "textContent";
  var gLanguage = "";
  var gMacros = {};
  var gReadyState = "loading";
  var gAsyncResourceLoading = true;

  function getL10nResourceLinks() {
    return document.querySelectorAll('link[type="application/l10n"]');
  }

  function getL10nDictionary() {
    var script = document.querySelector('script[type="application/l10n"]');
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll("*[data-l10n-id]") : [];
  }

  function getL10nAttributes(element) {
    if (!element) return {};
    var l10nId = element.getAttribute("data-l10n-id");
    var l10nArgs = element.getAttribute("data-l10n-args");
    var args = {};

    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

        if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
          console.warn("could not parse arguments for #" + l10nId);
        }
      }
    }

    return {
      id: l10nId,
      args: args
    };
  }

  function fireL10nReadyEvent(lang) {
    var evtObject = document.createEvent("Event");
    evtObject.initEvent("localized", true, false);
    evtObject.language = lang;
    document.dispatchEvent(evtObject);
  }

  function xhrLoadText(url, onSuccess, onFailure) {
    onSuccess = onSuccess || function _onSuccess(data) {};

    onFailure = onFailure || function _onFailure() {};

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, gAsyncResourceLoading);

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain; charset=utf-8");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };

    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, "") || "./";

    function evalString(text) {
      if (text.lastIndexOf("\\") < 0) return text;
      return text.replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\{/g, "{").replace(/\\}/g, "}").replace(/\\"/g, '"').replace(/\\'/g, "'");
    }

    function parseProperties(text, parsedPropertiesCallback) {
      var dictionary = {};
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/;

      function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
        var entries = rawText.replace(reBlank, "").split(/[\r\n]+/);
        var currentLang = "*";
        var genericLang = lang.split("-", 1)[0];
        var skipLang = false;
        var match = "";
        var languagefound = false;

        function nextEntry() {
          var genericMatch = undefined;

          while (true) {
            if (!entries.length && genericMatch) {
              if (!languagefound) {
                loadImport(genericMatch, nextEntry);
              } else {
                nextEntry();
              }

              return;
            } else if (!entries.length) {
              parsedRawLinesCallback();
              return;
            }

            var line = entries.shift();
            if (reComment.test(line)) continue;

            if (extendedSyntax) {
              match = reSection.exec(line);

              if (match) {
                currentLang = match[1].toLowerCase();
                skipLang = currentLang !== "*" && currentLang !== lang && currentLang !== genericLang;
                continue;
              } else if (skipLang) {
                continue;
              }

              match = reImport.exec(line);

              if (match) {
                if (currentLang === "*" || currentLang === lang) {
                  loadImport(baseURL + match[1], nextEntry);
                  languagefound = true;
                  return;
                } else {
                  genericMatch = baseURL + match[1];
                }
              }
            }

            var tmp = line.match(reSplit);

            if (tmp && tmp.length == 3) {
              dictionary[tmp[1]] = evalString(tmp[2]);
            }
          }
        }

        nextEntry();
      }

      function loadImport(url, callback) {
        xhrLoadText(url, function (content) {
          parseRawLines(content, false, callback);
        }, function () {
          var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

          if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
            console.warn(url + " not found.");
          }

          callback();
        });
      }

      parseRawLines(text, true, function () {
        parsedPropertiesCallback(dictionary);
      });
    }

    xhrLoadText(href, function (response) {
      gTextData += response;
      parseProperties(response, function (data) {
        for (var key in data) {
          var id,
              prop,
              index = key.lastIndexOf(".");

          if (index > 0) {
            id = key.substring(0, index);
            prop = key.substring(index + 1);
          } else {
            id = key;
            prop = gTextProp;
          }

          if (!gL10nData[id]) {
            gL10nData[id] = {};
          }

          gL10nData[id][prop] = data[key];
        }

        if (successCallback) {
          successCallback();
        }
      });
    }, failureCallback);
  }

  function loadLocale(lang, callback) {
    var originalCaseLang = lang;

    if (lang) {
      lang = lang.toLowerCase();
    }

    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;

    if (langCount === 0) {
      var dict = getL10nDictionary();

      if (dict && dict.locales && dict.default_locale) {
        console.log("The PDF viewer uses the pre-compiled language bundle stored in the HTML page.");
        gL10nData = dict.locales[originalCaseLang];

        if (!gL10nData) {
          var defaultLocale = dict.default_locale.toLowerCase();

          for (var anyCaseLang in dict.locales) {
            originalCaseLang = anyCaseLang;
            anyCaseLang = anyCaseLang.toLowerCase();

            if (anyCaseLang === lang) {
              gL10nData = dict.locales[originalCaseLang];
              break;
            } else if (anyCaseLang === defaultLocale) {
              gL10nData = dict.locales[originalCaseLang];
            }
          }
        }

        callback();
      } else {
        console.log("Could not load the translation files for the PDF viewer. Check the flag useBrowserLocale, check the locales subfolder of the assets folder, or add the locale definition to the index.html");
      }

      fireL10nReadyEvent(lang);
      gReadyState = "complete";
      return;
    }

    var onResourceLoaded = null;
    var gResourceCount = 0;

    onResourceLoaded = function onResourceLoaded() {
      gResourceCount++;

      if (gResourceCount >= langCount) {
        callback();
        fireL10nReadyEvent(lang);
        gReadyState = "complete";
      }
    };

    function L10nResourceLink(link) {
      var href = link.href;

      this.load = function (lang, callback) {
        parseResource(href, lang, callback, function () {
          var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

          if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
            console.warn(href + " not found.");
            console.warn('"' + lang + '" resource not found');
          }

          gLanguage = "";
          callback();
        });
      };
    }

    for (var i = 0; i < langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      resource.load(lang, onResourceLoaded);
    }
  }

  function clear() {
    gL10nData = {};
    gTextData = "";
    gLanguage = "";
  }

  function getPluralRules(lang) {
    var locales2rules = {
      af: 3,
      ak: 4,
      am: 4,
      ar: 1,
      asa: 3,
      az: 0,
      be: 11,
      bem: 3,
      bez: 3,
      bg: 3,
      bh: 4,
      bm: 0,
      bn: 3,
      bo: 0,
      br: 20,
      brx: 3,
      bs: 11,
      ca: 3,
      cgg: 3,
      chr: 3,
      cs: 12,
      cy: 17,
      da: 3,
      de: 3,
      dv: 3,
      dz: 0,
      ee: 3,
      el: 3,
      en: 3,
      eo: 3,
      es: 3,
      et: 3,
      eu: 3,
      fa: 0,
      ff: 5,
      fi: 3,
      fil: 4,
      fo: 3,
      fr: 5,
      fur: 3,
      fy: 3,
      ga: 8,
      gd: 24,
      gl: 3,
      gsw: 3,
      gu: 3,
      guw: 4,
      gv: 23,
      ha: 3,
      haw: 3,
      he: 2,
      hi: 4,
      hr: 11,
      hu: 0,
      id: 0,
      ig: 0,
      ii: 0,
      is: 3,
      it: 3,
      iu: 7,
      ja: 0,
      jmc: 3,
      jv: 0,
      ka: 0,
      kab: 5,
      kaj: 3,
      kcg: 3,
      kde: 0,
      kea: 0,
      kk: 3,
      kl: 3,
      km: 0,
      kn: 0,
      ko: 0,
      ksb: 3,
      ksh: 21,
      ku: 3,
      kw: 7,
      lag: 18,
      lb: 3,
      lg: 3,
      ln: 4,
      lo: 0,
      lt: 10,
      lv: 6,
      mas: 3,
      mg: 4,
      mk: 16,
      ml: 3,
      mn: 3,
      mo: 9,
      mr: 3,
      ms: 0,
      mt: 15,
      my: 0,
      nah: 3,
      naq: 7,
      nb: 3,
      nd: 3,
      ne: 3,
      nl: 3,
      nn: 3,
      no: 3,
      nr: 3,
      nso: 4,
      ny: 3,
      nyn: 3,
      om: 3,
      or: 3,
      pa: 3,
      pap: 3,
      pl: 13,
      ps: 3,
      pt: 3,
      rm: 3,
      ro: 9,
      rof: 3,
      ru: 11,
      rwk: 3,
      sah: 0,
      saq: 3,
      se: 7,
      seh: 3,
      ses: 0,
      sg: 0,
      sh: 11,
      shi: 19,
      sk: 12,
      sl: 14,
      sma: 7,
      smi: 7,
      smj: 7,
      smn: 7,
      sms: 7,
      sn: 3,
      so: 3,
      sq: 3,
      sr: 11,
      ss: 3,
      ssy: 3,
      st: 3,
      sv: 3,
      sw: 3,
      syr: 3,
      ta: 3,
      te: 3,
      teo: 3,
      th: 0,
      ti: 4,
      tig: 3,
      tk: 3,
      tl: 4,
      tn: 3,
      to: 0,
      tr: 0,
      ts: 3,
      tzm: 22,
      uk: 11,
      ur: 3,
      ve: 3,
      vi: 0,
      vun: 3,
      wa: 4,
      wae: 3,
      wo: 0,
      xh: 3,
      xog: 3,
      yo: 0,
      zh: 0,
      zu: 3
    };

    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }

    function isBetween(n, start, end) {
      return start <= n && n <= end;
    }

    var pluralRules = {
      "0": function _(n) {
        return "other";
      },
      "1": function _(n) {
        if (isBetween(n % 100, 3, 10)) return "few";
        if (n === 0) return "zero";
        if (isBetween(n % 100, 11, 99)) return "many";
        if (n == 2) return "two";
        if (n == 1) return "one";
        return "other";
      },
      "2": function _(n) {
        if (n !== 0 && n % 10 === 0) return "many";
        if (n == 2) return "two";
        if (n == 1) return "one";
        return "other";
      },
      "3": function _(n) {
        if (n == 1) return "one";
        return "other";
      },
      "4": function _(n) {
        if (isBetween(n, 0, 1)) return "one";
        return "other";
      },
      "5": function _(n) {
        if (isBetween(n, 0, 2) && n != 2) return "one";
        return "other";
      },
      "6": function _(n) {
        if (n === 0) return "zero";
        if (n % 10 == 1 && n % 100 != 11) return "one";
        return "other";
      },
      "7": function _(n) {
        if (n == 2) return "two";
        if (n == 1) return "one";
        return "other";
      },
      "8": function _(n) {
        if (isBetween(n, 3, 6)) return "few";
        if (isBetween(n, 7, 10)) return "many";
        if (n == 2) return "two";
        if (n == 1) return "one";
        return "other";
      },
      "9": function _(n) {
        if (n === 0 || n != 1 && isBetween(n % 100, 1, 19)) return "few";
        if (n == 1) return "one";
        return "other";
      },
      "10": function _(n) {
        if (isBetween(n % 10, 2, 9) && !isBetween(n % 100, 11, 19)) return "few";
        if (n % 10 == 1 && !isBetween(n % 100, 11, 19)) return "one";
        return "other";
      },
      "11": function _(n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return "few";
        if (n % 10 === 0 || isBetween(n % 10, 5, 9) || isBetween(n % 100, 11, 14)) return "many";
        if (n % 10 == 1 && n % 100 != 11) return "one";
        return "other";
      },
      "12": function _(n) {
        if (isBetween(n, 2, 4)) return "few";
        if (n == 1) return "one";
        return "other";
      },
      "13": function _(n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return "few";
        if (n != 1 && isBetween(n % 10, 0, 1) || isBetween(n % 10, 5, 9) || isBetween(n % 100, 12, 14)) return "many";
        if (n == 1) return "one";
        return "other";
      },
      "14": function _(n) {
        if (isBetween(n % 100, 3, 4)) return "few";
        if (n % 100 == 2) return "two";
        if (n % 100 == 1) return "one";
        return "other";
      },
      "15": function _(n) {
        if (n === 0 || isBetween(n % 100, 2, 10)) return "few";
        if (isBetween(n % 100, 11, 19)) return "many";
        if (n == 1) return "one";
        return "other";
      },
      "16": function _(n) {
        if (n % 10 == 1 && n != 11) return "one";
        return "other";
      },
      "17": function _(n) {
        if (n == 3) return "few";
        if (n === 0) return "zero";
        if (n == 6) return "many";
        if (n == 2) return "two";
        if (n == 1) return "one";
        return "other";
      },
      "18": function _(n) {
        if (n === 0) return "zero";
        if (isBetween(n, 0, 2) && n !== 0 && n != 2) return "one";
        return "other";
      },
      "19": function _(n) {
        if (isBetween(n, 2, 10)) return "few";
        if (isBetween(n, 0, 1)) return "one";
        return "other";
      },
      "20": function _(n) {
        if ((isBetween(n % 10, 3, 4) || n % 10 == 9) && !(isBetween(n % 100, 10, 19) || isBetween(n % 100, 70, 79) || isBetween(n % 100, 90, 99))) return "few";
        if (n % 1000000 === 0 && n !== 0) return "many";
        if (n % 10 == 2 && !isIn(n % 100, [12, 72, 92])) return "two";
        if (n % 10 == 1 && !isIn(n % 100, [11, 71, 91])) return "one";
        return "other";
      },
      "21": function _(n) {
        if (n === 0) return "zero";
        if (n == 1) return "one";
        return "other";
      },
      "22": function _(n) {
        if (isBetween(n, 0, 1) || isBetween(n, 11, 99)) return "one";
        return "other";
      },
      "23": function _(n) {
        if (isBetween(n % 10, 1, 2) || n % 20 === 0) return "one";
        return "other";
      },
      "24": function _(n) {
        if (isBetween(n, 3, 10) || isBetween(n, 13, 19)) return "few";
        if (isIn(n, [2, 12])) return "two";
        if (isIn(n, [1, 11])) return "one";
        return "other";
      }
    };
    var index = locales2rules[lang.replace(/-.*$/, "")];

    if (!(index in pluralRules)) {
      var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

      if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
        console.warn("plural form unknown for [" + lang + "]");
      }

      return function () {
        return "other";
      };
    }

    return pluralRules[index];
  }

  gMacros.plural = function (str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n)) return str;
    if (prop != gTextProp) return str;

    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }

    var index = "[" + gMacros._pluralRules(n) + "]";

    if (n === 0 && key + "[zero]" in gL10nData) {
      str = gL10nData[key + "[zero]"][prop];
    } else if (n == 1 && key + "[one]" in gL10nData) {
      str = gL10nData[key + "[one]"][prop];
    } else if (n == 2 && key + "[two]" in gL10nData) {
      str = gL10nData[key + "[two]"][prop];
    } else if (key + index in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if (key + "[other]" in gL10nData) {
      str = gL10nData[key + "[other]"][prop];
    }

    return str;
  };

  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];

    if (!data) {
      var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

      if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
        console.warn("Translation for the key #" + key + " is missing.");
      }

      if (!fallback) {
        return null;
      }

      data = fallback;
    }

    var rv = {};

    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }

    return rv;
  }

  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length) return str;
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;

    if (args && paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }

    return str;
  }

  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
    return str.replace(reArgs, function (matched_text, arg) {
      if (args && arg in args) {
        return args[arg];
      }

      if (arg in gL10nData) {
        return gL10nData[arg];
      }

      console.log("argument {{" + arg + "}} for #" + key + " is undefined.");
      return matched_text;
    });
  }

  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id) return;
    var data = getL10nData(l10n.id, l10n.args);

    if (!data) {
      var PDFViewerApplicationOptions = window.PDFViewerApplicationOptions;

      if (!PDFViewerApplicationOptions || PDFViewerApplicationOptions.get("verbosity") > 0) {
        console.warn("#" + l10n.id + " is undefined.");
      }

      return;
    }

    if (data[gTextProp]) {
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        var children = element.childNodes;
        var found = false;

        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].nodeType === 3 && /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = "";
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }

        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.insertBefore(textNode, element.firstChild);
        }
      }

      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }

    if (typeof element.childElementCount !== "undefined") {
      return element.childElementCount;
    }

    var count = 0;

    for (var i = 0; i < element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }

    return count;
  }

  function translateFragment(element) {
    element = element || document.documentElement;
    var children = getTranslatableChildren(element);
    var elementCount = children.length;

    for (var i = 0; i < elementCount; i++) {
      translateElement(children[i]);
    }

    translateElement(element);
  }

  return {
    get: function get(key, args, fallbackString) {
      var index = key.lastIndexOf(".");
      var prop = gTextProp;

      if (index > 0) {
        prop = key.substring(index + 1);
        key = key.substring(0, index);
      }

      var fallback;

      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }

      var data = getL10nData(key, args, fallback);

      if (data && prop in data) {
        return data[prop];
      }

      return "{{" + key + "}}";
    },
    getData: function getData() {
      return gL10nData;
    },
    getText: function getText() {
      return gTextData;
    },
    getLanguage: function getLanguage() {
      return gLanguage;
    },
    setLanguage: function setLanguage(lang, callback) {
      loadLocale(lang, function () {
        if (callback) callback();
      });
    },
    getDirection: function getDirection() {
      var rtlList = ["ar", "he", "fa", "ps", "ur"];
      var shortCode = gLanguage.split("-", 1)[0];
      return rtlList.indexOf(shortCode) >= 0 ? "rtl" : "ltr";
    },
    translate: translateFragment,
    getReadyState: function getReadyState() {
      return gReadyState;
    },
    ready: function ready(callback) {
      if (!callback) {
        return;
      } else if (gReadyState == "complete" || gReadyState == "interactive") {
        window.setTimeout(function () {
          callback();
        });
      } else if (document.addEventListener) {
        document.addEventListener("localized", function once() {
          document.removeEventListener("localized", once);
          callback();
        });
      }
    }
  };
}(window, document);

/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericScripting = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(4));

var _pdfjsLib = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GenericScripting = /*#__PURE__*/function () {
  function GenericScripting(sandboxBundleSrc) {
    _classCallCheck(this, GenericScripting);

    this._ready = (0, _pdfjsLib.loadScript)(sandboxBundleSrc, true).then(function () {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
  }

  _createClass(GenericScripting, [{
    key: "createSandbox",
    value: function () {
      var _createSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._ready;

              case 2:
                sandbox = _context.sent;
                sandbox.create(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSandbox(_x) {
        return _createSandbox.apply(this, arguments);
      }

      return createSandbox;
    }()
  }, {
    key: "dispatchEventInSandbox",
    value: function () {
      var _dispatchEventInSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._ready;

              case 2:
                sandbox = _context2.sent;
                sandbox.dispatchEvent(event);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dispatchEventInSandbox(_x2) {
        return _dispatchEventInSandbox.apply(this, arguments);
      }

      return dispatchEventInSandbox;
    }()
  }, {
    key: "destroySandbox",
    value: function () {
      var _destroySandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var sandbox;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ready;

              case 2:
                sandbox = _context3.sent;
                sandbox.nukeSandbox();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroySandbox() {
        return _destroySandbox.apply(this, arguments);
      }

      return destroySandbox;
    }()
  }]);

  return GenericScripting;
}();

exports.GenericScripting = GenericScripting;

/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPrintService = PDFPrintService;

var _ui_utils = __webpack_require__(6);

var _app = __webpack_require__(3);

var _canvasSize = _interopRequireDefault(__webpack_require__(34));

var _viewer_compatibility = __webpack_require__(2);

var _util = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var activeService = null;
var overlayManager = null;

function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise) {
  var scratchCanvas = activeService.scratchCanvas;
  var PRINT_UNITS = printResolution / 72.0;
  var scale = 1;
  var canvasWidth = Math.floor(size.width * PRINT_UNITS);
  var canvasHeight = Math.floor(size.height * PRINT_UNITS);

  if (canvasWidth >= 4096 || canvasHeight >= 4096) {
    if (!_canvasSize["default"].test({
      width: canvasWidth,
      height: canvasHeight
    })) {
      var max = determineMaxDimensions();
      scale = Math.min(max / canvasWidth, max / canvasHeight) * 0.95;
    }

    (0, _util.warn)("Page " + pageNumber + ": Reduced the [printResolution] to " + Math.floor(printResolution * scale) + " because the browser can't render larger canvases. If you see blank page in the print preview, reduce [printResolution] manually to a lower value.");
  }

  PRINT_UNITS *= scale;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  var width = Math.floor(size.width * _ui_utils.CSS_UNITS) + "px";
  var height = Math.floor(size.height * _ui_utils.CSS_UNITS) + "px";
  var ctx = scratchCanvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    var renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      }),
      intent: "print",
      annotationStorage: pdfDocument.annotationStorage,
      optionalContentConfigPromise: optionalContentConfigPromise
    };
    return pdfPage.render(renderContext).promise;
  }).then(function () {
    return {
      width: width,
      height: height
    };
  });
}

function determineMaxDimensions() {
  var checklist = [4096, 8192, 10836, 11180, 11402, 14188, 16384];

  for (var _i = 0, _checklist = checklist; _i < _checklist.length; _i++) {
    var width = _checklist[_i];

    if (!_canvasSize["default"].test({
      width: width + 1,
      height: width + 1
    })) {
      return width;
    }
  }

  return 16384;
}

function PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution) {
  var optionalContentConfigPromise = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var l10n = arguments.length > 5 ? arguments[5] : undefined;
  var eventBus = arguments.length > 6 ? arguments[6] : undefined;
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this._printResolution = printResolution || 150;
  this._optionalContentConfigPromise = optionalContentConfigPromise || pdfDocument.getOptionalContentConfig();
  this.l10n = l10n || _ui_utils.NullL10n;
  this.currentPage = -1;
  this.scratchCanvas = document.createElement("canvas");
  this.eventBus = eventBus;
}

PDFPrintService.prototype = {
  layout: function layout() {
    this.throwIfInactive();
    var body = document.querySelector("body");
    body.setAttribute("data-pdfjsprinting", true);
    var hasEqualPageSizes = this.pagesOverview.every(function (size) {
      return size.width === this.pagesOverview[0].width && size.height === this.pagesOverview[0].height;
    }, this);

    if (!hasEqualPageSizes) {
      console.warn("Not all pages have the same size. The printed " + "result may be incorrect!");
    }

    this.pageStyleSheet = document.createElement("style");
    var pageSize = this.pagesOverview[0];
    this.pageStyleSheet.textContent = "@supports ((size:A4) and (size:1pt 1pt)) {" + "@page { size: " + pageSize.width + "pt " + pageSize.height + "pt;}" + "}";
    body.appendChild(this.pageStyleSheet);
  },
  destroy: function destroy() {
    if (activeService !== this) {
      return;
    }

    this.printContainer.textContent = "";
    var body = document.querySelector("body");
    body.removeAttribute("data-pdfjsprinting");

    if (this.pageStyleSheet) {
      this.pageStyleSheet.remove();
      this.pageStyleSheet = null;
    }

    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay().then(function () {
      if (overlayManager.active !== "printServiceOverlay") {
        return;
      }

      overlayManager.close("printServiceOverlay");
      overlayManager.unregister("printServiceOverlay");
    });
    overlayPromise = undefined;
  },
  renderPages: function renderPages() {
    var _this = this;

    var pageCount = this.pagesOverview.length;

    var renderNextPage = function renderNextPage(resolve, reject) {
      _this.throwIfInactive();

      while (true) {
        ++_this.currentPage;

        if (_this.currentPage >= pageCount) {
          break;
        }

        if (!window.isInPDFPrintRange || window.isInPDFPrintRange(_this.currentPage)) {
          break;
        }
      }

      if (_this.currentPage >= pageCount) {
        renderProgress(window.filteredPageCount | pageCount, window.filteredPageCount | pageCount, _this.l10n, _this.eventBus);
        resolve();
        return;
      }

      var index = _this.currentPage;
      renderProgress(index, window.filteredPageCount | pageCount, _this.l10n, _this.eventBus);
      renderPage(_this, _this.pdfDocument, index + 1, _this.pagesOverview[index], _this._printResolution, _this._optionalContentConfigPromise).then(_this.useRenderedPage.bind(_this)).then(function () {
        renderNextPage(resolve, reject);
      }, reject);
    };

    return new Promise(renderNextPage);
  },
  useRenderedPage: function useRenderedPage(printItem) {
    this.throwIfInactive();
    var img = document.createElement("img");
    img.style.width = printItem.width;
    img.style.height = printItem.height;
    var scratchCanvas = this.scratchCanvas;

    if ("toBlob" in scratchCanvas && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      scratchCanvas.toBlob(function (blob) {
        img.src = URL.createObjectURL(blob);
      });
    } else {
      img.src = scratchCanvas.toDataURL();
    }

    var wrapper = document.createElement("div");
    wrapper.appendChild(img);
    this.printContainer.appendChild(wrapper);
    return new Promise(function (resolve, reject) {
      img.onload = resolve;
      img.onerror = reject;
    });
  },
  performPrint: function performPrint() {
    var _this2 = this;

    this.throwIfInactive();
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (!_this2.active) {
          resolve();
          return;
        }

        print.call(window);
        setTimeout(resolve, 20);
      }, 0);
    });
  },

  get active() {
    return this === activeService;
  },

  throwIfInactive: function throwIfInactive() {
    if (!this.active) {
      throw new Error("This print request was cancelled or completed.");
    }
  }
};
var print = window.print;

window.printPDF = function () {
  if (!_app.PDFViewerApplication.enablePrint) {
    return;
  }

  if (activeService) {
    console.warn("Ignored window.printPDF() because of a pending print job.");
    return;
  }

  ensureOverlay().then(function () {
    if (activeService) {
      overlayManager.open("printServiceOverlay");
    }
  });

  try {
    dispatchEvent("beforeprint");
  } finally {
    if (!activeService) {
      console.error("Expected print service to be initialized.");
      ensureOverlay().then(function () {
        if (overlayManager.active === "printServiceOverlay") {
          overlayManager.close("printServiceOverlay");
        }
      });
      return;
    }

    var activeServiceOnEntry = activeService;
    activeService.renderPages().then(function () {
      var progressIndicator = document.getElementById("printServiceOverlay");

      if (progressIndicator) {
        progressIndicator.classList.add("hidden");
      }

      return activeServiceOnEntry.performPrint();
    })["catch"](function () {}).then(function () {
      if (activeServiceOnEntry.active) {
        abort();
      }
    });
  }
};

function dispatchEvent(eventType) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent(eventType, false, false, "custom");
  window.dispatchEvent(event);
}

function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent("afterprint");
  }
}

function renderProgress(index, total, l10n, eventBus) {
  var progressContainer = document.getElementById("printServiceOverlay");
  var progress = Math.round(100 * index / total);
  var progressBar = progressContainer.querySelector("progress");
  var progressPerc = progressContainer.querySelector(".relative-progress");
  progressBar.value = progress;
  l10n.get("print_progress_percent", {
    progress: progress
  }, progress + "%").then(function (msg) {
    progressPerc.textContent = msg;
  });
  eventBus.dispatch("progress", {
    source: this,
    type: "print",
    total: total,
    page: index,
    percent: 100 * index / total
  });
}

_app.PDFViewerApplication.printKeyDownListener = function (event) {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
    window.printPDF();
    event.preventDefault();

    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {
      event.stopPropagation();
    }
  }
};

if ("onbeforeprint" in window) {
  var stopPropagationIfNeeded = function stopPropagationIfNeeded(event) {
    if (event.detail !== "custom" && event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener("beforeprint", stopPropagationIfNeeded);
  window.addEventListener("afterprint", stopPropagationIfNeeded);
}

var overlayPromise;

function ensureOverlay() {
  if (!overlayPromise) {
    overlayManager = _app.PDFViewerApplication.overlayManager;

    if (!overlayManager) {
      throw new Error("The overlay manager has not yet been initialized.");
    }

    overlayPromise = overlayManager.register("printServiceOverlay", document.getElementById("printServiceOverlay"), abort, true);
    document.getElementById("printCancel").onclick = abort;
  }

  return overlayPromise;
}

_app.PDFPrintServiceFactory.instance = {
  supportsPrinting: true,
  createPrintService: function createPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n, eventBus) {
    if (activeService) {
      throw new Error("The print service is created and active.");
    }

    activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n, eventBus);
    return activeService;
  }
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=viewer-es5.js.map