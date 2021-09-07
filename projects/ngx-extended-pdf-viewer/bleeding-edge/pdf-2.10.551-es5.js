/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
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

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pdfjs-dist/build/pdf", [], factory);
	else if(typeof exports === 'object')
		exports["pdfjs-dist/build/pdf"] = factory();
	else
		root["pdfjs-dist/build/pdf"] = root.pdfjsLib = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addLinkAttributes = addLinkAttributes;
exports.deprecated = deprecated;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.getPdfFilenameFromUrl = getPdfFilenameFromUrl;
exports.getXfaPageViewport = getXfaPageViewport;
exports.isDataScheme = isDataScheme;
exports.isPdfFile = isPdfFile;
exports.isValidFetchUrl = isValidFetchUrl;
exports.loadScript = loadScript;
exports.StatTimer = exports.RenderingCancelledException = exports.PDFDateString = exports.PageViewport = exports.LinkTarget = exports.DOMSVGFactory = exports.DOMStandardFontDataFactory = exports.DOMCMapReaderFactory = exports.DOMCanvasFactory = exports.DEFAULT_LINK_REL = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _base_factory = __w_pdfjs_require__(116);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_LINK_REL = "noopener noreferrer nofollow";
exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
var SVG_NS = "http://www.w3.org/2000/svg";

var DOMCanvasFactory = /*#__PURE__*/function (_BaseCanvasFactory) {
  _inherits(DOMCanvasFactory, _BaseCanvasFactory);

  var _super = _createSuper(DOMCanvasFactory);

  function DOMCanvasFactory() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ownerDocument = _ref.ownerDocument,
        ownerDocument = _ref$ownerDocument === void 0 ? globalThis.document : _ref$ownerDocument;

    _classCallCheck(this, DOMCanvasFactory);

    _this = _super.call(this);
    _this._document = ownerDocument;
    return _this;
  }

  _createClass(DOMCanvasFactory, [{
    key: "_createCanvas",
    value: function _createCanvas(width, height) {
      var canvas = this._document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  }]);

  return DOMCanvasFactory;
}(_base_factory.BaseCanvasFactory);

exports.DOMCanvasFactory = DOMCanvasFactory;

function fetchData(_x) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var asTypedArray,
        response,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            asTypedArray = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

            if (!isValidFetchUrl(url, document.baseURI)) {
              _context.next = 21;
              break;
            }

            _context.next = 4;
            return fetch(url);

          case 4:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            throw new Error(response.statusText);

          case 7:
            if (!asTypedArray) {
              _context.next = 15;
              break;
            }

            _context.t1 = Uint8Array;
            _context.next = 11;
            return response.arrayBuffer();

          case 11:
            _context.t2 = _context.sent;
            _context.t0 = new _context.t1(_context.t2);
            _context.next = 20;
            break;

          case 15:
            _context.t3 = _util.stringToBytes;
            _context.next = 18;
            return response.text();

          case 18:
            _context.t4 = _context.sent;
            _context.t0 = (0, _context.t3)(_context.t4);

          case 20:
            return _context.abrupt("return", _context.t0);

          case 21:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var request = new XMLHttpRequest();
              request.open("GET", url, true);

              if (asTypedArray) {
                request.responseType = "arraybuffer";
              }

              request.onreadystatechange = function () {
                if (request.readyState !== XMLHttpRequest.DONE) {
                  return;
                }

                if (request.status === 200 || request.status === 0) {
                  var data;

                  if (asTypedArray && request.response) {
                    data = new Uint8Array(request.response);
                  } else if (!asTypedArray && request.responseText) {
                    data = (0, _util.stringToBytes)(request.responseText);
                  }

                  if (data) {
                    resolve(data);
                    return;
                  }
                }

                reject(new Error(request.statusText));
              };

              request.send(null);
            }));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}

var DOMCMapReaderFactory = /*#__PURE__*/function (_BaseCMapReaderFactor) {
  _inherits(DOMCMapReaderFactory, _BaseCMapReaderFactor);

  var _super2 = _createSuper(DOMCMapReaderFactory);

  function DOMCMapReaderFactory() {
    _classCallCheck(this, DOMCMapReaderFactory);

    return _super2.apply(this, arguments);
  }

  _createClass(DOMCMapReaderFactory, [{
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      return fetchData(url, this.isCompressed).then(function (data) {
        return {
          cMapData: data,
          compressionType: compressionType
        };
      });
    }
  }]);

  return DOMCMapReaderFactory;
}(_base_factory.BaseCMapReaderFactory);

exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

var DOMStandardFontDataFactory = /*#__PURE__*/function (_BaseStandardFontData) {
  _inherits(DOMStandardFontDataFactory, _BaseStandardFontData);

  var _super3 = _createSuper(DOMStandardFontDataFactory);

  function DOMStandardFontDataFactory() {
    _classCallCheck(this, DOMStandardFontDataFactory);

    return _super3.apply(this, arguments);
  }

  _createClass(DOMStandardFontDataFactory, [{
    key: "_fetchData",
    value: function _fetchData(url) {
      return fetchData(url, true);
    }
  }]);

  return DOMStandardFontDataFactory;
}(_base_factory.BaseStandardFontDataFactory);

exports.DOMStandardFontDataFactory = DOMStandardFontDataFactory;

var DOMSVGFactory = /*#__PURE__*/function (_BaseSVGFactory) {
  _inherits(DOMSVGFactory, _BaseSVGFactory);

  var _super4 = _createSuper(DOMSVGFactory);

  function DOMSVGFactory() {
    _classCallCheck(this, DOMSVGFactory);

    return _super4.apply(this, arguments);
  }

  _createClass(DOMSVGFactory, [{
    key: "_createSVG",
    value: function _createSVG(type) {
      return document.createElementNS(SVG_NS, type);
    }
  }]);

  return DOMSVGFactory;
}(_base_factory.BaseSVGFactory);

exports.DOMSVGFactory = DOMSVGFactory;

var PageViewport = /*#__PURE__*/function () {
  function PageViewport(_ref2) {
    var viewBox = _ref2.viewBox,
        scale = _ref2.scale,
        rotation = _ref2.rotation,
        _ref2$offsetX = _ref2.offsetX,
        offsetX = _ref2$offsetX === void 0 ? 0 : _ref2$offsetX,
        _ref2$offsetY = _ref2.offsetY,
        offsetY = _ref2$offsetY === void 0 ? 0 : _ref2$offsetY,
        _ref2$dontFlip = _ref2.dontFlip,
        dontFlip = _ref2$dontFlip === void 0 ? false : _ref2$dontFlip;

    _classCallCheck(this, PageViewport);

    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    var centerX = (viewBox[2] + viewBox[0]) / 2;
    var centerY = (viewBox[3] + viewBox[1]) / 2;
    var rotateA, rotateB, rotateC, rotateD;
    rotation %= 360;

    if (rotation < 0) {
      rotation += 360;
    }

    switch (rotation) {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;

      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;

      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;

      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;

      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }

    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }

    var offsetCanvasX, offsetCanvasY;
    var width, height;

    if (rotateA === 0) {
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
      width = Math.abs(viewBox[3] - viewBox[1]) * scale;
      height = Math.abs(viewBox[2] - viewBox[0]) * scale;
    } else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
      width = Math.abs(viewBox[2] - viewBox[0]) * scale;
      height = Math.abs(viewBox[3] - viewBox[1]) * scale;
    }

    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  }

  _createClass(PageViewport, [{
    key: "clone",
    value: function clone() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$scale = _ref3.scale,
          scale = _ref3$scale === void 0 ? this.scale : _ref3$scale,
          _ref3$rotation = _ref3.rotation,
          rotation = _ref3$rotation === void 0 ? this.rotation : _ref3$rotation,
          _ref3$offsetX = _ref3.offsetX,
          offsetX = _ref3$offsetX === void 0 ? this.offsetX : _ref3$offsetX,
          _ref3$offsetY = _ref3.offsetY,
          offsetY = _ref3$offsetY === void 0 ? this.offsetY : _ref3$offsetY,
          _ref3$dontFlip = _ref3.dontFlip,
          dontFlip = _ref3$dontFlip === void 0 ? false : _ref3$dontFlip;

      return new PageViewport({
        viewBox: this.viewBox.slice(),
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "convertToViewportPoint",
    value: function convertToViewportPoint(x, y) {
      return _util.Util.applyTransform([x, y], this.transform);
    }
  }, {
    key: "convertToViewportRectangle",
    value: function convertToViewportRectangle(rect) {
      var topLeft = _util.Util.applyTransform([rect[0], rect[1]], this.transform);

      var bottomRight = _util.Util.applyTransform([rect[2], rect[3]], this.transform);

      return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
    }
  }, {
    key: "convertToPdfPoint",
    value: function convertToPdfPoint(x, y) {
      return _util.Util.applyInverseTransform([x, y], this.transform);
    }
  }]);

  return PageViewport;
}();

exports.PageViewport = PageViewport;

var RenderingCancelledException = /*#__PURE__*/function (_BaseException) {
  _inherits(RenderingCancelledException, _BaseException);

  var _super5 = _createSuper(RenderingCancelledException);

  function RenderingCancelledException(msg, type) {
    var _this2;

    _classCallCheck(this, RenderingCancelledException);

    _this2 = _super5.call(this, msg);
    _this2.type = type;
    return _this2;
  }

  return RenderingCancelledException;
}(_util.BaseException);

exports.RenderingCancelledException = RenderingCancelledException;
var LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
exports.LinkTarget = LinkTarget;

function addLinkAttributes(link) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      url = _ref4.url,
      target = _ref4.target,
      rel = _ref4.rel,
      _ref4$enabled = _ref4.enabled,
      enabled = _ref4$enabled === void 0 ? true : _ref4$enabled;

  (0, _util.assert)(url && typeof url === "string", 'addLinkAttributes: A valid "url" parameter must provided.');
  var urlNullRemoved = (0, _util.removeNullCharacters)(url);

  if (enabled) {
    link.href = link.title = urlNullRemoved;
  } else {
    link.href = "";
    link.title = "Disabled: ".concat(urlNullRemoved);

    link.onclick = function () {
      return false;
    };
  }

  var targetStr = "";

  switch (target) {
    case LinkTarget.NONE:
      break;

    case LinkTarget.SELF:
      targetStr = "_self";
      break;

    case LinkTarget.BLANK:
      targetStr = "_blank";
      break;

    case LinkTarget.PARENT:
      targetStr = "_parent";
      break;

    case LinkTarget.TOP:
      targetStr = "_top";
      break;
  }

  link.target = targetStr;
  link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
}

function isDataScheme(url) {
  var ii = url.length;
  var i = 0;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}

function isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}

function getFilenameFromUrl(url) {
  var anchor = url.indexOf("#");
  var query = url.indexOf("?");
  var end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf("/", end) + 1, end);
}

function getPdfFilenameFromUrl(url) {
  var defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "document.pdf";

  if (window.PDFViewerApplication.appConfig.filenameForDownload) {
    return window.PDFViewerApplication.appConfig.filenameForDownload;
  }

  if (typeof url !== "string") {
    return defaultFilename;
  }

  if (isDataScheme(url)) {
    (0, _util.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
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

var StatTimer = /*#__PURE__*/function () {
  function StatTimer() {
    _classCallCheck(this, StatTimer);

    this.started = Object.create(null);
    this.times = [];
  }

  _createClass(StatTimer, [{
    key: "time",
    value: function time(name) {
      if (name in this.started) {
        (0, _util.warn)("Timer is already running for ".concat(name));
      }

      this.started[name] = Date.now();
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(name) {
      if (!(name in this.started)) {
        (0, _util.warn)("Timer has not been started for ".concat(name));
      }

      this.times.push({
        name: name,
        start: this.started[name],
        end: Date.now()
      });
      delete this.started[name];
    }
  }, {
    key: "toString",
    value: function toString() {
      var outBuf = [];
      var longest = 0;

      var _iterator = _createForOfIteratorHelper(this.times),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var time = _step.value;
          var name = time.name;

          if (name.length > longest) {
            longest = name.length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this.times),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _time = _step2.value;
          var duration = _time.end - _time.start;
          outBuf.push("".concat(_time.name.padEnd(longest), " ").concat(duration, "ms\n"));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return outBuf.join("");
    }
  }]);

  return StatTimer;
}();

exports.StatTimer = StatTimer;

function isValidFetchUrl(url, baseUrl) {
  try {
    var _ref5 = baseUrl ? new URL(url, baseUrl) : new URL(url),
        protocol = _ref5.protocol;

    return protocol === "http:" || protocol === "https:" || protocol === "capacitor:";
  } catch (ex) {
    return false;
  }
}

function loadScript(src) {
  var removeScriptElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");

    if (src.constructor.name === "Function") {
      script.src = src();
    } else {
      script.src = src;
    }

    script.onload = function (evt) {
      if (removeScriptElement) {
        script.remove();
      }

      resolve(evt);
    };

    script.onerror = function () {
      reject(new Error("Cannot load script at: ".concat(script.src)));
    };

    (document.head || document.documentElement).appendChild(script);
  });
}

function deprecated(details) {
  console.log("Deprecated API usage: " + details);
}

var pdfDateStringRegex;

var PDFDateString = /*#__PURE__*/function () {
  function PDFDateString() {
    _classCallCheck(this, PDFDateString);
  }

  _createClass(PDFDateString, null, [{
    key: "toDateObject",
    value: function toDateObject(input) {
      if (!input || !(0, _util.isString)(input)) {
        return null;
      }

      if (!pdfDateStringRegex) {
        pdfDateStringRegex = new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
      }

      var matches = pdfDateStringRegex.exec(input);

      if (!matches) {
        return null;
      }

      var year = parseInt(matches[1], 10);
      var month = parseInt(matches[2], 10);
      month = month >= 1 && month <= 12 ? month - 1 : 0;
      var day = parseInt(matches[3], 10);
      day = day >= 1 && day <= 31 ? day : 1;
      var hour = parseInt(matches[4], 10);
      hour = hour >= 0 && hour <= 23 ? hour : 0;
      var minute = parseInt(matches[5], 10);
      minute = minute >= 0 && minute <= 59 ? minute : 0;
      var second = parseInt(matches[6], 10);
      second = second >= 0 && second <= 59 ? second : 0;
      var universalTimeRelation = matches[7] || "Z";
      var offsetHour = parseInt(matches[8], 10);
      offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
      var offsetMinute = parseInt(matches[9], 10) || 0;
      offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

      if (universalTimeRelation === "-") {
        hour += offsetHour;
        minute += offsetMinute;
      } else if (universalTimeRelation === "+") {
        hour -= offsetHour;
        minute -= offsetMinute;
      }

      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
  }]);

  return PDFDateString;
}();

exports.PDFDateString = PDFDateString;

function getXfaPageViewport(xfaPage, _ref6) {
  var _ref6$scale = _ref6.scale,
      scale = _ref6$scale === void 0 ? 1 : _ref6$scale,
      _ref6$rotation = _ref6.rotation,
      rotation = _ref6$rotation === void 0 ? 0 : _ref6$rotation;
  var _xfaPage$attributes$s = xfaPage.attributes.style,
      width = _xfaPage$attributes$s.width,
      height = _xfaPage$attributes$s.height;
  var viewBox = [0, 0, parseInt(width), parseInt(height)];
  return new PageViewport({
    viewBox: viewBox,
    scale: scale,
    rotation: rotation
  });
}

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";


module.exports = __w_pdfjs_require__(3);

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";
/* module decorator */ module = __w_pdfjs_require__.nmd(module);


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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
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
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
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
  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

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
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createObjectURL = createObjectURL;
exports.createPromiseCapability = createPromiseCapability;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
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
exports.objectFromMap = objectFromMap;
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
exports.VerbosityLevel = exports.Util = exports.UNSUPPORTED_FEATURES = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.PageActionEventType = exports.OPS = exports.MissingPDFException = exports.IsLittleEndianCached = exports.IsEvalSupportedCached = exports.InvalidPDFException = exports.ImageKind = exports.IDENTITY_MATRIX = exports.FormatError = exports.FontType = exports.FONT_IDENTITY_MATRIX = exports.DocumentActionEventType = exports.CMapCompressionType = exports.BaseException = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.AnnotationActionEventType = exports.AbortException = void 0;

__w_pdfjs_require__(5);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
  TYPE1STANDARD: "TYPE1STANDARD",
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
  signatures: "signatures",
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
  errorFontBuildPath: "errorFontBuildPath",
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
    case "capacitor":
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

function objectFromMap(map) {
  var obj = Object.create(null);

  var _iterator = _createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      obj[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return obj;
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
      var second = Math.sqrt(Math.pow(a + d, 2) - 4 * (a * d - c * b)) / 2;
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
var PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2d8, 0x2c7, 0x2c6, 0x2d9, 0x2dd, 0x2db, 0x2da, 0x2dc, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203a, 0x2212, 0x2030, 0x201e, 0x201c, 0x201d, 0x2018, 0x2019, 0x201a, 0x2122, 0xfb01, 0xfb02, 0x141, 0x152, 0x160, 0x178, 0x17d, 0x131, 0x142, 0x153, 0x161, 0x17e, 0, 0x20ac];

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

    buf.push(String.fromCharCode(_char >> 8 & 0xff), String.fromCharCode(_char & 0xff));
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

  for (var i = 0, ii = arr1.length; i < ii; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
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

function createObjectURL(data) {
  var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (URL.createObjectURL && !forceDataSchema) {
    return URL.createObjectURL(new Blob([data], {
      type: contentType
    }));
  }

  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
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
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";


var isNodeJS = false;

if (typeof globalThis === "undefined" || !globalThis._pdfjsCompatibilityChecked) {
  if (typeof globalThis === "undefined" || globalThis.Math !== Math) {
    globalThis = __w_pdfjs_require__(6);
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

  (function checkDOMMatrix() {
    if (globalThis.DOMMatrix || !isNodeJS) {
      return;
    }

    globalThis.DOMMatrix = __w_pdfjs_require__(59);
  })();

  (function checkObjectFromEntries() {
    if (Object.fromEntries) {
      return;
    }

    __w_pdfjs_require__(60);
  })();

  (function checkPromise() {
    if (globalThis.Promise.allSettled) {
      return;
    }

    globalThis.Promise = __w_pdfjs_require__(87);
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

    globalThis.ReadableStream = __w_pdfjs_require__(115).ReadableStream;
  })();
}

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(7);
module.exports = __w_pdfjs_require__(9);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var $ = __w_pdfjs_require__(8);
var global = __w_pdfjs_require__(9);
$({ global: true }, { globalThis: global });

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var getOwnPropertyDescriptor = __w_pdfjs_require__(10).f;
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var redefine = __w_pdfjs_require__(42);
var setGlobal = __w_pdfjs_require__(33);
var copyConstructorProperties = __w_pdfjs_require__(48);
var isForced = __w_pdfjs_require__(58);
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
/* 9 */
/***/ ((module) => {

var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || function () {
 return this;
}() || Function('return this')();

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(11);
var propertyIsEnumerableModule = __w_pdfjs_require__(13);
var createPropertyDescriptor = __w_pdfjs_require__(14);
var toIndexedObject = __w_pdfjs_require__(15);
var toPropertyKey = __w_pdfjs_require__(19);
var has = __w_pdfjs_require__(34);
var IE8_DOM_DEFINE = __w_pdfjs_require__(37);
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
 O = toIndexedObject(O);
 P = toPropertyKey(P);
 if (IE8_DOM_DEFINE)
  try {
   return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
  }
 if (has(O, P))
  return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(12);
module.exports = !fails(function () {
 return Object.defineProperty({}, 1, {
  get: function () {
   return 7;
  }
 })[1] != 7;
});

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
 var descriptor = getOwnPropertyDescriptor(this, V);
 return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),
/* 14 */
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
/* 15 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var IndexedObject = __w_pdfjs_require__(16);
var requireObjectCoercible = __w_pdfjs_require__(18);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(12);
var classof = __w_pdfjs_require__(17);
var split = ''.split;
module.exports = fails(function () {
 return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 17 */
/***/ ((module) => {

var toString = {}.toString;
module.exports = function (it) {
 return toString.call(it).slice(8, -1);
};

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = function (it) {
 if (it == undefined)
  throw TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toPrimitive = __w_pdfjs_require__(20);
var isSymbol = __w_pdfjs_require__(22);
module.exports = function (argument) {
 var key = toPrimitive(argument, 'string');
 return isSymbol(key) ? key : String(key);
};

/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(21);
var isSymbol = __w_pdfjs_require__(22);
var ordinaryToPrimitive = __w_pdfjs_require__(28);
var wellKnownSymbol = __w_pdfjs_require__(29);
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
module.exports = function (input, pref) {
 if (!isObject(input) || isSymbol(input))
  return input;
 var exoticToPrim = input[TO_PRIMITIVE];
 var result;
 if (exoticToPrim !== undefined) {
  if (pref === undefined)
   pref = 'default';
  result = exoticToPrim.call(input, pref);
  if (!isObject(result) || isSymbol(result))
   return result;
  throw TypeError("Can't convert object to primitive value");
 }
 if (pref === undefined)
  pref = 'number';
 return ordinaryToPrimitive(input, pref);
};

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = function (it) {
 return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 22 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(23);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(24);
module.exports = USE_SYMBOL_AS_UID ? function (it) {
 return typeof it == 'symbol';
} : function (it) {
 var $Symbol = getBuiltIn('Symbol');
 return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var aFunction = function (variable) {
 return typeof variable == 'function' ? variable : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_SYMBOL = __w_pdfjs_require__(25);
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var V8_VERSION = __w_pdfjs_require__(26);
var fails = __w_pdfjs_require__(12);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 var symbol = Symbol();
 return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),
/* 26 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var userAgent = __w_pdfjs_require__(27);
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
 match = v8.split('.');
 version = match[0] < 4 ? 1 : match[0] + match[1];
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
/* 27 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(23);
module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(21);
module.exports = function (input, pref) {
 var fn, val;
 if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var shared = __w_pdfjs_require__(30);
var has = __w_pdfjs_require__(34);
var uid = __w_pdfjs_require__(36);
var NATIVE_SYMBOL = __w_pdfjs_require__(25);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(24);
var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function (name) {
 if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
  if (NATIVE_SYMBOL && has(Symbol, name)) {
   WellKnownSymbolsStore[name] = Symbol[name];
  } else {
   WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }
 }
 return WellKnownSymbolsStore[name];
};

/***/ }),
/* 30 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var IS_PURE = __w_pdfjs_require__(31);
var store = __w_pdfjs_require__(32);
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.16.1',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = false;

/***/ }),
/* 32 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var setGlobal = __w_pdfjs_require__(33);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
module.exports = function (key, value) {
 try {
  Object.defineProperty(global, key, {
   value: value,
   configurable: true,
   writable: true
  });
 } catch (error) {
  global[key] = value;
 }
 return value;
};

/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toObject = __w_pdfjs_require__(35);
var hasOwnProperty = {}.hasOwnProperty;
module.exports = Object.hasOwn || function hasOwn(it, key) {
 return hasOwnProperty.call(toObject(it), key);
};

/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var requireObjectCoercible = __w_pdfjs_require__(18);
module.exports = function (argument) {
 return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 36 */
/***/ ((module) => {

var id = 0;
var postfix = Math.random();
module.exports = function (key) {
 return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(11);
var fails = __w_pdfjs_require__(12);
var createElement = __w_pdfjs_require__(38);
module.exports = !DESCRIPTORS && !fails(function () {
 return Object.defineProperty(createElement('div'), 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var isObject = __w_pdfjs_require__(21);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(11);
var definePropertyModule = __w_pdfjs_require__(40);
var createPropertyDescriptor = __w_pdfjs_require__(14);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(11);
var IE8_DOM_DEFINE = __w_pdfjs_require__(37);
var anObject = __w_pdfjs_require__(41);
var toPropertyKey = __w_pdfjs_require__(19);
var $defineProperty = Object.defineProperty;
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
 anObject(O);
 P = toPropertyKey(P);
 anObject(Attributes);
 if (IE8_DOM_DEFINE)
  try {
   return $defineProperty(O, P, Attributes);
  } catch (error) {
  }
 if ('get' in Attributes || 'set' in Attributes)
  throw TypeError('Accessors not supported');
 if ('value' in Attributes)
  O[P] = Attributes.value;
 return O;
};

/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(21);
module.exports = function (it) {
 if (!isObject(it)) {
  throw TypeError(String(it) + ' is not an object');
 }
 return it;
};

/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var has = __w_pdfjs_require__(34);
var setGlobal = __w_pdfjs_require__(33);
var inspectSource = __w_pdfjs_require__(43);
var InternalStateModule = __w_pdfjs_require__(44);
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
/* 43 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var store = __w_pdfjs_require__(32);
var functionToString = Function.toString;
if (typeof store.inspectSource != 'function') {
 store.inspectSource = function (it) {
  return functionToString.call(it);
 };
}
module.exports = store.inspectSource;

/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_WEAK_MAP = __w_pdfjs_require__(45);
var global = __w_pdfjs_require__(9);
var isObject = __w_pdfjs_require__(21);
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var objectHas = __w_pdfjs_require__(34);
var shared = __w_pdfjs_require__(32);
var sharedKey = __w_pdfjs_require__(46);
var hiddenKeys = __w_pdfjs_require__(47);
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
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
if (NATIVE_WEAK_MAP || shared.state) {
 var store = shared.state || (shared.state = new WeakMap());
 var wmget = store.get;
 var wmhas = store.has;
 var wmset = store.set;
 set = function (it, metadata) {
  if (wmhas.call(store, it))
   throw new TypeError(OBJECT_ALREADY_INITIALIZED);
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
  if (objectHas(it, STATE))
   throw new TypeError(OBJECT_ALREADY_INITIALIZED);
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
/* 45 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var inspectSource = __w_pdfjs_require__(43);
var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var shared = __w_pdfjs_require__(30);
var uid = __w_pdfjs_require__(36);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var has = __w_pdfjs_require__(34);
var ownKeys = __w_pdfjs_require__(49);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(10);
var definePropertyModule = __w_pdfjs_require__(40);
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
/* 49 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(23);
var getOwnPropertyNamesModule = __w_pdfjs_require__(50);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(57);
var anObject = __w_pdfjs_require__(41);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var internalObjectKeys = __w_pdfjs_require__(51);
var enumBugKeys = __w_pdfjs_require__(56);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var has = __w_pdfjs_require__(34);
var toIndexedObject = __w_pdfjs_require__(15);
var indexOf = __w_pdfjs_require__(52).indexOf;
var hiddenKeys = __w_pdfjs_require__(47);
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
/* 52 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toIndexedObject = __w_pdfjs_require__(15);
var toLength = __w_pdfjs_require__(53);
var toAbsoluteIndex = __w_pdfjs_require__(55);
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
/* 53 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toInteger = __w_pdfjs_require__(54);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 54 */
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (argument) {
 return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 55 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toInteger = __w_pdfjs_require__(54);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toInteger(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 56 */
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
/* 57 */
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(12);
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
/* 59 */
/***/ ((module, exports, __w_pdfjs_require__) => {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __w_pdfjs_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(void 0, function () {
  'use strict';

  var CSSMatrix = function CSSMatrix() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    this.setIdentity();
    return args && args.length && this.setMatrixValue(args);
  };

  var prototypeAccessors = {
    isIdentity: {
      configurable: true
    },
    is2D: {
      configurable: true
    }
  };

  prototypeAccessors.isIdentity.get = function () {
    var m = this;
    return m.m11 === 1 && m.m12 === 0 && m.m13 === 0 && m.m14 === 0 && m.m21 === 0 && m.m22 === 1 && m.m23 === 0 && m.m24 === 0 && m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m41 === 0 && m.m42 === 0 && m.m43 === 0 && m.m44 === 1;
  };

  prototypeAccessors.isIdentity.set = function (value) {
    this.isIdentity = value;
  };

  prototypeAccessors.is2D.get = function () {
    var m = this;
    return m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m43 === 0 && m.m44 === 1;
  };

  prototypeAccessors.is2D.set = function (value) {
    this.is2D = value;
  };

  Object.defineProperties(CSSMatrix.prototype, prototypeAccessors);
  var CSSMatrixProto = CSSMatrix.prototype;

  function Translate(x, y, z) {
    var m = new CSSMatrix();
    m.m41 = x;
    m.e = x;
    m.m42 = y;
    m.f = y;
    m.m43 = z;
    return m;
  }

  function Rotate(rx, ry, rz) {
    var m = new CSSMatrix();
    var radX = rx * Math.PI / 180;
    var radY = ry * Math.PI / 180;
    var radZ = rz * Math.PI / 180;
    var cosx = Math.cos(radX);
    var sinx = -Math.sin(radX);
    var cosy = Math.cos(radY);
    var siny = -Math.sin(radY);
    var cosz = Math.cos(radZ);
    var sinz = -Math.sin(radZ);
    var cycz = cosy * cosz;
    var cysz = -cosy * sinz;
    m.m11 = cycz;
    m.a = cycz;
    m.m12 = cysz;
    m.b = cysz;
    m.m13 = siny;
    var sxsy = sinx * siny * cosz + cosx * sinz;
    m.m21 = sxsy;
    m.c = sxsy;
    var cxcz = cosx * cosz - sinx * siny * sinz;
    m.m22 = cxcz;
    m.d = cxcz;
    m.m23 = -sinx * cosy;
    m.m31 = sinx * sinz - cosx * siny * cosz;
    m.m32 = sinx * cosz + cosx * siny * sinz;
    m.m33 = cosx * cosy;
    return m;
  }

  function RotateAxisAngle(x, y, z, angle) {
    var m = new CSSMatrix();
    var radA = angle * Math.PI / 360;
    var sinA = Math.sin(radA);
    var cosA = Math.cos(radA);
    var sinA2 = sinA * sinA;
    var length = Math.sqrt(x * x + y * y + z * z);
    var X = 0;
    var Y = 0;
    var Z = 1;

    if (length !== 0) {
      X = x / length;
      Y = y / length;
      Z = z / length;
    }

    var x2 = X * X;
    var y2 = Y * Y;
    var z2 = Z * Z;
    var m11 = 1 - 2 * (y2 + z2) * sinA2;
    m.m11 = m11;
    m.a = m11;
    var m12 = 2 * (x * y * sinA2 + z * sinA * cosA);
    m.m12 = m12;
    m.b = m12;
    m.m13 = 2 * (x * z * sinA2 - y * sinA * cosA);
    var m21 = 2 * (y * x * sinA2 - z * sinA * cosA);
    m.m21 = m21;
    m.c = m21;
    var m22 = 1 - 2 * (z2 + x2) * sinA2;
    m.m22 = m22;
    m.d = m22;
    m.m23 = 2 * (y * z * sinA2 + x * sinA * cosA);
    m.m31 = 2 * (z * x * sinA2 + y * sinA * cosA);
    m.m32 = 2 * (z * y * sinA2 - x * sinA * cosA);
    m.m33 = 1 - 2 * (x2 + y2) * sinA2;
    m.m14 = 0;
    m.m24 = 0;
    m.m34 = 0;
    m.m41 = 0;
    m.e = 0;
    m.m42 = 0;
    m.f = 0;
    m.m43 = 0;
    m.m44 = 1;
    return m;
  }

  function Scale(x, y, z) {
    var m = new CSSMatrix();
    m.m11 = x;
    m.a = x;
    m.m22 = y;
    m.d = y;
    m.m33 = z;
    return m;
  }

  function SkewX(angle) {
    var radA = angle * Math.PI / 180;
    var m = new CSSMatrix();
    var t = Math.tan(radA);
    m.m21 = t;
    m.c = t;
    return m;
  }

  function SkewY(angle) {
    var radA = angle * Math.PI / 180;
    var m = new CSSMatrix();
    var t = Math.tan(radA);
    m.m12 = t;
    m.b = t;
    return m;
  }

  function Multiply(m1, m2) {
    var m11 = m2.m11 * m1.m11 + m2.m12 * m1.m21 + m2.m13 * m1.m31 + m2.m14 * m1.m41;
    var m12 = m2.m11 * m1.m12 + m2.m12 * m1.m22 + m2.m13 * m1.m32 + m2.m14 * m1.m42;
    var m13 = m2.m11 * m1.m13 + m2.m12 * m1.m23 + m2.m13 * m1.m33 + m2.m14 * m1.m43;
    var m14 = m2.m11 * m1.m14 + m2.m12 * m1.m24 + m2.m13 * m1.m34 + m2.m14 * m1.m44;
    var m21 = m2.m21 * m1.m11 + m2.m22 * m1.m21 + m2.m23 * m1.m31 + m2.m24 * m1.m41;
    var m22 = m2.m21 * m1.m12 + m2.m22 * m1.m22 + m2.m23 * m1.m32 + m2.m24 * m1.m42;
    var m23 = m2.m21 * m1.m13 + m2.m22 * m1.m23 + m2.m23 * m1.m33 + m2.m24 * m1.m43;
    var m24 = m2.m21 * m1.m14 + m2.m22 * m1.m24 + m2.m23 * m1.m34 + m2.m24 * m1.m44;
    var m31 = m2.m31 * m1.m11 + m2.m32 * m1.m21 + m2.m33 * m1.m31 + m2.m34 * m1.m41;
    var m32 = m2.m31 * m1.m12 + m2.m32 * m1.m22 + m2.m33 * m1.m32 + m2.m34 * m1.m42;
    var m33 = m2.m31 * m1.m13 + m2.m32 * m1.m23 + m2.m33 * m1.m33 + m2.m34 * m1.m43;
    var m34 = m2.m31 * m1.m14 + m2.m32 * m1.m24 + m2.m33 * m1.m34 + m2.m34 * m1.m44;
    var m41 = m2.m41 * m1.m11 + m2.m42 * m1.m21 + m2.m43 * m1.m31 + m2.m44 * m1.m41;
    var m42 = m2.m41 * m1.m12 + m2.m42 * m1.m22 + m2.m43 * m1.m32 + m2.m44 * m1.m42;
    var m43 = m2.m41 * m1.m13 + m2.m42 * m1.m23 + m2.m43 * m1.m33 + m2.m44 * m1.m43;
    var m44 = m2.m41 * m1.m14 + m2.m42 * m1.m24 + m2.m43 * m1.m34 + m2.m44 * m1.m44;
    return new CSSMatrix([m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44]);
  }

  function fromMatrix(m) {
    return new CSSMatrix([m.m11, m.m21, m.m31, m.m41, m.m12, m.m22, m.m32, m.m42, m.m13, m.m23, m.m33, m.m43, m.m14, m.m24, m.m34, m.m44]);
  }

  function feedFromArray(m, array) {
    var a = Array.from(array);

    if (a.length === 16) {
      var m11 = a[0];
      var m21 = a[1];
      var m31 = a[2];
      var m41 = a[3];
      var m12 = a[4];
      var m22 = a[5];
      var m32 = a[6];
      var m42 = a[7];
      var m13 = a[8];
      var m23 = a[9];
      var m33 = a[10];
      var m43 = a[11];
      var m14 = a[12];
      var m24 = a[13];
      var m34 = a[14];
      var m44 = a[15];
      m.m11 = m11;
      m.a = m11;
      m.m21 = m21;
      m.c = m21;
      m.m31 = m31;
      m.m41 = m41;
      m.e = m41;
      m.m12 = m12;
      m.b = m12;
      m.m22 = m22;
      m.d = m22;
      m.m32 = m32;
      m.m42 = m42;
      m.f = m42;
      m.m13 = m13;
      m.m23 = m23;
      m.m33 = m33;
      m.m43 = m43;
      m.m14 = m14;
      m.m24 = m24;
      m.m34 = m34;
      m.m44 = m44;
    } else if (a.length === 6) {
      var m11$1 = a[0];
      var m12$1 = a[1];
      var m21$1 = a[2];
      var m22$1 = a[3];
      var m14$1 = a[4];
      var m24$1 = a[5];
      m.m11 = m11$1;
      m.a = m11$1;
      m.m12 = m12$1;
      m.b = m12$1;
      m.m21 = m21$1;
      m.c = m21$1;
      m.m22 = m22$1;
      m.d = m22$1;
      m.m14 = m14$1;
      m.e = m14$1;
      m.m24 = m24$1;
      m.f = m24$1;
    } else {
      throw new TypeError('CSSMatrix: expecting a 6/16 values Array');
    }

    return m;
  }

  function fromArray(a) {
    return feedFromArray(new CSSMatrix(), a);
  }

  CSSMatrixProto.setMatrixValue = function setMatrixValue(source) {
    var m = this;

    if (!source || !source.length) {
      return m;
    }

    if (source.length && typeof source[0] === 'string' && source[0].length) {
      var string = String(source[0]).trim();
      var type = '';
      var values = [];

      if (string === 'none') {
        return m;
      }

      type = string.slice(0, string.indexOf('('));
      values = string.slice(type === 'matrix' ? 7 : 9, -1).split(',').map(function (n) {
        return Math.abs(n) < 1e-6 ? 0 : +n;
      });

      if ([6, 16].indexOf(values.length) > -1) {
        feedFromArray(m, values);
      } else {
        throw new TypeError('CSSMatrix: expecting valid CSS matrix() / matrix3d() syntax');
      }
    } else if (source[0] instanceof CSSMatrix) {
      feedFromArray(m, source[0].toArray());
    } else if (Array.isArray(source[0])) {
      feedFromArray(m, source[0]);
    } else if (Array.isArray(source)) {
      feedFromArray(m, source);
    }

    return m;
  };

  CSSMatrixProto.toString = function toString() {
    var m = this;
    var type = m.is2D ? 'matrix' : 'matrix3d';
    return type + "(" + m.toArray(1).join(',') + ")";
  };

  CSSMatrixProto.toArray = function toArray(transposed) {
    var m = this;
    var result;

    if (m.is2D) {
      result = [m.a, m.b, m.c, m.d, m.e, m.f];
    } else if (transposed) {
      result = [m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44];
    } else {
      result = [m.m11, m.m21, m.m31, m.m41, m.m12, m.m22, m.m32, m.m42, m.m13, m.m23, m.m33, m.m43, m.m14, m.m24, m.m34, m.m44];
    }

    return result;
  };

  CSSMatrixProto.multiply = function multiply(m2) {
    return Multiply(this, m2);
  };

  CSSMatrixProto.translate = function translate(x, y, z) {
    var X = x;
    var Y = y;
    var Z = z;

    if (Z == null) {
      Z = 0;
    }

    if (Y == null) {
      Y = 0;
    }

    return Multiply(this, Translate(X, Y, Z));
  };

  CSSMatrixProto.scale = function scale(x, y, z) {
    var X = x;
    var Y = y;
    var Z = z;

    if (Y == null) {
      Y = x;
    }

    if (Z == null) {
      Z = x;
    }

    return Multiply(this, Scale(X, Y, Z));
  };

  CSSMatrixProto.rotate = function rotate(rx, ry, rz) {
    var RX = rx;
    var RY = ry;
    var RZ = rz;

    if (RY == null) {
      RY = 0;
    }

    if (RZ == null) {
      RZ = RX;
      RX = 0;
    }

    return Multiply(this, Rotate(RX, RY, RZ));
  };

  CSSMatrixProto.rotateAxisAngle = function rotateAxisAngle(x, y, z, angle) {
    if (arguments.length !== 4) {
      throw new TypeError('CSSMatrix: expecting 4 values');
    }

    return Multiply(this, RotateAxisAngle(x, y, z, angle));
  };

  CSSMatrixProto.skewX = function skewX(angle) {
    return Multiply(this, SkewX(angle));
  };

  CSSMatrixProto.skewY = function skewY(angle) {
    return Multiply(this, SkewY(angle));
  };

  CSSMatrixProto.setIdentity = function setIdentity() {
    var identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    return feedFromArray(this, identity);
  };

  CSSMatrixProto.transformPoint = function transformPoint(v) {
    var M = this;
    var m = Translate(v.x, v.y, v.z);
    m.m44 = v.w || 1;
    m = M.multiply(m);
    return {
      x: m.m41,
      y: m.m42,
      z: m.m43,
      w: m.m44
    };
  };

  CSSMatrixProto.transform = function transform(t) {
    var m = this;
    var x = m.m11 * t.x + m.m12 * t.y + m.m13 * t.z + m.m14 * t.w;
    var y = m.m21 * t.x + m.m22 * t.y + m.m23 * t.z + m.m24 * t.w;
    var z = m.m31 * t.x + m.m32 * t.y + m.m33 * t.z + m.m34 * t.w;
    var w = m.m41 * t.x + m.m42 * t.y + m.m43 * t.z + m.m44 * t.w;
    return {
      x: x / w,
      y: y / w,
      z: z / w,
      w: w
    };
  };

  CSSMatrix.Translate = Translate;
  CSSMatrix.Rotate = Rotate;
  CSSMatrix.RotateAxisAngle = RotateAxisAngle;
  CSSMatrix.Scale = Scale;
  CSSMatrix.SkewX = SkewX;
  CSSMatrix.SkewY = SkewY;
  CSSMatrix.Multiply = Multiply;
  CSSMatrix.fromMatrix = fromMatrix;
  CSSMatrix.fromArray = fromArray;
  CSSMatrix.feedFromArray = feedFromArray;
  return CSSMatrix;
});

/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(61);
__w_pdfjs_require__(76);
var path = __w_pdfjs_require__(86);
module.exports = path.Object.fromEntries;

/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var toIndexedObject = __w_pdfjs_require__(15);
var addToUnscopables = __w_pdfjs_require__(62);
var Iterators = __w_pdfjs_require__(67);
var InternalStateModule = __w_pdfjs_require__(44);
var defineIterator = __w_pdfjs_require__(68);
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
/* 62 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(29);
var create = __w_pdfjs_require__(63);
var definePropertyModule = __w_pdfjs_require__(40);
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
/* 63 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
var defineProperties = __w_pdfjs_require__(64);
var enumBugKeys = __w_pdfjs_require__(56);
var hiddenKeys = __w_pdfjs_require__(47);
var html = __w_pdfjs_require__(66);
var documentCreateElement = __w_pdfjs_require__(38);
var sharedKey = __w_pdfjs_require__(46);
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
 if (iframe.style) {
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
 }
};
var activeXDocument;
var NullProtoObject = function () {
 try {
  activeXDocument = new ActiveXObject('htmlfile');
 } catch (error) {
 }
 NullProtoObject = document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() || NullProtoObjectViaActiveX(activeXDocument);
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
/* 64 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(11);
var definePropertyModule = __w_pdfjs_require__(40);
var anObject = __w_pdfjs_require__(41);
var objectKeys = __w_pdfjs_require__(65);
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
/* 65 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var internalObjectKeys = __w_pdfjs_require__(51);
var enumBugKeys = __w_pdfjs_require__(56);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 66 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(23);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 68 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var createIteratorConstructor = __w_pdfjs_require__(69);
var getPrototypeOf = __w_pdfjs_require__(71);
var setPrototypeOf = __w_pdfjs_require__(74);
var setToStringTag = __w_pdfjs_require__(73);
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var redefine = __w_pdfjs_require__(42);
var wellKnownSymbol = __w_pdfjs_require__(29);
var IS_PURE = __w_pdfjs_require__(31);
var Iterators = __w_pdfjs_require__(67);
var IteratorsCore = __w_pdfjs_require__(70);
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
/* 69 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var IteratorPrototype = __w_pdfjs_require__(70).IteratorPrototype;
var create = __w_pdfjs_require__(63);
var createPropertyDescriptor = __w_pdfjs_require__(14);
var setToStringTag = __w_pdfjs_require__(73);
var Iterators = __w_pdfjs_require__(67);
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
/* 70 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var fails = __w_pdfjs_require__(12);
var getPrototypeOf = __w_pdfjs_require__(71);
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var has = __w_pdfjs_require__(34);
var wellKnownSymbol = __w_pdfjs_require__(29);
var IS_PURE = __w_pdfjs_require__(31);
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
/* 71 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var has = __w_pdfjs_require__(34);
var toObject = __w_pdfjs_require__(35);
var sharedKey = __w_pdfjs_require__(46);
var CORRECT_PROTOTYPE_GETTER = __w_pdfjs_require__(72);
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
/* 72 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(12);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 73 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var defineProperty = __w_pdfjs_require__(40).f;
var has = __w_pdfjs_require__(34);
var wellKnownSymbol = __w_pdfjs_require__(29);
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
/* 74 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
var aPossiblePrototype = __w_pdfjs_require__(75);
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
/* 75 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(21);
module.exports = function (it) {
 if (!isObject(it) && it !== null) {
  throw TypeError("Can't set " + String(it) + ' as a prototype');
 }
 return it;
};

/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var $ = __w_pdfjs_require__(8);
var iterate = __w_pdfjs_require__(77);
var createProperty = __w_pdfjs_require__(85);
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
/* 77 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
var isArrayIteratorMethod = __w_pdfjs_require__(78);
var toLength = __w_pdfjs_require__(53);
var bind = __w_pdfjs_require__(79);
var getIteratorMethod = __w_pdfjs_require__(81);
var iteratorClose = __w_pdfjs_require__(84);
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
/* 78 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(29);
var Iterators = __w_pdfjs_require__(67);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 79 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var aFunction = __w_pdfjs_require__(80);
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
/* 80 */
/***/ ((module) => {

module.exports = function (it) {
 if (typeof it != 'function') {
  throw TypeError(String(it) + ' is not a function');
 }
 return it;
};

/***/ }),
/* 81 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(82);
var Iterators = __w_pdfjs_require__(67);
var wellKnownSymbol = __w_pdfjs_require__(29);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (it != undefined)
  return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(83);
var classofRaw = __w_pdfjs_require__(17);
var wellKnownSymbol = __w_pdfjs_require__(29);
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
/* 83 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(29);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 84 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
module.exports = function (iterator) {
 var returnMethod = iterator['return'];
 if (returnMethod !== undefined) {
  return anObject(returnMethod.call(iterator)).value;
 }
};

/***/ }),
/* 85 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var toPropertyKey = __w_pdfjs_require__(19);
var definePropertyModule = __w_pdfjs_require__(40);
var createPropertyDescriptor = __w_pdfjs_require__(14);
module.exports = function (object, key, value) {
 var propertyKey = toPropertyKey(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
module.exports = global;

/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(88);
__w_pdfjs_require__(61);
__w_pdfjs_require__(90);
__w_pdfjs_require__(92);
__w_pdfjs_require__(110);
__w_pdfjs_require__(111);
__w_pdfjs_require__(112);
__w_pdfjs_require__(113);
var path = __w_pdfjs_require__(86);
module.exports = path.Promise;

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var getPrototypeOf = __w_pdfjs_require__(71);
var setPrototypeOf = __w_pdfjs_require__(74);
var create = __w_pdfjs_require__(63);
var createNonEnumerableProperty = __w_pdfjs_require__(39);
var createPropertyDescriptor = __w_pdfjs_require__(14);
var iterate = __w_pdfjs_require__(77);
var toString = __w_pdfjs_require__(89);
var $AggregateError = function AggregateError(errors, message) {
 var that = this;
 if (!(that instanceof $AggregateError))
  return new $AggregateError(errors, message);
 if (setPrototypeOf) {
  that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
 }
 if (message !== undefined)
  createNonEnumerableProperty(that, 'message', toString(message));
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
/* 89 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isSymbol = __w_pdfjs_require__(22);
module.exports = function (argument) {
 if (isSymbol(argument))
  throw TypeError('Cannot convert a Symbol value to a string');
 return String(argument);
};

/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(83);
var redefine = __w_pdfjs_require__(42);
var toString = __w_pdfjs_require__(91);
if (!TO_STRING_TAG_SUPPORT) {
 redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(83);
var classof = __w_pdfjs_require__(82);
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
 return '[object ' + classof(this) + ']';
};

/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var IS_PURE = __w_pdfjs_require__(31);
var global = __w_pdfjs_require__(9);
var getBuiltIn = __w_pdfjs_require__(23);
var NativePromise = __w_pdfjs_require__(93);
var redefine = __w_pdfjs_require__(42);
var redefineAll = __w_pdfjs_require__(94);
var setPrototypeOf = __w_pdfjs_require__(74);
var setToStringTag = __w_pdfjs_require__(73);
var setSpecies = __w_pdfjs_require__(95);
var isObject = __w_pdfjs_require__(21);
var aFunction = __w_pdfjs_require__(80);
var anInstance = __w_pdfjs_require__(96);
var inspectSource = __w_pdfjs_require__(43);
var iterate = __w_pdfjs_require__(77);
var checkCorrectnessOfIteration = __w_pdfjs_require__(97);
var speciesConstructor = __w_pdfjs_require__(98);
var task = __w_pdfjs_require__(99).set;
var microtask = __w_pdfjs_require__(102);
var promiseResolve = __w_pdfjs_require__(105);
var hostReportErrors = __w_pdfjs_require__(107);
var newPromiseCapabilityModule = __w_pdfjs_require__(106);
var perform = __w_pdfjs_require__(108);
var InternalStateModule = __w_pdfjs_require__(44);
var isForced = __w_pdfjs_require__(58);
var wellKnownSymbol = __w_pdfjs_require__(29);
var IS_BROWSER = __w_pdfjs_require__(109);
var IS_NODE = __w_pdfjs_require__(101);
var V8_VERSION = __w_pdfjs_require__(26);
var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
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
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
 var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
 var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
 if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66)
  return true;
 if (IS_PURE && !PromiseConstructorPrototype['finally'])
  return true;
 if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
  return false;
 var promise = new PromiseConstructor(function (resolve) {
  resolve(1);
 });
 var FakePromise = function (exec) {
  exec(function () {
  }, function () {
  });
 };
 var constructor = promise.constructor = {};
 constructor[SPECIES] = FakePromise;
 SUBCLASSING = promise.then(function () {
 }) instanceof FakePromise;
 if (!SUBCLASSING)
  return true;
 return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
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
 PromiseConstructorPrototype = PromiseConstructor.prototype;
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
 Internal.prototype = redefineAll(PromiseConstructorPrototype, {
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
 if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
  nativeThen = NativePromisePrototype.then;
  if (!SUBCLASSING) {
   redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var that = this;
    return new PromiseConstructor(function (resolve, reject) {
     nativeThen.call(that, resolve, reject);
    }).then(onFulfilled, onRejected);
   }, { unsafe: true });
   redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
  }
  try {
   delete NativePromisePrototype.constructor;
  } catch (error) {
  }
  if (setPrototypeOf) {
   setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
  }
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
/* 93 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
module.exports = global.Promise;

/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var redefine = __w_pdfjs_require__(42);
module.exports = function (target, src, options) {
 for (var key in src)
  redefine(target, key, src[key], options);
 return target;
};

/***/ }),
/* 95 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var getBuiltIn = __w_pdfjs_require__(23);
var definePropertyModule = __w_pdfjs_require__(40);
var wellKnownSymbol = __w_pdfjs_require__(29);
var DESCRIPTORS = __w_pdfjs_require__(11);
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
/* 96 */
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
 if (!(it instanceof Constructor)) {
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
 }
 return it;
};

/***/ }),
/* 97 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(29);
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
/* 98 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
var aFunction = __w_pdfjs_require__(80);
var wellKnownSymbol = __w_pdfjs_require__(29);
var SPECIES = wellKnownSymbol('species');
module.exports = function (O, defaultConstructor) {
 var C = anObject(O).constructor;
 var S;
 return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var fails = __w_pdfjs_require__(12);
var bind = __w_pdfjs_require__(79);
var html = __w_pdfjs_require__(66);
var createElement = __w_pdfjs_require__(38);
var IS_IOS = __w_pdfjs_require__(100);
var IS_NODE = __w_pdfjs_require__(101);
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;
try {
 location = global.location;
} catch (error) {
}
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
 global.postMessage(String(id), location.protocol + '//' + location.host);
};
if (!set || !clear) {
 set = function setImmediate(fn) {
  var args = [];
  var argumentsLength = arguments.length;
  var i = 1;
  while (argumentsLength > i)
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
/* 100 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(27);
module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(17);
var global = __w_pdfjs_require__(9);
module.exports = classof(global.process) == 'process';

/***/ }),
/* 102 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
var getOwnPropertyDescriptor = __w_pdfjs_require__(10).f;
var macrotask = __w_pdfjs_require__(99).set;
var IS_IOS = __w_pdfjs_require__(100);
var IS_IOS_PEBBLE = __w_pdfjs_require__(103);
var IS_WEBOS_WEBKIT = __w_pdfjs_require__(104);
var IS_NODE = __w_pdfjs_require__(101);
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
 } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
  promise = Promise.resolve(undefined);
  promise.constructor = Promise;
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
/* 103 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(27);
var global = __w_pdfjs_require__(9);
module.exports = /iphone|ipod|ipad/i.test(userAgent) && global.Pebble !== undefined;

/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(27);
module.exports = /web0s(?!.*chrome)/i.test(userAgent);

/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(41);
var isObject = __w_pdfjs_require__(21);
var newPromiseCapability = __w_pdfjs_require__(106);
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
/* 106 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var aFunction = __w_pdfjs_require__(80);
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
/* 107 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(9);
module.exports = function (a, b) {
 var console = global.console;
 if (console && console.error) {
  arguments.length === 1 ? console.error(a) : console.error(a, b);
 }
};

/***/ }),
/* 108 */
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
/* 109 */
/***/ ((module) => {

module.exports = typeof window == 'object';

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var aFunction = __w_pdfjs_require__(80);
var newPromiseCapabilityModule = __w_pdfjs_require__(106);
var perform = __w_pdfjs_require__(108);
var iterate = __w_pdfjs_require__(77);
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
/* 111 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var aFunction = __w_pdfjs_require__(80);
var getBuiltIn = __w_pdfjs_require__(23);
var newPromiseCapabilityModule = __w_pdfjs_require__(106);
var perform = __w_pdfjs_require__(108);
var iterate = __w_pdfjs_require__(77);
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
/* 112 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(8);
var IS_PURE = __w_pdfjs_require__(31);
var NativePromise = __w_pdfjs_require__(93);
var fails = __w_pdfjs_require__(12);
var getBuiltIn = __w_pdfjs_require__(23);
var speciesConstructor = __w_pdfjs_require__(98);
var promiseResolve = __w_pdfjs_require__(105);
var redefine = __w_pdfjs_require__(42);
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
if (!IS_PURE && typeof NativePromise == 'function') {
 var method = getBuiltIn('Promise').prototype['finally'];
 if (NativePromise.prototype['finally'] !== method) {
  redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
 }
}

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var charAt = __w_pdfjs_require__(114).charAt;
var toString = __w_pdfjs_require__(89);
var InternalStateModule = __w_pdfjs_require__(44);
var defineIterator = __w_pdfjs_require__(68);
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
defineIterator(String, 'String', function (iterated) {
 setInternalState(this, {
  type: STRING_ITERATOR,
  string: toString(iterated),
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
/* 114 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toInteger = __w_pdfjs_require__(54);
var toString = __w_pdfjs_require__(89);
var requireObjectCoercible = __w_pdfjs_require__(18);
var createMethod = function (CONVERT_TO_STRING) {
 return function ($this, pos) {
  var S = toString(requireObjectCoercible($this));
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
/* 115 */
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
  true ? factory(exports) : 0;
}(this, function (exports) {
 'use strict';
 var SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol : function (description) {
  return "Symbol(" + description + ")";
 };
 function noop() {
  return undefined;
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
  return x instanceof ReadableStreamDefaultReader;
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
  try {
   return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
  } catch (_a) {
   return false;
  }
 }
 function streamAsyncIteratorBrandCheckException(name) {
  return new TypeError("ReadableStreamAsyncIterator." + name + " can only be used on a ReadableSteamAsyncIterator");
 }
 var NumberIsNaN = Number.isNaN || function (x) {
  return x !== x;
 };
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
 function ArrayBufferSlice(buffer, begin, end) {
  if (buffer.slice) {
   return buffer.slice(begin, end);
  }
  var length = end - begin;
  var slice = new ArrayBuffer(length);
  CopyDataBlockBytes(slice, 0, buffer, begin, length);
  return slice;
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
 function CloneAsUint8Array(O) {
  var buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
  return new Uint8Array(buffer);
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
  if (!IsNonNegativeNumber(size) || size === Infinity) {
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
   if (this._associatedReadableByteStreamController === undefined) {
    throw new TypeError('This BYOB request has been invalidated');
   }
   if (IsDetachedBuffer(view.buffer));
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
    return ReadableByteStreamControllerGetBYOBRequest(this);
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
   ReadableByteStreamControllerClearPendingPullIntos(this);
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
     bufferByteLength: autoAllocateChunkSize,
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
  return x instanceof ReadableByteStreamController;
 }
 function IsReadableStreamBYOBRequest(x) {
  if (!typeIsObject(x)) {
   return false;
  }
  if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
   return false;
  }
  return x instanceof ReadableStreamBYOBRequest;
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
   bufferByteLength: buffer.byteLength,
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
  var stream = controller._controlledReadableByteStream;
  if (ReadableStreamHasBYOBReader(stream)) {
   while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
    var pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
    ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
   }
  }
 }
 function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
  ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
  if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
   return;
  }
  ReadableByteStreamControllerShiftPendingPullInto(controller);
  var remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
  if (remainderSize > 0) {
   var end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
   var remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
   ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
  }
  pullIntoDescriptor.bytesFilled -= remainderSize;
  ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
  ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
 }
 function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
  var firstDescriptor = controller._pendingPullIntos.peek();
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  var state = controller._controlledReadableByteStream._state;
  if (state === 'closed') {
   ReadableByteStreamControllerRespondInClosedState(controller);
  } else {
   ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
  }
  ReadableByteStreamControllerCallPullIfNeeded(controller);
 }
 function ReadableByteStreamControllerShiftPendingPullInto(controller) {
  var descriptor = controller._pendingPullIntos.shift();
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
  if (controller._pendingPullIntos.length > 0) {
   var firstPendingPullInto = controller._pendingPullIntos.peek();
   if (IsDetachedBuffer(firstPendingPullInto.buffer));
   firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
  }
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
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
 function ReadableByteStreamControllerGetBYOBRequest(controller) {
  if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
   var firstDescriptor = controller._pendingPullIntos.peek();
   var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
   var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
   SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
   controller._byobRequest = byobRequest;
  }
  return controller._byobRequest;
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
  var firstDescriptor = controller._pendingPullIntos.peek();
  var state = controller._controlledReadableByteStream._state;
  if (state === 'closed') {
   if (bytesWritten !== 0) {
    throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
   }
  } else {
   if (bytesWritten === 0) {
    throw new TypeError('bytesWritten must be greater than 0 when calling respond() on a readable stream');
   }
   if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
    throw new RangeError('bytesWritten out of range');
   }
  }
  firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
  ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
 }
 function ReadableByteStreamControllerRespondWithNewView(controller, view) {
  var firstDescriptor = controller._pendingPullIntos.peek();
  var state = controller._controlledReadableByteStream._state;
  if (state === 'closed') {
   if (view.byteLength !== 0) {
    throw new TypeError('The view\'s length must be 0 when calling respondWithNewView() on a closed stream');
   }
  } else {
   if (view.byteLength === 0) {
    throw new TypeError('The view\'s length must be greater than 0 when calling respondWithNewView() on a readable stream');
   }
  }
  if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
   throw new RangeError('The region specified by view does not match byobRequest');
  }
  if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
   throw new RangeError('The buffer of view has different capacity than byobRequest');
  }
  if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
   throw new RangeError('The region specified by view is larger than byobRequest');
  }
  firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
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
  if (autoAllocateChunkSize === 0) {
   throw new TypeError('autoAllocateChunkSize must be greater than 0');
  }
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
   if (IsDetachedBuffer(view.buffer));
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
  return x instanceof ReadableStreamBYOBReader;
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
 var supportsAbortController = typeof AbortController === 'function';
 function createAbortController() {
  if (supportsAbortController) {
   return new AbortController();
  }
  return undefined;
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
     throw streamBrandCheckException$2('locked');
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
    return promiseRejectedWith(streamBrandCheckException$2('abort'));
   }
   if (IsWritableStreamLocked(this)) {
    return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
   }
   return WritableStreamAbort(this, reason);
  };
  WritableStream.prototype.close = function () {
   if (!IsWritableStream(this)) {
    return promiseRejectedWith(streamBrandCheckException$2('close'));
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
    throw streamBrandCheckException$2('getWriter');
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
  return x instanceof WritableStream;
 }
 function IsWritableStreamLocked(stream) {
  if (stream._writer === undefined) {
   return false;
  }
  return true;
 }
 function WritableStreamAbort(stream, reason) {
  var _a;
  if (stream._state === 'closed' || stream._state === 'errored') {
   return promiseResolvedWith(undefined);
  }
  stream._writableStreamController._abortReason = reason;
  (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
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
  return x instanceof WritableStreamDefaultWriter;
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
  Object.defineProperty(WritableStreamDefaultController.prototype, "abortReason", {
   get: function () {
    if (!IsWritableStreamDefaultController(this)) {
     throw defaultControllerBrandCheckException$2('abortReason');
    }
    return this._abortReason;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(WritableStreamDefaultController.prototype, "signal", {
   get: function () {
    if (!IsWritableStreamDefaultController(this)) {
     throw defaultControllerBrandCheckException$2('signal');
    }
    if (this._abortController === undefined) {
     throw new TypeError('WritableStreamDefaultController.prototype.signal is not supported');
    }
    return this._abortController.signal;
   },
   enumerable: false,
   configurable: true
  });
  WritableStreamDefaultController.prototype.error = function (e) {
   if (e === void 0) {
    e = undefined;
   }
   if (!IsWritableStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException$2('error');
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
  return x instanceof WritableStreamDefaultController;
 }
 function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledWritableStream = stream;
  stream._writableStreamController = controller;
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._abortReason = undefined;
  controller._abortController = createAbortController();
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
 function streamBrandCheckException$2(name) {
  return new TypeError("WritableStream.prototype." + name + " can only be used on a WritableStream");
 }
 function defaultControllerBrandCheckException$2(name) {
  return new TypeError("WritableStreamDefaultController.prototype." + name + " can only be used on a WritableStreamDefaultController");
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
     throw defaultControllerBrandCheckException$1('desiredSize');
    }
    return ReadableStreamDefaultControllerGetDesiredSize(this);
   },
   enumerable: false,
   configurable: true
  });
  ReadableStreamDefaultController.prototype.close = function () {
   if (!IsReadableStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException$1('close');
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
    throw defaultControllerBrandCheckException$1('enqueue');
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
    throw defaultControllerBrandCheckException$1('error');
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
  return x instanceof ReadableStreamDefaultController;
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
 function defaultControllerBrandCheckException$1(name) {
  return new TypeError("ReadableStreamDefaultController.prototype." + name + " can only be used on a ReadableStreamDefaultController");
 }
 function ReadableStreamTee(stream, cloneForBranch2) {
  if (IsReadableByteStreamController(stream._readableStreamController)) {
   return ReadableByteStreamTee(stream);
  }
  return ReadableStreamDefaultTee(stream);
 }
 function ReadableStreamDefaultTee(stream, cloneForBranch2) {
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
    _chunkSteps: function (chunk) {
     queueMicrotask(function () {
      reading = false;
      var chunk1 = chunk;
      var chunk2 = chunk;
      if (!canceled1) {
       ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
      }
      if (!canceled2) {
       ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
      }
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
     if (!canceled1 || !canceled2) {
      resolveCancelPromise(undefined);
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
   if (!canceled1 || !canceled2) {
    resolveCancelPromise(undefined);
   }
  });
  return [
   branch1,
   branch2
  ];
 }
 function ReadableByteStreamTee(stream) {
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
  function forwardReaderError(thisReader) {
   uponRejection(thisReader._closedPromise, function (r) {
    if (thisReader !== reader) {
     return;
    }
    ReadableByteStreamControllerError(branch1._readableStreamController, r);
    ReadableByteStreamControllerError(branch2._readableStreamController, r);
    if (!canceled1 || !canceled2) {
     resolveCancelPromise(undefined);
    }
   });
  }
  function pullWithDefaultReader() {
   if (IsReadableStreamBYOBReader(reader)) {
    ReadableStreamReaderGenericRelease(reader);
    reader = AcquireReadableStreamDefaultReader(stream);
    forwardReaderError(reader);
   }
   var readRequest = {
    _chunkSteps: function (chunk) {
     queueMicrotask(function () {
      reading = false;
      var chunk1 = chunk;
      var chunk2 = chunk;
      if (!canceled1 && !canceled2) {
       try {
        chunk2 = CloneAsUint8Array(chunk);
       } catch (cloneE) {
        ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
        ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
        resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
        return;
       }
      }
      if (!canceled1) {
       ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
      }
      if (!canceled2) {
       ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
      }
     });
    },
    _closeSteps: function () {
     reading = false;
     if (!canceled1) {
      ReadableByteStreamControllerClose(branch1._readableStreamController);
     }
     if (!canceled2) {
      ReadableByteStreamControllerClose(branch2._readableStreamController);
     }
     if (branch1._readableStreamController._pendingPullIntos.length > 0) {
      ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
     }
     if (branch2._readableStreamController._pendingPullIntos.length > 0) {
      ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
     }
     if (!canceled1 || !canceled2) {
      resolveCancelPromise(undefined);
     }
    },
    _errorSteps: function () {
     reading = false;
    }
   };
   ReadableStreamDefaultReaderRead(reader, readRequest);
  }
  function pullWithBYOBReader(view, forBranch2) {
   if (IsReadableStreamDefaultReader(reader)) {
    ReadableStreamReaderGenericRelease(reader);
    reader = AcquireReadableStreamBYOBReader(stream);
    forwardReaderError(reader);
   }
   var byobBranch = forBranch2 ? branch2 : branch1;
   var otherBranch = forBranch2 ? branch1 : branch2;
   var readIntoRequest = {
    _chunkSteps: function (chunk) {
     queueMicrotask(function () {
      reading = false;
      var byobCanceled = forBranch2 ? canceled2 : canceled1;
      var otherCanceled = forBranch2 ? canceled1 : canceled2;
      if (!otherCanceled) {
       var clonedChunk = void 0;
       try {
        clonedChunk = CloneAsUint8Array(chunk);
       } catch (cloneE) {
        ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
        ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
        resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
        return;
       }
       if (!byobCanceled) {
        ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
       }
       ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
      } else if (!byobCanceled) {
       ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
      }
     });
    },
    _closeSteps: function (chunk) {
     reading = false;
     var byobCanceled = forBranch2 ? canceled2 : canceled1;
     var otherCanceled = forBranch2 ? canceled1 : canceled2;
     if (!byobCanceled) {
      ReadableByteStreamControllerClose(byobBranch._readableStreamController);
     }
     if (!otherCanceled) {
      ReadableByteStreamControllerClose(otherBranch._readableStreamController);
     }
     if (chunk !== undefined) {
      if (!byobCanceled) {
       ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
      }
      if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
       ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
      }
     }
     if (!byobCanceled || !otherCanceled) {
      resolveCancelPromise(undefined);
     }
    },
    _errorSteps: function () {
     reading = false;
    }
   };
   ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
  }
  function pull1Algorithm() {
   if (reading) {
    return promiseResolvedWith(undefined);
   }
   reading = true;
   var byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
   if (byobRequest === null) {
    pullWithDefaultReader();
   } else {
    pullWithBYOBReader(byobRequest._view, false);
   }
   return promiseResolvedWith(undefined);
  }
  function pull2Algorithm() {
   if (reading) {
    return promiseResolvedWith(undefined);
   }
   reading = true;
   var byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
   if (byobRequest === null) {
    pullWithDefaultReader();
   } else {
    pullWithBYOBReader(byobRequest._view, true);
   }
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
  branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
  branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
  forwardReaderError(reader);
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
 function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
  var stream = Object.create(ReadableStream.prototype);
  InitializeReadableStream(stream);
  var controller = Object.create(ReadableByteStreamController.prototype);
  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, undefined);
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
  return x instanceof ReadableStream;
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
  var reader = stream._reader;
  if (reader !== undefined && IsReadableStreamBYOBReader(reader)) {
   reader._readIntoRequests.forEach(function (readIntoRequest) {
    readIntoRequest._closeSteps(undefined);
   });
   reader._readIntoRequests = new SimpleQueue();
  }
  var sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
  return transformPromiseWith(sourceCancelPromise, noop);
 }
 function ReadableStreamClose(stream) {
  stream._state = 'closed';
  var reader = stream._reader;
  if (reader === undefined) {
   return;
  }
  defaultReaderClosedPromiseResolve(reader);
  if (IsReadableStreamDefaultReader(reader)) {
   reader._readRequests.forEach(function (readRequest) {
    readRequest._closeSteps();
   });
   reader._readRequests = new SimpleQueue();
  }
 }
 function ReadableStreamError(stream, e) {
  stream._state = 'errored';
  stream._storedError = e;
  var reader = stream._reader;
  if (reader === undefined) {
   return;
  }
  defaultReaderClosedPromiseReject(reader, e);
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
 var byteLengthSizeFunction = function (chunk) {
  return chunk.byteLength;
 };
 Object.defineProperty(byteLengthSizeFunction, 'name', {
  value: 'size',
  configurable: true
 });
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
  return x instanceof ByteLengthQueuingStrategy;
 }
 var countSizeFunction = function () {
  return 1;
 };
 Object.defineProperty(countSizeFunction, 'name', {
  value: 'size',
  configurable: true
 });
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
  return x instanceof CountQueuingStrategy;
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
     throw streamBrandCheckException('readable');
    }
    return this._readable;
   },
   enumerable: false,
   configurable: true
  });
  Object.defineProperty(TransformStream.prototype, "writable", {
   get: function () {
    if (!IsTransformStream(this)) {
     throw streamBrandCheckException('writable');
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
  return x instanceof TransformStream;
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
     throw defaultControllerBrandCheckException('desiredSize');
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
    throw defaultControllerBrandCheckException('enqueue');
   }
   TransformStreamDefaultControllerEnqueue(this, chunk);
  };
  TransformStreamDefaultController.prototype.error = function (reason) {
   if (reason === void 0) {
    reason = undefined;
   }
   if (!IsTransformStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException('error');
   }
   TransformStreamDefaultControllerError(this, reason);
  };
  TransformStreamDefaultController.prototype.terminate = function () {
   if (!IsTransformStreamDefaultController(this)) {
    throw defaultControllerBrandCheckException('terminate');
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
  return x instanceof TransformStreamDefaultController;
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
 function defaultControllerBrandCheckException(name) {
  return new TypeError("TransformStreamDefaultController.prototype." + name + " can only be used on a TransformStreamDefaultController");
 }
 function streamBrandCheckException(name) {
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
/* 116 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseSVGFactory = exports.BaseStandardFontDataFactory = exports.BaseCMapReaderFactory = exports.BaseCanvasFactory = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseCanvasFactory = /*#__PURE__*/function () {
  function BaseCanvasFactory() {
    _classCallCheck(this, BaseCanvasFactory);

    if (this.constructor === BaseCanvasFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCanvasFactory.");
    }
  }

  _createClass(BaseCanvasFactory, [{
    key: "create",
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      var canvas = this._createCanvas(width, height);

      return {
        canvas: canvas,
        context: canvas.getContext("2d")
      };
    }
  }, {
    key: "reset",
    value: function reset(canvasAndContext, width, height) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy(canvasAndContext) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }, {
    key: "_createCanvas",
    value: function _createCanvas(width, height) {
      (0, _util.unreachable)("Abstract method `_createCanvas` called.");
    }
  }]);

  return BaseCanvasFactory;
}();

exports.BaseCanvasFactory = BaseCanvasFactory;

var BaseCMapReaderFactory = /*#__PURE__*/function () {
  function BaseCMapReaderFactory(_ref) {
    var _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === void 0 ? null : _ref$baseUrl,
        _ref$isCompressed = _ref.isCompressed,
        isCompressed = _ref$isCompressed === void 0 ? false : _ref$isCompressed;

    _classCallCheck(this, BaseCMapReaderFactory);

    if (this.constructor === BaseCMapReaderFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCMapReaderFactory.");
    }

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  _createClass(BaseCMapReaderFactory, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
        var _this = this;

        var name, url, compressionType;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref2.name;

                if (this.baseUrl) {
                  _context.next = 3;
                  break;
                }

                throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');

              case 3:
                if (name) {
                  _context.next = 5;
                  break;
                }

                throw new Error("CMap name must be specified.");

              case 5:
                url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
                compressionType = this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE;
                return _context.abrupt("return", this._fetchData(url, compressionType)["catch"](function (reason) {
                  throw new Error("Unable to load ".concat(_this.isCompressed ? "binary " : "", "CMap at: ").concat(url));
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      (0, _util.unreachable)("Abstract method `_fetchData` called.");
    }
  }]);

  return BaseCMapReaderFactory;
}();

exports.BaseCMapReaderFactory = BaseCMapReaderFactory;

var BaseStandardFontDataFactory = /*#__PURE__*/function () {
  function BaseStandardFontDataFactory(_ref3) {
    var _ref3$baseUrl = _ref3.baseUrl,
        baseUrl = _ref3$baseUrl === void 0 ? null : _ref3$baseUrl;

    _classCallCheck(this, BaseStandardFontDataFactory);

    if (this.constructor === BaseStandardFontDataFactory) {
      (0, _util.unreachable)("Cannot initialize BaseStandardFontDataFactory.");
    }

    this.baseUrl = baseUrl;
  }

  _createClass(BaseStandardFontDataFactory, [{
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref4) {
        var filename, url;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filename = _ref4.filename;

                if (this.baseUrl) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('The standard font "baseUrl" parameter must be specified, ensure that ' + 'the "standardFontDataUrl" API parameter is provided.');

              case 3:
                if (filename) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("Font filename must be specified.");

              case 5:
                url = "".concat(this.baseUrl).concat(filename);
                return _context2.abrupt("return", this._fetchData(url)["catch"](function (reason) {
                  throw new Error("Unable to load font data at: ".concat(url));
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetch(_x2) {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_fetchData",
    value: function _fetchData(url) {
      (0, _util.unreachable)("Abstract method `_fetchData` called.");
    }
  }]);

  return BaseStandardFontDataFactory;
}();

exports.BaseStandardFontDataFactory = BaseStandardFontDataFactory;

var BaseSVGFactory = /*#__PURE__*/function () {
  function BaseSVGFactory() {
    _classCallCheck(this, BaseSVGFactory);

    if (this.constructor === BaseSVGFactory) {
      (0, _util.unreachable)("Cannot initialize BaseSVGFactory.");
    }
  }

  _createClass(BaseSVGFactory, [{
    key: "create",
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid SVG dimensions");
      }

      var svg = this._createSVG("svg:svg");

      svg.setAttribute("version", "1.1");
      svg.setAttribute("width", "".concat(width, "px"));
      svg.setAttribute("height", "".concat(height, "px"));
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
      return svg;
    }
  }, {
    key: "createElement",
    value: function createElement(type) {
      if (typeof type !== "string") {
        throw new Error("Invalid SVG element type");
      }

      return this._createSVG(type);
    }
  }, {
    key: "_createSVG",
    value: function _createSVG(type) {
      (0, _util.unreachable)("Abstract method `_createSVG` called.");
    }
  }]);

  return BaseSVGFactory;
}();

exports.BaseSVGFactory = BaseSVGFactory;

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDocument = getDocument;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.version = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCMapReaderFactory = exports.DefaultCanvasFactory = exports.build = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _display_utils = __w_pdfjs_require__(1);

var _font_loader = __w_pdfjs_require__(118);

var _node_utils = __w_pdfjs_require__(119);

var _annotation_storage = __w_pdfjs_require__(121);

var _canvas = __w_pdfjs_require__(122);

var _worker_options = __w_pdfjs_require__(124);

var _is_node = __w_pdfjs_require__(120);

var _message_handler = __w_pdfjs_require__(125);

var _metadata = __w_pdfjs_require__(126);

var _optional_content_config = __w_pdfjs_require__(127);

var _transport_stream = __w_pdfjs_require__(128);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var RENDERING_CANCELLED_TIMEOUT = 100;
var ServiceWorkerOptions = {
  showUnverifiedSignatures: false
};
window.ServiceWorkerOptions = ServiceWorkerOptions;
var DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
exports.DefaultCanvasFactory = DefaultCanvasFactory;
var DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
var DefaultStandardFontDataFactory = _is_node.isNodeJS ? _node_utils.NodeStandardFontDataFactory : _display_utils.DOMStandardFontDataFactory;
exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory;
var createPDFNetworkStream;

function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}

function getDocument(src) {
  var task = new PDFDocumentLoadingTask();
  var source;

  if (typeof src === "string" || src instanceof URL) {
    source = {
      url: src
    };
  } else if ((0, _util.isArrayBuffer)(src)) {
    source = {
      data: src
    };
  } else if (src instanceof PDFDataRangeTransport) {
    source = {
      range: src
    };
  } else {
    if (_typeof(src) !== "object") {
      throw new Error("Invalid parameter in getDocument, " + "need either string, URL, Uint8Array, or parameter object.");
    }

    if (!src.url && !src.data && !src.range) {
      throw new Error("Invalid parameter object: need either .data, .range or .url");
    }

    source = src;
  }

  var params = Object.create(null);
  var rangeTransport = null,
      worker = null;

  for (var key in source) {
    var value = source[key];

    switch (key) {
      case "url":
        if (typeof window !== "undefined") {
          try {
            params[key] = new URL(value, window.location).href;
            continue;
          } catch (ex) {
            (0, _util.warn)("Cannot create valid URL: \"".concat(ex, "\"."));
          }
        } else if (typeof value === "string" || value instanceof URL) {
          params[key] = value.toString();
          continue;
        }

        throw new Error("Invalid PDF url data: " + "either string or URL-object is expected in the url property.");

      case "range":
        rangeTransport = value;
        continue;

      case "worker":
        worker = value;
        continue;

      case "data":
        if (_is_node.isNodeJS && typeof Buffer !== "undefined" && value instanceof Buffer) {
          params[key] = new Uint8Array(value);
        } else if (value instanceof Uint8Array) {
          break;
        } else if (typeof value === "string") {
          params[key] = (0, _util.stringToBytes)(value);
        } else if (_typeof(value) === "object" && value !== null && !isNaN(value.length)) {
          params[key] = new Uint8Array(value);
        } else if ((0, _util.isArrayBuffer)(value)) {
          params[key] = new Uint8Array(value);
        } else {
          throw new Error("Invalid PDF binary data: either typed array, " + "string, or array-like object is expected in the data property.");
        }

        continue;
    }

    params[key] = value;
  }

  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.CMapReaderFactory = params.CMapReaderFactory || DefaultCMapReaderFactory;
  params.StandardFontDataFactory = params.StandardFontDataFactory || DefaultStandardFontDataFactory;
  params.ignoreErrors = params.stopAtErrors !== true;
  params.fontExtraProperties = params.fontExtraProperties === true;
  params.pdfBug = params.pdfBug === true;
  params.enableXfa = params.enableXfa === true;

  if (typeof params.docBaseUrl !== "string" || (0, _display_utils.isDataScheme)(params.docBaseUrl)) {
    params.docBaseUrl = null;
  }

  if (!Number.isInteger(params.maxImageSize)) {
    params.maxImageSize = -1;
  }

  if (typeof params.useWorkerFetch !== "boolean") {
    params.useWorkerFetch = params.CMapReaderFactory === _display_utils.DOMCMapReaderFactory && params.StandardFontDataFactory === _display_utils.DOMStandardFontDataFactory;
  }

  if (typeof params.isEvalSupported !== "boolean") {
    params.isEvalSupported = true;
  }

  if (typeof params.disableFontFace !== "boolean") {
    params.disableFontFace = _is_node.isNodeJS;
  }

  if (typeof params.useSystemFonts !== "boolean") {
    params.useSystemFonts = !_is_node.isNodeJS && !params.disableFontFace;
  }

  if (typeof params.ownerDocument === "undefined") {
    params.ownerDocument = globalThis.document;
  }

  if (typeof params.disableRange !== "boolean") {
    params.disableRange = false;
  }

  if (typeof params.disableStream !== "boolean") {
    params.disableStream = false;
  }

  if (typeof params.disableAutoFetch !== "boolean") {
    params.disableAutoFetch = false;
  }

  (0, _util.setVerbosityLevel)(params.verbosity);

  if (!worker) {
    var workerParams = {
      verbosity: params.verbosity,
      port: _worker_options.GlobalWorkerOptions.workerPort
    };
    worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
    task._worker = worker;
  }

  var docId = task.docId;
  worker.promise.then(function () {
    if (task.destroyed) {
      throw new Error("Loading aborted");
    }

    var workerIdPromise = _fetchDocument(worker, params, rangeTransport, docId);

    var networkStreamPromise = new Promise(function (resolve) {
      var networkStream;

      if (rangeTransport) {
        networkStream = new _transport_stream.PDFDataTransportStream({
          length: params.length,
          initialData: params.initialData,
          progressiveDone: params.progressiveDone,
          contentDispositionFilename: params.contentDispositionFilename,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        }, rangeTransport);
      } else if (!params.data) {
        networkStream = createPDFNetworkStream({
          url: params.url,
          length: params.length,
          httpHeaders: params.httpHeaders,
          withCredentials: params.withCredentials,
          rangeChunkSize: params.rangeChunkSize,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        });
      }

      resolve(networkStream);
    });
    return Promise.all([workerIdPromise, networkStreamPromise]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          workerId = _ref2[0],
          networkStream = _ref2[1];

      if (task.destroyed) {
        throw new Error("Loading aborted");
      }

      var messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      messageHandler.postMessageTransfers = worker.postMessageTransfers;
      var transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      messageHandler.send("showUnverifiedSignatures", window.ServiceWorkerOptions.showUnverifiedSignatures);
      messageHandler.send("Ready", null);
    });
  })["catch"](task._capability.reject);
  return task;
}

function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
  if (worker.destroyed) {
    return Promise.reject(new Error("Worker was destroyed"));
  }

  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
    source.progressiveDone = pdfDataRangeTransport.progressiveDone;
    source.contentDispositionFilename = pdfDataRangeTransport.contentDispositionFilename;
  }

  var cMapUrl = source.cMapUrl;

  if (cMapUrl.constructor.name === "Function") {
    cMapUrl = cMapUrl();
  }

  return worker.messageHandler.sendWithPromise("GetDocRequest", {
    docId: docId,
    apiVersion: '2.10.551',
    source: {
      data: source.data,
      url: source.url,
      password: source.password,
      disableAutoFetch: source.disableAutoFetch,
      rangeChunkSize: source.rangeChunkSize,
      length: source.length
    },
    maxImageSize: source.maxImageSize,
    disableFontFace: source.disableFontFace,
    postMessageTransfers: worker.postMessageTransfers,
    docBaseUrl: source.docBaseUrl,
    ignoreErrors: source.ignoreErrors,
    isEvalSupported: source.isEvalSupported,
    fontExtraProperties: source.fontExtraProperties,
    enableXfa: source.enableXfa,
    useSystemFonts: source.useSystemFonts,
    cMapUrl: source.useWorkerFetch ? cMapUrl : null,
    standardFontDataUrl: source.useWorkerFetch ? source.standardFontDataUrl : null
  }).then(function (workerId) {
    if (worker.destroyed) {
      throw new Error("Worker was destroyed");
    }

    return workerId;
  });
}

var PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
  var nextDocumentId = 0;

  var PDFDocumentLoadingTask = /*#__PURE__*/function () {
    function PDFDocumentLoadingTask() {
      _classCallCheck(this, PDFDocumentLoadingTask);

      this._capability = (0, _util.createPromiseCapability)();
      this._transport = null;
      this._worker = null;
      this.docId = "d" + nextDocumentId++;
      this.destroyed = false;
      this.onPassword = null;
      this.onProgress = null;
      this.onUnsupportedFeature = null;
    }

    _createClass(PDFDocumentLoadingTask, [{
      key: "promise",
      get: function get() {
        return this._capability.promise;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this = this;

        this.destroyed = true;
        var transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
        return transportDestroyed.then(function () {
          _this._transport = null;

          if (_this._worker) {
            _this._worker.destroy();

            _this._worker = null;
          }
        });
      }
    }]);

    return PDFDocumentLoadingTask;
  }();

  return PDFDocumentLoadingTask;
}();

var PDFDataRangeTransport = /*#__PURE__*/function () {
  function PDFDataRangeTransport(length, initialData) {
    var progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PDFDataRangeTransport);

    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this.contentDispositionFilename = contentDispositionFilename;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(PDFDataRangeTransport, [{
    key: "addRangeListener",
    value: function addRangeListener(listener) {
      this._rangeListeners.push(listener);
    }
  }, {
    key: "addProgressListener",
    value: function addProgressListener(listener) {
      this._progressListeners.push(listener);
    }
  }, {
    key: "addProgressiveReadListener",
    value: function addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    }
  }, {
    key: "addProgressiveDoneListener",
    value: function addProgressiveDoneListener(listener) {
      this._progressiveDoneListeners.push(listener);
    }
  }, {
    key: "onDataRange",
    value: function onDataRange(begin, chunk) {
      var _iterator = _createForOfIteratorHelper(this._rangeListeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener(begin, chunk);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onDataProgress",
    value: function onDataProgress(loaded, total) {
      var _this2 = this;

      this._readyCapability.promise.then(function () {
        var _iterator2 = _createForOfIteratorHelper(_this2._progressListeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var listener = _step2.value;
            listener(loaded, total);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveRead",
    value: function onDataProgressiveRead(chunk) {
      var _this3 = this;

      this._readyCapability.promise.then(function () {
        var _iterator3 = _createForOfIteratorHelper(_this3._progressiveReadListeners),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var listener = _step3.value;
            listener(chunk);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveDone",
    value: function onDataProgressiveDone() {
      var _this4 = this;

      this._readyCapability.promise.then(function () {
        var _iterator4 = _createForOfIteratorHelper(_this4._progressiveDoneListeners),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var listener = _step4.value;
            listener();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      });
    }
  }, {
    key: "transportReady",
    value: function transportReady() {
      this._readyCapability.resolve();
    }
  }, {
    key: "requestDataRange",
    value: function requestDataRange(begin, end) {
      (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
    }
  }, {
    key: "abort",
    value: function abort() {}
  }]);

  return PDFDataRangeTransport;
}();

exports.PDFDataRangeTransport = PDFDataRangeTransport;

var PDFDocumentProxy = /*#__PURE__*/function () {
  function PDFDocumentProxy(pdfInfo, transport) {
    _classCallCheck(this, PDFDocumentProxy);

    this._pdfInfo = pdfInfo;
    this._transport = transport;
    Object.defineProperty(this, "fingerprint", {
      get: function get() {
        (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, " + "please use `PDFDocumentProxy.fingerprints` instead.");
        return this.fingerprints[0];
      }
    });
  }

  _createClass(PDFDocumentProxy, [{
    key: "annotationStorage",
    get: function get() {
      return this._transport.annotationStorage;
    }
  }, {
    key: "numPages",
    get: function get() {
      return this._pdfInfo.numPages;
    }
  }, {
    key: "fingerprints",
    get: function get() {
      return this._pdfInfo.fingerprints;
    }
  }, {
    key: "isPureXfa",
    get: function get() {
      return !!this._transport._htmlForXfa;
    }
  }, {
    key: "allXfaHtml",
    get: function get() {
      return this._transport._htmlForXfa;
    }
  }, {
    key: "getPage",
    value: function getPage(pageNumber) {
      return this._transport.getPage(pageNumber);
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this._transport.getPageIndex(ref);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this._transport.getDestinations();
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      return this._transport.getDestination(id);
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this._transport.getPageLabels();
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this._transport.getPageLayout();
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this._transport.getPageMode();
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this._transport.getViewerPreferences();
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this._transport.getOpenAction();
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this._transport.getAttachments();
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this._transport.getJavaScript();
    }
  }, {
    key: "getJSActions",
    value: function getJSActions() {
      return this._transport.getDocJSActions();
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this._transport.getOutline();
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this._transport.getOptionalContentConfig();
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this._transport.getPermissions();
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this._transport.getMetadata();
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this._transport.getMarkInfo();
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._transport.getData();
    }
  }, {
    key: "getDownloadInfo",
    value: function getDownloadInfo() {
      return this._transport.downloadInfoCapability.promise;
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this._transport.getStats();
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var keepLoadedFonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this.loadingTask.destroy();
    }
  }, {
    key: "loadingParams",
    get: function get() {
      return this._transport.loadingParams;
    }
  }, {
    key: "loadingTask",
    get: function get() {
      return this._transport.loadingTask;
    }
  }, {
    key: "saveDocument",
    value: function saveDocument() {
      if (this._transport.annotationStorage.size <= 0) {
        (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, " + "please use the getData-method instead.");
      }

      return this._transport.saveDocument();
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this._transport.getFieldObjects();
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this._transport.hasJSActions();
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this._transport.getCalculationOrderIds();
    }
  }]);

  return PDFDocumentProxy;
}();

exports.PDFDocumentProxy = PDFDocumentProxy;

var PDFPageProxy = /*#__PURE__*/function () {
  function PDFPageProxy(pageIndex, pageInfo, transport, ownerDocument) {
    var pdfBug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, PDFPageProxy);

    this._pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._ownerDocument = ownerDocument;
    this._transport = transport;
    this._stats = pdfBug ? new _display_utils.StatTimer() : null;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this.cleanupAfterRender = false;
    this.pendingCleanup = false;
    this._intentStates = new Map();
    this.destroyed = false;
  }

  _createClass(PDFPageProxy, [{
    key: "pageNumber",
    get: function get() {
      return this._pageIndex + 1;
    }
  }, {
    key: "rotate",
    get: function get() {
      return this._pageInfo.rotate;
    }
  }, {
    key: "ref",
    get: function get() {
      return this._pageInfo.ref;
    }
  }, {
    key: "userUnit",
    get: function get() {
      return this._pageInfo.userUnit;
    }
  }, {
    key: "view",
    get: function get() {
      return this._pageInfo.view;
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          scale = _ref3.scale,
          _ref3$rotation = _ref3.rotation,
          rotation = _ref3$rotation === void 0 ? this.rotate : _ref3$rotation,
          _ref3$offsetX = _ref3.offsetX,
          offsetX = _ref3$offsetX === void 0 ? 0 : _ref3$offsetX,
          _ref3$offsetY = _ref3.offsetY,
          offsetY = _ref3$offsetY === void 0 ? 0 : _ref3$offsetY,
          _ref3$dontFlip = _ref3.dontFlip,
          dontFlip = _ref3$dontFlip === void 0 ? false : _ref3$dontFlip;

      return new _display_utils.PageViewport({
        viewBox: this.view,
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$intent = _ref4.intent,
          intent = _ref4$intent === void 0 ? null : _ref4$intent;

      var renderingIntent = intent === "display" || intent === "print" ? intent : null;

      if (!this._annotationsPromise || this._annotationsIntent !== renderingIntent) {
        this._annotationsPromise = this._transport.getAnnotations(this._pageIndex, renderingIntent);
        this._annotationsIntent = renderingIntent;
      }

      return this._annotationsPromise;
    }
  }, {
    key: "getJSActions",
    value: function getJSActions() {
      return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
    }
  }, {
    key: "getXfa",
    value: function () {
      var _getXfa = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this$_transport$_htm;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", ((_this$_transport$_htm = this._transport._htmlForXfa) === null || _this$_transport$_htm === void 0 ? void 0 : _this$_transport$_htm.children[this._pageIndex]) || null);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getXfa() {
        return _getXfa.apply(this, arguments);
      }

      return getXfa;
    }()
  }, {
    key: "render",
    value: function render(_ref5) {
      var _this5 = this,
          _intentState;

      var canvasContext = _ref5.canvasContext,
          viewport = _ref5.viewport,
          _ref5$intent = _ref5.intent,
          intent = _ref5$intent === void 0 ? "display" : _ref5$intent,
          _ref5$renderInteracti = _ref5.renderInteractiveForms,
          renderInteractiveForms = _ref5$renderInteracti === void 0 ? false : _ref5$renderInteracti,
          _ref5$transform = _ref5.transform,
          transform = _ref5$transform === void 0 ? null : _ref5$transform,
          _ref5$imageLayer = _ref5.imageLayer,
          imageLayer = _ref5$imageLayer === void 0 ? null : _ref5$imageLayer,
          _ref5$canvasFactory = _ref5.canvasFactory,
          canvasFactory = _ref5$canvasFactory === void 0 ? null : _ref5$canvasFactory,
          _ref5$background = _ref5.background,
          background = _ref5$background === void 0 ? null : _ref5$background,
          _ref5$includeAnnotati = _ref5.includeAnnotationStorage,
          includeAnnotationStorage = _ref5$includeAnnotati === void 0 ? false : _ref5$includeAnnotati,
          _ref5$optionalContent = _ref5.optionalContentConfigPromise,
          optionalContentConfigPromise = _ref5$optionalContent === void 0 ? null : _ref5$optionalContent;

      if (this._stats) {
        this._stats.time("Overall");
      }

      var renderingIntent = intent === "print" ? "print" : "display";
      this.pendingCleanup = false;

      if (!optionalContentConfigPromise) {
        optionalContentConfigPromise = this._transport.getOptionalContentConfig();
      }

      var intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      if (intentState.streamReaderCancelTimeout) {
        clearTimeout(intentState.streamReaderCancelTimeout);
        intentState.streamReaderCancelTimeout = null;
      }

      var canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
        ownerDocument: this._ownerDocument
      });
      var annotationStorage = includeAnnotationStorage ? this._transport.annotationStorage.serializable : null;

      if (!intentState.displayReadyCapability) {
        intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent,
          renderInteractiveForms: renderInteractiveForms === true,
          annotationStorage: annotationStorage
        });
      }

      var complete = function complete(error) {
        intentState.renderTasks["delete"](internalRenderTask);

        if (_this5.cleanupAfterRender || renderingIntent === "print") {
          _this5.pendingCleanup = true;
        }

        _this5._tryCleanup();

        if (error) {
          internalRenderTask.capability.reject(error);

          _this5._abortOperatorList({
            intentState: intentState,
            reason: error
          });
        } else {
          internalRenderTask.capability.resolve();
        }

        if (_this5._stats) {
          _this5._stats.timeEnd("Rendering");

          _this5._stats.timeEnd("Overall");
        }
      };

      var internalRenderTask = new InternalRenderTask({
        callback: complete,
        params: {
          canvasContext: canvasContext,
          viewport: viewport,
          transform: transform,
          imageLayer: imageLayer,
          background: background
        },
        objs: this.objs,
        commonObjs: this.commonObjs,
        operatorList: intentState.operatorList,
        pageIndex: this._pageIndex,
        canvasFactory: canvasFactoryInstance,
        useRequestAnimationFrame: renderingIntent !== "print",
        pdfBug: this._pdfBug
      });
      ((_intentState = intentState).renderTasks || (_intentState.renderTasks = new Set())).add(internalRenderTask);
      var renderTask = internalRenderTask.task;
      Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            transparency = _ref7[0],
            optionalContentConfig = _ref7[1];

        if (_this5.pendingCleanup) {
          complete();
          return;
        }

        if (_this5._stats) {
          _this5._stats.time("Rendering");
        }

        internalRenderTask.initializeGraphics({
          transparency: transparency,
          optionalContentConfig: optionalContentConfig
        });
        internalRenderTask.operatorListChanged();
      })["catch"](complete);
      return renderTask;
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref8$intent = _ref8.intent,
          intent = _ref8$intent === void 0 ? "display" : _ref8$intent;

      function operatorListChanged() {
        if (intentState.operatorList.lastChunk) {
          intentState.opListReadCapability.resolve(intentState.operatorList);
          intentState.renderTasks["delete"](opListTask);
        }
      }

      var renderingIntent = "oplist-".concat(intent === "print" ? "print" : "display");

      var intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      var opListTask;

      if (!intentState.opListReadCapability) {
        var _intentState2;

        opListTask = Object.create(null);
        opListTask.operatorListChanged = operatorListChanged;
        intentState.opListReadCapability = (0, _util.createPromiseCapability)();
        ((_intentState2 = intentState).renderTasks || (_intentState2.renderTasks = new Set())).add(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent
        });
      }

      return intentState.opListReadCapability.promise;
    }
  }, {
    key: "streamTextContent",
    value: function streamTextContent() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref9$normalizeWhites = _ref9.normalizeWhitespace,
          normalizeWhitespace = _ref9$normalizeWhites === void 0 ? false : _ref9$normalizeWhites,
          _ref9$disableCombineT = _ref9.disableCombineTextItems,
          disableCombineTextItems = _ref9$disableCombineT === void 0 ? false : _ref9$disableCombineT,
          _ref9$includeMarkedCo = _ref9.includeMarkedContent,
          includeMarkedContent = _ref9$includeMarkedCo === void 0 ? false : _ref9$includeMarkedCo;

      var TEXT_CONTENT_CHUNK_SIZE = 100;
      return this._transport.messageHandler.sendWithStream("GetTextContent", {
        pageIndex: this._pageIndex,
        normalizeWhitespace: normalizeWhitespace === true,
        combineTextItems: disableCombineTextItems !== true,
        includeMarkedContent: includeMarkedContent === true
      }, {
        highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
        size: function size(textContent) {
          return textContent.items.length;
        }
      });
    }
  }, {
    key: "getTextContent",
    value: function getTextContent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var readableStream = this.streamTextContent(params);
      return new Promise(function (resolve, reject) {
        function pump() {
          reader.read().then(function (_ref10) {
            var _textContent$items;

            var value = _ref10.value,
                done = _ref10.done;

            if (done) {
              resolve(textContent);
              return;
            }

            Object.assign(textContent.styles, value.styles);

            (_textContent$items = textContent.items).push.apply(_textContent$items, _toConsumableArray(value.items));

            pump();
          }, reject);
        }

        var reader = readableStream.getReader();
        var textContent = {
          items: [],
          styles: Object.create(null)
        };
        pump();
      });
    }
  }, {
    key: "getStructTree",
    value: function getStructTree() {
      return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this.destroyed = true;
      this._transport.pageCache[this._pageIndex] = null;
      var waitOn = [];

      var _iterator5 = _createForOfIteratorHelper(this._intentStates),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              intent = _step5$value[0],
              intentState = _step5$value[1];

          this._abortOperatorList({
            intentState: intentState,
            reason: new Error("Page was destroyed."),
            force: true
          });

          if (intent.startsWith("oplist-")) {
            continue;
          }

          var _iterator6 = _createForOfIteratorHelper(intentState.renderTasks),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var internalRenderTask = _step6.value;
              waitOn.push(internalRenderTask.completed);
              internalRenderTask.cancel();
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.objs.clear();
      this._annotationsPromise = null;
      this._jsActionsPromise = null;
      this._structTreePromise = null;
      this.pendingCleanup = false;
      return Promise.all(waitOn);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.pendingCleanup = true;

      if (!this._tryCleanup(resetStats)) {
        this.cleanupAfterRender = true;
      }

      return true;
    }
  }, {
    key: "_tryCleanup",
    value: function _tryCleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.pendingCleanup) {
        return false;
      }

      var _iterator7 = _createForOfIteratorHelper(this._intentStates.values()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _step7.value,
              renderTasks = _step7$value.renderTasks,
              operatorList = _step7$value.operatorList;

          if (renderTasks.size > 0 || !operatorList.lastChunk) {
            return false;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this._intentStates.clear();

      this.objs.clear();
      this._annotationsPromise = null;
      this._jsActionsPromise = null;
      this._structTreePromise = null;

      if (resetStats && this._stats) {
        this._stats = new _display_utils.StatTimer();
      }

      this.pendingCleanup = false;
      return true;
    }
  }, {
    key: "_startRenderPage",
    value: function _startRenderPage(transparency, intent) {
      var intentState = this._intentStates.get(intent);

      if (!intentState) {
        return;
      }

      if (this._stats) {
        this._stats.timeEnd("Page Request");
      }

      if (intentState.displayReadyCapability) {
        intentState.displayReadyCapability.resolve(transparency);
      }
    }
  }, {
    key: "_renderPageChunk",
    value: function _renderPageChunk(operatorListChunk, intentState) {
      for (var i = 0, ii = operatorListChunk.length; i < ii; i++) {
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
        intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
      }

      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

      var _iterator8 = _createForOfIteratorHelper(intentState.renderTasks),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var internalRenderTask = _step8.value;
          internalRenderTask.operatorListChanged();
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      if (operatorListChunk.lastChunk) {
        this._tryCleanup();
      }
    }
  }, {
    key: "_pumpOperatorList",
    value: function _pumpOperatorList(args) {
      var _this6 = this;

      (0, _util.assert)(args.intent, 'PDFPageProxy._pumpOperatorList: Expected "intent" argument.');

      var readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", args);

      var reader = readableStream.getReader();

      var intentState = this._intentStates.get(args.intent);

      intentState.streamReader = reader;

      var pump = function pump() {
        reader.read().then(function (_ref11) {
          var value = _ref11.value,
              done = _ref11.done;

          if (done) {
            intentState.streamReader = null;
            return;
          }

          if (_this6._transport.destroyed) {
            return;
          }

          _this6._renderPageChunk(value, intentState);

          pump();
        }, function (reason) {
          intentState.streamReader = null;

          if (_this6._transport.destroyed) {
            return;
          }

          if (intentState.operatorList) {
            intentState.operatorList.lastChunk = true;

            var _iterator9 = _createForOfIteratorHelper(intentState.renderTasks),
                _step9;

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var internalRenderTask = _step9.value;
                internalRenderTask.operatorListChanged();
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            _this6._tryCleanup();
          }

          if (intentState.displayReadyCapability) {
            intentState.displayReadyCapability.reject(reason);
          } else if (intentState.opListReadCapability) {
            intentState.opListReadCapability.reject(reason);
          } else {
            throw reason;
          }
        });
      };

      pump();
    }
  }, {
    key: "_abortOperatorList",
    value: function _abortOperatorList(_ref12) {
      var _this7 = this;

      var intentState = _ref12.intentState,
          reason = _ref12.reason,
          _ref12$force = _ref12.force,
          force = _ref12$force === void 0 ? false : _ref12$force;
      (0, _util.assert)(reason instanceof Error || _typeof(reason) === "object" && reason !== null, 'PDFPageProxy._abortOperatorList: Expected "reason" argument.');

      if (!intentState.streamReader) {
        return;
      }

      if (!force) {
        if (intentState.renderTasks.size > 0) {
          return;
        }

        if (reason instanceof _display_utils.RenderingCancelledException) {
          intentState.streamReaderCancelTimeout = setTimeout(function () {
            _this7._abortOperatorList({
              intentState: intentState,
              reason: reason,
              force: true
            });

            intentState.streamReaderCancelTimeout = null;
          }, RENDERING_CANCELLED_TIMEOUT);
          return;
        }
      }

      intentState.streamReader.cancel(new _util.AbortException(reason === null || reason === void 0 ? void 0 : reason.message));
      intentState.streamReader = null;

      if (this._transport.destroyed) {
        return;
      }

      var _iterator10 = _createForOfIteratorHelper(this._intentStates),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _step10$value = _slicedToArray(_step10.value, 2),
              intent = _step10$value[0],
              curIntentState = _step10$value[1];

          if (curIntentState === intentState) {
            this._intentStates["delete"](intent);

            break;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      this.cleanup();
    }
  }, {
    key: "stats",
    get: function get() {
      return this._stats;
    }
  }]);

  return PDFPageProxy;
}();

exports.PDFPageProxy = PDFPageProxy;

var LoopbackPort = /*#__PURE__*/function () {
  function LoopbackPort() {
    _classCallCheck(this, LoopbackPort);

    this._listeners = [];
    this._deferred = Promise.resolve(undefined);
  }

  _createClass(LoopbackPort, [{
    key: "postMessage",
    value: function postMessage(obj, transfers) {
      var _this8 = this;

      function cloneValue(value) {
        if (typeof value === "function" || _typeof(value) === "symbol" || value instanceof URL) {
          throw new Error("LoopbackPort.postMessage - cannot clone: ".concat(value === null || value === void 0 ? void 0 : value.toString()));
        }

        if (_typeof(value) !== "object" || value === null) {
          return value;
        }

        if (cloned.has(value)) {
          return cloned.get(value);
        }

        var buffer, result;

        if ((buffer = value.buffer) && (0, _util.isArrayBuffer)(buffer)) {
          if (transfers !== null && transfers !== void 0 && transfers.includes(buffer)) {
            result = new value.constructor(buffer, value.byteOffset, value.byteLength);
          } else {
            result = new value.constructor(value);
          }

          cloned.set(value, result);
          return result;
        }

        if (value instanceof Map) {
          result = new Map();
          cloned.set(value, result);

          var _iterator11 = _createForOfIteratorHelper(value),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var _step11$value = _slicedToArray(_step11.value, 2),
                  key = _step11$value[0],
                  val = _step11$value[1];

              result.set(key, cloneValue(val));
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }

          return result;
        }

        if (value instanceof Set) {
          result = new Set();
          cloned.set(value, result);

          var _iterator12 = _createForOfIteratorHelper(value),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var _val = _step12.value;
              result.add(cloneValue(_val));
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          return result;
        }

        result = Array.isArray(value) ? [] : Object.create(null);
        cloned.set(value, result);

        for (var i in value) {
          var desc = void 0,
              p = value;

          while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
            p = Object.getPrototypeOf(p);
          }

          if (typeof desc.value === "undefined") {
            continue;
          }

          if (typeof desc.value === "function") {
            var _value$hasOwnProperty;

            if (i === 'cMapUrl') {
              result[i] = cloneValue(desc.value());
            } else if (!((_value$hasOwnProperty = value.hasOwnProperty) !== null && _value$hasOwnProperty !== void 0 && _value$hasOwnProperty.call(value, i))) {
              continue;
            }
          }

          result[i] = cloneValue(desc.value);
        }

        return result;
      }

      var cloned = new WeakMap();
      var event = {
        data: cloneValue(obj)
      };

      this._deferred.then(function () {
        var _iterator13 = _createForOfIteratorHelper(_this8._listeners),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var listener = _step13.value;
            listener.call(_this8, event);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      });
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(name, listener) {
      this._listeners.push(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(name, listener) {
      var i = this._listeners.indexOf(listener);

      this._listeners.splice(i, 1);
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this._listeners.length = 0;
    }
  }]);

  return LoopbackPort;
}();

exports.LoopbackPort = LoopbackPort;

var PDFWorker = function PDFWorkerClosure() {
  var pdfWorkerPorts = new WeakMap();
  var isWorkerDisabled = false;
  var fallbackWorkerSrc;
  var nextFakeWorkerId = 0;
  var fakeWorkerCapability;

  if (_is_node.isNodeJS && typeof require === "function") {
    isWorkerDisabled = true;
    fallbackWorkerSrc = "./pdf.worker.js";
  } else if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && "currentScript" in document) {
    var _document$currentScri;

    var pdfjsFilePath = (_document$currentScri = document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.src;

    if (pdfjsFilePath) {
      fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
    }
  }

  function _getWorkerSrc() {
    if (_worker_options.GlobalWorkerOptions.workerSrc) {
      if (_worker_options.GlobalWorkerOptions.workerSrc.constructor.name === "Function") {
        return _worker_options.GlobalWorkerOptions.workerSrc();
      }

      return _worker_options.GlobalWorkerOptions.workerSrc;
    }

    if (typeof fallbackWorkerSrc !== "undefined") {
      if (!_is_node.isNodeJS) {
        (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
      }

      return fallbackWorkerSrc;
    }

    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }

  function getMainThreadWorkerMessageHandler() {
    var mainWorkerMessageHandler;

    try {
      var _globalThis$pdfjsWork;

      mainWorkerMessageHandler = (_globalThis$pdfjsWork = globalThis.pdfjsWorker) === null || _globalThis$pdfjsWork === void 0 ? void 0 : _globalThis$pdfjsWork.WorkerMessageHandler;
    } catch (ex) {}

    return mainWorkerMessageHandler || null;
  }

  function setupFakeWorkerGlobal() {
    if (fakeWorkerCapability) {
      return fakeWorkerCapability.promise;
    }

    fakeWorkerCapability = (0, _util.createPromiseCapability)();

    var loader = /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var mainWorkerMessageHandler, worker;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mainWorkerMessageHandler = getMainThreadWorkerMessageHandler();

                if (!mainWorkerMessageHandler) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", mainWorkerMessageHandler);

              case 3:
                if (!(_is_node.isNodeJS && typeof require === "function")) {
                  _context2.next = 6;
                  break;
                }

                worker = eval("require")(_getWorkerSrc());
                return _context2.abrupt("return", worker.WorkerMessageHandler);

              case 6:
                _context2.next = 8;
                return (0, _display_utils.loadScript)(_getWorkerSrc());

              case 8:
                return _context2.abrupt("return", window.pdfjsWorker.WorkerMessageHandler);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function loader() {
        return _ref13.apply(this, arguments);
      };
    }();

    loader().then(fakeWorkerCapability.resolve, fakeWorkerCapability.reject);
    return fakeWorkerCapability.promise;
  }

  function createCDNWrapper(url) {
    var wrapper = "importScripts('" + url + "');";
    return URL.createObjectURL(new Blob([wrapper]));
  }

  var PDFWorker = /*#__PURE__*/function () {
    function PDFWorker() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref14$name = _ref14.name,
          name = _ref14$name === void 0 ? null : _ref14$name,
          _ref14$port = _ref14.port,
          port = _ref14$port === void 0 ? null : _ref14$port,
          _ref14$verbosity = _ref14.verbosity,
          verbosity = _ref14$verbosity === void 0 ? (0, _util.getVerbosityLevel)() : _ref14$verbosity;

      _classCallCheck(this, PDFWorker);

      if (port && pdfWorkerPorts.has(port)) {
        throw new Error("Cannot use more than one PDFWorker per port");
      }

      this.name = name;
      this.destroyed = false;
      this.postMessageTransfers = true;
      this.verbosity = verbosity;
      this._readyCapability = (0, _util.createPromiseCapability)();
      this._port = null;
      this._webWorker = null;
      this._messageHandler = null;

      if (port) {
        pdfWorkerPorts.set(port, this);

        this._initializeFromPort(port);

        return;
      }

      this._initialize();
    }

    _createClass(PDFWorker, [{
      key: "promise",
      get: function get() {
        return this._readyCapability.promise;
      }
    }, {
      key: "port",
      get: function get() {
        return this._port;
      }
    }, {
      key: "messageHandler",
      get: function get() {
        return this._messageHandler;
      }
    }, {
      key: "_initializeFromPort",
      value: function _initializeFromPort(port) {
        this._port = port;
        this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);

        this._messageHandler.on("ready", function () {});

        this._readyCapability.resolve();
      }
    }, {
      key: "_initialize",
      value: function _initialize() {
        var _this9 = this;

        if (typeof Worker !== "undefined" && !isWorkerDisabled && !getMainThreadWorkerMessageHandler()) {
          var workerSrc = _getWorkerSrc();

          try {
            if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
              workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
            }

            var worker = new Worker(workerSrc);
            var messageHandler = new _message_handler.MessageHandler("main", "worker", worker);

            var terminateEarly = function terminateEarly() {
              worker.removeEventListener("error", onWorkerError);
              messageHandler.destroy();
              worker.terminate();

              if (_this9.destroyed) {
                _this9._readyCapability.reject(new Error("Worker was destroyed"));
              } else {
                _this9._setupFakeWorker();
              }
            };

            var onWorkerError = function onWorkerError() {
              if (!_this9._webWorker) {
                terminateEarly();
              }
            };

            worker.addEventListener("error", onWorkerError);
            messageHandler.on("test", function (data) {
              worker.removeEventListener("error", onWorkerError);

              if (_this9.destroyed) {
                terminateEarly();
                return;
              }

              if (data) {
                _this9._messageHandler = messageHandler;
                _this9._port = worker;
                _this9._webWorker = worker;

                if (!data.supportTransfers) {
                  _this9.postMessageTransfers = false;
                }

                _this9._readyCapability.resolve();

                messageHandler.send("configure", {
                  verbosity: _this9.verbosity
                });
              } else {
                _this9._setupFakeWorker();

                messageHandler.destroy();
                worker.terminate();
              }
            });
            messageHandler.on("ready", function (data) {
              worker.removeEventListener("error", onWorkerError);

              if (_this9.destroyed) {
                terminateEarly();
                return;
              }

              try {
                sendTest();
              } catch (e) {
                _this9._setupFakeWorker();
              }
            });

            var sendTest = function sendTest() {
              var testObj = new Uint8Array([_this9.postMessageTransfers ? 255 : 0]);

              try {
                messageHandler.send("test", testObj, [testObj.buffer]);
              } catch (ex) {
                (0, _util.warn)("Cannot use postMessage transfers.");
                testObj[0] = 0;
                messageHandler.send("test", testObj);
              }
            };

            sendTest();
            return;
          } catch (e) {
            (0, _util.info)("The worker has been disabled.");
          }
        }

        this._setupFakeWorker();
      }
    }, {
      key: "_setupFakeWorker",
      value: function _setupFakeWorker() {
        var _this10 = this;

        if (!isWorkerDisabled) {
          (0, _util.warn)("Setting up fake worker.");
          isWorkerDisabled = true;
        }

        setupFakeWorkerGlobal().then(function (WorkerMessageHandler) {
          if (_this10.destroyed) {
            _this10._readyCapability.reject(new Error("Worker was destroyed"));

            return;
          }

          var port = new LoopbackPort();
          _this10._port = port;
          var id = "fake" + nextFakeWorkerId++;
          var workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
          WorkerMessageHandler.setup(workerHandler, port);
          var messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
          _this10._messageHandler = messageHandler;

          _this10._readyCapability.resolve();

          messageHandler.send("configure", {
            verbosity: _this10.verbosity
          });
        })["catch"](function (reason) {
          _this10._readyCapability.reject(new Error("Setting up fake worker failed: \"".concat(reason.message, "\".")));
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyed = true;

        if (this._webWorker) {
          this._webWorker.terminate();

          this._webWorker = null;
        }

        pdfWorkerPorts["delete"](this._port);
        this._port = null;

        if (this._messageHandler) {
          this._messageHandler.destroy();

          this._messageHandler = null;
        }
      }
    }], [{
      key: "fromPort",
      value: function fromPort(params) {
        if (!params || !params.port) {
          throw new Error("PDFWorker.fromPort - invalid method signature.");
        }

        if (pdfWorkerPorts.has(params.port)) {
          return pdfWorkerPorts.get(params.port);
        }

        return new PDFWorker(params);
      }
    }, {
      key: "getWorkerSrc",
      value: function getWorkerSrc() {
        return _getWorkerSrc();
      }
    }]);

    return PDFWorker;
  }();

  return PDFWorker;
}();

exports.PDFWorker = PDFWorker;

var WorkerTransport = /*#__PURE__*/function () {
  function WorkerTransport(messageHandler, loadingTask, networkStream, params) {
    _classCallCheck(this, WorkerTransport);

    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new _font_loader.FontLoader({
      docId: loadingTask.docId,
      onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
      ownerDocument: params.ownerDocument,
      styleElement: params.styleElement
    });
    this._params = params;

    if (!params.useWorkerFetch) {
      var cMapUrl = params.cMapUrl;

      if (cMapUrl.constructor.name === "Function") {
        cMapUrl = cMapUrl();
      }

      this.CMapReaderFactory = new params.CMapReaderFactory({
        baseUrl: cMapUrl,
        isCompressed: params.cMapPacked
      });
      this.StandardFontDataFactory = new params.StandardFontDataFactory({
        baseUrl: params.standardFontDataUrl
      });
    }

    this.destroyed = false;
    this.destroyCapability = null;
    this._passwordCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.pageCache = [];
    this.pagePromises = [];
    this.downloadInfoCapability = (0, _util.createPromiseCapability)();
    this.setupMessageHandler();
  }

  _createClass(WorkerTransport, [{
    key: "annotationStorage",
    get: function get() {
      return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this11 = this;

      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }

      this.destroyed = true;
      this.destroyCapability = (0, _util.createPromiseCapability)();

      if (this._passwordCapability) {
        this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
      }

      var waitOn = [];

      var _iterator14 = _createForOfIteratorHelper(this.pageCache),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var page = _step14.value;

          if (page) {
            waitOn.push(page._destroy());
          }
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      this.pageCache.length = 0;
      this.pagePromises.length = 0;

      if (this.hasOwnProperty("annotationStorage")) {
        this.annotationStorage.resetModified();
      }

      var terminated = this.messageHandler.sendWithPromise("Terminate", null);
      waitOn.push(terminated);
      Promise.all(waitOn).then(function () {
        _this11.commonObjs.clear();

        _this11.fontLoader.clear();

        _this11._hasJSActionsPromise = null;

        if (_this11._networkStream) {
          _this11._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated."));
        }

        if (_this11.messageHandler) {
          _this11.messageHandler.destroy();

          _this11.messageHandler = null;
        }

        _this11.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    }
  }, {
    key: "setupMessageHandler",
    value: function setupMessageHandler() {
      var _this12 = this;

      var messageHandler = this.messageHandler,
          loadingTask = this.loadingTask;
      messageHandler.on("GetReader", function (data, sink) {
        (0, _util.assert)(_this12._networkStream, "GetReader - no `IPDFStream` instance available.");
        _this12._fullReader = _this12._networkStream.getFullReader();

        _this12._fullReader.onProgress = function (evt) {
          _this12._lastProgress = {
            loaded: evt.loaded,
            total: evt.total
          };
        };

        sink.onPull = function () {
          _this12._fullReader.read().then(function (_ref15) {
            var value = _ref15.value,
                done = _ref15.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          _this12._fullReader.cancel(reason);

          sink.ready["catch"](function (readyReason) {
            if (_this12.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("ReaderHeadersReady", function (data) {
        var headersCapability = (0, _util.createPromiseCapability)();
        var fullReader = _this12._fullReader;
        fullReader.headersReady.then(function () {
          if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
            if (_this12._lastProgress && loadingTask.onProgress) {
              loadingTask.onProgress(_this12._lastProgress);
            }

            fullReader.onProgress = function (evt) {
              if (loadingTask.onProgress) {
                loadingTask.onProgress({
                  loaded: evt.loaded,
                  total: evt.total
                });
              }
            };
          }

          headersCapability.resolve({
            isStreamingSupported: fullReader.isStreamingSupported,
            isRangeSupported: fullReader.isRangeSupported,
            contentLength: fullReader.contentLength
          });
        }, headersCapability.reject);
        return headersCapability.promise;
      });
      messageHandler.on("GetRangeReader", function (data, sink) {
        (0, _util.assert)(_this12._networkStream, "GetRangeReader - no `IPDFStream` instance available.");

        var rangeReader = _this12._networkStream.getRangeReader(data.begin, data.end);

        if (!rangeReader) {
          sink.close();
          return;
        }

        sink.onPull = function () {
          rangeReader.read().then(function (_ref16) {
            var value = _ref16.value,
                done = _ref16.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          rangeReader.cancel(reason);
          sink.ready["catch"](function (readyReason) {
            if (_this12.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("GetDoc", function (_ref17) {
        var pdfInfo = _ref17.pdfInfo;
        _this12._numPages = pdfInfo.numPages;
        _this12._htmlForXfa = pdfInfo.htmlForXfa;
        delete pdfInfo.htmlForXfa;

        loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, _this12));
      });
      messageHandler.on("DocException", function (ex) {
        var reason;

        switch (ex.name) {
          case "PasswordException":
            reason = new _util.PasswordException(ex.message, ex.code);
            break;

          case "InvalidPDFException":
            reason = new _util.InvalidPDFException(ex.message);
            break;

          case "MissingPDFException":
            reason = new _util.MissingPDFException(ex.message);
            break;

          case "UnexpectedResponseException":
            reason = new _util.UnexpectedResponseException(ex.message, ex.status);
            break;

          case "UnknownErrorException":
            reason = new _util.UnknownErrorException(ex.message, ex.details);
            break;
        }

        if (!(reason instanceof Error)) {
          var msg = "DocException - expected a valid Error.";
          (0, _util.warn)(msg);
        }

        loadingTask._capability.reject(reason);
      });
      messageHandler.on("PasswordRequest", function (exception) {
        _this12._passwordCapability = (0, _util.createPromiseCapability)();

        if (loadingTask.onPassword) {
          var updatePassword = function updatePassword(password) {
            _this12._passwordCapability.resolve({
              password: password
            });
          };

          try {
            loadingTask.onPassword(updatePassword, exception.code);
          } catch (ex) {
            _this12._passwordCapability.reject(ex);
          }
        } else {
          _this12._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
        }

        return _this12._passwordCapability.promise;
      });
      messageHandler.on("DataLoaded", function (data) {
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.length,
            total: data.length
          });
        }

        _this12.downloadInfoCapability.resolve(data);
      });
      messageHandler.on("StartRenderPage", function (data) {
        if (_this12.destroyed) {
          return;
        }

        var page = _this12.pageCache[data.pageIndex];

        page._startRenderPage(data.transparency, data.intent);
      });
      messageHandler.on("commonobj", function (data) {
        var _globalThis$FontInspe;

        if (_this12.destroyed) {
          return;
        }

        var _data = _slicedToArray(data, 3),
            id = _data[0],
            type = _data[1],
            exportedData = _data[2];

        if (_this12.commonObjs.has(id)) {
          return;
        }

        switch (type) {
          case "Font":
            var params = _this12._params;

            if ("error" in exportedData) {
              var exportedError = exportedData.error;
              (0, _util.warn)("Error during font loading: ".concat(exportedError));

              _this12.commonObjs.resolve(id, exportedError);

              break;
            }

            var fontRegistry = null;

            if (params.pdfBug && (_globalThis$FontInspe = globalThis.FontInspector) !== null && _globalThis$FontInspe !== void 0 && _globalThis$FontInspe.enabled) {
              fontRegistry = {
                registerFont: function registerFont(font, url) {
                  globalThis.FontInspector.fontAdded(font, url);
                }
              };
            }

            var font = new _font_loader.FontFaceObject(exportedData, {
              isEvalSupported: params.isEvalSupported,
              disableFontFace: params.disableFontFace,
              ignoreErrors: params.ignoreErrors,
              onUnsupportedFeature: _this12._onUnsupportedFeature.bind(_this12),
              fontRegistry: fontRegistry
            });

            _this12.fontLoader.bind(font)["catch"](function (reason) {
              return messageHandler.sendWithPromise("FontFallback", {
                id: id
              });
            })["finally"](function () {
              if (!params.fontExtraProperties && font.data) {
                font.data = null;
              }

              _this12.commonObjs.resolve(id, font);
            });

            break;

          case "FontPath":
          case "Image":
            _this12.commonObjs.resolve(id, exportedData);

            break;

          default:
            throw new Error("Got unknown common object type ".concat(type));
        }
      });
      messageHandler.on("obj", function (data) {
        var _imageData$data;

        if (_this12.destroyed) {
          return undefined;
        }

        var _data2 = _slicedToArray(data, 4),
            id = _data2[0],
            pageIndex = _data2[1],
            type = _data2[2],
            imageData = _data2[3];

        var pageProxy = _this12.pageCache[pageIndex];

        if (pageProxy.objs.has(id)) {
          return undefined;
        }

        switch (type) {
          case "Image":
            pageProxy.objs.resolve(id, imageData);
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;

            if ((imageData === null || imageData === void 0 ? void 0 : (_imageData$data = imageData.data) === null || _imageData$data === void 0 ? void 0 : _imageData$data.length) > MAX_IMAGE_SIZE_TO_STORE) {
              pageProxy.cleanupAfterRender = true;
            }

            break;

          case "Pattern":
            pageProxy.objs.resolve(id, imageData);
            break;

          default:
            throw new Error("Got unknown object type ".concat(type));
        }

        return undefined;
      });
      messageHandler.on("DocProgress", function (data) {
        if (_this12.destroyed) {
          return;
        }

        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.loaded,
            total: data.total
          });
        }
      });
      messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
      messageHandler.on("FetchBuiltInCMap", function (data) {
        if (_this12.destroyed) {
          return Promise.reject(new Error("Worker was destroyed."));
        }

        if (!_this12.CMapReaderFactory) {
          return Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
        }

        return _this12.CMapReaderFactory.fetch(data);
      });
      messageHandler.on("FetchStandardFontData", function (data) {
        if (_this12.destroyed) {
          return Promise.reject(new Error("Worker was destroyed."));
        }

        if (!_this12.StandardFontDataFactory) {
          return Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
        }

        return _this12.StandardFontDataFactory.fetch(data);
      });
    }
  }, {
    key: "_onUnsupportedFeature",
    value: function _onUnsupportedFeature(_ref18) {
      var featureId = _ref18.featureId;

      if (this.destroyed) {
        return;
      }

      if (this.loadingTask.onUnsupportedFeature) {
        this.loadingTask.onUnsupportedFeature(featureId);
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.messageHandler.sendWithPromise("GetData", null);
    }
  }, {
    key: "getPage",
    value: function getPage(pageNumber) {
      var _this13 = this;

      if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
        return Promise.reject(new Error("Invalid page request"));
      }

      var pageIndex = pageNumber - 1;

      if (pageIndex in this.pagePromises) {
        return this.pagePromises[pageIndex];
      }

      var promise = this.messageHandler.sendWithPromise("GetPage", {
        pageIndex: pageIndex
      }).then(function (pageInfo) {
        if (_this13.destroyed) {
          throw new Error("Transport destroyed");
        }

        var page = new PDFPageProxy(pageIndex, pageInfo, _this13, _this13._params.ownerDocument, _this13._params.pdfBug);
        _this13.pageCache[pageIndex] = page;
        return page;
      });
      this.pagePromises[pageIndex] = promise;
      return promise;
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this.messageHandler.sendWithPromise("GetPageIndex", {
        ref: ref
      })["catch"](function (reason) {
        return Promise.reject(new Error(reason));
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise("GetAnnotations", {
        pageIndex: pageIndex,
        intent: intent
      });
    }
  }, {
    key: "saveDocument",
    value: function saveDocument() {
      var _this$_fullReader$fil,
          _this$_fullReader,
          _this14 = this;

      return this.messageHandler.sendWithPromise("SaveDocument", {
        isPureXfa: !!this._htmlForXfa,
        numPages: this._numPages,
        annotationStorage: this.annotationStorage.serializable,
        filename: (_this$_fullReader$fil = (_this$_fullReader = this._fullReader) === null || _this$_fullReader === void 0 ? void 0 : _this$_fullReader.filename) !== null && _this$_fullReader$fil !== void 0 ? _this$_fullReader$fil : null
      })["finally"](function () {
        _this14.annotationStorage.resetModified();
      });
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this.messageHandler.sendWithPromise("GetFieldObjects", null);
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this.messageHandler.sendWithPromise("GetDestinations", null);
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      if (typeof id !== "string") {
        return Promise.reject(new Error("Invalid destination request."));
      }

      return this.messageHandler.sendWithPromise("GetDestination", {
        id: id
      });
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this.messageHandler.sendWithPromise("GetPageLabels", null);
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this.messageHandler.sendWithPromise("GetPageLayout", null);
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this.messageHandler.sendWithPromise("GetPageMode", null);
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this.messageHandler.sendWithPromise("GetOpenAction", null);
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this.messageHandler.sendWithPromise("GetAttachments", null);
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this.messageHandler.sendWithPromise("GetJavaScript", null);
    }
  }, {
    key: "getDocJSActions",
    value: function getDocJSActions() {
      return this.messageHandler.sendWithPromise("GetDocJSActions", null);
    }
  }, {
    key: "getPageJSActions",
    value: function getPageJSActions(pageIndex) {
      return this.messageHandler.sendWithPromise("GetPageJSActions", {
        pageIndex: pageIndex
      });
    }
  }, {
    key: "getStructTree",
    value: function getStructTree(pageIndex) {
      return this.messageHandler.sendWithPromise("GetStructTree", {
        pageIndex: pageIndex
      });
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this.messageHandler.sendWithPromise("GetOutline", null);
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(function (results) {
        return new _optional_content_config.OptionalContentConfig(results);
      });
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this.messageHandler.sendWithPromise("GetPermissions", null);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      var _this15 = this;

      return this.messageHandler.sendWithPromise("GetMetadata", null).then(function (results) {
        var _this15$_fullReader$f, _this15$_fullReader, _this15$_fullReader$c, _this15$_fullReader2;

        return {
          info: results[0],
          metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
          contentDispositionFilename: (_this15$_fullReader$f = (_this15$_fullReader = _this15._fullReader) === null || _this15$_fullReader === void 0 ? void 0 : _this15$_fullReader.filename) !== null && _this15$_fullReader$f !== void 0 ? _this15$_fullReader$f : null,
          contentLength: (_this15$_fullReader$c = (_this15$_fullReader2 = _this15._fullReader) === null || _this15$_fullReader2 === void 0 ? void 0 : _this15$_fullReader2.contentLength) !== null && _this15$_fullReader$c !== void 0 ? _this15$_fullReader$c : null
        };
      });
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this.messageHandler.sendWithPromise("GetMarkInfo", null);
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this.messageHandler.sendWithPromise("GetStats", null);
    }
  }, {
    key: "startCleanup",
    value: function () {
      var _startCleanup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var keepLoadedFonts,
            i,
            ii,
            page,
            cleanupSuccessful,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                keepLoadedFonts = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
                _context3.next = 3;
                return this.messageHandler.sendWithPromise("Cleanup", null);

              case 3:
                if (!this.destroyed) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                i = 0, ii = this.pageCache.length;

              case 6:
                if (!(i < ii)) {
                  _context3.next = 16;
                  break;
                }

                page = this.pageCache[i];

                if (page) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("continue", 13);

              case 10:
                cleanupSuccessful = page.cleanup();

                if (cleanupSuccessful) {
                  _context3.next = 13;
                  break;
                }

                throw new Error("startCleanup: Page ".concat(i + 1, " is currently rendering."));

              case 13:
                i++;
                _context3.next = 6;
                break;

              case 16:
                this.commonObjs.clear();

                if (!keepLoadedFonts) {
                  this.fontLoader.clear();
                }

                this._hasJSActionsPromise = null;

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startCleanup() {
        return _startCleanup.apply(this, arguments);
      }

      return startCleanup;
    }()
  }, {
    key: "loadingParams",
    get: function get() {
      var params = this._params;
      return (0, _util.shadow)(this, "loadingParams", {
        disableAutoFetch: params.disableAutoFetch
      });
    }
  }]);

  return WorkerTransport;
}();

var PDFObjects = /*#__PURE__*/function () {
  function PDFObjects() {
    _classCallCheck(this, PDFObjects);

    this._objs = Object.create(null);
  }

  _createClass(PDFObjects, [{
    key: "_ensureObj",
    value: function _ensureObj(objId) {
      if (this._objs[objId]) {
        return this._objs[objId];
      }

      return this._objs[objId] = {
        capability: (0, _util.createPromiseCapability)(),
        data: null,
        resolved: false
      };
    }
  }, {
    key: "get",
    value: function get(objId) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (callback) {
        this._ensureObj(objId).capability.promise.then(callback);

        return null;
      }

      var obj = this._objs[objId];

      if (!obj || !obj.resolved) {
        throw new Error("Requesting object that isn't resolved yet ".concat(objId, "."));
      }

      return obj.data;
    }
  }, {
    key: "has",
    value: function has(objId) {
      var obj = this._objs[objId];
      return (obj === null || obj === void 0 ? void 0 : obj.resolved) || false;
    }
  }, {
    key: "resolve",
    value: function resolve(objId, data) {
      var obj = this._ensureObj(objId);

      obj.resolved = true;
      obj.data = data;
      obj.capability.resolve(data);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._objs = Object.create(null);
    }
  }]);

  return PDFObjects;
}();

var RenderTask = /*#__PURE__*/function () {
  function RenderTask(internalRenderTask) {
    _classCallCheck(this, RenderTask);

    this._internalRenderTask = internalRenderTask;
    this.onContinue = null;
  }

  _createClass(RenderTask, [{
    key: "promise",
    get: function get() {
      return this._internalRenderTask.capability.promise;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._internalRenderTask.cancel();
    }
  }]);

  return RenderTask;
}();

var InternalRenderTask = function InternalRenderTaskClosure() {
  var canvasInRendering = new WeakSet();

  var InternalRenderTask = /*#__PURE__*/function () {
    function InternalRenderTask(_ref19) {
      var callback = _ref19.callback,
          params = _ref19.params,
          objs = _ref19.objs,
          commonObjs = _ref19.commonObjs,
          operatorList = _ref19.operatorList,
          pageIndex = _ref19.pageIndex,
          canvasFactory = _ref19.canvasFactory,
          _ref19$useRequestAnim = _ref19.useRequestAnimationFrame,
          useRequestAnimationFrame = _ref19$useRequestAnim === void 0 ? false : _ref19$useRequestAnim,
          _ref19$pdfBug = _ref19.pdfBug,
          pdfBug = _ref19$pdfBug === void 0 ? false : _ref19$pdfBug;

      _classCallCheck(this, InternalRenderTask);

      this.callback = callback;
      this.params = params;
      this.objs = objs;
      this.commonObjs = commonObjs;
      this.operatorListIdx = null;
      this.operatorList = operatorList;
      this._pageIndex = pageIndex;
      this.canvasFactory = canvasFactory;
      this._pdfBug = pdfBug;
      this.running = false;
      this.graphicsReadyCallback = null;
      this.graphicsReady = false;
      this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
      this.cancelled = false;
      this.capability = (0, _util.createPromiseCapability)();
      this.task = new RenderTask(this);
      this._cancelBound = this.cancel.bind(this);
      this._continueBound = this._continue.bind(this);
      this._scheduleNextBound = this._scheduleNext.bind(this);
      this._nextBound = this._next.bind(this);
      this._canvas = params.canvasContext.canvas;
    }

    _createClass(InternalRenderTask, [{
      key: "completed",
      get: function get() {
        return this.capability.promise["catch"](function () {});
      }
    }, {
      key: "initializeGraphics",
      value: function initializeGraphics(_ref20) {
        var _globalThis$StepperMa;

        var _ref20$transparency = _ref20.transparency,
            transparency = _ref20$transparency === void 0 ? false : _ref20$transparency,
            optionalContentConfig = _ref20.optionalContentConfig;

        if (this.cancelled) {
          return;
        }

        if (this._canvas) {
          if (canvasInRendering.has(this._canvas)) {
            throw new Error("Cannot use the same canvas during multiple render() operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed.");
          }

          canvasInRendering.add(this._canvas);
        }

        if (this._pdfBug && (_globalThis$StepperMa = globalThis.StepperManager) !== null && _globalThis$StepperMa !== void 0 && _globalThis$StepperMa.enabled) {
          this.stepper = globalThis.StepperManager.create(this._pageIndex);
          this.stepper.init(this.operatorList);
          this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
        }

        var _this$params = this.params,
            canvasContext = _this$params.canvasContext,
            viewport = _this$params.viewport,
            transform = _this$params.transform,
            imageLayer = _this$params.imageLayer,
            background = _this$params.background;
        this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, imageLayer, optionalContentConfig);
        this.gfx.beginDrawing({
          transform: transform,
          viewport: viewport,
          transparency: transparency,
          background: background
        });
        this.operatorListIdx = 0;
        this.graphicsReady = true;

        if (this.graphicsReadyCallback) {
          this.graphicsReadyCallback();
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.running = false;
        this.cancelled = true;

        if (this.gfx) {
          this.gfx.endDrawing();
        }

        if (this._canvas) {
          canvasInRendering["delete"](this._canvas);
        }

        this.callback(error || new _display_utils.RenderingCancelledException("Rendering cancelled, page ".concat(this._pageIndex + 1), "canvas"));
      }
    }, {
      key: "operatorListChanged",
      value: function operatorListChanged() {
        if (!this.graphicsReady) {
          if (!this.graphicsReadyCallback) {
            this.graphicsReadyCallback = this._continueBound;
          }

          return;
        }

        if (this.stepper) {
          this.stepper.updateOperatorList(this.operatorList);
        }

        if (this.running) {
          return;
        }

        this._continue();
      }
    }, {
      key: "_continue",
      value: function _continue() {
        this.running = true;

        if (this.cancelled) {
          return;
        }

        if (this.task.onContinue) {
          this.task.onContinue(this._scheduleNextBound);
        } else {
          this._scheduleNext();
        }
      }
    }, {
      key: "_scheduleNext",
      value: function _scheduleNext() {
        var _this16 = this;

        if (this._useRequestAnimationFrame) {
          window.requestAnimationFrame(function () {
            _this16._nextBound()["catch"](_this16._cancelBound);
          });
        } else {
          Promise.resolve().then(this._nextBound)["catch"](this._cancelBound);
        }
      }
    }, {
      key: "_next",
      value: function () {
        var _next2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!this.cancelled) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt("return");

                case 2:
                  this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);

                  if (this.operatorListIdx === this.operatorList.argsArray.length) {
                    this.running = false;

                    if (this.operatorList.lastChunk) {
                      this.gfx.endDrawing();

                      if (this._canvas) {
                        canvasInRendering["delete"](this._canvas);
                      }

                      this.callback();
                    }
                  }

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _next() {
          return _next2.apply(this, arguments);
        }

        return _next;
      }()
    }]);

    return InternalRenderTask;
  }();

  return InternalRenderTask;
}();

var version = '2.10.551';
exports.version = version;
var build = '9b304f746';
exports.build = build;

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FontLoader = exports.FontFaceObject = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseFontLoader = /*#__PURE__*/function () {
  function BaseFontLoader(_ref) {
    var docId = _ref.docId,
        onUnsupportedFeature = _ref.onUnsupportedFeature,
        _ref$ownerDocument = _ref.ownerDocument,
        ownerDocument = _ref$ownerDocument === void 0 ? globalThis.document : _ref$ownerDocument,
        _ref$styleElement = _ref.styleElement,
        styleElement = _ref$styleElement === void 0 ? null : _ref$styleElement;

    _classCallCheck(this, BaseFontLoader);

    if (this.constructor === BaseFontLoader) {
      (0, _util.unreachable)("Cannot initialize BaseFontLoader.");
    }

    this.docId = docId;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this._document = ownerDocument;
    this.nativeFontFaces = [];
    this.styleElement = null;
  }

  _createClass(BaseFontLoader, [{
    key: "addNativeFontFace",
    value: function addNativeFontFace(nativeFontFace) {
      this.nativeFontFaces.push(nativeFontFace);

      this._document.fonts.add(nativeFontFace);
    }
  }, {
    key: "insertRule",
    value: function insertRule(rule) {
      var styleElement = this.styleElement;

      if (!styleElement) {
        styleElement = this.styleElement = this._document.createElement("style");
        styleElement.id = "PDFJS_FONT_STYLE_TAG_".concat(this.docId);

        this._document.documentElement.getElementsByTagName("head")[0].appendChild(styleElement);
      }

      var styleSheet = styleElement.sheet;
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _iterator = _createForOfIteratorHelper(this.nativeFontFaces),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var nativeFontFace = _step.value;

          this._document.fonts["delete"](nativeFontFace);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.nativeFontFaces.length = 0;

      if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
      }
    }
  }, {
    key: "bind",
    value: function () {
      var _bind = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(font) {
        var _this = this;

        var nativeFontFace, rule;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(font.attached || font.missingFile)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                font.attached = true;

                if (!this.isFontLoadingAPISupported) {
                  _context.next = 19;
                  break;
                }

                nativeFontFace = font.createNativeFontFace();

                if (!nativeFontFace) {
                  _context.next = 18;
                  break;
                }

                this.addNativeFontFace(nativeFontFace);
                _context.prev = 7;
                _context.next = 10;
                return nativeFontFace.loaded;

              case 10:
                _context.next = 18;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](7);

                this._onUnsupportedFeature({
                  featureId: _util.UNSUPPORTED_FEATURES.errorFontLoadNative
                });

                (0, _util.warn)("Failed to load font '".concat(nativeFontFace.family, "': '").concat(_context.t0, "'."));
                font.disableFontFace = true;
                throw _context.t0;

              case 18:
                return _context.abrupt("return");

              case 19:
                rule = font.createFontFaceRule();

                if (!rule) {
                  _context.next = 26;
                  break;
                }

                this.insertRule(rule);

                if (!this.isSyncFontLoadingSupported) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return");

              case 24:
                _context.next = 26;
                return new Promise(function (resolve) {
                  var request = _this._queueLoadingCallback(resolve);

                  _this._prepareFontLoadEvent([rule], [font], request);
                });

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 12]]);
      }));

      function bind(_x) {
        return _bind.apply(this, arguments);
      }

      return bind;
    }()
  }, {
    key: "_queueLoadingCallback",
    value: function _queueLoadingCallback(callback) {
      (0, _util.unreachable)("Abstract method `_queueLoadingCallback`.");
    }
  }, {
    key: "isFontLoadingAPISupported",
    get: function get() {
      var _this$_document;

      var hasFonts = !!((_this$_document = this._document) !== null && _this$_document !== void 0 && _this$_document.fonts);
      return (0, _util.shadow)(this, "isFontLoadingAPISupported", hasFonts);
    }
  }, {
    key: "isSyncFontLoadingSupported",
    get: function get() {
      (0, _util.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
    }
  }, {
    key: "_loadTestFont",
    get: function get() {
      (0, _util.unreachable)("Abstract method `_loadTestFont`.");
    }
  }, {
    key: "_prepareFontLoadEvent",
    value: function _prepareFontLoadEvent(rules, fontsToLoad, request) {
      (0, _util.unreachable)("Abstract method `_prepareFontLoadEvent`.");
    }
  }]);

  return BaseFontLoader;
}();

var FontLoader;
exports.FontLoader = FontLoader;
{
  exports.FontLoader = FontLoader = /*#__PURE__*/function (_BaseFontLoader) {
    _inherits(GenericFontLoader, _BaseFontLoader);

    var _super = _createSuper(GenericFontLoader);

    function GenericFontLoader(params) {
      var _this2;

      _classCallCheck(this, GenericFontLoader);

      _this2 = _super.call(this, params);
      _this2.loadingContext = {
        requests: [],
        nextRequestId: 0
      };
      _this2.loadTestFontId = 0;
      return _this2;
    }

    _createClass(GenericFontLoader, [{
      key: "isSyncFontLoadingSupported",
      get: function get() {
        var supported = false;

        if (typeof navigator === "undefined") {
          supported = true;
        } else {
          var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

          if ((m === null || m === void 0 ? void 0 : m[1]) >= 14) {
            supported = true;
          }
        }

        return (0, _util.shadow)(this, "isSyncFontLoadingSupported", supported);
      }
    }, {
      key: "_queueLoadingCallback",
      value: function _queueLoadingCallback(callback) {
        function completeRequest() {
          (0, _util.assert)(!request.done, "completeRequest() cannot be called twice.");
          request.done = true;

          while (context.requests.length > 0 && context.requests[0].done) {
            var otherRequest = context.requests.shift();
            setTimeout(otherRequest.callback, 0);
          }
        }

        var context = this.loadingContext;
        var request = {
          id: "pdfjs-font-loading-".concat(context.nextRequestId++),
          done: false,
          complete: completeRequest,
          callback: callback
        };
        context.requests.push(request);
        return request;
      }
    }, {
      key: "_loadTestFont",
      get: function get() {
        var getLoadTestFont = function getLoadTestFont() {
          return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA" + "FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA" + "ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA" + "AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1" + "AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD" + "6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM" + "AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D" + "IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA" + "AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA" + "AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB" + "AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY" + "AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA" + "AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA" + "AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC" + "AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3" + "Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj" + "FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
        };

        return (0, _util.shadow)(this, "_loadTestFont", getLoadTestFont());
      }
    }, {
      key: "_prepareFontLoadEvent",
      value: function _prepareFontLoadEvent(rules, fonts, request) {
        var _this3 = this;

        function int32(data, offset) {
          return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
        }

        function spliceString(s, offset, remove, insert) {
          var chunk1 = s.substring(0, offset);
          var chunk2 = s.substring(offset + remove);
          return chunk1 + insert + chunk2;
        }

        var i, ii;

        var canvas = this._document.createElement("canvas");

        canvas.width = 1;
        canvas.height = 1;
        var ctx = canvas.getContext("2d");
        var called = 0;

        function isFontReady(name, callback) {
          called++;

          if (called > 30) {
            (0, _util.warn)("Load test font never loaded.");
            callback();
            return;
          }

          ctx.font = "30px " + name;
          ctx.fillText(".", 0, 20);
          var imageData = ctx.getImageData(0, 0, 1, 1);

          if (imageData.data[3] > 0) {
            callback();
            return;
          }

          setTimeout(isFontReady.bind(null, name, callback));
        }

        var loadTestFontId = "lt".concat(Date.now()).concat(this.loadTestFontId++);
        var data = this._loadTestFont;
        var COMMENT_OFFSET = 976;
        data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
        var CFF_CHECKSUM_OFFSET = 16;
        var XXXX_VALUE = 0x58585858;
        var checksum = int32(data, CFF_CHECKSUM_OFFSET);

        for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
        }

        if (i < loadTestFontId.length) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i) | 0;
        }

        data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util.string32)(checksum));
        var url = "url(data:font/opentype;base64,".concat(btoa(data), ");");
        var rule = "@font-face {font-family:\"".concat(loadTestFontId, "\";src:").concat(url, "}");
        this.insertRule(rule);
        var names = [];

        var _iterator2 = _createForOfIteratorHelper(fonts),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var font = _step2.value;
            names.push(font.loadedName);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        names.push(loadTestFontId);

        var div = this._document.createElement("div");

        div.style.visibility = "hidden";
        div.style.width = div.style.height = "10px";
        div.style.position = "absolute";
        div.style.top = div.style.left = "0px";

        for (var _i = 0, _names = names; _i < _names.length; _i++) {
          var name = _names[_i];

          var span = this._document.createElement("span");

          span.textContent = "Hi";
          span.style.fontFamily = name;
          div.appendChild(span);
        }

        this._document.body.appendChild(div);

        isFontReady(loadTestFontId, function () {
          _this3._document.body.removeChild(div);

          request.complete();
        });
      }
    }]);

    return GenericFontLoader;
  }(BaseFontLoader);
}

var FontFaceObject = /*#__PURE__*/function () {
  function FontFaceObject(translatedData, _ref2) {
    var _ref2$isEvalSupported = _ref2.isEvalSupported,
        isEvalSupported = _ref2$isEvalSupported === void 0 ? true : _ref2$isEvalSupported,
        _ref2$disableFontFace = _ref2.disableFontFace,
        disableFontFace = _ref2$disableFontFace === void 0 ? false : _ref2$disableFontFace,
        _ref2$ignoreErrors = _ref2.ignoreErrors,
        ignoreErrors = _ref2$ignoreErrors === void 0 ? false : _ref2$ignoreErrors,
        onUnsupportedFeature = _ref2.onUnsupportedFeature,
        _ref2$fontRegistry = _ref2.fontRegistry,
        fontRegistry = _ref2$fontRegistry === void 0 ? null : _ref2$fontRegistry;

    _classCallCheck(this, FontFaceObject);

    this.compiledGlyphs = Object.create(null);

    for (var i in translatedData) {
      this[i] = translatedData[i];
    }

    this.isEvalSupported = isEvalSupported !== false;
    this.disableFontFace = disableFontFace === true;
    this.ignoreErrors = ignoreErrors === true;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this.fontRegistry = fontRegistry;
  }

  _createClass(FontFaceObject, [{
    key: "createNativeFontFace",
    value: function createNativeFontFace() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      var nativeFontFace;

      if (!this.cssFontInfo) {
        nativeFontFace = new FontFace(this.loadedName, this.data, {});
      } else {
        var css = {
          weight: this.cssFontInfo.fontWeight
        };

        if (this.cssFontInfo.italicAngle) {
          css.style = "oblique ".concat(this.cssFontInfo.italicAngle, "deg");
        }

        nativeFontFace = new FontFace(this.cssFontInfo.fontFamily, this.data, css);
      }

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this);
      }

      return nativeFontFace;
    }
  }, {
    key: "createFontFaceRule",
    value: function createFontFaceRule() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      var data = (0, _util.bytesToString)(this.data);
      var url = "url(data:".concat(this.mimetype, ";base64,").concat(btoa(data), ");");
      var rule;

      if (!this.cssFontInfo) {
        rule = "@font-face {font-family:\"".concat(this.loadedName, "\";src:").concat(url, "}");
      } else {
        var css = "font-weight: ".concat(this.cssFontInfo.fontWeight, ";");

        if (this.cssFontInfo.italicAngle) {
          css += "font-style: oblique ".concat(this.cssFontInfo.italicAngle, "deg;");
        }

        rule = "@font-face {font-family:\"".concat(this.cssFontInfo.fontFamily, "\";").concat(css, "src:").concat(url, "}");
      }

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this, url);
      }

      return rule;
    }
  }, {
    key: "getPathGenerator",
    value: function getPathGenerator(objs, character) {
      if (this.compiledGlyphs[character] !== undefined) {
        return this.compiledGlyphs[character];
      }

      var cmds;

      try {
        cmds = objs.get(this.loadedName + "_path_" + character);
      } catch (ex) {
        if (!this.ignoreErrors) {
          throw ex;
        }

        this._onUnsupportedFeature({
          featureId: _util.UNSUPPORTED_FEATURES.errorFontGetPath
        });

        (0, _util.warn)("getPathGenerator - ignoring character: \"".concat(ex, "\"."));
        return this.compiledGlyphs[character] = function (c, size) {};
      }

      if (this.isEvalSupported && _util.IsEvalSupportedCached.value) {
        var jsBuf = [];

        var _iterator3 = _createForOfIteratorHelper(cmds),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var current = _step3.value;
            var args = current.args !== undefined ? current.args.join(",") : "";
            jsBuf.push("c.", current.cmd, "(", args, ");\n");
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return this.compiledGlyphs[character] = new Function("c", "size", jsBuf.join(""));
      }

      return this.compiledGlyphs[character] = function (c, size) {
        var _iterator4 = _createForOfIteratorHelper(cmds),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _current = _step4.value;

            if (_current.cmd === "scale") {
              _current.args = [size, -size];
            }

            c[_current.cmd].apply(c, _current.args);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      };
    }
  }]);

  return FontFaceObject;
}();

exports.FontFaceObject = FontFaceObject;

/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NodeStandardFontDataFactory = exports.NodeCMapReaderFactory = exports.NodeCanvasFactory = void 0;

var _base_factory = __w_pdfjs_require__(116);

var _is_node = __w_pdfjs_require__(120);

var _util = __w_pdfjs_require__(4);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeCanvasFactory = function NodeCanvasFactory() {
  _classCallCheck(this, NodeCanvasFactory);

  (0, _util.unreachable)("Not implemented: NodeCanvasFactory");
};

exports.NodeCanvasFactory = NodeCanvasFactory;

var NodeCMapReaderFactory = function NodeCMapReaderFactory() {
  _classCallCheck(this, NodeCMapReaderFactory);

  (0, _util.unreachable)("Not implemented: NodeCMapReaderFactory");
};

exports.NodeCMapReaderFactory = NodeCMapReaderFactory;

var NodeStandardFontDataFactory = function NodeStandardFontDataFactory() {
  _classCallCheck(this, NodeStandardFontDataFactory);

  (0, _util.unreachable)("Not implemented: NodeStandardFontDataFactory");
};

exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory;

if (_is_node.isNodeJS) {
  var fetchData = function fetchData(url) {
    return new Promise(function (resolve, reject) {
      var fs = require("fs");

      fs.readFile(url, function (error, data) {
        if (error || !data) {
          reject(new Error(error));
          return;
        }

        resolve(new Uint8Array(data));
      });
    });
  };

  exports.NodeCanvasFactory = NodeCanvasFactory = /*#__PURE__*/function (_BaseCanvasFactory) {
    _inherits(NodeCanvasFactory, _BaseCanvasFactory);

    var _super = _createSuper(NodeCanvasFactory);

    function NodeCanvasFactory() {
      _classCallCheck(this, NodeCanvasFactory);

      return _super.apply(this, arguments);
    }

    _createClass(NodeCanvasFactory, [{
      key: "_createCanvas",
      value: function _createCanvas(width, height) {
        var Canvas = require("canvas");

        return Canvas.createCanvas(width, height);
      }
    }]);

    return NodeCanvasFactory;
  }(_base_factory.BaseCanvasFactory);

  exports.NodeCMapReaderFactory = NodeCMapReaderFactory = /*#__PURE__*/function (_BaseCMapReaderFactor) {
    _inherits(NodeCMapReaderFactory, _BaseCMapReaderFactor);

    var _super2 = _createSuper(NodeCMapReaderFactory);

    function NodeCMapReaderFactory() {
      _classCallCheck(this, NodeCMapReaderFactory);

      return _super2.apply(this, arguments);
    }

    _createClass(NodeCMapReaderFactory, [{
      key: "_fetchData",
      value: function _fetchData(url, compressionType) {
        return fetchData(url).then(function (data) {
          return {
            cMapData: data,
            compressionType: compressionType
          };
        });
      }
    }]);

    return NodeCMapReaderFactory;
  }(_base_factory.BaseCMapReaderFactory);

  exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory = /*#__PURE__*/function (_BaseStandardFontData) {
    _inherits(NodeStandardFontDataFactory, _BaseStandardFontData);

    var _super3 = _createSuper(NodeStandardFontDataFactory);

    function NodeStandardFontDataFactory() {
      _classCallCheck(this, NodeStandardFontDataFactory);

      return _super3.apply(this, arguments);
    }

    _createClass(NodeStandardFontDataFactory, [{
      key: "_fetchData",
      value: function _fetchData(url) {
        return fetchData(url);
      }
    }]);

    return NodeStandardFontDataFactory;
  }(_base_factory.BaseStandardFontDataFactory);
}

/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isNodeJS = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNodeJS = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
exports.isNodeJS = isNodeJS;

/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnnotationStorage = void 0;

var _util = __w_pdfjs_require__(4);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationStorage = /*#__PURE__*/function () {
  function AnnotationStorage() {
    _classCallCheck(this, AnnotationStorage);

    this._storage = new Map();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  _createClass(AnnotationStorage, [{
    key: "getValue",
    value: function getValue(key, fieldname, defaultValue) {
      var radioButtonField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var obj = this._storage.get(key);

      if (obj === undefined) {
        if (window.getFormValue) {
          window.assignFormIdAndFieldName(key, fieldname, radioButtonField);
          var ngObj = window.getFormValue(fieldname);

          if (ngObj !== undefined && ngObj.value !== undefined) {
            if (radioButtonField) {
              var value = {
                value: ngObj.value === radioButtonField
              };
              obj = value;
            } else {
              obj = ngObj;
            }

            this.setValue(key, undefined, obj);
          }

          if (obj === undefined && defaultValue !== undefined && defaultValue.value !== undefined && defaultValue.value !== "") {
            if (radioButtonField) {
              if (defaultValue.value) {
                window.setFormValue(fieldname, radioButtonField);
              }
            } else {
              window.setFormValue(fieldname, defaultValue.value);
            }
          }
        }
      }

      return obj !== undefined ? obj : defaultValue;
    }
  }, {
    key: "setValue",
    value: function setValue(key, fieldname, value) {
      var radioButtonField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var obj = this._storage.get(key);

      var modified = false;

      if (obj !== undefined) {
        for (var _i = 0, _Object$entries = Object.entries(value); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              entry = _Object$entries$_i[0],
              val = _Object$entries$_i[1];

          if (entry !== "radioValue" && entry !== "emitMessage" && obj[entry] !== val) {
            modified = true;
            obj[entry] = val;
          }
        }
      } else {
        this._storage.set(key, value);

        modified = true;
      }

      if (modified) {
        this._setModified();

        if (fieldname || radioButtonField) {
          if (window.setFormValue) {
            if (value.items) {
              window.setFormValue(fieldname, value.items);
            } else if (value.emitMessage === false) {} else if (value.radioValue) {
              window.setFormValue(fieldname, value.radioValue);
            } else {
              for (var _i2 = 0, _Object$values = Object.values(value); _i2 < _Object$values.length; _i2++) {
                var _val = _Object$values[_i2];
                window.setFormValue(fieldname, _val);
              }
            }
          }
        }
      }
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._storage.size > 0 ? (0, _util.objectFromMap)(this._storage) : null;
    }
  }, {
    key: "size",
    get: function get() {
      return this._storage.size;
    }
  }, {
    key: "_setModified",
    value: function _setModified() {
      if (!this._modified) {
        this._modified = true;

        if (typeof this.onSetModified === "function") {
          this.onSetModified();
        }
      }
    }
  }, {
    key: "resetModified",
    value: function resetModified() {
      if (this._modified) {
        this._modified = false;

        if (typeof this.onResetModified === "function") {
          this.onResetModified();
        }
      }
    }
  }, {
    key: "serializable",
    get: function get() {
      return this._storage.size > 0 ? this._storage : null;
    }
  }]);

  return AnnotationStorage;
}();

exports.AnnotationStorage = AnnotationStorage;

/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CanvasGraphics = void 0;

var _util = __w_pdfjs_require__(4);

var _pattern_helper = __w_pdfjs_require__(123);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MIN_FONT_SIZE = 16;
var MAX_FONT_SIZE = 100;
var MAX_GROUP_SIZE = 4096;
var COMPILE_TYPE3_GLYPHS = true;
var MAX_SIZE_TO_COMPILE = 1000;
var FULL_CHUNK_HEIGHT = 16;
var LINEWIDTH_SCALE_FACTOR = 1.000001;

function addContextCurrentTransform(ctx) {
  if (ctx.mozCurrentTransform) {
    return;
  }

  ctx._originalSave = ctx.save;
  ctx._originalRestore = ctx.restore;
  ctx._originalRotate = ctx.rotate;
  ctx._originalScale = ctx.scale;
  ctx._originalTranslate = ctx.translate;
  ctx._originalTransform = ctx.transform;
  ctx._originalSetTransform = ctx.setTransform;
  ctx._originalResetTransform = ctx.resetTransform;
  ctx._transformMatrix = ctx._transformMatrix || [1, 0, 0, 1, 0, 0];
  ctx._transformStack = [];

  try {
    var desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx), "lineWidth");
    ctx._setLineWidth = desc.set;
    ctx._getLineWidth = desc.get;
    Object.defineProperty(ctx, "lineWidth", {
      set: function setLineWidth(width) {
        this._setLineWidth(width * LINEWIDTH_SCALE_FACTOR);
      },
      get: function getLineWidth() {
        return this._getLineWidth();
      }
    });
  } catch (_) {}

  Object.defineProperty(ctx, "mozCurrentTransform", {
    get: function getCurrentTransform() {
      return this._transformMatrix;
    }
  });
  Object.defineProperty(ctx, "mozCurrentTransformInverse", {
    get: function getCurrentTransformInverse() {
      var _this$_transformMatri = _slicedToArray(this._transformMatrix, 6),
          a = _this$_transformMatri[0],
          b = _this$_transformMatri[1],
          c = _this$_transformMatri[2],
          d = _this$_transformMatri[3],
          e = _this$_transformMatri[4],
          f = _this$_transformMatri[5];

      var ad_bc = a * d - b * c;
      var bc_ad = b * c - a * d;
      return [d / ad_bc, b / bc_ad, c / bc_ad, a / ad_bc, (d * e - c * f) / bc_ad, (b * e - a * f) / ad_bc];
    }
  });

  ctx.save = function ctxSave() {
    var old = this._transformMatrix;

    this._transformStack.push(old);

    this._transformMatrix = old.slice(0, 6);

    this._originalSave();
  };

  ctx.restore = function ctxRestore() {
    var prev = this._transformStack.pop();

    if (prev) {
      this._transformMatrix = prev;

      this._originalRestore();
    }
  };

  ctx.translate = function ctxTranslate(x, y) {
    var m = this._transformMatrix;
    m[4] = m[0] * x + m[2] * y + m[4];
    m[5] = m[1] * x + m[3] * y + m[5];

    this._originalTranslate(x, y);
  };

  ctx.scale = function ctxScale(x, y) {
    var m = this._transformMatrix;
    m[0] *= x;
    m[1] *= x;
    m[2] *= y;
    m[3] *= y;

    this._originalScale(x, y);
  };

  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
    var m = this._transformMatrix;
    this._transformMatrix = [m[0] * a + m[2] * b, m[1] * a + m[3] * b, m[0] * c + m[2] * d, m[1] * c + m[3] * d, m[0] * e + m[2] * f + m[4], m[1] * e + m[3] * f + m[5]];

    ctx._originalTransform(a, b, c, d, e, f);
  };

  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
    this._transformMatrix = [a, b, c, d, e, f];

    ctx._originalSetTransform(a, b, c, d, e, f);
  };

  ctx.resetTransform = function ctxResetTransform() {
    this._transformMatrix = [1, 0, 0, 1, 0, 0];

    ctx._originalResetTransform();
  };

  ctx.rotate = function ctxRotate(angle) {
    var cosValue = Math.cos(angle);
    var sinValue = Math.sin(angle);
    var m = this._transformMatrix;
    this._transformMatrix = [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];

    this._originalRotate(angle);
  };
}

var CachedCanvases = /*#__PURE__*/function () {
  function CachedCanvases(canvasFactory) {
    _classCallCheck(this, CachedCanvases);

    this.canvasFactory = canvasFactory;
    this.cache = Object.create(null);
  }

  _createClass(CachedCanvases, [{
    key: "getCanvas",
    value: function getCanvas(id, width, height, trackTransform) {
      var canvasEntry;

      if (this.cache[id] !== undefined) {
        canvasEntry = this.cache[id];
        this.canvasFactory.reset(canvasEntry, width, height);
        canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        canvasEntry = this.canvasFactory.create(width, height);
        this.cache[id] = canvasEntry;
      }

      if (trackTransform) {
        addContextCurrentTransform(canvasEntry.context);
      }

      return canvasEntry;
    }
  }, {
    key: "clear",
    value: function clear() {
      for (var id in this.cache) {
        var canvasEntry = this.cache[id];
        this.canvasFactory.destroy(canvasEntry);
        delete this.cache[id];
      }
    }
  }]);

  return CachedCanvases;
}();

function compileType3Glyph(imgData) {
  var POINT_TO_PROCESS_LIMIT = 1000;
  var POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
  var width = imgData.width,
      height = imgData.height,
      width1 = width + 1;
  var i, ii, j, j0;
  var points = new Uint8Array(width1 * (height + 1));
  var lineSize = width + 7 & ~7,
      data0 = imgData.data;
  var data = new Uint8Array(lineSize * height);
  var pos = 0;

  for (i = 0, ii = data0.length; i < ii; i++) {
    var elem = data0[i];
    var mask = 128;

    while (mask > 0) {
      data[pos++] = elem & mask ? 0 : 255;
      mask >>= 1;
    }
  }

  var count = 0;
  pos = 0;

  if (data[pos] !== 0) {
    points[0] = 1;
    ++count;
  }

  for (j = 1; j < width; j++) {
    if (data[pos] !== data[pos + 1]) {
      points[j] = data[pos] ? 2 : 1;
      ++count;
    }

    pos++;
  }

  if (data[pos] !== 0) {
    points[j] = 2;
    ++count;
  }

  for (i = 1; i < height; i++) {
    pos = i * lineSize;
    j0 = i * width1;

    if (data[pos - lineSize] !== data[pos]) {
      points[j0] = data[pos] ? 1 : 8;
      ++count;
    }

    var sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);

    for (j = 1; j < width; j++) {
      sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);

      if (POINT_TYPES[sum]) {
        points[j0 + j] = POINT_TYPES[sum];
        ++count;
      }

      pos++;
    }

    if (data[pos - lineSize] !== data[pos]) {
      points[j0 + j] = data[pos] ? 2 : 4;
      ++count;
    }

    if (count > POINT_TO_PROCESS_LIMIT) {
      return null;
    }
  }

  pos = lineSize * (height - 1);
  j0 = i * width1;

  if (data[pos] !== 0) {
    points[j0] = 8;
    ++count;
  }

  for (j = 1; j < width; j++) {
    if (data[pos] !== data[pos + 1]) {
      points[j0 + j] = data[pos] ? 4 : 8;
      ++count;
    }

    pos++;
  }

  if (data[pos] !== 0) {
    points[j0 + j] = 4;
    ++count;
  }

  if (count > POINT_TO_PROCESS_LIMIT) {
    return null;
  }

  var steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
  var outlines = [];

  for (i = 0; count && i <= height; i++) {
    var p = i * width1;
    var end = p + width;

    while (p < end && !points[p]) {
      p++;
    }

    if (p === end) {
      continue;
    }

    var coords = [p % width1, i];
    var p0 = p;
    var type = points[p];

    do {
      var step = steps[type];

      do {
        p += step;
      } while (!points[p]);

      var pp = points[p];

      if (pp !== 5 && pp !== 10) {
        type = pp;
        points[p] = 0;
      } else {
        type = pp & 0x33 * type >> 4;
        points[p] &= type >> 2 | type << 2;
      }

      coords.push(p % width1, p / width1 | 0);

      if (!points[p]) {
        --count;
      }
    } while (p0 !== p);

    outlines.push(coords);
    --i;
  }

  var drawOutline = function drawOutline(c) {
    c.save();
    c.scale(1 / width, -1 / height);
    c.translate(0, -height);
    c.beginPath();

    for (var k = 0, kk = outlines.length; k < kk; k++) {
      var o = outlines[k];
      c.moveTo(o[0], o[1]);

      for (var l = 2, ll = o.length; l < ll; l += 2) {
        c.lineTo(o[l], o[l + 1]);
      }
    }

    c.fill();
    c.beginPath();
    c.restore();
  };

  return drawOutline;
}

var CanvasExtraState = /*#__PURE__*/function () {
  function CanvasExtraState() {
    _classCallCheck(this, CanvasExtraState);

    this.alphaIsShape = false;
    this.fontSize = 0;
    this.fontSizeScale = 1;
    this.textMatrix = _util.IDENTITY_MATRIX;
    this.textMatrixScale = 1;
    this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
    this.leading = 0;
    this.x = 0;
    this.y = 0;
    this.lineX = 0;
    this.lineY = 0;
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.textHScale = 1;
    this.textRenderingMode = _util.TextRenderingMode.FILL;
    this.textRise = 0;
    this.fillColor = "#000000";
    this.strokeColor = "#000000";
    this.patternFill = false;
    this.fillAlpha = 1;
    this.strokeAlpha = 1;
    this.lineWidth = 1;
    this.activeSMask = null;
    this.resumeSMaskCtx = null;
    this.transferMaps = null;
  }

  _createClass(CanvasExtraState, [{
    key: "clone",
    value: function clone() {
      return Object.create(this);
    }
  }, {
    key: "setCurrentPoint",
    value: function setCurrentPoint(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);

  return CanvasExtraState;
}();

var CanvasGraphics = function CanvasGraphicsClosure() {
  var EXECUTION_TIME = 15;
  var EXECUTION_STEPS = 10;

  function putBinaryImageData(ctx, imgData) {
    var transferMaps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
      ctx.putImageData(imgData, 0, 0);
      return;
    }

    var height = imgData.height,
        width = imgData.width;
    var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
    var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
    var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
    var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
    var srcPos = 0,
        destPos;
    var src = imgData.data;
    var dest = chunkImgData.data;
    var i, j, thisChunkHeight, elemsInThisChunk;
    var transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;

    if (transferMaps) {
      switch (transferMaps.length) {
        case 1:
          transferMapRed = transferMaps[0];
          transferMapGreen = transferMaps[0];
          transferMapBlue = transferMaps[0];
          transferMapGray = transferMaps[0];
          break;

        case 4:
          transferMapRed = transferMaps[0];
          transferMapGreen = transferMaps[1];
          transferMapBlue = transferMaps[2];
          transferMapGray = transferMaps[3];
          break;
      }
    }

    if (imgData.kind === _util.ImageKind.GRAYSCALE_1BPP) {
      var srcLength = src.byteLength;
      var dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
      var dest32DataLength = dest32.length;
      var fullSrcDiff = width + 7 >> 3;
      var white = 0xffffffff;
      var black = _util.IsLittleEndianCached.value ? 0xff000000 : 0x000000ff;

      if (transferMapGray) {
        if (transferMapGray[0] === 0xff && transferMapGray[0xff] === 0) {
          var _ref = [black, white];
          white = _ref[0];
          black = _ref[1];
        }
      }

      for (i = 0; i < totalChunks; i++) {
        thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
        destPos = 0;

        for (j = 0; j < thisChunkHeight; j++) {
          var srcDiff = srcLength - srcPos;
          var k = 0;
          var kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
          var kEndUnrolled = kEnd & ~7;
          var mask = 0;
          var srcByte = 0;

          for (; k < kEndUnrolled; k += 8) {
            srcByte = src[srcPos++];
            dest32[destPos++] = srcByte & 128 ? white : black;
            dest32[destPos++] = srcByte & 64 ? white : black;
            dest32[destPos++] = srcByte & 32 ? white : black;
            dest32[destPos++] = srcByte & 16 ? white : black;
            dest32[destPos++] = srcByte & 8 ? white : black;
            dest32[destPos++] = srcByte & 4 ? white : black;
            dest32[destPos++] = srcByte & 2 ? white : black;
            dest32[destPos++] = srcByte & 1 ? white : black;
          }

          for (; k < kEnd; k++) {
            if (mask === 0) {
              srcByte = src[srcPos++];
              mask = 128;
            }

            dest32[destPos++] = srcByte & mask ? white : black;
            mask >>= 1;
          }
        }

        while (destPos < dest32DataLength) {
          dest32[destPos++] = 0;
        }

        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
      }
    } else if (imgData.kind === _util.ImageKind.RGBA_32BPP) {
      var hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
      j = 0;
      elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

      for (i = 0; i < fullChunks; i++) {
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
        srcPos += elemsInThisChunk;

        if (hasTransferMaps) {
          for (var _k = 0; _k < elemsInThisChunk; _k += 4) {
            if (transferMapRed) {
              dest[_k + 0] = transferMapRed[dest[_k + 0]];
            }

            if (transferMapGreen) {
              dest[_k + 1] = transferMapGreen[dest[_k + 1]];
            }

            if (transferMapBlue) {
              dest[_k + 2] = transferMapBlue[dest[_k + 2]];
            }
          }
        }

        ctx.putImageData(chunkImgData, 0, j);
        j += FULL_CHUNK_HEIGHT;
      }

      if (i < totalChunks) {
        elemsInThisChunk = width * partialChunkHeight * 4;
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));

        if (hasTransferMaps) {
          for (var _k2 = 0; _k2 < elemsInThisChunk; _k2 += 4) {
            if (transferMapRed) {
              dest[_k2 + 0] = transferMapRed[dest[_k2 + 0]];
            }

            if (transferMapGreen) {
              dest[_k2 + 1] = transferMapGreen[dest[_k2 + 1]];
            }

            if (transferMapBlue) {
              dest[_k2 + 2] = transferMapBlue[dest[_k2 + 2]];
            }
          }
        }

        ctx.putImageData(chunkImgData, 0, j);
      }
    } else if (imgData.kind === _util.ImageKind.RGB_24BPP) {
      var _hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);

      thisChunkHeight = FULL_CHUNK_HEIGHT;
      elemsInThisChunk = width * thisChunkHeight;

      for (i = 0; i < totalChunks; i++) {
        if (i >= fullChunks) {
          thisChunkHeight = partialChunkHeight;
          elemsInThisChunk = width * thisChunkHeight;
        }

        destPos = 0;

        for (j = elemsInThisChunk; j--;) {
          dest[destPos++] = src[srcPos++];
          dest[destPos++] = src[srcPos++];
          dest[destPos++] = src[srcPos++];
          dest[destPos++] = 255;
        }

        if (_hasTransferMaps) {
          for (var _k3 = 0; _k3 < destPos; _k3 += 4) {
            if (transferMapRed) {
              dest[_k3 + 0] = transferMapRed[dest[_k3 + 0]];
            }

            if (transferMapGreen) {
              dest[_k3 + 1] = transferMapGreen[dest[_k3 + 1]];
            }

            if (transferMapBlue) {
              dest[_k3 + 2] = transferMapBlue[dest[_k3 + 2]];
            }
          }
        }

        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
      }
    } else {
      throw new Error("bad image kind: ".concat(imgData.kind));
    }
  }

  function putBinaryImageMask(ctx, imgData) {
    var height = imgData.height,
        width = imgData.width;
    var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
    var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
    var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
    var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
    var srcPos = 0;
    var src = imgData.data;
    var dest = chunkImgData.data;

    for (var i = 0; i < totalChunks; i++) {
      var thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      var destPos = 3;

      for (var j = 0; j < thisChunkHeight; j++) {
        var elem = void 0,
            mask = 0;

        for (var k = 0; k < width; k++) {
          if (!mask) {
            elem = src[srcPos++];
            mask = 128;
          }

          dest[destPos] = elem & mask ? 0 : 255;
          destPos += 4;
          mask >>= 1;
        }
      }

      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
    }
  }

  function copyCtxState(sourceCtx, destCtx) {
    var properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];

    for (var i = 0, ii = properties.length; i < ii; i++) {
      var property = properties[i];

      if (sourceCtx[property] !== undefined) {
        destCtx[property] = sourceCtx[property];
      }
    }

    if (sourceCtx.setLineDash !== undefined) {
      destCtx.setLineDash(sourceCtx.getLineDash());
      destCtx.lineDashOffset = sourceCtx.lineDashOffset;
    }
  }

  function resetCtxToDefault(ctx) {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.fillRule = "nonzero";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 10;
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "10px sans-serif";

    if (ctx.setLineDash !== undefined) {
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
    }
  }

  function composeSMaskBackdrop(bytes, r0, g0, b0) {
    var length = bytes.length;

    for (var i = 3; i < length; i += 4) {
      var alpha = bytes[i];

      if (alpha === 0) {
        bytes[i - 3] = r0;
        bytes[i - 2] = g0;
        bytes[i - 1] = b0;
      } else if (alpha < 255) {
        var alpha_ = 255 - alpha;
        bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
        bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
        bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
      }
    }
  }

  function composeSMaskAlpha(maskData, layerData, transferMap) {
    var length = maskData.length;
    var scale = 1 / 255;

    for (var i = 3; i < length; i += 4) {
      var alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
      layerData[i] = layerData[i] * alpha * scale | 0;
    }
  }

  function composeSMaskLuminosity(maskData, layerData, transferMap) {
    var length = maskData.length;

    for (var i = 3; i < length; i += 4) {
      var y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
      layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
    }
  }

  function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap) {
    var hasBackdrop = !!backdrop;
    var r0 = hasBackdrop ? backdrop[0] : 0;
    var g0 = hasBackdrop ? backdrop[1] : 0;
    var b0 = hasBackdrop ? backdrop[2] : 0;
    var composeFn;

    if (subtype === "Luminosity") {
      composeFn = composeSMaskLuminosity;
    } else {
      composeFn = composeSMaskAlpha;
    }

    var PIXELS_TO_PROCESS = 1048576;
    var chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));

    for (var row = 0; row < height; row += chunkSize) {
      var chunkHeight = Math.min(chunkSize, height - row);
      var maskData = maskCtx.getImageData(0, row, width, chunkHeight);
      var layerData = layerCtx.getImageData(0, row, width, chunkHeight);

      if (hasBackdrop) {
        composeSMaskBackdrop(maskData.data, r0, g0, b0);
      }

      composeFn(maskData.data, layerData.data, transferMap);
      maskCtx.putImageData(layerData, 0, row);
    }
  }

  function composeSMask(ctx, smask, layerCtx) {
    var mask = smask.canvas;
    var maskCtx = smask.context;
    ctx.setTransform(smask.scaleX, 0, 0, smask.scaleY, smask.offsetX, smask.offsetY);
    genericComposeSMask(maskCtx, layerCtx, mask.width, mask.height, smask.subtype, smask.backdrop, smask.transferMap);
    ctx.drawImage(mask, 0, 0);
  }

  var LINE_CAP_STYLES = ["butt", "round", "square"];
  var LINE_JOIN_STYLES = ["miter", "round", "bevel"];
  var NORMAL_CLIP = {};
  var EO_CLIP = {};

  var CanvasGraphics = /*#__PURE__*/function () {
    function CanvasGraphics(canvasCtx, commonObjs, objs, canvasFactory, imageLayer, optionalContentConfig) {
      _classCallCheck(this, CanvasGraphics);

      this.ctx = canvasCtx;
      this.current = new CanvasExtraState();
      this.stateStack = [];
      this.pendingClip = null;
      this.pendingEOFill = false;
      this.res = null;
      this.xobjs = null;
      this.commonObjs = commonObjs;
      this.objs = objs;
      this.canvasFactory = canvasFactory;
      this.imageLayer = imageLayer;
      this.groupStack = [];
      this.processingType3 = null;
      this.baseTransform = null;
      this.baseTransformStack = [];
      this.groupLevel = 0;
      this.smaskStack = [];
      this.smaskCounter = 0;
      this.tempSMask = null;
      this.contentVisible = true;
      this.markedContentStack = [];
      this.optionalContentConfig = optionalContentConfig;
      this.cachedCanvases = new CachedCanvases(this.canvasFactory);
      this.cachedPatterns = new Map();

      if (canvasCtx) {
        addContextCurrentTransform(canvasCtx);
      }

      this._cachedGetSinglePixelWidth = null;
    }

    _createClass(CanvasGraphics, [{
      key: "beginDrawing",
      value: function beginDrawing(_ref2) {
        var transform = _ref2.transform,
            viewport = _ref2.viewport,
            _ref2$transparency = _ref2.transparency,
            transparency = _ref2$transparency === void 0 ? false : _ref2$transparency,
            _ref2$background = _ref2.background,
            background = _ref2$background === void 0 ? null : _ref2$background;
        var width = this.ctx.canvas.width;
        var height = this.ctx.canvas.height;
        this.ctx.save();
        this.ctx.fillStyle = background || "rgb(255, 255, 255)";
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.restore();

        if (transparency) {
          var transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height, true);
          this.compositeCtx = this.ctx;
          this.transparentCanvas = transparentCanvas.canvas;
          this.ctx = transparentCanvas.context;
          this.ctx.save();
          this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
        }

        this.ctx.save();
        resetCtxToDefault(this.ctx);

        if (transform) {
          this.ctx.transform.apply(this.ctx, transform);
        }

        this.ctx.transform.apply(this.ctx, viewport.transform);
        this.baseTransform = this.ctx.mozCurrentTransform.slice();
        this._combinedScaleFactor = Math.hypot(this.baseTransform[0], this.baseTransform[2]);

        if (this.imageLayer) {
          this.imageLayer.beginLayout();
        }
      }
    }, {
      key: "executeOperatorList",
      value: function executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
        var argsArray = operatorList.argsArray;
        var fnArray = operatorList.fnArray;
        var i = executionStartIdx || 0;
        var argsArrayLen = argsArray.length;

        if (argsArrayLen === i) {
          return i;
        }

        var chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
        var endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
        var steps = 0;
        var commonObjs = this.commonObjs;
        var objs = this.objs;
        var fnId;

        while (true) {
          if (stepper !== undefined && i === stepper.nextBreakPoint) {
            stepper.breakIt(i, continueCallback);
            return i;
          }

          fnId = fnArray[i];

          if (fnId !== _util.OPS.dependency) {
            this[fnId].apply(this, argsArray[i]);
          } else {
            var _iterator = _createForOfIteratorHelper(argsArray[i]),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var depObjId = _step.value;
                var objsPool = depObjId.startsWith("g_") ? commonObjs : objs;

                if (!objsPool.has(depObjId)) {
                  objsPool.get(depObjId, continueCallback);
                  return i;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          i++;

          if (i === argsArrayLen) {
            return i;
          }

          if (chunkOperations && ++steps > EXECUTION_STEPS) {
            if (Date.now() > endTime) {
              continueCallback();
              return i;
            }

            steps = 0;
          }
        }
      }
    }, {
      key: "endDrawing",
      value: function endDrawing() {
        while (this.stateStack.length || this.current.activeSMask !== null) {
          this.restore();
        }

        this.ctx.restore();

        if (this.transparentCanvas) {
          this.ctx = this.compositeCtx;
          this.ctx.save();
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.drawImage(this.transparentCanvas, 0, 0);
          this.ctx.restore();
          this.transparentCanvas = null;
        }

        this.cachedCanvases.clear();
        this.cachedPatterns.clear();

        if (this.imageLayer) {
          this.imageLayer.endLayout();
        }
      }
    }, {
      key: "_scaleImage",
      value: function _scaleImage(img, inverseTransform) {
        var width = img.width;
        var height = img.height;
        var widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]), 1);
        var heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]), 1);
        var paintWidth = width,
            paintHeight = height;
        var tmpCanvasId = "prescale1";
        var tmpCanvas, tmpCtx;

        while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
          var newWidth = paintWidth,
              newHeight = paintHeight;

          if (widthScale > 2 && paintWidth > 1) {
            newWidth = Math.ceil(paintWidth / 2);
            widthScale /= paintWidth / newWidth;
          }

          if (heightScale > 2 && paintHeight > 1) {
            newHeight = Math.ceil(paintHeight / 2);
            heightScale /= paintHeight / newHeight;
          }

          tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
          tmpCtx = tmpCanvas.context;
          tmpCtx.clearRect(0, 0, newWidth, newHeight);
          tmpCtx.drawImage(img, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
          img = tmpCanvas.canvas;
          paintWidth = newWidth;
          paintHeight = newHeight;
          tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
        }

        return {
          img: img,
          paintWidth: paintWidth,
          paintHeight: paintHeight
        };
      }
    }, {
      key: "_createMaskCanvas",
      value: function _createMaskCanvas(img) {
        var ctx = this.ctx;
        var width = img.width,
            height = img.height;
        var fillColor = this.current.fillColor;
        var isPatternFill = this.current.patternFill;
        var maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
        var maskCtx = maskCanvas.context;
        putBinaryImageMask(maskCtx, img);
        var objToCanvas = ctx.mozCurrentTransform;

        var maskToCanvas = _util.Util.transform(objToCanvas, [1 / width, 0, 0, -1 / height, 0, 0]);

        maskToCanvas = _util.Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]);

        var cord1 = _util.Util.applyTransform([0, 0], maskToCanvas);

        var cord2 = _util.Util.applyTransform([width, height], maskToCanvas);

        var rect = _util.Util.normalizeRect([cord1[0], cord1[1], cord2[0], cord2[1]]);

        var drawnWidth = Math.ceil(rect[2] - rect[0]);
        var drawnHeight = Math.ceil(rect[3] - rect[1]);
        var fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight, true);
        var fillCtx = fillCanvas.context;
        var offsetX = Math.min(cord1[0], cord2[0]);
        var offsetY = Math.min(cord1[1], cord2[1]);
        fillCtx.translate(-offsetX, -offsetY);
        fillCtx.transform.apply(fillCtx, maskToCanvas);

        var scaled = this._scaleImage(maskCanvas.canvas, fillCtx.mozCurrentTransformInverse);

        fillCtx.drawImage(scaled.img, 0, 0, scaled.img.width, scaled.img.height, 0, 0, width, height);
        fillCtx.globalCompositeOperation = "source-in";

        var inverse = _util.Util.transform(fillCtx.mozCurrentTransformInverse, [1, 0, 0, 1, -offsetX, -offsetY]);

        fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, false) : fillColor;
        fillCtx.fillRect(0, 0, width, height);
        return {
          canvas: fillCanvas.canvas,
          offsetX: Math.round(offsetX),
          offsetY: Math.round(offsetY)
        };
      }
    }, {
      key: "setLineWidth",
      value: function setLineWidth(width) {
        this.current.lineWidth = width;
        this.ctx.lineWidth = width;
      }
    }, {
      key: "setLineCap",
      value: function setLineCap(style) {
        this.ctx.lineCap = LINE_CAP_STYLES[style];
      }
    }, {
      key: "setLineJoin",
      value: function setLineJoin(style) {
        this.ctx.lineJoin = LINE_JOIN_STYLES[style];
      }
    }, {
      key: "setMiterLimit",
      value: function setMiterLimit(limit) {
        this.ctx.miterLimit = limit;
      }
    }, {
      key: "setDash",
      value: function setDash(dashArray, dashPhase) {
        var ctx = this.ctx;

        if (ctx.setLineDash !== undefined) {
          ctx.setLineDash(dashArray);
          ctx.lineDashOffset = dashPhase;
        }
      }
    }, {
      key: "setRenderingIntent",
      value: function setRenderingIntent(intent) {}
    }, {
      key: "setFlatness",
      value: function setFlatness(flatness) {}
    }, {
      key: "setGState",
      value: function setGState(states) {
        for (var i = 0, ii = states.length; i < ii; i++) {
          var state = states[i];
          var key = state[0];
          var value = state[1];

          switch (key) {
            case "LW":
              this.setLineWidth(value);
              break;

            case "LC":
              this.setLineCap(value);
              break;

            case "LJ":
              this.setLineJoin(value);
              break;

            case "ML":
              this.setMiterLimit(value);
              break;

            case "D":
              this.setDash(value[0], value[1]);
              break;

            case "RI":
              this.setRenderingIntent(value);
              break;

            case "FL":
              this.setFlatness(value);
              break;

            case "Font":
              this.setFont(value[0], value[1]);
              break;

            case "CA":
              this.current.strokeAlpha = state[1];
              break;

            case "ca":
              this.current.fillAlpha = state[1];
              this.ctx.globalAlpha = state[1];
              break;

            case "BM":
              this.ctx.globalCompositeOperation = value;
              break;

            case "SMask":
              if (this.current.activeSMask) {
                if (this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1].activeSMask === this.current.activeSMask) {
                  this.suspendSMaskGroup();
                } else {
                  this.endSMaskGroup();
                }
              }

              this.current.activeSMask = value ? this.tempSMask : null;

              if (this.current.activeSMask) {
                this.beginSMaskGroup();
              }

              this.tempSMask = null;
              break;

            case "TR":
              this.current.transferMaps = value;
          }
        }
      }
    }, {
      key: "beginSMaskGroup",
      value: function beginSMaskGroup() {
        var activeSMask = this.current.activeSMask;
        var drawnWidth = activeSMask.canvas.width;
        var drawnHeight = activeSMask.canvas.height;
        var cacheId = "smaskGroupAt" + this.groupLevel;
        var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
        var currentCtx = this.ctx;
        var currentTransform = currentCtx.mozCurrentTransform;
        this.ctx.save();
        var groupCtx = scratchCanvas.context;
        groupCtx.scale(1 / activeSMask.scaleX, 1 / activeSMask.scaleY);
        groupCtx.translate(-activeSMask.offsetX, -activeSMask.offsetY);
        groupCtx.transform.apply(groupCtx, currentTransform);
        activeSMask.startTransformInverse = groupCtx.mozCurrentTransformInverse;
        copyCtxState(currentCtx, groupCtx);
        this.ctx = groupCtx;
        this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        this.groupStack.push(currentCtx);
        this.groupLevel++;
      }
    }, {
      key: "suspendSMaskGroup",
      value: function suspendSMaskGroup() {
        var groupCtx = this.ctx;
        this.groupLevel--;
        this.ctx = this.groupStack.pop();
        composeSMask(this.ctx, this.current.activeSMask, groupCtx);
        this.ctx.restore();
        this.ctx.save();
        copyCtxState(groupCtx, this.ctx);
        this.current.resumeSMaskCtx = groupCtx;

        var deltaTransform = _util.Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);

        this.ctx.transform.apply(this.ctx, deltaTransform);
        groupCtx.save();
        groupCtx.setTransform(1, 0, 0, 1, 0, 0);
        groupCtx.clearRect(0, 0, groupCtx.canvas.width, groupCtx.canvas.height);
        groupCtx.restore();
      }
    }, {
      key: "resumeSMaskGroup",
      value: function resumeSMaskGroup() {
        var groupCtx = this.current.resumeSMaskCtx;
        var currentCtx = this.ctx;
        this.ctx = groupCtx;
        this.groupStack.push(currentCtx);
        this.groupLevel++;
      }
    }, {
      key: "endSMaskGroup",
      value: function endSMaskGroup() {
        var groupCtx = this.ctx;
        this.groupLevel--;
        this.ctx = this.groupStack.pop();
        composeSMask(this.ctx, this.current.activeSMask, groupCtx);
        this.ctx.restore();
        copyCtxState(groupCtx, this.ctx);

        var deltaTransform = _util.Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);

        this.ctx.transform.apply(this.ctx, deltaTransform);
      }
    }, {
      key: "save",
      value: function save() {
        this.ctx.save();
        var old = this.current;
        this.stateStack.push(old);
        this.current = old.clone();
        this.current.resumeSMaskCtx = null;
      }
    }, {
      key: "restore",
      value: function restore() {
        if (this.current.resumeSMaskCtx) {
          this.resumeSMaskGroup();
        }

        if (this.current.activeSMask !== null && (this.stateStack.length === 0 || this.stateStack[this.stateStack.length - 1].activeSMask !== this.current.activeSMask)) {
          this.endSMaskGroup();
        }

        if (this.stateStack.length !== 0) {
          this.current = this.stateStack.pop();
          this.ctx.restore();
          this.pendingClip = null;
          this._cachedGetSinglePixelWidth = null;
        } else {
          this.current.activeSMask = null;
        }
      }
    }, {
      key: "transform",
      value: function transform(a, b, c, d, e, f) {
        this.ctx.transform(a, b, c, d, e, f);
        this._cachedGetSinglePixelWidth = null;
      }
    }, {
      key: "constructPath",
      value: function constructPath(ops, args) {
        var ctx = this.ctx;
        var current = this.current;
        var x = current.x,
            y = current.y;

        for (var i = 0, j = 0, ii = ops.length; i < ii; i++) {
          switch (ops[i] | 0) {
            case _util.OPS.rectangle:
              x = args[j++];
              y = args[j++];
              var width = args[j++];
              var height = args[j++];
              var xw = x + width;
              var yh = y + height;
              ctx.moveTo(x, y);

              if (width === 0 || height === 0) {
                ctx.lineTo(xw, yh);
              } else {
                ctx.lineTo(xw, y);
                ctx.lineTo(xw, yh);
                ctx.lineTo(x, yh);
              }

              ctx.closePath();
              break;

            case _util.OPS.moveTo:
              x = args[j++];
              y = args[j++];
              ctx.moveTo(x, y);
              break;

            case _util.OPS.lineTo:
              x = args[j++];
              y = args[j++];
              ctx.lineTo(x, y);
              break;

            case _util.OPS.curveTo:
              x = args[j + 4];
              y = args[j + 5];
              ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
              j += 6;
              break;

            case _util.OPS.curveTo2:
              ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
              x = args[j + 2];
              y = args[j + 3];
              j += 4;
              break;

            case _util.OPS.curveTo3:
              x = args[j + 2];
              y = args[j + 3];
              ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
              j += 4;
              break;

            case _util.OPS.closePath:
              ctx.closePath();
              break;
          }
        }

        current.setCurrentPoint(x, y);
      }
    }, {
      key: "closePath",
      value: function closePath() {
        this.ctx.closePath();
      }
    }, {
      key: "stroke",
      value: function stroke(consumePath) {
        consumePath = typeof consumePath !== "undefined" ? consumePath : true;
        var ctx = this.ctx;
        var strokeColor = this.current.strokeColor;
        ctx.globalAlpha = this.current.strokeAlpha;

        if (this.contentVisible) {
          if (_typeof(strokeColor) === "object" && strokeColor !== null && strokeColor !== void 0 && strokeColor.getPattern) {
            var lineWidth = this.getSinglePixelWidth();
            ctx.save();
            ctx.strokeStyle = strokeColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse);
            ctx.lineWidth = Math.max(lineWidth, this.current.lineWidth);
            ctx.stroke();
            ctx.restore();
          } else {
            var _lineWidth = this.getSinglePixelWidth();

            if (_lineWidth < 0 && -_lineWidth >= this.current.lineWidth) {
              ctx.save();
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
              ctx.stroke();
              ctx.restore();
            } else {
              ctx.lineWidth = Math.max(_lineWidth, this.current.lineWidth);
              ctx.stroke();
            }
          }
        }

        if (consumePath) {
          this.consumePath();
        }

        ctx.globalAlpha = this.current.fillAlpha;
      }
    }, {
      key: "closeStroke",
      value: function closeStroke() {
        this.closePath();
        this.stroke();
      }
    }, {
      key: "fill",
      value: function fill(consumePath) {
        consumePath = typeof consumePath !== "undefined" ? consumePath : true;
        var ctx = this.ctx;
        var fillColor = this.current.fillColor;
        var isPatternFill = this.current.patternFill;
        var needRestore = false;

        if (isPatternFill) {
          ctx.save();
          ctx.fillStyle = fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse);
          needRestore = true;
        }

        if (this.contentVisible) {
          if (this.pendingEOFill) {
            ctx.fill("evenodd");
            this.pendingEOFill = false;
          } else {
            ctx.fill();
          }
        }

        if (needRestore) {
          ctx.restore();
        }

        if (consumePath) {
          this.consumePath();
        }
      }
    }, {
      key: "eoFill",
      value: function eoFill() {
        this.pendingEOFill = true;
        this.fill();
      }
    }, {
      key: "fillStroke",
      value: function fillStroke() {
        this.fill(false);
        this.stroke(false);
        this.consumePath();
      }
    }, {
      key: "eoFillStroke",
      value: function eoFillStroke() {
        this.pendingEOFill = true;
        this.fillStroke();
      }
    }, {
      key: "closeFillStroke",
      value: function closeFillStroke() {
        this.closePath();
        this.fillStroke();
      }
    }, {
      key: "closeEOFillStroke",
      value: function closeEOFillStroke() {
        this.pendingEOFill = true;
        this.closePath();
        this.fillStroke();
      }
    }, {
      key: "endPath",
      value: function endPath() {
        this.consumePath();
      }
    }, {
      key: "clip",
      value: function clip() {
        this.pendingClip = NORMAL_CLIP;
      }
    }, {
      key: "eoClip",
      value: function eoClip() {
        this.pendingClip = EO_CLIP;
      }
    }, {
      key: "beginText",
      value: function beginText() {
        this.current.textMatrix = _util.IDENTITY_MATRIX;
        this.current.textMatrixScale = 1;
        this.current.x = this.current.lineX = 0;
        this.current.y = this.current.lineY = 0;
      }
    }, {
      key: "endText",
      value: function endText() {
        var paths = this.pendingTextPaths;
        var ctx = this.ctx;

        if (paths === undefined) {
          ctx.beginPath();
          return;
        }

        ctx.save();
        ctx.beginPath();

        for (var i = 0; i < paths.length; i++) {
          var path = paths[i];
          ctx.setTransform.apply(ctx, path.transform);
          ctx.translate(path.x, path.y);
          path.addToPath(ctx, path.fontSize);
        }

        ctx.restore();
        ctx.clip();
        ctx.beginPath();
        delete this.pendingTextPaths;
      }
    }, {
      key: "setCharSpacing",
      value: function setCharSpacing(spacing) {
        this.current.charSpacing = spacing;
      }
    }, {
      key: "setWordSpacing",
      value: function setWordSpacing(spacing) {
        this.current.wordSpacing = spacing;
      }
    }, {
      key: "setHScale",
      value: function setHScale(scale) {
        this.current.textHScale = scale / 100;
      }
    }, {
      key: "setLeading",
      value: function setLeading(leading) {
        this.current.leading = -leading;
      }
    }, {
      key: "setFont",
      value: function setFont(fontRefName, size) {
        var fontObj = this.commonObjs.get(fontRefName);
        var current = this.current;

        if (!fontObj) {
          throw new Error("Can't find font for ".concat(fontRefName));
        }

        current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;

        if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
          (0, _util.warn)("Invalid font matrix for font " + fontRefName);
        }

        if (size < 0) {
          size = -size;
          current.fontDirection = -1;
        } else {
          current.fontDirection = 1;
        }

        this.current.font = fontObj;
        this.current.fontSize = size;

        if (fontObj.isType3Font) {
          return;
        }

        var name = fontObj.loadedName || "sans-serif";
        var bold = "normal";

        if (fontObj.black) {
          bold = "900";
        } else if (fontObj.bold) {
          bold = "bold";
        }

        var italic = fontObj.italic ? "italic" : "normal";
        var typeface = "\"".concat(name, "\", ").concat(fontObj.fallbackName);
        var browserFontSize = size;

        if (size < MIN_FONT_SIZE) {
          browserFontSize = MIN_FONT_SIZE;
        } else if (size > MAX_FONT_SIZE) {
          browserFontSize = MAX_FONT_SIZE;
        }

        this.current.fontSizeScale = size / browserFontSize;
        this.ctx.font = "".concat(italic, " ").concat(bold, " ").concat(browserFontSize, "px ").concat(typeface);
      }
    }, {
      key: "setTextRenderingMode",
      value: function setTextRenderingMode(mode) {
        this.current.textRenderingMode = mode;
      }
    }, {
      key: "setTextRise",
      value: function setTextRise(rise) {
        this.current.textRise = rise;
      }
    }, {
      key: "moveText",
      value: function moveText(x, y) {
        this.current.x = this.current.lineX += x;
        this.current.y = this.current.lineY += y;
      }
    }, {
      key: "setLeadingMoveText",
      value: function setLeadingMoveText(x, y) {
        this.setLeading(-y);
        this.moveText(x, y);
      }
    }, {
      key: "setTextMatrix",
      value: function setTextMatrix(a, b, c, d, e, f) {
        this.current.textMatrix = [a, b, c, d, e, f];
        this.current.textMatrixScale = Math.hypot(a, b);
        this.current.x = this.current.lineX = 0;
        this.current.y = this.current.lineY = 0;
      }
    }, {
      key: "nextLine",
      value: function nextLine() {
        this.moveText(0, this.current.leading);
      }
    }, {
      key: "paintChar",
      value: function paintChar(character, x, y, patternTransform, resetLineWidthToOne) {
        var ctx = this.ctx;
        var current = this.current;
        var font = current.font;
        var textRenderingMode = current.textRenderingMode;
        var fontSize = current.fontSize / current.fontSizeScale;
        var fillStrokeMode = textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;
        var isAddToPathSet = !!(textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);
        var patternFill = current.patternFill && !font.missingFile;
        var addToPath;

        if (font.disableFontFace || isAddToPathSet || patternFill) {
          addToPath = font.getPathGenerator(this.commonObjs, character);
        }

        if (font.disableFontFace || patternFill) {
          ctx.save();
          ctx.translate(x, y);
          ctx.beginPath();
          addToPath(ctx, fontSize);

          if (patternTransform) {
            ctx.setTransform.apply(ctx, patternTransform);
          }

          if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            ctx.fill();
          }

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            if (resetLineWidthToOne) {
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
            }

            ctx.stroke();
          }

          ctx.restore();
        } else {
          if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            ctx.fillText(character, x, y);
          }

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            if (resetLineWidthToOne) {
              ctx.save();
              ctx.moveTo(x, y);
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
              ctx.strokeText(character, 0, 0);
              ctx.restore();
            } else {
              ctx.strokeText(character, x, y);
            }
          }
        }

        if (isAddToPathSet) {
          var paths = this.pendingTextPaths || (this.pendingTextPaths = []);
          paths.push({
            transform: ctx.mozCurrentTransform,
            x: x,
            y: y,
            fontSize: fontSize,
            addToPath: addToPath
          });
        }
      }
    }, {
      key: "isFontSubpixelAAEnabled",
      get: function get() {
        var _this$cachedCanvases$ = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10),
            ctx = _this$cachedCanvases$.context;

        ctx.scale(1.5, 1);
        ctx.fillText("I", 0, 10);
        var data = ctx.getImageData(0, 0, 10, 10).data;
        var enabled = false;

        for (var i = 3; i < data.length; i += 4) {
          if (data[i] > 0 && data[i] < 255) {
            enabled = true;
            break;
          }
        }

        return (0, _util.shadow)(this, "isFontSubpixelAAEnabled", enabled);
      }
    }, {
      key: "showText",
      value: function showText(glyphs) {
        var current = this.current;
        var font = current.font;

        if (font.isType3Font) {
          return this.showType3Text(glyphs);
        }

        var fontSize = current.fontSize;

        if (fontSize === 0) {
          return undefined;
        }

        var ctx = this.ctx;
        var fontSizeScale = current.fontSizeScale;
        var charSpacing = current.charSpacing;
        var wordSpacing = current.wordSpacing;
        var fontDirection = current.fontDirection;
        var textHScale = current.textHScale * fontDirection;
        var glyphsLength = glyphs.length;
        var vertical = font.vertical;
        var spacingDir = vertical ? 1 : -1;
        var defaultVMetrics = font.defaultVMetrics;
        var widthAdvanceScale = fontSize * current.fontMatrix[0];
        var simpleFillText = current.textRenderingMode === _util.TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
        ctx.save();
        var patternTransform;

        if (current.patternFill) {
          ctx.save();
          var pattern = current.fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse);
          patternTransform = ctx.mozCurrentTransform;
          ctx.restore();
          ctx.fillStyle = pattern;
        }

        ctx.transform.apply(ctx, current.textMatrix);
        ctx.translate(current.x, current.y + current.textRise);

        if (fontDirection > 0) {
          ctx.scale(textHScale, -1);
        } else {
          ctx.scale(textHScale, 1);
        }

        var lineWidth = current.lineWidth;
        var resetLineWidthToOne = false;
        var scale = current.textMatrixScale;

        if (scale === 0 || lineWidth === 0) {
          var fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            this._cachedGetSinglePixelWidth = null;
            lineWidth = this.getSinglePixelWidth();
            resetLineWidthToOne = lineWidth < 0;
          }
        } else {
          lineWidth /= scale;
        }

        if (fontSizeScale !== 1.0) {
          ctx.scale(fontSizeScale, fontSizeScale);
          lineWidth /= fontSizeScale;
        }

        ctx.lineWidth = lineWidth;
        var x = 0,
            i;

        for (i = 0; i < glyphsLength; ++i) {
          var glyph = glyphs[i];

          if ((0, _util.isNum)(glyph)) {
            x += spacingDir * glyph * fontSize / 1000;
            continue;
          }

          var restoreNeeded = false;
          var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
          var character = glyph.fontChar;
          var accent = glyph.accent;
          var scaledX = void 0,
              scaledY = void 0;
          var width = glyph.width;

          if (vertical) {
            var vmetric = glyph.vmetric || defaultVMetrics;
            var vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
            var vy = vmetric[2] * widthAdvanceScale;
            width = vmetric ? -vmetric[0] : width;
            scaledX = vx / fontSizeScale;
            scaledY = (x + vy) / fontSizeScale;
          } else {
            scaledX = x / fontSizeScale;
            scaledY = 0;
          }

          if (font.remeasure && width > 0) {
            var measuredWidth = ctx.measureText(character).width * 1000 / fontSize * fontSizeScale;

            if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
              var characterScaleX = width / measuredWidth;
              restoreNeeded = true;
              ctx.save();
              ctx.scale(characterScaleX, 1);
              scaledX /= characterScaleX;
            } else if (width !== measuredWidth) {
              scaledX += (width - measuredWidth) / 2000 * fontSize / fontSizeScale;
            }
          }

          if (this.contentVisible && (glyph.isInFont || font.missingFile)) {
            if (simpleFillText && !accent) {
              ctx.fillText(character, scaledX, scaledY);
            } else {
              this.paintChar(character, scaledX, scaledY, patternTransform, resetLineWidthToOne);

              if (accent) {
                var scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
                var scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
                this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform, resetLineWidthToOne);
              }
            }
          }

          var charWidth = void 0;

          if (vertical) {
            charWidth = width * widthAdvanceScale - spacing * fontDirection;
          } else {
            charWidth = width * widthAdvanceScale + spacing * fontDirection;
          }

          x += charWidth;

          if (restoreNeeded) {
            ctx.restore();
          }
        }

        if (vertical) {
          current.y -= x;
        } else {
          current.x += x * textHScale;
        }

        ctx.restore();
        return undefined;
      }
    }, {
      key: "showType3Text",
      value: function showType3Text(glyphs) {
        var ctx = this.ctx;
        var current = this.current;
        var font = current.font;
        var fontSize = current.fontSize;
        var fontDirection = current.fontDirection;
        var spacingDir = font.vertical ? 1 : -1;
        var charSpacing = current.charSpacing;
        var wordSpacing = current.wordSpacing;
        var textHScale = current.textHScale * fontDirection;
        var fontMatrix = current.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        var glyphsLength = glyphs.length;
        var isTextInvisible = current.textRenderingMode === _util.TextRenderingMode.INVISIBLE;
        var i, glyph, width, spacingLength;

        if (isTextInvisible || fontSize === 0) {
          return;
        }

        this._cachedGetSinglePixelWidth = null;
        ctx.save();
        ctx.transform.apply(ctx, current.textMatrix);
        ctx.translate(current.x, current.y);
        ctx.scale(textHScale, fontDirection);

        for (i = 0; i < glyphsLength; ++i) {
          glyph = glyphs[i];

          if ((0, _util.isNum)(glyph)) {
            spacingLength = spacingDir * glyph * fontSize / 1000;
            this.ctx.translate(spacingLength, 0);
            current.x += spacingLength * textHScale;
            continue;
          }

          var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
          var operatorList = font.charProcOperatorList[glyph.operatorListId];

          if (!operatorList) {
            (0, _util.warn)("Type3 character \"".concat(glyph.operatorListId, "\" is not available."));
            continue;
          }

          if (this.contentVisible) {
            this.processingType3 = glyph;
            this.save();
            ctx.scale(fontSize, fontSize);
            ctx.transform.apply(ctx, fontMatrix);
            this.executeOperatorList(operatorList);
            this.restore();
          }

          var transformed = _util.Util.applyTransform([glyph.width, 0], fontMatrix);

          width = transformed[0] * fontSize + spacing;
          ctx.translate(width, 0);
          current.x += width * textHScale;
        }

        ctx.restore();
        this.processingType3 = null;
      }
    }, {
      key: "setCharWidth",
      value: function setCharWidth(xWidth, yWidth) {}
    }, {
      key: "setCharWidthAndBounds",
      value: function setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
        this.ctx.rect(llx, lly, urx - llx, ury - lly);
        this.clip();
        this.endPath();
      }
    }, {
      key: "getColorN_Pattern",
      value: function getColorN_Pattern(IR) {
        var _this = this;

        var pattern;

        if (IR[0] === "TilingPattern") {
          var color = IR[1];
          var baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
          var canvasGraphicsFactory = {
            createCanvasGraphics: function createCanvasGraphics(ctx) {
              return new CanvasGraphics(ctx, _this.commonObjs, _this.objs, _this.canvasFactory);
            }
          };
          pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
        } else {
          pattern = this._getPattern(IR[1]);
        }

        return pattern;
      }
    }, {
      key: "setStrokeColorN",
      value: function setStrokeColorN() {
        this.current.strokeColor = this.getColorN_Pattern(arguments);
      }
    }, {
      key: "setFillColorN",
      value: function setFillColorN() {
        this.current.fillColor = this.getColorN_Pattern(arguments);
        this.current.patternFill = true;
      }
    }, {
      key: "setStrokeRGBColor",
      value: function setStrokeRGBColor(r, g, b) {
        var color = _util.Util.makeHexColor(r, g, b);

        this.ctx.strokeStyle = color;
        this.current.strokeColor = color;
      }
    }, {
      key: "setFillRGBColor",
      value: function setFillRGBColor(r, g, b) {
        var color = _util.Util.makeHexColor(r, g, b);

        this.ctx.fillStyle = color;
        this.current.fillColor = color;
        this.current.patternFill = false;
      }
    }, {
      key: "_getPattern",
      value: function _getPattern(objId) {
        if (this.cachedPatterns.has(objId)) {
          return this.cachedPatterns.get(objId);
        }

        var pattern = (0, _pattern_helper.getShadingPattern)(this.objs.get(objId));
        this.cachedPatterns.set(objId, pattern);
        return pattern;
      }
    }, {
      key: "shadingFill",
      value: function shadingFill(objId) {
        if (!this.contentVisible) {
          return;
        }

        var ctx = this.ctx;
        this.save();

        var pattern = this._getPattern(objId);

        ctx.fillStyle = pattern.getPattern(ctx, this, ctx.mozCurrentTransformInverse, true);
        var inv = ctx.mozCurrentTransformInverse;

        if (inv) {
          var canvas = ctx.canvas;
          var width = canvas.width;
          var height = canvas.height;

          var bl = _util.Util.applyTransform([0, 0], inv);

          var br = _util.Util.applyTransform([0, height], inv);

          var ul = _util.Util.applyTransform([width, 0], inv);

          var ur = _util.Util.applyTransform([width, height], inv);

          var x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
          var y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
          var x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
          var y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
          this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
        } else {
          this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
        }

        this.restore();
      }
    }, {
      key: "beginInlineImage",
      value: function beginInlineImage() {
        (0, _util.unreachable)("Should not call beginInlineImage");
      }
    }, {
      key: "beginImageData",
      value: function beginImageData() {
        (0, _util.unreachable)("Should not call beginImageData");
      }
    }, {
      key: "paintFormXObjectBegin",
      value: function paintFormXObjectBegin(matrix, bbox) {
        if (!this.contentVisible) {
          return;
        }

        this.save();
        this.baseTransformStack.push(this.baseTransform);

        if (Array.isArray(matrix) && matrix.length === 6) {
          this.transform.apply(this, matrix);
        }

        this.baseTransform = this.ctx.mozCurrentTransform;

        if (bbox) {
          var width = bbox[2] - bbox[0];
          var height = bbox[3] - bbox[1];
          this.ctx.rect(bbox[0], bbox[1], width, height);
          this.clip();
          this.endPath();
        }
      }
    }, {
      key: "paintFormXObjectEnd",
      value: function paintFormXObjectEnd() {
        if (!this.contentVisible) {
          return;
        }

        this.restore();
        this.baseTransform = this.baseTransformStack.pop();
      }
    }, {
      key: "beginGroup",
      value: function beginGroup(group) {
        if (!this.contentVisible) {
          return;
        }

        this.save();
        var currentCtx = this.ctx;

        if (!group.isolated) {
          (0, _util.info)("TODO: Support non-isolated groups.");
        }

        if (group.knockout) {
          (0, _util.warn)("Knockout groups not supported.");
        }

        var currentTransform = currentCtx.mozCurrentTransform;

        if (group.matrix) {
          currentCtx.transform.apply(currentCtx, group.matrix);
        }

        if (!group.bbox) {
          throw new Error("Bounding box is required.");
        }

        var bounds = _util.Util.getAxialAlignedBoundingBox(group.bbox, currentCtx.mozCurrentTransform);

        var canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
        bounds = _util.Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
        var offsetX = Math.floor(bounds[0]);
        var offsetY = Math.floor(bounds[1]);
        var drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
        var drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
        var scaleX = 1,
            scaleY = 1;

        if (drawnWidth > MAX_GROUP_SIZE) {
          scaleX = drawnWidth / MAX_GROUP_SIZE;
          drawnWidth = MAX_GROUP_SIZE;
        }

        if (drawnHeight > MAX_GROUP_SIZE) {
          scaleY = drawnHeight / MAX_GROUP_SIZE;
          drawnHeight = MAX_GROUP_SIZE;
        }

        var cacheId = "groupAt" + this.groupLevel;

        if (group.smask) {
          cacheId += "_smask_" + this.smaskCounter++ % 2;
        }

        var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
        var groupCtx = scratchCanvas.context;
        groupCtx.scale(1 / scaleX, 1 / scaleY);
        groupCtx.translate(-offsetX, -offsetY);
        groupCtx.transform.apply(groupCtx, currentTransform);

        if (group.smask) {
          this.smaskStack.push({
            canvas: scratchCanvas.canvas,
            context: groupCtx,
            offsetX: offsetX,
            offsetY: offsetY,
            scaleX: scaleX,
            scaleY: scaleY,
            subtype: group.smask.subtype,
            backdrop: group.smask.backdrop,
            transferMap: group.smask.transferMap || null,
            startTransformInverse: null
          });
        } else {
          currentCtx.setTransform(1, 0, 0, 1, 0, 0);
          currentCtx.translate(offsetX, offsetY);
          currentCtx.scale(scaleX, scaleY);
        }

        copyCtxState(currentCtx, groupCtx);
        this.ctx = groupCtx;
        this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        this.groupStack.push(currentCtx);
        this.groupLevel++;
        this.current.activeSMask = null;
      }
    }, {
      key: "endGroup",
      value: function endGroup(group) {
        if (!this.contentVisible) {
          return;
        }

        this.groupLevel--;
        var groupCtx = this.ctx;
        this.ctx = this.groupStack.pop();

        if (this.ctx.imageSmoothingEnabled !== undefined) {
          this.ctx.imageSmoothingEnabled = false;
        } else {
          this.ctx.mozImageSmoothingEnabled = false;
        }

        if (group.smask) {
          this.tempSMask = this.smaskStack.pop();
        } else {
          this.ctx.drawImage(groupCtx.canvas, 0, 0);
        }

        this.restore();
      }
    }, {
      key: "beginAnnotations",
      value: function beginAnnotations() {
        this.save();

        if (this.baseTransform) {
          this.ctx.setTransform.apply(this.ctx, this.baseTransform);
        }
      }
    }, {
      key: "endAnnotations",
      value: function endAnnotations() {
        this.restore();
      }
    }, {
      key: "beginAnnotation",
      value: function beginAnnotation(id, rect, transform, matrix) {
        this.save();
        resetCtxToDefault(this.ctx);
        this.current = new CanvasExtraState();

        if (Array.isArray(rect) && rect.length === 4) {
          var width = rect[2] - rect[0];
          var height = rect[3] - rect[1];
          this.ctx.rect(rect[0], rect[1], width, height);
          this.clip();
          this.endPath();
        }

        this.transform.apply(this, transform);
        this.transform.apply(this, matrix);
      }
    }, {
      key: "endAnnotation",
      value: function endAnnotation() {
        this.restore();
      }
    }, {
      key: "paintImageMaskXObject",
      value: function paintImageMaskXObject(img) {
        if (!this.contentVisible) {
          return;
        }

        var ctx = this.ctx;
        var width = img.width,
            height = img.height;
        var glyph = this.processingType3;

        if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {
          if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {
            glyph.compiled = compileType3Glyph({
              data: img.data,
              width: width,
              height: height
            });
          } else {
            glyph.compiled = null;
          }
        }

        if (glyph !== null && glyph !== void 0 && glyph.compiled) {
          glyph.compiled(ctx);
          return;
        }

        var mask = this._createMaskCanvas(img);

        var maskCanvas = mask.canvas;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY);
        ctx.restore();
      }
    }, {
      key: "paintImageMaskXObjectRepeat",
      value: function paintImageMaskXObjectRepeat(imgData, scaleX) {
        var skewX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var skewY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var scaleY = arguments.length > 4 ? arguments[4] : undefined;
        var positions = arguments.length > 5 ? arguments[5] : undefined;

        if (!this.contentVisible) {
          return;
        }

        var ctx = this.ctx;
        ctx.save();
        var currentTransform = ctx.mozCurrentTransform;
        ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0);

        var mask = this._createMaskCanvas(imgData);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        for (var i = 0, ii = positions.length; i < ii; i += 2) {
          var trans = _util.Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]]);

          var _Util$applyTransform = _util.Util.applyTransform([0, 0], trans),
              _Util$applyTransform2 = _slicedToArray(_Util$applyTransform, 2),
              x = _Util$applyTransform2[0],
              y = _Util$applyTransform2[1];

          ctx.drawImage(mask.canvas, x, y);
        }

        ctx.restore();
      }
    }, {
      key: "paintImageMaskXObjectGroup",
      value: function paintImageMaskXObjectGroup(images) {
        if (!this.contentVisible) {
          return;
        }

        var ctx = this.ctx;
        var fillColor = this.current.fillColor;
        var isPatternFill = this.current.patternFill;

        for (var i = 0, ii = images.length; i < ii; i++) {
          var image = images[i];
          var width = image.width,
              height = image.height;
          var maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
          var maskCtx = maskCanvas.context;
          maskCtx.save();
          putBinaryImageMask(maskCtx, image);
          maskCtx.globalCompositeOperation = "source-in";
          maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, ctx.mozCurrentTransformInverse, false) : fillColor;
          maskCtx.fillRect(0, 0, width, height);
          maskCtx.restore();
          ctx.save();
          ctx.transform.apply(ctx, image.transform);
          ctx.scale(1, -1);
          ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
          ctx.restore();
        }
      }
    }, {
      key: "paintImageXObject",
      value: function paintImageXObject(objId) {
        if (!this.contentVisible) {
          return;
        }

        var imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)("Dependent image isn't ready yet");
          return;
        }

        this.paintInlineImageXObject(imgData);
      }
    }, {
      key: "paintImageXObjectRepeat",
      value: function paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
        if (!this.contentVisible) {
          return;
        }

        var imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)("Dependent image isn't ready yet");
          return;
        }

        var width = imgData.width;
        var height = imgData.height;
        var map = [];

        for (var i = 0, ii = positions.length; i < ii; i += 2) {
          map.push({
            transform: [scaleX, 0, 0, scaleY, positions[i], positions[i + 1]],
            x: 0,
            y: 0,
            w: width,
            h: height
          });
        }

        this.paintInlineImageXObjectGroup(imgData, map);
      }
    }, {
      key: "paintInlineImageXObject",
      value: function paintInlineImageXObject(imgData) {
        if (!this.contentVisible) {
          return;
        }

        var width = imgData.width;
        var height = imgData.height;
        var ctx = this.ctx;
        this.save();
        ctx.scale(1 / width, -1 / height);
        var imgToPaint;

        if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
          imgToPaint = imgData;
        } else {
          var tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
          var tmpCtx = tmpCanvas.context;
          putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
          imgToPaint = tmpCanvas.canvas;
        }

        var scaled = this._scaleImage(imgToPaint, ctx.mozCurrentTransformInverse);

        ctx.drawImage(scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height);

        if (this.imageLayer) {
          var position = this.getCanvasPosition(0, -height);
          this.imageLayer.appendImage({
            imgData: imgData,
            left: position[0],
            top: position[1],
            width: width / ctx.mozCurrentTransformInverse[0],
            height: height / ctx.mozCurrentTransformInverse[3]
          });
        }

        this.restore();
      }
    }, {
      key: "paintInlineImageXObjectGroup",
      value: function paintInlineImageXObjectGroup(imgData, map) {
        if (!this.contentVisible) {
          return;
        }

        var ctx = this.ctx;
        var w = imgData.width;
        var h = imgData.height;
        var tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h);
        var tmpCtx = tmpCanvas.context;
        putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);

        for (var i = 0, ii = map.length; i < ii; i++) {
          var entry = map[i];
          ctx.save();
          ctx.transform.apply(ctx, entry.transform);
          ctx.scale(1, -1);
          ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);

          if (this.imageLayer) {
            var position = this.getCanvasPosition(entry.x, entry.y);
            this.imageLayer.appendImage({
              imgData: imgData,
              left: position[0],
              top: position[1],
              width: w,
              height: h
            });
          }

          ctx.restore();
        }
      }
    }, {
      key: "paintSolidColorImageMask",
      value: function paintSolidColorImageMask() {
        if (!this.contentVisible) {
          return;
        }

        this.ctx.fillRect(0, 0, 1, 1);
      }
    }, {
      key: "markPoint",
      value: function markPoint(tag) {}
    }, {
      key: "markPointProps",
      value: function markPointProps(tag, properties) {}
    }, {
      key: "beginMarkedContent",
      value: function beginMarkedContent(tag) {
        this.markedContentStack.push({
          visible: true
        });
      }
    }, {
      key: "beginMarkedContentProps",
      value: function beginMarkedContentProps(tag, properties) {
        if (tag === "OC") {
          this.markedContentStack.push({
            visible: this.optionalContentConfig.isVisible(properties)
          });
        } else {
          this.markedContentStack.push({
            visible: true
          });
        }

        this.contentVisible = this.isContentVisible();
      }
    }, {
      key: "endMarkedContent",
      value: function endMarkedContent() {
        this.markedContentStack.pop();
        this.contentVisible = this.isContentVisible();
      }
    }, {
      key: "beginCompat",
      value: function beginCompat() {}
    }, {
      key: "endCompat",
      value: function endCompat() {}
    }, {
      key: "consumePath",
      value: function consumePath() {
        var ctx = this.ctx;

        if (this.pendingClip) {
          if (this.pendingClip === EO_CLIP) {
            ctx.clip("evenodd");
          } else {
            ctx.clip();
          }

          this.pendingClip = null;
        }

        ctx.beginPath();
      }
    }, {
      key: "getSinglePixelWidth",
      value: function getSinglePixelWidth() {
        if (this._cachedGetSinglePixelWidth === null) {
          var m = this.ctx.mozCurrentTransform;
          var absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
          var sqNorm1 = Math.pow(m[0], 2) + Math.pow(m[2], 2);
          var sqNorm2 = Math.pow(m[1], 2) + Math.pow(m[3], 2);
          var pixelHeight = Math.sqrt(Math.max(sqNorm1, sqNorm2)) / absDet;

          if (sqNorm1 !== sqNorm2 && this._combinedScaleFactor * pixelHeight > 1) {
            this._cachedGetSinglePixelWidth = -(this._combinedScaleFactor * pixelHeight);
          } else if (absDet > Number.EPSILON) {
            this._cachedGetSinglePixelWidth = pixelHeight;
          } else {
            this._cachedGetSinglePixelWidth = 1;
          }
        }

        return this._cachedGetSinglePixelWidth;
      }
    }, {
      key: "getCanvasPosition",
      value: function getCanvasPosition(x, y) {
        var transform = this.ctx.mozCurrentTransform;
        return [transform[0] * x + transform[2] * y + transform[4], transform[1] * x + transform[3] * y + transform[5]];
      }
    }, {
      key: "isContentVisible",
      value: function isContentVisible() {
        for (var i = this.markedContentStack.length - 1; i >= 0; i--) {
          if (!this.markedContentStack[i].visible) {
            return false;
          }
        }

        return true;
      }
    }]);

    return CanvasGraphics;
  }();

  for (var op in _util.OPS) {
    CanvasGraphics.prototype[_util.OPS[op]] = CanvasGraphics.prototype[op];
  }

  return CanvasGraphics;
}();

exports.CanvasGraphics = CanvasGraphics;

/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getShadingPattern = getShadingPattern;
exports.TilingPattern = void 0;

var _util = __w_pdfjs_require__(4);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function applyBoundingBox(ctx, bbox) {
  if (!bbox || typeof Path2D === "undefined") {
    return;
  }

  var width = bbox[2] - bbox[0];
  var height = bbox[3] - bbox[1];
  var region = new Path2D();
  region.rect(bbox[0], bbox[1], width, height);
  ctx.clip(region);
}

var BaseShadingPattern = /*#__PURE__*/function () {
  function BaseShadingPattern() {
    _classCallCheck(this, BaseShadingPattern);

    if (this.constructor === BaseShadingPattern) {
      (0, _util.unreachable)("Cannot initialize BaseShadingPattern.");
    }
  }

  _createClass(BaseShadingPattern, [{
    key: "getPattern",
    value: function getPattern() {
      (0, _util.unreachable)("Abstract method `getPattern` called.");
    }
  }]);

  return BaseShadingPattern;
}();

var RadialAxialShadingPattern = /*#__PURE__*/function (_BaseShadingPattern) {
  _inherits(RadialAxialShadingPattern, _BaseShadingPattern);

  var _super = _createSuper(RadialAxialShadingPattern);

  function RadialAxialShadingPattern(IR) {
    var _this;

    _classCallCheck(this, RadialAxialShadingPattern);

    _this = _super.call(this);
    _this._type = IR[1];
    _this._bbox = IR[2];
    _this._colorStops = IR[3];
    _this._p0 = IR[4];
    _this._p1 = IR[5];
    _this._r0 = IR[6];
    _this._r1 = IR[7];
    _this._matrix = IR[8];
    _this._patternCache = null;
    return _this;
  }

  _createClass(RadialAxialShadingPattern, [{
    key: "_createGradient",
    value: function _createGradient(ctx) {
      var grad;

      if (this._type === "axial") {
        grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]);
      } else if (this._type === "radial") {
        grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1);
      }

      var _iterator = _createForOfIteratorHelper(this._colorStops),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var colorStop = _step.value;
          grad.addColorStop(colorStop[0], colorStop[1]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return grad;
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse) {
      var shadingFill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var pattern;

      if (this._patternCache) {
        pattern = this._patternCache;
      } else {
        if (!shadingFill) {
          var tmpCanvas = owner.cachedCanvases.getCanvas("pattern", owner.ctx.canvas.width, owner.ctx.canvas.height, true);
          var tmpCtx = tmpCanvas.context;
          tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
          tmpCtx.beginPath();
          tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
          tmpCtx.setTransform.apply(tmpCtx, owner.baseTransform);

          if (this._matrix) {
            tmpCtx.transform.apply(tmpCtx, this._matrix);
          }

          applyBoundingBox(tmpCtx, this._bbox);
          tmpCtx.fillStyle = this._createGradient(tmpCtx);
          tmpCtx.fill();
          pattern = ctx.createPattern(tmpCanvas.canvas, "repeat");
        } else {
          applyBoundingBox(ctx, this._bbox);
          pattern = this._createGradient(ctx);
        }

        this._patternCache = pattern;
      }

      if (!shadingFill) {
        var domMatrix = new DOMMatrix(inverse);

        try {
          pattern.setTransform(domMatrix);
        } catch (ex) {
          (0, _util.warn)("RadialAxialShadingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
        }
      }

      return pattern;
    }
  }]);

  return RadialAxialShadingPattern;
}(BaseShadingPattern);

function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
  var coords = context.coords,
      colors = context.colors;
  var bytes = data.data,
      rowSize = data.width * 4;
  var tmp;

  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }

  if (coords[p2 + 1] > coords[p3 + 1]) {
    tmp = p2;
    p2 = p3;
    p3 = tmp;
    tmp = c2;
    c2 = c3;
    c3 = tmp;
  }

  if (coords[p1 + 1] > coords[p2 + 1]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  }

  var x1 = (coords[p1] + context.offsetX) * context.scaleX;
  var y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
  var x2 = (coords[p2] + context.offsetX) * context.scaleX;
  var y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
  var x3 = (coords[p3] + context.offsetX) * context.scaleX;
  var y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;

  if (y1 >= y3) {
    return;
  }

  var c1r = colors[c1],
      c1g = colors[c1 + 1],
      c1b = colors[c1 + 2];
  var c2r = colors[c2],
      c2g = colors[c2 + 1],
      c2b = colors[c2 + 2];
  var c3r = colors[c3],
      c3g = colors[c3 + 1],
      c3b = colors[c3 + 2];
  var minY = Math.round(y1),
      maxY = Math.round(y3);
  var xa, car, cag, cab;
  var xb, cbr, cbg, cbb;

  for (var y = minY; y <= maxY; y++) {
    if (y < y2) {
      var _k = void 0;

      if (y < y1) {
        _k = 0;
      } else {
        _k = (y1 - y) / (y1 - y2);
      }

      xa = x1 - (x1 - x2) * _k;
      car = c1r - (c1r - c2r) * _k;
      cag = c1g - (c1g - c2g) * _k;
      cab = c1b - (c1b - c2b) * _k;
    } else {
      var _k2 = void 0;

      if (y > y3) {
        _k2 = 1;
      } else if (y2 === y3) {
        _k2 = 0;
      } else {
        _k2 = (y2 - y) / (y2 - y3);
      }

      xa = x2 - (x2 - x3) * _k2;
      car = c2r - (c2r - c3r) * _k2;
      cag = c2g - (c2g - c3g) * _k2;
      cab = c2b - (c2b - c3b) * _k2;
    }

    var k = void 0;

    if (y < y1) {
      k = 0;
    } else if (y > y3) {
      k = 1;
    } else {
      k = (y1 - y) / (y1 - y3);
    }

    xb = x1 - (x1 - x3) * k;
    cbr = c1r - (c1r - c3r) * k;
    cbg = c1g - (c1g - c3g) * k;
    cbb = c1b - (c1b - c3b) * k;
    var x1_ = Math.round(Math.min(xa, xb));
    var x2_ = Math.round(Math.max(xa, xb));
    var j = rowSize * y + x1_ * 4;

    for (var x = x1_; x <= x2_; x++) {
      k = (xa - x) / (xa - xb);

      if (k < 0) {
        k = 0;
      } else if (k > 1) {
        k = 1;
      }

      bytes[j++] = car - (car - cbr) * k | 0;
      bytes[j++] = cag - (cag - cbg) * k | 0;
      bytes[j++] = cab - (cab - cbb) * k | 0;
      bytes[j++] = 255;
    }
  }
}

function drawFigure(data, figure, context) {
  var ps = figure.coords;
  var cs = figure.colors;
  var i, ii;

  switch (figure.type) {
    case "lattice":
      var verticesPerRow = figure.verticesPerRow;
      var rows = Math.floor(ps.length / verticesPerRow) - 1;
      var cols = verticesPerRow - 1;

      for (i = 0; i < rows; i++) {
        var q = i * verticesPerRow;

        for (var j = 0; j < cols; j++, q++) {
          drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
          drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
        }
      }

      break;

    case "triangles":
      for (i = 0, ii = ps.length; i < ii; i += 3) {
        drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
      }

      break;

    default:
      throw new Error("illegal figure");
  }
}

var MeshShadingPattern = /*#__PURE__*/function (_BaseShadingPattern2) {
  _inherits(MeshShadingPattern, _BaseShadingPattern2);

  var _super2 = _createSuper(MeshShadingPattern);

  function MeshShadingPattern(IR) {
    var _this2;

    _classCallCheck(this, MeshShadingPattern);

    _this2 = _super2.call(this);
    _this2._coords = IR[2];
    _this2._colors = IR[3];
    _this2._figures = IR[4];
    _this2._bounds = IR[5];
    _this2._matrix = IR[6];
    _this2._bbox = IR[7];
    _this2._background = IR[8];
    return _this2;
  }

  _createClass(MeshShadingPattern, [{
    key: "_createMeshCanvas",
    value: function _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases) {
      var EXPECTED_SCALE = 1.1;
      var MAX_PATTERN_SIZE = 3000;
      var BORDER_SIZE = 2;
      var offsetX = Math.floor(this._bounds[0]);
      var offsetY = Math.floor(this._bounds[1]);
      var boundsWidth = Math.ceil(this._bounds[2]) - offsetX;
      var boundsHeight = Math.ceil(this._bounds[3]) - offsetY;
      var width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      var height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      var scaleX = boundsWidth / width;
      var scaleY = boundsHeight / height;
      var context = {
        coords: this._coords,
        colors: this._colors,
        offsetX: -offsetX,
        offsetY: -offsetY,
        scaleX: 1 / scaleX,
        scaleY: 1 / scaleY
      };
      var paddedWidth = width + BORDER_SIZE * 2;
      var paddedHeight = height + BORDER_SIZE * 2;
      var tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
      var tmpCtx = tmpCanvas.context;
      var data = tmpCtx.createImageData(width, height);

      if (backgroundColor) {
        var bytes = data.data;

        for (var i = 0, ii = bytes.length; i < ii; i += 4) {
          bytes[i] = backgroundColor[0];
          bytes[i + 1] = backgroundColor[1];
          bytes[i + 2] = backgroundColor[2];
          bytes[i + 3] = 255;
        }
      }

      var _iterator2 = _createForOfIteratorHelper(this._figures),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var figure = _step2.value;
          drawFigure(data, figure, context);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
      var canvas = tmpCanvas.canvas;
      return {
        canvas: canvas,
        offsetX: offsetX - BORDER_SIZE * scaleX,
        offsetY: offsetY - BORDER_SIZE * scaleY,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse) {
      var shadingFill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      applyBoundingBox(ctx, this._bbox);
      var scale;

      if (shadingFill) {
        scale = _util.Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
      } else {
        scale = _util.Util.singularValueDecompose2dScale(owner.baseTransform);

        if (this._matrix) {
          var matrixScale = _util.Util.singularValueDecompose2dScale(this._matrix);

          scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
        }
      }

      var temporaryPatternCanvas = this._createMeshCanvas(scale, shadingFill ? null : this._background, owner.cachedCanvases);

      if (!shadingFill) {
        ctx.setTransform.apply(ctx, owner.baseTransform);

        if (this._matrix) {
          ctx.transform.apply(ctx, this._matrix);
        }
      }

      ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
      ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
      return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
    }
  }]);

  return MeshShadingPattern;
}(BaseShadingPattern);

var DummyShadingPattern = /*#__PURE__*/function (_BaseShadingPattern3) {
  _inherits(DummyShadingPattern, _BaseShadingPattern3);

  var _super3 = _createSuper(DummyShadingPattern);

  function DummyShadingPattern() {
    _classCallCheck(this, DummyShadingPattern);

    return _super3.apply(this, arguments);
  }

  _createClass(DummyShadingPattern, [{
    key: "getPattern",
    value: function getPattern() {
      return "hotpink";
    }
  }]);

  return DummyShadingPattern;
}(BaseShadingPattern);

function getShadingPattern(IR) {
  switch (IR[0]) {
    case "RadialAxial":
      return new RadialAxialShadingPattern(IR);

    case "Mesh":
      return new MeshShadingPattern(IR);

    case "Dummy":
      return new DummyShadingPattern();
  }

  throw new Error("Unknown IR type: ".concat(IR[0]));
}

var PaintType = {
  COLORED: 1,
  UNCOLORED: 2
};

var TilingPattern = /*#__PURE__*/function () {
  function TilingPattern(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
    _classCallCheck(this, TilingPattern);

    this.operatorList = IR[2];
    this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];
    this.bbox = IR[4];
    this.xstep = IR[5];
    this.ystep = IR[6];
    this.paintType = IR[7];
    this.tilingType = IR[8];
    this.color = color;
    this.ctx = ctx;
    this.canvasGraphicsFactory = canvasGraphicsFactory;
    this.baseTransform = baseTransform;
  }

  _createClass(TilingPattern, [{
    key: "createPatternCanvas",
    value: function createPatternCanvas(owner) {
      var operatorList = this.operatorList;
      var bbox = this.bbox;
      var xstep = this.xstep;
      var ystep = this.ystep;
      var paintType = this.paintType;
      var tilingType = this.tilingType;
      var color = this.color;
      var canvasGraphicsFactory = this.canvasGraphicsFactory;
      (0, _util.info)("TilingType: " + tilingType);
      var x0 = bbox[0],
          y0 = bbox[1],
          x1 = bbox[2],
          y1 = bbox[3];

      var matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

      var curMatrixScale = _util.Util.singularValueDecompose2dScale(this.baseTransform);

      var combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
      var dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
      var dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
      var tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
      var tmpCtx = tmpCanvas.context;
      var graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
      graphics.groupLevel = owner.groupLevel;
      this.setFillAndStrokeStyleToContext(graphics, paintType, color);
      var adjustedX0 = x0;
      var adjustedY0 = y0;
      var adjustedX1 = x1;
      var adjustedY1 = y1;

      if (x0 < 0) {
        adjustedX0 = 0;
        adjustedX1 += Math.abs(x0);
      }

      if (y0 < 0) {
        adjustedY0 = 0;
        adjustedY1 += Math.abs(y0);
      }

      tmpCtx.translate(-(dimx.scale * adjustedX0), -(dimy.scale * adjustedY0));
      graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
      this.clipBbox(graphics, adjustedX0, adjustedY0, adjustedX1, adjustedY1);
      graphics.baseTransform = graphics.ctx.mozCurrentTransform.slice();
      graphics.executeOperatorList(operatorList);
      graphics.endDrawing();
      return {
        canvas: tmpCanvas.canvas,
        scaleX: dimx.scale,
        scaleY: dimy.scale,
        offsetX: adjustedX0,
        offsetY: adjustedY0
      };
    }
  }, {
    key: "getSizeAndScale",
    value: function getSizeAndScale(step, realOutputSize, scale) {
      step = Math.abs(step);
      var maxSize = Math.max(TilingPattern.MAX_PATTERN_SIZE, realOutputSize);
      var size = Math.ceil(step * scale);

      if (size >= maxSize) {
        size = maxSize;
      } else {
        scale = size / step;
      }

      return {
        scale: scale,
        size: size
      };
    }
  }, {
    key: "clipBbox",
    value: function clipBbox(graphics, x0, y0, x1, y1) {
      var bboxWidth = x1 - x0;
      var bboxHeight = y1 - y0;
      graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
      graphics.clip();
      graphics.endPath();
    }
  }, {
    key: "setFillAndStrokeStyleToContext",
    value: function setFillAndStrokeStyleToContext(graphics, paintType, color) {
      var context = graphics.ctx,
          current = graphics.current;

      switch (paintType) {
        case PaintType.COLORED:
          var ctx = this.ctx;
          context.fillStyle = ctx.fillStyle;
          context.strokeStyle = ctx.strokeStyle;
          current.fillColor = ctx.fillStyle;
          current.strokeColor = ctx.strokeStyle;
          break;

        case PaintType.UNCOLORED:
          var cssColor = _util.Util.makeHexColor(color[0], color[1], color[2]);

          context.fillStyle = cssColor;
          context.strokeStyle = cssColor;
          current.fillColor = cssColor;
          current.strokeColor = cssColor;
          break;

        default:
          throw new _util.FormatError("Unsupported paint type: ".concat(paintType));
      }
    }
  }, {
    key: "getPattern",
    value: function getPattern(ctx, owner, inverse) {
      var shadingFill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var matrix = inverse;

      if (!shadingFill) {
        matrix = _util.Util.transform(matrix, owner.baseTransform);

        if (this.matrix) {
          matrix = _util.Util.transform(matrix, this.matrix);
        }
      }

      var temporaryPatternCanvas = this.createPatternCanvas(owner);
      var domMatrix = new DOMMatrix(matrix);
      domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
      domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY);
      var pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat");

      try {
        pattern.setTransform(domMatrix);
      } catch (ex) {
        (0, _util.warn)("TilingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
      }

      return pattern;
    }
  }], [{
    key: "MAX_PATTERN_SIZE",
    get: function get() {
      return (0, _util.shadow)(this, "MAX_PATTERN_SIZE", 3000);
    }
  }]);

  return TilingPattern;
}();

exports.TilingPattern = TilingPattern;

/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GlobalWorkerOptions = void 0;
var GlobalWorkerOptions = Object.create(null);
exports.GlobalWorkerOptions = GlobalWorkerOptions;
GlobalWorkerOptions.workerPort = GlobalWorkerOptions.workerPort === undefined ? null : GlobalWorkerOptions.workerPort;
GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc === undefined ? "" : GlobalWorkerOptions.workerSrc;

/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MessageHandler = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var CallbackKind = {
  UNKNOWN: 0,
  DATA: 1,
  ERROR: 2
};
var StreamKind = {
  UNKNOWN: 0,
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
};

function wrapReason(reason) {
  if (_typeof(reason) !== "object" || reason === null) {
    return reason;
  }

  switch (reason.name) {
    case "AbortException":
      return new _util.AbortException(reason.message);

    case "MissingPDFException":
      return new _util.MissingPDFException(reason.message);

    case "UnexpectedResponseException":
      return new _util.UnexpectedResponseException(reason.message, reason.status);

    case "UnknownErrorException":
      return new _util.UnknownErrorException(reason.message, reason.details);

    default:
      return new _util.UnknownErrorException(reason.message, reason.toString());
  }
}

var MessageHandler = /*#__PURE__*/function () {
  function MessageHandler(sourceName, targetName, comObj) {
    var _this = this;

    _classCallCheck(this, MessageHandler);

    this.sourceName = sourceName;
    this.targetName = targetName;
    this.comObj = comObj;
    this.callbackId = 1;
    this.streamId = 1;
    this.postMessageTransfers = true;
    this.streamSinks = Object.create(null);
    this.streamControllers = Object.create(null);
    this.callbackCapabilities = Object.create(null);
    this.actionHandler = Object.create(null);

    this._onComObjOnMessage = function (event) {
      var data = event.data;

      if (data.targetName !== _this.sourceName) {
        return;
      }

      if (data.stream) {
        _this._processStreamMessage(data);

        return;
      }

      if (data.callback) {
        var callbackId = data.callbackId;
        var capability = _this.callbackCapabilities[callbackId];

        if (!capability) {
          throw new Error("Cannot resolve callback ".concat(callbackId));
        }

        delete _this.callbackCapabilities[callbackId];

        if (data.callback === CallbackKind.DATA) {
          capability.resolve(data.data);
        } else if (data.callback === CallbackKind.ERROR) {
          capability.reject(wrapReason(data.reason));
        } else {
          throw new Error("Unexpected callback case");
        }

        return;
      }

      var action = _this.actionHandler[data.action];

      if (!action) {
        throw new Error("Unknown action from worker: ".concat(data.action));
      }

      if (data.callbackId) {
        var cbSourceName = _this.sourceName;
        var cbTargetName = data.sourceName;
        new Promise(function (resolve) {
          resolve(action(data.data));
        }).then(function (result) {
          comObj.postMessage({
            sourceName: cbSourceName,
            targetName: cbTargetName,
            callback: CallbackKind.DATA,
            callbackId: data.callbackId,
            data: result
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName: cbSourceName,
            targetName: cbTargetName,
            callback: CallbackKind.ERROR,
            callbackId: data.callbackId,
            reason: wrapReason(reason)
          });
        });
        return;
      }

      if (data.streamId) {
        _this._createStreamSink(data);

        return;
      }

      action(data.data);
    };

    comObj.addEventListener("message", this._onComObjOnMessage);
  }

  _createClass(MessageHandler, [{
    key: "on",
    value: function on(actionName, handler) {
      var ah = this.actionHandler;

      if (ah[actionName]) {
        throw new Error("There is already an actionName called \"".concat(actionName, "\""));
      }

      ah[actionName] = handler;
    }
  }, {
    key: "send",
    value: function send(actionName, data, transfers) {
      this._postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        data: data
      }, transfers);
    }
  }, {
    key: "sendWithPromise",
    value: function sendWithPromise(actionName, data, transfers) {
      var callbackId = this.callbackId++;
      var capability = (0, _util.createPromiseCapability)();
      this.callbackCapabilities[callbackId] = capability;

      try {
        this._postMessage({
          sourceName: this.sourceName,
          targetName: this.targetName,
          action: actionName,
          callbackId: callbackId,
          data: data
        }, transfers);
      } catch (ex) {
        capability.reject(ex);
      }

      return capability.promise;
    }
  }, {
    key: "sendWithStream",
    value: function sendWithStream(actionName, data, queueingStrategy, transfers) {
      var _this2 = this;

      var streamId = this.streamId++;
      var sourceName = this.sourceName;
      var targetName = this.targetName;
      var comObj = this.comObj;
      return new ReadableStream({
        start: function start(controller) {
          var startCapability = (0, _util.createPromiseCapability)();
          _this2.streamControllers[streamId] = {
            controller: controller,
            startCall: startCapability,
            pullCall: null,
            cancelCall: null,
            isClosed: false
          };

          _this2._postMessage({
            sourceName: sourceName,
            targetName: targetName,
            action: actionName,
            streamId: streamId,
            data: data,
            desiredSize: controller.desiredSize
          }, transfers);

          return startCapability.promise;
        },
        pull: function pull(controller) {
          var pullCapability = (0, _util.createPromiseCapability)();
          _this2.streamControllers[streamId].pullCall = pullCapability;
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.PULL,
            streamId: streamId,
            desiredSize: controller.desiredSize
          });
          return pullCapability.promise;
        },
        cancel: function cancel(reason) {
          (0, _util.assert)(reason instanceof Error, "cancel must have a valid reason");
          var cancelCapability = (0, _util.createPromiseCapability)();
          _this2.streamControllers[streamId].cancelCall = cancelCapability;
          _this2.streamControllers[streamId].isClosed = true;
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.CANCEL,
            streamId: streamId,
            reason: wrapReason(reason)
          });
          return cancelCapability.promise;
        }
      }, queueingStrategy);
    }
  }, {
    key: "_createStreamSink",
    value: function _createStreamSink(data) {
      var self = this;
      var action = this.actionHandler[data.action];
      var streamId = data.streamId;
      var sourceName = this.sourceName;
      var targetName = data.sourceName;
      var comObj = this.comObj;
      var streamSink = {
        enqueue: function enqueue(chunk) {
          var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var transfers = arguments.length > 2 ? arguments[2] : undefined;

          if (this.isCancelled) {
            return;
          }

          var lastDesiredSize = this.desiredSize;
          this.desiredSize -= size;

          if (lastDesiredSize > 0 && this.desiredSize <= 0) {
            this.sinkCapability = (0, _util.createPromiseCapability)();
            this.ready = this.sinkCapability.promise;
          }

          self._postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.ENQUEUE,
            streamId: streamId,
            chunk: chunk
          }, transfers);
        },
        close: function close() {
          if (this.isCancelled) {
            return;
          }

          this.isCancelled = true;
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.CLOSE,
            streamId: streamId
          });
          delete self.streamSinks[streamId];
        },
        error: function error(reason) {
          (0, _util.assert)(reason instanceof Error, "error must have a valid reason");

          if (this.isCancelled) {
            return;
          }

          this.isCancelled = true;
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.ERROR,
            streamId: streamId,
            reason: wrapReason(reason)
          });
        },
        sinkCapability: (0, _util.createPromiseCapability)(),
        onPull: null,
        onCancel: null,
        isCancelled: false,
        desiredSize: data.desiredSize,
        ready: null
      };
      streamSink.sinkCapability.resolve();
      streamSink.ready = streamSink.sinkCapability.promise;
      this.streamSinks[streamId] = streamSink;
      new Promise(function (resolve) {
        resolve(action(data.data, streamSink));
      }).then(function () {
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.START_COMPLETE,
          streamId: streamId,
          success: true
        });
      }, function (reason) {
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.START_COMPLETE,
          streamId: streamId,
          reason: wrapReason(reason)
        });
      });
    }
  }, {
    key: "_processStreamMessage",
    value: function _processStreamMessage(data) {
      var streamId = data.streamId;
      var sourceName = this.sourceName;
      var targetName = data.sourceName;
      var comObj = this.comObj;

      switch (data.stream) {
        case StreamKind.START_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].startCall.resolve();
          } else {
            this.streamControllers[streamId].startCall.reject(wrapReason(data.reason));
          }

          break;

        case StreamKind.PULL_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].pullCall.resolve();
          } else {
            this.streamControllers[streamId].pullCall.reject(wrapReason(data.reason));
          }

          break;

        case StreamKind.PULL:
          if (!this.streamSinks[streamId]) {
            comObj.postMessage({
              sourceName: sourceName,
              targetName: targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId: streamId,
              success: true
            });
            break;
          }

          if (this.streamSinks[streamId].desiredSize <= 0 && data.desiredSize > 0) {
            this.streamSinks[streamId].sinkCapability.resolve();
          }

          this.streamSinks[streamId].desiredSize = data.desiredSize;
          var onPull = this.streamSinks[data.streamId].onPull;
          new Promise(function (resolve) {
            resolve(onPull && onPull());
          }).then(function () {
            comObj.postMessage({
              sourceName: sourceName,
              targetName: targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId: streamId,
              success: true
            });
          }, function (reason) {
            comObj.postMessage({
              sourceName: sourceName,
              targetName: targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId: streamId,
              reason: wrapReason(reason)
            });
          });
          break;

        case StreamKind.ENQUEUE:
          (0, _util.assert)(this.streamControllers[streamId], "enqueue should have stream controller");

          if (this.streamControllers[streamId].isClosed) {
            break;
          }

          this.streamControllers[streamId].controller.enqueue(data.chunk);
          break;

        case StreamKind.CLOSE:
          (0, _util.assert)(this.streamControllers[streamId], "close should have stream controller");

          if (this.streamControllers[streamId].isClosed) {
            break;
          }

          this.streamControllers[streamId].isClosed = true;
          this.streamControllers[streamId].controller.close();

          this._deleteStreamController(streamId);

          break;

        case StreamKind.ERROR:
          (0, _util.assert)(this.streamControllers[streamId], "error should have stream controller");
          this.streamControllers[streamId].controller.error(wrapReason(data.reason));

          this._deleteStreamController(streamId);

          break;

        case StreamKind.CANCEL_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].cancelCall.resolve();
          } else {
            this.streamControllers[streamId].cancelCall.reject(wrapReason(data.reason));
          }

          this._deleteStreamController(streamId);

          break;

        case StreamKind.CANCEL:
          if (!this.streamSinks[streamId]) {
            break;
          }

          var onCancel = this.streamSinks[data.streamId].onCancel;
          new Promise(function (resolve) {
            resolve(onCancel && onCancel(wrapReason(data.reason)));
          }).then(function () {
            comObj.postMessage({
              sourceName: sourceName,
              targetName: targetName,
              stream: StreamKind.CANCEL_COMPLETE,
              streamId: streamId,
              success: true
            });
          }, function (reason) {
            comObj.postMessage({
              sourceName: sourceName,
              targetName: targetName,
              stream: StreamKind.CANCEL_COMPLETE,
              streamId: streamId,
              reason: wrapReason(reason)
            });
          })["catch"](function (reason) {
            console.log("Caught an error of the worker thread: " + reason);
          });
          this.streamSinks[streamId].sinkCapability.reject(wrapReason(data.reason));
          this.streamSinks[streamId].isCancelled = true;
          delete this.streamSinks[streamId];
          break;

        default:
          throw new Error("Unexpected stream case");
      }
    }
  }, {
    key: "_deleteStreamController",
    value: function () {
      var _deleteStreamController2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(streamId) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.allSettled([this.streamControllers[streamId].startCall, this.streamControllers[streamId].pullCall, this.streamControllers[streamId].cancelCall].map(function (capability) {
                  return capability && capability.promise;
                }));

              case 2:
                delete this.streamControllers[streamId];

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _deleteStreamController(_x) {
        return _deleteStreamController2.apply(this, arguments);
      }

      return _deleteStreamController;
    }()
  }, {
    key: "_postMessage",
    value: function _postMessage(message, transfers) {
      if (transfers && this.postMessageTransfers) {
        this.comObj.postMessage(message, transfers);
      } else {
        this.comObj.postMessage(message);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.comObj.removeEventListener("message", this._onComObjOnMessage);
    }
  }]);

  return MessageHandler;
}();

exports.MessageHandler = MessageHandler;

/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Metadata = void 0;

var _util = __w_pdfjs_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Metadata = /*#__PURE__*/function () {
  function Metadata(_ref) {
    var parsedData = _ref.parsedData,
        rawData = _ref.rawData;

    _classCallCheck(this, Metadata);

    this._metadataMap = parsedData;
    this._data = rawData;
  }

  _createClass(Metadata, [{
    key: "getRaw",
    value: function getRaw() {
      return this._data;
    }
  }, {
    key: "get",
    value: function get(name) {
      var _this$_metadataMap$ge;

      return (_this$_metadataMap$ge = this._metadataMap.get(name)) !== null && _this$_metadataMap$ge !== void 0 ? _this$_metadataMap$ge : null;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return (0, _util.objectFromMap)(this._metadataMap);
    }
  }, {
    key: "has",
    value: function has(name) {
      return this._metadataMap.has(name);
    }
  }]);

  return Metadata;
}();

exports.Metadata = Metadata;

/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionalContentConfig = void 0;

var _util = __w_pdfjs_require__(4);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionalContentGroup = function OptionalContentGroup(name, intent) {
  _classCallCheck(this, OptionalContentGroup);

  this.visible = true;
  this.name = name;
  this.intent = intent;
};

var OptionalContentConfig = /*#__PURE__*/function () {
  function OptionalContentConfig(data) {
    _classCallCheck(this, OptionalContentConfig);

    this.name = null;
    this.creator = null;
    this._order = null;
    this._groups = new Map();

    if (data === null) {
      return;
    }

    this.name = data.name;
    this.creator = data.creator;
    this._order = data.order;

    var _iterator = _createForOfIteratorHelper(data.groups),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _group = _step.value;

        this._groups.set(_group.id, new OptionalContentGroup(_group.name, _group.intent));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (data.baseState === "OFF") {
      var _iterator2 = _createForOfIteratorHelper(this._groups),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var group = _step2.value;
          group.visible = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    var _iterator3 = _createForOfIteratorHelper(data.on),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var on = _step3.value;
        this._groups.get(on).visible = true;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = _createForOfIteratorHelper(data.off),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var off = _step4.value;
        this._groups.get(off).visible = false;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  _createClass(OptionalContentConfig, [{
    key: "_evaluateVisibilityExpression",
    value: function _evaluateVisibilityExpression(array) {
      var length = array.length;

      if (length < 2) {
        return true;
      }

      var operator = array[0];

      for (var i = 1; i < length; i++) {
        var element = array[i];
        var state = void 0;

        if (Array.isArray(element)) {
          state = this._evaluateVisibilityExpression(element);
        } else if (this._groups.has(element)) {
          state = this._groups.get(element).visible;
        } else {
          (0, _util.warn)("Optional content group not found: ".concat(element));
          return true;
        }

        switch (operator) {
          case "And":
            if (!state) {
              return false;
            }

            break;

          case "Or":
            if (state) {
              return true;
            }

            break;

          case "Not":
            return !state;

          default:
            return true;
        }
      }

      return operator === "And";
    }
  }, {
    key: "isVisible",
    value: function isVisible(group) {
      if (group.type === "OCG") {
        if (!this._groups.has(group.id)) {
          (0, _util.warn)("Optional content group not found: ".concat(group.id));
          return true;
        }

        return this._groups.get(group.id).visible;
      } else if (group.type === "OCMD") {
        if (group.expression) {
          return this._evaluateVisibilityExpression(group.expression);
        }

        if (!group.policy || group.policy === "AnyOn") {
          var _iterator5 = _createForOfIteratorHelper(group.ids),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var id = _step5.value;

              if (!this._groups.has(id)) {
                (0, _util.warn)("Optional content group not found: ".concat(id));
                return true;
              }

              if (this._groups.get(id).visible) {
                return true;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          return false;
        } else if (group.policy === "AllOn") {
          var _iterator6 = _createForOfIteratorHelper(group.ids),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _id = _step6.value;

              if (!this._groups.has(_id)) {
                (0, _util.warn)("Optional content group not found: ".concat(_id));
                return true;
              }

              if (!this._groups.get(_id).visible) {
                return false;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          return true;
        } else if (group.policy === "AnyOff") {
          var _iterator7 = _createForOfIteratorHelper(group.ids),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _id2 = _step7.value;

              if (!this._groups.has(_id2)) {
                (0, _util.warn)("Optional content group not found: ".concat(_id2));
                return true;
              }

              if (!this._groups.get(_id2).visible) {
                return true;
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          return false;
        } else if (group.policy === "AllOff") {
          var _iterator8 = _createForOfIteratorHelper(group.ids),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _id3 = _step8.value;

              if (!this._groups.has(_id3)) {
                (0, _util.warn)("Optional content group not found: ".concat(_id3));
                return true;
              }

              if (this._groups.get(_id3).visible) {
                return false;
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }

          return true;
        }

        (0, _util.warn)("Unknown optional content policy ".concat(group.policy, "."));
        return true;
      }

      (0, _util.warn)("Unknown group type ".concat(group.type, "."));
      return true;
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(id) {
      var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this._groups.has(id)) {
        (0, _util.warn)("Optional content group not found: ".concat(id));
        return;
      }

      this._groups.get(id).visible = !!visible;
    }
  }, {
    key: "getOrder",
    value: function getOrder() {
      if (!this._groups.size) {
        return null;
      }

      if (this._order) {
        return this._order.slice();
      }

      return Array.from(this._groups.keys());
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      return this._groups.size > 0 ? (0, _util.objectFromMap)(this._groups) : null;
    }
  }, {
    key: "getGroup",
    value: function getGroup(id) {
      return this._groups.get(id) || null;
    }
  }]);

  return OptionalContentConfig;
}();

exports.OptionalContentConfig = OptionalContentConfig;

/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFDataTransportStream = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _display_utils = __w_pdfjs_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFDataTransportStream = /*#__PURE__*/function () {
  function PDFDataTransportStream(params, pdfDataRangeTransport) {
    var _this = this;

    _classCallCheck(this, PDFDataTransportStream);

    (0, _util.assert)(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
    this._queuedChunks = [];
    this._progressiveDone = params.progressiveDone || false;
    this._contentDispositionFilename = params.contentDispositionFilename || null;
    var initialData = params.initialData;

    if ((initialData === null || initialData === void 0 ? void 0 : initialData.length) > 0) {
      var buffer = new Uint8Array(initialData).buffer;

      this._queuedChunks.push(buffer);
    }

    this._pdfDataRangeTransport = pdfDataRangeTransport;
    this._isStreamingSupported = !params.disableStream;
    this._isRangeSupported = !params.disableRange;
    this._contentLength = params.length;
    this._fullRequestReader = null;
    this._rangeReaders = [];

    this._pdfDataRangeTransport.addRangeListener(function (begin, chunk) {
      _this._onReceiveData({
        begin: begin,
        chunk: chunk
      });
    });

    this._pdfDataRangeTransport.addProgressListener(function (loaded, total) {
      _this._onProgress({
        loaded: loaded,
        total: total
      });
    });

    this._pdfDataRangeTransport.addProgressiveReadListener(function (chunk) {
      _this._onReceiveData({
        chunk: chunk
      });
    });

    this._pdfDataRangeTransport.addProgressiveDoneListener(function () {
      _this._onProgressiveDone();
    });

    this._pdfDataRangeTransport.transportReady();
  }

  _createClass(PDFDataTransportStream, [{
    key: "_onReceiveData",
    value: function _onReceiveData(args) {
      var buffer = new Uint8Array(args.chunk).buffer;

      if (args.begin === undefined) {
        if (this._fullRequestReader) {
          this._fullRequestReader._enqueue(buffer);
        } else {
          this._queuedChunks.push(buffer);
        }
      } else {
        var found = this._rangeReaders.some(function (rangeReader) {
          if (rangeReader._begin !== args.begin) {
            return false;
          }

          rangeReader._enqueue(buffer);

          return true;
        });

        (0, _util.assert)(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
      }
    }
  }, {
    key: "_progressiveDataLength",
    get: function get() {
      var _this$_fullRequestRea, _this$_fullRequestRea2;

      return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
    }
  }, {
    key: "_onProgress",
    value: function _onProgress(evt) {
      if (evt.total === undefined) {
        var firstReader = this._rangeReaders[0];

        if (firstReader !== null && firstReader !== void 0 && firstReader.onProgress) {
          firstReader.onProgress({
            loaded: evt.loaded
          });
        }
      } else {
        var fullReader = this._fullRequestReader;

        if (fullReader !== null && fullReader !== void 0 && fullReader.onProgress) {
          fullReader.onProgress({
            loaded: evt.loaded,
            total: evt.total
          });
        }
      }
    }
  }, {
    key: "_onProgressiveDone",
    value: function _onProgressiveDone() {
      if (this._fullRequestReader) {
        this._fullRequestReader.progressiveDone();
      }

      this._progressiveDone = true;
    }
  }, {
    key: "_removeRangeReader",
    value: function _removeRangeReader(reader) {
      var i = this._rangeReaders.indexOf(reader);

      if (i >= 0) {
        this._rangeReaders.splice(i, 1);
      }
    }
  }, {
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
      var queuedChunks = this._queuedChunks;
      this._queuedChunks = null;
      return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename);
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(begin, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      var reader = new PDFDataTransportStreamRangeReader(this, begin, end);

      this._pdfDataRangeTransport.requestDataRange(begin, end);

      this._rangeReaders.push(reader);

      return reader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var _iterator = _createForOfIteratorHelper(this._rangeReaders.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reader = _step.value;
          reader.cancel(reason);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._pdfDataRangeTransport.abort();
    }
  }]);

  return PDFDataTransportStream;
}();

exports.PDFDataTransportStream = PDFDataTransportStream;

var PDFDataTransportStreamReader = /*#__PURE__*/function () {
  function PDFDataTransportStreamReader(stream, queuedChunks) {
    var progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PDFDataTransportStreamReader);

    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = (0, _display_utils.isPdfFile)(contentDispositionFilename) ? contentDispositionFilename : null;
    this._queuedChunks = queuedChunks || [];
    this._loaded = 0;

    var _iterator2 = _createForOfIteratorHelper(this._queuedChunks),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var chunk = _step2.value;
        this._loaded += chunk.byteLength;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this._requests = [];
    this._headersReady = Promise.resolve();
    stream._fullRequestReader = this;
    this.onProgress = null;
  }

  _createClass(PDFDataTransportStreamReader, [{
    key: "_enqueue",
    value: function _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length > 0) {
        var requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: chunk,
          done: false
        });
      } else {
        this._queuedChunks.push(chunk);
      }

      this._loaded += chunk.byteLength;
    }
  }, {
    key: "headersReady",
    get: function get() {
      return this._headersReady;
    }
  }, {
    key: "filename",
    get: function get() {
      return this._filename;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._stream._isRangeSupported;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._stream._isStreamingSupported;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._stream._contentLength;
    }
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._queuedChunks.length > 0)) {
                  _context.next = 3;
                  break;
                }

                chunk = this._queuedChunks.shift();
                return _context.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 3:
                if (!this._done) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 5:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context.abrupt("return", requestCapability.promise);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      var _iterator3 = _createForOfIteratorHelper(this._requests),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var requestCapability = _step3.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._requests.length = 0;
    }
  }, {
    key: "progressiveDone",
    value: function progressiveDone() {
      if (this._done) {
        return;
      }

      this._done = true;
    }
  }]);

  return PDFDataTransportStreamReader;
}();

var PDFDataTransportStreamRangeReader = /*#__PURE__*/function () {
  function PDFDataTransportStreamRangeReader(stream, begin, end) {
    _classCallCheck(this, PDFDataTransportStreamRangeReader);

    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  }

  _createClass(PDFDataTransportStreamRangeReader, [{
    key: "_enqueue",
    value: function _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length === 0) {
        this._queuedChunk = chunk;
      } else {
        var requestsCapability = this._requests.shift();

        requestsCapability.resolve({
          value: chunk,
          done: false
        });

        var _iterator4 = _createForOfIteratorHelper(this._requests),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var requestCapability = _step4.value;
            requestCapability.resolve({
              value: undefined,
              done: true
            });
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        this._requests.length = 0;
      }

      this._done = true;

      this._stream._removeRangeReader(this);
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return false;
    }
  }, {
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._queuedChunk) {
                  _context2.next = 4;
                  break;
                }

                chunk = this._queuedChunk;
                this._queuedChunk = null;
                return _context2.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 4:
                if (!this._done) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 6:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context2.abrupt("return", requestCapability.promise);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      var _iterator5 = _createForOfIteratorHelper(this._requests),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var requestCapability = _step5.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this._requests.length = 0;

      this._stream._removeRangeReader(this);
    }
  }]);

  return PDFDataTransportStreamRangeReader;
}();

/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnnotationLayer = void 0;

var _display_utils = __w_pdfjs_require__(1);

var _util = __w_pdfjs_require__(4);

var _annotation_storage = __w_pdfjs_require__(121);

var _scripting_utils = __w_pdfjs_require__(130);

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationElementFactory = /*#__PURE__*/function () {
  function AnnotationElementFactory() {
    _classCallCheck(this, AnnotationElementFactory);
  }

  _createClass(AnnotationElementFactory, null, [{
    key: "create",
    value: function create(parameters) {
      var subtype = parameters.data.annotationType;

      switch (subtype) {
        case _util.AnnotationType.LINK:
          return new LinkAnnotationElement(parameters);

        case _util.AnnotationType.TEXT:
          return new TextAnnotationElement(parameters);

        case _util.AnnotationType.WIDGET:
          var fieldType = parameters.data.fieldType;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotationElement(parameters);

            case "Btn":
              if (parameters.data.radioButton) {
                return new RadioButtonWidgetAnnotationElement(parameters);
              } else if (parameters.data.checkBox) {
                return new CheckboxWidgetAnnotationElement(parameters);
              }

              return new PushButtonWidgetAnnotationElement(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotationElement(parameters);
          }

          return new WidgetAnnotationElement(parameters);

        case _util.AnnotationType.POPUP:
          return new PopupAnnotationElement(parameters);

        case _util.AnnotationType.FREETEXT:
          return new FreeTextAnnotationElement(parameters);

        case _util.AnnotationType.LINE:
          return new LineAnnotationElement(parameters);

        case _util.AnnotationType.SQUARE:
          return new SquareAnnotationElement(parameters);

        case _util.AnnotationType.CIRCLE:
          return new CircleAnnotationElement(parameters);

        case _util.AnnotationType.POLYLINE:
          return new PolylineAnnotationElement(parameters);

        case _util.AnnotationType.CARET:
          return new CaretAnnotationElement(parameters);

        case _util.AnnotationType.INK:
          return new InkAnnotationElement(parameters);

        case _util.AnnotationType.POLYGON:
          return new PolygonAnnotationElement(parameters);

        case _util.AnnotationType.HIGHLIGHT:
          return new HighlightAnnotationElement(parameters);

        case _util.AnnotationType.UNDERLINE:
          return new UnderlineAnnotationElement(parameters);

        case _util.AnnotationType.SQUIGGLY:
          return new SquigglyAnnotationElement(parameters);

        case _util.AnnotationType.STRIKEOUT:
          return new StrikeOutAnnotationElement(parameters);

        case _util.AnnotationType.STAMP:
          return new StampAnnotationElement(parameters);

        case _util.AnnotationType.FILEATTACHMENT:
          return new FileAttachmentAnnotationElement(parameters);

        default:
          return new AnnotationElement(parameters);
      }
    }
  }]);

  return AnnotationElementFactory;
}();

var AnnotationElement = /*#__PURE__*/function () {
  function AnnotationElement(parameters) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isRenderable = _ref.isRenderable,
        isRenderable = _ref$isRenderable === void 0 ? false : _ref$isRenderable,
        _ref$ignoreBorder = _ref.ignoreBorder,
        ignoreBorder = _ref$ignoreBorder === void 0 ? false : _ref$ignoreBorder,
        _ref$createQuadrilate = _ref.createQuadrilaterals,
        createQuadrilaterals = _ref$createQuadrilate === void 0 ? false : _ref$createQuadrilate;

    _classCallCheck(this, AnnotationElement);

    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderInteractiveForms = parameters.renderInteractiveForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._mouseState = parameters.mouseState;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }

    if (createQuadrilaterals) {
      this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
    }
  }

  _createClass(AnnotationElement, [{
    key: "_createContainer",
    value: function _createContainer() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var data = this.data,
          page = this.page,
          viewport = this.viewport;
      var container = document.createElement("section");
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      container.setAttribute("data-annotation-id", data.id);

      var rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

      container.style.transform = "matrix(".concat(viewport.transform.join(","), ")");
      container.style.transformOrigin = "".concat(-rect[0], "px ").concat(-rect[1], "px");

      if (!ignoreBorder && data.borderStyle.width > 0) {
        container.style.borderWidth = "".concat(data.borderStyle.width, "px");

        if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
          width -= 2 * data.borderStyle.width;
          height -= 2 * data.borderStyle.width;
        }

        var horizontalRadius = data.borderStyle.horizontalCornerRadius;
        var verticalRadius = data.borderStyle.verticalCornerRadius;

        if (horizontalRadius > 0 || verticalRadius > 0) {
          var radius = "".concat(horizontalRadius, "px / ").concat(verticalRadius, "px");
          container.style.borderRadius = radius;
        }

        switch (data.borderStyle.style) {
          case _util.AnnotationBorderStyleType.SOLID:
            container.style.borderStyle = "solid";
            break;

          case _util.AnnotationBorderStyleType.DASHED:
            container.style.borderStyle = "dashed";
            break;

          case _util.AnnotationBorderStyleType.BEVELED:
            (0, _util.warn)("Unimplemented border style: beveled");
            break;

          case _util.AnnotationBorderStyleType.INSET:
            (0, _util.warn)("Unimplemented border style: inset");
            break;

          case _util.AnnotationBorderStyleType.UNDERLINE:
            container.style.borderBottomStyle = "solid";
            break;

          default:
            break;
        }

        if (data.color) {
          container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
        } else {
          container.style.borderWidth = 0;
        }
      }

      container.style.left = "".concat(rect[0], "px");
      container.style.top = "".concat(rect[1], "px");
      container.style.width = "".concat(width, "px");
      container.style.height = "".concat(height, "px");
      return container;
    }
  }, {
    key: "_createQuadrilaterals",
    value: function _createQuadrilaterals() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.data.quadPoints) {
        return null;
      }

      var quadrilaterals = [];
      var savedRect = this.data.rect;

      var _iterator = _createForOfIteratorHelper(this.data.quadPoints),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var quadPoint = _step.value;
          this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
          quadrilaterals.push(this._createContainer(ignoreBorder));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.data.rect = savedRect;
      return quadrilaterals;
    }
  }, {
    key: "_createPopup",
    value: function _createPopup(trigger, data) {
      var container = this.container;

      if (this.quadrilaterals) {
        trigger = trigger || this.quadrilaterals;
        container = this.quadrilaterals[0];
      }

      if (!trigger) {
        trigger = document.createElement("div");
        trigger.style.height = container.style.height;
        trigger.style.width = container.style.width;
        container.appendChild(trigger);
      }

      var popupElement = new PopupElement({
        container: container,
        trigger: trigger,
        color: data.color,
        title: data.title,
        modificationDate: data.modificationDate,
        contents: data.contents,
        hideWrapper: true
      });
      var popup = popupElement.render();
      popup.style.left = container.style.width;
      container.appendChild(popup);
    }
  }, {
    key: "_renderQuadrilaterals",
    value: function _renderQuadrilaterals(className) {
      var _iterator2 = _createForOfIteratorHelper(this.quadrilaterals),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var quadrilateral = _step2.value;
          quadrilateral.className = className;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return this.quadrilaterals;
    }
  }, {
    key: "render",
    value: function render() {
      (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
    }
  }]);

  return AnnotationElement;
}();

var LinkAnnotationElement = /*#__PURE__*/function (_AnnotationElement) {
  _inherits(LinkAnnotationElement, _AnnotationElement);

  var _super = _createSuper(LinkAnnotationElement);

  function LinkAnnotationElement(parameters) {
    _classCallCheck(this, LinkAnnotationElement);

    var isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
    return _super.call(this, parameters, {
      isRenderable: isRenderable,
      createQuadrilaterals: true
    });
  }

  _createClass(LinkAnnotationElement, [{
    key: "render",
    value: function render() {
      var data = this.data,
          linkService = this.linkService;
      var link = document.createElement("a");

      if (data.url) {
        (0, _display_utils.addLinkAttributes)(link, {
          url: data.url,
          target: data.newWindow ? _display_utils.LinkTarget.BLANK : linkService.externalLinkTarget,
          rel: linkService.externalLinkRel,
          enabled: linkService.externalLinkEnabled
        });
      } else if (data.action) {
        this._bindNamedAction(link, data.action);
      } else if (data.dest) {
        this._bindLink(link, data.dest);
      } else if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
        this._bindJSAction(link, data);
      } else {
        this._bindLink(link, "");
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("linkAnnotation").map(function (quadrilateral, index) {
          var linkElement = index === 0 ? link : link.cloneNode();
          quadrilateral.appendChild(linkElement);
          return quadrilateral;
        });
      }

      this.container.className = "linkAnnotation";
      this.container.appendChild(link);
      return this.container;
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(link, destination) {
      var _this = this;

      link.href = this.linkService.getDestinationHash(destination);

      link.onclick = function () {
        if (destination) {
          _this.linkService.goToDestination(destination);
        }

        return false;
      };

      if (destination || destination === "") {
        link.className = "internalLink";
      }
    }
  }, {
    key: "_bindNamedAction",
    value: function _bindNamedAction(link, action) {
      var _this2 = this;

      link.href = this.linkService.getAnchorUrl("");

      link.onclick = function () {
        _this2.linkService.executeNamedAction(action);

        return false;
      };

      link.className = "internalLink";
    }
  }, {
    key: "_bindJSAction",
    value: function _bindJSAction(link, data) {
      var _this3 = this;

      link.href = this.linkService.getAnchorUrl("");
      var map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

      var _loop = function _loop() {
        var name = _Object$keys[_i];
        var jsName = map.get(name);

        if (!jsName) {
          return "continue";
        }

        link[jsName] = function () {
          var _this3$linkService$ev;

          (_this3$linkService$ev = _this3.linkService.eventBus) === null || _this3$linkService$ev === void 0 ? void 0 : _this3$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this3,
            detail: {
              id: data.id,
              name: name
            }
          });
          return false;
        };
      };

      for (var _i = 0, _Object$keys = Object.keys(data.actions); _i < _Object$keys.length; _i++) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }

      link.className = "internalLink";
    }
  }]);

  return LinkAnnotationElement;
}(AnnotationElement);

var TextAnnotationElement = /*#__PURE__*/function (_AnnotationElement2) {
  _inherits(TextAnnotationElement, _AnnotationElement2);

  var _super2 = _createSuper(TextAnnotationElement);

  function TextAnnotationElement(parameters) {
    _classCallCheck(this, TextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super2.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(TextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "textAnnotation";
      var image = document.createElement("img");
      image.style.height = this.container.style.height;
      image.style.width = this.container.style.width;
      image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
      image.alt = "[{{type}} Annotation]";
      image.dataset.l10nId = "text_annotation_type";
      image.dataset.l10nArgs = JSON.stringify({
        type: this.data.name
      });

      if (!this.data.hasPopup) {
        this._createPopup(image, this.data);
      }

      this.container.appendChild(image);
      return this.container;
    }
  }]);

  return TextAnnotationElement;
}(AnnotationElement);

var WidgetAnnotationElement = /*#__PURE__*/function (_AnnotationElement3) {
  _inherits(WidgetAnnotationElement, _AnnotationElement3);

  var _super3 = _createSuper(WidgetAnnotationElement);

  function WidgetAnnotationElement() {
    _classCallCheck(this, WidgetAnnotationElement);

    return _super3.apply(this, arguments);
  }

  _createClass(WidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      if (this.data.alternativeText) {
        this.container.title = this.data.alternativeText;
      }

      return this.container;
    }
  }, {
    key: "_getKeyModifier",
    value: function _getKeyModifier(event) {
      return navigator.platform.includes("Win") && event.ctrlKey || navigator.platform.includes("Mac") && event.metaKey;
    }
  }, {
    key: "_setEventListener",
    value: function _setEventListener(element, baseName, eventName, valueGetter) {
      var _this4 = this;

      if (baseName.includes("mouse")) {
        element.addEventListener(baseName, function (event) {
          var _this4$linkService$ev;

          (_this4$linkService$ev = _this4.linkService.eventBus) === null || _this4$linkService$ev === void 0 ? void 0 : _this4$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this4,
            detail: {
              id: _this4.data.id,
              name: eventName,
              value: valueGetter(event),
              shift: event.shiftKey,
              modifier: _this4._getKeyModifier(event)
            }
          });
        });
      } else {
        element.addEventListener(baseName, function (event) {
          var _this4$linkService$ev2;

          (_this4$linkService$ev2 = _this4.linkService.eventBus) === null || _this4$linkService$ev2 === void 0 ? void 0 : _this4$linkService$ev2.dispatch("dispatcheventinsandbox", {
            source: _this4,
            detail: {
              id: _this4.data.id,
              name: eventName,
              value: event.target.checked
            }
          });
        });
      }
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners(element, names, getter) {
      var _iterator3 = _createForOfIteratorHelper(names),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _this$data$actions;

          var _step3$value = _slicedToArray(_step3.value, 2),
              baseName = _step3$value[0],
              eventName = _step3$value[1];

          if (eventName === "Action" || (_this$data$actions = this.data.actions) !== null && _this$data$actions !== void 0 && _this$data$actions[eventName]) {
            this._setEventListener(element, baseName, eventName, getter);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_dispatchEventFromSandbox",
    value: function _dispatchEventFromSandbox(actions, jsEvent) {
      var _this5 = this;

      var setColor = function setColor(jsName, styleName, event) {
        var color = event.detail[jsName];
        event.target.style[styleName] = _scripting_utils.ColorConverters["".concat(color[0], "_HTML")](color.slice(1));
      };

      var commonActions = {
        display: function display(event) {
          var hidden = event.detail.display % 2 === 1;
          event.target.style.visibility = hidden ? "hidden" : "visible";

          _this5.annotationStorage.setValue(_this5.data.id, _this5.data.fieldName, {
            hidden: hidden,
            print: event.detail.display === 0 || event.detail.display === 3
          });
        },
        print: function print(event) {
          _this5.annotationStorage.setValue(_this5.data.id, _this5.data.fieldName, {
            print: event.detail.print
          });
        },
        hidden: function hidden(event) {
          event.target.style.visibility = event.detail.hidden ? "hidden" : "visible";

          _this5.annotationStorage.setValue(_this5.data.id, _this5.data.fieldName, {
            hidden: event.detail.hidden
          });
        },
        focus: function focus(event) {
          setTimeout(function () {
            return event.target.focus({
              preventScroll: false
            });
          }, 0);
        },
        userName: function userName(event) {
          event.target.title = event.detail.userName;
        },
        readonly: function readonly(event) {
          if (event.detail.readonly) {
            event.target.setAttribute("readonly", "");
          } else {
            event.target.removeAttribute("readonly");
          }
        },
        required: function required(event) {
          if (event.detail.required) {
            event.target.setAttribute("required", "");
          } else {
            event.target.removeAttribute("required");
          }
        },
        bgColor: function bgColor(event) {
          setColor("bgColor", "backgroundColor", event);
        },
        fillColor: function fillColor(event) {
          setColor("fillColor", "backgroundColor", event);
        },
        fgColor: function fgColor(event) {
          setColor("fgColor", "color", event);
        },
        textColor: function textColor(event) {
          setColor("textColor", "color", event);
        },
        borderColor: function borderColor(event) {
          setColor("borderColor", "borderColor", event);
        },
        strokeColor: function strokeColor(event) {
          setColor("strokeColor", "borderColor", event);
        }
      };

      for (var _i2 = 0, _Object$keys2 = Object.keys(jsEvent.detail); _i2 < _Object$keys2.length; _i2++) {
        var name = _Object$keys2[_i2];
        var action = actions[name] || commonActions[name];

        if (action) {
          action(jsEvent);
        }
      }
    }
  }]);

  return WidgetAnnotationElement;
}(AnnotationElement);

var TextWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem) {
  _inherits(TextWidgetAnnotationElement, _WidgetAnnotationElem);

  var _super4 = _createSuper(TextWidgetAnnotationElement);

  function TextWidgetAnnotationElement(parameters) {
    _classCallCheck(this, TextWidgetAnnotationElement);

    var isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    return _super4.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(TextWidgetAnnotationElement, [{
    key: "setPropertyOnSiblings",
    value: function setPropertyOnSiblings(base, key, value, keyInStorage) {
      var storage = this.annotationStorage;

      var _iterator4 = _createForOfIteratorHelper(document.getElementsByName(base.name)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var element = _step4.value;

          if (element !== base) {
            element[key] = value;
            var data = Object.create(null);
            data[keyInStorage] = value;
            storage.setValue(element.getAttribute("id"), this.data.fieldName, data);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var storage = this.annotationStorage;
      var id = this.data.id;
      this.container.className = "textWidgetAnnotation";
      var element = null;

      if (this.renderInteractiveForms) {
        var storedData = storage.getValue(id, this.data.fieldName, {
          value: this.data.fieldValue,
          valueAsString: this.data.fieldValue
        });
        var textContent = storedData.valueAsString || storedData.value || "";
        var elementData = {
          userValue: null,
          formattedValue: null,
          beforeInputSelectionRange: null,
          beforeInputValue: null
        };

        if (this.data.multiLine) {
          element = document.createElement("textarea");
          element.textContent = textContent;
        } else {
          element = document.createElement("input");
          element.type = "text";
          element.setAttribute("value", textContent);
        }

        elementData.userValue = textContent;
        element.setAttribute("id", id);
        element.addEventListener("input", function (event) {
          storage.setValue(id, _this6.data.fieldName, {
            value: event.target.value
          });

          _this6.setPropertyOnSiblings(element, "value", event.target.value, "value");
        });

        var blurListener = function blurListener(event) {
          if (elementData.formattedValue) {
            event.target.value = elementData.formattedValue;
          }

          event.target.scrollLeft = 0;
          elementData.beforeInputSelectionRange = null;
        };

        if (this.enableScripting && this.hasJSActions) {
          var _this$data$actions2;

          element.addEventListener("focus", function (event) {
            if (elementData.userValue) {
              event.target.value = elementData.userValue;
            }
          });
          var fieldName = this.data.fieldName;
          element.addEventListener("updatefromsandbox", function (jsEvent) {
            var actions = {
              value: function value(event) {
                elementData.userValue = event.detail.value || "";
                storage.setValue(id, fieldName, {
                  value: elementData.userValue.toString()
                });

                if (!elementData.formattedValue) {
                  event.target.value = elementData.userValue;
                }
              },
              valueAsString: function valueAsString(event) {
                elementData.formattedValue = event.detail.valueAsString || "";

                if (event.target !== document.activeElement) {
                  event.target.value = elementData.formattedValue;
                }

                storage.setValue(id, fieldName, {
                  formattedValue: elementData.formattedValue
                });
              },
              selRange: function selRange(event) {
                var _event$detail$selRang = _slicedToArray(event.detail.selRange, 2),
                    selStart = _event$detail$selRang[0],
                    selEnd = _event$detail$selRang[1];

                if (selStart >= 0 && selEnd < event.target.value.length) {
                  event.target.setSelectionRange(selStart, selEnd);
                }
              }
            };

            _this6._dispatchEventFromSandbox(actions, jsEvent);
          });
          element.addEventListener("keydown", function (event) {
            var _this6$linkService$ev;

            elementData.beforeInputValue = event.target.value;
            var commitKey = -1;

            if (event.key === "Escape") {
              commitKey = 0;
            } else if (event.key === "Enter") {
              commitKey = 2;
            } else if (event.key === "Tab") {
              commitKey = 3;
            }

            if (commitKey === -1) {
              return;
            }

            elementData.userValue = event.target.value;
            (_this6$linkService$ev = _this6.linkService.eventBus) === null || _this6$linkService$ev === void 0 ? void 0 : _this6$linkService$ev.dispatch("dispatcheventinsandbox", {
              source: _this6,
              detail: {
                id: id,
                name: "Keystroke",
                value: event.target.value,
                willCommit: true,
                commitKey: commitKey,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              }
            });
          });
          var _blurListener = blurListener;
          blurListener = null;
          element.addEventListener("blur", function (event) {
            if (_this6._mouseState.isDown) {
              var _this6$linkService$ev2;

              elementData.userValue = event.target.value;
              (_this6$linkService$ev2 = _this6.linkService.eventBus) === null || _this6$linkService$ev2 === void 0 ? void 0 : _this6$linkService$ev2.dispatch("dispatcheventinsandbox", {
                source: _this6,
                detail: {
                  id: id,
                  name: "Keystroke",
                  value: event.target.value,
                  willCommit: true,
                  commitKey: 1,
                  selStart: event.target.selectionStart,
                  selEnd: event.target.selectionEnd
                }
              });
            }

            _blurListener(event);
          });
          element.addEventListener("mousedown", function (event) {
            elementData.beforeInputValue = event.target.value;
            elementData.beforeInputSelectionRange = null;
          });
          element.addEventListener("keyup", function (event) {
            if (event.target.selectionStart === event.target.selectionEnd) {
              elementData.beforeInputSelectionRange = null;
            }
          });
          element.addEventListener("select", function (event) {
            elementData.beforeInputSelectionRange = [event.target.selectionStart, event.target.selectionEnd];
          });

          if ((_this$data$actions2 = this.data.actions) !== null && _this$data$actions2 !== void 0 && _this$data$actions2.Keystroke) {
            element.addEventListener("input", function (event) {
              var _this6$linkService$ev3;

              var selStart = -1;
              var selEnd = -1;

              if (elementData.beforeInputSelectionRange) {
                var _elementData$beforeIn = _slicedToArray(elementData.beforeInputSelectionRange, 2);

                selStart = _elementData$beforeIn[0];
                selEnd = _elementData$beforeIn[1];
              }

              (_this6$linkService$ev3 = _this6.linkService.eventBus) === null || _this6$linkService$ev3 === void 0 ? void 0 : _this6$linkService$ev3.dispatch("dispatcheventinsandbox", {
                source: _this6,
                detail: {
                  id: id,
                  name: "Keystroke",
                  value: elementData.beforeInputValue,
                  change: event.data,
                  willCommit: false,
                  selStart: selStart,
                  selEnd: selEnd
                }
              });
            });
          }

          this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
            return event.target.value;
          });
        }

        if (blurListener) {
          element.addEventListener("blur", blurListener);
        }

        element.disabled = this.data.readOnly;
        element.name = this.data.fieldName;

        if (this.data.maxLen !== null) {
          element.maxLength = this.data.maxLen;
        }

        if (this.data.comb) {
          var fieldWidth = this.data.rect[2] - this.data.rect[0];
          var combWidth = fieldWidth / this.data.maxLen;
          element.classList.add("comb");
          element.style.letterSpacing = "calc(".concat(combWidth, "px - 1ch)");
        }
      } else {
        element = document.createElement("div");
        element.textContent = this.data.fieldValue;
        element.style.verticalAlign = "middle";
        element.style.display = "table-cell";
      }

      this._setTextStyle(element);

      this.container.appendChild(element);
      return this.container;
    }
  }, {
    key: "_setTextStyle",
    value: function _setTextStyle(element) {
      var TEXT_ALIGNMENT = ["left", "center", "right"];
      var _this$data$defaultApp = this.data.defaultAppearanceData,
          fontSize = _this$data$defaultApp.fontSize,
          fontColor = _this$data$defaultApp.fontColor;
      var style = element.style;

      if (fontSize) {
        style.fontSize = "".concat(fontSize, "px");
      }

      style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

      if (this.data.textAlignment !== null) {
        style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
      }
    }
  }]);

  return TextWidgetAnnotationElement;
}(WidgetAnnotationElement);

var CheckboxWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem2) {
  _inherits(CheckboxWidgetAnnotationElement, _WidgetAnnotationElem2);

  var _super5 = _createSuper(CheckboxWidgetAnnotationElement);

  function CheckboxWidgetAnnotationElement(parameters) {
    _classCallCheck(this, CheckboxWidgetAnnotationElement);

    return _super5.call(this, parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  _createClass(CheckboxWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getValue(id, this.data.fieldName, {
        value: data.fieldValue && (data.exportValue && data.exportValue === data.fieldValue || !data.exportValue && data.fieldValue !== "Off")
      }).value;

      if (typeof value === "string") {
        value = value !== "Off";
        storage.setValue(id, this.data.fieldName, {
          value: value
        });
      }

      this.container.className = "buttonWidgetAnnotation checkBox";
      var element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "checkbox";
      element.name = this.data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("id", id);
      element.addEventListener("change", function (event) {
        var name = event.target.name;

        var _iterator5 = _createForOfIteratorHelper(document.getElementsByName(name)),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var checkbox = _step5.value;

            if (checkbox !== event.target) {
              checkbox.checked = false;
              storage.setValue(checkbox.parentNode.getAttribute("data-annotation-id"), _this7.data.fieldName, {
                value: false
              });
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        storage.setValue(id, _this7.data.fieldName, {
          value: event.target.checked
        });
      });

      if (this.enableScripting && this.hasJSActions) {
        var fieldName = this.data.fieldName;
        element.addEventListener("updatefromsandbox", function (jsEvent) {
          var actions = {
            value: function value(event) {
              event.target.checked = event.detail.value !== "Off";
              storage.setValue(id, fieldName, {
                value: event.target.checked
              });
            }
          };

          _this7._dispatchEventFromSandbox(actions, jsEvent);
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
          return event.target.checked;
        });
      }

      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return CheckboxWidgetAnnotationElement;
}(WidgetAnnotationElement);

var RadioButtonWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem3) {
  _inherits(RadioButtonWidgetAnnotationElement, _WidgetAnnotationElem3);

  var _super6 = _createSuper(RadioButtonWidgetAnnotationElement);

  function RadioButtonWidgetAnnotationElement(parameters) {
    _classCallCheck(this, RadioButtonWidgetAnnotationElement);

    return _super6.call(this, parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  _createClass(RadioButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      this.container.className = "buttonWidgetAnnotation radioButton";
      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getValue(id, this.data.fieldName, {
        value: data.fieldValue === data.buttonValue
      }, this.data.buttonValue).value;

      if (typeof value === "string") {
        value = value !== data.buttonValue;
        storage.setValue(id, this.data.fieldName, {
          value: value
        }, this.data.buttonValue);
      }

      var element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "radio";
      element.name = data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("id", id);
      element.addEventListener("change", function (event) {
        var target = event.target;

        var _iterator6 = _createForOfIteratorHelper(document.getElementsByName(target.name)),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var radio = _step6.value;

            if (radio !== target) {
              if (window.setFormValue) {
                window.setFormValue(radio.getAttribute("id"), false);
              }

              storage.setValue(radio.getAttribute("id"), _this8.data.fieldName, {
                value: false,
                emitMessage: false
              });
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        storage.setValue(id, _this8.data.fieldName, {
          value: target.checked,
          radioValue: _this8.data.buttonValue
        });
      });

      if (this.enableScripting && this.hasJSActions) {
        var pdfButtonValue = data.buttonValue;
        element.addEventListener("updatefromsandbox", function (jsEvent) {
          var fieldName = _this8.data.fieldName;
          var actions = {
            value: function value(event) {
              var checked = pdfButtonValue === event.detail.value;

              var _iterator7 = _createForOfIteratorHelper(document.getElementsByName(event.target.name)),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var radio = _step7.value;
                  var radioId = radio.getAttribute("id");
                  radio.checked = radioId === id && checked;
                  storage.setValue(radioId, fieldName, {
                    value: radio.checked
                  });
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          };

          _this8._dispatchEventFromSandbox(actions, jsEvent);
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], function (event) {
          return event.target.checked;
        });
      }

      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return RadioButtonWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PushButtonWidgetAnnotationElement = /*#__PURE__*/function (_LinkAnnotationElemen) {
  _inherits(PushButtonWidgetAnnotationElement, _LinkAnnotationElemen);

  var _super7 = _createSuper(PushButtonWidgetAnnotationElement);

  function PushButtonWidgetAnnotationElement() {
    _classCallCheck(this, PushButtonWidgetAnnotationElement);

    return _super7.apply(this, arguments);
  }

  _createClass(PushButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var container = _get(_getPrototypeOf(PushButtonWidgetAnnotationElement.prototype), "render", this).call(this);

      container.className = "buttonWidgetAnnotation pushButton";

      if (this.data.alternativeText) {
        container.title = this.data.alternativeText;
      }

      return container;
    }
  }]);

  return PushButtonWidgetAnnotationElement;
}(LinkAnnotationElement);

var ChoiceWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem4) {
  _inherits(ChoiceWidgetAnnotationElement, _WidgetAnnotationElem4);

  var _super8 = _createSuper(ChoiceWidgetAnnotationElement);

  function ChoiceWidgetAnnotationElement(parameters) {
    _classCallCheck(this, ChoiceWidgetAnnotationElement);

    return _super8.call(this, parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  _createClass(ChoiceWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      this.container.className = "choiceWidgetAnnotation";
      var storage = this.annotationStorage;
      var id = this.data.id;
      var value = storage.getValue(id, this.data.fieldName, {
        value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined
      }).value;
      this.data.fieldValue = value;
      var selectElement = document.createElement("select");
      selectElement.disabled = this.data.readOnly;
      selectElement.name = this.data.fieldName;
      selectElement.setAttribute("id", id);

      if (!this.data.combo) {
        selectElement.size = this.data.options.length;

        if (this.data.multiSelect) {
          selectElement.multiple = true;
        }
      }

      var _iterator8 = _createForOfIteratorHelper(this.data.options),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var option = _step8.value;
          var optionElement = document.createElement("option");
          optionElement.textContent = option.displayValue;
          optionElement.value = option.exportValue;

          if (this.data.fieldValue.includes(option.exportValue)) {
            optionElement.setAttribute("selected", true);
          }

          selectElement.appendChild(optionElement);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var getValue = function getValue(event, isExport) {
        var name = isExport ? "value" : "textContent";
        var options = event.target.options;

        if (!event.target.multiple) {
          return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
        }

        return Array.prototype.filter.call(options, function (option) {
          return option.selected;
        }).map(function (option) {
          return option[name];
        });
      };

      var getItems = function getItems(event) {
        var options = event.target.options;
        return Array.prototype.map.call(options, function (option) {
          return {
            displayValue: option.textContent,
            exportValue: option.value
          };
        });
      };

      if (this.enableScripting && this.hasJSActions) {
        selectElement.addEventListener("updatefromsandbox", function (jsEvent) {
          var fieldName = _this9.data.fieldName;
          var actions = {
            value: function value(event) {
              var options = selectElement.options;
              var value = event.detail.value;
              var values = new Set(Array.isArray(value) ? value : [value]);
              Array.prototype.forEach.call(options, function (option) {
                option.selected = values.has(option.value);
              });
              storage.setValue(id, fieldName, {
                value: getValue(event, true)
              });
            },
            multipleSelection: function multipleSelection(event) {
              selectElement.multiple = true;
            },
            remove: function remove(event) {
              var options = selectElement.options;
              var index = event.detail.remove;
              options[index].selected = false;
              selectElement.remove(index);

              if (options.length > 0) {
                var i = Array.prototype.findIndex.call(options, function (option) {
                  return option.selected;
                });

                if (i === -1) {
                  options[0].selected = true;
                }
              }

              storage.setValue(id, this.data.fieldName, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            clear: function clear(event) {
              while (selectElement.length !== 0) {
                selectElement.remove(0);
              }

              storage.setValue(id, this.data.fieldName, {
                value: null,
                items: []
              });
            },
            insert: function insert(event) {
              var _event$detail$insert = event.detail.insert,
                  index = _event$detail$insert.index,
                  displayValue = _event$detail$insert.displayValue,
                  exportValue = _event$detail$insert.exportValue;
              var optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.insertBefore(optionElement, selectElement.children[index]);
              storage.setValue(id, this.data.fieldName, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            items: function items(event) {
              var items = event.detail.items;

              while (selectElement.length !== 0) {
                selectElement.remove(0);
              }

              var _iterator9 = _createForOfIteratorHelper(items),
                  _step9;

              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                  var item = _step9.value;
                  var displayValue = item.displayValue,
                      exportValue = item.exportValue;
                  var optionElement = document.createElement("option");
                  optionElement.textContent = displayValue;
                  optionElement.value = exportValue;
                  selectElement.appendChild(optionElement);
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }

              if (selectElement.options.length > 0) {
                selectElement.options[0].selected = true;
              }

              storage.setValue(id, this.data.fieldName, {
                value: getValue(event, true),
                items: getItems(event)
              });
            },
            indices: function indices(event) {
              var indices = new Set(event.detail.indices);
              var options = event.target.options;
              Array.prototype.forEach.call(options, function (option, i) {
                option.selected = indices.has(i);
              });
              storage.setValue(id, this.data.fieldName, {
                value: getValue(event, true)
              });
            },
            editable: function editable(event) {
              event.target.disabled = !event.detail.editable;
            }
          };

          _this9._dispatchEventFromSandbox(actions, jsEvent);
        });
        selectElement.addEventListener("input", function (event) {
          var _this9$linkService$ev;

          var exportValue = getValue(event, true);
          var value = getValue(event, false);
          storage.setValue(id, _this9.data.fieldName, {
            value: exportValue
          });
          (_this9$linkService$ev = _this9.linkService.eventBus) === null || _this9$linkService$ev === void 0 ? void 0 : _this9$linkService$ev.dispatch("dispatcheventinsandbox", {
            source: _this9,
            detail: {
              id: id,
              name: "Keystroke",
              value: value,
              changeEx: exportValue,
              willCommit: true,
              commitKey: 1,
              keyDown: false
            }
          });
        });

        this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], function (event) {
          return event.target.checked;
        });
      } else {
        selectElement.addEventListener("input", function (event) {
          storage.setValue(id, _this9.data.fieldName, {
            value: getValue(event),
            radioValue: getValue(event, true)
          });
        });
      }

      this.container.appendChild(selectElement);
      return this.container;
    }
  }]);

  return ChoiceWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PopupAnnotationElement = /*#__PURE__*/function (_AnnotationElement4) {
  _inherits(PopupAnnotationElement, _AnnotationElement4);

  var _super9 = _createSuper(PopupAnnotationElement);

  function PopupAnnotationElement(parameters) {
    _classCallCheck(this, PopupAnnotationElement);

    var isRenderable = !!(parameters.data.title || parameters.data.contents);
    return _super9.call(this, parameters, {
      isRenderable: isRenderable
    });
  }

  _createClass(PopupAnnotationElement, [{
    key: "render",
    value: function render() {
      var IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
      this.container.className = "popupAnnotation";

      if (IGNORE_TYPES.includes(this.data.parentType)) {
        return this.container;
      }

      var selector = "[data-annotation-id=\"".concat(this.data.parentId, "\"]");
      var parentElements = this.layer.querySelectorAll(selector);

      if (parentElements.length === 0) {
        return this.container;
      }

      var popup = new PopupElement({
        container: this.container,
        trigger: Array.from(parentElements),
        color: this.data.color,
        title: this.data.title,
        modificationDate: this.data.modificationDate,
        contents: this.data.contents
      });
      var page = this.page;

      var rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

      var popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
      var popupTop = rect[1];
      this.container.style.transformOrigin = "".concat(-popupLeft, "px ").concat(-popupTop, "px");
      this.container.style.left = "".concat(popupLeft, "px");
      this.container.style.top = "".concat(popupTop, "px");
      this.container.appendChild(popup.render());
      return this.container;
    }
  }]);

  return PopupAnnotationElement;
}(AnnotationElement);

var PopupElement = /*#__PURE__*/function () {
  function PopupElement(parameters) {
    _classCallCheck(this, PopupElement);

    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.title = parameters.title;
    this.modificationDate = parameters.modificationDate;
    this.contents = parameters.contents;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  _createClass(PopupElement, [{
    key: "render",
    value: function render() {
      var BACKGROUND_ENLIGHT = 0.7;
      var wrapper = document.createElement("div");
      wrapper.className = "popupWrapper";
      this.hideElement = this.hideWrapper ? wrapper : this.container;
      this.hideElement.hidden = true;
      var popup = document.createElement("div");
      popup.className = "popup";
      var color = this.color;

      if (color) {
        var r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
        var g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
        var b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
        popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
      }

      var title = document.createElement("h1");
      title.textContent = this.title;
      popup.appendChild(title);

      var dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

      if (dateObject) {
        var modificationDate = document.createElement("span");
        modificationDate.textContent = "{{date}}, {{time}}";
        modificationDate.dataset.l10nId = "annotation_date_string";
        modificationDate.dataset.l10nArgs = JSON.stringify({
          date: dateObject.toLocaleDateString(),
          time: dateObject.toLocaleTimeString()
        });
        popup.appendChild(modificationDate);
      }

      var contents = this._formatContents(this.contents);

      popup.appendChild(contents);

      if (!Array.isArray(this.trigger)) {
        this.trigger = [this.trigger];
      }

      var _iterator10 = _createForOfIteratorHelper(this.trigger),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var element = _step10.value;
          element.addEventListener("click", this._toggle.bind(this));
          element.addEventListener("mouseover", this._show.bind(this, false));
          element.addEventListener("mouseout", this._hide.bind(this, false));
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      popup.addEventListener("click", this._hide.bind(this, true));
      wrapper.appendChild(popup);
      return wrapper;
    }
  }, {
    key: "_formatContents",
    value: function _formatContents(contents) {
      var p = document.createElement("p");
      var lines = contents.split(/(?:\r\n?|\n)/);

      for (var i = 0, ii = lines.length; i < ii; ++i) {
        var line = lines[i];
        p.appendChild(document.createTextNode(line));

        if (i < ii - 1) {
          p.appendChild(document.createElement("br"));
        }
      }

      return p;
    }
  }, {
    key: "_toggle",
    value: function _toggle() {
      if (this.pinned) {
        this._hide(true);
      } else {
        this._show(true);
      }
    }
  }, {
    key: "_show",
    value: function _show() {
      var pin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (pin) {
        this.pinned = true;
      }

      if (this.hideElement.hidden) {
        this.hideElement.hidden = false;
        this.container.style.zIndex += 1;
      }
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var unpin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (unpin) {
        this.pinned = false;
      }

      if (!this.hideElement.hidden && !this.pinned) {
        this.hideElement.hidden = true;
        this.container.style.zIndex -= 1;
      }
    }
  }]);

  return PopupElement;
}();

var FreeTextAnnotationElement = /*#__PURE__*/function (_AnnotationElement5) {
  _inherits(FreeTextAnnotationElement, _AnnotationElement5);

  var _super10 = _createSuper(FreeTextAnnotationElement);

  function FreeTextAnnotationElement(parameters) {
    _classCallCheck(this, FreeTextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super10.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(FreeTextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "freeTextAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return FreeTextAnnotationElement;
}(AnnotationElement);

var LineAnnotationElement = /*#__PURE__*/function (_AnnotationElement6) {
  _inherits(LineAnnotationElement, _AnnotationElement6);

  var _super11 = _createSuper(LineAnnotationElement);

  function LineAnnotationElement(parameters) {
    _classCallCheck(this, LineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super11.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(LineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "lineAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var line = this.svgFactory.createElement("svg:line");
      line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
      line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
      line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
      line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
      line.setAttribute("stroke-width", data.borderStyle.width || 1);
      line.setAttribute("stroke", "transparent");
      svg.appendChild(line);
      this.container.append(svg);

      this._createPopup(line, data);

      return this.container;
    }
  }]);

  return LineAnnotationElement;
}(AnnotationElement);

var SquareAnnotationElement = /*#__PURE__*/function (_AnnotationElement7) {
  _inherits(SquareAnnotationElement, _AnnotationElement7);

  var _super12 = _createSuper(SquareAnnotationElement);

  function SquareAnnotationElement(parameters) {
    _classCallCheck(this, SquareAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super12.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(SquareAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "squareAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var square = this.svgFactory.createElement("svg:rect");
      square.setAttribute("x", borderWidth / 2);
      square.setAttribute("y", borderWidth / 2);
      square.setAttribute("width", width - borderWidth);
      square.setAttribute("height", height - borderWidth);
      square.setAttribute("stroke-width", borderWidth || 1);
      square.setAttribute("stroke", "transparent");
      square.setAttribute("fill", "none");
      svg.appendChild(square);
      this.container.append(svg);

      this._createPopup(square, data);

      return this.container;
    }
  }]);

  return SquareAnnotationElement;
}(AnnotationElement);

var CircleAnnotationElement = /*#__PURE__*/function (_AnnotationElement8) {
  _inherits(CircleAnnotationElement, _AnnotationElement8);

  var _super13 = _createSuper(CircleAnnotationElement);

  function CircleAnnotationElement(parameters) {
    _classCallCheck(this, CircleAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super13.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(CircleAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "circleAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var circle = this.svgFactory.createElement("svg:ellipse");
      circle.setAttribute("cx", width / 2);
      circle.setAttribute("cy", height / 2);
      circle.setAttribute("rx", width / 2 - borderWidth / 2);
      circle.setAttribute("ry", height / 2 - borderWidth / 2);
      circle.setAttribute("stroke-width", borderWidth || 1);
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("fill", "none");
      svg.appendChild(circle);
      this.container.append(svg);

      this._createPopup(circle, data);

      return this.container;
    }
  }]);

  return CircleAnnotationElement;
}(AnnotationElement);

var PolylineAnnotationElement = /*#__PURE__*/function (_AnnotationElement9) {
  _inherits(PolylineAnnotationElement, _AnnotationElement9);

  var _super14 = _createSuper(PolylineAnnotationElement);

  function PolylineAnnotationElement(parameters) {
    var _this10;

    _classCallCheck(this, PolylineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    _this10 = _super14.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
    _this10.containerClassName = "polylineAnnotation";
    _this10.svgElementName = "svg:polyline";
    return _this10;
  }

  _createClass(PolylineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var points = [];

      var _iterator11 = _createForOfIteratorHelper(data.vertices),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var coordinate = _step11.value;
          var x = coordinate.x - data.rect[0];
          var y = data.rect[3] - coordinate.y;
          points.push(x + "," + y);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      points = points.join(" ");
      var polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "none");
      svg.appendChild(polyline);
      this.container.append(svg);

      this._createPopup(polyline, data);

      return this.container;
    }
  }]);

  return PolylineAnnotationElement;
}(AnnotationElement);

var PolygonAnnotationElement = /*#__PURE__*/function (_PolylineAnnotationEl) {
  _inherits(PolygonAnnotationElement, _PolylineAnnotationEl);

  var _super15 = _createSuper(PolygonAnnotationElement);

  function PolygonAnnotationElement(parameters) {
    var _this11;

    _classCallCheck(this, PolygonAnnotationElement);

    _this11 = _super15.call(this, parameters);
    _this11.containerClassName = "polygonAnnotation";
    _this11.svgElementName = "svg:polygon";
    return _this11;
  }

  return PolygonAnnotationElement;
}(PolylineAnnotationElement);

var CaretAnnotationElement = /*#__PURE__*/function (_AnnotationElement10) {
  _inherits(CaretAnnotationElement, _AnnotationElement10);

  var _super16 = _createSuper(CaretAnnotationElement);

  function CaretAnnotationElement(parameters) {
    _classCallCheck(this, CaretAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super16.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(CaretAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "caretAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return CaretAnnotationElement;
}(AnnotationElement);

var InkAnnotationElement = /*#__PURE__*/function (_AnnotationElement11) {
  _inherits(InkAnnotationElement, _AnnotationElement11);

  var _super17 = _createSuper(InkAnnotationElement);

  function InkAnnotationElement(parameters) {
    var _this12;

    _classCallCheck(this, InkAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    _this12 = _super17.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
    _this12.containerClassName = "inkAnnotation";
    _this12.svgElementName = "svg:polyline";
    return _this12;
  }

  _createClass(InkAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);

      var _iterator12 = _createForOfIteratorHelper(data.inkLists),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var inkList = _step12.value;
          var points = [];

          var _iterator13 = _createForOfIteratorHelper(inkList),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var coordinate = _step13.value;
              var x = coordinate.x - data.rect[0];
              var y = data.rect[3] - coordinate.y;
              points.push("".concat(x, ",").concat(y));
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }

          points = points.join(" ");
          var polyline = this.svgFactory.createElement(this.svgElementName);
          polyline.setAttribute("points", points);
          polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
          polyline.setAttribute("stroke", "transparent");
          polyline.setAttribute("fill", "none");

          this._createPopup(polyline, data);

          svg.appendChild(polyline);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      this.container.append(svg);
      return this.container;
    }
  }]);

  return InkAnnotationElement;
}(AnnotationElement);

var HighlightAnnotationElement = /*#__PURE__*/function (_AnnotationElement12) {
  _inherits(HighlightAnnotationElement, _AnnotationElement12);

  var _super18 = _createSuper(HighlightAnnotationElement);

  function HighlightAnnotationElement(parameters) {
    _classCallCheck(this, HighlightAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super18.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(HighlightAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("highlightAnnotation");
      }

      this.container.className = "highlightAnnotation";
      return this.container;
    }
  }]);

  return HighlightAnnotationElement;
}(AnnotationElement);

var UnderlineAnnotationElement = /*#__PURE__*/function (_AnnotationElement13) {
  _inherits(UnderlineAnnotationElement, _AnnotationElement13);

  var _super19 = _createSuper(UnderlineAnnotationElement);

  function UnderlineAnnotationElement(parameters) {
    _classCallCheck(this, UnderlineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super19.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(UnderlineAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("underlineAnnotation");
      }

      this.container.className = "underlineAnnotation";
      return this.container;
    }
  }]);

  return UnderlineAnnotationElement;
}(AnnotationElement);

var SquigglyAnnotationElement = /*#__PURE__*/function (_AnnotationElement14) {
  _inherits(SquigglyAnnotationElement, _AnnotationElement14);

  var _super20 = _createSuper(SquigglyAnnotationElement);

  function SquigglyAnnotationElement(parameters) {
    _classCallCheck(this, SquigglyAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super20.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(SquigglyAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("squigglyAnnotation");
      }

      this.container.className = "squigglyAnnotation";
      return this.container;
    }
  }]);

  return SquigglyAnnotationElement;
}(AnnotationElement);

var StrikeOutAnnotationElement = /*#__PURE__*/function (_AnnotationElement15) {
  _inherits(StrikeOutAnnotationElement, _AnnotationElement15);

  var _super21 = _createSuper(StrikeOutAnnotationElement);

  function StrikeOutAnnotationElement(parameters) {
    _classCallCheck(this, StrikeOutAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super21.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  _createClass(StrikeOutAnnotationElement, [{
    key: "render",
    value: function render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("strikeoutAnnotation");
      }

      this.container.className = "strikeoutAnnotation";
      return this.container;
    }
  }]);

  return StrikeOutAnnotationElement;
}(AnnotationElement);

var StampAnnotationElement = /*#__PURE__*/function (_AnnotationElement16) {
  _inherits(StampAnnotationElement, _AnnotationElement16);

  var _super22 = _createSuper(StampAnnotationElement);

  function StampAnnotationElement(parameters) {
    _classCallCheck(this, StampAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super22.call(this, parameters, {
      isRenderable: isRenderable,
      ignoreBorder: true
    });
  }

  _createClass(StampAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "stampAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return StampAnnotationElement;
}(AnnotationElement);

var FileAttachmentAnnotationElement = /*#__PURE__*/function (_AnnotationElement17) {
  _inherits(FileAttachmentAnnotationElement, _AnnotationElement17);

  var _super23 = _createSuper(FileAttachmentAnnotationElement);

  function FileAttachmentAnnotationElement(parameters) {
    var _this13$linkService$e;

    var _this13;

    _classCallCheck(this, FileAttachmentAnnotationElement);

    _this13 = _super23.call(this, parameters, {
      isRenderable: true
    });
    var _this13$data$file = _this13.data.file,
        filename = _this13$data$file.filename,
        content = _this13$data$file.content;
    _this13.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    _this13.content = content;
    (_this13$linkService$e = _this13.linkService.eventBus) === null || _this13$linkService$e === void 0 ? void 0 : _this13$linkService$e.dispatch("fileattachmentannotation", {
      source: _assertThisInitialized(_this13),
      id: (0, _util.stringToPDFString)(filename),
      filename: filename,
      content: content
    });
    return _this13;
  }

  _createClass(FileAttachmentAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "fileAttachmentAnnotation";
      var trigger = document.createElement("div");
      trigger.style.height = this.container.style.height;
      trigger.style.width = this.container.style.width;
      trigger.addEventListener("dblclick", this._download.bind(this));

      if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
        this._createPopup(trigger, this.data);
      }

      this.container.appendChild(trigger);
      return this.container;
    }
  }, {
    key: "_download",
    value: function _download() {
      var _this$downloadManager;

      (_this$downloadManager = this.downloadManager) === null || _this$downloadManager === void 0 ? void 0 : _this$downloadManager.openOrDownloadData(this.container, this.content, this.filename);
    }
  }]);

  return FileAttachmentAnnotationElement;
}(AnnotationElement);

var AnnotationLayer = /*#__PURE__*/function () {
  function AnnotationLayer() {
    _classCallCheck(this, AnnotationLayer);
  }

  _createClass(AnnotationLayer, null, [{
    key: "render",
    value: function render(parameters) {
      var sortedAnnotations = [],
          popupAnnotations = [];

      var _iterator14 = _createForOfIteratorHelper(parameters.annotations),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var _data = _step14.value;

          if (!_data) {
            continue;
          }

          if (_data.annotationType === _util.AnnotationType.POPUP) {
            popupAnnotations.push(_data);
            continue;
          }

          sortedAnnotations.push(_data);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      if (popupAnnotations.length) {
        sortedAnnotations.push.apply(sortedAnnotations, popupAnnotations);
      }

      for (var _i3 = 0, _sortedAnnotations = sortedAnnotations; _i3 < _sortedAnnotations.length; _i3++) {
        var data = _sortedAnnotations[_i3];
        var element = AnnotationElementFactory.create({
          data: data,
          layer: parameters.div,
          page: parameters.page,
          viewport: parameters.viewport,
          linkService: parameters.linkService,
          downloadManager: parameters.downloadManager,
          imageResourcesPath: parameters.imageResourcesPath || "",
          renderInteractiveForms: parameters.renderInteractiveForms !== false,
          svgFactory: new _display_utils.DOMSVGFactory(),
          annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
          enableScripting: parameters.enableScripting,
          hasJSActions: parameters.hasJSActions,
          mouseState: parameters.mouseState || {
            isDown: false
          }
        });

        if (element.isRenderable) {
          var rendered = element.render();

          if (data.hidden) {
            rendered.style.visibility = "hidden";
          }

          if (Array.isArray(rendered)) {
            var _iterator15 = _createForOfIteratorHelper(rendered),
                _step15;

            try {
              for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                var renderedElement = _step15.value;
                parameters.div.appendChild(renderedElement);
              }
            } catch (err) {
              _iterator15.e(err);
            } finally {
              _iterator15.f();
            }
          } else {
            if (element instanceof PopupAnnotationElement) {
              parameters.div.prepend(rendered);
            } else {
              parameters.div.appendChild(rendered);
            }
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(parameters) {
      var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");

      var _iterator16 = _createForOfIteratorHelper(parameters.annotations),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var data = _step16.value;
          var elements = parameters.div.querySelectorAll("[data-annotation-id=\"".concat(data.id, "\"]"));

          if (elements) {
            var _iterator17 = _createForOfIteratorHelper(elements),
                _step17;

            try {
              for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                var element = _step17.value;
                element.style.transform = transform;
              }
            } catch (err) {
              _iterator17.e(err);
            } finally {
              _iterator17.f();
            }
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }

      parameters.div.hidden = false;
    }
  }]);

  return AnnotationLayer;
}();

exports.AnnotationLayer = AnnotationLayer;

/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ColorConverters = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeColorComp(n) {
  return Math.floor(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
}

var ColorConverters = /*#__PURE__*/function () {
  function ColorConverters() {
    _classCallCheck(this, ColorConverters);
  }

  _createClass(ColorConverters, null, [{
    key: "CMYK_G",
    value: function CMYK_G(_ref) {
      var _ref2 = _slicedToArray(_ref, 4),
          c = _ref2[0],
          y = _ref2[1],
          m = _ref2[2],
          k = _ref2[3];

      return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k)];
    }
  }, {
    key: "G_CMYK",
    value: function G_CMYK(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          g = _ref4[0];

      return ["CMYK", 0, 0, 0, 1 - g];
    }
  }, {
    key: "G_RGB",
    value: function G_RGB(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          g = _ref6[0];

      return ["RGB", g, g, g];
    }
  }, {
    key: "G_HTML",
    value: function G_HTML(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
          g = _ref8[0];

      var G = makeColorComp(g);
      return "#".concat(G).concat(G).concat(G);
    }
  }, {
    key: "RGB_G",
    value: function RGB_G(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 3),
          r = _ref10[0],
          g = _ref10[1],
          b = _ref10[2];

      return ["G", 0.3 * r + 0.59 * g + 0.11 * b];
    }
  }, {
    key: "RGB_HTML",
    value: function RGB_HTML(_ref11) {
      var _ref12 = _slicedToArray(_ref11, 3),
          r = _ref12[0],
          g = _ref12[1],
          b = _ref12[2];

      var R = makeColorComp(r);
      var G = makeColorComp(g);
      var B = makeColorComp(b);
      return "#".concat(R).concat(G).concat(B);
    }
  }, {
    key: "T_HTML",
    value: function T_HTML() {
      return "#00000000";
    }
  }, {
    key: "CMYK_RGB",
    value: function CMYK_RGB(_ref13) {
      var _ref14 = _slicedToArray(_ref13, 4),
          c = _ref14[0],
          y = _ref14[1],
          m = _ref14[2],
          k = _ref14[3];

      return ["RGB", 1 - Math.min(1, c + k), 1 - Math.min(1, m + k), 1 - Math.min(1, y + k)];
    }
  }, {
    key: "CMYK_HTML",
    value: function CMYK_HTML(components) {
      return this.RGB_HTML(this.CMYK_RGB(components));
    }
  }, {
    key: "RGB_CMYK",
    value: function RGB_CMYK(_ref15) {
      var _ref16 = _slicedToArray(_ref15, 3),
          r = _ref16[0],
          g = _ref16[1],
          b = _ref16[2];

      var c = 1 - r;
      var m = 1 - g;
      var y = 1 - b;
      var k = Math.min(c, m, y);
      return ["CMYK", c, m, y, k];
    }
  }]);

  return ColorConverters;
}();

exports.ColorConverters = ColorConverters;

/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderTextLayer = renderTextLayer;

var _util = __w_pdfjs_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MAX_TEXT_DIVS_TO_RENDER = 100000;
var DEFAULT_FONT_SIZE = 30;
var DEFAULT_FONT_ASCENT = 0.8;
var ascentCache = new Map();
var AllWhitespaceRegexp = /^\s+$/g;

function getAscent(fontFamily, ctx) {
  var cachedAscent = ascentCache.get(fontFamily);

  if (cachedAscent) {
    return cachedAscent;
  }

  ctx.save();
  ctx.font = "".concat(DEFAULT_FONT_SIZE, "px ").concat(fontFamily);
  var metrics = ctx.measureText("");
  var ascent = metrics === null || metrics === void 0 ? void 0 : metrics.fontBoundingBoxAscent;
  var descent = Math.abs(metrics === null || metrics === void 0 ? void 0 : metrics.fontBoundingBoxDescent);

  if (ascent) {
    ctx.restore();
    var ratio = ascent / (ascent + descent);
    ascentCache.set(fontFamily, ratio);
    return ratio;
  }

  ctx.strokeStyle = "red";
  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("g", 0, 0);
  var pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  descent = 0;

  for (var i = pixels.length - 1 - 3; i >= 0; i -= 4) {
    if (pixels[i] > 0) {
      descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
  pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  ascent = 0;

  for (var _i = 0, ii = pixels.length; _i < ii; _i += 4) {
    if (pixels[_i] > 0) {
      ascent = DEFAULT_FONT_SIZE - Math.floor(_i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.restore();

  if (ascent) {
    var _ratio = ascent / (ascent + descent);

    ascentCache.set(fontFamily, _ratio);
    return _ratio;
  }

  ascentCache.set(fontFamily, DEFAULT_FONT_ASCENT);
  return DEFAULT_FONT_ASCENT;
}

function appendText(task, geom, styles, ctx) {
  var textDiv = document.createElement("span");
  var textDivProperties = {
    angle: 0,
    canvasWidth: 0,
    hasText: geom.str !== "",
    hasEOL: geom.hasEOL,
    originalTransform: null,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    scale: 1
  };

  task._textDivs.push(textDiv);

  var tx = _util.Util.transform(task._viewport.transform, geom.transform);

  var angle = Math.atan2(tx[1], tx[0]);
  var style = styles[geom.fontName];

  if (style.vertical) {
    angle += Math.PI / 2;
  }

  var fontHeight = Math.hypot(tx[2], tx[3]);
  var fontAscent = fontHeight * getAscent(style.fontFamily, ctx);
  var left, top;

  if (angle === 0) {
    left = tx[4];
    top = tx[5] - fontAscent;
  } else {
    left = tx[4] + fontAscent * Math.sin(angle);
    top = tx[5] - fontAscent * Math.cos(angle);
  }

  textDiv.style.left = "".concat(left, "px");
  textDiv.style.top = "".concat(top, "px");
  textDiv.style.fontSize = "".concat(fontHeight, "px");
  textDiv.style.fontFamily = style.fontFamily;
  textDiv.setAttribute("role", "presentation");
  textDiv.textContent = geom.str;
  textDiv.dir = geom.dir;

  if (task._fontInspectorEnabled) {
    textDiv.dataset.fontName = geom.fontName;
  }

  if (angle !== 0) {
    textDivProperties.angle = angle * (180 / Math.PI);
  }

  var shouldScaleText = false;

  if (geom.str.length > 1 || task._enhanceTextSelection && AllWhitespaceRegexp.test(geom.str)) {
    shouldScaleText = true;
  } else if (geom.transform[0] !== geom.transform[3]) {
    var absScaleX = Math.abs(geom.transform[0]),
        absScaleY = Math.abs(geom.transform[3]);

    if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY) / Math.min(absScaleX, absScaleY) > 1.5) {
      shouldScaleText = true;
    }
  }

  if (shouldScaleText) {
    if (style.vertical) {
      textDivProperties.canvasWidth = geom.height * task._viewport.scale;
    } else {
      textDivProperties.canvasWidth = geom.width * task._viewport.scale;
    }
  }

  task._textDivProperties.set(textDiv, textDivProperties);

  if (task._textContentStream) {
    task._layoutText(textDiv);
  }

  if (task._enhanceTextSelection && textDivProperties.hasText) {
    var angleCos = 1,
        angleSin = 0;

    if (angle !== 0) {
      angleCos = Math.cos(angle);
      angleSin = Math.sin(angle);
    }

    var divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
    var divHeight = fontHeight;
    var m, b;

    if (angle !== 0) {
      m = [angleCos, angleSin, -angleSin, angleCos, left, top];
      b = _util.Util.getAxialAlignedBoundingBox([0, 0, divWidth, divHeight], m);
    } else {
      b = [left, top, left + divWidth, top + divHeight];
    }

    task._bounds.push({
      left: b[0],
      top: b[1],
      right: b[2],
      bottom: b[3],
      div: textDiv,
      size: [divWidth, divHeight],
      m: m
    });
  }
}

function render(task) {
  if (task._canceled) {
    return;
  }

  var textDivs = task._textDivs;
  var capability = task._capability;
  var textDivsLength = textDivs.length;

  if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
    task._renderingDone = true;
    capability.resolve();
    return;
  }

  if (!task._textContentStream) {
    for (var i = 0; i < textDivsLength; i++) {
      task._layoutText(textDivs[i]);
    }
  }

  task._renderingDone = true;
  capability.resolve();
}

function findPositiveMin(ts, offset, count) {
  var result = 0;

  for (var i = 0; i < count; i++) {
    var t = ts[offset++];

    if (t > 0) {
      result = result ? Math.min(t, result) : t;
    }
  }

  return result;
}

function expand(task) {
  var bounds = task._bounds;
  var viewport = task._viewport;
  var expanded = expandBounds(viewport.width, viewport.height, bounds);

  for (var i = 0; i < expanded.length; i++) {
    var div = bounds[i].div;

    var divProperties = task._textDivProperties.get(div);

    if (divProperties.angle === 0) {
      divProperties.paddingLeft = bounds[i].left - expanded[i].left;
      divProperties.paddingTop = bounds[i].top - expanded[i].top;
      divProperties.paddingRight = expanded[i].right - bounds[i].right;
      divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;

      task._textDivProperties.set(div, divProperties);

      continue;
    }

    var e = expanded[i],
        b = bounds[i];
    var m = b.m,
        c = m[0],
        s = m[1];
    var points = [[0, 0], [0, b.size[1]], [b.size[0], 0], b.size];
    var ts = new Float64Array(64);

    for (var j = 0, jj = points.length; j < jj; j++) {
      var t = _util.Util.applyTransform(points[j], m);

      ts[j + 0] = c && (e.left - t[0]) / c;
      ts[j + 4] = s && (e.top - t[1]) / s;
      ts[j + 8] = c && (e.right - t[0]) / c;
      ts[j + 12] = s && (e.bottom - t[1]) / s;
      ts[j + 16] = s && (e.left - t[0]) / -s;
      ts[j + 20] = c && (e.top - t[1]) / c;
      ts[j + 24] = s && (e.right - t[0]) / -s;
      ts[j + 28] = c && (e.bottom - t[1]) / c;
      ts[j + 32] = c && (e.left - t[0]) / -c;
      ts[j + 36] = s && (e.top - t[1]) / -s;
      ts[j + 40] = c && (e.right - t[0]) / -c;
      ts[j + 44] = s && (e.bottom - t[1]) / -s;
      ts[j + 48] = s && (e.left - t[0]) / s;
      ts[j + 52] = c && (e.top - t[1]) / -c;
      ts[j + 56] = s && (e.right - t[0]) / s;
      ts[j + 60] = c && (e.bottom - t[1]) / -c;
    }

    var boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
    divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
    divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
    divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
    divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;

    task._textDivProperties.set(div, divProperties);
  }
}

function expandBounds(width, height, boxes) {
  var bounds = boxes.map(function (box, i) {
    return {
      x1: box.left,
      y1: box.top,
      x2: box.right,
      y2: box.bottom,
      index: i,
      x1New: undefined,
      x2New: undefined
    };
  });
  expandBoundsLTR(width, bounds);
  var expanded = new Array(boxes.length);

  var _iterator = _createForOfIteratorHelper(bounds),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var b = _step.value;
      var i = b.index;
      expanded[i] = {
        left: b.x1New,
        top: 0,
        right: b.x2New,
        bottom: 0
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  boxes.map(function (box, i) {
    var e = expanded[i],
        b = bounds[i];
    b.x1 = box.top;
    b.y1 = width - e.right;
    b.x2 = box.bottom;
    b.y2 = width - e.left;
    b.index = i;
    b.x1New = undefined;
    b.x2New = undefined;
  });
  expandBoundsLTR(height, bounds);

  var _iterator2 = _createForOfIteratorHelper(bounds),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _b = _step2.value;
      var _i2 = _b.index;
      expanded[_i2].top = _b.x1New;
      expanded[_i2].bottom = _b.x2New;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return expanded;
}

function expandBoundsLTR(width, bounds) {
  bounds.sort(function (a, b) {
    return a.x1 - b.x1 || a.index - b.index;
  });
  var fakeBoundary = {
    x1: -Infinity,
    y1: -Infinity,
    x2: 0,
    y2: Infinity,
    index: -1,
    x1New: 0,
    x2New: 0
  };
  var horizon = [{
    start: -Infinity,
    end: Infinity,
    boundary: fakeBoundary
  }];

  var _iterator3 = _createForOfIteratorHelper(bounds),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var boundary = _step3.value;
      var i = 0;

      while (i < horizon.length && horizon[i].end <= boundary.y1) {
        i++;
      }

      var j = horizon.length - 1;

      while (j >= 0 && horizon[j].start >= boundary.y2) {
        j--;
      }

      var _horizonPart = void 0,
          _affectedBoundary = void 0;

      var q = void 0,
          k = void 0,
          maxXNew = -Infinity;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;
        var xNew = void 0;

        if (_affectedBoundary.x2 > boundary.x1) {
          xNew = _affectedBoundary.index > boundary.index ? _affectedBoundary.x1New : boundary.x1;
        } else if (_affectedBoundary.x2New === undefined) {
          xNew = (_affectedBoundary.x2 + boundary.x1) / 2;
        } else {
          xNew = _affectedBoundary.x2New;
        }

        if (xNew > maxXNew) {
          maxXNew = xNew;
        }
      }

      boundary.x1New = maxXNew;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;

        if (_affectedBoundary.x2New === undefined) {
          if (_affectedBoundary.x2 > boundary.x1) {
            if (_affectedBoundary.index > boundary.index) {
              _affectedBoundary.x2New = _affectedBoundary.x2;
            }
          } else {
            _affectedBoundary.x2New = maxXNew;
          }
        } else if (_affectedBoundary.x2New > maxXNew) {
          _affectedBoundary.x2New = Math.max(maxXNew, _affectedBoundary.x2);
        }
      }

      var changedHorizon = [];
      var lastBoundary = null;

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;
        var useBoundary = _affectedBoundary.x2 > boundary.x2 ? _affectedBoundary : boundary;

        if (lastBoundary === useBoundary) {
          changedHorizon[changedHorizon.length - 1].end = _horizonPart.end;
        } else {
          changedHorizon.push({
            start: _horizonPart.start,
            end: _horizonPart.end,
            boundary: useBoundary
          });
          lastBoundary = useBoundary;
        }
      }

      if (horizon[i].start < boundary.y1) {
        changedHorizon[0].start = boundary.y1;
        changedHorizon.unshift({
          start: horizon[i].start,
          end: boundary.y1,
          boundary: horizon[i].boundary
        });
      }

      if (boundary.y2 < horizon[j].end) {
        changedHorizon[changedHorizon.length - 1].end = boundary.y2;
        changedHorizon.push({
          start: boundary.y2,
          end: horizon[j].end,
          boundary: horizon[j].boundary
        });
      }

      for (q = i; q <= j; q++) {
        _horizonPart = horizon[q];
        _affectedBoundary = _horizonPart.boundary;

        if (_affectedBoundary.x2New !== undefined) {
          continue;
        }

        var used = false;

        for (k = i - 1; !used && k >= 0 && horizon[k].start >= _affectedBoundary.y1; k--) {
          used = horizon[k].boundary === _affectedBoundary;
        }

        for (k = j + 1; !used && k < horizon.length && horizon[k].end <= _affectedBoundary.y2; k++) {
          used = horizon[k].boundary === _affectedBoundary;
        }

        for (k = 0; !used && k < changedHorizon.length; k++) {
          used = changedHorizon[k].boundary === _affectedBoundary;
        }

        if (!used) {
          _affectedBoundary.x2New = maxXNew;
        }
      }

      Array.prototype.splice.apply(horizon, [i, j - i + 1].concat(changedHorizon));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  for (var _i3 = 0, _horizon = horizon; _i3 < _horizon.length; _i3++) {
    var horizonPart = _horizon[_i3];
    var affectedBoundary = horizonPart.boundary;

    if (affectedBoundary.x2New === undefined) {
      affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
    }
  }
}

var TextLayerRenderTask = /*#__PURE__*/function () {
  function TextLayerRenderTask(_ref) {
    var _globalThis$FontInspe,
        _this = this;

    var textContent = _ref.textContent,
        textContentStream = _ref.textContentStream,
        container = _ref.container,
        viewport = _ref.viewport,
        textDivs = _ref.textDivs,
        textContentItemsStr = _ref.textContentItemsStr,
        enhanceTextSelection = _ref.enhanceTextSelection;

    _classCallCheck(this, TextLayerRenderTask);

    this._textContent = textContent;
    this._textContentStream = textContentStream;
    this._container = container;
    this._document = container.ownerDocument;
    this._viewport = viewport;
    this._textDivs = textDivs || [];
    this._textContentItemsStr = textContentItemsStr || [];
    this._enhanceTextSelection = !!enhanceTextSelection;
    this._fontInspectorEnabled = !!((_globalThis$FontInspe = globalThis.FontInspector) !== null && _globalThis$FontInspe !== void 0 && _globalThis$FontInspe.enabled);
    this._reader = null;
    this._layoutTextLastFontSize = null;
    this._layoutTextLastFontFamily = null;
    this._layoutTextCtx = null;
    this._textDivProperties = new WeakMap();
    this._renderingDone = false;
    this._canceled = false;
    this._capability = (0, _util.createPromiseCapability)();
    this._renderTimer = null;
    this._bounds = [];

    this._capability.promise["finally"](function () {
      if (_this._layoutTextCtx) {
        _this._layoutTextCtx.canvas.width = 0;
        _this._layoutTextCtx.canvas.height = 0;
        _this._layoutTextCtx = null;
      }
    })["catch"](function () {});
  }

  _createClass(TextLayerRenderTask, [{
    key: "promise",
    get: function get() {
      return this._capability.promise;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._canceled = true;

      if (this._reader) {
        this._reader.cancel(new _util.AbortException("TextLayer task cancelled."));

        this._reader = null;
      }

      if (this._renderTimer !== null) {
        clearTimeout(this._renderTimer);
        this._renderTimer = null;
      }

      this._capability.reject(new Error("TextLayer task cancelled."));
    }
  }, {
    key: "_processItems",
    value: function _processItems(items, styleCache) {
      for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].str === undefined) {
          if (items[i].type === "beginMarkedContentProps" || items[i].type === "beginMarkedContent") {
            var parent = this._container;
            this._container = document.createElement("span");

            this._container.classList.add("markedContent");

            if (items[i].id !== null) {
              this._container.setAttribute("id", "".concat(items[i].id));
            }

            parent.appendChild(this._container);
          } else if (items[i].type === "endMarkedContent") {
            this._container = this._container.parentNode;
          }

          continue;
        }

        this._textContentItemsStr.push(items[i].str);

        appendText(this, items[i], styleCache, this._layoutTextCtx);
      }
    }
  }, {
    key: "_layoutText",
    value: function _layoutText(textDiv) {
      var textDivProperties = this._textDivProperties.get(textDiv);

      var transform = "";

      if (textDivProperties.canvasWidth !== 0 && textDivProperties.hasText) {
        var _textDiv$style = textDiv.style,
            fontSize = _textDiv$style.fontSize,
            fontFamily = _textDiv$style.fontFamily;

        if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
          this._layoutTextCtx.font = "".concat(fontSize, " ").concat(fontFamily);
          this._layoutTextLastFontSize = fontSize;
          this._layoutTextLastFontFamily = fontFamily;
        }

        try {
          var _this$_layoutTextCtx$ = this._layoutTextCtx.measureText(textDiv.textContent),
              width = _this$_layoutTextCtx$.width;

          if (width > 0) {
            textDivProperties.scale = textDivProperties.canvasWidth / width;
            transform = "scaleX(".concat(textDivProperties.scale, ")");
          }
        } catch (fingerprintIsBlockedException) {}
      }

      if (textDivProperties.angle !== 0) {
        transform = "rotate(".concat(textDivProperties.angle, "deg) ").concat(transform);
      }

      if (transform.length > 0) {
        if (this._enhanceTextSelection) {
          textDivProperties.originalTransform = transform;
        }

        textDiv.style.transform = transform;
      }

      if (textDivProperties.hasText) {
        this._container.appendChild(textDiv);
      }

      if (textDivProperties.hasEOL) {
        var br = document.createElement("br");
        br.setAttribute("role", "presentation");

        this._container.appendChild(br);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this2 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var capability = (0, _util.createPromiseCapability)();
      var styleCache = Object.create(null);

      var canvas = this._document.createElement("canvas");

      canvas.height = canvas.width = DEFAULT_FONT_SIZE;
      canvas.mozOpaque = true;
      this._layoutTextCtx = canvas.getContext("2d", {
        alpha: false
      });

      if (this._textContent) {
        var textItems = this._textContent.items;
        var textStyles = this._textContent.styles;

        this._processItems(textItems, textStyles);

        capability.resolve();
      } else if (this._textContentStream) {
        var pump = function pump() {
          _this2._reader.read().then(function (_ref2) {
            var value = _ref2.value,
                done = _ref2.done;

            if (done) {
              capability.resolve();
              return;
            }

            Object.assign(styleCache, value.styles);

            _this2._processItems(value.items, styleCache);

            pump();
          }, capability.reject);
        };

        this._reader = this._textContentStream.getReader();
        pump();
      } else {
        throw new Error('Neither "textContent" nor "textContentStream"' + " parameters specified.");
      }

      capability.promise.then(function () {
        styleCache = null;

        if (!timeout) {
          render(_this2);
        } else {
          _this2._renderTimer = setTimeout(function () {
            render(_this2);
            _this2._renderTimer = null;
          }, timeout);
        }
      }, this._capability.reject);
    }
  }, {
    key: "expandTextDivs",
    value: function expandTextDivs() {
      var expandDivs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._enhanceTextSelection || !this._renderingDone) {
        return;
      }

      if (this._bounds !== null) {
        expand(this);
        this._bounds = null;
      }

      var transformBuf = [],
          paddingBuf = [];

      for (var i = 0, ii = this._textDivs.length; i < ii; i++) {
        var div = this._textDivs[i];

        var divProps = this._textDivProperties.get(div);

        if (!divProps.hasText) {
          continue;
        }

        if (expandDivs) {
          transformBuf.length = 0;
          paddingBuf.length = 0;

          if (divProps.originalTransform) {
            transformBuf.push(divProps.originalTransform);
          }

          if (divProps.paddingTop > 0) {
            paddingBuf.push("".concat(divProps.paddingTop, "px"));
            transformBuf.push("translateY(".concat(-divProps.paddingTop, "px)"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingRight > 0) {
            paddingBuf.push("".concat(divProps.paddingRight / divProps.scale, "px"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingBottom > 0) {
            paddingBuf.push("".concat(divProps.paddingBottom, "px"));
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingLeft > 0) {
            paddingBuf.push("".concat(divProps.paddingLeft / divProps.scale, "px"));
            transformBuf.push("translateX(".concat(-divProps.paddingLeft / divProps.scale, "px)"));
          } else {
            paddingBuf.push(0);
          }

          div.style.padding = paddingBuf.join(" ");

          if (transformBuf.length) {
            div.style.transform = transformBuf.join(" ");
          }
        } else {
          div.style.padding = null;
          div.style.transform = divProps.originalTransform;
        }
      }
    }
  }]);

  return TextLayerRenderTask;
}();

function renderTextLayer(renderParameters) {
  var task = new TextLayerRenderTask({
    textContent: renderParameters.textContent,
    textContentStream: renderParameters.textContentStream,
    container: renderParameters.container,
    viewport: renderParameters.viewport,
    textDivs: renderParameters.textDivs,
    textContentItemsStr: renderParameters.textContentItemsStr,
    enhanceTextSelection: renderParameters.enhanceTextSelection
  });

  task._render(renderParameters.timeout);

  return task;
}

/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SVGGraphics = void 0;

var _util = __w_pdfjs_require__(4);

var _display_utils = __w_pdfjs_require__(1);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SVGGraphics = function SVGGraphics() {
  _classCallCheck(this, SVGGraphics);

  (0, _util.unreachable)("Not implemented: SVGGraphics");
};

exports.SVGGraphics = SVGGraphics;
{
  var opListToTree = function opListToTree(opList) {
    var opTree = [];
    var tmp = [];

    var _iterator = _createForOfIteratorHelper(opList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var opListElement = _step.value;

        if (opListElement.fn === "save") {
          opTree.push({
            fnId: 92,
            fn: "group",
            items: []
          });
          tmp.push(opTree);
          opTree = opTree[opTree.length - 1].items;
          continue;
        }

        if (opListElement.fn === "restore") {
          opTree = tmp.pop();
        } else {
          opTree.push(opListElement);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return opTree;
  };

  var pf = function pf(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }

    var s = value.toFixed(10);
    var i = s.length - 1;

    if (s[i] !== "0") {
      return s;
    }

    do {
      i--;
    } while (s[i] === "0");

    return s.substring(0, s[i] === "." ? i : i + 1);
  };

  var pm = function pm(m) {
    if (m[4] === 0 && m[5] === 0) {
      if (m[1] === 0 && m[2] === 0) {
        if (m[0] === 1 && m[3] === 1) {
          return "";
        }

        return "scale(".concat(pf(m[0]), " ").concat(pf(m[3]), ")");
      }

      if (m[0] === m[3] && m[1] === -m[2]) {
        var a = Math.acos(m[0]) * 180 / Math.PI;
        return "rotate(".concat(pf(a), ")");
      }
    } else {
      if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
        return "translate(".concat(pf(m[4]), " ").concat(pf(m[5]), ")");
      }
    }

    return "matrix(".concat(pf(m[0]), " ").concat(pf(m[1]), " ").concat(pf(m[2]), " ").concat(pf(m[3]), " ").concat(pf(m[4]), " ") + "".concat(pf(m[5]), ")");
  };

  var SVG_DEFAULTS = {
    fontStyle: "normal",
    fontWeight: "normal",
    fillColor: "#000000"
  };
  var XML_NS = "http://www.w3.org/XML/1998/namespace";
  var XLINK_NS = "http://www.w3.org/1999/xlink";
  var LINE_CAP_STYLES = ["butt", "round", "square"];
  var LINE_JOIN_STYLES = ["miter", "round", "bevel"];

  var convertImgDataToPng = function () {
    var PNG_HEADER = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    var CHUNK_WRAPPER_SIZE = 12;
    var crcTable = new Int32Array(256);

    for (var i = 0; i < 256; i++) {
      var c = i;

      for (var h = 0; h < 8; h++) {
        if (c & 1) {
          c = 0xedb88320 ^ c >> 1 & 0x7fffffff;
        } else {
          c = c >> 1 & 0x7fffffff;
        }
      }

      crcTable[i] = c;
    }

    function crc32(data, start, end) {
      var crc = -1;

      for (var _i = start; _i < end; _i++) {
        var a = (crc ^ data[_i]) & 0xff;
        var b = crcTable[a];
        crc = crc >>> 8 ^ b;
      }

      return crc ^ -1;
    }

    function writePngChunk(type, body, data, offset) {
      var p = offset;
      var len = body.length;
      data[p] = len >> 24 & 0xff;
      data[p + 1] = len >> 16 & 0xff;
      data[p + 2] = len >> 8 & 0xff;
      data[p + 3] = len & 0xff;
      p += 4;
      data[p] = type.charCodeAt(0) & 0xff;
      data[p + 1] = type.charCodeAt(1) & 0xff;
      data[p + 2] = type.charCodeAt(2) & 0xff;
      data[p + 3] = type.charCodeAt(3) & 0xff;
      p += 4;
      data.set(body, p);
      p += body.length;
      var crc = crc32(data, offset + 4, p);
      data[p] = crc >> 24 & 0xff;
      data[p + 1] = crc >> 16 & 0xff;
      data[p + 2] = crc >> 8 & 0xff;
      data[p + 3] = crc & 0xff;
    }

    function adler32(data, start, end) {
      var a = 1;
      var b = 0;

      for (var _i2 = start; _i2 < end; ++_i2) {
        a = (a + (data[_i2] & 0xff)) % 65521;
        b = (b + a) % 65521;
      }

      return b << 16 | a;
    }

    function deflateSync(literals) {
      return deflateSyncUncompressed(literals);
    }

    function deflateSyncUncompressed(literals) {
      var len = literals.length;
      var maxBlockLength = 0xffff;
      var deflateBlocks = Math.ceil(len / maxBlockLength);
      var idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);
      var pi = 0;
      idat[pi++] = 0x78;
      idat[pi++] = 0x9c;
      var pos = 0;

      while (len > maxBlockLength) {
        idat[pi++] = 0x00;
        idat[pi++] = 0xff;
        idat[pi++] = 0xff;
        idat[pi++] = 0x00;
        idat[pi++] = 0x00;
        idat.set(literals.subarray(pos, pos + maxBlockLength), pi);
        pi += maxBlockLength;
        pos += maxBlockLength;
        len -= maxBlockLength;
      }

      idat[pi++] = 0x01;
      idat[pi++] = len & 0xff;
      idat[pi++] = len >> 8 & 0xff;
      idat[pi++] = ~len & 0xffff & 0xff;
      idat[pi++] = (~len & 0xffff) >> 8 & 0xff;
      idat.set(literals.subarray(pos), pi);
      pi += literals.length - pos;
      var adler = adler32(literals, 0, literals.length);
      idat[pi++] = adler >> 24 & 0xff;
      idat[pi++] = adler >> 16 & 0xff;
      idat[pi++] = adler >> 8 & 0xff;
      idat[pi++] = adler & 0xff;
      return idat;
    }

    function encode(imgData, kind, forceDataSchema, isMask) {
      var width = imgData.width;
      var height = imgData.height;
      var bitDepth, colorType, lineSize;
      var bytes = imgData.data;

      switch (kind) {
        case _util.ImageKind.GRAYSCALE_1BPP:
          colorType = 0;
          bitDepth = 1;
          lineSize = width + 7 >> 3;
          break;

        case _util.ImageKind.RGB_24BPP:
          colorType = 2;
          bitDepth = 8;
          lineSize = width * 3;
          break;

        case _util.ImageKind.RGBA_32BPP:
          colorType = 6;
          bitDepth = 8;
          lineSize = width * 4;
          break;

        default:
          throw new Error("invalid format");
      }

      var literals = new Uint8Array((1 + lineSize) * height);
      var offsetLiterals = 0,
          offsetBytes = 0;

      for (var y = 0; y < height; ++y) {
        literals[offsetLiterals++] = 0;
        literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize), offsetLiterals);
        offsetBytes += lineSize;
        offsetLiterals += lineSize;
      }

      if (kind === _util.ImageKind.GRAYSCALE_1BPP && isMask) {
        offsetLiterals = 0;

        for (var _y = 0; _y < height; _y++) {
          offsetLiterals++;

          for (var _i3 = 0; _i3 < lineSize; _i3++) {
            literals[offsetLiterals++] ^= 0xff;
          }
        }
      }

      var ihdr = new Uint8Array([width >> 24 & 0xff, width >> 16 & 0xff, width >> 8 & 0xff, width & 0xff, height >> 24 & 0xff, height >> 16 & 0xff, height >> 8 & 0xff, height & 0xff, bitDepth, colorType, 0x00, 0x00, 0x00]);
      var idat = deflateSync(literals);
      var pngLength = PNG_HEADER.length + CHUNK_WRAPPER_SIZE * 3 + ihdr.length + idat.length;
      var data = new Uint8Array(pngLength);
      var offset = 0;
      data.set(PNG_HEADER, offset);
      offset += PNG_HEADER.length;
      writePngChunk("IHDR", ihdr, data, offset);
      offset += CHUNK_WRAPPER_SIZE + ihdr.length;
      writePngChunk("IDATA", idat, data, offset);
      offset += CHUNK_WRAPPER_SIZE + idat.length;
      writePngChunk("IEND", new Uint8Array(0), data, offset);
      return (0, _util.createObjectURL)(data, "image/png", forceDataSchema);
    }

    return function convertImgDataToPng(imgData, forceDataSchema, isMask) {
      var kind = imgData.kind === undefined ? _util.ImageKind.GRAYSCALE_1BPP : imgData.kind;
      return encode(imgData, kind, forceDataSchema, isMask);
    };
  }();

  var SVGExtraState = /*#__PURE__*/function () {
    function SVGExtraState() {
      _classCallCheck(this, SVGExtraState);

      this.fontSizeScale = 1;
      this.fontWeight = SVG_DEFAULTS.fontWeight;
      this.fontSize = 0;
      this.textMatrix = _util.IDENTITY_MATRIX;
      this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
      this.leading = 0;
      this.textRenderingMode = _util.TextRenderingMode.FILL;
      this.textMatrixScale = 1;
      this.x = 0;
      this.y = 0;
      this.lineX = 0;
      this.lineY = 0;
      this.charSpacing = 0;
      this.wordSpacing = 0;
      this.textHScale = 1;
      this.textRise = 0;
      this.fillColor = SVG_DEFAULTS.fillColor;
      this.strokeColor = "#000000";
      this.fillAlpha = 1;
      this.strokeAlpha = 1;
      this.lineWidth = 1;
      this.lineJoin = "";
      this.lineCap = "";
      this.miterLimit = 0;
      this.dashArray = [];
      this.dashPhase = 0;
      this.dependencies = [];
      this.activeClipUrl = null;
      this.clipGroup = null;
      this.maskId = "";
    }

    _createClass(SVGExtraState, [{
      key: "clone",
      value: function clone() {
        return Object.create(this);
      }
    }, {
      key: "setCurrentPoint",
      value: function setCurrentPoint(x, y) {
        this.x = x;
        this.y = y;
      }
    }]);

    return SVGExtraState;
  }();

  var clipCount = 0;
  var maskCount = 0;
  var shadingCount = 0;

  exports.SVGGraphics = SVGGraphics = /*#__PURE__*/function () {
    function SVGGraphics(commonObjs, objs) {
      var forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _classCallCheck(this, SVGGraphics);

      this.svgFactory = new _display_utils.DOMSVGFactory();
      this.current = new SVGExtraState();
      this.transformMatrix = _util.IDENTITY_MATRIX;
      this.transformStack = [];
      this.extraStack = [];
      this.commonObjs = commonObjs;
      this.objs = objs;
      this.pendingClip = null;
      this.pendingEOFill = false;
      this.embedFonts = false;
      this.embeddedFonts = Object.create(null);
      this.cssStyle = null;
      this.forceDataSchema = !!forceDataSchema;
      this._operatorIdMapping = [];

      for (var op in _util.OPS) {
        this._operatorIdMapping[_util.OPS[op]] = op;
      }
    }

    _createClass(SVGGraphics, [{
      key: "save",
      value: function save() {
        this.transformStack.push(this.transformMatrix);
        var old = this.current;
        this.extraStack.push(old);
        this.current = old.clone();
      }
    }, {
      key: "restore",
      value: function restore() {
        this.transformMatrix = this.transformStack.pop();
        this.current = this.extraStack.pop();
        this.pendingClip = null;
        this.tgrp = null;
      }
    }, {
      key: "group",
      value: function group(items) {
        this.save();
        this.executeOpTree(items);
        this.restore();
      }
    }, {
      key: "loadDependencies",
      value: function loadDependencies(operatorList) {
        var _this = this;

        var fnArray = operatorList.fnArray;
        var argsArray = operatorList.argsArray;

        for (var i = 0, ii = fnArray.length; i < ii; i++) {
          if (fnArray[i] !== _util.OPS.dependency) {
            continue;
          }

          var _iterator2 = _createForOfIteratorHelper(argsArray[i]),
              _step2;

          try {
            var _loop = function _loop() {
              var obj = _step2.value;
              var objsPool = obj.startsWith("g_") ? _this.commonObjs : _this.objs;
              var promise = new Promise(function (resolve) {
                objsPool.get(obj, resolve);
              });

              _this.current.dependencies.push(promise);
            };

            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return Promise.all(this.current.dependencies);
      }
    }, {
      key: "transform",
      value: function transform(a, b, c, d, e, f) {
        var transformMatrix = [a, b, c, d, e, f];
        this.transformMatrix = _util.Util.transform(this.transformMatrix, transformMatrix);
        this.tgrp = null;
      }
    }, {
      key: "getSVG",
      value: function getSVG(operatorList, viewport) {
        var _this2 = this;

        this.viewport = viewport;

        var svgElement = this._initialize(viewport);

        return this.loadDependencies(operatorList).then(function () {
          _this2.transformMatrix = _util.IDENTITY_MATRIX;

          _this2.executeOpTree(_this2.convertOpList(operatorList));

          return svgElement;
        });
      }
    }, {
      key: "convertOpList",
      value: function convertOpList(operatorList) {
        var operatorIdMapping = this._operatorIdMapping;
        var argsArray = operatorList.argsArray;
        var fnArray = operatorList.fnArray;
        var opList = [];

        for (var i = 0, ii = fnArray.length; i < ii; i++) {
          var fnId = fnArray[i];
          opList.push({
            fnId: fnId,
            fn: operatorIdMapping[fnId],
            args: argsArray[i]
          });
        }

        return opListToTree(opList);
      }
    }, {
      key: "executeOpTree",
      value: function executeOpTree(opTree) {
        var _iterator3 = _createForOfIteratorHelper(opTree),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var opTreeElement = _step3.value;
            var fn = opTreeElement.fn;
            var fnId = opTreeElement.fnId;
            var args = opTreeElement.args;

            switch (fnId | 0) {
              case _util.OPS.beginText:
                this.beginText();
                break;

              case _util.OPS.dependency:
                break;

              case _util.OPS.setLeading:
                this.setLeading(args);
                break;

              case _util.OPS.setLeadingMoveText:
                this.setLeadingMoveText(args[0], args[1]);
                break;

              case _util.OPS.setFont:
                this.setFont(args);
                break;

              case _util.OPS.showText:
                this.showText(args[0]);
                break;

              case _util.OPS.showSpacedText:
                this.showText(args[0]);
                break;

              case _util.OPS.endText:
                this.endText();
                break;

              case _util.OPS.moveText:
                this.moveText(args[0], args[1]);
                break;

              case _util.OPS.setCharSpacing:
                this.setCharSpacing(args[0]);
                break;

              case _util.OPS.setWordSpacing:
                this.setWordSpacing(args[0]);
                break;

              case _util.OPS.setHScale:
                this.setHScale(args[0]);
                break;

              case _util.OPS.setTextMatrix:
                this.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
                break;

              case _util.OPS.setTextRise:
                this.setTextRise(args[0]);
                break;

              case _util.OPS.setTextRenderingMode:
                this.setTextRenderingMode(args[0]);
                break;

              case _util.OPS.setLineWidth:
                this.setLineWidth(args[0]);
                break;

              case _util.OPS.setLineJoin:
                this.setLineJoin(args[0]);
                break;

              case _util.OPS.setLineCap:
                this.setLineCap(args[0]);
                break;

              case _util.OPS.setMiterLimit:
                this.setMiterLimit(args[0]);
                break;

              case _util.OPS.setFillRGBColor:
                this.setFillRGBColor(args[0], args[1], args[2]);
                break;

              case _util.OPS.setStrokeRGBColor:
                this.setStrokeRGBColor(args[0], args[1], args[2]);
                break;

              case _util.OPS.setStrokeColorN:
                this.setStrokeColorN(args);
                break;

              case _util.OPS.setFillColorN:
                this.setFillColorN(args);
                break;

              case _util.OPS.shadingFill:
                this.shadingFill(args[0]);
                break;

              case _util.OPS.setDash:
                this.setDash(args[0], args[1]);
                break;

              case _util.OPS.setRenderingIntent:
                this.setRenderingIntent(args[0]);
                break;

              case _util.OPS.setFlatness:
                this.setFlatness(args[0]);
                break;

              case _util.OPS.setGState:
                this.setGState(args[0]);
                break;

              case _util.OPS.fill:
                this.fill();
                break;

              case _util.OPS.eoFill:
                this.eoFill();
                break;

              case _util.OPS.stroke:
                this.stroke();
                break;

              case _util.OPS.fillStroke:
                this.fillStroke();
                break;

              case _util.OPS.eoFillStroke:
                this.eoFillStroke();
                break;

              case _util.OPS.clip:
                this.clip("nonzero");
                break;

              case _util.OPS.eoClip:
                this.clip("evenodd");
                break;

              case _util.OPS.paintSolidColorImageMask:
                this.paintSolidColorImageMask();
                break;

              case _util.OPS.paintImageXObject:
                this.paintImageXObject(args[0]);
                break;

              case _util.OPS.paintInlineImageXObject:
                this.paintInlineImageXObject(args[0]);
                break;

              case _util.OPS.paintImageMaskXObject:
                this.paintImageMaskXObject(args[0]);
                break;

              case _util.OPS.paintFormXObjectBegin:
                this.paintFormXObjectBegin(args[0], args[1]);
                break;

              case _util.OPS.paintFormXObjectEnd:
                this.paintFormXObjectEnd();
                break;

              case _util.OPS.closePath:
                this.closePath();
                break;

              case _util.OPS.closeStroke:
                this.closeStroke();
                break;

              case _util.OPS.closeFillStroke:
                this.closeFillStroke();
                break;

              case _util.OPS.closeEOFillStroke:
                this.closeEOFillStroke();
                break;

              case _util.OPS.nextLine:
                this.nextLine();
                break;

              case _util.OPS.transform:
                this.transform(args[0], args[1], args[2], args[3], args[4], args[5]);
                break;

              case _util.OPS.constructPath:
                this.constructPath(args[0], args[1]);
                break;

              case _util.OPS.endPath:
                this.endPath();
                break;

              case 92:
                this.group(opTreeElement.items);
                break;

              default:
                (0, _util.warn)("Unimplemented operator ".concat(fn));
                break;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }, {
      key: "setWordSpacing",
      value: function setWordSpacing(wordSpacing) {
        this.current.wordSpacing = wordSpacing;
      }
    }, {
      key: "setCharSpacing",
      value: function setCharSpacing(charSpacing) {
        this.current.charSpacing = charSpacing;
      }
    }, {
      key: "nextLine",
      value: function nextLine() {
        this.moveText(0, this.current.leading);
      }
    }, {
      key: "setTextMatrix",
      value: function setTextMatrix(a, b, c, d, e, f) {
        var current = this.current;
        current.textMatrix = current.lineMatrix = [a, b, c, d, e, f];
        current.textMatrixScale = Math.hypot(a, b);
        current.x = current.lineX = 0;
        current.y = current.lineY = 0;
        current.xcoords = [];
        current.ycoords = [];
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", "".concat(pf(current.fontSize), "px"));
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
        current.txtElement = this.svgFactory.createElement("svg:text");
        current.txtElement.appendChild(current.tspan);
      }
    }, {
      key: "beginText",
      value: function beginText() {
        var current = this.current;
        current.x = current.lineX = 0;
        current.y = current.lineY = 0;
        current.textMatrix = _util.IDENTITY_MATRIX;
        current.lineMatrix = _util.IDENTITY_MATRIX;
        current.textMatrixScale = 1;
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.txtElement = this.svgFactory.createElement("svg:text");
        current.txtgrp = this.svgFactory.createElement("svg:g");
        current.xcoords = [];
        current.ycoords = [];
      }
    }, {
      key: "moveText",
      value: function moveText(x, y) {
        var current = this.current;
        current.x = current.lineX += x;
        current.y = current.lineY += y;
        current.xcoords = [];
        current.ycoords = [];
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", "".concat(pf(current.fontSize), "px"));
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
      }
    }, {
      key: "showText",
      value: function showText(glyphs) {
        var current = this.current;
        var font = current.font;
        var fontSize = current.fontSize;

        if (fontSize === 0) {
          return;
        }

        var fontSizeScale = current.fontSizeScale;
        var charSpacing = current.charSpacing;
        var wordSpacing = current.wordSpacing;
        var fontDirection = current.fontDirection;
        var textHScale = current.textHScale * fontDirection;
        var vertical = font.vertical;
        var spacingDir = vertical ? 1 : -1;
        var defaultVMetrics = font.defaultVMetrics;
        var widthAdvanceScale = fontSize * current.fontMatrix[0];
        var x = 0;

        var _iterator4 = _createForOfIteratorHelper(glyphs),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var glyph = _step4.value;

            if (glyph === null) {
              x += fontDirection * wordSpacing;
              continue;
            } else if ((0, _util.isNum)(glyph)) {
              x += spacingDir * glyph * fontSize / 1000;
              continue;
            }

            var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
            var character = glyph.fontChar;
            var scaledX = void 0,
                scaledY = void 0;
            var width = glyph.width;

            if (vertical) {
              var vx = void 0;
              var vmetric = glyph.vmetric || defaultVMetrics;
              vx = glyph.vmetric ? vmetric[1] : width * 0.5;
              vx = -vx * widthAdvanceScale;
              var vy = vmetric[2] * widthAdvanceScale;
              width = vmetric ? -vmetric[0] : width;
              scaledX = vx / fontSizeScale;
              scaledY = (x + vy) / fontSizeScale;
            } else {
              scaledX = x / fontSizeScale;
              scaledY = 0;
            }

            if (glyph.isInFont || font.missingFile) {
              current.xcoords.push(current.x + scaledX);

              if (vertical) {
                current.ycoords.push(-current.y + scaledY);
              }

              current.tspan.textContent += character;
            } else {}

            var charWidth = void 0;

            if (vertical) {
              charWidth = width * widthAdvanceScale - spacing * fontDirection;
            } else {
              charWidth = width * widthAdvanceScale + spacing * fontDirection;
            }

            x += charWidth;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        current.tspan.setAttributeNS(null, "x", current.xcoords.map(pf).join(" "));

        if (vertical) {
          current.tspan.setAttributeNS(null, "y", current.ycoords.map(pf).join(" "));
        } else {
          current.tspan.setAttributeNS(null, "y", pf(-current.y));
        }

        if (vertical) {
          current.y -= x;
        } else {
          current.x += x * textHScale;
        }

        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", "".concat(pf(current.fontSize), "px"));

        if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {
          current.tspan.setAttributeNS(null, "font-style", current.fontStyle);
        }

        if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {
          current.tspan.setAttributeNS(null, "font-weight", current.fontWeight);
        }

        var fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

        if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          if (current.fillColor !== SVG_DEFAULTS.fillColor) {
            current.tspan.setAttributeNS(null, "fill", current.fillColor);
          }

          if (current.fillAlpha < 1) {
            current.tspan.setAttributeNS(null, "fill-opacity", current.fillAlpha);
          }
        } else if (current.textRenderingMode === _util.TextRenderingMode.ADD_TO_PATH) {
          current.tspan.setAttributeNS(null, "fill", "transparent");
        } else {
          current.tspan.setAttributeNS(null, "fill", "none");
        }

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          var lineWidthScale = 1 / (current.textMatrixScale || 1);

          this._setStrokeAttributes(current.tspan, lineWidthScale);
        }

        var textMatrix = current.textMatrix;

        if (current.textRise !== 0) {
          textMatrix = textMatrix.slice();
          textMatrix[5] += current.textRise;
        }

        current.txtElement.setAttributeNS(null, "transform", "".concat(pm(textMatrix), " scale(").concat(pf(textHScale), ", -1)"));
        current.txtElement.setAttributeNS(XML_NS, "xml:space", "preserve");
        current.txtElement.appendChild(current.tspan);
        current.txtgrp.appendChild(current.txtElement);

        this._ensureTransformGroup().appendChild(current.txtElement);
      }
    }, {
      key: "setLeadingMoveText",
      value: function setLeadingMoveText(x, y) {
        this.setLeading(-y);
        this.moveText(x, y);
      }
    }, {
      key: "addFontStyle",
      value: function addFontStyle(fontObj) {
        if (!fontObj.data) {
          throw new Error("addFontStyle: No font data available, " + 'ensure that the "fontExtraProperties" API parameter is set.');
        }

        if (!this.cssStyle) {
          this.cssStyle = this.svgFactory.createElement("svg:style");
          this.cssStyle.setAttributeNS(null, "type", "text/css");
          this.defs.appendChild(this.cssStyle);
        }

        var url = (0, _util.createObjectURL)(fontObj.data, fontObj.mimetype, this.forceDataSchema);
        this.cssStyle.textContent += "@font-face { font-family: \"".concat(fontObj.loadedName, "\";") + " src: url(".concat(url, "); }\n");
      }
    }, {
      key: "setFont",
      value: function setFont(details) {
        var current = this.current;
        var fontObj = this.commonObjs.get(details[0]);
        var size = details[1];
        current.font = fontObj;

        if (this.embedFonts && !fontObj.missingFile && !this.embeddedFonts[fontObj.loadedName]) {
          this.addFontStyle(fontObj);
          this.embeddedFonts[fontObj.loadedName] = fontObj;
        }

        current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        var bold = "normal";

        if (fontObj.black) {
          bold = "900";
        } else if (fontObj.bold) {
          bold = "bold";
        }

        var italic = fontObj.italic ? "italic" : "normal";

        if (size < 0) {
          size = -size;
          current.fontDirection = -1;
        } else {
          current.fontDirection = 1;
        }

        current.fontSize = size;
        current.fontFamily = fontObj.loadedName;
        current.fontWeight = bold;
        current.fontStyle = italic;
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
        current.xcoords = [];
        current.ycoords = [];
      }
    }, {
      key: "endText",
      value: function endText() {
        var _current$txtElement;

        var current = this.current;

        if (current.textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG && (_current$txtElement = current.txtElement) !== null && _current$txtElement !== void 0 && _current$txtElement.hasChildNodes()) {
          current.element = current.txtElement;
          this.clip("nonzero");
          this.endPath();
        }
      }
    }, {
      key: "setLineWidth",
      value: function setLineWidth(width) {
        if (width > 0) {
          this.current.lineWidth = width;
        }
      }
    }, {
      key: "setLineCap",
      value: function setLineCap(style) {
        this.current.lineCap = LINE_CAP_STYLES[style];
      }
    }, {
      key: "setLineJoin",
      value: function setLineJoin(style) {
        this.current.lineJoin = LINE_JOIN_STYLES[style];
      }
    }, {
      key: "setMiterLimit",
      value: function setMiterLimit(limit) {
        this.current.miterLimit = limit;
      }
    }, {
      key: "setStrokeAlpha",
      value: function setStrokeAlpha(strokeAlpha) {
        this.current.strokeAlpha = strokeAlpha;
      }
    }, {
      key: "setStrokeRGBColor",
      value: function setStrokeRGBColor(r, g, b) {
        this.current.strokeColor = _util.Util.makeHexColor(r, g, b);
      }
    }, {
      key: "setFillAlpha",
      value: function setFillAlpha(fillAlpha) {
        this.current.fillAlpha = fillAlpha;
      }
    }, {
      key: "setFillRGBColor",
      value: function setFillRGBColor(r, g, b) {
        this.current.fillColor = _util.Util.makeHexColor(r, g, b);
        this.current.tspan = this.svgFactory.createElement("svg:tspan");
        this.current.xcoords = [];
        this.current.ycoords = [];
      }
    }, {
      key: "setStrokeColorN",
      value: function setStrokeColorN(args) {
        this.current.strokeColor = this._makeColorN_Pattern(args);
      }
    }, {
      key: "setFillColorN",
      value: function setFillColorN(args) {
        this.current.fillColor = this._makeColorN_Pattern(args);
      }
    }, {
      key: "shadingFill",
      value: function shadingFill(args) {
        var width = this.viewport.width;
        var height = this.viewport.height;

        var inv = _util.Util.inverseTransform(this.transformMatrix);

        var bl = _util.Util.applyTransform([0, 0], inv);

        var br = _util.Util.applyTransform([0, height], inv);

        var ul = _util.Util.applyTransform([width, 0], inv);

        var ur = _util.Util.applyTransform([width, height], inv);

        var x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
        var y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
        var x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
        var y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
        var rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", x0);
        rect.setAttributeNS(null, "y", y0);
        rect.setAttributeNS(null, "width", x1 - x0);
        rect.setAttributeNS(null, "height", y1 - y0);
        rect.setAttributeNS(null, "fill", this._makeShadingPattern(args));

        if (this.current.fillAlpha < 1) {
          rect.setAttributeNS(null, "fill-opacity", this.current.fillAlpha);
        }

        this._ensureTransformGroup().appendChild(rect);
      }
    }, {
      key: "_makeColorN_Pattern",
      value: function _makeColorN_Pattern(args) {
        if (args[0] === "TilingPattern") {
          return this._makeTilingPattern(args);
        }

        return this._makeShadingPattern(args);
      }
    }, {
      key: "_makeTilingPattern",
      value: function _makeTilingPattern(args) {
        var color = args[1];
        var operatorList = args[2];
        var matrix = args[3] || _util.IDENTITY_MATRIX;

        var _args$ = _slicedToArray(args[4], 4),
            x0 = _args$[0],
            y0 = _args$[1],
            x1 = _args$[2],
            y1 = _args$[3];

        var xstep = args[5];
        var ystep = args[6];
        var paintType = args[7];
        var tilingId = "shading".concat(shadingCount++);

        var _Util$normalizeRect = _util.Util.normalizeRect([].concat(_toConsumableArray(_util.Util.applyTransform([x0, y0], matrix)), _toConsumableArray(_util.Util.applyTransform([x1, y1], matrix)))),
            _Util$normalizeRect2 = _slicedToArray(_Util$normalizeRect, 4),
            tx0 = _Util$normalizeRect2[0],
            ty0 = _Util$normalizeRect2[1],
            tx1 = _Util$normalizeRect2[2],
            ty1 = _Util$normalizeRect2[3];

        var _Util$singularValueDe = _util.Util.singularValueDecompose2dScale(matrix),
            _Util$singularValueDe2 = _slicedToArray(_Util$singularValueDe, 2),
            xscale = _Util$singularValueDe2[0],
            yscale = _Util$singularValueDe2[1];

        var txstep = xstep * xscale;
        var tystep = ystep * yscale;
        var tiling = this.svgFactory.createElement("svg:pattern");
        tiling.setAttributeNS(null, "id", tilingId);
        tiling.setAttributeNS(null, "patternUnits", "userSpaceOnUse");
        tiling.setAttributeNS(null, "width", txstep);
        tiling.setAttributeNS(null, "height", tystep);
        tiling.setAttributeNS(null, "x", "".concat(tx0));
        tiling.setAttributeNS(null, "y", "".concat(ty0));
        var svg = this.svg;
        var transformMatrix = this.transformMatrix;
        var fillColor = this.current.fillColor;
        var strokeColor = this.current.strokeColor;
        var bbox = this.svgFactory.create(tx1 - tx0, ty1 - ty0);
        this.svg = bbox;
        this.transformMatrix = matrix;

        if (paintType === 2) {
          var cssColor = _util.Util.makeHexColor.apply(_util.Util, _toConsumableArray(color));

          this.current.fillColor = cssColor;
          this.current.strokeColor = cssColor;
        }

        this.executeOpTree(this.convertOpList(operatorList));
        this.svg = svg;
        this.transformMatrix = transformMatrix;
        this.current.fillColor = fillColor;
        this.current.strokeColor = strokeColor;
        tiling.appendChild(bbox.childNodes[0]);
        this.defs.appendChild(tiling);
        return "url(#".concat(tilingId, ")");
      }
    }, {
      key: "_makeShadingPattern",
      value: function _makeShadingPattern(args) {
        switch (args[0]) {
          case "RadialAxial":
            var shadingId = "shading".concat(shadingCount++);
            var colorStops = args[3];
            var gradient;

            switch (args[1]) {
              case "axial":
                var point0 = args[4];
                var point1 = args[5];
                gradient = this.svgFactory.createElement("svg:linearGradient");
                gradient.setAttributeNS(null, "id", shadingId);
                gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                gradient.setAttributeNS(null, "x1", point0[0]);
                gradient.setAttributeNS(null, "y1", point0[1]);
                gradient.setAttributeNS(null, "x2", point1[0]);
                gradient.setAttributeNS(null, "y2", point1[1]);
                break;

              case "radial":
                var focalPoint = args[4];
                var circlePoint = args[5];
                var focalRadius = args[6];
                var circleRadius = args[7];
                gradient = this.svgFactory.createElement("svg:radialGradient");
                gradient.setAttributeNS(null, "id", shadingId);
                gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                gradient.setAttributeNS(null, "cx", circlePoint[0]);
                gradient.setAttributeNS(null, "cy", circlePoint[1]);
                gradient.setAttributeNS(null, "r", circleRadius);
                gradient.setAttributeNS(null, "fx", focalPoint[0]);
                gradient.setAttributeNS(null, "fy", focalPoint[1]);
                gradient.setAttributeNS(null, "fr", focalRadius);
                break;

              default:
                throw new Error("Unknown RadialAxial type: ".concat(args[1]));
            }

            var _iterator5 = _createForOfIteratorHelper(colorStops),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var colorStop = _step5.value;
                var stop = this.svgFactory.createElement("svg:stop");
                stop.setAttributeNS(null, "offset", colorStop[0]);
                stop.setAttributeNS(null, "stop-color", colorStop[1]);
                gradient.appendChild(stop);
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            this.defs.appendChild(gradient);
            return "url(#".concat(shadingId, ")");

          case "Mesh":
            (0, _util.warn)("Unimplemented pattern Mesh");
            return null;

          case "Dummy":
            return "hotpink";

          default:
            throw new Error("Unknown IR type: ".concat(args[0]));
        }
      }
    }, {
      key: "setDash",
      value: function setDash(dashArray, dashPhase) {
        this.current.dashArray = dashArray;
        this.current.dashPhase = dashPhase;
      }
    }, {
      key: "constructPath",
      value: function constructPath(ops, args) {
        var current = this.current;
        var x = current.x,
            y = current.y;
        var d = [];
        var j = 0;

        var _iterator6 = _createForOfIteratorHelper(ops),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var op = _step6.value;

            switch (op | 0) {
              case _util.OPS.rectangle:
                x = args[j++];
                y = args[j++];
                var width = args[j++];
                var height = args[j++];
                var xw = x + width;
                var yh = y + height;
                d.push("M", pf(x), pf(y), "L", pf(xw), pf(y), "L", pf(xw), pf(yh), "L", pf(x), pf(yh), "Z");
                break;

              case _util.OPS.moveTo:
                x = args[j++];
                y = args[j++];
                d.push("M", pf(x), pf(y));
                break;

              case _util.OPS.lineTo:
                x = args[j++];
                y = args[j++];
                d.push("L", pf(x), pf(y));
                break;

              case _util.OPS.curveTo:
                x = args[j + 4];
                y = args[j + 5];
                d.push("C", pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]), pf(x), pf(y));
                j += 6;
                break;

              case _util.OPS.curveTo2:
                d.push("C", pf(x), pf(y), pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]));
                x = args[j + 2];
                y = args[j + 3];
                j += 4;
                break;

              case _util.OPS.curveTo3:
                x = args[j + 2];
                y = args[j + 3];
                d.push("C", pf(args[j]), pf(args[j + 1]), pf(x), pf(y), pf(x), pf(y));
                j += 4;
                break;

              case _util.OPS.closePath:
                d.push("Z");
                break;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        d = d.join(" ");

        if (current.path && ops.length > 0 && ops[0] !== _util.OPS.rectangle && ops[0] !== _util.OPS.moveTo) {
          d = current.path.getAttributeNS(null, "d") + d;
        } else {
          current.path = this.svgFactory.createElement("svg:path");

          this._ensureTransformGroup().appendChild(current.path);
        }

        current.path.setAttributeNS(null, "d", d);
        current.path.setAttributeNS(null, "fill", "none");
        current.element = current.path;
        current.setCurrentPoint(x, y);
      }
    }, {
      key: "endPath",
      value: function endPath() {
        var current = this.current;
        current.path = null;

        if (!this.pendingClip) {
          return;
        }

        if (!current.element) {
          this.pendingClip = null;
          return;
        }

        var clipId = "clippath".concat(clipCount++);
        var clipPath = this.svgFactory.createElement("svg:clipPath");
        clipPath.setAttributeNS(null, "id", clipId);
        clipPath.setAttributeNS(null, "transform", pm(this.transformMatrix));
        var clipElement = current.element.cloneNode(true);

        if (this.pendingClip === "evenodd") {
          clipElement.setAttributeNS(null, "clip-rule", "evenodd");
        } else {
          clipElement.setAttributeNS(null, "clip-rule", "nonzero");
        }

        this.pendingClip = null;
        clipPath.appendChild(clipElement);
        this.defs.appendChild(clipPath);

        if (current.activeClipUrl) {
          current.clipGroup = null;

          var _iterator7 = _createForOfIteratorHelper(this.extraStack),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var prev = _step7.value;
              prev.clipGroup = null;
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          clipPath.setAttributeNS(null, "clip-path", current.activeClipUrl);
        }

        current.activeClipUrl = "url(#".concat(clipId, ")");
        this.tgrp = null;
      }
    }, {
      key: "clip",
      value: function clip(type) {
        this.pendingClip = type;
      }
    }, {
      key: "closePath",
      value: function closePath() {
        var current = this.current;

        if (current.path) {
          var d = "".concat(current.path.getAttributeNS(null, "d"), "Z");
          current.path.setAttributeNS(null, "d", d);
        }
      }
    }, {
      key: "setLeading",
      value: function setLeading(leading) {
        this.current.leading = -leading;
      }
    }, {
      key: "setTextRise",
      value: function setTextRise(textRise) {
        this.current.textRise = textRise;
      }
    }, {
      key: "setTextRenderingMode",
      value: function setTextRenderingMode(textRenderingMode) {
        this.current.textRenderingMode = textRenderingMode;
      }
    }, {
      key: "setHScale",
      value: function setHScale(scale) {
        this.current.textHScale = scale / 100;
      }
    }, {
      key: "setRenderingIntent",
      value: function setRenderingIntent(intent) {}
    }, {
      key: "setFlatness",
      value: function setFlatness(flatness) {}
    }, {
      key: "setGState",
      value: function setGState(states) {
        var _iterator8 = _createForOfIteratorHelper(states),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                key = _step8$value[0],
                value = _step8$value[1];

            switch (key) {
              case "LW":
                this.setLineWidth(value);
                break;

              case "LC":
                this.setLineCap(value);
                break;

              case "LJ":
                this.setLineJoin(value);
                break;

              case "ML":
                this.setMiterLimit(value);
                break;

              case "D":
                this.setDash(value[0], value[1]);
                break;

              case "RI":
                this.setRenderingIntent(value);
                break;

              case "FL":
                this.setFlatness(value);
                break;

              case "Font":
                this.setFont(value);
                break;

              case "CA":
                this.setStrokeAlpha(value);
                break;

              case "ca":
                this.setFillAlpha(value);
                break;

              default:
                (0, _util.warn)("Unimplemented graphic state operator ".concat(key));
                break;
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    }, {
      key: "fill",
      value: function fill() {
        var current = this.current;

        if (current.element) {
          current.element.setAttributeNS(null, "fill", current.fillColor);
          current.element.setAttributeNS(null, "fill-opacity", current.fillAlpha);
          this.endPath();
        }
      }
    }, {
      key: "stroke",
      value: function stroke() {
        var current = this.current;

        if (current.element) {
          this._setStrokeAttributes(current.element);

          current.element.setAttributeNS(null, "fill", "none");
          this.endPath();
        }
      }
    }, {
      key: "_setStrokeAttributes",
      value: function _setStrokeAttributes(element) {
        var lineWidthScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var current = this.current;
        var dashArray = current.dashArray;

        if (lineWidthScale !== 1 && dashArray.length > 0) {
          dashArray = dashArray.map(function (value) {
            return lineWidthScale * value;
          });
        }

        element.setAttributeNS(null, "stroke", current.strokeColor);
        element.setAttributeNS(null, "stroke-opacity", current.strokeAlpha);
        element.setAttributeNS(null, "stroke-miterlimit", pf(current.miterLimit));
        element.setAttributeNS(null, "stroke-linecap", current.lineCap);
        element.setAttributeNS(null, "stroke-linejoin", current.lineJoin);
        element.setAttributeNS(null, "stroke-width", pf(lineWidthScale * current.lineWidth) + "px");
        element.setAttributeNS(null, "stroke-dasharray", dashArray.map(pf).join(" "));
        element.setAttributeNS(null, "stroke-dashoffset", pf(lineWidthScale * current.dashPhase) + "px");
      }
    }, {
      key: "eoFill",
      value: function eoFill() {
        if (this.current.element) {
          this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
        }

        this.fill();
      }
    }, {
      key: "fillStroke",
      value: function fillStroke() {
        this.stroke();
        this.fill();
      }
    }, {
      key: "eoFillStroke",
      value: function eoFillStroke() {
        if (this.current.element) {
          this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
        }

        this.fillStroke();
      }
    }, {
      key: "closeStroke",
      value: function closeStroke() {
        this.closePath();
        this.stroke();
      }
    }, {
      key: "closeFillStroke",
      value: function closeFillStroke() {
        this.closePath();
        this.fillStroke();
      }
    }, {
      key: "closeEOFillStroke",
      value: function closeEOFillStroke() {
        this.closePath();
        this.eoFillStroke();
      }
    }, {
      key: "paintSolidColorImageMask",
      value: function paintSolidColorImageMask() {
        var rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", "1px");
        rect.setAttributeNS(null, "height", "1px");
        rect.setAttributeNS(null, "fill", this.current.fillColor);

        this._ensureTransformGroup().appendChild(rect);
      }
    }, {
      key: "paintImageXObject",
      value: function paintImageXObject(objId) {
        var imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)("Dependent image with object ID ".concat(objId, " is not ready yet"));
          return;
        }

        this.paintInlineImageXObject(imgData);
      }
    }, {
      key: "paintInlineImageXObject",
      value: function paintInlineImageXObject(imgData, mask) {
        var width = imgData.width;
        var height = imgData.height;
        var imgSrc = convertImgDataToPng(imgData, this.forceDataSchema, !!mask);
        var cliprect = this.svgFactory.createElement("svg:rect");
        cliprect.setAttributeNS(null, "x", "0");
        cliprect.setAttributeNS(null, "y", "0");
        cliprect.setAttributeNS(null, "width", pf(width));
        cliprect.setAttributeNS(null, "height", pf(height));
        this.current.element = cliprect;
        this.clip("nonzero");
        var imgEl = this.svgFactory.createElement("svg:image");
        imgEl.setAttributeNS(XLINK_NS, "xlink:href", imgSrc);
        imgEl.setAttributeNS(null, "x", "0");
        imgEl.setAttributeNS(null, "y", pf(-height));
        imgEl.setAttributeNS(null, "width", pf(width) + "px");
        imgEl.setAttributeNS(null, "height", pf(height) + "px");
        imgEl.setAttributeNS(null, "transform", "scale(".concat(pf(1 / width), " ").concat(pf(-1 / height), ")"));

        if (mask) {
          mask.appendChild(imgEl);
        } else {
          this._ensureTransformGroup().appendChild(imgEl);
        }
      }
    }, {
      key: "paintImageMaskXObject",
      value: function paintImageMaskXObject(imgData) {
        var current = this.current;
        var width = imgData.width;
        var height = imgData.height;
        var fillColor = current.fillColor;
        current.maskId = "mask".concat(maskCount++);
        var mask = this.svgFactory.createElement("svg:mask");
        mask.setAttributeNS(null, "id", current.maskId);
        var rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", pf(width));
        rect.setAttributeNS(null, "height", pf(height));
        rect.setAttributeNS(null, "fill", fillColor);
        rect.setAttributeNS(null, "mask", "url(#".concat(current.maskId, ")"));
        this.defs.appendChild(mask);

        this._ensureTransformGroup().appendChild(rect);

        this.paintInlineImageXObject(imgData, mask);
      }
    }, {
      key: "paintFormXObjectBegin",
      value: function paintFormXObjectBegin(matrix, bbox) {
        if (Array.isArray(matrix) && matrix.length === 6) {
          this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
        }

        if (bbox) {
          var width = bbox[2] - bbox[0];
          var height = bbox[3] - bbox[1];
          var cliprect = this.svgFactory.createElement("svg:rect");
          cliprect.setAttributeNS(null, "x", bbox[0]);
          cliprect.setAttributeNS(null, "y", bbox[1]);
          cliprect.setAttributeNS(null, "width", pf(width));
          cliprect.setAttributeNS(null, "height", pf(height));
          this.current.element = cliprect;
          this.clip("nonzero");
          this.endPath();
        }
      }
    }, {
      key: "paintFormXObjectEnd",
      value: function paintFormXObjectEnd() {}
    }, {
      key: "_initialize",
      value: function _initialize(viewport) {
        var svg = this.svgFactory.create(viewport.width, viewport.height);
        var definitions = this.svgFactory.createElement("svg:defs");
        svg.appendChild(definitions);
        this.defs = definitions;
        var rootGroup = this.svgFactory.createElement("svg:g");
        rootGroup.setAttributeNS(null, "transform", pm(viewport.transform));
        svg.appendChild(rootGroup);
        this.svg = rootGroup;
        return svg;
      }
    }, {
      key: "_ensureClipGroup",
      value: function _ensureClipGroup() {
        if (!this.current.clipGroup) {
          var clipGroup = this.svgFactory.createElement("svg:g");
          clipGroup.setAttributeNS(null, "clip-path", this.current.activeClipUrl);
          this.svg.appendChild(clipGroup);
          this.current.clipGroup = clipGroup;
        }

        return this.current.clipGroup;
      }
    }, {
      key: "_ensureTransformGroup",
      value: function _ensureTransformGroup() {
        if (!this.tgrp) {
          this.tgrp = this.svgFactory.createElement("svg:g");
          this.tgrp.setAttributeNS(null, "transform", pm(this.transformMatrix));

          if (this.current.activeClipUrl) {
            this._ensureClipGroup().appendChild(this.tgrp);
          } else {
            this.svg.appendChild(this.tgrp);
          }
        }

        return this.tgrp;
      }
    }]);

    return SVGGraphics;
  }();
}

/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XfaLayer = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XfaLayer = /*#__PURE__*/function () {
  function XfaLayer() {
    _classCallCheck(this, XfaLayer);
  }

  _createClass(XfaLayer, null, [{
    key: "setupStorage",
    value: function setupStorage(html, id, element, storage, intent) {
      var storedData = storage.getValue(id, {
        value: null
      });

      switch (element.name) {
        case "textarea":
          if (storedData.value !== null) {
            html.textContent = storedData.value;
          }

          if (intent === "print") {
            break;
          }

          html.addEventListener("input", function (event) {
            storage.setValue(id, {
              value: event.target.value
            });
          });
          break;

        case "input":
          if (element.attributes.type === "radio" || element.attributes.type === "checkbox") {
            if (storedData.value === element.attributes.xfaOn) {
              html.setAttribute("checked", true);
            }

            if (intent === "print") {
              break;
            }

            html.addEventListener("change", function (event) {
              storage.setValue(id, {
                value: event.target.getAttribute("xfaOn")
              });
            });
          } else {
            if (storedData.value !== null) {
              html.setAttribute("value", storedData.value);
            }

            if (intent === "print") {
              break;
            }

            html.addEventListener("input", function (event) {
              storage.setValue(id, {
                value: event.target.value
              });
            });
          }

          break;

        case "select":
          if (storedData.value !== null) {
            var _iterator = _createForOfIteratorHelper(element.children),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var option = _step.value;

                if (option.attributes.value === storedData.value) {
                  option.attributes.selected = true;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          html.addEventListener("input", function (event) {
            var options = event.target.options;
            var value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
            storage.setValue(id, {
              value: value
            });
          });
          break;
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(html, element, storage, intent) {
      var attributes = element.attributes;

      if (attributes.type === "radio") {
        attributes.name = "".concat(attributes.name, "-").concat(intent);
      }

      for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (value === null || value === undefined || key === "dataId") {
          continue;
        }

        if (key !== "style") {
          if (key === "textContent") {
            html.textContent = value;
          } else if (key === "class") {
            html.setAttribute(key, value.join(" "));
          } else {
            html.setAttribute(key, value);
          }
        } else {
          Object.assign(html.style, value);
        }
      }

      if (storage && attributes.dataId) {
        this.setupStorage(html, attributes.dataId, element, storage);
      }
    }
  }, {
    key: "render",
    value: function render(parameters) {
      var storage = parameters.annotationStorage;
      var root = parameters.xfa;
      var intent = parameters.intent || "display";
      var rootHtml = document.createElement(root.name);

      if (root.attributes) {
        this.setAttributes(rootHtml, root);
      }

      var stack = [[root, -1, rootHtml]];
      var rootDiv = parameters.div;
      rootDiv.appendChild(rootHtml);
      var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
      rootDiv.style.transform = transform;
      rootDiv.setAttribute("class", "xfaLayer xfaFont");

      while (stack.length > 0) {
        var _child$attributes;

        var _stack = _slicedToArray(stack[stack.length - 1], 3),
            parent = _stack[0],
            i = _stack[1],
            html = _stack[2];

        if (i + 1 === parent.children.length) {
          stack.pop();
          continue;
        }

        var child = parent.children[++stack[stack.length - 1][1]];

        if (child === null) {
          continue;
        }

        var name = child.name;

        if (name === "#text") {
          html.appendChild(document.createTextNode(child.value));
          continue;
        }

        var childHtml = void 0;

        if (child !== null && child !== void 0 && (_child$attributes = child.attributes) !== null && _child$attributes !== void 0 && _child$attributes.xmlns) {
          childHtml = document.createElementNS(child.attributes.xmlns, name);
        } else {
          childHtml = document.createElement(name);
        }

        html.appendChild(childHtml);

        if (child.attributes) {
          this.setAttributes(childHtml, child, storage, intent);
        }

        if (child.children && child.children.length > 0) {
          stack.push([child, -1, childHtml]);
        } else if (child.value) {
          childHtml.appendChild(document.createTextNode(child.value));
        }
      }

      var _iterator2 = _createForOfIteratorHelper(rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;
          el.setAttribute("readOnly", true);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "update",
    value: function update(parameters) {
      var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
      parameters.div.style.transform = transform;
      parameters.div.hidden = false;
    }
  }]);

  return XfaLayer;
}();

exports.XfaLayer = XfaLayer;

/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFNodeStream = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _network_utils = __w_pdfjs_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

var fs = require("fs");

var http = require("http");

var https = require("https");

var url = require("url");

var fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;

function parseUrl(sourceUrl) {
  var parsedUrl = url.parse(sourceUrl);

  if (parsedUrl.protocol === "file:" || parsedUrl.host) {
    return parsedUrl;
  }

  if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
    return url.parse("file:///".concat(sourceUrl));
  }

  if (!parsedUrl.host) {
    parsedUrl.protocol = "file:";
  }

  return parsedUrl;
}

var PDFNodeStream = /*#__PURE__*/function () {
  function PDFNodeStream(source) {
    _classCallCheck(this, PDFNodeStream);

    this.source = source;
    this.url = parseUrl(source.url);
    this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:" || this.url.protocol === "capacitor:";
    this.isFsUrl = this.url.protocol === "file:";
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  _createClass(PDFNodeStream, [{
    key: "_progressiveDataLength",
    get: function get() {
      var _this$_fullRequestRea, _this$_fullRequestRea2;

      return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
    }
  }, {
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
      this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
      return this._fullRequestReader;
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(start, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      var rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);

      this._rangeRequestReaders.push(rangeReader);

      return rangeReader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var _iterator = _createForOfIteratorHelper(this._rangeRequestReaders.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reader = _step.value;
          reader.cancel(reason);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return PDFNodeStream;
}();

exports.PDFNodeStream = PDFNodeStream;

var BaseFullReader = /*#__PURE__*/function () {
  function BaseFullReader(stream) {
    _classCallCheck(this, BaseFullReader);

    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    var source = stream.source;
    this._contentLength = source.length;
    this._loaded = 0;
    this._filename = null;
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;

    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }

    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._readableStream = null;
    this._readCapability = (0, _util.createPromiseCapability)();
    this._headersCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(BaseFullReader, [{
    key: "headersReady",
    get: function get() {
      return this._headersCapability.promise;
    }
  }, {
    key: "filename",
    get: function get() {
      return this._filename;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._contentLength;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._isRangeSupported;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var chunk, buffer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._readCapability.promise;

              case 2:
                if (!this._done) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 4:
                if (!this._storedError) {
                  _context.next = 6;
                  break;
                }

                throw this._storedError;

              case 6:
                chunk = this._readableStream.read();

                if (!(chunk === null)) {
                  _context.next = 10;
                  break;
                }

                this._readCapability = (0, _util.createPromiseCapability)();
                return _context.abrupt("return", this.read());

              case 10:
                this._loaded += chunk.length;

                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded,
                    total: this._contentLength
                  });
                }

                buffer = new Uint8Array(chunk).buffer;
                return _context.abrupt("return", {
                  value: buffer,
                  done: false
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);

        return;
      }

      this._readableStream.destroy(reason);
    }
  }, {
    key: "_error",
    value: function _error(reason) {
      this._storedError = reason;

      this._readCapability.resolve();
    }
  }, {
    key: "_setReadableStream",
    value: function _setReadableStream(readableStream) {
      var _this = this;

      this._readableStream = readableStream;
      readableStream.on("readable", function () {
        _this._readCapability.resolve();
      });
      readableStream.on("end", function () {
        readableStream.destroy();
        _this._done = true;

        _this._readCapability.resolve();
      });
      readableStream.on("error", function (reason) {
        _this._error(reason);
      });

      if (!this._isStreamingSupported && this._isRangeSupported) {
        this._error(new _util.AbortException("streaming is disabled"));
      }

      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }
  }]);

  return BaseFullReader;
}();

var BaseRangeReader = /*#__PURE__*/function () {
  function BaseRangeReader(stream) {
    _classCallCheck(this, BaseRangeReader);

    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    this._loaded = 0;
    this._readableStream = null;
    this._readCapability = (0, _util.createPromiseCapability)();
    var source = stream.source;
    this._isStreamingSupported = !source.disableStream;
  }

  _createClass(BaseRangeReader, [{
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var chunk, buffer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._readCapability.promise;

              case 2:
                if (!this._done) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 4:
                if (!this._storedError) {
                  _context2.next = 6;
                  break;
                }

                throw this._storedError;

              case 6:
                chunk = this._readableStream.read();

                if (!(chunk === null)) {
                  _context2.next = 10;
                  break;
                }

                this._readCapability = (0, _util.createPromiseCapability)();
                return _context2.abrupt("return", this.read());

              case 10:
                this._loaded += chunk.length;

                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded
                  });
                }

                buffer = new Uint8Array(chunk).buffer;
                return _context2.abrupt("return", {
                  value: buffer,
                  done: false
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);

        return;
      }

      this._readableStream.destroy(reason);
    }
  }, {
    key: "_error",
    value: function _error(reason) {
      this._storedError = reason;

      this._readCapability.resolve();
    }
  }, {
    key: "_setReadableStream",
    value: function _setReadableStream(readableStream) {
      var _this2 = this;

      this._readableStream = readableStream;
      readableStream.on("readable", function () {
        _this2._readCapability.resolve();
      });
      readableStream.on("end", function () {
        readableStream.destroy();
        _this2._done = true;

        _this2._readCapability.resolve();
      });
      readableStream.on("error", function (reason) {
        _this2._error(reason);
      });

      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }
  }]);

  return BaseRangeReader;
}();

function createRequestOptions(parsedUrl, headers) {
  return {
    protocol: parsedUrl.protocol,
    auth: parsedUrl.auth,
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: "GET",
    headers: headers
  };
}

var PDFNodeStreamFullReader = /*#__PURE__*/function (_BaseFullReader) {
  _inherits(PDFNodeStreamFullReader, _BaseFullReader);

  var _super = _createSuper(PDFNodeStreamFullReader);

  function PDFNodeStreamFullReader(stream) {
    var _this3;

    _classCallCheck(this, PDFNodeStreamFullReader);

    _this3 = _super.call(this, stream);

    var handleResponse = function handleResponse(response) {
      if (response.statusCode === 404) {
        var error = new _util.MissingPDFException("Missing PDF \"".concat(_this3._url, "\"."));
        _this3._storedError = error;

        _this3._headersCapability.reject(error);

        return;
      }

      _this3._headersCapability.resolve();

      _this3._setReadableStream(response);

      var getResponseHeader = function getResponseHeader(name) {
        return _this3._readableStream.headers[name.toLowerCase()];
      };

      var _validateRangeRequest = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader: getResponseHeader,
        isHttp: stream.isHttp,
        rangeChunkSize: _this3._rangeChunkSize,
        disableRange: _this3._disableRange
      }),
          allowRangeRequests = _validateRangeRequest.allowRangeRequests,
          suggestedLength = _validateRangeRequest.suggestedLength;

      _this3._isRangeSupported = allowRangeRequests;
      _this3._contentLength = suggestedLength || _this3._contentLength;
      _this3._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
    };

    _this3._request = null;

    if (_this3._url.protocol === "http:") {
      _this3._request = http.request(createRequestOptions(_this3._url, stream.httpHeaders), handleResponse);
    } else {
      _this3._request = https.request(createRequestOptions(_this3._url, stream.httpHeaders), handleResponse);
    }

    _this3._request.on("error", function (reason) {
      _this3._storedError = reason;

      _this3._headersCapability.reject(reason);
    });

    _this3._request.end();

    return _this3;
  }

  return PDFNodeStreamFullReader;
}(BaseFullReader);

var PDFNodeStreamRangeReader = /*#__PURE__*/function (_BaseRangeReader) {
  _inherits(PDFNodeStreamRangeReader, _BaseRangeReader);

  var _super2 = _createSuper(PDFNodeStreamRangeReader);

  function PDFNodeStreamRangeReader(stream, start, end) {
    var _this4;

    _classCallCheck(this, PDFNodeStreamRangeReader);

    _this4 = _super2.call(this, stream);
    _this4._httpHeaders = {};

    for (var property in stream.httpHeaders) {
      var value = stream.httpHeaders[property];

      if (typeof value === "undefined") {
        continue;
      }

      _this4._httpHeaders[property] = value;
    }

    _this4._httpHeaders.Range = "bytes=".concat(start, "-").concat(end - 1);

    var handleResponse = function handleResponse(response) {
      if (response.statusCode === 404) {
        var error = new _util.MissingPDFException("Missing PDF \"".concat(_this4._url, "\"."));
        _this4._storedError = error;
        return;
      }

      _this4._setReadableStream(response);
    };

    _this4._request = null;

    if (_this4._url.protocol === "http:") {
      _this4._request = http.request(createRequestOptions(_this4._url, _this4._httpHeaders), handleResponse);
    } else {
      _this4._request = https.request(createRequestOptions(_this4._url, _this4._httpHeaders), handleResponse);
    }

    _this4._request.on("error", function (reason) {
      _this4._storedError = reason;
    });

    _this4._request.end();

    return _this4;
  }

  return PDFNodeStreamRangeReader;
}(BaseRangeReader);

var PDFNodeStreamFsFullReader = /*#__PURE__*/function (_BaseFullReader2) {
  _inherits(PDFNodeStreamFsFullReader, _BaseFullReader2);

  var _super3 = _createSuper(PDFNodeStreamFsFullReader);

  function PDFNodeStreamFsFullReader(stream) {
    var _this5;

    _classCallCheck(this, PDFNodeStreamFsFullReader);

    _this5 = _super3.call(this, stream);
    var path = decodeURIComponent(_this5._url.path);

    if (fileUriRegex.test(_this5._url.href)) {
      path = path.replace(/^\//, "");
    }

    fs.lstat(path, function (error, stat) {
      if (error) {
        if (error.code === "ENOENT") {
          error = new _util.MissingPDFException("Missing PDF \"".concat(path, "\"."));
        }

        _this5._storedError = error;

        _this5._headersCapability.reject(error);

        return;
      }

      _this5._contentLength = stat.size;

      _this5._setReadableStream(fs.createReadStream(path));

      _this5._headersCapability.resolve();
    });
    return _this5;
  }

  return PDFNodeStreamFsFullReader;
}(BaseFullReader);

var PDFNodeStreamFsRangeReader = /*#__PURE__*/function (_BaseRangeReader2) {
  _inherits(PDFNodeStreamFsRangeReader, _BaseRangeReader2);

  var _super4 = _createSuper(PDFNodeStreamFsRangeReader);

  function PDFNodeStreamFsRangeReader(stream, start, end) {
    var _this6;

    _classCallCheck(this, PDFNodeStreamFsRangeReader);

    _this6 = _super4.call(this, stream);
    var path = decodeURIComponent(_this6._url.path);

    if (fileUriRegex.test(_this6._url.href)) {
      path = path.replace(/^\//, "");
    }

    _this6._setReadableStream(fs.createReadStream(path, {
      start: start,
      end: end - 1
    }));

    return _this6;
  }

  return PDFNodeStreamFsRangeReader;
}(BaseRangeReader);

/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createResponseStatusError = createResponseStatusError;
exports.extractFilenameFromHeader = extractFilenameFromHeader;
exports.validateRangeRequestCapabilities = validateRangeRequestCapabilities;
exports.validateResponseStatus = validateResponseStatus;

var _util = __w_pdfjs_require__(4);

var _content_disposition = __w_pdfjs_require__(136);

var _display_utils = __w_pdfjs_require__(1);

function validateRangeRequestCapabilities(_ref) {
  var getResponseHeader = _ref.getResponseHeader,
      isHttp = _ref.isHttp,
      rangeChunkSize = _ref.rangeChunkSize,
      disableRange = _ref.disableRange;
  (0, _util.assert)(rangeChunkSize > 0, "Range chunk size must be larger than zero");
  var returnValues = {
    allowRangeRequests: false,
    suggestedLength: undefined
  };
  var length = parseInt(getResponseHeader("Content-Length"), 10);

  if (!Number.isInteger(length)) {
    return returnValues;
  }

  returnValues.suggestedLength = length;

  if (length <= 2 * rangeChunkSize) {
    return returnValues;
  }

  if (disableRange || !isHttp) {
    return returnValues;
  }

  if (getResponseHeader("Accept-Ranges") !== "bytes") {
    return returnValues;
  }

  var contentEncoding = getResponseHeader("Content-Encoding") || "identity";

  if (contentEncoding !== "identity") {
    return returnValues;
  }

  returnValues.allowRangeRequests = true;
  return returnValues;
}

function extractFilenameFromHeader(getResponseHeader) {
  var contentDisposition = getResponseHeader("Content-Disposition");

  if (contentDisposition) {
    var filename = (0, _content_disposition.getFilenameFromContentDispositionHeader)(contentDisposition);

    if (filename.includes("%")) {
      try {
        filename = decodeURIComponent(filename);
      } catch (ex) {}
    }

    if ((0, _display_utils.isPdfFile)(filename)) {
      return filename;
    }
  }

  return null;
}

function createResponseStatusError(status, url) {
  if (status === 404 || status === 0 && url.startsWith("file:")) {
    return new _util.MissingPDFException('Missing PDF "' + url + '".');
  }

  return new _util.UnexpectedResponseException("Unexpected server response (".concat(status, ") while retrieving PDF \"").concat(url, "\"."), status);
}

function validateResponseStatus(status) {
  return status === 200 || status === 206;
}

/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFilenameFromContentDispositionHeader = getFilenameFromContentDispositionHeader;

var _util = __w_pdfjs_require__(4);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getFilenameFromContentDispositionHeader(contentDisposition) {
  var needsEncodingFixup = true;
  var tmp = toParamRegExp("filename\\*", "i").exec(contentDisposition);

  if (tmp) {
    tmp = tmp[1];
    var filename = rfc2616unquote(tmp);
    filename = unescape(filename);
    filename = rfc5987decode(filename);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
  }

  tmp = rfc2231getparam(contentDisposition);

  if (tmp) {
    var _filename = rfc2047decode(tmp);

    return fixupEncoding(_filename);
  }

  tmp = toParamRegExp("filename", "i").exec(contentDisposition);

  if (tmp) {
    tmp = tmp[1];

    var _filename2 = rfc2616unquote(tmp);

    _filename2 = rfc2047decode(_filename2);
    return fixupEncoding(_filename2);
  }

  function toParamRegExp(attributePattern, flags) {
    return new RegExp("(?:^|;)\\s*" + attributePattern + "\\s*=\\s*" + "(" + '[^";\\s][^;\\s]*' + "|" + '"(?:[^"\\\\]|\\\\"?)+"?' + ")", flags);
  }

  function textdecode(encoding, value) {
    if (encoding) {
      if (!/^[\x00-\xFF]+$/.test(value)) {
        return value;
      }

      try {
        var decoder = new TextDecoder(encoding, {
          fatal: true
        });
        var buffer = (0, _util.stringToBytes)(value);
        value = decoder.decode(buffer);
        needsEncodingFixup = false;
      } catch (e) {
        if (/^utf-?8$/i.test(encoding)) {
          try {
            value = decodeURIComponent(escape(value));
            needsEncodingFixup = false;
          } catch (err) {}
        }
      }
    }

    return value;
  }

  function fixupEncoding(value) {
    if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
      value = textdecode("utf-8", value);

      if (needsEncodingFixup) {
        value = textdecode("iso-8859-1", value);
      }
    }

    return value;
  }

  function rfc2231getparam(contentDispositionStr) {
    var matches = [];
    var match;
    var iter = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");

    while ((match = iter.exec(contentDispositionStr)) !== null) {
      var _match = match,
          _match2 = _slicedToArray(_match, 4),
          n = _match2[1],
          quot = _match2[2],
          part = _match2[3];

      n = parseInt(n, 10);

      if (n in matches) {
        if (n === 0) {
          break;
        }

        continue;
      }

      matches[n] = [quot, part];
    }

    var parts = [];

    for (var _n2 = 0; _n2 < matches.length; ++_n2) {
      if (!(_n2 in matches)) {
        break;
      }

      var _matches$_n = _slicedToArray(matches[_n2], 2),
          _quot = _matches$_n[0],
          _part = _matches$_n[1];

      _part = rfc2616unquote(_part);

      if (_quot) {
        _part = unescape(_part);

        if (_n2 === 0) {
          _part = rfc5987decode(_part);
        }
      }

      parts.push(_part);
    }

    return parts.join("");
  }

  function rfc2616unquote(value) {
    if (value.startsWith('"')) {
      var parts = value.slice(1).split('\\"');

      for (var i = 0; i < parts.length; ++i) {
        var quotindex = parts[i].indexOf('"');

        if (quotindex !== -1) {
          parts[i] = parts[i].slice(0, quotindex);
          parts.length = i + 1;
        }

        parts[i] = parts[i].replace(/\\(.)/g, "$1");
      }

      value = parts.join('"');
    }

    return value;
  }

  function rfc5987decode(extvalue) {
    var encodingend = extvalue.indexOf("'");

    if (encodingend === -1) {
      return extvalue;
    }

    var encoding = extvalue.slice(0, encodingend);
    var langvalue = extvalue.slice(encodingend + 1);
    var value = langvalue.replace(/^[^']*'/, "");
    return textdecode(encoding, value);
  }

  function rfc2047decode(value) {
    if (!value.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(value)) {
      return value;
    }

    return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function (matches, charset, encoding, text) {
      if (encoding === "q" || encoding === "Q") {
        text = text.replace(/_/g, " ");
        text = text.replace(/=([0-9a-fA-F]{2})/g, function (match, hex) {
          return String.fromCharCode(parseInt(hex, 16));
        });
        return textdecode(charset, text);
      }

      try {
        text = atob(text);
      } catch (e) {}

      return textdecode(charset, text);
    });
  }

  return "";
}

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFNetworkStream = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _network_utils = __w_pdfjs_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;
var OK_RESPONSE = 200;
var PARTIAL_CONTENT_RESPONSE = 206;

function getArrayBuffer(xhr) {
  var data = xhr.response;

  if (typeof data !== "string") {
    return data;
  }

  var array = (0, _util.stringToBytes)(data);
  return array.buffer;
}

var NetworkManager = /*#__PURE__*/function () {
  function NetworkManager(url, args) {
    _classCallCheck(this, NetworkManager);

    this.url = url;
    args = args || {};
    this.isHttp = /^https?:/i.test(url);
    this.httpHeaders = this.isHttp && args.httpHeaders || {};
    this.withCredentials = args.withCredentials || false;

    this.getXhr = args.getXhr || function NetworkManager_getXhr() {
      return new XMLHttpRequest();
    };

    this.currXhrId = 0;
    this.pendingRequests = Object.create(null);
  }

  _createClass(NetworkManager, [{
    key: "requestRange",
    value: function requestRange(begin, end, listeners) {
      var args = {
        begin: begin,
        end: end
      };

      for (var prop in listeners) {
        args[prop] = listeners[prop];
      }

      return this.request(args);
    }
  }, {
    key: "requestFull",
    value: function requestFull(listeners) {
      return this.request(listeners);
    }
  }, {
    key: "request",
    value: function request(args) {
      var xhr = this.getXhr();
      var xhrId = this.currXhrId++;
      var pendingRequest = this.pendingRequests[xhrId] = {
        xhr: xhr
      };
      xhr.open("GET", this.url);
      xhr.withCredentials = this.withCredentials;

      for (var property in this.httpHeaders) {
        var value = this.httpHeaders[property];

        if (typeof value === "undefined") {
          continue;
        }

        xhr.setRequestHeader(property, value);
      }

      if (this.isHttp && "begin" in args && "end" in args) {
        xhr.setRequestHeader("Range", "bytes=".concat(args.begin, "-").concat(args.end - 1));
        pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
      } else {
        pendingRequest.expectedStatus = OK_RESPONSE;
      }

      xhr.responseType = "arraybuffer";

      if (args.onError) {
        xhr.onerror = function (evt) {
          args.onError(xhr.status);
        };
      }

      xhr.onreadystatechange = this.onStateChange.bind(this, xhrId);
      xhr.onprogress = this.onProgress.bind(this, xhrId);
      pendingRequest.onHeadersReceived = args.onHeadersReceived;
      pendingRequest.onDone = args.onDone;
      pendingRequest.onError = args.onError;
      pendingRequest.onProgress = args.onProgress;
      xhr.send(null);
      return xhrId;
    }
  }, {
    key: "onProgress",
    value: function onProgress(xhrId, evt) {
      var pendingRequest = this.pendingRequests[xhrId];

      if (!pendingRequest) {
        return;
      }

      if (pendingRequest.onProgress) {
        pendingRequest.onProgress(evt);
      }
    }
  }, {
    key: "onStateChange",
    value: function onStateChange(xhrId, evt) {
      var pendingRequest = this.pendingRequests[xhrId];

      if (!pendingRequest) {
        return;
      }

      var xhr = pendingRequest.xhr;

      if (xhr.readyState >= 2 && pendingRequest.onHeadersReceived) {
        pendingRequest.onHeadersReceived();
        delete pendingRequest.onHeadersReceived;
      }

      if (xhr.readyState !== 4) {
        return;
      }

      if (!(xhrId in this.pendingRequests)) {
        return;
      }

      delete this.pendingRequests[xhrId];

      if (xhr.status === 0 && this.isHttp) {
        if (pendingRequest.onError) {
          pendingRequest.onError(xhr.status);
        }

        return;
      }

      var xhrStatus = xhr.status || OK_RESPONSE;
      var ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;

      if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
        if (pendingRequest.onError) {
          pendingRequest.onError(xhr.status);
        }

        return;
      }

      var chunk = getArrayBuffer(xhr);

      if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
        var rangeHeader = xhr.getResponseHeader("Content-Range");
        var matches = /bytes (\d+)-(\d+)\/(\d+)/.exec(rangeHeader);
        pendingRequest.onDone({
          begin: parseInt(matches[1], 10),
          chunk: chunk
        });
      } else if (chunk) {
        pendingRequest.onDone({
          begin: 0,
          chunk: chunk
        });
      } else if (pendingRequest.onError) {
        pendingRequest.onError(xhr.status);
      }
    }
  }, {
    key: "getRequestXhr",
    value: function getRequestXhr(xhrId) {
      return this.pendingRequests[xhrId].xhr;
    }
  }, {
    key: "isPendingRequest",
    value: function isPendingRequest(xhrId) {
      return xhrId in this.pendingRequests;
    }
  }, {
    key: "abortRequest",
    value: function abortRequest(xhrId) {
      var xhr = this.pendingRequests[xhrId].xhr;
      delete this.pendingRequests[xhrId];
      xhr.abort();
    }
  }]);

  return NetworkManager;
}();

var PDFNetworkStream = /*#__PURE__*/function () {
  function PDFNetworkStream(source) {
    _classCallCheck(this, PDFNetworkStream);

    this._source = source;
    this._manager = new NetworkManager(source.url, {
      httpHeaders: source.httpHeaders,
      withCredentials: source.withCredentials
    });
    this._rangeChunkSize = source.rangeChunkSize;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  _createClass(PDFNetworkStream, [{
    key: "_onRangeRequestReaderClosed",
    value: function _onRangeRequestReaderClosed(reader) {
      var i = this._rangeRequestReaders.indexOf(reader);

      if (i >= 0) {
        this._rangeRequestReaders.splice(i, 1);
      }
    }
  }, {
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
      this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
      return this._fullRequestReader;
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(begin, end) {
      var reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end);
      reader.onClosed = this._onRangeRequestReaderClosed.bind(this);

      this._rangeRequestReaders.push(reader);

      return reader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var _iterator = _createForOfIteratorHelper(this._rangeRequestReaders.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reader = _step.value;
          reader.cancel(reason);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return PDFNetworkStream;
}();

exports.PDFNetworkStream = PDFNetworkStream;

var PDFNetworkStreamFullRequestReader = /*#__PURE__*/function () {
  function PDFNetworkStreamFullRequestReader(manager, source) {
    _classCallCheck(this, PDFNetworkStreamFullRequestReader);

    this._manager = manager;
    var args = {
      onHeadersReceived: this._onHeadersReceived.bind(this),
      onDone: this._onDone.bind(this),
      onError: this._onError.bind(this),
      onProgress: this._onProgress.bind(this)
    };
    this._url = source.url;
    this._fullRequestId = manager.requestFull(args);
    this._headersReceivedCapability = (0, _util.createPromiseCapability)();
    this._disableRange = source.disableRange || false;
    this._contentLength = source.length;
    this._rangeChunkSize = source.rangeChunkSize;

    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }

    this._isStreamingSupported = false;
    this._isRangeSupported = false;
    this._cachedChunks = [];
    this._requests = [];
    this._done = false;
    this._storedError = undefined;
    this._filename = null;
    this.onProgress = null;
  }

  _createClass(PDFNetworkStreamFullRequestReader, [{
    key: "_onHeadersReceived",
    value: function _onHeadersReceived() {
      var fullRequestXhrId = this._fullRequestId;

      var fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId);

      var getResponseHeader = function getResponseHeader(name) {
        return fullRequestXhr.getResponseHeader(name);
      };

      var _validateRangeRequest = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader: getResponseHeader,
        isHttp: this._manager.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      }),
          allowRangeRequests = _validateRangeRequest.allowRangeRequests,
          suggestedLength = _validateRangeRequest.suggestedLength;

      if (allowRangeRequests) {
        this._isRangeSupported = true;
      }

      this._contentLength = suggestedLength || this._contentLength;
      this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);

      if (this._isRangeSupported) {
        this._manager.abortRequest(fullRequestXhrId);
      }

      this._headersReceivedCapability.resolve();
    }
  }, {
    key: "_onDone",
    value: function _onDone(args) {
      if (args) {
        if (this._requests.length > 0) {
          var requestCapability = this._requests.shift();

          requestCapability.resolve({
            value: args.chunk,
            done: false
          });
        } else {
          this._cachedChunks.push(args.chunk);
        }
      }

      this._done = true;

      if (this._cachedChunks.length > 0) {
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(this._requests),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _requestCapability = _step2.value;

          _requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this._requests.length = 0;
    }
  }, {
    key: "_onError",
    value: function _onError(status) {
      var url = this._url;
      var exception = (0, _network_utils.createResponseStatusError)(status, url);
      this._storedError = exception;

      this._headersReceivedCapability.reject(exception);

      var _iterator3 = _createForOfIteratorHelper(this._requests),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var requestCapability = _step3.value;
          requestCapability.reject(exception);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this._requests.length = 0;
      this._cachedChunks.length = 0;
    }
  }, {
    key: "_onProgress",
    value: function _onProgress(data) {
      if (this.onProgress) {
        this.onProgress({
          loaded: data.loaded,
          total: data.lengthComputable ? data.total : this._contentLength
        });
      }
    }
  }, {
    key: "filename",
    get: function get() {
      return this._filename;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._isRangeSupported;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._contentLength;
    }
  }, {
    key: "headersReady",
    get: function get() {
      return this._headersReceivedCapability.promise;
    }
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._storedError) {
                  _context.next = 2;
                  break;
                }

                throw this._storedError;

              case 2:
                if (!(this._cachedChunks.length > 0)) {
                  _context.next = 5;
                  break;
                }

                chunk = this._cachedChunks.shift();
                return _context.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 5:
                if (!this._done) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 7:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context.abrupt("return", requestCapability.promise);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      this._headersReceivedCapability.reject(reason);

      var _iterator4 = _createForOfIteratorHelper(this._requests),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var requestCapability = _step4.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      this._requests.length = 0;

      if (this._manager.isPendingRequest(this._fullRequestId)) {
        this._manager.abortRequest(this._fullRequestId);
      }

      this._fullRequestReader = null;
    }
  }]);

  return PDFNetworkStreamFullRequestReader;
}();

var PDFNetworkStreamRangeRequestReader = /*#__PURE__*/function () {
  function PDFNetworkStreamRangeRequestReader(manager, begin, end) {
    _classCallCheck(this, PDFNetworkStreamRangeRequestReader);

    this._manager = manager;
    var args = {
      onDone: this._onDone.bind(this),
      onProgress: this._onProgress.bind(this)
    };
    this._requestId = manager.requestRange(begin, end, args);
    this._requests = [];
    this._queuedChunk = null;
    this._done = false;
    this.onProgress = null;
    this.onClosed = null;
  }

  _createClass(PDFNetworkStreamRangeRequestReader, [{
    key: "_close",
    value: function _close() {
      if (this.onClosed) {
        this.onClosed(this);
      }
    }
  }, {
    key: "_onDone",
    value: function _onDone(data) {
      var chunk = data.chunk;

      if (this._requests.length > 0) {
        var requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: chunk,
          done: false
        });
      } else {
        this._queuedChunk = chunk;
      }

      this._done = true;

      var _iterator5 = _createForOfIteratorHelper(this._requests),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _requestCapability2 = _step5.value;

          _requestCapability2.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this._requests.length = 0;

      this._close();
    }
  }, {
    key: "_onProgress",
    value: function _onProgress(evt) {
      if (!this.isStreamingSupported && this.onProgress) {
        this.onProgress({
          loaded: evt.loaded
        });
      }
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return false;
    }
  }, {
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var chunk, requestCapability;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this._queuedChunk !== null)) {
                  _context2.next = 4;
                  break;
                }

                chunk = this._queuedChunk;
                this._queuedChunk = null;
                return _context2.abrupt("return", {
                  value: chunk,
                  done: false
                });

              case 4:
                if (!this._done) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 6:
                requestCapability = (0, _util.createPromiseCapability)();

                this._requests.push(requestCapability);

                return _context2.abrupt("return", requestCapability.promise);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._done = true;

      var _iterator6 = _createForOfIteratorHelper(this._requests),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var requestCapability = _step6.value;
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      this._requests.length = 0;

      if (this._manager.isPendingRequest(this._requestId)) {
        this._manager.abortRequest(this._requestId);
      }

      this._close();
    }
  }]);

  return PDFNetworkStreamRangeRequestReader;
}();

/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFetchStream = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

var _util = __w_pdfjs_require__(4);

var _network_utils = __w_pdfjs_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

function createFetchOptions(headers, withCredentials, abortController) {
  return {
    method: "GET",
    headers: headers,
    signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal,
    mode: "cors",
    credentials: withCredentials ? "include" : "same-origin",
    redirect: "follow"
  };
}

function createHeaders(httpHeaders) {
  var headers = new Headers();

  for (var property in httpHeaders) {
    var value = httpHeaders[property];

    if (typeof value === "undefined") {
      continue;
    }

    headers.append(property, value);
  }

  return headers;
}

var PDFFetchStream = /*#__PURE__*/function () {
  function PDFFetchStream(source) {
    _classCallCheck(this, PDFFetchStream);

    this.source = source;
    this.isHttp = /^https?:/i.test(source.url);
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  _createClass(PDFFetchStream, [{
    key: "_progressiveDataLength",
    get: function get() {
      var _this$_fullRequestRea, _this$_fullRequestRea2;

      return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
    }
  }, {
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
      this._fullRequestReader = new PDFFetchStreamReader(this);
      return this._fullRequestReader;
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(begin, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      var reader = new PDFFetchStreamRangeReader(this, begin, end);

      this._rangeRequestReaders.push(reader);

      return reader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var _iterator = _createForOfIteratorHelper(this._rangeRequestReaders.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reader = _step.value;
          reader.cancel(reason);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return PDFFetchStream;
}();

exports.PDFFetchStream = PDFFetchStream;

var PDFFetchStreamReader = /*#__PURE__*/function () {
  function PDFFetchStreamReader(stream) {
    var _this = this;

    _classCallCheck(this, PDFFetchStreamReader);

    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    this._filename = null;
    var source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._contentLength = source.length;
    this._headersCapability = (0, _util.createPromiseCapability)();
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;

    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }

    if (typeof AbortController !== "undefined") {
      this._abortController = new AbortController();
    }

    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._headers = createHeaders(this._stream.httpHeaders);
    var url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(function (response) {
      if (!(0, _network_utils.validateResponseStatus)(response.status)) {
        throw (0, _network_utils.createResponseStatusError)(response.status, url);
      }

      _this._reader = response.body.getReader();

      _this._headersCapability.resolve();

      var getResponseHeader = function getResponseHeader(name) {
        return response.headers.get(name);
      };

      var _validateRangeRequest = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader: getResponseHeader,
        isHttp: _this._stream.isHttp,
        rangeChunkSize: _this._rangeChunkSize,
        disableRange: _this._disableRange
      }),
          allowRangeRequests = _validateRangeRequest.allowRangeRequests,
          suggestedLength = _validateRangeRequest.suggestedLength;

      _this._isRangeSupported = allowRangeRequests;
      _this._contentLength = suggestedLength || _this._contentLength;
      _this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);

      if (!_this._isStreamingSupported && _this._isRangeSupported) {
        _this.cancel(new _util.AbortException("Streaming is disabled."));
      }
    })["catch"](this._headersCapability.reject);
    this.onProgress = null;
  }

  _createClass(PDFFetchStreamReader, [{
    key: "headersReady",
    get: function get() {
      return this._headersCapability.promise;
    }
  }, {
    key: "filename",
    get: function get() {
      return this._filename;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._contentLength;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._isRangeSupported;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$this$_reader$r, value, done, buffer;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._headersCapability.promise;

              case 2:
                _context.next = 4;
                return this._reader.read();

              case 4:
                _yield$this$_reader$r = _context.sent;
                value = _yield$this$_reader$r.value;
                done = _yield$this$_reader$r.done;

                if (!done) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  value: value,
                  done: done
                });

              case 9:
                this._loaded += value.byteLength;

                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded,
                    total: this._contentLength
                  });
                }

                buffer = new Uint8Array(value).buffer;
                return _context.abrupt("return", {
                  value: buffer,
                  done: false
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      if (this._reader) {
        this._reader.cancel(reason);
      }

      if (this._abortController) {
        this._abortController.abort();
      }
    }
  }]);

  return PDFFetchStreamReader;
}();

var PDFFetchStreamRangeReader = /*#__PURE__*/function () {
  function PDFFetchStreamRangeReader(stream, begin, end) {
    var _this2 = this;

    _classCallCheck(this, PDFFetchStreamRangeReader);

    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    var source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._readCapability = (0, _util.createPromiseCapability)();
    this._isStreamingSupported = !source.disableStream;

    if (typeof AbortController !== "undefined") {
      this._abortController = new AbortController();
    }

    this._headers = createHeaders(this._stream.httpHeaders);

    this._headers.append("Range", "bytes=".concat(begin, "-").concat(end - 1));

    var url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(function (response) {
      if (!(0, _network_utils.validateResponseStatus)(response.status)) {
        throw (0, _network_utils.createResponseStatusError)(response.status, url);
      }

      _this2._readCapability.resolve();

      _this2._reader = response.body.getReader();
    })["catch"](function (reason) {
      if ((reason === null || reason === void 0 ? void 0 : reason.name) === "AbortError") {
        return;
      }

      throw reason;
    });
    this.onProgress = null;
  }

  _createClass(PDFFetchStreamRangeReader, [{
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _yield$this$_reader$r2, value, done, buffer;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._readCapability.promise;

              case 2:
                _context2.next = 4;
                return this._reader.read();

              case 4:
                _yield$this$_reader$r2 = _context2.sent;
                value = _yield$this$_reader$r2.value;
                done = _yield$this$_reader$r2.done;

                if (!done) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", {
                  value: value,
                  done: done
                });

              case 9:
                this._loaded += value.byteLength;

                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded
                  });
                }

                buffer = new Uint8Array(value).buffer;
                return _context2.abrupt("return", {
                  value: buffer,
                  done: false
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      if (this._reader) {
        this._reader.cancel(reason);
      }

      if (this._abortController) {
        this._abortController.abort();
      }
    }
  }]);

  return PDFFetchStreamRangeReader;
}();

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __w_pdfjs_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __w_pdfjs_require__);
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
/******/ 		__w_pdfjs_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "addLinkAttributes", ({
  enumerable: true,
  get: function get() {
    return _display_utils.addLinkAttributes;
  }
}));
Object.defineProperty(exports, "getFilenameFromUrl", ({
  enumerable: true,
  get: function get() {
    return _display_utils.getFilenameFromUrl;
  }
}));
Object.defineProperty(exports, "getPdfFilenameFromUrl", ({
  enumerable: true,
  get: function get() {
    return _display_utils.getPdfFilenameFromUrl;
  }
}));
Object.defineProperty(exports, "getXfaPageViewport", ({
  enumerable: true,
  get: function get() {
    return _display_utils.getXfaPageViewport;
  }
}));
Object.defineProperty(exports, "isPdfFile", ({
  enumerable: true,
  get: function get() {
    return _display_utils.isPdfFile;
  }
}));
Object.defineProperty(exports, "LinkTarget", ({
  enumerable: true,
  get: function get() {
    return _display_utils.LinkTarget;
  }
}));
Object.defineProperty(exports, "loadScript", ({
  enumerable: true,
  get: function get() {
    return _display_utils.loadScript;
  }
}));
Object.defineProperty(exports, "PDFDateString", ({
  enumerable: true,
  get: function get() {
    return _display_utils.PDFDateString;
  }
}));
Object.defineProperty(exports, "RenderingCancelledException", ({
  enumerable: true,
  get: function get() {
    return _display_utils.RenderingCancelledException;
  }
}));
Object.defineProperty(exports, "build", ({
  enumerable: true,
  get: function get() {
    return _api.build;
  }
}));
Object.defineProperty(exports, "getDocument", ({
  enumerable: true,
  get: function get() {
    return _api.getDocument;
  }
}));
Object.defineProperty(exports, "LoopbackPort", ({
  enumerable: true,
  get: function get() {
    return _api.LoopbackPort;
  }
}));
Object.defineProperty(exports, "PDFDataRangeTransport", ({
  enumerable: true,
  get: function get() {
    return _api.PDFDataRangeTransport;
  }
}));
Object.defineProperty(exports, "PDFWorker", ({
  enumerable: true,
  get: function get() {
    return _api.PDFWorker;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _api.version;
  }
}));
Object.defineProperty(exports, "CMapCompressionType", ({
  enumerable: true,
  get: function get() {
    return _util.CMapCompressionType;
  }
}));
Object.defineProperty(exports, "createObjectURL", ({
  enumerable: true,
  get: function get() {
    return _util.createObjectURL;
  }
}));
Object.defineProperty(exports, "createPromiseCapability", ({
  enumerable: true,
  get: function get() {
    return _util.createPromiseCapability;
  }
}));
Object.defineProperty(exports, "createValidAbsoluteUrl", ({
  enumerable: true,
  get: function get() {
    return _util.createValidAbsoluteUrl;
  }
}));
Object.defineProperty(exports, "InvalidPDFException", ({
  enumerable: true,
  get: function get() {
    return _util.InvalidPDFException;
  }
}));
Object.defineProperty(exports, "MissingPDFException", ({
  enumerable: true,
  get: function get() {
    return _util.MissingPDFException;
  }
}));
Object.defineProperty(exports, "OPS", ({
  enumerable: true,
  get: function get() {
    return _util.OPS;
  }
}));
Object.defineProperty(exports, "PasswordResponses", ({
  enumerable: true,
  get: function get() {
    return _util.PasswordResponses;
  }
}));
Object.defineProperty(exports, "PermissionFlag", ({
  enumerable: true,
  get: function get() {
    return _util.PermissionFlag;
  }
}));
Object.defineProperty(exports, "removeNullCharacters", ({
  enumerable: true,
  get: function get() {
    return _util.removeNullCharacters;
  }
}));
Object.defineProperty(exports, "shadow", ({
  enumerable: true,
  get: function get() {
    return _util.shadow;
  }
}));
Object.defineProperty(exports, "UnexpectedResponseException", ({
  enumerable: true,
  get: function get() {
    return _util.UnexpectedResponseException;
  }
}));
Object.defineProperty(exports, "UNSUPPORTED_FEATURES", ({
  enumerable: true,
  get: function get() {
    return _util.UNSUPPORTED_FEATURES;
  }
}));
Object.defineProperty(exports, "Util", ({
  enumerable: true,
  get: function get() {
    return _util.Util;
  }
}));
Object.defineProperty(exports, "VerbosityLevel", ({
  enumerable: true,
  get: function get() {
    return _util.VerbosityLevel;
  }
}));
Object.defineProperty(exports, "AnnotationLayer", ({
  enumerable: true,
  get: function get() {
    return _annotation_layer.AnnotationLayer;
  }
}));
Object.defineProperty(exports, "GlobalWorkerOptions", ({
  enumerable: true,
  get: function get() {
    return _worker_options.GlobalWorkerOptions;
  }
}));
Object.defineProperty(exports, "renderTextLayer", ({
  enumerable: true,
  get: function get() {
    return _text_layer.renderTextLayer;
  }
}));
Object.defineProperty(exports, "SVGGraphics", ({
  enumerable: true,
  get: function get() {
    return _svg.SVGGraphics;
  }
}));
Object.defineProperty(exports, "XfaLayer", ({
  enumerable: true,
  get: function get() {
    return _xfa_layer.XfaLayer;
  }
}));

var _display_utils = __w_pdfjs_require__(1);

var _api = __w_pdfjs_require__(117);

var _util = __w_pdfjs_require__(4);

var _annotation_layer = __w_pdfjs_require__(129);

var _worker_options = __w_pdfjs_require__(124);

var _is_node = __w_pdfjs_require__(120);

var _text_layer = __w_pdfjs_require__(131);

var _svg = __w_pdfjs_require__(132);

var _xfa_layer = __w_pdfjs_require__(133);

var pdfjsVersion = '2.10.551';
var pdfjsBuild = '9b304f746';
{
  if (_is_node.isNodeJS) {
    var _require = __w_pdfjs_require__(134),
        PDFNodeStream = _require.PDFNodeStream;

    (0, _api.setPDFNetworkStreamFactory)(function (params) {
      return new PDFNodeStream(params);
    });
  } else {
    var _require2 = __w_pdfjs_require__(137),
        PDFNetworkStream = _require2.PDFNetworkStream;

    var _require3 = __w_pdfjs_require__(138),
        PDFFetchStream = _require3.PDFFetchStream;

    (0, _api.setPDFNetworkStreamFactory)(function (params) {
      if ((0, _display_utils.isValidFetchUrl)(params.url)) {
        return new PDFFetchStream(params);
      }

      return new PDFNetworkStream(params);
    });
  }
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=pdf-es5.js.map