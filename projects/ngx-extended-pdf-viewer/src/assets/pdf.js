/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2019 Mozilla Foundation
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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __w_pdfjs_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __w_pdfjs_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__w_pdfjs_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__w_pdfjs_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__w_pdfjs_require__.d = function(exports, name, getter) {
/******/ 		if(!__w_pdfjs_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__w_pdfjs_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__w_pdfjs_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __w_pdfjs_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__w_pdfjs_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __w_pdfjs_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__w_pdfjs_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__w_pdfjs_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__w_pdfjs_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__w_pdfjs_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __w_pdfjs_require__(__w_pdfjs_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


var pdfjsVersion = '2.3.200';
var pdfjsBuild = '4ae3f9fc';

var pdfjsSharedUtil = __w_pdfjs_require__(1);

var pdfjsDisplayAPI = __w_pdfjs_require__(185);

var pdfjsDisplayTextLayer = __w_pdfjs_require__(197);

var pdfjsDisplayAnnotationLayer = __w_pdfjs_require__(198);

var pdfjsDisplayDisplayUtils = __w_pdfjs_require__(186);

var pdfjsDisplaySVG = __w_pdfjs_require__(199);

let pdfjsDisplayWorkerOptions = __w_pdfjs_require__(191);

let pdfjsDisplayAPICompatibility = __w_pdfjs_require__(188);

{
  const isNodeJS = __w_pdfjs_require__(4);

  if (isNodeJS()) {
    let PDFNodeStream = __w_pdfjs_require__(200).PDFNodeStream;

    pdfjsDisplayAPI.setPDFNetworkStreamFactory(params => {
      return new PDFNodeStream(params);
    });
  } else {
    let PDFNetworkStream = __w_pdfjs_require__(203).PDFNetworkStream;

    let PDFFetchStream;

    if (pdfjsDisplayDisplayUtils.isFetchSupported()) {
      PDFFetchStream = __w_pdfjs_require__(204).PDFFetchStream;
    }

    pdfjsDisplayAPI.setPDFNetworkStreamFactory(params => {
      if (PDFFetchStream && pdfjsDisplayDisplayUtils.isValidFetchUrl(params.url)) {
        return new PDFFetchStream(params);
      }

      return new PDFNetworkStream(params);
    });
  }
}
exports.build = pdfjsDisplayAPI.build;
exports.version = pdfjsDisplayAPI.version;
exports.getDocument = pdfjsDisplayAPI.getDocument;
exports.LoopbackPort = pdfjsDisplayAPI.LoopbackPort;
exports.PDFDataRangeTransport = pdfjsDisplayAPI.PDFDataRangeTransport;
exports.PDFWorker = pdfjsDisplayAPI.PDFWorker;
exports.renderTextLayer = pdfjsDisplayTextLayer.renderTextLayer;
exports.AnnotationLayer = pdfjsDisplayAnnotationLayer.AnnotationLayer;
exports.createPromiseCapability = pdfjsSharedUtil.createPromiseCapability;
exports.PasswordResponses = pdfjsSharedUtil.PasswordResponses;
exports.InvalidPDFException = pdfjsSharedUtil.InvalidPDFException;
exports.MissingPDFException = pdfjsSharedUtil.MissingPDFException;
exports.SVGGraphics = pdfjsDisplaySVG.SVGGraphics;
exports.NativeImageDecoding = pdfjsSharedUtil.NativeImageDecoding;
exports.CMapCompressionType = pdfjsSharedUtil.CMapCompressionType;
exports.PermissionFlag = pdfjsSharedUtil.PermissionFlag;
exports.UnexpectedResponseException = pdfjsSharedUtil.UnexpectedResponseException;
exports.OPS = pdfjsSharedUtil.OPS;
exports.VerbosityLevel = pdfjsSharedUtil.VerbosityLevel;
exports.UNSUPPORTED_FEATURES = pdfjsSharedUtil.UNSUPPORTED_FEATURES;
exports.createValidAbsoluteUrl = pdfjsSharedUtil.createValidAbsoluteUrl;
exports.createObjectURL = pdfjsSharedUtil.createObjectURL;
exports.removeNullCharacters = pdfjsSharedUtil.removeNullCharacters;
exports.shadow = pdfjsSharedUtil.shadow;
exports.Util = pdfjsSharedUtil.Util;
exports.ReadableStream = pdfjsSharedUtil.ReadableStream;
exports.RenderingCancelledException = pdfjsDisplayDisplayUtils.RenderingCancelledException;
exports.getFilenameFromUrl = pdfjsDisplayDisplayUtils.getFilenameFromUrl;
exports.LinkTarget = pdfjsDisplayDisplayUtils.LinkTarget;
exports.addLinkAttributes = pdfjsDisplayDisplayUtils.addLinkAttributes;
exports.loadScript = pdfjsDisplayDisplayUtils.loadScript;
exports.PDFDateString = pdfjsDisplayDisplayUtils.PDFDateString;
exports.GlobalWorkerOptions = pdfjsDisplayWorkerOptions.GlobalWorkerOptions;
exports.apiCompatibilityParams = pdfjsDisplayAPICompatibility.apiCompatibilityParams;

/***/ }),
/* 1 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createPromiseCapability = createPromiseCapability;
exports.getVerbosityLevel = getVerbosityLevel;
exports.info = info;
exports.isArrayBuffer = isArrayBuffer;
exports.isArrayEqual = isArrayEqual;
exports.isBool = isBool;
exports.isEmptyObj = isEmptyObj;
exports.isNum = isNum;
exports.isString = isString;
exports.isSpace = isSpace;
exports.isSameOrigin = isSameOrigin;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
exports.isLittleEndian = isLittleEndian;
exports.isEvalSupported = isEvalSupported;
exports.log2 = log2;
exports.readInt8 = readInt8;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.removeNullCharacters = removeNullCharacters;
exports.setVerbosityLevel = setVerbosityLevel;
exports.shadow = shadow;
exports.string32 = string32;
exports.stringToBytes = stringToBytes;
exports.stringToPDFString = stringToPDFString;
exports.stringToUTF8String = stringToUTF8String;
exports.utf8StringToString = utf8StringToString;
exports.warn = warn;
exports.unreachable = unreachable;
Object.defineProperty(exports, "ReadableStream", {
  enumerable: true,
  get: function () {
    return _streams_polyfill.ReadableStream;
  }
});
exports.createObjectURL = exports.FormatError = exports.Util = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.NativeImageDecoding = exports.MissingPDFException = exports.InvalidPDFException = exports.AbortException = exports.CMapCompressionType = exports.ImageKind = exports.FontType = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.UNSUPPORTED_FEATURES = exports.VerbosityLevel = exports.OPS = exports.IDENTITY_MATRIX = exports.FONT_IDENTITY_MATRIX = exports.BaseException = void 0;

__w_pdfjs_require__(2);

var _streams_polyfill = __w_pdfjs_require__(183);

const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
const FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
const NativeImageDecoding = {
  NONE: 'none',
  DECODE: 'decode',
  DISPLAY: 'display'
};
exports.NativeImageDecoding = NativeImageDecoding;
const PermissionFlag = {
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
const TextRenderingMode = {
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
const ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
};
exports.ImageKind = ImageKind;
const AnnotationType = {
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
const AnnotationStateModelType = {
  MARKED: 'Marked',
  REVIEW: 'Review'
};
exports.AnnotationStateModelType = AnnotationStateModelType;
const AnnotationMarkedState = {
  MARKED: 'Marked',
  UNMARKED: 'Unmarked'
};
exports.AnnotationMarkedState = AnnotationMarkedState;
const AnnotationReviewState = {
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  NONE: 'None'
};
exports.AnnotationReviewState = AnnotationReviewState;
const AnnotationReplyType = {
  GROUP: 'Group',
  REPLY: 'R'
};
exports.AnnotationReplyType = AnnotationReplyType;
const AnnotationFlag = {
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
const AnnotationFieldFlag = {
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
const AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
};
exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
const StreamType = {
  UNKNOWN: 'UNKNOWN',
  FLATE: 'FLATE',
  LZW: 'LZW',
  DCT: 'DCT',
  JPX: 'JPX',
  JBIG: 'JBIG',
  A85: 'A85',
  AHX: 'AHX',
  CCF: 'CCF',
  RLX: 'RLX'
};
exports.StreamType = StreamType;
const FontType = {
  UNKNOWN: 'UNKNOWN',
  TYPE1: 'TYPE1',
  TYPE1C: 'TYPE1C',
  CIDFONTTYPE0: 'CIDFONTTYPE0',
  CIDFONTTYPE0C: 'CIDFONTTYPE0C',
  TRUETYPE: 'TRUETYPE',
  CIDFONTTYPE2: 'CIDFONTTYPE2',
  TYPE3: 'TYPE3',
  OPENTYPE: 'OPENTYPE',
  TYPE0: 'TYPE0',
  MMTYPE1: 'MMTYPE1'
};
exports.FontType = FontType;
const VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
};
exports.VerbosityLevel = VerbosityLevel;
const CMapCompressionType = {
  NONE: 0,
  BINARY: 1,
  STREAM: 2
};
exports.CMapCompressionType = CMapCompressionType;
const OPS = {
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
const UNSUPPORTED_FEATURES = {
  unknown: 'unknown',
  forms: 'forms',
  javaScript: 'javaScript',
  smask: 'smask',
  shadingPattern: 'shadingPattern',
  font: 'font'
};
exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
const PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
exports.PasswordResponses = PasswordResponses;
let verbosity = VerbosityLevel.WARNINGS;

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
    console.log(`Info: ${msg}`);
  }
}

function warn(msg) {
  if (verbosity >= VerbosityLevel.WARNINGS) {
    console.log(`Warning: ${msg}`);
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
  let base;

  try {
    base = new URL(baseUrl);

    if (!base.origin || base.origin === 'null') {
      return false;
    }
  } catch (e) {
    return false;
  }

  const other = new URL(otherUrl, base);
  return base.origin === other.origin;
}

function _isValidProtocol(url) {
  if (!url) {
    return false;
  }

  switch (url.protocol) {
    case 'http:':
    case 'https:':
    case 'ftp:':
    case 'mailto:':
    case 'tel:':
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
    const absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);

    if (_isValidProtocol(absoluteUrl)) {
      return absoluteUrl;
    }
  } catch (ex) {}

  return null;
}

function shadow(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value,
    enumerable: true,
    configurable: true,
    writable: false
  });
  return value;
}

const BaseException = function BaseExceptionClosure() {
  function BaseException(message) {
    if (this.constructor === BaseException) {
      unreachable('Cannot initialize BaseException.');
    }

    this.message = message;
    this.name = this.constructor.name;
  }

  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();

exports.BaseException = BaseException;

class PasswordException extends BaseException {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }

}

exports.PasswordException = PasswordException;

class UnknownErrorException extends BaseException {
  constructor(msg, details) {
    super(msg);
    this.details = details;
  }

}

exports.UnknownErrorException = UnknownErrorException;

class InvalidPDFException extends BaseException {}

exports.InvalidPDFException = InvalidPDFException;

class MissingPDFException extends BaseException {}

exports.MissingPDFException = MissingPDFException;

class UnexpectedResponseException extends BaseException {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }

}

exports.UnexpectedResponseException = UnexpectedResponseException;

class FormatError extends BaseException {}

exports.FormatError = FormatError;

class AbortException extends BaseException {}

exports.AbortException = AbortException;
const NullCharactersRegExp = /\x00/g;

function removeNullCharacters(str) {
  if (typeof str !== 'string') {
    warn('The argument for removeNullCharacters must be a string.');
    return str;
  }

  return str.replace(NullCharactersRegExp, '');
}

function bytesToString(bytes) {
  assert(bytes !== null && typeof bytes === 'object' && bytes.length !== undefined, 'Invalid argument for bytesToString');
  const length = bytes.length;
  const MAX_ARGUMENT_COUNT = 8192;

  if (length < MAX_ARGUMENT_COUNT) {
    return String.fromCharCode.apply(null, bytes);
  }

  const strBuf = [];

  for (let i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
    const chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
    const chunk = bytes.subarray(i, chunkEnd);
    strBuf.push(String.fromCharCode.apply(null, chunk));
  }

  return strBuf.join('');
}

function stringToBytes(str) {
  assert(typeof str === 'string', 'Invalid argument for stringToBytes');
  const length = str.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; ++i) {
    bytes[i] = str.charCodeAt(i) & 0xFF;
  }

  return bytes;
}

function arrayByteLength(arr) {
  if (arr.length !== undefined) {
    return arr.length;
  }

  assert(arr.byteLength !== undefined);
  return arr.byteLength;
}

function arraysToBytes(arr) {
  const length = arr.length;

  if (length === 1 && arr[0] instanceof Uint8Array) {
    return arr[0];
  }

  let resultLength = 0;

  for (let i = 0; i < length; i++) {
    resultLength += arrayByteLength(arr[i]);
  }

  let pos = 0;
  const data = new Uint8Array(resultLength);

  for (let i = 0; i < length; i++) {
    let item = arr[i];

    if (!(item instanceof Uint8Array)) {
      if (typeof item === 'string') {
        item = stringToBytes(item);
      } else {
        item = new Uint8Array(item);
      }
    }

    const itemLength = item.byteLength;
    data.set(item, pos);
    pos += itemLength;
  }

  return data;
}

function string32(value) {
  return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
}

function log2(x) {
  if (x <= 0) {
    return 0;
  }

  return Math.ceil(Math.log2(x));
}

function readInt8(data, start) {
  return data[start] << 24 >> 24;
}

function readUint16(data, offset) {
  return data[offset] << 8 | data[offset + 1];
}

function readUint32(data, offset) {
  return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}

function isLittleEndian() {
  const buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  const view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}

function isEvalSupported() {
  try {
    new Function('');
    return true;
  } catch (e) {
    return false;
  }
}

const rgbBuf = ['rgb(', 0, ',', 0, ',', 0, ')'];

class Util {
  static makeCssRgb(r, g, b) {
    rgbBuf[1] = r;
    rgbBuf[3] = g;
    rgbBuf[5] = b;
    return rgbBuf.join('');
  }

  static transform(m1, m2) {
    return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
  }

  static applyTransform(p, m) {
    const xt = p[0] * m[0] + p[1] * m[2] + m[4];
    const yt = p[0] * m[1] + p[1] * m[3] + m[5];
    return [xt, yt];
  }

  static applyInverseTransform(p, m) {
    const d = m[0] * m[3] - m[1] * m[2];
    const xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
    const yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
    return [xt, yt];
  }

  static getAxialAlignedBoundingBox(r, m) {
    const p1 = Util.applyTransform(r, m);
    const p2 = Util.applyTransform(r.slice(2, 4), m);
    const p3 = Util.applyTransform([r[0], r[3]], m);
    const p4 = Util.applyTransform([r[2], r[1]], m);
    return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
  }

  static inverseTransform(m) {
    const d = m[0] * m[3] - m[1] * m[2];
    return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
  }

  static apply3dTransform(m, v) {
    return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
  }

  static singularValueDecompose2dScale(m) {
    const transpose = [m[0], m[2], m[1], m[3]];
    const a = m[0] * transpose[0] + m[1] * transpose[2];
    const b = m[0] * transpose[1] + m[1] * transpose[3];
    const c = m[2] * transpose[0] + m[3] * transpose[2];
    const d = m[2] * transpose[1] + m[3] * transpose[3];
    const first = (a + d) / 2;
    const second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
    const sx = first + second || 1;
    const sy = first - second || 1;
    return [Math.sqrt(sx), Math.sqrt(sy)];
  }

  static normalizeRect(rect) {
    const r = rect.slice(0);

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

  static intersect(rect1, rect2) {
    function compare(a, b) {
      return a - b;
    }

    const orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare);
    const orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare);
    const result = [];
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

}

exports.Util = Util;
const PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2D8, 0x2C7, 0x2C6, 0x2D9, 0x2DD, 0x2DB, 0x2DA, 0x2DC, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203A, 0x2212, 0x2030, 0x201E, 0x201C, 0x201D, 0x2018, 0x2019, 0x201A, 0x2122, 0xFB01, 0xFB02, 0x141, 0x152, 0x160, 0x178, 0x17D, 0x131, 0x142, 0x153, 0x161, 0x17E, 0, 0x20AC];

function stringToPDFString(str) {
  const length = str.length,
        strBuf = [];

  if (str[0] === '\xFE' && str[1] === '\xFF') {
    for (let i = 2; i < length; i += 2) {
      strBuf.push(String.fromCharCode(str.charCodeAt(i) << 8 | str.charCodeAt(i + 1)));
    }
  } else {
    for (let i = 0; i < length; ++i) {
      const code = PDFStringTranslateTable[str.charCodeAt(i)];
      strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
    }
  }

  return strBuf.join('');
}

function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}

function utf8StringToString(str) {
  return unescape(encodeURIComponent(str));
}

function isEmptyObj(obj) {
  for (let key in obj) {
    return false;
  }

  return true;
}

function isBool(v) {
  return typeof v === 'boolean';
}

function isNum(v) {
  return typeof v === 'number';
}

function isString(v) {
  return typeof v === 'string';
}

function isArrayBuffer(v) {
  return typeof v === 'object' && v !== null && v.byteLength !== undefined;
}

function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every(function (element, index) {
    return element === arr2[index];
  });
}

function isSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0D || ch === 0x0A;
}

function createPromiseCapability() {
  const capability = Object.create(null);
  let isSettled = false;
  Object.defineProperty(capability, 'settled', {
    get() {
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

const createObjectURL = function createObjectURLClosure() {
  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return function createObjectURL(data, contentType, forceDataSchema = false) {
    if (!forceDataSchema && URL.createObjectURL) {
      const blob = new Blob([data], {
        type: contentType
      });
      return URL.createObjectURL(blob);
    }

    let buffer = `data:${contentType};base64,`;

    for (let i = 0, ii = data.length; i < ii; i += 3) {
      const b1 = data[i] & 0xFF;
      const b2 = data[i + 1] & 0xFF;
      const b3 = data[i + 2] & 0xFF;
      const d1 = b1 >> 2,
            d2 = (b1 & 3) << 4 | b2 >> 4;
      const d3 = i + 1 < ii ? (b2 & 0xF) << 2 | b3 >> 6 : 64;
      const d4 = i + 2 < ii ? b3 & 0x3F : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }

    return buffer;
  };
}();

exports.createObjectURL = createObjectURL;

/***/ }),
/* 2 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


const globalScope = __w_pdfjs_require__(3);

if (!globalScope._pdfjsCompatibilityChecked) {
  globalScope._pdfjsCompatibilityChecked = true;

  const isNodeJS = __w_pdfjs_require__(4);

  const hasDOM = typeof window === 'object' && typeof document === 'object';

  (function checkNodeBtoa() {
    if (globalScope.btoa || !isNodeJS()) {
      return;
    }

    globalScope.btoa = function (chars) {
      return Buffer.from(chars, 'binary').toString('base64');
    };
  })();

  (function checkNodeAtob() {
    if (globalScope.atob || !isNodeJS()) {
      return;
    }

    globalScope.atob = function (input) {
      return Buffer.from(input, 'base64').toString('binary');
    };
  })();

  (function checkChildNodeRemove() {
    if (!hasDOM) {
      return;
    }

    if (typeof Element.prototype.remove !== 'undefined') {
      return;
    }

    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  })();

  (function checkDOMTokenListAddRemove() {
    if (!hasDOM || isNodeJS()) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('testOne', 'testTwo');

    if (div.classList.contains('testOne') === true && div.classList.contains('testTwo') === true) {
      return;
    }

    const OriginalDOMTokenListAdd = DOMTokenList.prototype.add;
    const OriginalDOMTokenListRemove = DOMTokenList.prototype.remove;

    DOMTokenList.prototype.add = function (...tokens) {
      for (let token of tokens) {
        OriginalDOMTokenListAdd.call(this, token);
      }
    };

    DOMTokenList.prototype.remove = function (...tokens) {
      for (let token of tokens) {
        OriginalDOMTokenListRemove.call(this, token);
      }
    };
  })();

  (function checkDOMTokenListToggle() {
    if (!hasDOM || isNodeJS()) {
      return;
    }

    const div = document.createElement('div');

    if (div.classList.toggle('test', 0) === false) {
      return;
    }

    DOMTokenList.prototype.toggle = function (token) {
      let force = arguments.length > 1 ? !!arguments[1] : !this.contains(token);
      return this[force ? 'add' : 'remove'](token), force;
    };
  })();

  (function checkStringStartsWith() {
    if (String.prototype.startsWith) {
      return;
    }

    __w_pdfjs_require__(5);
  })();

  (function checkStringEndsWith() {
    if (String.prototype.endsWith) {
      return;
    }

    __w_pdfjs_require__(59);
  })();

  (function checkStringIncludes() {
    if (String.prototype.includes) {
      return;
    }

    __w_pdfjs_require__(61);
  })();

  (function checkArrayIncludes() {
    if (Array.prototype.includes) {
      return;
    }

    __w_pdfjs_require__(63);
  })();

  (function checkArrayFrom() {
    if (Array.from) {
      return;
    }

    __w_pdfjs_require__(71);
  })();

  (function checkObjectAssign() {
    if (Object.assign) {
      return;
    }

    __w_pdfjs_require__(93);
  })();

  (function checkMathLog2() {
    if (Math.log2) {
      return;
    }

    Math.log2 = __w_pdfjs_require__(96);
  })();

  (function checkNumberIsNaN() {
    if (Number.isNaN) {
      return;
    }

    Number.isNaN = __w_pdfjs_require__(98);
  })();

  (function checkNumberIsInteger() {
    if (Number.isInteger) {
      return;
    }

    Number.isInteger = __w_pdfjs_require__(100);
  })();

  (function checkPromise() {
    if (globalScope.Promise && globalScope.Promise.prototype && globalScope.Promise.prototype.finally) {
      return;
    }

    globalScope.Promise = __w_pdfjs_require__(103);
  })();

  (function checkURL() {
    globalScope.URL = __w_pdfjs_require__(127);
  })();

  (function checkWeakMap() {
    if (globalScope.WeakMap) {
      return;
    }

    globalScope.WeakMap = __w_pdfjs_require__(134);
  })();

  (function checkWeakSet() {
    if (globalScope.WeakSet) {
      return;
    }

    globalScope.WeakSet = __w_pdfjs_require__(144);
  })();

  (function checkStringCodePointAt() {
    if (String.prototype.codePointAt) {
      return;
    }

    __w_pdfjs_require__(146);
  })();

  (function checkStringFromCodePoint() {
    if (String.fromCodePoint) {
      return;
    }

    String.fromCodePoint = __w_pdfjs_require__(148);
  })();

  (function checkSymbol() {
    if (globalScope.Symbol) {
      return;
    }

    __w_pdfjs_require__(150);
  })();

  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }

    __w_pdfjs_require__(173);
  })();

  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }

    __w_pdfjs_require__(178);
  })();

  (function checkObjectValues() {
    if (Object.values) {
      return;
    }

    Object.values = __w_pdfjs_require__(180);
  })();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


module.exports = typeof window !== 'undefined' && window.Math === Math ? window : typeof global !== 'undefined' && global.Math === Math ? global : typeof self !== 'undefined' && self.Math === Math ? self : {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


module.exports = function isNodeJS() {
  return typeof process === 'object' && process + '' === '[object process]' && !process.versions['nw'] && !process.versions['electron'];
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(6);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'startsWith');

/***/ }),
/* 6 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var getOwnPropertyDescriptor = __w_pdfjs_require__(9).f;
var toLength = __w_pdfjs_require__(44);
var notARegExp = __w_pdfjs_require__(50);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(55);
var IS_PURE = __w_pdfjs_require__(34);
var nativeStartsWith = ''.startsWith;
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
 var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
 return descriptor && !descriptor.writable;
}();
$({
 target: 'String',
 proto: true,
 forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
 startsWith: function startsWith(searchString) {
  var that = String(requireObjectCoercible(this));
  notARegExp(searchString);
  var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
  var search = String(searchString);
  return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
 }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var getOwnPropertyDescriptor = __w_pdfjs_require__(9).f;
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var setGlobal = __w_pdfjs_require__(27);
var copyConstructorProperties = __w_pdfjs_require__(37);
var isForced = __w_pdfjs_require__(49);
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
/* 8 */
/***/ (function(module, exports) {

var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || Function('return this')();

/***/ }),
/* 9 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var toIndexedObject = __w_pdfjs_require__(14);
var toPrimitive = __w_pdfjs_require__(18);
var has = __w_pdfjs_require__(20);
var IE8_DOM_DEFINE = __w_pdfjs_require__(21);
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
/* 10 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 return Object.defineProperty({}, 1, {
  get: function () {
   return 7;
  }
 })[1] != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
 var descriptor = getOwnPropertyDescriptor(this, V);
 return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
 return {
  enumerable: !(bitmap & 1),
  configurable: !(bitmap & 2),
  writable: !(bitmap & 4),
  value: value
 };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var IndexedObject = __w_pdfjs_require__(15);
var requireObjectCoercible = __w_pdfjs_require__(17);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var classof = __w_pdfjs_require__(16);
var split = ''.split;
module.exports = fails(function () {
 return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;
module.exports = function (it) {
 return toString.call(it).slice(8, -1);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
 if (it == undefined)
  throw TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
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
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
 return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
 return hasOwnProperty.call(it, key);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var fails = __w_pdfjs_require__(11);
var createElement = __w_pdfjs_require__(22);
module.exports = !DESCRIPTORS && !fails(function () {
 return Object.defineProperty(createElement('div'), 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(19);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var definePropertyModule = __w_pdfjs_require__(24);
var createPropertyDescriptor = __w_pdfjs_require__(13);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var IE8_DOM_DEFINE = __w_pdfjs_require__(21);
var anObject = __w_pdfjs_require__(25);
var toPrimitive = __w_pdfjs_require__(18);
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
/* 25 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
module.exports = function (it) {
 if (!isObject(it)) {
  throw TypeError(String(it) + ' is not an object');
 }
 return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var has = __w_pdfjs_require__(20);
var setGlobal = __w_pdfjs_require__(27);
var inspectSource = __w_pdfjs_require__(28);
var InternalStateModule = __w_pdfjs_require__(30);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
 var unsafe = options ? !!options.unsafe : false;
 var simple = options ? !!options.enumerable : false;
 var noTargetGet = options ? !!options.noTargetGet : false;
 if (typeof value == 'function') {
  if (typeof key == 'string' && !has(value, 'name'))
   createNonEnumerableProperty(value, 'name', key);
  enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
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
/* 27 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
module.exports = function (key, value) {
 try {
  createNonEnumerableProperty(global, key, value);
 } catch (error) {
  global[key] = value;
 }
 return value;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var store = __w_pdfjs_require__(29);
var functionToString = Function.toString;
if (typeof store.inspectSource != 'function') {
 store.inspectSource = function (it) {
  return functionToString.call(it);
 };
}
module.exports = store.inspectSource;

/***/ }),
/* 29 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var setGlobal = __w_pdfjs_require__(27);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 30 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var NATIVE_WEAK_MAP = __w_pdfjs_require__(31);
var global = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(19);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var objectHas = __w_pdfjs_require__(20);
var sharedKey = __w_pdfjs_require__(32);
var hiddenKeys = __w_pdfjs_require__(36);
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
 var store = new WeakMap();
 var wmget = store.get;
 var wmhas = store.has;
 var wmset = store.set;
 set = function (it, metadata) {
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
/* 31 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var inspectSource = __w_pdfjs_require__(28);
var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 32 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var shared = __w_pdfjs_require__(33);
var uid = __w_pdfjs_require__(35);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var IS_PURE = __w_pdfjs_require__(34);
var store = __w_pdfjs_require__(29);
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.6.4',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();
module.exports = function (key) {
 return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 37 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var ownKeys = __w_pdfjs_require__(38);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(9);
var definePropertyModule = __w_pdfjs_require__(24);
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
/* 38 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(39);
var getOwnPropertyNamesModule = __w_pdfjs_require__(41);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(48);
var anObject = __w_pdfjs_require__(25);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var path = __w_pdfjs_require__(40);
var global = __w_pdfjs_require__(8);
var aFunction = function (variable) {
 return typeof variable == 'function' ? variable : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
module.exports = global;

/***/ }),
/* 41 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var internalObjectKeys = __w_pdfjs_require__(42);
var enumBugKeys = __w_pdfjs_require__(47);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var toIndexedObject = __w_pdfjs_require__(14);
var indexOf = __w_pdfjs_require__(43).indexOf;
var hiddenKeys = __w_pdfjs_require__(36);
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
/* 43 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toIndexedObject = __w_pdfjs_require__(14);
var toLength = __w_pdfjs_require__(44);
var toAbsoluteIndex = __w_pdfjs_require__(46);
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
/* 44 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(45);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (argument) {
 return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(45);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toInteger(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

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
/* 48 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 49 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
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
/* 50 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isRegExp = __w_pdfjs_require__(51);
module.exports = function (it) {
 if (isRegExp(it)) {
  throw TypeError("The method doesn't accept regular expressions");
 }
 return it;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var classof = __w_pdfjs_require__(16);
var wellKnownSymbol = __w_pdfjs_require__(52);
var MATCH = wellKnownSymbol('match');
module.exports = function (it) {
 var isRegExp;
 return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var shared = __w_pdfjs_require__(33);
var has = __w_pdfjs_require__(20);
var uid = __w_pdfjs_require__(35);
var NATIVE_SYMBOL = __w_pdfjs_require__(53);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(54);
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
/* 53 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 return !String(Symbol());
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var NATIVE_SYMBOL = __w_pdfjs_require__(53);
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 55 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
var MATCH = wellKnownSymbol('match');
module.exports = function (METHOD_NAME) {
 var regexp = /./;
 try {
  '/./'[METHOD_NAME](regexp);
 } catch (e) {
  try {
   regexp[MATCH] = false;
   return '/./'[METHOD_NAME](regexp);
  } catch (f) {
  }
 }
 return false;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var bind = __w_pdfjs_require__(57);
var call = Function.call;
module.exports = function (CONSTRUCTOR, METHOD, length) {
 return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var aFunction = __w_pdfjs_require__(58);
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
/* 58 */
/***/ (function(module, exports) {

module.exports = function (it) {
 if (typeof it != 'function') {
  throw TypeError(String(it) + ' is not a function');
 }
 return it;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(60);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'endsWith');

/***/ }),
/* 60 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var getOwnPropertyDescriptor = __w_pdfjs_require__(9).f;
var toLength = __w_pdfjs_require__(44);
var notARegExp = __w_pdfjs_require__(50);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(55);
var IS_PURE = __w_pdfjs_require__(34);
var nativeEndsWith = ''.endsWith;
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
 var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
 return descriptor && !descriptor.writable;
}();
$({
 target: 'String',
 proto: true,
 forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
 endsWith: function endsWith(searchString) {
  var that = String(requireObjectCoercible(this));
  notARegExp(searchString);
  var endPosition = arguments.length > 1 ? arguments[1] : undefined;
  var len = toLength(that.length);
  var end = endPosition === undefined ? len : min(toLength(endPosition), len);
  var search = String(searchString);
  return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
 }
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(62);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'includes');

/***/ }),
/* 62 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var notARegExp = __w_pdfjs_require__(50);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(55);
$({
 target: 'String',
 proto: true,
 forced: !correctIsRegExpLogic('includes')
}, {
 includes: function includes(searchString) {
  return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(64);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('Array', 'includes');

/***/ }),
/* 64 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $includes = __w_pdfjs_require__(43).includes;
var addToUnscopables = __w_pdfjs_require__(65);
var arrayMethodUsesToLength = __w_pdfjs_require__(70);
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
 ACCESSORS: true,
 1: 0
});
$({
 target: 'Array',
 proto: true,
 forced: !USES_TO_LENGTH
}, {
 includes: function includes(el) {
  return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
 }
});
addToUnscopables('includes');

/***/ }),
/* 65 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
var create = __w_pdfjs_require__(66);
var definePropertyModule = __w_pdfjs_require__(24);
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
/* 66 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var defineProperties = __w_pdfjs_require__(67);
var enumBugKeys = __w_pdfjs_require__(47);
var hiddenKeys = __w_pdfjs_require__(36);
var html = __w_pdfjs_require__(69);
var documentCreateElement = __w_pdfjs_require__(22);
var sharedKey = __w_pdfjs_require__(32);
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
/* 67 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var definePropertyModule = __w_pdfjs_require__(24);
var anObject = __w_pdfjs_require__(25);
var objectKeys = __w_pdfjs_require__(68);
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
/* 68 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var internalObjectKeys = __w_pdfjs_require__(42);
var enumBugKeys = __w_pdfjs_require__(47);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(39);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 70 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var fails = __w_pdfjs_require__(11);
var has = __w_pdfjs_require__(20);
var defineProperty = Object.defineProperty;
var cache = {};
var thrower = function (it) {
 throw it;
};
module.exports = function (METHOD_NAME, options) {
 if (has(cache, METHOD_NAME))
  return cache[METHOD_NAME];
 if (!options)
  options = {};
 var method = [][METHOD_NAME];
 var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
 var argument0 = has(options, 0) ? options[0] : thrower;
 var argument1 = has(options, 1) ? options[1] : undefined;
 return cache[METHOD_NAME] = !!method && !fails(function () {
  if (ACCESSORS && !DESCRIPTORS)
   return true;
  var O = { length: -1 };
  if (ACCESSORS)
   defineProperty(O, 1, {
    enumerable: true,
    get: thrower
   });
  else
   O[1] = 1;
  method.call(O, argument0, argument1);
 });
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(72);
__w_pdfjs_require__(84);
var path = __w_pdfjs_require__(40);
module.exports = path.Array.from;

/***/ }),
/* 72 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var charAt = __w_pdfjs_require__(73).charAt;
var InternalStateModule = __w_pdfjs_require__(30);
var defineIterator = __w_pdfjs_require__(74);
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
/* 73 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(45);
var requireObjectCoercible = __w_pdfjs_require__(17);
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
/* 74 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var createIteratorConstructor = __w_pdfjs_require__(75);
var getPrototypeOf = __w_pdfjs_require__(77);
var setPrototypeOf = __w_pdfjs_require__(82);
var setToStringTag = __w_pdfjs_require__(80);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var wellKnownSymbol = __w_pdfjs_require__(52);
var IS_PURE = __w_pdfjs_require__(34);
var Iterators = __w_pdfjs_require__(81);
var IteratorsCore = __w_pdfjs_require__(76);
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
/* 75 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var IteratorPrototype = __w_pdfjs_require__(76).IteratorPrototype;
var create = __w_pdfjs_require__(66);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var setToStringTag = __w_pdfjs_require__(80);
var Iterators = __w_pdfjs_require__(81);
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
/* 76 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var getPrototypeOf = __w_pdfjs_require__(77);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var has = __w_pdfjs_require__(20);
var wellKnownSymbol = __w_pdfjs_require__(52);
var IS_PURE = __w_pdfjs_require__(34);
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
if (IteratorPrototype == undefined)
 IteratorPrototype = {};
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
 createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}
module.exports = {
 IteratorPrototype: IteratorPrototype,
 BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var toObject = __w_pdfjs_require__(78);
var sharedKey = __w_pdfjs_require__(32);
var CORRECT_PROTOTYPE_GETTER = __w_pdfjs_require__(79);
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
/* 78 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var requireObjectCoercible = __w_pdfjs_require__(17);
module.exports = function (argument) {
 return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineProperty = __w_pdfjs_require__(24).f;
var has = __w_pdfjs_require__(20);
var wellKnownSymbol = __w_pdfjs_require__(52);
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
/* 81 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 82 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var aPossiblePrototype = __w_pdfjs_require__(83);
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
/* 83 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
module.exports = function (it) {
 if (!isObject(it) && it !== null) {
  throw TypeError("Can't set " + String(it) + ' as a prototype');
 }
 return it;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var from = __w_pdfjs_require__(85);
var checkCorrectnessOfIteration = __w_pdfjs_require__(92);
var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
 Array.from(iterable);
});
$({
 target: 'Array',
 stat: true,
 forced: INCORRECT_ITERATION
}, { from: from });

/***/ }),
/* 85 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var bind = __w_pdfjs_require__(57);
var toObject = __w_pdfjs_require__(78);
var callWithSafeIterationClosing = __w_pdfjs_require__(86);
var isArrayIteratorMethod = __w_pdfjs_require__(87);
var toLength = __w_pdfjs_require__(44);
var createProperty = __w_pdfjs_require__(88);
var getIteratorMethod = __w_pdfjs_require__(89);
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
/* 86 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
module.exports = function (iterator, fn, value, ENTRIES) {
 try {
  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
 } catch (error) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined)
   anObject(returnMethod.call(iterator));
  throw error;
 }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
var Iterators = __w_pdfjs_require__(81);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toPrimitive = __w_pdfjs_require__(18);
var definePropertyModule = __w_pdfjs_require__(24);
var createPropertyDescriptor = __w_pdfjs_require__(13);
module.exports = function (object, key, value) {
 var propertyKey = toPrimitive(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var classof = __w_pdfjs_require__(90);
var Iterators = __w_pdfjs_require__(81);
var wellKnownSymbol = __w_pdfjs_require__(52);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (it != undefined)
  return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(91);
var classofRaw = __w_pdfjs_require__(16);
var wellKnownSymbol = __w_pdfjs_require__(52);
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
/* 91 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 92 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
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
/* 93 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(94);
var path = __w_pdfjs_require__(40);
module.exports = path.Object.assign;

/***/ }),
/* 94 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var assign = __w_pdfjs_require__(95);
$({
 target: 'Object',
 stat: true,
 forced: Object.assign !== assign
}, { assign: assign });

/***/ }),
/* 95 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var DESCRIPTORS = __w_pdfjs_require__(10);
var fails = __w_pdfjs_require__(11);
var objectKeys = __w_pdfjs_require__(68);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(48);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var toObject = __w_pdfjs_require__(78);
var IndexedObject = __w_pdfjs_require__(15);
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
/* 96 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(97);
var path = __w_pdfjs_require__(40);
module.exports = path.Math.log2;

/***/ }),
/* 97 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var log = Math.log;
var LN2 = Math.LN2;
$({
 target: 'Math',
 stat: true
}, {
 log2: function log2(x) {
  return log(x) / LN2;
 }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(99);
var path = __w_pdfjs_require__(40);
module.exports = path.Number.isNaN;

/***/ }),
/* 99 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
$({
 target: 'Number',
 stat: true
}, {
 isNaN: function isNaN(number) {
  return number != number;
 }
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(101);
var path = __w_pdfjs_require__(40);
module.exports = path.Number.isInteger;

/***/ }),
/* 101 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var isInteger = __w_pdfjs_require__(102);
$({
 target: 'Number',
 stat: true
}, { isInteger: isInteger });

/***/ }),
/* 102 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var floor = Math.floor;
module.exports = function isInteger(it) {
 return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(104);
__w_pdfjs_require__(72);
__w_pdfjs_require__(106);
__w_pdfjs_require__(109);
__w_pdfjs_require__(125);
__w_pdfjs_require__(126);
var path = __w_pdfjs_require__(40);
module.exports = path.Promise;

/***/ }),
/* 104 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(91);
var redefine = __w_pdfjs_require__(26);
var toString = __w_pdfjs_require__(105);
if (!TO_STRING_TAG_SUPPORT) {
 redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(91);
var classof = __w_pdfjs_require__(90);
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
 return '[object ' + classof(this) + ']';
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var DOMIterables = __w_pdfjs_require__(107);
var ArrayIteratorMethods = __w_pdfjs_require__(108);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var wellKnownSymbol = __w_pdfjs_require__(52);
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
/* 107 */
/***/ (function(module, exports) {

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
/* 108 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toIndexedObject = __w_pdfjs_require__(14);
var addToUnscopables = __w_pdfjs_require__(65);
var Iterators = __w_pdfjs_require__(81);
var InternalStateModule = __w_pdfjs_require__(30);
var defineIterator = __w_pdfjs_require__(74);
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
/* 109 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var IS_PURE = __w_pdfjs_require__(34);
var global = __w_pdfjs_require__(8);
var getBuiltIn = __w_pdfjs_require__(39);
var NativePromise = __w_pdfjs_require__(110);
var redefine = __w_pdfjs_require__(26);
var redefineAll = __w_pdfjs_require__(111);
var setToStringTag = __w_pdfjs_require__(80);
var setSpecies = __w_pdfjs_require__(112);
var isObject = __w_pdfjs_require__(19);
var aFunction = __w_pdfjs_require__(58);
var anInstance = __w_pdfjs_require__(113);
var classof = __w_pdfjs_require__(16);
var inspectSource = __w_pdfjs_require__(28);
var iterate = __w_pdfjs_require__(114);
var checkCorrectnessOfIteration = __w_pdfjs_require__(92);
var speciesConstructor = __w_pdfjs_require__(115);
var task = __w_pdfjs_require__(116).set;
var microtask = __w_pdfjs_require__(119);
var promiseResolve = __w_pdfjs_require__(120);
var hostReportErrors = __w_pdfjs_require__(122);
var newPromiseCapabilityModule = __w_pdfjs_require__(121);
var perform = __w_pdfjs_require__(123);
var InternalStateModule = __w_pdfjs_require__(30);
var isForced = __w_pdfjs_require__(49);
var wellKnownSymbol = __w_pdfjs_require__(52);
var V8_VERSION = __w_pdfjs_require__(124);
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
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
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
  if (!IS_NODE && typeof PromiseRejectionEvent != 'function')
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
var notify = function (promise, state, isReject) {
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
       onHandleUnhandled(promise, state);
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
   onUnhandled(promise, state);
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
 if (handler = global['on' + name])
  handler(event);
 else if (name === UNHANDLED_REJECTION)
  hostReportErrors('Unhandled promise rejection', reason);
};
var onUnhandled = function (promise, state) {
 task.call(global, function () {
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
var onHandleUnhandled = function (promise, state) {
 task.call(global, function () {
  if (IS_NODE) {
   process.emit('rejectionHandled', promise);
  } else
   dispatchEvent(REJECTION_HANDLED, promise, state.value);
 });
};
var bind = function (fn, promise, state, unwrap) {
 return function (value) {
  fn(promise, state, value, unwrap);
 };
};
var internalReject = function (promise, state, value, unwrap) {
 if (state.done)
  return;
 state.done = true;
 if (unwrap)
  state = unwrap;
 state.value = value;
 state.state = REJECTED;
 notify(promise, state, true);
};
var internalResolve = function (promise, state, value, unwrap) {
 if (state.done)
  return;
 state.done = true;
 if (unwrap)
  state = unwrap;
 try {
  if (promise === value)
   throw TypeError("Promise can't be resolved itself");
  var then = isThenable(value);
  if (then) {
   microtask(function () {
    var wrapper = { done: false };
    try {
     then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
    } catch (error) {
     internalReject(promise, wrapper, error, state);
    }
   });
  } else {
   state.value = value;
   state.state = FULFILLED;
   notify(promise, state, false);
  }
 } catch (error) {
  internalReject(promise, { done: false }, error, state);
 }
};
if (FORCED) {
 PromiseConstructor = function Promise(executor) {
  anInstance(this, PromiseConstructor, PROMISE);
  aFunction(executor);
  Internal.call(this);
  var state = getInternalState(this);
  try {
   executor(bind(internalResolve, this, state), bind(internalReject, this, state));
  } catch (error) {
   internalReject(this, state, error);
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
    notify(this, state, false);
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
  this.resolve = bind(internalResolve, promise, state);
  this.reject = bind(internalReject, promise, state);
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
/* 110 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
module.exports = global.Promise;

/***/ }),
/* 111 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var redefine = __w_pdfjs_require__(26);
module.exports = function (target, src, options) {
 for (var key in src)
  redefine(target, key, src[key], options);
 return target;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var getBuiltIn = __w_pdfjs_require__(39);
var definePropertyModule = __w_pdfjs_require__(24);
var wellKnownSymbol = __w_pdfjs_require__(52);
var DESCRIPTORS = __w_pdfjs_require__(10);
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
/* 113 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
 if (!(it instanceof Constructor)) {
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
 }
 return it;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var isArrayIteratorMethod = __w_pdfjs_require__(87);
var toLength = __w_pdfjs_require__(44);
var bind = __w_pdfjs_require__(57);
var getIteratorMethod = __w_pdfjs_require__(89);
var callWithSafeIterationClosing = __w_pdfjs_require__(86);
var Result = function (stopped, result) {
 this.stopped = stopped;
 this.result = result;
};
var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
 var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
 var iterator, iterFn, index, length, result, next, step;
 if (IS_ITERATOR) {
  iterator = iterable;
 } else {
  iterFn = getIteratorMethod(iterable);
  if (typeof iterFn != 'function')
   throw TypeError('Target is not iterable');
  if (isArrayIteratorMethod(iterFn)) {
   for (index = 0, length = toLength(iterable.length); length > index; index++) {
    result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
    if (result && result instanceof Result)
     return result;
   }
   return new Result(false);
  }
  iterator = iterFn.call(iterable);
 }
 next = iterator.next;
 while (!(step = next.call(iterator)).done) {
  result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
  if (typeof result == 'object' && result && result instanceof Result)
   return result;
 }
 return new Result(false);
};
iterate.stop = function (result) {
 return new Result(true, result);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var aFunction = __w_pdfjs_require__(58);
var wellKnownSymbol = __w_pdfjs_require__(52);
var SPECIES = wellKnownSymbol('species');
module.exports = function (O, defaultConstructor) {
 var C = anObject(O).constructor;
 var S;
 return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var fails = __w_pdfjs_require__(11);
var classof = __w_pdfjs_require__(16);
var bind = __w_pdfjs_require__(57);
var html = __w_pdfjs_require__(69);
var createElement = __w_pdfjs_require__(22);
var IS_IOS = __w_pdfjs_require__(117);
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
 if (classof(process) == 'process') {
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
 } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
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
/* 117 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var userAgent = __w_pdfjs_require__(118);
module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),
/* 118 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(39);
module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 119 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var getOwnPropertyDescriptor = __w_pdfjs_require__(9).f;
var classof = __w_pdfjs_require__(16);
var macrotask = __w_pdfjs_require__(116).set;
var IS_IOS = __w_pdfjs_require__(117);
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
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
 if (IS_NODE) {
  notify = function () {
   process.nextTick(flush);
  };
 } else if (MutationObserver && !IS_IOS) {
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
/* 120 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var isObject = __w_pdfjs_require__(19);
var newPromiseCapability = __w_pdfjs_require__(121);
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
/* 121 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var aFunction = __w_pdfjs_require__(58);
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
/* 122 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
module.exports = function (a, b) {
 var console = global.console;
 if (console && console.error) {
  arguments.length === 1 ? console.error(a) : console.error(a, b);
 }
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

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
/* 124 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var userAgent = __w_pdfjs_require__(118);
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
/* 125 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var aFunction = __w_pdfjs_require__(58);
var newPromiseCapabilityModule = __w_pdfjs_require__(121);
var perform = __w_pdfjs_require__(123);
var iterate = __w_pdfjs_require__(114);
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
    }, function (e) {
     if (alreadyCalled)
      return;
     alreadyCalled = true;
     values[index] = {
      status: 'rejected',
      reason: e
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
/* 126 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var IS_PURE = __w_pdfjs_require__(34);
var NativePromise = __w_pdfjs_require__(110);
var fails = __w_pdfjs_require__(11);
var getBuiltIn = __w_pdfjs_require__(39);
var speciesConstructor = __w_pdfjs_require__(115);
var promiseResolve = __w_pdfjs_require__(120);
var redefine = __w_pdfjs_require__(26);
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
/* 127 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(128);
__w_pdfjs_require__(133);
__w_pdfjs_require__(131);
var path = __w_pdfjs_require__(40);
module.exports = path.URL;

/***/ }),
/* 128 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

__w_pdfjs_require__(72);
var $ = __w_pdfjs_require__(7);
var DESCRIPTORS = __w_pdfjs_require__(10);
var USE_NATIVE_URL = __w_pdfjs_require__(129);
var global = __w_pdfjs_require__(8);
var defineProperties = __w_pdfjs_require__(67);
var redefine = __w_pdfjs_require__(26);
var anInstance = __w_pdfjs_require__(113);
var has = __w_pdfjs_require__(20);
var assign = __w_pdfjs_require__(95);
var arrayFrom = __w_pdfjs_require__(85);
var codeAt = __w_pdfjs_require__(73).codeAt;
var toASCII = __w_pdfjs_require__(130);
var setToStringTag = __w_pdfjs_require__(80);
var URLSearchParamsModule = __w_pdfjs_require__(131);
var InternalStateModule = __w_pdfjs_require__(30);
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
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
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
/* 129 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var wellKnownSymbol = __w_pdfjs_require__(52);
var IS_PURE = __w_pdfjs_require__(34);
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
/* 130 */
/***/ (function(module, exports, __w_pdfjs_require__) {

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
/* 131 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

__w_pdfjs_require__(108);
var $ = __w_pdfjs_require__(7);
var getBuiltIn = __w_pdfjs_require__(39);
var USE_NATIVE_URL = __w_pdfjs_require__(129);
var redefine = __w_pdfjs_require__(26);
var redefineAll = __w_pdfjs_require__(111);
var setToStringTag = __w_pdfjs_require__(80);
var createIteratorConstructor = __w_pdfjs_require__(75);
var InternalStateModule = __w_pdfjs_require__(30);
var anInstance = __w_pdfjs_require__(113);
var hasOwn = __w_pdfjs_require__(20);
var bind = __w_pdfjs_require__(57);
var classof = __w_pdfjs_require__(90);
var anObject = __w_pdfjs_require__(25);
var isObject = __w_pdfjs_require__(19);
var create = __w_pdfjs_require__(66);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var getIterator = __w_pdfjs_require__(132);
var getIteratorMethod = __w_pdfjs_require__(89);
var wellKnownSymbol = __w_pdfjs_require__(52);
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
/* 132 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var getIteratorMethod = __w_pdfjs_require__(89);
module.exports = function (it) {
 var iteratorMethod = getIteratorMethod(it);
 if (typeof iteratorMethod != 'function') {
  throw TypeError(String(it) + ' is not iterable');
 }
 return anObject(iteratorMethod.call(it));
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
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
/* 134 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(104);
__w_pdfjs_require__(135);
__w_pdfjs_require__(106);
var path = __w_pdfjs_require__(40);
module.exports = path.WeakMap;

/***/ }),
/* 135 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var global = __w_pdfjs_require__(8);
var redefineAll = __w_pdfjs_require__(111);
var InternalMetadataModule = __w_pdfjs_require__(136);
var collection = __w_pdfjs_require__(138);
var collectionWeak = __w_pdfjs_require__(140);
var isObject = __w_pdfjs_require__(19);
var enforceIternalState = __w_pdfjs_require__(30).enforce;
var NATIVE_WEAK_MAP = __w_pdfjs_require__(31);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;
var wrapper = function (init) {
 return function WeakMap() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
};
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);
if (NATIVE_WEAK_MAP && IS_IE11) {
 InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
 InternalMetadataModule.REQUIRED = true;
 var WeakMapPrototype = $WeakMap.prototype;
 var nativeDelete = WeakMapPrototype['delete'];
 var nativeHas = WeakMapPrototype.has;
 var nativeGet = WeakMapPrototype.get;
 var nativeSet = WeakMapPrototype.set;
 redefineAll(WeakMapPrototype, {
  'delete': function (key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeDelete.call(this, key) || state.frozen['delete'](key);
   }
   return nativeDelete.call(this, key);
  },
  has: function has(key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeHas.call(this, key) || state.frozen.has(key);
   }
   return nativeHas.call(this, key);
  },
  get: function get(key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
   }
   return nativeGet.call(this, key);
  },
  set: function set(key, value) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
   } else
    nativeSet.call(this, key, value);
   return this;
  }
 });
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var hiddenKeys = __w_pdfjs_require__(36);
var isObject = __w_pdfjs_require__(19);
var has = __w_pdfjs_require__(20);
var defineProperty = __w_pdfjs_require__(24).f;
var uid = __w_pdfjs_require__(35);
var FREEZING = __w_pdfjs_require__(137);
var METADATA = uid('meta');
var id = 0;
var isExtensible = Object.isExtensible || function () {
 return true;
};
var setMetadata = function (it) {
 defineProperty(it, METADATA, {
  value: {
   objectID: 'O' + ++id,
   weakData: {}
  }
 });
};
var fastKey = function (it, create) {
 if (!isObject(it))
  return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
 if (!has(it, METADATA)) {
  if (!isExtensible(it))
   return 'F';
  if (!create)
   return 'E';
  setMetadata(it);
 }
 return it[METADATA].objectID;
};
var getWeakData = function (it, create) {
 if (!has(it, METADATA)) {
  if (!isExtensible(it))
   return true;
  if (!create)
   return false;
  setMetadata(it);
 }
 return it[METADATA].weakData;
};
var onFreeze = function (it) {
 if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
  setMetadata(it);
 return it;
};
var meta = module.exports = {
 REQUIRED: false,
 fastKey: fastKey,
 getWeakData: getWeakData,
 onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;

/***/ }),
/* 137 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 return Object.isExtensible(Object.preventExtensions({}));
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var global = __w_pdfjs_require__(8);
var isForced = __w_pdfjs_require__(49);
var redefine = __w_pdfjs_require__(26);
var InternalMetadataModule = __w_pdfjs_require__(136);
var iterate = __w_pdfjs_require__(114);
var anInstance = __w_pdfjs_require__(113);
var isObject = __w_pdfjs_require__(19);
var fails = __w_pdfjs_require__(11);
var checkCorrectnessOfIteration = __w_pdfjs_require__(92);
var setToStringTag = __w_pdfjs_require__(80);
var inheritIfRequired = __w_pdfjs_require__(139);
module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
 var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
 var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
 var ADDER = IS_MAP ? 'set' : 'add';
 var NativeConstructor = global[CONSTRUCTOR_NAME];
 var NativePrototype = NativeConstructor && NativeConstructor.prototype;
 var Constructor = NativeConstructor;
 var exported = {};
 var fixMethod = function (KEY) {
  var nativeMethod = NativePrototype[KEY];
  redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
   nativeMethod.call(this, value === 0 ? 0 : value);
   return this;
  } : KEY == 'delete' ? function (key) {
   return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
  } : KEY == 'get' ? function get(key) {
   return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
  } : KEY == 'has' ? function has(key) {
   return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
  } : function set(key, value) {
   nativeMethod.call(this, key === 0 ? 0 : key, value);
   return this;
  });
 };
 if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
   new NativeConstructor().entries().next();
  })))) {
  Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
  InternalMetadataModule.REQUIRED = true;
 } else if (isForced(CONSTRUCTOR_NAME, true)) {
  var instance = new Constructor();
  var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
  var THROWS_ON_PRIMITIVES = fails(function () {
   instance.has(1);
  });
  var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
   new NativeConstructor(iterable);
  });
  var BUGGY_ZERO = !IS_WEAK && fails(function () {
   var $instance = new NativeConstructor();
   var index = 5;
   while (index--)
    $instance[ADDER](index, index);
   return !$instance.has(-0);
  });
  if (!ACCEPT_ITERABLES) {
   Constructor = wrapper(function (dummy, iterable) {
    anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
    var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
    if (iterable != undefined)
     iterate(iterable, that[ADDER], that, IS_MAP);
    return that;
   });
   Constructor.prototype = NativePrototype;
   NativePrototype.constructor = Constructor;
  }
  if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
   fixMethod('delete');
   fixMethod('has');
   IS_MAP && fixMethod('get');
  }
  if (BUGGY_ZERO || HASNT_CHAINING)
   fixMethod(ADDER);
  if (IS_WEAK && NativePrototype.clear)
   delete NativePrototype.clear;
 }
 exported[CONSTRUCTOR_NAME] = Constructor;
 $({
  global: true,
  forced: Constructor != NativeConstructor
 }, exported);
 setToStringTag(Constructor, CONSTRUCTOR_NAME);
 if (!IS_WEAK)
  common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
 return Constructor;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var setPrototypeOf = __w_pdfjs_require__(82);
module.exports = function ($this, dummy, Wrapper) {
 var NewTarget, NewTargetPrototype;
 if (setPrototypeOf && typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
  setPrototypeOf($this, NewTargetPrototype);
 return $this;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var redefineAll = __w_pdfjs_require__(111);
var getWeakData = __w_pdfjs_require__(136).getWeakData;
var anObject = __w_pdfjs_require__(25);
var isObject = __w_pdfjs_require__(19);
var anInstance = __w_pdfjs_require__(113);
var iterate = __w_pdfjs_require__(114);
var ArrayIterationModule = __w_pdfjs_require__(141);
var $has = __w_pdfjs_require__(20);
var InternalStateModule = __w_pdfjs_require__(30);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;
var uncaughtFrozenStore = function (store) {
 return store.frozen || (store.frozen = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
 this.entries = [];
};
var findUncaughtFrozen = function (store, key) {
 return find(store.entries, function (it) {
  return it[0] === key;
 });
};
UncaughtFrozenStore.prototype = {
 get: function (key) {
  var entry = findUncaughtFrozen(this, key);
  if (entry)
   return entry[1];
 },
 has: function (key) {
  return !!findUncaughtFrozen(this, key);
 },
 set: function (key, value) {
  var entry = findUncaughtFrozen(this, key);
  if (entry)
   entry[1] = value;
  else
   this.entries.push([
    key,
    value
   ]);
 },
 'delete': function (key) {
  var index = findIndex(this.entries, function (it) {
   return it[0] === key;
  });
  if (~index)
   this.entries.splice(index, 1);
  return !!~index;
 }
};
module.exports = {
 getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
  var C = wrapper(function (that, iterable) {
   anInstance(that, C, CONSTRUCTOR_NAME);
   setInternalState(that, {
    type: CONSTRUCTOR_NAME,
    id: id++,
    frozen: undefined
   });
   if (iterable != undefined)
    iterate(iterable, that[ADDER], that, IS_MAP);
  });
  var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
  var define = function (that, key, value) {
   var state = getInternalState(that);
   var data = getWeakData(anObject(key), true);
   if (data === true)
    uncaughtFrozenStore(state).set(key, value);
   else
    data[state.id] = value;
   return that;
  };
  redefineAll(C.prototype, {
   'delete': function (key) {
    var state = getInternalState(this);
    if (!isObject(key))
     return false;
    var data = getWeakData(key);
    if (data === true)
     return uncaughtFrozenStore(state)['delete'](key);
    return data && $has(data, state.id) && delete data[state.id];
   },
   has: function has(key) {
    var state = getInternalState(this);
    if (!isObject(key))
     return false;
    var data = getWeakData(key);
    if (data === true)
     return uncaughtFrozenStore(state).has(key);
    return data && $has(data, state.id);
   }
  });
  redefineAll(C.prototype, IS_MAP ? {
   get: function get(key) {
    var state = getInternalState(this);
    if (isObject(key)) {
     var data = getWeakData(key);
     if (data === true)
      return uncaughtFrozenStore(state).get(key);
     return data ? data[state.id] : undefined;
    }
   },
   set: function set(key, value) {
    return define(this, key, value);
   }
  } : {
   add: function add(value) {
    return define(this, value, true);
   }
  });
  return C;
 }
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var bind = __w_pdfjs_require__(57);
var IndexedObject = __w_pdfjs_require__(15);
var toObject = __w_pdfjs_require__(78);
var toLength = __w_pdfjs_require__(44);
var arraySpeciesCreate = __w_pdfjs_require__(142);
var push = [].push;
var createMethod = function (TYPE) {
 var IS_MAP = TYPE == 1;
 var IS_FILTER = TYPE == 2;
 var IS_SOME = TYPE == 3;
 var IS_EVERY = TYPE == 4;
 var IS_FIND_INDEX = TYPE == 6;
 var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
 return function ($this, callbackfn, that, specificCreate) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that, 3);
  var length = toLength(self.length);
  var index = 0;
  var create = specificCreate || arraySpeciesCreate;
  var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
  var value, result;
  for (; length > index; index++)
   if (NO_HOLES || index in self) {
    value = self[index];
    result = boundFunction(value, index, O);
    if (TYPE) {
     if (IS_MAP)
      target[index] = result;
     else if (result)
      switch (TYPE) {
      case 3:
       return true;
      case 5:
       return value;
      case 6:
       return index;
      case 2:
       push.call(target, value);
      }
     else if (IS_EVERY)
      return false;
    }
   }
  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
 };
};
module.exports = {
 forEach: createMethod(0),
 map: createMethod(1),
 filter: createMethod(2),
 some: createMethod(3),
 every: createMethod(4),
 find: createMethod(5),
 findIndex: createMethod(6)
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var isArray = __w_pdfjs_require__(143);
var wellKnownSymbol = __w_pdfjs_require__(52);
var SPECIES = wellKnownSymbol('species');
module.exports = function (originalArray, length) {
 var C;
 if (isArray(originalArray)) {
  C = originalArray.constructor;
  if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
   C = undefined;
  else if (isObject(C)) {
   C = C[SPECIES];
   if (C === null)
    C = undefined;
  }
 }
 return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var classof = __w_pdfjs_require__(16);
module.exports = Array.isArray || function isArray(arg) {
 return classof(arg) == 'Array';
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(104);
__w_pdfjs_require__(145);
__w_pdfjs_require__(106);
var path = __w_pdfjs_require__(40);
module.exports = path.WeakSet;

/***/ }),
/* 145 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var collection = __w_pdfjs_require__(138);
var collectionWeak = __w_pdfjs_require__(140);
collection('WeakSet', function (init) {
 return function WeakSet() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionWeak);

/***/ }),
/* 146 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(147);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'codePointAt');

/***/ }),
/* 147 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var codeAt = __w_pdfjs_require__(73).codeAt;
$({
 target: 'String',
 proto: true
}, {
 codePointAt: function codePointAt(pos) {
  return codeAt(this, pos);
 }
});

/***/ }),
/* 148 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(149);
var path = __w_pdfjs_require__(40);
module.exports = path.String.fromCodePoint;

/***/ }),
/* 149 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var toAbsoluteIndex = __w_pdfjs_require__(46);
var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint;
var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;
$({
 target: 'String',
 stat: true,
 forced: INCORRECT_LENGTH
}, {
 fromCodePoint: function fromCodePoint(x) {
  var elements = [];
  var length = arguments.length;
  var i = 0;
  var code;
  while (length > i) {
   code = +arguments[i++];
   if (toAbsoluteIndex(code, 0x10FFFF) !== code)
    throw RangeError(code + ' is not a valid code point');
   elements.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00));
  }
  return elements.join('');
 }
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(151);
__w_pdfjs_require__(104);
__w_pdfjs_require__(153);
__w_pdfjs_require__(157);
__w_pdfjs_require__(158);
__w_pdfjs_require__(159);
__w_pdfjs_require__(160);
__w_pdfjs_require__(161);
__w_pdfjs_require__(162);
__w_pdfjs_require__(163);
__w_pdfjs_require__(164);
__w_pdfjs_require__(165);
__w_pdfjs_require__(166);
__w_pdfjs_require__(167);
__w_pdfjs_require__(168);
__w_pdfjs_require__(169);
__w_pdfjs_require__(170);
__w_pdfjs_require__(171);
__w_pdfjs_require__(172);
var path = __w_pdfjs_require__(40);
module.exports = path.Symbol;

/***/ }),
/* 151 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var fails = __w_pdfjs_require__(11);
var isArray = __w_pdfjs_require__(143);
var isObject = __w_pdfjs_require__(19);
var toObject = __w_pdfjs_require__(78);
var toLength = __w_pdfjs_require__(44);
var createProperty = __w_pdfjs_require__(88);
var arraySpeciesCreate = __w_pdfjs_require__(142);
var arrayMethodHasSpeciesSupport = __w_pdfjs_require__(152);
var wellKnownSymbol = __w_pdfjs_require__(52);
var V8_VERSION = __w_pdfjs_require__(124);
var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
 var array = [];
 array[IS_CONCAT_SPREADABLE] = false;
 return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
var isConcatSpreadable = function (O) {
 if (!isObject(O))
  return false;
 var spreadable = O[IS_CONCAT_SPREADABLE];
 return spreadable !== undefined ? !!spreadable : isArray(O);
};
var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
$({
 target: 'Array',
 proto: true,
 forced: FORCED
}, {
 concat: function concat(arg) {
  var O = toObject(this);
  var A = arraySpeciesCreate(O, 0);
  var n = 0;
  var i, k, length, len, E;
  for (i = -1, length = arguments.length; i < length; i++) {
   E = i === -1 ? O : arguments[i];
   if (isConcatSpreadable(E)) {
    len = toLength(E.length);
    if (n + len > MAX_SAFE_INTEGER)
     throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    for (k = 0; k < len; k++, n++)
     if (k in E)
      createProperty(A, n, E[k]);
   } else {
    if (n >= MAX_SAFE_INTEGER)
     throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    createProperty(A, n++, E);
   }
  }
  A.length = n;
  return A;
 }
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var wellKnownSymbol = __w_pdfjs_require__(52);
var V8_VERSION = __w_pdfjs_require__(124);
var SPECIES = wellKnownSymbol('species');
module.exports = function (METHOD_NAME) {
 return V8_VERSION >= 51 || !fails(function () {
  var array = [];
  var constructor = array.constructor = {};
  constructor[SPECIES] = function () {
   return { foo: 1 };
  };
  return array[METHOD_NAME](Boolean).foo !== 1;
 });
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var global = __w_pdfjs_require__(8);
var getBuiltIn = __w_pdfjs_require__(39);
var IS_PURE = __w_pdfjs_require__(34);
var DESCRIPTORS = __w_pdfjs_require__(10);
var NATIVE_SYMBOL = __w_pdfjs_require__(53);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(54);
var fails = __w_pdfjs_require__(11);
var has = __w_pdfjs_require__(20);
var isArray = __w_pdfjs_require__(143);
var isObject = __w_pdfjs_require__(19);
var anObject = __w_pdfjs_require__(25);
var toObject = __w_pdfjs_require__(78);
var toIndexedObject = __w_pdfjs_require__(14);
var toPrimitive = __w_pdfjs_require__(18);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var nativeObjectCreate = __w_pdfjs_require__(66);
var objectKeys = __w_pdfjs_require__(68);
var getOwnPropertyNamesModule = __w_pdfjs_require__(41);
var getOwnPropertyNamesExternal = __w_pdfjs_require__(154);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(48);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(9);
var definePropertyModule = __w_pdfjs_require__(24);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var createNonEnumerableProperty = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var shared = __w_pdfjs_require__(33);
var sharedKey = __w_pdfjs_require__(32);
var hiddenKeys = __w_pdfjs_require__(36);
var uid = __w_pdfjs_require__(35);
var wellKnownSymbol = __w_pdfjs_require__(52);
var wrappedWellKnownSymbolModule = __w_pdfjs_require__(155);
var defineWellKnownSymbol = __w_pdfjs_require__(156);
var setToStringTag = __w_pdfjs_require__(80);
var InternalStateModule = __w_pdfjs_require__(30);
var $forEach = __w_pdfjs_require__(141).forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
 return nativeObjectCreate(nativeDefineProperty({}, 'a', {
  get: function () {
   return nativeDefineProperty(this, 'a', { value: 7 }).a;
  }
 })).a != 7;
}) ? function (O, P, Attributes) {
 var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
 if (ObjectPrototypeDescriptor)
  delete ObjectPrototype[P];
 nativeDefineProperty(O, P, Attributes);
 if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
  nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
 }
} : nativeDefineProperty;
var wrap = function (tag, description) {
 var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
 setInternalState(symbol, {
  type: SYMBOL,
  tag: tag,
  description: description
 });
 if (!DESCRIPTORS)
  symbol.description = description;
 return symbol;
};
var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
 return typeof it == 'symbol';
} : function (it) {
 return Object(it) instanceof $Symbol;
};
var $defineProperty = function defineProperty(O, P, Attributes) {
 if (O === ObjectPrototype)
  $defineProperty(ObjectPrototypeSymbols, P, Attributes);
 anObject(O);
 var key = toPrimitive(P, true);
 anObject(Attributes);
 if (has(AllSymbols, key)) {
  if (!Attributes.enumerable) {
   if (!has(O, HIDDEN))
    nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
   O[HIDDEN][key] = true;
  } else {
   if (has(O, HIDDEN) && O[HIDDEN][key])
    O[HIDDEN][key] = false;
   Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
  }
  return setSymbolDescriptor(O, key, Attributes);
 }
 return nativeDefineProperty(O, key, Attributes);
};
var $defineProperties = function defineProperties(O, Properties) {
 anObject(O);
 var properties = toIndexedObject(Properties);
 var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
 $forEach(keys, function (key) {
  if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
   $defineProperty(O, key, properties[key]);
 });
 return O;
};
var $create = function create(O, Properties) {
 return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};
var $propertyIsEnumerable = function propertyIsEnumerable(V) {
 var P = toPrimitive(V, true);
 var enumerable = nativePropertyIsEnumerable.call(this, P);
 if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
  return false;
 return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
 var it = toIndexedObject(O);
 var key = toPrimitive(P, true);
 if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
  return;
 var descriptor = nativeGetOwnPropertyDescriptor(it, key);
 if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
  descriptor.enumerable = true;
 }
 return descriptor;
};
var $getOwnPropertyNames = function getOwnPropertyNames(O) {
 var names = nativeGetOwnPropertyNames(toIndexedObject(O));
 var result = [];
 $forEach(names, function (key) {
  if (!has(AllSymbols, key) && !has(hiddenKeys, key))
   result.push(key);
 });
 return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
 var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
 var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
 var result = [];
 $forEach(names, function (key) {
  if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
   result.push(AllSymbols[key]);
  }
 });
 return result;
};
if (!NATIVE_SYMBOL) {
 $Symbol = function Symbol() {
  if (this instanceof $Symbol)
   throw TypeError('Symbol is not a constructor');
  var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
  var tag = uid(description);
  var setter = function (value) {
   if (this === ObjectPrototype)
    setter.call(ObjectPrototypeSymbols, value);
   if (has(this, HIDDEN) && has(this[HIDDEN], tag))
    this[HIDDEN][tag] = false;
   setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
  };
  if (DESCRIPTORS && USE_SETTER)
   setSymbolDescriptor(ObjectPrototype, tag, {
    configurable: true,
    set: setter
   });
  return wrap(tag, description);
 };
 redefine($Symbol[PROTOTYPE], 'toString', function toString() {
  return getInternalState(this).tag;
 });
 redefine($Symbol, 'withoutSetter', function (description) {
  return wrap(uid(description), description);
 });
 propertyIsEnumerableModule.f = $propertyIsEnumerable;
 definePropertyModule.f = $defineProperty;
 getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
 getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
 getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
 wrappedWellKnownSymbolModule.f = function (name) {
  return wrap(wellKnownSymbol(name), name);
 };
 if (DESCRIPTORS) {
  nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
   configurable: true,
   get: function description() {
    return getInternalState(this).description;
   }
  });
  if (!IS_PURE) {
   redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
  }
 }
}
$({
 global: true,
 wrap: true,
 forced: !NATIVE_SYMBOL,
 sham: !NATIVE_SYMBOL
}, { Symbol: $Symbol });
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
 defineWellKnownSymbol(name);
});
$({
 target: SYMBOL,
 stat: true,
 forced: !NATIVE_SYMBOL
}, {
 'for': function (key) {
  var string = String(key);
  if (has(StringToSymbolRegistry, string))
   return StringToSymbolRegistry[string];
  var symbol = $Symbol(string);
  StringToSymbolRegistry[string] = symbol;
  SymbolToStringRegistry[symbol] = string;
  return symbol;
 },
 keyFor: function keyFor(sym) {
  if (!isSymbol(sym))
   throw TypeError(sym + ' is not a symbol');
  if (has(SymbolToStringRegistry, sym))
   return SymbolToStringRegistry[sym];
 },
 useSetter: function () {
  USE_SETTER = true;
 },
 useSimple: function () {
  USE_SETTER = false;
 }
});
$({
 target: 'Object',
 stat: true,
 forced: !NATIVE_SYMBOL,
 sham: !DESCRIPTORS
}, {
 create: $create,
 defineProperty: $defineProperty,
 defineProperties: $defineProperties,
 getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
 target: 'Object',
 stat: true,
 forced: !NATIVE_SYMBOL
}, {
 getOwnPropertyNames: $getOwnPropertyNames,
 getOwnPropertySymbols: $getOwnPropertySymbols
});
$({
 target: 'Object',
 stat: true,
 forced: fails(function () {
  getOwnPropertySymbolsModule.f(1);
 })
}, {
 getOwnPropertySymbols: function getOwnPropertySymbols(it) {
  return getOwnPropertySymbolsModule.f(toObject(it));
 }
});
if ($stringify) {
 var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
  var symbol = $Symbol();
  return $stringify([symbol]) != '[null]' || $stringify({ a: symbol }) != '{}' || $stringify(Object(symbol)) != '{}';
 });
 $({
  target: 'JSON',
  stat: true,
  forced: FORCED_JSON_STRINGIFY
 }, {
  stringify: function stringify(it, replacer, space) {
   var args = [it];
   var index = 1;
   var $replacer;
   while (arguments.length > index)
    args.push(arguments[index++]);
   $replacer = replacer;
   if (!isObject(replacer) && it === undefined || isSymbol(it))
    return;
   if (!isArray(replacer))
    replacer = function (key, value) {
     if (typeof $replacer == 'function')
      value = $replacer.call(this, key, value);
     if (!isSymbol(value))
      return value;
    };
   args[1] = replacer;
   return $stringify.apply(null, args);
  }
 });
}
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
 createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

/***/ }),
/* 154 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toIndexedObject = __w_pdfjs_require__(14);
var nativeGetOwnPropertyNames = __w_pdfjs_require__(41).f;
var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function (it) {
 try {
  return nativeGetOwnPropertyNames(it);
 } catch (error) {
  return windowNames.slice();
 }
};
module.exports.f = function getOwnPropertyNames(it) {
 return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(52);
exports.f = wellKnownSymbol;

/***/ }),
/* 156 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var path = __w_pdfjs_require__(40);
var has = __w_pdfjs_require__(20);
var wrappedWellKnownSymbolModule = __w_pdfjs_require__(155);
var defineProperty = __w_pdfjs_require__(24).f;
module.exports = function (NAME) {
 var Symbol = path.Symbol || (path.Symbol = {});
 if (!has(Symbol, NAME))
  defineProperty(Symbol, NAME, { value: wrappedWellKnownSymbolModule.f(NAME) });
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('asyncIterator');

/***/ }),
/* 158 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var DESCRIPTORS = __w_pdfjs_require__(10);
var global = __w_pdfjs_require__(8);
var has = __w_pdfjs_require__(20);
var isObject = __w_pdfjs_require__(19);
var defineProperty = __w_pdfjs_require__(24).f;
var copyConstructorProperties = __w_pdfjs_require__(37);
var NativeSymbol = global.Symbol;
if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || NativeSymbol().description !== undefined)) {
 var EmptyStringDescriptionStore = {};
 var SymbolWrapper = function Symbol() {
  var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
  var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === undefined ? NativeSymbol() : NativeSymbol(description);
  if (description === '')
   EmptyStringDescriptionStore[result] = true;
  return result;
 };
 copyConstructorProperties(SymbolWrapper, NativeSymbol);
 var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
 symbolPrototype.constructor = SymbolWrapper;
 var symbolToString = symbolPrototype.toString;
 var native = String(NativeSymbol('test')) == 'Symbol(test)';
 var regexp = /^Symbol\((.*)\)[^)]+$/;
 defineProperty(symbolPrototype, 'description', {
  configurable: true,
  get: function description() {
   var symbol = isObject(this) ? this.valueOf() : this;
   var string = symbolToString.call(symbol);
   if (has(EmptyStringDescriptionStore, symbol))
    return '';
   var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
   return desc === '' ? undefined : desc;
  }
 });
 $({
  global: true,
  forced: true
 }, { Symbol: SymbolWrapper });
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('hasInstance');

/***/ }),
/* 160 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('isConcatSpreadable');

/***/ }),
/* 161 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('iterator');

/***/ }),
/* 162 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('match');

/***/ }),
/* 163 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('matchAll');

/***/ }),
/* 164 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('replace');

/***/ }),
/* 165 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('search');

/***/ }),
/* 166 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('species');

/***/ }),
/* 167 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('split');

/***/ }),
/* 168 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('toPrimitive');

/***/ }),
/* 169 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('toStringTag');

/***/ }),
/* 170 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(156);
defineWellKnownSymbol('unscopables');

/***/ }),
/* 171 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var setToStringTag = __w_pdfjs_require__(80);
setToStringTag(Math, 'Math', true);

/***/ }),
/* 172 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var setToStringTag = __w_pdfjs_require__(80);
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 173 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(174);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'padStart');

/***/ }),
/* 174 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $padStart = __w_pdfjs_require__(175).start;
var WEBKIT_BUG = __w_pdfjs_require__(177);
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
/* 175 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toLength = __w_pdfjs_require__(44);
var repeat = __w_pdfjs_require__(176);
var requireObjectCoercible = __w_pdfjs_require__(17);
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
/* 176 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toInteger = __w_pdfjs_require__(45);
var requireObjectCoercible = __w_pdfjs_require__(17);
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
/* 177 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var userAgent = __w_pdfjs_require__(118);
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

/***/ }),
/* 178 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(179);
var entryUnbind = __w_pdfjs_require__(56);
module.exports = entryUnbind('String', 'padEnd');

/***/ }),
/* 179 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $padEnd = __w_pdfjs_require__(175).end;
var WEBKIT_BUG = __w_pdfjs_require__(177);
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
/* 180 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(181);
var path = __w_pdfjs_require__(40);
module.exports = path.Object.values;

/***/ }),
/* 181 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var $values = __w_pdfjs_require__(182).values;
$({
 target: 'Object',
 stat: true
}, {
 values: function values(O) {
  return $values(O);
 }
});

/***/ }),
/* 182 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var objectKeys = __w_pdfjs_require__(68);
var toIndexedObject = __w_pdfjs_require__(14);
var propertyIsEnumerable = __w_pdfjs_require__(12).f;
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
/* 183 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


{
  let isReadableStreamSupported = false;

  if (typeof ReadableStream !== 'undefined') {
    try {
      new ReadableStream({
        start(controller) {
          controller.close();
        }

      });
      isReadableStreamSupported = true;
    } catch (e) {}
  }

  if (isReadableStreamSupported) {
    exports.ReadableStream = ReadableStream;
  } else {
    exports.ReadableStream = __w_pdfjs_require__(184).ReadableStream;
  }
}

/***/ }),
/* 184 */
/***/ (function(__webpack_module__, __webpack_exports__, __w_pdfjs_require__) {

"use strict";
__w_pdfjs_require__.r(__webpack_exports__);
/* harmony export (binding) */ __w_pdfjs_require__.d(__webpack_exports__, "ByteLengthQueuingStrategy", function() { return ByteLengthQueuingStrategy; });
/* harmony export (binding) */ __w_pdfjs_require__.d(__webpack_exports__, "CountQueuingStrategy", function() { return CountQueuingStrategy; });
/* harmony export (binding) */ __w_pdfjs_require__.d(__webpack_exports__, "ReadableStream", function() { return ReadableStream; });
/* harmony export (binding) */ __w_pdfjs_require__.d(__webpack_exports__, "TransformStream", function() { return TransformStream; });
/* harmony export (binding) */ __w_pdfjs_require__.d(__webpack_exports__, "WritableStream", function() { return WritableStream; });
var SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol : function (description) {
 return "Symbol(" + description + ")";
};
function noop() {
}
var NumberIsNaN = Number.isNaN || function (x) {
 return x !== x;
};
var rethrowAssertionErrorRejection = noop;
function typeIsObject(x) {
 return typeof x === 'object' && x !== null || typeof x === 'function';
}
function createArrayFromList(elements) {
 return elements.slice();
}
function ArrayBufferCopy(dest, destOffset, src, srcOffset, n) {
 new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
}
function IsFiniteNonNegativeNumber(v) {
 if (IsNonNegativeNumber(v) === false) {
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
function Call(F, V, args) {
 if (typeof F !== 'function') {
  throw new TypeError('Argument is not a function');
 }
 return Function.prototype.apply.call(F, V, args);
}
function CreateAlgorithmFromUnderlyingMethod(underlyingObject, methodName, algoArgCount, extraArgs) {
 var method = underlyingObject[methodName];
 if (method !== undefined) {
  if (typeof method !== 'function') {
   throw new TypeError(method + " is not a method");
  }
  switch (algoArgCount) {
  case 0: {
    return function () {
     return PromiseCall(method, underlyingObject, extraArgs);
    };
   }
  case 1: {
    return function (arg) {
     var fullArgs = [arg].concat(extraArgs);
     return PromiseCall(method, underlyingObject, fullArgs);
    };
   }
  }
 }
 return function () {
  return promiseResolvedWith(undefined);
 };
}
function InvokeOrNoop(O, P, args) {
 var method = O[P];
 if (method === undefined) {
  return undefined;
 }
 return Call(method, O, args);
}
function PromiseCall(F, V, args) {
 try {
  return promiseResolvedWith(Call(F, V, args));
 } catch (value) {
  return promiseRejectedWith(value);
 }
}
function TransferArrayBuffer(O) {
 return O;
}
function IsDetachedBuffer(O) {
 return false;
}
function ValidateAndNormalizeHighWaterMark(highWaterMark) {
 highWaterMark = Number(highWaterMark);
 if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
  throw new RangeError('highWaterMark property of a queuing strategy must be non-negative and non-NaN');
 }
 return highWaterMark;
}
function MakeSizeAlgorithmFromSizeFunction(size) {
 if (size === undefined) {
  return function () {
   return 1;
  };
 }
 if (typeof size !== 'function') {
  throw new TypeError('size property of a queuing strategy must be a function');
 }
 return function (chunk) {
  return size(chunk);
 };
}
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
  enumerable: true,
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
function ReadableStreamCreateReadResult(value, done, forAuthorCode) {
 var prototype = null;
 if (forAuthorCode === true) {
  prototype = Object.prototype;
 }
 var obj = Object.create(prototype);
 obj.value = value;
 obj.done = done;
 return obj;
}
function ReadableStreamReaderGenericInitialize(reader, stream) {
 reader._forAuthorCode = true;
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
  defaultReaderClosedPromiseReject(reader, new TypeError('Reader was released and can no longer be used to monitor the stream\'s closedness'));
 } else {
  defaultReaderClosedPromiseResetToRejected(reader, new TypeError('Reader was released and can no longer be used to monitor the stream\'s closedness'));
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
 setPromiseIsHandledToTrue(reader._closedPromise);
 reader._closedPromise_reject(reason);
 reader._closedPromise_resolve = undefined;
 reader._closedPromise_reject = undefined;
}
function defaultReaderClosedPromiseResetToRejected(reader, reason) {
 defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
}
function defaultReaderClosedPromiseResolve(reader) {
 reader._closedPromise_resolve(undefined);
 reader._closedPromise_resolve = undefined;
 reader._closedPromise_reject = undefined;
}
var CancelSteps = SymbolPolyfill('[[CancelSteps]]');
var PullSteps = SymbolPolyfill('[[PullSteps]]');
function AcquireReadableStreamDefaultReader(stream, forAuthorCode) {
 if (forAuthorCode === void 0) {
  forAuthorCode = false;
 }
 var reader = new ReadableStreamDefaultReader(stream);
 reader._forAuthorCode = forAuthorCode;
 return reader;
}
function ReadableStreamAddReadRequest(stream) {
 var promise = newPromise(function (resolve, reject) {
  var readRequest = {
   _resolve: resolve,
   _reject: reject
  };
  stream._reader._readRequests.push(readRequest);
 });
 return promise;
}
function ReadableStreamFulfillReadRequest(stream, chunk, done) {
 var reader = stream._reader;
 var readRequest = reader._readRequests.shift();
 readRequest._resolve(ReadableStreamCreateReadResult(chunk, done, reader._forAuthorCode));
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
  if (IsReadableStream(stream) === false) {
   throw new TypeError('ReadableStreamDefaultReader can only be constructed with a ReadableStream instance');
  }
  if (IsReadableStreamLocked(stream) === true) {
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
  enumerable: true,
  configurable: true
 });
 ReadableStreamDefaultReader.prototype.cancel = function (reason) {
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
  return ReadableStreamDefaultReaderRead(this);
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
function IsReadableStreamDefaultReader(x) {
 if (!typeIsObject(x)) {
  return false;
 }
 if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
  return false;
 }
 return true;
}
function ReadableStreamDefaultReaderRead(reader) {
 var stream = reader._ownerReadableStream;
 stream._disturbed = true;
 if (stream._state === 'closed') {
  return promiseResolvedWith(ReadableStreamCreateReadResult(undefined, true, reader._forAuthorCode));
 }
 if (stream._state === 'errored') {
  return promiseRejectedWith(stream._storedError);
 }
 return stream._readableStreamController[PullSteps]();
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
var ReadableStreamAsyncIteratorPrototype = {
 next: function () {
  if (IsReadableStreamAsyncIterator(this) === false) {
   return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
  }
  var reader = this._asyncIteratorReader;
  if (reader._ownerReadableStream === undefined) {
   return promiseRejectedWith(readerLockException('iterate'));
  }
  return transformPromiseWith(ReadableStreamDefaultReaderRead(reader), function (result) {
   var done = result.done;
   if (done) {
    ReadableStreamReaderGenericRelease(reader);
   }
   var value = result.value;
   return ReadableStreamCreateReadResult(value, done, true);
  });
 },
 return: function (value) {
  if (IsReadableStreamAsyncIterator(this) === false) {
   return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
  }
  var reader = this._asyncIteratorReader;
  if (reader._ownerReadableStream === undefined) {
   return promiseRejectedWith(readerLockException('finish iterating'));
  }
  if (reader._readRequests.length > 0) {
   return promiseRejectedWith(new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled'));
  }
  if (this._preventCancel === false) {
   var result = ReadableStreamReaderGenericCancel(reader, value);
   ReadableStreamReaderGenericRelease(reader);
   return transformPromiseWith(result, function () {
    return ReadableStreamCreateReadResult(value, true, true);
   });
  }
  ReadableStreamReaderGenericRelease(reader);
  return promiseResolvedWith(ReadableStreamCreateReadResult(value, true, true));
 }
};
if (AsyncIteratorPrototype !== undefined) {
 Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
}
Object.defineProperty(ReadableStreamAsyncIteratorPrototype, 'next', { enumerable: false });
Object.defineProperty(ReadableStreamAsyncIteratorPrototype, 'return', { enumerable: false });
function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
 if (preventCancel === void 0) {
  preventCancel = false;
 }
 var reader = AcquireReadableStreamDefaultReader(stream);
 var iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
 iterator._asyncIteratorReader = reader;
 iterator._preventCancel = Boolean(preventCancel);
 return iterator;
}
function IsReadableStreamAsyncIterator(x) {
 if (!typeIsObject(x)) {
  return false;
 }
 if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorReader')) {
  return false;
 }
 return true;
}
function streamAsyncIteratorBrandCheckException(name) {
 return new TypeError("ReadableStreamAsyncIterator." + name + " can only be used on a ReadableSteamAsyncIterator");
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
var AbortSteps = SymbolPolyfill('[[AbortSteps]]');
var ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
var WritableStream = function () {
 function WritableStream(underlyingSink, strategy) {
  if (underlyingSink === void 0) {
   underlyingSink = {};
  }
  if (strategy === void 0) {
   strategy = {};
  }
  InitializeWritableStream(this);
  var size = strategy.size;
  var highWaterMark = strategy.highWaterMark;
  var type = underlyingSink.type;
  if (type !== undefined) {
   throw new RangeError('Invalid type is specified');
  }
  var sizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(size);
  if (highWaterMark === undefined) {
   highWaterMark = 1;
  }
  highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);
  SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
 }
 Object.defineProperty(WritableStream.prototype, "locked", {
  get: function () {
   if (IsWritableStream(this) === false) {
    throw streamBrandCheckException('locked');
   }
   return IsWritableStreamLocked(this);
  },
  enumerable: true,
  configurable: true
 });
 WritableStream.prototype.abort = function (reason) {
  if (IsWritableStream(this) === false) {
   return promiseRejectedWith(streamBrandCheckException('abort'));
  }
  if (IsWritableStreamLocked(this) === true) {
   return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
  }
  return WritableStreamAbort(this, reason);
 };
 WritableStream.prototype.getWriter = function () {
  if (IsWritableStream(this) === false) {
   throw streamBrandCheckException('getWriter');
  }
  return AcquireWritableStreamDefaultWriter(this);
 };
 return WritableStream;
}();
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
 if (wasAlreadyErroring === false) {
  WritableStreamStartErroring(stream, reason);
 }
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
 if (WritableStreamHasOperationMarkedInFlight(stream) === false && controller._started === true) {
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
 if (abortRequest._wasAlreadyErroring === true) {
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
  if (backpressure === true) {
   defaultWriterReadyPromiseReset(writer);
  } else {
   defaultWriterReadyPromiseResolve(writer);
  }
 }
 stream._backpressure = backpressure;
}
var WritableStreamDefaultWriter = function () {
 function WritableStreamDefaultWriter(stream) {
  if (IsWritableStream(stream) === false) {
   throw new TypeError('WritableStreamDefaultWriter can only be constructed with a WritableStream instance');
  }
  if (IsWritableStreamLocked(stream) === true) {
   throw new TypeError('This stream has already been locked for exclusive writing by another writer');
  }
  this._ownerWritableStream = stream;
  stream._writer = this;
  var state = stream._state;
  if (state === 'writable') {
   if (WritableStreamCloseQueuedOrInFlight(stream) === false && stream._backpressure === true) {
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
   if (IsWritableStreamDefaultWriter(this) === false) {
    return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
   }
   return this._closedPromise;
  },
  enumerable: true,
  configurable: true
 });
 Object.defineProperty(WritableStreamDefaultWriter.prototype, "desiredSize", {
  get: function () {
   if (IsWritableStreamDefaultWriter(this) === false) {
    throw defaultWriterBrandCheckException('desiredSize');
   }
   if (this._ownerWritableStream === undefined) {
    throw defaultWriterLockException('desiredSize');
   }
   return WritableStreamDefaultWriterGetDesiredSize(this);
  },
  enumerable: true,
  configurable: true
 });
 Object.defineProperty(WritableStreamDefaultWriter.prototype, "ready", {
  get: function () {
   if (IsWritableStreamDefaultWriter(this) === false) {
    return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
   }
   return this._readyPromise;
  },
  enumerable: true,
  configurable: true
 });
 WritableStreamDefaultWriter.prototype.abort = function (reason) {
  if (IsWritableStreamDefaultWriter(this) === false) {
   return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
  }
  if (this._ownerWritableStream === undefined) {
   return promiseRejectedWith(defaultWriterLockException('abort'));
  }
  return WritableStreamDefaultWriterAbort(this, reason);
 };
 WritableStreamDefaultWriter.prototype.close = function () {
  if (IsWritableStreamDefaultWriter(this) === false) {
   return promiseRejectedWith(defaultWriterBrandCheckException('close'));
  }
  var stream = this._ownerWritableStream;
  if (stream === undefined) {
   return promiseRejectedWith(defaultWriterLockException('close'));
  }
  if (WritableStreamCloseQueuedOrInFlight(stream) === true) {
   return promiseRejectedWith(new TypeError('cannot close an already-closing stream'));
  }
  return WritableStreamDefaultWriterClose(this);
 };
 WritableStreamDefaultWriter.prototype.releaseLock = function () {
  if (IsWritableStreamDefaultWriter(this) === false) {
   throw defaultWriterBrandCheckException('releaseLock');
  }
  var stream = this._ownerWritableStream;
  if (stream === undefined) {
   return;
  }
  WritableStreamDefaultWriterRelease(this);
 };
 WritableStreamDefaultWriter.prototype.write = function (chunk) {
  if (IsWritableStreamDefaultWriter(this) === false) {
   return promiseRejectedWith(defaultWriterBrandCheckException('write'));
  }
  if (this._ownerWritableStream === undefined) {
   return promiseRejectedWith(defaultWriterLockException('write to'));
  }
  return WritableStreamDefaultWriterWrite(this, chunk);
 };
 return WritableStreamDefaultWriter;
}();
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
 if (stream._backpressure === true && state === 'writable') {
  defaultWriterReadyPromiseResolve(writer);
 }
 WritableStreamDefaultControllerClose(stream._writableStreamController);
 return promise;
}
function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
 var stream = writer._ownerWritableStream;
 var state = stream._state;
 if (WritableStreamCloseQueuedOrInFlight(stream) === true || state === 'closed') {
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
 var releasedError = new TypeError('Writer was released and can no longer be used to monitor the stream\'s closedness');
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
 if (WritableStreamCloseQueuedOrInFlight(stream) === true || state === 'closed') {
  return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
 }
 if (state === 'erroring') {
  return promiseRejectedWith(stream._storedError);
 }
 var promise = WritableStreamAddWriteRequest(stream);
 WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
 return promise;
}
var WritableStreamDefaultController = function () {
 function WritableStreamDefaultController() {
  throw new TypeError('WritableStreamDefaultController cannot be constructed explicitly');
 }
 WritableStreamDefaultController.prototype.error = function (e) {
  if (IsWritableStreamDefaultController(this) === false) {
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
 function startAlgorithm() {
  return InvokeOrNoop(underlyingSink, 'start', [controller]);
 }
 var writeAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'write', 1, [controller]);
 var closeAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'close', 0, []);
 var abortAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'abort', 1, []);
 SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
}
function WritableStreamDefaultControllerClearAlgorithms(controller) {
 controller._writeAlgorithm = undefined;
 controller._closeAlgorithm = undefined;
 controller._abortAlgorithm = undefined;
 controller._strategySizeAlgorithm = undefined;
}
function WritableStreamDefaultControllerClose(controller) {
 EnqueueValueWithSize(controller, 'close', 0);
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
 var writeRecord = { chunk: chunk };
 try {
  EnqueueValueWithSize(controller, writeRecord, chunkSize);
 } catch (enqueueE) {
  WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
  return;
 }
 var stream = controller._controlledWritableStream;
 if (WritableStreamCloseQueuedOrInFlight(stream) === false && stream._state === 'writable') {
  var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
  WritableStreamUpdateBackpressure(stream, backpressure);
 }
 WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}
function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
 var stream = controller._controlledWritableStream;
 if (controller._started === false) {
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
 var writeRecord = PeekQueueValue(controller);
 if (writeRecord === 'close') {
  WritableStreamDefaultControllerProcessClose(controller);
 } else {
  WritableStreamDefaultControllerProcessWrite(controller, writeRecord.chunk);
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
  if (WritableStreamCloseQueuedOrInFlight(stream) === false && state === 'writable') {
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
 var shuttingDown = false;
 var currentWrite = promiseResolvedWith(undefined);
 return newPromise(function (resolve, reject) {
  var abortAlgorithm;
  if (signal !== undefined) {
   abortAlgorithm = function () {
    var error = new DOMException$1('Aborted', 'AbortError');
    var actions = [];
    if (preventAbort === false) {
     actions.push(function () {
      if (dest._state === 'writable') {
       return WritableStreamAbort(dest, error);
      }
      return promiseResolvedWith(undefined);
     });
    }
    if (preventCancel === false) {
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
   if (signal.aborted === true) {
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
   if (shuttingDown === true) {
    return promiseResolvedWith(true);
   }
   return PerformPromiseThen(writer._readyPromise, function () {
    return PerformPromiseThen(ReadableStreamDefaultReaderRead(reader), function (_a) {
     var value = _a.value, done = _a.done;
     if (done === true) {
      return true;
     }
     currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, value), undefined, noop);
     return false;
    });
   });
  }
  isOrBecomesErrored(source, reader._closedPromise, function (storedError) {
   if (preventAbort === false) {
    shutdownWithAction(function () {
     return WritableStreamAbort(dest, storedError);
    }, true, storedError);
   } else {
    shutdown(true, storedError);
   }
  });
  isOrBecomesErrored(dest, writer._closedPromise, function (storedError) {
   if (preventCancel === false) {
    shutdownWithAction(function () {
     return ReadableStreamCancel(source, storedError);
    }, true, storedError);
   } else {
    shutdown(true, storedError);
   }
  });
  isOrBecomesClosed(source, reader._closedPromise, function () {
   if (preventClose === false) {
    shutdownWithAction(function () {
     return WritableStreamDefaultWriterCloseWithErrorPropagation(writer);
    });
   } else {
    shutdown();
   }
  });
  if (WritableStreamCloseQueuedOrInFlight(dest) === true || dest._state === 'closed') {
   var destClosed_1 = new TypeError('the destination writable stream closed before all data could be piped to it');
   if (preventCancel === false) {
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
   if (shuttingDown === true) {
    return;
   }
   shuttingDown = true;
   if (dest._state === 'writable' && WritableStreamCloseQueuedOrInFlight(dest) === false) {
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
   if (shuttingDown === true) {
    return;
   }
   shuttingDown = true;
   if (dest._state === 'writable' && WritableStreamCloseQueuedOrInFlight(dest) === false) {
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
  throw new TypeError();
 }
 Object.defineProperty(ReadableStreamDefaultController.prototype, "desiredSize", {
  get: function () {
   if (IsReadableStreamDefaultController(this) === false) {
    throw defaultControllerBrandCheckException('desiredSize');
   }
   return ReadableStreamDefaultControllerGetDesiredSize(this);
  },
  enumerable: true,
  configurable: true
 });
 ReadableStreamDefaultController.prototype.close = function () {
  if (IsReadableStreamDefaultController(this) === false) {
   throw defaultControllerBrandCheckException('close');
  }
  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(this) === false) {
   throw new TypeError('The stream is not in a state that permits close');
  }
  ReadableStreamDefaultControllerClose(this);
 };
 ReadableStreamDefaultController.prototype.enqueue = function (chunk) {
  if (IsReadableStreamDefaultController(this) === false) {
   throw defaultControllerBrandCheckException('enqueue');
  }
  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(this) === false) {
   throw new TypeError('The stream is not in a state that permits enqueue');
  }
  return ReadableStreamDefaultControllerEnqueue(this, chunk);
 };
 ReadableStreamDefaultController.prototype.error = function (e) {
  if (IsReadableStreamDefaultController(this) === false) {
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
 ReadableStreamDefaultController.prototype[PullSteps] = function () {
  var stream = this._controlledReadableStream;
  if (this._queue.length > 0) {
   var chunk = DequeueValue(this);
   if (this._closeRequested === true && this._queue.length === 0) {
    ReadableStreamDefaultControllerClearAlgorithms(this);
    ReadableStreamClose(stream);
   } else {
    ReadableStreamDefaultControllerCallPullIfNeeded(this);
   }
   return promiseResolvedWith(ReadableStreamCreateReadResult(chunk, false, stream._reader._forAuthorCode));
  }
  var pendingPromise = ReadableStreamAddReadRequest(stream);
  ReadableStreamDefaultControllerCallPullIfNeeded(this);
  return pendingPromise;
 };
 return ReadableStreamDefaultController;
}();
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
 if (shouldPull === false) {
  return;
 }
 if (controller._pulling === true) {
  controller._pullAgain = true;
  return;
 }
 controller._pulling = true;
 var pullPromise = controller._pullAlgorithm();
 uponPromise(pullPromise, function () {
  controller._pulling = false;
  if (controller._pullAgain === true) {
   controller._pullAgain = false;
   ReadableStreamDefaultControllerCallPullIfNeeded(controller);
  }
 }, function (e) {
  ReadableStreamDefaultControllerError(controller, e);
 });
}
function ReadableStreamDefaultControllerShouldCallPull(controller) {
 var stream = controller._controlledReadableStream;
 if (ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) === false) {
  return false;
 }
 if (controller._started === false) {
  return false;
 }
 if (IsReadableStreamLocked(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
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
 var stream = controller._controlledReadableStream;
 controller._closeRequested = true;
 if (controller._queue.length === 0) {
  ReadableStreamDefaultControllerClearAlgorithms(controller);
  ReadableStreamClose(stream);
 }
}
function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
 var stream = controller._controlledReadableStream;
 if (IsReadableStreamLocked(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
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
 var stream = controller._controlledReadableStream;
 var state = stream._state;
 if (state === 'errored') {
  return null;
 }
 if (state === 'closed') {
  return 0;
 }
 return controller._strategyHWM - controller._queueTotalSize;
}
function ReadableStreamDefaultControllerHasBackpressure(controller) {
 if (ReadableStreamDefaultControllerShouldCallPull(controller) === true) {
  return false;
 }
 return true;
}
function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
 var state = controller._controlledReadableStream._state;
 if (controller._closeRequested === false && state === 'readable') {
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
 function startAlgorithm() {
  return InvokeOrNoop(underlyingSource, 'start', [controller]);
 }
 var pullAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSource, 'pull', 0, [controller]);
 var cancelAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSource, 'cancel', 1, []);
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
  if (reading === true) {
   return promiseResolvedWith(undefined);
  }
  reading = true;
  var readPromise = transformPromiseWith(ReadableStreamDefaultReaderRead(reader), function (result) {
   reading = false;
   var done = result.done;
   if (done === true) {
    if (canceled1 === false) {
     ReadableStreamDefaultControllerClose(branch1._readableStreamController);
    }
    if (canceled2 === false) {
     ReadableStreamDefaultControllerClose(branch2._readableStreamController);
    }
    return;
   }
   var value = result.value;
   var value1 = value;
   var value2 = value;
   if (canceled1 === false) {
    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, value1);
   }
   if (canceled2 === false) {
    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, value2);
   }
  });
  setPromiseIsHandledToTrue(readPromise);
  return promiseResolvedWith(undefined);
 }
 function cancel1Algorithm(reason) {
  canceled1 = true;
  reason1 = reason;
  if (canceled2 === true) {
   var compositeReason = createArrayFromList([
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
  if (canceled1 === true) {
   var compositeReason = createArrayFromList([
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
 });
 return [
  branch1,
  branch2
 ];
}
var NumberIsInteger = Number.isInteger || function (value) {
 return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};
var ReadableStreamBYOBRequest = function () {
 function ReadableStreamBYOBRequest() {
  throw new TypeError('ReadableStreamBYOBRequest cannot be used directly');
 }
 Object.defineProperty(ReadableStreamBYOBRequest.prototype, "view", {
  get: function () {
   if (IsReadableStreamBYOBRequest(this) === false) {
    throw byobRequestBrandCheckException('view');
   }
   return this._view;
  },
  enumerable: true,
  configurable: true
 });
 ReadableStreamBYOBRequest.prototype.respond = function (bytesWritten) {
  if (IsReadableStreamBYOBRequest(this) === false) {
   throw byobRequestBrandCheckException('respond');
  }
  if (this._associatedReadableByteStreamController === undefined) {
   throw new TypeError('This BYOB request has been invalidated');
  }
  if (IsDetachedBuffer(this._view.buffer) === true);
  ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
 };
 ReadableStreamBYOBRequest.prototype.respondWithNewView = function (view) {
  if (IsReadableStreamBYOBRequest(this) === false) {
   throw byobRequestBrandCheckException('respond');
  }
  if (this._associatedReadableByteStreamController === undefined) {
   throw new TypeError('This BYOB request has been invalidated');
  }
  if (!ArrayBuffer.isView(view)) {
   throw new TypeError('You can only respond with array buffer views');
  }
  if (IsDetachedBuffer(view.buffer) === true);
  ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
 };
 return ReadableStreamBYOBRequest;
}();
var ReadableByteStreamController = function () {
 function ReadableByteStreamController() {
  throw new TypeError('ReadableByteStreamController constructor cannot be used directly');
 }
 Object.defineProperty(ReadableByteStreamController.prototype, "byobRequest", {
  get: function () {
   if (IsReadableByteStreamController(this) === false) {
    throw byteStreamControllerBrandCheckException('byobRequest');
   }
   if (this._byobRequest === undefined && this._pendingPullIntos.length > 0) {
    var firstDescriptor = this._pendingPullIntos.peek();
    var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
    var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
    SetUpReadableStreamBYOBRequest(byobRequest, this, view);
    this._byobRequest = byobRequest;
   }
   return this._byobRequest;
  },
  enumerable: true,
  configurable: true
 });
 Object.defineProperty(ReadableByteStreamController.prototype, "desiredSize", {
  get: function () {
   if (IsReadableByteStreamController(this) === false) {
    throw byteStreamControllerBrandCheckException('desiredSize');
   }
   return ReadableByteStreamControllerGetDesiredSize(this);
  },
  enumerable: true,
  configurable: true
 });
 ReadableByteStreamController.prototype.close = function () {
  if (IsReadableByteStreamController(this) === false) {
   throw byteStreamControllerBrandCheckException('close');
  }
  if (this._closeRequested === true) {
   throw new TypeError('The stream has already been closed; do not close it again!');
  }
  var state = this._controlledReadableByteStream._state;
  if (state !== 'readable') {
   throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be closed");
  }
  ReadableByteStreamControllerClose(this);
 };
 ReadableByteStreamController.prototype.enqueue = function (chunk) {
  if (IsReadableByteStreamController(this) === false) {
   throw byteStreamControllerBrandCheckException('enqueue');
  }
  if (this._closeRequested === true) {
   throw new TypeError('stream is closed or draining');
  }
  var state = this._controlledReadableByteStream._state;
  if (state !== 'readable') {
   throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be enqueued to");
  }
  if (!ArrayBuffer.isView(chunk)) {
   throw new TypeError('You can only enqueue array buffer views when using a ReadableByteStreamController');
  }
  if (IsDetachedBuffer(chunk.buffer) === true);
  ReadableByteStreamControllerEnqueue(this, chunk);
 };
 ReadableByteStreamController.prototype.error = function (e) {
  if (IsReadableByteStreamController(this) === false) {
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
 ReadableByteStreamController.prototype[PullSteps] = function () {
  var stream = this._controlledReadableByteStream;
  if (this._queueTotalSize > 0) {
   var entry = this._queue.shift();
   this._queueTotalSize -= entry.byteLength;
   ReadableByteStreamControllerHandleQueueDrain(this);
   var view = void 0;
   try {
    view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
   } catch (viewE) {
    return promiseRejectedWith(viewE);
   }
   return promiseResolvedWith(ReadableStreamCreateReadResult(view, false, stream._reader._forAuthorCode));
  }
  var autoAllocateChunkSize = this._autoAllocateChunkSize;
  if (autoAllocateChunkSize !== undefined) {
   var buffer = void 0;
   try {
    buffer = new ArrayBuffer(autoAllocateChunkSize);
   } catch (bufferE) {
    return promiseRejectedWith(bufferE);
   }
   var pullIntoDescriptor = {
    buffer: buffer,
    byteOffset: 0,
    byteLength: autoAllocateChunkSize,
    bytesFilled: 0,
    elementSize: 1,
    ctor: Uint8Array,
    readerType: 'default'
   };
   this._pendingPullIntos.push(pullIntoDescriptor);
  }
  var promise = ReadableStreamAddReadRequest(stream);
  ReadableByteStreamControllerCallPullIfNeeded(this);
  return promise;
 };
 return ReadableByteStreamController;
}();
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
 if (shouldPull === false) {
  return;
 }
 if (controller._pulling === true) {
  controller._pullAgain = true;
  return;
 }
 controller._pulling = true;
 var pullPromise = controller._pullAlgorithm();
 uponPromise(pullPromise, function () {
  controller._pulling = false;
  if (controller._pullAgain === true) {
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
 return new pullIntoDescriptor.ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
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
  ArrayBufferCopy(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
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
 if (controller._queueTotalSize === 0 && controller._closeRequested === true) {
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamClose(controller._controlledReadableByteStream);
 } else {
  ReadableByteStreamControllerCallPullIfNeeded(controller);
 }
}
function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
 if (controller._byobRequest === undefined) {
  return;
 }
 controller._byobRequest._associatedReadableByteStreamController = undefined;
 controller._byobRequest._view = undefined;
 controller._byobRequest = undefined;
}
function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
 while (controller._pendingPullIntos.length > 0) {
  if (controller._queueTotalSize === 0) {
   return;
  }
  var pullIntoDescriptor = controller._pendingPullIntos.peek();
  if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) === true) {
   ReadableByteStreamControllerShiftPendingPullInto(controller);
   ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
  }
 }
}
function ReadableByteStreamControllerPullInto(controller, view) {
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
  ctor: ctor,
  readerType: 'byob'
 };
 if (controller._pendingPullIntos.length > 0) {
  controller._pendingPullIntos.push(pullIntoDescriptor);
  return ReadableStreamAddReadIntoRequest(stream);
 }
 if (stream._state === 'closed') {
  var emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
  return promiseResolvedWith(ReadableStreamCreateReadResult(emptyView, true, stream._reader._forAuthorCode));
 }
 if (controller._queueTotalSize > 0) {
  if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) === true) {
   var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
   ReadableByteStreamControllerHandleQueueDrain(controller);
   return promiseResolvedWith(ReadableStreamCreateReadResult(filledView, false, stream._reader._forAuthorCode));
  }
  if (controller._closeRequested === true) {
   var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
   ReadableByteStreamControllerError(controller, e);
   return promiseRejectedWith(e);
  }
 }
 controller._pendingPullIntos.push(pullIntoDescriptor);
 var promise = ReadableStreamAddReadIntoRequest(stream);
 ReadableByteStreamControllerCallPullIfNeeded(controller);
 return promise;
}
function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
 firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
 var stream = controller._controlledReadableByteStream;
 if (ReadableStreamHasBYOBReader(stream) === true) {
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
 var stream = controller._controlledReadableByteStream;
 if (stream._state === 'closed') {
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
 if (controller._closeRequested === true) {
  return false;
 }
 if (controller._started === false) {
  return false;
 }
 if (ReadableStreamHasDefaultReader(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
  return true;
 }
 if (ReadableStreamHasBYOBReader(stream) === true && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
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
 var buffer = chunk.buffer;
 var byteOffset = chunk.byteOffset;
 var byteLength = chunk.byteLength;
 var transferredBuffer = TransferArrayBuffer(buffer);
 if (ReadableStreamHasDefaultReader(stream) === true) {
  if (ReadableStreamGetNumReadRequests(stream) === 0) {
   ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
  } else {
   var transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
   ReadableStreamFulfillReadRequest(stream, transferredView, false);
  }
 } else if (ReadableStreamHasBYOBReader(stream) === true) {
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
 var stream = controller._controlledReadableByteStream;
 var state = stream._state;
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
 if (IsFiniteNonNegativeNumber(bytesWritten) === false) {
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
 controller._byobRequest = undefined;
 controller._queue = controller._queueTotalSize = undefined;
 ResetQueue(controller);
 controller._closeRequested = false;
 controller._started = false;
 controller._strategyHWM = ValidateAndNormalizeHighWaterMark(highWaterMark);
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
 function startAlgorithm() {
  return InvokeOrNoop(underlyingByteSource, 'start', [controller]);
 }
 var pullAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingByteSource, 'pull', 0, [controller]);
 var cancelAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingByteSource, 'cancel', 1, []);
 var autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
 if (autoAllocateChunkSize !== undefined) {
  autoAllocateChunkSize = Number(autoAllocateChunkSize);
  if (NumberIsInteger(autoAllocateChunkSize) === false || autoAllocateChunkSize <= 0) {
   throw new RangeError('autoAllocateChunkSize must be a positive integer');
  }
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
function AcquireReadableStreamBYOBReader(stream, forAuthorCode) {
 if (forAuthorCode === void 0) {
  forAuthorCode = false;
 }
 var reader = new ReadableStreamBYOBReader(stream);
 reader._forAuthorCode = forAuthorCode;
 return reader;
}
function ReadableStreamAddReadIntoRequest(stream) {
 var promise = newPromise(function (resolve, reject) {
  var readIntoRequest = {
   _resolve: resolve,
   _reject: reject
  };
  stream._reader._readIntoRequests.push(readIntoRequest);
 });
 return promise;
}
function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
 var reader = stream._reader;
 var readIntoRequest = reader._readIntoRequests.shift();
 readIntoRequest._resolve(ReadableStreamCreateReadResult(chunk, done, reader._forAuthorCode));
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
  if (!IsReadableStream(stream)) {
   throw new TypeError('ReadableStreamBYOBReader can only be constructed with a ReadableStream instance given a ' + 'byte source');
  }
  if (IsReadableByteStreamController(stream._readableStreamController) === false) {
   throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' + 'source');
  }
  if (IsReadableStreamLocked(stream)) {
   throw new TypeError('This stream has already been locked for exclusive reading by another reader');
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
  enumerable: true,
  configurable: true
 });
 ReadableStreamBYOBReader.prototype.cancel = function (reason) {
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
  if (this._ownerReadableStream === undefined) {
   return promiseRejectedWith(readerLockException('read from'));
  }
  if (!ArrayBuffer.isView(view)) {
   return promiseRejectedWith(new TypeError('view must be an array buffer view'));
  }
  if (IsDetachedBuffer(view.buffer) === true);
  if (view.byteLength === 0) {
   return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
  }
  return ReadableStreamBYOBReaderRead(this, view);
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
function IsReadableStreamBYOBReader(x) {
 if (!typeIsObject(x)) {
  return false;
 }
 if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
  return false;
 }
 return true;
}
function ReadableStreamBYOBReaderRead(reader, view) {
 var stream = reader._ownerReadableStream;
 stream._disturbed = true;
 if (stream._state === 'errored') {
  return promiseRejectedWith(stream._storedError);
 }
 return ReadableByteStreamControllerPullInto(stream._readableStreamController, view);
}
function byobReaderBrandCheckException(name) {
 return new TypeError("ReadableStreamBYOBReader.prototype." + name + " can only be used on a ReadableStreamBYOBReader");
}
var ReadableStream = function () {
 function ReadableStream(underlyingSource, strategy) {
  if (underlyingSource === void 0) {
   underlyingSource = {};
  }
  if (strategy === void 0) {
   strategy = {};
  }
  InitializeReadableStream(this);
  var size = strategy.size;
  var highWaterMark = strategy.highWaterMark;
  var type = underlyingSource.type;
  var typeString = String(type);
  if (typeString === 'bytes') {
   if (size !== undefined) {
    throw new RangeError('The strategy for a byte stream cannot have a size function');
   }
   if (highWaterMark === undefined) {
    highWaterMark = 0;
   }
   highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);
   SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
  } else if (type === undefined) {
   var sizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(size);
   if (highWaterMark === undefined) {
    highWaterMark = 1;
   }
   highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);
   SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
  } else {
   throw new RangeError('Invalid type is specified');
  }
 }
 Object.defineProperty(ReadableStream.prototype, "locked", {
  get: function () {
   if (IsReadableStream(this) === false) {
    throw streamBrandCheckException$1('locked');
   }
   return IsReadableStreamLocked(this);
  },
  enumerable: true,
  configurable: true
 });
 ReadableStream.prototype.cancel = function (reason) {
  if (IsReadableStream(this) === false) {
   return promiseRejectedWith(streamBrandCheckException$1('cancel'));
  }
  if (IsReadableStreamLocked(this) === true) {
   return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
  }
  return ReadableStreamCancel(this, reason);
 };
 ReadableStream.prototype.getReader = function (_a) {
  var mode = (_a === void 0 ? {} : _a).mode;
  if (IsReadableStream(this) === false) {
   throw streamBrandCheckException$1('getReader');
  }
  if (mode === undefined) {
   return AcquireReadableStreamDefaultReader(this, true);
  }
  mode = String(mode);
  if (mode === 'byob') {
   return AcquireReadableStreamBYOBReader(this, true);
  }
  throw new RangeError('Invalid mode is specified');
 };
 ReadableStream.prototype.pipeThrough = function (_a, _b) {
  var writable = _a.writable, readable = _a.readable;
  var _c = _b === void 0 ? {} : _b, preventClose = _c.preventClose, preventAbort = _c.preventAbort, preventCancel = _c.preventCancel, signal = _c.signal;
  if (IsReadableStream(this) === false) {
   throw streamBrandCheckException$1('pipeThrough');
  }
  if (IsWritableStream(writable) === false) {
   throw new TypeError('writable argument to pipeThrough must be a WritableStream');
  }
  if (IsReadableStream(readable) === false) {
   throw new TypeError('readable argument to pipeThrough must be a ReadableStream');
  }
  preventClose = Boolean(preventClose);
  preventAbort = Boolean(preventAbort);
  preventCancel = Boolean(preventCancel);
  if (signal !== undefined && !isAbortSignal(signal)) {
   throw new TypeError('ReadableStream.prototype.pipeThrough\'s signal option must be an AbortSignal');
  }
  if (IsReadableStreamLocked(this) === true) {
   throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
  }
  if (IsWritableStreamLocked(writable) === true) {
   throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
  }
  var promise = ReadableStreamPipeTo(this, writable, preventClose, preventAbort, preventCancel, signal);
  setPromiseIsHandledToTrue(promise);
  return readable;
 };
 ReadableStream.prototype.pipeTo = function (dest, _a) {
  var _b = _a === void 0 ? {} : _a, preventClose = _b.preventClose, preventAbort = _b.preventAbort, preventCancel = _b.preventCancel, signal = _b.signal;
  if (IsReadableStream(this) === false) {
   return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
  }
  if (IsWritableStream(dest) === false) {
   return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo\'s first argument must be a WritableStream'));
  }
  preventClose = Boolean(preventClose);
  preventAbort = Boolean(preventAbort);
  preventCancel = Boolean(preventCancel);
  if (signal !== undefined && !isAbortSignal(signal)) {
   return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo\'s signal option must be an AbortSignal'));
  }
  if (IsReadableStreamLocked(this) === true) {
   return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
  }
  if (IsWritableStreamLocked(dest) === true) {
   return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
  }
  return ReadableStreamPipeTo(this, dest, preventClose, preventAbort, preventCancel, signal);
 };
 ReadableStream.prototype.tee = function () {
  if (IsReadableStream(this) === false) {
   throw streamBrandCheckException$1('tee');
  }
  var branches = ReadableStreamTee(this);
  return createArrayFromList(branches);
 };
 ReadableStream.prototype.getIterator = function (_a) {
  var _b = (_a === void 0 ? {} : _a).preventCancel, preventCancel = _b === void 0 ? false : _b;
  if (IsReadableStream(this) === false) {
   throw streamBrandCheckException$1('getIterator');
  }
  return AcquireReadableStreamAsyncIterator(this, preventCancel);
 };
 return ReadableStream;
}();
if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
 Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
  value: ReadableStream.prototype.getIterator,
  enumerable: false,
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
   readRequest._resolve(ReadableStreamCreateReadResult(undefined, true, reader._forAuthorCode));
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
   readRequest._reject(e);
  });
  reader._readRequests = new SimpleQueue();
 } else {
  reader._readIntoRequests.forEach(function (readIntoRequest) {
   readIntoRequest._reject(e);
  });
  reader._readIntoRequests = new SimpleQueue();
 }
 defaultReaderClosedPromiseReject(reader, e);
}
function streamBrandCheckException$1(name) {
 return new TypeError("ReadableStream.prototype." + name + " can only be used on a ReadableStream");
}
var ByteLengthQueuingStrategy = function () {
 function ByteLengthQueuingStrategy(_a) {
  var highWaterMark = _a.highWaterMark;
  this.highWaterMark = highWaterMark;
 }
 ByteLengthQueuingStrategy.prototype.size = function (chunk) {
  return chunk.byteLength;
 };
 return ByteLengthQueuingStrategy;
}();
var CountQueuingStrategy = function () {
 function CountQueuingStrategy(_a) {
  var highWaterMark = _a.highWaterMark;
  this.highWaterMark = highWaterMark;
 }
 CountQueuingStrategy.prototype.size = function () {
  return 1;
 };
 return CountQueuingStrategy;
}();
var TransformStream = function () {
 function TransformStream(transformer, writableStrategy, readableStrategy) {
  if (transformer === void 0) {
   transformer = {};
  }
  if (writableStrategy === void 0) {
   writableStrategy = {};
  }
  if (readableStrategy === void 0) {
   readableStrategy = {};
  }
  var writableSizeFunction = writableStrategy.size;
  var writableHighWaterMark = writableStrategy.highWaterMark;
  var readableSizeFunction = readableStrategy.size;
  var readableHighWaterMark = readableStrategy.highWaterMark;
  var writableType = transformer.writableType;
  if (writableType !== undefined) {
   throw new RangeError('Invalid writable type specified');
  }
  var writableSizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(writableSizeFunction);
  if (writableHighWaterMark === undefined) {
   writableHighWaterMark = 1;
  }
  writableHighWaterMark = ValidateAndNormalizeHighWaterMark(writableHighWaterMark);
  var readableType = transformer.readableType;
  if (readableType !== undefined) {
   throw new RangeError('Invalid readable type specified');
  }
  var readableSizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(readableSizeFunction);
  if (readableHighWaterMark === undefined) {
   readableHighWaterMark = 0;
  }
  readableHighWaterMark = ValidateAndNormalizeHighWaterMark(readableHighWaterMark);
  var startPromise_resolve;
  var startPromise = newPromise(function (resolve) {
   startPromise_resolve = resolve;
  });
  InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
  SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
  var startResult = InvokeOrNoop(transformer, 'start', [this._transformStreamController]);
  startPromise_resolve(startResult);
 }
 Object.defineProperty(TransformStream.prototype, "readable", {
  get: function () {
   if (IsTransformStream(this) === false) {
    throw streamBrandCheckException$2('readable');
   }
   return this._readable;
  },
  enumerable: true,
  configurable: true
 });
 Object.defineProperty(TransformStream.prototype, "writable", {
  get: function () {
   if (IsTransformStream(this) === false) {
    throw streamBrandCheckException$2('writable');
   }
   return this._writable;
  },
  enumerable: true,
  configurable: true
 });
 return TransformStream;
}();
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
 if (stream._backpressure === true) {
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
  throw new TypeError('TransformStreamDefaultController instances cannot be created directly');
 }
 Object.defineProperty(TransformStreamDefaultController.prototype, "desiredSize", {
  get: function () {
   if (IsTransformStreamDefaultController(this) === false) {
    throw defaultControllerBrandCheckException$1('desiredSize');
   }
   var readableController = this._controlledTransformStream._readable._readableStreamController;
   return ReadableStreamDefaultControllerGetDesiredSize(readableController);
  },
  enumerable: true,
  configurable: true
 });
 TransformStreamDefaultController.prototype.enqueue = function (chunk) {
  if (IsTransformStreamDefaultController(this) === false) {
   throw defaultControllerBrandCheckException$1('enqueue');
  }
  TransformStreamDefaultControllerEnqueue(this, chunk);
 };
 TransformStreamDefaultController.prototype.error = function (reason) {
  if (IsTransformStreamDefaultController(this) === false) {
   throw defaultControllerBrandCheckException$1('error');
  }
  TransformStreamDefaultControllerError(this, reason);
 };
 TransformStreamDefaultController.prototype.terminate = function () {
  if (IsTransformStreamDefaultController(this) === false) {
   throw defaultControllerBrandCheckException$1('terminate');
  }
  TransformStreamDefaultControllerTerminate(this);
 };
 return TransformStreamDefaultController;
}();
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
 var transformMethod = transformer.transform;
 if (transformMethod !== undefined) {
  if (typeof transformMethod !== 'function') {
   throw new TypeError('transform is not a method');
  }
  transformAlgorithm = function (chunk) {
   return PromiseCall(transformMethod, transformer, [
    chunk,
    controller
   ]);
  };
 }
 var flushAlgorithm = CreateAlgorithmFromUnderlyingMethod(transformer, 'flush', 0, [controller]);
 SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
}
function TransformStreamDefaultControllerClearAlgorithms(controller) {
 controller._transformAlgorithm = undefined;
 controller._flushAlgorithm = undefined;
}
function TransformStreamDefaultControllerEnqueue(controller, chunk) {
 var stream = controller._controlledTransformStream;
 var readableController = stream._readable._readableStreamController;
 if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === false) {
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
 if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === true) {
  ReadableStreamDefaultControllerClose(readableController);
 }
 var error = new TypeError('TransformStream terminated');
 TransformStreamErrorWritableAndUnblockWrite(stream, error);
}
function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
 var controller = stream._transformStreamController;
 if (stream._backpressure === true) {
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
  var readableController = readable._readableStreamController;
  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === true) {
   ReadableStreamDefaultControllerClose(readableController);
  }
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


/***/ }),
/* 185 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocument = getDocument;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.build = exports.version = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFWorker = exports.PDFDataRangeTransport = exports.LoopbackPort = void 0;

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(186);

var _font_loader = __w_pdfjs_require__(187);

var _api_compatibility = __w_pdfjs_require__(188);

var _canvas = __w_pdfjs_require__(189);

var _global_scope = _interopRequireDefault(__w_pdfjs_require__(3));

var _worker_options = __w_pdfjs_require__(191);

var _message_handler = __w_pdfjs_require__(192);

var _metadata = __w_pdfjs_require__(193);

var _transport_stream = __w_pdfjs_require__(195);

var _webgl = __w_pdfjs_require__(196);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_RANGE_CHUNK_SIZE = 65536;
const RENDERING_CANCELLED_TIMEOUT = 100;
let isWorkerDisabled = false;
let fallbackWorkerSrc;
let fakeWorkerFilesLoader = null;
{
  let useRequireEnsure = false;

  if (typeof window === 'undefined') {
    isWorkerDisabled = true;

    if (typeof require.ensure === 'undefined') {
      require.ensure = require('node-ensure');
    }

    useRequireEnsure = true;
  } else if (typeof require !== 'undefined' && typeof require.ensure === 'function') {
    useRequireEnsure = true;
  }

  if (typeof requirejs !== 'undefined' && requirejs.toUrl) {
    fallbackWorkerSrc = requirejs.toUrl('./assets/pdf.worker-es5.js');
  }

  const dynamicLoaderSupported = typeof requirejs !== 'undefined' && requirejs.load;
  fakeWorkerFilesLoader = useRequireEnsure ? function () {
    return new Promise(function (resolve, reject) {
      require.ensure([], function () {
        try {
          let worker;
          worker = require('./assets/pdf.worker-es5.js');
          resolve(worker.WorkerMessageHandler);
        } catch (ex) {
          reject(ex);
        }
      }, reject, 'pdfjsWorker');
    });
  } : dynamicLoaderSupported ? function () {
    return new Promise(function (resolve, reject) {
      requirejs(['./assets/pdf.worker-es5'], function (worker) {
        try {
          resolve(worker.WorkerMessageHandler);
        } catch (ex) {
          reject(ex);
        }
      }, reject);
    });
  } : null;

  if (!fallbackWorkerSrc && typeof document === 'object' && 'currentScript' in document) {
    const pdfjsFilePath = document.currentScript && document.currentScript.src;

    if (pdfjsFilePath) {
      fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, '.worker$1$2');
    }
  }
}
let createPDFNetworkStream;

function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}

function getDocument(src) {
  const task = new PDFDocumentLoadingTask();
  let source;

  if (typeof src === 'string') {
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
    if (typeof src !== 'object') {
      throw new Error('Invalid parameter in getDocument, ' + 'need either Uint8Array, string or a parameter object');
    }

    if (!src.url && !src.data && !src.range) {
      throw new Error('Invalid parameter object: need either .data, .range or .url');
    }

    source = src;
  }

  const params = Object.create(null);
  let rangeTransport = null,
      worker = null;

  for (const key in source) {
    if (key === 'url' && typeof window !== 'undefined') {
      params[key] = new URL(source[key], window.location).href;
      continue;
    } else if (key === 'range') {
      rangeTransport = source[key];
      continue;
    } else if (key === 'worker') {
      worker = source[key];
      continue;
    } else if (key === 'data' && !(source[key] instanceof Uint8Array)) {
      const pdfBytes = source[key];

      if (typeof pdfBytes === 'string') {
        params[key] = (0, _util.stringToBytes)(pdfBytes);
      } else if (typeof pdfBytes === 'object' && pdfBytes !== null && !isNaN(pdfBytes.length)) {
        params[key] = new Uint8Array(pdfBytes);
      } else if ((0, _util.isArrayBuffer)(pdfBytes)) {
        params[key] = new Uint8Array(pdfBytes);
      } else {
        throw new Error('Invalid PDF binary data: either typed array, ' + 'string or array-like object is expected in the ' + 'data property.');
      }

      continue;
    }

    params[key] = source[key];
  }

  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.CMapReaderFactory = params.CMapReaderFactory || _display_utils.DOMCMapReaderFactory;
  params.ignoreErrors = params.stopAtErrors !== true;
  params.pdfBug = params.pdfBug === true;
  const NativeImageDecoderValues = Object.values(_util.NativeImageDecoding);

  if (params.nativeImageDecoderSupport === undefined || !NativeImageDecoderValues.includes(params.nativeImageDecoderSupport)) {
    params.nativeImageDecoderSupport = _api_compatibility.apiCompatibilityParams.nativeImageDecoderSupport || _util.NativeImageDecoding.DECODE;
  }

  if (!Number.isInteger(params.maxImageSize)) {
    params.maxImageSize = -1;
  }

  if (typeof params.isEvalSupported !== 'boolean') {
    params.isEvalSupported = true;
  }

  if (typeof params.disableFontFace !== 'boolean') {
    params.disableFontFace = _api_compatibility.apiCompatibilityParams.disableFontFace || false;
  }

  if (typeof params.disableRange !== 'boolean') {
    params.disableRange = false;
  }

  if (typeof params.disableStream !== 'boolean') {
    params.disableStream = false;
  }

  if (typeof params.disableAutoFetch !== 'boolean') {
    params.disableAutoFetch = false;
  }

  if (typeof params.disableCreateObjectURL !== 'boolean') {
    params.disableCreateObjectURL = _api_compatibility.apiCompatibilityParams.disableCreateObjectURL || false;
  }

  (0, _util.setVerbosityLevel)(params.verbosity);

  if (!worker) {
    const workerParams = {
      verbosity: params.verbosity,
      port: _worker_options.GlobalWorkerOptions.workerPort
    };
    worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
    task._worker = worker;
  }

  const docId = task.docId;
  worker.promise.then(function () {
    if (task.destroyed) {
      throw new Error('Loading aborted');
    }

    return _fetchDocument(worker, params, rangeTransport, docId).then(function (workerId) {
      if (task.destroyed) {
        throw new Error('Loading aborted');
      }

      let networkStream;

      if (rangeTransport) {
        networkStream = new _transport_stream.PDFDataTransportStream({
          length: params.length,
          initialData: params.initialData,
          progressiveDone: params.progressiveDone,
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

      const messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      messageHandler.postMessageTransfers = worker.postMessageTransfers;
      const transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      // #171 receive options from ngx-extended-pdf-viewer
      messageHandler.send('showUnverifiedSignatures',
          window.ServiceWorkerOptions.showUnverifiedSignatures);
      // #171 end of receive options from ngx-extended-pdf-viewer
      messageHandler.send('Ready', null);
    });
  }).catch(task._capability.reject);
  return task;
}

function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
  if (worker.destroyed) {
    return Promise.reject(new Error('Worker was destroyed'));
  }

  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
    source.progressiveDone = pdfDataRangeTransport.progressiveDone;
  }

  return worker.messageHandler.sendWithPromise('GetDocRequest', {
    docId,
    apiVersion: '2.3.200',
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
    disableCreateObjectURL: source.disableCreateObjectURL,
    postMessageTransfers: worker.postMessageTransfers,
    docBaseUrl: source.docBaseUrl,
    nativeImageDecoderSupport: source.nativeImageDecoderSupport,
    ignoreErrors: source.ignoreErrors,
    isEvalSupported: source.isEvalSupported
  }).then(function (workerId) {
    if (worker.destroyed) {
      throw new Error('Worker was destroyed');
    }

    return workerId;
  });
}

const PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
  let nextDocumentId = 0;

  class PDFDocumentLoadingTask {
    constructor() {
      this._capability = (0, _util.createPromiseCapability)();
      this._transport = null;
      this._worker = null;
      this.docId = 'd' + nextDocumentId++;
      this.destroyed = false;
      this.onPassword = null;
      this.onProgress = null;
      this.onUnsupportedFeature = null;
    }

    get promise() {
      return this._capability.promise;
    }

    destroy() {
      this.destroyed = true;
      const transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
      return transportDestroyed.then(() => {
        this._transport = null;

        if (this._worker) {
          this._worker.destroy();

          this._worker = null;
        }
      });
    }

    then(onFulfilled, onRejected) {
      (0, _display_utils.deprecated)('PDFDocumentLoadingTask.then method, ' + 'use the `promise` getter instead.');
      return this.promise.then.apply(this.promise, arguments);
    }

  }

  return PDFDocumentLoadingTask;
}();

class PDFDataRangeTransport {
  constructor(length, initialData, progressiveDone = false) {
    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = (0, _util.createPromiseCapability)();
  }

  addRangeListener(listener) {
    this._rangeListeners.push(listener);
  }

  addProgressListener(listener) {
    this._progressListeners.push(listener);
  }

  addProgressiveReadListener(listener) {
    this._progressiveReadListeners.push(listener);
  }

  addProgressiveDoneListener(listener) {
    this._progressiveDoneListeners.push(listener);
  }

  onDataRange(begin, chunk) {
    for (const listener of this._rangeListeners) {
      listener(begin, chunk);
    }
  }

  onDataProgress(loaded, total) {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressListeners) {
        listener(loaded, total);
      }
    });
  }

  onDataProgressiveRead(chunk) {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressiveReadListeners) {
        listener(chunk);
      }
    });
  }

  onDataProgressiveDone() {
    this._readyCapability.promise.then(() => {
      for (const listener of this._progressiveDoneListeners) {
        listener();
      }
    });
  }

  transportReady() {
    this._readyCapability.resolve();
  }

  requestDataRange(begin, end) {
    (0, _util.unreachable)('Abstract method PDFDataRangeTransport.requestDataRange');
  }

  abort() {}

}

exports.PDFDataRangeTransport = PDFDataRangeTransport;

class PDFDocumentProxy {
  constructor(pdfInfo, transport) {
    this._pdfInfo = pdfInfo;
    this._transport = transport;
  }

  get numPages() {
    return this._pdfInfo.numPages;
  }

  get fingerprint() {
    return this._pdfInfo.fingerprint;
  }

  getPage(pageNumber) {
    return this._transport.getPage(pageNumber);
  }

  getPageIndex(ref) {
    return this._transport.getPageIndex(ref);
  }

  getDestinations() {
    return this._transport.getDestinations();
  }

  getDestination(id) {
    return this._transport.getDestination(id);
  }

  getPageLabels() {
    return this._transport.getPageLabels();
  }

  getPageLayout() {
    return this._transport.getPageLayout();
  }

  getPageMode() {
    return this._transport.getPageMode();
  }

  getViewerPreferences() {
    return this._transport.getViewerPreferences();
  }

  getOpenActionDestination() {
    return this._transport.getOpenActionDestination();
  }

  getAttachments() {
    return this._transport.getAttachments();
  }

  getJavaScript() {
    return this._transport.getJavaScript();
  }

  getOutline() {
    return this._transport.getOutline();
  }

  getPermissions() {
    return this._transport.getPermissions();
  }

  getMetadata() {
    return this._transport.getMetadata();
  }

  getData() {
    return this._transport.getData();
  }

  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }

  getStats() {
    return this._transport.getStats();
  }

  cleanup() {
    this._transport.startCleanup();
  }

  destroy() {
    return this.loadingTask.destroy();
  }

  get loadingParams() {
    return this._transport.loadingParams;
  }

  get loadingTask() {
    return this._transport.loadingTask;
  }

}

exports.PDFDocumentProxy = PDFDocumentProxy;

class PDFPageProxy {
  constructor(pageIndex, pageInfo, transport, pdfBug = false) {
    this.pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._transport = transport;
    this._stats = pdfBug ? new _display_utils.StatTimer() : _display_utils.DummyStatTimer;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this.cleanupAfterRender = false;
    this.pendingCleanup = false;
    this.intentStates = Object.create(null);
    this.destroyed = false;
  }

  get pageNumber() {
    return this.pageIndex + 1;
  }

  get rotate() {
    return this._pageInfo.rotate;
  }

  get ref() {
    return this._pageInfo.ref;
  }

  get userUnit() {
    return this._pageInfo.userUnit;
  }

  get view() {
    return this._pageInfo.view;
  }

  getViewport({
    scale,
    rotation = this.rotate,
    dontFlip = false
  } = {}) {
    if (arguments.length > 1 || typeof arguments[0] === 'number') {
      (0, _display_utils.deprecated)('getViewport is called with obsolete arguments.');
      scale = arguments[0];
      rotation = typeof arguments[1] === 'number' ? arguments[1] : this.rotate;
      dontFlip = typeof arguments[2] === 'boolean' ? arguments[2] : false;
    }

    return new _display_utils.PageViewport({
      viewBox: this.view,
      scale,
      rotation,
      dontFlip
    });
  }

  getAnnotations({
    intent = null
  } = {}) {
    if (!this.annotationsPromise || this.annotationsIntent !== intent) {
      this.annotationsPromise = this._transport.getAnnotations(this.pageIndex, intent);
      this.annotationsIntent = intent;
    }

    return this.annotationsPromise;
  }

  render({
    canvasContext,
    viewport,
    intent = 'display',
    enableWebGL = false,
    renderInteractiveForms = false,
    transform = null,
    imageLayer = null,
    canvasFactory = null,
    background = null
  }) {
    const stats = this._stats;
    stats.time('Overall');
    const renderingIntent = intent === 'print' ? 'print' : 'display';
    this.pendingCleanup = false;

    if (!this.intentStates[renderingIntent]) {
      this.intentStates[renderingIntent] = Object.create(null);
    }

    const intentState = this.intentStates[renderingIntent];

    if (intentState.streamReaderCancelTimeout) {
      clearTimeout(intentState.streamReaderCancelTimeout);
      intentState.streamReaderCancelTimeout = null;
    }

    const canvasFactoryInstance = canvasFactory || new _display_utils.DOMCanvasFactory();
    const webGLContext = new _webgl.WebGLContext({
      enable: enableWebGL
    });

    if (!intentState.displayReadyCapability) {
      intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false
      };
      stats.time('Page Request');

      this._pumpOperatorList({
        pageIndex: this.pageNumber - 1,
        intent: renderingIntent,
        renderInteractiveForms: renderInteractiveForms === true
      });
    }

    const complete = error => {
      const i = intentState.renderTasks.indexOf(internalRenderTask);

      if (i >= 0) {
        intentState.renderTasks.splice(i, 1);
      }

      if (this.cleanupAfterRender || renderingIntent === 'print') {
        this.pendingCleanup = true;
      }

      this._tryCleanup();

      if (error) {
        internalRenderTask.capability.reject(error);

        this._abortOperatorList({
          intentState,
          reason: error
        });
      } else {
        internalRenderTask.capability.resolve();
      }

      stats.timeEnd('Rendering');
      stats.timeEnd('Overall');
    };

    const internalRenderTask = new InternalRenderTask({
      callback: complete,
      params: {
        canvasContext,
        viewport,
        transform,
        imageLayer,
        background
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      operatorList: intentState.operatorList,
      pageNumber: this.pageNumber,
      canvasFactory: canvasFactoryInstance,
      webGLContext,
      useRequestAnimationFrame: renderingIntent !== 'print',
      pdfBug: this._pdfBug
    });

    if (!intentState.renderTasks) {
      intentState.renderTasks = [];
    }

    intentState.renderTasks.push(internalRenderTask);
    const renderTask = internalRenderTask.task;
    intentState.displayReadyCapability.promise.then(transparency => {
      if (this.pendingCleanup) {
        complete();
        return;
      }

      stats.time('Rendering');
      internalRenderTask.initializeGraphics(transparency);
      internalRenderTask.operatorListChanged();
    }).catch(complete);
    return renderTask;
  }

  getOperatorList() {
    function operatorListChanged() {
      if (intentState.operatorList.lastChunk) {
        intentState.opListReadCapability.resolve(intentState.operatorList);
        const i = intentState.renderTasks.indexOf(opListTask);

        if (i >= 0) {
          intentState.renderTasks.splice(i, 1);
        }
      }
    }

    const renderingIntent = 'oplist';

    if (!this.intentStates[renderingIntent]) {
      this.intentStates[renderingIntent] = Object.create(null);
    }

    const intentState = this.intentStates[renderingIntent];
    let opListTask;

    if (!intentState.opListReadCapability) {
      opListTask = {};
      opListTask.operatorListChanged = operatorListChanged;
      intentState.opListReadCapability = (0, _util.createPromiseCapability)();
      intentState.renderTasks = [];
      intentState.renderTasks.push(opListTask);
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false
      };

      this._stats.time('Page Request');

      this._pumpOperatorList({
        pageIndex: this.pageIndex,
        intent: renderingIntent
      });
    }

    return intentState.opListReadCapability.promise;
  }

  streamTextContent({
    normalizeWhitespace = false,
    disableCombineTextItems = false
  } = {}) {
    const TEXT_CONTENT_CHUNK_SIZE = 100;
    return this._transport.messageHandler.sendWithStream('GetTextContent', {
      pageIndex: this.pageNumber - 1,
      normalizeWhitespace: normalizeWhitespace === true,
      combineTextItems: disableCombineTextItems !== true
    }, {
      highWaterMark: TEXT_CONTENT_CHUNK_SIZE,

      size(textContent) {
        return textContent.items.length;
      }

    });
  }

  getTextContent(params = {}) {
    const readableStream = this.streamTextContent(params);
    return new Promise(function (resolve, reject) {
      function pump() {
        reader.read().then(function ({
          value,
          done
        }) {
          if (done) {
            resolve(textContent);
            return;
          }

          Object.assign(textContent.styles, value.styles);
          textContent.items.push(...value.items);
          pump();
        }, reject);
      }

      const reader = readableStream.getReader();
      const textContent = {
        items: [],
        styles: Object.create(null)
      };
      pump();
    });
  }

  _destroy() {
    this.destroyed = true;
    this._transport.pageCache[this.pageIndex] = null;
    const waitOn = [];
    Object.keys(this.intentStates).forEach(intent => {
      const intentState = this.intentStates[intent];

      this._abortOperatorList({
        intentState,
        reason: new Error('Page was destroyed.'),
        force: true
      });

      if (intent === 'oplist') {
        return;
      }

      intentState.renderTasks.forEach(function (renderTask) {
        const renderCompleted = renderTask.capability.promise.catch(function () {});
        waitOn.push(renderCompleted);
        renderTask.cancel();
      });
    });
    this.objs.clear();
    this.annotationsPromise = null;
    this.pendingCleanup = false;
    return Promise.all(waitOn);
  }

  cleanup(resetStats = false) {
    this.pendingCleanup = true;

    this._tryCleanup(resetStats);
  }

  _tryCleanup(resetStats = false) {
    if (!this.pendingCleanup || Object.keys(this.intentStates).some(intent => {
      const intentState = this.intentStates[intent];
      return intentState.renderTasks.length !== 0 || !intentState.operatorList.lastChunk;
    })) {
      return;
    }

    Object.keys(this.intentStates).forEach(intent => {
      delete this.intentStates[intent];
    });
    this.objs.clear();
    this.annotationsPromise = null;

    if (resetStats && this._stats instanceof _display_utils.StatTimer) {
      this._stats = new _display_utils.StatTimer();
    }

    this.pendingCleanup = false;
  }

  _startRenderPage(transparency, intent) {
    const intentState = this.intentStates[intent];

    if (!intentState) {
      return;
    }

    this._stats.timeEnd('Page Request');

    if (intentState.displayReadyCapability) {
      intentState.displayReadyCapability.resolve(transparency);
    }
  }

  _renderPageChunk(operatorListChunk, intentState) {
    for (let i = 0, ii = operatorListChunk.length; i < ii; i++) {
      intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
      intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
    }

    intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

    for (let i = 0; i < intentState.renderTasks.length; i++) {
      intentState.renderTasks[i].operatorListChanged();
    }

    if (operatorListChunk.lastChunk) {
      this._tryCleanup();
    }
  }

  _pumpOperatorList(args) {
    (0, _util.assert)(args.intent, 'PDFPageProxy._pumpOperatorList: Expected "intent" argument.');

    const readableStream = this._transport.messageHandler.sendWithStream('GetOperatorList', args);

    const reader = readableStream.getReader();
    const intentState = this.intentStates[args.intent];
    intentState.streamReader = reader;

    const pump = () => {
      reader.read().then(({
        value,
        done
      }) => {
        if (done) {
          intentState.streamReader = null;
          return;
        }

        if (this._transport.destroyed) {
          return;
        }

        this._renderPageChunk(value, intentState);

        pump();
      }, reason => {
        intentState.streamReader = null;

        if (this._transport.destroyed) {
          return;
        }

        if (intentState.operatorList) {
          intentState.operatorList.lastChunk = true;

          for (let i = 0; i < intentState.renderTasks.length; i++) {
            intentState.renderTasks[i].operatorListChanged();
          }

          this._tryCleanup();
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

  _abortOperatorList({
    intentState,
    reason,
    force = false
  }) {
    (0, _util.assert)(reason instanceof Error, 'PDFPageProxy._abortOperatorList: Expected "reason" argument.');

    if (!intentState.streamReader) {
      return;
    }

    if (!force) {
      if (intentState.renderTasks.length !== 0) {
        return;
      }

      if (reason instanceof _display_utils.RenderingCancelledException) {
        intentState.streamReaderCancelTimeout = setTimeout(() => {
          this._abortOperatorList({
            intentState,
            reason,
            force: true
          });

          intentState.streamReaderCancelTimeout = null;
        }, RENDERING_CANCELLED_TIMEOUT);
        return;
      }
    }

    intentState.streamReader.cancel(new _util.AbortException(reason && reason.message));
    intentState.streamReader = null;

    if (this._transport.destroyed) {
      return;
    }

    Object.keys(this.intentStates).some(intent => {
      if (this.intentStates[intent] === intentState) {
        delete this.intentStates[intent];
        return true;
      }

      return false;
    });
    this.cleanup();
  }

  get stats() {
    return this._stats instanceof _display_utils.StatTimer ? this._stats : null;
  }

}

exports.PDFPageProxy = PDFPageProxy;

class LoopbackPort {
  constructor(defer = true) {
    this._listeners = [];
    this._defer = defer;
    this._deferred = Promise.resolve(undefined);
  }

  postMessage(obj, transfers) {
    function cloneValue(value) {
      if (typeof value !== 'object' || value === null) {
        return value;
      }

      if (cloned.has(value)) {
        return cloned.get(value);
      }

      let buffer, result;

      if ((buffer = value.buffer) && (0, _util.isArrayBuffer)(buffer)) {
        const transferable = transfers && transfers.includes(buffer);

        if (value === buffer) {
          result = value;
        } else if (transferable) {
          result = new value.constructor(buffer, value.byteOffset, value.byteLength);
        } else {
          result = new value.constructor(value);
        }

        cloned.set(value, result);
        return result;
      }

      result = Array.isArray(value) ? [] : {};
      cloned.set(value, result);

      for (const i in value) {
        let desc,
            p = value;

        while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
          p = Object.getPrototypeOf(p);
        }

        if (typeof desc.value === 'undefined') {
          continue;
        }

        if (typeof desc.value === 'function') {
          if (value.hasOwnProperty && value.hasOwnProperty(i)) {
            throw new Error(`LoopbackPort.postMessage - cannot clone: ${value[i]}`);
          }

          continue;
        }

        result[i] = cloneValue(desc.value);
      }

      return result;
    }

    if (!this._defer) {
      this._listeners.forEach(listener => {
        listener.call(this, {
          data: obj
        });
      });

      return;
    }

    const cloned = new WeakMap();
    const e = {
      data: cloneValue(obj)
    };

    this._deferred.then(() => {
      this._listeners.forEach(listener => {
        listener.call(this, e);
      });
    });
  }

  addEventListener(name, listener) {
    this._listeners.push(listener);
  }

  removeEventListener(name, listener) {
    const i = this._listeners.indexOf(listener);

    this._listeners.splice(i, 1);
  }

  terminate() {
    this._listeners.length = 0;
  }

}

exports.LoopbackPort = LoopbackPort;

const PDFWorker = function PDFWorkerClosure() {
  const pdfWorkerPorts = new WeakMap();
  let nextFakeWorkerId = 0;
  let fakeWorkerFilesLoadedCapability;

  function getWorkerSrc() {
    if (_worker_options.GlobalWorkerOptions.workerSrc) {
      return _worker_options.GlobalWorkerOptions.workerSrc;
    }

    if (typeof fallbackWorkerSrc !== 'undefined') {
      return fallbackWorkerSrc;
    }

    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }

  function getMainThreadWorkerMessageHandler() {
    try {
      if (typeof window !== 'undefined') {
        return window.pdfjsWorker && window.pdfjsWorker.WorkerMessageHandler;
      }
    } catch (ex) {}

    return null;
  }

  function setupFakeWorkerGlobal() {
    if (fakeWorkerFilesLoadedCapability) {
      return fakeWorkerFilesLoadedCapability.promise;
    }

    fakeWorkerFilesLoadedCapability = (0, _util.createPromiseCapability)();
    const mainWorkerMessageHandler = getMainThreadWorkerMessageHandler();

    if (mainWorkerMessageHandler) {
      fakeWorkerFilesLoadedCapability.resolve(mainWorkerMessageHandler);
      return fakeWorkerFilesLoadedCapability.promise;
    }

    const loader = fakeWorkerFilesLoader || function () {
      return (0, _display_utils.loadScript)(getWorkerSrc()).then(function () {
        return window.pdfjsWorker.WorkerMessageHandler;
      });
    };

    loader().then(fakeWorkerFilesLoadedCapability.resolve, fakeWorkerFilesLoadedCapability.reject);
    return fakeWorkerFilesLoadedCapability.promise;
  }

  function createCDNWrapper(url) {
    const wrapper = 'importScripts(\'' + url + '\');';
    return URL.createObjectURL(new Blob([wrapper]));
  }

  class PDFWorker {
    constructor({
      name = null,
      port = null,
      verbosity = (0, _util.getVerbosityLevel)()
    } = {}) {
      if (port && pdfWorkerPorts.has(port)) {
        throw new Error('Cannot use more than one PDFWorker per port');
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

    get promise() {
      return this._readyCapability.promise;
    }

    get port() {
      return this._port;
    }

    get messageHandler() {
      return this._messageHandler;
    }

    _initializeFromPort(port) {
      this._port = port;
      this._messageHandler = new _message_handler.MessageHandler('main', 'worker', port);

      this._messageHandler.on('ready', function () {});

      this._readyCapability.resolve();
    }

    _initialize() {
      if (typeof Worker !== 'undefined' && !isWorkerDisabled && !getMainThreadWorkerMessageHandler()) {
        let workerSrc = getWorkerSrc();

        try {
          if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
            workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
          }

          const worker = new Worker(workerSrc);
          const messageHandler = new _message_handler.MessageHandler('main', 'worker', worker);

          const terminateEarly = () => {
            worker.removeEventListener('error', onWorkerError);
            messageHandler.destroy();
            worker.terminate();

            if (this.destroyed) {
              this._readyCapability.reject(new Error('Worker was destroyed'));
            } else {
              this._setupFakeWorker();
            }
          };

          const onWorkerError = () => {
            if (!this._webWorker) {
              terminateEarly();
            }
          };

          worker.addEventListener('error', onWorkerError);
          messageHandler.on('test', data => {
            worker.removeEventListener('error', onWorkerError);

            if (this.destroyed) {
              terminateEarly();
              return;
            }

            if (data) {
              this._messageHandler = messageHandler;
              this._port = worker;
              this._webWorker = worker;

              if (!data.supportTransfers) {
                this.postMessageTransfers = false;
              }

              this._readyCapability.resolve();

              messageHandler.send('configure', {
                verbosity: this.verbosity
              });
            } else {
              this._setupFakeWorker();

              messageHandler.destroy();
              worker.terminate();
            }
          });
          messageHandler.on('ready', data => {
            worker.removeEventListener('error', onWorkerError);

            if (this.destroyed) {
              terminateEarly();
              return;
            }

            try {
              sendTest();
            } catch (e) {
              this._setupFakeWorker();
            }
          });

          const sendTest = () => {
            let testObj = new Uint8Array([this.postMessageTransfers ? 255 : 0]);

            try {
              messageHandler.send('test', testObj, [testObj.buffer]);
            } catch (ex) {
              (0, _util.warn)('Cannot use postMessage transfers.');
              testObj[0] = 0;
              messageHandler.send('test', testObj);
            }
          };

          sendTest();
          return;
        } catch (e) {
          (0, _util.info)('The worker has been disabled.');
        }
      }

      this._setupFakeWorker();
    }

    _setupFakeWorker() {
      if (!isWorkerDisabled) {
        (0, _util.warn)('Setting up fake worker.');
        isWorkerDisabled = true;
      }

      setupFakeWorkerGlobal().then(WorkerMessageHandler => {
        if (this.destroyed) {
          this._readyCapability.reject(new Error('Worker was destroyed'));

          return;
        }

        const port = new LoopbackPort();
        this._port = port;
        const id = 'fake' + nextFakeWorkerId++;
        const workerHandler = new _message_handler.MessageHandler(id + '_worker', id, port);
        WorkerMessageHandler.setup(workerHandler, port);
        const messageHandler = new _message_handler.MessageHandler(id, id + '_worker', port);
        this._messageHandler = messageHandler;

        this._readyCapability.resolve();
      }).catch(reason => {
        this._readyCapability.reject(new Error(`Setting up fake worker failed: "${reason.message}".`));
      });
    }

    destroy() {
      this.destroyed = true;

      if (this._webWorker) {
        this._webWorker.terminate();

        this._webWorker = null;
      }

      pdfWorkerPorts.delete(this._port);
      this._port = null;

      if (this._messageHandler) {
        this._messageHandler.destroy();

        this._messageHandler = null;
      }
    }

    static fromPort(params) {
      if (!params || !params.port) {
        throw new Error('PDFWorker.fromPort - invalid method signature.');
      }

      if (pdfWorkerPorts.has(params.port)) {
        return pdfWorkerPorts.get(params.port);
      }

      return new PDFWorker(params);
    }

    static getWorkerSrc() {
      return getWorkerSrc();
    }

  }

  return PDFWorker;
}();

exports.PDFWorker = PDFWorker;

class WorkerTransport {
  constructor(messageHandler, loadingTask, networkStream, params) {
    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new _font_loader.FontLoader({
      docId: loadingTask.docId,
      onUnsupportedFeature: this._onUnsupportedFeature.bind(this)
    });
    this._params = params;
    this.CMapReaderFactory = new params.CMapReaderFactory({
      baseUrl: params.cMapUrl,
      isCompressed: params.cMapPacked
    });
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

  destroy() {
    if (this.destroyCapability) {
      return this.destroyCapability.promise;
    }

    this.destroyed = true;
    this.destroyCapability = (0, _util.createPromiseCapability)();

    if (this._passwordCapability) {
      this._passwordCapability.reject(new Error('Worker was destroyed during onPassword callback'));
    }

    const waitOn = [];
    this.pageCache.forEach(function (page) {
      if (page) {
        waitOn.push(page._destroy());
      }
    });
    this.pageCache.length = 0;
    this.pagePromises.length = 0;
    const terminated = this.messageHandler.sendWithPromise('Terminate', null);
    waitOn.push(terminated);
    Promise.all(waitOn).then(() => {
      this.fontLoader.clear();

      if (this._networkStream) {
        this._networkStream.cancelAllRequests(new _util.AbortException('Worker was terminated.'));
      }

      if (this.messageHandler) {
        this.messageHandler.destroy();
        this.messageHandler = null;
      }

      this.destroyCapability.resolve();
    }, this.destroyCapability.reject);
    return this.destroyCapability.promise;
  }

  setupMessageHandler() {
    const {
      messageHandler,
      loadingTask
    } = this;
    messageHandler.on('GetReader', (data, sink) => {
      (0, _util.assert)(this._networkStream);
      this._fullReader = this._networkStream.getFullReader();

      this._fullReader.onProgress = evt => {
        this._lastProgress = {
          loaded: evt.loaded,
          total: evt.total
        };
      };

      sink.onPull = () => {
        this._fullReader.read().then(function ({
          value,
          done
        }) {
          if (done) {
            sink.close();
            return;
          }

          (0, _util.assert)((0, _util.isArrayBuffer)(value));
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch(reason => {
          sink.error(reason);
        });
      };

      sink.onCancel = reason => {
        this._fullReader.cancel(reason);
      };
    });
    messageHandler.on('ReaderHeadersReady', data => {
      const headersCapability = (0, _util.createPromiseCapability)();
      const fullReader = this._fullReader;
      fullReader.headersReady.then(() => {
        if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
          if (this._lastProgress && loadingTask.onProgress) {
            loadingTask.onProgress(this._lastProgress);
          }

          fullReader.onProgress = evt => {
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
    messageHandler.on('GetRangeReader', (data, sink) => {
      (0, _util.assert)(this._networkStream);

      const rangeReader = this._networkStream.getRangeReader(data.begin, data.end);

      if (!rangeReader) {
        sink.close();
        return;
      }

      sink.onPull = () => {
        rangeReader.read().then(function ({
          value,
          done
        }) {
          if (done) {
            sink.close();
            return;
          }

          (0, _util.assert)((0, _util.isArrayBuffer)(value));
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch(reason => {
          sink.error(reason);
        });
      };

      sink.onCancel = reason => {
        rangeReader.cancel(reason);
      };
    });
    messageHandler.on('GetDoc', ({
      pdfInfo
    }) => {
      this._numPages = pdfInfo.numPages;

      loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this));
    });
    messageHandler.on('PasswordRequest', exception => {
      this._passwordCapability = (0, _util.createPromiseCapability)();

      if (loadingTask.onPassword) {
        const updatePassword = password => {
          this._passwordCapability.resolve({
            password
          });
        };

        try {
          loadingTask.onPassword(updatePassword, exception.code);
        } catch (ex) {
          this._passwordCapability.reject(ex);
        }
      } else {
        this._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
      }

      return this._passwordCapability.promise;
    });
    messageHandler.on('PasswordException', function (exception) {
      loadingTask._capability.reject(new _util.PasswordException(exception.message, exception.code));
    });
    messageHandler.on('InvalidPDF', function (exception) {
      loadingTask._capability.reject(new _util.InvalidPDFException(exception.message));
    });
    messageHandler.on('MissingPDF', function (exception) {
      loadingTask._capability.reject(new _util.MissingPDFException(exception.message));
    });
    messageHandler.on('UnexpectedResponse', function (exception) {
      loadingTask._capability.reject(new _util.UnexpectedResponseException(exception.message, exception.status));
    });
    messageHandler.on('UnknownError', function (exception) {
      loadingTask._capability.reject(new _util.UnknownErrorException(exception.message, exception.details));
    });
    messageHandler.on('DataLoaded', data => {
      if (loadingTask.onProgress) {
        loadingTask.onProgress({
          loaded: data.length,
          total: data.length
        });
      }

      this.downloadInfoCapability.resolve(data);
    });
    messageHandler.on('StartRenderPage', data => {
      if (this.destroyed) {
        return;
      }

      const page = this.pageCache[data.pageIndex];

      page._startRenderPage(data.transparency, data.intent);
    });
    messageHandler.on('commonobj', data => {
      if (this.destroyed) {
        return;
      }

      const [id, type, exportedData] = data;

      if (this.commonObjs.has(id)) {
        return;
      }

      switch (type) {
        case 'Font':
          const params = this._params;

          if ('error' in exportedData) {
            const exportedError = exportedData.error;
            (0, _util.warn)(`Error during font loading: ${exportedError}`);
            this.commonObjs.resolve(id, exportedError);
            break;
          }

          let fontRegistry = null;

          if (params.pdfBug && _global_scope.default.FontInspector && _global_scope.default.FontInspector.enabled) {
            fontRegistry = {
              registerFont(font, url) {
                _global_scope.default['FontInspector'].fontAdded(font, url);
              }

            };
          }

          const font = new _font_loader.FontFaceObject(exportedData, {
            isEvalSupported: params.isEvalSupported,
            disableFontFace: params.disableFontFace,
            ignoreErrors: params.ignoreErrors,
            onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
            fontRegistry
          });
          this.fontLoader.bind(font).then(() => {
            this.commonObjs.resolve(id, font);
          }, reason => {
            messageHandler.sendWithPromise('FontFallback', {
              id
            }).finally(() => {
              this.commonObjs.resolve(id, font);
            });
          });
          break;

        case 'FontPath':
        case 'FontType3Res':
          this.commonObjs.resolve(id, exportedData);
          break;

        default:
          throw new Error(`Got unknown common object type ${type}`);
      }
    });
    messageHandler.on('obj', data => {
      if (this.destroyed) {
        return undefined;
      }

      const [id, pageIndex, type, imageData] = data;
      const pageProxy = this.pageCache[pageIndex];

      if (pageProxy.objs.has(id)) {
        return undefined;
      }

      switch (type) {
        case 'JpegStream':
          return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = function () {
              resolve(img);
            };

            img.onerror = function () {
              reject(new Error('Error during JPEG image loading'));
              (0, _display_utils.releaseImageResources)(img);
            };

            img.src = imageData;
          }).then(img => {
            pageProxy.objs.resolve(id, img);
          });

        case 'Image':
          pageProxy.objs.resolve(id, imageData);
          const MAX_IMAGE_SIZE_TO_STORE = 8000000;

          if (imageData && 'data' in imageData && imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) {
            pageProxy.cleanupAfterRender = true;
          }

          break;

        default:
          throw new Error(`Got unknown object type ${type}`);
      }

      return undefined;
    });
    messageHandler.on('DocProgress', data => {
      if (this.destroyed) {
        return;
      }

      if (loadingTask.onProgress) {
        loadingTask.onProgress({
          loaded: data.loaded,
          total: data.total
        });
      }
    });
    messageHandler.on('UnsupportedFeature', this._onUnsupportedFeature.bind(this));
    messageHandler.on('JpegDecode', data => {
      if (this.destroyed) {
        return Promise.reject(new Error('Worker was destroyed'));
      }

      if (typeof document === 'undefined') {
        return Promise.reject(new Error('"document" is not defined.'));
      }

      const [imageUrl, components] = data;

      if (components !== 3 && components !== 1) {
        return Promise.reject(new Error('Only 3 components or 1 component can be returned'));
      }

      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.onload = function () {
          const {
            width,
            height
          } = img;
          const size = width * height;
          const rgbaLength = size * 4;
          const buf = new Uint8ClampedArray(size * components);
          let tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = width;
          tmpCanvas.height = height;
          let tmpCtx = tmpCanvas.getContext('2d');
          tmpCtx.drawImage(img, 0, 0);
          const data = tmpCtx.getImageData(0, 0, width, height).data;

          if (components === 3) {
            for (let i = 0, j = 0; i < rgbaLength; i += 4, j += 3) {
              buf[j] = data[i];
              buf[j + 1] = data[i + 1];
              buf[j + 2] = data[i + 2];
            }
          } else if (components === 1) {
            for (let i = 0, j = 0; i < rgbaLength; i += 4, j++) {
              buf[j] = data[i];
            }
          }

          resolve({
            data: buf,
            width,
            height
          });
          (0, _display_utils.releaseImageResources)(img);
          tmpCanvas.width = 0;
          tmpCanvas.height = 0;
          tmpCanvas = null;
          tmpCtx = null;
        };

        img.onerror = function () {
          reject(new Error('JpegDecode failed to load image'));
          (0, _display_utils.releaseImageResources)(img);
        };

        img.src = imageUrl;
      });
    });
    messageHandler.on('FetchBuiltInCMap', (data, sink) => {
      if (this.destroyed) {
        sink.error(new Error('Worker was destroyed'));
        return;
      }

      let fetched = false;

      sink.onPull = () => {
        if (fetched) {
          sink.close();
          return;
        }

        fetched = true;
        this.CMapReaderFactory.fetch(data).then(function (builtInCMap) {
          sink.enqueue(builtInCMap, 1, [builtInCMap.cMapData.buffer]);
        }).catch(function (reason) {
          sink.error(reason);
        });
      };
    });
  }

  _onUnsupportedFeature({
    featureId
  }) {
    if (this.destroyed) {
      return;
    }

    if (this.loadingTask.onUnsupportedFeature) {
      this.loadingTask.onUnsupportedFeature(featureId);
    }
  }

  getData() {
    return this.messageHandler.sendWithPromise('GetData', null);
  }

  getPage(pageNumber) {
    if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
      return Promise.reject(new Error('Invalid page request'));
    }

    const pageIndex = pageNumber - 1;

    if (pageIndex in this.pagePromises) {
      return this.pagePromises[pageIndex];
    }

    const promise = this.messageHandler.sendWithPromise('GetPage', {
      pageIndex
    }).then(pageInfo => {
      if (this.destroyed) {
        throw new Error('Transport destroyed');
      }

      const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.pdfBug);
      this.pageCache[pageIndex] = page;
      return page;
    });
    this.pagePromises[pageIndex] = promise;
    return promise;
  }

  getPageIndex(ref) {
    return this.messageHandler.sendWithPromise('GetPageIndex', {
      ref
    }).catch(function (reason) {
      return Promise.reject(new Error(reason));
    });
  }

  getAnnotations(pageIndex, intent) {
    return this.messageHandler.sendWithPromise('GetAnnotations', {
      pageIndex,
      intent
    });
  }

  getDestinations() {
    return this.messageHandler.sendWithPromise('GetDestinations', null);
  }

  getDestination(id) {
    if (typeof id !== 'string') {
      return Promise.reject(new Error('Invalid destination request.'));
    }

    return this.messageHandler.sendWithPromise('GetDestination', {
      id
    });
  }

  getPageLabels() {
    return this.messageHandler.sendWithPromise('GetPageLabels', null);
  }

  getPageLayout() {
    return this.messageHandler.sendWithPromise('GetPageLayout', null);
  }

  getPageMode() {
    return this.messageHandler.sendWithPromise('GetPageMode', null);
  }

  getViewerPreferences() {
    return this.messageHandler.sendWithPromise('GetViewerPreferences', null);
  }

  getOpenActionDestination() {
    return this.messageHandler.sendWithPromise('GetOpenActionDestination', null);
  }

  getAttachments() {
    return this.messageHandler.sendWithPromise('GetAttachments', null);
  }

  getJavaScript() {
    return this.messageHandler.sendWithPromise('GetJavaScript', null);
  }

  getOutline() {
    return this.messageHandler.sendWithPromise('GetOutline', null);
  }

  getPermissions() {
    return this.messageHandler.sendWithPromise('GetPermissions', null);
  }

  getMetadata() {
    return this.messageHandler.sendWithPromise('GetMetadata', null).then(results => {
      return {
        info: results[0],
        metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
        contentDispositionFilename: this._fullReader ? this._fullReader.filename : null
      };
    });
  }

  getStats() {
    return this.messageHandler.sendWithPromise('GetStats', null);
  }

  startCleanup() {
    this.messageHandler.sendWithPromise('Cleanup', null).then(() => {
      for (let i = 0, ii = this.pageCache.length; i < ii; i++) {
        const page = this.pageCache[i];

        if (page) {
          page.cleanup();
        }
      }

      this.commonObjs.clear();
      this.fontLoader.clear();
    });
  }

  get loadingParams() {
    const params = this._params;
    return (0, _util.shadow)(this, 'loadingParams', {
      disableAutoFetch: params.disableAutoFetch,
      disableCreateObjectURL: params.disableCreateObjectURL,
      disableFontFace: params.disableFontFace,
      nativeImageDecoderSupport: params.nativeImageDecoderSupport
    });
  }

}

class PDFObjects {
  constructor() {
    this._objs = Object.create(null);
  }

  _ensureObj(objId) {
    if (this._objs[objId]) {
      return this._objs[objId];
    }

    return this._objs[objId] = {
      capability: (0, _util.createPromiseCapability)(),
      data: null,
      resolved: false
    };
  }

  get(objId, callback = null) {
    if (callback) {
      this._ensureObj(objId).capability.promise.then(callback);

      return null;
    }

    const obj = this._objs[objId];

    if (!obj || !obj.resolved) {
      throw new Error(`Requesting object that isn't resolved yet ${objId}.`);
    }

    return obj.data;
  }

  has(objId) {
    const obj = this._objs[objId];
    return obj ? obj.resolved : false;
  }

  resolve(objId, data) {
    const obj = this._ensureObj(objId);

    obj.resolved = true;
    obj.data = data;
    obj.capability.resolve(data);
  }

  clear() {
    for (const objId in this._objs) {
      const {
        data
      } = this._objs[objId];

      if (typeof Image !== 'undefined' && data instanceof Image) {
        (0, _display_utils.releaseImageResources)(data);
      }
    }

    this._objs = Object.create(null);
  }

}

class RenderTask {
  constructor(internalRenderTask) {
    this._internalRenderTask = internalRenderTask;
    this.onContinue = null;
  }

  get promise() {
    return this._internalRenderTask.capability.promise;
  }

  cancel() {
    this._internalRenderTask.cancel();
  }

  then(onFulfilled, onRejected) {
    (0, _display_utils.deprecated)('RenderTask.then method, use the `promise` getter instead.');
    return this.promise.then.apply(this.promise, arguments);
  }

}

const InternalRenderTask = function InternalRenderTaskClosure() {
  const canvasInRendering = new WeakSet();

  class InternalRenderTask {
    constructor({
      callback,
      params,
      objs,
      commonObjs,
      operatorList,
      pageNumber,
      canvasFactory,
      webGLContext,
      useRequestAnimationFrame = false,
      pdfBug = false
    }) {
      this.callback = callback;
      this.params = params;
      this.objs = objs;
      this.commonObjs = commonObjs;
      this.operatorListIdx = null;
      this.operatorList = operatorList;
      this.pageNumber = pageNumber;
      this.canvasFactory = canvasFactory;
      this.webGLContext = webGLContext;
      this._pdfBug = pdfBug;
      this.running = false;
      this.graphicsReadyCallback = null;
      this.graphicsReady = false;
      this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== 'undefined';
      this.cancelled = false;
      this.capability = (0, _util.createPromiseCapability)();
      this.task = new RenderTask(this);
      this._continueBound = this._continue.bind(this);
      this._scheduleNextBound = this._scheduleNext.bind(this);
      this._nextBound = this._next.bind(this);
      this._canvas = params.canvasContext.canvas;
    }

    initializeGraphics(transparency = false) {
      if (this.cancelled) {
        return;
      }

      if (this._canvas) {
        if (canvasInRendering.has(this._canvas)) {
          throw new Error('Cannot use the same canvas during multiple render() operations. ' + 'Use different canvas or ensure previous operations were ' + 'cancelled or completed.');
        }

        canvasInRendering.add(this._canvas);
      }

      if (this._pdfBug && _global_scope.default.StepperManager && _global_scope.default.StepperManager.enabled) {
        this.stepper = _global_scope.default.StepperManager.create(this.pageNumber - 1);
        this.stepper.init(this.operatorList);
        this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
      }

      const {
        canvasContext,
        viewport,
        transform,
        imageLayer,
        background
      } = this.params;
      this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext, imageLayer);
      this.gfx.beginDrawing({
        transform,
        viewport,
        transparency,
        background
      });
      this.operatorListIdx = 0;
      this.graphicsReady = true;

      if (this.graphicsReadyCallback) {
        this.graphicsReadyCallback();
      }
    }

    cancel(error = null) {
      this.running = false;
      this.cancelled = true;

      if (this.gfx) {
        this.gfx.endDrawing();
      }

      if (this._canvas) {
        canvasInRendering.delete(this._canvas);
      }

      this.callback(error || new _display_utils.RenderingCancelledException(`Rendering cancelled, page ${this.pageNumber}`, 'canvas'));
    }

    operatorListChanged() {
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

    _continue() {
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

    _scheduleNext() {
      if (this._useRequestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this._nextBound().catch(this.cancel.bind(this));
        });
      } else {
        Promise.resolve().then(this._nextBound).catch(this.cancel.bind(this));
      }
    }

    async _next() {
      if (this.cancelled) {
        return;
      }

      this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);

      if (this.operatorListIdx === this.operatorList.argsArray.length) {
        this.running = false;

        if (this.operatorList.lastChunk) {
          this.gfx.endDrawing();

          if (this._canvas) {
            canvasInRendering.delete(this._canvas);
          }

          this.callback();
        }
      }
    }

  }

  return InternalRenderTask;
}();

const version = '2.3.200';
exports.version = version;
const build = '4ae3f9fc';
exports.build = build;

/***/ }),
/* 186 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLinkAttributes = addLinkAttributes;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.isFetchSupported = isFetchSupported;
exports.isValidFetchUrl = isValidFetchUrl;
exports.loadScript = loadScript;
exports.deprecated = deprecated;
exports.releaseImageResources = releaseImageResources;
exports.PDFDateString = exports.DummyStatTimer = exports.StatTimer = exports.DOMSVGFactory = exports.DOMCMapReaderFactory = exports.DOMCanvasFactory = exports.DEFAULT_LINK_REL = exports.LinkTarget = exports.RenderingCancelledException = exports.PageViewport = void 0;

var _util = __w_pdfjs_require__(1);

const DEFAULT_LINK_REL = 'noopener noreferrer nofollow';
exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
const SVG_NS = 'http://www.w3.org/2000/svg';

class DOMCanvasFactory {
  create(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error('Invalid canvas size');
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    return {
      canvas,
      context
    };
  }

  reset(canvasAndContext, width, height) {
    if (!canvasAndContext.canvas) {
      throw new Error('Canvas is not specified');
    }

    if (width <= 0 || height <= 0) {
      throw new Error('Invalid canvas size');
    }

    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    if (!canvasAndContext.canvas) {
      throw new Error('Canvas is not specified');
    }

    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }

}

exports.DOMCanvasFactory = DOMCanvasFactory;

class DOMCMapReaderFactory {
  constructor({
    baseUrl = null,
    isCompressed = false
  }) {
    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  async fetch({
    name
  }) {
    if (!this.baseUrl) {
      throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');
    }

    if (!name) {
      throw new Error('CMap name must be specified.');
    }

    const url = this.baseUrl + name + (this.isCompressed ? '.bcmap' : '');
    const compressionType = this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE;

    if (isFetchSupported() && isValidFetchUrl(url, document.baseURI)) {
      return fetch(url).then(async response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        let cMapData;

        if (this.isCompressed) {
          cMapData = new Uint8Array((await response.arrayBuffer()));
        } else {
          cMapData = (0, _util.stringToBytes)((await response.text()));
        }

        return {
          cMapData,
          compressionType
        };
      }).catch(reason => {
        throw new Error(`Unable to load ${this.isCompressed ? 'binary ' : ''}` + `CMap at: ${url}`);
      });
    }

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      if (this.isCompressed) {
        request.responseType = 'arraybuffer';
      }

      request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        if (request.status === 200 || request.status === 0) {
          let cMapData;

          if (this.isCompressed && request.response) {
            cMapData = new Uint8Array(request.response);
          } else if (!this.isCompressed && request.responseText) {
            cMapData = (0, _util.stringToBytes)(request.responseText);
          }

          if (cMapData) {
            resolve({
              cMapData,
              compressionType
            });
            return;
          }
        }

        reject(new Error(request.statusText));
      };

      request.send(null);
    }).catch(reason => {
      throw new Error(`Unable to load ${this.isCompressed ? 'binary ' : ''}` + `CMap at: ${url}`);
    });
  }

}

exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

class DOMSVGFactory {
  create(width, height) {
    (0, _util.assert)(width > 0 && height > 0, 'Invalid SVG dimensions');
    const svg = document.createElementNS(SVG_NS, 'svg:svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('width', width + 'px');
    svg.setAttribute('height', height + 'px');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    return svg;
  }

  createElement(type) {
    (0, _util.assert)(typeof type === 'string', 'Invalid SVG element type');
    return document.createElementNS(SVG_NS, type);
  }

}

exports.DOMSVGFactory = DOMSVGFactory;

class PageViewport {
  constructor({
    viewBox,
    scale,
    rotation,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  }) {
    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    const centerX = (viewBox[2] + viewBox[0]) / 2;
    const centerY = (viewBox[3] + viewBox[1]) / 2;
    let rotateA, rotateB, rotateC, rotateD;
    rotation = rotation % 360;
    rotation = rotation < 0 ? rotation + 360 : rotation;

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

      default:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;
    }

    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }

    let offsetCanvasX, offsetCanvasY;
    let width, height;

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

  clone({
    scale = this.scale,
    rotation = this.rotation,
    dontFlip = false
  } = {}) {
    return new PageViewport({
      viewBox: this.viewBox.slice(),
      scale,
      rotation,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      dontFlip
    });
  }

  convertToViewportPoint(x, y) {
    return _util.Util.applyTransform([x, y], this.transform);
  }

  convertToViewportRectangle(rect) {
    const topLeft = _util.Util.applyTransform([rect[0], rect[1]], this.transform);

    const bottomRight = _util.Util.applyTransform([rect[2], rect[3]], this.transform);

    return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
  }

  convertToPdfPoint(x, y) {
    return _util.Util.applyInverseTransform([x, y], this.transform);
  }

}

exports.PageViewport = PageViewport;

class RenderingCancelledException extends _util.BaseException {
  constructor(msg, type) {
    super(msg);
    this.type = type;
  }

}

exports.RenderingCancelledException = RenderingCancelledException;
const LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
exports.LinkTarget = LinkTarget;
const LinkTargetStringMap = ['', '_self', '_blank', '_parent', '_top'];

function addLinkAttributes(link, {
  url,
  target,
  rel,
  enabled = true
} = {}) {
  (0, _util.assert)(url && typeof url === 'string', 'addLinkAttributes: A valid "url" parameter must provided.');
  const urlNullRemoved = (0, _util.removeNullCharacters)(url);

  if (enabled) {
    link.href = link.title = urlNullRemoved;
  } else {
    link.href = '';
    link.title = `Disabled: ${urlNullRemoved}`;

    link.onclick = () => {
      return false;
    };
  }

  const LinkTargetValues = Object.values(LinkTarget);
  const targetIndex = LinkTargetValues.includes(target) ? target : LinkTarget.NONE;
  link.target = LinkTargetStringMap[targetIndex];
  link.rel = typeof rel === 'string' ? rel : DEFAULT_LINK_REL;
}

function getFilenameFromUrl(url) {
  const anchor = url.indexOf('#');
  const query = url.indexOf('?');
  const end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf('/', end) + 1, end);
}

class StatTimer {
  constructor(enable = true) {
    this.enabled = !!enable;
    this.started = Object.create(null);
    this.times = [];
  }

  time(name) {
    if (!this.enabled) {
      return;
    }

    if (name in this.started) {
      (0, _util.warn)('Timer is already running for ' + name);
    }

    this.started[name] = Date.now();
  }

  timeEnd(name) {
    if (!this.enabled) {
      return;
    }

    if (!(name in this.started)) {
      (0, _util.warn)('Timer has not been started for ' + name);
    }

    this.times.push({
      'name': name,
      'start': this.started[name],
      'end': Date.now()
    });
    delete this.started[name];
  }

  toString() {
    let out = '',
        longest = 0;

    for (const time of this.times) {
      const name = time.name;

      if (name.length > longest) {
        longest = name.length;
      }
    }

    for (const time of this.times) {
      const duration = time.end - time.start;
      out += `${time.name.padEnd(longest)} ${duration}ms\n`;
    }

    return out;
  }

}

exports.StatTimer = StatTimer;

class DummyStatTimer {
  constructor() {
    (0, _util.unreachable)('Cannot initialize DummyStatTimer.');
  }

  static time(name) {}

  static timeEnd(name) {}

  static toString() {
    return '';
  }

}

exports.DummyStatTimer = DummyStatTimer;

function isFetchSupported() {
  return typeof fetch !== 'undefined' && typeof Response !== 'undefined' && 'body' in Response.prototype && typeof ReadableStream !== 'undefined';
}

function isValidFetchUrl(url, baseUrl) {
  try {
    const {
      protocol
    } = baseUrl ? new URL(url, baseUrl) : new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch (ex) {
    return false;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;

    script.onerror = function () {
      reject(new Error(`Cannot load script at: ${script.src}`));
    };

    (document.head || document.documentElement).appendChild(script);
  });
}

function deprecated(details) {
  console.log('Deprecated API usage: ' + details);
}

function releaseImageResources(img) {
  (0, _util.assert)(img instanceof Image, 'Invalid `img` parameter.');
  const url = img.src;

  if (typeof url === 'string' && url.startsWith('blob:') && URL.revokeObjectURL) {
    URL.revokeObjectURL(url);
  }

  img.removeAttribute('src');
}

let pdfDateStringRegex;

class PDFDateString {
  static toDateObject(input) {
    if (!input || !(0, _util.isString)(input)) {
      return null;
    }

    if (!pdfDateStringRegex) {
      pdfDateStringRegex = new RegExp('^D:' + '(\\d{4})' + '(\\d{2})?' + '(\\d{2})?' + '(\\d{2})?' + '(\\d{2})?' + '(\\d{2})?' + '([Z|+|-])?' + '(\\d{2})?' + '\'?' + '(\\d{2})?' + '\'?');
    }

    const matches = pdfDateStringRegex.exec(input);

    if (!matches) {
      return null;
    }

    const year = parseInt(matches[1], 10);
    let month = parseInt(matches[2], 10);
    month = month >= 1 && month <= 12 ? month - 1 : 0;
    let day = parseInt(matches[3], 10);
    day = day >= 1 && day <= 31 ? day : 1;
    let hour = parseInt(matches[4], 10);
    hour = hour >= 0 && hour <= 23 ? hour : 0;
    let minute = parseInt(matches[5], 10);
    minute = minute >= 0 && minute <= 59 ? minute : 0;
    let second = parseInt(matches[6], 10);
    second = second >= 0 && second <= 59 ? second : 0;
    const universalTimeRelation = matches[7] || 'Z';
    let offsetHour = parseInt(matches[8], 10);
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10) || 0;
    offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

    if (universalTimeRelation === '-') {
      hour += offsetHour;
      minute += offsetMinute;
    } else if (universalTimeRelation === '+') {
      hour -= offsetHour;
      minute -= offsetMinute;
    }

    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }

}

exports.PDFDateString = PDFDateString;

/***/ }),
/* 187 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontLoader = exports.FontFaceObject = void 0;

var _util = __w_pdfjs_require__(1);

class BaseFontLoader {
  constructor({
    docId,
    onUnsupportedFeature
  }) {
    if (this.constructor === BaseFontLoader) {
      (0, _util.unreachable)('Cannot initialize BaseFontLoader.');
    }

    this.docId = docId;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this.nativeFontFaces = [];
    this.styleElement = null;
  }

  addNativeFontFace(nativeFontFace) {
    this.nativeFontFaces.push(nativeFontFace);
    document.fonts.add(nativeFontFace);
  }

  insertRule(rule) {
    let styleElement = this.styleElement;

    if (!styleElement) {
      styleElement = this.styleElement = document.createElement('style');
      styleElement.id = `PDFJS_FONT_STYLE_TAG_${this.docId}`;
      document.documentElement.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    const styleSheet = styleElement.sheet;
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }

  clear() {
    this.nativeFontFaces.forEach(function (nativeFontFace) {
      document.fonts.delete(nativeFontFace);
    });
    this.nativeFontFaces.length = 0;

    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }

  async bind(font) {
    if (font.attached || font.missingFile) {
      return undefined;
    }

    font.attached = true;

    if (this.isFontLoadingAPISupported) {
      const nativeFontFace = font.createNativeFontFace();

      if (nativeFontFace) {
        this.addNativeFontFace(nativeFontFace);

        try {
          await nativeFontFace.loaded;
        } catch (ex) {
          this._onUnsupportedFeature({
            featureId: _util.UNSUPPORTED_FEATURES.font
          });

          (0, _util.warn)(`Failed to load font '${nativeFontFace.family}': '${ex}'.`);
          font.disableFontFace = true;
          throw ex;
        }
      }

      return undefined;
    }

    const rule = font.createFontFaceRule();

    if (rule) {
      this.insertRule(rule);

      if (this.isSyncFontLoadingSupported) {
        return undefined;
      }

      return new Promise(resolve => {
        const request = this._queueLoadingCallback(resolve);

        this._prepareFontLoadEvent([rule], [font], request);
      });
    }

    return undefined;
  }

  _queueLoadingCallback(callback) {
    (0, _util.unreachable)('Abstract method `_queueLoadingCallback`.');
  }

  get isFontLoadingAPISupported() {
    (0, _util.unreachable)('Abstract method `isFontLoadingAPISupported`.');
  }

  get isSyncFontLoadingSupported() {
    (0, _util.unreachable)('Abstract method `isSyncFontLoadingSupported`.');
  }

  get _loadTestFont() {
    (0, _util.unreachable)('Abstract method `_loadTestFont`.');
  }

  _prepareFontLoadEvent(rules, fontsToLoad, request) {
    (0, _util.unreachable)('Abstract method `_prepareFontLoadEvent`.');
  }

}

let FontLoader;
exports.FontLoader = FontLoader;
{
  exports.FontLoader = FontLoader = class GenericFontLoader extends BaseFontLoader {
    constructor(docId) {
      super(docId);
      this.loadingContext = {
        requests: [],
        nextRequestId: 0
      };
      this.loadTestFontId = 0;
    }

    get isFontLoadingAPISupported() {
      let supported = typeof document !== 'undefined' && !!document.fonts;

      if (supported && typeof navigator !== 'undefined') {
        const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

        if (m && m[1] < 63) {
          supported = false;
        }
      }

      return (0, _util.shadow)(this, 'isFontLoadingAPISupported', supported);
    }

    get isSyncFontLoadingSupported() {
      let supported = false;

      if (typeof navigator === 'undefined') {
        supported = true;
      } else {
        const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

        if (m && m[1] >= 14) {
          supported = true;
        }
      }

      return (0, _util.shadow)(this, 'isSyncFontLoadingSupported', supported);
    }

    _queueLoadingCallback(callback) {
      function completeRequest() {
        (0, _util.assert)(!request.done, 'completeRequest() cannot be called twice.');
        request.done = true;

        while (context.requests.length > 0 && context.requests[0].done) {
          const otherRequest = context.requests.shift();
          setTimeout(otherRequest.callback, 0);
        }
      }

      const context = this.loadingContext;
      const request = {
        id: `pdfjs-font-loading-${context.nextRequestId++}`,
        done: false,
        complete: completeRequest,
        callback
      };
      context.requests.push(request);
      return request;
    }

    get _loadTestFont() {
      const getLoadTestFont = function () {
        return atob('T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA' + 'FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA' + 'ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA' + 'AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1' + 'AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD' + '6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM' + 'AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D' + 'IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA' + 'AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA' + 'AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB' + 'AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY' + 'AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA' + 'AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA' + 'AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC' + 'AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3' + 'Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj' + 'FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==');
      };

      return (0, _util.shadow)(this, '_loadTestFont', getLoadTestFont());
    }

    _prepareFontLoadEvent(rules, fonts, request) {
      function int32(data, offset) {
        return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
      }

      function spliceString(s, offset, remove, insert) {
        let chunk1 = s.substring(0, offset);
        let chunk2 = s.substring(offset + remove);
        return chunk1 + insert + chunk2;
      }

      let i, ii;
      let canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      let ctx = canvas.getContext('2d');
      let called = 0;

      function isFontReady(name, callback) {
        called++;

        if (called > 30) {
          (0, _util.warn)('Load test font never loaded.');
          callback();
          return;
        }

        ctx.font = '30px ' + name;
        ctx.fillText('.', 0, 20);
        let imageData = ctx.getImageData(0, 0, 1, 1);

        if (imageData.data[3] > 0) {
          callback();
          return;
        }

        setTimeout(isFontReady.bind(null, name, callback));
      }

      const loadTestFontId = `lt${Date.now()}${this.loadTestFontId++}`;
      let data = this._loadTestFont;
      let COMMENT_OFFSET = 976;
      data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
      let CFF_CHECKSUM_OFFSET = 16;
      let XXXX_VALUE = 0x58585858;
      let checksum = int32(data, CFF_CHECKSUM_OFFSET);

      for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
        checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
      }

      if (i < loadTestFontId.length) {
        checksum = checksum - XXXX_VALUE + int32(loadTestFontId + 'XXX', i) | 0;
      }

      data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util.string32)(checksum));
      const url = `url(data:font/opentype;base64,${btoa(data)});`;
      const rule = `@font-face {font-family:"${loadTestFontId}";src:${url}}`;
      this.insertRule(rule);
      let names = [];

      for (i = 0, ii = fonts.length; i < ii; i++) {
        names.push(fonts[i].loadedName);
      }

      names.push(loadTestFontId);
      let div = document.createElement('div');
      div.setAttribute('style', 'visibility: hidden;' + 'width: 10px; height: 10px;' + 'position: absolute; top: 0px; left: 0px;');

      for (i = 0, ii = names.length; i < ii; ++i) {
        let span = document.createElement('span');
        span.textContent = 'Hi';
        span.style.fontFamily = names[i];
        div.appendChild(span);
      }

      document.body.appendChild(div);
      isFontReady(loadTestFontId, function () {
        document.body.removeChild(div);
        request.complete();
      });
    }

  };
}
const IsEvalSupportedCached = {
  get value() {
    return (0, _util.shadow)(this, 'value', (0, _util.isEvalSupported)());
  }

};

class FontFaceObject {
  constructor(translatedData, {
    isEvalSupported = true,
    disableFontFace = false,
    ignoreErrors = false,
    onUnsupportedFeature = null,
    fontRegistry = null
  }) {
    this.compiledGlyphs = Object.create(null);

    for (let i in translatedData) {
      this[i] = translatedData[i];
    }

    this.isEvalSupported = isEvalSupported !== false;
    this.disableFontFace = disableFontFace === true;
    this.ignoreErrors = ignoreErrors === true;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this.fontRegistry = fontRegistry;
  }

  createNativeFontFace() {
    if (!this.data || this.disableFontFace) {
      return null;
    }

    const nativeFontFace = new FontFace(this.loadedName, this.data, {});

    if (this.fontRegistry) {
      this.fontRegistry.registerFont(this);
    }

    return nativeFontFace;
  }

  createFontFaceRule() {
    if (!this.data || this.disableFontFace) {
      return null;
    }

    const data = (0, _util.bytesToString)(new Uint8Array(this.data));
    const url = `url(data:${this.mimetype};base64,${btoa(data)});`;
    const rule = `@font-face {font-family:"${this.loadedName}";src:${url}}`;

    if (this.fontRegistry) {
      this.fontRegistry.registerFont(this, url);
    }

    return rule;
  }

  getPathGenerator(objs, character) {
    if (this.compiledGlyphs[character] !== undefined) {
      return this.compiledGlyphs[character];
    }

    let cmds, current;

    try {
      cmds = objs.get(this.loadedName + '_path_' + character);
    } catch (ex) {
      if (!this.ignoreErrors) {
        throw ex;
      }

      if (this._onUnsupportedFeature) {
        this._onUnsupportedFeature({
          featureId: _util.UNSUPPORTED_FEATURES.font
        });
      }

      (0, _util.warn)(`getPathGenerator - ignoring character: "${ex}".`);
      return this.compiledGlyphs[character] = function (c, size) {};
    }

    if (this.isEvalSupported && IsEvalSupportedCached.value) {
      let args,
          js = '';

      for (let i = 0, ii = cmds.length; i < ii; i++) {
        current = cmds[i];

        if (current.args !== undefined) {
          args = current.args.join(',');
        } else {
          args = '';
        }

        js += 'c.' + current.cmd + '(' + args + ');\n';
      }

      return this.compiledGlyphs[character] = new Function('c', 'size', js);
    }

    return this.compiledGlyphs[character] = function (c, size) {
      for (let i = 0, ii = cmds.length; i < ii; i++) {
        current = cmds[i];

        if (current.cmd === 'scale') {
          current.args = [size, -size];
        }

        c[current.cmd].apply(c, current.args);
      }
    };
  }

}

exports.FontFaceObject = FontFaceObject;

/***/ }),
/* 188 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


let compatibilityParams = Object.create(null);
{
  const isNodeJS = __w_pdfjs_require__(4);

  const userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
  const isIE = /Trident/.test(userAgent);
  const isIOSChrome = /CriOS/.test(userAgent);

  (function checkOnBlobSupport() {
    if (isIE || isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();

  (function checkFontFaceAndImage() {
    if (isNodeJS()) {
      compatibilityParams.disableFontFace = true;
      compatibilityParams.nativeImageDecoderSupport = 'none';
    }
  })();
}
exports.apiCompatibilityParams = Object.freeze(compatibilityParams);

/***/ }),
/* 189 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasGraphics = void 0;

var _util = __w_pdfjs_require__(1);

var _pattern_helper = __w_pdfjs_require__(190);

var MIN_FONT_SIZE = 16;
var MAX_FONT_SIZE = 100;
var MAX_GROUP_SIZE = 4096;
var MIN_WIDTH_FACTOR = 0.65;
var COMPILE_TYPE3_GLYPHS = true;
var MAX_SIZE_TO_COMPILE = 1000;
var FULL_CHUNK_HEIGHT = 16;
var IsLittleEndianCached = {
  get value() {
    return (0, _util.shadow)(IsLittleEndianCached, 'value', (0, _util.isLittleEndian)());
  }

};

function addContextCurrentTransform(ctx) {
  if (!ctx.mozCurrentTransform) {
    ctx._originalSave = ctx.save;
    ctx._originalRestore = ctx.restore;
    ctx._originalRotate = ctx.rotate;
    ctx._originalScale = ctx.scale;
    ctx._originalTranslate = ctx.translate;
    ctx._originalTransform = ctx.transform;
    ctx._originalSetTransform = ctx.setTransform;
    ctx._transformMatrix = ctx._transformMatrix || [1, 0, 0, 1, 0, 0];
    ctx._transformStack = [];
    Object.defineProperty(ctx, 'mozCurrentTransform', {
      get: function getCurrentTransform() {
        return this._transformMatrix;
      }
    });
    Object.defineProperty(ctx, 'mozCurrentTransformInverse', {
      get: function getCurrentTransformInverse() {
        var m = this._transformMatrix;
        var a = m[0],
            b = m[1],
            c = m[2],
            d = m[3],
            e = m[4],
            f = m[5];
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
      m[0] = m[0] * x;
      m[1] = m[1] * x;
      m[2] = m[2] * y;
      m[3] = m[3] * y;

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

    ctx.rotate = function ctxRotate(angle) {
      var cosValue = Math.cos(angle);
      var sinValue = Math.sin(angle);
      var m = this._transformMatrix;
      this._transformMatrix = [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];

      this._originalRotate(angle);
    };
  }
}

var CachedCanvases = function CachedCanvasesClosure() {
  function CachedCanvases(canvasFactory) {
    this.canvasFactory = canvasFactory;
    this.cache = Object.create(null);
  }

  CachedCanvases.prototype = {
    getCanvas: function CachedCanvases_getCanvas(id, width, height, trackTransform) {
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
    },

    clear() {
      for (var id in this.cache) {
        var canvasEntry = this.cache[id];
        this.canvasFactory.destroy(canvasEntry);
        delete this.cache[id];
      }
    }

  };
  return CachedCanvases;
}();

function compileType3Glyph(imgData) {
  var POINT_TO_PROCESS_LIMIT = 1000;
  var width = imgData.width,
      height = imgData.height;
  var i,
      j,
      j0,
      width1 = width + 1;
  var points = new Uint8Array(width1 * (height + 1));
  var POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
  var lineSize = width + 7 & ~7,
      data0 = imgData.data;
  var data = new Uint8Array(lineSize * height),
      pos = 0,
      ii;

  for (i = 0, ii = data0.length; i < ii; i++) {
    var mask = 128,
        elem = data0[i];

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
    var type = points[p],
        p0 = p,
        pp;

    do {
      var step = steps[type];

      do {
        p += step;
      } while (!points[p]);

      pp = points[p];

      if (pp !== 5 && pp !== 10) {
        type = pp;
        points[p] = 0;
      } else {
        type = pp & 0x33 * type >> 4;
        points[p] &= type >> 2 | type << 2;
      }

      coords.push(p % width1);
      coords.push(p / width1 | 0);

      if (!points[p]) {
        --count;
      }
    } while (p0 !== p);

    outlines.push(coords);
    --i;
  }

  var drawOutline = function (c) {
    c.save();
    c.scale(1 / width, -1 / height);
    c.translate(0, -height);
    c.beginPath();

    for (var i = 0, ii = outlines.length; i < ii; i++) {
      var o = outlines[i];
      c.moveTo(o[0], o[1]);

      for (var j = 2, jj = o.length; j < jj; j += 2) {
        c.lineTo(o[j], o[j + 1]);
      }
    }

    c.fill();
    c.beginPath();
    c.restore();
  };

  return drawOutline;
}

var CanvasExtraState = function CanvasExtraStateClosure() {
  function CanvasExtraState() {
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
    this.fillColor = '#000000';
    this.strokeColor = '#000000';
    this.patternFill = false;
    this.fillAlpha = 1;
    this.strokeAlpha = 1;
    this.lineWidth = 1;
    this.activeSMask = null;
    this.resumeSMaskCtx = null;
  }

  CanvasExtraState.prototype = {
    clone: function CanvasExtraState_clone() {
      return Object.create(this);
    },
    setCurrentPoint: function CanvasExtraState_setCurrentPoint(x, y) {
      this.x = x;
      this.y = y;
    }
  };
  return CanvasExtraState;
}();

var CanvasGraphics = function CanvasGraphicsClosure() {
  var EXECUTION_TIME = 15;
  var EXECUTION_STEPS = 10;

  function CanvasGraphics(canvasCtx, commonObjs, objs, canvasFactory, webGLContext, imageLayer) {
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
    this.webGLContext = webGLContext;
    this.imageLayer = imageLayer;
    this.groupStack = [];
    this.processingType3 = null;
    this.baseTransform = null;
    this.baseTransformStack = [];
    this.groupLevel = 0;
    this.smaskStack = [];
    this.smaskCounter = 0;
    this.tempSMask = null;
    this.cachedCanvases = new CachedCanvases(this.canvasFactory);

    if (canvasCtx) {
      addContextCurrentTransform(canvasCtx);
    }

    this._cachedGetSinglePixelWidth = null;
  }

  function putBinaryImageData(ctx, imgData) {
    if (typeof ImageData !== 'undefined' && imgData instanceof ImageData) {
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

    if (imgData.kind === _util.ImageKind.GRAYSCALE_1BPP) {
      var srcLength = src.byteLength;
      var dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
      var dest32DataLength = dest32.length;
      var fullSrcDiff = width + 7 >> 3;
      var white = 0xFFFFFFFF;
      var black = IsLittleEndianCached.value ? 0xFF000000 : 0x000000FF;

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
      j = 0;
      elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

      for (i = 0; i < fullChunks; i++) {
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
        srcPos += elemsInThisChunk;
        ctx.putImageData(chunkImgData, 0, j);
        j += FULL_CHUNK_HEIGHT;
      }

      if (i < totalChunks) {
        elemsInThisChunk = width * partialChunkHeight * 4;
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
        ctx.putImageData(chunkImgData, 0, j);
      }
    } else if (imgData.kind === _util.ImageKind.RGB_24BPP) {
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

        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
      }
    } else {
      throw new Error(`bad image kind: ${imgData.kind}`);
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
        var mask = 0;

        for (var k = 0; k < width; k++) {
          if (!mask) {
            var elem = src[srcPos++];
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
    var properties = ['strokeStyle', 'fillStyle', 'fillRule', 'globalAlpha', 'lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'globalCompositeOperation', 'font'];

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
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.fillRule = 'nonzero';
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 10;
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = '10px sans-serif';

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

    if (subtype === 'Luminosity') {
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

  function composeSMask(ctx, smask, layerCtx, webGLContext) {
    var mask = smask.canvas;
    var maskCtx = smask.context;
    ctx.setTransform(smask.scaleX, 0, 0, smask.scaleY, smask.offsetX, smask.offsetY);
    var backdrop = smask.backdrop || null;

    if (!smask.transferMap && webGLContext.isEnabled) {
      let composed = webGLContext.composeSMask({
        layer: layerCtx.canvas,
        mask,
        properties: {
          subtype: smask.subtype,
          backdrop
        }
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(composed, smask.offsetX, smask.offsetY);
      return;
    }

    genericComposeSMask(maskCtx, layerCtx, mask.width, mask.height, smask.subtype, backdrop, smask.transferMap);
    ctx.drawImage(mask, 0, 0);
  }

  var LINE_CAP_STYLES = ['butt', 'round', 'square'];
  var LINE_JOIN_STYLES = ['miter', 'round', 'bevel'];
  var NORMAL_CLIP = {};
  var EO_CLIP = {};
  CanvasGraphics.prototype = {
    beginDrawing({
      transform,
      viewport,
      transparency = false,
      background = null
    }) {
      var width = this.ctx.canvas.width;
      var height = this.ctx.canvas.height;
      this.ctx.save();
      this.ctx.fillStyle = background || 'rgb(255, 255, 255)';
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.restore();

      if (transparency) {
        var transparentCanvas = this.cachedCanvases.getCanvas('transparent', width, height, true);
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

      if (this.imageLayer) {
        this.imageLayer.beginLayout();
      }
    },

    executeOperatorList: function CanvasGraphics_executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
      var argsArray = operatorList.argsArray;
      var fnArray = operatorList.fnArray;
      var i = executionStartIdx || 0;
      var argsArrayLen = argsArray.length;

      if (argsArrayLen === i) {
        return i;
      }

      var chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === 'function';
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
          for (const depObjId of argsArray[i]) {
            const objsPool = depObjId.startsWith('g_') ? commonObjs : objs;

            if (!objsPool.has(depObjId)) {
              objsPool.get(depObjId, continueCallback);
              return i;
            }
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
    },
    endDrawing: function CanvasGraphics_endDrawing() {
      if (this.current.activeSMask !== null) {
        this.endSMaskGroup();
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
      this.webGLContext.clear();

      if (this.imageLayer) {
        this.imageLayer.endLayout();
      }
    },
    setLineWidth: function CanvasGraphics_setLineWidth(width) {
      this.current.lineWidth = width;
      this.ctx.lineWidth = width;
    },
    setLineCap: function CanvasGraphics_setLineCap(style) {
      this.ctx.lineCap = LINE_CAP_STYLES[style];
    },
    setLineJoin: function CanvasGraphics_setLineJoin(style) {
      this.ctx.lineJoin = LINE_JOIN_STYLES[style];
    },
    setMiterLimit: function CanvasGraphics_setMiterLimit(limit) {
      this.ctx.miterLimit = limit;
    },
    setDash: function CanvasGraphics_setDash(dashArray, dashPhase) {
      var ctx = this.ctx;

      if (ctx.setLineDash !== undefined) {
        ctx.setLineDash(dashArray);
        ctx.lineDashOffset = dashPhase;
      }
    },

    setRenderingIntent(intent) {},

    setFlatness(flatness) {},

    setGState: function CanvasGraphics_setGState(states) {
      for (var i = 0, ii = states.length; i < ii; i++) {
        var state = states[i];
        var key = state[0];
        var value = state[1];

        switch (key) {
          case 'LW':
            this.setLineWidth(value);
            break;

          case 'LC':
            this.setLineCap(value);
            break;

          case 'LJ':
            this.setLineJoin(value);
            break;

          case 'ML':
            this.setMiterLimit(value);
            break;

          case 'D':
            this.setDash(value[0], value[1]);
            break;

          case 'RI':
            this.setRenderingIntent(value);
            break;

          case 'FL':
            this.setFlatness(value);
            break;

          case 'Font':
            this.setFont(value[0], value[1]);
            break;

          case 'CA':
            this.current.strokeAlpha = state[1];
            break;

          case 'ca':
            this.current.fillAlpha = state[1];
            this.ctx.globalAlpha = state[1];
            break;

          case 'BM':
            this.ctx.globalCompositeOperation = value;
            break;

          case 'SMask':
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
        }
      }
    },
    beginSMaskGroup: function CanvasGraphics_beginSMaskGroup() {
      var activeSMask = this.current.activeSMask;
      var drawnWidth = activeSMask.canvas.width;
      var drawnHeight = activeSMask.canvas.height;
      var cacheId = 'smaskGroupAt' + this.groupLevel;
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
      this.setGState([['BM', 'source-over'], ['ca', 1], ['CA', 1]]);
      this.groupStack.push(currentCtx);
      this.groupLevel++;
    },
    suspendSMaskGroup: function CanvasGraphics_endSMaskGroup() {
      var groupCtx = this.ctx;
      this.groupLevel--;
      this.ctx = this.groupStack.pop();
      composeSMask(this.ctx, this.current.activeSMask, groupCtx, this.webGLContext);
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
    },
    resumeSMaskGroup: function CanvasGraphics_endSMaskGroup() {
      var groupCtx = this.current.resumeSMaskCtx;
      var currentCtx = this.ctx;
      this.ctx = groupCtx;
      this.groupStack.push(currentCtx);
      this.groupLevel++;
    },
    endSMaskGroup: function CanvasGraphics_endSMaskGroup() {
      var groupCtx = this.ctx;
      this.groupLevel--;
      this.ctx = this.groupStack.pop();
      composeSMask(this.ctx, this.current.activeSMask, groupCtx, this.webGLContext);
      this.ctx.restore();
      copyCtxState(groupCtx, this.ctx);

      var deltaTransform = _util.Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);

      this.ctx.transform.apply(this.ctx, deltaTransform);
    },
    save: function CanvasGraphics_save() {
      this.ctx.save();
      var old = this.current;
      this.stateStack.push(old);
      this.current = old.clone();
      this.current.resumeSMaskCtx = null;
    },
    restore: function CanvasGraphics_restore() {
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
      }
    },
    transform: function CanvasGraphics_transform(a, b, c, d, e, f) {
      this.ctx.transform(a, b, c, d, e, f);
      this._cachedGetSinglePixelWidth = null;
    },
    constructPath: function CanvasGraphics_constructPath(ops, args) {
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

            if (width === 0) {
              width = this.getSinglePixelWidth();
            }

            if (height === 0) {
              height = this.getSinglePixelWidth();
            }

            var xw = x + width;
            var yh = y + height;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(xw, y);
            this.ctx.lineTo(xw, yh);
            this.ctx.lineTo(x, yh);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
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
    },
    closePath: function CanvasGraphics_closePath() {
      this.ctx.closePath();
    },
    stroke: function CanvasGraphics_stroke(consumePath) {
      consumePath = typeof consumePath !== 'undefined' ? consumePath : true;
      var ctx = this.ctx;
      var strokeColor = this.current.strokeColor;
      ctx.globalAlpha = this.current.strokeAlpha;

      if (strokeColor && strokeColor.hasOwnProperty('type') && strokeColor.type === 'Pattern') {
        ctx.save();
        let transform = ctx.mozCurrentTransform;

        const scale = _util.Util.singularValueDecompose2dScale(transform)[0];

        ctx.strokeStyle = strokeColor.getPattern(ctx, this);
        ctx.lineWidth = Math.max(this.getSinglePixelWidth() * MIN_WIDTH_FACTOR, this.current.lineWidth * scale);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.lineWidth = Math.max(this.getSinglePixelWidth() * MIN_WIDTH_FACTOR, this.current.lineWidth);
        ctx.stroke();
      }

      if (consumePath) {
        this.consumePath();
      }

      ctx.globalAlpha = this.current.fillAlpha;
    },
    closeStroke: function CanvasGraphics_closeStroke() {
      this.closePath();
      this.stroke();
    },
    fill: function CanvasGraphics_fill(consumePath) {
      consumePath = typeof consumePath !== 'undefined' ? consumePath : true;
      var ctx = this.ctx;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;
      var needRestore = false;

      if (isPatternFill) {
        ctx.save();

        if (this.baseTransform) {
          ctx.setTransform.apply(ctx, this.baseTransform);
        }

        ctx.fillStyle = fillColor.getPattern(ctx, this);
        needRestore = true;
      }

      if (this.pendingEOFill) {
        ctx.fill('evenodd');
        this.pendingEOFill = false;
      } else {
        ctx.fill();
      }

      if (needRestore) {
        ctx.restore();
      }

      if (consumePath) {
        this.consumePath();
      }
    },
    eoFill: function CanvasGraphics_eoFill() {
      this.pendingEOFill = true;
      this.fill();
    },
    fillStroke: function CanvasGraphics_fillStroke() {
      this.fill(false);
      this.stroke(false);
      this.consumePath();
    },
    eoFillStroke: function CanvasGraphics_eoFillStroke() {
      this.pendingEOFill = true;
      this.fillStroke();
    },
    closeFillStroke: function CanvasGraphics_closeFillStroke() {
      this.closePath();
      this.fillStroke();
    },
    closeEOFillStroke: function CanvasGraphics_closeEOFillStroke() {
      this.pendingEOFill = true;
      this.closePath();
      this.fillStroke();
    },
    endPath: function CanvasGraphics_endPath() {
      this.consumePath();
    },
    clip: function CanvasGraphics_clip() {
      this.pendingClip = NORMAL_CLIP;
    },
    eoClip: function CanvasGraphics_eoClip() {
      this.pendingClip = EO_CLIP;
    },
    beginText: function CanvasGraphics_beginText() {
      this.current.textMatrix = _util.IDENTITY_MATRIX;
      this.current.textMatrixScale = 1;
      this.current.x = this.current.lineX = 0;
      this.current.y = this.current.lineY = 0;
    },
    endText: function CanvasGraphics_endText() {
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
    },
    setCharSpacing: function CanvasGraphics_setCharSpacing(spacing) {
      this.current.charSpacing = spacing;
    },
    setWordSpacing: function CanvasGraphics_setWordSpacing(spacing) {
      this.current.wordSpacing = spacing;
    },
    setHScale: function CanvasGraphics_setHScale(scale) {
      this.current.textHScale = scale / 100;
    },
    setLeading: function CanvasGraphics_setLeading(leading) {
      this.current.leading = -leading;
    },
    setFont: function CanvasGraphics_setFont(fontRefName, size) {
      var fontObj = this.commonObjs.get(fontRefName);
      var current = this.current;

      if (!fontObj) {
        throw new Error(`Can't find font for ${fontRefName}`);
      }

      current.fontMatrix = fontObj.fontMatrix ? fontObj.fontMatrix : _util.FONT_IDENTITY_MATRIX;

      if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
        (0, _util.warn)('Invalid font matrix for font ' + fontRefName);
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

      var name = fontObj.loadedName || 'sans-serif';
      var bold = fontObj.black ? '900' : fontObj.bold ? 'bold' : 'normal';
      var italic = fontObj.italic ? 'italic' : 'normal';
      var typeface = `"${name}", ${fontObj.fallbackName}`;
      var browserFontSize = size < MIN_FONT_SIZE ? MIN_FONT_SIZE : size > MAX_FONT_SIZE ? MAX_FONT_SIZE : size;
      this.current.fontSizeScale = size / browserFontSize;
      this.ctx.font = `${italic} ${bold} ${browserFontSize}px ${typeface}`;
    },
    setTextRenderingMode: function CanvasGraphics_setTextRenderingMode(mode) {
      this.current.textRenderingMode = mode;
    },
    setTextRise: function CanvasGraphics_setTextRise(rise) {
      this.current.textRise = rise;
    },
    moveText: function CanvasGraphics_moveText(x, y) {
      this.current.x = this.current.lineX += x;
      this.current.y = this.current.lineY += y;
    },
    setLeadingMoveText: function CanvasGraphics_setLeadingMoveText(x, y) {
      this.setLeading(-y);
      this.moveText(x, y);
    },
    setTextMatrix: function CanvasGraphics_setTextMatrix(a, b, c, d, e, f) {
      this.current.textMatrix = [a, b, c, d, e, f];
      this.current.textMatrixScale = Math.sqrt(a * a + b * b);
      this.current.x = this.current.lineX = 0;
      this.current.y = this.current.lineY = 0;
    },
    nextLine: function CanvasGraphics_nextLine() {
      this.moveText(0, this.current.leading);
    },

    paintChar(character, x, y, patternTransform) {
      var ctx = this.ctx;
      var current = this.current;
      var font = current.font;
      var textRenderingMode = current.textRenderingMode;
      var fontSize = current.fontSize / current.fontSizeScale;
      var fillStrokeMode = textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;
      var isAddToPathSet = !!(textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);
      let patternFill = current.patternFill && font.data;
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
          ctx.stroke();
        }

        ctx.restore();
      } else {
        if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          ctx.fillText(character, x, y);
        }

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          ctx.strokeText(character, x, y);
        }
      }

      if (isAddToPathSet) {
        var paths = this.pendingTextPaths || (this.pendingTextPaths = []);
        paths.push({
          transform: ctx.mozCurrentTransform,
          x,
          y,
          fontSize,
          addToPath
        });
      }
    },

    get isFontSubpixelAAEnabled() {
      const {
        context: ctx
      } = this.cachedCanvases.getCanvas('isFontSubpixelAAEnabled', 10, 10);
      ctx.scale(1.5, 1);
      ctx.fillText('I', 0, 10);
      var data = ctx.getImageData(0, 0, 10, 10).data;
      var enabled = false;

      for (var i = 3; i < data.length; i += 4) {
        if (data[i] > 0 && data[i] < 255) {
          enabled = true;
          break;
        }
      }

      return (0, _util.shadow)(this, 'isFontSubpixelAAEnabled', enabled);
    },

    showText: function CanvasGraphics_showText(glyphs) {
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
      let patternTransform;

      if (current.patternFill) {
        ctx.save();
        let pattern = current.fillColor.getPattern(ctx, this);
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
      var scale = current.textMatrixScale;

      if (scale === 0 || lineWidth === 0) {
        var fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          this._cachedGetSinglePixelWidth = null;
          lineWidth = this.getSinglePixelWidth() * MIN_WIDTH_FACTOR;
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
        var scaledX, scaledY, scaledAccentX, scaledAccentY;
        var width = glyph.width;

        if (vertical) {
          var vmetric, vx, vy;
          vmetric = glyph.vmetric || defaultVMetrics;
          vx = glyph.vmetric ? vmetric[1] : width * 0.5;
          vx = -vx * widthAdvanceScale;
          vy = vmetric[2] * widthAdvanceScale;
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

        if (glyph.isInFont || font.missingFile) {
          if (simpleFillText && !accent) {
            ctx.fillText(character, scaledX, scaledY);
          } else {
            this.paintChar(character, scaledX, scaledY, patternTransform);

            if (accent) {
              scaledAccentX = scaledX + accent.offset.x / fontSizeScale;
              scaledAccentY = scaledY - accent.offset.y / fontSizeScale;
              this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform);
            }
          }
        }

        var charWidth = width * widthAdvanceScale + spacing * fontDirection;
        x += charWidth;

        if (restoreNeeded) {
          ctx.restore();
        }
      }

      if (vertical) {
        current.y -= x * textHScale;
      } else {
        current.x += x * textHScale;
      }

      ctx.restore();
    },
    showType3Text: function CanvasGraphics_showType3Text(glyphs) {
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
          (0, _util.warn)(`Type3 character "${glyph.operatorListId}" is not available.`);
          continue;
        }

        this.processingType3 = glyph;
        this.save();
        ctx.scale(fontSize, fontSize);
        ctx.transform.apply(ctx, fontMatrix);
        this.executeOperatorList(operatorList);
        this.restore();

        var transformed = _util.Util.applyTransform([glyph.width, 0], fontMatrix);

        width = transformed[0] * fontSize + spacing;
        ctx.translate(width, 0);
        current.x += width * textHScale;
      }

      ctx.restore();
      this.processingType3 = null;
    },
    setCharWidth: function CanvasGraphics_setCharWidth(xWidth, yWidth) {},
    setCharWidthAndBounds: function CanvasGraphics_setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
      this.ctx.rect(llx, lly, urx - llx, ury - lly);
      this.clip();
      this.endPath();
    },
    getColorN_Pattern: function CanvasGraphics_getColorN_Pattern(IR) {
      var pattern;

      if (IR[0] === 'TilingPattern') {
        var color = IR[1];
        var baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
        var canvasGraphicsFactory = {
          createCanvasGraphics: ctx => {
            return new CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext);
          }
        };
        pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
      } else {
        pattern = (0, _pattern_helper.getShadingPatternFromIR)(IR);
      }

      return pattern;
    },
    setStrokeColorN: function CanvasGraphics_setStrokeColorN() {
      this.current.strokeColor = this.getColorN_Pattern(arguments);
    },
    setFillColorN: function CanvasGraphics_setFillColorN() {
      this.current.fillColor = this.getColorN_Pattern(arguments);
      this.current.patternFill = true;
    },
    setStrokeRGBColor: function CanvasGraphics_setStrokeRGBColor(r, g, b) {
      var color = _util.Util.makeCssRgb(r, g, b);

      this.ctx.strokeStyle = color;
      this.current.strokeColor = color;
    },
    setFillRGBColor: function CanvasGraphics_setFillRGBColor(r, g, b) {
      var color = _util.Util.makeCssRgb(r, g, b);

      this.ctx.fillStyle = color;
      this.current.fillColor = color;
      this.current.patternFill = false;
    },
    shadingFill: function CanvasGraphics_shadingFill(patternIR) {
      var ctx = this.ctx;
      this.save();
      var pattern = (0, _pattern_helper.getShadingPatternFromIR)(patternIR);
      ctx.fillStyle = pattern.getPattern(ctx, this, true);
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
    },
    beginInlineImage: function CanvasGraphics_beginInlineImage() {
      (0, _util.unreachable)('Should not call beginInlineImage');
    },
    beginImageData: function CanvasGraphics_beginImageData() {
      (0, _util.unreachable)('Should not call beginImageData');
    },
    paintFormXObjectBegin: function CanvasGraphics_paintFormXObjectBegin(matrix, bbox) {
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
    },
    paintFormXObjectEnd: function CanvasGraphics_paintFormXObjectEnd() {
      this.restore();
      this.baseTransform = this.baseTransformStack.pop();
    },
    beginGroup: function CanvasGraphics_beginGroup(group) {
      this.save();
      var currentCtx = this.ctx;

      if (!group.isolated) {
        (0, _util.info)('TODO: Support non-isolated groups.');
      }

      if (group.knockout) {
        (0, _util.warn)('Knockout groups not supported.');
      }

      var currentTransform = currentCtx.mozCurrentTransform;

      if (group.matrix) {
        currentCtx.transform.apply(currentCtx, group.matrix);
      }

      if (!group.bbox) {
        throw new Error('Bounding box is required.');
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

      var cacheId = 'groupAt' + this.groupLevel;

      if (group.smask) {
        cacheId += '_smask_' + this.smaskCounter++ % 2;
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
          offsetX,
          offsetY,
          scaleX,
          scaleY,
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
      this.setGState([['BM', 'source-over'], ['ca', 1], ['CA', 1]]);
      this.groupStack.push(currentCtx);
      this.groupLevel++;
      this.current.activeSMask = null;
    },
    endGroup: function CanvasGraphics_endGroup(group) {
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
    },
    beginAnnotations: function CanvasGraphics_beginAnnotations() {
      this.save();

      if (this.baseTransform) {
        this.ctx.setTransform.apply(this.ctx, this.baseTransform);
      }
    },
    endAnnotations: function CanvasGraphics_endAnnotations() {
      this.restore();
    },
    beginAnnotation: function CanvasGraphics_beginAnnotation(rect, transform, matrix) {
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
    },
    endAnnotation: function CanvasGraphics_endAnnotation() {
      this.restore();
    },
    paintJpegXObject: function CanvasGraphics_paintJpegXObject(objId, w, h) {
      const domImage = this.processingType3 ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!domImage) {
        (0, _util.warn)('Dependent image isn\'t ready yet');
        return;
      }

      this.save();
      var ctx = this.ctx;
      ctx.scale(1 / w, -1 / h);
      ctx.drawImage(domImage, 0, 0, domImage.width, domImage.height, 0, -h, w, h);

      if (this.imageLayer) {
        var currentTransform = ctx.mozCurrentTransformInverse;
        var position = this.getCanvasPosition(0, 0);
        this.imageLayer.appendImage({
          objId,
          left: position[0],
          top: position[1],
          width: w / currentTransform[0],
          height: h / currentTransform[3]
        });
      }

      this.restore();
    },
    paintImageMaskXObject: function CanvasGraphics_paintImageMaskXObject(img) {
      var ctx = this.ctx;
      var width = img.width,
          height = img.height;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;
      var glyph = this.processingType3;

      if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {
        if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {
          glyph.compiled = compileType3Glyph({
            data: img.data,
            width,
            height
          });
        } else {
          glyph.compiled = null;
        }
      }

      if (glyph && glyph.compiled) {
        glyph.compiled(ctx);
        return;
      }

      var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
      var maskCtx = maskCanvas.context;
      maskCtx.save();
      putBinaryImageMask(maskCtx, img);
      maskCtx.globalCompositeOperation = 'source-in';
      maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
      maskCtx.fillRect(0, 0, width, height);
      maskCtx.restore();
      this.paintInlineImageXObject(maskCanvas.canvas);
    },
    paintImageMaskXObjectRepeat: function CanvasGraphics_paintImageMaskXObjectRepeat(imgData, scaleX, scaleY, positions) {
      var width = imgData.width;
      var height = imgData.height;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;
      var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
      var maskCtx = maskCanvas.context;
      maskCtx.save();
      putBinaryImageMask(maskCtx, imgData);
      maskCtx.globalCompositeOperation = 'source-in';
      maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
      maskCtx.fillRect(0, 0, width, height);
      maskCtx.restore();
      var ctx = this.ctx;

      for (var i = 0, ii = positions.length; i < ii; i += 2) {
        ctx.save();
        ctx.transform(scaleX, 0, 0, scaleY, positions[i], positions[i + 1]);
        ctx.scale(1, -1);
        ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
        ctx.restore();
      }
    },
    paintImageMaskXObjectGroup: function CanvasGraphics_paintImageMaskXObjectGroup(images) {
      var ctx = this.ctx;
      var fillColor = this.current.fillColor;
      var isPatternFill = this.current.patternFill;

      for (var i = 0, ii = images.length; i < ii; i++) {
        var image = images[i];
        var width = image.width,
            height = image.height;
        var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
        var maskCtx = maskCanvas.context;
        maskCtx.save();
        putBinaryImageMask(maskCtx, image);
        maskCtx.globalCompositeOperation = 'source-in';
        maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
        maskCtx.fillRect(0, 0, width, height);
        maskCtx.restore();
        ctx.save();
        ctx.transform.apply(ctx, image.transform);
        ctx.scale(1, -1);
        ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
        ctx.restore();
      }
    },
    paintImageXObject: function CanvasGraphics_paintImageXObject(objId) {
      const imgData = this.processingType3 ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)('Dependent image isn\'t ready yet');
        return;
      }

      this.paintInlineImageXObject(imgData);
    },
    paintImageXObjectRepeat: function CanvasGraphics_paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
      const imgData = this.processingType3 ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)('Dependent image isn\'t ready yet');
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
    },
    paintInlineImageXObject: function CanvasGraphics_paintInlineImageXObject(imgData) {
      var width = imgData.width;
      var height = imgData.height;
      var ctx = this.ctx;
      this.save();
      ctx.scale(1 / width, -1 / height);
      var currentTransform = ctx.mozCurrentTransformInverse;
      var a = currentTransform[0],
          b = currentTransform[1];
      var widthScale = Math.max(Math.sqrt(a * a + b * b), 1);
      var c = currentTransform[2],
          d = currentTransform[3];
      var heightScale = Math.max(Math.sqrt(c * c + d * d), 1);
      var imgToPaint, tmpCanvas;

      if (typeof HTMLElement === 'function' && imgData instanceof HTMLElement || !imgData.data) {
        imgToPaint = imgData;
      } else {
        tmpCanvas = this.cachedCanvases.getCanvas('inlineImage', width, height);
        var tmpCtx = tmpCanvas.context;
        putBinaryImageData(tmpCtx, imgData);
        imgToPaint = tmpCanvas.canvas;
      }

      var paintWidth = width,
          paintHeight = height;
      var tmpCanvasId = 'prescale1';

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
        tmpCtx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
        imgToPaint = tmpCanvas.canvas;
        paintWidth = newWidth;
        paintHeight = newHeight;
        tmpCanvasId = tmpCanvasId === 'prescale1' ? 'prescale2' : 'prescale1';
      }

      ctx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, -height, width, height);

      if (this.imageLayer) {
        var position = this.getCanvasPosition(0, -height);
        this.imageLayer.appendImage({
          imgData,
          left: position[0],
          top: position[1],
          width: width / currentTransform[0],
          height: height / currentTransform[3]
        });
      }

      this.restore();
    },
    paintInlineImageXObjectGroup: function CanvasGraphics_paintInlineImageXObjectGroup(imgData, map) {
      var ctx = this.ctx;
      var w = imgData.width;
      var h = imgData.height;
      var tmpCanvas = this.cachedCanvases.getCanvas('inlineImage', w, h);
      var tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData);

      for (var i = 0, ii = map.length; i < ii; i++) {
        var entry = map[i];
        ctx.save();
        ctx.transform.apply(ctx, entry.transform);
        ctx.scale(1, -1);
        ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);

        if (this.imageLayer) {
          var position = this.getCanvasPosition(entry.x, entry.y);
          this.imageLayer.appendImage({
            imgData,
            left: position[0],
            top: position[1],
            width: w,
            height: h
          });
        }

        ctx.restore();
      }
    },
    paintSolidColorImageMask: function CanvasGraphics_paintSolidColorImageMask() {
      this.ctx.fillRect(0, 0, 1, 1);
    },
    paintXObject: function CanvasGraphics_paintXObject() {
      (0, _util.warn)('Unsupported \'paintXObject\' command.');
    },
    markPoint: function CanvasGraphics_markPoint(tag) {},
    markPointProps: function CanvasGraphics_markPointProps(tag, properties) {},
    beginMarkedContent: function CanvasGraphics_beginMarkedContent(tag) {},
    beginMarkedContentProps: function CanvasGraphics_beginMarkedContentProps(tag, properties) {},
    endMarkedContent: function CanvasGraphics_endMarkedContent() {},
    beginCompat: function CanvasGraphics_beginCompat() {},
    endCompat: function CanvasGraphics_endCompat() {},
    consumePath: function CanvasGraphics_consumePath() {
      var ctx = this.ctx;

      if (this.pendingClip) {
        if (this.pendingClip === EO_CLIP) {
          ctx.clip('evenodd');
        } else {
          ctx.clip();
        }

        this.pendingClip = null;
      }

      ctx.beginPath();
    },

    getSinglePixelWidth(scale) {
      if (this._cachedGetSinglePixelWidth === null) {
        const inverse = this.ctx.mozCurrentTransformInverse;
        this._cachedGetSinglePixelWidth = Math.sqrt(Math.max(inverse[0] * inverse[0] + inverse[1] * inverse[1], inverse[2] * inverse[2] + inverse[3] * inverse[3]));
      }

      return this._cachedGetSinglePixelWidth;
    },

    getCanvasPosition: function CanvasGraphics_getCanvasPosition(x, y) {
      var transform = this.ctx.mozCurrentTransform;
      return [transform[0] * x + transform[2] * y + transform[4], transform[1] * x + transform[3] * y + transform[5]];
    }
  };

  for (var op in _util.OPS) {
    CanvasGraphics.prototype[_util.OPS[op]] = CanvasGraphics.prototype[op];
  }

  return CanvasGraphics;
}();

exports.CanvasGraphics = CanvasGraphics;

/***/ }),
/* 190 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShadingPatternFromIR = getShadingPatternFromIR;
exports.TilingPattern = void 0;

var _util = __w_pdfjs_require__(1);

var ShadingIRs = {};

function applyBoundingBox(ctx, bbox) {
  if (!bbox || typeof Path2D === 'undefined') {
    return;
  }

  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  const region = new Path2D();
  region.rect(bbox[0], bbox[1], width, height);
  ctx.clip(region);
}

ShadingIRs.RadialAxial = {
  fromIR: function RadialAxial_fromIR(raw) {
    var type = raw[1];
    var bbox = raw[2];
    var colorStops = raw[3];
    var p0 = raw[4];
    var p1 = raw[5];
    var r0 = raw[6];
    var r1 = raw[7];
    return {
      type: 'Pattern',
      getPattern: function RadialAxial_getPattern(ctx) {
        applyBoundingBox(ctx, bbox);
        var grad;

        if (type === 'axial') {
          grad = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
        } else if (type === 'radial') {
          grad = ctx.createRadialGradient(p0[0], p0[1], r0, p1[0], p1[1], r1);
        }

        for (var i = 0, ii = colorStops.length; i < ii; ++i) {
          var c = colorStops[i];
          grad.addColorStop(c[0], c[1]);
        }

        return grad;
      }
    };
  }
};

var createMeshCanvas = function createMeshCanvasClosure() {
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
    var k;

    for (var y = minY; y <= maxY; y++) {
      if (y < y2) {
        k = y < y1 ? 0 : y1 === y2 ? 1 : (y1 - y) / (y1 - y2);
        xa = x1 - (x1 - x2) * k;
        car = c1r - (c1r - c2r) * k;
        cag = c1g - (c1g - c2g) * k;
        cab = c1b - (c1b - c2b) * k;
      } else {
        k = y > y3 ? 1 : y2 === y3 ? 0 : (y2 - y) / (y2 - y3);
        xa = x2 - (x2 - x3) * k;
        car = c2r - (c2r - c3r) * k;
        cag = c2g - (c2g - c3g) * k;
        cab = c2b - (c2b - c3b) * k;
      }

      k = y < y1 ? 0 : y > y3 ? 1 : (y1 - y) / (y1 - y3);
      xb = x1 - (x1 - x3) * k;
      cbr = c1r - (c1r - c3r) * k;
      cbg = c1g - (c1g - c3g) * k;
      cbb = c1b - (c1b - c3b) * k;
      var x1_ = Math.round(Math.min(xa, xb));
      var x2_ = Math.round(Math.max(xa, xb));
      var j = rowSize * y + x1_ * 4;

      for (var x = x1_; x <= x2_; x++) {
        k = (xa - x) / (xa - xb);
        k = k < 0 ? 0 : k > 1 ? 1 : k;
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
      case 'lattice':
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

      case 'triangles':
        for (i = 0, ii = ps.length; i < ii; i += 3) {
          drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
        }

        break;

      default:
        throw new Error('illegal figure');
    }
  }

  function createMeshCanvas(bounds, combinesScale, coords, colors, figures, backgroundColor, cachedCanvases, webGLContext) {
    var EXPECTED_SCALE = 1.1;
    var MAX_PATTERN_SIZE = 3000;
    var BORDER_SIZE = 2;
    var offsetX = Math.floor(bounds[0]);
    var offsetY = Math.floor(bounds[1]);
    var boundsWidth = Math.ceil(bounds[2]) - offsetX;
    var boundsHeight = Math.ceil(bounds[3]) - offsetY;
    var width = Math.min(Math.ceil(Math.abs(boundsWidth * combinesScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    var height = Math.min(Math.ceil(Math.abs(boundsHeight * combinesScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    var scaleX = boundsWidth / width;
    var scaleY = boundsHeight / height;
    var context = {
      coords,
      colors,
      offsetX: -offsetX,
      offsetY: -offsetY,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    };
    var paddedWidth = width + BORDER_SIZE * 2;
    var paddedHeight = height + BORDER_SIZE * 2;
    var canvas, tmpCanvas, i, ii;

    if (webGLContext.isEnabled) {
      canvas = webGLContext.drawFigures({
        width,
        height,
        backgroundColor,
        figures,
        context
      });
      tmpCanvas = cachedCanvases.getCanvas('mesh', paddedWidth, paddedHeight, false);
      tmpCanvas.context.drawImage(canvas, BORDER_SIZE, BORDER_SIZE);
      canvas = tmpCanvas.canvas;
    } else {
      tmpCanvas = cachedCanvases.getCanvas('mesh', paddedWidth, paddedHeight, false);
      var tmpCtx = tmpCanvas.context;
      var data = tmpCtx.createImageData(width, height);

      if (backgroundColor) {
        var bytes = data.data;

        for (i = 0, ii = bytes.length; i < ii; i += 4) {
          bytes[i] = backgroundColor[0];
          bytes[i + 1] = backgroundColor[1];
          bytes[i + 2] = backgroundColor[2];
          bytes[i + 3] = 255;
        }
      }

      for (i = 0; i < figures.length; i++) {
        drawFigure(data, figures[i], context);
      }

      tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
      canvas = tmpCanvas.canvas;
    }

    return {
      canvas,
      offsetX: offsetX - BORDER_SIZE * scaleX,
      offsetY: offsetY - BORDER_SIZE * scaleY,
      scaleX,
      scaleY
    };
  }

  return createMeshCanvas;
}();

ShadingIRs.Mesh = {
  fromIR: function Mesh_fromIR(raw) {
    var coords = raw[2];
    var colors = raw[3];
    var figures = raw[4];
    var bounds = raw[5];
    var matrix = raw[6];
    var bbox = raw[7];
    var background = raw[8];
    return {
      type: 'Pattern',
      getPattern: function Mesh_getPattern(ctx, owner, shadingFill) {
        applyBoundingBox(ctx, bbox);
        var scale;

        if (shadingFill) {
          scale = _util.Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
        } else {
          scale = _util.Util.singularValueDecompose2dScale(owner.baseTransform);

          if (matrix) {
            var matrixScale = _util.Util.singularValueDecompose2dScale(matrix);

            scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
          }
        }

        var temporaryPatternCanvas = createMeshCanvas(bounds, scale, coords, colors, figures, shadingFill ? null : background, owner.cachedCanvases, owner.webGLContext);

        if (!shadingFill) {
          ctx.setTransform.apply(ctx, owner.baseTransform);

          if (matrix) {
            ctx.transform.apply(ctx, matrix);
          }
        }

        ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
        ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
        return ctx.createPattern(temporaryPatternCanvas.canvas, 'no-repeat');
      }
    };
  }
};
ShadingIRs.Dummy = {
  fromIR: function Dummy_fromIR() {
    return {
      type: 'Pattern',
      getPattern: function Dummy_fromIR_getPattern() {
        return 'hotpink';
      }
    };
  }
};

function getShadingPatternFromIR(raw) {
  var shadingIR = ShadingIRs[raw[0]];

  if (!shadingIR) {
    throw new Error(`Unknown IR type: ${raw[0]}`);
  }

  return shadingIR.fromIR(raw);
}

var TilingPattern = function TilingPatternClosure() {
  var PaintType = {
    COLORED: 1,
    UNCOLORED: 2
  };
  var MAX_PATTERN_SIZE = 3000;

  function TilingPattern(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
    this.operatorList = IR[2];
    this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];
    this.bbox = IR[4];
    this.xstep = IR[5];
    this.ystep = IR[6];
    this.paintType = IR[7];
    this.tilingType = IR[8];
    this.color = color;
    this.canvasGraphicsFactory = canvasGraphicsFactory;
    this.baseTransform = baseTransform;
    this.type = 'Pattern';
    this.ctx = ctx;
  }

  TilingPattern.prototype = {
    createPatternCanvas: function TilinPattern_createPatternCanvas(owner) {
      var operatorList = this.operatorList;
      var bbox = this.bbox;
      var xstep = this.xstep;
      var ystep = this.ystep;
      var paintType = this.paintType;
      var tilingType = this.tilingType;
      var color = this.color;
      var canvasGraphicsFactory = this.canvasGraphicsFactory;
      (0, _util.info)('TilingType: ' + tilingType);
      var x0 = bbox[0],
          y0 = bbox[1],
          x1 = bbox[2],
          y1 = bbox[3];

      var matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

      var curMatrixScale = _util.Util.singularValueDecompose2dScale(this.baseTransform);

      var combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
      var dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
      var dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
      var tmpCanvas = owner.cachedCanvases.getCanvas('pattern', dimx.size, dimy.size, true);
      var tmpCtx = tmpCanvas.context;
      var graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
      graphics.groupLevel = owner.groupLevel;
      this.setFillAndStrokeStyleToContext(graphics, paintType, color);
      graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
      graphics.transform(1, 0, 0, 1, -x0, -y0);
      this.clipBbox(graphics, bbox, x0, y0, x1, y1);
      graphics.executeOperatorList(operatorList);
      this.ctx.transform(1, 0, 0, 1, x0, y0);
      this.ctx.scale(1 / dimx.scale, 1 / dimy.scale);
      return tmpCanvas.canvas;
    },
    getSizeAndScale: function TilingPattern_getSizeAndScale(step, realOutputSize, scale) {
      step = Math.abs(step);
      var maxSize = Math.max(MAX_PATTERN_SIZE, realOutputSize);
      var size = Math.ceil(step * scale);

      if (size >= maxSize) {
        size = maxSize;
      } else {
        scale = size / step;
      }

      return {
        scale,
        size
      };
    },
    clipBbox: function clipBbox(graphics, bbox, x0, y0, x1, y1) {
      if (Array.isArray(bbox) && bbox.length === 4) {
        var bboxWidth = x1 - x0;
        var bboxHeight = y1 - y0;
        graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
        graphics.clip();
        graphics.endPath();
      }
    },
    setFillAndStrokeStyleToContext: function setFillAndStrokeStyleToContext(graphics, paintType, color) {
      let context = graphics.ctx,
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
          var cssColor = _util.Util.makeCssRgb(color[0], color[1], color[2]);

          context.fillStyle = cssColor;
          context.strokeStyle = cssColor;
          current.fillColor = cssColor;
          current.strokeColor = cssColor;
          break;

        default:
          throw new _util.FormatError(`Unsupported paint type: ${paintType}`);
      }
    },
    getPattern: function TilingPattern_getPattern(ctx, owner) {
      ctx = this.ctx;
      ctx.setTransform.apply(ctx, this.baseTransform);
      ctx.transform.apply(ctx, this.matrix);
      var temporaryPatternCanvas = this.createPatternCanvas(owner);
      return ctx.createPattern(temporaryPatternCanvas, 'repeat');
    }
  };
  return TilingPattern;
}();

exports.TilingPattern = TilingPattern;

/***/ }),
/* 191 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWorkerOptions = void 0;
const GlobalWorkerOptions = Object.create(null);
exports.GlobalWorkerOptions = GlobalWorkerOptions;
GlobalWorkerOptions.workerPort = GlobalWorkerOptions.workerPort === undefined ? null : GlobalWorkerOptions.workerPort;
GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc === undefined ? '' : GlobalWorkerOptions.workerSrc;

/***/ }),
/* 192 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageHandler = MessageHandler;

var _util = __w_pdfjs_require__(1);

const StreamKind = {
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
  if (typeof reason !== 'object') {
    return reason;
  }

  switch (reason.name) {
    case 'AbortException':
      return new _util.AbortException(reason.message);

    case 'MissingPDFException':
      return new _util.MissingPDFException(reason.message);

    case 'UnexpectedResponseException':
      return new _util.UnexpectedResponseException(reason.message, reason.status);

    case 'UnknownErrorException':
      return new _util.UnknownErrorException(reason.message, reason.details);

    default:
      return new _util.UnknownErrorException(reason.message, reason.toString());
  }
}

function MessageHandler(sourceName, targetName, comObj) {
  this.sourceName = sourceName;
  this.targetName = targetName;
  this.comObj = comObj;
  this.callbackId = 1;
  this.streamId = 1;
  this.postMessageTransfers = true;
  this.streamSinks = Object.create(null);
  this.streamControllers = Object.create(null);
  let callbacksCapabilities = this.callbacksCapabilities = Object.create(null);
  let ah = this.actionHandler = Object.create(null);

  this._onComObjOnMessage = event => {
    let data = event.data;

    if (data.targetName !== this.sourceName) {
      return;
    }

    if (data.stream) {
      this._processStreamMessage(data);
    } else if (data.isReply) {
      let callbackId = data.callbackId;

      if (data.callbackId in callbacksCapabilities) {
        let callback = callbacksCapabilities[callbackId];
        delete callbacksCapabilities[callbackId];

        if ('reason' in data) {
          callback.reject(wrapReason(data.reason));
        } else {
          callback.resolve(data.data);
        }
      } else {
        throw new Error(`Cannot resolve callback ${callbackId}`);
      }
    } else if (data.action in ah) {
      let action = ah[data.action];

      if (data.callbackId) {
        let sourceName = this.sourceName;
        let targetName = data.sourceName;
        new Promise(function (resolve) {
          resolve(action(data.data));
        }).then(function (result) {
          comObj.postMessage({
            sourceName,
            targetName,
            isReply: true,
            callbackId: data.callbackId,
            data: result
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName,
            targetName,
            isReply: true,
            callbackId: data.callbackId,
            reason: wrapReason(reason)
          });
        });
      } else if (data.streamId) {
        this._createStreamSink(data);
      } else {
        action(data.data);
      }
    } else {
      throw new Error(`Unknown action from worker: ${data.action}`);
    }
  };

  comObj.addEventListener('message', this._onComObjOnMessage);
}

MessageHandler.prototype = {
  on(actionName, handler) {
    var ah = this.actionHandler;

    if (ah[actionName]) {
      throw new Error(`There is already an actionName called "${actionName}"`);
    }

    ah[actionName] = handler;
  },

  send(actionName, data, transfers) {
    this.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: actionName,
      data
    }, transfers);
  },

  sendWithPromise(actionName, data, transfers) {
    var callbackId = this.callbackId++;
    var capability = (0, _util.createPromiseCapability)();
    this.callbacksCapabilities[callbackId] = capability;

    try {
      this.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        callbackId,
        data
      }, transfers);
    } catch (ex) {
      capability.reject(ex);
    }

    return capability.promise;
  },

  sendWithStream(actionName, data, queueingStrategy, transfers) {
    let streamId = this.streamId++;
    let sourceName = this.sourceName;
    let targetName = this.targetName;
    const comObj = this.comObj;
    return new _util.ReadableStream({
      start: controller => {
        let startCapability = (0, _util.createPromiseCapability)();
        this.streamControllers[streamId] = {
          controller,
          startCall: startCapability,
          pullCall: null,
          cancelCall: null,
          isClosed: false
        };
        this.postMessage({
          sourceName,
          targetName,
          action: actionName,
          streamId,
          data,
          desiredSize: controller.desiredSize
        }, transfers);
        return startCapability.promise;
      },
      pull: controller => {
        let pullCapability = (0, _util.createPromiseCapability)();
        this.streamControllers[streamId].pullCall = pullCapability;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL,
          streamId,
          desiredSize: controller.desiredSize
        });
        return pullCapability.promise;
      },
      cancel: reason => {
        (0, _util.assert)(reason instanceof Error, 'cancel must have a valid reason');
        let cancelCapability = (0, _util.createPromiseCapability)();
        this.streamControllers[streamId].cancelCall = cancelCapability;
        this.streamControllers[streamId].isClosed = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CANCEL,
          streamId,
          reason: wrapReason(reason)
        });
        return cancelCapability.promise;
      }
    }, queueingStrategy);
  },

  _createStreamSink(data) {
    let self = this;
    let action = this.actionHandler[data.action];
    let streamId = data.streamId;
    let desiredSize = data.desiredSize;
    let sourceName = this.sourceName;
    let targetName = data.sourceName;
    let capability = (0, _util.createPromiseCapability)();
    const comObj = this.comObj;
    let streamSink = {
      enqueue(chunk, size = 1, transfers) {
        if (this.isCancelled) {
          return;
        }

        let lastDesiredSize = this.desiredSize;
        this.desiredSize -= size;

        if (lastDesiredSize > 0 && this.desiredSize <= 0) {
          this.sinkCapability = (0, _util.createPromiseCapability)();
          this.ready = this.sinkCapability.promise;
        }

        self.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.ENQUEUE,
          streamId,
          chunk
        }, transfers);
      },

      close() {
        if (this.isCancelled) {
          return;
        }

        this.isCancelled = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CLOSE,
          streamId
        });
        delete self.streamSinks[streamId];
      },

      error(reason) {
        (0, _util.assert)(reason instanceof Error, 'error must have a valid reason');

        if (this.isCancelled) {
          return;
        }

        this.isCancelled = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.ERROR,
          streamId,
          reason: wrapReason(reason)
        });
      },

      sinkCapability: capability,
      onPull: null,
      onCancel: null,
      isCancelled: false,
      desiredSize,
      ready: null
    };
    streamSink.sinkCapability.resolve();
    streamSink.ready = streamSink.sinkCapability.promise;
    this.streamSinks[streamId] = streamSink;
    new Promise(function (resolve) {
      resolve(action(data.data, streamSink));
    }).then(function () {
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.START_COMPLETE,
        streamId,
        success: true
      });
    }, function (reason) {
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.START_COMPLETE,
        streamId,
        reason: wrapReason(reason)
      });
    });
  },

  _processStreamMessage(data) {
    let sourceName = this.sourceName;
    let targetName = data.sourceName;
    const streamId = data.streamId;
    const comObj = this.comObj;

    let deleteStreamController = () => {
      Promise.all([this.streamControllers[streamId].startCall, this.streamControllers[streamId].pullCall, this.streamControllers[streamId].cancelCall].map(function (capability) {
        return capability && capability.promise.catch(function () {});
      })).then(() => {
        delete this.streamControllers[streamId];
      });
    };

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
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            success: true
          });
          break;
        }

        if (this.streamSinks[streamId].desiredSize <= 0 && data.desiredSize > 0) {
          this.streamSinks[streamId].sinkCapability.resolve();
        }

        this.streamSinks[streamId].desiredSize = data.desiredSize;
        const {
          onPull
        } = this.streamSinks[data.streamId];
        new Promise(function (resolve) {
          resolve(onPull && onPull());
        }).then(function () {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            success: true
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            reason: wrapReason(reason)
          });
        });
        break;

      case StreamKind.ENQUEUE:
        (0, _util.assert)(this.streamControllers[streamId], 'enqueue should have stream controller');

        if (this.streamControllers[streamId].isClosed) {
          break;
        }

        this.streamControllers[streamId].controller.enqueue(data.chunk);
        break;

      case StreamKind.CLOSE:
        (0, _util.assert)(this.streamControllers[streamId], 'close should have stream controller');

        if (this.streamControllers[streamId].isClosed) {
          break;
        }

        this.streamControllers[streamId].isClosed = true;
        this.streamControllers[streamId].controller.close();
        deleteStreamController();
        break;

      case StreamKind.ERROR:
        (0, _util.assert)(this.streamControllers[streamId], 'error should have stream controller');
        this.streamControllers[streamId].controller.error(wrapReason(data.reason));
        deleteStreamController();
        break;

      case StreamKind.CANCEL_COMPLETE:
        if (data.success) {
          this.streamControllers[streamId].cancelCall.resolve();
        } else {
          this.streamControllers[streamId].cancelCall.reject(wrapReason(data.reason));
        }

        deleteStreamController();
        break;

      case StreamKind.CANCEL:
        if (!this.streamSinks[streamId]) {
          break;
        }

        const {
          onCancel
        } = this.streamSinks[data.streamId];
        new Promise(function (resolve) {
          resolve(onCancel && onCancel(wrapReason(data.reason)));
        }).then(function () {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId,
            success: true
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId,
            reason: wrapReason(reason)
          });
        });
        this.streamSinks[streamId].sinkCapability.reject(wrapReason(data.reason));
        this.streamSinks[streamId].isCancelled = true;
        delete this.streamSinks[streamId];
        break;

      default:
        throw new Error('Unexpected stream case');
    }
  },

  postMessage(message, transfers) {
    if (transfers && this.postMessageTransfers) {
      this.comObj.postMessage(message, transfers);
    } else {
      this.comObj.postMessage(message);
    }
  },

  destroy() {
    this.comObj.removeEventListener('message', this._onComObjOnMessage);
  }

};

/***/ }),
/* 193 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Metadata = void 0;

var _util = __w_pdfjs_require__(1);

var _xml_parser = __w_pdfjs_require__(194);

class Metadata {
  constructor(data) {
    (0, _util.assert)(typeof data === 'string', 'Metadata: input is not a string');
    data = this._repair(data);
    let parser = new _xml_parser.SimpleXMLParser();
    const xmlDocument = parser.parseFromString(data);
    this._metadata = Object.create(null);

    if (xmlDocument) {
      this._parse(xmlDocument);
    }
  }

  _repair(data) {
    return data.replace(/^([^<]+)/, '').replace(/>\\376\\377([^<]+)/g, function (all, codes) {
      let bytes = codes.replace(/\\([0-3])([0-7])([0-7])/g, function (code, d1, d2, d3) {
        return String.fromCharCode(d1 * 64 + d2 * 8 + d3 * 1);
      }).replace(/&(amp|apos|gt|lt|quot);/g, function (str, name) {
        switch (name) {
          case 'amp':
            return '&';

          case 'apos':
            return '\'';

          case 'gt':
            return '>';

          case 'lt':
            return '<';

          case 'quot':
            return '\"';
        }

        throw new Error(`_repair: ${name} isn't defined.`);
      });
      let chars = '';

      for (let i = 0, ii = bytes.length; i < ii; i += 2) {
        let code = bytes.charCodeAt(i) * 256 + bytes.charCodeAt(i + 1);

        if (code >= 32 && code < 127 && code !== 60 && code !== 62 && code !== 38) {
          chars += String.fromCharCode(code);
        } else {
          chars += '&#x' + (0x10000 + code).toString(16).substring(1) + ';';
        }
      }

      return '>' + chars;
    });
  }

  _parse(xmlDocument) {
    let rdf = xmlDocument.documentElement;

    if (rdf.nodeName.toLowerCase() !== 'rdf:rdf') {
      rdf = rdf.firstChild;

      while (rdf && rdf.nodeName.toLowerCase() !== 'rdf:rdf') {
        rdf = rdf.nextSibling;
      }
    }

    let nodeName = rdf ? rdf.nodeName.toLowerCase() : null;

    if (!rdf || nodeName !== 'rdf:rdf' || !rdf.hasChildNodes()) {
      return;
    }

    let children = rdf.childNodes;

    for (let i = 0, ii = children.length; i < ii; i++) {
      let desc = children[i];

      if (desc.nodeName.toLowerCase() !== 'rdf:description') {
        continue;
      }

      for (let j = 0, jj = desc.childNodes.length; j < jj; j++) {
        if (desc.childNodes[j].nodeName.toLowerCase() !== '#text') {
          let entry = desc.childNodes[j];
          let name = entry.nodeName.toLowerCase();
          this._metadata[name] = entry.textContent.trim();
        }
      }
    }
  }

  get(name) {
    const data = this._metadata[name];
    return typeof data !== 'undefined' ? data : null;
  }

  getAll() {
    return this._metadata;
  }

  has(name) {
    return typeof this._metadata[name] !== 'undefined';
  }

}

exports.Metadata = Metadata;

/***/ }),
/* 194 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleXMLParser = void 0;
const XMLParserErrorCode = {
  NoError: 0,
  EndOfDocument: -1,
  UnterminatedCdat: -2,
  UnterminatedXmlDeclaration: -3,
  UnterminatedDoctypeDeclaration: -4,
  UnterminatedComment: -5,
  MalformedElement: -6,
  OutOfMemory: -7,
  UnterminatedAttributeValue: -8,
  UnterminatedElement: -9,
  ElementNeverBegun: -10
};

function isWhitespace(s, index) {
  const ch = s[index];
  return ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t';
}

function isWhitespaceString(s) {
  for (let i = 0, ii = s.length; i < ii; i++) {
    if (!isWhitespace(s, i)) {
      return false;
    }
  }

  return true;
}

class XMLParserBase {
  _resolveEntities(s) {
    return s.replace(/&([^;]+);/g, (all, entity) => {
      if (entity.substring(0, 2) === '#x') {
        return String.fromCharCode(parseInt(entity.substring(2), 16));
      } else if (entity.substring(0, 1) === '#') {
        return String.fromCharCode(parseInt(entity.substring(1), 10));
      }

      switch (entity) {
        case 'lt':
          return '<';

        case 'gt':
          return '>';

        case 'amp':
          return '&';

        case 'quot':
          return '\"';
      }

      return this.onResolveEntity(entity);
    });
  }

  _parseContent(s, start) {
    let pos = start,
        name,
        attributes = [];

    function skipWs() {
      while (pos < s.length && isWhitespace(s, pos)) {
        ++pos;
      }
    }

    while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== '>' && s[pos] !== '/') {
      ++pos;
    }

    name = s.substring(start, pos);
    skipWs();

    while (pos < s.length && s[pos] !== '>' && s[pos] !== '/' && s[pos] !== '?') {
      skipWs();
      let attrName = '',
          attrValue = '';

      while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== '=') {
        attrName += s[pos];
        ++pos;
      }

      skipWs();

      if (s[pos] !== '=') {
        return null;
      }

      ++pos;
      skipWs();
      const attrEndChar = s[pos];

      if (attrEndChar !== '\"' && attrEndChar !== '\'') {
        return null;
      }

      const attrEndIndex = s.indexOf(attrEndChar, ++pos);

      if (attrEndIndex < 0) {
        return null;
      }

      attrValue = s.substring(pos, attrEndIndex);
      attributes.push({
        name: attrName,
        value: this._resolveEntities(attrValue)
      });
      pos = attrEndIndex + 1;
      skipWs();
    }

    return {
      name,
      attributes,
      parsed: pos - start
    };
  }

  _parseProcessingInstruction(s, start) {
    let pos = start,
        name,
        value;

    function skipWs() {
      while (pos < s.length && isWhitespace(s, pos)) {
        ++pos;
      }
    }

    while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== '>' && s[pos] !== '/') {
      ++pos;
    }

    name = s.substring(start, pos);
    skipWs();
    const attrStart = pos;

    while (pos < s.length && (s[pos] !== '?' || s[pos + 1] !== '>')) {
      ++pos;
    }

    value = s.substring(attrStart, pos);
    return {
      name,
      value,
      parsed: pos - start
    };
  }

  parseXml(s) {
    let i = 0;

    while (i < s.length) {
      const ch = s[i];
      let j = i;

      if (ch === '<') {
        ++j;
        const ch2 = s[j];
        let q;

        switch (ch2) {
          case '/':
            ++j;
            q = s.indexOf('>', j);

            if (q < 0) {
              this.onError(XMLParserErrorCode.UnterminatedElement);
              return;
            }

            this.onEndElement(s.substring(j, q));
            j = q + 1;
            break;

          case '?':
            ++j;

            const pi = this._parseProcessingInstruction(s, j);

            if (s.substring(j + pi.parsed, j + pi.parsed + 2) !== '?>') {
              this.onError(XMLParserErrorCode.UnterminatedXmlDeclaration);
              return;
            }

            this.onPi(pi.name, pi.value);
            j += pi.parsed + 2;
            break;

          case '!':
            if (s.substring(j + 1, j + 3) === '--') {
              q = s.indexOf('-->', j + 3);

              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedComment);
                return;
              }

              this.onComment(s.substring(j + 3, q));
              j = q + 3;
            } else if (s.substring(j + 1, j + 8) === '[CDATA[') {
              q = s.indexOf(']]>', j + 8);

              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedCdat);
                return;
              }

              this.onCdata(s.substring(j + 8, q));
              j = q + 3;
            } else if (s.substring(j + 1, j + 8) === 'DOCTYPE') {
              const q2 = s.indexOf('[', j + 8);
              let complexDoctype = false;
              q = s.indexOf('>', j + 8);

              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedDoctypeDeclaration);
                return;
              }

              if (q2 > 0 && q > q2) {
                q = s.indexOf(']>', j + 8);

                if (q < 0) {
                  this.onError(XMLParserErrorCode.UnterminatedDoctypeDeclaration);
                  return;
                }

                complexDoctype = true;
              }

              const doctypeContent = s.substring(j + 8, q + (complexDoctype ? 1 : 0));
              this.onDoctype(doctypeContent);
              j = q + (complexDoctype ? 2 : 1);
            } else {
              this.onError(XMLParserErrorCode.MalformedElement);
              return;
            }

            break;

          default:
            const content = this._parseContent(s, j);

            if (content === null) {
              this.onError(XMLParserErrorCode.MalformedElement);
              return;
            }

            let isClosed = false;

            if (s.substring(j + content.parsed, j + content.parsed + 2) === '/>') {
              isClosed = true;
            } else if (s.substring(j + content.parsed, j + content.parsed + 1) !== '>') {
              this.onError(XMLParserErrorCode.UnterminatedElement);
              return;
            }

            this.onBeginElement(content.name, content.attributes, isClosed);
            j += content.parsed + (isClosed ? 2 : 1);
            break;
        }
      } else {
        while (j < s.length && s[j] !== '<') {
          j++;
        }

        const text = s.substring(i, j);
        this.onText(this._resolveEntities(text));
      }

      i = j;
    }
  }

  onResolveEntity(name) {
    return `&${name};`;
  }

  onPi(name, value) {}

  onComment(text) {}

  onCdata(text) {}

  onDoctype(doctypeContent) {}

  onText(text) {}

  onBeginElement(name, attributes, isEmpty) {}

  onEndElement(name) {}

  onError(code) {}

}

class SimpleDOMNode {
  constructor(nodeName, nodeValue) {
    this.nodeName = nodeName;
    this.nodeValue = nodeValue;
    Object.defineProperty(this, 'parentNode', {
      value: null,
      writable: true
    });
  }

  get firstChild() {
    return this.childNodes && this.childNodes[0];
  }

  get nextSibling() {
    const childNodes = this.parentNode.childNodes;

    if (!childNodes) {
      return undefined;
    }

    const index = childNodes.indexOf(this);

    if (index === -1) {
      return undefined;
    }

    return childNodes[index + 1];
  }

  get textContent() {
    if (!this.childNodes) {
      return this.nodeValue || '';
    }

    return this.childNodes.map(function (child) {
      return child.textContent;
    }).join('');
  }

  hasChildNodes() {
    return this.childNodes && this.childNodes.length > 0;
  }

}

class SimpleXMLParser extends XMLParserBase {
  constructor() {
    super();
    this._currentFragment = null;
    this._stack = null;
    this._errorCode = XMLParserErrorCode.NoError;
  }

  parseFromString(data) {
    this._currentFragment = [];
    this._stack = [];
    this._errorCode = XMLParserErrorCode.NoError;
    this.parseXml(data);

    if (this._errorCode !== XMLParserErrorCode.NoError) {
      return undefined;
    }

    const [documentElement] = this._currentFragment;

    if (!documentElement) {
      return undefined;
    }

    return {
      documentElement
    };
  }

  onResolveEntity(name) {
    switch (name) {
      case 'apos':
        return '\'';
    }

    return super.onResolveEntity(name);
  }

  onText(text) {
    if (isWhitespaceString(text)) {
      return;
    }

    const node = new SimpleDOMNode('#text', text);

    this._currentFragment.push(node);
  }

  onCdata(text) {
    const node = new SimpleDOMNode('#text', text);

    this._currentFragment.push(node);
  }

  onBeginElement(name, attributes, isEmpty) {
    const node = new SimpleDOMNode(name);
    node.childNodes = [];

    this._currentFragment.push(node);

    if (isEmpty) {
      return;
    }

    this._stack.push(this._currentFragment);

    this._currentFragment = node.childNodes;
  }

  onEndElement(name) {
    this._currentFragment = this._stack.pop() || [];
    const lastElement = this._currentFragment[this._currentFragment.length - 1];

    if (!lastElement) {
      return;
    }

    for (let i = 0, ii = lastElement.childNodes.length; i < ii; i++) {
      lastElement.childNodes[i].parentNode = lastElement;
    }
  }

  onError(code) {
    this._errorCode = code;
  }

}

exports.SimpleXMLParser = SimpleXMLParser;

/***/ }),
/* 195 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFDataTransportStream = void 0;

var _util = __w_pdfjs_require__(1);

class PDFDataTransportStream {
  constructor(params, pdfDataRangeTransport) {
    (0, _util.assert)(pdfDataRangeTransport);
    this._queuedChunks = [];
    this._progressiveDone = params.progressiveDone || false;
    const initialData = params.initialData;

    if (initialData && initialData.length > 0) {
      const buffer = new Uint8Array(initialData).buffer;

      this._queuedChunks.push(buffer);
    }

    this._pdfDataRangeTransport = pdfDataRangeTransport;
    this._isStreamingSupported = !params.disableStream;
    this._isRangeSupported = !params.disableRange;
    this._contentLength = params.length;
    this._fullRequestReader = null;
    this._rangeReaders = [];

    this._pdfDataRangeTransport.addRangeListener((begin, chunk) => {
      this._onReceiveData({
        begin,
        chunk
      });
    });

    this._pdfDataRangeTransport.addProgressListener((loaded, total) => {
      this._onProgress({
        loaded,
        total
      });
    });

    this._pdfDataRangeTransport.addProgressiveReadListener(chunk => {
      this._onReceiveData({
        chunk
      });
    });

    this._pdfDataRangeTransport.addProgressiveDoneListener(() => {
      this._onProgressiveDone();
    });

    this._pdfDataRangeTransport.transportReady();
  }

  _onReceiveData(args) {
    const buffer = new Uint8Array(args.chunk).buffer;

    if (args.begin === undefined) {
      if (this._fullRequestReader) {
        this._fullRequestReader._enqueue(buffer);
      } else {
        this._queuedChunks.push(buffer);
      }
    } else {
      const found = this._rangeReaders.some(function (rangeReader) {
        if (rangeReader._begin !== args.begin) {
          return false;
        }

        rangeReader._enqueue(buffer);

        return true;
      });

      (0, _util.assert)(found);
    }
  }

  get _progressiveDataLength() {
    return this._fullRequestReader ? this._fullRequestReader._loaded : 0;
  }

  _onProgress(evt) {
    if (evt.total === undefined) {
      const firstReader = this._rangeReaders[0];

      if (firstReader && firstReader.onProgress) {
        firstReader.onProgress({
          loaded: evt.loaded
        });
      }
    } else {
      const fullReader = this._fullRequestReader;

      if (fullReader && fullReader.onProgress) {
        fullReader.onProgress({
          loaded: evt.loaded,
          total: evt.total
        });
      }
    }
  }

  _onProgressiveDone() {
    if (this._fullRequestReader) {
      this._fullRequestReader.progressiveDone();
    }

    this._progressiveDone = true;
  }

  _removeRangeReader(reader) {
    const i = this._rangeReaders.indexOf(reader);

    if (i >= 0) {
      this._rangeReaders.splice(i, 1);
    }
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader);
    const queuedChunks = this._queuedChunks;
    this._queuedChunks = null;
    return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone);
  }

  getRangeReader(begin, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }

    const reader = new PDFDataTransportStreamRangeReader(this, begin, end);

    this._pdfDataRangeTransport.requestDataRange(begin, end);

    this._rangeReaders.push(reader);

    return reader;
  }

  cancelAllRequests(reason) {
    if (this._fullRequestReader) {
      this._fullRequestReader.cancel(reason);
    }

    const readers = this._rangeReaders.slice(0);

    readers.forEach(function (rangeReader) {
      rangeReader.cancel(reason);
    });

    this._pdfDataRangeTransport.abort();
  }

}

exports.PDFDataTransportStream = PDFDataTransportStream;

class PDFDataTransportStreamReader {
  constructor(stream, queuedChunks, progressiveDone = false) {
    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = null;
    this._queuedChunks = queuedChunks || [];
    this._loaded = 0;

    for (const chunk of this._queuedChunks) {
      this._loaded += chunk.byteLength;
    }

    this._requests = [];
    this._headersReady = Promise.resolve();
    stream._fullRequestReader = this;
    this.onProgress = null;
  }

  _enqueue(chunk) {
    if (this._done) {
      return;
    }

    if (this._requests.length > 0) {
      const requestCapability = this._requests.shift();

      requestCapability.resolve({
        value: chunk,
        done: false
      });
    } else {
      this._queuedChunks.push(chunk);
    }

    this._loaded += chunk.byteLength;
  }

  get headersReady() {
    return this._headersReady;
  }

  get filename() {
    return this._filename;
  }

  get isRangeSupported() {
    return this._stream._isRangeSupported;
  }

  get isStreamingSupported() {
    return this._stream._isStreamingSupported;
  }

  get contentLength() {
    return this._stream._contentLength;
  }

  async read() {
    if (this._queuedChunks.length > 0) {
      const chunk = this._queuedChunks.shift();

      return {
        value: chunk,
        done: false
      };
    }

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    const requestCapability = (0, _util.createPromiseCapability)();

    this._requests.push(requestCapability);

    return requestCapability.promise;
  }

  cancel(reason) {
    this._done = true;

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];
  }

  progressiveDone() {
    if (this._done) {
      return;
    }

    this._done = true;
  }

}

class PDFDataTransportStreamRangeReader {
  constructor(stream, begin, end) {
    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  }

  _enqueue(chunk) {
    if (this._done) {
      return;
    }

    if (this._requests.length === 0) {
      this._queuedChunk = chunk;
    } else {
      const requestsCapability = this._requests.shift();

      requestsCapability.resolve({
        value: chunk,
        done: false
      });

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];
    }

    this._done = true;

    this._stream._removeRangeReader(this);
  }

  get isStreamingSupported() {
    return false;
  }

  async read() {
    if (this._queuedChunk) {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
      return {
        value: chunk,
        done: false
      };
    }

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    const requestCapability = (0, _util.createPromiseCapability)();

    this._requests.push(requestCapability);

    return requestCapability.promise;
  }

  cancel(reason) {
    this._done = true;

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];

    this._stream._removeRangeReader(this);
  }

}

/***/ }),
/* 196 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLContext = void 0;

var _util = __w_pdfjs_require__(1);

class WebGLContext {
  constructor({
    enable = false
  }) {
    this._enabled = enable === true;
  }

  get isEnabled() {
    let enabled = this._enabled;

    if (enabled) {
      enabled = WebGLUtils.tryInitGL();
    }

    return (0, _util.shadow)(this, 'isEnabled', enabled);
  }

  composeSMask({
    layer,
    mask,
    properties
  }) {
    return WebGLUtils.composeSMask(layer, mask, properties);
  }

  drawFigures({
    width,
    height,
    backgroundColor,
    figures,
    context
  }) {
    return WebGLUtils.drawFigures(width, height, backgroundColor, figures, context);
  }

  clear() {
    WebGLUtils.cleanup();
  }

}

exports.WebGLContext = WebGLContext;

var WebGLUtils = function WebGLUtilsClosure() {
  function loadShader(gl, code, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
      var errorMsg = gl.getShaderInfoLog(shader);
      throw new Error('Error during shader compilation: ' + errorMsg);
    }

    return shader;
  }

  function createVertexShader(gl, code) {
    return loadShader(gl, code, gl.VERTEX_SHADER);
  }

  function createFragmentShader(gl, code) {
    return loadShader(gl, code, gl.FRAGMENT_SHADER);
  }

  function createProgram(gl, shaders) {
    var program = gl.createProgram();

    for (var i = 0, ii = shaders.length; i < ii; ++i) {
      gl.attachShader(program, shaders[i]);
    }

    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!linked) {
      var errorMsg = gl.getProgramInfoLog(program);
      throw new Error('Error during program linking: ' + errorMsg);
    }

    return program;
  }

  function createTexture(gl, image, textureId) {
    gl.activeTexture(textureId);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return texture;
  }

  var currentGL, currentCanvas;

  function generateGL() {
    if (currentGL) {
      return;
    }

    currentCanvas = document.createElement('canvas');
    currentGL = currentCanvas.getContext('webgl', {
      premultipliedalpha: false
    });
  }

  var smaskVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec2 a_texCoord;                                    \
                                                                \
  uniform vec2 u_resolution;                                    \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;   \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_texCoord = a_texCoord;                                    \
  }                                                             ';
  var smaskFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  uniform vec4 u_backdrop;                                      \
  uniform int u_subtype;                                        \
  uniform sampler2D u_image;                                    \
  uniform sampler2D u_mask;                                     \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec4 imageColor = texture2D(u_image, v_texCoord);           \
    vec4 maskColor = texture2D(u_mask, v_texCoord);             \
    if (u_backdrop.a > 0.0) {                                   \
      maskColor.rgb = maskColor.rgb * maskColor.a +             \
                      u_backdrop.rgb * (1.0 - maskColor.a);     \
    }                                                           \
    float lum;                                                  \
    if (u_subtype == 0) {                                       \
      lum = maskColor.a;                                        \
    } else {                                                    \
      lum = maskColor.r * 0.3 + maskColor.g * 0.59 +            \
            maskColor.b * 0.11;                                 \
    }                                                           \
    imageColor.a *= lum;                                        \
    imageColor.rgb *= imageColor.a;                             \
    gl_FragColor = imageColor;                                  \
  }                                                             ';
  var smaskCache = null;

  function initSmaskGL() {
    var canvas, gl;
    generateGL();
    canvas = currentCanvas;
    currentCanvas = null;
    gl = currentGL;
    currentGL = null;
    var vertexShader = createVertexShader(gl, smaskVertexShaderCode);
    var fragmentShader = createFragmentShader(gl, smaskFragmentShaderCode);
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    var cache = {};
    cache.gl = gl;
    cache.canvas = canvas;
    cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    cache.positionLocation = gl.getAttribLocation(program, 'a_position');
    cache.backdropLocation = gl.getUniformLocation(program, 'u_backdrop');
    cache.subtypeLocation = gl.getUniformLocation(program, 'u_subtype');
    var texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    var texLayerLocation = gl.getUniformLocation(program, 'u_image');
    var texMaskLocation = gl.getUniformLocation(program, 'u_mask');
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(texLayerLocation, 0);
    gl.uniform1i(texMaskLocation, 1);
    smaskCache = cache;
  }

  function composeSMask(layer, mask, properties) {
    var width = layer.width,
        height = layer.height;

    if (!smaskCache) {
      initSmaskGL();
    }

    var cache = smaskCache,
        canvas = cache.canvas,
        gl = cache.gl;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform2f(cache.resolutionLocation, width, height);

    if (properties.backdrop) {
      gl.uniform4f(cache.resolutionLocation, properties.backdrop[0], properties.backdrop[1], properties.backdrop[2], 1);
    } else {
      gl.uniform4f(cache.resolutionLocation, 0, 0, 0, 0);
    }

    gl.uniform1i(cache.subtypeLocation, properties.subtype === 'Luminosity' ? 1 : 0);
    var texture = createTexture(gl, layer, gl.TEXTURE0);
    var maskTexture = createTexture(gl, mask, gl.TEXTURE1);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(cache.positionLocation);
    gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.flush();
    gl.deleteTexture(texture);
    gl.deleteTexture(maskTexture);
    gl.deleteBuffer(buffer);
    return canvas;
  }

  var figuresVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec3 a_color;                                       \
                                                                \
  uniform vec2 u_resolution;                                    \
  uniform vec2 u_scale;                                         \
  uniform vec2 u_offset;                                        \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    vec2 position = (a_position + u_offset) * u_scale;          \
    vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;     \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_color = vec4(a_color / 255.0, 1.0);                       \
  }                                                             ';
  var figuresFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    gl_FragColor = v_color;                                     \
  }                                                             ';
  var figuresCache = null;

  function initFiguresGL() {
    var canvas, gl;
    generateGL();
    canvas = currentCanvas;
    currentCanvas = null;
    gl = currentGL;
    currentGL = null;
    var vertexShader = createVertexShader(gl, figuresVertexShaderCode);
    var fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    var cache = {};
    cache.gl = gl;
    cache.canvas = canvas;
    cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    cache.scaleLocation = gl.getUniformLocation(program, 'u_scale');
    cache.offsetLocation = gl.getUniformLocation(program, 'u_offset');
    cache.positionLocation = gl.getAttribLocation(program, 'a_position');
    cache.colorLocation = gl.getAttribLocation(program, 'a_color');
    figuresCache = cache;
  }

  function drawFigures(width, height, backgroundColor, figures, context) {
    if (!figuresCache) {
      initFiguresGL();
    }

    var cache = figuresCache,
        canvas = cache.canvas,
        gl = cache.gl;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform2f(cache.resolutionLocation, width, height);
    var count = 0;
    var i, ii, rows;

    for (i = 0, ii = figures.length; i < ii; i++) {
      switch (figures[i].type) {
        case 'lattice':
          rows = figures[i].coords.length / figures[i].verticesPerRow | 0;
          count += (rows - 1) * (figures[i].verticesPerRow - 1) * 6;
          break;

        case 'triangles':
          count += figures[i].coords.length;
          break;
      }
    }

    var coords = new Float32Array(count * 2);
    var colors = new Uint8Array(count * 3);
    var coordsMap = context.coords,
        colorsMap = context.colors;
    var pIndex = 0,
        cIndex = 0;

    for (i = 0, ii = figures.length; i < ii; i++) {
      var figure = figures[i],
          ps = figure.coords,
          cs = figure.colors;

      switch (figure.type) {
        case 'lattice':
          var cols = figure.verticesPerRow;
          rows = ps.length / cols | 0;

          for (var row = 1; row < rows; row++) {
            var offset = row * cols + 1;

            for (var col = 1; col < cols; col++, offset++) {
              coords[pIndex] = coordsMap[ps[offset - cols - 1]];
              coords[pIndex + 1] = coordsMap[ps[offset - cols - 1] + 1];
              coords[pIndex + 2] = coordsMap[ps[offset - cols]];
              coords[pIndex + 3] = coordsMap[ps[offset - cols] + 1];
              coords[pIndex + 4] = coordsMap[ps[offset - 1]];
              coords[pIndex + 5] = coordsMap[ps[offset - 1] + 1];
              colors[cIndex] = colorsMap[cs[offset - cols - 1]];
              colors[cIndex + 1] = colorsMap[cs[offset - cols - 1] + 1];
              colors[cIndex + 2] = colorsMap[cs[offset - cols - 1] + 2];
              colors[cIndex + 3] = colorsMap[cs[offset - cols]];
              colors[cIndex + 4] = colorsMap[cs[offset - cols] + 1];
              colors[cIndex + 5] = colorsMap[cs[offset - cols] + 2];
              colors[cIndex + 6] = colorsMap[cs[offset - 1]];
              colors[cIndex + 7] = colorsMap[cs[offset - 1] + 1];
              colors[cIndex + 8] = colorsMap[cs[offset - 1] + 2];
              coords[pIndex + 6] = coords[pIndex + 2];
              coords[pIndex + 7] = coords[pIndex + 3];
              coords[pIndex + 8] = coords[pIndex + 4];
              coords[pIndex + 9] = coords[pIndex + 5];
              coords[pIndex + 10] = coordsMap[ps[offset]];
              coords[pIndex + 11] = coordsMap[ps[offset] + 1];
              colors[cIndex + 9] = colors[cIndex + 3];
              colors[cIndex + 10] = colors[cIndex + 4];
              colors[cIndex + 11] = colors[cIndex + 5];
              colors[cIndex + 12] = colors[cIndex + 6];
              colors[cIndex + 13] = colors[cIndex + 7];
              colors[cIndex + 14] = colors[cIndex + 8];
              colors[cIndex + 15] = colorsMap[cs[offset]];
              colors[cIndex + 16] = colorsMap[cs[offset] + 1];
              colors[cIndex + 17] = colorsMap[cs[offset] + 2];
              pIndex += 12;
              cIndex += 18;
            }
          }

          break;

        case 'triangles':
          for (var j = 0, jj = ps.length; j < jj; j++) {
            coords[pIndex] = coordsMap[ps[j]];
            coords[pIndex + 1] = coordsMap[ps[j] + 1];
            colors[cIndex] = colorsMap[cs[j]];
            colors[cIndex + 1] = colorsMap[cs[j] + 1];
            colors[cIndex + 2] = colorsMap[cs[j] + 2];
            pIndex += 2;
            cIndex += 3;
          }

          break;
      }
    }

    if (backgroundColor) {
      gl.clearColor(backgroundColor[0] / 255, backgroundColor[1] / 255, backgroundColor[2] / 255, 1.0);
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    var coordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(cache.positionLocation);
    gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
    var colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(cache.colorLocation);
    gl.vertexAttribPointer(cache.colorLocation, 3, gl.UNSIGNED_BYTE, false, 0, 0);
    gl.uniform2f(cache.scaleLocation, context.scaleX, context.scaleY);
    gl.uniform2f(cache.offsetLocation, context.offsetX, context.offsetY);
    gl.drawArrays(gl.TRIANGLES, 0, count);
    gl.flush();
    gl.deleteBuffer(coordsBuffer);
    gl.deleteBuffer(colorsBuffer);
    return canvas;
  }

  return {
    tryInitGL() {
      try {
        generateGL();
        return !!currentGL;
      } catch (ex) {}

      return false;
    },

    composeSMask,
    drawFigures,

    cleanup() {
      if (smaskCache && smaskCache.canvas) {
        smaskCache.canvas.width = 0;
        smaskCache.canvas.height = 0;
      }

      if (figuresCache && figuresCache.canvas) {
        figuresCache.canvas.width = 0;
        figuresCache.canvas.height = 0;
      }

      smaskCache = null;
      figuresCache = null;
    }

  };
}();

/***/ }),
/* 197 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTextLayer = void 0;

var _util = __w_pdfjs_require__(1);

var _global_scope = _interopRequireDefault(__w_pdfjs_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderTextLayer = function renderTextLayerClosure() {
  var MAX_TEXT_DIVS_TO_RENDER = 100000;
  var NonWhitespaceRegexp = /\S/;

  function isAllWhitespace(str) {
    return !NonWhitespaceRegexp.test(str);
  }

  function appendText(task, geom, styles) {
    var textDiv = document.createElement('span');
    var textDivProperties = {
      angle: 0,
      canvasWidth: 0,
      isWhitespace: false,
      originalTransform: null,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      scale: 1
    };

    task._textDivs.push(textDiv);

    if (isAllWhitespace(geom.str)) {
      textDivProperties.isWhitespace = true;

      task._textDivProperties.set(textDiv, textDivProperties);

      return;
    }

    var tx = _util.Util.transform(task._viewport.transform, geom.transform);

    var angle = Math.atan2(tx[1], tx[0]);
    var style = styles[geom.fontName];

    if (style.vertical) {
      angle += Math.PI / 2;
    }

    var fontHeight = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);
    var fontAscent = fontHeight;

    if (style.ascent) {
      fontAscent = style.ascent * fontAscent;
    } else if (style.descent) {
      fontAscent = (1 + style.descent) * fontAscent;
    }

    let left, top;

    if (angle === 0) {
      left = tx[4];
      top = tx[5] - fontAscent;
    } else {
      left = tx[4] + fontAscent * Math.sin(angle);
      top = tx[5] - fontAscent * Math.cos(angle);
    }

    textDiv.style.left = `${left}px`;
    textDiv.style.top = `${top}px`;
    textDiv.style.fontSize = `${fontHeight}px`;
    textDiv.style.fontFamily = style.fontFamily;
    textDiv.textContent = geom.str;

    if (task._fontInspectorEnabled) {
      textDiv.dataset.fontName = geom.fontName;
    }

    if (angle !== 0) {
      textDivProperties.angle = angle * (180 / Math.PI);
    }

    if (geom.str.length > 1) {
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

    if (task._enhanceTextSelection) {
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
        m
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
      points.forEach(function (p, i) {
        var t = _util.Util.applyTransform(p, m);

        ts[i + 0] = c && (e.left - t[0]) / c;
        ts[i + 4] = s && (e.top - t[1]) / s;
        ts[i + 8] = c && (e.right - t[0]) / c;
        ts[i + 12] = s && (e.bottom - t[1]) / s;
        ts[i + 16] = s && (e.left - t[0]) / -s;
        ts[i + 20] = c && (e.top - t[1]) / c;
        ts[i + 24] = s && (e.right - t[0]) / -s;
        ts[i + 28] = c && (e.bottom - t[1]) / c;
        ts[i + 32] = c && (e.left - t[0]) / -c;
        ts[i + 36] = s && (e.top - t[1]) / -s;
        ts[i + 40] = c && (e.right - t[0]) / -c;
        ts[i + 44] = s && (e.bottom - t[1]) / -s;
        ts[i + 48] = s && (e.left - t[0]) / s;
        ts[i + 52] = c && (e.top - t[1]) / -c;
        ts[i + 56] = s && (e.right - t[0]) / s;
        ts[i + 60] = c && (e.bottom - t[1]) / -c;
      });

      var findPositiveMin = function (ts, offset, count) {
        var result = 0;

        for (var i = 0; i < count; i++) {
          var t = ts[offset++];

          if (t > 0) {
            result = result ? Math.min(t, result) : t;
          }
        }

        return result;
      };

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
    bounds.forEach(function (b) {
      var i = b.index;
      expanded[i] = {
        left: b.x1New,
        top: 0,
        right: b.x2New,
        bottom: 0
      };
    });
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
    bounds.forEach(function (b) {
      var i = b.index;
      expanded[i].top = b.x1New;
      expanded[i].bottom = b.x2New;
    });
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
    bounds.forEach(function (boundary) {
      var i = 0;

      while (i < horizon.length && horizon[i].end <= boundary.y1) {
        i++;
      }

      var j = horizon.length - 1;

      while (j >= 0 && horizon[j].start >= boundary.y2) {
        j--;
      }

      var horizonPart, affectedBoundary;
      var q,
          k,
          maxXNew = -Infinity;

      for (q = i; q <= j; q++) {
        horizonPart = horizon[q];
        affectedBoundary = horizonPart.boundary;
        var xNew;

        if (affectedBoundary.x2 > boundary.x1) {
          xNew = affectedBoundary.index > boundary.index ? affectedBoundary.x1New : boundary.x1;
        } else if (affectedBoundary.x2New === undefined) {
          xNew = (affectedBoundary.x2 + boundary.x1) / 2;
        } else {
          xNew = affectedBoundary.x2New;
        }

        if (xNew > maxXNew) {
          maxXNew = xNew;
        }
      }

      boundary.x1New = maxXNew;

      for (q = i; q <= j; q++) {
        horizonPart = horizon[q];
        affectedBoundary = horizonPart.boundary;

        if (affectedBoundary.x2New === undefined) {
          if (affectedBoundary.x2 > boundary.x1) {
            if (affectedBoundary.index > boundary.index) {
              affectedBoundary.x2New = affectedBoundary.x2;
            }
          } else {
            affectedBoundary.x2New = maxXNew;
          }
        } else if (affectedBoundary.x2New > maxXNew) {
          affectedBoundary.x2New = Math.max(maxXNew, affectedBoundary.x2);
        }
      }

      var changedHorizon = [],
          lastBoundary = null;

      for (q = i; q <= j; q++) {
        horizonPart = horizon[q];
        affectedBoundary = horizonPart.boundary;
        var useBoundary = affectedBoundary.x2 > boundary.x2 ? affectedBoundary : boundary;

        if (lastBoundary === useBoundary) {
          changedHorizon[changedHorizon.length - 1].end = horizonPart.end;
        } else {
          changedHorizon.push({
            start: horizonPart.start,
            end: horizonPart.end,
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
        horizonPart = horizon[q];
        affectedBoundary = horizonPart.boundary;

        if (affectedBoundary.x2New !== undefined) {
          continue;
        }

        var used = false;

        for (k = i - 1; !used && k >= 0 && horizon[k].start >= affectedBoundary.y1; k--) {
          used = horizon[k].boundary === affectedBoundary;
        }

        for (k = j + 1; !used && k < horizon.length && horizon[k].end <= affectedBoundary.y2; k++) {
          used = horizon[k].boundary === affectedBoundary;
        }

        for (k = 0; !used && k < changedHorizon.length; k++) {
          used = changedHorizon[k].boundary === affectedBoundary;
        }

        if (!used) {
          affectedBoundary.x2New = maxXNew;
        }
      }

      Array.prototype.splice.apply(horizon, [i, j - i + 1].concat(changedHorizon));
    });
    horizon.forEach(function (horizonPart) {
      var affectedBoundary = horizonPart.boundary;

      if (affectedBoundary.x2New === undefined) {
        affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
      }
    });
  }

  function TextLayerRenderTask({
    textContent,
    textContentStream,
    container,
    viewport,
    textDivs,
    textContentItemsStr,
    enhanceTextSelection
  }) {
    this._textContent = textContent;
    this._textContentStream = textContentStream;
    this._container = container;
    this._viewport = viewport;
    this._textDivs = textDivs || [];
    this._textContentItemsStr = textContentItemsStr || [];
    this._enhanceTextSelection = !!enhanceTextSelection;
    this._fontInspectorEnabled = !!(_global_scope.default.FontInspector && _global_scope.default.FontInspector.enabled);
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

    this._capability.promise.finally(() => {
      if (this._layoutTextCtx) {
        this._layoutTextCtx.canvas.width = 0;
        this._layoutTextCtx.canvas.height = 0;
        this._layoutTextCtx = null;
      }
    }).catch(() => {});
  }

  TextLayerRenderTask.prototype = {
    get promise() {
      return this._capability.promise;
    },

    cancel: function TextLayer_cancel() {
      this._canceled = true;

      if (this._reader) {
        this._reader.cancel(new _util.AbortException('TextLayer task cancelled.'));

        this._reader = null;
      }

      if (this._renderTimer !== null) {
        clearTimeout(this._renderTimer);
        this._renderTimer = null;
      }

      this._capability.reject(new Error('TextLayer task cancelled.'));
    },

    _processItems(items, styleCache) {
      for (let i = 0, len = items.length; i < len; i++) {
        this._textContentItemsStr.push(items[i].str);

        appendText(this, items[i], styleCache);
      }
    },

    _layoutText(textDiv) {
      const textDivProperties = this._textDivProperties.get(textDiv);

      if (textDivProperties.isWhitespace) {
        return;
      }

      let transform = '';

      if (textDivProperties.canvasWidth !== 0) {
        const {
          fontSize,
          fontFamily
        } = textDiv.style;

        if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
          this._layoutTextCtx.font = `${fontSize} ${fontFamily}`;
          this._layoutTextLastFontSize = fontSize;
          this._layoutTextLastFontFamily = fontFamily;
        }

        const {
          width
        } = this._layoutTextCtx.measureText(textDiv.textContent);

        if (width > 0) {
          textDivProperties.scale = textDivProperties.canvasWidth / width;
          transform = `scaleX(${textDivProperties.scale})`;
        }
      }

      if (textDivProperties.angle !== 0) {
        transform = `rotate(${textDivProperties.angle}deg) ${transform}`;
      }

      if (transform.length > 0) {
        if (this._enhanceTextSelection) {
          textDivProperties.originalTransform = transform;
        }

        textDiv.style.transform = transform;
      }

      this._textDivProperties.set(textDiv, textDivProperties);

      this._container.appendChild(textDiv);
    },

    _render: function TextLayer_render(timeout) {
      let capability = (0, _util.createPromiseCapability)();
      let styleCache = Object.create(null);
      let canvas = document.createElement('canvas');
      canvas.mozOpaque = true;
      this._layoutTextCtx = canvas.getContext('2d', {
        alpha: false
      });

      if (this._textContent) {
        let textItems = this._textContent.items;
        let textStyles = this._textContent.styles;

        this._processItems(textItems, textStyles);

        capability.resolve();
      } else if (this._textContentStream) {
        let pump = () => {
          this._reader.read().then(({
            value,
            done
          }) => {
            if (done) {
              capability.resolve();
              return;
            }

            Object.assign(styleCache, value.styles);

            this._processItems(value.items, styleCache);

            pump();
          }, capability.reject);
        };

        this._reader = this._textContentStream.getReader();
        pump();
      } else {
        throw new Error('Neither "textContent" nor "textContentStream"' + ' parameters specified.');
      }

      capability.promise.then(() => {
        styleCache = null;

        if (!timeout) {
          render(this);
        } else {
          this._renderTimer = setTimeout(() => {
            render(this);
            this._renderTimer = null;
          }, timeout);
        }
      }, this._capability.reject);
    },
    expandTextDivs: function TextLayer_expandTextDivs(expandDivs) {
      if (!this._enhanceTextSelection || !this._renderingDone) {
        return;
      }

      if (this._bounds !== null) {
        expand(this);
        this._bounds = null;
      }

      const NO_PADDING = '0 0 0 0';
      const transformBuf = [],
            paddingBuf = [];

      for (var i = 0, ii = this._textDivs.length; i < ii; i++) {
        const div = this._textDivs[i];

        const divProps = this._textDivProperties.get(div);

        if (divProps.isWhitespace) {
          continue;
        }

        if (expandDivs) {
          transformBuf.length = 0;
          paddingBuf.length = 0;

          if (divProps.originalTransform) {
            transformBuf.push(divProps.originalTransform);
          }

          if (divProps.paddingTop > 0) {
            paddingBuf.push(`${divProps.paddingTop}px`);
            transformBuf.push(`translateY(${-divProps.paddingTop}px)`);
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingRight > 0) {
            paddingBuf.push(`${divProps.paddingRight / divProps.scale}px`);
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingBottom > 0) {
            paddingBuf.push(`${divProps.paddingBottom}px`);
          } else {
            paddingBuf.push(0);
          }

          if (divProps.paddingLeft > 0) {
            paddingBuf.push(`${divProps.paddingLeft / divProps.scale}px`);
            transformBuf.push(`translateX(${-divProps.paddingLeft / divProps.scale}px)`);
          } else {
            paddingBuf.push(0);
          }

          const padding = paddingBuf.join(' ');

          if (padding !== NO_PADDING) {
            div.style.padding = padding;
          }

          if (transformBuf.length) {
            div.style.transform = transformBuf.join(' ');
          }
        } else {
          div.style.padding = null;
          div.style.transform = divProps.originalTransform;
        }
      }
    }
  };

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

  return renderTextLayer;
}();

exports.renderTextLayer = renderTextLayer;

/***/ }),
/* 198 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationLayer = void 0;

var _display_utils = __w_pdfjs_require__(186);

var _util = __w_pdfjs_require__(1);

class AnnotationElementFactory {
  static create(parameters) {
    const subtype = parameters.data.annotationType;

    switch (subtype) {
      case _util.AnnotationType.LINK:
        return new LinkAnnotationElement(parameters);

      case _util.AnnotationType.TEXT:
        return new TextAnnotationElement(parameters);

      case _util.AnnotationType.WIDGET:
        const fieldType = parameters.data.fieldType;

        switch (fieldType) {
          case 'Tx':
            return new TextWidgetAnnotationElement(parameters);

          case 'Btn':
            if (parameters.data.radioButton) {
              return new RadioButtonWidgetAnnotationElement(parameters);
            } else if (parameters.data.checkBox) {
              return new CheckboxWidgetAnnotationElement(parameters);
            }

            return new PushButtonWidgetAnnotationElement(parameters);

          case 'Ch':
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

}

class AnnotationElement {
  constructor(parameters, isRenderable = false, ignoreBorder = false) {
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

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }
  }

  _createContainer(ignoreBorder = false) {
    const data = this.data,
          page = this.page,
          viewport = this.viewport;
    const container = document.createElement('section');
    let width = data.rect[2] - data.rect[0];
    let height = data.rect[3] - data.rect[1];
    container.setAttribute('data-annotation-id', data.id);

    const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

    container.style.transform = `matrix(${viewport.transform.join(',')})`;
    container.style.transformOrigin = `-${rect[0]}px -${rect[1]}px`;

    if (!ignoreBorder && data.borderStyle.width > 0) {
      container.style.borderWidth = `${data.borderStyle.width}px`;

      if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
        width = width - 2 * data.borderStyle.width;
        height = height - 2 * data.borderStyle.width;
      }

      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;

      if (horizontalRadius > 0 || verticalRadius > 0) {
        const radius = `${horizontalRadius}px / ${verticalRadius}px`;
        container.style.borderRadius = radius;
      }

      switch (data.borderStyle.style) {
        case _util.AnnotationBorderStyleType.SOLID:
          container.style.borderStyle = 'solid';
          break;

        case _util.AnnotationBorderStyleType.DASHED:
          container.style.borderStyle = 'dashed';
          break;

        case _util.AnnotationBorderStyleType.BEVELED:
          (0, _util.warn)('Unimplemented border style: beveled');
          break;

        case _util.AnnotationBorderStyleType.INSET:
          (0, _util.warn)('Unimplemented border style: inset');
          break;

        case _util.AnnotationBorderStyleType.UNDERLINE:
          container.style.borderBottomStyle = 'solid';
          break;

        default:
          break;
      }

      if (data.color) {
        container.style.borderColor = _util.Util.makeCssRgb(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
      } else {
        container.style.borderWidth = 0;
      }
    }

    container.style.left = `${rect[0]}px`;
    container.style.top = `${rect[1]}px`;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    return container;
  }

  _createPopup(container, trigger, data) {
    if (!trigger) {
      trigger = document.createElement('div');
      trigger.style.height = container.style.height;
      trigger.style.width = container.style.width;
      container.appendChild(trigger);
    }

    const popupElement = new PopupElement({
      container,
      trigger,
      color: data.color,
      title: data.title,
      modificationDate: data.modificationDate,
      contents: data.contents,
      hideWrapper: true
    });
    const popup = popupElement.render();
    popup.style.left = container.style.width;
    container.appendChild(popup);
  }

  render() {
    (0, _util.unreachable)('Abstract method `AnnotationElement.render` called');
  }

}

class LinkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action);
    super(parameters, isRenderable);
  }

  render() {
    this.container.className = 'linkAnnotation';
    const {
      data,
      linkService
    } = this;
    const link = document.createElement('a');

    if (data.url) {
      (0, _display_utils.addLinkAttributes)(link, {
        url: data.url,
        target: data.newWindow ? _display_utils.LinkTarget.BLANK : linkService.externalLinkTarget,
        rel: linkService.externalLinkRel,
        enabled: linkService.externalLinkEnabled
      });
    } else if (data.action) {
      this._bindNamedAction(link, data.action);
    } else {
      this._bindLink(link, data.dest);
    }

    this.container.appendChild(link);
    return this.container;
  }

  _bindLink(link, destination) {
    link.href = this.linkService.getDestinationHash(destination);

    link.onclick = () => {
      if (destination) {
        this.linkService.navigateTo(destination);
      }

      return false;
    };

    if (destination) {
      link.className = 'internalLink';
    }
  }

  _bindNamedAction(link, action) {
    link.href = this.linkService.getAnchorUrl('');

    link.onclick = () => {
      this.linkService.executeNamedAction(action);
      return false;
    };

    link.className = 'internalLink';
  }

}

class TextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable);
  }

  render() {
    this.container.className = 'textAnnotation';
    const image = document.createElement('img');
    image.style.height = this.container.style.height;
    image.style.width = this.container.style.width;
    image.src = this.imageResourcesPath + 'annotation-' + this.data.name.toLowerCase() + '.svg';
    image.alt = '[{{type}} Annotation]';
    image.dataset.l10nId = 'text_annotation_type';
    image.dataset.l10nArgs = JSON.stringify({
      type: this.data.name
    });

    if (!this.data.hasPopup) {
      this._createPopup(this.container, image, this.data);
    }

    this.container.appendChild(image);
    return this.container;
  }

}

class WidgetAnnotationElement extends AnnotationElement {
  render() {
    return this.container;
  }

}

class TextWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    const isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, isRenderable);
  }

  render() {
    const TEXT_ALIGNMENT = ['left', 'center', 'right'];
    this.container.className = 'textWidgetAnnotation';
    let element = null;

    if (this.renderInteractiveForms) {
      if (this.data.multiLine) {
        element = document.createElement('textarea');
        element.textContent = this.data.fieldValue;
      } else {
        element = document.createElement('input');
        element.type = 'text';
        element.setAttribute('value', this.data.fieldValue);
      }

      element.disabled = this.data.readOnly;

      if (this.data.maxLen !== null) {
        element.maxLength = this.data.maxLen;
      }

      if (this.data.comb) {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / this.data.maxLen;
        element.classList.add('comb');
        element.style.letterSpacing = `calc(${combWidth}px - 1ch)`;
      }
    } else {
      element = document.createElement('div');
      element.textContent = this.data.fieldValue;
      element.style.verticalAlign = 'middle';
      element.style.display = 'table-cell';
      let font = null;

      if (this.data.fontRefName && this.page.commonObjs.has(this.data.fontRefName)) {
        font = this.page.commonObjs.get(this.data.fontRefName);
      }

      this._setTextStyle(element, font);
    }

    if (this.data.textAlignment !== null) {
      element.style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    }

    this.container.appendChild(element);
    return this.container;
  }

  _setTextStyle(element, font) {
    const style = element.style;
    style.fontSize = `${this.data.fontSize}px`;
    style.direction = this.data.fontDirection < 0 ? 'rtl' : 'ltr';

    if (!font) {
      return;
    }

    style.fontWeight = font.black ? font.bold ? '900' : 'bold' : font.bold ? 'bold' : 'normal';
    style.fontStyle = font.italic ? 'italic' : 'normal';
    const fontFamily = font.loadedName ? `"${font.loadedName}", ` : '';
    const fallbackName = font.fallbackName || 'Helvetica, sans-serif';
    style.fontFamily = fontFamily + fallbackName;
  }

}

class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, parameters.renderInteractiveForms);
  }

  render() {
    this.container.className = 'buttonWidgetAnnotation checkBox';
    const element = document.createElement('input');
    element.disabled = this.data.readOnly;
    element.type = 'checkbox';

    if (this.data.fieldValue && this.data.fieldValue !== 'Off') {
      element.setAttribute('checked', true);
    }

    this.container.appendChild(element);
    return this.container;
  }

}

class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, parameters.renderInteractiveForms);
  }

  render() {
    this.container.className = 'buttonWidgetAnnotation radioButton';
    const element = document.createElement('input');
    element.disabled = this.data.readOnly;
    element.type = 'radio';
    element.name = this.data.fieldName;

    if (this.data.fieldValue === this.data.buttonValue) {
      element.setAttribute('checked', true);
    }

    this.container.appendChild(element);
    return this.container;
  }

}

class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
  render() {
    const container = super.render();
    container.className = 'buttonWidgetAnnotation pushButton';
    return container;
  }

}

class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, parameters.renderInteractiveForms);
  }

  render() {
    this.container.className = 'choiceWidgetAnnotation';
    const selectElement = document.createElement('select');
    selectElement.disabled = this.data.readOnly;

    if (!this.data.combo) {
      selectElement.size = this.data.options.length;

      if (this.data.multiSelect) {
        selectElement.multiple = true;
      }
    }

    for (const option of this.data.options) {
      const optionElement = document.createElement('option');
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;

      if (this.data.fieldValue.includes(option.displayValue)) {
        optionElement.setAttribute('selected', true);
      }

      selectElement.appendChild(optionElement);
    }

    this.container.appendChild(selectElement);
    return this.container;
  }

}

class PopupAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable);
  }

  render() {
    const IGNORE_TYPES = ['Line', 'Square', 'Circle', 'PolyLine', 'Polygon', 'Ink'];
    this.container.className = 'popupAnnotation';

    if (IGNORE_TYPES.includes(this.data.parentType)) {
      return this.container;
    }

    const selector = `[data-annotation-id="${this.data.parentId}"]`;
    const parentElement = this.layer.querySelector(selector);

    if (!parentElement) {
      return this.container;
    }

    const popup = new PopupElement({
      container: this.container,
      trigger: parentElement,
      color: this.data.color,
      title: this.data.title,
      modificationDate: this.data.modificationDate,
      contents: this.data.contents
    });
    const parentLeft = parseFloat(parentElement.style.left);
    const parentWidth = parseFloat(parentElement.style.width);
    this.container.style.transformOrigin = `-${parentLeft + parentWidth}px -${parentElement.style.top}`;
    this.container.style.left = `${parentLeft + parentWidth}px`;
    this.container.appendChild(popup.render());
    return this.container;
  }

}

class PopupElement {
  constructor(parameters) {
    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.title = parameters.title;
    this.modificationDate = parameters.modificationDate;
    this.contents = parameters.contents;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  render() {
    const BACKGROUND_ENLIGHT = 0.7;
    const wrapper = document.createElement('div');
    wrapper.className = 'popupWrapper';
    this.hideElement = this.hideWrapper ? wrapper : this.container;
    this.hideElement.setAttribute('hidden', true);
    const popup = document.createElement('div');
    popup.className = 'popup';
    const color = this.color;

    if (color) {
      const r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
      const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
      const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
      popup.style.backgroundColor = _util.Util.makeCssRgb(r | 0, g | 0, b | 0);
    }

    const title = document.createElement('h1');
    title.textContent = this.title;
    popup.appendChild(title);

    const dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

    if (dateObject) {
      const modificationDate = document.createElement('span');
      modificationDate.textContent = '{{date}}, {{time}}';
      modificationDate.dataset.l10nId = 'annotation_date_string';
      modificationDate.dataset.l10nArgs = JSON.stringify({
        date: dateObject.toLocaleDateString(),
        time: dateObject.toLocaleTimeString()
      });
      popup.appendChild(modificationDate);
    }

    const contents = this._formatContents(this.contents);

    popup.appendChild(contents);
    this.trigger.addEventListener('click', this._toggle.bind(this));
    this.trigger.addEventListener('mouseover', this._show.bind(this, false));
    this.trigger.addEventListener('mouseout', this._hide.bind(this, false));
    popup.addEventListener('click', this._hide.bind(this, true));
    wrapper.appendChild(popup);
    return wrapper;
  }

  _formatContents(contents) {
    const p = document.createElement('p');
    const lines = contents.split(/(?:\r\n?|\n)/);

    for (let i = 0, ii = lines.length; i < ii; ++i) {
      const line = lines[i];
      p.appendChild(document.createTextNode(line));

      if (i < ii - 1) {
        p.appendChild(document.createElement('br'));
      }
    }

    return p;
  }

  _toggle() {
    if (this.pinned) {
      this._hide(true);
    } else {
      this._show(true);
    }
  }

  _show(pin = false) {
    if (pin) {
      this.pinned = true;
    }

    if (this.hideElement.hasAttribute('hidden')) {
      this.hideElement.removeAttribute('hidden');
      this.container.style.zIndex += 1;
    }
  }

  _hide(unpin = true) {
    if (unpin) {
      this.pinned = false;
    }

    if (!this.hideElement.hasAttribute('hidden') && !this.pinned) {
      this.hideElement.setAttribute('hidden', true);
      this.container.style.zIndex -= 1;
    }
  }

}

class FreeTextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'freeTextAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class LineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'lineAnnotation';
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const line = this.svgFactory.createElement('svg:line');
    line.setAttribute('x1', data.rect[2] - data.lineCoordinates[0]);
    line.setAttribute('y1', data.rect[3] - data.lineCoordinates[1]);
    line.setAttribute('x2', data.rect[2] - data.lineCoordinates[2]);
    line.setAttribute('y2', data.rect[3] - data.lineCoordinates[3]);
    line.setAttribute('stroke-width', data.borderStyle.width);
    line.setAttribute('stroke', 'transparent');
    svg.appendChild(line);
    this.container.append(svg);

    this._createPopup(this.container, line, data);

    return this.container;
  }

}

class SquareAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'squareAnnotation';
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const square = this.svgFactory.createElement('svg:rect');
    square.setAttribute('x', borderWidth / 2);
    square.setAttribute('y', borderWidth / 2);
    square.setAttribute('width', width - borderWidth);
    square.setAttribute('height', height - borderWidth);
    square.setAttribute('stroke-width', borderWidth);
    square.setAttribute('stroke', 'transparent');
    square.setAttribute('fill', 'none');
    svg.appendChild(square);
    this.container.append(svg);

    this._createPopup(this.container, square, data);

    return this.container;
  }

}

class CircleAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'circleAnnotation';
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const circle = this.svgFactory.createElement('svg:ellipse');
    circle.setAttribute('cx', width / 2);
    circle.setAttribute('cy', height / 2);
    circle.setAttribute('rx', width / 2 - borderWidth / 2);
    circle.setAttribute('ry', height / 2 - borderWidth / 2);
    circle.setAttribute('stroke-width', borderWidth);
    circle.setAttribute('stroke', 'transparent');
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);
    this.container.append(svg);

    this._createPopup(this.container, circle, data);

    return this.container;
  }

}

class PolylineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
    this.containerClassName = 'polylineAnnotation';
    this.svgElementName = 'svg:polyline';
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    let points = [];

    for (const coordinate of data.vertices) {
      const x = coordinate.x - data.rect[0];
      const y = data.rect[3] - coordinate.y;
      points.push(x + ',' + y);
    }

    points = points.join(' ');
    const polyline = this.svgFactory.createElement(this.svgElementName);
    polyline.setAttribute('points', points);
    polyline.setAttribute('stroke-width', data.borderStyle.width);
    polyline.setAttribute('stroke', 'transparent');
    polyline.setAttribute('fill', 'none');
    svg.appendChild(polyline);
    this.container.append(svg);

    this._createPopup(this.container, polyline, data);

    return this.container;
  }

}

class PolygonAnnotationElement extends PolylineAnnotationElement {
  constructor(parameters) {
    super(parameters);
    this.containerClassName = 'polygonAnnotation';
    this.svgElementName = 'svg:polygon';
  }

}

class CaretAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'caretAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class InkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
    this.containerClassName = 'inkAnnotation';
    this.svgElementName = 'svg:polyline';
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);

    for (const inkList of data.inkLists) {
      let points = [];

      for (const coordinate of inkList) {
        const x = coordinate.x - data.rect[0];
        const y = data.rect[3] - coordinate.y;
        points.push(`${x},${y}`);
      }

      points = points.join(' ');
      const polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute('points', points);
      polyline.setAttribute('stroke-width', data.borderStyle.width);
      polyline.setAttribute('stroke', 'transparent');
      polyline.setAttribute('fill', 'none');

      this._createPopup(this.container, polyline, data);

      svg.appendChild(polyline);
    }

    this.container.append(svg);
    return this.container;
  }

}

class HighlightAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'highlightAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class UnderlineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'underlineAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class SquigglyAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'squigglyAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class StrikeOutAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'strikeoutAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class StampAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, isRenderable, true);
  }

  render() {
    this.container.className = 'stampAnnotation';

    if (!this.data.hasPopup) {
      this._createPopup(this.container, null, this.data);
    }

    return this.container;
  }

}

class FileAttachmentAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    super(parameters, true);
    const {
      filename,
      content
    } = this.data.file;
    this.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    this.content = content;

    if (this.linkService.eventBus) {
      this.linkService.eventBus.dispatch('fileattachmentannotation', {
        source: this,
        id: (0, _util.stringToPDFString)(filename),
        filename,
        content
      });
    }
  }

  render() {
    this.container.className = 'fileAttachmentAnnotation';
    const trigger = document.createElement('div');
    trigger.style.height = this.container.style.height;
    trigger.style.width = this.container.style.width;
    trigger.addEventListener('dblclick', this._download.bind(this));

    if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
      this._createPopup(this.container, trigger, this.data);
    }

    this.container.appendChild(trigger);
    return this.container;
  }

  _download() {
    if (!this.downloadManager) {
      (0, _util.warn)('Download cannot be started due to unavailable download manager');
      return;
    }

    this.downloadManager.downloadData(this.content, this.filename, '');
  }

}

class AnnotationLayer {
  static render(parameters) {
    for (const data of parameters.annotations) {
      if (!data) {
        continue;
      }

      const element = AnnotationElementFactory.create({
        data,
        layer: parameters.div,
        page: parameters.page,
        viewport: parameters.viewport,
        linkService: parameters.linkService,
        downloadManager: parameters.downloadManager,
        imageResourcesPath: parameters.imageResourcesPath || '',
        renderInteractiveForms: parameters.renderInteractiveForms || false,
        svgFactory: new _display_utils.DOMSVGFactory()
      });

      if (element.isRenderable) {
        parameters.div.appendChild(element.render());
      }
    }
  }

  static update(parameters) {
    for (const data of parameters.annotations) {
      const element = parameters.div.querySelector(`[data-annotation-id="${data.id}"]`);

      if (element) {
        element.style.transform = `matrix(${parameters.viewport.transform.join(',')})`;
      }
    }

    parameters.div.removeAttribute('hidden');
  }

}

exports.AnnotationLayer = AnnotationLayer;

/***/ }),
/* 199 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGGraphics = void 0;

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(186);

var _is_node = _interopRequireDefault(__w_pdfjs_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SVGGraphics = function () {
  throw new Error('Not implemented: SVGGraphics');
};

exports.SVGGraphics = SVGGraphics;
{
  const SVG_DEFAULTS = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fillColor: '#000000'
  };
  const XML_NS = 'http://www.w3.org/XML/1998/namespace';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const LINE_CAP_STYLES = ['butt', 'round', 'square'];
  const LINE_JOIN_STYLES = ['miter', 'round', 'bevel'];

  const convertImgDataToPng = function () {
    const PNG_HEADER = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const CHUNK_WRAPPER_SIZE = 12;
    const crcTable = new Int32Array(256);

    for (let i = 0; i < 256; i++) {
      let c = i;

      for (let h = 0; h < 8; h++) {
        if (c & 1) {
          c = 0xedB88320 ^ c >> 1 & 0x7fffffff;
        } else {
          c = c >> 1 & 0x7fffffff;
        }
      }

      crcTable[i] = c;
    }

    function crc32(data, start, end) {
      let crc = -1;

      for (let i = start; i < end; i++) {
        const a = (crc ^ data[i]) & 0xff;
        const b = crcTable[a];
        crc = crc >>> 8 ^ b;
      }

      return crc ^ -1;
    }

    function writePngChunk(type, body, data, offset) {
      let p = offset;
      const len = body.length;
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
      const crc = crc32(data, offset + 4, p);
      data[p] = crc >> 24 & 0xff;
      data[p + 1] = crc >> 16 & 0xff;
      data[p + 2] = crc >> 8 & 0xff;
      data[p + 3] = crc & 0xff;
    }

    function adler32(data, start, end) {
      let a = 1;
      let b = 0;

      for (let i = start; i < end; ++i) {
        a = (a + (data[i] & 0xff)) % 65521;
        b = (b + a) % 65521;
      }

      return b << 16 | a;
    }

    function deflateSync(literals) {
      if (!(0, _is_node.default)()) {
        return deflateSyncUncompressed(literals);
      }

      try {
        let input;

        if (parseInt(process.versions.node) >= 8) {
          input = literals;
        } else {
          input = new Buffer(literals);
        }

throw Error("zlib not available in the browser");

        return output instanceof Uint8Array ? output : new Uint8Array(output);
      } catch (e) {
        (0, _util.warn)('Not compressing PNG because zlib.deflateSync is unavailable: ' + e);
      }

      return deflateSyncUncompressed(literals);
    }

    function deflateSyncUncompressed(literals) {
      let len = literals.length;
      const maxBlockLength = 0xFFFF;
      const deflateBlocks = Math.ceil(len / maxBlockLength);
      const idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);
      let pi = 0;
      idat[pi++] = 0x78;
      idat[pi++] = 0x9c;
      let pos = 0;

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
      const adler = adler32(literals, 0, literals.length);
      idat[pi++] = adler >> 24 & 0xff;
      idat[pi++] = adler >> 16 & 0xff;
      idat[pi++] = adler >> 8 & 0xff;
      idat[pi++] = adler & 0xff;
      return idat;
    }

    function encode(imgData, kind, forceDataSchema, isMask) {
      const width = imgData.width;
      const height = imgData.height;
      let bitDepth, colorType, lineSize;
      const bytes = imgData.data;

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
          throw new Error('invalid format');
      }

      const literals = new Uint8Array((1 + lineSize) * height);
      let offsetLiterals = 0,
          offsetBytes = 0;

      for (let y = 0; y < height; ++y) {
        literals[offsetLiterals++] = 0;
        literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize), offsetLiterals);
        offsetBytes += lineSize;
        offsetLiterals += lineSize;
      }

      if (kind === _util.ImageKind.GRAYSCALE_1BPP && isMask) {
        offsetLiterals = 0;

        for (let y = 0; y < height; y++) {
          offsetLiterals++;

          for (let i = 0; i < lineSize; i++) {
            literals[offsetLiterals++] ^= 0xFF;
          }
        }
      }

      const ihdr = new Uint8Array([width >> 24 & 0xff, width >> 16 & 0xff, width >> 8 & 0xff, width & 0xff, height >> 24 & 0xff, height >> 16 & 0xff, height >> 8 & 0xff, height & 0xff, bitDepth, colorType, 0x00, 0x00, 0x00]);
      const idat = deflateSync(literals);
      const pngLength = PNG_HEADER.length + CHUNK_WRAPPER_SIZE * 3 + ihdr.length + idat.length;
      const data = new Uint8Array(pngLength);
      let offset = 0;
      data.set(PNG_HEADER, offset);
      offset += PNG_HEADER.length;
      writePngChunk('IHDR', ihdr, data, offset);
      offset += CHUNK_WRAPPER_SIZE + ihdr.length;
      writePngChunk('IDATA', idat, data, offset);
      offset += CHUNK_WRAPPER_SIZE + idat.length;
      writePngChunk('IEND', new Uint8Array(0), data, offset);
      return (0, _util.createObjectURL)(data, 'image/png', forceDataSchema);
    }

    return function convertImgDataToPng(imgData, forceDataSchema, isMask) {
      const kind = imgData.kind === undefined ? _util.ImageKind.GRAYSCALE_1BPP : imgData.kind;
      return encode(imgData, kind, forceDataSchema, isMask);
    };
  }();

  class SVGExtraState {
    constructor() {
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
      this.strokeColor = '#000000';
      this.fillAlpha = 1;
      this.strokeAlpha = 1;
      this.lineWidth = 1;
      this.lineJoin = '';
      this.lineCap = '';
      this.miterLimit = 0;
      this.dashArray = [];
      this.dashPhase = 0;
      this.dependencies = [];
      this.activeClipUrl = null;
      this.clipGroup = null;
      this.maskId = '';
    }

    clone() {
      return Object.create(this);
    }

    setCurrentPoint(x, y) {
      this.x = x;
      this.y = y;
    }

  }

  function opListToTree(opList) {
    let opTree = [];
    const tmp = [];

    for (const opListElement of opList) {
      if (opListElement.fn === 'save') {
        opTree.push({
          'fnId': 92,
          'fn': 'group',
          'items': []
        });
        tmp.push(opTree);
        opTree = opTree[opTree.length - 1].items;
        continue;
      }

      if (opListElement.fn === 'restore') {
        opTree = tmp.pop();
      } else {
        opTree.push(opListElement);
      }
    }

    return opTree;
  }

  function pf(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }

    const s = value.toFixed(10);
    let i = s.length - 1;

    if (s[i] !== '0') {
      return s;
    }

    do {
      i--;
    } while (s[i] === '0');

    return s.substring(0, s[i] === '.' ? i : i + 1);
  }

  function pm(m) {
    if (m[4] === 0 && m[5] === 0) {
      if (m[1] === 0 && m[2] === 0) {
        if (m[0] === 1 && m[3] === 1) {
          return '';
        }

        return `scale(${pf(m[0])} ${pf(m[3])})`;
      }

      if (m[0] === m[3] && m[1] === -m[2]) {
        const a = Math.acos(m[0]) * 180 / Math.PI;
        return `rotate(${pf(a)})`;
      }
    } else {
      if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
        return `translate(${pf(m[4])} ${pf(m[5])})`;
      }
    }

    return `matrix(${pf(m[0])} ${pf(m[1])} ${pf(m[2])} ${pf(m[3])} ${pf(m[4])} ` + `${pf(m[5])})`;
  }

  let clipCount = 0;
  let maskCount = 0;
  let shadingCount = 0;
  exports.SVGGraphics = SVGGraphics = class SVGGraphics {
    constructor(commonObjs, objs, forceDataSchema) {
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

      for (const op in _util.OPS) {
        this._operatorIdMapping[_util.OPS[op]] = op;
      }
    }

    save() {
      this.transformStack.push(this.transformMatrix);
      const old = this.current;
      this.extraStack.push(old);
      this.current = old.clone();
    }

    restore() {
      this.transformMatrix = this.transformStack.pop();
      this.current = this.extraStack.pop();
      this.pendingClip = null;
      this.tgrp = null;
    }

    group(items) {
      this.save();
      this.executeOpTree(items);
      this.restore();
    }

    loadDependencies(operatorList) {
      const fnArray = operatorList.fnArray;
      const argsArray = operatorList.argsArray;

      for (let i = 0, ii = fnArray.length; i < ii; i++) {
        if (fnArray[i] !== _util.OPS.dependency) {
          continue;
        }

        for (const obj of argsArray[i]) {
          const objsPool = obj.startsWith('g_') ? this.commonObjs : this.objs;
          const promise = new Promise(resolve => {
            objsPool.get(obj, resolve);
          });
          this.current.dependencies.push(promise);
        }
      }

      return Promise.all(this.current.dependencies);
    }

    transform(a, b, c, d, e, f) {
      const transformMatrix = [a, b, c, d, e, f];
      this.transformMatrix = _util.Util.transform(this.transformMatrix, transformMatrix);
      this.tgrp = null;
    }

    getSVG(operatorList, viewport) {
      this.viewport = viewport;

      const svgElement = this._initialize(viewport);

      return this.loadDependencies(operatorList).then(() => {
        this.transformMatrix = _util.IDENTITY_MATRIX;
        this.executeOpTree(this.convertOpList(operatorList));
        return svgElement;
      });
    }

    convertOpList(operatorList) {
      const operatorIdMapping = this._operatorIdMapping;
      const argsArray = operatorList.argsArray;
      const fnArray = operatorList.fnArray;
      const opList = [];

      for (let i = 0, ii = fnArray.length; i < ii; i++) {
        const fnId = fnArray[i];
        opList.push({
          'fnId': fnId,
          'fn': operatorIdMapping[fnId],
          'args': argsArray[i]
        });
      }

      return opListToTree(opList);
    }

    executeOpTree(opTree) {
      for (const opTreeElement of opTree) {
        const fn = opTreeElement.fn;
        const fnId = opTreeElement.fnId;
        const args = opTreeElement.args;

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
            this.clip('nonzero');
            break;

          case _util.OPS.eoClip:
            this.clip('evenodd');
            break;

          case _util.OPS.paintSolidColorImageMask:
            this.paintSolidColorImageMask();
            break;

          case _util.OPS.paintJpegXObject:
            this.paintJpegXObject(args[0], args[1], args[2]);
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
            (0, _util.warn)(`Unimplemented operator ${fn}`);
            break;
        }
      }
    }

    setWordSpacing(wordSpacing) {
      this.current.wordSpacing = wordSpacing;
    }

    setCharSpacing(charSpacing) {
      this.current.charSpacing = charSpacing;
    }

    nextLine() {
      this.moveText(0, this.current.leading);
    }

    setTextMatrix(a, b, c, d, e, f) {
      const current = this.current;
      current.textMatrix = current.lineMatrix = [a, b, c, d, e, f];
      current.textMatrixScale = Math.sqrt(a * a + b * b);
      current.x = current.lineX = 0;
      current.y = current.lineY = 0;
      current.xcoords = [];
      current.tspan = this.svgFactory.createElement('svg:tspan');
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
      current.tspan.setAttributeNS(null, 'font-size', `${pf(current.fontSize)}px`);
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));
      current.txtElement = this.svgFactory.createElement('svg:text');
      current.txtElement.appendChild(current.tspan);
    }

    beginText() {
      const current = this.current;
      current.x = current.lineX = 0;
      current.y = current.lineY = 0;
      current.textMatrix = _util.IDENTITY_MATRIX;
      current.lineMatrix = _util.IDENTITY_MATRIX;
      current.textMatrixScale = 1;
      current.tspan = this.svgFactory.createElement('svg:tspan');
      current.txtElement = this.svgFactory.createElement('svg:text');
      current.txtgrp = this.svgFactory.createElement('svg:g');
      current.xcoords = [];
    }

    moveText(x, y) {
      const current = this.current;
      current.x = current.lineX += x;
      current.y = current.lineY += y;
      current.xcoords = [];
      current.tspan = this.svgFactory.createElement('svg:tspan');
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
      current.tspan.setAttributeNS(null, 'font-size', `${pf(current.fontSize)}px`);
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));
    }

    showText(glyphs) {
      const current = this.current;
      const font = current.font;
      const fontSize = current.fontSize;

      if (fontSize === 0) {
        return;
      }

      const charSpacing = current.charSpacing;
      const wordSpacing = current.wordSpacing;
      const fontDirection = current.fontDirection;
      const textHScale = current.textHScale * fontDirection;
      const vertical = font.vertical;
      const widthAdvanceScale = fontSize * current.fontMatrix[0];
      let x = 0;

      for (const glyph of glyphs) {
        if (glyph === null) {
          x += fontDirection * wordSpacing;
          continue;
        } else if ((0, _util.isNum)(glyph)) {
          x += -glyph * fontSize * 0.001;
          continue;
        }

        const width = glyph.width;
        const character = glyph.fontChar;
        const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
        const charWidth = width * widthAdvanceScale + spacing * fontDirection;

        if (!glyph.isInFont && !font.missingFile) {
          x += charWidth;
          continue;
        }

        current.xcoords.push(current.x + x * textHScale);
        current.tspan.textContent += character;
        x += charWidth;
      }

      if (vertical) {
        current.y -= x * textHScale;
      } else {
        current.x += x * textHScale;
      }

      current.tspan.setAttributeNS(null, 'x', current.xcoords.map(pf).join(' '));
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
      current.tspan.setAttributeNS(null, 'font-size', `${pf(current.fontSize)}px`);

      if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {
        current.tspan.setAttributeNS(null, 'font-style', current.fontStyle);
      }

      if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {
        current.tspan.setAttributeNS(null, 'font-weight', current.fontWeight);
      }

      const fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

      if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
        if (current.fillColor !== SVG_DEFAULTS.fillColor) {
          current.tspan.setAttributeNS(null, 'fill', current.fillColor);
        }

        if (current.fillAlpha < 1) {
          current.tspan.setAttributeNS(null, 'fill-opacity', current.fillAlpha);
        }
      } else if (current.textRenderingMode === _util.TextRenderingMode.ADD_TO_PATH) {
        current.tspan.setAttributeNS(null, 'fill', 'transparent');
      } else {
        current.tspan.setAttributeNS(null, 'fill', 'none');
      }

      if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
        const lineWidthScale = 1 / (current.textMatrixScale || 1);

        this._setStrokeAttributes(current.tspan, lineWidthScale);
      }

      let textMatrix = current.textMatrix;

      if (current.textRise !== 0) {
        textMatrix = textMatrix.slice();
        textMatrix[5] += current.textRise;
      }

      current.txtElement.setAttributeNS(null, 'transform', `${pm(textMatrix)} scale(1, -1)`);
      current.txtElement.setAttributeNS(XML_NS, 'xml:space', 'preserve');
      current.txtElement.appendChild(current.tspan);
      current.txtgrp.appendChild(current.txtElement);

      this._ensureTransformGroup().appendChild(current.txtElement);
    }

    setLeadingMoveText(x, y) {
      this.setLeading(-y);
      this.moveText(x, y);
    }

    addFontStyle(fontObj) {
      if (!this.cssStyle) {
        this.cssStyle = this.svgFactory.createElement('svg:style');
        this.cssStyle.setAttributeNS(null, 'type', 'text/css');
        this.defs.appendChild(this.cssStyle);
      }

      const url = (0, _util.createObjectURL)(fontObj.data, fontObj.mimetype, this.forceDataSchema);
      this.cssStyle.textContent += `@font-face { font-family: "${fontObj.loadedName}";` + ` src: url(${url}); }\n`;
    }

    setFont(details) {
      const current = this.current;
      const fontObj = this.commonObjs.get(details[0]);
      let size = details[1];
      current.font = fontObj;

      if (this.embedFonts && fontObj.data && !this.embeddedFonts[fontObj.loadedName]) {
        this.addFontStyle(fontObj);
        this.embeddedFonts[fontObj.loadedName] = fontObj;
      }

      current.fontMatrix = fontObj.fontMatrix ? fontObj.fontMatrix : _util.FONT_IDENTITY_MATRIX;
      const bold = fontObj.black ? fontObj.bold ? 'bolder' : 'bold' : fontObj.bold ? 'bold' : 'normal';
      const italic = fontObj.italic ? 'italic' : 'normal';

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
      current.tspan = this.svgFactory.createElement('svg:tspan');
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));
      current.xcoords = [];
    }

    endText() {
      const current = this.current;

      if (current.textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG && current.txtElement && current.txtElement.hasChildNodes()) {
        current.element = current.txtElement;
        this.clip('nonzero');
        this.endPath();
      }
    }

    setLineWidth(width) {
      if (width > 0) {
        this.current.lineWidth = width;
      }
    }

    setLineCap(style) {
      this.current.lineCap = LINE_CAP_STYLES[style];
    }

    setLineJoin(style) {
      this.current.lineJoin = LINE_JOIN_STYLES[style];
    }

    setMiterLimit(limit) {
      this.current.miterLimit = limit;
    }

    setStrokeAlpha(strokeAlpha) {
      this.current.strokeAlpha = strokeAlpha;
    }

    setStrokeRGBColor(r, g, b) {
      this.current.strokeColor = _util.Util.makeCssRgb(r, g, b);
    }

    setFillAlpha(fillAlpha) {
      this.current.fillAlpha = fillAlpha;
    }

    setFillRGBColor(r, g, b) {
      this.current.fillColor = _util.Util.makeCssRgb(r, g, b);
      this.current.tspan = this.svgFactory.createElement('svg:tspan');
      this.current.xcoords = [];
    }

    setStrokeColorN(args) {
      this.current.strokeColor = this._makeColorN_Pattern(args);
    }

    setFillColorN(args) {
      this.current.fillColor = this._makeColorN_Pattern(args);
    }

    shadingFill(args) {
      const width = this.viewport.width;
      const height = this.viewport.height;

      const inv = _util.Util.inverseTransform(this.transformMatrix);

      const bl = _util.Util.applyTransform([0, 0], inv);

      const br = _util.Util.applyTransform([0, height], inv);

      const ul = _util.Util.applyTransform([width, 0], inv);

      const ur = _util.Util.applyTransform([width, height], inv);

      const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
      const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
      const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
      const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
      const rect = this.svgFactory.createElement('svg:rect');
      rect.setAttributeNS(null, 'x', x0);
      rect.setAttributeNS(null, 'y', y0);
      rect.setAttributeNS(null, 'width', x1 - x0);
      rect.setAttributeNS(null, 'height', y1 - y0);
      rect.setAttributeNS(null, 'fill', this._makeShadingPattern(args));

      this._ensureTransformGroup().appendChild(rect);
    }

    _makeColorN_Pattern(args) {
      if (args[0] === 'TilingPattern') {
        return this._makeTilingPattern(args);
      }

      return this._makeShadingPattern(args);
    }

    _makeTilingPattern(args) {
      const color = args[1];
      const operatorList = args[2];
      const matrix = args[3] || _util.IDENTITY_MATRIX;
      const [x0, y0, x1, y1] = args[4];
      const xstep = args[5];
      const ystep = args[6];
      const paintType = args[7];
      const tilingId = `shading${shadingCount++}`;

      const [tx0, ty0] = _util.Util.applyTransform([x0, y0], matrix);

      const [tx1, ty1] = _util.Util.applyTransform([x1, y1], matrix);

      const [xscale, yscale] = _util.Util.singularValueDecompose2dScale(matrix);

      const txstep = xstep * xscale;
      const tystep = ystep * yscale;
      const tiling = this.svgFactory.createElement('svg:pattern');
      tiling.setAttributeNS(null, 'id', tilingId);
      tiling.setAttributeNS(null, 'patternUnits', 'userSpaceOnUse');
      tiling.setAttributeNS(null, 'width', txstep);
      tiling.setAttributeNS(null, 'height', tystep);
      tiling.setAttributeNS(null, 'x', `${tx0}`);
      tiling.setAttributeNS(null, 'y', `${ty0}`);
      const svg = this.svg;
      const transformMatrix = this.transformMatrix;
      const fillColor = this.current.fillColor;
      const strokeColor = this.current.strokeColor;
      const bbox = this.svgFactory.create(tx1 - tx0, ty1 - ty0);
      this.svg = bbox;
      this.transformMatrix = matrix;

      if (paintType === 2) {
        const cssColor = _util.Util.makeCssRgb(...color);

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
      return `url(#${tilingId})`;
    }

    _makeShadingPattern(args) {
      switch (args[0]) {
        case 'RadialAxial':
          const shadingId = `shading${shadingCount++}`;
          const colorStops = args[2];
          let gradient;

          switch (args[1]) {
            case 'axial':
              const point0 = args[3];
              const point1 = args[4];
              gradient = this.svgFactory.createElement('svg:linearGradient');
              gradient.setAttributeNS(null, 'id', shadingId);
              gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
              gradient.setAttributeNS(null, 'x1', point0[0]);
              gradient.setAttributeNS(null, 'y1', point0[1]);
              gradient.setAttributeNS(null, 'x2', point1[0]);
              gradient.setAttributeNS(null, 'y2', point1[1]);
              break;

            case 'radial':
              const focalPoint = args[3];
              const circlePoint = args[4];
              const focalRadius = args[5];
              const circleRadius = args[6];
              gradient = this.svgFactory.createElement('svg:radialGradient');
              gradient.setAttributeNS(null, 'id', shadingId);
              gradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
              gradient.setAttributeNS(null, 'cx', circlePoint[0]);
              gradient.setAttributeNS(null, 'cy', circlePoint[1]);
              gradient.setAttributeNS(null, 'r', circleRadius);
              gradient.setAttributeNS(null, 'fx', focalPoint[0]);
              gradient.setAttributeNS(null, 'fy', focalPoint[1]);
              gradient.setAttributeNS(null, 'fr', focalRadius);
              break;

            default:
              throw new Error(`Unknown RadialAxial type: ${args[1]}`);
          }

          for (const colorStop of colorStops) {
            const stop = this.svgFactory.createElement('svg:stop');
            stop.setAttributeNS(null, 'offset', colorStop[0]);
            stop.setAttributeNS(null, 'stop-color', colorStop[1]);
            gradient.appendChild(stop);
          }

          this.defs.appendChild(gradient);
          return `url(#${shadingId})`;

        case 'Mesh':
          (0, _util.warn)('Unimplemented pattern Mesh');
          return null;

        case 'Dummy':
          return 'hotpink';

        default:
          throw new Error(`Unknown IR type: ${args[0]}`);
      }
    }

    setDash(dashArray, dashPhase) {
      this.current.dashArray = dashArray;
      this.current.dashPhase = dashPhase;
    }

    constructPath(ops, args) {
      const current = this.current;
      let x = current.x,
          y = current.y;
      let d = [];
      let j = 0;

      for (const op of ops) {
        switch (op | 0) {
          case _util.OPS.rectangle:
            x = args[j++];
            y = args[j++];
            const width = args[j++];
            const height = args[j++];
            const xw = x + width;
            const yh = y + height;
            d.push('M', pf(x), pf(y), 'L', pf(xw), pf(y), 'L', pf(xw), pf(yh), 'L', pf(x), pf(yh), 'Z');
            break;

          case _util.OPS.moveTo:
            x = args[j++];
            y = args[j++];
            d.push('M', pf(x), pf(y));
            break;

          case _util.OPS.lineTo:
            x = args[j++];
            y = args[j++];
            d.push('L', pf(x), pf(y));
            break;

          case _util.OPS.curveTo:
            x = args[j + 4];
            y = args[j + 5];
            d.push('C', pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]), pf(x), pf(y));
            j += 6;
            break;

          case _util.OPS.curveTo2:
            x = args[j + 2];
            y = args[j + 3];
            d.push('C', pf(x), pf(y), pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]));
            j += 4;
            break;

          case _util.OPS.curveTo3:
            x = args[j + 2];
            y = args[j + 3];
            d.push('C', pf(args[j]), pf(args[j + 1]), pf(x), pf(y), pf(x), pf(y));
            j += 4;
            break;

          case _util.OPS.closePath:
            d.push('Z');
            break;
        }
      }

      d = d.join(' ');

      if (current.path && ops.length > 0 && ops[0] !== _util.OPS.rectangle && ops[0] !== _util.OPS.moveTo) {
        d = current.path.getAttributeNS(null, 'd') + d;
      } else {
        current.path = this.svgFactory.createElement('svg:path');

        this._ensureTransformGroup().appendChild(current.path);
      }

      current.path.setAttributeNS(null, 'd', d);
      current.path.setAttributeNS(null, 'fill', 'none');
      current.element = current.path;
      current.setCurrentPoint(x, y);
    }

    endPath() {
      const current = this.current;
      current.path = null;

      if (!this.pendingClip) {
        return;
      }

      if (!current.element) {
        this.pendingClip = null;
        return;
      }

      const clipId = `clippath${clipCount++}`;
      const clipPath = this.svgFactory.createElement('svg:clipPath');
      clipPath.setAttributeNS(null, 'id', clipId);
      clipPath.setAttributeNS(null, 'transform', pm(this.transformMatrix));
      const clipElement = current.element.cloneNode(true);

      if (this.pendingClip === 'evenodd') {
        clipElement.setAttributeNS(null, 'clip-rule', 'evenodd');
      } else {
        clipElement.setAttributeNS(null, 'clip-rule', 'nonzero');
      }

      this.pendingClip = null;
      clipPath.appendChild(clipElement);
      this.defs.appendChild(clipPath);

      if (current.activeClipUrl) {
        current.clipGroup = null;
        this.extraStack.forEach(function (prev) {
          prev.clipGroup = null;
        });
        clipPath.setAttributeNS(null, 'clip-path', current.activeClipUrl);
      }

      current.activeClipUrl = `url(#${clipId})`;
      this.tgrp = null;
    }

    clip(type) {
      this.pendingClip = type;
    }

    closePath() {
      const current = this.current;

      if (current.path) {
        const d = `${current.path.getAttributeNS(null, 'd')}Z`;
        current.path.setAttributeNS(null, 'd', d);
      }
    }

    setLeading(leading) {
      this.current.leading = -leading;
    }

    setTextRise(textRise) {
      this.current.textRise = textRise;
    }

    setTextRenderingMode(textRenderingMode) {
      this.current.textRenderingMode = textRenderingMode;
    }

    setHScale(scale) {
      this.current.textHScale = scale / 100;
    }

    setRenderingIntent(intent) {}

    setFlatness(flatness) {}

    setGState(states) {
      for (const [key, value] of states) {
        switch (key) {
          case 'LW':
            this.setLineWidth(value);
            break;

          case 'LC':
            this.setLineCap(value);
            break;

          case 'LJ':
            this.setLineJoin(value);
            break;

          case 'ML':
            this.setMiterLimit(value);
            break;

          case 'D':
            this.setDash(value[0], value[1]);
            break;

          case 'RI':
            this.setRenderingIntent(value);
            break;

          case 'FL':
            this.setFlatness(value);
            break;

          case 'Font':
            this.setFont(value);
            break;

          case 'CA':
            this.setStrokeAlpha(value);
            break;

          case 'ca':
            this.setFillAlpha(value);
            break;

          default:
            (0, _util.warn)(`Unimplemented graphic state operator ${key}`);
            break;
        }
      }
    }

    fill() {
      const current = this.current;

      if (current.element) {
        current.element.setAttributeNS(null, 'fill', current.fillColor);
        current.element.setAttributeNS(null, 'fill-opacity', current.fillAlpha);
        this.endPath();
      }
    }

    stroke() {
      const current = this.current;

      if (current.element) {
        this._setStrokeAttributes(current.element);

        current.element.setAttributeNS(null, 'fill', 'none');
        this.endPath();
      }
    }

    _setStrokeAttributes(element, lineWidthScale = 1) {
      const current = this.current;
      let dashArray = current.dashArray;

      if (lineWidthScale !== 1 && dashArray.length > 0) {
        dashArray = dashArray.map(function (value) {
          return lineWidthScale * value;
        });
      }

      element.setAttributeNS(null, 'stroke', current.strokeColor);
      element.setAttributeNS(null, 'stroke-opacity', current.strokeAlpha);
      element.setAttributeNS(null, 'stroke-miterlimit', pf(current.miterLimit));
      element.setAttributeNS(null, 'stroke-linecap', current.lineCap);
      element.setAttributeNS(null, 'stroke-linejoin', current.lineJoin);
      element.setAttributeNS(null, 'stroke-width', pf(lineWidthScale * current.lineWidth) + 'px');
      element.setAttributeNS(null, 'stroke-dasharray', dashArray.map(pf).join(' '));
      element.setAttributeNS(null, 'stroke-dashoffset', pf(lineWidthScale * current.dashPhase) + 'px');
    }

    eoFill() {
      if (this.current.element) {
        this.current.element.setAttributeNS(null, 'fill-rule', 'evenodd');
      }

      this.fill();
    }

    fillStroke() {
      this.stroke();
      this.fill();
    }

    eoFillStroke() {
      if (this.current.element) {
        this.current.element.setAttributeNS(null, 'fill-rule', 'evenodd');
      }

      this.fillStroke();
    }

    closeStroke() {
      this.closePath();
      this.stroke();
    }

    closeFillStroke() {
      this.closePath();
      this.fillStroke();
    }

    closeEOFillStroke() {
      this.closePath();
      this.eoFillStroke();
    }

    paintSolidColorImageMask() {
      const rect = this.svgFactory.createElement('svg:rect');
      rect.setAttributeNS(null, 'x', '0');
      rect.setAttributeNS(null, 'y', '0');
      rect.setAttributeNS(null, 'width', '1px');
      rect.setAttributeNS(null, 'height', '1px');
      rect.setAttributeNS(null, 'fill', this.current.fillColor);

      this._ensureTransformGroup().appendChild(rect);
    }

    paintJpegXObject(objId, w, h) {
      const imgObj = this.objs.get(objId);
      const imgEl = this.svgFactory.createElement('svg:image');
      imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgObj.src);
      imgEl.setAttributeNS(null, 'width', pf(w));
      imgEl.setAttributeNS(null, 'height', pf(h));
      imgEl.setAttributeNS(null, 'x', '0');
      imgEl.setAttributeNS(null, 'y', pf(-h));
      imgEl.setAttributeNS(null, 'transform', `scale(${pf(1 / w)} ${pf(-1 / h)})`);

      this._ensureTransformGroup().appendChild(imgEl);
    }

    paintImageXObject(objId) {
      const imgData = this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)(`Dependent image with object ID ${objId} is not ready yet`);
        return;
      }

      this.paintInlineImageXObject(imgData);
    }

    paintInlineImageXObject(imgData, mask) {
      const width = imgData.width;
      const height = imgData.height;
      const imgSrc = convertImgDataToPng(imgData, this.forceDataSchema, !!mask);
      const cliprect = this.svgFactory.createElement('svg:rect');
      cliprect.setAttributeNS(null, 'x', '0');
      cliprect.setAttributeNS(null, 'y', '0');
      cliprect.setAttributeNS(null, 'width', pf(width));
      cliprect.setAttributeNS(null, 'height', pf(height));
      this.current.element = cliprect;
      this.clip('nonzero');
      const imgEl = this.svgFactory.createElement('svg:image');
      imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgSrc);
      imgEl.setAttributeNS(null, 'x', '0');
      imgEl.setAttributeNS(null, 'y', pf(-height));
      imgEl.setAttributeNS(null, 'width', pf(width) + 'px');
      imgEl.setAttributeNS(null, 'height', pf(height) + 'px');
      imgEl.setAttributeNS(null, 'transform', `scale(${pf(1 / width)} ${pf(-1 / height)})`);

      if (mask) {
        mask.appendChild(imgEl);
      } else {
        this._ensureTransformGroup().appendChild(imgEl);
      }
    }

    paintImageMaskXObject(imgData) {
      const current = this.current;
      const width = imgData.width;
      const height = imgData.height;
      const fillColor = current.fillColor;
      current.maskId = `mask${maskCount++}`;
      const mask = this.svgFactory.createElement('svg:mask');
      mask.setAttributeNS(null, 'id', current.maskId);
      const rect = this.svgFactory.createElement('svg:rect');
      rect.setAttributeNS(null, 'x', '0');
      rect.setAttributeNS(null, 'y', '0');
      rect.setAttributeNS(null, 'width', pf(width));
      rect.setAttributeNS(null, 'height', pf(height));
      rect.setAttributeNS(null, 'fill', fillColor);
      rect.setAttributeNS(null, 'mask', `url(#${current.maskId})`);
      this.defs.appendChild(mask);

      this._ensureTransformGroup().appendChild(rect);

      this.paintInlineImageXObject(imgData, mask);
    }

    paintFormXObjectBegin(matrix, bbox) {
      if (Array.isArray(matrix) && matrix.length === 6) {
        this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      }

      if (bbox) {
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        const cliprect = this.svgFactory.createElement('svg:rect');
        cliprect.setAttributeNS(null, 'x', bbox[0]);
        cliprect.setAttributeNS(null, 'y', bbox[1]);
        cliprect.setAttributeNS(null, 'width', pf(width));
        cliprect.setAttributeNS(null, 'height', pf(height));
        this.current.element = cliprect;
        this.clip('nonzero');
        this.endPath();
      }
    }

    paintFormXObjectEnd() {}

    _initialize(viewport) {
      const svg = this.svgFactory.create(viewport.width, viewport.height);
      const definitions = this.svgFactory.createElement('svg:defs');
      svg.appendChild(definitions);
      this.defs = definitions;
      const rootGroup = this.svgFactory.createElement('svg:g');
      rootGroup.setAttributeNS(null, 'transform', pm(viewport.transform));
      svg.appendChild(rootGroup);
      this.svg = rootGroup;
      return svg;
    }

    _ensureClipGroup() {
      if (!this.current.clipGroup) {
        const clipGroup = this.svgFactory.createElement('svg:g');
        clipGroup.setAttributeNS(null, 'clip-path', this.current.activeClipUrl);
        this.svg.appendChild(clipGroup);
        this.current.clipGroup = clipGroup;
      }

      return this.current.clipGroup;
    }

    _ensureTransformGroup() {
      if (!this.tgrp) {
        this.tgrp = this.svgFactory.createElement('svg:g');
        this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));

        if (this.current.activeClipUrl) {
          this._ensureClipGroup().appendChild(this.tgrp);
        } else {
          this.svg.appendChild(this.tgrp);
        }
      }

      return this.tgrp;
    }

  };
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFNodeStream = void 0;

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(201);







let url = require('url');

const fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;

function parseUrl(sourceUrl) {
  let parsedUrl = url.parse(sourceUrl);

  if (parsedUrl.protocol === 'file:' || parsedUrl.host) {
    return parsedUrl;
  }

  if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
    return url.parse(`file:///${sourceUrl}`);
  }

  if (!parsedUrl.host) {
    parsedUrl.protocol = 'file:';
  }

  return parsedUrl;
}

class PDFNodeStream {
  constructor(source) {
    this.source = source;
    this.url = parseUrl(source.url);
    this.isHttp = this.url.protocol === 'http:' || this.url.protocol === 'https:';
    this.isFsUrl = this.url.protocol === 'file:';
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  get _progressiveDataLength() {
    return this._fullRequestReader ? this._fullRequestReader._loaded : 0;
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader);
    this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
    return this._fullRequestReader;
  }

  getRangeReader(start, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }

    let rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);

    this._rangeRequestReaders.push(rangeReader);

    return rangeReader;
  }

  cancelAllRequests(reason) {
    if (this._fullRequestReader) {
      this._fullRequestReader.cancel(reason);
    }

    let readers = this._rangeRequestReaders.slice(0);

    readers.forEach(function (reader) {
      reader.cancel(reason);
    });
  }

}

exports.PDFNodeStream = PDFNodeStream;

class BaseFullReader {
  constructor(stream) {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    let source = stream.source;
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

  get headersReady() {
    return this._headersCapability.promise;
  }

  get filename() {
    return this._filename;
  }

  get contentLength() {
    return this._contentLength;
  }

  get isRangeSupported() {
    return this._isRangeSupported;
  }

  get isStreamingSupported() {
    return this._isStreamingSupported;
  }

  async read() {
    await this._readCapability.promise;

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    if (this._storedError) {
      throw this._storedError;
    }

    let chunk = this._readableStream.read();

    if (chunk === null) {
      this._readCapability = (0, _util.createPromiseCapability)();
      return this.read();
    }

    this._loaded += chunk.length;

    if (this.onProgress) {
      this.onProgress({
        loaded: this._loaded,
        total: this._contentLength
      });
    }

    let buffer = new Uint8Array(chunk).buffer;
    return {
      value: buffer,
      done: false
    };
  }

  cancel(reason) {
    if (!this._readableStream) {
      this._error(reason);

      return;
    }

    this._readableStream.destroy(reason);
  }

  _error(reason) {
    this._storedError = reason;

    this._readCapability.resolve();
  }

  _setReadableStream(readableStream) {
    this._readableStream = readableStream;
    readableStream.on('readable', () => {
      this._readCapability.resolve();
    });
    readableStream.on('end', () => {
      readableStream.destroy();
      this._done = true;

      this._readCapability.resolve();
    });
    readableStream.on('error', reason => {
      this._error(reason);
    });

    if (!this._isStreamingSupported && this._isRangeSupported) {
      this._error(new _util.AbortException('streaming is disabled'));
    }

    if (this._storedError) {
      this._readableStream.destroy(this._storedError);
    }
  }

}

class BaseRangeReader {
  constructor(stream) {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    this._loaded = 0;
    this._readableStream = null;
    this._readCapability = (0, _util.createPromiseCapability)();
    let source = stream.source;
    this._isStreamingSupported = !source.disableStream;
  }

  get isStreamingSupported() {
    return this._isStreamingSupported;
  }

  async read() {
    await this._readCapability.promise;

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    if (this._storedError) {
      throw this._storedError;
    }

    let chunk = this._readableStream.read();

    if (chunk === null) {
      this._readCapability = (0, _util.createPromiseCapability)();
      return this.read();
    }

    this._loaded += chunk.length;

    if (this.onProgress) {
      this.onProgress({
        loaded: this._loaded
      });
    }

    let buffer = new Uint8Array(chunk).buffer;
    return {
      value: buffer,
      done: false
    };
  }

  cancel(reason) {
    if (!this._readableStream) {
      this._error(reason);

      return;
    }

    this._readableStream.destroy(reason);
  }

  _error(reason) {
    this._storedError = reason;

    this._readCapability.resolve();
  }

  _setReadableStream(readableStream) {
    this._readableStream = readableStream;
    readableStream.on('readable', () => {
      this._readCapability.resolve();
    });
    readableStream.on('end', () => {
      readableStream.destroy();
      this._done = true;

      this._readCapability.resolve();
    });
    readableStream.on('error', reason => {
      this._error(reason);
    });

    if (this._storedError) {
      this._readableStream.destroy(this._storedError);
    }
  }

}

function createRequestOptions(url, headers) {
  return {
    protocol: url.protocol,
    auth: url.auth,
    host: url.hostname,
    port: url.port,
    path: url.path,
    method: 'GET',
    headers
  };
}

class PDFNodeStreamFullReader extends BaseFullReader {
  constructor(stream) {
    super(stream);

    let handleResponse = response => {
      if (response.statusCode === 404) {
        const error = new _util.MissingPDFException(`Missing PDF "${this._url}".`);
        this._storedError = error;

        this._headersCapability.reject(error);

        return;
      }

      this._headersCapability.resolve();

      this._setReadableStream(response);

      const getResponseHeader = name => {
        return this._readableStream.headers[name.toLowerCase()];
      };

      let {
        allowRangeRequests,
        suggestedLength
      } = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader,
        isHttp: stream.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      });
      this._isRangeSupported = allowRangeRequests;
      this._contentLength = suggestedLength || this._contentLength;
      this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
    };

    this._request = null;

    if (this._url.protocol === 'http:') {
      this._request = http.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    } else {
      this._request = https.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    }

    this._request.on('error', reason => {
      this._storedError = reason;

      this._headersCapability.reject(reason);
    });

    this._request.end();
  }

}

class PDFNodeStreamRangeReader extends BaseRangeReader {
  constructor(stream, start, end) {
    super(stream);
    this._httpHeaders = {};

    for (let property in stream.httpHeaders) {
      let value = stream.httpHeaders[property];

      if (typeof value === 'undefined') {
        continue;
      }

      this._httpHeaders[property] = value;
    }

    this._httpHeaders['Range'] = `bytes=${start}-${end - 1}`;

    let handleResponse = response => {
      if (response.statusCode === 404) {
        const error = new _util.MissingPDFException(`Missing PDF "${this._url}".`);
        this._storedError = error;
        return;
      }

      this._setReadableStream(response);
    };

    this._request = null;

    if (this._url.protocol === 'http:') {
      this._request = http.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    } else {
      this._request = https.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    }

    this._request.on('error', reason => {
      this._storedError = reason;
    });

    this._request.end();
  }

}

class PDFNodeStreamFsFullReader extends BaseFullReader {
  constructor(stream) {
    super(stream);
    let path = decodeURIComponent(this._url.path);

    if (fileUriRegex.test(this._url.href)) {
      path = path.replace(/^\//, '');
    }

    fs.lstat(path, (error, stat) => {
      if (error) {
        if (error.code === 'ENOENT') {
          error = new _util.MissingPDFException(`Missing PDF "${path}".`);
        }

        this._storedError = error;

        this._headersCapability.reject(error);

        return;
      }

      this._contentLength = stat.size;

      this._setReadableStream(fs.createReadStream(path));

      this._headersCapability.resolve();
    });
  }

}

class PDFNodeStreamFsRangeReader extends BaseRangeReader {
  constructor(stream, start, end) {
    super(stream);
    let path = decodeURIComponent(this._url.path);

    if (fileUriRegex.test(this._url.href)) {
      path = path.replace(/^\//, '');
    }

    this._setReadableStream(fs.createReadStream(path, {
      start,
      end: end - 1
    }));
  }

}

/***/ }),
/* 201 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createResponseStatusError = createResponseStatusError;
exports.extractFilenameFromHeader = extractFilenameFromHeader;
exports.validateRangeRequestCapabilities = validateRangeRequestCapabilities;
exports.validateResponseStatus = validateResponseStatus;

var _util = __w_pdfjs_require__(1);

var _content_disposition = __w_pdfjs_require__(202);

function validateRangeRequestCapabilities({
  getResponseHeader,
  isHttp,
  rangeChunkSize,
  disableRange
}) {
  (0, _util.assert)(rangeChunkSize > 0, 'Range chunk size must be larger than zero');
  let returnValues = {
    allowRangeRequests: false,
    suggestedLength: undefined
  };
  let length = parseInt(getResponseHeader('Content-Length'), 10);

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

  if (getResponseHeader('Accept-Ranges') !== 'bytes') {
    return returnValues;
  }

  let contentEncoding = getResponseHeader('Content-Encoding') || 'identity';

  if (contentEncoding !== 'identity') {
    return returnValues;
  }

  returnValues.allowRangeRequests = true;
  return returnValues;
}

function extractFilenameFromHeader(getResponseHeader) {
  const contentDisposition = getResponseHeader('Content-Disposition');

  if (contentDisposition) {
    let filename = (0, _content_disposition.getFilenameFromContentDispositionHeader)(contentDisposition);

    if (filename.includes('%')) {
      try {
        filename = decodeURIComponent(filename);
      } catch (ex) {}
    }

    if (/\.pdf$/i.test(filename)) {
      return filename;
    }
  }

  return null;
}

function createResponseStatusError(status, url) {
  if (status === 404 || status === 0 && /^file:/.test(url)) {
    return new _util.MissingPDFException('Missing PDF "' + url + '".');
  }

  return new _util.UnexpectedResponseException('Unexpected server response (' + status + ') while retrieving PDF "' + url + '".', status);
}

function validateResponseStatus(status) {
  return status === 200 || status === 206;
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilenameFromContentDispositionHeader = getFilenameFromContentDispositionHeader;

function getFilenameFromContentDispositionHeader(contentDisposition) {
  let needsEncodingFixup = true;
  let tmp = toParamRegExp('filename\\*', 'i').exec(contentDisposition);

  if (tmp) {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp);
    filename = unescape(filename);
    filename = rfc5987decode(filename);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
  }

  tmp = rfc2231getparam(contentDisposition);

  if (tmp) {
    let filename = rfc2047decode(tmp);
    return fixupEncoding(filename);
  }

  tmp = toParamRegExp('filename', 'i').exec(contentDisposition);

  if (tmp) {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
  }

  function toParamRegExp(attributePattern, flags) {
    return new RegExp('(?:^|;)\\s*' + attributePattern + '\\s*=\\s*' + '(' + '[^";\\s][^;\\s]*' + '|' + '"(?:[^"\\\\]|\\\\"?)+"?' + ')', flags);
  }

  function textdecode(encoding, value) {
    if (encoding) {
      if (!/^[\x00-\xFF]+$/.test(value)) {
        return value;
      }

      try {
        let decoder = new TextDecoder(encoding, {
          fatal: true
        });
        let bytes = Array.from(value, function (ch) {
          return ch.charCodeAt(0) & 0xFF;
        });
        value = decoder.decode(new Uint8Array(bytes));
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
      value = textdecode('utf-8', value);

      if (needsEncodingFixup) {
        value = textdecode('iso-8859-1', value);
      }
    }

    return value;
  }

  function rfc2231getparam(contentDisposition) {
    let matches = [],
        match;
    let iter = toParamRegExp('filename\\*((?!0\\d)\\d+)(\\*?)', 'ig');

    while ((match = iter.exec(contentDisposition)) !== null) {
      let [, n, quot, part] = match;
      n = parseInt(n, 10);

      if (n in matches) {
        if (n === 0) {
          break;
        }

        continue;
      }

      matches[n] = [quot, part];
    }

    let parts = [];

    for (let n = 0; n < matches.length; ++n) {
      if (!(n in matches)) {
        break;
      }

      let [quot, part] = matches[n];
      part = rfc2616unquote(part);

      if (quot) {
        part = unescape(part);

        if (n === 0) {
          part = rfc5987decode(part);
        }
      }

      parts.push(part);
    }

    return parts.join('');
  }

  function rfc2616unquote(value) {
    if (value.startsWith('"')) {
      let parts = value.slice(1).split('\\"');

      for (let i = 0; i < parts.length; ++i) {
        let quotindex = parts[i].indexOf('"');

        if (quotindex !== -1) {
          parts[i] = parts[i].slice(0, quotindex);
          parts.length = i + 1;
        }

        parts[i] = parts[i].replace(/\\(.)/g, '$1');
      }

      value = parts.join('"');
    }

    return value;
  }

  function rfc5987decode(extvalue) {
    let encodingend = extvalue.indexOf('\'');

    if (encodingend === -1) {
      return extvalue;
    }

    let encoding = extvalue.slice(0, encodingend);
    let langvalue = extvalue.slice(encodingend + 1);
    let value = langvalue.replace(/^[^']*'/, '');
    return textdecode(encoding, value);
  }

  function rfc2047decode(value) {
    if (!value.startsWith('=?') || /[\x00-\x19\x80-\xff]/.test(value)) {
      return value;
    }

    return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function (_, charset, encoding, text) {
      if (encoding === 'q' || encoding === 'Q') {
        text = text.replace(/_/g, ' ');
        text = text.replace(/=([0-9a-fA-F]{2})/g, function (_, hex) {
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

  return '';
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFNetworkStream = void 0;

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(201);

;
const OK_RESPONSE = 200;
const PARTIAL_CONTENT_RESPONSE = 206;

function getArrayBuffer(xhr) {
  const data = xhr.response;

  if (typeof data !== 'string') {
    return data;
  }

  const array = (0, _util.stringToBytes)(data);
  return array.buffer;
}

class NetworkManager {
  constructor(url, args) {
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

  requestRange(begin, end, listeners) {
    const args = {
      begin,
      end
    };

    for (const prop in listeners) {
      args[prop] = listeners[prop];
    }

    return this.request(args);
  }

  requestFull(listeners) {
    return this.request(listeners);
  }

  request(args) {
    const xhr = this.getXhr();
    const xhrId = this.currXhrId++;
    const pendingRequest = this.pendingRequests[xhrId] = {
      xhr
    };
    xhr.open('GET', this.url);
    xhr.withCredentials = this.withCredentials;

    for (const property in this.httpHeaders) {
      const value = this.httpHeaders[property];

      if (typeof value === 'undefined') {
        continue;
      }

      xhr.setRequestHeader(property, value);
    }

    if (this.isHttp && 'begin' in args && 'end' in args) {
      xhr.setRequestHeader('Range', `bytes=${args.begin}-${args.end - 1}`);
      pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
    } else {
      pendingRequest.expectedStatus = OK_RESPONSE;
    }

    xhr.responseType = 'arraybuffer';

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

  onProgress(xhrId, evt) {
    const pendingRequest = this.pendingRequests[xhrId];

    if (!pendingRequest) {
      return;
    }

    if (pendingRequest.onProgress) {
      pendingRequest.onProgress(evt);
    }
  }

  onStateChange(xhrId, evt) {
    const pendingRequest = this.pendingRequests[xhrId];

    if (!pendingRequest) {
      return;
    }

    const xhr = pendingRequest.xhr;

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

    const xhrStatus = xhr.status || OK_RESPONSE;
    const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;

    if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
      if (pendingRequest.onError) {
        pendingRequest.onError(xhr.status);
      }

      return;
    }

    const chunk = getArrayBuffer(xhr);

    if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
      const rangeHeader = xhr.getResponseHeader('Content-Range');
      const matches = /bytes (\d+)-(\d+)\/(\d+)/.exec(rangeHeader);
      pendingRequest.onDone({
        begin: parseInt(matches[1], 10),
        chunk
      });
    } else if (chunk) {
      pendingRequest.onDone({
        begin: 0,
        chunk
      });
    } else if (pendingRequest.onError) {
      pendingRequest.onError(xhr.status);
    }
  }

  hasPendingRequests() {
    for (const xhrId in this.pendingRequests) {
      return true;
    }

    return false;
  }

  getRequestXhr(xhrId) {
    return this.pendingRequests[xhrId].xhr;
  }

  isPendingRequest(xhrId) {
    return xhrId in this.pendingRequests;
  }

  abortAllRequests() {
    for (const xhrId in this.pendingRequests) {
      this.abortRequest(xhrId | 0);
    }
  }

  abortRequest(xhrId) {
    const xhr = this.pendingRequests[xhrId].xhr;
    delete this.pendingRequests[xhrId];
    xhr.abort();
  }

}

class PDFNetworkStream {
  constructor(source) {
    this._source = source;
    this._manager = new NetworkManager(source.url, {
      httpHeaders: source.httpHeaders,
      withCredentials: source.withCredentials
    });
    this._rangeChunkSize = source.rangeChunkSize;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  _onRangeRequestReaderClosed(reader) {
    const i = this._rangeRequestReaders.indexOf(reader);

    if (i >= 0) {
      this._rangeRequestReaders.splice(i, 1);
    }
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader);
    this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
    return this._fullRequestReader;
  }

  getRangeReader(begin, end) {
    const reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end);
    reader.onClosed = this._onRangeRequestReaderClosed.bind(this);

    this._rangeRequestReaders.push(reader);

    return reader;
  }

  cancelAllRequests(reason) {
    if (this._fullRequestReader) {
      this._fullRequestReader.cancel(reason);
    }

    const readers = this._rangeRequestReaders.slice(0);

    readers.forEach(function (reader) {
      reader.cancel(reason);
    });
  }

}

exports.PDFNetworkStream = PDFNetworkStream;

class PDFNetworkStreamFullRequestReader {
  constructor(manager, source) {
    this._manager = manager;
    const args = {
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

  _onHeadersReceived() {
    const fullRequestXhrId = this._fullRequestId;

    const fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId);

    const getResponseHeader = name => {
      return fullRequestXhr.getResponseHeader(name);
    };

    const {
      allowRangeRequests,
      suggestedLength
    } = (0, _network_utils.validateRangeRequestCapabilities)({
      getResponseHeader,
      isHttp: this._manager.isHttp,
      rangeChunkSize: this._rangeChunkSize,
      disableRange: this._disableRange
    });

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

  _onDone(args) {
    if (args) {
      if (this._requests.length > 0) {
        const requestCapability = this._requests.shift();

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

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];
  }

  _onError(status) {
    const url = this._url;
    const exception = (0, _network_utils.createResponseStatusError)(status, url);
    this._storedError = exception;

    this._headersReceivedCapability.reject(exception);

    this._requests.forEach(function (requestCapability) {
      requestCapability.reject(exception);
    });

    this._requests = [];
    this._cachedChunks = [];
  }

  _onProgress(data) {
    if (this.onProgress) {
      this.onProgress({
        loaded: data.loaded,
        total: data.lengthComputable ? data.total : this._contentLength
      });
    }
  }

  get filename() {
    return this._filename;
  }

  get isRangeSupported() {
    return this._isRangeSupported;
  }

  get isStreamingSupported() {
    return this._isStreamingSupported;
  }

  get contentLength() {
    return this._contentLength;
  }

  get headersReady() {
    return this._headersReceivedCapability.promise;
  }

  async read() {
    if (this._storedError) {
      throw this._storedError;
    }

    if (this._cachedChunks.length > 0) {
      const chunk = this._cachedChunks.shift();

      return {
        value: chunk,
        done: false
      };
    }

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    const requestCapability = (0, _util.createPromiseCapability)();

    this._requests.push(requestCapability);

    return requestCapability.promise;
  }

  cancel(reason) {
    this._done = true;

    this._headersReceivedCapability.reject(reason);

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];

    if (this._manager.isPendingRequest(this._fullRequestId)) {
      this._manager.abortRequest(this._fullRequestId);
    }

    this._fullRequestReader = null;
  }

}

class PDFNetworkStreamRangeRequestReader {
  constructor(manager, begin, end) {
    this._manager = manager;
    const args = {
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

  _close() {
    if (this.onClosed) {
      this.onClosed(this);
    }
  }

  _onDone(data) {
    const chunk = data.chunk;

    if (this._requests.length > 0) {
      const requestCapability = this._requests.shift();

      requestCapability.resolve({
        value: chunk,
        done: false
      });
    } else {
      this._queuedChunk = chunk;
    }

    this._done = true;

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];

    this._close();
  }

  _onProgress(evt) {
    if (!this.isStreamingSupported && this.onProgress) {
      this.onProgress({
        loaded: evt.loaded
      });
    }
  }

  get isStreamingSupported() {
    return false;
  }

  async read() {
    if (this._queuedChunk !== null) {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
      return {
        value: chunk,
        done: false
      };
    }

    if (this._done) {
      return {
        value: undefined,
        done: true
      };
    }

    const requestCapability = (0, _util.createPromiseCapability)();

    this._requests.push(requestCapability);

    return requestCapability.promise;
  }

  cancel(reason) {
    this._done = true;

    this._requests.forEach(function (requestCapability) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    });

    this._requests = [];

    if (this._manager.isPendingRequest(this._requestId)) {
      this._manager.abortRequest(this._requestId);
    }

    this._close();
  }

}

/***/ }),
/* 204 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFFetchStream = void 0;

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(201);

function createFetchOptions(headers, withCredentials, abortController) {
  return {
    method: 'GET',
    headers,
    signal: abortController && abortController.signal,
    mode: 'cors',
    credentials: withCredentials ? 'include' : 'same-origin',
    redirect: 'follow'
  };
}

class PDFFetchStream {
  constructor(source) {
    this.source = source;
    this.isHttp = /^https?:/i.test(source.url);
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  get _progressiveDataLength() {
    return this._fullRequestReader ? this._fullRequestReader._loaded : 0;
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader);
    this._fullRequestReader = new PDFFetchStreamReader(this);
    return this._fullRequestReader;
  }

  getRangeReader(begin, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }

    const reader = new PDFFetchStreamRangeReader(this, begin, end);

    this._rangeRequestReaders.push(reader);

    return reader;
  }

  cancelAllRequests(reason) {
    if (this._fullRequestReader) {
      this._fullRequestReader.cancel(reason);
    }

    const readers = this._rangeRequestReaders.slice(0);

    readers.forEach(function (reader) {
      reader.cancel(reason);
    });
  }

}

exports.PDFFetchStream = PDFFetchStream;

class PDFFetchStreamReader {
  constructor(stream) {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    this._filename = null;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._contentLength = source.length;
    this._headersCapability = (0, _util.createPromiseCapability)();
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;

    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }

    if (typeof AbortController !== 'undefined') {
      this._abortController = new AbortController();
    }

    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._headers = new Headers();

    for (const property in this._stream.httpHeaders) {
      const value = this._stream.httpHeaders[property];

      if (typeof value === 'undefined') {
        continue;
      }

      this._headers.append(property, value);
    }

    const url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(response => {
      if (!(0, _network_utils.validateResponseStatus)(response.status)) {
        throw (0, _network_utils.createResponseStatusError)(response.status, url);
      }

      this._reader = response.body.getReader();

      this._headersCapability.resolve();

      const getResponseHeader = name => {
        return response.headers.get(name);
      };

      const {
        allowRangeRequests,
        suggestedLength
      } = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader,
        isHttp: this._stream.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      });
      this._isRangeSupported = allowRangeRequests;
      this._contentLength = suggestedLength || this._contentLength;
      this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);

      if (!this._isStreamingSupported && this._isRangeSupported) {
        this.cancel(new _util.AbortException('Streaming is disabled.'));
      }
    }).catch(this._headersCapability.reject);
    this.onProgress = null;
  }

  get headersReady() {
    return this._headersCapability.promise;
  }

  get filename() {
    return this._filename;
  }

  get contentLength() {
    return this._contentLength;
  }

  get isRangeSupported() {
    return this._isRangeSupported;
  }

  get isStreamingSupported() {
    return this._isStreamingSupported;
  }

  async read() {
    await this._headersCapability.promise;
    const {
      value,
      done
    } = await this._reader.read();

    if (done) {
      return {
        value,
        done
      };
    }

    this._loaded += value.byteLength;

    if (this.onProgress) {
      this.onProgress({
        loaded: this._loaded,
        total: this._contentLength
      });
    }

    const buffer = new Uint8Array(value).buffer;
    return {
      value: buffer,
      done: false
    };
  }

  cancel(reason) {
    if (this._reader) {
      this._reader.cancel(reason);
    }

    if (this._abortController) {
      this._abortController.abort();
    }
  }

}

class PDFFetchStreamRangeReader {
  constructor(stream, begin, end) {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._readCapability = (0, _util.createPromiseCapability)();
    this._isStreamingSupported = !source.disableStream;

    if (typeof AbortController !== 'undefined') {
      this._abortController = new AbortController();
    }

    this._headers = new Headers();

    for (const property in this._stream.httpHeaders) {
      const value = this._stream.httpHeaders[property];

      if (typeof value === 'undefined') {
        continue;
      }

      this._headers.append(property, value);
    }

    this._headers.append('Range', `bytes=${begin}-${end - 1}`);

    const url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(response => {
      if (!(0, _network_utils.validateResponseStatus)(response.status)) {
        throw (0, _network_utils.createResponseStatusError)(response.status, url);
      }

      this._readCapability.resolve();

      this._reader = response.body.getReader();
    });
    this.onProgress = null;
  }

  get isStreamingSupported() {
    return this._isStreamingSupported;
  }

  async read() {
    await this._readCapability.promise;
    const {
      value,
      done
    } = await this._reader.read();

    if (done) {
      return {
        value,
        done
      };
    }

    this._loaded += value.byteLength;

    if (this.onProgress) {
      this.onProgress({
        loaded: this._loaded
      });
    }

    const buffer = new Uint8Array(value).buffer;
    return {
      value: buffer,
      done: false
    };
  }

  cancel(reason) {
    if (this._reader) {
      this._reader.cancel(reason);
    }

    if (this._abortController) {
      this._abortController.abort();
    }
  }

}

/***/ })
/******/ ]);
});

