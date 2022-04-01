window.ngxZone.runOutsideAngular(() => {
/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2022 Mozilla Foundation
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


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.VerbosityLevel = exports.Util = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.UNSUPPORTED_FEATURES = exports.TextRenderingMode = exports.StreamType = exports.RenderingIntentFlag = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.PageActionEventType = exports.OPS = exports.MissingPDFException = exports.IsLittleEndianCached = exports.IsEvalSupportedCached = exports.InvalidPDFException = exports.ImageKind = exports.IDENTITY_MATRIX = exports.FormatError = exports.FontType = exports.FONT_IDENTITY_MATRIX = exports.DocumentActionEventType = exports.CMapCompressionType = exports.BaseException = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMode = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.AnnotationActionEventType = exports.AbortException = void 0;
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createPromiseCapability = createPromiseCapability;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
exports.escapeString = escapeString;
exports.getModificationDate = getModificationDate;
exports.getVerbosityLevel = getVerbosityLevel;
exports.info = info;
exports.isArrayBuffer = isArrayBuffer;
exports.isArrayEqual = isArrayEqual;
exports.isAscii = isAscii;
exports.isSameOrigin = isSameOrigin;
exports.objectFromMap = objectFromMap;
exports.objectSize = objectSize;
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

__w_pdfjs_require__(2);

__w_pdfjs_require__(82);

__w_pdfjs_require__(103);

__w_pdfjs_require__(106);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(138);

__w_pdfjs_require__(139);

__w_pdfjs_require__(145);

__w_pdfjs_require__(162);

const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
const FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
const RenderingIntentFlag = {
  ANY: 0x01,
  DISPLAY: 0x02,
  PRINT: 0x04,
  ANNOTATIONS_FORMS: 0x10,
  ANNOTATIONS_STORAGE: 0x20,
  ANNOTATIONS_DISABLE: 0x40,
  OPLIST: 0x100
};
exports.RenderingIntentFlag = RenderingIntentFlag;
const AnnotationMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
};
exports.AnnotationMode = AnnotationMode;
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
  MARKED: "Marked",
  REVIEW: "Review"
};
exports.AnnotationStateModelType = AnnotationStateModelType;
const AnnotationMarkedState = {
  MARKED: "Marked",
  UNMARKED: "Unmarked"
};
exports.AnnotationMarkedState = AnnotationMarkedState;
const AnnotationReviewState = {
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NONE: "None"
};
exports.AnnotationReviewState = AnnotationReviewState;
const AnnotationReplyType = {
  GROUP: "Group",
  REPLY: "R"
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
const AnnotationActionEventType = {
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
const DocumentActionEventType = {
  WC: "WillClose",
  WS: "WillSave",
  DS: "DidSave",
  WP: "WillPrint",
  DP: "DidPrint"
};
exports.DocumentActionEventType = DocumentActionEventType;
const PageActionEventType = {
  O: "PageOpen",
  C: "PageClose"
};
exports.PageActionEventType = PageActionEventType;
const StreamType = {
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
const FontType = {
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
  errorMarkedContent: "errorMarkedContent",
  errorContentSubStream: "errorContentSubStream"
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
    if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
      console.log("Info: ".concat(msg));
    } else if (Window && Window['ngxConsole']) {
      Window['ngxConsole'].log("Info: ".concat(msg));
    } else {
      console.log("Info: ".concat(msg));
    }
  }
}

function warn(msg) {
  if (verbosity >= VerbosityLevel.WARNINGS) {
    if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
      console.log("Warning: ".concat(msg));
    } else if (Window && Window["ngxConsole"]) {
      Window["ngxConsole"].log("Warning: ".concat(msg));
    } else {
      console.log("Warning: ".concat(msg));
    }
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

    if (!base.origin || base.origin === "null") {
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

function createValidAbsoluteUrl(url) {
  let baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!url) {
    return null;
  }

  try {
    if (options && typeof url === "string") {
      if (options.addDefaultProtocol && url.startsWith("www.")) {
        const dots = url.match(/\./g);

        if (dots && dots.length >= 2) {
          url = "http://".concat(url);
        }
      }

      if (options.tryConvertEncoding) {
        try {
          url = stringToUTF8String(url);
        } catch (ex) {}
      }
    }

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
  function BaseException(message, name) {
    if (this.constructor === BaseException) {
      unreachable("Cannot initialize BaseException.");
    }

    this.message = message;
    this.name = name;
  }

  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();

exports.BaseException = BaseException;

class PasswordException extends BaseException {
  constructor(msg, code) {
    super(msg, "PasswordException");
    this.code = code;
  }

}

exports.PasswordException = PasswordException;

class UnknownErrorException extends BaseException {
  constructor(msg, details) {
    super(msg, "UnknownErrorException");
    this.details = details;
  }

}

exports.UnknownErrorException = UnknownErrorException;

class InvalidPDFException extends BaseException {
  constructor(msg) {
    super(msg, "InvalidPDFException");
  }

}

exports.InvalidPDFException = InvalidPDFException;

class MissingPDFException extends BaseException {
  constructor(msg) {
    super(msg, "MissingPDFException");
  }

}

exports.MissingPDFException = MissingPDFException;

class UnexpectedResponseException extends BaseException {
  constructor(msg, status) {
    super(msg, "UnexpectedResponseException");
    this.status = status;
  }

}

exports.UnexpectedResponseException = UnexpectedResponseException;

class FormatError extends BaseException {
  constructor(msg) {
    super(msg, "FormatError");
  }

}

exports.FormatError = FormatError;

class AbortException extends BaseException {
  constructor(msg) {
    super(msg, "AbortException");
  }

}

exports.AbortException = AbortException;

function bytesToString(bytes) {
  if (typeof bytes !== "object" || bytes === null || bytes.length === undefined) {
    unreachable("Invalid argument for bytesToString");
  }

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

  return strBuf.join("");
}

function stringToBytes(str) {
  if (typeof str !== "string") {
    unreachable("Invalid argument for stringToBytes");
  }

  const length = str.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; ++i) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }

  return bytes;
}

function arrayByteLength(arr) {
  if (arr.length !== undefined) {
    return arr.length;
  }

  if (arr.byteLength !== undefined) {
    return arr.byteLength;
  }

  unreachable("Invalid argument for arrayByteLength");
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
      if (typeof item === "string") {
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

function objectSize(obj) {
  return Object.keys(obj).length;
}

function objectFromMap(map) {
  const obj = Object.create(null);

  for (const [key, value] of map) {
    obj[key] = value;
  }

  return obj;
}

function isLittleEndian() {
  const buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  const view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}

const IsLittleEndianCached = {
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

const IsEvalSupportedCached = {
  get value() {
    return shadow(this, "value", isEvalSupported());
  }

};
exports.IsEvalSupportedCached = IsEvalSupportedCached;
const hexNumbers = [...Array(256).keys()].map(n => n.toString(16).padStart(2, "0"));

class Util {
  static makeHexColor(r, g, b) {
    return "#".concat(hexNumbers[r]).concat(hexNumbers[g]).concat(hexNumbers[b]);
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
    const second = Math.sqrt((a + d) ** 2 - 4 * (a * d - c * b)) / 2;
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

  static bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3) {
    const tvalues = [],
          bounds = [[], []];
    let a, b, c, t, t1, t2, b2ac, sqrtb2ac;

    for (let i = 0; i < 2; ++i) {
      if (i === 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }

      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
          continue;
        }

        t = -c / b;

        if (0 < t && t < 1) {
          tvalues.push(t);
        }

        continue;
      }

      b2ac = b * b - 4 * c * a;
      sqrtb2ac = Math.sqrt(b2ac);

      if (b2ac < 0) {
        continue;
      }

      t1 = (-b + sqrtb2ac) / (2 * a);

      if (0 < t1 && t1 < 1) {
        tvalues.push(t1);
      }

      t2 = (-b - sqrtb2ac) / (2 * a);

      if (0 < t2 && t2 < 1) {
        tvalues.push(t2);
      }
    }

    let j = tvalues.length,
        mt;
    const jlen = j;

    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
      bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    bounds[0].length = bounds[1].length = jlen + 2;
    return [Math.min(...bounds[0]), Math.min(...bounds[1]), Math.max(...bounds[0]), Math.max(...bounds[1])];
  }

}

exports.Util = Util;
const PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2d8, 0x2c7, 0x2c6, 0x2d9, 0x2dd, 0x2db, 0x2da, 0x2dc, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203a, 0x2212, 0x2030, 0x201e, 0x201c, 0x201d, 0x2018, 0x2019, 0x201a, 0x2122, 0xfb01, 0xfb02, 0x141, 0x152, 0x160, 0x178, 0x17d, 0x131, 0x142, 0x153, 0x161, 0x17e, 0, 0x20ac];

function stringToPDFString(str) {
  if (str[0] >= "\xEF") {
    let encoding;

    if (str[0] === "\xFE" && str[1] === "\xFF") {
      encoding = "utf-16be";
    } else if (str[0] === "\xFF" && str[1] === "\xFE") {
      encoding = "utf-16le";
    } else if (str[0] === "\xEF" && str[1] === "\xBB" && str[2] === "\xBF") {
      encoding = "utf-8";
    }

    if (encoding) {
      try {
        const decoder = new TextDecoder(encoding, {
          fatal: true
        });
        const buffer = stringToBytes(str);
        return decoder.decode(buffer);
      } catch (ex) {
        warn("stringToPDFString: \"".concat(ex, "\"."));
      }
    }
  }

  const strBuf = [];

  for (let i = 0, ii = str.length; i < ii; i++) {
    const code = PDFStringTranslateTable[str.charCodeAt(i)];
    strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
  }

  return strBuf.join("");
}

function escapeString(str) {
  return str.replace(/([()\\\n\r])/g, match => {
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
  const buf = ["\xFE\xFF"];

  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.charCodeAt(i);
    buf.push(String.fromCharCode(char >> 8 & 0xff), String.fromCharCode(char & 0xff));
  }

  return buf.join("");
}

function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}

function utf8StringToString(str) {
  return unescape(encodeURIComponent(str));
}

function isArrayBuffer(v) {
  return typeof v === "object" && v !== null && v.byteLength !== undefined;
}

function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0, ii = arr1.length; i < ii; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function getModificationDate() {
  let date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  const buffer = [date.getUTCFullYear().toString(), (date.getUTCMonth() + 1).toString().padStart(2, "0"), date.getUTCDate().toString().padStart(2, "0"), date.getUTCHours().toString().padStart(2, "0"), date.getUTCMinutes().toString().padStart(2, "0"), date.getUTCSeconds().toString().padStart(2, "0")];
  return buffer.join("");
}

function createPromiseCapability() {
  const capability = Object.create(null);
  let isSettled = false;
  Object.defineProperty(capability, "settled", {
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

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var DOMIterables = __w_pdfjs_require__(4);
var DOMTokenListPrototype = __w_pdfjs_require__(5);
var ArrayIteratorMethods = __w_pdfjs_require__(9);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var wellKnownSymbol = __w_pdfjs_require__(18);
var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
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
};
for (var COLLECTION_NAME in DOMIterables) {
 handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}
handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

/***/ }),
/* 3 */
/***/ ((module) => {

var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || (function () {
 return this;
}()) || Function('return this')();

/***/ }),
/* 4 */
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
/* 5 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var documentCreateElement = __w_pdfjs_require__(6);
var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;
module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isObject = __w_pdfjs_require__(7);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isCallable = __w_pdfjs_require__(8);
module.exports = function (it) {
 return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = function (argument) {
 return typeof argument == 'function';
};

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var toIndexedObject = __w_pdfjs_require__(10);
var addToUnscopables = __w_pdfjs_require__(17);
var Iterators = __w_pdfjs_require__(58);
var InternalStateModule = __w_pdfjs_require__(59);
var defineProperty = (__w_pdfjs_require__(36).f);
var defineIterator = __w_pdfjs_require__(64);
var IS_PURE = __w_pdfjs_require__(20);
var DESCRIPTORS = __w_pdfjs_require__(34);
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
var values = Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
if (!IS_PURE && DESCRIPTORS && values.name !== 'values')
 try {
  defineProperty(values, 'name', { value: 'values' });
 } catch (error) {
 }

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var IndexedObject = __w_pdfjs_require__(11);
var requireObjectCoercible = __w_pdfjs_require__(16);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var fails = __w_pdfjs_require__(14);
var classof = __w_pdfjs_require__(15);
var Object = global.Object;
var split = uncurryThis(''.split);
module.exports = fails(function () {
 return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_BIND = __w_pdfjs_require__(13);
var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
 return fn && uncurryThis(fn);
} : function (fn) {
 return fn && function () {
  return call.apply(fn, arguments);
 };
};

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
module.exports = !fails(function () {
 var test = function () {
 }.bind();
 return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function (it) {
 return stringSlice(toString(it), 8, -1);
};

/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var TypeError = global.TypeError;
module.exports = function (it) {
 if (it == undefined)
  throw TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 17 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(18);
var create = __w_pdfjs_require__(31);
var definePropertyModule = __w_pdfjs_require__(36);
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
/* 18 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var shared = __w_pdfjs_require__(19);
var hasOwn = __w_pdfjs_require__(23);
var uid = __w_pdfjs_require__(25);
var NATIVE_SYMBOL = __w_pdfjs_require__(26);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(30);
var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function (name) {
 if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
  var description = 'Symbol.' + name;
  if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
   WellKnownSymbolsStore[name] = Symbol[name];
  } else if (USE_SYMBOL_AS_UID && symbolFor) {
   WellKnownSymbolsStore[name] = symbolFor(description);
  } else {
   WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
  }
 }
 return WellKnownSymbolsStore[name];
};

/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var IS_PURE = __w_pdfjs_require__(20);
var store = __w_pdfjs_require__(21);
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.21.1',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
 license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
 source: 'https://github.com/zloirock/core-js'
});

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = false;

/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var setGlobal = __w_pdfjs_require__(22);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 22 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var defineProperty = Object.defineProperty;
module.exports = function (key, value) {
 try {
  defineProperty(global, key, {
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
/* 23 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var toObject = __w_pdfjs_require__(24);
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
module.exports = Object.hasOwn || function hasOwn(it, key) {
 return hasOwnProperty(toObject(it), key);
};

/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var requireObjectCoercible = __w_pdfjs_require__(16);
var Object = global.Object;
module.exports = function (argument) {
 return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function (key) {
 return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),
/* 26 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var V8_VERSION = __w_pdfjs_require__(27);
var fails = __w_pdfjs_require__(14);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 var symbol = Symbol();
 return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var userAgent = __w_pdfjs_require__(28);
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
 match = v8.split('.');
 version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
 match = userAgent.match(/Edge\/(\d+)/);
 if (!match || match[1] >= 74) {
  match = userAgent.match(/Chrome\/(\d+)/);
  if (match)
   version = +match[1];
 }
}
module.exports = version;

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(29);
module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var aFunction = function (argument) {
 return isCallable(argument) ? argument : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),
/* 30 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_SYMBOL = __w_pdfjs_require__(26);
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(32);
var definePropertiesModule = __w_pdfjs_require__(33);
var enumBugKeys = __w_pdfjs_require__(55);
var hiddenKeys = __w_pdfjs_require__(54);
var html = __w_pdfjs_require__(56);
var documentCreateElement = __w_pdfjs_require__(6);
var sharedKey = __w_pdfjs_require__(57);
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
  activeXDocument = new ActiveXObject('htmlfile');
 } catch (error) {
 }
 NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
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
 return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),
/* 32 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isObject = __w_pdfjs_require__(7);
var String = global.String;
var TypeError = global.TypeError;
module.exports = function (argument) {
 if (isObject(argument))
  return argument;
 throw TypeError(String(argument) + ' is not an object');
};

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var V8_PROTOTYPE_DEFINE_BUG = __w_pdfjs_require__(35);
var definePropertyModule = __w_pdfjs_require__(36);
var anObject = __w_pdfjs_require__(32);
var toIndexedObject = __w_pdfjs_require__(10);
var objectKeys = __w_pdfjs_require__(47);
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
 anObject(O);
 var props = toIndexedObject(Properties);
 var keys = objectKeys(Properties);
 var length = keys.length;
 var index = 0;
 var key;
 while (length > index)
  definePropertyModule.f(O, key = keys[index++], props[key]);
 return O;
};

/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
module.exports = !fails(function () {
 return Object.defineProperty({}, 1, {
  get: function () {
   return 7;
  }
 })[1] != 7;
});

/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var fails = __w_pdfjs_require__(14);
module.exports = DESCRIPTORS && fails(function () {
 return Object.defineProperty(function () {
 }, 'prototype', {
  value: 42,
  writable: false
 }).prototype != 42;
});

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var DESCRIPTORS = __w_pdfjs_require__(34);
var IE8_DOM_DEFINE = __w_pdfjs_require__(37);
var V8_PROTOTYPE_DEFINE_BUG = __w_pdfjs_require__(35);
var anObject = __w_pdfjs_require__(32);
var toPropertyKey = __w_pdfjs_require__(38);
var TypeError = global.TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
 anObject(O);
 P = toPropertyKey(P);
 anObject(Attributes);
 if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
  var current = $getOwnPropertyDescriptor(O, P);
  if (current && current[WRITABLE]) {
   O[P] = Attributes.value;
   Attributes = {
    configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
    enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
    writable: false
   };
  }
 }
 return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
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
/* 37 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var fails = __w_pdfjs_require__(14);
var createElement = __w_pdfjs_require__(6);
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

var toPrimitive = __w_pdfjs_require__(39);
var isSymbol = __w_pdfjs_require__(41);
module.exports = function (argument) {
 var key = toPrimitive(argument, 'string');
 return isSymbol(key) ? key : key + '';
};

/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var isObject = __w_pdfjs_require__(7);
var isSymbol = __w_pdfjs_require__(41);
var getMethod = __w_pdfjs_require__(43);
var ordinaryToPrimitive = __w_pdfjs_require__(46);
var wellKnownSymbol = __w_pdfjs_require__(18);
var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
module.exports = function (input, pref) {
 if (!isObject(input) || isSymbol(input))
  return input;
 var exoticToPrim = getMethod(input, TO_PRIMITIVE);
 var result;
 if (exoticToPrim) {
  if (pref === undefined)
   pref = 'default';
  result = call(exoticToPrim, input, pref);
  if (!isObject(result) || isSymbol(result))
   return result;
  throw TypeError("Can't convert object to primitive value");
 }
 if (pref === undefined)
  pref = 'number';
 return ordinaryToPrimitive(input, pref);
};

/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_BIND = __w_pdfjs_require__(13);
var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
 return call.apply(call, arguments);
};

/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var getBuiltIn = __w_pdfjs_require__(29);
var isCallable = __w_pdfjs_require__(8);
var isPrototypeOf = __w_pdfjs_require__(42);
var USE_SYMBOL_AS_UID = __w_pdfjs_require__(30);
var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
 return typeof it == 'symbol';
} : function (it) {
 var $Symbol = getBuiltIn('Symbol');
 return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var aCallable = __w_pdfjs_require__(44);
module.exports = function (V, P) {
 var func = V[P];
 return func == null ? undefined : aCallable(func);
};

/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var tryToString = __w_pdfjs_require__(45);
var TypeError = global.TypeError;
module.exports = function (argument) {
 if (isCallable(argument))
  return argument;
 throw TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),
/* 45 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var String = global.String;
module.exports = function (argument) {
 try {
  return String(argument);
 } catch (error) {
  return 'Object';
 }
};

/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var isCallable = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(7);
var TypeError = global.TypeError;
module.exports = function (input, pref) {
 var fn, val;
 if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
  return val;
 if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)))
  return val;
 if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
  return val;
 throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var internalObjectKeys = __w_pdfjs_require__(48);
var enumBugKeys = __w_pdfjs_require__(55);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var hasOwn = __w_pdfjs_require__(23);
var toIndexedObject = __w_pdfjs_require__(10);
var indexOf = (__w_pdfjs_require__(49).indexOf);
var hiddenKeys = __w_pdfjs_require__(54);
var push = uncurryThis([].push);
module.exports = function (object, names) {
 var O = toIndexedObject(object);
 var i = 0;
 var result = [];
 var key;
 for (key in O)
  !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
 while (names.length > i)
  if (hasOwn(O, key = names[i++])) {
   ~indexOf(result, key) || push(result, key);
  }
 return result;
};

/***/ }),
/* 49 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toIndexedObject = __w_pdfjs_require__(10);
var toAbsoluteIndex = __w_pdfjs_require__(50);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var createMethod = function (IS_INCLUDES) {
 return function ($this, el, fromIndex) {
  var O = toIndexedObject($this);
  var length = lengthOfArrayLike(O);
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
/* 50 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toIntegerOrInfinity = __w_pdfjs_require__(51);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toIntegerOrInfinity(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 51 */
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (argument) {
 var number = +argument;
 return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toLength = __w_pdfjs_require__(53);
module.exports = function (obj) {
 return toLength(obj.length);
};

/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toIntegerOrInfinity = __w_pdfjs_require__(51);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 55 */
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
/* 56 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(29);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var shared = __w_pdfjs_require__(19);
var uid = __w_pdfjs_require__(25);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_WEAK_MAP = __w_pdfjs_require__(60);
var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var isObject = __w_pdfjs_require__(7);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var hasOwn = __w_pdfjs_require__(23);
var shared = __w_pdfjs_require__(21);
var sharedKey = __w_pdfjs_require__(57);
var hiddenKeys = __w_pdfjs_require__(54);
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
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
 var wmget = uncurryThis(store.get);
 var wmhas = uncurryThis(store.has);
 var wmset = uncurryThis(store.set);
 set = function (it, metadata) {
  if (wmhas(store, it))
   throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  metadata.facade = it;
  wmset(store, it, metadata);
  return metadata;
 };
 get = function (it) {
  return wmget(store, it) || {};
 };
 has = function (it) {
  return wmhas(store, it);
 };
} else {
 var STATE = sharedKey('state');
 hiddenKeys[STATE] = true;
 set = function (it, metadata) {
  if (hasOwn(it, STATE))
   throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  metadata.facade = it;
  createNonEnumerableProperty(it, STATE, metadata);
  return metadata;
 };
 get = function (it) {
  return hasOwn(it, STATE) ? it[STATE] : {};
 };
 has = function (it) {
  return hasOwn(it, STATE);
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
/* 60 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var inspectSource = __w_pdfjs_require__(61);
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var isCallable = __w_pdfjs_require__(8);
var store = __w_pdfjs_require__(21);
var functionToString = uncurryThis(Function.toString);
if (!isCallable(store.inspectSource)) {
 store.inspectSource = function (it) {
  return functionToString(it);
 };
}
module.exports = store.inspectSource;

/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var definePropertyModule = __w_pdfjs_require__(36);
var createPropertyDescriptor = __w_pdfjs_require__(63);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 63 */
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
/* 64 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var call = __w_pdfjs_require__(40);
var IS_PURE = __w_pdfjs_require__(20);
var FunctionName = __w_pdfjs_require__(69);
var isCallable = __w_pdfjs_require__(8);
var createIteratorConstructor = __w_pdfjs_require__(75);
var getPrototypeOf = __w_pdfjs_require__(77);
var setPrototypeOf = __w_pdfjs_require__(80);
var setToStringTag = __w_pdfjs_require__(79);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var redefine = __w_pdfjs_require__(68);
var wellKnownSymbol = __w_pdfjs_require__(18);
var Iterators = __w_pdfjs_require__(58);
var IteratorsCore = __w_pdfjs_require__(76);
var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
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
  if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
   if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
    if (setPrototypeOf) {
     setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
    } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
     redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
    }
   }
   setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
   if (IS_PURE)
    Iterators[TO_STRING_TAG] = returnThis;
  }
 }
 if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
  if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
   createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
  } else {
   INCORRECT_VALUES_NAME = true;
   defaultIterator = function values() {
    return call(nativeIterator, this);
   };
  }
 }
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
 if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
  redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
 }
 Iterators[NAME] = defaultIterator;
 return methods;
};

/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var getOwnPropertyDescriptor = (__w_pdfjs_require__(66).f);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var redefine = __w_pdfjs_require__(68);
var setGlobal = __w_pdfjs_require__(22);
var copyConstructorProperties = __w_pdfjs_require__(70);
var isForced = __w_pdfjs_require__(74);
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
    if (typeof sourceProperty == typeof targetProperty)
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
/* 66 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var call = __w_pdfjs_require__(40);
var propertyIsEnumerableModule = __w_pdfjs_require__(67);
var createPropertyDescriptor = __w_pdfjs_require__(63);
var toIndexedObject = __w_pdfjs_require__(10);
var toPropertyKey = __w_pdfjs_require__(38);
var hasOwn = __w_pdfjs_require__(23);
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
 if (hasOwn(O, P))
  return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),
/* 67 */
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
/* 68 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var hasOwn = __w_pdfjs_require__(23);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var setGlobal = __w_pdfjs_require__(22);
var inspectSource = __w_pdfjs_require__(61);
var InternalStateModule = __w_pdfjs_require__(59);
var CONFIGURABLE_FUNCTION_NAME = (__w_pdfjs_require__(69).CONFIGURABLE);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
 var unsafe = options ? !!options.unsafe : false;
 var simple = options ? !!options.enumerable : false;
 var noTargetGet = options ? !!options.noTargetGet : false;
 var name = options && options.name !== undefined ? options.name : key;
 var state;
 if (isCallable(value)) {
  if (String(name).slice(0, 7) === 'Symbol(') {
   name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
   createNonEnumerableProperty(value, 'name', name);
  }
  state = enforceInternalState(value);
  if (!state.source) {
   state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
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
 return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

/***/ }),
/* 69 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var hasOwn = __w_pdfjs_require__(23);
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
var PROPER = EXISTS && function something() {
}.name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
 EXISTS: EXISTS,
 PROPER: PROPER,
 CONFIGURABLE: CONFIGURABLE
};

/***/ }),
/* 70 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var hasOwn = __w_pdfjs_require__(23);
var ownKeys = __w_pdfjs_require__(71);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(66);
var definePropertyModule = __w_pdfjs_require__(36);
module.exports = function (target, source, exceptions) {
 var keys = ownKeys(source);
 var defineProperty = definePropertyModule.f;
 var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
 for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
   defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
 }
};

/***/ }),
/* 71 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var getBuiltIn = __w_pdfjs_require__(29);
var uncurryThis = __w_pdfjs_require__(12);
var getOwnPropertyNamesModule = __w_pdfjs_require__(72);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(73);
var anObject = __w_pdfjs_require__(32);
var concat = uncurryThis([].concat);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

var internalObjectKeys = __w_pdfjs_require__(48);
var enumBugKeys = __w_pdfjs_require__(55);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 74 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var isCallable = __w_pdfjs_require__(8);
var replacement = /#|\.prototype\./;
var isForced = function (feature, detection) {
 var value = data[normalize(feature)];
 return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function (string) {
 return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var IteratorPrototype = (__w_pdfjs_require__(76).IteratorPrototype);
var create = __w_pdfjs_require__(31);
var createPropertyDescriptor = __w_pdfjs_require__(63);
var setToStringTag = __w_pdfjs_require__(79);
var Iterators = __w_pdfjs_require__(58);
var returnThis = function () {
 return this;
};
module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
 var TO_STRING_TAG = NAME + ' Iterator';
 IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
 setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
 Iterators[TO_STRING_TAG] = returnThis;
 return IteratorConstructor;
};

/***/ }),
/* 76 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var fails = __w_pdfjs_require__(14);
var isCallable = __w_pdfjs_require__(8);
var create = __w_pdfjs_require__(31);
var getPrototypeOf = __w_pdfjs_require__(77);
var redefine = __w_pdfjs_require__(68);
var wellKnownSymbol = __w_pdfjs_require__(18);
var IS_PURE = __w_pdfjs_require__(20);
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
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
else if (IS_PURE)
 IteratorPrototype = create(IteratorPrototype);
if (!isCallable(IteratorPrototype[ITERATOR])) {
 redefine(IteratorPrototype, ITERATOR, function () {
  return this;
 });
}
module.exports = {
 IteratorPrototype: IteratorPrototype,
 BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 77 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var hasOwn = __w_pdfjs_require__(23);
var isCallable = __w_pdfjs_require__(8);
var toObject = __w_pdfjs_require__(24);
var sharedKey = __w_pdfjs_require__(57);
var CORRECT_PROTOTYPE_GETTER = __w_pdfjs_require__(78);
var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
 var object = toObject(O);
 if (hasOwn(object, IE_PROTO))
  return object[IE_PROTO];
 var constructor = object.constructor;
 if (isCallable(constructor) && object instanceof constructor) {
  return constructor.prototype;
 }
 return object instanceof Object ? ObjectPrototype : null;
};

/***/ }),
/* 78 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 79 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var defineProperty = (__w_pdfjs_require__(36).f);
var hasOwn = __w_pdfjs_require__(23);
var wellKnownSymbol = __w_pdfjs_require__(18);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
module.exports = function (target, TAG, STATIC) {
 if (target && !STATIC)
  target = target.prototype;
 if (target && !hasOwn(target, TO_STRING_TAG)) {
  defineProperty(target, TO_STRING_TAG, {
   configurable: true,
   value: TAG
  });
 }
};

/***/ }),
/* 80 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var anObject = __w_pdfjs_require__(32);
var aPossiblePrototype = __w_pdfjs_require__(81);
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? (function () {
 var CORRECT_SETTER = false;
 var test = {};
 var setter;
 try {
  setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
  setter(test, []);
  CORRECT_SETTER = test instanceof Array;
 } catch (error) {
 }
 return function setPrototypeOf(O, proto) {
  anObject(O);
  aPossiblePrototype(proto);
  if (CORRECT_SETTER)
   setter(O, proto);
  else
   O.__proto__ = proto;
  return O;
 };
}()) : undefined);

/***/ }),
/* 81 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var String = global.String;
var TypeError = global.TypeError;
module.exports = function (argument) {
 if (typeof argument == 'object' || isCallable(argument))
  return argument;
 throw TypeError("Can't set " + String(argument) + ' as a prototype');
};

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

__w_pdfjs_require__(83);
var $ = __w_pdfjs_require__(65);
var DESCRIPTORS = __w_pdfjs_require__(34);
var USE_NATIVE_URL = __w_pdfjs_require__(88);
var global = __w_pdfjs_require__(3);
var bind = __w_pdfjs_require__(89);
var uncurryThis = __w_pdfjs_require__(12);
var defineProperties = (__w_pdfjs_require__(33).f);
var redefine = __w_pdfjs_require__(68);
var anInstance = __w_pdfjs_require__(90);
var hasOwn = __w_pdfjs_require__(23);
var assign = __w_pdfjs_require__(91);
var arrayFrom = __w_pdfjs_require__(92);
var arraySlice = __w_pdfjs_require__(100);
var codeAt = (__w_pdfjs_require__(84).codeAt);
var toASCII = __w_pdfjs_require__(101);
var $toString = __w_pdfjs_require__(85);
var setToStringTag = __w_pdfjs_require__(79);
var validateArgumentsLength = __w_pdfjs_require__(102);
var URLSearchParamsModule = __w_pdfjs_require__(103);
var InternalStateModule = __w_pdfjs_require__(59);
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[a-z]/i;
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
var EOF;
var parseIPv4 = function (input) {
 var parts = split(input, '.');
 var partsLength, numbers, index, part, radix, number, ipv4;
 if (parts.length && parts[parts.length - 1] == '') {
  parts.length--;
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
  if (part.length > 1 && charAt(part, 0) == '0') {
   radix = exec(HEX_START, part) ? 16 : 8;
   part = stringSlice(part, radix == 8 ? 1 : 2);
  }
  if (part === '') {
   number = 0;
  } else {
   if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part))
    return input;
   number = parseInt(part, radix);
  }
  push(numbers, number);
 }
 for (index = 0; index < partsLength; index++) {
  number = numbers[index];
  if (index == partsLength - 1) {
   if (number >= pow(256, 5 - partsLength))
    return null;
  } else if (number > 255)
   return null;
 }
 ipv4 = pop(numbers);
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
 var chr = function () {
  return charAt(input, pointer);
 };
 if (chr() == ':') {
  if (charAt(input, 1) != ':')
   return;
  pointer += 2;
  pieceIndex++;
  compress = pieceIndex;
 }
 while (chr()) {
  if (pieceIndex == 8)
   return;
  if (chr() == ':') {
   if (compress !== null)
    return;
   pointer++;
   pieceIndex++;
   compress = pieceIndex;
   continue;
  }
  value = length = 0;
  while (length < 4 && exec(HEX, chr())) {
   value = value * 16 + parseInt(chr(), 16);
   pointer++;
   length++;
  }
  if (chr() == '.') {
   if (length == 0)
    return;
   pointer -= length;
   if (pieceIndex > 6)
    return;
   numbersSeen = 0;
   while (chr()) {
    ipv4Piece = null;
    if (numbersSeen > 0) {
     if (chr() == '.' && numbersSeen < 4)
      pointer++;
     else
      return;
    }
    if (!exec(DIGIT, chr()))
     return;
    while (exec(DIGIT, chr())) {
     number = parseInt(chr(), 10);
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
  } else if (chr() == ':') {
   pointer++;
   if (!chr())
    return;
  } else if (chr())
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
   unshift(result, host % 256);
   host = floor(host / 256);
  }
  return join(result, '.');
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
    result += numberToString(host[index], 16);
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
var percentEncode = function (chr, set) {
 var code = codeAt(chr, 0);
 return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};
var specialSchemes = {
 ftp: 21,
 file: null,
 http: 80,
 https: 443,
 ws: 80,
 wss: 443
};
var isWindowsDriveLetter = function (string, normalized) {
 var second;
 return string.length == 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) == ':' || !normalized && second == '|');
};
var startsWithWindowsDriveLetter = function (string) {
 var third;
 return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length == 2 || ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#'));
};
var isSingleDot = function (segment) {
 return segment === '.' || toLowerCase(segment) === '%2e';
};
var isDoubleDot = function (segment) {
 segment = toLowerCase(segment);
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
var URLState = function (url, isBase, base) {
 var urlString = $toString(url);
 var baseState, failure, searchParams;
 if (isBase) {
  failure = this.parse(urlString);
  if (failure)
   throw TypeError(failure);
  this.searchParams = null;
 } else {
  if (base !== undefined)
   baseState = new URLState(base, true);
  failure = this.parse(urlString, null, baseState);
  if (failure)
   throw TypeError(failure);
  searchParams = getInternalSearchParamsState(new URLSearchParams());
  searchParams.bindURL(this);
  this.searchParams = searchParams;
 }
};
URLState.prototype = {
 type: 'URL',
 parse: function (input, stateOverride, base) {
  var url = this;
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, chr, bufferCodePoints, failure;
  input = $toString(input);
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
   input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }
  input = replace(input, TAB_AND_NEW_LINE, '');
  codePoints = arrayFrom(input);
  while (pointer <= codePoints.length) {
   chr = codePoints[pointer];
   switch (state) {
   case SCHEME_START:
    if (chr && exec(ALPHA, chr)) {
     buffer += toLowerCase(chr);
     state = SCHEME;
    } else if (!stateOverride) {
     state = NO_SCHEME;
     continue;
    } else
     return INVALID_SCHEME;
    break;
   case SCHEME:
    if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
     buffer += toLowerCase(chr);
    } else if (chr == ':') {
     if (stateOverride && (url.isSpecial() != hasOwn(specialSchemes, buffer) || buffer == 'file' && (url.includesCredentials() || url.port !== null) || url.scheme == 'file' && !url.host))
      return;
     url.scheme = buffer;
     if (stateOverride) {
      if (url.isSpecial() && specialSchemes[url.scheme] == url.port)
       url.port = null;
      return;
     }
     buffer = '';
     if (url.scheme == 'file') {
      state = FILE;
     } else if (url.isSpecial() && base && base.scheme == url.scheme) {
      state = SPECIAL_RELATIVE_OR_AUTHORITY;
     } else if (url.isSpecial()) {
      state = SPECIAL_AUTHORITY_SLASHES;
     } else if (codePoints[pointer + 1] == '/') {
      state = PATH_OR_AUTHORITY;
      pointer++;
     } else {
      url.cannotBeABaseURL = true;
      push(url.path, '');
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
    if (!base || base.cannotBeABaseURL && chr != '#')
     return INVALID_SCHEME;
    if (base.cannotBeABaseURL && chr == '#') {
     url.scheme = base.scheme;
     url.path = arraySlice(base.path);
     url.query = base.query;
     url.fragment = '';
     url.cannotBeABaseURL = true;
     state = FRAGMENT;
     break;
    }
    state = base.scheme == 'file' ? FILE : RELATIVE;
    continue;
   case SPECIAL_RELATIVE_OR_AUTHORITY:
    if (chr == '/' && codePoints[pointer + 1] == '/') {
     state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
     pointer++;
    } else {
     state = RELATIVE;
     continue;
    }
    break;
   case PATH_OR_AUTHORITY:
    if (chr == '/') {
     state = AUTHORITY;
     break;
    } else {
     state = PATH;
     continue;
    }
   case RELATIVE:
    url.scheme = base.scheme;
    if (chr == EOF) {
     url.username = base.username;
     url.password = base.password;
     url.host = base.host;
     url.port = base.port;
     url.path = arraySlice(base.path);
     url.query = base.query;
    } else if (chr == '/' || chr == '\\' && url.isSpecial()) {
     state = RELATIVE_SLASH;
    } else if (chr == '?') {
     url.username = base.username;
     url.password = base.password;
     url.host = base.host;
     url.port = base.port;
     url.path = arraySlice(base.path);
     url.query = '';
     state = QUERY;
    } else if (chr == '#') {
     url.username = base.username;
     url.password = base.password;
     url.host = base.host;
     url.port = base.port;
     url.path = arraySlice(base.path);
     url.query = base.query;
     url.fragment = '';
     state = FRAGMENT;
    } else {
     url.username = base.username;
     url.password = base.password;
     url.host = base.host;
     url.port = base.port;
     url.path = arraySlice(base.path);
     url.path.length--;
     state = PATH;
     continue;
    }
    break;
   case RELATIVE_SLASH:
    if (url.isSpecial() && (chr == '/' || chr == '\\')) {
     state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
    } else if (chr == '/') {
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
    if (chr != '/' || charAt(buffer, pointer + 1) != '/')
     continue;
    pointer++;
    break;
   case SPECIAL_AUTHORITY_IGNORE_SLASHES:
    if (chr != '/' && chr != '\\') {
     state = AUTHORITY;
     continue;
    }
    break;
   case AUTHORITY:
    if (chr == '@') {
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
    } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
     if (seenAt && buffer == '')
      return INVALID_AUTHORITY;
     pointer -= arrayFrom(buffer).length + 1;
     buffer = '';
     state = HOST;
    } else
     buffer += chr;
    break;
   case HOST:
   case HOSTNAME:
    if (stateOverride && url.scheme == 'file') {
     state = FILE_HOST;
     continue;
    } else if (chr == ':' && !seenBracket) {
     if (buffer == '')
      return INVALID_HOST;
     failure = url.parseHost(buffer);
     if (failure)
      return failure;
     buffer = '';
     state = PORT;
     if (stateOverride == HOSTNAME)
      return;
    } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
     if (url.isSpecial() && buffer == '')
      return INVALID_HOST;
     if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null))
      return;
     failure = url.parseHost(buffer);
     if (failure)
      return failure;
     buffer = '';
     state = PATH_START;
     if (stateOverride)
      return;
     continue;
    } else {
     if (chr == '[')
      seenBracket = true;
     else if (chr == ']')
      seenBracket = false;
     buffer += chr;
    }
    break;
   case PORT:
    if (exec(DIGIT, chr)) {
     buffer += chr;
    } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial() || stateOverride) {
     if (buffer != '') {
      var port = parseInt(buffer, 10);
      if (port > 0xFFFF)
       return INVALID_PORT;
      url.port = url.isSpecial() && port === specialSchemes[url.scheme] ? null : port;
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
    if (chr == '/' || chr == '\\')
     state = FILE_SLASH;
    else if (base && base.scheme == 'file') {
     if (chr == EOF) {
      url.host = base.host;
      url.path = arraySlice(base.path);
      url.query = base.query;
     } else if (chr == '?') {
      url.host = base.host;
      url.path = arraySlice(base.path);
      url.query = '';
      state = QUERY;
     } else if (chr == '#') {
      url.host = base.host;
      url.path = arraySlice(base.path);
      url.query = base.query;
      url.fragment = '';
      state = FRAGMENT;
     } else {
      if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
       url.host = base.host;
       url.path = arraySlice(base.path);
       url.shortenPath();
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
    if (chr == '/' || chr == '\\') {
     state = FILE_HOST;
     break;
    }
    if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
     if (isWindowsDriveLetter(base.path[0], true))
      push(url.path, base.path[0]);
     else
      url.host = base.host;
    }
    state = PATH;
    continue;
   case FILE_HOST:
    if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
     if (!stateOverride && isWindowsDriveLetter(buffer)) {
      state = PATH;
     } else if (buffer == '') {
      url.host = '';
      if (stateOverride)
       return;
      state = PATH_START;
     } else {
      failure = url.parseHost(buffer);
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
     buffer += chr;
    break;
   case PATH_START:
    if (url.isSpecial()) {
     state = PATH;
     if (chr != '/' && chr != '\\')
      continue;
    } else if (!stateOverride && chr == '?') {
     url.query = '';
     state = QUERY;
    } else if (!stateOverride && chr == '#') {
     url.fragment = '';
     state = FRAGMENT;
    } else if (chr != EOF) {
     state = PATH;
     if (chr != '/')
      continue;
    }
    break;
   case PATH:
    if (chr == EOF || chr == '/' || chr == '\\' && url.isSpecial() || !stateOverride && (chr == '?' || chr == '#')) {
     if (isDoubleDot(buffer)) {
      url.shortenPath();
      if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
       push(url.path, '');
      }
     } else if (isSingleDot(buffer)) {
      if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
       push(url.path, '');
      }
     } else {
      if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
       if (url.host)
        url.host = '';
       buffer = charAt(buffer, 0) + ':';
      }
      push(url.path, buffer);
     }
     buffer = '';
     if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
      while (url.path.length > 1 && url.path[0] === '') {
       shift(url.path);
      }
     }
     if (chr == '?') {
      url.query = '';
      state = QUERY;
     } else if (chr == '#') {
      url.fragment = '';
      state = FRAGMENT;
     }
    } else {
     buffer += percentEncode(chr, pathPercentEncodeSet);
    }
    break;
   case CANNOT_BE_A_BASE_URL_PATH:
    if (chr == '?') {
     url.query = '';
     state = QUERY;
    } else if (chr == '#') {
     url.fragment = '';
     state = FRAGMENT;
    } else if (chr != EOF) {
     url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
    }
    break;
   case QUERY:
    if (!stateOverride && chr == '#') {
     url.fragment = '';
     state = FRAGMENT;
    } else if (chr != EOF) {
     if (chr == "'" && url.isSpecial())
      url.query += '%27';
     else if (chr == '#')
      url.query += '%23';
     else
      url.query += percentEncode(chr, C0ControlPercentEncodeSet);
    }
    break;
   case FRAGMENT:
    if (chr != EOF)
     url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
    break;
   }
   pointer++;
  }
 },
 parseHost: function (input) {
  var result, codePoints, index;
  if (charAt(input, 0) == '[') {
   if (charAt(input, input.length - 1) != ']')
    return INVALID_HOST;
   result = parseIPv6(stringSlice(input, 1, -1));
   if (!result)
    return INVALID_HOST;
   this.host = result;
  } else if (!this.isSpecial()) {
   if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input))
    return INVALID_HOST;
   result = '';
   codePoints = arrayFrom(input);
   for (index = 0; index < codePoints.length; index++) {
    result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
   }
   this.host = result;
  } else {
   input = toASCII(input);
   if (exec(FORBIDDEN_HOST_CODE_POINT, input))
    return INVALID_HOST;
   result = parseIPv4(input);
   if (result === null)
    return INVALID_HOST;
   this.host = result;
  }
 },
 cannotHaveUsernamePasswordPort: function () {
  return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
 },
 includesCredentials: function () {
  return this.username != '' || this.password != '';
 },
 isSpecial: function () {
  return hasOwn(specialSchemes, this.scheme);
 },
 shortenPath: function () {
  var path = this.path;
  var pathSize = path.length;
  if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
   path.length--;
  }
 },
 serialize: function () {
  var url = this;
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
   if (url.includesCredentials()) {
    output += username + (password ? ':' + password : '') + '@';
   }
   output += serializeHost(host);
   if (port !== null)
    output += ':' + port;
  } else if (scheme == 'file')
   output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  if (query !== null)
   output += '?' + query;
  if (fragment !== null)
   output += '#' + fragment;
  return output;
 },
 setHref: function (href) {
  var failure = this.parse(href);
  if (failure)
   throw TypeError(failure);
  this.searchParams.update();
 },
 getOrigin: function () {
  var scheme = this.scheme;
  var port = this.port;
  if (scheme == 'blob')
   try {
    return new URLConstructor(scheme.path[0]).origin;
   } catch (error) {
    return 'null';
   }
  if (scheme == 'file' || !this.isSpecial())
   return 'null';
  return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
 },
 getProtocol: function () {
  return this.scheme + ':';
 },
 setProtocol: function (protocol) {
  this.parse($toString(protocol) + ':', SCHEME_START);
 },
 getUsername: function () {
  return this.username;
 },
 setUsername: function (username) {
  var codePoints = arrayFrom($toString(username));
  if (this.cannotHaveUsernamePasswordPort())
   return;
  this.username = '';
  for (var i = 0; i < codePoints.length; i++) {
   this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
  }
 },
 getPassword: function () {
  return this.password;
 },
 setPassword: function (password) {
  var codePoints = arrayFrom($toString(password));
  if (this.cannotHaveUsernamePasswordPort())
   return;
  this.password = '';
  for (var i = 0; i < codePoints.length; i++) {
   this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
  }
 },
 getHost: function () {
  var host = this.host;
  var port = this.port;
  return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
 },
 setHost: function (host) {
  if (this.cannotBeABaseURL)
   return;
  this.parse(host, HOST);
 },
 getHostname: function () {
  var host = this.host;
  return host === null ? '' : serializeHost(host);
 },
 setHostname: function (hostname) {
  if (this.cannotBeABaseURL)
   return;
  this.parse(hostname, HOSTNAME);
 },
 getPort: function () {
  var port = this.port;
  return port === null ? '' : $toString(port);
 },
 setPort: function (port) {
  if (this.cannotHaveUsernamePasswordPort())
   return;
  port = $toString(port);
  if (port == '')
   this.port = null;
  else
   this.parse(port, PORT);
 },
 getPathname: function () {
  var path = this.path;
  return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
 },
 setPathname: function (pathname) {
  if (this.cannotBeABaseURL)
   return;
  this.path = [];
  this.parse(pathname, PATH_START);
 },
 getSearch: function () {
  var query = this.query;
  return query ? '?' + query : '';
 },
 setSearch: function (search) {
  search = $toString(search);
  if (search == '') {
   this.query = null;
  } else {
   if ('?' == charAt(search, 0))
    search = stringSlice(search, 1);
   this.query = '';
   this.parse(search, QUERY);
  }
  this.searchParams.update();
 },
 getSearchParams: function () {
  return this.searchParams.facade;
 },
 getHash: function () {
  var fragment = this.fragment;
  return fragment ? '#' + fragment : '';
 },
 setHash: function (hash) {
  hash = $toString(hash);
  if (hash == '') {
   this.fragment = null;
   return;
  }
  if ('#' == charAt(hash, 0))
   hash = stringSlice(hash, 1);
  this.fragment = '';
  this.parse(hash, FRAGMENT);
 },
 update: function () {
  this.query = this.searchParams.serialize() || null;
 }
};
var URLConstructor = function URL(url) {
 var that = anInstance(this, URLPrototype);
 var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
 var state = setInternalState(that, new URLState(url, false, base));
 if (!DESCRIPTORS) {
  that.href = state.serialize();
  that.origin = state.getOrigin();
  that.protocol = state.getProtocol();
  that.username = state.getUsername();
  that.password = state.getPassword();
  that.host = state.getHost();
  that.hostname = state.getHostname();
  that.port = state.getPort();
  that.pathname = state.getPathname();
  that.search = state.getSearch();
  that.searchParams = state.getSearchParams();
  that.hash = state.getHash();
 }
};
var URLPrototype = URLConstructor.prototype;
var accessorDescriptor = function (getter, setter) {
 return {
  get: function () {
   return getInternalURLState(this)[getter]();
  },
  set: setter && function (value) {
   return getInternalURLState(this)[setter](value);
  },
  configurable: true,
  enumerable: true
 };
};
if (DESCRIPTORS) {
 defineProperties(URLPrototype, {
  href: accessorDescriptor('serialize', 'setHref'),
  origin: accessorDescriptor('getOrigin'),
  protocol: accessorDescriptor('getProtocol', 'setProtocol'),
  username: accessorDescriptor('getUsername', 'setUsername'),
  password: accessorDescriptor('getPassword', 'setPassword'),
  host: accessorDescriptor('getHost', 'setHost'),
  hostname: accessorDescriptor('getHostname', 'setHostname'),
  port: accessorDescriptor('getPort', 'setPort'),
  pathname: accessorDescriptor('getPathname', 'setPathname'),
  search: accessorDescriptor('getSearch', 'setSearch'),
  searchParams: accessorDescriptor('getSearchParams'),
  hash: accessorDescriptor('getHash', 'setHash')
 });
}
redefine(URLPrototype, 'toJSON', function toJSON() {
 return getInternalURLState(this).serialize();
}, { enumerable: true });
redefine(URLPrototype, 'toString', function toString() {
 return getInternalURLState(this).serialize();
}, { enumerable: true });
if (NativeURL) {
 var nativeCreateObjectURL = NativeURL.createObjectURL;
 var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
 if (nativeCreateObjectURL)
  redefine(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
 if (nativeRevokeObjectURL)
  redefine(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}
setToStringTag(URLConstructor, 'URL');
$({
 global: true,
 forced: !USE_NATIVE_URL,
 sham: !DESCRIPTORS
}, { URL: URLConstructor });

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var charAt = (__w_pdfjs_require__(84).charAt);
var toString = __w_pdfjs_require__(85);
var InternalStateModule = __w_pdfjs_require__(59);
var defineIterator = __w_pdfjs_require__(64);
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
/* 84 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var toIntegerOrInfinity = __w_pdfjs_require__(51);
var toString = __w_pdfjs_require__(85);
var requireObjectCoercible = __w_pdfjs_require__(16);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);
var createMethod = function (CONVERT_TO_STRING) {
 return function ($this, pos) {
  var S = toString(requireObjectCoercible($this));
  var position = toIntegerOrInfinity(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size)
   return CONVERT_TO_STRING ? '' : undefined;
  first = charCodeAt(S, position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
 };
};
module.exports = {
 codeAt: createMethod(false),
 charAt: createMethod(true)
};

/***/ }),
/* 85 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var classof = __w_pdfjs_require__(86);
var String = global.String;
module.exports = function (argument) {
 if (classof(argument) === 'Symbol')
  throw TypeError('Cannot convert a Symbol value to a string');
 return String(argument);
};

/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(87);
var isCallable = __w_pdfjs_require__(8);
var classofRaw = __w_pdfjs_require__(15);
var wellKnownSymbol = __w_pdfjs_require__(18);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;
var CORRECT_ARGUMENTS = classofRaw((function () {
 return arguments;
}())) == 'Arguments';
var tryGet = function (it, key) {
 try {
  return it[key];
 } catch (error) {
 }
};
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
 var O, tag, result;
 return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(18);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var wellKnownSymbol = __w_pdfjs_require__(18);
var IS_PURE = __w_pdfjs_require__(20);
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
/* 89 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var aCallable = __w_pdfjs_require__(44);
var NATIVE_BIND = __w_pdfjs_require__(13);
var bind = uncurryThis(uncurryThis.bind);
module.exports = function (fn, that) {
 aCallable(fn);
 return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function () {
  return fn.apply(that, arguments);
 };
};

/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isPrototypeOf = __w_pdfjs_require__(42);
var TypeError = global.TypeError;
module.exports = function (it, Prototype) {
 if (isPrototypeOf(Prototype, it))
  return it;
 throw TypeError('Incorrect invocation');
};

/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var DESCRIPTORS = __w_pdfjs_require__(34);
var uncurryThis = __w_pdfjs_require__(12);
var call = __w_pdfjs_require__(40);
var fails = __w_pdfjs_require__(14);
var objectKeys = __w_pdfjs_require__(47);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(73);
var propertyIsEnumerableModule = __w_pdfjs_require__(67);
var toObject = __w_pdfjs_require__(24);
var IndexedObject = __w_pdfjs_require__(11);
var $assign = Object.assign;
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);
module.exports = !$assign || fails(function () {
 if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
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
 return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
 var T = toObject(target);
 var argumentsLength = arguments.length;
 var index = 1;
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 var propertyIsEnumerable = propertyIsEnumerableModule.f;
 while (argumentsLength > index) {
  var S = IndexedObject(arguments[index++]);
  var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
  var length = keys.length;
  var j = 0;
  var key;
  while (length > j) {
   key = keys[j++];
   if (!DESCRIPTORS || call(propertyIsEnumerable, S, key))
    T[key] = S[key];
  }
 }
 return T;
} : $assign;

/***/ }),
/* 92 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var global = __w_pdfjs_require__(3);
var bind = __w_pdfjs_require__(89);
var call = __w_pdfjs_require__(40);
var toObject = __w_pdfjs_require__(24);
var callWithSafeIterationClosing = __w_pdfjs_require__(93);
var isArrayIteratorMethod = __w_pdfjs_require__(95);
var isConstructor = __w_pdfjs_require__(96);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var createProperty = __w_pdfjs_require__(97);
var getIterator = __w_pdfjs_require__(98);
var getIteratorMethod = __w_pdfjs_require__(99);
var Array = global.Array;
module.exports = function from(arrayLike) {
 var O = toObject(arrayLike);
 var IS_CONSTRUCTOR = isConstructor(this);
 var argumentsLength = arguments.length;
 var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
 var mapping = mapfn !== undefined;
 if (mapping)
  mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
 var iteratorMethod = getIteratorMethod(O);
 var index = 0;
 var length, result, step, iterator, next, value;
 if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
  iterator = getIterator(O, iteratorMethod);
  next = iterator.next;
  result = IS_CONSTRUCTOR ? new this() : [];
  for (; !(step = call(next, iterator)).done; index++) {
   value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [
    step.value,
    index
   ], true) : step.value;
   createProperty(result, index, value);
  }
 } else {
  length = lengthOfArrayLike(O);
  result = IS_CONSTRUCTOR ? new this(length) : Array(length);
  for (; length > index; index++) {
   value = mapping ? mapfn(O[index], index) : O[index];
   createProperty(result, index, value);
  }
 }
 result.length = index;
 return result;
};

/***/ }),
/* 93 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(32);
var iteratorClose = __w_pdfjs_require__(94);
module.exports = function (iterator, fn, value, ENTRIES) {
 try {
  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
 } catch (error) {
  iteratorClose(iterator, 'throw', error);
 }
};

/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var call = __w_pdfjs_require__(40);
var anObject = __w_pdfjs_require__(32);
var getMethod = __w_pdfjs_require__(43);
module.exports = function (iterator, kind, value) {
 var innerResult, innerError;
 anObject(iterator);
 try {
  innerResult = getMethod(iterator, 'return');
  if (!innerResult) {
   if (kind === 'throw')
    throw value;
   return value;
  }
  innerResult = call(innerResult, iterator);
 } catch (error) {
  innerError = true;
  innerResult = error;
 }
 if (kind === 'throw')
  throw value;
 if (innerError)
  throw innerResult;
 anObject(innerResult);
 return value;
};

/***/ }),
/* 95 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(18);
var Iterators = __w_pdfjs_require__(58);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var fails = __w_pdfjs_require__(14);
var isCallable = __w_pdfjs_require__(8);
var classof = __w_pdfjs_require__(86);
var getBuiltIn = __w_pdfjs_require__(29);
var inspectSource = __w_pdfjs_require__(61);
var noop = function () {
};
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
var isConstructorModern = function isConstructor(argument) {
 if (!isCallable(argument))
  return false;
 try {
  construct(noop, empty, argument);
  return true;
 } catch (error) {
  return false;
 }
};
var isConstructorLegacy = function isConstructor(argument) {
 if (!isCallable(argument))
  return false;
 switch (classof(argument)) {
 case 'AsyncFunction':
 case 'GeneratorFunction':
 case 'AsyncGeneratorFunction':
  return false;
 }
 try {
  return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
 } catch (error) {
  return true;
 }
};
isConstructorLegacy.sham = true;
module.exports = !construct || fails(function () {
 var called;
 return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
  called = true;
 }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),
/* 97 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var toPropertyKey = __w_pdfjs_require__(38);
var definePropertyModule = __w_pdfjs_require__(36);
var createPropertyDescriptor = __w_pdfjs_require__(63);
module.exports = function (object, key, value) {
 var propertyKey = toPropertyKey(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 98 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var aCallable = __w_pdfjs_require__(44);
var anObject = __w_pdfjs_require__(32);
var tryToString = __w_pdfjs_require__(45);
var getIteratorMethod = __w_pdfjs_require__(99);
var TypeError = global.TypeError;
module.exports = function (argument, usingIterator) {
 var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
 if (aCallable(iteratorMethod))
  return anObject(call(iteratorMethod, argument));
 throw TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(86);
var getMethod = __w_pdfjs_require__(43);
var Iterators = __w_pdfjs_require__(58);
var wellKnownSymbol = __w_pdfjs_require__(18);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (it != undefined)
  return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),
/* 100 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var toAbsoluteIndex = __w_pdfjs_require__(50);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var createProperty = __w_pdfjs_require__(97);
var Array = global.Array;
var max = Math.max;
module.exports = function (O, start, end) {
 var length = lengthOfArrayLike(O);
 var k = toAbsoluteIndex(start, length);
 var fin = toAbsoluteIndex(end === undefined ? length : end, length);
 var result = Array(max(fin - k, 0));
 for (var n = 0; k < fin; k++, n++)
  createProperty(result, n, O[k]);
 result.length = n;
 return result;
};

/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
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
var RangeError = global.RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);
var ucs2decode = function (string) {
 var output = [];
 var counter = 0;
 var length = string.length;
 while (counter < length) {
  var value = charCodeAt(string, counter++);
  if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
   var extra = charCodeAt(string, counter++);
   if ((extra & 0xFC00) == 0xDC00) {
    push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
   } else {
    push(output, value);
    counter--;
   }
  } else {
   push(output, value);
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
 while (delta > baseMinusTMin * tMax >> 1) {
  delta = floor(delta / baseMinusTMin);
  k += base;
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
   push(output, fromCharCode(currentValue));
  }
 }
 var basicLength = output.length;
 var handledCPCount = basicLength;
 if (basicLength) {
  push(output, delimiter);
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
    var k = base;
    while (true) {
     var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
     if (q < t)
      break;
     var qMinusT = q - t;
     var baseMinusT = base - t;
     push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
     q = floor(qMinusT / baseMinusT);
     k += base;
    }
    push(output, fromCharCode(digitToBasic(q)));
    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
    delta = 0;
    handledCPCount++;
   }
  }
  delta++;
  n++;
 }
 return join(output, '');
};
module.exports = function (input) {
 var encoded = [];
 var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
 var i, label;
 for (i = 0; i < labels.length; i++) {
  label = labels[i];
  push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
 }
 return join(encoded, '.');
};

/***/ }),
/* 102 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var TypeError = global.TypeError;
module.exports = function (passed, required) {
 if (passed < required)
  throw TypeError('Not enough arguments');
 return passed;
};

/***/ }),
/* 103 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

__w_pdfjs_require__(9);
var $ = __w_pdfjs_require__(65);
var global = __w_pdfjs_require__(3);
var getBuiltIn = __w_pdfjs_require__(29);
var call = __w_pdfjs_require__(40);
var uncurryThis = __w_pdfjs_require__(12);
var USE_NATIVE_URL = __w_pdfjs_require__(88);
var redefine = __w_pdfjs_require__(68);
var redefineAll = __w_pdfjs_require__(104);
var setToStringTag = __w_pdfjs_require__(79);
var createIteratorConstructor = __w_pdfjs_require__(75);
var InternalStateModule = __w_pdfjs_require__(59);
var anInstance = __w_pdfjs_require__(90);
var isCallable = __w_pdfjs_require__(8);
var hasOwn = __w_pdfjs_require__(23);
var bind = __w_pdfjs_require__(89);
var classof = __w_pdfjs_require__(86);
var anObject = __w_pdfjs_require__(32);
var isObject = __w_pdfjs_require__(7);
var $toString = __w_pdfjs_require__(85);
var create = __w_pdfjs_require__(31);
var createPropertyDescriptor = __w_pdfjs_require__(63);
var getIterator = __w_pdfjs_require__(98);
var getIteratorMethod = __w_pdfjs_require__(99);
var validateArgumentsLength = __w_pdfjs_require__(102);
var wellKnownSymbol = __w_pdfjs_require__(18);
var arraySort = __w_pdfjs_require__(105);
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var n$Fetch = getBuiltIn('fetch');
var N$Request = getBuiltIn('Request');
var Headers = getBuiltIn('Headers');
var RequestPrototype = N$Request && N$Request.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
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
 var result = replace(it, plus, ' ');
 var bytes = 4;
 try {
  return decodeURIComponent(result);
 } catch (error) {
  while (bytes) {
   result = replace(result, percentSequence(bytes--), percentDecode);
  }
  return result;
 }
};
var find = /[!'()~]|%20/g;
var replacements = {
 '!': '%21',
 "'": '%27',
 '(': '%28',
 ')': '%29',
 '~': '%7E',
 '%20': '+'
};
var replacer = function (match) {
 return replacements[match];
};
var serialize = function (it) {
 return replace(encodeURIComponent(it), find, replacer);
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
}, true);
var URLSearchParamsState = function (init) {
 this.entries = [];
 this.url = null;
 if (init !== undefined) {
  if (isObject(init))
   this.parseObject(init);
  else
   this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
 }
};
URLSearchParamsState.prototype = {
 type: URL_SEARCH_PARAMS,
 bindURL: function (url) {
  this.url = url;
  this.update();
 },
 parseObject: function (object) {
  var iteratorMethod = getIteratorMethod(object);
  var iterator, next, step, entryIterator, entryNext, first, second;
  if (iteratorMethod) {
   iterator = getIterator(object, iteratorMethod);
   next = iterator.next;
   while (!(step = call(next, iterator)).done) {
    entryIterator = getIterator(anObject(step.value));
    entryNext = entryIterator.next;
    if ((first = call(entryNext, entryIterator)).done || (second = call(entryNext, entryIterator)).done || !call(entryNext, entryIterator).done)
     throw TypeError('Expected sequence with length 2');
    push(this.entries, {
     key: $toString(first.value),
     value: $toString(second.value)
    });
   }
  } else
   for (var key in object)
    if (hasOwn(object, key)) {
     push(this.entries, {
      key: key,
      value: $toString(object[key])
     });
    }
 },
 parseQuery: function (query) {
  if (query) {
   var attributes = split(query, '&');
   var index = 0;
   var attribute, entry;
   while (index < attributes.length) {
    attribute = attributes[index++];
    if (attribute.length) {
     entry = split(attribute, '=');
     push(this.entries, {
      key: deserialize(shift(entry)),
      value: deserialize(join(entry, '='))
     });
    }
   }
  }
 },
 serialize: function () {
  var entries = this.entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
   entry = entries[index++];
   push(result, serialize(entry.key) + '=' + serialize(entry.value));
  }
  return join(result, '&');
 },
 update: function () {
  this.entries.length = 0;
  this.parseQuery(this.url.query);
 },
 updateURL: function () {
  if (this.url)
   this.url.update();
 }
};
var URLSearchParamsConstructor = function URLSearchParams() {
 anInstance(this, URLSearchParamsPrototype);
 var init = arguments.length > 0 ? arguments[0] : undefined;
 setInternalState(this, new URLSearchParamsState(init));
};
var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
 append: function append(name, value) {
  validateArgumentsLength(arguments.length, 2);
  var state = getInternalParamsState(this);
  push(state.entries, {
   key: $toString(name),
   value: $toString(value)
  });
  state.updateURL();
 },
 'delete': function (name) {
  validateArgumentsLength(arguments.length, 1);
  var state = getInternalParamsState(this);
  var entries = state.entries;
  var key = $toString(name);
  var index = 0;
  while (index < entries.length) {
   if (entries[index].key === key)
    splice(entries, index, 1);
   else
    index++;
  }
  state.updateURL();
 },
 get: function get(name) {
  validateArgumentsLength(arguments.length, 1);
  var entries = getInternalParamsState(this).entries;
  var key = $toString(name);
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
  var key = $toString(name);
  var result = [];
  var index = 0;
  for (; index < entries.length; index++) {
   if (entries[index].key === key)
    push(result, entries[index].value);
  }
  return result;
 },
 has: function has(name) {
  validateArgumentsLength(arguments.length, 1);
  var entries = getInternalParamsState(this).entries;
  var key = $toString(name);
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
  var key = $toString(name);
  var val = $toString(value);
  var index = 0;
  var entry;
  for (; index < entries.length; index++) {
   entry = entries[index];
   if (entry.key === key) {
    if (found)
     splice(entries, index--, 1);
    else {
     found = true;
     entry.value = val;
    }
   }
  }
  if (!found)
   push(entries, {
    key: key,
    value: val
   });
  state.updateURL();
 },
 sort: function sort() {
  var state = getInternalParamsState(this);
  arraySort(state.entries, function (a, b) {
   return a.key > b.key ? 1 : -1;
  });
  state.updateURL();
 },
 forEach: function forEach(callback) {
  var entries = getInternalParamsState(this).entries;
  var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
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
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });
redefine(URLSearchParamsPrototype, 'toString', function toString() {
 return getInternalParamsState(this).serialize();
}, { enumerable: true });
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$({
 global: true,
 forced: !USE_NATIVE_URL
}, { URLSearchParams: URLSearchParamsConstructor });
if (!USE_NATIVE_URL && isCallable(Headers)) {
 var headersHas = uncurryThis(HeadersPrototype.has);
 var headersSet = uncurryThis(HeadersPrototype.set);
 var wrapRequestOptions = function (init) {
  if (isObject(init)) {
   var body = init.body;
   var headers;
   if (classof(body) === URL_SEARCH_PARAMS) {
    headers = init.headers ? new Headers(init.headers) : new Headers();
    if (!headersHas(headers, 'content-type')) {
     headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }
    return create(init, {
     body: createPropertyDescriptor(0, $toString(body)),
     headers: createPropertyDescriptor(0, headers)
    });
   }
  }
  return init;
 };
 if (isCallable(n$Fetch)) {
  $({
   global: true,
   enumerable: true,
   forced: true
  }, {
   fetch: function fetch(input) {
    return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
   }
  });
 }
 if (isCallable(N$Request)) {
  var RequestConstructor = function Request(input) {
   anInstance(this, RequestPrototype);
   return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
  };
  RequestPrototype.constructor = RequestConstructor;
  RequestConstructor.prototype = RequestPrototype;
  $({
   global: true,
   forced: true
  }, { Request: RequestConstructor });
 }
}
module.exports = {
 URLSearchParams: URLSearchParamsConstructor,
 getState: getInternalParamsState
};

/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var redefine = __w_pdfjs_require__(68);
module.exports = function (target, src, options) {
 for (var key in src)
  redefine(target, key, src[key], options);
 return target;
};

/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var arraySlice = __w_pdfjs_require__(100);
var floor = Math.floor;
var mergeSort = function (array, comparefn) {
 var length = array.length;
 var middle = floor(length / 2);
 return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySlice(array, 0, middle), comparefn), mergeSort(arraySlice(array, middle), comparefn), comparefn);
};
var insertionSort = function (array, comparefn) {
 var length = array.length;
 var i = 1;
 var element, j;
 while (i < length) {
  j = i;
  element = array[i];
  while (j && comparefn(array[j - 1], element) > 0) {
   array[j] = array[--j];
  }
  if (j !== i++)
   array[j] = element;
 }
 return array;
};
var merge = function (array, left, right, comparefn) {
 var llength = left.length;
 var rlength = right.length;
 var lindex = 0;
 var rindex = 0;
 while (lindex < llength || rindex < rlength) {
  array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
 }
 return array;
};
module.exports = mergeSort;

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var exec = __w_pdfjs_require__(107);
$({
 target: 'RegExp',
 proto: true,
 forced: /./.exec !== exec
}, { exec: exec });

/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var call = __w_pdfjs_require__(40);
var uncurryThis = __w_pdfjs_require__(12);
var toString = __w_pdfjs_require__(85);
var regexpFlags = __w_pdfjs_require__(108);
var stickyHelpers = __w_pdfjs_require__(109);
var shared = __w_pdfjs_require__(19);
var create = __w_pdfjs_require__(31);
var getInternalState = (__w_pdfjs_require__(59).get);
var UNSUPPORTED_DOT_ALL = __w_pdfjs_require__(110);
var UNSUPPORTED_NCG = __w_pdfjs_require__(111);
var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var UPDATES_LAST_INDEX_WRONG = (function () {
 var re1 = /a/;
 var re2 = /b*/g;
 call(nativeExec, re1, 'a');
 call(nativeExec, re2, 'a');
 return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}());
var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
 patchedExec = function exec(string) {
  var re = this;
  var state = getInternalState(re);
  var str = toString(string);
  var raw = state.raw;
  var result, reCopy, lastIndex, match, i, object, group;
  if (raw) {
   raw.lastIndex = re.lastIndex;
   result = call(patchedExec, raw, str);
   re.lastIndex = raw.lastIndex;
   return result;
  }
  var groups = state.groups;
  var sticky = UNSUPPORTED_Y && re.sticky;
  var flags = call(regexpFlags, re);
  var source = re.source;
  var charsAdded = 0;
  var strCopy = str;
  if (sticky) {
   flags = replace(flags, 'y', '');
   if (indexOf(flags, 'g') === -1) {
    flags += 'g';
   }
   strCopy = stringSlice(str, re.lastIndex);
   if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
    source = '(?: ' + source + ')';
    strCopy = ' ' + strCopy;
    charsAdded++;
   }
   reCopy = new RegExp('^(?:' + source + ')', flags);
  }
  if (NPCG_INCLUDED) {
   reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
  }
  if (UPDATES_LAST_INDEX_WRONG)
   lastIndex = re.lastIndex;
  match = call(nativeExec, sticky ? reCopy : re, strCopy);
  if (sticky) {
   if (match) {
    match.input = stringSlice(match.input, charsAdded);
    match[0] = stringSlice(match[0], charsAdded);
    match.index = re.lastIndex;
    re.lastIndex += match[0].length;
   } else
    re.lastIndex = 0;
  } else if (UPDATES_LAST_INDEX_WRONG && match) {
   re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
  }
  if (NPCG_INCLUDED && match && match.length > 1) {
   call(nativeReplace, match[0], reCopy, function () {
    for (i = 1; i < arguments.length - 2; i++) {
     if (arguments[i] === undefined)
      match[i] = undefined;
    }
   });
  }
  if (match && groups) {
   match.groups = object = create(null);
   for (i = 0; i < groups.length; i++) {
    group = groups[i];
    object[group[0]] = match[group[1]];
   }
  }
  return match;
 };
}
module.exports = patchedExec;

/***/ }),
/* 108 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var anObject = __w_pdfjs_require__(32);
module.exports = function () {
 var that = anObject(this);
 var result = '';
 if (that.global)
  result += 'g';
 if (that.ignoreCase)
  result += 'i';
 if (that.multiline)
  result += 'm';
 if (that.dotAll)
  result += 's';
 if (that.unicode)
  result += 'u';
 if (that.sticky)
  result += 'y';
 return result;
};

/***/ }),
/* 109 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var global = __w_pdfjs_require__(3);
var $RegExp = global.RegExp;
var UNSUPPORTED_Y = fails(function () {
 var re = $RegExp('a', 'y');
 re.lastIndex = 2;
 return re.exec('abcd') != null;
});
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
 return !$RegExp('a', 'y').sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
 var re = $RegExp('^r', 'gy');
 re.lastIndex = 2;
 return re.exec('str') != null;
});
module.exports = {
 BROKEN_CARET: BROKEN_CARET,
 MISSED_STICKY: MISSED_STICKY,
 UNSUPPORTED_Y: UNSUPPORTED_Y
};

/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var global = __w_pdfjs_require__(3);
var $RegExp = global.RegExp;
module.exports = fails(function () {
 var re = $RegExp('.', 's');
 return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

/***/ }),
/* 111 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var global = __w_pdfjs_require__(3);
var $RegExp = global.RegExp;
module.exports = fails(function () {
 var re = $RegExp('(?<a>b)', 'g');
 return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var createTypedArrayConstructor = __w_pdfjs_require__(113);
createTypedArrayConstructor('Uint8', function (init) {
 return function Uint8Array(data, byteOffset, length) {
  return init(this, data, byteOffset, length);
 };
});

/***/ }),
/* 113 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var DESCRIPTORS = __w_pdfjs_require__(34);
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __w_pdfjs_require__(114);
var ArrayBufferViewCore = __w_pdfjs_require__(116);
var ArrayBufferModule = __w_pdfjs_require__(118);
var anInstance = __w_pdfjs_require__(90);
var createPropertyDescriptor = __w_pdfjs_require__(63);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var isIntegralNumber = __w_pdfjs_require__(122);
var toLength = __w_pdfjs_require__(53);
var toIndex = __w_pdfjs_require__(119);
var toOffset = __w_pdfjs_require__(123);
var toPropertyKey = __w_pdfjs_require__(38);
var hasOwn = __w_pdfjs_require__(23);
var classof = __w_pdfjs_require__(86);
var isObject = __w_pdfjs_require__(7);
var isSymbol = __w_pdfjs_require__(41);
var create = __w_pdfjs_require__(31);
var isPrototypeOf = __w_pdfjs_require__(42);
var setPrototypeOf = __w_pdfjs_require__(80);
var getOwnPropertyNames = (__w_pdfjs_require__(72).f);
var typedArrayFrom = __w_pdfjs_require__(125);
var forEach = (__w_pdfjs_require__(127).forEach);
var setSpecies = __w_pdfjs_require__(131);
var definePropertyModule = __w_pdfjs_require__(36);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(66);
var InternalStateModule = __w_pdfjs_require__(59);
var inheritIfRequired = __w_pdfjs_require__(132);
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';
var fromList = function (C, list) {
 aTypedArrayConstructor(C);
 var index = 0;
 var length = list.length;
 var result = new C(length);
 while (length > index)
  result[index] = list[index++];
 return result;
};
var addGetter = function (it, key) {
 nativeDefineProperty(it, key, {
  get: function () {
   return getInternalState(this)[key];
  }
 });
};
var isArrayBuffer = function (it) {
 var klass;
 return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};
var isTypedArrayIndex = function (target, key) {
 return isTypedArray(target) && !isSymbol(key) && key in target && isIntegralNumber(+key) && key >= 0;
};
var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
 key = toPropertyKey(key);
 return isTypedArrayIndex(target, key) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
};
var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
 key = toPropertyKey(key);
 if (isTypedArrayIndex(target, key) && isObject(descriptor) && hasOwn(descriptor, 'value') && !hasOwn(descriptor, 'get') && !hasOwn(descriptor, 'set') && !descriptor.configurable && (!hasOwn(descriptor, 'writable') || descriptor.writable) && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)) {
  target[key] = descriptor.value;
  return target;
 }
 return nativeDefineProperty(target, key, descriptor);
};
if (DESCRIPTORS) {
 if (!NATIVE_ARRAY_BUFFER_VIEWS) {
  getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
  definePropertyModule.f = wrappedDefineProperty;
  addGetter(TypedArrayPrototype, 'buffer');
  addGetter(TypedArrayPrototype, 'byteOffset');
  addGetter(TypedArrayPrototype, 'byteLength');
  addGetter(TypedArrayPrototype, 'length');
 }
 $({
  target: 'Object',
  stat: true,
  forced: !NATIVE_ARRAY_BUFFER_VIEWS
 }, {
  getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
  defineProperty: wrappedDefineProperty
 });
 module.exports = function (TYPE, wrapper, CLAMPED) {
  var BYTES = TYPE.match(/\d+$/)[0] / 8;
  var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
  var GETTER = 'get' + TYPE;
  var SETTER = 'set' + TYPE;
  var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
  var TypedArrayConstructor = NativeTypedArrayConstructor;
  var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
  var exported = {};
  var getter = function (that, index) {
   var data = getInternalState(that);
   return data.view[GETTER](index * BYTES + data.byteOffset, true);
  };
  var setter = function (that, index, value) {
   var data = getInternalState(that);
   if (CLAMPED)
    value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
   data.view[SETTER](index * BYTES + data.byteOffset, value, true);
  };
  var addElement = function (that, index) {
   nativeDefineProperty(that, index, {
    get: function () {
     return getter(this, index);
    },
    set: function (value) {
     return setter(this, index, value);
    },
    enumerable: true
   });
  };
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
   TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
    anInstance(that, TypedArrayConstructorPrototype);
    var index = 0;
    var byteOffset = 0;
    var buffer, byteLength, length;
    if (!isObject(data)) {
     length = toIndex(data);
     byteLength = length * BYTES;
     buffer = new ArrayBuffer(byteLength);
    } else if (isArrayBuffer(data)) {
     buffer = data;
     byteOffset = toOffset(offset, BYTES);
     var $len = data.byteLength;
     if ($length === undefined) {
      if ($len % BYTES)
       throw RangeError(WRONG_LENGTH);
      byteLength = $len - byteOffset;
      if (byteLength < 0)
       throw RangeError(WRONG_LENGTH);
     } else {
      byteLength = toLength($length) * BYTES;
      if (byteLength + byteOffset > $len)
       throw RangeError(WRONG_LENGTH);
     }
     length = byteLength / BYTES;
    } else if (isTypedArray(data)) {
     return fromList(TypedArrayConstructor, data);
    } else {
     return call(typedArrayFrom, TypedArrayConstructor, data);
    }
    setInternalState(that, {
     buffer: buffer,
     byteOffset: byteOffset,
     byteLength: byteLength,
     length: length,
     view: new DataView(buffer)
    });
    while (index < length)
     addElement(that, index++);
   });
   if (setPrototypeOf)
    setPrototypeOf(TypedArrayConstructor, TypedArray);
   TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
  } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
   TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
    anInstance(dummy, TypedArrayConstructorPrototype);
    return inheritIfRequired((function () {
     if (!isObject(data))
      return new NativeTypedArrayConstructor(toIndex(data));
     if (isArrayBuffer(data))
      return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
     if (isTypedArray(data))
      return fromList(TypedArrayConstructor, data);
     return call(typedArrayFrom, TypedArrayConstructor, data);
    }()), dummy, TypedArrayConstructor);
   });
   if (setPrototypeOf)
    setPrototypeOf(TypedArrayConstructor, TypedArray);
   forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
    if (!(key in TypedArrayConstructor)) {
     createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
    }
   });
   TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
  }
  if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
   createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
  }
  createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);
  if (TYPED_ARRAY_TAG) {
   createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
  }
  exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
  $({
   global: true,
   forced: TypedArrayConstructor != NativeTypedArrayConstructor,
   sham: !NATIVE_ARRAY_BUFFER_VIEWS
  }, exported);
  if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
   createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
  }
  if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
   createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
  }
  setSpecies(CONSTRUCTOR_NAME);
 };
} else
 module.exports = function () {
 };

/***/ }),
/* 114 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var fails = __w_pdfjs_require__(14);
var checkCorrectnessOfIteration = __w_pdfjs_require__(115);
var NATIVE_ARRAY_BUFFER_VIEWS = (__w_pdfjs_require__(116).NATIVE_ARRAY_BUFFER_VIEWS);
var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;
module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
 Int8Array(1);
}) || !fails(function () {
 new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
 new Int8Array();
 new Int8Array(null);
 new Int8Array(1.5);
 new Int8Array(iterable);
}, true) || fails(function () {
 return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});

/***/ }),
/* 115 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var wellKnownSymbol = __w_pdfjs_require__(18);
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
/* 116 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var NATIVE_ARRAY_BUFFER = __w_pdfjs_require__(117);
var DESCRIPTORS = __w_pdfjs_require__(34);
var global = __w_pdfjs_require__(3);
var isCallable = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(7);
var hasOwn = __w_pdfjs_require__(23);
var classof = __w_pdfjs_require__(86);
var tryToString = __w_pdfjs_require__(45);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var redefine = __w_pdfjs_require__(68);
var defineProperty = (__w_pdfjs_require__(36).f);
var isPrototypeOf = __w_pdfjs_require__(42);
var getPrototypeOf = __w_pdfjs_require__(77);
var setPrototypeOf = __w_pdfjs_require__(80);
var wellKnownSymbol = __w_pdfjs_require__(18);
var uid = __w_pdfjs_require__(25);
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;
var TypedArrayConstructorsList = {
 Int8Array: 1,
 Uint8Array: 1,
 Uint8ClampedArray: 1,
 Int16Array: 2,
 Uint16Array: 2,
 Int32Array: 4,
 Uint32Array: 4,
 Float32Array: 4,
 Float64Array: 8
};
var BigIntArrayConstructorsList = {
 BigInt64Array: 8,
 BigUint64Array: 8
};
var isView = function isView(it) {
 if (!isObject(it))
  return false;
 var klass = classof(it);
 return klass === 'DataView' || hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};
var isTypedArray = function (it) {
 if (!isObject(it))
  return false;
 var klass = classof(it);
 return hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};
var aTypedArray = function (it) {
 if (isTypedArray(it))
  return it;
 throw TypeError('Target is not a typed array');
};
var aTypedArrayConstructor = function (C) {
 if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C)))
  return C;
 throw TypeError(tryToString(C) + ' is not a typed array constructor');
};
var exportTypedArrayMethod = function (KEY, property, forced, options) {
 if (!DESCRIPTORS)
  return;
 if (forced)
  for (var ARRAY in TypedArrayConstructorsList) {
   var TypedArrayConstructor = global[ARRAY];
   if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY))
    try {
     delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
     try {
      TypedArrayConstructor.prototype[KEY] = property;
     } catch (error2) {
     }
    }
  }
 if (!TypedArrayPrototype[KEY] || forced) {
  redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
 }
};
var exportTypedArrayStaticMethod = function (KEY, property, forced) {
 var ARRAY, TypedArrayConstructor;
 if (!DESCRIPTORS)
  return;
 if (setPrototypeOf) {
  if (forced)
   for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY))
     try {
      delete TypedArrayConstructor[KEY];
     } catch (error) {
     }
   }
  if (!TypedArray[KEY] || forced) {
   try {
    return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
   } catch (error) {
   }
  } else
   return;
 }
 for (ARRAY in TypedArrayConstructorsList) {
  TypedArrayConstructor = global[ARRAY];
  if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
   redefine(TypedArrayConstructor, KEY, property);
  }
 }
};
for (NAME in TypedArrayConstructorsList) {
 Constructor = global[NAME];
 Prototype = Constructor && Constructor.prototype;
 if (Prototype)
  createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
 else
  NATIVE_ARRAY_BUFFER_VIEWS = false;
}
for (NAME in BigIntArrayConstructorsList) {
 Constructor = global[NAME];
 Prototype = Constructor && Constructor.prototype;
 if (Prototype)
  createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
 TypedArray = function TypedArray() {
  throw TypeError('Incorrect invocation');
 };
 if (NATIVE_ARRAY_BUFFER_VIEWS)
  for (NAME in TypedArrayConstructorsList) {
   if (global[NAME])
    setPrototypeOf(global[NAME], TypedArray);
  }
}
if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
 TypedArrayPrototype = TypedArray.prototype;
 if (NATIVE_ARRAY_BUFFER_VIEWS)
  for (NAME in TypedArrayConstructorsList) {
   if (global[NAME])
    setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
 setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}
if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
 TYPED_ARRAY_TAG_REQUIRED = true;
 defineProperty(TypedArrayPrototype, TO_STRING_TAG, {
  get: function () {
   return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  }
 });
 for (NAME in TypedArrayConstructorsList)
  if (global[NAME]) {
   createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}
module.exports = {
 NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
 TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
 TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
 aTypedArray: aTypedArray,
 aTypedArrayConstructor: aTypedArrayConstructor,
 exportTypedArrayMethod: exportTypedArrayMethod,
 exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
 isView: isView,
 isTypedArray: isTypedArray,
 TypedArray: TypedArray,
 TypedArrayPrototype: TypedArrayPrototype
};

/***/ }),
/* 117 */
/***/ ((module) => {

module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

/***/ }),
/* 118 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var DESCRIPTORS = __w_pdfjs_require__(34);
var NATIVE_ARRAY_BUFFER = __w_pdfjs_require__(117);
var FunctionName = __w_pdfjs_require__(69);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var redefineAll = __w_pdfjs_require__(104);
var fails = __w_pdfjs_require__(14);
var anInstance = __w_pdfjs_require__(90);
var toIntegerOrInfinity = __w_pdfjs_require__(51);
var toLength = __w_pdfjs_require__(53);
var toIndex = __w_pdfjs_require__(119);
var IEEE754 = __w_pdfjs_require__(120);
var getPrototypeOf = __w_pdfjs_require__(77);
var setPrototypeOf = __w_pdfjs_require__(80);
var getOwnPropertyNames = (__w_pdfjs_require__(72).f);
var defineProperty = (__w_pdfjs_require__(36).f);
var arrayFill = __w_pdfjs_require__(121);
var arraySlice = __w_pdfjs_require__(100);
var setToStringTag = __w_pdfjs_require__(79);
var InternalStateModule = __w_pdfjs_require__(59);
var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);
var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;
var packInt8 = function (number) {
 return [number & 0xFF];
};
var packInt16 = function (number) {
 return [
  number & 0xFF,
  number >> 8 & 0xFF
 ];
};
var packInt32 = function (number) {
 return [
  number & 0xFF,
  number >> 8 & 0xFF,
  number >> 16 & 0xFF,
  number >> 24 & 0xFF
 ];
};
var unpackInt32 = function (buffer) {
 return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};
var packFloat32 = function (number) {
 return packIEEE754(number, 23, 4);
};
var packFloat64 = function (number) {
 return packIEEE754(number, 52, 8);
};
var addGetter = function (Constructor, key) {
 defineProperty(Constructor[PROTOTYPE], key, {
  get: function () {
   return getInternalState(this)[key];
  }
 });
};
var get = function (view, count, index, isLittleEndian) {
 var intIndex = toIndex(index);
 var store = getInternalState(view);
 if (intIndex + count > store.byteLength)
  throw RangeError(WRONG_INDEX);
 var bytes = getInternalState(store.buffer).bytes;
 var start = intIndex + store.byteOffset;
 var pack = arraySlice(bytes, start, start + count);
 return isLittleEndian ? pack : reverse(pack);
};
var set = function (view, count, index, conversion, value, isLittleEndian) {
 var intIndex = toIndex(index);
 var store = getInternalState(view);
 if (intIndex + count > store.byteLength)
  throw RangeError(WRONG_INDEX);
 var bytes = getInternalState(store.buffer).bytes;
 var start = intIndex + store.byteOffset;
 var pack = conversion(+value);
 for (var i = 0; i < count; i++)
  bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};
if (!NATIVE_ARRAY_BUFFER) {
 $ArrayBuffer = function ArrayBuffer(length) {
  anInstance(this, ArrayBufferPrototype);
  var byteLength = toIndex(length);
  setInternalState(this, {
   bytes: fill(Array(byteLength), 0),
   byteLength: byteLength
  });
  if (!DESCRIPTORS)
   this.byteLength = byteLength;
 };
 ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];
 $DataView = function DataView(buffer, byteOffset, byteLength) {
  anInstance(this, DataViewPrototype);
  anInstance(buffer, ArrayBufferPrototype);
  var bufferLength = getInternalState(buffer).byteLength;
  var offset = toIntegerOrInfinity(byteOffset);
  if (offset < 0 || offset > bufferLength)
   throw RangeError('Wrong offset');
  byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
  if (offset + byteLength > bufferLength)
   throw RangeError(WRONG_LENGTH);
  setInternalState(this, {
   buffer: buffer,
   byteLength: byteLength,
   byteOffset: offset
  });
  if (!DESCRIPTORS) {
   this.buffer = buffer;
   this.byteLength = byteLength;
   this.byteOffset = offset;
  }
 };
 DataViewPrototype = $DataView[PROTOTYPE];
 if (DESCRIPTORS) {
  addGetter($ArrayBuffer, 'byteLength');
  addGetter($DataView, 'buffer');
  addGetter($DataView, 'byteLength');
  addGetter($DataView, 'byteOffset');
 }
 redefineAll(DataViewPrototype, {
  getInt8: function getInt8(byteOffset) {
   return get(this, 1, byteOffset)[0] << 24 >> 24;
  },
  getUint8: function getUint8(byteOffset) {
   return get(this, 1, byteOffset)[0];
  },
  getInt16: function getInt16(byteOffset) {
   var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
   return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
  },
  getUint16: function getUint16(byteOffset) {
   var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
   return bytes[1] << 8 | bytes[0];
  },
  getInt32: function getInt32(byteOffset) {
   return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
  },
  getUint32: function getUint32(byteOffset) {
   return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
  },
  getFloat32: function getFloat32(byteOffset) {
   return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
  },
  getFloat64: function getFloat64(byteOffset) {
   return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
  },
  setInt8: function setInt8(byteOffset, value) {
   set(this, 1, byteOffset, packInt8, value);
  },
  setUint8: function setUint8(byteOffset, value) {
   set(this, 1, byteOffset, packInt8, value);
  },
  setInt16: function setInt16(byteOffset, value) {
   set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
  },
  setUint16: function setUint16(byteOffset, value) {
   set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
  },
  setInt32: function setInt32(byteOffset, value) {
   set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
  },
  setUint32: function setUint32(byteOffset, value) {
   set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
  },
  setFloat32: function setFloat32(byteOffset, value) {
   set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
  },
  setFloat64: function setFloat64(byteOffset, value) {
   set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
  }
 });
} else {
 var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
 if (!fails(function () {
   NativeArrayBuffer(1);
  }) || !fails(function () {
   new NativeArrayBuffer(-1);
  }) || fails(function () {
   new NativeArrayBuffer();
   new NativeArrayBuffer(1.5);
   new NativeArrayBuffer(NaN);
   return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  $ArrayBuffer = function ArrayBuffer(length) {
   anInstance(this, ArrayBufferPrototype);
   return new NativeArrayBuffer(toIndex(length));
  };
  $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;
  for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
   if (!((key = keys[j++]) in $ArrayBuffer)) {
    createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
   }
  }
  ArrayBufferPrototype.constructor = $ArrayBuffer;
 } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
  createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
 }
 if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
  setPrototypeOf(DataViewPrototype, ObjectPrototype);
 }
 var testView = new $DataView(new $ArrayBuffer(2));
 var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
 testView.setInt8(0, 2147483648);
 testView.setInt8(1, 2147483649);
 if (testView.getInt8(0) || !testView.getInt8(1))
  redefineAll(DataViewPrototype, {
   setInt8: function setInt8(byteOffset, value) {
    $setInt8(this, byteOffset, value << 24 >> 24);
   },
   setUint8: function setUint8(byteOffset, value) {
    $setInt8(this, byteOffset, value << 24 >> 24);
   }
  }, { unsafe: true });
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
module.exports = {
 ArrayBuffer: $ArrayBuffer,
 DataView: $DataView
};

/***/ }),
/* 119 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var toIntegerOrInfinity = __w_pdfjs_require__(51);
var toLength = __w_pdfjs_require__(53);
var RangeError = global.RangeError;
module.exports = function (it) {
 if (it === undefined)
  return 0;
 var number = toIntegerOrInfinity(it);
 var length = toLength(number);
 if (number !== length)
  throw RangeError('Wrong length or index');
 return length;
};

/***/ }),
/* 120 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var pack = function (number, mantissaLength, bytes) {
 var buffer = Array(bytes);
 var exponentLength = bytes * 8 - mantissaLength - 1;
 var eMax = (1 << exponentLength) - 1;
 var eBias = eMax >> 1;
 var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
 var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
 var index = 0;
 var exponent, mantissa, c;
 number = abs(number);
 if (number != number || number === Infinity) {
  mantissa = number != number ? 1 : 0;
  exponent = eMax;
 } else {
  exponent = floor(log(number) / LN2);
  c = pow(2, -exponent);
  if (number * c < 1) {
   exponent--;
   c *= 2;
  }
  if (exponent + eBias >= 1) {
   number += rt / c;
  } else {
   number += rt * pow(2, 1 - eBias);
  }
  if (number * c >= 2) {
   exponent++;
   c /= 2;
  }
  if (exponent + eBias >= eMax) {
   mantissa = 0;
   exponent = eMax;
  } else if (exponent + eBias >= 1) {
   mantissa = (number * c - 1) * pow(2, mantissaLength);
   exponent = exponent + eBias;
  } else {
   mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
   exponent = 0;
  }
 }
 while (mantissaLength >= 8) {
  buffer[index++] = mantissa & 255;
  mantissa /= 256;
  mantissaLength -= 8;
 }
 exponent = exponent << mantissaLength | mantissa;
 exponentLength += mantissaLength;
 while (exponentLength > 0) {
  buffer[index++] = exponent & 255;
  exponent /= 256;
  exponentLength -= 8;
 }
 buffer[--index] |= sign * 128;
 return buffer;
};
var unpack = function (buffer, mantissaLength) {
 var bytes = buffer.length;
 var exponentLength = bytes * 8 - mantissaLength - 1;
 var eMax = (1 << exponentLength) - 1;
 var eBias = eMax >> 1;
 var nBits = exponentLength - 7;
 var index = bytes - 1;
 var sign = buffer[index--];
 var exponent = sign & 127;
 var mantissa;
 sign >>= 7;
 while (nBits > 0) {
  exponent = exponent * 256 + buffer[index--];
  nBits -= 8;
 }
 mantissa = exponent & (1 << -nBits) - 1;
 exponent >>= -nBits;
 nBits += mantissaLength;
 while (nBits > 0) {
  mantissa = mantissa * 256 + buffer[index--];
  nBits -= 8;
 }
 if (exponent === 0) {
  exponent = 1 - eBias;
 } else if (exponent === eMax) {
  return mantissa ? NaN : sign ? -Infinity : Infinity;
 } else {
  mantissa = mantissa + pow(2, mantissaLength);
  exponent = exponent - eBias;
 }
 return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};
module.exports = {
 pack: pack,
 unpack: unpack
};

/***/ }),
/* 121 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var toObject = __w_pdfjs_require__(24);
var toAbsoluteIndex = __w_pdfjs_require__(50);
var lengthOfArrayLike = __w_pdfjs_require__(52);
module.exports = function fill(value) {
 var O = toObject(this);
 var length = lengthOfArrayLike(O);
 var argumentsLength = arguments.length;
 var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
 var end = argumentsLength > 2 ? arguments[2] : undefined;
 var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
 while (endPos > index)
  O[index++] = value;
 return O;
};

/***/ }),
/* 122 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(7);
var floor = Math.floor;
module.exports = Number.isInteger || function isInteger(it) {
 return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 123 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var toPositiveInteger = __w_pdfjs_require__(124);
var RangeError = global.RangeError;
module.exports = function (it, BYTES) {
 var offset = toPositiveInteger(it);
 if (offset % BYTES)
  throw RangeError('Wrong offset');
 return offset;
};

/***/ }),
/* 124 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var toIntegerOrInfinity = __w_pdfjs_require__(51);
var RangeError = global.RangeError;
module.exports = function (it) {
 var result = toIntegerOrInfinity(it);
 if (result < 0)
  throw RangeError("The argument can't be less than 0");
 return result;
};

/***/ }),
/* 125 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var bind = __w_pdfjs_require__(89);
var call = __w_pdfjs_require__(40);
var aConstructor = __w_pdfjs_require__(126);
var toObject = __w_pdfjs_require__(24);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var getIterator = __w_pdfjs_require__(98);
var getIteratorMethod = __w_pdfjs_require__(99);
var isArrayIteratorMethod = __w_pdfjs_require__(95);
var aTypedArrayConstructor = (__w_pdfjs_require__(116).aTypedArrayConstructor);
module.exports = function from(source) {
 var C = aConstructor(this);
 var O = toObject(source);
 var argumentsLength = arguments.length;
 var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
 var mapping = mapfn !== undefined;
 var iteratorMethod = getIteratorMethod(O);
 var i, length, result, step, iterator, next;
 if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
  iterator = getIterator(O, iteratorMethod);
  next = iterator.next;
  O = [];
  while (!(step = call(next, iterator)).done) {
   O.push(step.value);
  }
 }
 if (mapping && argumentsLength > 2) {
  mapfn = bind(mapfn, arguments[2]);
 }
 length = lengthOfArrayLike(O);
 result = new (aTypedArrayConstructor(C))(length);
 for (i = 0; length > i; i++) {
  result[i] = mapping ? mapfn(O[i], i) : O[i];
 }
 return result;
};

/***/ }),
/* 126 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isConstructor = __w_pdfjs_require__(96);
var tryToString = __w_pdfjs_require__(45);
var TypeError = global.TypeError;
module.exports = function (argument) {
 if (isConstructor(argument))
  return argument;
 throw TypeError(tryToString(argument) + ' is not a constructor');
};

/***/ }),
/* 127 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var bind = __w_pdfjs_require__(89);
var uncurryThis = __w_pdfjs_require__(12);
var IndexedObject = __w_pdfjs_require__(11);
var toObject = __w_pdfjs_require__(24);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var arraySpeciesCreate = __w_pdfjs_require__(128);
var push = uncurryThis([].push);
var createMethod = function (TYPE) {
 var IS_MAP = TYPE == 1;
 var IS_FILTER = TYPE == 2;
 var IS_SOME = TYPE == 3;
 var IS_EVERY = TYPE == 4;
 var IS_FIND_INDEX = TYPE == 6;
 var IS_FILTER_REJECT = TYPE == 7;
 var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
 return function ($this, callbackfn, that, specificCreate) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var create = specificCreate || arraySpeciesCreate;
  var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
       push(target, value);
      }
     else
      switch (TYPE) {
      case 4:
       return false;
      case 7:
       push(target, value);
      }
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
 findIndex: createMethod(6),
 filterReject: createMethod(7)
};

/***/ }),
/* 128 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var arraySpeciesConstructor = __w_pdfjs_require__(129);
module.exports = function (originalArray, length) {
 return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),
/* 129 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var isArray = __w_pdfjs_require__(130);
var isConstructor = __w_pdfjs_require__(96);
var isObject = __w_pdfjs_require__(7);
var wellKnownSymbol = __w_pdfjs_require__(18);
var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
module.exports = function (originalArray) {
 var C;
 if (isArray(originalArray)) {
  C = originalArray.constructor;
  if (isConstructor(C) && (C === Array || isArray(C.prototype)))
   C = undefined;
  else if (isObject(C)) {
   C = C[SPECIES];
   if (C === null)
    C = undefined;
  }
 }
 return C === undefined ? Array : C;
};

/***/ }),
/* 130 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(15);
module.exports = Array.isArray || function isArray(argument) {
 return classof(argument) == 'Array';
};

/***/ }),
/* 131 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var getBuiltIn = __w_pdfjs_require__(29);
var definePropertyModule = __w_pdfjs_require__(36);
var wellKnownSymbol = __w_pdfjs_require__(18);
var DESCRIPTORS = __w_pdfjs_require__(34);
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
/* 132 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isCallable = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(7);
var setPrototypeOf = __w_pdfjs_require__(80);
module.exports = function ($this, dummy, Wrapper) {
 var NewTarget, NewTargetPrototype;
 if (setPrototypeOf && isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
  setPrototypeOf($this, NewTargetPrototype);
 return $this;
};

/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var ArrayBufferViewCore = __w_pdfjs_require__(116);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var toOffset = __w_pdfjs_require__(123);
var toIndexedObject = __w_pdfjs_require__(24);
var fails = __w_pdfjs_require__(14);
var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
 var array = new Uint8ClampedArray(2);
 call($set, array, {
  length: 1,
  0: 3
 }, 1);
 return array[1] !== 3;
});
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
 var array = new Int8Array(2);
 array.set(1);
 array.set('2', 1);
 return array[0] !== 0 || array[1] !== 2;
});
exportTypedArrayMethod('set', function set(arrayLike) {
 aTypedArray(this);
 var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
 var src = toIndexedObject(arrayLike);
 if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS)
  return call($set, this, src, offset);
 var length = this.length;
 var len = lengthOfArrayLike(src);
 var index = 0;
 if (len + offset > length)
  throw RangeError('Wrong length');
 while (index < len)
  this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var fails = __w_pdfjs_require__(14);
var aCallable = __w_pdfjs_require__(44);
var internalSort = __w_pdfjs_require__(105);
var ArrayBufferViewCore = __w_pdfjs_require__(116);
var FF = __w_pdfjs_require__(135);
var IE_OR_EDGE = __w_pdfjs_require__(136);
var V8 = __w_pdfjs_require__(27);
var WEBKIT = __w_pdfjs_require__(137);
var Array = global.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
 un$Sort(new Uint16Array(2), null);
}) && fails(function () {
 un$Sort(new Uint16Array(2), {});
}));
var STABLE_SORT = !!un$Sort && !fails(function () {
 if (V8)
  return V8 < 74;
 if (FF)
  return FF < 67;
 if (IE_OR_EDGE)
  return true;
 if (WEBKIT)
  return WEBKIT < 602;
 var array = new Uint16Array(516);
 var expected = Array(516);
 var index, mod;
 for (index = 0; index < 516; index++) {
  mod = index % 4;
  array[index] = 515 - index;
  expected[index] = index - 2 * mod + 3;
 }
 un$Sort(array, function (a, b) {
  return (a / 4 | 0) - (b / 4 | 0);
 });
 for (index = 0; index < 516; index++) {
  if (array[index] !== expected[index])
   return true;
 }
});
var getSortCompare = function (comparefn) {
 return function (x, y) {
  if (comparefn !== undefined)
   return +comparefn(x, y) || 0;
  if (y !== y)
   return -1;
  if (x !== x)
   return 1;
  if (x === 0 && y === 0)
   return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
  return x > y;
 };
};
exportTypedArrayMethod('sort', function sort(comparefn) {
 if (comparefn !== undefined)
  aCallable(comparefn);
 if (STABLE_SORT)
  return un$Sort(this, comparefn);
 return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

/***/ }),
/* 135 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(28);
var firefox = userAgent.match(/firefox\/(\d+)/i);
module.exports = !!firefox && +firefox[1];

/***/ }),
/* 136 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var UA = __w_pdfjs_require__(28);
module.exports = /MSIE|Trident/.test(UA);

/***/ }),
/* 137 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(28);
var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
module.exports = !!webkit && +webkit[1];

/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var createTypedArrayConstructor = __w_pdfjs_require__(113);
createTypedArrayConstructor('Uint32', function (init) {
 return function Uint32Array(data, byteOffset, length) {
  return init(this, data, byteOffset, length);
 };
});

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var apply = __w_pdfjs_require__(140);
var call = __w_pdfjs_require__(40);
var uncurryThis = __w_pdfjs_require__(12);
var fixRegExpWellKnownSymbolLogic = __w_pdfjs_require__(141);
var fails = __w_pdfjs_require__(14);
var anObject = __w_pdfjs_require__(32);
var isCallable = __w_pdfjs_require__(8);
var toIntegerOrInfinity = __w_pdfjs_require__(51);
var toLength = __w_pdfjs_require__(53);
var toString = __w_pdfjs_require__(85);
var requireObjectCoercible = __w_pdfjs_require__(16);
var advanceStringIndex = __w_pdfjs_require__(142);
var getMethod = __w_pdfjs_require__(43);
var getSubstitution = __w_pdfjs_require__(143);
var regExpExec = __w_pdfjs_require__(144);
var wellKnownSymbol = __w_pdfjs_require__(18);
var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
var maybeToString = function (it) {
 return it === undefined ? it : String(it);
};
var REPLACE_KEEPS_$0 = (function () {
 return 'a'.replace(/./, '$0') === '$0';
}());
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
 if (/./[REPLACE]) {
  return /./[REPLACE]('a', '$0') === '';
 }
 return false;
}());
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
 var re = /./;
 re.exec = function () {
  var result = [];
  result.groups = { a: '7' };
  return result;
 };
 return ''.replace(re, '$<a>') !== '7';
});
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
 var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
 return [
  function replace(searchValue, replaceValue) {
   var O = requireObjectCoercible(this);
   var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
   return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace, toString(O), searchValue, replaceValue);
  },
  function (string, replaceValue) {
   var rx = anObject(this);
   var S = toString(string);
   if (typeof replaceValue == 'string' && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, '$<') === -1) {
    var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
    if (res.done)
     return res.value;
   }
   var functionalReplace = isCallable(replaceValue);
   if (!functionalReplace)
    replaceValue = toString(replaceValue);
   var global = rx.global;
   if (global) {
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
   }
   var results = [];
   while (true) {
    var result = regExpExec(rx, S);
    if (result === null)
     break;
    push(results, result);
    if (!global)
     break;
    var matchStr = toString(result[0]);
    if (matchStr === '')
     rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
   }
   var accumulatedResult = '';
   var nextSourcePosition = 0;
   for (var i = 0; i < results.length; i++) {
    result = results[i];
    var matched = toString(result[0]);
    var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
    var captures = [];
    for (var j = 1; j < result.length; j++)
     push(captures, maybeToString(result[j]));
    var namedCaptures = result.groups;
    if (functionalReplace) {
     var replacerArgs = concat([matched], captures, position, S);
     if (namedCaptures !== undefined)
      push(replacerArgs, namedCaptures);
     var replacement = toString(apply(replaceValue, undefined, replacerArgs));
    } else {
     replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
    }
    if (position >= nextSourcePosition) {
     accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
     nextSourcePosition = position + matched.length;
    }
   }
   return accumulatedResult + stringSlice(S, nextSourcePosition);
  }
 ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

/***/ }),
/* 140 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var NATIVE_BIND = __w_pdfjs_require__(13);
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
 return call.apply(apply, arguments);
});

/***/ }),
/* 141 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

__w_pdfjs_require__(106);
var uncurryThis = __w_pdfjs_require__(12);
var redefine = __w_pdfjs_require__(68);
var regexpExec = __w_pdfjs_require__(107);
var fails = __w_pdfjs_require__(14);
var wellKnownSymbol = __w_pdfjs_require__(18);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;
module.exports = function (KEY, exec, FORCED, SHAM) {
 var SYMBOL = wellKnownSymbol(KEY);
 var DELEGATES_TO_SYMBOL = !fails(function () {
  var O = {};
  O[SYMBOL] = function () {
   return 7;
  };
  return ''[KEY](O) != 7;
 });
 var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
  var execCalled = false;
  var re = /a/;
  if (KEY === 'split') {
   re = {};
   re.constructor = {};
   re.constructor[SPECIES] = function () {
    return re;
   };
   re.flags = '';
   re[SYMBOL] = /./[SYMBOL];
  }
  re.exec = function () {
   execCalled = true;
   return null;
  };
  re[SYMBOL]('');
  return !execCalled;
 });
 if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
  var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
  var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
   var uncurriedNativeMethod = uncurryThis(nativeMethod);
   var $exec = regexp.exec;
   if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
    if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
     return {
      done: true,
      value: uncurriedNativeRegExpMethod(regexp, str, arg2)
     };
    }
    return {
     done: true,
     value: uncurriedNativeMethod(str, regexp, arg2)
    };
   }
   return { done: false };
  });
  redefine(String.prototype, KEY, methods[0]);
  redefine(RegExpPrototype, SYMBOL, methods[1]);
 }
 if (SHAM)
  createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

/***/ }),
/* 142 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var charAt = (__w_pdfjs_require__(84).charAt);
module.exports = function (S, index, unicode) {
 return index + (unicode ? charAt(S, index).length : 1);
};

/***/ }),
/* 143 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var toObject = __w_pdfjs_require__(24);
var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
 var tailPos = position + matched.length;
 var m = captures.length;
 var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
 if (namedCaptures !== undefined) {
  namedCaptures = toObject(namedCaptures);
  symbols = SUBSTITUTION_SYMBOLS;
 }
 return replace(replacement, symbols, function (match, ch) {
  var capture;
  switch (charAt(ch, 0)) {
  case '$':
   return '$';
  case '&':
   return matched;
  case '`':
   return stringSlice(str, 0, position);
  case "'":
   return stringSlice(str, tailPos);
  case '<':
   capture = namedCaptures[stringSlice(ch, 1, -1)];
   break;
  default:
   var n = +ch;
   if (n === 0)
    return match;
   if (n > m) {
    var f = floor(n / 10);
    if (f === 0)
     return match;
    if (f <= m)
     return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
    return match;
   }
   capture = captures[n - 1];
  }
  return capture === undefined ? '' : capture;
 });
};

/***/ }),
/* 144 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var call = __w_pdfjs_require__(40);
var anObject = __w_pdfjs_require__(32);
var isCallable = __w_pdfjs_require__(8);
var classof = __w_pdfjs_require__(15);
var regexpExec = __w_pdfjs_require__(107);
var TypeError = global.TypeError;
module.exports = function (R, S) {
 var exec = R.exec;
 if (isCallable(exec)) {
  var result = call(exec, R, S);
  if (result !== null)
   anObject(result);
  return result;
 }
 if (classof(R) === 'RegExp')
  return call(regexpExec, R, S);
 throw TypeError('RegExp#exec called on incompatible receiver');
};

/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var IS_PURE = __w_pdfjs_require__(20);
var global = __w_pdfjs_require__(3);
var getBuiltIn = __w_pdfjs_require__(29);
var call = __w_pdfjs_require__(40);
var NativePromise = __w_pdfjs_require__(146);
var redefine = __w_pdfjs_require__(68);
var redefineAll = __w_pdfjs_require__(104);
var setPrototypeOf = __w_pdfjs_require__(80);
var setToStringTag = __w_pdfjs_require__(79);
var setSpecies = __w_pdfjs_require__(131);
var aCallable = __w_pdfjs_require__(44);
var isCallable = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(7);
var anInstance = __w_pdfjs_require__(90);
var inspectSource = __w_pdfjs_require__(61);
var iterate = __w_pdfjs_require__(147);
var checkCorrectnessOfIteration = __w_pdfjs_require__(115);
var speciesConstructor = __w_pdfjs_require__(148);
var task = (__w_pdfjs_require__(149).set);
var microtask = __w_pdfjs_require__(153);
var promiseResolve = __w_pdfjs_require__(156);
var hostReportErrors = __w_pdfjs_require__(158);
var newPromiseCapabilityModule = __w_pdfjs_require__(157);
var perform = __w_pdfjs_require__(159);
var Queue = __w_pdfjs_require__(160);
var InternalStateModule = __w_pdfjs_require__(59);
var isForced = __w_pdfjs_require__(74);
var wellKnownSymbol = __w_pdfjs_require__(18);
var IS_BROWSER = __w_pdfjs_require__(161);
var IS_NODE = __w_pdfjs_require__(152);
var V8_VERSION = __w_pdfjs_require__(27);
var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
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
 if (IS_PURE && !PromisePrototype['finally'])
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
 return isObject(it) && isCallable(then = it.then) ? then : false;
};
var callReaction = function (reaction, state) {
 var value = state.value;
 var ok = state.state == FULFILLED;
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
    call(then, result, resolve, reject);
   } else
    resolve(result);
  } else
   reject(value);
 } catch (error) {
  if (domain && !exited)
   domain.exit();
  reject(error);
 }
};
var notify = function (state, isReject) {
 if (state.notified)
  return;
 state.notified = true;
 microtask(function () {
  var reactions = state.reactions;
  var reaction;
  while (reaction = reactions.get()) {
   callReaction(reaction, state);
  }
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
 call(task, global, function () {
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
 call(task, global, function () {
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
     call(then, value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
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
  anInstance(this, PromisePrototype);
  aCallable(executor);
  call(Internal, this);
  var state = getInternalState(this);
  try {
   executor(bind(internalResolve, state), bind(internalReject, state));
  } catch (error) {
   internalReject(state, error);
  }
 };
 PromisePrototype = PromiseConstructor.prototype;
 Internal = function Promise(executor) {
  setInternalState(this, {
   type: PROMISE,
   done: false,
   notified: false,
   parent: false,
   reactions: new Queue(),
   rejection: false,
   state: PENDING,
   value: undefined
  });
 };
 Internal.prototype = redefineAll(PromisePrototype, {
  then: function then(onFulfilled, onRejected) {
   var state = getInternalPromiseState(this);
   var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
   state.parent = true;
   reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
   reaction.fail = isCallable(onRejected) && onRejected;
   reaction.domain = IS_NODE ? process.domain : undefined;
   if (state.state == PENDING)
    state.reactions.add(reaction);
   else
    microtask(function () {
     callReaction(reaction, state);
    });
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
 if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
  nativeThen = NativePromisePrototype.then;
  if (!SUBCLASSING) {
   redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var that = this;
    return new PromiseConstructor(function (resolve, reject) {
     call(nativeThen, that, resolve, reject);
    }).then(onFulfilled, onRejected);
   }, { unsafe: true });
   redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
  }
  try {
   delete NativePromisePrototype.constructor;
  } catch (error) {
  }
  if (setPrototypeOf) {
   setPrototypeOf(NativePromisePrototype, PromisePrototype);
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
  call(capability.reject, undefined, r);
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
   var $promiseResolve = aCallable(C.resolve);
   var values = [];
   var counter = 0;
   var remaining = 1;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyCalled = false;
    remaining++;
    call($promiseResolve, C, promise).then(function (value) {
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
   var $promiseResolve = aCallable(C.resolve);
   iterate(iterable, function (promise) {
    call($promiseResolve, C, promise).then(capability.resolve, reject);
   });
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 }
});

/***/ }),
/* 146 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
module.exports = global.Promise;

/***/ }),
/* 147 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var bind = __w_pdfjs_require__(89);
var call = __w_pdfjs_require__(40);
var anObject = __w_pdfjs_require__(32);
var tryToString = __w_pdfjs_require__(45);
var isArrayIteratorMethod = __w_pdfjs_require__(95);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var isPrototypeOf = __w_pdfjs_require__(42);
var getIterator = __w_pdfjs_require__(98);
var getIteratorMethod = __w_pdfjs_require__(99);
var iteratorClose = __w_pdfjs_require__(94);
var TypeError = global.TypeError;
var Result = function (stopped, result) {
 this.stopped = stopped;
 this.result = result;
};
var ResultPrototype = Result.prototype;
module.exports = function (iterable, unboundFunction, options) {
 var that = options && options.that;
 var AS_ENTRIES = !!(options && options.AS_ENTRIES);
 var IS_ITERATOR = !!(options && options.IS_ITERATOR);
 var INTERRUPTED = !!(options && options.INTERRUPTED);
 var fn = bind(unboundFunction, that);
 var iterator, iterFn, index, length, result, next, step;
 var stop = function (condition) {
  if (iterator)
   iteratorClose(iterator, 'normal', condition);
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
  if (!iterFn)
   throw TypeError(tryToString(iterable) + ' is not iterable');
  if (isArrayIteratorMethod(iterFn)) {
   for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
    result = callFn(iterable[index]);
    if (result && isPrototypeOf(ResultPrototype, result))
     return result;
   }
   return new Result(false);
  }
  iterator = getIterator(iterable, iterFn);
 }
 next = iterator.next;
 while (!(step = call(next, iterator)).done) {
  try {
   result = callFn(step.value);
  } catch (error) {
   iteratorClose(iterator, 'throw', error);
  }
  if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result))
   return result;
 }
 return new Result(false);
};

/***/ }),
/* 148 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(32);
var aConstructor = __w_pdfjs_require__(126);
var wellKnownSymbol = __w_pdfjs_require__(18);
var SPECIES = wellKnownSymbol('species');
module.exports = function (O, defaultConstructor) {
 var C = anObject(O).constructor;
 var S;
 return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};

/***/ }),
/* 149 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var apply = __w_pdfjs_require__(140);
var bind = __w_pdfjs_require__(89);
var isCallable = __w_pdfjs_require__(8);
var hasOwn = __w_pdfjs_require__(23);
var fails = __w_pdfjs_require__(14);
var html = __w_pdfjs_require__(56);
var arraySlice = __w_pdfjs_require__(150);
var createElement = __w_pdfjs_require__(6);
var validateArgumentsLength = __w_pdfjs_require__(102);
var IS_IOS = __w_pdfjs_require__(151);
var IS_NODE = __w_pdfjs_require__(152);
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;
try {
 location = global.location;
} catch (error) {
}
var run = function (id) {
 if (hasOwn(queue, id)) {
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
 set = function setImmediate(handler) {
  validateArgumentsLength(arguments.length, 1);
  var fn = isCallable(handler) ? handler : Function(handler);
  var args = arraySlice(arguments, 1);
  queue[++counter] = function () {
   apply(fn, undefined, args);
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
  defer = bind(port.postMessage, port);
 } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
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
/* 150 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
module.exports = uncurryThis([].slice);

/***/ }),
/* 151 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(28);
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

/***/ }),
/* 152 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(15);
var global = __w_pdfjs_require__(3);
module.exports = classof(global.process) == 'process';

/***/ }),
/* 153 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
var bind = __w_pdfjs_require__(89);
var getOwnPropertyDescriptor = (__w_pdfjs_require__(66).f);
var macrotask = (__w_pdfjs_require__(149).set);
var IS_IOS = __w_pdfjs_require__(151);
var IS_IOS_PEBBLE = __w_pdfjs_require__(154);
var IS_WEBOS_WEBKIT = __w_pdfjs_require__(155);
var IS_NODE = __w_pdfjs_require__(152);
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
  then = bind(promise.then, promise);
  notify = function () {
   then(flush);
  };
 } else if (IS_NODE) {
  notify = function () {
   process.nextTick(flush);
  };
 } else {
  macrotask = bind(macrotask, global);
  notify = function () {
   macrotask(flush);
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
/* 154 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(28);
var global = __w_pdfjs_require__(3);
module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;

/***/ }),
/* 155 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var userAgent = __w_pdfjs_require__(28);
module.exports = /web0s(?!.*chrome)/i.test(userAgent);

/***/ }),
/* 156 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var anObject = __w_pdfjs_require__(32);
var isObject = __w_pdfjs_require__(7);
var newPromiseCapability = __w_pdfjs_require__(157);
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
/* 157 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var aCallable = __w_pdfjs_require__(44);
var PromiseCapability = function (C) {
 var resolve, reject;
 this.promise = new C(function ($$resolve, $$reject) {
  if (resolve !== undefined || reject !== undefined)
   throw TypeError('Bad Promise constructor');
  resolve = $$resolve;
  reject = $$reject;
 });
 this.resolve = aCallable(resolve);
 this.reject = aCallable(reject);
};
module.exports.f = function (C) {
 return new PromiseCapability(C);
};

/***/ }),
/* 158 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
module.exports = function (a, b) {
 var console = global.console;
 if (console && console.error) {
  arguments.length == 1 ? console.error(a) : console.error(a, b);
 }
};

/***/ }),
/* 159 */
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
/* 160 */
/***/ ((module) => {

var Queue = function () {
 this.head = null;
 this.tail = null;
};
Queue.prototype = {
 add: function (item) {
  var entry = {
   item: item,
   next: null
  };
  if (this.head)
   this.tail.next = entry;
  else
   this.head = entry;
  this.tail = entry;
 },
 get: function () {
  var entry = this.head;
  if (entry) {
   this.head = entry.next;
   if (this.tail === entry)
    this.tail = null;
   return entry.item;
  }
 }
};
module.exports = Queue;

/***/ }),
/* 161 */
/***/ ((module) => {

module.exports = typeof window == 'object';

/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";


__w_pdfjs_require__(145);

const isNodeJS = false;

if (!globalThis._pdfjsCompatibilityChecked) {
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

    globalThis.DOMMatrix = __w_pdfjs_require__(163);
  })();

  (function checkPromise() {
    if (globalThis.Promise.allSettled) {
      return;
    }

    globalThis.Promise = __w_pdfjs_require__(167);
  })();

  (function checkReadableStream() {
    if (globalThis.ReadableStream || !isNodeJS) {
      return;
    }

    globalThis.ReadableStream = require("web-streams-polyfill/dist/ponyfill.js").ReadableStream;
  })();

  (function checkStructuredClone() {
    if (globalThis.structuredClone) {
      return;
    }

    __w_pdfjs_require__(179);
  })();
}

/***/ }),
/* 163 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";


__w_pdfjs_require__(106);

__w_pdfjs_require__(139);

__w_pdfjs_require__(164);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(165);

__w_pdfjs_require__(145);

__w_pdfjs_require__(166);

(function (global, factory) {
   true ? module.exports = factory() : 0;
})(void 0, function () {
  'use strict';

  function fromArray(array) {
    var m = new CSSMatrix();
    var a = Array.from(array);

    if (!a.every(function (n) {
      return !Number.isNaN(n);
    })) {
      throw TypeError("CSSMatrix: \"" + array + "\" must only have numbers.");
    }

    if (a.length === 16) {
      var m11 = a[0];
      var m12 = a[1];
      var m13 = a[2];
      var m14 = a[3];
      var m21 = a[4];
      var m22 = a[5];
      var m23 = a[6];
      var m24 = a[7];
      var m31 = a[8];
      var m32 = a[9];
      var m33 = a[10];
      var m34 = a[11];
      var m41 = a[12];
      var m42 = a[13];
      var m43 = a[14];
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
      var M11 = a[0];
      var M12 = a[1];
      var M21 = a[2];
      var M22 = a[3];
      var M41 = a[4];
      var M42 = a[5];
      m.m11 = M11;
      m.a = M11;
      m.m12 = M12;
      m.b = M12;
      m.m21 = M21;
      m.c = M21;
      m.m22 = M22;
      m.d = M22;
      m.m41 = M41;
      m.e = M41;
      m.m42 = M42;
      m.f = M42;
    } else {
      throw new TypeError('CSSMatrix: expecting an Array of 6/16 values.');
    }

    return m;
  }

  function fromMatrix(m) {
    var keys = Object.keys(new CSSMatrix());

    if (typeof m === 'object' && keys.every(function (k) {
      return k in m;
    })) {
      return fromArray([m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44]);
    }

    throw TypeError("CSSMatrix: \"" + m + "\" is not a DOMMatrix / CSSMatrix / JSON compatible object.");
  }

  function fromString(source) {
    if (typeof source !== 'string') {
      throw TypeError("CSSMatrix: \"" + source + "\" is not a string.");
    }

    var str = String(source).replace(/\s/g, '');
    var m = new CSSMatrix();
    var invalidStringError = "CSSMatrix: invalid transform string \"" + source + "\"";
    str.split(')').filter(function (f) {
      return f;
    }).forEach(function (tf) {
      var ref = tf.split('(');
      var prop = ref[0];
      var value = ref[1];

      if (!value) {
        throw TypeError(invalidStringError);
      }

      var components = value.split(',').map(function (n) {
        return n.includes('rad') ? parseFloat(n) * (180 / Math.PI) : parseFloat(n);
      });
      var x = components[0];
      var y = components[1];
      var z = components[2];
      var a = components[3];
      var xyz = [x, y, z];
      var xyza = [x, y, z, a];

      if (prop === 'perspective' && x && [y, z].every(function (n) {
        return n === undefined;
      })) {
        m.m34 = -1 / x;
      } else if (prop.includes('matrix') && [6, 16].includes(components.length) && components.every(function (n) {
        return !Number.isNaN(+n);
      })) {
        var values = components.map(function (n) {
          return Math.abs(n) < 1e-6 ? 0 : n;
        });
        m = m.multiply(fromArray(values));
      } else if (prop === 'translate3d' && xyz.every(function (n) {
        return !Number.isNaN(+n);
      })) {
        m = m.translate(x, y, z);
      } else if (prop === 'translate' && x && z === undefined) {
        m = m.translate(x, y || 0, 0);
      } else if (prop === 'rotate3d' && xyza.every(function (n) {
        return !Number.isNaN(+n);
      }) && a) {
        m = m.rotateAxisAngle(x, y, z, a);
      } else if (prop === 'rotate' && x && [y, z].every(function (n) {
        return n === undefined;
      })) {
        m = m.rotate(0, 0, x);
      } else if (prop === 'scale3d' && xyz.every(function (n) {
        return !Number.isNaN(+n);
      }) && xyz.some(function (n) {
        return n !== 1;
      })) {
        m = m.scale(x, y, z);
      } else if (prop === 'scale' && !Number.isNaN(x) && x !== 1 && z === undefined) {
        var nosy = Number.isNaN(+y);
        var sy = nosy ? x : y;
        m = m.scale(x, sy, 1);
      } else if (prop === 'skew' && x && z === undefined) {
        m = m.skewX(x);
        m = y ? m.skewY(y) : m;
      } else if (/[XYZ]/.test(prop) && x && [y, z].every(function (n) {
        return n === undefined;
      }) && ['translate', 'rotate', 'scale', 'skew'].some(function (p) {
        return prop.includes(p);
      })) {
        if (['skewX', 'skewY'].includes(prop)) {
          m = m[prop](x);
        } else {
          var fn = prop.replace(/[XYZ]/, '');
          var axis = prop.replace(fn, '');
          var idx = ['X', 'Y', 'Z'].indexOf(axis);
          var axeValues = [idx === 0 ? x : 0, idx === 1 ? x : 0, idx === 2 ? x : 0];
          m = m[fn].apply(m, axeValues);
        }
      } else {
        throw TypeError(invalidStringError);
      }
    });
    return m;
  }

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
    var degToRad = Math.PI / 180;
    var radX = rx * degToRad;
    var radY = ry * degToRad;
    var radZ = rz * degToRad;
    var cosx = Math.cos(radX);
    var sinx = -Math.sin(radX);
    var cosy = Math.cos(radY);
    var siny = -Math.sin(radY);
    var cosz = Math.cos(radZ);
    var sinz = -Math.sin(radZ);
    var m11 = cosy * cosz;
    var m12 = -cosy * sinz;
    m.m11 = m11;
    m.a = m11;
    m.m12 = m12;
    m.b = m12;
    m.m13 = siny;
    var m21 = sinx * siny * cosz + cosx * sinz;
    m.m21 = m21;
    m.c = m21;
    var m22 = cosx * cosz - sinx * siny * sinz;
    m.m22 = m22;
    m.d = m22;
    m.m23 = -sinx * cosy;
    m.m31 = sinx * sinz - cosx * siny * cosz;
    m.m32 = sinx * cosz + cosx * siny * sinz;
    m.m33 = cosx * cosy;
    return m;
  }

  function RotateAxisAngle(x, y, z, alpha) {
    var m = new CSSMatrix();
    var angle = alpha * (Math.PI / 360);
    var sinA = Math.sin(angle);
    var cosA = Math.cos(angle);
    var sinA2 = sinA * sinA;
    var length = Math.sqrt(x * x + y * y + z * z);
    var X = x;
    var Y = y;
    var Z = z;

    if (length === 0) {
      X = 0;
      Y = 0;
      Z = 1;
    } else {
      X /= length;
      Y /= length;
      Z /= length;
    }

    var x2 = X * X;
    var y2 = Y * Y;
    var z2 = Z * Z;
    var m11 = 1 - 2 * (y2 + z2) * sinA2;
    m.m11 = m11;
    m.a = m11;
    var m12 = 2 * (X * Y * sinA2 + Z * sinA * cosA);
    m.m12 = m12;
    m.b = m12;
    m.m13 = 2 * (X * Z * sinA2 - Y * sinA * cosA);
    var m21 = 2 * (Y * X * sinA2 - Z * sinA * cosA);
    m.m21 = m21;
    m.c = m21;
    var m22 = 1 - 2 * (z2 + x2) * sinA2;
    m.m22 = m22;
    m.d = m22;
    m.m23 = 2 * (Y * Z * sinA2 + X * sinA * cosA);
    m.m31 = 2 * (Z * X * sinA2 + Y * sinA * cosA);
    m.m32 = 2 * (Z * Y * sinA2 - X * sinA * cosA);
    m.m33 = 1 - 2 * (x2 + y2) * sinA2;
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
    var m = new CSSMatrix();
    var radA = angle * Math.PI / 180;
    var t = Math.tan(radA);
    m.m21 = t;
    m.c = t;
    return m;
  }

  function SkewY(angle) {
    var m = new CSSMatrix();
    var radA = angle * Math.PI / 180;
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
    return fromArray([m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44]);
  }

  var CSSMatrix = function CSSMatrix() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var m = this;
    m.a = 1;
    m.b = 0;
    m.c = 0;
    m.d = 1;
    m.e = 0;
    m.f = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m13 = 0;
    m.m14 = 0;
    m.m21 = 0;
    m.m22 = 1;
    m.m23 = 0;
    m.m24 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    m.m34 = 0;
    m.m41 = 0;
    m.m42 = 0;
    m.m43 = 0;
    m.m44 = 1;

    if (args && args.length) {
      var ARGS = [16, 6].some(function (l) {
        return l === args.length;
      }) ? args : args[0];
      return m.setMatrixValue(ARGS);
    }

    return m;
  };

  var prototypeAccessors = {
    isIdentity: {
      configurable: true
    },
    is2D: {
      configurable: true
    }
  };

  prototypeAccessors.isIdentity.set = function (value) {
    this.isIdentity = value;
  };

  prototypeAccessors.isIdentity.get = function () {
    var m = this;
    return m.m11 === 1 && m.m12 === 0 && m.m13 === 0 && m.m14 === 0 && m.m21 === 0 && m.m22 === 1 && m.m23 === 0 && m.m24 === 0 && m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m41 === 0 && m.m42 === 0 && m.m43 === 0 && m.m44 === 1;
  };

  prototypeAccessors.is2D.get = function () {
    var m = this;
    return m.m31 === 0 && m.m32 === 0 && m.m33 === 1 && m.m34 === 0 && m.m43 === 0 && m.m44 === 1;
  };

  prototypeAccessors.is2D.set = function (value) {
    this.is2D = value;
  };

  CSSMatrix.prototype.setMatrixValue = function setMatrixValue(source) {
    var m = this;

    if ([Array, Float64Array, Float32Array].some(function (a) {
      return source instanceof a;
    })) {
      return fromArray(source);
    }

    if (typeof source === 'string' && source.length && source !== 'none') {
      return fromString(source);
    }

    if (typeof source === 'object') {
      return fromMatrix(source);
    }

    return m;
  };

  CSSMatrix.prototype.toArray = function toArray() {
    var m = this;
    var pow = Math.pow(10, 6);
    var result;

    if (m.is2D) {
      result = [m.a, m.b, m.c, m.d, m.e, m.f];
    } else {
      result = [m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44];
    }

    return result.map(function (n) {
      return Math.abs(n) < 1e-6 ? 0 : (n * pow >> 0) / pow;
    });
  };

  CSSMatrix.prototype.toString = function toString() {
    var m = this;
    var values = m.toArray();
    var type = m.is2D ? 'matrix' : 'matrix3d';
    return type + "(" + values + ")";
  };

  CSSMatrix.prototype.toJSON = function toJSON() {
    var m = this;
    var is2D = m.is2D;
    var isIdentity = m.isIdentity;
    return Object.assign({}, m, {
      is2D: is2D,
      isIdentity: isIdentity
    });
  };

  CSSMatrix.prototype.multiply = function multiply(m2) {
    return Multiply(this, m2);
  };

  CSSMatrix.prototype.translate = function translate(x, y, z) {
    var X = x;
    var Y = y;
    var Z = z;

    if (Z === undefined) {
      Z = 0;
    }

    if (Y === undefined) {
      Y = 0;
    }

    return Multiply(this, Translate(X, Y, Z));
  };

  CSSMatrix.prototype.scale = function scale(x, y, z) {
    var X = x;
    var Y = y;
    var Z = z;

    if (Y === undefined) {
      Y = x;
    }

    if (Z === undefined) {
      Z = 1;
    }

    return Multiply(this, Scale(X, Y, Z));
  };

  CSSMatrix.prototype.rotate = function rotate(rx, ry, rz) {
    var RX = rx;
    var RY = ry;
    var RZ = rz;

    if (RY === undefined) {
      RY = 0;
    }

    if (RZ === undefined) {
      RZ = RX;
      RX = 0;
    }

    return Multiply(this, Rotate(RX, RY, RZ));
  };

  CSSMatrix.prototype.rotateAxisAngle = function rotateAxisAngle(x, y, z, angle) {
    if ([x, y, z, angle].some(function (n) {
      return Number.isNaN(n);
    })) {
      throw new TypeError('CSSMatrix: expecting 4 values');
    }

    return Multiply(this, RotateAxisAngle(x, y, z, angle));
  };

  CSSMatrix.prototype.skewX = function skewX(angle) {
    return Multiply(this, SkewX(angle));
  };

  CSSMatrix.prototype.skewY = function skewY(angle) {
    return Multiply(this, SkewY(angle));
  };

  CSSMatrix.prototype.transformPoint = function transformPoint(v) {
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

  CSSMatrix.prototype.transform = function transform(t) {
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

  Object.defineProperties(CSSMatrix.prototype, prototypeAccessors);
  Object.assign(CSSMatrix, {
    Translate: Translate,
    Rotate: Rotate,
    RotateAxisAngle: RotateAxisAngle,
    Scale: Scale,
    SkewX: SkewX,
    SkewY: SkewY,
    Multiply: Multiply,
    fromArray: fromArray,
    fromMatrix: fromMatrix,
    fromString: fromString
  });
  var version = "0.0.24";
  var Version = version;
  Object.assign(CSSMatrix, {
    Version: Version
  });
  return CSSMatrix;
});

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var createTypedArrayConstructor = __w_pdfjs_require__(113);
createTypedArrayConstructor('Float64', function (init) {
 return function Float64Array(data, byteOffset, length) {
  return init(this, data, byteOffset, length);
 };
});

/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var createTypedArrayConstructor = __w_pdfjs_require__(113);
createTypedArrayConstructor('Float32', function (init) {
 return function Float32Array(data, byteOffset, length) {
  return init(this, data, byteOffset, length);
 };
});

/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var call = __w_pdfjs_require__(40);
$({
 target: 'URL',
 proto: true,
 enumerable: true
}, {
 toJSON: function toJSON() {
  return call(URL.prototype.toString, this);
 }
});

/***/ }),
/* 167 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(168);
__w_pdfjs_require__(9);
__w_pdfjs_require__(173);
__w_pdfjs_require__(145);
__w_pdfjs_require__(175);
__w_pdfjs_require__(176);
__w_pdfjs_require__(177);
__w_pdfjs_require__(83);
var path = __w_pdfjs_require__(178);
module.exports = path.Promise;

/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var global = __w_pdfjs_require__(3);
var isPrototypeOf = __w_pdfjs_require__(42);
var getPrototypeOf = __w_pdfjs_require__(77);
var setPrototypeOf = __w_pdfjs_require__(80);
var copyConstructorProperties = __w_pdfjs_require__(70);
var create = __w_pdfjs_require__(31);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var createPropertyDescriptor = __w_pdfjs_require__(63);
var clearErrorStack = __w_pdfjs_require__(169);
var installErrorCause = __w_pdfjs_require__(170);
var iterate = __w_pdfjs_require__(147);
var normalizeStringArgument = __w_pdfjs_require__(171);
var wellKnownSymbol = __w_pdfjs_require__(18);
var ERROR_STACK_INSTALLABLE = __w_pdfjs_require__(172);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Error = global.Error;
var push = [].push;
var $AggregateError = function AggregateError(errors, message) {
 var options = arguments.length > 2 ? arguments[2] : undefined;
 var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
 var that;
 if (setPrototypeOf) {
  that = setPrototypeOf(new Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
 } else {
  that = isInstance ? this : create(AggregateErrorPrototype);
  createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
 }
 if (message !== undefined)
  createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
 if (ERROR_STACK_INSTALLABLE)
  createNonEnumerableProperty(that, 'stack', clearErrorStack(that.stack, 1));
 installErrorCause(that, options);
 var errorsArray = [];
 iterate(errors, push, { that: errorsArray });
 createNonEnumerableProperty(that, 'errors', errorsArray);
 return that;
};
if (setPrototypeOf)
 setPrototypeOf($AggregateError, Error);
else
 copyConstructorProperties($AggregateError, Error, { name: true });
var AggregateErrorPrototype = $AggregateError.prototype = create(Error.prototype, {
 constructor: createPropertyDescriptor(1, $AggregateError),
 message: createPropertyDescriptor(1, ''),
 name: createPropertyDescriptor(1, 'AggregateError')
});
$({ global: true }, { AggregateError: $AggregateError });

/***/ }),
/* 169 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var uncurryThis = __w_pdfjs_require__(12);
var replace = uncurryThis(''.replace);
var TEST = function (arg) {
 return String(Error(arg).stack);
}('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
module.exports = function (stack, dropEntries) {
 if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
  while (dropEntries--)
   stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
 }
 return stack;
};

/***/ }),
/* 170 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(7);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
module.exports = function (O, options) {
 if (isObject(options) && 'cause' in options) {
  createNonEnumerableProperty(O, 'cause', options.cause);
 }
};

/***/ }),
/* 171 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var toString = __w_pdfjs_require__(85);
module.exports = function (argument, $default) {
 return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};

/***/ }),
/* 172 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var createPropertyDescriptor = __w_pdfjs_require__(63);
module.exports = !fails(function () {
 var error = Error('a');
 if (!('stack' in error))
  return true;
 Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
 return error.stack !== 7;
});

/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(87);
var redefine = __w_pdfjs_require__(68);
var toString = __w_pdfjs_require__(174);
if (!TO_STRING_TAG_SUPPORT) {
 redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 174 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __w_pdfjs_require__(87);
var classof = __w_pdfjs_require__(86);
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
 return '[object ' + classof(this) + ']';
};

/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var call = __w_pdfjs_require__(40);
var aCallable = __w_pdfjs_require__(44);
var newPromiseCapabilityModule = __w_pdfjs_require__(157);
var perform = __w_pdfjs_require__(159);
var iterate = __w_pdfjs_require__(147);
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
   var promiseResolve = aCallable(C.resolve);
   var values = [];
   var counter = 0;
   var remaining = 1;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyCalled = false;
    remaining++;
    call(promiseResolve, C, promise).then(function (value) {
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
/* 176 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var aCallable = __w_pdfjs_require__(44);
var getBuiltIn = __w_pdfjs_require__(29);
var call = __w_pdfjs_require__(40);
var newPromiseCapabilityModule = __w_pdfjs_require__(157);
var perform = __w_pdfjs_require__(159);
var iterate = __w_pdfjs_require__(147);
var PROMISE_ANY_ERROR = 'No one promise resolved';
$({
 target: 'Promise',
 stat: true
}, {
 any: function any(iterable) {
  var C = this;
  var AggregateError = getBuiltIn('AggregateError');
  var capability = newPromiseCapabilityModule.f(C);
  var resolve = capability.resolve;
  var reject = capability.reject;
  var result = perform(function () {
   var promiseResolve = aCallable(C.resolve);
   var errors = [];
   var counter = 0;
   var remaining = 1;
   var alreadyResolved = false;
   iterate(iterable, function (promise) {
    var index = counter++;
    var alreadyRejected = false;
    remaining++;
    call(promiseResolve, C, promise).then(function (value) {
     if (alreadyRejected || alreadyResolved)
      return;
     alreadyResolved = true;
     resolve(value);
    }, function (error) {
     if (alreadyRejected || alreadyResolved)
      return;
     alreadyRejected = true;
     errors[index] = error;
     --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
   });
   --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
  });
  if (result.error)
   reject(result.value);
  return capability.promise;
 }
});

/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var IS_PURE = __w_pdfjs_require__(20);
var NativePromise = __w_pdfjs_require__(146);
var fails = __w_pdfjs_require__(14);
var getBuiltIn = __w_pdfjs_require__(29);
var isCallable = __w_pdfjs_require__(8);
var speciesConstructor = __w_pdfjs_require__(148);
var promiseResolve = __w_pdfjs_require__(156);
var redefine = __w_pdfjs_require__(68);
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
  var isFunction = isCallable(onFinally);
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
if (!IS_PURE && isCallable(NativePromise)) {
 var method = getBuiltIn('Promise').prototype['finally'];
 if (NativePromise.prototype['finally'] !== method) {
  redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
 }
}

/***/ }),
/* 178 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var global = __w_pdfjs_require__(3);
module.exports = global;

/***/ }),
/* 179 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(9);
__w_pdfjs_require__(173);
__w_pdfjs_require__(180);
__w_pdfjs_require__(188);
__w_pdfjs_require__(189);
var path = __w_pdfjs_require__(178);
module.exports = path.structuredClone;

/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var collection = __w_pdfjs_require__(181);
var collectionStrong = __w_pdfjs_require__(187);
collection('Map', function (init) {
 return function Map() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionStrong);

/***/ }),
/* 181 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var $ = __w_pdfjs_require__(65);
var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var isForced = __w_pdfjs_require__(74);
var redefine = __w_pdfjs_require__(68);
var InternalMetadataModule = __w_pdfjs_require__(182);
var iterate = __w_pdfjs_require__(147);
var anInstance = __w_pdfjs_require__(90);
var isCallable = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(7);
var fails = __w_pdfjs_require__(14);
var checkCorrectnessOfIteration = __w_pdfjs_require__(115);
var setToStringTag = __w_pdfjs_require__(79);
var inheritIfRequired = __w_pdfjs_require__(132);
module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
 var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
 var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
 var ADDER = IS_MAP ? 'set' : 'add';
 var NativeConstructor = global[CONSTRUCTOR_NAME];
 var NativePrototype = NativeConstructor && NativeConstructor.prototype;
 var Constructor = NativeConstructor;
 var exported = {};
 var fixMethod = function (KEY) {
  var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
  redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
   uncurriedNativeMethod(this, value === 0 ? 0 : value);
   return this;
  } : KEY == 'delete' ? function (key) {
   return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
  } : KEY == 'get' ? function get(key) {
   return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
  } : KEY == 'has' ? function has(key) {
   return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
  } : function set(key, value) {
   uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
   return this;
  });
 };
 var REPLACE = isForced(CONSTRUCTOR_NAME, !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
  new NativeConstructor().entries().next();
 })));
 if (REPLACE) {
  Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
  InternalMetadataModule.enable();
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
    anInstance(dummy, NativePrototype);
    var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
    if (iterable != undefined)
     iterate(iterable, that[ADDER], {
      that: that,
      AS_ENTRIES: IS_MAP
     });
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
/* 182 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var $ = __w_pdfjs_require__(65);
var uncurryThis = __w_pdfjs_require__(12);
var hiddenKeys = __w_pdfjs_require__(54);
var isObject = __w_pdfjs_require__(7);
var hasOwn = __w_pdfjs_require__(23);
var defineProperty = (__w_pdfjs_require__(36).f);
var getOwnPropertyNamesModule = __w_pdfjs_require__(72);
var getOwnPropertyNamesExternalModule = __w_pdfjs_require__(183);
var isExtensible = __w_pdfjs_require__(184);
var uid = __w_pdfjs_require__(25);
var FREEZING = __w_pdfjs_require__(186);
var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;
var setMetadata = function (it) {
 defineProperty(it, METADATA, {
  value: {
   objectID: 'O' + id++,
   weakData: {}
  }
 });
};
var fastKey = function (it, create) {
 if (!isObject(it))
  return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
 if (!hasOwn(it, METADATA)) {
  if (!isExtensible(it))
   return 'F';
  if (!create)
   return 'E';
  setMetadata(it);
 }
 return it[METADATA].objectID;
};
var getWeakData = function (it, create) {
 if (!hasOwn(it, METADATA)) {
  if (!isExtensible(it))
   return true;
  if (!create)
   return false;
  setMetadata(it);
 }
 return it[METADATA].weakData;
};
var onFreeze = function (it) {
 if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA))
  setMetadata(it);
 return it;
};
var enable = function () {
 meta.enable = function () {
 };
 REQUIRED = true;
 var getOwnPropertyNames = getOwnPropertyNamesModule.f;
 var splice = uncurryThis([].splice);
 var test = {};
 test[METADATA] = 1;
 if (getOwnPropertyNames(test).length) {
  getOwnPropertyNamesModule.f = function (it) {
   var result = getOwnPropertyNames(it);
   for (var i = 0, length = result.length; i < length; i++) {
    if (result[i] === METADATA) {
     splice(result, i, 1);
     break;
    }
   }
   return result;
  };
  $({
   target: 'Object',
   stat: true,
   forced: true
  }, { getOwnPropertyNames: getOwnPropertyNamesExternalModule.f });
 }
};
var meta = module.exports = {
 enable: enable,
 fastKey: fastKey,
 getWeakData: getWeakData,
 onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;

/***/ }),
/* 183 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var classof = __w_pdfjs_require__(15);
var toIndexedObject = __w_pdfjs_require__(10);
var $getOwnPropertyNames = (__w_pdfjs_require__(72).f);
var arraySlice = __w_pdfjs_require__(100);
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function (it) {
 try {
  return $getOwnPropertyNames(it);
 } catch (error) {
  return arraySlice(windowNames);
 }
};
module.exports.f = function getOwnPropertyNames(it) {
 return windowNames && classof(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
};

/***/ }),
/* 184 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
var isObject = __w_pdfjs_require__(7);
var classof = __w_pdfjs_require__(15);
var ARRAY_BUFFER_NON_EXTENSIBLE = __w_pdfjs_require__(185);
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () {
 $isExtensible(1);
});
module.exports = FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE ? function isExtensible(it) {
 if (!isObject(it))
  return false;
 if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer')
  return false;
 return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

/***/ }),
/* 185 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
module.exports = fails(function () {
 if (typeof ArrayBuffer == 'function') {
  var buffer = new ArrayBuffer(8);
  if (Object.isExtensible(buffer))
   Object.defineProperty(buffer, 'a', { value: 8 });
 }
});

/***/ }),
/* 186 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var fails = __w_pdfjs_require__(14);
module.exports = !fails(function () {
 return Object.isExtensible(Object.preventExtensions({}));
});

/***/ }),
/* 187 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var defineProperty = (__w_pdfjs_require__(36).f);
var create = __w_pdfjs_require__(31);
var redefineAll = __w_pdfjs_require__(104);
var bind = __w_pdfjs_require__(89);
var anInstance = __w_pdfjs_require__(90);
var iterate = __w_pdfjs_require__(147);
var defineIterator = __w_pdfjs_require__(64);
var setSpecies = __w_pdfjs_require__(131);
var DESCRIPTORS = __w_pdfjs_require__(34);
var fastKey = (__w_pdfjs_require__(182).fastKey);
var InternalStateModule = __w_pdfjs_require__(59);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
module.exports = {
 getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
  var Constructor = wrapper(function (that, iterable) {
   anInstance(that, Prototype);
   setInternalState(that, {
    type: CONSTRUCTOR_NAME,
    index: create(null),
    first: undefined,
    last: undefined,
    size: 0
   });
   if (!DESCRIPTORS)
    that.size = 0;
   if (iterable != undefined)
    iterate(iterable, that[ADDER], {
     that: that,
     AS_ENTRIES: IS_MAP
    });
  });
  var Prototype = Constructor.prototype;
  var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
  var define = function (that, key, value) {
   var state = getInternalState(that);
   var entry = getEntry(that, key);
   var previous, index;
   if (entry) {
    entry.value = value;
   } else {
    state.last = entry = {
     index: index = fastKey(key, true),
     key: key,
     value: value,
     previous: previous = state.last,
     next: undefined,
     removed: false
    };
    if (!state.first)
     state.first = entry;
    if (previous)
     previous.next = entry;
    if (DESCRIPTORS)
     state.size++;
    else
     that.size++;
    if (index !== 'F')
     state.index[index] = entry;
   }
   return that;
  };
  var getEntry = function (that, key) {
   var state = getInternalState(that);
   var index = fastKey(key);
   var entry;
   if (index !== 'F')
    return state.index[index];
   for (entry = state.first; entry; entry = entry.next) {
    if (entry.key == key)
     return entry;
   }
  };
  redefineAll(Prototype, {
   clear: function clear() {
    var that = this;
    var state = getInternalState(that);
    var data = state.index;
    var entry = state.first;
    while (entry) {
     entry.removed = true;
     if (entry.previous)
      entry.previous = entry.previous.next = undefined;
     delete data[entry.index];
     entry = entry.next;
    }
    state.first = state.last = undefined;
    if (DESCRIPTORS)
     state.size = 0;
    else
     that.size = 0;
   },
   'delete': function (key) {
    var that = this;
    var state = getInternalState(that);
    var entry = getEntry(that, key);
    if (entry) {
     var next = entry.next;
     var prev = entry.previous;
     delete state.index[entry.index];
     entry.removed = true;
     if (prev)
      prev.next = next;
     if (next)
      next.previous = prev;
     if (state.first == entry)
      state.first = next;
     if (state.last == entry)
      state.last = prev;
     if (DESCRIPTORS)
      state.size--;
     else
      that.size--;
    }
    return !!entry;
   },
   forEach: function forEach(callbackfn) {
    var state = getInternalState(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var entry;
    while (entry = entry ? entry.next : state.first) {
     boundFunction(entry.value, entry.key, this);
     while (entry && entry.removed)
      entry = entry.previous;
    }
   },
   has: function has(key) {
    return !!getEntry(this, key);
   }
  });
  redefineAll(Prototype, IS_MAP ? {
   get: function get(key) {
    var entry = getEntry(this, key);
    return entry && entry.value;
   },
   set: function set(key, value) {
    return define(this, key === 0 ? 0 : key, value);
   }
  } : {
   add: function add(value) {
    return define(this, value = value === 0 ? 0 : value, value);
   }
  });
  if (DESCRIPTORS)
   defineProperty(Prototype, 'size', {
    get: function () {
     return getInternalState(this).size;
    }
   });
  return Constructor;
 },
 setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
  var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
  var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
  var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
  defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
   setInternalState(this, {
    type: ITERATOR_NAME,
    target: iterated,
    state: getInternalCollectionState(iterated),
    kind: kind,
    last: undefined
   });
  }, function () {
   var state = getInternalIteratorState(this);
   var kind = state.kind;
   var entry = state.last;
   while (entry && entry.removed)
    entry = entry.previous;
   if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
    state.target = undefined;
    return {
     value: undefined,
     done: true
    };
   }
   if (kind == 'keys')
    return {
     value: entry.key,
     done: false
    };
   if (kind == 'values')
    return {
     value: entry.value,
     done: false
    };
   return {
    value: [
     entry.key,
     entry.value
    ],
    done: false
   };
  }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
  setSpecies(CONSTRUCTOR_NAME);
 }
};

/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

"use strict";

var collection = __w_pdfjs_require__(181);
var collectionStrong = __w_pdfjs_require__(187);
collection('Set', function (init) {
 return function Set() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionStrong);

/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var IS_PURE = __w_pdfjs_require__(20);
var $ = __w_pdfjs_require__(65);
var global = __w_pdfjs_require__(3);
var getBuiltin = __w_pdfjs_require__(29);
var uncurryThis = __w_pdfjs_require__(12);
var fails = __w_pdfjs_require__(14);
var uid = __w_pdfjs_require__(25);
var isCallable = __w_pdfjs_require__(8);
var isConstructor = __w_pdfjs_require__(96);
var isObject = __w_pdfjs_require__(7);
var isSymbol = __w_pdfjs_require__(41);
var iterate = __w_pdfjs_require__(147);
var anObject = __w_pdfjs_require__(32);
var classof = __w_pdfjs_require__(86);
var hasOwn = __w_pdfjs_require__(23);
var createProperty = __w_pdfjs_require__(97);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var lengthOfArrayLike = __w_pdfjs_require__(52);
var validateArgumentsLength = __w_pdfjs_require__(102);
var regExpFlags = __w_pdfjs_require__(108);
var ERROR_STACK_INSTALLABLE = __w_pdfjs_require__(172);
var Object = global.Object;
var Date = global.Date;
var Error = global.Error;
var EvalError = global.EvalError;
var RangeError = global.RangeError;
var ReferenceError = global.ReferenceError;
var SyntaxError = global.SyntaxError;
var TypeError = global.TypeError;
var URIError = global.URIError;
var PerformanceMark = global.PerformanceMark;
var WebAssembly = global.WebAssembly;
var CompileError = WebAssembly && WebAssembly.CompileError || Error;
var LinkError = WebAssembly && WebAssembly.LinkError || Error;
var RuntimeError = WebAssembly && WebAssembly.RuntimeError || Error;
var DOMException = getBuiltin('DOMException');
var Set = getBuiltin('Set');
var Map = getBuiltin('Map');
var MapPrototype = Map.prototype;
var mapHas = uncurryThis(MapPrototype.has);
var mapGet = uncurryThis(MapPrototype.get);
var mapSet = uncurryThis(MapPrototype.set);
var setAdd = uncurryThis(Set.prototype.add);
var objectKeys = getBuiltin('Object', 'keys');
var push = uncurryThis([].push);
var booleanValueOf = uncurryThis(true.valueOf);
var numberValueOf = uncurryThis(1.0.valueOf);
var stringValueOf = uncurryThis(''.valueOf);
var getFlags = uncurryThis(regExpFlags);
var getTime = uncurryThis(Date.prototype.getTime);
var PERFORMANCE_MARK = uid('structuredClone');
var DATA_CLONE_ERROR = 'DataCloneError';
var TRANSFERRING = 'Transferring';
var checkBasicSemantic = function (structuredCloneImplementation) {
 return !fails(function () {
  var set1 = new global.Set([7]);
  var set2 = structuredCloneImplementation(set1);
  var number = structuredCloneImplementation(Object(7));
  return set2 == set1 || !set2.has(7) || typeof number != 'object' || number != 7;
 }) && structuredCloneImplementation;
};
var checkNewErrorsSemantic = function (structuredCloneImplementation) {
 return !fails(function () {
  var test = structuredCloneImplementation(new global.AggregateError([1], PERFORMANCE_MARK, { cause: 3 }));
  return test.name != 'AggregateError' || test.errors[0] != 1 || test.message != PERFORMANCE_MARK || test.cause != 3;
 }) && structuredCloneImplementation;
};
var nativeStructuredClone = global.structuredClone;
var FORCED_REPLACEMENT = IS_PURE || !checkNewErrorsSemantic(nativeStructuredClone);
var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
 return new PerformanceMark(PERFORMANCE_MARK, { detail: value }).detail;
});
var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;
var throwUncloneable = function (type) {
 throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR);
};
var throwUnpolyfillable = function (type, kind) {
 throw new DOMException((kind || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR);
};
var structuredCloneInternal = function (value, map) {
 if (isSymbol(value))
  throwUncloneable('Symbol');
 if (!isObject(value))
  return value;
 if (map) {
  if (mapHas(map, value))
   return mapGet(map, value);
 } else
  map = new Map();
 var type = classof(value);
 var deep = false;
 var C, name, cloned, dataTransfer, i, length, keys, key, source, target;
 switch (type) {
 case 'Array':
  cloned = [];
  deep = true;
  break;
 case 'Object':
  cloned = {};
  deep = true;
  break;
 case 'Map':
  cloned = new Map();
  deep = true;
  break;
 case 'Set':
  cloned = new Set();
  deep = true;
  break;
 case 'RegExp':
  cloned = new RegExp(value.source, 'flags' in value ? value.flags : getFlags(value));
  break;
 case 'Error':
  name = value.name;
  switch (name) {
  case 'AggregateError':
   cloned = getBuiltin('AggregateError')([]);
   break;
  case 'EvalError':
   cloned = EvalError();
   break;
  case 'RangeError':
   cloned = RangeError();
   break;
  case 'ReferenceError':
   cloned = ReferenceError();
   break;
  case 'SyntaxError':
   cloned = SyntaxError();
   break;
  case 'TypeError':
   cloned = TypeError();
   break;
  case 'URIError':
   cloned = URIError();
   break;
  case 'CompileError':
   cloned = CompileError();
   break;
  case 'LinkError':
   cloned = LinkError();
   break;
  case 'RuntimeError':
   cloned = RuntimeError();
   break;
  default:
   cloned = Error();
  }
  deep = true;
  break;
 case 'DOMException':
  cloned = new DOMException(value.message, value.name);
  deep = true;
  break;
 case 'DataView':
 case 'Int8Array':
 case 'Uint8Array':
 case 'Uint8ClampedArray':
 case 'Int16Array':
 case 'Uint16Array':
 case 'Int32Array':
 case 'Uint32Array':
 case 'Float32Array':
 case 'Float64Array':
 case 'BigInt64Array':
 case 'BigUint64Array':
  C = global[type];
  if (!isObject(C))
   throwUnpolyfillable(type);
  cloned = new C(structuredCloneInternal(value.buffer, map), value.byteOffset, type === 'DataView' ? value.byteLength : value.length);
  break;
 case 'DOMQuad':
  try {
   cloned = new DOMQuad(structuredCloneInternal(value.p1, map), structuredCloneInternal(value.p2, map), structuredCloneInternal(value.p3, map), structuredCloneInternal(value.p4, map));
  } catch (error) {
   if (nativeRestrictedStructuredClone) {
    cloned = nativeRestrictedStructuredClone(value);
   } else
    throwUnpolyfillable(type);
  }
  break;
 case 'FileList':
  C = global.DataTransfer;
  if (isConstructor(C)) {
   dataTransfer = new C();
   for (i = 0, length = lengthOfArrayLike(value); i < length; i++) {
    dataTransfer.items.add(structuredCloneInternal(value[i], map));
   }
   cloned = dataTransfer.files;
  } else if (nativeRestrictedStructuredClone) {
   cloned = nativeRestrictedStructuredClone(value);
  } else
   throwUnpolyfillable(type);
  break;
 case 'ImageData':
  try {
   cloned = new ImageData(structuredCloneInternal(value.data, map), value.width, value.height, { colorSpace: value.colorSpace });
  } catch (error) {
   if (nativeRestrictedStructuredClone) {
    cloned = nativeRestrictedStructuredClone(value);
   } else
    throwUnpolyfillable(type);
  }
  break;
 default:
  if (nativeRestrictedStructuredClone) {
   cloned = nativeRestrictedStructuredClone(value);
  } else
   switch (type) {
   case 'BigInt':
    cloned = Object(value.valueOf());
    break;
   case 'Boolean':
    cloned = Object(booleanValueOf(value));
    break;
   case 'Number':
    cloned = Object(numberValueOf(value));
    break;
   case 'String':
    cloned = Object(stringValueOf(value));
    break;
   case 'Date':
    cloned = new Date(getTime(value));
    break;
   case 'ArrayBuffer':
    C = global.DataView;
    if (!C && typeof value.slice != 'function')
     throwUnpolyfillable(type);
    try {
     if (typeof value.slice == 'function') {
      cloned = value.slice(0);
     } else {
      length = value.byteLength;
      cloned = new ArrayBuffer(length);
      source = new C(value);
      target = new C(cloned);
      for (i = 0; i < length; i++) {
       target.setUint8(i, source.getUint8(i));
      }
     }
    } catch (error) {
     throw new DOMException('ArrayBuffer is detached', DATA_CLONE_ERROR);
    }
    break;
   case 'SharedArrayBuffer':
    cloned = value;
    break;
   case 'Blob':
    try {
     cloned = value.slice(0, value.size, value.type);
    } catch (error) {
     throwUnpolyfillable(type);
    }
    break;
   case 'DOMPoint':
   case 'DOMPointReadOnly':
    C = global[type];
    try {
     cloned = C.fromPoint ? C.fromPoint(value) : new C(value.x, value.y, value.z, value.w);
    } catch (error) {
     throwUnpolyfillable(type);
    }
    break;
   case 'DOMRect':
   case 'DOMRectReadOnly':
    C = global[type];
    try {
     cloned = C.fromRect ? C.fromRect(value) : new C(value.x, value.y, value.width, value.height);
    } catch (error) {
     throwUnpolyfillable(type);
    }
    break;
   case 'DOMMatrix':
   case 'DOMMatrixReadOnly':
    C = global[type];
    try {
     cloned = C.fromMatrix ? C.fromMatrix(value) : new C(value);
    } catch (error) {
     throwUnpolyfillable(type);
    }
    break;
   case 'AudioData':
   case 'VideoFrame':
    if (!isCallable(value.clone))
     throwUnpolyfillable(type);
    try {
     cloned = value.clone();
    } catch (error) {
     throwUncloneable(type);
    }
    break;
   case 'File':
    try {
     cloned = new File([value], value.name, value);
    } catch (error) {
     throwUnpolyfillable(type);
    }
    break;
   case 'CryptoKey':
   case 'GPUCompilationMessage':
   case 'GPUCompilationInfo':
   case 'ImageBitmap':
   case 'RTCCertificate':
   case 'WebAssembly.Module':
    throwUnpolyfillable(type);
   default:
    throwUncloneable(type);
   }
 }
 mapSet(map, value, cloned);
 if (deep)
  switch (type) {
  case 'Array':
  case 'Object':
   keys = objectKeys(value);
   for (i = 0, length = lengthOfArrayLike(keys); i < length; i++) {
    key = keys[i];
    createProperty(cloned, key, structuredCloneInternal(value[key], map));
   }
   break;
  case 'Map':
   value.forEach(function (v, k) {
    mapSet(cloned, structuredCloneInternal(k, map), structuredCloneInternal(v, map));
   });
   break;
  case 'Set':
   value.forEach(function (v) {
    setAdd(cloned, structuredCloneInternal(v, map));
   });
   break;
  case 'Error':
   createNonEnumerableProperty(cloned, 'message', structuredCloneInternal(value.message, map));
   if (hasOwn(value, 'cause')) {
    createNonEnumerableProperty(cloned, 'cause', structuredCloneInternal(value.cause, map));
   }
   if (name == 'AggregateError') {
    cloned.errors = structuredCloneInternal(value.errors, map);
   }
  case 'DOMException':
   if (ERROR_STACK_INSTALLABLE) {
    createNonEnumerableProperty(cloned, 'stack', structuredCloneInternal(value.stack, map));
   }
  }
 return cloned;
};
var PROPER_TRANSFER = nativeStructuredClone && !fails(function () {
 var buffer = new ArrayBuffer(8);
 var clone = nativeStructuredClone(buffer, { transfer: [buffer] });
 return buffer.byteLength != 0 || clone.byteLength != 8;
});
var tryToTransfer = function (rawTransfer, map) {
 if (!isObject(rawTransfer))
  throw TypeError('Transfer option cannot be converted to a sequence');
 var transfer = [];
 iterate(rawTransfer, function (value) {
  push(transfer, anObject(value));
 });
 var i = 0;
 var length = lengthOfArrayLike(transfer);
 var value, type, C, transferredArray, transferred, canvas, context;
 if (PROPER_TRANSFER) {
  transferredArray = nativeStructuredClone(transfer, { transfer: transfer });
  while (i < length)
   mapSet(map, transfer[i], transferredArray[i++]);
 } else
  while (i < length) {
   value = transfer[i++];
   if (mapHas(map, value))
    throw new DOMException('Duplicate transferable', DATA_CLONE_ERROR);
   type = classof(value);
   switch (type) {
   case 'ImageBitmap':
    C = global.OffscreenCanvas;
    if (!isConstructor(C))
     throwUnpolyfillable(type, TRANSFERRING);
    try {
     canvas = new C(value.width, value.height);
     context = canvas.getContext('bitmaprenderer');
     context.transferFromImageBitmap(value);
     transferred = canvas.transferToImageBitmap();
    } catch (error) {
    }
    break;
   case 'AudioData':
   case 'VideoFrame':
    if (!isCallable(value.clone) || !isCallable(value.close))
     throwUnpolyfillable(type, TRANSFERRING);
    try {
     transferred = value.clone();
     value.close();
    } catch (error) {
    }
    break;
   case 'ArrayBuffer':
   case 'MessagePort':
   case 'OffscreenCanvas':
   case 'ReadableStream':
   case 'TransformStream':
   case 'WritableStream':
    throwUnpolyfillable(type, TRANSFERRING);
   }
   if (transferred === undefined)
    throw new DOMException('This object cannot be transferred: ' + type, DATA_CLONE_ERROR);
   mapSet(map, value, transferred);
  }
};
$({
 global: true,
 enumerable: true,
 sham: !PROPER_TRANSFER,
 forced: FORCED_REPLACEMENT
}, {
 structuredClone: function structuredClone(value) {
  var options = validateArgumentsLength(arguments.length, 1) > 1 ? anObject(arguments[1]) : undefined;
  var transfer = options ? options.transfer : undefined;
  var map;
  if (transfer !== undefined) {
   map = new Map();
   tryToTransfer(transfer, map);
  }
  return structuredCloneInternal(value, map);
 }
});

/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.build = exports.RenderTask = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDocumentLoadingTask = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCanvasFactory = exports.DefaultCMapReaderFactory = void 0;
exports.getDocument = getDocument;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.version = void 0;

__w_pdfjs_require__(2);

__w_pdfjs_require__(82);

__w_pdfjs_require__(103);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(145);

__w_pdfjs_require__(106);

__w_pdfjs_require__(139);

__w_pdfjs_require__(177);

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(191);

var _font_loader = __w_pdfjs_require__(195);

var _node_utils = __w_pdfjs_require__(196);

var _annotation_storage = __w_pdfjs_require__(198);

var _canvas = __w_pdfjs_require__(199);

var _worker_options = __w_pdfjs_require__(203);

var _is_node = __w_pdfjs_require__(197);

var _message_handler = __w_pdfjs_require__(204);

var _metadata = __w_pdfjs_require__(206);

var _optional_content_config = __w_pdfjs_require__(207);

var _transport_stream = __w_pdfjs_require__(208);

var _xfa_text = __w_pdfjs_require__(209);

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

const DEFAULT_RANGE_CHUNK_SIZE = 65536;
const RENDERING_CANCELLED_TIMEOUT = 100;
const ServiceWorkerOptions = {
  showUnverifiedSignatures: false
};
window.ServiceWorkerOptions = ServiceWorkerOptions;
const DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
exports.DefaultCanvasFactory = DefaultCanvasFactory;
const DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
const DefaultStandardFontDataFactory = _is_node.isNodeJS ? _node_utils.NodeStandardFontDataFactory : _display_utils.DOMStandardFontDataFactory;
exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory;
let createPDFNetworkStream;

function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}

function getDocument(src) {
  const task = new PDFDocumentLoadingTask();
  let source;

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
    if (typeof src !== "object") {
      throw new Error("Invalid parameter in getDocument, " + "need either string, URL, Uint8Array, or parameter object.");
    }

    if (!src.url && !src.data && !src.range) {
      throw new Error("Invalid parameter object: need either .data, .range or .url");
    }

    source = src;
  }

  const baseHref = src.baseHref;
  const params = Object.create(null);
  let rangeTransport = null,
      worker = null;

  for (const key in source) {
    const value = source[key];

    switch (key) {
      case "url":
        if (typeof window !== "undefined") {
          try {
            if (baseHref) {
              params[key] = new URL(value, window.location.origin + baseHref).href;
            } else {
              params[key] = new URL(value, window.location).href;
            }

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
        } else if (typeof value === "object" && value !== null && !isNaN(value.length)) {
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
      throw new Error("Loading aborted");
    }

    const workerIdPromise = _fetchDocument(worker, params, rangeTransport, docId);

    const networkStreamPromise = new Promise(function (resolve) {
      let networkStream;

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
      let [workerId, networkStream] = _ref;

      if (task.destroyed) {
        throw new Error("Loading aborted");
      }

      const messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      const transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      messageHandler.send("showUnverifiedSignatures", window.ServiceWorkerOptions.showUnverifiedSignatures);
      messageHandler.send("Ready", null);
    });
  }).catch(task._capability.reject);
  return task;
}

async function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
  if (worker.destroyed) {
    throw new Error("Worker was destroyed");
  }

  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
    source.progressiveDone = pdfDataRangeTransport.progressiveDone;
    source.contentDispositionFilename = pdfDataRangeTransport.contentDispositionFilename;
  }

  let cMapUrl = source.cMapUrl;

  if (cMapUrl.constructor.name === "Function") {
    cMapUrl = cMapUrl();
  }

  const workerId = await worker.messageHandler.sendWithPromise("GetDocRequest", {
    docId,
    apiVersion: '2.13.481',
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
    docBaseUrl: source.docBaseUrl,
    ignoreErrors: source.ignoreErrors,
    isEvalSupported: source.isEvalSupported,
    fontExtraProperties: source.fontExtraProperties,
    enableXfa: source.enableXfa,
    useSystemFonts: source.useSystemFonts,
    cMapUrl: source.useWorkerFetch ? cMapUrl : null,
    standardFontDataUrl: source.useWorkerFetch ? source.standardFontDataUrl : null
  });

  if (worker.destroyed) {
    throw new Error("Worker was destroyed");
  }

  return workerId;
}

class PDFDocumentLoadingTask {
  static get idCounters() {
    return (0, _util.shadow)(this, "idCounters", {
      doc: 0
    });
  }

  constructor() {
    this._capability = (0, _util.createPromiseCapability)();
    this._transport = null;
    this._worker = null;
    this.docId = "d".concat(PDFDocumentLoadingTask.idCounters.doc++);
    this.destroyed = false;
    this.onPassword = null;
    this.onProgress = null;
    this.onUnsupportedFeature = null;
  }

  get promise() {
    return this._capability.promise;
  }

  async destroy() {
    var _this$_transport;

    this.destroyed = true;
    await ((_this$_transport = this._transport) === null || _this$_transport === void 0 ? void 0 : _this$_transport.destroy());
    this._transport = null;

    if (this._worker) {
      this._worker.destroy();

      this._worker = null;
    }
  }

}

exports.PDFDocumentLoadingTask = PDFDocumentLoadingTask;

class PDFDataRangeTransport {
  constructor(length, initialData) {
    let progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
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
    (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
  }

  abort() {}

}

exports.PDFDataRangeTransport = PDFDataRangeTransport;

class PDFDocumentProxy {
  constructor(pdfInfo, transport) {
    this._pdfInfo = pdfInfo;
    this._transport = transport;
    Object.defineProperty(this, "fingerprint", {
      get() {
        (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, " + "please use `PDFDocumentProxy.fingerprints` instead.");
        return this.fingerprints[0];
      }

    });
    Object.defineProperty(this, "getStats", {
      value: async () => {
        (0, _display_utils.deprecated)("`PDFDocumentProxy.getStats`, " + "please use the `PDFDocumentProxy.stats`-getter instead.");
        return this.stats || {
          streamTypes: {},
          fontTypes: {}
        };
      }
    });
  }

  get annotationStorage() {
    return this._transport.annotationStorage;
  }

  get numPages() {
    return this._pdfInfo.numPages;
  }

  get fingerprints() {
    return this._pdfInfo.fingerprints;
  }

  get stats() {
    return this._transport.stats;
  }

  get isPureXfa() {
    return !!this._transport._htmlForXfa;
  }

  get allXfaHtml() {
    return this._transport._htmlForXfa;
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

  getOpenAction() {
    return this._transport.getOpenAction();
  }

  getAttachments() {
    return this._transport.getAttachments();
  }

  getJavaScript() {
    return this._transport.getJavaScript();
  }

  getJSActions() {
    return this._transport.getDocJSActions();
  }

  getOutline() {
    return this._transport.getOutline();
  }

  getOptionalContentConfig() {
    return this._transport.getOptionalContentConfig();
  }

  getPermissions() {
    return this._transport.getPermissions();
  }

  getMetadata() {
    return this._transport.getMetadata();
  }

  getMarkInfo() {
    return this._transport.getMarkInfo();
  }

  getData() {
    return this._transport.getData();
  }

  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }

  cleanup() {
    let keepLoadedFonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa);
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

  saveDocument() {
    if (this._transport.annotationStorage.size <= 0) {
      (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, " + "please use the getData-method instead.");
    }

    return this._transport.saveDocument();
  }

  getFieldObjects() {
    return this._transport.getFieldObjects();
  }

  hasJSActions() {
    return this._transport.hasJSActions();
  }

  getCalculationOrderIds() {
    return this._transport.getCalculationOrderIds();
  }

}

exports.PDFDocumentProxy = PDFDocumentProxy;

class PDFPageProxy {
  constructor(pageIndex, pageInfo, transport, ownerDocument) {
    let pdfBug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
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
    this._annotationPromises = new Map();
    this.destroyed = false;
  }

  get pageNumber() {
    return this._pageIndex + 1;
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

  getViewport() {
    let {
      scale,
      rotation = this.rotate,
      offsetX = 0,
      offsetY = 0,
      dontFlip = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new _display_utils.PageViewport({
      viewBox: this.view,
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    });
  }

  getAnnotations() {
    let {
      intent = "display"
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    const intentArgs = this._transport.getRenderingIntent(intent);

    let promise = this._annotationPromises.get(intentArgs.cacheKey);

    if (!promise) {
      promise = this._transport.getAnnotations(this._pageIndex, intentArgs.renderingIntent);

      this._annotationPromises.set(intentArgs.cacheKey, promise);

      promise = promise.then(annotations => {
        for (const annotation of annotations) {
          if (annotation.titleObj !== undefined) {
            Object.defineProperty(annotation, "title", {
              get() {
                (0, _display_utils.deprecated)("`title`-property on annotation, please use `titleObj` instead.");
                return annotation.titleObj.str;
              }

            });
          }

          if (annotation.contentsObj !== undefined) {
            Object.defineProperty(annotation, "contents", {
              get() {
                (0, _display_utils.deprecated)("`contents`-property on annotation, please use `contentsObj` instead.");
                return annotation.contentsObj.str;
              }

            });
          }
        }

        return annotations;
      });
    }

    return promise;
  }

  getJSActions() {
    return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
  }

  async getXfa() {
    var _this$_transport$_htm;

    return ((_this$_transport$_htm = this._transport._htmlForXfa) === null || _this$_transport$_htm === void 0 ? void 0 : _this$_transport$_htm.children[this._pageIndex]) || null;
  }

  render(_ref2) {
    var _arguments$, _arguments$2, _intentState;

    let {
      canvasContext,
      viewport,
      intent = "display",
      annotationMode = _util.AnnotationMode.ENABLE,
      transform = null,
      imageLayer = null,
      canvasFactory = null,
      background = null,
      backgroundColorToReplace = null,
      optionalContentConfigPromise = null,
      annotationCanvasMap = null
    } = _ref2;

    if (((_arguments$ = arguments[0]) === null || _arguments$ === void 0 ? void 0 : _arguments$.renderInteractiveForms) !== undefined) {
      (0, _display_utils.deprecated)("render no longer accepts the `renderInteractiveForms`-option, " + "please use the `annotationMode`-option instead.");

      if (arguments[0].renderInteractiveForms === true && annotationMode === _util.AnnotationMode.ENABLE) {
        annotationMode = _util.AnnotationMode.ENABLE_FORMS;
      }
    }

    if (((_arguments$2 = arguments[0]) === null || _arguments$2 === void 0 ? void 0 : _arguments$2.includeAnnotationStorage) !== undefined) {
      (0, _display_utils.deprecated)("render no longer accepts the `includeAnnotationStorage`-option, " + "please use the `annotationMode`-option instead.");

      if (arguments[0].includeAnnotationStorage === true && annotationMode === _util.AnnotationMode.ENABLE) {
        annotationMode = _util.AnnotationMode.ENABLE_STORAGE;
      }
    }

    if (this._stats) {
      this._stats.time("Overall");
    }

    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode);

    this.pendingCleanup = false;

    if (!optionalContentConfigPromise) {
      optionalContentConfigPromise = this._transport.getOptionalContentConfig();
    }

    let intentState = this._intentStates.get(intentArgs.cacheKey);

    if (!intentState) {
      intentState = Object.create(null);

      this._intentStates.set(intentArgs.cacheKey, intentState);
    }

    if (intentState.streamReaderCancelTimeout) {
      clearTimeout(intentState.streamReaderCancelTimeout);
      intentState.streamReaderCancelTimeout = null;
    }

    const canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
      ownerDocument: this._ownerDocument
    });
    const intentPrint = !!(intentArgs.renderingIntent & _util.RenderingIntentFlag.PRINT);

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

      this._pumpOperatorList(intentArgs);
    }

    const complete = error => {
      intentState.renderTasks.delete(internalRenderTask);

      if (this.cleanupAfterRender || intentPrint) {
        this.pendingCleanup = true;
      }

      this._tryCleanup();

      if (error) {
        internalRenderTask.capability.reject(error);

        this._abortOperatorList({
          intentState,
          reason: error instanceof Error ? error : new Error(error)
        });
      } else {
        internalRenderTask.capability.resolve();
      }

      if (this._stats) {
        this._stats.timeEnd("Rendering");

        this._stats.timeEnd("Overall");
      }
    };

    const internalRenderTask = new InternalRenderTask({
      callback: complete,
      params: {
        canvasContext,
        viewport,
        transform,
        imageLayer,
        background,
        backgroundColorToReplace
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap,
      operatorList: intentState.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: canvasFactoryInstance,
      useRequestAnimationFrame: !intentPrint,
      pdfBug: this._pdfBug
    });
    ((_intentState = intentState).renderTasks || (_intentState.renderTasks = new Set())).add(internalRenderTask);
    const renderTask = internalRenderTask.task;
    Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(_ref3 => {
      let [transparency, optionalContentConfig] = _ref3;

      if (this.pendingCleanup) {
        complete();
        return;
      }

      if (this._stats) {
        this._stats.time("Rendering");
      }

      internalRenderTask.initializeGraphics({
        transparency,
        optionalContentConfig
      });
      internalRenderTask.operatorListChanged();
    }).catch(complete);
    return renderTask;
  }

  getOperatorList() {
    let {
      intent = "display",
      annotationMode = _util.AnnotationMode.ENABLE
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    function operatorListChanged() {
      if (intentState.operatorList.lastChunk) {
        intentState.opListReadCapability.resolve(intentState.operatorList);
        intentState.renderTasks.delete(opListTask);
      }
    }

    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, true);

    let intentState = this._intentStates.get(intentArgs.cacheKey);

    if (!intentState) {
      intentState = Object.create(null);

      this._intentStates.set(intentArgs.cacheKey, intentState);
    }

    let opListTask;

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

      this._pumpOperatorList(intentArgs);
    }

    return intentState.opListReadCapability.promise;
  }

  streamTextContent() {
    let {
      disableCombineTextItems = false,
      includeMarkedContent = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const TEXT_CONTENT_CHUNK_SIZE = 100;
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageIndex: this._pageIndex,
      combineTextItems: disableCombineTextItems !== true,
      includeMarkedContent: includeMarkedContent === true
    }, {
      highWaterMark: TEXT_CONTENT_CHUNK_SIZE,

      size(textContent) {
        return textContent.items.length;
      }

    });
  }

  getTextContent() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this._transport._htmlForXfa) {
      return this.getXfa().then(xfa => {
        return _xfa_text.XfaText.textContent(xfa);
      });
    }

    const readableStream = this.streamTextContent(params);
    return new Promise(function (resolve, reject) {
      function pump() {
        reader.read().then(function (_ref4) {
          let {
            value,
            done
          } = _ref4;

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

  getStructTree() {
    return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
  }

  _destroy() {
    this.destroyed = true;
    const waitOn = [];

    for (const intentState of this._intentStates.values()) {
      this._abortOperatorList({
        intentState,
        reason: new Error("Page was destroyed."),
        force: true
      });

      if (intentState.opListReadCapability) {
        continue;
      }

      for (const internalRenderTask of intentState.renderTasks) {
        waitOn.push(internalRenderTask.completed);
        internalRenderTask.cancel();
      }
    }

    this.objs.clear();

    this._annotationPromises.clear();

    this._jsActionsPromise = null;
    this._structTreePromise = null;
    this.pendingCleanup = false;
    return Promise.all(waitOn);
  }

  cleanup() {
    let resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.pendingCleanup = true;

    if (!this._tryCleanup(resetStats)) {
      this.cleanupAfterRender = true;
    }

    return true;
  }

  _tryCleanup() {
    let resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.pendingCleanup) {
      return false;
    }

    for (const {
      renderTasks,
      operatorList
    } of this._intentStates.values()) {
      if (renderTasks.size > 0 || !operatorList.lastChunk) {
        return false;
      }
    }

    this._intentStates.clear();

    this.objs.clear();

    this._annotationPromises.clear();

    this._jsActionsPromise = null;
    this._structTreePromise = null;

    if (resetStats && this._stats) {
      this._stats = new _display_utils.StatTimer();
    }

    this.pendingCleanup = false;
    return true;
  }

  _startRenderPage(transparency, cacheKey) {
    const intentState = this._intentStates.get(cacheKey);

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

  _renderPageChunk(operatorListChunk, intentState) {
    for (let i = 0, ii = operatorListChunk.length; i < ii; i++) {
      intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
      intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
    }

    intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

    for (const internalRenderTask of intentState.renderTasks) {
      internalRenderTask.operatorListChanged();
    }

    if (operatorListChunk.lastChunk) {
      this._tryCleanup();
    }
  }

  _pumpOperatorList(_ref5) {
    let {
      renderingIntent,
      cacheKey
    } = _ref5;

    const readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", {
      pageIndex: this._pageIndex,
      intent: renderingIntent,
      cacheKey,
      annotationStorage: renderingIntent & _util.RenderingIntentFlag.ANNOTATIONS_STORAGE ? this._transport.annotationStorage.serializable : null
    });

    const reader = readableStream.getReader();

    const intentState = this._intentStates.get(cacheKey);

    intentState.streamReader = reader;

    const pump = () => {
      reader.read().then(_ref6 => {
        let {
          value,
          done
        } = _ref6;

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

          for (const internalRenderTask of intentState.renderTasks) {
            internalRenderTask.operatorListChanged();
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

  _abortOperatorList(_ref7) {
    let {
      intentState,
      reason,
      force = false
    } = _ref7;

    if (!intentState.streamReader) {
      return;
    }

    if (!force) {
      if (intentState.renderTasks.size > 0) {
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

    intentState.streamReader.cancel(new _util.AbortException(reason.message)).catch(() => {});
    intentState.streamReader = null;

    if (this._transport.destroyed) {
      return;
    }

    for (const [curCacheKey, curIntentState] of this._intentStates) {
      if (curIntentState === intentState) {
        this._intentStates.delete(curCacheKey);

        break;
      }
    }

    this.cleanup();
  }

  get stats() {
    return this._stats;
  }

}

exports.PDFPageProxy = PDFPageProxy;

class LoopbackPort {
  constructor() {
    this._listeners = [];
    this._deferred = Promise.resolve();
  }

  postMessage(obj, transfers) {
    const event = {
      data: transfers ? structuredClone(obj, transfers) : structuredClone(obj)
    };

    this._deferred.then(() => {
      for (const listener of this._listeners) {
        listener.call(this, event);
      }
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
const PDFWorkerUtil = {
  isWorkerDisabled: false,
  fallbackWorkerSrc: null,
  fakeWorkerId: 0
};
{
  if (_is_node.isNodeJS && typeof require === "function") {
    PDFWorkerUtil.isWorkerDisabled = true;
    PDFWorkerUtil.fallbackWorkerSrc = "./pdf.worker.js";
  } else if (typeof document === "object") {
    var _document, _document$currentScri;

    const pdfjsFilePath = (_document = document) === null || _document === void 0 ? void 0 : (_document$currentScri = _document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.src;

    if (pdfjsFilePath) {
      PDFWorkerUtil.fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
    }
  }

  PDFWorkerUtil.createCDNWrapper = function (url) {
    const wrapper = "importScripts(\"".concat(url, "\");");
    return URL.createObjectURL(new Blob([wrapper]));
  };
}

class PDFWorker {
  static get _workerPorts() {
    return (0, _util.shadow)(this, "_workerPorts", new WeakMap());
  }

  constructor() {
    let {
      name = null,
      port = null,
      verbosity = (0, _util.getVerbosityLevel)()
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (port && PDFWorker._workerPorts.has(port)) {
      throw new Error("Cannot use more than one PDFWorker per port.");
    }

    this.name = name;
    this.destroyed = false;
    this.verbosity = verbosity;
    this._readyCapability = (0, _util.createPromiseCapability)();
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;

    if (port) {
      PDFWorker._workerPorts.set(port, this);

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
    this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);

    this._messageHandler.on("ready", function () {});

    this._readyCapability.resolve();
  }

  _initialize() {
    if (typeof Worker !== "undefined" && !PDFWorkerUtil.isWorkerDisabled && !PDFWorker._mainThreadWorkerMessageHandler) {
      let workerSrc = PDFWorker.workerSrc;

      try {
        if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
          workerSrc = PDFWorkerUtil.createCDNWrapper(new URL(workerSrc, window.location).href);
        }

        const worker = new Worker(workerSrc);
        const messageHandler = new _message_handler.MessageHandler("main", "worker", worker);

        const terminateEarly = () => {
          worker.removeEventListener("error", onWorkerError);
          messageHandler.destroy();
          worker.terminate();

          if (this.destroyed) {
            this._readyCapability.reject(new Error("Worker was destroyed"));
          } else {
            this._setupFakeWorker();
          }
        };

        const onWorkerError = () => {
          if (!this._webWorker) {
            terminateEarly();
          }
        };

        worker.addEventListener("error", onWorkerError);
        messageHandler.on("test", data => {
          worker.removeEventListener("error", onWorkerError);

          if (this.destroyed) {
            terminateEarly();
            return;
          }

          if (data) {
            this._messageHandler = messageHandler;
            this._port = worker;
            this._webWorker = worker;

            this._readyCapability.resolve();

            messageHandler.send("configure", {
              verbosity: this.verbosity
            });
          } else {
            this._setupFakeWorker();

            messageHandler.destroy();
            worker.terminate();
          }
        });
        messageHandler.on("ready", data => {
          worker.removeEventListener("error", onWorkerError);

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
          const testObj = new Uint8Array([255]);

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

  _setupFakeWorker() {
    if (!PDFWorkerUtil.isWorkerDisabled) {
      (0, _util.warn)("Setting up fake worker.");
      PDFWorkerUtil.isWorkerDisabled = true;
    }

    PDFWorker._setupFakeWorkerGlobal.then(WorkerMessageHandler => {
      if (this.destroyed) {
        this._readyCapability.reject(new Error("Worker was destroyed"));

        return;
      }

      const port = new LoopbackPort();
      this._port = port;
      const id = "fake".concat(PDFWorkerUtil.fakeWorkerId++);
      const workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
      WorkerMessageHandler.setup(workerHandler, port);
      const messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
      this._messageHandler = messageHandler;

      this._readyCapability.resolve();

      messageHandler.send("configure", {
        verbosity: this.verbosity
      });
    }).catch(reason => {
      this._readyCapability.reject(new Error("Setting up fake worker failed: \"".concat(reason.message, "\".")));
    });
  }

  destroy() {
    this.destroyed = true;

    if (this._webWorker) {
      this._webWorker.terminate();

      this._webWorker = null;
    }

    PDFWorker._workerPorts.delete(this._port);

    this._port = null;

    if (this._messageHandler) {
      this._messageHandler.destroy();

      this._messageHandler = null;
    }
  }

  static fromPort(params) {
    if (!(params !== null && params !== void 0 && params.port)) {
      throw new Error("PDFWorker.fromPort - invalid method signature.");
    }

    if (this._workerPorts.has(params.port)) {
      return this._workerPorts.get(params.port);
    }

    return new PDFWorker(params);
  }

  static get workerSrc() {
    if (_worker_options.GlobalWorkerOptions.workerSrc) {
      if (_worker_options.GlobalWorkerOptions.workerSrc.constructor.name === "Function") {
        return _worker_options.GlobalWorkerOptions.workerSrc();
      }

      return _worker_options.GlobalWorkerOptions.workerSrc;
    }

    if (PDFWorkerUtil.fallbackWorkerSrc !== null) {
      if (!_is_node.isNodeJS) {
        (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
      }

      return PDFWorkerUtil.fallbackWorkerSrc;
    }

    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }

  static get _mainThreadWorkerMessageHandler() {
    try {
      var _globalThis$pdfjsWork;

      return ((_globalThis$pdfjsWork = globalThis.pdfjsWorker) === null || _globalThis$pdfjsWork === void 0 ? void 0 : _globalThis$pdfjsWork.WorkerMessageHandler) || null;
    } catch (ex) {
      return null;
    }
  }

  static get _setupFakeWorkerGlobal() {
    const loader = async () => {
      const mainWorkerMessageHandler = this._mainThreadWorkerMessageHandler;

      if (mainWorkerMessageHandler) {
        return mainWorkerMessageHandler;
      }

      if (_is_node.isNodeJS && typeof require === "function") {
        const worker = eval("require")(this.workerSrc);
        return worker.WorkerMessageHandler;
      }

      await (0, _display_utils.loadScript)(this.workerSrc);
      return window.pdfjsWorker.WorkerMessageHandler;
    };

    return (0, _util.shadow)(this, "_setupFakeWorkerGlobal", loader());
  }

}

exports.PDFWorker = PDFWorker;
{
  PDFWorker.getWorkerSrc = function () {
    (0, _display_utils.deprecated)("`PDFWorker.getWorkerSrc()`, please use `PDFWorker.workerSrc` instead.");
    return this.workerSrc;
  };
}

var _docStats = /*#__PURE__*/new WeakMap();

var _pageCache = /*#__PURE__*/new WeakMap();

var _pagePromises = /*#__PURE__*/new WeakMap();

var _metadataPromise = /*#__PURE__*/new WeakMap();

class WorkerTransport {
  constructor(messageHandler, loadingTask, networkStream, params) {
    _classPrivateFieldInitSpec(this, _docStats, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pageCache, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _pagePromises, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _metadataPromise, {
      writable: true,
      value: null
    });

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
      let cMapUrl = params.cMapUrl;

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
    this.downloadInfoCapability = (0, _util.createPromiseCapability)();
    this.setupMessageHandler();
  }

  get annotationStorage() {
    return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
  }

  get stats() {
    return _classPrivateFieldGet(this, _docStats);
  }

  getRenderingIntent(intent) {
    let annotationMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.AnnotationMode.ENABLE;
    let isOpList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let renderingIntent = _util.RenderingIntentFlag.DISPLAY;
    let lastModified = "";

    switch (intent) {
      case "any":
        renderingIntent = _util.RenderingIntentFlag.ANY;
        break;

      case "display":
        break;

      case "print":
        renderingIntent = _util.RenderingIntentFlag.PRINT;
        break;

      default:
        (0, _util.warn)("getRenderingIntent - invalid intent: ".concat(intent));
    }

    switch (annotationMode) {
      case _util.AnnotationMode.DISABLE:
        renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_DISABLE;
        break;

      case _util.AnnotationMode.ENABLE:
        break;

      case _util.AnnotationMode.ENABLE_FORMS:
        renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_FORMS;
        break;

      case _util.AnnotationMode.ENABLE_STORAGE:
        renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_STORAGE;
        lastModified = this.annotationStorage.lastModified;
        break;

      default:
        (0, _util.warn)("getRenderingIntent - invalid annotationMode: ".concat(annotationMode));
    }

    if (isOpList) {
      renderingIntent += _util.RenderingIntentFlag.OPLIST;
    }

    return {
      renderingIntent,
      cacheKey: "".concat(renderingIntent, "_").concat(lastModified)
    };
  }

  destroy() {
    if (this.destroyCapability) {
      return this.destroyCapability.promise;
    }

    this.destroyed = true;
    this.destroyCapability = (0, _util.createPromiseCapability)();

    if (this._passwordCapability) {
      this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
    }

    const waitOn = [];

    for (const page of _classPrivateFieldGet(this, _pageCache).values()) {
      waitOn.push(page._destroy());
    }

    _classPrivateFieldGet(this, _pageCache).clear();

    _classPrivateFieldGet(this, _pagePromises).clear();

    if (this.hasOwnProperty("annotationStorage")) {
      this.annotationStorage.resetModified();
    }

    const terminated = this.messageHandler.sendWithPromise("Terminate", null);
    waitOn.push(terminated);
    Promise.all(waitOn).then(() => {
      this.commonObjs.clear();
      this.fontLoader.clear();

      _classPrivateFieldSet(this, _metadataPromise, null);

      this._getFieldObjectsPromise = null;
      this._hasJSActionsPromise = null;

      if (this._networkStream) {
        this._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated."));
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
    messageHandler.on("GetReader", (data, sink) => {
      (0, _util.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available.");
      this._fullReader = this._networkStream.getFullReader();

      this._fullReader.onProgress = evt => {
        this._lastProgress = {
          loaded: evt.loaded,
          total: evt.total
        };
      };

      sink.onPull = () => {
        this._fullReader.read().then(function (_ref8) {
          let {
            value,
            done
          } = _ref8;

          if (done) {
            sink.close();
            return;
          }

          (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch(reason => {
          sink.error(reason);
        });
      };

      sink.onCancel = reason => {
        this._fullReader.cancel(reason);

        sink.ready.catch(readyReason => {
          if (this.destroyed) {
            return;
          }

          throw readyReason;
        });
      };
    });
    messageHandler.on("ReaderHeadersReady", data => {
      const headersCapability = (0, _util.createPromiseCapability)();
      const fullReader = this._fullReader;
      fullReader.headersReady.then(() => {
        if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
          if (this._lastProgress) {
            var _loadingTask$onProgre;

            (_loadingTask$onProgre = loadingTask.onProgress) === null || _loadingTask$onProgre === void 0 ? void 0 : _loadingTask$onProgre.call(loadingTask, this._lastProgress);
          }

          fullReader.onProgress = evt => {
            var _loadingTask$onProgre2;

            (_loadingTask$onProgre2 = loadingTask.onProgress) === null || _loadingTask$onProgre2 === void 0 ? void 0 : _loadingTask$onProgre2.call(loadingTask, {
              loaded: evt.loaded,
              total: evt.total
            });
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
    messageHandler.on("GetRangeReader", (data, sink) => {
      (0, _util.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");

      const rangeReader = this._networkStream.getRangeReader(data.begin, data.end);

      if (!rangeReader) {
        sink.close();
        return;
      }

      sink.onPull = () => {
        rangeReader.read().then(function (_ref9) {
          let {
            value,
            done
          } = _ref9;

          if (done) {
            sink.close();
            return;
          }

          (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
          sink.enqueue(new Uint8Array(value), 1, [value]);
        }).catch(reason => {
          sink.error(reason);
        });
      };

      sink.onCancel = reason => {
        rangeReader.cancel(reason);
        sink.ready.catch(readyReason => {
          if (this.destroyed) {
            return;
          }

          throw readyReason;
        });
      };
    });
    messageHandler.on("GetDoc", _ref10 => {
      let {
        pdfInfo
      } = _ref10;
      this._numPages = pdfInfo.numPages;
      this._htmlForXfa = pdfInfo.htmlForXfa;
      delete pdfInfo.htmlForXfa;

      loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this));
    });
    messageHandler.on("DocException", function (ex) {
      let reason;

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

        default:
          (0, _util.unreachable)("DocException - expected a valid Error.");
      }

      loadingTask._capability.reject(reason);
    });
    messageHandler.on("PasswordRequest", exception => {
      this._passwordCapability = (0, _util.createPromiseCapability)();

      if (loadingTask.onPassword) {
        const updatePassword = password => {
          if (password instanceof Error) {
            this._passwordCapability.reject(password);
          } else {
            this._passwordCapability.resolve({
              password
            });
          }
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
    messageHandler.on("DataLoaded", data => {
      var _loadingTask$onProgre3;

      (_loadingTask$onProgre3 = loadingTask.onProgress) === null || _loadingTask$onProgre3 === void 0 ? void 0 : _loadingTask$onProgre3.call(loadingTask, {
        loaded: data.length,
        total: data.length
      });
      this.downloadInfoCapability.resolve(data);
    });
    messageHandler.on("StartRenderPage", data => {
      if (this.destroyed) {
        return;
      }

      const page = _classPrivateFieldGet(this, _pageCache).get(data.pageIndex);

      page._startRenderPage(data.transparency, data.cacheKey);
    });
    messageHandler.on("commonobj", _ref11 => {
      var _globalThis$FontInspe;

      let [id, type, exportedData] = _ref11;

      if (this.destroyed) {
        return;
      }

      if (this.commonObjs.has(id)) {
        return;
      }

      switch (type) {
        case "Font":
          const params = this._params;

          if ("error" in exportedData) {
            const exportedError = exportedData.error;
            (0, _util.warn)("Error during font loading: ".concat(exportedError));
            this.commonObjs.resolve(id, exportedError);
            break;
          }

          let fontRegistry = null;

          if (params.pdfBug && (_globalThis$FontInspe = globalThis.FontInspector) !== null && _globalThis$FontInspe !== void 0 && _globalThis$FontInspe.enabled) {
            fontRegistry = {
              registerFont(font, url) {
                globalThis.FontInspector.fontAdded(font, url);
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
          this.fontLoader.bind(font).catch(reason => {
            return messageHandler.sendWithPromise("FontFallback", {
              id
            });
          }).finally(() => {
            if (!params.fontExtraProperties && font.data) {
              font.data = null;
            }

            this.commonObjs.resolve(id, font);
          });
          break;

        case "FontPath":
        case "Image":
          this.commonObjs.resolve(id, exportedData);
          break;

        default:
          throw new Error("Got unknown common object type ".concat(type));
      }
    });
    messageHandler.on("obj", _ref12 => {
      var _imageData$data;

      let [id, pageIndex, type, imageData] = _ref12;

      if (this.destroyed) {
        return;
      }

      const pageProxy = _classPrivateFieldGet(this, _pageCache).get(pageIndex);

      if (pageProxy.objs.has(id)) {
        return;
      }

      switch (type) {
        case "Image":
          pageProxy.objs.resolve(id, imageData);
          const MAX_IMAGE_SIZE_TO_STORE = 8000000;

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
    });
    messageHandler.on("DocProgress", data => {
      var _loadingTask$onProgre4;

      if (this.destroyed) {
        return;
      }

      (_loadingTask$onProgre4 = loadingTask.onProgress) === null || _loadingTask$onProgre4 === void 0 ? void 0 : _loadingTask$onProgre4.call(loadingTask, {
        loaded: data.loaded,
        total: data.total
      });
    });
    messageHandler.on("DocStats", data => {
      if (this.destroyed) {
        return;
      }

      _classPrivateFieldSet(this, _docStats, Object.freeze({
        streamTypes: Object.freeze(data.streamTypes),
        fontTypes: Object.freeze(data.fontTypes)
      }));
    });
    messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
    messageHandler.on("FetchBuiltInCMap", data => {
      if (this.destroyed) {
        return Promise.reject(new Error("Worker was destroyed."));
      }

      if (!this.CMapReaderFactory) {
        return Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
      }

      return this.CMapReaderFactory.fetch(data);
    });
    messageHandler.on("FetchStandardFontData", data => {
      if (this.destroyed) {
        return Promise.reject(new Error("Worker was destroyed."));
      }

      if (!this.StandardFontDataFactory) {
        return Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
      }

      return this.StandardFontDataFactory.fetch(data);
    });
  }

  _onUnsupportedFeature(_ref13) {
    var _this$loadingTask$onU, _this$loadingTask;

    let {
      featureId
    } = _ref13;

    if (this.destroyed) {
      return;
    }

    (_this$loadingTask$onU = (_this$loadingTask = this.loadingTask).onUnsupportedFeature) === null || _this$loadingTask$onU === void 0 ? void 0 : _this$loadingTask$onU.call(_this$loadingTask, featureId);
  }

  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }

  getPage(pageNumber) {
    if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
      return Promise.reject(new Error("Invalid page request."));
    }

    const pageIndex = pageNumber - 1,
          cachedPromise = _classPrivateFieldGet(this, _pagePromises).get(pageIndex);

    if (cachedPromise) {
      return cachedPromise;
    }

    const promise = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex
    }).then(pageInfo => {
      if (this.destroyed) {
        throw new Error("Transport destroyed");
      }

      const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.ownerDocument, this._params.pdfBug);

      _classPrivateFieldGet(this, _pageCache).set(pageIndex, page);

      return page;
    });

    _classPrivateFieldGet(this, _pagePromises).set(pageIndex, promise);

    return promise;
  }

  getPageIndex(ref) {
    if (typeof ref !== "object" || ref === null || !Number.isInteger(ref.num) || ref.num < 0 || !Number.isInteger(ref.gen) || ref.gen < 0) {
      return Promise.reject(new Error("Invalid pageIndex request."));
    }

    return this.messageHandler.sendWithPromise("GetPageIndex", {
      num: ref.num,
      gen: ref.gen
    });
  }

  getAnnotations(pageIndex, intent) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex,
      intent
    });
  }

  saveDocument() {
    var _this$_fullReader$fil, _this$_fullReader;

    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: this.annotationStorage.serializable,
      filename: (_this$_fullReader$fil = (_this$_fullReader = this._fullReader) === null || _this$_fullReader === void 0 ? void 0 : _this$_fullReader.filename) !== null && _this$_fullReader$fil !== void 0 ? _this$_fullReader$fil : null
    }).finally(() => {
      this.annotationStorage.resetModified();
    });
  }

  getFieldObjects() {
    return this._getFieldObjectsPromise || (this._getFieldObjectsPromise = this.messageHandler.sendWithPromise("GetFieldObjects", null));
  }

  hasJSActions() {
    return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
  }

  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }

  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }

  getDestination(id) {
    if (typeof id !== "string") {
      return Promise.reject(new Error("Invalid destination request."));
    }

    return this.messageHandler.sendWithPromise("GetDestination", {
      id
    });
  }

  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }

  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }

  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }

  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }

  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }

  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }

  getJavaScript() {
    return this.messageHandler.sendWithPromise("GetJavaScript", null);
  }

  getDocJSActions() {
    return this.messageHandler.sendWithPromise("GetDocJSActions", null);
  }

  getPageJSActions(pageIndex) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex
    });
  }

  getStructTree(pageIndex) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex
    });
  }

  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }

  getOptionalContentConfig() {
    return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(results => {
      return new _optional_content_config.OptionalContentConfig(results);
    });
  }

  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }

  getMetadata() {
    return _classPrivateFieldGet(this, _metadataPromise) || _classPrivateFieldSet(this, _metadataPromise, this.messageHandler.sendWithPromise("GetMetadata", null).then(results => {
      var _this$_fullReader$fil2, _this$_fullReader2, _this$_fullReader$con, _this$_fullReader3;

      return {
        info: results[0],
        metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
        contentDispositionFilename: (_this$_fullReader$fil2 = (_this$_fullReader2 = this._fullReader) === null || _this$_fullReader2 === void 0 ? void 0 : _this$_fullReader2.filename) !== null && _this$_fullReader$fil2 !== void 0 ? _this$_fullReader$fil2 : null,
        contentLength: (_this$_fullReader$con = (_this$_fullReader3 = this._fullReader) === null || _this$_fullReader3 === void 0 ? void 0 : _this$_fullReader3.contentLength) !== null && _this$_fullReader$con !== void 0 ? _this$_fullReader$con : null
      };
    }));
  }

  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }

  async startCleanup() {
    let keepLoadedFonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    await this.messageHandler.sendWithPromise("Cleanup", null);

    if (this.destroyed) {
      return;
    }

    for (const page of _classPrivateFieldGet(this, _pageCache).values()) {
      const cleanupSuccessful = page.cleanup();

      if (!cleanupSuccessful) {
        throw new Error("startCleanup: Page ".concat(page.pageNumber, " is currently rendering."));
      }
    }

    this.commonObjs.clear();

    if (!keepLoadedFonts) {
      this.fontLoader.clear();
    }

    _classPrivateFieldSet(this, _metadataPromise, null);

    this._getFieldObjectsPromise = null;
    this._hasJSActionsPromise = null;
  }

  get loadingParams() {
    const params = this._params;
    return (0, _util.shadow)(this, "loadingParams", {
      disableAutoFetch: params.disableAutoFetch,
      enableXfa: params.enableXfa
    });
  }

}

var _objs = /*#__PURE__*/new WeakMap();

var _ensureObj = /*#__PURE__*/new WeakSet();

class PDFObjects {
  constructor() {
    _classPrivateMethodInitSpec(this, _ensureObj);

    _classPrivateFieldInitSpec(this, _objs, {
      writable: true,
      value: Object.create(null)
    });
  }

  get(objId) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (callback) {
      const obj = _classPrivateMethodGet(this, _ensureObj, _ensureObj2).call(this, objId);

      obj.capability.promise.then(() => callback(obj.data));
      return null;
    }

    const obj = _classPrivateFieldGet(this, _objs)[objId];

    if (!(obj !== null && obj !== void 0 && obj.capability.settled)) {
      throw new Error("Requesting object that isn't resolved yet ".concat(objId, "."));
    }

    return obj.data;
  }

  has(objId) {
    const obj = _classPrivateFieldGet(this, _objs)[objId];

    return (obj === null || obj === void 0 ? void 0 : obj.capability.settled) || false;
  }

  resolve(objId) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    const obj = _classPrivateMethodGet(this, _ensureObj, _ensureObj2).call(this, objId);

    obj.data = data;
    obj.capability.resolve();
  }

  clear() {
    _classPrivateFieldSet(this, _objs, Object.create(null));
  }

}

function _ensureObj2(objId) {
  const obj = _classPrivateFieldGet(this, _objs)[objId];

  if (obj) {
    return obj;
  }

  return _classPrivateFieldGet(this, _objs)[objId] = {
    capability: (0, _util.createPromiseCapability)(),
    data: null
  };
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

}

exports.RenderTask = RenderTask;

class InternalRenderTask {
  static get canvasInUse() {
    return (0, _util.shadow)(this, "canvasInUse", new WeakSet());
  }

  constructor(_ref14) {
    let {
      callback,
      params,
      objs,
      commonObjs,
      annotationCanvasMap,
      operatorList,
      pageIndex,
      canvasFactory,
      useRequestAnimationFrame = false,
      pdfBug = false
    } = _ref14;
    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.annotationCanvasMap = annotationCanvasMap;
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

  get completed() {
    return this.capability.promise.catch(function () {});
  }

  initializeGraphics(_ref15) {
    var _globalThis$StepperMa;

    let {
      transparency = false,
      optionalContentConfig
    } = _ref15;

    if (this.cancelled) {
      return;
    }

    if (this._canvas) {
      if (InternalRenderTask.canvasInUse.has(this._canvas)) {
        throw new Error("Cannot use the same canvas during multiple render() operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed.");
      }

      InternalRenderTask.canvasInUse.add(this._canvas);
    }

    if (this._pdfBug && (_globalThis$StepperMa = globalThis.StepperManager) !== null && _globalThis$StepperMa !== void 0 && _globalThis$StepperMa.enabled) {
      this.stepper = globalThis.StepperManager.create(this._pageIndex);
      this.stepper.init(this.operatorList);
      this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
    }

    const {
      canvasContext,
      viewport,
      transform,
      imageLayer,
      background,
      backgroundColorToReplace
    } = this.params;
    this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, imageLayer, optionalContentConfig, this.annotationCanvasMap);
    this.gfx.beginDrawing({
      transform,
      viewport,
      transparency,
      background,
      backgroundColorToReplace
    });
    this.operatorListIdx = 0;
    this.graphicsReady = true;

    if (this.graphicsReadyCallback) {
      this.graphicsReadyCallback();
    }
  }

  cancel() {
    let error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.running = false;
    this.cancelled = true;

    if (this.gfx) {
      this.gfx.endDrawing();
    }

    if (this._canvas) {
      InternalRenderTask.canvasInUse.delete(this._canvas);
    }

    this.callback(error || new _display_utils.RenderingCancelledException("Rendering cancelled, page ".concat(this._pageIndex + 1), "canvas"));
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
    window.ngxZone.runOutsideAngular(() => {
      if (this._useRequestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this._nextBound().catch(this._cancelBound);
        });
      } else {
        Promise.resolve().then(this._nextBound).catch(this._cancelBound);
      }
    });
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
          InternalRenderTask.canvasInUse.delete(this._canvas);
        }

        this.callback();
      }
    }
  }

}

const version = '2.13.481';
exports.version = version;
const build = 'b0b1da27a';
exports.build = build;

/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StatTimer = exports.RenderingCancelledException = exports.PixelsPerInch = exports.PageViewport = exports.PDFDateString = exports.DOMStandardFontDataFactory = exports.DOMSVGFactory = exports.DOMCanvasFactory = exports.DOMCMapReaderFactory = void 0;
exports.deprecated = deprecated;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.getPdfFilenameFromUrl = getPdfFilenameFromUrl;
exports.getXfaPageViewport = getXfaPageViewport;
exports.isDataScheme = isDataScheme;
exports.isPdfFile = isPdfFile;
exports.isValidFetchUrl = isValidFetchUrl;
exports.loadScript = loadScript;

__w_pdfjs_require__(145);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(106);

__w_pdfjs_require__(2);

__w_pdfjs_require__(82);

__w_pdfjs_require__(103);

__w_pdfjs_require__(192);

var _base_factory = __w_pdfjs_require__(194);

var _util = __w_pdfjs_require__(1);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SVG_NS = "http://www.w3.org/2000/svg";

class PixelsPerInch {}

exports.PixelsPerInch = PixelsPerInch;

_defineProperty(PixelsPerInch, "CSS", 96.0);

_defineProperty(PixelsPerInch, "PDF", 72.0);

_defineProperty(PixelsPerInch, "PDF_TO_CSS_UNITS", PixelsPerInch.CSS / PixelsPerInch.PDF);

class DOMCanvasFactory extends _base_factory.BaseCanvasFactory {
  constructor() {
    let {
      ownerDocument = globalThis.document
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    this._document = ownerDocument;
  }

  _createCanvas(width, height) {
    const canvas = this._document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

}

exports.DOMCanvasFactory = DOMCanvasFactory;

async function fetchData(url) {
  let asTypedArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isValidFetchUrl(url, document.baseURI)) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return asTypedArray ? new Uint8Array(await response.arrayBuffer()) : (0, _util.stringToBytes)(await response.text());
  }

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);

    if (asTypedArray) {
      request.responseType = "arraybuffer";
    }

    request.onreadystatechange = () => {
      if (request.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      if (request.status === 200 || request.status === 0) {
        let data;

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
  });
}

class DOMCMapReaderFactory extends _base_factory.BaseCMapReaderFactory {
  _fetchData(url, compressionType) {
    return fetchData(url, this.isCompressed).then(data => {
      return {
        cMapData: data,
        compressionType
      };
    });
  }

}

exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

class DOMStandardFontDataFactory extends _base_factory.BaseStandardFontDataFactory {
  _fetchData(url) {
    return fetchData(url, true);
  }

}

exports.DOMStandardFontDataFactory = DOMStandardFontDataFactory;

class DOMSVGFactory extends _base_factory.BaseSVGFactory {
  _createSVG(type) {
    return document.createElementNS(SVG_NS, type);
  }

}

exports.DOMSVGFactory = DOMSVGFactory;

class PageViewport {
  constructor(_ref) {
    let {
      viewBox,
      scale,
      rotation,
      offsetX = 0,
      offsetY = 0,
      dontFlip = false
    } = _ref;
    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    const centerX = (viewBox[2] + viewBox[0]) / 2;
    const centerY = (viewBox[3] + viewBox[1]) / 2;
    let rotateA, rotateB, rotateC, rotateD;
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

  clone() {
    let {
      scale = this.scale,
      rotation = this.rotation,
      offsetX = this.offsetX,
      offsetY = this.offsetY,
      dontFlip = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new PageViewport({
      viewBox: this.viewBox.slice(),
      scale,
      rotation,
      offsetX,
      offsetY,
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
    super(msg, "RenderingCancelledException");
    this.type = type;
  }

}

exports.RenderingCancelledException = RenderingCancelledException;

function isDataScheme(url) {
  const ii = url.length;
  let i = 0;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}

function isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}

function getFilenameFromUrl(url) {
  const anchor = url.indexOf("#");
  const query = url.indexOf("?");
  const end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf("/", end) + 1, end);
}

function getPdfFilenameFromUrl(url) {
  let defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "document.pdf";

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

  const reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  const splitURI = reURI.exec(url);
  let suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);

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

class StatTimer {
  constructor() {
    this.started = Object.create(null);
    this.times = [];
  }

  time(name) {
    if (name in this.started) {
      (0, _util.warn)("Timer is already running for ".concat(name));
    }

    this.started[name] = Date.now();
  }

  timeEnd(name) {
    if (!(name in this.started)) {
      (0, _util.warn)("Timer has not been started for ".concat(name));
    }

    this.times.push({
      name,
      start: this.started[name],
      end: Date.now()
    });
    delete this.started[name];
  }

  toString() {
    const outBuf = [];
    let longest = 0;

    for (const time of this.times) {
      const name = time.name;

      if (name.length > longest) {
        longest = name.length;
      }
    }

    for (const time of this.times) {
      const duration = time.end - time.start;
      outBuf.push("".concat(time.name.padEnd(longest), " ").concat(duration, "ms\n"));
    }

    return outBuf.join("");
  }

}

exports.StatTimer = StatTimer;

function isValidFetchUrl(url, baseUrl) {
  try {
    const {
      protocol
    } = baseUrl ? new URL(url, baseUrl) : new URL(url);
    return protocol === "http:" || protocol === "https:" || protocol === "capacitor:";
  } catch (ex) {
    return false;
  }
}

function loadScript(src) {
  let removeScriptElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

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

    script.onerror = function (error) {
      Window['ngxConsole'].log(error);
      reject(new Error("Cannot load script at: ".concat(script.src)));
    };

    (document.head || document.documentElement).appendChild(script);
  });
}

function deprecated(details) {
  Window['ngxConsole'].log("Deprecated API usage: " + details);
}

let pdfDateStringRegex;

class PDFDateString {
  static toDateObject(input) {
    if (!input || typeof input !== "string") {
      return null;
    }

    if (!pdfDateStringRegex) {
      pdfDateStringRegex = new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
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
    const universalTimeRelation = matches[7] || "Z";
    let offsetHour = parseInt(matches[8], 10);
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10) || 0;
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

}

exports.PDFDateString = PDFDateString;

function getXfaPageViewport(xfaPage, _ref2) {
  let {
    scale = 1,
    rotation = 0
  } = _ref2;
  const {
    width,
    height
  } = xfaPage.attributes.style;
  const viewBox = [0, 0, parseInt(width), parseInt(height)];
  return new PageViewport({
    viewBox,
    scale,
    rotation
  });
}

/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var DESCRIPTORS = __w_pdfjs_require__(34);
var global = __w_pdfjs_require__(3);
var uncurryThis = __w_pdfjs_require__(12);
var isForced = __w_pdfjs_require__(74);
var inheritIfRequired = __w_pdfjs_require__(132);
var createNonEnumerableProperty = __w_pdfjs_require__(62);
var defineProperty = (__w_pdfjs_require__(36).f);
var getOwnPropertyNames = (__w_pdfjs_require__(72).f);
var isPrototypeOf = __w_pdfjs_require__(42);
var isRegExp = __w_pdfjs_require__(193);
var toString = __w_pdfjs_require__(85);
var regExpFlags = __w_pdfjs_require__(108);
var stickyHelpers = __w_pdfjs_require__(109);
var redefine = __w_pdfjs_require__(68);
var fails = __w_pdfjs_require__(14);
var hasOwn = __w_pdfjs_require__(23);
var enforceInternalState = (__w_pdfjs_require__(59).enforce);
var setSpecies = __w_pdfjs_require__(131);
var wellKnownSymbol = __w_pdfjs_require__(18);
var UNSUPPORTED_DOT_ALL = __w_pdfjs_require__(110);
var UNSUPPORTED_NCG = __w_pdfjs_require__(111);
var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var getFlags = uncurryThis(regExpFlags);
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var BASE_FORCED = DESCRIPTORS && (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
 re2[MATCH] = false;
 return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
}));
var handleDotAll = function (string) {
 var length = string.length;
 var index = 0;
 var result = '';
 var brackets = false;
 var chr;
 for (; index <= length; index++) {
  chr = charAt(string, index);
  if (chr === '\\') {
   result += chr + charAt(string, ++index);
   continue;
  }
  if (!brackets && chr === '.') {
   result += '[\\s\\S]';
  } else {
   if (chr === '[') {
    brackets = true;
   } else if (chr === ']') {
    brackets = false;
   }
   result += chr;
  }
 }
 return result;
};
var handleNCG = function (string) {
 var length = string.length;
 var index = 0;
 var result = '';
 var named = [];
 var names = {};
 var brackets = false;
 var ncg = false;
 var groupid = 0;
 var groupname = '';
 var chr;
 for (; index <= length; index++) {
  chr = charAt(string, index);
  if (chr === '\\') {
   chr = chr + charAt(string, ++index);
  } else if (chr === ']') {
   brackets = false;
  } else if (!brackets)
   switch (true) {
   case chr === '[':
    brackets = true;
    break;
   case chr === '(':
    if (exec(IS_NCG, stringSlice(string, index + 1))) {
     index += 2;
     ncg = true;
    }
    result += chr;
    groupid++;
    continue;
   case chr === '>' && ncg:
    if (groupname === '' || hasOwn(names, groupname)) {
     throw new SyntaxError('Invalid capture group name');
    }
    names[groupname] = true;
    named[named.length] = [
     groupname,
     groupid
    ];
    ncg = false;
    groupname = '';
    continue;
   }
  if (ncg)
   groupname += chr;
  else
   result += chr;
 }
 return [
  result,
  named
 ];
};
if (isForced('RegExp', BASE_FORCED)) {
 var RegExpWrapper = function RegExp(pattern, flags) {
  var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
  var patternIsRegExp = isRegExp(pattern);
  var flagsAreUndefined = flags === undefined;
  var groups = [];
  var rawPattern = pattern;
  var rawFlags, dotAll, sticky, handled, result, state;
  if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
   return pattern;
  }
  if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
   pattern = pattern.source;
   if (flagsAreUndefined)
    flags = 'flags' in rawPattern ? rawPattern.flags : getFlags(rawPattern);
  }
  pattern = pattern === undefined ? '' : toString(pattern);
  flags = flags === undefined ? '' : toString(flags);
  rawPattern = pattern;
  if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
   dotAll = !!flags && stringIndexOf(flags, 's') > -1;
   if (dotAll)
    flags = replace(flags, /s/g, '');
  }
  rawFlags = flags;
  if (MISSED_STICKY && 'sticky' in re1) {
   sticky = !!flags && stringIndexOf(flags, 'y') > -1;
   if (sticky && UNSUPPORTED_Y)
    flags = replace(flags, /y/g, '');
  }
  if (UNSUPPORTED_NCG) {
   handled = handleNCG(pattern);
   pattern = handled[0];
   groups = handled[1];
  }
  result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  if (dotAll || sticky || groups.length) {
   state = enforceInternalState(result);
   if (dotAll) {
    state.dotAll = true;
    state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
   }
   if (sticky)
    state.sticky = true;
   if (groups.length)
    state.groups = groups;
  }
  if (pattern !== rawPattern)
   try {
    createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
   } catch (error) {
   }
  return result;
 };
 var proxy = function (key) {
  key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
   configurable: true,
   get: function () {
    return NativeRegExp[key];
   },
   set: function (it) {
    NativeRegExp[key] = it;
   }
  });
 };
 for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
  proxy(keys[index++]);
 }
 RegExpPrototype.constructor = RegExpWrapper;
 RegExpWrapper.prototype = RegExpPrototype;
 redefine(global, 'RegExp', RegExpWrapper);
}
setSpecies('RegExp');

/***/ }),
/* 193 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

var isObject = __w_pdfjs_require__(7);
var classof = __w_pdfjs_require__(15);
var wellKnownSymbol = __w_pdfjs_require__(18);
var MATCH = wellKnownSymbol('match');
module.exports = function (it) {
 var isRegExp;
 return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseStandardFontDataFactory = exports.BaseSVGFactory = exports.BaseCanvasFactory = exports.BaseCMapReaderFactory = void 0;

__w_pdfjs_require__(145);

var _util = __w_pdfjs_require__(1);

class BaseCanvasFactory {
  constructor() {
    if (this.constructor === BaseCanvasFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCanvasFactory.");
    }
  }

  create(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }

    const canvas = this._createCanvas(width, height);

    return {
      canvas,
      context: canvas.getContext("2d")
    };
  }

  reset(canvasAndContext, width, height) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }

    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }

    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }

    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }

  _createCanvas(width, height) {
    (0, _util.unreachable)("Abstract method `_createCanvas` called.");
  }

}

exports.BaseCanvasFactory = BaseCanvasFactory;

class BaseCMapReaderFactory {
  constructor(_ref) {
    let {
      baseUrl = null,
      isCompressed = false
    } = _ref;

    if (this.constructor === BaseCMapReaderFactory) {
      (0, _util.unreachable)("Cannot initialize BaseCMapReaderFactory.");
    }

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  async fetch(_ref2) {
    let {
      name
    } = _ref2;

    if (!this.baseUrl) {
      throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');
    }

    if (!name) {
      throw new Error("CMap name must be specified.");
    }

    const url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
    const compressionType = this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE;
    return this._fetchData(url, compressionType).catch(reason => {
      throw new Error("Unable to load ".concat(this.isCompressed ? "binary " : "", "CMap at: ").concat(url));
    });
  }

  _fetchData(url, compressionType) {
    (0, _util.unreachable)("Abstract method `_fetchData` called.");
  }

}

exports.BaseCMapReaderFactory = BaseCMapReaderFactory;

class BaseStandardFontDataFactory {
  constructor(_ref3) {
    let {
      baseUrl = null
    } = _ref3;

    if (this.constructor === BaseStandardFontDataFactory) {
      (0, _util.unreachable)("Cannot initialize BaseStandardFontDataFactory.");
    }

    this.baseUrl = baseUrl;
  }

  async fetch(_ref4) {
    let {
      filename
    } = _ref4;

    if (!this.baseUrl) {
      throw new Error('The standard font "baseUrl" parameter must be specified, ensure that ' + 'the "standardFontDataUrl" API parameter is provided.');
    }

    if (!filename) {
      throw new Error("Font filename must be specified.");
    }

    const url = "".concat(this.baseUrl).concat(filename);
    return this._fetchData(url).catch(reason => {
      throw new Error("Unable to load font data at: ".concat(url));
    });
  }

  _fetchData(url) {
    (0, _util.unreachable)("Abstract method `_fetchData` called.");
  }

}

exports.BaseStandardFontDataFactory = BaseStandardFontDataFactory;

class BaseSVGFactory {
  constructor() {
    if (this.constructor === BaseSVGFactory) {
      (0, _util.unreachable)("Cannot initialize BaseSVGFactory.");
    }
  }

  create(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid SVG dimensions");
    }

    const svg = this._createSVG("svg:svg");

    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "".concat(width, "px"));
    svg.setAttribute("height", "".concat(height, "px"));
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
    return svg;
  }

  createElement(type) {
    if (typeof type !== "string") {
      throw new Error("Invalid SVG element type");
    }

    return this._createSVG(type);
  }

  _createSVG(type) {
    (0, _util.unreachable)("Abstract method `_createSVG` called.");
  }

}

exports.BaseSVGFactory = BaseSVGFactory;

/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FontLoader = exports.FontFaceObject = void 0;

__w_pdfjs_require__(2);

__w_pdfjs_require__(145);

__w_pdfjs_require__(106);

var _util = __w_pdfjs_require__(1);

class BaseFontLoader {
  constructor(_ref) {
    let {
      docId,
      onUnsupportedFeature,
      ownerDocument = globalThis.document,
      styleElement = null
    } = _ref;

    if (this.constructor === BaseFontLoader) {
      (0, _util.unreachable)("Cannot initialize BaseFontLoader.");
    }

    this.docId = docId;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this._document = ownerDocument;
    this.nativeFontFaces = [];
    this.styleElement = null;
  }

  addNativeFontFace(nativeFontFace) {
    this.nativeFontFaces.push(nativeFontFace);

    this._document.fonts.add(nativeFontFace);
  }

  insertRule(rule) {
    let styleElement = this.styleElement;

    if (!styleElement) {
      styleElement = this.styleElement = this._document.createElement("style");
      styleElement.id = "PDFJS_FONT_STYLE_TAG_".concat(this.docId);

      this._document.documentElement.getElementsByTagName("head")[0].appendChild(styleElement);
    }

    const styleSheet = styleElement.sheet;
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }

  clear() {
    for (const nativeFontFace of this.nativeFontFaces) {
      this._document.fonts.delete(nativeFontFace);
    }

    this.nativeFontFaces.length = 0;

    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }

  async bind(font) {
    if (font.attached || font.missingFile) {
      return;
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
            featureId: _util.UNSUPPORTED_FEATURES.errorFontLoadNative
          });

          (0, _util.warn)("Failed to load font '".concat(nativeFontFace.family, "': '").concat(ex, "'."));
          font.disableFontFace = true;
          throw ex;
        }
      }

      return;
    }

    const rule = font.createFontFaceRule();

    if (rule) {
      this.insertRule(rule);

      if (this.isSyncFontLoadingSupported) {
        return;
      }

      await new Promise(resolve => {
        const request = this._queueLoadingCallback(resolve);

        this._prepareFontLoadEvent([rule], [font], request);
      });
    }
  }

  _queueLoadingCallback(callback) {
    (0, _util.unreachable)("Abstract method `_queueLoadingCallback`.");
  }

  get isFontLoadingAPISupported() {
    var _this$_document;

    const hasFonts = !!((_this$_document = this._document) !== null && _this$_document !== void 0 && _this$_document.fonts);
    return (0, _util.shadow)(this, "isFontLoadingAPISupported", hasFonts);
  }

  get isSyncFontLoadingSupported() {
    (0, _util.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
  }

  get _loadTestFont() {
    (0, _util.unreachable)("Abstract method `_loadTestFont`.");
  }

  _prepareFontLoadEvent(rules, fontsToLoad, request) {
    (0, _util.unreachable)("Abstract method `_prepareFontLoadEvent`.");
  }

}

let FontLoader;
exports.FontLoader = FontLoader;
{
  exports.FontLoader = FontLoader = class GenericFontLoader extends BaseFontLoader {
    constructor(params) {
      super(params);
      this.loadingContext = {
        requests: [],
        nextRequestId: 0
      };
      this.loadTestFontId = 0;
    }

    get isSyncFontLoadingSupported() {
      let supported = false;

      if (typeof navigator === "undefined") {
        supported = true;
      } else {
        const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

        if ((m === null || m === void 0 ? void 0 : m[1]) >= 14) {
          supported = true;
        }
      }

      return (0, _util.shadow)(this, "isSyncFontLoadingSupported", supported);
    }

    _queueLoadingCallback(callback) {
      function completeRequest() {
        (0, _util.assert)(!request.done, "completeRequest() cannot be called twice.");
        request.done = true;

        while (context.requests.length > 0 && context.requests[0].done) {
          const otherRequest = context.requests.shift();
          setTimeout(otherRequest.callback, 0);
        }
      }

      const context = this.loadingContext;
      const request = {
        id: "pdfjs-font-loading-".concat(context.nextRequestId++),
        done: false,
        complete: completeRequest,
        callback
      };
      context.requests.push(request);
      return request;
    }

    get _loadTestFont() {
      const getLoadTestFont = function () {
        return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA" + "FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA" + "ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA" + "AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1" + "AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD" + "6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM" + "AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D" + "IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA" + "AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA" + "AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB" + "AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY" + "AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA" + "AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA" + "AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC" + "AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3" + "Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj" + "FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
      };

      return (0, _util.shadow)(this, "_loadTestFont", getLoadTestFont());
    }

    _prepareFontLoadEvent(rules, fonts, request) {
      function int32(data, offset) {
        return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
      }

      function spliceString(s, offset, remove, insert) {
        const chunk1 = s.substring(0, offset);
        const chunk2 = s.substring(offset + remove);
        return chunk1 + insert + chunk2;
      }

      let i, ii;

      const canvas = this._document.createElement("canvas");

      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      let called = 0;

      function isFontReady(name, callback) {
        called++;

        if (called > 30) {
          (0, _util.warn)("Load test font never loaded.");
          callback();
          return;
        }

        ctx.font = "30px " + name;
        ctx.fillText(".", 0, 20);
        const imageData = ctx.getImageData(0, 0, 1, 1);

        if (imageData.data[3] > 0) {
          callback();
          return;
        }

        setTimeout(isFontReady.bind(null, name, callback));
      }

      const loadTestFontId = "lt".concat(Date.now()).concat(this.loadTestFontId++);
      let data = this._loadTestFont;
      const COMMENT_OFFSET = 976;
      data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
      const CFF_CHECKSUM_OFFSET = 16;
      const XXXX_VALUE = 0x58585858;
      let checksum = int32(data, CFF_CHECKSUM_OFFSET);

      for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
        checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
      }

      if (i < loadTestFontId.length) {
        checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i) | 0;
      }

      data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util.string32)(checksum));
      const url = "url(data:font/opentype;base64,".concat(btoa(data), ");");
      const rule = "@font-face {font-family:\"".concat(loadTestFontId, "\";src:").concat(url, "}");
      this.insertRule(rule);
      const names = [];

      for (const font of fonts) {
        names.push(font.loadedName);
      }

      names.push(loadTestFontId);

      const div = this._document.createElement("div");

      div.style.visibility = "hidden";
      div.style.width = div.style.height = "10px";
      div.style.position = "absolute";
      div.style.top = div.style.left = "0px";

      for (const name of names) {
        const span = this._document.createElement("span");

        span.textContent = "Hi";
        span.style.fontFamily = name;
        div.appendChild(span);
      }

      this._document.body.appendChild(div);

      isFontReady(loadTestFontId, () => {
        div.remove();
        request.complete();
      });
    }

  };
}

class FontFaceObject {
  constructor(translatedData, _ref2) {
    let {
      isEvalSupported = true,
      disableFontFace = false,
      ignoreErrors = false,
      onUnsupportedFeature,
      fontRegistry = null
    } = _ref2;
    this.compiledGlyphs = Object.create(null);

    for (const i in translatedData) {
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

    let nativeFontFace;

    if (!this.cssFontInfo) {
      nativeFontFace = new FontFace(this.loadedName, this.data, {});
    } else {
      const css = {
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

  createFontFaceRule() {
    if (!this.data || this.disableFontFace) {
      return null;
    }

    const data = (0, _util.bytesToString)(this.data);
    const url = "url(data:".concat(this.mimetype, ";base64,").concat(btoa(data), ");");
    let rule;

    if (!this.cssFontInfo) {
      rule = "@font-face {font-family:\"".concat(this.loadedName, "\";src:").concat(url, "}");
    } else {
      let css = "font-weight: ".concat(this.cssFontInfo.fontWeight, ";");

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

  getPathGenerator(objs, character) {
    if (this.compiledGlyphs[character] !== undefined) {
      return this.compiledGlyphs[character];
    }

    let cmds;

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
      const jsBuf = [];

      for (const current of cmds) {
        const args = current.args !== undefined ? current.args.join(",") : "";
        jsBuf.push("c.", current.cmd, "(", args, ");\n");
      }

      return this.compiledGlyphs[character] = new Function("c", "size", jsBuf.join(""));
    }

    return this.compiledGlyphs[character] = function (c, size) {
      for (const current of cmds) {
        if (current.cmd === "scale") {
          current.args = [size, -size];
        }

        c[current.cmd].apply(c, current.args);
      }
    };
  }

}

exports.FontFaceObject = FontFaceObject;

/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NodeStandardFontDataFactory = exports.NodeCanvasFactory = exports.NodeCMapReaderFactory = void 0;

__w_pdfjs_require__(145);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

var _base_factory = __w_pdfjs_require__(194);

var _is_node = __w_pdfjs_require__(197);

var _util = __w_pdfjs_require__(1);

let NodeCanvasFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeCanvasFactory");
  }

};
exports.NodeCanvasFactory = NodeCanvasFactory;
let NodeCMapReaderFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeCMapReaderFactory");
  }

};
exports.NodeCMapReaderFactory = NodeCMapReaderFactory;
let NodeStandardFontDataFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeStandardFontDataFactory");
  }

};
exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory;

if (_is_node.isNodeJS) {
  const fetchData = function (url) {
    return new Promise((resolve, reject) => {
      const fs = require("fs");

      fs.readFile(url, (error, data) => {
        if (error || !data) {
          reject(new Error(error));
          return;
        }

        resolve(new Uint8Array(data));
      });
    });
  };

  exports.NodeCanvasFactory = NodeCanvasFactory = class extends _base_factory.BaseCanvasFactory {
    _createCanvas(width, height) {
      const Canvas = require("canvas");

      return Canvas.createCanvas(width, height);
    }

  };
  exports.NodeCMapReaderFactory = NodeCMapReaderFactory = class extends _base_factory.BaseCMapReaderFactory {
    _fetchData(url, compressionType) {
      return fetchData(url).then(data => {
        return {
          cMapData: data,
          compressionType
        };
      });
    }

  };
  exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory = class extends _base_factory.BaseStandardFontDataFactory {
    _fetchData(url) {
      return fetchData(url);
    }

  };
}

/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isNodeJS = void 0;
const isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
exports.isNodeJS = isNodeJS;

/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnnotationStorage = void 0;

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

class AnnotationStorage {
  constructor() {
    this._storage = new Map();
    this._timeStamp = Date.now();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  getValue(key, fieldname, defaultValue) {
    let radioButtonField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    let obj = this._storage.get(key);

    if (obj === undefined) {
      if (window.getFormValue) {
        window.assignFormIdAndFieldName(key, fieldname, radioButtonField);
        const ngObj = window.getFormValue(fieldname);

        if (ngObj !== undefined && ngObj.value !== undefined) {
          if (radioButtonField) {
            const value = {
              value: ngObj.value === radioButtonField
            };
            obj = value;
          } else {
            obj = ngObj;
          }

          this.setValue(key, undefined, obj, undefined, true);
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

    if (obj === undefined) {
      return defaultValue;
    }

    return Object.assign(defaultValue, obj);
  }

  setValue(key, fieldname, value) {
    let radioButtonField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    let isDefaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    const obj = this._storage.get(key);

    let modified = false;

    if (obj !== undefined) {
      for (const [entry, val] of Object.entries(value)) {
        if (entry !== "radioValue" && entry !== "emitMessage" && obj[entry] !== val) {
          modified = true;
          obj[entry] = val;
        }
      }
    } else {
      if (!isDefaultValue) {
        modified = true;
      }

      this._storage.set(key, value);
    }

    if (modified) {
      this._timeStamp = Date.now();

      this._setModified();

      if (fieldname || radioButtonField) {
        if (window.setFormValue) {
          if (value.items) {
            window.setFormValue(fieldname, value.items);
          } else if (value.emitMessage === false) {} else if (value.radioValue) {
            window.setFormValue(fieldname, value.radioValue);
          } else if (value.exportValue) {
            window.setFormValue(fieldname, value.exportValue);
          } else {
            for (const val of Object.values(value)) {
              window.setFormValue(fieldname, val);
            }
          }
        }
      }
    }
  }

  getAll() {
    return this._storage.size > 0 ? (0, _util.objectFromMap)(this._storage) : null;
  }

  get size() {
    return this._storage.size;
  }

  _setModified() {
    if (!this._modified) {
      this._modified = true;

      if (typeof this.onSetModified === "function") {
        this.onSetModified();
      }
    }
  }

  resetModified() {
    if (this._modified) {
      this._modified = false;

      if (typeof this.onResetModified === "function") {
        this.onResetModified();
      }
    }
  }

  get serializable() {
    return this._storage.size > 0 ? this._storage : null;
  }

  get lastModified() {
    return this._timeStamp.toString();
  }

}

exports.AnnotationStorage = AnnotationStorage;

/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CanvasGraphics = void 0;

__w_pdfjs_require__(2);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(200);

__w_pdfjs_require__(138);

__w_pdfjs_require__(201);

var _util = __w_pdfjs_require__(1);

var _pattern_helper = __w_pdfjs_require__(202);

var _display_utils = __w_pdfjs_require__(191);

const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 100;
const MAX_GROUP_SIZE = 4096;
const EXECUTION_TIME = 15;
const EXECUTION_STEPS = 10;
const COMPILE_TYPE3_GLYPHS = true;
const MAX_SIZE_TO_COMPILE = 1000;
const FULL_CHUNK_HEIGHT = 16;
const LINEWIDTH_SCALE_FACTOR = 1.000001;

function mirrorContextOperations(ctx, destCtx) {
  if (ctx._removeMirroring) {
    throw new Error("Context is already forwarding operations.");
  }

  ctx.__originalSave = ctx.save;
  ctx.__originalRestore = ctx.restore;
  ctx.__originalRotate = ctx.rotate;
  ctx.__originalScale = ctx.scale;
  ctx.__originalTranslate = ctx.translate;
  ctx.__originalTransform = ctx.transform;
  ctx.__originalSetTransform = ctx.setTransform;
  ctx.__originalResetTransform = ctx.resetTransform;
  ctx.__originalClip = ctx.clip;
  ctx.__originalMoveTo = ctx.moveTo;
  ctx.__originalLineTo = ctx.lineTo;
  ctx.__originalBezierCurveTo = ctx.bezierCurveTo;
  ctx.__originalRect = ctx.rect;
  ctx.__originalClosePath = ctx.closePath;
  ctx.__originalBeginPath = ctx.beginPath;

  ctx._removeMirroring = () => {
    ctx.save = ctx.__originalSave;
    ctx.restore = ctx.__originalRestore;
    ctx.rotate = ctx.__originalRotate;
    ctx.scale = ctx.__originalScale;
    ctx.translate = ctx.__originalTranslate;
    ctx.transform = ctx.__originalTransform;
    ctx.setTransform = ctx.__originalSetTransform;
    ctx.resetTransform = ctx.__originalResetTransform;
    ctx.clip = ctx.__originalClip;
    ctx.moveTo = ctx.__originalMoveTo;
    ctx.lineTo = ctx.__originalLineTo;
    ctx.bezierCurveTo = ctx.__originalBezierCurveTo;
    ctx.rect = ctx.__originalRect;
    ctx.closePath = ctx.__originalClosePath;
    ctx.beginPath = ctx.__originalBeginPath;
    delete ctx._removeMirroring;
  };

  ctx.save = function ctxSave() {
    destCtx.save();

    this.__originalSave();
  };

  ctx.restore = function ctxRestore() {
    destCtx.restore();

    this.__originalRestore();
  };

  ctx.translate = function ctxTranslate(x, y) {
    destCtx.translate(x, y);

    this.__originalTranslate(x, y);
  };

  ctx.scale = function ctxScale(x, y) {
    destCtx.scale(x, y);

    this.__originalScale(x, y);
  };

  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
    destCtx.transform(a, b, c, d, e, f);

    this.__originalTransform(a, b, c, d, e, f);
  };

  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
    destCtx.setTransform(a, b, c, d, e, f);

    this.__originalSetTransform(a, b, c, d, e, f);
  };

  ctx.resetTransform = function ctxResetTransform() {
    destCtx.resetTransform();

    this.__originalResetTransform();
  };

  ctx.rotate = function ctxRotate(angle) {
    destCtx.rotate(angle);

    this.__originalRotate(angle);
  };

  ctx.clip = function ctxRotate(rule) {
    destCtx.clip(rule);

    this.__originalClip(rule);
  };

  ctx.moveTo = function (x, y) {
    destCtx.moveTo(x, y);

    this.__originalMoveTo(x, y);
  };

  ctx.lineTo = function (x, y) {
    destCtx.lineTo(x, y);

    this.__originalLineTo(x, y);
  };

  ctx.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    destCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

    this.__originalBezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  };

  ctx.rect = function (x, y, width, height) {
    destCtx.rect(x, y, width, height);

    this.__originalRect(x, y, width, height);
  };

  ctx.closePath = function () {
    destCtx.closePath();

    this.__originalClosePath();
  };

  ctx.beginPath = function () {
    destCtx.beginPath();

    this.__originalBeginPath();
  };
}

function addContextCurrentTransform(ctx) {
  if (ctx._transformStack) {
    ctx._transformStack = [];
  }

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
    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx), "lineWidth");
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
      const [a, b, c, d, e, f] = this._transformMatrix;
      const ad_bc = a * d - b * c;
      const bc_ad = b * c - a * d;
      return [d / ad_bc, b / bc_ad, c / bc_ad, a / ad_bc, (d * e - c * f) / bc_ad, (b * e - a * f) / ad_bc];
    }
  });

  ctx.save = function ctxSave() {
    const old = this._transformMatrix;

    this._transformStack.push(old);

    this._transformMatrix = old.slice(0, 6);

    this._originalSave();
  };

  ctx.restore = function ctxRestore() {
    if (this._transformStack.length === 0) {
      (0, _util.warn)("Tried to restore a ctx when the stack was already empty.");
    }

    const prev = this._transformStack.pop();

    if (prev) {
      this._transformMatrix = prev;

      this._originalRestore();
    }
  };

  ctx.translate = function ctxTranslate(x, y) {
    const m = this._transformMatrix;
    m[4] = m[0] * x + m[2] * y + m[4];
    m[5] = m[1] * x + m[3] * y + m[5];

    this._originalTranslate(x, y);
  };

  ctx.scale = function ctxScale(x, y) {
    const m = this._transformMatrix;
    m[0] *= x;
    m[1] *= x;
    m[2] *= y;
    m[3] *= y;

    this._originalScale(x, y);
  };

  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
    const m = this._transformMatrix;
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
    const cosValue = Math.cos(angle);
    const sinValue = Math.sin(angle);
    const m = this._transformMatrix;
    this._transformMatrix = [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];

    this._originalRotate(angle);
  };
}

class CachedCanvases {
  constructor(canvasFactory) {
    this.canvasFactory = canvasFactory;
    this.cache = Object.create(null);
  }

  getCanvas(id, width, height, trackTransform) {
    let canvasEntry;

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

  clear() {
    for (const id in this.cache) {
      const canvasEntry = this.cache[id];
      this.canvasFactory.destroy(canvasEntry);
      delete this.cache[id];
    }
  }

}

function compileType3Glyph(imgData) {
  const POINT_TO_PROCESS_LIMIT = 1000;
  const POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
  const width = imgData.width,
        height = imgData.height,
        width1 = width + 1;
  let i, ii, j, j0;
  const points = new Uint8Array(width1 * (height + 1));
  const lineSize = width + 7 & ~7,
        data0 = imgData.data;
  const data = new Uint8Array(lineSize * height);
  let pos = 0;

  for (i = 0, ii = data0.length; i < ii; i++) {
    const elem = data0[i];
    let mask = 128;

    while (mask > 0) {
      data[pos++] = elem & mask ? 0 : 255;
      mask >>= 1;
    }
  }

  let count = 0;
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

    let sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);

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

  const steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
  const outlines = [];

  for (i = 0; count && i <= height; i++) {
    let p = i * width1;
    const end = p + width;

    while (p < end && !points[p]) {
      p++;
    }

    if (p === end) {
      continue;
    }

    const coords = [p % width1, i];
    const p0 = p;
    let type = points[p];

    do {
      const step = steps[type];

      do {
        p += step;
      } while (!points[p]);

      const pp = points[p];

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

  const drawOutline = function (c) {
    c.save();
    c.scale(1 / width, -1 / height);
    c.translate(0, -height);
    c.beginPath();

    for (let k = 0, kk = outlines.length; k < kk; k++) {
      const o = outlines[k];
      c.moveTo(o[0], o[1]);

      for (let l = 2, ll = o.length; l < ll; l += 2) {
        c.lineTo(o[l], o[l + 1]);
      }
    }

    c.fill();
    c.beginPath();
    c.restore();
  };

  return drawOutline;
}

class CanvasExtraState {
  constructor(width, height) {
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
    this.transferMaps = null;
    this.startNewPathAndClipBox([0, 0, width, height]);
  }

  clone() {
    const clone = Object.create(this);
    clone.clipBox = this.clipBox.slice();
    return clone;
  }

  setCurrentPoint(x, y) {
    this.x = x;
    this.y = y;
  }

  updatePathMinMax(transform, x, y) {
    [x, y] = _util.Util.applyTransform([x, y], transform);
    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);
  }

  updateCurvePathMinMax(transform, x0, y0, x1, y1, x2, y2, x3, y3) {
    const box = _util.Util.bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3);

    this.updatePathMinMax(transform, box[0], box[1]);
    this.updatePathMinMax(transform, box[2], box[3]);
  }

  getPathBoundingBox() {
    let pathType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pattern_helper.PathType.FILL;
    let transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const box = [this.minX, this.minY, this.maxX, this.maxY];

    if (pathType === _pattern_helper.PathType.STROKE) {
      if (!transform) {
        (0, _util.unreachable)("Stroke bounding box must include transform.");
      }

      const scale = _util.Util.singularValueDecompose2dScale(transform);

      const xStrokePad = scale[0] * this.lineWidth / 2;
      const yStrokePad = scale[1] * this.lineWidth / 2;
      box[0] -= xStrokePad;
      box[1] -= yStrokePad;
      box[2] += xStrokePad;
      box[3] += yStrokePad;
    }

    return box;
  }

  updateClipFromPath() {
    const intersect = _util.Util.intersect(this.clipBox, this.getPathBoundingBox());

    this.startNewPathAndClipBox(intersect || [0, 0, 0, 0]);
  }

  startNewPathAndClipBox(box) {
    this.clipBox = box;
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = 0;
    this.maxY = 0;
  }

  getClippedPathBoundingBox() {
    let pathType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pattern_helper.PathType.FILL;
    let transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return _util.Util.intersect(this.clipBox, this.getPathBoundingBox(pathType, transform));
  }

}

function putBinaryImageData(ctx, imgData) {
  let transferMaps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
    ctx.putImageData(imgData, 0, 0);
    return;
  }

  const height = imgData.height,
        width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  let srcPos = 0,
      destPos;
  const src = imgData.data;
  const dest = chunkImgData.data;
  let i, j, thisChunkHeight, elemsInThisChunk;
  let transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;

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
    const srcLength = src.byteLength;
    const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
    const dest32DataLength = dest32.length;
    const fullSrcDiff = width + 7 >> 3;
    let white = 0xffffffff;
    let black = _util.IsLittleEndianCached.value ? 0xff000000 : 0x000000ff;

    if (transferMapGray) {
      if (transferMapGray[0] === 0xff && transferMapGray[0xff] === 0) {
        [white, black] = [black, white];
      }
    }

    for (i = 0; i < totalChunks; i++) {
      thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      destPos = 0;

      for (j = 0; j < thisChunkHeight; j++) {
        const srcDiff = srcLength - srcPos;
        let k = 0;
        const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
        const kEndUnrolled = kEnd & ~7;
        let mask = 0;
        let srcByte = 0;

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
    const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
    j = 0;
    elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

    for (i = 0; i < fullChunks; i++) {
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
      srcPos += elemsInThisChunk;

      if (hasTransferMaps) {
        for (let k = 0; k < elemsInThisChunk; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
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
        for (let k = 0; k < elemsInThisChunk; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, j);
    }
  } else if (imgData.kind === _util.ImageKind.RGB_24BPP) {
    const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
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

      if (hasTransferMaps) {
        for (let k = 0; k < destPos; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
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
  const height = imgData.height,
        width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  let srcPos = 0;
  const src = imgData.data;
  const dest = chunkImgData.data;

  for (let i = 0; i < totalChunks; i++) {
    const thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
    let destPos = 3;

    for (let j = 0; j < thisChunkHeight; j++) {
      let elem,
          mask = 0;

      for (let k = 0; k < width; k++) {
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
  const properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];

  for (let i = 0, ii = properties.length; i < ii; i++) {
    const property = properties[i];

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
  const length = bytes.length;

  for (let i = 3; i < length; i += 4) {
    const alpha = bytes[i];

    if (alpha === 0) {
      bytes[i - 3] = r0;
      bytes[i - 2] = g0;
      bytes[i - 1] = b0;
    } else if (alpha < 255) {
      const alpha_ = 255 - alpha;
      bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
      bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
      bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
    }
  }
}

function composeSMaskAlpha(maskData, layerData, transferMap) {
  const length = maskData.length;
  const scale = 1 / 255;

  for (let i = 3; i < length; i += 4) {
    const alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
    layerData[i] = layerData[i] * alpha * scale | 0;
  }
}

function composeSMaskLuminosity(maskData, layerData, transferMap) {
  const length = maskData.length;

  for (let i = 3; i < length; i += 4) {
    const y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
    layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
  }
}

function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap, layerOffsetX, layerOffsetY, maskOffsetX, maskOffsetY) {
  const hasBackdrop = !!backdrop;
  const r0 = hasBackdrop ? backdrop[0] : 0;
  const g0 = hasBackdrop ? backdrop[1] : 0;
  const b0 = hasBackdrop ? backdrop[2] : 0;
  let composeFn;

  if (subtype === "Luminosity") {
    composeFn = composeSMaskLuminosity;
  } else {
    composeFn = composeSMaskAlpha;
  }

  const PIXELS_TO_PROCESS = 1048576;
  const chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));

  for (let row = 0; row < height; row += chunkSize) {
    const chunkHeight = Math.min(chunkSize, height - row);
    const maskData = maskCtx.getImageData(layerOffsetX - maskOffsetX, row + (layerOffsetY - maskOffsetY), width, chunkHeight);
    const layerData = layerCtx.getImageData(layerOffsetX, row + layerOffsetY, width, chunkHeight);

    if (hasBackdrop) {
      composeSMaskBackdrop(maskData.data, r0, g0, b0);
    }

    composeFn(maskData.data, layerData.data, transferMap);
    layerCtx.putImageData(layerData, layerOffsetX, row + layerOffsetY);
  }
}

function composeSMask(ctx, smask, layerCtx, layerBox) {
  const layerOffsetX = layerBox[0];
  const layerOffsetY = layerBox[1];
  const layerWidth = layerBox[2] - layerOffsetX;
  const layerHeight = layerBox[3] - layerOffsetY;

  if (layerWidth === 0 || layerHeight === 0) {
    return;
  }

  genericComposeSMask(smask.context, layerCtx, layerWidth, layerHeight, smask.subtype, smask.backdrop, smask.transferMap, layerOffsetX, layerOffsetY, smask.offsetX, smask.offsetY);
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(layerCtx.canvas, 0, 0);
  ctx.restore();
}

function getImageSmoothingEnabled(transform, interpolate) {
  const scale = _util.Util.singularValueDecompose2dScale(transform);

  scale[0] = Math.fround(scale[0]);
  scale[1] = Math.fround(scale[1]);
  const actualScale = Math.fround((globalThis.devicePixelRatio || 1) * _display_utils.PixelsPerInch.PDF_TO_CSS_UNITS);

  if (interpolate !== undefined) {
    return interpolate;
  } else if (scale[0] <= actualScale || scale[1] <= actualScale) {
    return true;
  }

  return false;
}

const LINE_CAP_STYLES = ["butt", "round", "square"];
const LINE_JOIN_STYLES = ["miter", "round", "bevel"];
const NORMAL_CLIP = {};
const EO_CLIP = {};

class CanvasGraphics {
  constructor(canvasCtx, commonObjs, objs, canvasFactory, imageLayer, optionalContentConfig, annotationCanvasMap) {
    this.ctx = canvasCtx;
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
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
    this.suspendedCtx = null;
    this.contentVisible = true;
    this.markedContentStack = [];
    this.optionalContentConfig = optionalContentConfig;
    this.cachedCanvases = new CachedCanvases(this.canvasFactory);
    this.cachedPatterns = new Map();
    this.annotationCanvasMap = annotationCanvasMap;
    this.viewportScale = 1;
    this.outputScaleX = 1;
    this.outputScaleY = 1;

    if (canvasCtx) {
      addContextCurrentTransform(canvasCtx);
    }

    this._cachedGetSinglePixelWidth = null;
  }

  beginDrawing(_ref) {
    let {
      transform,
      viewport,
      transparency = false,
      background = null,
      backgroundColorToReplace = null
    } = _ref;
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();

    if (typeof background === "function") {
      background({
        context: this.ctx,
        width,
        height
      });
    } else {
      this.ctx.fillStyle = background || "rgb(255, 255, 255)";
      this.ctx.fillRect(0, 0, width, height);
      this.background = background;
    }

    this.ctx.restore();
    this.backgroundColorToReplace = backgroundColorToReplace;

    if (transparency) {
      const transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height, true);
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
      this.outputScaleX = transform[0];
      this.outputScaleY = transform[0];
    }

    this.ctx.transform.apply(this.ctx, viewport.transform);
    this.viewportScale = viewport.scale;
    this.baseTransform = this.ctx.mozCurrentTransform.slice();
    this._combinedScaleFactor = Math.hypot(this.baseTransform[0], this.baseTransform[2]);

    if (this.imageLayer) {
      this.imageLayer.beginLayout();
    }
  }

  executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
    const argsArray = operatorList.argsArray;
    const fnArray = operatorList.fnArray;
    let i = executionStartIdx || 0;
    const argsArrayLen = argsArray.length;

    if (argsArrayLen === i) {
      return i;
    }

    const chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
    const endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
    let steps = 0;
    const commonObjs = this.commonObjs;
    const objs = this.objs;
    let fnId;

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
          const objsPool = depObjId.startsWith("g_") ? commonObjs : objs;

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
  }

  endDrawing() {
    while (this.stateStack.length || this.inSMaskMode) {
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

  _scaleImage(img, inverseTransform) {
    const width = img.width;
    const height = img.height;
    let widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]), 1);
    let heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]), 1);
    let paintWidth = width,
        paintHeight = height;
    let tmpCanvasId = "prescale1";
    let tmpCanvas, tmpCtx;

    while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
      let newWidth = paintWidth,
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
      img,
      paintWidth,
      paintHeight
    };
  }

  _createMaskCanvas(img) {
    const ctx = this.ctx;
    const width = img.width,
          height = img.height;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
    const maskCtx = maskCanvas.context;
    putBinaryImageMask(maskCtx, img);
    const objToCanvas = ctx.mozCurrentTransform;

    let maskToCanvas = _util.Util.transform(objToCanvas, [1 / width, 0, 0, -1 / height, 0, 0]);

    maskToCanvas = _util.Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]);

    const cord1 = _util.Util.applyTransform([0, 0], maskToCanvas);

    const cord2 = _util.Util.applyTransform([width, height], maskToCanvas);

    const rect = _util.Util.normalizeRect([cord1[0], cord1[1], cord2[0], cord2[1]]);

    const drawnWidth = Math.ceil(rect[2] - rect[0]);
    const drawnHeight = Math.ceil(rect[3] - rect[1]);
    const fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight, true);
    const fillCtx = fillCanvas.context;
    const offsetX = Math.min(cord1[0], cord2[0]);
    const offsetY = Math.min(cord1[1], cord2[1]);
    fillCtx.translate(-offsetX, -offsetY);
    fillCtx.transform.apply(fillCtx, maskToCanvas);

    const scaled = this._scaleImage(maskCanvas.canvas, fillCtx.mozCurrentTransformInverse);

    fillCtx.imageSmoothingEnabled = getImageSmoothingEnabled(fillCtx.mozCurrentTransform, img.interpolate);
    fillCtx.drawImage(scaled.img, 0, 0, scaled.img.width, scaled.img.height, 0, 0, width, height);
    fillCtx.globalCompositeOperation = "source-in";

    const inverse = _util.Util.transform(fillCtx.mozCurrentTransformInverse, [1, 0, 0, 1, -offsetX, -offsetY]);

    fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, _pattern_helper.PathType.FILL) : fillColor;
    fillCtx.fillRect(0, 0, width, height);
    return {
      canvas: fillCanvas.canvas,
      offsetX: Math.round(offsetX),
      offsetY: Math.round(offsetY)
    };
  }

  setLineWidth(width) {
    this.current.lineWidth = width;
    this.ctx.lineWidth = width;
  }

  setLineCap(style) {
    this.ctx.lineCap = LINE_CAP_STYLES[style];
  }

  setLineJoin(style) {
    this.ctx.lineJoin = LINE_JOIN_STYLES[style];
  }

  setMiterLimit(limit) {
    this.ctx.miterLimit = limit;
  }

  setDash(dashArray, dashPhase) {
    const ctx = this.ctx;

    if (ctx.setLineDash !== undefined) {
      ctx.setLineDash(dashArray);
      ctx.lineDashOffset = dashPhase;
    }
  }

  setRenderingIntent(intent) {}

  setFlatness(flatness) {}

  setGState(states) {
    for (let i = 0, ii = states.length; i < ii; i++) {
      const state = states[i];
      const key = state[0];
      const value = state[1];

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
          this.current.activeSMask = value ? this.tempSMask : null;
          this.tempSMask = null;
          this.checkSMaskState();
          break;

        case "TR":
          this.current.transferMaps = value;
      }
    }
  }

  get inSMaskMode() {
    return !!this.suspendedCtx;
  }

  checkSMaskState() {
    const inSMaskMode = this.inSMaskMode;

    if (this.current.activeSMask && !inSMaskMode) {
      this.beginSMaskMode();
    } else if (!this.current.activeSMask && inSMaskMode) {
      this.endSMaskMode();
    }
  }

  beginSMaskMode() {
    if (this.inSMaskMode) {
      throw new Error("beginSMaskMode called while already in smask mode");
    }

    const drawnWidth = this.ctx.canvas.width;
    const drawnHeight = this.ctx.canvas.height;
    const cacheId = "smaskGroupAt" + this.groupLevel;
    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
    this.suspendedCtx = this.ctx;
    this.ctx = scratchCanvas.context;
    const ctx = this.ctx;
    ctx.setTransform.apply(ctx, this.suspendedCtx.mozCurrentTransform);
    copyCtxState(this.suspendedCtx, ctx);
    mirrorContextOperations(ctx, this.suspendedCtx);
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
  }

  endSMaskMode() {
    if (!this.inSMaskMode) {
      throw new Error("endSMaskMode called while not in smask mode");
    }

    this.ctx._removeMirroring();

    copyCtxState(this.ctx, this.suspendedCtx);
    this.ctx = this.suspendedCtx;
    this.suspendedCtx = null;
  }

  compose(dirtyBox) {
    if (!this.current.activeSMask) {
      return;
    }

    if (!dirtyBox) {
      dirtyBox = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    } else {
      dirtyBox[0] = Math.floor(dirtyBox[0]);
      dirtyBox[1] = Math.floor(dirtyBox[1]);
      dirtyBox[2] = Math.ceil(dirtyBox[2]);
      dirtyBox[3] = Math.ceil(dirtyBox[3]);
    }

    const smask = this.current.activeSMask;
    const suspendedCtx = this.suspendedCtx;
    composeSMask(suspendedCtx, smask, this.ctx, dirtyBox);
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  }

  save() {
    if (this.inSMaskMode) {
      copyCtxState(this.ctx, this.suspendedCtx);
      this.suspendedCtx.save();
    } else {
      this.ctx.save();
    }

    const old = this.current;
    this.stateStack.push(old);
    this.current = old.clone();
  }

  restore() {
    if (this.stateStack.length === 0 && this.inSMaskMode) {
      this.endSMaskMode();
    }

    if (this.stateStack.length !== 0) {
      this.current = this.stateStack.pop();

      if (this.inSMaskMode) {
        this.suspendedCtx.restore();
        copyCtxState(this.suspendedCtx, this.ctx);
      } else {
        this.ctx.restore();
      }

      this.checkSMaskState();
      this.pendingClip = null;
      this._cachedGetSinglePixelWidth = null;
    }
  }

  transform(a, b, c, d, e, f) {
    this.ctx.transform(a, b, c, d, e, f);
    this._cachedGetSinglePixelWidth = null;
  }

  constructPath(ops, args) {
    const ctx = this.ctx;
    const current = this.current;
    let x = current.x,
        y = current.y;
    let startX, startY;

    for (let i = 0, j = 0, ii = ops.length; i < ii; i++) {
      switch (ops[i] | 0) {
        case _util.OPS.rectangle:
          x = args[j++];
          y = args[j++];
          const width = args[j++];
          const height = args[j++];
          const xw = x + width;
          const yh = y + height;
          ctx.moveTo(x, y);

          if (width === 0 || height === 0) {
            ctx.lineTo(xw, yh);
          } else {
            ctx.lineTo(xw, y);
            ctx.lineTo(xw, yh);
            ctx.lineTo(x, yh);
          }

          current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
          current.updatePathMinMax(ctx.mozCurrentTransform, xw, yh);
          ctx.closePath();
          break;

        case _util.OPS.moveTo:
          x = args[j++];
          y = args[j++];
          ctx.moveTo(x, y);
          current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
          break;

        case _util.OPS.lineTo:
          x = args[j++];
          y = args[j++];
          ctx.lineTo(x, y);
          current.updatePathMinMax(ctx.mozCurrentTransform, x, y);
          break;

        case _util.OPS.curveTo:
          startX = x;
          startY = y;
          x = args[j + 4];
          y = args[j + 5];
          ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
          current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
          j += 6;
          break;

        case _util.OPS.curveTo2:
          startX = x;
          startY = y;
          ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
          current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
          x = args[j + 2];
          y = args[j + 3];
          j += 4;
          break;

        case _util.OPS.curveTo3:
          startX = x;
          startY = y;
          x = args[j + 2];
          y = args[j + 3];
          ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
          current.updateCurvePathMinMax(ctx.mozCurrentTransform, startX, startY, args[j], args[j + 1], x, y, x, y);
          j += 4;
          break;

        case _util.OPS.closePath:
          ctx.closePath();
          break;
      }
    }

    current.setCurrentPoint(x, y);
  }

  closePath() {
    this.ctx.closePath();
  }

  stroke(consumePath) {
    consumePath = typeof consumePath !== "undefined" ? consumePath : true;
    const ctx = this.ctx;
    const strokeColor = this.current.strokeColor;
    ctx.globalAlpha = this.current.strokeAlpha;

    if (this.contentVisible) {
      if (typeof strokeColor === "object" && strokeColor !== null && strokeColor !== void 0 && strokeColor.getPattern) {
        const lineWidth = this.getSinglePixelWidth();
        ctx.save();
        ctx.strokeStyle = strokeColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.STROKE);
        ctx.lineWidth = Math.max(lineWidth, this.current.lineWidth);
        ctx.stroke();
        ctx.restore();
      } else {
        const lineWidth = this.getSinglePixelWidth();

        if (lineWidth < 0 && -lineWidth >= this.current.lineWidth) {
          ctx.save();
          ctx.resetTransform();
          ctx.lineWidth = Math.floor(this._combinedScaleFactor);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.lineWidth = Math.max(lineWidth, this.current.lineWidth);
          ctx.stroke();
        }
      }
    }

    if (consumePath) {
      this.consumePath(this.current.getClippedPathBoundingBox());
    }

    ctx.globalAlpha = this.current.fillAlpha;
  }

  closeStroke() {
    this.closePath();
    this.stroke();
  }

  fill(consumePath) {
    consumePath = typeof consumePath !== "undefined" ? consumePath : true;
    const ctx = this.ctx;
    let draw = true;
    let fillColor = this.current.fillColor;

    if (this.backgroundColorToReplace) {
      if (fillColor === this.backgroundColorToReplace) {
        if (this.background && typeof this.background !== 'function') {
          fillColor = this.background;
        } else {
          draw = false;
        }
      }
    }

    const isPatternFill = this.current.patternFill;
    let needRestore = false;

    if (isPatternFill) {
      ctx.save();
      ctx.fillStyle = fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL);
      needRestore = true;
    }

    const intersect = this.current.getClippedPathBoundingBox();

    if (draw) {
      if (this.contentVisible && intersect !== null) {
        if (this.pendingEOFill) {
          ctx.fill("evenodd");
          this.pendingEOFill = false;
        } else {
          ctx.fill();
        }
      }
    }

    if (needRestore) {
      ctx.restore();
    }

    if (consumePath) {
      this.consumePath(intersect);
    }
  }

  eoFill() {
    this.pendingEOFill = true;
    this.fill();
  }

  fillStroke() {
    this.fill(false);
    this.stroke(false);
    this.consumePath();
  }

  eoFillStroke() {
    this.pendingEOFill = true;
    this.fillStroke();
  }

  closeFillStroke() {
    this.closePath();
    this.fillStroke();
  }

  closeEOFillStroke() {
    this.pendingEOFill = true;
    this.closePath();
    this.fillStroke();
  }

  endPath() {
    this.consumePath();
  }

  clip() {
    this.pendingClip = NORMAL_CLIP;
  }

  eoClip() {
    this.pendingClip = EO_CLIP;
  }

  beginText() {
    this.current.textMatrix = _util.IDENTITY_MATRIX;
    this.current.textMatrixScale = 1;
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  }

  endText() {
    const paths = this.pendingTextPaths;
    const ctx = this.ctx;

    if (paths === undefined) {
      ctx.beginPath();
      return;
    }

    ctx.save();
    ctx.beginPath();

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      ctx.setTransform.apply(ctx, path.transform);
      ctx.translate(path.x, path.y);
      path.addToPath(ctx, path.fontSize);
    }

    ctx.restore();
    ctx.clip();
    ctx.beginPath();
    delete this.pendingTextPaths;
  }

  setCharSpacing(spacing) {
    this.current.charSpacing = spacing;
  }

  setWordSpacing(spacing) {
    this.current.wordSpacing = spacing;
  }

  setHScale(scale) {
    this.current.textHScale = scale / 100;
  }

  setLeading(leading) {
    this.current.leading = -leading;
  }

  setFont(fontRefName, size) {
    const fontObj = this.commonObjs.get(fontRefName);
    const current = this.current;

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

    const name = fontObj.loadedName || "sans-serif";
    let bold = "normal";

    if (fontObj.black) {
      bold = "900";
    } else if (fontObj.bold) {
      bold = "bold";
    }

    const italic = fontObj.italic ? "italic" : "normal";
    const typeface = "\"".concat(name, "\", ").concat(fontObj.fallbackName);
    let browserFontSize = size;

    if (size < MIN_FONT_SIZE) {
      browserFontSize = MIN_FONT_SIZE;
    } else if (size > MAX_FONT_SIZE) {
      browserFontSize = MAX_FONT_SIZE;
    }

    this.current.fontSizeScale = size / browserFontSize;
    this.ctx.font = "".concat(italic, " ").concat(bold, " ").concat(browserFontSize, "px ").concat(typeface);
  }

  setTextRenderingMode(mode) {
    this.current.textRenderingMode = mode;
  }

  setTextRise(rise) {
    this.current.textRise = rise;
  }

  moveText(x, y) {
    this.current.x = this.current.lineX += x;
    this.current.y = this.current.lineY += y;
  }

  setLeadingMoveText(x, y) {
    this.setLeading(-y);
    this.moveText(x, y);
  }

  setTextMatrix(a, b, c, d, e, f) {
    this.current.textMatrix = [a, b, c, d, e, f];
    this.current.textMatrixScale = Math.hypot(a, b);
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  }

  nextLine() {
    this.moveText(0, this.current.leading);
  }

  paintChar(character, x, y, patternTransform, resetLineWidthToOne) {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const textRenderingMode = current.textRenderingMode;
    const fontSize = current.fontSize / current.fontSizeScale;
    const fillStrokeMode = textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;
    const isAddToPathSet = !!(textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);
    const patternFill = current.patternFill && !font.missingFile;
    let addToPath;

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
          ctx.lineWidth = Math.floor(this._combinedScaleFactor);
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
          ctx.lineWidth = Math.floor(this._combinedScaleFactor);
          ctx.strokeText(character, 0, 0);
          ctx.restore();
        } else {
          ctx.strokeText(character, x, y);
        }
      }
    }

    if (isAddToPathSet) {
      const paths = this.pendingTextPaths || (this.pendingTextPaths = []);
      paths.push({
        transform: ctx.mozCurrentTransform,
        x,
        y,
        fontSize,
        addToPath
      });
    }
  }

  get isFontSubpixelAAEnabled() {
    const {
      context: ctx
    } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
    ctx.scale(1.5, 1);
    ctx.fillText("I", 0, 10);
    const data = ctx.getImageData(0, 0, 10, 10).data;
    let enabled = false;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0 && data[i] < 255) {
        enabled = true;
        break;
      }
    }

    return (0, _util.shadow)(this, "isFontSubpixelAAEnabled", enabled);
  }

  showText(glyphs) {
    const current = this.current;
    const font = current.font;

    if (font.isType3Font) {
      return this.showType3Text(glyphs);
    }

    const fontSize = current.fontSize;

    if (fontSize === 0) {
      return undefined;
    }

    const ctx = this.ctx;
    const fontSizeScale = current.fontSizeScale;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const fontDirection = current.fontDirection;
    const textHScale = current.textHScale * fontDirection;
    const glyphsLength = glyphs.length;
    const vertical = font.vertical;
    const spacingDir = vertical ? 1 : -1;
    const defaultVMetrics = font.defaultVMetrics;
    const widthAdvanceScale = fontSize * current.fontMatrix[0];
    const simpleFillText = current.textRenderingMode === _util.TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
    ctx.save();
    ctx.transform.apply(ctx, current.textMatrix);
    ctx.translate(current.x, current.y + current.textRise);

    if (fontDirection > 0) {
      ctx.scale(textHScale, -1);
    } else {
      ctx.scale(textHScale, 1);
    }

    let patternTransform;

    if (current.patternFill) {
      ctx.save();
      const pattern = current.fillColor.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL);
      patternTransform = ctx.mozCurrentTransform;
      ctx.restore();
      ctx.fillStyle = pattern;
    }

    let lineWidth = current.lineWidth;
    let resetLineWidthToOne = false;
    const scale = current.textMatrixScale;

    if (scale === 0 || lineWidth === 0) {
      const fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

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
    let x = 0,
        i;

    for (i = 0; i < glyphsLength; ++i) {
      const glyph = glyphs[i];

      if (typeof glyph === "number") {
        x += spacingDir * glyph * fontSize / 1000;
        continue;
      }

      let restoreNeeded = false;
      const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
      const character = glyph.fontChar;
      const accent = glyph.accent;
      let scaledX, scaledY;
      let width = glyph.width;

      if (vertical) {
        const vmetric = glyph.vmetric || defaultVMetrics;
        const vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
        const vy = vmetric[2] * widthAdvanceScale;
        width = vmetric ? -vmetric[0] : width;
        scaledX = vx / fontSizeScale;
        scaledY = (x + vy) / fontSizeScale;
      } else {
        scaledX = x / fontSizeScale;
        scaledY = 0;
      }

      if (font.remeasure && width > 0) {
        const measuredWidth = ctx.measureText(character).width * 1000 / fontSize * fontSizeScale;

        if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
          const characterScaleX = width / measuredWidth;
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
            const scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
            const scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
            this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform, resetLineWidthToOne);
          }
        }
      }

      let charWidth;

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
    this.compose();
    return undefined;
  }

  showType3Text(glyphs) {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const fontSize = current.fontSize;
    const fontDirection = current.fontDirection;
    const spacingDir = font.vertical ? 1 : -1;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const textHScale = current.textHScale * fontDirection;
    const fontMatrix = current.fontMatrix || _util.FONT_IDENTITY_MATRIX;
    const glyphsLength = glyphs.length;
    const isTextInvisible = current.textRenderingMode === _util.TextRenderingMode.INVISIBLE;
    let i, glyph, width, spacingLength;

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

      if (typeof glyph === "number") {
        spacingLength = spacingDir * glyph * fontSize / 1000;
        this.ctx.translate(spacingLength, 0);
        current.x += spacingLength * textHScale;
        continue;
      }

      const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
      const operatorList = font.charProcOperatorList[glyph.operatorListId];

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

      const transformed = _util.Util.applyTransform([glyph.width, 0], fontMatrix);

      width = transformed[0] * fontSize + spacing;
      ctx.translate(width, 0);
      current.x += width * textHScale;
    }

    ctx.restore();
    this.processingType3 = null;
  }

  setCharWidth(xWidth, yWidth) {}

  setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
    this.ctx.rect(llx, lly, urx - llx, ury - lly);
    this.clip();
    this.endPath();
  }

  getColorN_Pattern(IR) {
    let pattern;

    if (IR[0] === "TilingPattern") {
      const color = IR[1];
      const baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
      const canvasGraphicsFactory = {
        createCanvasGraphics: ctx => {
          return new CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory);
        }
      };
      pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
    } else {
      pattern = this._getPattern(IR[1], IR[2]);
    }

    return pattern;
  }

  setStrokeColorN() {
    this.current.strokeColor = this.getColorN_Pattern(arguments);
  }

  setFillColorN() {
    this.current.fillColor = this.getColorN_Pattern(arguments);
    this.current.patternFill = true;
  }

  setStrokeRGBColor(r, g, b) {
    const color = _util.Util.makeHexColor(r, g, b);

    this.ctx.strokeStyle = color;
    this.current.strokeColor = color;
  }

  setFillRGBColor(r, g, b) {
    let color = _util.Util.makeHexColor(r, g, b);

    if (this.backgroundColorToReplace) {
      if (color === this.backgroundColorToReplace) {
        if (this.background && typeof this.background !== 'function') {
          color = this.background;
        } else {}
      }
    }

    this.ctx.fillStyle = color;
    this.current.fillColor = color;
    this.current.patternFill = false;
  }

  _getPattern(objId) {
    let matrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let pattern;

    if (this.cachedPatterns.has(objId)) {
      pattern = this.cachedPatterns.get(objId);
    } else {
      pattern = (0, _pattern_helper.getShadingPattern)(this.objs.get(objId));
      this.cachedPatterns.set(objId, pattern);
    }

    if (matrix) {
      pattern.matrix = matrix;
    }

    return pattern;
  }

  shadingFill(objId) {
    if (!this.contentVisible) {
      return;
    }

    const ctx = this.ctx;
    this.save();

    const pattern = this._getPattern(objId);

    ctx.fillStyle = pattern.getPattern(ctx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.SHADING);
    const inv = ctx.mozCurrentTransformInverse;

    if (inv) {
      const canvas = ctx.canvas;
      const width = canvas.width;
      const height = canvas.height;

      const bl = _util.Util.applyTransform([0, 0], inv);

      const br = _util.Util.applyTransform([0, height], inv);

      const ul = _util.Util.applyTransform([width, 0], inv);

      const ur = _util.Util.applyTransform([width, height], inv);

      const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
      const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
      const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
      const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
      this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    } else {
      this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    }

    this.compose(this.current.getClippedPathBoundingBox());
    this.restore();
  }

  beginInlineImage() {
    (0, _util.unreachable)("Should not call beginInlineImage");
  }

  beginImageData() {
    (0, _util.unreachable)("Should not call beginImageData");
  }

  paintFormXObjectBegin(matrix, bbox) {
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
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];
      this.ctx.rect(bbox[0], bbox[1], width, height);
      this.current.updatePathMinMax(this.ctx.mozCurrentTransform, bbox[0], bbox[1]);
      this.current.updatePathMinMax(this.ctx.mozCurrentTransform, bbox[2], bbox[3]);
      this.clip();
      this.endPath();
    }
  }

  paintFormXObjectEnd() {
    if (!this.contentVisible) {
      return;
    }

    this.restore();
    this.baseTransform = this.baseTransformStack.pop();
  }

  beginGroup(group) {
    if (!this.contentVisible) {
      return;
    }

    this.save();

    if (this.inSMaskMode) {
      this.endSMaskMode();
      this.current.activeSMask = null;
    }

    const currentCtx = this.ctx;

    if (!group.isolated) {
      (0, _util.info)("TODO: Support non-isolated groups.");
    }

    if (group.knockout) {
      (0, _util.warn)("Knockout groups not supported.");
    }

    const currentTransform = currentCtx.mozCurrentTransform;

    if (group.matrix) {
      currentCtx.transform.apply(currentCtx, group.matrix);
    }

    if (!group.bbox) {
      throw new Error("Bounding box is required.");
    }

    let bounds = _util.Util.getAxialAlignedBoundingBox(group.bbox, currentCtx.mozCurrentTransform);

    const canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
    bounds = _util.Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
    const offsetX = Math.floor(bounds[0]);
    const offsetY = Math.floor(bounds[1]);
    let drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
    let drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
    let scaleX = 1,
        scaleY = 1;

    if (drawnWidth > MAX_GROUP_SIZE) {
      scaleX = drawnWidth / MAX_GROUP_SIZE;
      drawnWidth = MAX_GROUP_SIZE;
    }

    if (drawnHeight > MAX_GROUP_SIZE) {
      scaleY = drawnHeight / MAX_GROUP_SIZE;
      drawnHeight = MAX_GROUP_SIZE;
    }

    this.current.startNewPathAndClipBox([0, 0, drawnWidth, drawnHeight]);
    let cacheId = "groupAt" + this.groupLevel;

    if (group.smask) {
      cacheId += "_smask_" + this.smaskCounter++ % 2;
    }

    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
    const groupCtx = scratchCanvas.context;
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
      currentCtx.save();
    }

    copyCtxState(currentCtx, groupCtx);
    this.ctx = groupCtx;
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
    this.groupStack.push(currentCtx);
    this.groupLevel++;
  }

  endGroup(group) {
    if (!this.contentVisible) {
      return;
    }

    this.groupLevel--;
    const groupCtx = this.ctx;
    const ctx = this.groupStack.pop();
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;

    if (group.smask) {
      this.tempSMask = this.smaskStack.pop();
      this.restore();
    } else {
      this.ctx.restore();
      const currentMtx = this.ctx.mozCurrentTransform;
      this.restore();
      this.ctx.save();
      this.ctx.setTransform.apply(this.ctx, currentMtx);

      const dirtyBox = _util.Util.getAxialAlignedBoundingBox([0, 0, groupCtx.canvas.width, groupCtx.canvas.height], currentMtx);

      this.ctx.drawImage(groupCtx.canvas, 0, 0);
      this.ctx.restore();
      this.compose(dirtyBox);
    }
  }

  beginAnnotations() {
    this.save();

    if (this.baseTransform) {
      this.ctx.setTransform.apply(this.ctx, this.baseTransform);
    }
  }

  endAnnotations() {
    this.restore();
  }

  beginAnnotation(id, rect, transform, matrix, hasOwnCanvas) {
    this.save();

    if (Array.isArray(rect) && rect.length === 4) {
      const width = rect[2] - rect[0];
      const height = rect[3] - rect[1];

      if (hasOwnCanvas && this.annotationCanvasMap) {
        transform = transform.slice();
        transform[4] -= rect[0];
        transform[5] -= rect[1];
        rect = rect.slice();
        rect[0] = rect[1] = 0;
        rect[2] = width;
        rect[3] = height;

        const [scaleX, scaleY] = _util.Util.singularValueDecompose2dScale(this.ctx.mozCurrentTransform);

        const {
          viewportScale
        } = this;
        const canvasWidth = Math.ceil(width * this.outputScaleX * viewportScale);
        const canvasHeight = Math.ceil(height * this.outputScaleY * viewportScale);
        this.annotationCanvas = this.canvasFactory.create(canvasWidth, canvasHeight);
        const {
          canvas,
          context
        } = this.annotationCanvas;
        canvas.style.width = "calc(".concat(width, "px * var(--viewport-scale-factor))");
        canvas.style.height = "calc(".concat(height, "px * var(--viewport-scale-factor))");
        this.annotationCanvasMap.set(id, canvas);
        this.annotationCanvas.savedCtx = this.ctx;
        this.ctx = context;
        this.ctx.setTransform(scaleX, 0, 0, -scaleY, 0, height * scaleY);
        addContextCurrentTransform(this.ctx);
        resetCtxToDefault(this.ctx);
      } else {
        resetCtxToDefault(this.ctx);
        this.ctx.rect(rect[0], rect[1], width, height);
        this.clip();
        this.endPath();
      }
    }

    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
    this.transform.apply(this, transform);
    this.transform.apply(this, matrix);
  }

  endAnnotation() {
    if (this.annotationCanvas) {
      this.ctx = this.annotationCanvas.savedCtx;
      delete this.annotationCanvas.savedCtx;
      delete this.annotationCanvas;
    }

    this.restore();
  }

  paintImageMaskXObject(img) {
    if (!this.contentVisible) {
      return;
    }

    const ctx = this.ctx;
    const width = img.width,
          height = img.height;
    const glyph = this.processingType3;

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

    if (glyph !== null && glyph !== void 0 && glyph.compiled) {
      glyph.compiled(ctx);
      return;
    }

    const mask = this._createMaskCanvas(img);

    const maskCanvas = mask.canvas;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY);
    ctx.restore();
    this.compose();
  }

  paintImageMaskXObjectRepeat(imgData, scaleX) {
    let skewX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let skewY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let scaleY = arguments.length > 4 ? arguments[4] : undefined;
    let positions = arguments.length > 5 ? arguments[5] : undefined;

    if (!this.contentVisible) {
      return;
    }

    const ctx = this.ctx;
    ctx.save();
    const currentTransform = ctx.mozCurrentTransform;
    ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0);

    const mask = this._createMaskCanvas(imgData);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    for (let i = 0, ii = positions.length; i < ii; i += 2) {
      const trans = _util.Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]]);

      const [x, y] = _util.Util.applyTransform([0, 0], trans);

      ctx.drawImage(mask.canvas, x, y);
    }

    ctx.restore();
    this.compose();
  }

  paintImageMaskXObjectGroup(images) {
    if (!this.contentVisible) {
      return;
    }

    const ctx = this.ctx;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;

    for (let i = 0, ii = images.length; i < ii; i++) {
      const image = images[i];
      const width = image.width,
            height = image.height;
      const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
      const maskCtx = maskCanvas.context;
      maskCtx.save();
      putBinaryImageMask(maskCtx, image);
      maskCtx.globalCompositeOperation = "source-in";
      maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, ctx.mozCurrentTransformInverse, _pattern_helper.PathType.FILL) : fillColor;
      maskCtx.fillRect(0, 0, width, height);
      maskCtx.restore();
      ctx.save();
      ctx.transform.apply(ctx, image.transform);
      ctx.scale(1, -1);
      ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
      ctx.restore();
    }

    this.compose();
  }

  paintImageXObject(objId) {
    if (!this.contentVisible) {
      return;
    }

    const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

    if (!imgData) {
      (0, _util.warn)("Dependent image isn't ready yet");
      return;
    }

    this.paintInlineImageXObject(imgData);
  }

  paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
    if (!this.contentVisible) {
      return;
    }

    const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

    if (!imgData) {
      (0, _util.warn)("Dependent image isn't ready yet");
      return;
    }

    const width = imgData.width;
    const height = imgData.height;
    const map = [];

    for (let i = 0, ii = positions.length; i < ii; i += 2) {
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

  paintInlineImageXObject(imgData) {
    if (!this.contentVisible) {
      return;
    }

    const width = imgData.width;
    const height = imgData.height;
    const ctx = this.ctx;
    this.save();
    ctx.scale(1 / width, -1 / height);
    let imgToPaint;

    if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
      imgToPaint = imgData;
    } else {
      const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
      const tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
      imgToPaint = tmpCanvas.canvas;
    }

    const scaled = this._scaleImage(imgToPaint, ctx.mozCurrentTransformInverse);

    ctx.imageSmoothingEnabled = getImageSmoothingEnabled(ctx.mozCurrentTransform, imgData.interpolate);
    ctx.drawImage(scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height);

    if (this.imageLayer) {
      const position = this.getCanvasPosition(0, -height);
      this.imageLayer.appendImage({
        imgData,
        left: position[0],
        top: position[1],
        width: width / ctx.mozCurrentTransformInverse[0],
        height: height / ctx.mozCurrentTransformInverse[3]
      });
    }

    this.compose();
    this.restore();
  }

  paintInlineImageXObjectGroup(imgData, map) {
    if (!this.contentVisible) {
      return;
    }

    const ctx = this.ctx;
    const w = imgData.width;
    const h = imgData.height;
    const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h);
    const tmpCtx = tmpCanvas.context;
    putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);

    for (let i = 0, ii = map.length; i < ii; i++) {
      const entry = map[i];
      ctx.save();
      ctx.transform.apply(ctx, entry.transform);
      ctx.scale(1, -1);
      ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);

      if (this.imageLayer) {
        const position = this.getCanvasPosition(entry.x, entry.y);
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

    this.compose();
  }

  paintSolidColorImageMask() {
    if (!this.contentVisible) {
      return;
    }

    this.ctx.fillRect(0, 0, 1, 1);
    this.compose();
  }

  markPoint(tag) {}

  markPointProps(tag, properties) {}

  beginMarkedContent(tag) {
    this.markedContentStack.push({
      visible: true
    });
  }

  beginMarkedContentProps(tag, properties) {
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

  endMarkedContent() {
    this.markedContentStack.pop();
    this.contentVisible = this.isContentVisible();
  }

  beginCompat() {}

  endCompat() {}

  consumePath(clipBox) {
    if (this.pendingClip) {
      this.current.updateClipFromPath();
    }

    if (!this.pendingClip) {
      this.compose(clipBox);
    }

    const ctx = this.ctx;

    if (this.pendingClip) {
      if (this.pendingClip === EO_CLIP) {
        ctx.clip("evenodd");
      } else {
        ctx.clip();
      }

      this.pendingClip = null;
    }

    this.current.startNewPathAndClipBox(this.current.clipBox);
    ctx.beginPath();
  }

  getSinglePixelWidth() {
    if (this._cachedGetSinglePixelWidth === null) {
      const m = this.ctx.mozCurrentTransform;
      const absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
      const sqNorm1 = m[0] ** 2 + m[2] ** 2;
      const sqNorm2 = m[1] ** 2 + m[3] ** 2;
      const pixelHeight = Math.sqrt(Math.max(sqNorm1, sqNorm2)) / absDet;

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

  getCanvasPosition(x, y) {
    const transform = this.ctx.mozCurrentTransform;
    return [transform[0] * x + transform[2] * y + transform[4], transform[1] * x + transform[3] * y + transform[5]];
  }

  isContentVisible() {
    for (let i = this.markedContentStack.length - 1; i >= 0; i--) {
      if (!this.markedContentStack[i].visible) {
        return false;
      }
    }

    return true;
  }

}

exports.CanvasGraphics = CanvasGraphics;

for (const op in _util.OPS) {
  if (CanvasGraphics.prototype[op] !== undefined) {
    CanvasGraphics.prototype[_util.OPS[op]] = CanvasGraphics.prototype[op];
  }
}

/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var createTypedArrayConstructor = __w_pdfjs_require__(113);
createTypedArrayConstructor('Int32', function (init) {
 return function Int32Array(data, byteOffset, length) {
  return init(this, data, byteOffset, length);
 };
});

/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

var $ = __w_pdfjs_require__(65);
var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;
$({
 target: 'Math',
 stat: true,
 forced: BUGGY
}, {
 hypot: function hypot(value1, value2) {
  var sum = 0;
  var i = 0;
  var aLen = arguments.length;
  var larg = 0;
  var arg, div;
  while (i < aLen) {
   arg = abs(arguments[i++]);
   if (larg < arg) {
    div = larg / arg;
    sum = sum * div * div + 1;
    larg = arg;
   } else if (arg > 0) {
    div = arg / larg;
    sum += div * div;
   } else
    sum += arg;
  }
  return larg === Infinity ? Infinity : larg * sqrt(sum);
 }
});

/***/ }),
/* 202 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TilingPattern = exports.PathType = void 0;
exports.getShadingPattern = getShadingPattern;

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

const PathType = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
};
exports.PathType = PathType;

function applyBoundingBox(ctx, bbox) {
  if (!bbox || typeof Path2D === "undefined") {
    return;
  }

  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  const region = new Path2D();
  region.rect(bbox[0], bbox[1], width, height);
  ctx.clip(region);
}

class BaseShadingPattern {
  constructor() {
    if (this.constructor === BaseShadingPattern) {
      (0, _util.unreachable)("Cannot initialize BaseShadingPattern.");
    }
  }

  getPattern() {
    (0, _util.unreachable)("Abstract method `getPattern` called.");
  }

}

class RadialAxialShadingPattern extends BaseShadingPattern {
  constructor(IR) {
    super();
    this._type = IR[1];
    this._bbox = IR[2];
    this._colorStops = IR[3];
    this._p0 = IR[4];
    this._p1 = IR[5];
    this._r0 = IR[6];
    this._r1 = IR[7];
    this.matrix = null;
  }

  _createGradient(ctx) {
    let grad;

    if (this._type === "axial") {
      grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]);
    } else if (this._type === "radial") {
      grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1);
    }

    for (const colorStop of this._colorStops) {
      grad.addColorStop(colorStop[0], colorStop[1]);
    }

    return grad;
  }

  getPattern(ctx, owner, inverse, pathType) {
    let pattern;

    if (pathType === PathType.STROKE || pathType === PathType.FILL) {
      const ownerBBox = owner.current.getClippedPathBoundingBox(pathType, ctx.mozCurrentTransform) || [0, 0, 0, 0];
      const width = Math.ceil(ownerBBox[2] - ownerBBox[0]) || 1;
      const height = Math.ceil(ownerBBox[3] - ownerBBox[1]) || 1;
      const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", width, height, true);
      const tmpCtx = tmpCanvas.context;
      tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
      tmpCtx.beginPath();
      tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
      tmpCtx.translate(-ownerBBox[0], -ownerBBox[1]);
      inverse = _util.Util.transform(inverse, [1, 0, 0, 1, ownerBBox[0], ownerBBox[1]]);
      tmpCtx.transform.apply(tmpCtx, owner.baseTransform);

      if (this.matrix) {
        tmpCtx.transform.apply(tmpCtx, this.matrix);
      }

      applyBoundingBox(tmpCtx, this._bbox);
      tmpCtx.fillStyle = this._createGradient(tmpCtx);
      tmpCtx.fill();
      pattern = ctx.createPattern(tmpCanvas.canvas, "no-repeat");
      const domMatrix = new DOMMatrix(inverse);

      try {
        pattern.setTransform(domMatrix);
      } catch (ex) {
        (0, _util.warn)("RadialAxialShadingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
      }
    } else {
      applyBoundingBox(ctx, this._bbox);
      pattern = this._createGradient(ctx);
    }

    return pattern;
  }

}

function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
  const coords = context.coords,
        colors = context.colors;
  const bytes = data.data,
        rowSize = data.width * 4;
  let tmp;

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

  const x1 = (coords[p1] + context.offsetX) * context.scaleX;
  const y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
  const x2 = (coords[p2] + context.offsetX) * context.scaleX;
  const y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
  const x3 = (coords[p3] + context.offsetX) * context.scaleX;
  const y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;

  if (y1 >= y3) {
    return;
  }

  const c1r = colors[c1],
        c1g = colors[c1 + 1],
        c1b = colors[c1 + 2];
  const c2r = colors[c2],
        c2g = colors[c2 + 1],
        c2b = colors[c2 + 2];
  const c3r = colors[c3],
        c3g = colors[c3 + 1],
        c3b = colors[c3 + 2];
  const minY = Math.round(y1),
        maxY = Math.round(y3);
  let xa, car, cag, cab;
  let xb, cbr, cbg, cbb;

  for (let y = minY; y <= maxY; y++) {
    if (y < y2) {
      let k;

      if (y < y1) {
        k = 0;
      } else {
        k = (y1 - y) / (y1 - y2);
      }

      xa = x1 - (x1 - x2) * k;
      car = c1r - (c1r - c2r) * k;
      cag = c1g - (c1g - c2g) * k;
      cab = c1b - (c1b - c2b) * k;
    } else {
      let k;

      if (y > y3) {
        k = 1;
      } else if (y2 === y3) {
        k = 0;
      } else {
        k = (y2 - y) / (y2 - y3);
      }

      xa = x2 - (x2 - x3) * k;
      car = c2r - (c2r - c3r) * k;
      cag = c2g - (c2g - c3g) * k;
      cab = c2b - (c2b - c3b) * k;
    }

    let k;

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
    const x1_ = Math.round(Math.min(xa, xb));
    const x2_ = Math.round(Math.max(xa, xb));
    let j = rowSize * y + x1_ * 4;

    for (let x = x1_; x <= x2_; x++) {
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
  const ps = figure.coords;
  const cs = figure.colors;
  let i, ii;

  switch (figure.type) {
    case "lattice":
      const verticesPerRow = figure.verticesPerRow;
      const rows = Math.floor(ps.length / verticesPerRow) - 1;
      const cols = verticesPerRow - 1;

      for (i = 0; i < rows; i++) {
        let q = i * verticesPerRow;

        for (let j = 0; j < cols; j++, q++) {
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

class MeshShadingPattern extends BaseShadingPattern {
  constructor(IR) {
    super();
    this._coords = IR[2];
    this._colors = IR[3];
    this._figures = IR[4];
    this._bounds = IR[5];
    this._bbox = IR[7];
    this._background = IR[8];
    this.matrix = null;
  }

  _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases) {
    const EXPECTED_SCALE = 1.1;
    const MAX_PATTERN_SIZE = 3000;
    const BORDER_SIZE = 2;
    const offsetX = Math.floor(this._bounds[0]);
    const offsetY = Math.floor(this._bounds[1]);
    const boundsWidth = Math.ceil(this._bounds[2]) - offsetX;
    const boundsHeight = Math.ceil(this._bounds[3]) - offsetY;
    const width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    const height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
    const scaleX = boundsWidth / width;
    const scaleY = boundsHeight / height;
    const context = {
      coords: this._coords,
      colors: this._colors,
      offsetX: -offsetX,
      offsetY: -offsetY,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    };
    const paddedWidth = width + BORDER_SIZE * 2;
    const paddedHeight = height + BORDER_SIZE * 2;
    const tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
    const tmpCtx = tmpCanvas.context;
    const data = tmpCtx.createImageData(width, height);

    if (backgroundColor) {
      const bytes = data.data;

      for (let i = 0, ii = bytes.length; i < ii; i += 4) {
        bytes[i] = backgroundColor[0];
        bytes[i + 1] = backgroundColor[1];
        bytes[i + 2] = backgroundColor[2];
        bytes[i + 3] = 255;
      }
    }

    for (const figure of this._figures) {
      drawFigure(data, figure, context);
    }

    tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
    const canvas = tmpCanvas.canvas;
    return {
      canvas,
      offsetX: offsetX - BORDER_SIZE * scaleX,
      offsetY: offsetY - BORDER_SIZE * scaleY,
      scaleX,
      scaleY
    };
  }

  getPattern(ctx, owner, inverse, pathType) {
    applyBoundingBox(ctx, this._bbox);
    let scale;

    if (pathType === PathType.SHADING) {
      scale = _util.Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
    } else {
      scale = _util.Util.singularValueDecompose2dScale(owner.baseTransform);

      if (this.matrix) {
        const matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

        scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
      }
    }

    const temporaryPatternCanvas = this._createMeshCanvas(scale, pathType === PathType.SHADING ? null : this._background, owner.cachedCanvases);

    if (pathType !== PathType.SHADING) {
      ctx.setTransform.apply(ctx, owner.baseTransform);

      if (this.matrix) {
        ctx.transform.apply(ctx, this.matrix);
      }
    }

    ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
    ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
    return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
  }

}

class DummyShadingPattern extends BaseShadingPattern {
  getPattern() {
    return "hotpink";
  }

}

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

const PaintType = {
  COLORED: 1,
  UNCOLORED: 2
};

class TilingPattern {
  static get MAX_PATTERN_SIZE() {
    return (0, _util.shadow)(this, "MAX_PATTERN_SIZE", 3000);
  }

  constructor(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
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

  createPatternCanvas(owner) {
    const operatorList = this.operatorList;
    const bbox = this.bbox;
    const xstep = this.xstep;
    const ystep = this.ystep;
    const paintType = this.paintType;
    const tilingType = this.tilingType;
    const color = this.color;
    const canvasGraphicsFactory = this.canvasGraphicsFactory;
    (0, _util.info)("TilingType: " + tilingType);
    const x0 = bbox[0],
          y0 = bbox[1],
          x1 = bbox[2],
          y1 = bbox[3];

    const matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

    const curMatrixScale = _util.Util.singularValueDecompose2dScale(this.baseTransform);

    const combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
    const dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
    const dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
    const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
    const tmpCtx = tmpCanvas.context;
    const graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
    graphics.groupLevel = owner.groupLevel;
    this.setFillAndStrokeStyleToContext(graphics, paintType, color);
    let adjustedX0 = x0;
    let adjustedY0 = y0;
    let adjustedX1 = x1;
    let adjustedY1 = y1;

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
    tmpCtx.save();
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

  getSizeAndScale(step, realOutputSize, scale) {
    step = Math.abs(step);
    const maxSize = Math.max(TilingPattern.MAX_PATTERN_SIZE, realOutputSize);
    let size = Math.ceil(step * scale);

    if (size >= maxSize) {
      size = maxSize;
    } else {
      scale = size / step;
    }

    return {
      scale,
      size
    };
  }

  clipBbox(graphics, x0, y0, x1, y1) {
    const bboxWidth = x1 - x0;
    const bboxHeight = y1 - y0;
    graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
    graphics.clip();
    graphics.endPath();
  }

  setFillAndStrokeStyleToContext(graphics, paintType, color) {
    const context = graphics.ctx,
          current = graphics.current;

    switch (paintType) {
      case PaintType.COLORED:
        const ctx = this.ctx;
        context.fillStyle = ctx.fillStyle;
        context.strokeStyle = ctx.strokeStyle;
        current.fillColor = ctx.fillStyle;
        current.strokeColor = ctx.strokeStyle;
        break;

      case PaintType.UNCOLORED:
        const cssColor = _util.Util.makeHexColor(color[0], color[1], color[2]);

        context.fillStyle = cssColor;
        context.strokeStyle = cssColor;
        current.fillColor = cssColor;
        current.strokeColor = cssColor;
        break;

      default:
        throw new _util.FormatError("Unsupported paint type: ".concat(paintType));
    }
  }

  getPattern(ctx, owner, inverse, pathType) {
    let matrix = inverse;

    if (pathType !== PathType.SHADING) {
      matrix = _util.Util.transform(matrix, owner.baseTransform);

      if (this.matrix) {
        matrix = _util.Util.transform(matrix, this.matrix);
      }
    }

    const temporaryPatternCanvas = this.createPatternCanvas(owner);
    let domMatrix = new DOMMatrix(matrix);
    domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
    domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY);
    const pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat");

    try {
      pattern.setTransform(domMatrix);
    } catch (ex) {
      (0, _util.warn)("TilingPattern.getPattern: \"".concat(ex === null || ex === void 0 ? void 0 : ex.message, "\"."));
    }

    return pattern;
  }

}

exports.TilingPattern = TilingPattern;

/***/ }),
/* 203 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GlobalWorkerOptions = void 0;
const GlobalWorkerOptions = Object.create(null);
exports.GlobalWorkerOptions = GlobalWorkerOptions;
GlobalWorkerOptions.workerPort = GlobalWorkerOptions.workerPort === undefined ? null : GlobalWorkerOptions.workerPort;
GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc === undefined ? "" : GlobalWorkerOptions.workerSrc;

/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MessageHandler = void 0;

__w_pdfjs_require__(145);

__w_pdfjs_require__(205);

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

const CallbackKind = {
  UNKNOWN: 0,
  DATA: 1,
  ERROR: 2
};
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
  if (!(reason instanceof Error || typeof reason === "object" && reason !== null)) {
    (0, _util.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.');
  }

  switch (reason.name) {
    case "AbortException":
      return new _util.AbortException(reason.message);

    case "MissingPDFException":
      return new _util.MissingPDFException(reason.message);

    case "PasswordException":
      return new _util.PasswordException(reason.message, reason.code);

    case "UnexpectedResponseException":
      return new _util.UnexpectedResponseException(reason.message, reason.status);

    case "UnknownErrorException":
      return new _util.UnknownErrorException(reason.message, reason.details);

    default:
      return new _util.UnknownErrorException(reason.message, reason.toString());
  }
}

class MessageHandler {
  constructor(sourceName, targetName, comObj) {
    this.sourceName = sourceName;
    this.targetName = targetName;
    this.comObj = comObj;
    this.callbackId = 1;
    this.streamId = 1;
    this.streamSinks = Object.create(null);
    this.streamControllers = Object.create(null);
    this.callbackCapabilities = Object.create(null);
    this.actionHandler = Object.create(null);

    this._onComObjOnMessage = event => {
      const data = event.data;

      if (data.targetName !== this.sourceName) {
        return;
      }

      if (data.stream) {
        this._processStreamMessage(data);

        return;
      }

      if (data.callback) {
        const callbackId = data.callbackId;
        const capability = this.callbackCapabilities[callbackId];

        if (!capability) {
          throw new Error("Cannot resolve callback ".concat(callbackId));
        }

        delete this.callbackCapabilities[callbackId];

        if (data.callback === CallbackKind.DATA) {
          capability.resolve(data.data);
        } else if (data.callback === CallbackKind.ERROR) {
          capability.reject(wrapReason(data.reason));
        } else {
          throw new Error("Unexpected callback case");
        }

        return;
      }

      const action = this.actionHandler[data.action];

      if (!action) {
        throw new Error("Unknown action from worker: ".concat(data.action));
      }

      if (data.callbackId) {
        const cbSourceName = this.sourceName;
        const cbTargetName = data.sourceName;
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
        this._createStreamSink(data);

        return;
      }

      action(data.data);
    };

    comObj.addEventListener("message", this._onComObjOnMessage);
  }

  on(actionName, handler) {
    const ah = this.actionHandler;

    if (ah[actionName]) {
      throw new Error("There is already an actionName called \"".concat(actionName, "\""));
    }

    ah[actionName] = handler;
  }

  send(actionName, data, transfers) {
    this.comObj.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: actionName,
      data
    }, transfers);
  }

  sendWithPromise(actionName, data, transfers) {
    const callbackId = this.callbackId++;
    const capability = (0, _util.createPromiseCapability)();
    this.callbackCapabilities[callbackId] = capability;

    try {
      this.comObj.postMessage({
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
  }

  sendWithStream(actionName, data, queueingStrategy, transfers) {
    const streamId = this.streamId++,
          sourceName = this.sourceName,
          targetName = this.targetName,
          comObj = this.comObj;
    return new ReadableStream({
      start: controller => {
        const startCapability = (0, _util.createPromiseCapability)();
        this.streamControllers[streamId] = {
          controller,
          startCall: startCapability,
          pullCall: null,
          cancelCall: null,
          isClosed: false
        };
        comObj.postMessage({
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
        const pullCapability = (0, _util.createPromiseCapability)();
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
        (0, _util.assert)(reason instanceof Error, "cancel must have a valid reason");
        const cancelCapability = (0, _util.createPromiseCapability)();
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
  }

  _createStreamSink(data) {
    const streamId = data.streamId,
          sourceName = this.sourceName,
          targetName = data.sourceName,
          comObj = this.comObj;
    const self = this,
          action = this.actionHandler[data.action];
    const streamSink = {
      enqueue(chunk) {
        let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        let transfers = arguments.length > 2 ? arguments[2] : undefined;

        if (this.isCancelled) {
          return;
        }

        const lastDesiredSize = this.desiredSize;
        this.desiredSize -= size;

        if (lastDesiredSize > 0 && this.desiredSize <= 0) {
          this.sinkCapability = (0, _util.createPromiseCapability)();
          this.ready = this.sinkCapability.promise;
        }

        comObj.postMessage({
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
        (0, _util.assert)(reason instanceof Error, "error must have a valid reason");

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
  }

  _processStreamMessage(data) {
    const streamId = data.streamId,
          sourceName = this.sourceName,
          targetName = data.sourceName,
          comObj = this.comObj;
    const streamController = this.streamControllers[streamId],
          streamSink = this.streamSinks[streamId];

    switch (data.stream) {
      case StreamKind.START_COMPLETE:
        if (data.success) {
          streamController.startCall.resolve();
        } else {
          streamController.startCall.reject(wrapReason(data.reason));
        }

        break;

      case StreamKind.PULL_COMPLETE:
        if (data.success) {
          streamController.pullCall.resolve();
        } else {
          streamController.pullCall.reject(wrapReason(data.reason));
        }

        break;

      case StreamKind.PULL:
        if (!streamSink) {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            success: true
          });
          break;
        }

        if (streamSink.desiredSize <= 0 && data.desiredSize > 0) {
          streamSink.sinkCapability.resolve();
        }

        streamSink.desiredSize = data.desiredSize;
        new Promise(function (resolve) {
          resolve(streamSink.onPull && streamSink.onPull());
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
        (0, _util.assert)(streamController, "enqueue should have stream controller");

        if (streamController.isClosed) {
          break;
        }

        streamController.controller.enqueue(data.chunk);
        break;

      case StreamKind.CLOSE:
        (0, _util.assert)(streamController, "close should have stream controller");

        if (streamController.isClosed) {
          break;
        }

        streamController.isClosed = true;
        streamController.controller.close();

        this._deleteStreamController(streamController, streamId);

        break;

      case StreamKind.ERROR:
        (0, _util.assert)(streamController, "error should have stream controller");
        streamController.controller.error(wrapReason(data.reason));

        this._deleteStreamController(streamController, streamId);

        break;

      case StreamKind.CANCEL_COMPLETE:
        if (data.success) {
          streamController.cancelCall.resolve();
        } else {
          streamController.cancelCall.reject(wrapReason(data.reason));
        }

        this._deleteStreamController(streamController, streamId);

        break;

      case StreamKind.CANCEL:
        if (!streamSink) {
          break;
        }

        new Promise(function (resolve) {
          resolve(streamSink.onCancel && streamSink.onCancel(wrapReason(data.reason)));
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
        streamSink.sinkCapability.reject(wrapReason(data.reason));
        streamSink.isCancelled = true;
        delete this.streamSinks[streamId];
        break;

      default:
        throw new Error("Unexpected stream case");
    }
  }

  async _deleteStreamController(streamController, streamId) {
    await Promise.allSettled([streamController.startCall && streamController.startCall.promise, streamController.pullCall && streamController.pullCall.promise, streamController.cancelCall && streamController.cancelCall.promise]);
    delete this.streamControllers[streamId];
  }

  destroy() {
    this.comObj.removeEventListener("message", this._onComObjOnMessage);
  }

}

exports.MessageHandler = MessageHandler;

/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {

__w_pdfjs_require__(175);

/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Metadata = void 0;

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _metadataMap = /*#__PURE__*/new WeakMap();

var _data = /*#__PURE__*/new WeakMap();

class Metadata {
  constructor(_ref) {
    let {
      parsedData,
      rawData
    } = _ref;

    _classPrivateFieldInitSpec(this, _metadataMap, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _metadataMap, parsedData);

    _classPrivateFieldSet(this, _data, rawData);
  }

  getRaw() {
    return _classPrivateFieldGet(this, _data);
  }

  get(name) {
    var _classPrivateFieldGet2;

    return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _metadataMap).get(name)) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : null;
  }

  getAll() {
    return (0, _util.objectFromMap)(_classPrivateFieldGet(this, _metadataMap));
  }

  has(name) {
    return _classPrivateFieldGet(this, _metadataMap).has(name);
  }

}

exports.Metadata = Metadata;

/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionalContentConfig = void 0;

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

class OptionalContentGroup {
  constructor(name, intent) {
    this.visible = true;
    this.name = name;
    this.intent = intent;
  }

}

class OptionalContentConfig {
  constructor(data) {
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

    for (const group of data.groups) {
      this._groups.set(group.id, new OptionalContentGroup(group.name, group.intent));
    }

    if (data.baseState === "OFF") {
      for (const group of this._groups) {
        group.visible = false;
      }
    }

    for (const on of data.on) {
      this._groups.get(on).visible = true;
    }

    for (const off of data.off) {
      this._groups.get(off).visible = false;
    }
  }

  _evaluateVisibilityExpression(array) {
    const length = array.length;

    if (length < 2) {
      return true;
    }

    const operator = array[0];

    for (let i = 1; i < length; i++) {
      const element = array[i];
      let state;

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

  isVisible(group) {
    if (this._groups.size === 0) {
      return true;
    }

    if (!group) {
      (0, _util.warn)("Optional content group not defined.");
      return true;
    }

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
        for (const id of group.ids) {
          if (!this._groups.has(id)) {
            (0, _util.warn)("Optional content group not found: ".concat(id));
            return true;
          }

          if (this._groups.get(id).visible) {
            return true;
          }
        }

        return false;
      } else if (group.policy === "AllOn") {
        for (const id of group.ids) {
          if (!this._groups.has(id)) {
            (0, _util.warn)("Optional content group not found: ".concat(id));
            return true;
          }

          if (!this._groups.get(id).visible) {
            return false;
          }
        }

        return true;
      } else if (group.policy === "AnyOff") {
        for (const id of group.ids) {
          if (!this._groups.has(id)) {
            (0, _util.warn)("Optional content group not found: ".concat(id));
            return true;
          }

          if (!this._groups.get(id).visible) {
            return true;
          }
        }

        return false;
      } else if (group.policy === "AllOff") {
        for (const id of group.ids) {
          if (!this._groups.has(id)) {
            (0, _util.warn)("Optional content group not found: ".concat(id));
            return true;
          }

          if (this._groups.get(id).visible) {
            return false;
          }
        }

        return true;
      }

      (0, _util.warn)("Unknown optional content policy ".concat(group.policy, "."));
      return true;
    }

    (0, _util.warn)("Unknown group type ".concat(group.type, "."));
    return true;
  }

  setVisibility(id) {
    let visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!this._groups.has(id)) {
      (0, _util.warn)("Optional content group not found: ".concat(id));
      return;
    }

    this._groups.get(id).visible = !!visible;
  }

  getOrder() {
    if (!this._groups.size) {
      return null;
    }

    if (this._order) {
      return this._order.slice();
    }

    return Array.from(this._groups.keys());
  }

  getGroups() {
    return this._groups.size > 0 ? (0, _util.objectFromMap)(this._groups) : null;
  }

  getGroup(id) {
    return this._groups.get(id) || null;
  }

}

exports.OptionalContentConfig = OptionalContentConfig;

/***/ }),
/* 208 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFDataTransportStream = void 0;

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(2);

__w_pdfjs_require__(145);

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(191);

class PDFDataTransportStream {
  constructor(params, pdfDataRangeTransport) {
    (0, _util.assert)(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
    this._queuedChunks = [];
    this._progressiveDone = params.progressiveDone || false;
    this._contentDispositionFilename = params.contentDispositionFilename || null;
    const initialData = params.initialData;

    if ((initialData === null || initialData === void 0 ? void 0 : initialData.length) > 0) {
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

      (0, _util.assert)(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
    }
  }

  get _progressiveDataLength() {
    var _this$_fullRequestRea, _this$_fullRequestRea2;

    return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
  }

  _onProgress(evt) {
    if (evt.total === undefined) {
      const firstReader = this._rangeReaders[0];

      if (firstReader !== null && firstReader !== void 0 && firstReader.onProgress) {
        firstReader.onProgress({
          loaded: evt.loaded
        });
      }
    } else {
      const fullReader = this._fullRequestReader;

      if (fullReader !== null && fullReader !== void 0 && fullReader.onProgress) {
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
    (0, _util.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
    const queuedChunks = this._queuedChunks;
    this._queuedChunks = null;
    return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename);
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

    for (const reader of this._rangeReaders.slice(0)) {
      reader.cancel(reason);
    }

    this._pdfDataRangeTransport.abort();
  }

}

exports.PDFDataTransportStream = PDFDataTransportStream;

class PDFDataTransportStreamReader {
  constructor(stream, queuedChunks) {
    let progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let contentDispositionFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = (0, _display_utils.isPdfFile)(contentDispositionFilename) ? contentDispositionFilename : null;
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

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;
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

      for (const requestCapability of this._requests) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      }

      this._requests.length = 0;
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

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;

    this._stream._removeRangeReader(this);
  }

}

/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XfaText = void 0;

__w_pdfjs_require__(2);

class XfaText {
  static textContent(xfa) {
    const items = [];
    const output = {
      items,
      styles: Object.create(null)
    };

    function walk(node) {
      var _node$attributes;

      if (!node) {
        return;
      }

      let str = null;
      const name = node.name;

      if (name === "#text") {
        str = node.value;
      } else if (!XfaText.shouldBuildText(name)) {
        return;
      } else if (node !== null && node !== void 0 && (_node$attributes = node.attributes) !== null && _node$attributes !== void 0 && _node$attributes.textContent) {
        str = node.attributes.textContent;
      } else if (node.value) {
        str = node.value;
      }

      if (str !== null) {
        items.push({
          str
        });
      }

      if (!node.children) {
        return;
      }

      for (const child of node.children) {
        walk(child);
      }
    }

    walk(xfa);
    return output;
  }

  static shouldBuildText(name) {
    return !(name === "textarea" || name === "input" || name === "option" || name === "select");
  }

}

exports.XfaText = XfaText;

/***/ }),
/* 210 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnnotationLayer = void 0;

__w_pdfjs_require__(2);

__w_pdfjs_require__(106);

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(191);

var _annotation_storage = __w_pdfjs_require__(198);

var _scripting_utils = __w_pdfjs_require__(211);

var _xfa_layer = __w_pdfjs_require__(212);

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

const DEFAULT_TAB_INDEX = 1000;
const GetElementsByNameSet = new WeakSet();

function getRectDims(rect) {
  return {
    width: rect[2] - rect[0],
    height: rect[3] - rect[1]
  };
}

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

}

class AnnotationElement {
  constructor(parameters) {
    let {
      isRenderable = false,
      ignoreBorder = false,
      createQuadrilaterals = false
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderForms = parameters.renderForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._fieldObjects = parameters.fieldObjects;
    this._mouseState = parameters.mouseState;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }

    if (createQuadrilaterals) {
      this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
    }
  }

  _createContainer() {
    let ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const data = this.data,
          page = this.page,
          viewport = this.viewport;
    const container = document.createElement("section");
    let {
      width,
      height
    } = getRectDims(data.rect);
    container.setAttribute("data-annotation-id", data.id);

    const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

    if (data.hasOwnCanvas) {
      const transform = viewport.transform.slice();

      const [scaleX, scaleY] = _util.Util.singularValueDecompose2dScale(transform);

      width = Math.ceil(width * scaleX);
      height = Math.ceil(height * scaleY);
      rect[0] *= scaleX;
      rect[1] *= scaleY;

      for (let i = 0; i < 4; i++) {
        transform[i] = Math.sign(transform[i]);
      }

      container.style.transform = "matrix(".concat(transform.join(","), ")");
    } else {
      container.style.transform = "matrix(".concat(viewport.transform.join(","), ")");
    }

    container.style.transformOrigin = "".concat(-rect[0], "px ").concat(-rect[1], "px");

    if (!ignoreBorder && data.borderStyle.width > 0) {
      container.style.borderWidth = "".concat(data.borderStyle.width, "px");

      if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
        width -= 2 * data.borderStyle.width;
        height -= 2 * data.borderStyle.width;
      }

      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;

      if (horizontalRadius > 0 || verticalRadius > 0) {
        const radius = "".concat(horizontalRadius, "px / ").concat(verticalRadius, "px");
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

      const borderColor = data.borderColor || data.color || null;

      if (borderColor) {
        container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
      } else {
        container.style.borderWidth = 0;
      }
    }

    container.style.left = "".concat(rect[0], "px");
    container.style.top = "".concat(rect[1], "px");

    if (data.hasOwnCanvas) {
      container.style.width = container.style.height = "auto";
    } else {
      container.style.width = "".concat(width, "px");
      container.style.height = "".concat(height, "px");
    }

    return container;
  }

  _createQuadrilaterals() {
    let ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.data.quadPoints) {
      return null;
    }

    const quadrilaterals = [];
    const savedRect = this.data.rect;

    for (const quadPoint of this.data.quadPoints) {
      this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
      quadrilaterals.push(this._createContainer(ignoreBorder));
    }

    this.data.rect = savedRect;
    return quadrilaterals;
  }

  _createPopup(trigger, data) {
    let container = this.container;

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

    const popupElement = new PopupElement({
      container,
      trigger,
      color: data.color,
      titleObj: data.titleObj,
      modificationDate: data.modificationDate,
      contentsObj: data.contentsObj,
      richText: data.richText,
      hideWrapper: true
    });
    const popup = popupElement.render();
    popup.style.left = container.style.width;
    container.appendChild(popup);
  }

  _renderQuadrilaterals(className) {
    for (const quadrilateral of this.quadrilaterals) {
      quadrilateral.className = className;
    }

    return this.quadrilaterals;
  }

  render() {
    (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
  }

  _getElementsByName(name) {
    let skipId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const fields = [];

    if (this._fieldObjects) {
      const fieldObj = this._fieldObjects[name];

      if (fieldObj) {
        for (const {
          page,
          id,
          exportValues
        } of fieldObj) {
          if (page === -1) {
            continue;
          }

          if (id === skipId) {
            continue;
          }

          const exportValue = typeof exportValues === "string" ? exportValues : null;
          const domElement = document.getElementById(id);

          if (domElement && !GetElementsByNameSet.has(domElement)) {
            (0, _util.warn)("_getElementsByName - element not allowed: ".concat(id));
            continue;
          }

          fields.push({
            id,
            exportValue,
            domElement
          });
        }
      }

      return fields;
    }

    for (const domElement of document.getElementsByName(name)) {
      const {
        id,
        exportValue
      } = domElement;

      if (id === skipId) {
        continue;
      }

      if (!GetElementsByNameSet.has(domElement)) {
        continue;
      }

      fields.push({
        id,
        exportValue,
        domElement
      });
    }

    return fields;
  }

  static get platform() {
    const platform = typeof navigator !== "undefined" ? navigator.platform : "";
    return (0, _util.shadow)(this, "platform", {
      isWin: platform.includes("Win"),
      isMac: platform.includes("Mac")
    });
  }

}

class LinkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.resetForm || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
    super(parameters, {
      isRenderable,
      ignoreBorder: !!(options !== null && options !== void 0 && options.ignoreBorder),
      createQuadrilaterals: true
    });
  }

  render() {
    const {
      data,
      linkService
    } = this;
    const link = document.createElement("a");

    if (data.url) {
      var _linkService$addLinkA;

      if (!linkService.addLinkAttributes) {
        (0, _util.warn)("LinkAnnotationElement.render - missing `addLinkAttributes`-method on the `linkService`-instance.");
      }

      (_linkService$addLinkA = linkService.addLinkAttributes) === null || _linkService$addLinkA === void 0 ? void 0 : _linkService$addLinkA.call(linkService, link, data.url, data.newWindow);
    } else if (data.action) {
      this._bindNamedAction(link, data.action);
    } else if (data.dest) {
      this._bindLink(link, data.dest);
    } else {
      let hasClickAction = false;

      if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
        hasClickAction = true;

        this._bindJSAction(link, data);
      }

      if (data.resetForm) {
        this._bindResetFormAction(link, data.resetForm);
      } else if (!hasClickAction) {
        this._bindLink(link, "");
      }
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("linkAnnotation").map((quadrilateral, index) => {
        const linkElement = index === 0 ? link : link.cloneNode();
        quadrilateral.appendChild(linkElement);
        return quadrilateral;
      });
    }

    this.container.className = "linkAnnotation";
    this.container.appendChild(link);
    return this.container;
  }

  _bindLink(link, destination) {
    link.href = this.linkService.getDestinationHash(destination);

    link.onclick = () => {
      if (destination) {
        this.linkService.goToDestination(destination);
      }

      return false;
    };

    if (destination || destination === "") {
      link.className = "internalLink";
    }
  }

  _bindNamedAction(link, action) {
    link.href = this.linkService.getAnchorUrl("");

    link.onclick = () => {
      this.linkService.executeNamedAction(action);
      return false;
    };

    link.className = "internalLink";
  }

  _bindJSAction(link, data) {
    link.href = this.linkService.getAnchorUrl("");
    const map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

    for (const name of Object.keys(data.actions)) {
      const jsName = map.get(name);

      if (!jsName) {
        continue;
      }

      link[jsName] = () => {
        var _this$linkService$eve;

        (_this$linkService$eve = this.linkService.eventBus) === null || _this$linkService$eve === void 0 ? void 0 : _this$linkService$eve.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: data.id,
            name
          }
        });
        return false;
      };
    }

    if (!link.onclick) {
      link.onclick = () => false;
    }

    link.className = "internalLink";
  }

  _bindResetFormAction(link, resetForm) {
    const otherClickAction = link.onclick;

    if (!otherClickAction) {
      link.href = this.linkService.getAnchorUrl("");
    }

    link.className = "internalLink";

    if (!this._fieldObjects) {
      (0, _util.warn)("_bindResetFormAction - \"resetForm\" action not supported, " + "ensure that the `fieldObjects` parameter is provided.");

      if (!otherClickAction) {
        link.onclick = () => false;
      }

      return;
    }

    link.onclick = () => {
      if (otherClickAction) {
        otherClickAction();
      }

      const {
        fields: resetFormFields,
        refs: resetFormRefs,
        include
      } = resetForm;
      const allFields = [];

      if (resetFormFields.length !== 0 || resetFormRefs.length !== 0) {
        const fieldIds = new Set(resetFormRefs);

        for (const fieldName of resetFormFields) {
          const fields = this._fieldObjects[fieldName] || [];

          for (const {
            id
          } of fields) {
            fieldIds.add(id);
          }
        }

        for (const fields of Object.values(this._fieldObjects)) {
          for (const field of fields) {
            if (fieldIds.has(field.id) === include) {
              allFields.push(field);
            }
          }
        }
      } else {
        for (const fields of Object.values(this._fieldObjects)) {
          allFields.push(...fields);
        }
      }

      const storage = this.annotationStorage;
      const allIds = [];

      for (const field of allFields) {
        const {
          id
        } = field;
        allIds.push(id);

        switch (field.type) {
          case "text":
            {
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value,
                valueAsString: value
              });
              break;
            }

          case "checkbox":
          case "radiobutton":
            {
              const value = field.defaultValue === field.exportValues;
              storage.setValue(id, {
                value
              });
              break;
            }

          case "combobox":
          case "listbox":
            {
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value
              });
              break;
            }

          default:
            continue;
        }

        const domElement = document.getElementById(id);

        if (!domElement || !GetElementsByNameSet.has(domElement)) {
          continue;
        }

        domElement.dispatchEvent(new Event("resetform"));
      }

      if (this.enableScripting) {
        var _this$linkService$eve2;

        (_this$linkService$eve2 = this.linkService.eventBus) === null || _this$linkService$eve2 === void 0 ? void 0 : _this$linkService$eve2.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: "app",
            ids: allIds,
            name: "ResetForm"
          }
        });
      }

      return false;
    };
  }

}

class TextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl, _parameters$data$cont, _parameters$data$rich;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl = parameters.data.titleObj) !== null && _parameters$data$titl !== void 0 && _parameters$data$titl.str || (_parameters$data$cont = parameters.data.contentsObj) !== null && _parameters$data$cont !== void 0 && _parameters$data$cont.str || (_parameters$data$rich = parameters.data.richText) !== null && _parameters$data$rich !== void 0 && _parameters$data$rich.str);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    this.container.className = "textAnnotation";
    const image = document.createElement("img");
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

}

class WidgetAnnotationElement extends AnnotationElement {
  render() {
    if (this.data.alternativeText) {
      this.container.title = this.data.alternativeText;
    }

    return this.container;
  }

  _getKeyModifier(event) {
    const {
      isWin,
      isMac
    } = AnnotationElement.platform;
    return isWin && event.ctrlKey || isMac && event.metaKey;
  }

  _setEventListener(element, baseName, eventName, valueGetter) {
    if (baseName.includes("mouse")) {
      element.addEventListener(baseName, event => {
        var _this$linkService$eve3;

        (_this$linkService$eve3 = this.linkService.eventBus) === null || _this$linkService$eve3 === void 0 ? void 0 : _this$linkService$eve3.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event),
            shift: event.shiftKey,
            modifier: this._getKeyModifier(event)
          }
        });
      });
    } else {
      element.addEventListener(baseName, event => {
        var _this$linkService$eve4;

        (_this$linkService$eve4 = this.linkService.eventBus) === null || _this$linkService$eve4 === void 0 ? void 0 : _this$linkService$eve4.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event)
          }
        });
      });
    }
  }

  _setEventListeners(element, names, getter) {
    for (const [baseName, eventName] of names) {
      var _this$data$actions;

      if (eventName === "Action" || (_this$data$actions = this.data.actions) !== null && _this$data$actions !== void 0 && _this$data$actions[eventName]) {
        this._setEventListener(element, baseName, eventName, getter);
      }
    }
  }

  _setBackgroundColor(element) {
    const color = this.data.backgroundColor || null;
    element.style.backgroundColor = color === null ? "transparent" : _util.Util.makeHexColor(color[0], color[1], color[2]);
  }

  _dispatchEventFromSandbox(actions, jsEvent) {
    const setColor = (jsName, styleName, event) => {
      const color = event.detail[jsName];
      event.target.style[styleName] = _scripting_utils.ColorConverters["".concat(color[0], "_HTML")](color.slice(1));
    };

    const commonActions = {
      display: event => {
        const hidden = event.detail.display % 2 === 1;
        event.target.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, this.data.fieldName, {
          hidden,
          print: event.detail.display === 0 || event.detail.display === 3
        });
      },
      print: event => {
        this.annotationStorage.setValue(this.data.id, this.data.fieldName, {
          print: event.detail.print
        });
      },
      hidden: event => {
        event.target.style.visibility = event.detail.hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, this.data.fieldName, {
          hidden: event.detail.hidden
        });
      },
      focus: event => {
        setTimeout(() => event.target.focus({
          preventScroll: false
        }), 0);
      },
      userName: event => {
        event.target.title = event.detail.userName;
      },
      readonly: event => {
        if (event.detail.readonly) {
          event.target.setAttribute("readonly", "");
        } else {
          event.target.removeAttribute("readonly");
        }
      },
      required: event => {
        if (event.detail.required) {
          event.target.setAttribute("required", "");
        } else {
          event.target.removeAttribute("required");
        }
      },
      bgColor: event => {
        setColor("bgColor", "backgroundColor", event);
      },
      fillColor: event => {
        setColor("fillColor", "backgroundColor", event);
      },
      fgColor: event => {
        setColor("fgColor", "color", event);
      },
      textColor: event => {
        setColor("textColor", "color", event);
      },
      borderColor: event => {
        setColor("borderColor", "borderColor", event);
      },
      strokeColor: event => {
        setColor("strokeColor", "borderColor", event);
      }
    };

    for (const name of Object.keys(jsEvent.detail)) {
      const action = actions[name] || commonActions[name];

      if (action) {
        action(jsEvent);
      }
    }
  }

}

class TextWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    const isRenderable = parameters.renderForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, {
      isRenderable
    });
  }

  setPropertyOnSiblings(base, key, value, keyInStorage) {
    const storage = this.annotationStorage;

    for (const element of this._getElementsByName(base.name, base.id)) {
      if (element.domElement) {
        element.domElement[key] = value;
      }

      storage.setValue(element.id, this.data.fieldName, {
        [keyInStorage]: value
      });
    }
  }

  render() {
    const storage = this.annotationStorage;
    const id = this.data.id;
    this.container.className = "textWidgetAnnotation";
    let element = null;

    if (this.renderForms) {
      const storedData = storage.getValue(id, this.data.fieldName, {
        value: this.data.fieldValue,
        valueAsString: this.data.fieldValue
      });
      const textContent = storedData.valueAsString || storedData.value || "";
      const elementData = {
        userValue: null,
        formattedValue: null
      };

      if (this.data.multiLine) {
        element = document.createElement("textarea");
        element.textContent = textContent;
      } else {
        element = document.createElement("input");
        element.type = "text";
        element.setAttribute("value", textContent);
      }

      GetElementsByNameSet.add(element);
      element.disabled = this.data.readOnly;
      element.name = this.data.fieldName;
      element.tabIndex = DEFAULT_TAB_INDEX;
      elementData.userValue = textContent;
      element.setAttribute("id", id);
      element.addEventListener("input", event => {
        storage.setValue(id, this.data.fieldName, {
          value: event.target.value
        });
        this.setPropertyOnSiblings(element, "value", event.target.value, "value");
      });
      element.addEventListener("resetform", event => {
        const defaultValue = this.data.defaultFieldValue || "";
        element.value = elementData.userValue = defaultValue;
        delete elementData.formattedValue;
      });

      let blurListener = event => {
        if (elementData.formattedValue) {
          event.target.value = elementData.formattedValue;
        }

        event.target.scrollLeft = 0;
      };

      if (this.enableScripting && this.hasJSActions) {
        var _this$data$actions2;

        element.addEventListener("focus", event => {
          if (elementData.userValue) {
            event.target.value = elementData.userValue;
          }
        });
        const fieldName = this.data.fieldName;
        element.addEventListener("updatefromsandbox", jsEvent => {
          const actions = {
            value(event) {
              elementData.userValue = event.detail.value || "";
              storage.setValue(id, fieldName, {
                value: elementData.userValue.toString()
              });

              if (!elementData.formattedValue) {
                event.target.value = elementData.userValue;
              }
            },

            valueAsString(event) {
              elementData.formattedValue = event.detail.valueAsString || "";

              if (event.target !== document.activeElement) {
                event.target.value = elementData.formattedValue;
              }

              storage.setValue(id, fieldName, {
                formattedValue: elementData.formattedValue
              });
            },

            selRange(event) {
              const [selStart, selEnd] = event.detail.selRange;

              if (selStart >= 0 && selEnd < event.target.value.length) {
                event.target.setSelectionRange(selStart, selEnd);
              }
            }

          };

          this._dispatchEventFromSandbox(actions, jsEvent);
        });
        element.addEventListener("keydown", event => {
          var _this$linkService$eve5;

          let commitKey = -1;

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
          (_this$linkService$eve5 = this.linkService.eventBus) === null || _this$linkService$eve5 === void 0 ? void 0 : _this$linkService$eve5.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id,
              name: "Keystroke",
              value: event.target.value,
              willCommit: true,
              commitKey,
              selStart: event.target.selectionStart,
              selEnd: event.target.selectionEnd
            }
          });
        });
        const _blurListener = blurListener;
        blurListener = null;
        element.addEventListener("blur", event => {
          elementData.userValue = event.target.value;

          if (this._mouseState.isDown) {
            var _this$linkService$eve6;

            (_this$linkService$eve6 = this.linkService.eventBus) === null || _this$linkService$eve6 === void 0 ? void 0 : _this$linkService$eve6.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
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

        if ((_this$data$actions2 = this.data.actions) !== null && _this$data$actions2 !== void 0 && _this$data$actions2.Keystroke) {
          element.addEventListener("beforeinput", event => {
            var _this$linkService$eve7;

            elementData.formattedValue = "";
            const {
              data,
              target
            } = event;
            const {
              value,
              selectionStart,
              selectionEnd
            } = target;
            (_this$linkService$eve7 = this.linkService.eventBus) === null || _this$linkService$eve7 === void 0 ? void 0 : _this$linkService$eve7.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                change: data,
                willCommit: false,
                selStart: selectionStart,
                selEnd: selectionEnd
              }
            });
          });
        }

        this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.value);
      }

      if (blurListener) {
        element.addEventListener("blur", blurListener);
      }

      if (this.data.maxLen !== null) {
        element.maxLength = this.data.maxLen;
      }

      if (this.data.comb) {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / this.data.maxLen;
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

    this._setBackgroundColor(element);

    this.container.appendChild(element);
    return this.container;
  }

  _setTextStyle(element) {
    const TEXT_ALIGNMENT = ["left", "center", "right"];
    const {
      fontSize,
      fontColor
    } = this.data.defaultAppearanceData;
    const style = element.style;

    if (fontSize) {
      style.fontSize = "".concat(fontSize, "px");
    }

    style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

    if (this.data.textAlignment !== null) {
      style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    }
  }

}

class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, "".concat(this.data.fieldName, "/").concat(this.data.exportValue), {
      value: data.exportValue === data.fieldValue
    }).value;

    if (typeof value === "string") {
      value = value !== "Off";
      storage.setValue(id, this.data.fieldName, {
        value
      });
    }

    this.container.className = "buttonWidgetAnnotation checkBox";
    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.disabled = data.readOnly;
    element.type = "checkbox";
    element.name = data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.setAttribute("exportValue", data.exportValue);
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      } = event.target;

      for (const checkbox of this._getElementsByName(name, id)) {
        const curChecked = checked && checkbox.exportValue === data.exportValue;

        if (checkbox.domElement) {
          checkbox.domElement.checked = curChecked;
        }

        storage.setValue(checkbox.id, this.data.fieldName, {
          value: curChecked,
          emitMessage: false
        });
      }

      storage.setValue(id, this.data.fieldName, {
        value: checked,
        exportValue: checked ? data.exportValue : null
      });
    });
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue || "Off";
      event.target.checked = defaultValue === data.exportValue;
    });

    if (this.enableScripting && this.hasJSActions) {
      const fieldName = this.data.fieldName;
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            event.target.checked = event.detail.value !== "Off";
            storage.setValue(id, fieldName, {
              value: event.target.checked
            });
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this._setBackgroundColor(element);

    this.container.appendChild(element);
    return this.container;
  }

}

class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    this.container.className = "buttonWidgetAnnotation radioButton";
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, this.data.fieldName, {
      value: data.fieldValue === data.buttonValue
    }, this.data.buttonValue).value;

    if (typeof value === "string") {
      value = value !== data.buttonValue;
      storage.setValue(id, this.data.fieldName, {
        value
      }, this.data.buttonValue);
    }

    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.disabled = data.readOnly;
    element.type = "radio";
    element.name = data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      } = event.target;

      for (const radio of this._getElementsByName(name, id)) {
        storage.setValue(radio.id, this.data.fieldName, {
          value: false,
          emitMessage: false
        });
      }

      storage.setValue(id, this.data.fieldName, {
        value: checked,
        radioValue: this.data.buttonValue
      });
    });
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue;
      event.target.checked = defaultValue !== null && defaultValue !== undefined && defaultValue === data.buttonValue;
    });

    if (this.enableScripting && this.hasJSActions) {
      const pdfButtonValue = data.buttonValue;
      element.addEventListener("updatefromsandbox", jsEvent => {
        const fieldName = this.data.fieldName;
        const actions = {
          value: event => {
            const checked = pdfButtonValue === event.detail.value;

            for (const radio of this._getElementsByName(event.target.name)) {
              const curChecked = checked && radio.id === id;

              if (radio.domElement) {
                radio.domElement.checked = curChecked;
              }

              storage.setValue(radio.id, fieldName, {
                value: curChecked
              });
            }
          }
        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this._setBackgroundColor(element);

    this.container.appendChild(element);
    return this.container;
  }

}

class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      ignoreBorder: parameters.data.hasAppearance
    });
  }

  render() {
    const container = super.render();
    container.className = "buttonWidgetAnnotation pushButton";

    if (this.data.alternativeText) {
      container.title = this.data.alternativeText;
    }

    return container;
  }

}

class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    this.container.className = "choiceWidgetAnnotation";
    const storage = this.annotationStorage;
    const id = this.data.id;
    const fieldvalue = storage.getValue(id, this.data.fieldName, {
      value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined
    }).value;
    this.data.fieldValue = fieldvalue;
    let {
      fontSize
    } = this.data.defaultAppearanceData;

    if (!fontSize) {
      fontSize = 9;
    }

    const fontSizeStyle = "calc(".concat(fontSize, "px * var(--zoom-factor))");
    const selectElement = document.createElement("select");
    GetElementsByNameSet.add(selectElement);
    selectElement.disabled = this.data.readOnly;
    selectElement.name = this.data.fieldName;
    selectElement.setAttribute("id", id);
    selectElement.tabIndex = DEFAULT_TAB_INDEX;
    selectElement.style.fontSize = "".concat(fontSize, "px");

    if (!this.data.combo) {
      selectElement.size = this.data.options.length;

      if (this.data.multiSelect) {
        selectElement.multiple = true;
      }
    }

    selectElement.addEventListener("resetform", event => {
      const defaultValue = this.data.defaultFieldValue;

      for (const option of selectElement.options) {
        option.selected = option.value === defaultValue;
      }
    });

    for (const option of this.data.options) {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;

      if (this.data.combo) {
        optionElement.style.fontSize = fontSizeStyle;
      }

      if (this.data.fieldValue.includes(option.exportValue)) {
        optionElement.setAttribute("selected", true);
      }

      selectElement.appendChild(optionElement);
    }

    const getValue = (event, isExport) => {
      const name = isExport ? "value" : "textContent";
      const options = event.target.options;

      if (!event.target.multiple) {
        return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
      }

      return Array.prototype.filter.call(options, option => option.selected).map(option => option[name]);
    };

    const getItems = event => {
      const options = event.target.options;
      return Array.prototype.map.call(options, option => {
        return {
          displayValue: option.textContent,
          exportValue: option.value
        };
      });
    };

    if (this.enableScripting && this.hasJSActions) {
      selectElement.addEventListener("updatefromsandbox", jsEvent => {
        const fieldName = this.data.fieldName;
        const actions = {
          value(event) {
            const value = event.detail.value;
            const values = new Set(Array.isArray(value) ? value : [value]);

            for (const option of selectElement.options) {
              option.selected = values.has(option.value);
            }

            storage.setValue(id, fieldName, {
              value: getValue(event, true)
            });
          },

          multipleSelection(event) {
            selectElement.multiple = true;
          },

          remove(event) {
            const options = selectElement.options;
            const index = event.detail.remove;
            options[index].selected = false;
            selectElement.remove(index);

            if (options.length > 0) {
              const i = Array.prototype.findIndex.call(options, option => option.selected);

              if (i === -1) {
                options[0].selected = true;
              }
            }

            storage.setValue(id, this.data.fieldName, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          clear(event) {
            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            storage.setValue(id, this.data.fieldName, {
              value: null,
              items: []
            });
          },

          insert(event) {
            const {
              index,
              displayValue,
              exportValue
            } = event.detail.insert;
            const optionElement = document.createElement("option");
            optionElement.textContent = displayValue;
            optionElement.value = exportValue;
            selectElement.insertBefore(optionElement, selectElement.children[index]);
            storage.setValue(id, this.data.fieldName, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          items(event) {
            const {
              items
            } = event.detail;

            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            for (const item of items) {
              const {
                displayValue,
                exportValue
              } = item;
              const optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.appendChild(optionElement);
            }

            if (selectElement.options.length > 0) {
              selectElement.options[0].selected = true;
            }

            storage.setValue(id, this.data.fieldName, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          indices(event) {
            const indices = new Set(event.detail.indices);

            for (const option of event.target.options) {
              option.selected = indices.has(option.index);
            }

            storage.setValue(id, this.data.fieldName, {
              value: getValue(event, true)
            });
          },

          editable(event) {
            event.target.disabled = !event.detail.editable;
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      selectElement.addEventListener("input", event => {
        var _this$linkService$eve8;

        const exportValue = getValue(event, true);
        const value = getValue(event, false);
        storage.setValue(id, this.data.fieldName, {
          value: exportValue
        });
        (_this$linkService$eve8 = this.linkService.eventBus) === null || _this$linkService$eve8 === void 0 ? void 0 : _this$linkService$eve8.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id,
            name: "Keystroke",
            value,
            changeEx: exportValue,
            willCommit: true,
            commitKey: 1,
            keyDown: false
          }
        });
      });

      this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], event => event.target.checked);
    } else {
      selectElement.addEventListener("input", event => {
        storage.setValue(id, this.data.fieldName, {
          value: getValue(event),
          radioValue: getValue(event, true)
        });
      });
    }

    this._setBackgroundColor(selectElement);

    this.container.appendChild(selectElement);
    return this.container;
  }

}

class PopupAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl2, _parameters$data$cont2, _parameters$data$rich2;

    const isRenderable = !!((_parameters$data$titl2 = parameters.data.titleObj) !== null && _parameters$data$titl2 !== void 0 && _parameters$data$titl2.str || (_parameters$data$cont2 = parameters.data.contentsObj) !== null && _parameters$data$cont2 !== void 0 && _parameters$data$cont2.str || (_parameters$data$rich2 = parameters.data.richText) !== null && _parameters$data$rich2 !== void 0 && _parameters$data$rich2.str);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    const IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
    this.container.className = "popupAnnotation";

    if (IGNORE_TYPES.includes(this.data.parentType)) {
      return this.container;
    }

    const selector = "[data-annotation-id=\"".concat(this.data.parentId, "\"]");
    const parentElements = this.layer.querySelectorAll(selector);

    if (parentElements.length === 0) {
      return this.container;
    }

    const popup = new PopupElement({
      container: this.container,
      trigger: Array.from(parentElements),
      color: this.data.color,
      titleObj: this.data.titleObj,
      modificationDate: this.data.modificationDate,
      contentsObj: this.data.contentsObj,
      richText: this.data.richText
    });
    const page = this.page;

    const rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

    const popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
    const popupTop = rect[1];
    this.container.style.transformOrigin = "".concat(-popupLeft, "px ").concat(-popupTop, "px");
    this.container.style.left = "".concat(popupLeft, "px");
    this.container.style.top = "".concat(popupTop, "px");
    this.container.appendChild(popup.render());
    return this.container;
  }

}

class PopupElement {
  constructor(parameters) {
    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.titleObj = parameters.titleObj;
    this.modificationDate = parameters.modificationDate;
    this.contentsObj = parameters.contentsObj;
    this.richText = parameters.richText;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  render() {
    var _this$richText, _this$contentsObj;

    const BACKGROUND_ENLIGHT = 0.7;
    const wrapper = document.createElement("div");
    wrapper.className = "popupWrapper";
    this.hideElement = this.hideWrapper ? wrapper : this.container;
    this.hideElement.hidden = true;
    const popup = document.createElement("div");
    popup.className = "popup";
    const color = this.color;

    if (color) {
      const r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
      const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
      const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
      popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
    }

    const title = document.createElement("h1");
    title.dir = this.titleObj.dir;
    title.textContent = this.titleObj.str;
    popup.appendChild(title);

    const dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

    if (dateObject) {
      const modificationDate = document.createElement("span");
      modificationDate.className = "popupDate";
      modificationDate.textContent = "{{date}}, {{time}}";
      modificationDate.dataset.l10nId = "annotation_date_string";
      modificationDate.dataset.l10nArgs = JSON.stringify({
        date: dateObject.toLocaleDateString(),
        time: dateObject.toLocaleTimeString()
      });
      popup.appendChild(modificationDate);
    }

    if ((_this$richText = this.richText) !== null && _this$richText !== void 0 && _this$richText.str && (!((_this$contentsObj = this.contentsObj) !== null && _this$contentsObj !== void 0 && _this$contentsObj.str) || this.contentsObj.str === this.richText.str)) {
      _xfa_layer.XfaLayer.render({
        xfaHtml: this.richText.html,
        intent: "richText",
        div: popup
      });

      popup.lastChild.className = "richText popupContent";
    } else {
      const contents = this._formatContents(this.contentsObj);

      popup.appendChild(contents);
    }

    if (!Array.isArray(this.trigger)) {
      this.trigger = [this.trigger];
    }

    for (const element of this.trigger) {
      element.addEventListener("click", this._toggle.bind(this));
      element.addEventListener("mouseover", this._show.bind(this, false));
      element.addEventListener("mouseout", this._hide.bind(this, false));
    }

    popup.addEventListener("click", this._hide.bind(this, true));
    wrapper.appendChild(popup);
    return wrapper;
  }

  _formatContents(_ref) {
    let {
      str,
      dir
    } = _ref;
    const p = document.createElement("p");
    p.className = "popupContent";
    p.dir = dir;
    const lines = str.split(/(?:\r\n?|\n)/);

    for (let i = 0, ii = lines.length; i < ii; ++i) {
      const line = lines[i];
      p.appendChild(document.createTextNode(line));

      if (i < ii - 1) {
        p.appendChild(document.createElement("br"));
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

  _show() {
    let pin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (pin) {
      this.pinned = true;
    }

    if (this.hideElement.hidden) {
      this.hideElement.hidden = false;
      this.container.style.zIndex += 1;
    }
  }

  _hide() {
    let unpin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (unpin) {
      this.pinned = false;
    }

    if (!this.hideElement.hidden && !this.pinned) {
      this.hideElement.hidden = true;
      this.container.style.zIndex -= 1;
    }
  }

}

class FreeTextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl3, _parameters$data$cont3, _parameters$data$rich3;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl3 = parameters.data.titleObj) !== null && _parameters$data$titl3 !== void 0 && _parameters$data$titl3.str || (_parameters$data$cont3 = parameters.data.contentsObj) !== null && _parameters$data$cont3 !== void 0 && _parameters$data$cont3.str || (_parameters$data$rich3 = parameters.data.richText) !== null && _parameters$data$rich3 !== void 0 && _parameters$data$rich3.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "freeTextAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class LineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl4, _parameters$data$cont4, _parameters$data$rich4;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl4 = parameters.data.titleObj) !== null && _parameters$data$titl4 !== void 0 && _parameters$data$titl4.str || (_parameters$data$cont4 = parameters.data.contentsObj) !== null && _parameters$data$cont4 !== void 0 && _parameters$data$cont4.str || (_parameters$data$rich4 = parameters.data.richText) !== null && _parameters$data$rich4 !== void 0 && _parameters$data$rich4.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "lineAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const line = this.svgFactory.createElement("svg:line");
    line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
    line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
    line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
    line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
    line.setAttribute("stroke-width", data.borderStyle.width || 1);
    line.setAttribute("stroke", "transparent");
    line.setAttribute("fill", "transparent");
    svg.appendChild(line);
    this.container.append(svg);

    this._createPopup(line, data);

    return this.container;
  }

}

class SquareAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl5, _parameters$data$cont5, _parameters$data$rich5;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl5 = parameters.data.titleObj) !== null && _parameters$data$titl5 !== void 0 && _parameters$data$titl5.str || (_parameters$data$cont5 = parameters.data.contentsObj) !== null && _parameters$data$cont5 !== void 0 && _parameters$data$cont5.str || (_parameters$data$rich5 = parameters.data.richText) !== null && _parameters$data$rich5 !== void 0 && _parameters$data$rich5.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "squareAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const square = this.svgFactory.createElement("svg:rect");
    square.setAttribute("x", borderWidth / 2);
    square.setAttribute("y", borderWidth / 2);
    square.setAttribute("width", width - borderWidth);
    square.setAttribute("height", height - borderWidth);
    square.setAttribute("stroke-width", borderWidth || 1);
    square.setAttribute("stroke", "transparent");
    square.setAttribute("fill", "transparent");
    svg.appendChild(square);
    this.container.append(svg);

    this._createPopup(square, data);

    return this.container;
  }

}

class CircleAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl6, _parameters$data$cont6, _parameters$data$rich6;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl6 = parameters.data.titleObj) !== null && _parameters$data$titl6 !== void 0 && _parameters$data$titl6.str || (_parameters$data$cont6 = parameters.data.contentsObj) !== null && _parameters$data$cont6 !== void 0 && _parameters$data$cont6.str || (_parameters$data$rich6 = parameters.data.richText) !== null && _parameters$data$rich6 !== void 0 && _parameters$data$rich6.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "circleAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const circle = this.svgFactory.createElement("svg:ellipse");
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("rx", width / 2 - borderWidth / 2);
    circle.setAttribute("ry", height / 2 - borderWidth / 2);
    circle.setAttribute("stroke-width", borderWidth || 1);
    circle.setAttribute("stroke", "transparent");
    circle.setAttribute("fill", "transparent");
    svg.appendChild(circle);
    this.container.append(svg);

    this._createPopup(circle, data);

    return this.container;
  }

}

class PolylineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl7, _parameters$data$cont7, _parameters$data$rich7;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl7 = parameters.data.titleObj) !== null && _parameters$data$titl7 !== void 0 && _parameters$data$titl7.str || (_parameters$data$cont7 = parameters.data.contentsObj) !== null && _parameters$data$cont7 !== void 0 && _parameters$data$cont7.str || (_parameters$data$rich7 = parameters.data.richText) !== null && _parameters$data$rich7 !== void 0 && _parameters$data$rich7.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "polylineAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    let points = [];

    for (const coordinate of data.vertices) {
      const x = coordinate.x - data.rect[0];
      const y = data.rect[3] - coordinate.y;
      points.push(x + "," + y);
    }

    points = points.join(" ");
    const polyline = this.svgFactory.createElement(this.svgElementName);
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("fill", "transparent");
    svg.appendChild(polyline);
    this.container.append(svg);

    this._createPopup(polyline, data);

    return this.container;
  }

}

class PolygonAnnotationElement extends PolylineAnnotationElement {
  constructor(parameters) {
    super(parameters);
    this.containerClassName = "polygonAnnotation";
    this.svgElementName = "svg:polygon";
  }

}

class CaretAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl8, _parameters$data$cont8, _parameters$data$rich8;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl8 = parameters.data.titleObj) !== null && _parameters$data$titl8 !== void 0 && _parameters$data$titl8.str || (_parameters$data$cont8 = parameters.data.contentsObj) !== null && _parameters$data$cont8 !== void 0 && _parameters$data$cont8.str || (_parameters$data$rich8 = parameters.data.richText) !== null && _parameters$data$rich8 !== void 0 && _parameters$data$rich8.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "caretAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class InkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl9, _parameters$data$cont9, _parameters$data$rich9;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl9 = parameters.data.titleObj) !== null && _parameters$data$titl9 !== void 0 && _parameters$data$titl9.str || (_parameters$data$cont9 = parameters.data.contentsObj) !== null && _parameters$data$cont9 !== void 0 && _parameters$data$cont9.str || (_parameters$data$rich9 = parameters.data.richText) !== null && _parameters$data$rich9 !== void 0 && _parameters$data$rich9.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "inkAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);

    for (const inkList of data.inkLists) {
      let points = [];

      for (const coordinate of inkList) {
        const x = coordinate.x - data.rect[0];
        const y = data.rect[3] - coordinate.y;
        points.push("".concat(x, ",").concat(y));
      }

      points = points.join(" ");
      const polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "transparent");

      this._createPopup(polyline, data);

      svg.appendChild(polyline);
    }

    this.container.append(svg);
    return this.container;
  }

}

class HighlightAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl10, _parameters$data$cont10, _parameters$data$rich10;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl10 = parameters.data.titleObj) !== null && _parameters$data$titl10 !== void 0 && _parameters$data$titl10.str || (_parameters$data$cont10 = parameters.data.contentsObj) !== null && _parameters$data$cont10 !== void 0 && _parameters$data$cont10.str || (_parameters$data$rich10 = parameters.data.richText) !== null && _parameters$data$rich10 !== void 0 && _parameters$data$rich10.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("highlightAnnotation");
    }

    this.container.className = "highlightAnnotation";
    return this.container;
  }

}

class UnderlineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl11, _parameters$data$cont11, _parameters$data$rich11;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl11 = parameters.data.titleObj) !== null && _parameters$data$titl11 !== void 0 && _parameters$data$titl11.str || (_parameters$data$cont11 = parameters.data.contentsObj) !== null && _parameters$data$cont11 !== void 0 && _parameters$data$cont11.str || (_parameters$data$rich11 = parameters.data.richText) !== null && _parameters$data$rich11 !== void 0 && _parameters$data$rich11.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("underlineAnnotation");
    }

    this.container.className = "underlineAnnotation";
    return this.container;
  }

}

class SquigglyAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl12, _parameters$data$cont12, _parameters$data$rich12;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl12 = parameters.data.titleObj) !== null && _parameters$data$titl12 !== void 0 && _parameters$data$titl12.str || (_parameters$data$cont12 = parameters.data.contentsObj) !== null && _parameters$data$cont12 !== void 0 && _parameters$data$cont12.str || (_parameters$data$rich12 = parameters.data.richText) !== null && _parameters$data$rich12 !== void 0 && _parameters$data$rich12.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("squigglyAnnotation");
    }

    this.container.className = "squigglyAnnotation";
    return this.container;
  }

}

class StrikeOutAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl13, _parameters$data$cont13, _parameters$data$rich13;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl13 = parameters.data.titleObj) !== null && _parameters$data$titl13 !== void 0 && _parameters$data$titl13.str || (_parameters$data$cont13 = parameters.data.contentsObj) !== null && _parameters$data$cont13 !== void 0 && _parameters$data$cont13.str || (_parameters$data$rich13 = parameters.data.richText) !== null && _parameters$data$rich13 !== void 0 && _parameters$data$rich13.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("strikeoutAnnotation");
    }

    this.container.className = "strikeoutAnnotation";
    return this.container;
  }

}

class StampAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _parameters$data$titl14, _parameters$data$cont14, _parameters$data$rich14;

    const isRenderable = !!(parameters.data.hasPopup || (_parameters$data$titl14 = parameters.data.titleObj) !== null && _parameters$data$titl14 !== void 0 && _parameters$data$titl14.str || (_parameters$data$cont14 = parameters.data.contentsObj) !== null && _parameters$data$cont14 !== void 0 && _parameters$data$cont14.str || (_parameters$data$rich14 = parameters.data.richText) !== null && _parameters$data$rich14 !== void 0 && _parameters$data$rich14.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "stampAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class FileAttachmentAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    var _this$linkService$eve9;

    super(parameters, {
      isRenderable: true
    });
    const {
      filename,
      content
    } = this.data.file;
    this.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    this.content = content;
    (_this$linkService$eve9 = this.linkService.eventBus) === null || _this$linkService$eve9 === void 0 ? void 0 : _this$linkService$eve9.dispatch("fileattachmentannotation", {
      source: this,
      id: (0, _util.stringToPDFString)(filename),
      filename,
      content
    });
  }

  render() {
    var _this$data$titleObj, _this$data$contentsOb;

    this.container.className = "fileAttachmentAnnotation";
    const trigger = document.createElement("div");
    trigger.style.height = this.container.style.height;
    trigger.style.width = this.container.style.width;
    trigger.addEventListener("dblclick", this._download.bind(this));

    if (!this.data.hasPopup && ((_this$data$titleObj = this.data.titleObj) !== null && _this$data$titleObj !== void 0 && _this$data$titleObj.str || (_this$data$contentsOb = this.data.contentsObj) !== null && _this$data$contentsOb !== void 0 && _this$data$contentsOb.str || this.data.richText)) {
      this._createPopup(trigger, this.data);
    }

    this.container.appendChild(trigger);
    return this.container;
  }

  _download() {
    var _this$downloadManager;

    (_this$downloadManager = this.downloadManager) === null || _this$downloadManager === void 0 ? void 0 : _this$downloadManager.openOrDownloadData(this.container, this.content, this.filename);
  }

}

class AnnotationLayer {
  static render(parameters) {
    const sortedAnnotations = [],
          popupAnnotations = [];

    for (const data of parameters.annotations) {
      if (!data) {
        continue;
      }

      const {
        width,
        height
      } = getRectDims(data.rect);

      if (width <= 0 || height <= 0) {
        continue;
      }

      if (data.annotationType === _util.AnnotationType.POPUP) {
        popupAnnotations.push(data);
        continue;
      }

      sortedAnnotations.push(data);
    }

    if (popupAnnotations.length) {
      sortedAnnotations.push(...popupAnnotations);
    }

    if (window.registerAcroformAnnotations) {
      window.registerAcroformAnnotations(sortedAnnotations);
    }

    const div = parameters.div;

    for (const data of sortedAnnotations) {
      const element = AnnotationElementFactory.create({
        data,
        layer: div,
        page: parameters.page,
        viewport: parameters.viewport,
        linkService: parameters.linkService,
        downloadManager: parameters.downloadManager,
        imageResourcesPath: parameters.imageResourcesPath || "",
        renderForms: parameters.renderForms !== false,
        svgFactory: new _display_utils.DOMSVGFactory(),
        annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
        enableScripting: parameters.enableScripting,
        hasJSActions: parameters.hasJSActions,
        fieldObjects: parameters.fieldObjects,
        mouseState: parameters.mouseState || {
          isDown: false
        }
      });

      if (element.isRenderable) {
        const rendered = element.render();

        if (data.hidden) {
          rendered.style.visibility = "hidden";
        }

        if (Array.isArray(rendered)) {
          for (const renderedElement of rendered) {
            div.appendChild(renderedElement);
          }
        } else {
          if (element instanceof PopupAnnotationElement) {
            div.prepend(rendered);
          } else {
            div.appendChild(rendered);
          }
        }
      }
    }

    _classStaticPrivateMethodGet(this, AnnotationLayer, _setAnnotationCanvasMap).call(this, div, parameters.annotationCanvasMap);
  }

  static update(parameters) {
    const {
      page,
      viewport,
      annotations,
      annotationCanvasMap,
      div
    } = parameters;
    const transform = viewport.transform;
    const matrix = "matrix(".concat(transform.join(","), ")");
    let scale, ownMatrix;

    for (const data of annotations) {
      const elements = div.querySelectorAll("[data-annotation-id=\"".concat(data.id, "\"]"));

      if (elements) {
        for (const element of elements) {
          if (data.hasOwnCanvas) {
            const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

            if (!ownMatrix) {
              scale = Math.abs(transform[0] || transform[1]);
              const ownTransform = transform.slice();

              for (let i = 0; i < 4; i++) {
                ownTransform[i] = Math.sign(ownTransform[i]);
              }

              ownMatrix = "matrix(".concat(ownTransform.join(","), ")");
            }

            const left = rect[0] * scale;
            const top = rect[1] * scale;
            element.style.left = "".concat(left, "px");
            element.style.top = "".concat(top, "px");
            element.style.transformOrigin = "".concat(-left, "px ").concat(-top, "px");
            element.style.transform = ownMatrix;
          } else {
            element.style.transform = matrix;
          }
        }
      }
    }

    _classStaticPrivateMethodGet(this, AnnotationLayer, _setAnnotationCanvasMap).call(this, div, annotationCanvasMap);

    div.hidden = false;
  }

}

exports.AnnotationLayer = AnnotationLayer;

function _setAnnotationCanvasMap(div, annotationCanvasMap) {
  if (!annotationCanvasMap) {
    return;
  }

  for (const [id, canvas] of annotationCanvasMap) {
    const element = div.querySelector("[data-annotation-id=\"".concat(id, "\"]"));

    if (!element) {
      continue;
    }

    const {
      firstChild
    } = element;

    if (firstChild.nodeName === "CANVAS") {
      element.replaceChild(canvas, firstChild);
    } else {
      element.insertBefore(canvas, firstChild);
    }
  }

  annotationCanvasMap.clear();
}

/***/ }),
/* 211 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ColorConverters = void 0;

__w_pdfjs_require__(2);

function makeColorComp(n) {
  return Math.floor(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
}

class ColorConverters {
  static CMYK_G(_ref) {
    let [c, y, m, k] = _ref;
    return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k)];
  }

  static G_CMYK(_ref2) {
    let [g] = _ref2;
    return ["CMYK", 0, 0, 0, 1 - g];
  }

  static G_RGB(_ref3) {
    let [g] = _ref3;
    return ["RGB", g, g, g];
  }

  static G_HTML(_ref4) {
    let [g] = _ref4;
    const G = makeColorComp(g);
    return "#".concat(G).concat(G).concat(G);
  }

  static RGB_G(_ref5) {
    let [r, g, b] = _ref5;
    return ["G", 0.3 * r + 0.59 * g + 0.11 * b];
  }

  static RGB_HTML(_ref6) {
    let [r, g, b] = _ref6;
    const R = makeColorComp(r);
    const G = makeColorComp(g);
    const B = makeColorComp(b);
    return "#".concat(R).concat(G).concat(B);
  }

  static T_HTML() {
    return "#00000000";
  }

  static CMYK_RGB(_ref7) {
    let [c, y, m, k] = _ref7;
    return ["RGB", 1 - Math.min(1, c + k), 1 - Math.min(1, m + k), 1 - Math.min(1, y + k)];
  }

  static CMYK_HTML(components) {
    return this.RGB_HTML(this.CMYK_RGB(components));
  }

  static RGB_CMYK(_ref8) {
    let [r, g, b] = _ref8;
    const c = 1 - r;
    const m = 1 - g;
    const y = 1 - b;
    const k = Math.min(c, m, y);
    return ["CMYK", c, m, y, k];
  }

}

exports.ColorConverters = ColorConverters;

/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XfaLayer = void 0;

__w_pdfjs_require__(2);

var _util = __w_pdfjs_require__(1);

var _xfa_text = __w_pdfjs_require__(209);

class XfaLayer {
  static setupStorage(html, id, element, storage, intent) {
    const storedData = storage.getValue(id, {
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

        html.addEventListener("input", event => {
          storage.setValue(id, {
            value: event.target.value
          });
        });
        break;

      case "input":
        if (element.attributes.type === "radio" || element.attributes.type === "checkbox") {
          if (storedData.value === element.attributes.xfaOn) {
            html.setAttribute("checked", true);
          } else if (storedData.value === element.attributes.xfaOff) {
            html.removeAttribute("checked");
          }

          if (intent === "print") {
            break;
          }

          html.addEventListener("change", event => {
            storage.setValue(id, {
              value: event.target.checked ? event.target.getAttribute("xfaOn") : event.target.getAttribute("xfaOff")
            });
          });
        } else {
          if (storedData.value !== null) {
            html.setAttribute("value", storedData.value);
          }

          if (intent === "print") {
            break;
          }

          html.addEventListener("input", event => {
            storage.setValue(id, {
              value: event.target.value
            });
          });
        }

        break;

      case "select":
        if (storedData.value !== null) {
          for (const option of element.children) {
            if (option.attributes.value === storedData.value) {
              option.attributes.selected = true;
            }
          }
        }

        html.addEventListener("input", event => {
          const options = event.target.options;
          const value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
          storage.setValue(id, {
            value
          });
        });
        break;
    }
  }

  static setAttributes(_ref) {
    let {
      html,
      element,
      storage = null,
      intent,
      linkService
    } = _ref;
    const {
      attributes
    } = element;
    const isHTMLAnchorElement = html instanceof HTMLAnchorElement;

    if (attributes.type === "radio") {
      attributes.name = "".concat(attributes.name, "-").concat(intent);
    }

    for (const [key, value] of Object.entries(attributes)) {
      if (value === null || value === undefined || key === "dataId") {
        continue;
      }

      if (key !== "style") {
        if (key === "textContent") {
          html.textContent = value;
        } else if (key === "class") {
          if (value.length) {
            html.setAttribute(key, value.join(" "));
          }
        } else {
          if (isHTMLAnchorElement && (key === "href" || key === "newWindow")) {
            continue;
          }

          html.setAttribute(key, value);
        }
      } else {
        Object.assign(html.style, value);
      }
    }

    if (isHTMLAnchorElement) {
      var _linkService$addLinkA;

      if (!linkService.addLinkAttributes) {
        (0, _util.warn)("XfaLayer.setAttribute - missing `addLinkAttributes`-method on the `linkService`-instance.");
      }

      (_linkService$addLinkA = linkService.addLinkAttributes) === null || _linkService$addLinkA === void 0 ? void 0 : _linkService$addLinkA.call(linkService, html, attributes.href, attributes.newWindow);
    }

    if (storage && attributes.dataId) {
      this.setupStorage(html, attributes.dataId, element, storage);
    }
  }

  static render(parameters) {
    const storage = parameters.annotationStorage;
    const linkService = parameters.linkService;
    const root = parameters.xfaHtml;
    const intent = parameters.intent || "display";
    const rootHtml = document.createElement(root.name);

    if (root.attributes) {
      this.setAttributes({
        html: rootHtml,
        element: root,
        intent,
        linkService
      });
    }

    const stack = [[root, -1, rootHtml]];
    const rootDiv = parameters.div;
    rootDiv.appendChild(rootHtml);

    if (parameters.viewport) {
      const transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
      rootDiv.style.transform = transform;
    }

    if (intent !== "richText") {
      rootDiv.setAttribute("class", "xfaLayer xfaFont");
    }

    const textDivs = [];

    while (stack.length > 0) {
      var _child$attributes;

      const [parent, i, html] = stack[stack.length - 1];

      if (i + 1 === parent.children.length) {
        stack.pop();
        continue;
      }

      const child = parent.children[++stack[stack.length - 1][1]];

      if (child === null) {
        continue;
      }

      const {
        name
      } = child;

      if (name === "#text") {
        const node = document.createTextNode(child.value);
        textDivs.push(node);
        html.appendChild(node);
        continue;
      }

      let childHtml;

      if (child !== null && child !== void 0 && (_child$attributes = child.attributes) !== null && _child$attributes !== void 0 && _child$attributes.xmlns) {
        childHtml = document.createElementNS(child.attributes.xmlns, name);
      } else {
        childHtml = document.createElement(name);
      }

      html.appendChild(childHtml);

      if (child.attributes) {
        this.setAttributes({
          html: childHtml,
          element: child,
          storage,
          intent,
          linkService
        });
      }

      if (child.children && child.children.length > 0) {
        stack.push([child, -1, childHtml]);
      } else if (child.value) {
        const node = document.createTextNode(child.value);

        if (_xfa_text.XfaText.shouldBuildText(name)) {
          textDivs.push(node);
        }

        childHtml.appendChild(node);
      }
    }

    for (const el of rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")) {
      el.setAttribute("readOnly", true);
    }

    return {
      textDivs
    };
  }

  static update(parameters) {
    const transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");
    parameters.div.style.transform = transform;
    parameters.div.hidden = false;
  }

}

exports.XfaLayer = XfaLayer;

/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderTextLayer = renderTextLayer;

__w_pdfjs_require__(2);

__w_pdfjs_require__(201);

__w_pdfjs_require__(106);

__w_pdfjs_require__(164);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(145);

__w_pdfjs_require__(177);

var _util = __w_pdfjs_require__(1);

const MAX_TEXT_DIVS_TO_RENDER = 100000;
const DEFAULT_FONT_SIZE = 30;
const DEFAULT_FONT_ASCENT = 0.8;
const ascentCache = new Map();
const AllWhitespaceRegexp = /^\s+$/g;

function getAscent(fontFamily, ctx) {
  const cachedAscent = ascentCache.get(fontFamily);

  if (cachedAscent) {
    return cachedAscent;
  }

  ctx.save();
  ctx.font = "".concat(DEFAULT_FONT_SIZE, "px ").concat(fontFamily);
  const metrics = ctx.measureText("");
  let ascent = metrics === null || metrics === void 0 ? void 0 : metrics.fontBoundingBoxAscent;
  let descent = Math.abs(metrics === null || metrics === void 0 ? void 0 : metrics.fontBoundingBoxDescent);

  if (ascent) {
    ctx.restore();
    const ratio = ascent / (ascent + descent);
    ascentCache.set(fontFamily, ratio);
    return ratio;
  }

  ctx.strokeStyle = "red";
  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("g", 0, 0);
  let pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  descent = 0;

  for (let i = pixels.length - 1 - 3; i >= 0; i -= 4) {
    if (pixels[i] > 0) {
      descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
  ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
  pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
  ascent = 0;

  for (let i = 0, ii = pixels.length; i < ii; i += 4) {
    if (pixels[i] > 0) {
      ascent = DEFAULT_FONT_SIZE - Math.floor(i / 4 / DEFAULT_FONT_SIZE);
      break;
    }
  }

  ctx.restore();

  if (ascent) {
    const ratio = ascent / (ascent + descent);
    ascentCache.set(fontFamily, ratio);
    return ratio;
  }

  ascentCache.set(fontFamily, DEFAULT_FONT_ASCENT);
  return DEFAULT_FONT_ASCENT;
}

function appendText(task, geom, styles, ctx) {
  const textDiv = document.createElement("span");
  const textDivProperties = task._enhanceTextSelection ? {
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
  } : {
    angle: 0,
    canvasWidth: 0,
    hasText: geom.str !== "",
    hasEOL: geom.hasEOL
  };

  task._textDivs.push(textDiv);

  const tx = _util.Util.transform(task._viewport.transform, geom.transform);

  let angle = Math.atan2(tx[1], tx[0]);
  const style = styles[geom.fontName];

  if (style.vertical) {
    angle += Math.PI / 2;
  }

  const fontHeight = Math.hypot(tx[2], tx[3]);
  const fontAscent = fontHeight * getAscent(style.fontFamily, ctx);
  let left, top;

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

  let shouldScaleText = false;

  if (geom.str.length > 1 || task._enhanceTextSelection && AllWhitespaceRegexp.test(geom.str)) {
    shouldScaleText = true;
  } else if (geom.str !== " " && geom.transform[0] !== geom.transform[3]) {
    const absScaleX = Math.abs(geom.transform[0]),
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
    let angleCos = 1,
        angleSin = 0;

    if (angle !== 0) {
      angleCos = Math.cos(angle);
      angleSin = Math.sin(angle);
    }

    const divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
    const divHeight = fontHeight;
    let m, b;

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

  const textDivs = task._textDivs;
  const capability = task._capability;
  const textDivsLength = textDivs.length;

  if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
    task._renderingDone = true;
    capability.resolve();
    return;
  }

  if (!task._textContentStream) {
    for (let i = 0; i < textDivsLength; i++) {
      task._layoutText(textDivs[i]);
    }
  }

  task._renderingDone = true;
  capability.resolve();
}

function findPositiveMin(ts, offset, count) {
  let result = 0;

  for (let i = 0; i < count; i++) {
    const t = ts[offset++];

    if (t > 0) {
      result = result ? Math.min(t, result) : t;
    }
  }

  return result;
}

function expand(task) {
  const bounds = task._bounds;
  const viewport = task._viewport;
  const expanded = expandBounds(viewport.width, viewport.height, bounds);

  for (let i = 0; i < expanded.length; i++) {
    const div = bounds[i].div;

    const divProperties = task._textDivProperties.get(div);

    if (divProperties.angle === 0) {
      divProperties.paddingLeft = bounds[i].left - expanded[i].left;
      divProperties.paddingTop = bounds[i].top - expanded[i].top;
      divProperties.paddingRight = expanded[i].right - bounds[i].right;
      divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;

      task._textDivProperties.set(div, divProperties);

      continue;
    }

    const e = expanded[i],
          b = bounds[i];
    const m = b.m,
          c = m[0],
          s = m[1];
    const points = [[0, 0], [0, b.size[1]], [b.size[0], 0], b.size];
    const ts = new Float64Array(64);

    for (let j = 0, jj = points.length; j < jj; j++) {
      const t = _util.Util.applyTransform(points[j], m);

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

    const boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
    divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
    divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
    divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
    divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;

    task._textDivProperties.set(div, divProperties);
  }
}

function expandBounds(width, height, boxes) {
  const bounds = boxes.map(function (box, i) {
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
  const expanded = new Array(boxes.length);

  for (const b of bounds) {
    const i = b.index;
    expanded[i] = {
      left: b.x1New,
      top: 0,
      right: b.x2New,
      bottom: 0
    };
  }

  boxes.map(function (box, i) {
    const e = expanded[i],
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

  for (const b of bounds) {
    const i = b.index;
    expanded[i].top = b.x1New;
    expanded[i].bottom = b.x2New;
  }

  return expanded;
}

function expandBoundsLTR(width, bounds) {
  bounds.sort(function (a, b) {
    return a.x1 - b.x1 || a.index - b.index;
  });
  const fakeBoundary = {
    x1: -Infinity,
    y1: -Infinity,
    x2: 0,
    y2: Infinity,
    index: -1,
    x1New: 0,
    x2New: 0
  };
  const horizon = [{
    start: -Infinity,
    end: Infinity,
    boundary: fakeBoundary
  }];

  for (const boundary of bounds) {
    let i = 0;

    while (i < horizon.length && horizon[i].end <= boundary.y1) {
      i++;
    }

    let j = horizon.length - 1;

    while (j >= 0 && horizon[j].start >= boundary.y2) {
      j--;
    }

    let horizonPart, affectedBoundary;
    let q,
        k,
        maxXNew = -Infinity;

    for (q = i; q <= j; q++) {
      horizonPart = horizon[q];
      affectedBoundary = horizonPart.boundary;
      let xNew;

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

    const changedHorizon = [];
    let lastBoundary = null;

    for (q = i; q <= j; q++) {
      horizonPart = horizon[q];
      affectedBoundary = horizonPart.boundary;
      const useBoundary = affectedBoundary.x2 > boundary.x2 ? affectedBoundary : boundary;

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

      let used = false;

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
  }

  for (const horizonPart of horizon) {
    const affectedBoundary = horizonPart.boundary;

    if (affectedBoundary.x2New === undefined) {
      affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
    }
  }
}

class TextLayerRenderTask {
  constructor(_ref) {
    var _globalThis$FontInspe;

    let {
      textContent,
      textContentStream,
      container,
      viewport,
      textDivs,
      textContentItemsStr,
      enhanceTextSelection
    } = _ref;
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

    this._capability.promise.finally(() => {
      if (!this._enhanceTextSelection) {
        this._textDivProperties = null;
      }

      if (this._layoutTextCtx) {
        this._layoutTextCtx.canvas.width = 0;
        this._layoutTextCtx.canvas.height = 0;
        this._layoutTextCtx = null;
      }
    }).catch(() => {});
  }

  get promise() {
    return this._capability.promise;
  }

  cancel() {
    this._canceled = true;

    if (this._reader) {
      this._reader.cancel(new _util.AbortException("TextLayer task cancelled.")).catch(() => {});

      this._reader = null;
    }

    if (this._renderTimer !== null) {
      clearTimeout(this._renderTimer);
      this._renderTimer = null;
    }

    this._capability.reject(new Error("TextLayer task cancelled."));
  }

  _processItems(items, styleCache) {
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i].str === undefined) {
        if (items[i].type === "beginMarkedContentProps" || items[i].type === "beginMarkedContent") {
          const parent = this._container;
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

  _layoutText(textDiv) {
    const textDivProperties = this._textDivProperties.get(textDiv);

    let transform = "";

    if (textDivProperties.canvasWidth !== 0 && textDivProperties.hasText) {
      const {
        fontSize,
        fontFamily
      } = textDiv.style;

      if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
        this._layoutTextCtx.font = "".concat(fontSize, " ").concat(fontFamily);
        this._layoutTextLastFontSize = fontSize;
        this._layoutTextLastFontFamily = fontFamily;
      }

      try {
        const {
          width
        } = this._layoutTextCtx.measureText(textDiv.textContent);

        if (width > 0) {
          textDivProperties.scale = textDivProperties.canvasWidth / width;
          const scale = textDivProperties.canvasWidth / width;

          if (this._enhanceTextSelection) {
            textDivProperties.scale = scale;
          }

          transform = "scaleX(".concat(scale, ")");
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
      const br = document.createElement("br");
      br.setAttribute("role", "presentation");

      this._container.appendChild(br);
    }
  }

  _render() {
    let timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const capability = (0, _util.createPromiseCapability)();
    let styleCache = Object.create(null);

    const canvas = this._document.createElement("canvas");

    canvas.height = canvas.width = DEFAULT_FONT_SIZE;
    canvas.mozOpaque = true;
    this._layoutTextCtx = canvas.getContext("2d", {
      alpha: false
    });

    if (this._textContent) {
      const textItems = this._textContent.items;
      const textStyles = this._textContent.styles;

      this._processItems(textItems, textStyles);

      capability.resolve();
    } else if (this._textContentStream) {
      const pump = () => {
        this._reader.read().then(_ref2 => {
          let {
            value,
            done
          } = _ref2;

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
      throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
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
  }

  expandTextDivs() {
    let expandDivs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this._enhanceTextSelection || !this._renderingDone) {
      return;
    }

    if (this._bounds !== null) {
      expand(this);
      this._bounds = null;
    }

    const transformBuf = [],
          paddingBuf = [];

    for (let i = 0, ii = this._textDivs.length; i < ii; i++) {
      const div = this._textDivs[i];

      const divProps = this._textDivProperties.get(div);

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

}

function renderTextLayer(renderParameters) {
  const task = new TextLayerRenderTask({
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
/* 214 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SVGGraphics = void 0;

__w_pdfjs_require__(2);

__w_pdfjs_require__(82);

__w_pdfjs_require__(103);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(200);

__w_pdfjs_require__(145);

__w_pdfjs_require__(201);

var _util = __w_pdfjs_require__(1);

var _display_utils = __w_pdfjs_require__(191);

let SVGGraphics = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: SVGGraphics");
  }

};
exports.SVGGraphics = SVGGraphics;
{
  const SVG_DEFAULTS = {
    fontStyle: "normal",
    fontWeight: "normal",
    fillColor: "#000000"
  };
  const XML_NS = "http://www.w3.org/XML/1998/namespace";
  const XLINK_NS = "http://www.w3.org/1999/xlink";
  const LINE_CAP_STYLES = ["butt", "round", "square"];
  const LINE_JOIN_STYLES = ["miter", "round", "bevel"];

  const createObjectURL = function (data) {
    let contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (URL.createObjectURL && typeof Blob !== "undefined" && !forceDataSchema) {
      return URL.createObjectURL(new Blob([data], {
        type: contentType
      }));
    }

    const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let buffer = "data:".concat(contentType, ";base64,");

    for (let i = 0, ii = data.length; i < ii; i += 3) {
      const b1 = data[i] & 0xff;
      const b2 = data[i + 1] & 0xff;
      const b3 = data[i + 2] & 0xff;
      const d1 = b1 >> 2,
            d2 = (b1 & 3) << 4 | b2 >> 4;
      const d3 = i + 1 < ii ? (b2 & 0xf) << 2 | b3 >> 6 : 64;
      const d4 = i + 2 < ii ? b3 & 0x3f : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }

    return buffer;
  };

  const convertImgDataToPng = function () {
    const PNG_HEADER = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const CHUNK_WRAPPER_SIZE = 12;
    const crcTable = new Int32Array(256);

    for (let i = 0; i < 256; i++) {
      let c = i;

      for (let h = 0; h < 8; h++) {
        if (c & 1) {
          c = 0xedb88320 ^ c >> 1 & 0x7fffffff;
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
      return deflateSyncUncompressed(literals);
    }

    function deflateSyncUncompressed(literals) {
      let len = literals.length;
      const maxBlockLength = 0xffff;
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
          throw new Error("invalid format");
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
            literals[offsetLiterals++] ^= 0xff;
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
      writePngChunk("IHDR", ihdr, data, offset);
      offset += CHUNK_WRAPPER_SIZE + ihdr.length;
      writePngChunk("IDATA", idat, data, offset);
      offset += CHUNK_WRAPPER_SIZE + idat.length;
      writePngChunk("IEND", new Uint8Array(0), data, offset);
      return createObjectURL(data, "image/png", forceDataSchema);
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

    return opTree;
  }

  function pf(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }

    const s = value.toFixed(10);
    let i = s.length - 1;

    if (s[i] !== "0") {
      return s;
    }

    do {
      i--;
    } while (s[i] === "0");

    return s.substring(0, s[i] === "." ? i : i + 1);
  }

  function pm(m) {
    if (m[4] === 0 && m[5] === 0) {
      if (m[1] === 0 && m[2] === 0) {
        if (m[0] === 1 && m[3] === 1) {
          return "";
        }

        return "scale(".concat(pf(m[0]), " ").concat(pf(m[3]), ")");
      }

      if (m[0] === m[3] && m[1] === -m[2]) {
        const a = Math.acos(m[0]) * 180 / Math.PI;
        return "rotate(".concat(pf(a), ")");
      }
    } else {
      if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
        return "translate(".concat(pf(m[4]), " ").concat(pf(m[5]), ")");
      }
    }

    return "matrix(".concat(pf(m[0]), " ").concat(pf(m[1]), " ").concat(pf(m[2]), " ").concat(pf(m[3]), " ").concat(pf(m[4]), " ") + "".concat(pf(m[5]), ")");
  }

  let clipCount = 0;
  let maskCount = 0;
  let shadingCount = 0;
  exports.SVGGraphics = SVGGraphics = class {
    constructor(commonObjs, objs) {
      let forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
          const objsPool = obj.startsWith("g_") ? this.commonObjs : this.objs;
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
          fnId,
          fn: operatorIdMapping[fnId],
          args: argsArray[i]
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

    beginText() {
      const current = this.current;
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

    moveText(x, y) {
      const current = this.current;
      current.x = current.lineX += x;
      current.y = current.lineY += y;
      current.xcoords = [];
      current.ycoords = [];
      current.tspan = this.svgFactory.createElement("svg:tspan");
      current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
      current.tspan.setAttributeNS(null, "font-size", "".concat(pf(current.fontSize), "px"));
      current.tspan.setAttributeNS(null, "y", pf(-current.y));
    }

    showText(glyphs) {
      const current = this.current;
      const font = current.font;
      const fontSize = current.fontSize;

      if (fontSize === 0) {
        return;
      }

      const fontSizeScale = current.fontSizeScale;
      const charSpacing = current.charSpacing;
      const wordSpacing = current.wordSpacing;
      const fontDirection = current.fontDirection;
      const textHScale = current.textHScale * fontDirection;
      const vertical = font.vertical;
      const spacingDir = vertical ? 1 : -1;
      const defaultVMetrics = font.defaultVMetrics;
      const widthAdvanceScale = fontSize * current.fontMatrix[0];
      let x = 0;

      for (const glyph of glyphs) {
        if (glyph === null) {
          x += fontDirection * wordSpacing;
          continue;
        } else if (typeof glyph === "number") {
          x += spacingDir * glyph * fontSize / 1000;
          continue;
        }

        const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
        const character = glyph.fontChar;
        let scaledX, scaledY;
        let width = glyph.width;

        if (vertical) {
          let vx;
          const vmetric = glyph.vmetric || defaultVMetrics;
          vx = glyph.vmetric ? vmetric[1] : width * 0.5;
          vx = -vx * widthAdvanceScale;
          const vy = vmetric[2] * widthAdvanceScale;
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

        let charWidth;

        if (vertical) {
          charWidth = width * widthAdvanceScale - spacing * fontDirection;
        } else {
          charWidth = width * widthAdvanceScale + spacing * fontDirection;
        }

        x += charWidth;
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

      const fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

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
        const lineWidthScale = 1 / (current.textMatrixScale || 1);

        this._setStrokeAttributes(current.tspan, lineWidthScale);
      }

      let textMatrix = current.textMatrix;

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

    setLeadingMoveText(x, y) {
      this.setLeading(-y);
      this.moveText(x, y);
    }

    addFontStyle(fontObj) {
      if (!fontObj.data) {
        throw new Error("addFontStyle: No font data available, " + 'ensure that the "fontExtraProperties" API parameter is set.');
      }

      if (!this.cssStyle) {
        this.cssStyle = this.svgFactory.createElement("svg:style");
        this.cssStyle.setAttributeNS(null, "type", "text/css");
        this.defs.appendChild(this.cssStyle);
      }

      const url = createObjectURL(fontObj.data, fontObj.mimetype, this.forceDataSchema);
      this.cssStyle.textContent += "@font-face { font-family: \"".concat(fontObj.loadedName, "\";") + " src: url(".concat(url, "); }\n");
    }

    setFont(details) {
      const current = this.current;
      const fontObj = this.commonObjs.get(details[0]);
      let size = details[1];
      current.font = fontObj;

      if (this.embedFonts && !fontObj.missingFile && !this.embeddedFonts[fontObj.loadedName]) {
        this.addFontStyle(fontObj);
        this.embeddedFonts[fontObj.loadedName] = fontObj;
      }

      current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;
      let bold = "normal";

      if (fontObj.black) {
        bold = "900";
      } else if (fontObj.bold) {
        bold = "bold";
      }

      const italic = fontObj.italic ? "italic" : "normal";

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

    endText() {
      var _current$txtElement;

      const current = this.current;

      if (current.textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG && (_current$txtElement = current.txtElement) !== null && _current$txtElement !== void 0 && _current$txtElement.hasChildNodes()) {
        current.element = current.txtElement;
        this.clip("nonzero");
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
      this.current.strokeColor = _util.Util.makeHexColor(r, g, b);
    }

    setFillAlpha(fillAlpha) {
      this.current.fillAlpha = fillAlpha;
    }

    setFillRGBColor(r, g, b) {
      this.current.fillColor = _util.Util.makeHexColor(r, g, b);
      this.current.tspan = this.svgFactory.createElement("svg:tspan");
      this.current.xcoords = [];
      this.current.ycoords = [];
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
      const rect = this.svgFactory.createElement("svg:rect");
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

    _makeColorN_Pattern(args) {
      if (args[0] === "TilingPattern") {
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
      const tilingId = "shading".concat(shadingCount++);

      const [tx0, ty0, tx1, ty1] = _util.Util.normalizeRect([..._util.Util.applyTransform([x0, y0], matrix), ..._util.Util.applyTransform([x1, y1], matrix)]);

      const [xscale, yscale] = _util.Util.singularValueDecompose2dScale(matrix);

      const txstep = xstep * xscale;
      const tystep = ystep * yscale;
      const tiling = this.svgFactory.createElement("svg:pattern");
      tiling.setAttributeNS(null, "id", tilingId);
      tiling.setAttributeNS(null, "patternUnits", "userSpaceOnUse");
      tiling.setAttributeNS(null, "width", txstep);
      tiling.setAttributeNS(null, "height", tystep);
      tiling.setAttributeNS(null, "x", "".concat(tx0));
      tiling.setAttributeNS(null, "y", "".concat(ty0));
      const svg = this.svg;
      const transformMatrix = this.transformMatrix;
      const fillColor = this.current.fillColor;
      const strokeColor = this.current.strokeColor;
      const bbox = this.svgFactory.create(tx1 - tx0, ty1 - ty0);
      this.svg = bbox;
      this.transformMatrix = matrix;

      if (paintType === 2) {
        const cssColor = _util.Util.makeHexColor(...color);

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

    _makeShadingPattern(args) {
      if (typeof args === "string") {
        args = this.objs.get(args);
      }

      switch (args[0]) {
        case "RadialAxial":
          const shadingId = "shading".concat(shadingCount++);
          const colorStops = args[3];
          let gradient;

          switch (args[1]) {
            case "axial":
              const point0 = args[4];
              const point1 = args[5];
              gradient = this.svgFactory.createElement("svg:linearGradient");
              gradient.setAttributeNS(null, "id", shadingId);
              gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
              gradient.setAttributeNS(null, "x1", point0[0]);
              gradient.setAttributeNS(null, "y1", point0[1]);
              gradient.setAttributeNS(null, "x2", point1[0]);
              gradient.setAttributeNS(null, "y2", point1[1]);
              break;

            case "radial":
              const focalPoint = args[4];
              const circlePoint = args[5];
              const focalRadius = args[6];
              const circleRadius = args[7];
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

          for (const colorStop of colorStops) {
            const stop = this.svgFactory.createElement("svg:stop");
            stop.setAttributeNS(null, "offset", colorStop[0]);
            stop.setAttributeNS(null, "stop-color", colorStop[1]);
            gradient.appendChild(stop);
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

      const clipId = "clippath".concat(clipCount++);
      const clipPath = this.svgFactory.createElement("svg:clipPath");
      clipPath.setAttributeNS(null, "id", clipId);
      clipPath.setAttributeNS(null, "transform", pm(this.transformMatrix));
      const clipElement = current.element.cloneNode(true);

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

        for (const prev of this.extraStack) {
          prev.clipGroup = null;
        }

        clipPath.setAttributeNS(null, "clip-path", current.activeClipUrl);
      }

      current.activeClipUrl = "url(#".concat(clipId, ")");
      this.tgrp = null;
    }

    clip(type) {
      this.pendingClip = type;
    }

    closePath() {
      const current = this.current;

      if (current.path) {
        const d = "".concat(current.path.getAttributeNS(null, "d"), "Z");
        current.path.setAttributeNS(null, "d", d);
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
    }

    fill() {
      const current = this.current;

      if (current.element) {
        current.element.setAttributeNS(null, "fill", current.fillColor);
        current.element.setAttributeNS(null, "fill-opacity", current.fillAlpha);
        this.endPath();
      }
    }

    stroke() {
      const current = this.current;

      if (current.element) {
        this._setStrokeAttributes(current.element);

        current.element.setAttributeNS(null, "fill", "none");
        this.endPath();
      }
    }

    _setStrokeAttributes(element) {
      let lineWidthScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      const current = this.current;
      let dashArray = current.dashArray;

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

    eoFill() {
      if (this.current.element) {
        this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
      }

      this.fill();
    }

    fillStroke() {
      this.stroke();
      this.fill();
    }

    eoFillStroke() {
      if (this.current.element) {
        this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
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
      const rect = this.svgFactory.createElement("svg:rect");
      rect.setAttributeNS(null, "x", "0");
      rect.setAttributeNS(null, "y", "0");
      rect.setAttributeNS(null, "width", "1px");
      rect.setAttributeNS(null, "height", "1px");
      rect.setAttributeNS(null, "fill", this.current.fillColor);

      this._ensureTransformGroup().appendChild(rect);
    }

    paintImageXObject(objId) {
      const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

      if (!imgData) {
        (0, _util.warn)("Dependent image with object ID ".concat(objId, " is not ready yet"));
        return;
      }

      this.paintInlineImageXObject(imgData);
    }

    paintInlineImageXObject(imgData, mask) {
      const width = imgData.width;
      const height = imgData.height;
      const imgSrc = convertImgDataToPng(imgData, this.forceDataSchema, !!mask);
      const cliprect = this.svgFactory.createElement("svg:rect");
      cliprect.setAttributeNS(null, "x", "0");
      cliprect.setAttributeNS(null, "y", "0");
      cliprect.setAttributeNS(null, "width", pf(width));
      cliprect.setAttributeNS(null, "height", pf(height));
      this.current.element = cliprect;
      this.clip("nonzero");
      const imgEl = this.svgFactory.createElement("svg:image");
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

    paintImageMaskXObject(imgData) {
      const current = this.current;
      const width = imgData.width;
      const height = imgData.height;
      const fillColor = current.fillColor;
      current.maskId = "mask".concat(maskCount++);
      const mask = this.svgFactory.createElement("svg:mask");
      mask.setAttributeNS(null, "id", current.maskId);
      const rect = this.svgFactory.createElement("svg:rect");
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

    paintFormXObjectBegin(matrix, bbox) {
      if (Array.isArray(matrix) && matrix.length === 6) {
        this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      }

      if (bbox) {
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        const cliprect = this.svgFactory.createElement("svg:rect");
        cliprect.setAttributeNS(null, "x", bbox[0]);
        cliprect.setAttributeNS(null, "y", bbox[1]);
        cliprect.setAttributeNS(null, "width", pf(width));
        cliprect.setAttributeNS(null, "height", pf(height));
        this.current.element = cliprect;
        this.clip("nonzero");
        this.endPath();
      }
    }

    paintFormXObjectEnd() {}

    _initialize(viewport) {
      const svg = this.svgFactory.create(viewport.width, viewport.height);
      const definitions = this.svgFactory.createElement("svg:defs");
      svg.appendChild(definitions);
      this.defs = definitions;
      const rootGroup = this.svgFactory.createElement("svg:g");
      rootGroup.setAttributeNS(null, "transform", pm(viewport.transform));
      svg.appendChild(rootGroup);
      this.svg = rootGroup;
      return svg;
    }

    _ensureClipGroup() {
      if (!this.current.clipGroup) {
        const clipGroup = this.svgFactory.createElement("svg:g");
        clipGroup.setAttributeNS(null, "clip-path", this.current.activeClipUrl);
        this.svg.appendChild(clipGroup);
        this.current.clipGroup = clipGroup;
      }

      return this.current.clipGroup;
    }

    _ensureTransformGroup() {
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

  };
}

/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFNodeStream = void 0;

__w_pdfjs_require__(106);

__w_pdfjs_require__(2);

__w_pdfjs_require__(145);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

__w_pdfjs_require__(139);

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(216);

;

const fs = require("fs");

const http = require("http");

const https = require("https");

const url = require("url");

const fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;

function parseUrl(sourceUrl) {
  const parsedUrl = url.parse(sourceUrl);

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

class PDFNodeStream {
  constructor(source) {
    this.source = source;
    this.url = parseUrl(source.url);
    this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:" || this.url.protocol === "capacitor:";
    this.isFsUrl = this.url.protocol === "file:";
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  get _progressiveDataLength() {
    var _this$_fullRequestRea, _this$_fullRequestRea2;

    return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
    this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
    return this._fullRequestReader;
  }

  getRangeReader(start, end) {
    if (end <= this._progressiveDataLength) {
      return null;
    }

    const rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);

    this._rangeRequestReaders.push(rangeReader);

    return rangeReader;
  }

  cancelAllRequests(reason) {
    if (this._fullRequestReader) {
      this._fullRequestReader.cancel(reason);
    }

    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
  }

}

exports.PDFNodeStream = PDFNodeStream;

class BaseFullReader {
  constructor(stream) {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    const source = stream.source;
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

    const chunk = this._readableStream.read();

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

    const buffer = new Uint8Array(chunk).buffer;
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
    readableStream.on("readable", () => {
      this._readCapability.resolve();
    });
    readableStream.on("end", () => {
      readableStream.destroy();
      this._done = true;

      this._readCapability.resolve();
    });
    readableStream.on("error", reason => {
      this._error(reason);
    });

    if (!this._isStreamingSupported && this._isRangeSupported) {
      this._error(new _util.AbortException("streaming is disabled"));
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
    const source = stream.source;
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

    const chunk = this._readableStream.read();

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

    const buffer = new Uint8Array(chunk).buffer;
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
    readableStream.on("readable", () => {
      this._readCapability.resolve();
    });
    readableStream.on("end", () => {
      readableStream.destroy();
      this._done = true;

      this._readCapability.resolve();
    });
    readableStream.on("error", reason => {
      this._error(reason);
    });

    if (this._storedError) {
      this._readableStream.destroy(this._storedError);
    }
  }

}

function createRequestOptions(parsedUrl, headers) {
  return {
    protocol: parsedUrl.protocol,
    auth: parsedUrl.auth,
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: "GET",
    headers
  };
}

class PDFNodeStreamFullReader extends BaseFullReader {
  constructor(stream) {
    super(stream);

    const handleResponse = response => {
      if (response.statusCode === 404) {
        const error = new _util.MissingPDFException("Missing PDF \"".concat(this._url, "\"."));
        this._storedError = error;

        this._headersCapability.reject(error);

        return;
      }

      this._headersCapability.resolve();

      this._setReadableStream(response);

      const getResponseHeader = name => {
        return this._readableStream.headers[name.toLowerCase()];
      };

      const {
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

    if (this._url.protocol === "http:") {
      this._request = http.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    } else {
      this._request = https.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
    }

    this._request.on("error", reason => {
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

    for (const property in stream.httpHeaders) {
      const value = stream.httpHeaders[property];

      if (typeof value === "undefined") {
        continue;
      }

      this._httpHeaders[property] = value;
    }

    this._httpHeaders.Range = "bytes=".concat(start, "-").concat(end - 1);

    const handleResponse = response => {
      if (response.statusCode === 404) {
        const error = new _util.MissingPDFException("Missing PDF \"".concat(this._url, "\"."));
        this._storedError = error;
        return;
      }

      this._setReadableStream(response);
    };

    this._request = null;

    if (this._url.protocol === "http:") {
      this._request = http.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    } else {
      this._request = https.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
    }

    this._request.on("error", reason => {
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
      path = path.replace(/^\//, "");
    }

    fs.lstat(path, (error, stat) => {
      if (error) {
        if (error.code === "ENOENT") {
          error = new _util.MissingPDFException("Missing PDF \"".concat(path, "\"."));
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
      path = path.replace(/^\//, "");
    }

    this._setReadableStream(fs.createReadStream(path, {
      start,
      end: end - 1
    }));
  }

}

/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createResponseStatusError = createResponseStatusError;
exports.extractFilenameFromHeader = extractFilenameFromHeader;
exports.validateRangeRequestCapabilities = validateRangeRequestCapabilities;
exports.validateResponseStatus = validateResponseStatus;

var _util = __w_pdfjs_require__(1);

var _content_disposition = __w_pdfjs_require__(217);

var _display_utils = __w_pdfjs_require__(191);

function validateRangeRequestCapabilities(_ref) {
  let {
    getResponseHeader,
    isHttp,
    rangeChunkSize,
    disableRange
  } = _ref;
  (0, _util.assert)(rangeChunkSize > 0, "Range chunk size must be larger than zero");
  const returnValues = {
    allowRangeRequests: false,
    suggestedLength: undefined
  };
  const length = parseInt(getResponseHeader("Content-Length"), 10);

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

  const contentEncoding = getResponseHeader("Content-Encoding") || "identity";

  if (contentEncoding !== "identity") {
    return returnValues;
  }

  returnValues.allowRangeRequests = true;
  return returnValues;
}

function extractFilenameFromHeader(getResponseHeader) {
  const contentDisposition = getResponseHeader("Content-Disposition");

  if (contentDisposition) {
    let filename = (0, _content_disposition.getFilenameFromContentDispositionHeader)(contentDisposition);

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
/* 217 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFilenameFromContentDispositionHeader = getFilenameFromContentDispositionHeader;

__w_pdfjs_require__(106);

__w_pdfjs_require__(192);

__w_pdfjs_require__(2);

__w_pdfjs_require__(139);

var _util = __w_pdfjs_require__(1);

function getFilenameFromContentDispositionHeader(contentDisposition) {
  let needsEncodingFixup = true;
  let tmp = toParamRegExp("filename\\*", "i").exec(contentDisposition);

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
    const filename = rfc2047decode(tmp);
    return fixupEncoding(filename);
  }

  tmp = toParamRegExp("filename", "i").exec(contentDisposition);

  if (tmp) {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp);
    filename = rfc2047decode(filename);
    return fixupEncoding(filename);
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
        const decoder = new TextDecoder(encoding, {
          fatal: true
        });
        const buffer = (0, _util.stringToBytes)(value);
        value = decoder.decode(buffer);
        needsEncodingFixup = false;
      } catch (e) {}
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
    const matches = [];
    let match;
    const iter = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");

    while ((match = iter.exec(contentDispositionStr)) !== null) {
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

    const parts = [];

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

    return parts.join("");
  }

  function rfc2616unquote(value) {
    if (value.startsWith('"')) {
      const parts = value.slice(1).split('\\"');

      for (let i = 0; i < parts.length; ++i) {
        const quotindex = parts[i].indexOf('"');

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
    const encodingend = extvalue.indexOf("'");

    if (encodingend === -1) {
      return extvalue;
    }

    const encoding = extvalue.slice(0, encodingend);
    const langvalue = extvalue.slice(encodingend + 1);
    const value = langvalue.replace(/^[^']*'/, "");
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
/* 218 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFNetworkStream = void 0;

__w_pdfjs_require__(106);

__w_pdfjs_require__(2);

__w_pdfjs_require__(145);

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(216);

;
const OK_RESPONSE = 200;
const PARTIAL_CONTENT_RESPONSE = 206;

function getArrayBuffer(xhr) {
  const data = xhr.response;

  if (typeof data !== "string") {
    return data;
  }

  const array = (0, _util.stringToBytes)(data);
  return array.buffer;
}

class NetworkManager {
  constructor(url) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.url = url;
    this.isHttp = /^https?:/i.test(url);
    this.httpHeaders = this.isHttp && args.httpHeaders || Object.create(null);
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
    xhr.open("GET", this.url);
    xhr.withCredentials = this.withCredentials;

    for (const property in this.httpHeaders) {
      const value = this.httpHeaders[property];

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

  onProgress(xhrId, evt) {
    var _pendingRequest$onPro;

    const pendingRequest = this.pendingRequests[xhrId];

    if (!pendingRequest) {
      return;
    }

    (_pendingRequest$onPro = pendingRequest.onProgress) === null || _pendingRequest$onPro === void 0 ? void 0 : _pendingRequest$onPro.call(pendingRequest, evt);
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
      var _pendingRequest$onErr;

      (_pendingRequest$onErr = pendingRequest.onError) === null || _pendingRequest$onErr === void 0 ? void 0 : _pendingRequest$onErr.call(pendingRequest, xhr.status);
      return;
    }

    const xhrStatus = xhr.status || OK_RESPONSE;
    const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;

    if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
      var _pendingRequest$onErr2;

      (_pendingRequest$onErr2 = pendingRequest.onError) === null || _pendingRequest$onErr2 === void 0 ? void 0 : _pendingRequest$onErr2.call(pendingRequest, xhr.status);
      return;
    }

    const chunk = getArrayBuffer(xhr);

    if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
      const rangeHeader = xhr.getResponseHeader("Content-Range");
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
    } else {
      var _pendingRequest$onErr3;

      (_pendingRequest$onErr3 = pendingRequest.onError) === null || _pendingRequest$onErr3 === void 0 ? void 0 : _pendingRequest$onErr3.call(pendingRequest, xhr.status);
    }
  }

  getRequestXhr(xhrId) {
    return this.pendingRequests[xhrId].xhr;
  }

  isPendingRequest(xhrId) {
    return xhrId in this.pendingRequests;
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
    (0, _util.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
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
    var _this$_fullRequestRea;

    (_this$_fullRequestRea = this._fullRequestReader) === null || _this$_fullRequestRea === void 0 ? void 0 : _this$_fullRequestRea.cancel(reason);

    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
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

  _onDone(data) {
    if (data) {
      if (this._requests.length > 0) {
        const requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: data.chunk,
          done: false
        });
      } else {
        this._cachedChunks.push(data.chunk);
      }
    }

    this._done = true;

    if (this._cachedChunks.length > 0) {
      return;
    }

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;
  }

  _onError(status) {
    this._storedError = (0, _network_utils.createResponseStatusError)(status, this._url);

    this._headersReceivedCapability.reject(this._storedError);

    for (const requestCapability of this._requests) {
      requestCapability.reject(this._storedError);
    }

    this._requests.length = 0;
    this._cachedChunks.length = 0;
  }

  _onProgress(evt) {
    var _this$onProgress;

    (_this$onProgress = this.onProgress) === null || _this$onProgress === void 0 ? void 0 : _this$onProgress.call(this, {
      loaded: evt.loaded,
      total: evt.lengthComputable ? evt.total : this._contentLength
    });
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

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;

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
      onError: this._onError.bind(this),
      onProgress: this._onProgress.bind(this)
    };
    this._url = manager.url;
    this._requestId = manager.requestRange(begin, end, args);
    this._requests = [];
    this._queuedChunk = null;
    this._done = false;
    this._storedError = undefined;
    this.onProgress = null;
    this.onClosed = null;
  }

  _close() {
    var _this$onClosed;

    (_this$onClosed = this.onClosed) === null || _this$onClosed === void 0 ? void 0 : _this$onClosed.call(this, this);
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

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;

    this._close();
  }

  _onError(status) {
    this._storedError = (0, _network_utils.createResponseStatusError)(status, this._url);

    for (const requestCapability of this._requests) {
      requestCapability.reject(this._storedError);
    }

    this._requests.length = 0;
    this._queuedChunk = null;
  }

  _onProgress(evt) {
    if (!this.isStreamingSupported) {
      var _this$onProgress2;

      (_this$onProgress2 = this.onProgress) === null || _this$onProgress2 === void 0 ? void 0 : _this$onProgress2.call(this, {
        loaded: evt.loaded
      });
    }
  }

  get isStreamingSupported() {
    return false;
  }

  async read() {
    if (this._storedError) {
      throw this._storedError;
    }

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

    for (const requestCapability of this._requests) {
      requestCapability.resolve({
        value: undefined,
        done: true
      });
    }

    this._requests.length = 0;

    if (this._manager.isPendingRequest(this._requestId)) {
      this._manager.abortRequest(this._requestId);
    }

    this._close();
  }

}

/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFetchStream = void 0;

__w_pdfjs_require__(106);

__w_pdfjs_require__(2);

__w_pdfjs_require__(145);

__w_pdfjs_require__(112);

__w_pdfjs_require__(133);

__w_pdfjs_require__(134);

var _util = __w_pdfjs_require__(1);

var _network_utils = __w_pdfjs_require__(216);

;

function createFetchOptions(headers, withCredentials, abortController) {
  return {
    method: "GET",
    headers,
    signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal,
    mode: "cors",
    credentials: withCredentials ? "include" : "same-origin",
    redirect: "follow"
  };
}

function createHeaders(httpHeaders) {
  const headers = new Headers();

  for (const property in httpHeaders) {
    const value = httpHeaders[property];

    if (typeof value === "undefined") {
      continue;
    }

    headers.append(property, value);
  }

  return headers;
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
    var _this$_fullRequestRea, _this$_fullRequestRea2;

    return (_this$_fullRequestRea = (_this$_fullRequestRea2 = this._fullRequestReader) === null || _this$_fullRequestRea2 === void 0 ? void 0 : _this$_fullRequestRea2._loaded) !== null && _this$_fullRequestRea !== void 0 ? _this$_fullRequestRea : 0;
  }

  getFullReader() {
    (0, _util.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
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

    for (const reader of this._rangeRequestReaders.slice(0)) {
      reader.cancel(reason);
    }
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

    if (typeof AbortController !== "undefined") {
      this._abortController = new AbortController();
    }

    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._headers = createHeaders(this._stream.httpHeaders);
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
        this.cancel(new _util.AbortException("Streaming is disabled."));
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

    if (typeof AbortController !== "undefined") {
      this._abortController = new AbortController();
    }

    this._headers = createHeaders(this._stream.httpHeaders);

    this._headers.append("Range", "bytes=".concat(begin, "-").concat(end - 1));

    const url = source.url;
    fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(response => {
      if (!(0, _network_utils.validateResponseStatus)(response.status)) {
        throw (0, _network_utils.createResponseStatusError)(response.status, url);
      }

      this._readCapability.resolve();

      this._reader = response.body.getReader();
    }).catch(this._readCapability.reject);
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __w_pdfjs_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
Object.defineProperty(exports, "AnnotationLayer", ({
  enumerable: true,
  get: function () {
    return _annotation_layer.AnnotationLayer;
  }
}));
Object.defineProperty(exports, "AnnotationMode", ({
  enumerable: true,
  get: function () {
    return _util.AnnotationMode;
  }
}));
Object.defineProperty(exports, "CMapCompressionType", ({
  enumerable: true,
  get: function () {
    return _util.CMapCompressionType;
  }
}));
Object.defineProperty(exports, "GlobalWorkerOptions", ({
  enumerable: true,
  get: function () {
    return _worker_options.GlobalWorkerOptions;
  }
}));
Object.defineProperty(exports, "InvalidPDFException", ({
  enumerable: true,
  get: function () {
    return _util.InvalidPDFException;
  }
}));
Object.defineProperty(exports, "LoopbackPort", ({
  enumerable: true,
  get: function () {
    return _api.LoopbackPort;
  }
}));
Object.defineProperty(exports, "MissingPDFException", ({
  enumerable: true,
  get: function () {
    return _util.MissingPDFException;
  }
}));
Object.defineProperty(exports, "OPS", ({
  enumerable: true,
  get: function () {
    return _util.OPS;
  }
}));
Object.defineProperty(exports, "PDFDataRangeTransport", ({
  enumerable: true,
  get: function () {
    return _api.PDFDataRangeTransport;
  }
}));
Object.defineProperty(exports, "PDFDateString", ({
  enumerable: true,
  get: function () {
    return _display_utils.PDFDateString;
  }
}));
Object.defineProperty(exports, "PDFWorker", ({
  enumerable: true,
  get: function () {
    return _api.PDFWorker;
  }
}));
Object.defineProperty(exports, "PasswordResponses", ({
  enumerable: true,
  get: function () {
    return _util.PasswordResponses;
  }
}));
Object.defineProperty(exports, "PermissionFlag", ({
  enumerable: true,
  get: function () {
    return _util.PermissionFlag;
  }
}));
Object.defineProperty(exports, "PixelsPerInch", ({
  enumerable: true,
  get: function () {
    return _display_utils.PixelsPerInch;
  }
}));
Object.defineProperty(exports, "RenderingCancelledException", ({
  enumerable: true,
  get: function () {
    return _display_utils.RenderingCancelledException;
  }
}));
Object.defineProperty(exports, "SVGGraphics", ({
  enumerable: true,
  get: function () {
    return _svg.SVGGraphics;
  }
}));
Object.defineProperty(exports, "UNSUPPORTED_FEATURES", ({
  enumerable: true,
  get: function () {
    return _util.UNSUPPORTED_FEATURES;
  }
}));
Object.defineProperty(exports, "UnexpectedResponseException", ({
  enumerable: true,
  get: function () {
    return _util.UnexpectedResponseException;
  }
}));
Object.defineProperty(exports, "Util", ({
  enumerable: true,
  get: function () {
    return _util.Util;
  }
}));
Object.defineProperty(exports, "VerbosityLevel", ({
  enumerable: true,
  get: function () {
    return _util.VerbosityLevel;
  }
}));
Object.defineProperty(exports, "XfaLayer", ({
  enumerable: true,
  get: function () {
    return _xfa_layer.XfaLayer;
  }
}));
Object.defineProperty(exports, "build", ({
  enumerable: true,
  get: function () {
    return _api.build;
  }
}));
Object.defineProperty(exports, "createPromiseCapability", ({
  enumerable: true,
  get: function () {
    return _util.createPromiseCapability;
  }
}));
Object.defineProperty(exports, "createValidAbsoluteUrl", ({
  enumerable: true,
  get: function () {
    return _util.createValidAbsoluteUrl;
  }
}));
Object.defineProperty(exports, "getDocument", ({
  enumerable: true,
  get: function () {
    return _api.getDocument;
  }
}));
Object.defineProperty(exports, "getFilenameFromUrl", ({
  enumerable: true,
  get: function () {
    return _display_utils.getFilenameFromUrl;
  }
}));
Object.defineProperty(exports, "getPdfFilenameFromUrl", ({
  enumerable: true,
  get: function () {
    return _display_utils.getPdfFilenameFromUrl;
  }
}));
Object.defineProperty(exports, "getXfaPageViewport", ({
  enumerable: true,
  get: function () {
    return _display_utils.getXfaPageViewport;
  }
}));
Object.defineProperty(exports, "isPdfFile", ({
  enumerable: true,
  get: function () {
    return _display_utils.isPdfFile;
  }
}));
Object.defineProperty(exports, "loadScript", ({
  enumerable: true,
  get: function () {
    return _display_utils.loadScript;
  }
}));
Object.defineProperty(exports, "renderTextLayer", ({
  enumerable: true,
  get: function () {
    return _text_layer.renderTextLayer;
  }
}));
Object.defineProperty(exports, "shadow", ({
  enumerable: true,
  get: function () {
    return _util.shadow;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _api.version;
  }
}));

var _util = __w_pdfjs_require__(1);

var _api = __w_pdfjs_require__(190);

var _display_utils = __w_pdfjs_require__(191);

var _annotation_layer = __w_pdfjs_require__(210);

var _worker_options = __w_pdfjs_require__(203);

var _is_node = __w_pdfjs_require__(197);

var _text_layer = __w_pdfjs_require__(213);

var _svg = __w_pdfjs_require__(214);

var _xfa_layer = __w_pdfjs_require__(212);

const pdfjsVersion = '2.13.481';
const pdfjsBuild = 'b0b1da27a';
{
  if (_is_node.isNodeJS) {
    const {
      PDFNodeStream
    } = __w_pdfjs_require__(215);

    (0, _api.setPDFNetworkStreamFactory)(params => {
      return new PDFNodeStream(params);
    });
  } else {
    const {
      PDFNetworkStream
    } = __w_pdfjs_require__(218);

    const {
      PDFFetchStream
    } = __w_pdfjs_require__(219);

    (0, _api.setPDFNetworkStreamFactory)(params => {
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

});
