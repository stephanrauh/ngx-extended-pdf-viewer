window.ngxZone.runOutsideAngular(() => {
/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2023 Mozilla Foundation
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
 * JavaScript code in this page
 */

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.GenericCom=void 0;var _app=__webpack_require__(2);var _preferences=__webpack_require__(183);var _download_manager=__webpack_require__(184);var _genericl10n=__webpack_require__(185);var _generic_scripting=__webpack_require__(187);;const GenericCom={};exports.GenericCom=GenericCom;class GenericPreferences extends _preferences.BasePreferences{async _writeToStorage(prefObj){try{localStorage.setItem("pdfjs.preferences",JSON.stringify(prefObj));}catch(safariSecurityException){}}async _readFromStorage(prefObj){try{return JSON.parse(localStorage.getItem("pdfjs.preferences"));}catch(safariSecurityException){return{};}}}class GenericExternalServices extends _app.DefaultExternalServices{static createDownloadManager(){return new _download_manager.DownloadManager();}static createPreferences(){return new GenericPreferences();}static createL10n(_ref){let{locale="en-US"}=_ref;return new _genericl10n.GenericL10n(locale);}static createScripting(_ref2){let{sandboxBundleSrc}=_ref2;return new _generic_scripting.GenericScripting(sandboxBundleSrc);}}_app.PDFViewerApplication.externalServices=GenericExternalServices;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFViewerApplication=exports.PDFPrintServiceFactory=exports.DefaultExternalServices=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);var _app_options=__webpack_require__(5);var _event_utils=__webpack_require__(6);var _pdf_link_service=__webpack_require__(7);var _webAnnotation_editor_params=__webpack_require__(8);var _overlay_manager=__webpack_require__(9);var _password_prompt=__webpack_require__(11);var _webPdf_attachment_viewer=__webpack_require__(12);var _webPdf_cursor_tools=__webpack_require__(14);var _webPdf_document_properties=__webpack_require__(16);var _webPdf_find_bar=__webpack_require__(17);var _pdf_find_controller=__webpack_require__(18);var _pdf_history=__webpack_require__(22);var _webPdf_layer_viewer=__webpack_require__(23);var _webPdf_outline_viewer=__webpack_require__(24);var _webPdf_presentation_mode=__webpack_require__(25);var _pdf_rendering_queue=__webpack_require__(26);var _pdf_scripting_manager=__webpack_require__(27);var _webPdf_sidebar=__webpack_require__(28);var _webPdf_sidebar_resizer=__webpack_require__(29);var _webPdf_thumbnail_viewer=__webpack_require__(30);var _pdf_viewer=__webpack_require__(32);var _webSecondary_toolbar=__webpack_require__(180);var _webToolbar=__webpack_require__(181);var _view_history=__webpack_require__(182);const FORCE_PAGES_LOADED_TIMEOUT=10;const WHEEL_ZOOM_DISABLED_TIMEOUT=1000;const ViewOnLoad={UNKNOWN:-1,PREVIOUS:0,INITIAL:1};const ViewerCssTheme={AUTOMATIC:0,LIGHT:1,DARK:2};class DefaultExternalServices{constructor(){throw new Error("Cannot initialize DefaultExternalServices.");}static updateFindControlState(data){}static updateFindMatchesCount(data){}static initPassiveLoading(callbacks){}static reportTelemetry(data){}static createDownloadManager(){throw new Error("Not implemented: createDownloadManager");}static createPreferences(){throw new Error("Not implemented: createPreferences");}static createL10n(options){throw new Error("Not implemented: createL10n");}static createScripting(options){throw new Error("Not implemented: createScripting");}static get supportsPinchToZoom(){return(0,_pdfjsLib.shadow)(this,"supportsPinchToZoom",true);}static get supportsIntegratedFind(){return(0,_pdfjsLib.shadow)(this,"supportsIntegratedFind",false);}static get supportsDocumentFonts(){return(0,_pdfjsLib.shadow)(this,"supportsDocumentFonts",true);}static get supportedMouseWheelZoomModifierKeys(){return(0,_pdfjsLib.shadow)(this,"supportedMouseWheelZoomModifierKeys",{ctrlKey:true,metaKey:true});}static get isInAutomation(){return(0,_pdfjsLib.shadow)(this,"isInAutomation",false);}static updateEditorStates(data){throw new Error("Not implemented: updateEditorStates");}static get canvasMaxAreaInBytes(){return(0,_pdfjsLib.shadow)(this,"canvasMaxAreaInBytes",-1);}}exports.DefaultExternalServices=DefaultExternalServices;const PDFViewerApplication={initialBookmark:document.location.hash.substring(1),_initializedCapability:(0,_pdfjsLib.createPromiseCapability)(),appConfig:null,pdfDocument:null,pdfLoadingTask:null,printService:null,pdfViewer:null,pdfThumbnailViewer:null,pdfRenderingQueue:null,pdfPresentationMode:null,pdfDocumentProperties:null,pdfLinkService:null,pdfHistory:null,pdfSidebar:null,pdfSidebarResizer:null,pdfOutlineViewer:null,pdfAttachmentViewer:null,pdfLayerViewer:null,pdfCursorTools:null,pdfScriptingManager:null,store:null,downloadManager:null,overlayManager:null,preferences:null,toolbar:null,secondaryToolbar:null,eventBus:null,l10n:null,annotationEditorParams:null,isInitialViewSet:false,downloadComplete:false,isViewerEmbedded:window.parent!==window,url:"",baseUrl:"",_downloadUrl:"",externalServices:DefaultExternalServices,_boundEvents:Object.create(null),documentInfo:null,metadata:null,_contentDispositionFilename:null,_contentLength:null,_saveInProgress:false,_wheelUnusedTicks:0,_wheelUnusedFactor:1,_touchUnusedTicks:0,_touchUnusedFactor:1,_PDFBug:null,_hasAnnotationEditors:false,_title:document.title,_printAnnotationStoragePromise:null,_touchInfo:null,_isCtrlKeyDown:false,async initialize(appConfig){this.preferences=this.externalServices.createPreferences();this.appConfig=appConfig;await this._initializeOptions();this._forceCssTheme();await this._initializeL10n();if(this.isViewerEmbedded&&_app_options.AppOptions.get("externalLinkTarget")===_pdf_link_service.LinkTarget.NONE){_app_options.AppOptions.set("externalLinkTarget",_pdf_link_service.LinkTarget.TOP);}await this._initializeViewerComponents();this.bindEvents();this.bindWindowEvents();const appContainer=appConfig.appContainer||document.documentElement;this.l10n.translate(appContainer).then(()=>{this.eventBus.dispatch("localized",{source:this});});this._initializedCapability.resolve();this.initializeLoadingBar();},async _initializeOptions(){if(_app_options.AppOptions.get("disablePreferences")){if(_app_options.AppOptions.get("pdfBugEnabled")){await this._parseHashParams();}return;}if(_app_options.AppOptions._hasUserOptions()){globalThis.ngxConsole.warn("_initializeOptions: The Preferences may override manually set AppOptions; "+'please use the "disablePreferences"-option in order to prevent that.');}try{_app_options.AppOptions.setAll(await this.preferences.getAll());}catch(reason){globalThis.ngxConsole.error(`_initializeOptions: "${reason===null||reason===void 0?void 0:reason.message}".`);}if(_app_options.AppOptions.get("pdfBugEnabled")){await this._parseHashParams();}},async _parseHashParams(){const hash=document.location.hash.substring(1);if(!hash){return;}const{mainContainer,viewerContainer}=this.appConfig,params=(0,_ui_utils.parseQueryString)(hash);if(params.get("disableworker")==="true"){try{await loadFakeWorker();}catch(ex){console.error(`_parseHashParams: "${ex.message}".`);}}if(params.has("disablerange")){_app_options.AppOptions.set("disableRange",params.get("disablerange")==="true");}if(params.has("disablestream")){_app_options.AppOptions.set("disableStream",params.get("disablestream")==="true");}if(params.has("disableautofetch")){_app_options.AppOptions.set("disableAutoFetch",params.get("disableautofetch")==="true");}if(params.has("disablefontface")){_app_options.AppOptions.set("disableFontFace",params.get("disablefontface")==="true");}if(params.has("disablehistory")){_app_options.AppOptions.set("disableHistory",params.get("disablehistory")==="true");}if(params.has("verbosity")){_app_options.AppOptions.set("verbosity",params.get("verbosity")|0);}if(params.has("textlayer")){switch(params.get("textlayer")){case"off":_app_options.AppOptions.set("textLayerMode",_ui_utils.TextLayerMode.DISABLE);break;case"visible":case"shadow":case"hover":viewerContainer.classList.add(`textLayer-${params.get("textlayer")}`);try{await loadPDFBug(this);this._PDFBug.loadCSS();}catch(ex){console.error(`_parseHashParams: "${ex.message}".`);}break;}}if(params.has("pdfbug")){_app_options.AppOptions.set("pdfBug",true);_app_options.AppOptions.set("fontExtraProperties",true);const enabled=params.get("pdfbug").split(",");try{await loadPDFBug(this);this._PDFBug.init({OPS:_pdfjsLib.OPS},mainContainer,enabled);}catch(ex){console.error(`_parseHashParams: "${ex.message}".`);}}if(params.has("locale")){_app_options.AppOptions.set("locale",params.get("locale"));}},async _initializeL10n(){this.l10n=this.externalServices.createL10n({locale:_app_options.AppOptions.get("locale")});const dir=await this.l10n.getDirection();document.getElementsByTagName("html")[0].dir=dir;},_forceCssTheme(){const cssTheme=_app_options.AppOptions.get("viewerCssTheme");if(cssTheme===ViewerCssTheme.AUTOMATIC||!Object.values(ViewerCssTheme).includes(cssTheme)){return;}try{const styleSheet=document.styleSheets[0];const cssRules=(styleSheet===null||styleSheet===void 0?void 0:styleSheet.cssRules)||[];for(let i=0,ii=cssRules.length;i<ii;i++){var _rule$media;const rule=cssRules[i];if(rule instanceof CSSMediaRule&&((_rule$media=rule.media)===null||_rule$media===void 0?void 0:_rule$media[0])==="(prefers-color-scheme: dark)"){if(cssTheme===ViewerCssTheme.LIGHT){styleSheet.deleteRule(i);return;}const darkRules=/^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(rule.cssText);if(darkRules!==null&&darkRules!==void 0&&darkRules[1]){styleSheet.deleteRule(i);styleSheet.insertRule(darkRules[1],i);}return;}}}catch(reason){globalThis.ngxConsole.error(`_forceCssTheme: "${reason===null||reason===void 0?void 0:reason.message}".`);}},async _initializeViewerComponents(){var _appConfig$sidebar,_appConfig$secondaryT,_appConfig$secondaryT2,_appConfig$sidebar2,_appConfig$sidebar3,_appConfig$sidebar4;const{appConfig,externalServices}=this;const eventBus=externalServices.isInAutomation?new _event_utils.AutomationEventBus():new _event_utils.EventBus();this.eventBus=eventBus;this.overlayManager=new _overlay_manager.OverlayManager();const pdfRenderingQueue=new _pdf_rendering_queue.PDFRenderingQueue();pdfRenderingQueue.onIdle=this._cleanup.bind(this);this.pdfRenderingQueue=pdfRenderingQueue;const pdfLinkService=new _pdf_link_service.PDFLinkService({eventBus,externalLinkTarget:_app_options.AppOptions.get("externalLinkTarget"),externalLinkRel:_app_options.AppOptions.get("externalLinkRel"),ignoreDestinationZoom:_app_options.AppOptions.get("ignoreDestinationZoom")});this.pdfLinkService=pdfLinkService;const downloadManager=externalServices.createDownloadManager();this.downloadManager=downloadManager;const findController=new _pdf_find_controller.PDFFindController({linkService:pdfLinkService,eventBus,pageViewMode:_app_options.AppOptions.get("pageViewMode"),updateMatchesCountOnProgress:true});this.findController=findController;const pdfScriptingManager=new _pdf_scripting_manager.PDFScriptingManager({eventBus,sandboxBundleSrc:_app_options.AppOptions.get("sandboxBundleSrc"),scriptingFactory:externalServices,docPropertiesLookup:this._scriptingDocProperties.bind(this)});this.pdfScriptingManager=pdfScriptingManager;const container=appConfig.mainContainer,viewer=appConfig.viewerContainer;const annotationEditorMode=_app_options.AppOptions.get("annotationEditorMode");const pageColors=_app_options.AppOptions.get("forcePageColors")||window.matchMedia("(forced-colors: active)").matches?{background:_app_options.AppOptions.get("pageColorsBackground"),foreground:_app_options.AppOptions.get("pageColorsForeground")}:null;this.pdfViewer=new _pdf_viewer.PDFViewer({container,viewer,eventBus,renderingQueue:pdfRenderingQueue,linkService:pdfLinkService,downloadManager,findController,scriptingManager:_app_options.AppOptions.get("enableScripting")&&pdfScriptingManager,renderer:_app_options.AppOptions.get("renderer"),l10n:this.l10n,textLayerMode:_app_options.AppOptions.get("textLayerMode"),annotationMode:_app_options.AppOptions.get("annotationMode"),annotationEditorMode,imageResourcesPath:_app_options.AppOptions.get("imageResourcesPath"),removePageBorders:_app_options.AppOptions.get("removePageBorders"),enablePrintAutoRotate:_app_options.AppOptions.get("enablePrintAutoRotate"),useOnlyCssZoom:_app_options.AppOptions.get("useOnlyCssZoom"),isOffscreenCanvasSupported:_app_options.AppOptions.get("isOffscreenCanvasSupported"),maxCanvasPixels:_app_options.AppOptions.get("maxCanvasPixels"),pageViewMode:_app_options.AppOptions.get("pageViewMode"),enablePermissions:_app_options.AppOptions.get("enablePermissions"),pageColors});pdfRenderingQueue.setViewer(this.pdfViewer);pdfLinkService.setViewer(this.pdfViewer);pdfScriptingManager.setViewer(this.pdfViewer);if((_appConfig$sidebar=appConfig.sidebar)!==null&&_appConfig$sidebar!==void 0&&_appConfig$sidebar.thumbnailView){this.pdfThumbnailViewer=new _webPdf_thumbnail_viewer.PDFThumbnailViewer({container:appConfig.sidebar.thumbnailView,renderingQueue:pdfRenderingQueue,linkService:pdfLinkService,l10n:this.l10n,pageColors,eventBus});pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer);}if(!this.isViewerEmbedded&&!_app_options.AppOptions.get("disableHistory")){this.pdfHistory=new _pdf_history.PDFHistory({linkService:pdfLinkService,eventBus});pdfLinkService.setHistory(this.pdfHistory);}if(!this.supportsIntegratedFind&&appConfig.findBar){this.findBar=new _webPdf_find_bar.PDFFindBar(appConfig.findBar,eventBus,this.l10n);}if(appConfig.annotationEditorParams){if(annotationEditorMode!==_pdfjsLib.AnnotationEditorType.DISABLE){this.annotationEditorParams=new _webAnnotation_editor_params.AnnotationEditorParams(appConfig.annotationEditorParams,eventBus);}else{for(const id of["editorModeButtons","editorModeSeparator"]){var _document$getElementB;(_document$getElementB=document.getElementById(id))===null||_document$getElementB===void 0?void 0:_document$getElementB.classList.add("hidden");}}}if(appConfig.documentProperties){this.pdfDocumentProperties=new _webPdf_document_properties.PDFDocumentProperties(appConfig.documentProperties,this.overlayManager,eventBus,this.l10n,()=>{return this._docFilename;});}if((_appConfig$secondaryT=appConfig.secondaryToolbar)!==null&&_appConfig$secondaryT!==void 0&&_appConfig$secondaryT.cursorHandToolButton){this.pdfCursorTools=new _webPdf_cursor_tools.PDFCursorTools({container,eventBus,cursorToolOnLoad:_app_options.AppOptions.get("cursorToolOnLoad")});}if(appConfig.toolbar){this.toolbar=new _webToolbar.Toolbar(appConfig.toolbar,eventBus,this.l10n);}if(appConfig.secondaryToolbar){this.secondaryToolbar=new _webSecondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar,eventBus,this.externalServices);}if(this.supportsFullscreen&&(_appConfig$secondaryT2=appConfig.secondaryToolbar)!==null&&_appConfig$secondaryT2!==void 0&&_appConfig$secondaryT2.presentationModeButton){this.pdfPresentationMode=new _webPdf_presentation_mode.PDFPresentationMode({container,pdfViewer:this.pdfViewer,eventBus});}let prompt=_app_options.AppOptions.get("passwordPrompt");if(!prompt){if(appConfig.passwordOverlay){prompt=new _password_prompt.PasswordPrompt(appConfig.passwordOverlay,this.overlayManager,this.l10n,this.isViewerEmbedded);}}this.passwordPrompt=prompt;if((_appConfig$sidebar2=appConfig.sidebar)!==null&&_appConfig$sidebar2!==void 0&&_appConfig$sidebar2.outlineView){this.pdfOutlineViewer=new _webPdf_outline_viewer.PDFOutlineViewer({container:appConfig.sidebar.outlineView,eventBus,linkService:pdfLinkService,downloadManager});}if((_appConfig$sidebar3=appConfig.sidebar)!==null&&_appConfig$sidebar3!==void 0&&_appConfig$sidebar3.attachmentsView){this.pdfAttachmentViewer=new _webPdf_attachment_viewer.PDFAttachmentViewer({container:appConfig.sidebar.attachmentsView,eventBus,downloadManager});}if((_appConfig$sidebar4=appConfig.sidebar)!==null&&_appConfig$sidebar4!==void 0&&_appConfig$sidebar4.layersView){this.pdfLayerViewer=new _webPdf_layer_viewer.PDFLayerViewer({container:appConfig.sidebar.layersView,eventBus,l10n:this.l10n});}if(appConfig.sidebar){this.pdfSidebar=new _webPdf_sidebar.PDFSidebar({elements:appConfig.sidebar,pdfViewer:this.pdfViewer,pdfThumbnailViewer:this.pdfThumbnailViewer,eventBus,l10n:this.l10n});this.pdfSidebar.onToggled=this.forceRendering.bind(this);this.pdfSidebarResizer=new _webPdf_sidebar_resizer.PDFSidebarResizer(appConfig.sidebarResizer,eventBus,this.l10n);}},run(config){this.initialize(config).then(webViewerInitialized);},get initialized(){return this._initializedCapability.settled;},get initializedPromise(){return this._initializedCapability.promise;},zoomIn(steps,scaleFactor){if(this.pdfViewer.isInPresentationMode){return;}this.pdfViewer.increaseScale({drawingDelay:_app_options.AppOptions.get("defaultZoomDelay"),steps,scaleFactor});},zoomOut(steps,scaleFactor){if(this.pdfViewer.isInPresentationMode){return;}this.pdfViewer.decreaseScale({drawingDelay:_app_options.AppOptions.get("defaultZoomDelay"),steps,scaleFactor});},zoomReset(){if(this.pdfViewer.isInPresentationMode){return;}this.pdfViewer.currentScaleValue=_ui_utils.DEFAULT_SCALE_VALUE;},get pagesCount(){return this.pdfDocument?this.pdfDocument.numPages:0;},get page(){return this.pdfViewer.currentPageNumber;},set page(val){this.pdfViewer.currentPageNumber=val;},get supportsPrinting(){return PDFPrintServiceFactory.instance.supportsPrinting;},get supportsFullscreen(){return(0,_pdfjsLib.shadow)(this,"supportsFullscreen",document.fullscreenEnabled);},get supportsPinchToZoom(){return this.externalServices.supportsPinchToZoom;},get supportsIntegratedFind(){return this.externalServices.supportsIntegratedFind;},get supportsDocumentFonts(){return this.externalServices.supportsDocumentFonts;},initializeLoadingBar(){const barElement=document.getElementById("loadingBar");const bar=barElement?new _ui_utils.ProgressBar(barElement):null;bar===null||bar===void 0?void 0:bar.hide();return(0,_pdfjsLib.shadow)(this,"loadingBar",bar);},get supportedMouseWheelZoomModifierKeys(){return this.externalServices.supportedMouseWheelZoomModifierKeys;},initPassiveLoading(){throw new Error("Not implemented: initPassiveLoading");},setTitleUsingUrl(){let url=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";let downloadUrl=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;},setTitle(){let title=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this._title;this._title=title;if(this.isViewerEmbedded){return;}const editorIndicator=this._hasAnnotationEditors&&!this.pdfRenderingQueue.printing;document.title=`${editorIndicator?"* ":""}${title}`;},get _docFilename(){return this._contentDispositionFilename||(0,_pdfjsLib.getPdfFilenameFromUrl)(this.url);},_hideViewBookmark(){if(!this.appConfig){return;}const{secondaryToolbar}=this.appConfig;secondaryToolbar===null||secondaryToolbar===void 0?void 0:secondaryToolbar.viewBookmarkButton.classList.add("hidden");if(secondaryToolbar!==null&&secondaryToolbar!==void 0&&secondaryToolbar.presentationModeButton.classList.contains("hidden")){var _document$getElementB2;(_document$getElementB2=document.getElementById("viewBookmarkSeparator"))===null||_document$getElementB2===void 0?void 0:_document$getElementB2.classList.add("hidden");}},async close(){var _this$pdfDocument,_this$pdfSidebar,_this$pdfOutlineViewe,_this$pdfAttachmentVi,_this$pdfLayerViewer,_this$pdfHistory,_this$findBar,_this$toolbar,_this$secondaryToolba,_this$_PDFBug;this._unblockDocumentLoadEvent();this._hideViewBookmark();if(!this.pdfLoadingTask){return;}if(((_this$pdfDocument=this.pdfDocument)===null||_this$pdfDocument===void 0?void 0:_this$pdfDocument.annotationStorage.size)>0&&this._annotationStorageModified){try{await this.save();}catch(reason){}}const promises=[];promises.push(this.pdfLoadingTask.destroy());this.pdfLoadingTask=null;if(this.pdfDocument){var _this$pdfThumbnailVie,_this$pdfDocumentProp;this.pdfDocument=null;(_this$pdfThumbnailVie=this.pdfThumbnailViewer)===null||_this$pdfThumbnailVie===void 0?void 0:_this$pdfThumbnailVie.setDocument(null);this.pdfViewer.setDocument(null);this.pdfLinkService.setDocument(null);(_this$pdfDocumentProp=this.pdfDocumentProperties)===null||_this$pdfDocumentProp===void 0?void 0:_this$pdfDocumentProp.setDocument(null);}this.pdfLinkService.externalLinkEnabled=true;this.store=null;this.isInitialViewSet=false;this.downloadComplete=false;this.url="";this.baseUrl="";this._downloadUrl="";this.documentInfo=null;this.metadata=null;this._contentDispositionFilename=null;this._contentLength=null;this._saveInProgress=false;this._hasAnnotationEditors=false;promises.push(this.pdfScriptingManager.destroyPromise);this.setTitle();(_this$pdfSidebar=this.pdfSidebar)===null||_this$pdfSidebar===void 0?void 0:_this$pdfSidebar.reset();(_this$pdfOutlineViewe=this.pdfOutlineViewer)===null||_this$pdfOutlineViewe===void 0?void 0:_this$pdfOutlineViewe.reset();(_this$pdfAttachmentVi=this.pdfAttachmentViewer)===null||_this$pdfAttachmentVi===void 0?void 0:_this$pdfAttachmentVi.reset();(_this$pdfLayerViewer=this.pdfLayerViewer)===null||_this$pdfLayerViewer===void 0?void 0:_this$pdfLayerViewer.reset();(_this$pdfHistory=this.pdfHistory)===null||_this$pdfHistory===void 0?void 0:_this$pdfHistory.reset();(_this$findBar=this.findBar)===null||_this$findBar===void 0?void 0:_this$findBar.reset();(_this$toolbar=this.toolbar)===null||_this$toolbar===void 0?void 0:_this$toolbar.reset();(_this$secondaryToolba=this.secondaryToolbar)===null||_this$secondaryToolba===void 0?void 0:_this$secondaryToolba.reset();(_this$_PDFBug=this._PDFBug)===null||_this$_PDFBug===void 0?void 0:_this$_PDFBug.cleanup();await Promise.all(promises);},async open(args){var _this$pdfViewer;window.adjacentPagesLoader=undefined;(_this$pdfViewer=this.pdfViewer)===null||_this$pdfViewer===void 0?void 0:_this$pdfViewer.destroyBookMode();window.ngxZone.runOutsideAngular(async()=>{var _args;let deprecatedArgs=false;if(typeof args==="string"){args={url:args};deprecatedArgs=true;}else if((_args=args)!==null&&_args!==void 0&&_args.byteLength){args={data:args};deprecatedArgs=true;}if(deprecatedArgs){console.error("The `PDFViewerApplication.open` signature was updated, please use an object instead.");}if(this.pdfLoadingTask){await this.close();}const workerParams=_app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);Object.assign(_pdfjsLib.GlobalWorkerOptions,workerParams);if(args.url){this.setTitleUsingUrl(args.originalUrl||args.url,args.url);}const apiParams=_app_options.AppOptions.getAll(_app_options.OptionKind.API);const params={canvasMaxAreaInBytes:this.externalServices.canvasMaxAreaInBytes,...apiParams,...args};const loadingTask=(0,_pdfjsLib.getDocument)(params);this.pdfLoadingTask=loadingTask;loadingTask.onPassword=(updateCallback,reason)=>{if(this.isViewerEmbedded){this._unblockDocumentLoadEvent();}this.pdfLinkService.externalLinkEnabled=false;this.passwordPrompt.setUpdateCallback(updateCallback,reason);this.passwordPrompt.open();};loadingTask.onProgress=_ref=>{var _this$eventBus;let{loaded,total}=_ref;this.progress(loaded/total);(_this$eventBus=this.eventBus)===null||_this$eventBus===void 0?void 0:_this$eventBus.dispatch("progress",{source:this,type:"load",total,loaded,percent:100*loaded/total});};return loadingTask.promise.then(pdfDocument=>{this.load(pdfDocument);},reason=>{if(loadingTask!==this.pdfLoadingTask){return undefined;}let key="loading_error";if(reason instanceof _pdfjsLib.InvalidPDFException){key="invalid_file_error";}else if(reason instanceof _pdfjsLib.MissingPDFException){key="missing_file_error";}else if(reason instanceof _pdfjsLib.UnexpectedResponseException){key="unexpected_response_error";}if(PDFViewerApplication.onError){PDFViewerApplication.onError(reason);}return this.l10n.get(key).then(msg=>{this._documentError(msg,{message:reason===null||reason===void 0?void 0:reason.message});throw reason;});});});},_ensureDownloadComplete(){if(this.pdfDocument&&this.downloadComplete){return;}throw new Error("PDF document not downloaded.");},async download(){const url=this._downloadUrl,filename=this._docFilename;try{this._ensureDownloadComplete();const data=await this.pdfDocument.getData();const blob=new Blob([data],{type:"application/pdf"});await this.downloadManager.download(blob,url,filename);}catch(reason){await this.downloadManager.downloadUrl(url,filename);}},async save(){if(this._saveInProgress){return;}this._saveInProgress=true;await this.pdfScriptingManager.dispatchWillSave();const url=this._downloadUrl,filename=this._docFilename;try{this._ensureDownloadComplete();const data=await this.pdfDocument.saveDocument();const blob=new Blob([data],{type:"application/pdf"});await this.downloadManager.download(blob,url,filename);}catch(reason){globalThis.ngxConsole.error(`Error when saving the document: ${reason.message}`);await this.download();}finally{await this.pdfScriptingManager.dispatchDidSave();this._saveInProgress=false;}if(this._hasAnnotationEditors){this.externalServices.reportTelemetry({type:"editing",data:{type:"save"}});}},downloadOrSave(){var _this$pdfDocument2;if(((_this$pdfDocument2=this.pdfDocument)===null||_this$pdfDocument2===void 0?void 0:_this$pdfDocument2.annotationStorage.size)>0){this.save();}else{this.download();}},async _exportWithAnnotations(){if(this._saveInProgress){throw new Error(`Already downloading`);}this._saveInProgress=true;await this.pdfScriptingManager.dispatchWillSave();try{this._ensureDownloadComplete();const data=await this.pdfDocument.saveDocument();const blob=new Blob([data],{type:"application/pdf"});return blob;}catch(reason){throw new Error(`Error when saving the document: ${reason.message}`);}finally{await this.pdfScriptingManager.dispatchDidSave();this._saveInProgress=false;}},async _exportWithoutAnnotations(){try{this._ensureDownloadComplete();const data=await this.pdfDocument.getData();const blob=new Blob([data],{type:"application/pdf"});return blob;}catch(reason){throw new Error(`Error when saving the document: ${reason.message}`);}},async export(){var _this$pdfDocument3;if(((_this$pdfDocument3=this.pdfDocument)===null||_this$pdfDocument3===void 0?void 0:_this$pdfDocument3.annotationStorage.size)>0){return this._exportWithAnnotations();}return this._exportWithoutAnnotations();},_documentError(message){let moreInfo=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;this._unblockDocumentLoadEvent();this._otherError(message,moreInfo);this.eventBus.dispatch("documenterror",{source:this,message,reason:(moreInfo===null||moreInfo===void 0?void 0:moreInfo.message)??null});},_otherError(message){let moreInfo=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;const moreInfoText=[`PDF.js v${_pdfjsLib.version||"?"} (build: ${_pdfjsLib.build||"?"})`];if(moreInfo){moreInfoText.push(`Message: ${moreInfo.message}`);if(moreInfo.stack){moreInfoText.push(`Stack: ${moreInfo.stack}`);}else{if(moreInfo.filename){moreInfoText.push(`File: ${moreInfo.filename}`);}if(moreInfo.lineNumber){moreInfoText.push(`Line: ${moreInfo.lineNumber}`);}}}console.error(`${message}\n\n${moreInfoText.join("\n")}`);},progress(level){var _this$pdfDocument4;if(!this.loadingBar||this.downloadComplete){return;}const percent=Math.round(level*100);if(percent<=this.loadingBar.percent){return;}this.loadingBar.percent=percent;if(((_this$pdfDocument4=this.pdfDocument)===null||_this$pdfDocument4===void 0?void 0:_this$pdfDocument4.loadingParams.disableAutoFetch)??_app_options.AppOptions.get("disableAutoFetch")){this.loadingBar.setDisableAutoFetch();}},load(pdfDocument){var _this$toolbar2,_this$secondaryToolba2,_this$pdfDocumentProp2,_this$pdfThumbnailVie2;this.pdfDocument=pdfDocument;pdfDocument.getDownloadInfo().then(_ref2=>{var _this$loadingBar;let{length}=_ref2;this._contentLength=length;this.downloadComplete=true;(_this$loadingBar=this.loadingBar)===null||_this$loadingBar===void 0?void 0:_this$loadingBar.hide();firstPagePromise.then(()=>{var _this$eventBus2;(_this$eventBus2=this.eventBus)===null||_this$eventBus2===void 0?void 0:_this$eventBus2.dispatch("documentloaded",{source:this});});});const pageLayoutPromise=pdfDocument.getPageLayout().catch(function(){});const pageModePromise=pdfDocument.getPageMode().catch(function(){});const openActionPromise=pdfDocument.getOpenAction().catch(function(){});(_this$toolbar2=this.toolbar)===null||_this$toolbar2===void 0?void 0:_this$toolbar2.setPagesCount(pdfDocument.numPages,false);(_this$secondaryToolba2=this.secondaryToolbar)===null||_this$secondaryToolba2===void 0?void 0:_this$secondaryToolba2.setPagesCount(pdfDocument.numPages);this.pdfLinkService.setDocument(pdfDocument);(_this$pdfDocumentProp2=this.pdfDocumentProperties)===null||_this$pdfDocumentProp2===void 0?void 0:_this$pdfDocumentProp2.setDocument(pdfDocument);const pdfViewer=this.pdfViewer;pdfViewer.setDocument(pdfDocument);const{firstPagePromise,onePageRendered,pagesPromise}=pdfViewer;(_this$pdfThumbnailVie2=this.pdfThumbnailViewer)===null||_this$pdfThumbnailVie2===void 0?void 0:_this$pdfThumbnailVie2.setDocument(pdfDocument);const storedPromise=(this.store=new _view_history.ViewHistory(pdfDocument.fingerprints[0])).getMultiple({page:null,zoom:_ui_utils.DEFAULT_SCALE_VALUE,scrollLeft:"0",scrollTop:"0",rotation:null,sidebarView:_ui_utils.SidebarView.UNKNOWN,scrollMode:_ui_utils.ScrollMode.UNKNOWN,spreadMode:_ui_utils.SpreadMode.UNKNOWN}).catch(()=>{return Object.create(null);});firstPagePromise.then(pdfPage=>{var _this$loadingBar2;(_this$loadingBar2=this.loadingBar)===null||_this$loadingBar2===void 0?void 0:_this$loadingBar2.setWidth(this.appConfig.viewerContainer);this._initializeAnnotationStorageCallbacks(pdfDocument);Promise.all([_ui_utils.animationStarted,storedPromise,pageLayoutPromise,pageModePromise,openActionPromise]).then(async _ref3=>{let[timeStamp,stored,pageLayout,pageMode,openAction]=_ref3;const viewOnLoad=_app_options.AppOptions.get("viewOnLoad");this._initializePdfHistory({fingerprint:pdfDocument.fingerprints[0],viewOnLoad,initialDest:openAction===null||openAction===void 0?void 0:openAction.dest});const initialBookmark=this.initialBookmark;const zoom=_app_options.AppOptions.get("defaultZoomValue");let hash=zoom?`zoom=${zoom}`:null;let rotation=null;let sidebarView=_app_options.AppOptions.get("sidebarViewOnLoad");let scrollMode=_app_options.AppOptions.get("scrollModeOnLoad");let spreadMode=_app_options.AppOptions.get("spreadModeOnLoad");if(stored.page&&viewOnLoad!==ViewOnLoad.INITIAL){hash=`page=${stored.page}&zoom=${zoom||stored.zoom},`+`${stored.scrollLeft},${stored.scrollTop}`;rotation=parseInt(stored.rotation,10);if(sidebarView===_ui_utils.SidebarView.UNKNOWN){sidebarView=stored.sidebarView|0;}if(scrollMode===_ui_utils.ScrollMode.UNKNOWN){scrollMode=stored.scrollMode|0;}if(spreadMode===_ui_utils.SpreadMode.UNKNOWN){spreadMode=stored.spreadMode|0;}}if(pageMode&&sidebarView===_ui_utils.SidebarView.UNKNOWN){sidebarView=(0,_ui_utils.apiPageModeToSidebarView)(pageMode);}if(pageLayout&&scrollMode===_ui_utils.ScrollMode.UNKNOWN&&spreadMode===_ui_utils.SpreadMode.UNKNOWN){const modes=(0,_ui_utils.apiPageLayoutToViewerModes)(pageLayout);spreadMode=modes.spreadMode;}this.setInitialView(hash,{rotation,sidebarView,scrollMode,spreadMode});this.eventBus.dispatch("documentinit",{source:this});if(!this.isViewerEmbedded){pdfViewer.focus();}await Promise.race([pagesPromise,new Promise(resolve=>{setTimeout(resolve,FORCE_PAGES_LOADED_TIMEOUT);})]);if(!initialBookmark&&!hash){return;}if(pdfViewer.hasEqualPageSizes){return;}this.initialBookmark=initialBookmark;pdfViewer.currentScaleValue=pdfViewer.currentScaleValue;this.setInitialView(hash);}).catch(()=>{this.setInitialView();}).then(function(){pdfViewer.update();});});pagesPromise.then(()=>{this._unblockDocumentLoadEvent();this._initializeAutoPrint(pdfDocument,openActionPromise);},reason=>{if(PDFViewerApplication.onError){PDFViewerApplication.onError(reason);}this.l10n.get("loading_error").then(msg=>{this._documentError(msg,{message:reason===null||reason===void 0?void 0:reason.message});});});onePageRendered.then(data=>{this.externalServices.reportTelemetry({type:"pageInfo",timestamp:data.timestamp});if(this.pdfOutlineViewer){pdfDocument.getOutline().then(outline=>{if(pdfDocument!==this.pdfDocument){return;}this.pdfOutlineViewer.render({outline,pdfDocument});});}if(this.pdfAttachmentViewer){pdfDocument.getAttachments().then(attachments=>{if(pdfDocument!==this.pdfDocument){return;}this.pdfAttachmentViewer.render({attachments});});}if(this.pdfLayerViewer){pdfViewer.optionalContentConfigPromise.then(optionalContentConfig=>{if(pdfDocument!==this.pdfDocument){return;}this.pdfLayerViewer.render({optionalContentConfig,pdfDocument});});}});this._initializePageLabels(pdfDocument);this._initializeMetadata(pdfDocument);},async _scriptingDocProperties(pdfDocument){var _this$metadata,_this$metadata2;if(!this.documentInfo){await new Promise(resolve=>{this.eventBus._on("metadataloaded",resolve,{once:true});});if(pdfDocument!==this.pdfDocument){return null;}}if(!this._contentLength){await new Promise(resolve=>{this.eventBus._on("documentloaded",resolve,{once:true});});if(pdfDocument!==this.pdfDocument){return null;}}return{...this.documentInfo,baseURL:this.baseUrl,filesize:this._contentLength,filename:this._docFilename,metadata:(_this$metadata=this.metadata)===null||_this$metadata===void 0?void 0:_this$metadata.getRaw(),authors:(_this$metadata2=this.metadata)===null||_this$metadata2===void 0?void 0:_this$metadata2.get("dc:creator"),numPages:this.pagesCount,URL:this.url};},async _initializeAutoPrint(pdfDocument,openActionPromise){const[openAction,javaScript]=await Promise.all([openActionPromise,!this.pdfViewer.enableScripting?pdfDocument.getJavaScript():null]);if(pdfDocument!==this.pdfDocument){return;}let triggerAutoPrint=false;if((openAction===null||openAction===void 0?void 0:openAction.action)==="Print"){triggerAutoPrint=true;}if(javaScript){javaScript.some(js=>{if(!js){return false;}globalThis.ngxConsole.warn("Warning: JavaScript support is not enabled");return true;});if(!triggerAutoPrint){for(const js of javaScript){if(js&&_ui_utils.AutoPrintRegExp.test(js)){triggerAutoPrint=true;break;}}}}if(triggerAutoPrint){this.triggerPrinting();}},async _initializeMetadata(pdfDocument){const{info,metadata,contentDispositionFilename,contentLength}=await pdfDocument.getMetadata();if(pdfDocument!==this.pdfDocument){return;}this.documentInfo=info;this.metadata=metadata;this._contentDispositionFilename??=contentDispositionFilename;this._contentLength??=contentLength;const options=window.PDFViewerApplicationOptions;if(!options||options.get("verbosity")>0){globalThis.ngxConsole.log(`PDF ${pdfDocument.fingerprints[0]} [${info.PDFFormatVersion} `+`${(info.Producer||"-").trim()} / ${(info.Creator||"-").trim()}] `+`(PDF.js: ${_pdfjsLib.version||"?"} [${_pdfjsLib.build||"?"}])  modified by ngx-extended-pdf-viewer`);}let pdfTitle=info.Title;const metadataTitle=metadata===null||metadata===void 0?void 0:metadata.get("dc:title");if(metadataTitle){if(metadataTitle!=="Untitled"&&!/[\uFFF0-\uFFFF]/g.test(metadataTitle)){pdfTitle=metadataTitle;}}if(pdfTitle){this.setTitle(`${pdfTitle} - ${this._contentDispositionFilename||this._title}`);}else if(this._contentDispositionFilename){this.setTitle(this._contentDispositionFilename);}if(info.IsXFAPresent&&!info.IsAcroFormPresent&&!pdfDocument.isPureXfa){if(pdfDocument.loadingParams.enableXfa){globalThis.ngxConsole.warn("Warning: XFA Foreground documents are not supported");}else{globalThis.ngxConsole.warn("Warning: XFA support is not enabled");}}else if((info.IsAcroFormPresent||info.IsXFAPresent)&&!this.pdfViewer.renderForms){console.warn("Warning: Interactive form support is not enabled");}if(info.IsSignaturesPresent){console.warn("Warning: Digital signatures validation is not supported");}this.eventBus.dispatch("metadataloaded",{source:this});},async _initializePageLabels(pdfDocument){const labels=await pdfDocument.getPageLabels();if(pdfDocument!==this.pdfDocument){return;}if(!labels||_app_options.AppOptions.get("disablePageLabels")){return;}const numLabels=labels.length;let standardLabels=0,emptyLabels=0;for(let i=0;i<numLabels;i++){const label=labels[i];if(label===(i+1).toString()){standardLabels++;}else if(label===""){emptyLabels++;}else{break;}}if(standardLabels>=numLabels||emptyLabels>=numLabels){return;}const{pdfViewer,pdfThumbnailViewer,toolbar}=this;pdfViewer.setPageLabels(labels);pdfThumbnailViewer===null||pdfThumbnailViewer===void 0?void 0:pdfThumbnailViewer.setPageLabels(labels);toolbar===null||toolbar===void 0?void 0:toolbar.setPagesCount(numLabels,true);toolbar===null||toolbar===void 0?void 0:toolbar.setPageNumber(pdfViewer.currentPageNumber,pdfViewer.currentPageLabel);},_initializePdfHistory(_ref4){let{fingerprint,viewOnLoad,initialDest=null}=_ref4;if(!this.pdfHistory){return;}this.pdfHistory.initialize({fingerprint,resetHistory:viewOnLoad===ViewOnLoad.INITIAL,updateUrl:_app_options.AppOptions.get("historyUpdateUrl")});if(this.pdfHistory.initialBookmark){this.initialBookmark=this.pdfHistory.initialBookmark;this.initialRotation=this.pdfHistory.initialRotation;}if(initialDest&&!this.initialBookmark&&viewOnLoad===ViewOnLoad.UNKNOWN){this.initialBookmark=JSON.stringify(initialDest);this.pdfHistory.push({explicitDest:initialDest,pageNumber:null});}},_initializeAnnotationStorageCallbacks(pdfDocument){if(pdfDocument!==this.pdfDocument){return;}const{annotationStorage}=pdfDocument;annotationStorage.onSetModified=()=>{window.addEventListener("beforeunload",beforeUnload);this._annotationStorageModified=true;};annotationStorage.onResetModified=()=>{window.removeEventListener("beforeunload",beforeUnload);delete this._annotationStorageModified;};annotationStorage.onAnnotationEditor=typeStr=>{this._hasAnnotationEditors=!!typeStr;this.setTitle();if(typeStr){this.externalServices.reportTelemetry({type:"editing",data:{type:typeStr}});}};},setInitialView(storedHash){var _this$pdfSidebar2,_this$toolbar3,_this$secondaryToolba3;let{rotation,sidebarView,scrollMode,spreadMode}=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};const setRotation=angle=>{if((0,_ui_utils.isValidRotation)(angle)){this.pdfViewer.pagesRotation=angle;}};const setViewerModes=(scroll,spread)=>{if((0,_ui_utils.isValidScrollMode)(scroll)){this.pdfViewer.scrollMode=scroll;}if((0,_ui_utils.isValidSpreadMode)(spread)){this.pdfViewer.spreadMode=spread;}};this.isInitialViewSet=true;(_this$pdfSidebar2=this.pdfSidebar)===null||_this$pdfSidebar2===void 0?void 0:_this$pdfSidebar2.setInitialView(sidebarView);setViewerModes(scrollMode,spreadMode);if(this.initialBookmark){setRotation(this.initialRotation);delete this.initialRotation;this.pdfLinkService.setHash(this.initialBookmark);this.initialBookmark=null;}else if(storedHash){setRotation(rotation);this.pdfLinkService.setHash(storedHash);}(_this$toolbar3=this.toolbar)===null||_this$toolbar3===void 0?void 0:_this$toolbar3.setPageNumber(this.pdfViewer.currentPageNumber,this.pdfViewer.currentPageLabel);(_this$secondaryToolba3=this.secondaryToolbar)===null||_this$secondaryToolba3===void 0?void 0:_this$secondaryToolba3.setPageNumber(this.pdfViewer.currentPageNumber);if(!this.pdfViewer.currentScaleValue){const defaultZoomOption=PDFViewerApplicationOptions.get('defaultZoomValue');if(defaultZoomOption){this.pdfViewer.currentScaleValue=defaultZoomOption;}}},_cleanup(){var _this$pdfThumbnailVie3;if(!this.pdfDocument){return;}this.pdfViewer.cleanup();(_this$pdfThumbnailVie3=this.pdfThumbnailViewer)===null||_this$pdfThumbnailVie3===void 0?void 0:_this$pdfThumbnailVie3.cleanup();this.pdfDocument.cleanup(this.pdfViewer.renderer===_ui_utils.RendererType.SVG);},forceRendering(){var _this$pdfSidebar3;this.pdfRenderingQueue.printing=!!this.printService;this.pdfRenderingQueue.isThumbnailViewEnabled=((_this$pdfSidebar3=this.pdfSidebar)===null||_this$pdfSidebar3===void 0?void 0:_this$pdfSidebar3.visibleView)===_ui_utils.SidebarView.THUMBS;this.pdfRenderingQueue.renderHighestPriority();},beforePrint(){this._printAnnotationStoragePromise=this.pdfScriptingManager.dispatchWillPrint().catch(()=>{}).then(()=>{var _this$pdfDocument5;return(_this$pdfDocument5=this.pdfDocument)===null||_this$pdfDocument5===void 0?void 0:_this$pdfDocument5.annotationStorage.print;});if(this.printService){return;}if(!this.supportsPrinting){this.l10n.get("printing_not_supported").then(msg=>{this._otherError(msg);});return;}if(!this.pdfViewer.pageViewsReady){this.l10n.get("printing_not_ready").then(msg=>{window.alert(msg);});return;}const pagesOverview=this.pdfViewer.getPagesOverview();const printContainer=this.appConfig.printContainer;const printResolution=_app_options.AppOptions.get("printResolution");const optionalContentConfigPromise=this.pdfViewer.optionalContentConfigPromise;const printService=PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument,pagesOverview,printContainer,printResolution,optionalContentConfigPromise,this._printAnnotationStoragePromise,this.l10n,this.pdfViewer.eventBus);this.printService=printService;this.forceRendering();this.setTitle();printService.layout();if(this._hasAnnotationEditors){this.externalServices.reportTelemetry({type:"editing",data:{type:"print"}});}},afterPrint(){if(this._printAnnotationStoragePromise){this._printAnnotationStoragePromise.then(()=>{this.pdfScriptingManager.dispatchDidPrint();});this._printAnnotationStoragePromise=null;}if(this.printService){var _this$pdfDocument6;this.printService.destroy();this.printService=null;(_this$pdfDocument6=this.pdfDocument)===null||_this$pdfDocument6===void 0?void 0:_this$pdfDocument6.annotationStorage.resetModified();}this.forceRendering();this.setTitle();},rotatePages(delta){this.pdfViewer.pagesRotation+=delta;},requestPresentationMode(){var _this$pdfPresentation;(_this$pdfPresentation=this.pdfPresentationMode)===null||_this$pdfPresentation===void 0?void 0:_this$pdfPresentation.request();},triggerPrinting(){if(!this.supportsPrinting){return;}window.printPDF();},bindEvents(){const{eventBus,_boundEvents}=this;_boundEvents.beforePrint=this.beforePrint.bind(this);_boundEvents.afterPrint=this.afterPrint.bind(this);eventBus._on("resize",webViewerResize);eventBus._on("hashchange",webViewerHashchange);eventBus._on("beforeprint",_boundEvents.beforePrint);eventBus._on("afterprint",_boundEvents.afterPrint);eventBus._on("pagerender",webViewerPageRender);eventBus._on("pagerendered",webViewerPageRendered);eventBus._on("updateviewarea",webViewerUpdateViewarea);eventBus._on("pagechanging",webViewerPageChanging);eventBus._on("scalechanging",webViewerScaleChanging);eventBus._on("rotationchanging",webViewerRotationChanging);eventBus._on("sidebarviewchanged",webViewerSidebarViewChanged);eventBus._on("pagemode",webViewerPageMode);eventBus._on("namedaction",webViewerNamedAction);eventBus._on("presentationmodechanged",webViewerPresentationModeChanged);eventBus._on("presentationmode",webViewerPresentationMode);eventBus._on("switchannotationeditormode",webViewerSwitchAnnotationEditorMode);eventBus._on("switchannotationeditorparams",webViewerSwitchAnnotationEditorParams);eventBus._on("print",webViewerPrint);eventBus._on("download",webViewerDownload);eventBus._on("firstpage",webViewerFirstPage);eventBus._on("lastpage",webViewerLastPage);eventBus._on("nextpage",webViewerNextPage);eventBus._on("previouspage",webViewerPreviousPage);eventBus._on("zoomin",webViewerZoomIn);eventBus._on("zoomout",webViewerZoomOut);eventBus._on("zoomreset",webViewerZoomReset);eventBus._on("pagenumberchanged",webViewerPageNumberChanged);eventBus._on("scalechanged",webViewerScaleChanged);eventBus._on("rotatecw",webViewerRotateCw);eventBus._on("rotateccw",webViewerRotateCcw);eventBus._on("optionalcontentconfig",webViewerOptionalContentConfig);eventBus._on("switchscrollmode",webViewerSwitchScrollMode);eventBus._on("scrollmodechanged",webViewerScrollModeChanged);eventBus._on("switchspreadmode",webViewerSwitchSpreadMode);eventBus._on("spreadmodechanged",webViewerSpreadModeChanged);eventBus._on("documentproperties",webViewerDocumentProperties);eventBus._on("findfromurlhash",webViewerFindFromUrlHash);eventBus._on("updatefindmatchescount",webViewerUpdateFindMatchesCount);eventBus._on("updatefindcontrolstate",webViewerUpdateFindControlState);if(_app_options.AppOptions.get("pdfBug")){_boundEvents.reportPageStatsPDFBug=reportPageStatsPDFBug;eventBus._on("pagerendered",_boundEvents.reportPageStatsPDFBug);eventBus._on("pagechanging",_boundEvents.reportPageStatsPDFBug);}eventBus._on("fileinputchange",webViewerFileInputChange);eventBus._on("openfile",webViewerOpenFile);},bindWindowEvents(){const{eventBus,_boundEvents}=this;function addWindowResolutionChange(){let evt=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(evt){webViewerResolutionChange(evt);}const mediaQueryList=window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`);mediaQueryList.addEventListener("change",addWindowResolutionChange,{once:true});_boundEvents.removeWindowResolutionChange||=function(){mediaQueryList.removeEventListener("change",addWindowResolutionChange);_boundEvents.removeWindowResolutionChange=null;};}addWindowResolutionChange();_boundEvents.windowResize=()=>{eventBus.dispatch("resize",{source:window});};_boundEvents.windowHashChange=()=>{eventBus.dispatch("hashchange",{source:window,hash:document.location.hash.substring(1)});};_boundEvents.windowBeforePrint=()=>{eventBus.dispatch("beforeprint",{source:window});};_boundEvents.windowAfterPrint=()=>{eventBus.dispatch("afterprint",{source:window});};_boundEvents.windowUpdateFromSandbox=event=>{eventBus.dispatch("updatefromsandbox",{source:window,detail:event.detail});};window.addEventListener("visibilitychange",webViewerVisibilityChange);window.addEventListener("wheel",webViewerWheel,{passive:false});const mainContainer=document.getElementById("mainContainer");mainContainer===null||mainContainer===void 0?void 0:mainContainer.addEventListener("touchstart",webViewerTouchStart,{passive:false});mainContainer===null||mainContainer===void 0?void 0:mainContainer.addEventListener("touchmove",webViewerTouchMove,{passive:false});mainContainer===null||mainContainer===void 0?void 0:mainContainer.addEventListener("touchend",webViewerTouchEnd,{passive:false});window.addEventListener("click",webViewerClick);window.addEventListener("keydown",webViewerKeyDown);window.addEventListener("keyup",webViewerKeyUp);window.addEventListener("resize",_boundEvents.windowResize);window.addEventListener("hashchange",_boundEvents.windowHashChange);window.addEventListener("beforeprint",_boundEvents.windowBeforePrint);window.addEventListener("afterprint",_boundEvents.windowAfterPrint);window.addEventListener("updatefromsandbox",_boundEvents.windowUpdateFromSandbox);},unbindEvents(){const{eventBus,_boundEvents}=this;eventBus._off("resize",webViewerResize);eventBus._off("hashchange",webViewerHashchange);eventBus._off("beforeprint",_boundEvents.beforePrint);eventBus._off("afterprint",_boundEvents.afterPrint);eventBus._off("pagerender",webViewerPageRender);eventBus._off("pagerendered",webViewerPageRendered);eventBus._off("updateviewarea",webViewerUpdateViewarea);eventBus._off("pagechanging",webViewerPageChanging);eventBus._off("scalechanging",webViewerScaleChanging);eventBus._off("rotationchanging",webViewerRotationChanging);eventBus._off("sidebarviewchanged",webViewerSidebarViewChanged);eventBus._off("pagemode",webViewerPageMode);eventBus._off("namedaction",webViewerNamedAction);eventBus._off("presentationmodechanged",webViewerPresentationModeChanged);eventBus._off("presentationmode",webViewerPresentationMode);eventBus._off("print",webViewerPrint);eventBus._off("download",webViewerDownload);eventBus._off("firstpage",webViewerFirstPage);eventBus._off("lastpage",webViewerLastPage);eventBus._off("nextpage",webViewerNextPage);eventBus._off("previouspage",webViewerPreviousPage);eventBus._off("zoomin",webViewerZoomIn);eventBus._off("zoomout",webViewerZoomOut);eventBus._off("zoomreset",webViewerZoomReset);eventBus._off("pagenumberchanged",webViewerPageNumberChanged);eventBus._off("scalechanged",webViewerScaleChanged);eventBus._off("rotatecw",webViewerRotateCw);eventBus._off("rotateccw",webViewerRotateCcw);eventBus._off("optionalcontentconfig",webViewerOptionalContentConfig);eventBus._off("switchscrollmode",webViewerSwitchScrollMode);eventBus._off("scrollmodechanged",webViewerScrollModeChanged);eventBus._off("switchspreadmode",webViewerSwitchSpreadMode);eventBus._off("spreadmodechanged",webViewerSpreadModeChanged);eventBus._off("documentproperties",webViewerDocumentProperties);eventBus._off("findfromurlhash",webViewerFindFromUrlHash);eventBus._off("updatefindmatchescount",webViewerUpdateFindMatchesCount);eventBus._off("updatefindcontrolstate",webViewerUpdateFindControlState);if(_boundEvents.reportPageStatsPDFBug){eventBus._off("pagerendered",_boundEvents.reportPageStatsPDFBug);eventBus._off("pagechanging",_boundEvents.reportPageStatsPDFBug);_boundEvents.reportPageStatsPDFBug=null;}eventBus._off("fileinputchange",webViewerFileInputChange);eventBus._off("openfile",webViewerOpenFile);_boundEvents.beforePrint=null;_boundEvents.afterPrint=null;},unbindWindowEvents(){var _boundEvents$removeWi;const{_boundEvents}=this;window.removeEventListener("visibilitychange",webViewerVisibilityChange);window.removeEventListener("wheel",webViewerWheel,{passive:false});const mainContainer=document.getElementById("mainContainer");if(mainContainer){mainContainer.removeEventListener("touchstart",webViewerTouchStart,{passive:false});mainContainer.removeEventListener("touchmove",webViewerTouchMove,{passive:false});mainContainer.removeEventListener("touchend",webViewerTouchEnd,{passive:false});}window.removeEventListener("click",webViewerClick);window.removeEventListener("keydown",webViewerKeyDown);window.removeEventListener("keyup",webViewerKeyUp);window.removeEventListener("resize",_boundEvents.windowResize);window.removeEventListener("hashchange",_boundEvents.windowHashChange);window.removeEventListener("beforeprint",_boundEvents.windowBeforePrint);window.removeEventListener("afterprint",_boundEvents.windowAfterPrint);window.removeEventListener("updatefromsandbox",_boundEvents.windowUpdateFromSandbox);(_boundEvents$removeWi=_boundEvents.removeWindowResolutionChange)===null||_boundEvents$removeWi===void 0?void 0:_boundEvents$removeWi.call(_boundEvents);_boundEvents.windowResize=null;_boundEvents.windowHashChange=null;_boundEvents.windowBeforePrint=null;_boundEvents.windowAfterPrint=null;_boundEvents.windowUpdateFromSandbox=null;},_accumulateTicks(ticks,prop){if(this[prop]>0&&ticks<0||this[prop]<0&&ticks>0){this[prop]=0;}this[prop]+=ticks;const wholeTicks=Math.trunc(this[prop]);this[prop]-=wholeTicks;return wholeTicks;},_accumulateFactor(previousScale,factor,prop){if(factor===1){return 1;}if(this[prop]>1&&factor<1||this[prop]<1&&factor>1){this[prop]=1;}const newFactor=Math.floor(previousScale*factor*this[prop]*100)/(100*previousScale);this[prop]=factor/newFactor;return newFactor;},_centerAtPos(previousScale,x,y){const{pdfViewer}=this;const scaleDiff=pdfViewer.currentScale/previousScale-1;if(scaleDiff!==0){const[top,left]=pdfViewer.containerTopLeft;pdfViewer.container.scrollLeft+=(x-left)*scaleDiff;pdfViewer.container.scrollTop+=(y-top)*scaleDiff;}},_unblockDocumentLoadEvent(){var _document$blockUnbloc,_document;(_document$blockUnbloc=(_document=document).blockUnblockOnload)===null||_document$blockUnbloc===void 0?void 0:_document$blockUnbloc.call(_document,false);this._unblockDocumentLoadEvent=()=>{};},get scriptingReady(){return this.pdfScriptingManager.ready;}};exports.PDFViewerApplication=PDFViewerApplication;{const HOSTED_VIEWER_ORIGINS=["null","http://mozilla.github.io","https://mozilla.github.io"];var validateFileURL=function(file){if(!file){return;}try{const viewerOrigin=new URL(window.location.href).origin||"null";if(HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)){return;}const fileOrigin=new URL(file,window.location.href).origin;if(fileOrigin!==viewerOrigin){throw new Error("file origin does not match viewer's");}}catch(ex){if(PDFViewerApplication.onError){PDFViewerApplication.onError(ex);}PDFViewerApplication.l10n.get("loading_error").then(msg=>{PDFViewerApplication._documentError(msg,{message:ex===null||ex===void 0?void 0:ex.message});});throw ex;}};}async function loadFakeWorker(){_pdfjsLib.GlobalWorkerOptions.workerSrc||=_app_options.AppOptions.get("workerSrc");if(_pdfjsLib.GlobalWorkerOptions.workerSrc.constructor.name==="Function"){_pdfjsLib.GlobalWorkerOptions.workerSrc=_pdfjsLib.GlobalWorkerOptions.workerSrc();}await(0,_pdfjsLib.loadScript)(_pdfjsLib.PDFWorker.workerSrc);}async function loadPDFBug(self){const{debuggerScriptPath}=self.appConfig;const{PDFBug}=await import(debuggerScriptPath);self._PDFBug=PDFBug;}function reportPageStatsPDFBug(_ref5){var _globalThis$Stats,_pageView$pdfPage;let{pageNumber}=_ref5;if(!((_globalThis$Stats=globalThis.Stats)!==null&&_globalThis$Stats!==void 0&&_globalThis$Stats.enabled)){return;}const pageView=PDFViewerApplication.pdfViewer.getPageView(pageNumber-1);globalThis.Stats.add(pageNumber,pageView===null||pageView===void 0?void 0:(_pageView$pdfPage=pageView.pdfPage)===null||_pageView$pdfPage===void 0?void 0:_pageView$pdfPage.stats);}function webViewerInitialized(){const{appConfig,eventBus,l10n}=PDFViewerApplication;let file;const queryString=document.location.search.substring(1);const params=(0,_ui_utils.parseQueryString)(queryString);file=params.get("file")??_app_options.AppOptions.get("defaultUrl");validateFileURL(file);const fileInput=appConfig.openFileInput;fileInput.value=null;fileInput.addEventListener("change",function(evt){const{files}=evt.target;if(!files||files.length===0){return;}eventBus.dispatch("fileinputchange",{source:this,fileInput:evt.target});});appConfig.mainContainer.addEventListener("dragover",function(evt){if(_app_options.AppOptions.get("enableDragAndDrop")){evt.preventDefault();evt.dataTransfer.dropEffect=evt.dataTransfer.effectAllowed==="copy"?"copy":"move";}});appConfig.mainContainer.addEventListener("drop",function(evt){if(_app_options.AppOptions.get("enableDragAndDrop")){evt.preventDefault();const{files}=evt.dataTransfer;if(!files||files.length===0){return;}PDFViewerApplication.eventBus.dispatch("fileinputchange",{source:this,fileInput:evt.dataTransfer,dropEvent:evt});}});if(!PDFViewerApplication.supportsDocumentFonts){_app_options.AppOptions.set("disableFontFace",true);l10n.get("web_fonts_disabled").then(msg=>{globalThis.ngxConsole.warn(msg);});}if(!PDFViewerApplication.supportsPrinting){var _appConfig$toolbar,_appConfig$secondaryT3;(_appConfig$toolbar=appConfig.toolbar)===null||_appConfig$toolbar===void 0?void 0:_appConfig$toolbar.print.classList.add("hidden");(_appConfig$secondaryT3=appConfig.secondaryToolbar)===null||_appConfig$secondaryT3===void 0?void 0:_appConfig$secondaryT3.printButton.classList.add("hidden");}if(!PDFViewerApplication.supportsFullscreen){var _appConfig$secondaryT4;(_appConfig$secondaryT4=appConfig.secondaryToolbar)===null||_appConfig$secondaryT4===void 0?void 0:_appConfig$secondaryT4.presentationModeButton.classList.add("hidden");}if(PDFViewerApplication.supportsIntegratedFind){var _appConfig$toolbar2;(_appConfig$toolbar2=appConfig.toolbar)===null||_appConfig$toolbar2===void 0?void 0:_appConfig$toolbar2.viewFind.classList.add("hidden");}appConfig.mainContainer.addEventListener("transitionend",function(evt){if(evt.target===this){eventBus.dispatch("resize",{source:this});}},true);try{if(file){PDFViewerApplication.open({url:file});}else{PDFViewerApplication._hideViewBookmark();}}catch(reason){if(PDFViewerApplication.onError){PDFViewerApplication.onError(reason);}l10n.get("loading_error").then(msg=>{PDFViewerApplication._documentError(msg,reason);});}}function webViewerPageRender(_ref6){let{pageNumber}=_ref6;if(pageNumber===PDFViewerApplication.page){var _PDFViewerApplication;(_PDFViewerApplication=PDFViewerApplication.toolbar)===null||_PDFViewerApplication===void 0?void 0:_PDFViewerApplication.updateLoadingIndicatorState(true);}}function webViewerPageRendered(_ref7){var _PDFViewerApplication3;let{pageNumber,error}=_ref7;if(pageNumber===PDFViewerApplication.page){var _PDFViewerApplication2;(_PDFViewerApplication2=PDFViewerApplication.toolbar)===null||_PDFViewerApplication2===void 0?void 0:_PDFViewerApplication2.updateLoadingIndicatorState(false);}if(((_PDFViewerApplication3=PDFViewerApplication.pdfSidebar)===null||_PDFViewerApplication3===void 0?void 0:_PDFViewerApplication3.visibleView)===_ui_utils.SidebarView.THUMBS){var _PDFViewerApplication4;const pageView=PDFViewerApplication.pdfViewer.getPageView(pageNumber-1);const thumbnailView=(_PDFViewerApplication4=PDFViewerApplication.pdfThumbnailViewer)===null||_PDFViewerApplication4===void 0?void 0:_PDFViewerApplication4.getThumbnail(pageNumber-1);if(pageView&&thumbnailView){thumbnailView.setImage(pageView);}}if(error){PDFViewerApplication.l10n.get("rendering_error").then(msg=>{PDFViewerApplication._otherError(msg,error);});}}function webViewerPageMode(_ref8){var _PDFViewerApplication5;let{mode}=_ref8;let view;switch(mode){case"thumbs":view=_ui_utils.SidebarView.THUMBS;break;case"bookmarks":case"outline":view=_ui_utils.SidebarView.OUTLINE;break;case"attachments":view=_ui_utils.SidebarView.ATTACHMENTS;break;case"layers":view=_ui_utils.SidebarView.LAYERS;break;case"none":view=_ui_utils.SidebarView.NONE;break;default:globalThis.ngxConsole.error('Invalid "pagemode" hash parameter: '+mode);return;}(_PDFViewerApplication5=PDFViewerApplication.pdfSidebar)===null||_PDFViewerApplication5===void 0?void 0:_PDFViewerApplication5.switchView(view,true);}function webViewerNamedAction(evt){var _PDFViewerApplication6;switch(evt.action){case"GoToPage":(_PDFViewerApplication6=PDFViewerApplication.appConfig.toolbar)===null||_PDFViewerApplication6===void 0?void 0:_PDFViewerApplication6.pageNumber.select();break;case"Find":if(!PDFViewerApplication.supportsIntegratedFind){PDFViewerApplication===null||PDFViewerApplication===void 0?void 0:PDFViewerApplication.findBar.toggle();}break;case"Print":PDFViewerApplication.triggerPrinting();break;case"SaveAs":PDFViewerApplication.downloadOrSave();break;}}function webViewerPresentationModeChanged(evt){PDFViewerApplication.pdfViewer.presentationModeState=evt.state;}function webViewerSidebarViewChanged(_ref9){let{view}=_ref9;PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled=view===_ui_utils.SidebarView.THUMBS;if(PDFViewerApplication.isInitialViewSet){var _PDFViewerApplication7;(_PDFViewerApplication7=PDFViewerApplication.store)===null||_PDFViewerApplication7===void 0?void 0:_PDFViewerApplication7.set("sidebarView",view).catch(()=>{});}}function webViewerUpdateViewarea(_ref10){let{location}=_ref10;if(PDFViewerApplication.isInitialViewSet){var _PDFViewerApplication8;const settings={};if(location.pageNumber!==undefined||location.pageNumber!==null){settings.page=location.pageNumber;}if(location.scale){settings.zoom=location.scale;}if(location.left){settings.scrollLeft=location.left;}if(location.top){settings.scrollTop=location.top;}if(location.rotation!==undefined||location.rotation!==null){settings.rotation=location.rotation;}(_PDFViewerApplication8=PDFViewerApplication.store)===null||_PDFViewerApplication8===void 0?void 0:_PDFViewerApplication8.setMultiple(settings).catch(()=>{});}if(PDFViewerApplication.appConfig.secondaryToolbar){const href=PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href=href;}}function webViewerScrollModeChanged(evt){if(PDFViewerApplication.isInitialViewSet&&!PDFViewerApplication.pdfViewer.isInPresentationMode){var _PDFViewerApplication9;(_PDFViewerApplication9=PDFViewerApplication.store)===null||_PDFViewerApplication9===void 0?void 0:_PDFViewerApplication9.set("scrollMode",evt.mode).catch(()=>{});}}function webViewerSpreadModeChanged(evt){if(PDFViewerApplication.isInitialViewSet&&!PDFViewerApplication.pdfViewer.isInPresentationMode){var _PDFViewerApplication10;(_PDFViewerApplication10=PDFViewerApplication.store)===null||_PDFViewerApplication10===void 0?void 0:_PDFViewerApplication10.set("spreadMode",evt.mode).catch(()=>{});}}function webViewerResize(){const{pdfDocument,pdfViewer,pdfRenderingQueue}=PDFViewerApplication;if(pdfRenderingQueue.printing&&window.matchMedia("print").matches){return;}if(!pdfDocument){return;}const currentScaleValue=pdfViewer.currentScaleValue;if(currentScaleValue==="auto"||currentScaleValue==="page-fit"||currentScaleValue==="page-width"){pdfViewer.currentScaleValue=currentScaleValue;}pdfViewer.update();}function webViewerHashchange(evt){var _PDFViewerApplication11;const hash=evt.hash;if(!hash){return;}if(!PDFViewerApplication.isInitialViewSet){PDFViewerApplication.initialBookmark=hash;}else if(!((_PDFViewerApplication11=PDFViewerApplication.pdfHistory)!==null&&_PDFViewerApplication11!==void 0&&_PDFViewerApplication11.popStateInProgress)){PDFViewerApplication.pdfLinkService.setHash(hash);}}{var webViewerFileInputChange=function(evt){var _PDFViewerApplication12;if((_PDFViewerApplication12=PDFViewerApplication.pdfViewer)!==null&&_PDFViewerApplication12!==void 0&&_PDFViewerApplication12.isInPresentationMode){return;}const file=evt.fileInput.files[0];PDFViewerApplication.open({url:URL.createObjectURL(file),originalUrl:file.name});if(window["setNgxExtendedPdfViewerSource"]){window["setNgxExtendedPdfViewerSource"](file.name?file.name:URL.createObjectURL(file));}};var webViewerOpenFile=function(evt){const fileInput=PDFViewerApplication.appConfig.openFileInput;fileInput.click();};}function webViewerPresentationMode(){PDFViewerApplication.requestPresentationMode();}function webViewerSwitchAnnotationEditorMode(evt){PDFViewerApplication.pdfViewer.annotationEditorMode=evt.mode;}function webViewerSwitchAnnotationEditorParams(evt){PDFViewerApplication.pdfViewer.annotationEditorParams=evt;}function webViewerPrint(){PDFViewerApplication.triggerPrinting();}function webViewerDownload(){PDFViewerApplication.downloadOrSave();}function webViewerFirstPage(){PDFViewerApplication.page=1;}function webViewerLastPage(){PDFViewerApplication.page=PDFViewerApplication.pagesCount;}function webViewerNextPage(){PDFViewerApplication.pdfViewer.nextPage();}function webViewerPreviousPage(){PDFViewerApplication.pdfViewer.previousPage();}function webViewerZoomIn(){PDFViewerApplication.zoomIn();}function webViewerZoomOut(){PDFViewerApplication.zoomOut();}function webViewerZoomReset(){PDFViewerApplication.zoomReset();}function webViewerPageNumberChanged(evt){const pdfViewer=PDFViewerApplication.pdfViewer;if(evt.value!==""){PDFViewerApplication.pdfLinkService.goToPage(evt.value);}if(evt.value!==pdfViewer.currentPageNumber.toString()&&evt.value!==pdfViewer.currentPageLabel){var _PDFViewerApplication13;(_PDFViewerApplication13=PDFViewerApplication.toolbar)===null||_PDFViewerApplication13===void 0?void 0:_PDFViewerApplication13.setPageNumber(pdfViewer.currentPageNumber,pdfViewer.currentPageLabel);}}function webViewerScaleChanged(evt){PDFViewerApplication.pdfViewer.currentScaleValue=evt.value;}function webViewerRotateCw(){PDFViewerApplication.rotatePages(90);}function webViewerRotateCcw(){PDFViewerApplication.rotatePages(-90);}function webViewerOptionalContentConfig(evt){PDFViewerApplication.pdfViewer.optionalContentConfigPromise=evt.promise;}function webViewerSwitchScrollMode(evt){PDFViewerApplication.pdfViewer.scrollMode=evt.mode;}function webViewerSwitchSpreadMode(evt){PDFViewerApplication.pdfViewer.spreadMode=evt.mode;}function webViewerDocumentProperties(){var _PDFViewerApplication14;(_PDFViewerApplication14=PDFViewerApplication.pdfDocumentProperties)===null||_PDFViewerApplication14===void 0?void 0:_PDFViewerApplication14.open();}function webViewerFindFromUrlHash(evt){PDFViewerApplication.eventBus.dispatch("find",{source:evt.source,type:"",query:evt.query,phraseSearch:evt.phraseSearch,caseSensitive:false,entireWord:false,ignoreAccents:false,fuzzySearch:false,highlightAll:true,findPrevious:false,matchDiacritics:true});}function webViewerUpdateFindMatchesCount(_ref11){let{matchesCount}=_ref11;if(PDFViewerApplication.supportsIntegratedFind){PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);}else{PDFViewerApplication.findBar.updateResultsCount(matchesCount);}}function webViewerUpdateFindControlState(_ref12){let{state,previous,matchesCount,rawQuery}=_ref12;if(PDFViewerApplication.supportsIntegratedFind){PDFViewerApplication.externalServices.updateFindControlState({result:state,findPrevious:previous,matchesCount,rawQuery});}else{var _PDFViewerApplication15;(_PDFViewerApplication15=PDFViewerApplication.findBar)===null||_PDFViewerApplication15===void 0?void 0:_PDFViewerApplication15.updateUIState(state,previous,matchesCount);}}function webViewerScaleChanging(evt){var _PDFViewerApplication16;(_PDFViewerApplication16=PDFViewerApplication.toolbar)===null||_PDFViewerApplication16===void 0?void 0:_PDFViewerApplication16.setPageScale(evt.presetValue,evt.scale);PDFViewerApplication.pdfViewer.update();}function webViewerRotationChanging(evt){if(PDFViewerApplication.pdfThumbnailViewer){PDFViewerApplication.pdfThumbnailViewer.pagesRotation=evt.pagesRotation;}PDFViewerApplication.forceRendering();PDFViewerApplication.pdfViewer.currentPageNumber=evt.pageNumber;}function webViewerPageChanging(_ref13){var _PDFViewerApplication17,_PDFViewerApplication18,_PDFViewerApplication19,_PDFViewerApplication21;let{pageNumber,pageLabel}=_ref13;(_PDFViewerApplication17=PDFViewerApplication.toolbar)===null||_PDFViewerApplication17===void 0?void 0:_PDFViewerApplication17.setPageNumber(pageNumber,pageLabel);(_PDFViewerApplication18=PDFViewerApplication.secondaryToolbar)===null||_PDFViewerApplication18===void 0?void 0:_PDFViewerApplication18.setPageNumber(pageNumber);if(((_PDFViewerApplication19=PDFViewerApplication.pdfSidebar)===null||_PDFViewerApplication19===void 0?void 0:_PDFViewerApplication19.visibleView)===_ui_utils.SidebarView.THUMBS){var _PDFViewerApplication20;(_PDFViewerApplication20=PDFViewerApplication.pdfThumbnailViewer)===null||_PDFViewerApplication20===void 0?void 0:_PDFViewerApplication20.scrollThumbnailIntoView(pageNumber);}const currentPage=PDFViewerApplication.pdfViewer.getPageView(pageNumber-1);(_PDFViewerApplication21=PDFViewerApplication.toolbar)===null||_PDFViewerApplication21===void 0?void 0:_PDFViewerApplication21.updateLoadingIndicatorState((currentPage===null||currentPage===void 0?void 0:currentPage.renderingState)===_ui_utils.RenderingStates.RUNNING);const pageNumberInput=document.getElementById("pageNumber");if(pageNumberInput){const pageScrollEvent=new CustomEvent("page-change");pageNumberInput.dispatchEvent(pageScrollEvent);}}function webViewerResolutionChange(evt){PDFViewerApplication.pdfViewer.refresh();}function webViewerVisibilityChange(evt){if(document.visibilityState==="visible"){setZoomDisabledTimeout();}}let zoomDisabledTimeout=null;function setZoomDisabledTimeout(){if(zoomDisabledTimeout){clearTimeout(zoomDisabledTimeout);}zoomDisabledTimeout=setTimeout(function(){zoomDisabledTimeout=null;},WHEEL_ZOOM_DISABLED_TIMEOUT);}function webViewerWheel(evt){const element=document.getElementById("viewerContainer");const hover=element.parentNode.querySelector(":hover");if(hover!==element){return;}const{pdfViewer,supportedMouseWheelZoomModifierKeys,supportsPinchToZoom}=PDFViewerApplication;if(pdfViewer.isInPresentationMode){return;}const cmd=(evt.ctrlKey?1:0)|(evt.altKey?2:0)|(evt.shiftKey?4:0)|(evt.metaKey?8:0);if(window.isKeyIgnored&&window.isKeyIgnored(cmd,"WHEEL")){return;}const deltaMode=evt.deltaMode;let scaleFactor=Math.exp(-evt.deltaY/100);const isBuiltInMac=false;const isPinchToZoom=evt.ctrlKey&&!PDFViewerApplication._isCtrlKeyDown&&deltaMode===WheelEvent.DOM_DELTA_PIXEL&&evt.deltaX===0&&(Math.abs(scaleFactor-1)<0.05||isBuiltInMac)&&evt.deltaZ===0;if(isPinchToZoom||evt.ctrlKey&&supportedMouseWheelZoomModifierKeys.ctrlKey||evt.metaKey&&supportedMouseWheelZoomModifierKeys.metaKey){evt.preventDefault();if(zoomDisabledTimeout||document.visibilityState==="hidden"){return;}const previousScale=pdfViewer.currentScale;if(isPinchToZoom&&supportsPinchToZoom){scaleFactor=PDFViewerApplication._accumulateFactor(previousScale,scaleFactor,"_wheelUnusedFactor");if(scaleFactor<1){PDFViewerApplication.zoomOut(null,scaleFactor);}else if(scaleFactor>1){PDFViewerApplication.zoomIn(null,scaleFactor);}else{return;}}else{const delta=(0,_ui_utils.normalizeWheelEventDirection)(evt);let ticks=0;if(deltaMode===WheelEvent.DOM_DELTA_LINE||deltaMode===WheelEvent.DOM_DELTA_PAGE){if(Math.abs(delta)>=1){ticks=Math.sign(delta);}else{ticks=PDFViewerApplication._accumulateTicks(delta,"_wheelUnusedTicks");}}else{const PIXELS_PER_LINE_SCALE=30;ticks=PDFViewerApplication._accumulateTicks(delta/PIXELS_PER_LINE_SCALE,"_wheelUnusedTicks");}if(ticks<0){PDFViewerApplication.zoomOut(-ticks);}else if(ticks>0){PDFViewerApplication.zoomIn(ticks);}else{return;}}PDFViewerApplication._centerAtPos(previousScale,evt.clientX,evt.clientY);}else{setZoomDisabledTimeout();}}function webViewerTouchStart(evt){if(PDFViewerApplication.pdfViewer.isInPresentationMode||evt.touches.length<2){return;}evt.preventDefault();if(evt.touches.length!==2){PDFViewerApplication._touchInfo=null;return;}let[touch0,touch1]=evt.touches;if(touch0.identifier>touch1.identifier){[touch0,touch1]=[touch1,touch0];}PDFViewerApplication._touchInfo={touch0X:touch0.pageX,touch0Y:touch0.pageY,touch1X:touch1.pageX,touch1Y:touch1.pageY};}function webViewerTouchMove(evt){if(!PDFViewerApplication._touchInfo||evt.touches.length!==2){return;}const{pdfViewer,_touchInfo,supportsPinchToZoom}=PDFViewerApplication;let[touch0,touch1]=evt.touches;if(touch0.identifier>touch1.identifier){[touch0,touch1]=[touch1,touch0];}const{pageX:page0X,pageY:page0Y}=touch0;const{pageX:page1X,pageY:page1Y}=touch1;const{touch0X:pTouch0X,touch0Y:pTouch0Y,touch1X:pTouch1X,touch1Y:pTouch1Y}=_touchInfo;if(Math.abs(pTouch0X-page0X)<=1&&Math.abs(pTouch0Y-page0Y)<=1&&Math.abs(pTouch1X-page1X)<=1&&Math.abs(pTouch1Y-page1Y)<=1){return;}_touchInfo.touch0X=page0X;_touchInfo.touch0Y=page0Y;_touchInfo.touch1X=page1X;_touchInfo.touch1Y=page1Y;if(pTouch0X===page0X&&pTouch0Y===page0Y){const v1X=pTouch1X-page0X;const v1Y=pTouch1Y-page0Y;const v2X=page1X-page0X;const v2Y=page1Y-page0Y;const det=v1X*v2Y-v1Y*v2X;if(Math.abs(det)>0.02*Math.hypot(v1X,v1Y)*Math.hypot(v2X,v2Y)){return;}}else if(pTouch1X===page1X&&pTouch1Y===page1Y){const v1X=pTouch0X-page1X;const v1Y=pTouch0Y-page1Y;const v2X=page0X-page1X;const v2Y=page0Y-page1Y;const det=v1X*v2Y-v1Y*v2X;if(Math.abs(det)>0.02*Math.hypot(v1X,v1Y)*Math.hypot(v2X,v2Y)){return;}}else{const diff0X=page0X-pTouch0X;const diff1X=page1X-pTouch1X;const diff0Y=page0Y-pTouch0Y;const diff1Y=page1Y-pTouch1Y;const dotProduct=diff0X*diff1X+diff0Y*diff1Y;if(dotProduct>=0){return;}}evt.preventDefault();const distance=Math.hypot(page0X-page1X,page0Y-page1Y)||1;const pDistance=Math.hypot(pTouch0X-pTouch1X,pTouch0Y-pTouch1Y)||1;const previousScale=pdfViewer.currentScale;if(supportsPinchToZoom){const newScaleFactor=PDFViewerApplication._accumulateFactor(previousScale,distance/pDistance,"_touchUnusedFactor");if(newScaleFactor<1){PDFViewerApplication.zoomOut(null,newScaleFactor);}else if(newScaleFactor>1){PDFViewerApplication.zoomIn(null,newScaleFactor);}else{return;}}else{const PIXELS_PER_LINE_SCALE=30;const ticks=PDFViewerApplication._accumulateTicks((distance-pDistance)/PIXELS_PER_LINE_SCALE,"_touchUnusedTicks");if(ticks<0){PDFViewerApplication.zoomOut(-ticks);}else if(ticks>0){PDFViewerApplication.zoomIn(ticks);}else{return;}}PDFViewerApplication._centerAtPos(previousScale,(page0X+page1X)/2,(page0Y+page1Y)/2);}function webViewerTouchEnd(evt){if(!PDFViewerApplication._touchInfo){return;}evt.preventDefault();PDFViewerApplication._touchInfo=null;PDFViewerApplication._touchUnusedTicks=0;PDFViewerApplication._touchUnusedFactor=1;}function webViewerClick(evt){var _PDFViewerApplication22,_appConfig$toolbar3,_appConfig$secondaryT5;if(!((_PDFViewerApplication22=PDFViewerApplication.secondaryToolbar)!==null&&_PDFViewerApplication22!==void 0&&_PDFViewerApplication22.isOpen)){return;}const appConfig=PDFViewerApplication.appConfig;if(PDFViewerApplication.pdfViewer.containsElement(evt.target)||(_appConfig$toolbar3=appConfig.toolbar)!==null&&_appConfig$toolbar3!==void 0&&_appConfig$toolbar3.container.contains(evt.target)&&evt.target!==((_appConfig$secondaryT5=appConfig.secondaryToolbar)===null||_appConfig$secondaryT5===void 0?void 0:_appConfig$secondaryT5.toggleButton)){if(evt.target&&evt.target.parentElement===appConfig.secondaryToolbar.toggleButton){return;}if(evt.target&&evt.target.parentElement&&evt.target.parentElement.parentElement===appConfig.secondaryToolbar.toggleButton){return;}PDFViewerApplication.secondaryToolbar.close();}}function webViewerKeyUp(evt){if(evt.key==="Control"){PDFViewerApplication._isCtrlKeyDown=false;}}function webViewerKeyDown(evt){var _PDFViewerApplication24,_PDFViewerApplication25,_PDFViewerApplication26,_PDFViewerApplication27,_PDFViewerApplication28;PDFViewerApplication._isCtrlKeyDown=evt.key==="Control";if(PDFViewerApplication.overlayManager.active){return;}const{eventBus,pdfViewer}=PDFViewerApplication;const isViewerInPresentationMode=pdfViewer.isInPresentationMode;let handled=false,ensureViewerFocused=false;const cmd=(evt.ctrlKey?1:0)|(evt.altKey?2:0)|(evt.shiftKey?4:0)|(evt.metaKey?8:0);if(window.isKeyIgnored&&window.isKeyIgnored(cmd,evt.keyCode)){return;}if(cmd===1||cmd===8||cmd===5||cmd===12){switch(evt.keyCode){case 70:if(!PDFViewerApplication.supportsIntegratedFind&&!evt.shiftKey){var _PDFViewerApplication23;(_PDFViewerApplication23=PDFViewerApplication.findBar)===null||_PDFViewerApplication23===void 0?void 0:_PDFViewerApplication23.open();handled=true;}break;case 71:if(!PDFViewerApplication.supportsIntegratedFind){const{state}=PDFViewerApplication.findController;if(state){const newState={source:window,type:"again",findPrevious:cmd===5||cmd===12};eventBus.dispatch("find",{...state,...newState});}handled=true;}break;case 61:case 107:case 187:case 171:PDFViewerApplication.zoomIn();handled=true;break;case 173:case 109:case 189:PDFViewerApplication.zoomOut();handled=true;break;case 48:case 96:if(!isViewerInPresentationMode){setTimeout(function(){PDFViewerApplication.zoomReset();});handled=false;}break;case 38:if(isViewerInPresentationMode||PDFViewerApplication.page>1){PDFViewerApplication.page=1;handled=true;ensureViewerFocused=true;}break;case 40:if(isViewerInPresentationMode||PDFViewerApplication.page<PDFViewerApplication.pagesCount){PDFViewerApplication.page=PDFViewerApplication.pagesCount;handled=true;ensureViewerFocused=true;}break;}}if(cmd===1||cmd===8){switch(evt.keyCode){case 83:eventBus.dispatch("download",{source:window});handled=true;break;case 79:{eventBus.dispatch("openfile",{source:window});handled=true;}break;}}if(cmd===3||cmd===10){switch(evt.keyCode){case 80:PDFViewerApplication.requestPresentationMode();handled=true;PDFViewerApplication.externalServices.reportTelemetry({type:"buttons",data:{id:"presentationModeKeyboard"}});break;case 71:if(PDFViewerApplication.appConfig.toolbar){PDFViewerApplication.appConfig.toolbar.pageNumber.select();handled=true;}break;}}if(handled){if(ensureViewerFocused&&!isViewerInPresentationMode){pdfViewer.focus();}evt.preventDefault();return;}const curElement=(0,_ui_utils.getActiveOrFocusedElement)();const curElementTagName=curElement===null||curElement===void 0?void 0:curElement.tagName.toUpperCase();if(curElementTagName==="INPUT"||curElementTagName==="TEXTAREA"||curElementTagName==="SELECT"||curElement!==null&&curElement!==void 0&&curElement.isContentEditable){if(evt.keyCode!==27){return;}}if(cmd===0){let turnPage=0,turnOnlyIfPageFit=false;switch(evt.keyCode){case 38:case 33:if(pdfViewer.isVerticalScrollbarEnabled){turnOnlyIfPageFit=true;}turnPage=-1;break;case 8:if(!isViewerInPresentationMode){turnOnlyIfPageFit=true;}turnPage=-1;break;case 37:if(pdfViewer.isHorizontalScrollbarEnabled){turnOnlyIfPageFit=true;}case 75:case 80:turnPage=-1;break;case 27:if((_PDFViewerApplication24=PDFViewerApplication.secondaryToolbar)!==null&&_PDFViewerApplication24!==void 0&&_PDFViewerApplication24.isOpen){PDFViewerApplication.secondaryToolbar.close();handled=true;}if(!PDFViewerApplication.supportsIntegratedFind&&(_PDFViewerApplication25=PDFViewerApplication.findBar)!==null&&_PDFViewerApplication25!==void 0&&_PDFViewerApplication25.opened){PDFViewerApplication.findBar.close();handled=true;}break;case 40:case 34:if(pdfViewer.isVerticalScrollbarEnabled){turnOnlyIfPageFit=true;}turnPage=1;break;case 13:case 32:if(!isViewerInPresentationMode){turnOnlyIfPageFit=true;}turnPage=1;break;case 39:if(pdfViewer.isHorizontalScrollbarEnabled){turnOnlyIfPageFit=true;}case 74:case 78:turnPage=1;break;case 36:if(isViewerInPresentationMode||PDFViewerApplication.page>1){PDFViewerApplication.page=1;handled=true;ensureViewerFocused=true;}break;case 35:if(isViewerInPresentationMode||PDFViewerApplication.page<PDFViewerApplication.pagesCount){PDFViewerApplication.page=PDFViewerApplication.pagesCount;handled=true;ensureViewerFocused=true;}break;case 83:(_PDFViewerApplication26=PDFViewerApplication.pdfCursorTools)===null||_PDFViewerApplication26===void 0?void 0:_PDFViewerApplication26.switchTool(_ui_utils.CursorTool.SELECT);break;case 72:(_PDFViewerApplication27=PDFViewerApplication.pdfCursorTools)===null||_PDFViewerApplication27===void 0?void 0:_PDFViewerApplication27.switchTool(_ui_utils.CursorTool.HAND);break;case 82:PDFViewerApplication.rotatePages(90);break;case 115:(_PDFViewerApplication28=PDFViewerApplication.pdfSidebar)===null||_PDFViewerApplication28===void 0?void 0:_PDFViewerApplication28.toggle();break;}if(turnPage!==0&&(!turnOnlyIfPageFit||pdfViewer.currentScaleValue==="page-fit")){if(turnPage>0){pdfViewer.nextPage();}else{pdfViewer.previousPage();}handled=true;}}if(cmd===4){switch(evt.keyCode){case 13:case 32:if(!isViewerInPresentationMode&&pdfViewer.currentScaleValue!=="page-fit"){break;}pdfViewer.previousPage();handled=true;break;case 82:PDFViewerApplication.rotatePages(-90);break;}}if(ensureViewerFocused&&!pdfViewer.containsElement(curElement)){pdfViewer.focus();}if(handled){evt.preventDefault();}}function beforeUnload(evt){evt.preventDefault();evt.returnValue="";return false;}function webViewerAnnotationEditorStatesChanged(data){PDFViewerApplication.externalServices.updateEditorStates(data);}const PDFPrintServiceFactory={instance:{supportsPrinting:false,createPrintService(){throw new Error("Not implemented: createPrintService");}}};exports.PDFPrintServiceFactory=PDFPrintServiceFactory;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.animationStarted=exports.VERTICAL_PADDING=exports.UNKNOWN_SCALE=exports.TextLayerMode=exports.SpreadMode=exports.SidebarView=exports.ScrollMode=exports.SCROLLBAR_PADDING=exports.RenderingStates=exports.RendererType=exports.ProgressBar=exports.PresentationModeState=exports.OutputScale=exports.MIN_SCALE=exports.MAX_SCALE=exports.MAX_AUTO_SCALE=exports.DEFAULT_SCALE_VALUE=exports.DEFAULT_SCALE_DELTA=exports.DEFAULT_SCALE=exports.CursorTool=exports.AutoPrintRegExp=void 0;exports.apiPageLayoutToViewerModes=apiPageLayoutToViewerModes;exports.apiPageModeToSidebarView=apiPageModeToSidebarView;exports.approximateFraction=approximateFraction;exports.backtrackBeforeAllVisibleElements=backtrackBeforeAllVisibleElements;exports.binarySearchFirstItem=binarySearchFirstItem;exports.docStyle=void 0;exports.getActiveOrFocusedElement=getActiveOrFocusedElement;exports.getPageSizeInches=getPageSizeInches;exports.getVisibleElements=getVisibleElements;exports.isPortraitOrientation=isPortraitOrientation;exports.isValidRotation=isValidRotation;exports.isValidScrollMode=isValidScrollMode;exports.isValidSpreadMode=isValidSpreadMode;exports.noContextMenuHandler=noContextMenuHandler;exports.normalizeWheelEventDelta=normalizeWheelEventDelta;exports.normalizeWheelEventDirection=normalizeWheelEventDirection;exports.parseQueryString=parseQueryString;exports.removeNullCharacters=removeNullCharacters;exports.roundToDivide=roundToDivide;exports.scrollIntoView=scrollIntoView;exports.watchScroll=watchScroll;const DEFAULT_SCALE_VALUE="auto";exports.DEFAULT_SCALE_VALUE=DEFAULT_SCALE_VALUE;const DEFAULT_SCALE=1.0;exports.DEFAULT_SCALE=DEFAULT_SCALE;const DEFAULT_SCALE_DELTA=1.1;exports.DEFAULT_SCALE_DELTA=DEFAULT_SCALE_DELTA;const MIN_SCALE=0.1;exports.MIN_SCALE=MIN_SCALE;const MAX_SCALE=10.0;exports.MAX_SCALE=MAX_SCALE;const UNKNOWN_SCALE=0;exports.UNKNOWN_SCALE=UNKNOWN_SCALE;const MAX_AUTO_SCALE=1.25;exports.MAX_AUTO_SCALE=MAX_AUTO_SCALE;const SCROLLBAR_PADDING=40;exports.SCROLLBAR_PADDING=SCROLLBAR_PADDING;const VERTICAL_PADDING=5;exports.VERTICAL_PADDING=VERTICAL_PADDING;const RenderingStates={INITIAL:0,RUNNING:1,PAUSED:2,FINISHED:3};exports.RenderingStates=RenderingStates;const PresentationModeState={UNKNOWN:0,NORMAL:1,CHANGING:2,FULLSCREEN:3};exports.PresentationModeState=PresentationModeState;const SidebarView={UNKNOWN:-1,NONE:0,THUMBS:1,OUTLINE:2,ATTACHMENTS:3,LAYERS:4};exports.SidebarView=SidebarView;const RendererType={CANVAS:"canvas",SVG:"svg"};exports.RendererType=RendererType;const TextLayerMode={DISABLE:0,ENABLE:1};exports.TextLayerMode=TextLayerMode;const ScrollMode={UNKNOWN:-1,VERTICAL:0,HORIZONTAL:1,WRAPPED:2,PAGE:3};exports.ScrollMode=ScrollMode;const SpreadMode={UNKNOWN:-1,NONE:0,ODD:1,EVEN:2};exports.SpreadMode=SpreadMode;const CursorTool={SELECT:0,HAND:1,ZOOM:2};exports.CursorTool=CursorTool;const AutoPrintRegExp=/\bprint\s*\(/;exports.AutoPrintRegExp=AutoPrintRegExp;class OutputScale{constructor(){const pixelRatio=window.devicePixelRatio||1;this.sx=pixelRatio;this.sy=pixelRatio;}get scaled(){return this.sx!==1||this.sy!==1;}}exports.OutputScale=OutputScale;function scrollIntoView(element,spot){var _element$parentElemen,_element$parentElemen2,_element$parentElemen3;let scrollMatches=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;let infiniteScroll=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;if(element.classList.contains("stf__item")||(_element$parentElemen=element.parentElement)!==null&&_element$parentElemen!==void 0&&_element$parentElemen.classList.contains("stf__item")||(_element$parentElemen2=element.parentElement)!==null&&_element$parentElemen2!==void 0&&(_element$parentElemen3=_element$parentElemen2.parentElement)!==null&&_element$parentElemen3!==void 0&&_element$parentElemen3.classList.contains("stf__item")){return;}let parent=element.offsetParent;if(!parent){globalThis.ngxConsole.error("offsetParent is not set -- cannot scroll");return;}let offsetY=element.offsetTop+element.clientTop;let offsetX=element.offsetLeft+element.clientLeft;while(parent.clientHeight===parent.scrollHeight&&parent.clientWidth===parent.scrollWidth||scrollMatches&&(parent.classList.contains("markedContent")||getComputedStyle(parent).overflow==="hidden")){offsetY+=parent.offsetTop;offsetX+=parent.offsetLeft;parent=parent.offsetParent;if(!parent){if(infiniteScroll){if(document.body.clientHeight>offsetY){offsetY-=32;window.scrollTo(window.scrollX,offsetY);}}return;}}if(spot){if(spot.top!==undefined){offsetY+=spot.top;}if(spot.left!==undefined){offsetX+=spot.left;parent.scrollLeft=offsetX;}}parent.scrollTop=offsetY;}function watchScroll(viewAreaElement,callback){const debounceScroll=function(evt){if(rAF){return;}rAF=window.requestAnimationFrame(function viewAreaElementScrolled(){rAF=null;const currentX=viewAreaElement.scrollLeft;const lastX=state.lastX;if(currentX!==lastX){state.right=currentX>lastX;}state.lastX=currentX;const currentY=viewAreaElement.scrollTop;const lastY=state.lastY;if(currentY!==lastY){state.down=currentY>lastY;}state.lastY=currentY;callback(state);});};const state={right:true,down:true,lastX:viewAreaElement.scrollLeft,lastY:viewAreaElement.scrollTop,_eventHandler:debounceScroll};let rAF=null;viewAreaElement.addEventListener("scroll",debounceScroll,true);return state;}function parseQueryString(query){const params=new Map();for(const[key,value]of new URLSearchParams(query)){params.set(key.toLowerCase(),value);}return params;}const InvisibleCharactersRegExp=/[\x01-\x1F]/g;function removeNullCharacters(str){let replaceInvisible=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(typeof str!=="string"){console.error(`The argument must be a string.`);return str;}if(replaceInvisible){str=str.replaceAll(InvisibleCharactersRegExp," ");}return str.replaceAll("\x00","");}function binarySearchFirstItem(items,condition){let start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;let minIndex=start;let maxIndex=items.length-1;if(maxIndex<0||!condition(items[maxIndex])){return items.length;}if(condition(items[minIndex])){return minIndex;}while(minIndex<maxIndex){const currentIndex=minIndex+maxIndex>>1;const currentItem=items[currentIndex];if(condition(currentItem)){maxIndex=currentIndex;}else{minIndex=currentIndex+1;}}return minIndex;}function approximateFraction(x){if(Math.floor(x)===x){return[x,1];}const xinv=1/x;const limit=8;if(xinv>limit){return[1,limit];}else if(Math.floor(xinv)===xinv){return[1,xinv];}const x_=x>1?xinv:x;let a=0,b=1,c=1,d=1;while(true){const p=a+c,q=b+d;if(q>limit){break;}if(x_<=p/q){c=p;d=q;}else{a=p;b=q;}}let result;if(x_-a/b<c/d-x_){result=x_===x?[a,b]:[b,a];}else{result=x_===x?[c,d]:[d,c];}return result;}function roundToDivide(x,div){const r=x%div;return r===0?x:Math.round(x-r+div);}function getPageSizeInches(_ref){let{view,userUnit,rotate}=_ref;const[x1,y1,x2,y2]=view;const changeOrientation=rotate%180!==0;const width=(x2-x1)/72*userUnit;const height=(y2-y1)/72*userUnit;return{width:changeOrientation?height:width,height:changeOrientation?width:height};}function backtrackBeforeAllVisibleElements(index,views,top){if(index<2){return index;}let elt=views[index].div;let pageTop=elt.offsetTop+elt.clientTop;if(pageTop>=top){elt=views[index-1].div;pageTop=elt.offsetTop+elt.clientTop;}for(let i=index-2;i>=0;--i){elt=views[i].div;if(elt.offsetTop+elt.clientTop+elt.clientHeight<=pageTop){break;}index=i;}return index;}function getVisibleElements(_ref2){let{scrollEl,views,sortByVisibility=false,horizontal=false,rtl=false}=_ref2;const top=scrollEl.scrollTop,bottom=top+scrollEl.clientHeight;const left=scrollEl.scrollLeft,right=left+scrollEl.clientWidth;function isElementBottomAfterViewTop(view){const element=view.div;const elementBottom=element.offsetTop+element.clientTop+element.clientHeight;return elementBottom>top;}function isElementNextAfterViewHorizontally(view){const element=view.div;const elementLeft=element.offsetLeft+element.clientLeft;const elementRight=elementLeft+element.clientWidth;return rtl?elementLeft<right:elementRight>left;}const visible=[],ids=new Set(),numViews=views.length;let firstVisibleElementInd=binarySearchFirstItem(views,horizontal?isElementNextAfterViewHorizontally:isElementBottomAfterViewTop);if(firstVisibleElementInd>0&&firstVisibleElementInd<numViews&&!horizontal){firstVisibleElementInd=backtrackBeforeAllVisibleElements(firstVisibleElementInd,views,top);}let lastEdge=horizontal?right:-1;for(let i=firstVisibleElementInd;i<numViews;i++){const view=views[i],element=view.div;const currentWidth=element.offsetLeft+element.clientLeft;const currentHeight=element.offsetTop+element.clientTop;const viewWidth=element.clientWidth,viewHeight=element.clientHeight;const viewRight=currentWidth+viewWidth;const viewBottom=currentHeight+viewHeight;if(lastEdge===-1){if(viewBottom>=bottom){lastEdge=viewBottom;}}else if((horizontal?currentWidth:currentHeight)>lastEdge){break;}if(viewBottom<=top||currentHeight>=bottom||viewRight<=left||currentWidth>=right){continue;}const hiddenHeight=Math.max(0,top-currentHeight)+Math.max(0,viewBottom-bottom);const hiddenWidth=Math.max(0,left-currentWidth)+Math.max(0,viewRight-right);const fractionHeight=(viewHeight-hiddenHeight)/viewHeight,fractionWidth=(viewWidth-hiddenWidth)/viewWidth;const percent=fractionHeight*fractionWidth*100|0;visible.push({id:view.id,x:currentWidth,y:currentHeight,view,percent,widthPercent:fractionWidth*100|0});ids.add(view.id);}const first=visible[0],last=visible.at(-1);if(sortByVisibility){visible.sort(function(a,b){const pc=a.percent-b.percent;if(Math.abs(pc)>0.001){return-pc;}return a.id-b.id;});}return{first,last,views:visible,ids};}function noContextMenuHandler(evt){evt.preventDefault();}function normalizeWheelEventDirection(evt){let delta=Math.hypot(evt.deltaX,evt.deltaY);const angle=Math.atan2(evt.deltaY,evt.deltaX);if(-0.25*Math.PI<angle&&angle<0.75*Math.PI){delta=-delta;}return delta;}function normalizeWheelEventDelta(evt){const deltaMode=evt.deltaMode;let delta=normalizeWheelEventDirection(evt);const MOUSE_PIXELS_PER_LINE=30;const MOUSE_LINES_PER_PAGE=30;if(deltaMode===WheelEvent.DOM_DELTA_PIXEL){delta/=MOUSE_PIXELS_PER_LINE*MOUSE_LINES_PER_PAGE;}else if(deltaMode===WheelEvent.DOM_DELTA_LINE){delta/=MOUSE_LINES_PER_PAGE;}return delta;}function isValidRotation(angle){return Number.isInteger(angle)&&angle%90===0;}function isValidScrollMode(mode){return Number.isInteger(mode)&&Object.values(ScrollMode).includes(mode)&&mode!==ScrollMode.UNKNOWN;}function isValidSpreadMode(mode){return Number.isInteger(mode)&&Object.values(SpreadMode).includes(mode)&&mode!==SpreadMode.UNKNOWN;}function isPortraitOrientation(size){return size.width<=size.height;}const animationStarted=new Promise(function(resolve){window.ngxZone.runOutsideAngular(()=>{window.requestAnimationFrame(resolve);});});exports.animationStarted=animationStarted;const docStyle=document.documentElement.style;exports.docStyle=docStyle;function clamp(v,min,max){return Math.min(Math.max(v,min),max);}class ProgressBar{#classList=null;#disableAutoFetchTimeout=null;#percent=0;#style=null;#visible=true;constructor(bar){this.#classList=bar.classList;this.#style=bar.style;}get percent(){return this.#percent;}set percent(val){this.#percent=clamp(val,0,100);if(isNaN(val)){this.#classList.add("indeterminate");return;}this.#classList.remove("indeterminate");this.#style.setProperty("--progressBar-percent",`${this.#percent}%`);}setWidth(viewer){if(!viewer){return;}const container=viewer.parentNode;const scrollbarWidth=container.offsetWidth-viewer.offsetWidth;if(scrollbarWidth>0){this.#style.setProperty("--progressBar-end-offset",`${scrollbarWidth}px`);}}setDisableAutoFetch(){let delay=arguments.length>0&&arguments[0]!==undefined?arguments[0]:5000;if(isNaN(this.#percent)){return;}if(this.#disableAutoFetchTimeout){clearTimeout(this.#disableAutoFetchTimeout);}this.show();this.#disableAutoFetchTimeout=setTimeout(()=>{this.#disableAutoFetchTimeout=null;this.hide();},delay);}hide(){if(!this.#visible){return;}this.#visible=false;this.#classList.add("hidden");}show(){if(this.#visible){return;}this.#visible=true;this.#classList.remove("hidden");}}exports.ProgressBar=ProgressBar;function getActiveOrFocusedElement(){let curRoot=document;let curActiveOrFocused=curRoot.activeElement||curRoot.querySelector(":focus");while((_curActiveOrFocused=curActiveOrFocused)!==null&&_curActiveOrFocused!==void 0&&_curActiveOrFocused.shadowRoot){var _curActiveOrFocused;curRoot=curActiveOrFocused.shadowRoot;curActiveOrFocused=curRoot.activeElement||curRoot.querySelector(":focus");}return curActiveOrFocused;}function apiPageLayoutToViewerModes(layout){let scrollMode=ScrollMode.VERTICAL,spreadMode=SpreadMode.NONE;switch(layout){case"SinglePage":scrollMode=ScrollMode.PAGE;break;case"OneColumn":break;case"TwoPageLeft":scrollMode=ScrollMode.PAGE;case"TwoColumnLeft":spreadMode=SpreadMode.ODD;break;case"TwoPageRight":scrollMode=ScrollMode.PAGE;case"TwoColumnRight":spreadMode=SpreadMode.EVEN;break;}return{scrollMode,spreadMode};}function apiPageModeToSidebarView(mode){switch(mode){case"UseNone":return SidebarView.NONE;case"UseThumbs":return SidebarView.THUMBS;case"UseOutlines":return SidebarView.OUTLINE;case"UseAttachments":return SidebarView.ATTACHMENTS;case"UseOC":return SidebarView.LAYERS;}return SidebarView.NONE;}

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
globalThis["pdfjs-dist/build/pdf"]=module.exports=window["pdfjs-dist/build/pdf"];

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.compatibilityParams=exports.OptionKind=exports.AppOptions=void 0;const compatibilityParams=Object.create(null);exports.compatibilityParams=compatibilityParams;{const userAgent=navigator.userAgent||"";const platform=navigator.platform||"";const maxTouchPoints=navigator.maxTouchPoints||1;const isAndroid=/Android/.test(userAgent);const isIOS=/\b(iPad|iPhone|iPod)(?=;)/.test(userAgent)||platform==="MacIntel"&&maxTouchPoints>1;(function checkCanvasSizeLimitation(){if(isIOS||isAndroid){compatibilityParams.maxCanvasPixels=5242880;}})();}const OptionKind={VIEWER:0x02,API:0x04,WORKER:0x08,PREFERENCE:0x80};exports.OptionKind=OptionKind;const defaultOptions={annotationEditorMode:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},annotationMode:{value:2,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},cursorToolOnLoad:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},defaultZoomDelay:{value:400,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},defaultZoomValue:{value:"",kind:OptionKind.VIEWER+OptionKind.PREFERENCE},disableHistory:{value:false,kind:OptionKind.VIEWER},disablePageLabels:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enablePermissions:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enablePrintAutoRotate:{value:true,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enableScripting:{value:true,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},externalLinkRel:{value:"noopener noreferrer nofollow",kind:OptionKind.VIEWER},externalLinkTarget:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},historyUpdateUrl:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},ignoreDestinationZoom:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},imageResourcesPath:{value:"./images/",kind:OptionKind.VIEWER},maxCanvasPixels:{value:16777216,kind:OptionKind.VIEWER},forcePageColors:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},pageColorsBackground:{value:"Canvas",kind:OptionKind.VIEWER+OptionKind.PREFERENCE},pageColorsForeground:{value:"CanvasText",kind:OptionKind.VIEWER+OptionKind.PREFERENCE},pdfBugEnabled:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},printResolution:{value:150,kind:OptionKind.VIEWER},removePageBorders:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},sidebarViewOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},scrollModeOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},spreadModeOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},textLayerMode:{value:1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},useOnlyCssZoom:{value:false,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},viewerCssTheme:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},viewOnLoad:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},cMapPacked:{value:true,kind:OptionKind.API},cMapUrl:{value:"../web/cmaps/",kind:OptionKind.API},disableAutoFetch:{value:false,kind:OptionKind.API+OptionKind.PREFERENCE},disableFontFace:{value:false,kind:OptionKind.API+OptionKind.PREFERENCE},disableRange:{value:false,kind:OptionKind.API+OptionKind.PREFERENCE},disableStream:{value:false,kind:OptionKind.API+OptionKind.PREFERENCE},docBaseUrl:{value:"",kind:OptionKind.API},enableXfa:{value:true,kind:OptionKind.API+OptionKind.PREFERENCE},fontExtraProperties:{value:false,kind:OptionKind.API},isEvalSupported:{value:true,kind:OptionKind.API},isOffscreenCanvasSupported:{value:true,kind:OptionKind.API},maxImageSize:{value:-1,kind:OptionKind.API},pdfBug:{value:false,kind:OptionKind.API},standardFontDataUrl:{value:"../web/standard_fonts/",kind:OptionKind.API},verbosity:{value:1,kind:OptionKind.API},workerPort:{value:null,kind:OptionKind.WORKER},workerSrc:{value:"./assets/pdf.worker.js",kind:OptionKind.WORKER}};{defaultOptions.defaultUrl={value:"compressed.tracemonkey-pldi-09.pdf",kind:OptionKind.VIEWER};defaultOptions.disablePreferences={value:false,kind:OptionKind.VIEWER};defaultOptions.locale={value:navigator.language||"en-US",kind:OptionKind.VIEWER};defaultOptions.renderer={value:"canvas",kind:OptionKind.VIEWER+OptionKind.PREFERENCE};defaultOptions.sandboxBundleSrc={value:"../build/pdf.sandbox.js",kind:OptionKind.VIEWER};}const userOptions=Object.create(null);if(globalThis.pdfDefaultOptions){for(const key in globalThis.pdfDefaultOptions){userOptions[key]=globalThis.pdfDefaultOptions[key];}}class AppOptions{constructor(){throw new Error("Cannot initialize AppOptions.");}static get(name){const userOption=userOptions[name];if(userOption!==undefined){return userOption;}const defaultOption=defaultOptions[name];if(defaultOption!==undefined){return compatibilityParams[name]??defaultOption.value;}return undefined;}static getAll(){let kind=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;const options=Object.create(null);for(const name in defaultOptions){const defaultOption=defaultOptions[name];if(kind){if((kind&defaultOption.kind)===0){continue;}if(kind===OptionKind.PREFERENCE){const value=defaultOption.value,valueType=typeof value;if(valueType==="boolean"||valueType==="string"||valueType==="number"&&Number.isInteger(value)){options[name]=value;continue;}throw new Error(`Invalid type for preference: ${name}`);}}const userOption=userOptions[name];options[name]=userOption!==undefined?userOption:compatibilityParams[name]??defaultOption.value;}return options;}static set(name,value){userOptions[name]=value;}static setAll(options){for(const name in options){userOptions[name]=options[name];}}static remove(name){delete userOptions[name];}}exports.AppOptions=AppOptions;{AppOptions._hasUserOptions=function(){return Object.keys(userOptions).length>0;};}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.WaitOnType=exports.EventBus=exports.AutomationEventBus=void 0;exports.waitOnEventOrTimeout=waitOnEventOrTimeout;const WaitOnType={EVENT:"event",TIMEOUT:"timeout"};exports.WaitOnType=WaitOnType;function waitOnEventOrTimeout(_ref){let{target,name,delay=0}=_ref;return new Promise(function(resolve,reject){if(typeof target!=="object"||!(name&&typeof name==="string")||!(Number.isInteger(delay)&&delay>=0)){throw new Error("waitOnEventOrTimeout - invalid parameters.");}function handler(type){if(target instanceof EventBus){target._off(name,eventHandler);}else{target.removeEventListener(name,eventHandler);}if(timeout){clearTimeout(timeout);}resolve(type);}const eventHandler=handler.bind(null,WaitOnType.EVENT);if(target instanceof EventBus){target._on(name,eventHandler);}else{target.addEventListener(name,eventHandler);}const timeoutHandler=handler.bind(null,WaitOnType.TIMEOUT);const timeout=setTimeout(timeoutHandler,delay);});}class EventBus{#listeners=Object.create(null);on(eventName,listener){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._on(eventName,listener,{external:true,once:options===null||options===void 0?void 0:options.once});}off(eventName,listener){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._off(eventName,listener,{external:true,once:options===null||options===void 0?void 0:options.once});}dispatch(eventName,data){const eventListeners=this.#listeners[eventName];if(!eventListeners||eventListeners.length===0){return;}let externalListeners;for(const{listener,external,once}of eventListeners.slice(0)){if(once){this._off(eventName,listener);}if(external){(externalListeners||=[]).push(listener);continue;}listener(data);}if(externalListeners){for(const listener of externalListeners){listener(data);}externalListeners=null;}}_on(eventName,listener){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;const eventListeners=this.#listeners[eventName]||=[];eventListeners.push({listener,external:(options===null||options===void 0?void 0:options.external)===true,once:(options===null||options===void 0?void 0:options.once)===true});}_off(eventName,listener){let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;const eventListeners=this.#listeners[eventName];if(!eventListeners){return;}for(let i=0,ii=eventListeners.length;i<ii;i++){if(eventListeners[i].listener===listener){eventListeners.splice(i,1);return;}}}}exports.EventBus=EventBus;class AutomationEventBus extends EventBus{dispatch(eventName,data){throw new Error("Not implemented: AutomationEventBus.dispatch");}}exports.AutomationEventBus=AutomationEventBus;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.SimpleLinkService=exports.PDFLinkService=exports.LinkTarget=void 0;var _ui_utils=__webpack_require__(3);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classStaticPrivateMethodGet(receiver,classConstructor,method){_classCheckPrivateStaticAccess(receiver,classConstructor);return method;}function _classCheckPrivateStaticAccess(receiver,classConstructor){if(receiver!==classConstructor){throw new TypeError("Private static access of wrong provenance");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}const DEFAULT_LINK_REL="noopener noreferrer nofollow";const LinkTarget={NONE:0,SELF:1,BLANK:2,PARENT:3,TOP:4};exports.LinkTarget=LinkTarget;function addLinkAttributes(link){let{url,target,rel,enabled=true}=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(!url||typeof url!=="string"){throw new Error('A valid "url" parameter must provided.');}const urlNullRemoved=(0,_ui_utils.removeNullCharacters)(url);if(enabled){link.href=link.title=urlNullRemoved;}else{link.href="";link.title=`Disabled: ${urlNullRemoved}`;link.onclick=()=>{return false;};}let targetStr="";switch(target){case LinkTarget.NONE:break;case LinkTarget.SELF:targetStr="_self";break;case LinkTarget.BLANK:targetStr="_blank";break;case LinkTarget.PARENT:targetStr="_parent";break;case LinkTarget.TOP:targetStr="_top";break;}link.target=targetStr;link.rel=typeof rel==="string"?rel:DEFAULT_LINK_REL;}var _pagesRefCache=/*#__PURE__*/new WeakMap();var _goToDestinationHelper=/*#__PURE__*/new WeakSet();class PDFLinkService{constructor(){let{eventBus,externalLinkTarget=null,externalLinkRel=null,ignoreDestinationZoom=false}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classPrivateMethodInitSpec(this,_goToDestinationHelper);_classPrivateFieldInitSpec(this,_pagesRefCache,{writable:true,value:new Map()});this.eventBus=eventBus;this.externalLinkTarget=externalLinkTarget;this.externalLinkRel=externalLinkRel;this.externalLinkEnabled=true;this._ignoreDestinationZoom=ignoreDestinationZoom;this.baseUrl=null;this.pdfDocument=null;this.pdfViewer=null;this.pdfHistory=null;}setDocument(pdfDocument){let baseUrl=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;this.baseUrl=baseUrl;this.pdfDocument=pdfDocument;_classPrivateFieldGet(this,_pagesRefCache).clear();}setViewer(pdfViewer){this.pdfViewer=pdfViewer;}setHistory(pdfHistory){this.pdfHistory=pdfHistory;}get pagesCount(){return this.pdfDocument?this.pdfDocument.numPages:0;}get page(){return this.pdfViewer.currentPageNumber;}set page(value){this.pdfViewer.currentPageNumber=value;}get rotation(){return this.pdfViewer.pagesRotation;}set rotation(value){this.pdfViewer.pagesRotation=value;}get isInPresentationMode(){return this.pdfViewer.isInPresentationMode;}async goToDestination(dest){if(!this.pdfDocument){return;}let namedDest,explicitDest;if(typeof dest==="string"){namedDest=dest;explicitDest=await this.pdfDocument.getDestination(dest);}else{namedDest=null;explicitDest=await dest;}if(!Array.isArray(explicitDest)){globalThis.ngxConsole.error(`PDFLinkService.goToDestination: "${explicitDest}" is not `+`a valid destination array, for dest="${dest}".`);return;}_classPrivateMethodGet(this,_goToDestinationHelper,_goToDestinationHelper2).call(this,dest,namedDest,explicitDest);}goToPage(val){if(!this.pdfDocument){return;}const pageNumber=typeof val==="string"&&this.pdfViewer.pageLabelToPageNumber(val)||val|0;if(!(Number.isInteger(pageNumber)&&pageNumber>0&&pageNumber<=this.pagesCount)){globalThis.ngxConsole.error(`PDFLinkService.goToPage: "${val}" is not a valid page.`);return;}if(this.pdfHistory){this.pdfHistory.pushCurrentPosition();this.pdfHistory.pushPage(pageNumber);}if(this.pdfViewer.pageViewMode==="book"){if(this.pdfViewer.pageFlip){this.pdfViewer.ensureAdjecentPagesAreLoaded();const evenPage=this.pdfViewer.currentPageNumber-this.pdfViewer.currentPageNumber%2;const evenTargetPage=pageNumber-pageNumber%2;if(evenPage===evenTargetPage-2){this.pdfViewer.pageFlip.flipNext();}else if(evenPage===evenTargetPage+2){this.pdfViewer.pageFlip.flipPrev();}else{this.pdfViewer.pageFlip.turnToPage(pageNumber-1);}}}else{this.pdfViewer.scrollPageIntoView({pageNumber});}}addLinkAttributes(link,url){let newWindow=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;addLinkAttributes(link,{url,target:newWindow?LinkTarget.BLANK:this.externalLinkTarget,rel:this.externalLinkRel,enabled:this.externalLinkEnabled});}getDestinationHash(dest){if(typeof dest==="string"){if(dest.length>0){return this.getAnchorUrl("#"+escape(dest));}}else if(Array.isArray(dest)){const str=JSON.stringify(dest);if(str.length>0){return this.getAnchorUrl("#"+escape(str));}}return this.getAnchorUrl("");}getAnchorUrl(anchor){return this.baseUrl?this.baseUrl+anchor:anchor;}setHash(hash){if(!this.pdfDocument){return;}let pageNumber,dest;if(hash.includes("=")){const params=(0,_ui_utils.parseQueryString)(hash);if(params.has("search")){this.eventBus.dispatch("findfromurlhash",{source:this,query:params.get("search").replaceAll('"',""),phraseSearch:params.get("phrase")==="true"});}if(params.has("page")){pageNumber=params.get("page")|0||1;}if(params.has("zoom")){const zoomArgs=params.get("zoom").split(",");const zoomArg=zoomArgs[0];const zoomArgNumber=parseFloat(zoomArg);if(!zoomArg.includes("Fit")){dest=[null,{name:"XYZ"},zoomArgs.length>1?zoomArgs[1]|0:null,zoomArgs.length>2?zoomArgs[2]|0:null,zoomArgNumber?zoomArgNumber/100:zoomArg];}else{if(zoomArg==="Fit"||zoomArg==="FitB"){dest=[null,{name:zoomArg}];}else if(zoomArg==="FitH"||zoomArg==="FitBH"||zoomArg==="FitV"||zoomArg==="FitBV"){dest=[null,{name:zoomArg},zoomArgs.length>1?zoomArgs[1]|0:null];}else if(zoomArg==="FitR"){if(zoomArgs.length!==5){globalThis.ngxConsole.error('PDFLinkService.setHash: Not enough parameters for "FitR".');}else{dest=[null,{name:zoomArg},zoomArgs[1]|0,zoomArgs[2]|0,zoomArgs[3]|0,zoomArgs[4]|0];}}else{globalThis.ngxConsole.error(`PDFLinkService.setHash: "${zoomArg}" is not a valid zoom value.`);}}}if(dest){this.pdfViewer.scrollPageIntoView({pageNumber:pageNumber||this.page,destArray:dest,allowNegativeOffset:true});}else if(pageNumber){this.page=pageNumber;}if(params.has("pagemode")){this.eventBus.dispatch("pagemode",{source:this,mode:params.get("pagemode")});}if(params.has("nameddest")){this.goToDestination(params.get("nameddest"));}}else{dest=unescape(hash);try{dest=JSON.parse(dest);if(!Array.isArray(dest)){dest=dest.toString();}}catch(ex){}if(typeof dest==="string"||_classStaticPrivateMethodGet(PDFLinkService,PDFLinkService,_isValidExplicitDestination).call(PDFLinkService,dest)){this.goToDestination(dest);return;}globalThis.ngxConsole.error(`PDFLinkService.setHash: "${unescape(hash)}" is not a valid destination.`);}}executeNamedAction(action){var _this$pdfHistory,_this$pdfHistory2;switch(action){case"GoBack":(_this$pdfHistory=this.pdfHistory)===null||_this$pdfHistory===void 0?void 0:_this$pdfHistory.back();break;case"GoForward":(_this$pdfHistory2=this.pdfHistory)===null||_this$pdfHistory2===void 0?void 0:_this$pdfHistory2.forward();break;case"NextPage":this.pdfViewer.nextPage();break;case"PrevPage":this.pdfViewer.previousPage();break;case"LastPage":this.page=this.pagesCount;break;case"FirstPage":this.page=1;break;default:break;}this.eventBus.dispatch("namedaction",{source:this,action});}async executeSetOCGState(action){const pdfDocument=this.pdfDocument;const optionalContentConfig=await this.pdfViewer.optionalContentConfigPromise;if(pdfDocument!==this.pdfDocument){return;}let operator;for(const elem of action.state){switch(elem){case"ON":case"OFF":case"Toggle":operator=elem;continue;}switch(operator){case"ON":optionalContentConfig.setVisibility(elem,true);break;case"OFF":optionalContentConfig.setVisibility(elem,false);break;case"Toggle":const group=optionalContentConfig.getGroup(elem);if(group){optionalContentConfig.setVisibility(elem,!group.visible);}break;}}this.pdfViewer.optionalContentConfigPromise=Promise.resolve(optionalContentConfig);}cachePageRef(pageNum,pageRef){if(!pageRef){return;}const refStr=pageRef.gen===0?`${pageRef.num}R`:`${pageRef.num}R${pageRef.gen}`;_classPrivateFieldGet(this,_pagesRefCache).set(refStr,pageNum);}_cachedPageNumber(pageRef){if(!pageRef){return null;}const refStr=pageRef.gen===0?`${pageRef.num}R`:`${pageRef.num}R${pageRef.gen}`;return _classPrivateFieldGet(this,_pagesRefCache).get(refStr)||null;}isPageVisible(pageNumber){return this.pdfViewer.isPageVisible(pageNumber);}isPageCached(pageNumber){return this.pdfViewer.isPageCached(pageNumber);}}exports.PDFLinkService=PDFLinkService;function _goToDestinationHelper2(rawDest){let namedDest=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;let explicitDest=arguments.length>2?arguments[2]:undefined;const destRef=explicitDest[0];let pageNumber;if(typeof destRef==="object"&&destRef!==null){pageNumber=this._cachedPageNumber(destRef);if(!pageNumber){this.pdfDocument.getPageIndex(destRef).then(pageIndex=>{this.cachePageRef(pageIndex+1,destRef);_classPrivateMethodGet(this,_goToDestinationHelper,_goToDestinationHelper2).call(this,rawDest,namedDest,explicitDest);}).catch(()=>{globalThis.ngxConsole.error(`PDFLinkService.#goToDestinationHelper: "${destRef}" is not `+`a valid page reference, for dest="${rawDest}".`);});return;}}else if(Number.isInteger(destRef)){pageNumber=destRef+1;}else{globalThis.ngxConsole.error(`PDFLinkService.#goToDestinationHelper: "${destRef}" is not `+`a valid destination reference, for dest="${rawDest}".`);return;}if(!pageNumber||pageNumber<1||pageNumber>this.pagesCount){globalThis.ngxConsole.error(`PDFLinkService.#goToDestinationHelper: "${pageNumber}" is not `+`a valid page number, for dest="${rawDest}".`);return;}if(this.pdfHistory){this.pdfHistory.pushCurrentPosition();this.pdfHistory.push({namedDest,explicitDest,pageNumber});}this.pdfViewer.scrollPageIntoView({pageNumber,destArray:explicitDest,ignoreDestinationZoom:this._ignoreDestinationZoom});}function _isValidExplicitDestination(dest){if(!Array.isArray(dest)){return false;}const destLength=dest.length;if(destLength<2){return false;}const page=dest[0];if(!(typeof page==="object"&&Number.isInteger(page.num)&&Number.isInteger(page.gen))&&!(Number.isInteger(page)&&page>=0)){return false;}const zoom=dest[1];if(!(typeof zoom==="object"&&typeof zoom.name==="string")){return false;}let allowNull=true;switch(zoom.name){case"XYZ":if(destLength!==5){return false;}break;case"Fit":case"FitB":return destLength===2;case"FitH":case"FitBH":case"FitV":case"FitBV":if(destLength!==3){return false;}break;case"FitR":if(destLength!==6){return false;}allowNull=false;break;default:return false;}for(let i=2;i<destLength;i++){const param=dest[i];if(!(typeof param==="number"||allowNull&&param===null)){return false;}}return true;}class SimpleLinkService{constructor(){this.externalLinkEnabled=true;}get pagesCount(){return 0;}get page(){return 0;}set page(value){}get rotation(){return 0;}set rotation(value){}get isInPresentationMode(){return false;}async goToDestination(dest){}goToPage(val){}addLinkAttributes(link,url){let newWindow=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;addLinkAttributes(link,{url,enabled:this.externalLinkEnabled});}getDestinationHash(dest){return"#";}getAnchorUrl(hash){return"#";}setHash(hash){}executeNamedAction(action){}executeSetOCGState(action){}cachePageRef(pageNum,pageRef){}isPageVisible(pageNumber){return true;}isPageCached(pageNumber){return true;}}exports.SimpleLinkService=SimpleLinkService;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.AnnotationEditorParams=void 0;var _pdfjsLib=__webpack_require__(4);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _bindListeners=/*#__PURE__*/new WeakSet();class AnnotationEditorParams{constructor(options,eventBus){_classPrivateMethodInitSpec(this,_bindListeners);this.eventBus=eventBus;_classPrivateMethodGet(this,_bindListeners,_bindListeners2).call(this,options);}}exports.AnnotationEditorParams=AnnotationEditorParams;function _bindListeners2(_ref){let{editorFreeTextFontSize,editorFreeTextColor,editorInkColor,editorInkThickness,editorInkOpacity}=_ref;editorFreeTextFontSize.addEventListener("input",evt=>{this.eventBus.dispatch("switchannotationeditorparams",{source:this,type:_pdfjsLib.AnnotationEditorParamsType.FREETEXT_SIZE,value:editorFreeTextFontSize.valueAsNumber});});editorFreeTextColor.addEventListener("input",evt=>{this.eventBus.dispatch("switchannotationeditorparams",{source:this,type:_pdfjsLib.AnnotationEditorParamsType.FREETEXT_COLOR,value:editorFreeTextColor.value});});editorInkColor.addEventListener("input",evt=>{this.eventBus.dispatch("switchannotationeditorparams",{source:this,type:_pdfjsLib.AnnotationEditorParamsType.INK_COLOR,value:editorInkColor.value});});editorInkThickness.addEventListener("input",evt=>{this.eventBus.dispatch("switchannotationeditorparams",{source:this,type:_pdfjsLib.AnnotationEditorParamsType.INK_THICKNESS,value:editorInkThickness.valueAsNumber});});editorInkOpacity.addEventListener("input",evt=>{this.eventBus.dispatch("switchannotationeditorparams",{source:this,type:_pdfjsLib.AnnotationEditorParamsType.INK_OPACITY,value:editorInkOpacity.valueAsNumber});});this.eventBus._on("annotationeditorparamschanged",evt=>{for(const[type,value]of evt.details){switch(type){case _pdfjsLib.AnnotationEditorParamsType.FREETEXT_SIZE:editorFreeTextFontSize.value=value;break;case _pdfjsLib.AnnotationEditorParamsType.FREETEXT_COLOR:editorFreeTextColor.value=value;break;case _pdfjsLib.AnnotationEditorParamsType.INK_COLOR:editorInkColor.value=value;break;case _pdfjsLib.AnnotationEditorParamsType.INK_THICKNESS:editorInkThickness.value=value;break;case _pdfjsLib.AnnotationEditorParamsType.INK_OPACITY:editorInkOpacity.value=value;break;}}});}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.OverlayManager=void 0;class OverlayManager{#overlays=new WeakMap();#active=null;get active(){return this.#active;}async register(dialog){let canForceClose=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(typeof dialog!=="object"){throw new Error("Not enough parameters.");}else if(this.#overlays.has(dialog)){throw new Error("The overlay is already registered.");}this.#overlays.set(dialog,{canForceClose});if(!dialog.showModal){const dialogPolyfill=__webpack_require__(10);dialogPolyfill.registerDialog(dialog);if(!this._dialogPolyfillCSS){this._dialogPolyfillCSS=true;const style=document.createElement("style");style.textContent='dialog {\n  position: absolute;\n  left: 0; right: 0;\n  width: -moz-fit-content;\n  width: -webkit-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: -webkit-fit-content;\n  height: fit-content;\n  margin: auto;\n  border: solid;\n  padding: 1em;\n  background: white;\n  color: black;\n  display: block;\n}\n\ndialog:not([open]) {\n  display: none;\n}\n\ndialog + .backdrop {\n  position: fixed;\n  top: 0; right: 0; bottom: 0; left: 0;\n  background: rgba(0,0,0,0.1);\n}\n\n._dialog_overlay {\n  position: fixed;\n  top: 0; right: 0; bottom: 0; left: 0;\n}\n\ndialog.fixed {\n  position: fixed;\n  top: 50%;\n  transform: translate(0, -50%);\n}';document.head.prepend(style);}}dialog.addEventListener("cancel",evt=>{this.#active=null;});}async unregister(dialog){if(!this.#overlays.has(dialog)){throw new Error("The overlay does not exist.");}else if(this.#active===dialog){throw new Error("The overlay cannot be removed while it is active.");}this.#overlays.delete(dialog);}async open(dialog){if(!this.#overlays.has(dialog)){throw new Error("The overlay does not exist.");}else if(this.#active){if(this.#active===dialog){throw new Error("The overlay is already active.");}else if(this.#overlays.get(dialog).canForceClose){await this.close();}else{throw new Error("Another overlay is currently active.");}}this.#active=dialog;dialog.showModal();dialog.classList.remove("hidden");}async close(){let dialog=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.#active;if(!this.#overlays.has(dialog)){throw new Error("The overlay does not exist.");}else if(!this.#active){throw new Error("The overlay is currently not active.");}else if(this.#active!==dialog){throw new Error("Another overlay is currently active.");}dialog.close();this.#active=null;}}exports.OverlayManager=OverlayManager;

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
(function(global,factory){ true?module.exports=factory():0;})(void 0,function(){'use strict';var supportCustomEvent=window.CustomEvent;if(!supportCustomEvent||typeof supportCustomEvent==='object'){supportCustomEvent=function CustomEvent(event,x){x=x||{};var ev=document.createEvent('CustomEvent');ev.initCustomEvent(event,!!x.bubbles,!!x.cancelable,x.detail||null);return ev;};supportCustomEvent.prototype=window.Event.prototype;}function safeDispatchEvent(target,event){var check='on'+event.type.toLowerCase();if(typeof target[check]==='function'){target[check](event);}return target.dispatchEvent(event);}function createsStackingContext(el){while(el&&el!==document.body){var s=window.getComputedStyle(el);var invalid=function(k,ok){return!(s[k]===undefined||s[k]===ok);};if(s.opacity<1||invalid('zIndex','auto')||invalid('transform','none')||invalid('mixBlendMode','normal')||invalid('filter','none')||invalid('perspective','none')||s['isolation']==='isolate'||s.position==='fixed'||s.webkitOverflowScrolling==='touch'){return true;}el=el.parentElement;}return false;}function findNearestDialog(el){while(el){if(el.localName==='dialog'){return el;}if(el.parentElement){el=el.parentElement;}else if(el.parentNode){el=el.parentNode.host;}else{el=null;}}return null;}function safeBlur(el){while(el&&el.shadowRoot&&el.shadowRoot.activeElement){el=el.shadowRoot.activeElement;}if(el&&el.blur&&el!==document.body){el.blur();}}function inNodeList(nodeList,node){for(var i=0;i<nodeList.length;++i){if(nodeList[i]===node){return true;}}return false;}function isFormMethodDialog(el){if(!el||!el.hasAttribute('method')){return false;}return el.getAttribute('method').toLowerCase()==='dialog';}function findFocusableElementWithin(hostElement){var opts=['button','input','keygen','select','textarea'];var query=opts.map(function(el){return el+':not([disabled])';});query.push('[tabindex]:not([disabled]):not([tabindex=""])');var target=hostElement.querySelector(query.join(', '));if(!target&&'attachShadow'in Element.prototype){var elems=hostElement.querySelectorAll('*');for(var i=0;i<elems.length;i++){if(elems[i].tagName&&elems[i].shadowRoot){target=findFocusableElementWithin(elems[i].shadowRoot);if(target){break;}}}}return target;}function isConnected(element){return element.isConnected||document.body.contains(element);}function findFormSubmitter(event){if(event.submitter){return event.submitter;}var form=event.target;if(!(form instanceof HTMLFormElement)){return null;}var submitter=dialogPolyfill.formSubmitter;if(!submitter){var target=event.target;var root='getRootNode'in target&&target.getRootNode()||document;submitter=root.activeElement;}if(!submitter||submitter.form!==form){return null;}return submitter;}function maybeHandleSubmit(event){if(event.defaultPrevented){return;}var form=event.target;var value=dialogPolyfill.imagemapUseValue;var submitter=findFormSubmitter(event);if(value===null&&submitter){value=submitter.value;}var dialog=findNearestDialog(form);if(!dialog){return;}var formmethod=submitter&&submitter.getAttribute('formmethod')||form.getAttribute('method');if(formmethod!=='dialog'){return;}event.preventDefault();if(value!=null){dialog.close(value);}else{dialog.close();}}function dialogPolyfillInfo(dialog){this.dialog_=dialog;this.replacedStyleTop_=false;this.openAsModal_=false;if(!dialog.hasAttribute('role')){dialog.setAttribute('role','dialog');}dialog.show=this.show.bind(this);dialog.showModal=this.showModal.bind(this);dialog.close=this.close.bind(this);dialog.addEventListener('submit',maybeHandleSubmit,false);if(!('returnValue'in dialog)){dialog.returnValue='';}if('MutationObserver'in window){var mo=new MutationObserver(this.maybeHideModal.bind(this));mo.observe(dialog,{attributes:true,attributeFilter:['open']});}else{var removed=false;var cb=function(){removed?this.downgradeModal():this.maybeHideModal();removed=false;}.bind(this);var timeout;var delayModel=function(ev){if(ev.target!==dialog){return;}var cand='DOMNodeRemoved';removed|=ev.type.substr(0,cand.length)===cand;window.clearTimeout(timeout);timeout=window.setTimeout(cb,0);};['DOMAttrModified','DOMNodeRemoved','DOMNodeRemovedFromDocument'].forEach(function(name){dialog.addEventListener(name,delayModel);});}Object.defineProperty(dialog,'open',{set:this.setOpen.bind(this),get:dialog.hasAttribute.bind(dialog,'open')});this.backdrop_=document.createElement('div');this.backdrop_.className='backdrop';this.backdrop_.addEventListener('mouseup',this.backdropMouseEvent_.bind(this));this.backdrop_.addEventListener('mousedown',this.backdropMouseEvent_.bind(this));this.backdrop_.addEventListener('click',this.backdropMouseEvent_.bind(this));}dialogPolyfillInfo.prototype={get dialog(){return this.dialog_;},maybeHideModal:function(){if(this.dialog_.hasAttribute('open')&&isConnected(this.dialog_)){return;}this.downgradeModal();},downgradeModal:function(){if(!this.openAsModal_){return;}this.openAsModal_=false;this.dialog_.style.zIndex='';if(this.replacedStyleTop_){this.dialog_.style.top='';this.replacedStyleTop_=false;}this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_);dialogPolyfill.dm.removeDialog(this);},setOpen:function(value){if(value){this.dialog_.hasAttribute('open')||this.dialog_.setAttribute('open','');}else{this.dialog_.removeAttribute('open');this.maybeHideModal();}},backdropMouseEvent_:function(e){if(!this.dialog_.hasAttribute('tabindex')){var fake=document.createElement('div');this.dialog_.insertBefore(fake,this.dialog_.firstChild);fake.tabIndex=-1;fake.focus();this.dialog_.removeChild(fake);}else{this.dialog_.focus();}var redirectedEvent=document.createEvent('MouseEvents');redirectedEvent.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);this.dialog_.dispatchEvent(redirectedEvent);e.stopPropagation();},focus_:function(){var target=this.dialog_.querySelector('[autofocus]:not([disabled])');if(!target&&this.dialog_.tabIndex>=0){target=this.dialog_;}if(!target){target=findFocusableElementWithin(this.dialog_);}safeBlur(document.activeElement);target&&target.focus();},updateZIndex:function(dialogZ,backdropZ){if(dialogZ<backdropZ){throw new Error('dialogZ should never be < backdropZ');}this.dialog_.style.zIndex=dialogZ;this.backdrop_.style.zIndex=backdropZ;},show:function(){if(!this.dialog_.open){this.setOpen(true);this.focus_();}},showModal:function(){if(this.dialog_.hasAttribute('open')){throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');}if(!isConnected(this.dialog_)){throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');}if(!dialogPolyfill.dm.pushDialog(this)){throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');}if(createsStackingContext(this.dialog_.parentElement)){console.warn('A dialog is being shown inside a stacking context. '+'This may cause it to be unusable. For more information, see this link: '+'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');}this.setOpen(true);this.openAsModal_=true;if(dialogPolyfill.needsCentering(this.dialog_)){dialogPolyfill.reposition(this.dialog_);this.replacedStyleTop_=true;}else{this.replacedStyleTop_=false;}this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling);this.focus_();},close:function(opt_returnValue){if(!this.dialog_.hasAttribute('open')){throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');}this.setOpen(false);if(opt_returnValue!==undefined){this.dialog_.returnValue=opt_returnValue;}var closeEvent=new supportCustomEvent('close',{bubbles:false,cancelable:false});safeDispatchEvent(this.dialog_,closeEvent);}};var dialogPolyfill={};dialogPolyfill.reposition=function(element){var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;var topValue=scrollTop+(window.innerHeight-element.offsetHeight)/2;element.style.top=Math.max(scrollTop,topValue)+'px';};dialogPolyfill.isInlinePositionSetByStylesheet=function(element){for(var i=0;i<document.styleSheets.length;++i){var styleSheet=document.styleSheets[i];var cssRules=null;try{cssRules=styleSheet.cssRules;}catch(e){}if(!cssRules){continue;}for(var j=0;j<cssRules.length;++j){var rule=cssRules[j];var selectedNodes=null;try{selectedNodes=document.querySelectorAll(rule.selectorText);}catch(e){}if(!selectedNodes||!inNodeList(selectedNodes,element)){continue;}var cssTop=rule.style.getPropertyValue('top');var cssBottom=rule.style.getPropertyValue('bottom');if(cssTop&&cssTop!=='auto'||cssBottom&&cssBottom!=='auto'){return true;}}}return false;};dialogPolyfill.needsCentering=function(dialog){var computedStyle=window.getComputedStyle(dialog);if(computedStyle.position!=='absolute'){return false;}if(dialog.style.top!=='auto'&&dialog.style.top!==''||dialog.style.bottom!=='auto'&&dialog.style.bottom!==''){return false;}return!dialogPolyfill.isInlinePositionSetByStylesheet(dialog);};dialogPolyfill.forceRegisterDialog=function(element){if(window.HTMLDialogElement||element.showModal){console.warn('This browser already supports <dialog>, the polyfill '+'may not work correctly',element);}if(element.localName!=='dialog'){throw new Error('Failed to register dialog: The element is not a dialog.');}new dialogPolyfillInfo(element);};dialogPolyfill.registerDialog=function(element){if(!element.showModal){dialogPolyfill.forceRegisterDialog(element);}};dialogPolyfill.DialogManager=function(){this.pendingDialogStack=[];var checkDOM=this.checkDOM_.bind(this);this.overlay=document.createElement('div');this.overlay.className='_dialog_overlay';this.overlay.addEventListener('click',function(e){this.forwardTab_=undefined;e.stopPropagation();checkDOM([]);}.bind(this));this.handleKey_=this.handleKey_.bind(this);this.handleFocus_=this.handleFocus_.bind(this);this.zIndexLow_=100000;this.zIndexHigh_=100000+150;this.forwardTab_=undefined;if('MutationObserver'in window){this.mo_=new MutationObserver(function(records){var removed=[];records.forEach(function(rec){for(var i=0,c;c=rec.removedNodes[i];++i){if(!(c instanceof Element)){continue;}else if(c.localName==='dialog'){removed.push(c);}removed=removed.concat(c.querySelectorAll('dialog'));}});removed.length&&checkDOM(removed);});}};dialogPolyfill.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener('focus',this.handleFocus_,true);document.addEventListener('keydown',this.handleKey_);this.mo_&&this.mo_.observe(document,{childList:true,subtree:true});};dialogPolyfill.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener('focus',this.handleFocus_,true);document.removeEventListener('keydown',this.handleKey_);this.mo_&&this.mo_.disconnect();};dialogPolyfill.DialogManager.prototype.updateStacking=function(){var zIndex=this.zIndexHigh_;for(var i=0,dpi;dpi=this.pendingDialogStack[i];++i){dpi.updateZIndex(--zIndex,--zIndex);if(i===0){this.overlay.style.zIndex=--zIndex;}}var last=this.pendingDialogStack[0];if(last){var p=last.dialog.parentNode||document.body;p.appendChild(this.overlay);}else if(this.overlay.parentNode){this.overlay.parentNode.removeChild(this.overlay);}};dialogPolyfill.DialogManager.prototype.containedByTopDialog_=function(candidate){while(candidate=findNearestDialog(candidate)){for(var i=0,dpi;dpi=this.pendingDialogStack[i];++i){if(dpi.dialog===candidate){return i===0;}}candidate=candidate.parentElement;}return false;};dialogPolyfill.DialogManager.prototype.handleFocus_=function(event){var target=event.composedPath?event.composedPath()[0]:event.target;if(this.containedByTopDialog_(target)){return;}if(document.activeElement===document.documentElement){return;}event.preventDefault();event.stopPropagation();safeBlur(target);if(this.forwardTab_===undefined){return;}var dpi=this.pendingDialogStack[0];var dialog=dpi.dialog;var position=dialog.compareDocumentPosition(target);if(position&Node.DOCUMENT_POSITION_PRECEDING){if(this.forwardTab_){dpi.focus_();}else if(target!==document.documentElement){document.documentElement.focus();}}return false;};dialogPolyfill.DialogManager.prototype.handleKey_=function(event){this.forwardTab_=undefined;if(event.keyCode===27){event.preventDefault();event.stopPropagation();var cancelEvent=new supportCustomEvent('cancel',{bubbles:false,cancelable:true});var dpi=this.pendingDialogStack[0];if(dpi&&safeDispatchEvent(dpi.dialog,cancelEvent)){dpi.dialog.close();}}else if(event.keyCode===9){this.forwardTab_=!event.shiftKey;}};dialogPolyfill.DialogManager.prototype.checkDOM_=function(removed){var clone=this.pendingDialogStack.slice();clone.forEach(function(dpi){if(removed.indexOf(dpi.dialog)!==-1){dpi.downgradeModal();}else{dpi.maybeHideModal();}});};dialogPolyfill.DialogManager.prototype.pushDialog=function(dpi){var allowed=(this.zIndexHigh_-this.zIndexLow_)/2-1;if(this.pendingDialogStack.length>=allowed){return false;}if(this.pendingDialogStack.unshift(dpi)===1){this.blockDocument();}this.updateStacking();return true;};dialogPolyfill.DialogManager.prototype.removeDialog=function(dpi){var index=this.pendingDialogStack.indexOf(dpi);if(index===-1){return;}this.pendingDialogStack.splice(index,1);if(this.pendingDialogStack.length===0){this.unblockDocument();}this.updateStacking();};dialogPolyfill.dm=new dialogPolyfill.DialogManager();dialogPolyfill.formSubmitter=null;dialogPolyfill.imagemapUseValue=null;if(window.HTMLDialogElement===undefined){var testForm=document.createElement('form');testForm.setAttribute('method','dialog');if(testForm.method!=='dialog'){var methodDescriptor=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,'method');if(methodDescriptor){var realGet=methodDescriptor.get;methodDescriptor.get=function(){if(isFormMethodDialog(this)){return'dialog';}return realGet.call(this);};var realSet=methodDescriptor.set;methodDescriptor.set=function(v){if(typeof v==='string'&&v.toLowerCase()==='dialog'){return this.setAttribute('method',v);}return realSet.call(this,v);};Object.defineProperty(HTMLFormElement.prototype,'method',methodDescriptor);}}document.addEventListener('click',function(ev){dialogPolyfill.formSubmitter=null;dialogPolyfill.imagemapUseValue=null;if(ev.defaultPrevented){return;}var target=ev.target;if('composedPath'in ev){var path=ev.composedPath();target=path.shift()||target;}if(!target||!isFormMethodDialog(target.form)){return;}var valid=target.type==='submit'&&['button','input'].indexOf(target.localName)>-1;if(!valid){if(!(target.localName==='input'&&target.type==='image')){return;}dialogPolyfill.imagemapUseValue=ev.offsetX+','+ev.offsetY;}var dialog=findNearestDialog(target);if(!dialog){return;}dialogPolyfill.formSubmitter=target;},false);document.addEventListener('submit',function(ev){var form=ev.target;var dialog=findNearestDialog(form);if(dialog){return;}var submitter=findFormSubmitter(ev);var formmethod=submitter&&submitter.getAttribute('formmethod')||form.getAttribute('method');if(formmethod==='dialog'){ev.preventDefault();}});var nativeFormSubmit=HTMLFormElement.prototype.submit;var replacementFormSubmit=function(){if(!isFormMethodDialog(this)){return nativeFormSubmit.call(this);}var dialog=findNearestDialog(this);dialog&&dialog.close();};HTMLFormElement.prototype.submit=replacementFormSubmit;}return dialogPolyfill;});

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PasswordPrompt=void 0;var _pdfjsLib=__webpack_require__(4);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _activeCapability=/*#__PURE__*/new WeakMap();var _updateCallback=/*#__PURE__*/new WeakMap();var _reason=/*#__PURE__*/new WeakMap();var _verify=/*#__PURE__*/new WeakSet();var _cancel=/*#__PURE__*/new WeakSet();var _invokeCallback=/*#__PURE__*/new WeakSet();class PasswordPrompt{constructor(options,overlayManager,l10n){let isViewerEmbedded=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;_classPrivateMethodInitSpec(this,_invokeCallback);_classPrivateMethodInitSpec(this,_cancel);_classPrivateMethodInitSpec(this,_verify);_classPrivateFieldInitSpec(this,_activeCapability,{writable:true,value:null});_classPrivateFieldInitSpec(this,_updateCallback,{writable:true,value:null});_classPrivateFieldInitSpec(this,_reason,{writable:true,value:null});this.dialog=options.dialog;this.label=options.label;this.input=options.input;this.submitButton=options.submitButton;this.cancelButton=options.cancelButton;this.overlayManager=overlayManager;this.l10n=l10n;this._isViewerEmbedded=isViewerEmbedded;this.submitButton.addEventListener("click",_classPrivateMethodGet(this,_verify,_verify2).bind(this));this.cancelButton.addEventListener("click",this.close.bind(this));this.input.addEventListener("keydown",e=>{if(e.keyCode===13){_classPrivateMethodGet(this,_verify,_verify2).call(this);}});this.overlayManager.register(this.dialog,true);this.dialog.addEventListener("close",_classPrivateMethodGet(this,_cancel,_cancel2).bind(this));}async open(){if(_classPrivateFieldGet(this,_activeCapability)){await _classPrivateFieldGet(this,_activeCapability).promise;}_classPrivateFieldSet(this,_activeCapability,(0,_pdfjsLib.createPromiseCapability)());try{await this.overlayManager.open(this.dialog);this.input.type="password";this.input.focus();}catch(ex){_classPrivateFieldSet(this,_activeCapability,null);throw ex;}const passwordIncorrect=_classPrivateFieldGet(this,_reason)===_pdfjsLib.PasswordResponses.INCORRECT_PASSWORD;if(!this._isViewerEmbedded||passwordIncorrect){this.input.focus();}this.label.textContent=await this.l10n.get(`password_${passwordIncorrect?"invalid":"label"}`);}async close(){if(this.overlayManager.active===this.dialog){this.overlayManager.close(this.dialog);this.input.value="";this.input.type="hidden";}}async setUpdateCallback(updateCallback,reason){if(_classPrivateFieldGet(this,_activeCapability)){await _classPrivateFieldGet(this,_activeCapability).promise;}_classPrivateFieldSet(this,_updateCallback,updateCallback);_classPrivateFieldSet(this,_reason,reason);}}exports.PasswordPrompt=PasswordPrompt;function _verify2(){const password=this.input.value;if((password===null||password===void 0?void 0:password.length)>0){_classPrivateMethodGet(this,_invokeCallback,_invokeCallback2).call(this,password);}}function _cancel2(){_classPrivateMethodGet(this,_invokeCallback,_invokeCallback2).call(this,new Error("PasswordPrompt cancelled."));_classPrivateFieldGet(this,_activeCapability).resolve();}function _invokeCallback2(password){if(!_classPrivateFieldGet(this,_updateCallback)){return;}this.close();this.input.value="";_classPrivateFieldGet(this,_updateCallback).call(this,password);_classPrivateFieldSet(this,_updateCallback,null);}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFAttachmentViewer=void 0;var _pdfjsLib=__webpack_require__(4);var _base_tree_viewer=__webpack_require__(13);var _event_utils=__webpack_require__(6);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _appendAttachment=/*#__PURE__*/new WeakSet();class PDFAttachmentViewer extends _base_tree_viewer.BaseTreeViewer{constructor(options){super(options);_classPrivateMethodInitSpec(this,_appendAttachment);this.downloadManager=options.downloadManager;this.eventBus._on("fileattachmentannotation",_classPrivateMethodGet(this,_appendAttachment,_appendAttachment2).bind(this));}reset(){let keepRenderedCapability=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;super.reset();this._attachments=null;if(!keepRenderedCapability){this._renderedCapability=(0,_pdfjsLib.createPromiseCapability)();}this._pendingDispatchEvent=false;}async _dispatchEvent(attachmentsCount){this._renderedCapability.resolve();if(attachmentsCount===0&&!this._pendingDispatchEvent){this._pendingDispatchEvent=true;await(0,_event_utils.waitOnEventOrTimeout)({target:this.eventBus,name:"annotationlayerrendered",delay:1000});if(!this._pendingDispatchEvent){return;}}this._pendingDispatchEvent=false;this.eventBus.dispatch("attachmentsloaded",{source:this,attachmentsCount});}_bindLink(element,_ref){let{content,filename}=_ref;element.onclick=()=>{this.downloadManager.openOrDownloadData(element,content,filename);return false;};}render(_ref2){let{attachments,keepRenderedCapability=false}=_ref2;if(this._attachments){this.reset(keepRenderedCapability);}this._attachments=attachments||null;if(!attachments){this._dispatchEvent(0);return;}const names=Object.keys(attachments).sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase());});const fragment=document.createDocumentFragment();let attachmentsCount=0;for(const name of names){const item=attachments[name];const content=item.content,filename=(0,_pdfjsLib.getFilenameFromUrl)(item.filename,true);const div=document.createElement("div");div.className="treeItem";const element=document.createElement("a");this._bindLink(element,{content,filename});element.textContent=this._normalizeTextContent(filename);div.append(element);fragment.append(div);attachmentsCount++;}this._finishRendering(fragment,attachmentsCount);}}exports.PDFAttachmentViewer=PDFAttachmentViewer;function _appendAttachment2(_ref3){let{filename,content}=_ref3;const renderedPromise=this._renderedCapability.promise;renderedPromise.then(()=>{if(renderedPromise!==this._renderedCapability.promise){return;}const attachments=this._attachments||Object.create(null);for(const name in attachments){if(filename===name){return;}}attachments[filename]={filename,content};this.render({attachments,keepRenderedCapability:true});});}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.BaseTreeViewer=void 0;var _ui_utils=__webpack_require__(3);const TREEITEM_OFFSET_TOP=-100;const TREEITEM_SELECTED_CLASS="selected";class BaseTreeViewer{constructor(options){if(this.constructor===BaseTreeViewer){throw new Error("Cannot initialize BaseTreeViewer.");}this.container=options.container;this.eventBus=options.eventBus;this.reset();}reset(){this._pdfDocument=null;this._lastToggleIsShow=true;this._currentTreeItem=null;this.container.textContent="";this.container.classList.remove("treeWithDeepNesting");}_dispatchEvent(count){throw new Error("Not implemented: _dispatchEvent");}_bindLink(element,params){throw new Error("Not implemented: _bindLink");}_normalizeTextContent(str){return(0,_ui_utils.removeNullCharacters)(str,true)||"\u2013";}_addToggleButton(div){let hidden=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const toggler=document.createElement("div");toggler.className="treeItemToggler";if(hidden){toggler.classList.add("treeItemsHidden");}toggler.onclick=evt=>{evt.stopPropagation();toggler.classList.toggle("treeItemsHidden");if(evt.shiftKey){const shouldShowAll=!toggler.classList.contains("treeItemsHidden");this._toggleTreeItem(div,shouldShowAll);}};div.prepend(toggler);}_toggleTreeItem(root){let show=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;this._lastToggleIsShow=show;for(const toggler of root.querySelectorAll(".treeItemToggler")){toggler.classList.toggle("treeItemsHidden",!show);}}_toggleAllTreeItems(){this._toggleTreeItem(this.container,!this._lastToggleIsShow);}_finishRendering(fragment,count){let hasAnyNesting=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(hasAnyNesting){this.container.classList.add("treeWithDeepNesting");this._lastToggleIsShow=!fragment.querySelector(".treeItemsHidden");}this.container.append(fragment);this._dispatchEvent(count);}render(params){throw new Error("Not implemented: render");}_updateCurrentTreeItem(){let treeItem=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(this._currentTreeItem){this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);this._currentTreeItem=null;}if(treeItem){treeItem.classList.add(TREEITEM_SELECTED_CLASS);this._currentTreeItem=treeItem;}}_scrollToCurrentTreeItem(treeItem){if(!treeItem){return;}let currentNode=treeItem.parentNode;while(currentNode&&currentNode!==this.container){if(currentNode.classList.contains("treeItem")){const toggler=currentNode.firstElementChild;toggler===null||toggler===void 0?void 0:toggler.classList.remove("treeItemsHidden");}currentNode=currentNode.parentNode;}this._updateCurrentTreeItem(treeItem);this.container.scrollTo(treeItem.offsetLeft,treeItem.offsetTop+TREEITEM_OFFSET_TOP);}}exports.BaseTreeViewer=BaseTreeViewer;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFCursorTools=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);var _grab_to_pan=__webpack_require__(15);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _dispatchEvent=/*#__PURE__*/new WeakSet();var _addEventListeners=/*#__PURE__*/new WeakSet();class PDFCursorTools{constructor(_ref){let{container,eventBus,cursorToolOnLoad=_ui_utils.CursorTool.SELECT}=_ref;_classPrivateMethodInitSpec(this,_addEventListeners);_classPrivateMethodInitSpec(this,_dispatchEvent);this.container=container;this.eventBus=eventBus;this.active=_ui_utils.CursorTool.SELECT;this.previouslyActive=null;this.handTool=new _grab_to_pan.GrabToPan({element:this.container});_classPrivateMethodGet(this,_addEventListeners,_addEventListeners2).call(this);Promise.resolve().then(()=>{this.switchTool(cursorToolOnLoad);});}get activeTool(){return this.active;}switchTool(tool){if(this.previouslyActive!==null){return;}if(tool===this.active){return;}const disableActiveTool=()=>{switch(this.active){case _ui_utils.CursorTool.SELECT:break;case _ui_utils.CursorTool.HAND:this.handTool.deactivate();break;case _ui_utils.CursorTool.ZOOM:}};switch(tool){case _ui_utils.CursorTool.SELECT:disableActiveTool();break;case _ui_utils.CursorTool.HAND:disableActiveTool();this.handTool.activate();break;case _ui_utils.CursorTool.ZOOM:default:globalThis.ngxConsole.error(`switchTool: "${tool}" is an unsupported value.`);return;}this.active=tool;_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);}}exports.PDFCursorTools=PDFCursorTools;function _dispatchEvent2(){this.eventBus.dispatch("cursortoolchanged",{source:this,tool:this.active});}function _addEventListeners2(){this.eventBus._on("switchcursortool",evt=>{this.switchTool(evt.tool);});let annotationEditorMode=_pdfjsLib.AnnotationEditorType.NONE,presentationModeState=_ui_utils.PresentationModeState.NORMAL;const disableActive=()=>{const previouslyActive=this.active;this.switchTool(_ui_utils.CursorTool.SELECT);this.previouslyActive??=previouslyActive;};const enableActive=()=>{const previouslyActive=this.previouslyActive;if(previouslyActive!==null&&annotationEditorMode===_pdfjsLib.AnnotationEditorType.NONE&&presentationModeState===_ui_utils.PresentationModeState.NORMAL){this.previouslyActive=null;this.switchTool(previouslyActive);}};this.eventBus._on("secondarytoolbarreset",evt=>{if(this.previouslyActive!==null){annotationEditorMode=_pdfjsLib.AnnotationEditorType.NONE;presentationModeState=_ui_utils.PresentationModeState.NORMAL;enableActive();}});this.eventBus._on("annotationeditormodechanged",_ref2=>{let{mode}=_ref2;annotationEditorMode=mode;if(mode===_pdfjsLib.AnnotationEditorType.NONE){enableActive();}else{disableActive();}});this.eventBus._on("presentationmodechanged",_ref3=>{let{state}=_ref3;presentationModeState=state;if(state===_ui_utils.PresentationModeState.NORMAL){enableActive();}else if(state===_ui_utils.PresentationModeState.FULLSCREEN){disableActive();}});}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.GrabToPan=void 0;function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const CSS_CLASS_GRAB="grab-to-pan-grab";var _onMouseDown=/*#__PURE__*/new WeakSet();var _onMouseMove=/*#__PURE__*/new WeakSet();var _endPan=/*#__PURE__*/new WeakSet();class GrabToPan{constructor(options){_classPrivateMethodInitSpec(this,_endPan);_classPrivateMethodInitSpec(this,_onMouseMove);_classPrivateMethodInitSpec(this,_onMouseDown);this.element=options.element;this.document=options.element.ownerDocument;if(typeof options.ignoreTarget==="function"){this.ignoreTarget=options.ignoreTarget;}this.onActiveChanged=options.onActiveChanged;this.activate=this.activate.bind(this);this.deactivate=this.deactivate.bind(this);this.toggle=this.toggle.bind(this);this._onMouseDown=_classPrivateMethodGet(this,_onMouseDown,_onMouseDown2).bind(this);this._onMouseMove=_classPrivateMethodGet(this,_onMouseMove,_onMouseMove2).bind(this);this._endPan=_classPrivateMethodGet(this,_endPan,_endPan2).bind(this);const overlay=this.overlay=document.createElement("div");overlay.className="grab-to-pan-grabbing";}activate(){if(!this.active){var _this$onActiveChanged;this.active=true;this.element.addEventListener("mousedown",this._onMouseDown);this.element.classList.add(CSS_CLASS_GRAB);(_this$onActiveChanged=this.onActiveChanged)===null||_this$onActiveChanged===void 0?void 0:_this$onActiveChanged.call(this,true);}}deactivate(){if(this.active){var _this$onActiveChanged2;this.active=false;this.element.removeEventListener("mousedown",this._onMouseDown);this._endPan();this.element.classList.remove(CSS_CLASS_GRAB);(_this$onActiveChanged2=this.onActiveChanged)===null||_this$onActiveChanged2===void 0?void 0:_this$onActiveChanged2.call(this,false);}}toggle(){if(this.active){this.deactivate();}else{this.activate();}}ignoreTarget(node){if(document.querySelector(".stf__item")){return true;}return node.matches("a[href], a[href] *, input, textarea, button, button *, select, option");}}exports.GrabToPan=GrabToPan;function _onMouseDown2(event){if(event.button!==0||this.ignoreTarget(event.target)){return;}if(event.originalTarget){try{event.originalTarget.tagName;}catch(e){return;}}this.scrollLeftStart=this.element.scrollLeft;this.scrollTopStart=this.element.scrollTop;this.clientXStart=event.clientX;this.clientYStart=event.clientY;if(isOverPerfectScrollbar(this.clientXStart,this.clientYStart,"ps__rail-x")){return;}if(isOverPerfectScrollbar(this.clientXStart,this.clientYStart,"ps__rail-y")){return;}this.document.addEventListener("mousemove",this._onMouseMove,true);this.document.addEventListener("mouseup",this._endPan,true);this.element.addEventListener("scroll",this._endPan,true);event.preventDefault();event.stopPropagation();const focusedElement=document.activeElement;if(focusedElement&&!focusedElement.contains(event.target)){focusedElement.blur();}}function _onMouseMove2(event){this.element.removeEventListener("scroll",this._endPan,true);if(!(event.buttons&1)){this._endPan();return;}const xDiff=event.clientX-this.clientXStart;const yDiff=event.clientY-this.clientYStart;const scrollTop=this.scrollTopStart-yDiff;const scrollLeft=this.scrollLeftStart-xDiff;if(this.element.scrollTo){this.element.scrollTo({top:scrollTop,left:scrollLeft,behavior:"instant"});}else{this.element.scrollTop=scrollTop;this.element.scrollLeft=scrollLeft;}if(!this.overlay.parentNode){document.body.append(this.overlay);}}function _endPan2(){this.element.removeEventListener("scroll",this._endPan,true);this.document.removeEventListener("mousemove",this._onMouseMove,true);this.document.removeEventListener("mouseup",this._endPan,true);this.overlay.remove();}function isOverPerfectScrollbar(x,y,divName){const perfectScrollbar=document.getElementsByClassName(divName);if(perfectScrollbar&&perfectScrollbar.length===1){var{top,right,bottom,left}=perfectScrollbar[0].getBoundingClientRect();if(y>=top&&y<=bottom){if(x<=right&&x>=left){return true;}}}return false;}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFDocumentProperties=void 0;var _pdfjsLib=__webpack_require__(4);var _ui_utils=__webpack_require__(3);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const DEFAULT_FIELD_CONTENT="-";const NON_METRIC_LOCALES=["en-us","en-lr","my"];const US_PAGE_NAMES={"8.5x11":"Letter","8.5x14":"Legal"};const METRIC_PAGE_NAMES={"297x420":"A3","210x297":"A4"};function getPageName(size,isPortrait,pageNames){const width=isPortrait?size.width:size.height;const height=isPortrait?size.height:size.width;return pageNames[`${width}x${height}`];}var _fieldData=/*#__PURE__*/new WeakMap();var _reset=/*#__PURE__*/new WeakSet();var _updateUI=/*#__PURE__*/new WeakSet();var _parseFileSize=/*#__PURE__*/new WeakSet();var _parsePageSize=/*#__PURE__*/new WeakSet();var _parseDate=/*#__PURE__*/new WeakSet();var _parseLinearization=/*#__PURE__*/new WeakSet();class PDFDocumentProperties{constructor(_ref,overlayManager,eventBus,l10n,fileNameLookup){let{dialog,fields,closeButton}=_ref;_classPrivateMethodInitSpec(this,_parseLinearization);_classPrivateMethodInitSpec(this,_parseDate);_classPrivateMethodInitSpec(this,_parsePageSize);_classPrivateMethodInitSpec(this,_parseFileSize);_classPrivateMethodInitSpec(this,_updateUI);_classPrivateMethodInitSpec(this,_reset);_classPrivateFieldInitSpec(this,_fieldData,{writable:true,value:null});this.dialog=dialog;this.fields=fields;this.overlayManager=overlayManager;this.l10n=l10n;this._fileNameLookup=fileNameLookup;this.eventBus=eventBus;_classPrivateMethodGet(this,_reset,_reset2).call(this);closeButton.addEventListener("click",this.close.bind(this));this.overlayManager.register(this.dialog);eventBus._on("pagechanging",evt=>{this._currentPageNumber=evt.pageNumber;});eventBus._on("rotationchanging",evt=>{this._pagesRotation=evt.pagesRotation;});this._isNonMetricLocale=true;l10n.getLanguage().then(locale=>{this._isNonMetricLocale=NON_METRIC_LOCALES.includes(locale);});}async open(){await Promise.all([this.overlayManager.open(this.dialog),this._dataAvailableCapability.promise]);this.eventBus.dispatch("propertiesdialogopen",this);const currentPageNumber=this._currentPageNumber;const pagesRotation=this._pagesRotation;if(_classPrivateFieldGet(this,_fieldData)&&currentPageNumber===_classPrivateFieldGet(this,_fieldData)._currentPageNumber&&pagesRotation===_classPrivateFieldGet(this,_fieldData)._pagesRotation){_classPrivateMethodGet(this,_updateUI,_updateUI2).call(this);return;}const{info,contentLength}=await this.pdfDocument.getMetadata();const[fileName,fileSize,creationDate,modificationDate,pageSize,isLinearized]=await Promise.all([this._fileNameLookup(),_classPrivateMethodGet(this,_parseFileSize,_parseFileSize2).call(this,contentLength),_classPrivateMethodGet(this,_parseDate,_parseDate2).call(this,info.CreationDate),_classPrivateMethodGet(this,_parseDate,_parseDate2).call(this,info.ModDate),this.pdfDocument.getPage(currentPageNumber).then(pdfPage=>{return _classPrivateMethodGet(this,_parsePageSize,_parsePageSize2).call(this,(0,_ui_utils.getPageSizeInches)(pdfPage),pagesRotation);}),_classPrivateMethodGet(this,_parseLinearization,_parseLinearization2).call(this,info.IsLinearized)]);_classPrivateFieldSet(this,_fieldData,Object.freeze({fileName,fileSize,title:info.Title,author:info.Author,subject:info.Subject,keywords:info.Keywords,creationDate,modificationDate,creator:info.Creator,producer:info.Producer,version:info.PDFFormatVersion,pageCount:this.pdfDocument.numPages,pageSize,linearized:isLinearized,_currentPageNumber:currentPageNumber,_pagesRotation:pagesRotation}));_classPrivateMethodGet(this,_updateUI,_updateUI2).call(this);const{length}=await this.pdfDocument.getDownloadInfo();if(contentLength===length){return;}const data=Object.assign(Object.create(null),_classPrivateFieldGet(this,_fieldData));data.fileSize=await _classPrivateMethodGet(this,_parseFileSize,_parseFileSize2).call(this,length);_classPrivateFieldSet(this,_fieldData,Object.freeze(data));_classPrivateMethodGet(this,_updateUI,_updateUI2).call(this);}async close(){this.overlayManager.close(this.dialog);this.eventBus.dispatch("propertiesdialogclose",this);}setDocument(pdfDocument){if(this.pdfDocument){_classPrivateMethodGet(this,_reset,_reset2).call(this);_classPrivateMethodGet(this,_updateUI,_updateUI2).call(this,true);}if(!pdfDocument){return;}this.pdfDocument=pdfDocument;this._dataAvailableCapability.resolve();}}exports.PDFDocumentProperties=PDFDocumentProperties;function _reset2(){this.pdfDocument=null;_classPrivateFieldSet(this,_fieldData,null);this._dataAvailableCapability=(0,_pdfjsLib.createPromiseCapability)();this._currentPageNumber=1;this._pagesRotation=0;}function _updateUI2(){let reset=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(reset||!_classPrivateFieldGet(this,_fieldData)){for(const id in this.fields){this.fields[id].textContent=DEFAULT_FIELD_CONTENT;}return;}if(this.overlayManager.active!==this.dialog){return;}for(const id in this.fields){const content=_classPrivateFieldGet(this,_fieldData)[id];this.fields[id].textContent=content||content===0?content:DEFAULT_FIELD_CONTENT;}}async function _parseFileSize2(){let fileSize=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;const kb=fileSize/1024,mb=kb/1024;if(!kb){return undefined;}return this.l10n.get(`document_properties_${mb>=1?"mb":"kb"}`,{size_mb:mb>=1&&(+mb.toPrecision(3)).toLocaleString(),size_kb:mb<1&&(+kb.toPrecision(3)).toLocaleString(),size_b:fileSize.toLocaleString()});}async function _parsePageSize2(pageSizeInches,pagesRotation){if(!pageSizeInches){return undefined;}if(pagesRotation%180!==0){pageSizeInches={width:pageSizeInches.height,height:pageSizeInches.width};}const isPortrait=(0,_ui_utils.isPortraitOrientation)(pageSizeInches);let sizeInches={width:Math.round(pageSizeInches.width*100)/100,height:Math.round(pageSizeInches.height*100)/100};let sizeMillimeters={width:Math.round(pageSizeInches.width*25.4*10)/10,height:Math.round(pageSizeInches.height*25.4*10)/10};let rawName=getPageName(sizeInches,isPortrait,US_PAGE_NAMES)||getPageName(sizeMillimeters,isPortrait,METRIC_PAGE_NAMES);if(!rawName&&!(Number.isInteger(sizeMillimeters.width)&&Number.isInteger(sizeMillimeters.height))){const exactMillimeters={width:pageSizeInches.width*25.4,height:pageSizeInches.height*25.4};const intMillimeters={width:Math.round(sizeMillimeters.width),height:Math.round(sizeMillimeters.height)};if(Math.abs(exactMillimeters.width-intMillimeters.width)<0.1&&Math.abs(exactMillimeters.height-intMillimeters.height)<0.1){rawName=getPageName(intMillimeters,isPortrait,METRIC_PAGE_NAMES);if(rawName){sizeInches={width:Math.round(intMillimeters.width/25.4*100)/100,height:Math.round(intMillimeters.height/25.4*100)/100};sizeMillimeters=intMillimeters;}}}const[{width,height},unit,name,orientation]=await Promise.all([this._isNonMetricLocale?sizeInches:sizeMillimeters,this.l10n.get(`document_properties_page_size_unit_${this._isNonMetricLocale?"inches":"millimeters"}`),rawName&&this.l10n.get(`document_properties_page_size_name_${rawName.toLowerCase()}`),this.l10n.get(`document_properties_page_size_orientation_${isPortrait?"portrait":"landscape"}`)]);return this.l10n.get(`document_properties_page_size_dimension_${name?"name_":""}string`,{width:width.toLocaleString(),height:height.toLocaleString(),unit,name,orientation});}async function _parseDate2(inputDate){const dateObject=_pdfjsLib.PDFDateString.toDateObject(inputDate);if(!dateObject){return undefined;}return this.l10n.get("document_properties_date_string",{date:dateObject.toLocaleDateString(),time:dateObject.toLocaleTimeString()});}function _parseLinearization2(isLinearized){return this.l10n.get(`document_properties_linearized_${isLinearized?"yes":"no"}`);}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFFindBar=void 0;var _pdf_find_controller=__webpack_require__(18);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const MATCHES_COUNT_LIMIT=1000;var _adjustWidth=/*#__PURE__*/new WeakSet();class PDFFindBar{constructor(options,eventBus,l10n){var _this$matchDiacritics;_classPrivateMethodInitSpec(this,_adjustWidth);this.opened=false;this.bar=options.bar;this.toggleButton=options.toggleButton;this.findField=options.findField;this.highlightAll=options.highlightAllCheckbox;this.currentPage=options.findCurrentPageCheckbox;this.pageRange=options.findPageRangeField;this.caseSensitive=options.caseSensitiveCheckbox;this.matchDiacritics=options.matchDiacriticsCheckbox;this.entireWord=options.entireWordCheckbox;this.findMsg=options.findMsg;this.findResultsCount=options.findResultsCount;this.findPreviousButton=options.findPreviousButton;this.findNextButton=options.findNextButton;this.findFieldMultiline=options.findFieldMultiline||null;this.multipleSearchTexts=options.findMultipleSearchTextsCheckbox||null;this.ignoreAccents=options.ignoreAccentsCheckbox||null;this.fuzzySearch=options.fuzzyCheckbox||null;this.eventBus=eventBus;this.l10n=l10n;this.toggleButton.addEventListener("click",()=>{this.toggle();});this.findFieldMultiline.addEventListener("input",()=>{this.dispatchEvent("");});this.findField.addEventListener("input",()=>{this.dispatchEvent("");});this.bar.addEventListener("keydown",e=>{switch(e.keyCode){case 13:if(e.target===this.findField){this.dispatchEvent("again",e.shiftKey);}break;case 27:this.close();break;}});this.findPreviousButton.addEventListener("click",()=>{this.dispatchEvent("again",true);});this.findNextButton.addEventListener("click",()=>{this.dispatchEvent("again",false);});this.highlightAll.addEventListener("click",()=>{this.dispatchEvent("highlightallchange");});this.caseSensitive.addEventListener("click",()=>{this.dispatchEvent("casesensitivitychange");});this.entireWord.addEventListener("click",()=>{this.dispatchEvent("entirewordchange");});this.multipleSearchTexts.addEventListener("click",()=>{this.dispatchEvent("multiplesearchtextschange");});this.ignoreAccents.addEventListener("click",()=>{this.dispatchEvent("ignoreAccentsChange");});this.fuzzySearch.addEventListener("click",()=>{this.dispatchEvent("fuzzySearchChange");});this.currentPage.addEventListener("click",()=>{this.dispatchEvent("currentPageChange");});this.pageRange.addEventListener("input",()=>{this.dispatchEvent("pageRangeChange");});(_this$matchDiacritics=this.matchDiacritics)===null||_this$matchDiacritics===void 0?void 0:_this$matchDiacritics.addEventListener("click",()=>{this.dispatchEvent("diacriticmatchingchange");});this.eventBus._on("resize",_classPrivateMethodGet(this,_adjustWidth,_adjustWidth2).bind(this));}reset(){this.updateUIState();}dispatchEvent(type){var _this$matchDiacritics2;let findPrev=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;this.eventBus.dispatch("find",{source:this,type,query:this.findFieldMultiline.classList.contains("hidden")?this.findField.value:this.findFieldMultiline.value+"\n",phraseSearch:!this.multipleSearchTexts.checked,caseSensitive:this.caseSensitive.checked,entireWord:this.entireWord.checked,ignoreAccents:this.ignoreAccents.checked,fuzzySearch:this.fuzzySearch.checked,highlightAll:this.highlightAll.checked,currentPage:this.currentPage.checked,pageRange:this.pageRange.value,findPrevious:findPrev,matchDiacritics:(_this$matchDiacritics2=this.matchDiacritics)===null||_this$matchDiacritics2===void 0?void 0:_this$matchDiacritics2.checked});}updateUIState(state,previous,matchesCount){let findMsg=Promise.resolve("");let status="";switch(state){case _pdf_find_controller.FindState.FOUND:break;case _pdf_find_controller.FindState.PENDING:status="pending";break;case _pdf_find_controller.FindState.NOT_FOUND:findMsg=this.l10n.get("find_not_found");status="notFound";break;case _pdf_find_controller.FindState.WRAPPED:findMsg=this.l10n.get(`find_reached_${previous?"top":"bottom"}`);break;}this.findField.setAttribute("data-status",status);this.findFieldMultiline.classList.toggle("notFound",status==="notFound");this.findFieldMultiline.setAttribute("data-status",status);this.findField.setAttribute("aria-invalid",state===_pdf_find_controller.FindState.NOT_FOUND);findMsg.then(msg=>{this.findMsg.textContent=msg;_classPrivateMethodGet(this,_adjustWidth,_adjustWidth2).call(this);});this.updateResultsCount(matchesCount);}updateResultsCount(){let{current=0,total=0}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};const limit=MATCHES_COUNT_LIMIT;let matchCountMsg=Promise.resolve("");if(total>0){if(total>limit){let key="find_match_count_limit";matchCountMsg=this.l10n.get(key,{limit});}else{let key="find_match_count";matchCountMsg=this.l10n.get(key,{current,total});}}matchCountMsg.then(msg=>{this.findResultsCount.textContent=msg;_classPrivateMethodGet(this,_adjustWidth,_adjustWidth2).call(this);});}open(){if(!this.opened){this.opened=true;this.toggleButton.classList.add("toggled");this.toggleButton.setAttribute("aria-expanded","true");this.bar.classList.remove("hidden");}this.findField.select();this.findField.focus();this.dispatchEvent("");this.eventBus.dispatch("findbaropen",{source:this});_classPrivateMethodGet(this,_adjustWidth,_adjustWidth2).call(this);}close(){if(!this.opened){return;}this.opened=false;this.toggleButton.classList.remove("toggled");this.toggleButton.setAttribute("aria-expanded","false");this.bar.classList.add("hidden");this.eventBus.dispatch("findbarclose",{source:this});}toggle(){if(this.opened){this.close();}else{this.open();}}}exports.PDFFindBar=PDFFindBar;function _adjustWidth2(){if(!this.opened){return;}this.bar.classList.remove("wrapContainers");const findbarHeight=this.bar.clientHeight;const inputContainerHeight=this.bar.firstElementChild.clientHeight;if(findbarHeight>inputContainerHeight){this.bar.classList.add("wrapContainers");}}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFFindController=exports.FindState=void 0;var _pdfjsLib=__webpack_require__(4);var _index=__webpack_require__(19);var _pdf_find_utils=__webpack_require__(20);var _levenshtein=__webpack_require__(21);var _ui_utils=__webpack_require__(3);const FindState={FOUND:0,NOT_FOUND:1,WRAPPED:2,PENDING:3};exports.FindState=FindState;const FIND_TIMEOUT=250;const MATCH_SCROLL_OFFSET_TOP=-50;const MATCH_SCROLL_OFFSET_LEFT=-400;const CHARACTERS_TO_NORMALIZE={"\u2010":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u00BC":"1/4","\u00BD":"1/2","\u00BE":"3/4","\n":" "};let normalizationRegex=null;function normalize(text){if(!normalizationRegex){const replace=Object.keys(CHARACTERS_TO_NORMALIZE).join("");normalizationRegex=new RegExp(`[${replace}]`,"g");}let diffs=null;const normalizedText=text.replace(normalizationRegex,function(ch,index){const normalizedCh=CHARACTERS_TO_NORMALIZE[ch];const diff=normalizedCh.length-ch.length;if(ch==="\n"){(diffs||=[]).push([index-1,1]);}else if(diff!==0){(diffs||=[]).push([index,diff]);}return normalizedCh;});return[normalizedText,diffs];}function getOriginalIndex(matchIndex){let diffs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!diffs){return matchIndex;}let totalDiff=0;for(const[index,diff]of diffs){const currentIndex=index+totalDiff;if(index>=matchIndex){break;}if(index+diff>matchIndex){totalDiff+=matchIndex-currentIndex;break;}totalDiff+=diff;}return matchIndex-totalDiff;}class PDFFindController{constructor(_ref){let{linkService,eventBus,pageViewMode}=_ref;this._linkService=linkService;this._eventBus=eventBus;this._pageViewMode=pageViewMode;this._reset();eventBus._on("find",this._onFind.bind(this));eventBus._on("findbarclose",this._onFindBarClose.bind(this));this.executeCommand=(cmd,state)=>{globalThis.ngxConsole.error("Deprecated method `PDFFindController.executeCommand` called, "+'please dispatch a "find"-event using the EventBus instead.');const eventState=Object.assign(Object.create(null),state,{type:cmd.substring("find".length)});this._onFind(eventState);};}get highlightMatches(){return this._highlightMatches;}get pageMatches(){return this._pageMatches;}get pageMatchesColor(){return this._pageMatchesColor;}get pageMatchesLength(){return this._pageMatchesLength;}get selected(){return this._selected;}get state(){return this._state;}setDocument(pdfDocument){if(this._pdfDocument){this._reset();}if(!pdfDocument){return;}this._pdfDocument=pdfDocument;this._firstPageCapability.resolve();}_onFind(state){if(!state){return;}const pdfDocument=this._pdfDocument;const{type}=state;if(this._state===null||this._shouldDirtyMatch(state)){this._dirtyMatch=true;}this._state=state;if(type!=="highlightallchange"){this._updateUIState(FindState.PENDING);}this._firstPageCapability.promise.then(()=>{if(!this._pdfDocument||pdfDocument&&this._pdfDocument!==pdfDocument){return;}this._extractText();const findbarClosed=!this._highlightMatches;const pendingTimeout=!!this._findTimeout;if(this._findTimeout){clearTimeout(this._findTimeout);this._findTimeout=null;}if(!type){this._findTimeout=setTimeout(()=>{this._nextMatch();this._findTimeout=null;},FIND_TIMEOUT);}else if(this._dirtyMatch){this._nextMatch();}else if(type==="again"){this._nextMatch();if(findbarClosed&&this._state.highlightAll){this._updateAllPages();}}else if(type==="highlightallchange"){if(pendingTimeout){this._nextMatch();}else{this._highlightMatches=true;}this._updateAllPages();}else{this._nextMatch();}});}scrollMatchIntoView(_ref2){let{element=null,selectedLeft=0,pageIndex=-1,matchIndex=-1}=_ref2;if(!this._scrollMatches||!element){return;}else if(matchIndex===-1||matchIndex!==this._selected.matchIdx){return;}else if(pageIndex===-1||pageIndex!==this._selected.pageIdx){return;}this._scrollMatches=false;const spot={top:MATCH_SCROLL_OFFSET_TOP,left:selectedLeft+MATCH_SCROLL_OFFSET_LEFT};(0,_ui_utils.scrollIntoView)(element,spot,true,this._pageViewMode==='infinite-scroll');}_reset(){this._highlightMatches=false;this._scrollMatches=false;this._pdfDocument=null;this._pageMatches=[];this._pageMatchesLength=[];this._pageMatchesColor=[];this._state=null;this._selected={pageIdx:-1,matchIdx:-1};this._offset={pageIdx:null,matchIdx:null,wrapped:false};this._extractTextPromises=[];this._pageContents=[];this._pageDiffs=[];this._matchesCountTotal=0;this._pagesToSearch=null;this._pendingFindMatches=new Set();this._resumePageIdx=null;this._dirtyMatch=false;clearTimeout(this._findTimeout);this._findTimeout=null;this._firstPageCapability=(0,_pdfjsLib.createPromiseCapability)();}get _query(){if(this._state.query!==this._rawQuery){this._rawQuery=this._state.query;const queries=this._state.query.split("\n");const normalizedQueries=queries.map(q=>normalize(q)[0]);this._normalizedQuery=normalizedQueries.join("\n");}return this._normalizedQuery;}_shouldDirtyMatch(state){if(state.query!==this._state.query){return true;}switch(state.type){case"again":const pageNumber=this._selected.pageIdx+1;const linkService=this._linkService;if(pageNumber>=1&&pageNumber<=linkService.pagesCount&&pageNumber!==linkService.page&&!linkService.isPageVisible(pageNumber)){return true;}return false;case"highlightallchange":return false;}return true;}_prepareMatches(matchesWithLength,matches,matchesLength,matchesColor){function isSubTerm(currentIndex){const currentElem=matchesWithLength[currentIndex];const nextElem=matchesWithLength[currentIndex+1];if(currentIndex<matchesWithLength.length-1&&currentElem.match===nextElem.match){currentElem.skipped=true;return true;}for(let i=currentIndex-1;i>=0;i--){const prevElem=matchesWithLength[i];if(prevElem.skipped){continue;}if(prevElem.match+prevElem.matchLength<currentElem.match){break;}if(prevElem.match+prevElem.matchLength>=currentElem.match+currentElem.matchLength){currentElem.skipped=true;return true;}}return false;}matchesWithLength.sort(function(a,b){return a.match===b.match?a.matchLength-b.matchLength:a.match-b.match;});for(let i=0,len=matchesWithLength.length;i<len;i++){if(isSubTerm(i)){continue;}matches.push(matchesWithLength[i].match);matchesLength.push(matchesWithLength[i].matchLength);matchesColor.push(matchesWithLength[i].color);}}_isEntireWord(content,startIdx,length){if(startIdx>0){const first=content.charCodeAt(startIdx);const limit=content.charCodeAt(startIdx-1);if((0,_pdf_find_utils.getCharacterType)(first)===(0,_pdf_find_utils.getCharacterType)(limit)){return false;}}const endIdx=startIdx+length-1;if(endIdx<content.length-1){const last=content.charCodeAt(endIdx);const limit=content.charCodeAt(endIdx+1);if((0,_pdf_find_utils.getCharacterType)(last)===(0,_pdf_find_utils.getCharacterType)(limit)){return false;}}return true;}_calculateFuzzyMatch(query,pageIndex,pageContent,pageDiffs){const matches=[];const matchesLength=[];const queryLen=query.length;const shortLen=queryLen<5?queryLen:5;const maxDistance=Math.round(queryLen/5);const shortQuery=query.substring(0,shortLen);const options={useCollator:true};for(let i=0;i<pageContent.length-queryLen;i++){const shortCurrentContent=pageContent.substring(i,i+shortLen);if(_levenshtein.Levenshtein.distance(shortQuery,shortCurrentContent,options)<3){const currentContent=pageContent.substring(i,i+queryLen);const distance=_levenshtein.Levenshtein.distance(query,currentContent,options);if(distance<=maxDistance){if(i+1<pageContent.length-queryLen){const nextCurrentContent=pageContent.substring(i+1,i+1+queryLen);const nextDistance=_levenshtein.Levenshtein.distance(query,nextCurrentContent,options);if(distance>=nextDistance){continue;}}const originalMatchIdx=getOriginalIndex(i,pageDiffs),matchEnd=i+queryLen-1,originalQueryLen=getOriginalIndex(matchEnd,pageDiffs)-originalMatchIdx+1;matches.push(originalMatchIdx);matchesLength.push(originalQueryLen);i+=queryLen-1;}}}this._pageMatches[pageIndex]=matches;this._pageMatchesLength[pageIndex]=matchesLength;}_calculatePhraseMatch(query,pageIndex,pageContent,pageDiffs,entireWord,ignoreAccents){if(ignoreAccents){pageContent=(0,_index.deburr)(pageContent);query=(0,_index.deburr)(query);}const matches=[],matchesLength=[];const queryLen=query.length;let matchIdx=-queryLen;while(true){matchIdx=pageContent.indexOf(query,matchIdx+queryLen);if(matchIdx===-1){break;}if(entireWord&&!this._isEntireWord(pageContent,matchIdx,queryLen)){continue;}const originalMatchIdx=getOriginalIndex(matchIdx,pageDiffs),matchEnd=matchIdx+queryLen-1,originalQueryLen=getOriginalIndex(matchEnd,pageDiffs)-originalMatchIdx+1;matches.push(originalMatchIdx);matchesLength.push(originalQueryLen);}this._pageMatches[pageIndex]=matches;this._pageMatchesLength[pageIndex]=matchesLength;}_calculateWordMatch(query,pageIndex,pageContent,pageDiffs,entireWord,ignoreAccents){if(ignoreAccents){pageContent=(0,_index.deburr)(pageContent);query=(0,_index.deburr)(query);}const matchesWithLength=[];const queryArray=query.includes("\n")?query.trim().split(/\n+/g):query.trim().match(/\S+/g);for(let i=0,len=queryArray.length;i<len;i++){const subquery=queryArray[i];const subqueryLen=subquery.length;if(subqueryLen===0){continue;}let matchIdx=-subqueryLen;while(true){matchIdx=pageContent.indexOf(subquery,matchIdx+subqueryLen);if(matchIdx===-1){break;}if(entireWord&&!this._isEntireWord(pageContent,matchIdx,subqueryLen)){continue;}const originalMatchIdx=getOriginalIndex(matchIdx,pageDiffs),matchEnd=matchIdx+subqueryLen-1,originalQueryLen=getOriginalIndex(matchEnd,pageDiffs)-originalMatchIdx+1;matchesWithLength.push({match:originalMatchIdx,matchLength:originalQueryLen,skipped:false,color:i});}}this._pageMatchesLength[pageIndex]=[];this._pageMatchesColor[pageIndex]=[];this._pageMatches[pageIndex]=[];this._prepareMatches(matchesWithLength,this._pageMatches[pageIndex],this._pageMatchesLength[pageIndex],this._pageMatchesColor[pageIndex]);}_isInPageRanges(){let page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;let commaSeparatedRanges=arguments.length>1?arguments[1]:undefined;try{if(!commaSeparatedRanges){return true;}const parts=commaSeparatedRanges.split(",");return parts.some(range=>this._isInPageRange(page,range));}catch(e){return true;}}_isInPageRange(){let page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;let range=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"6-7";try{if(!range){return true;}if(range.includes("-")){const parts=range.split("-");const from=parts[0].trim();if(from.length>0){if(page<Number(from)){return false;}}const to=parts[1].trim();if(to.length>0){if(page>Number(to)){return false;}}}else{const from=range.trim();if(from.length>0){if(Number(from)===page){return true;}else{return false;}}}return true;}catch(e){return true;}}_calculateMatch(pageIndex){if(!this.state){return;}let pageContent=this._pageContents[pageIndex];const pageDiffs=this._pageDiffs[pageIndex];let query=this._query;const{caseSensitive,entireWord,ignoreAccents,fuzzySearch,phraseSearch,currentPage,pageRange}=this._state;let ignoreCurrentPage=false;if(currentPage){if(pageIndex!==this._linkService.page-1){ignoreCurrentPage=true;this._pageMatches[pageIndex]=[];}}if(!this._isInPageRanges(pageIndex+1,pageRange)){ignoreCurrentPage=true;this._pageMatches[pageIndex]=[];}if(query.length===0){return;}if(!ignoreCurrentPage){if(!caseSensitive){pageContent=pageContent.toLowerCase();query=query.toLowerCase();}if(fuzzySearch){if(query.length<=2){this._calculatePhraseMatch(query,pageIndex,pageContent,pageDiffs,false);}else{this._calculateFuzzyMatch(query,pageIndex,pageContent,pageDiffs);}}else if(phraseSearch){this._calculatePhraseMatch(query,pageIndex,pageContent,pageDiffs,entireWord,ignoreAccents);}else{this._calculateWordMatch(query,pageIndex,pageContent,pageDiffs,entireWord,ignoreAccents);}}if(this._state.highlightAll){this._updatePage(pageIndex);}if(this._resumePageIdx===pageIndex){this._resumePageIdx=null;this._nextPageMatch();}const pageMatchesCount=this._pageMatches[pageIndex].length;if(pageMatchesCount>0){this._matchesCountTotal+=pageMatchesCount;this._updateUIResultsCount();}else if(pageIndex+1===this._pageContents.length&&this._matchesCountTotal===0){this._updateUIResultsCount();}else if(currentPage&&!ignoreCurrentPage){this._updateMatch(false);}}_extractText(){if(this._extractTextPromises.length>0){return;}let promise=Promise.resolve();for(let i=0,ii=this._linkService.pagesCount;i<ii;i++){const extractTextCapability=(0,_pdfjsLib.createPromiseCapability)();this._extractTextPromises[i]=extractTextCapability.promise;promise=promise.then(()=>{if(this._pdfDocument&&this._extractTextPromises.length>0){return this._pdfDocument.getPage(i+1).then(pdfPage=>{return pdfPage.getTextContent();}).then(textContent=>{const textItems=textContent.items;const strBuf=[];for(let j=0,jj=textItems.length;j<jj;j++){strBuf.push(textItems[j].str);if(textItems[j].hasEOL){strBuf.push("\n");}}[this._pageContents[i],this._pageDiffs[i]]=normalize(strBuf.join(""),false);extractTextCapability.resolve(i);},reason=>{globalThis.ngxConsole.error(`Unable to get text content for page ${i+1}`,reason);this._pageContents[i]="";this._pageDiffs[i]=null;extractTextCapability.resolve(i);});}return Promise.resolve();});}}_updatePage(index){if(this._scrollMatches&&this._selected.pageIdx===index){this._linkService.page=index+1;}this._eventBus.dispatch("updatetextlayermatches",{source:this,pageIndex:index});}_updateAllPages(){this._eventBus.dispatch("updatetextlayermatches",{source:this,pageIndex:-1});}_nextMatch(){const previous=this._state.findPrevious;const currentPageIndex=this._linkService.page-1;const numPages=this._linkService.pagesCount;this._highlightMatches=true;if(this._dirtyMatch){this._dirtyMatch=false;this._selected.pageIdx=this._selected.matchIdx=-1;this._offset.pageIdx=currentPageIndex;this._offset.matchIdx=null;this._offset.wrapped=false;this._resumePageIdx=null;this._pageMatches.length=0;this._pageMatchesLength.length=0;this._pageMatchesColor.length=0;this._matchesCountTotal=0;this._updateAllPages();const{currentPage}=this.state;let startPage=0;let finalPage=numPages-1;if(currentPage){startPage=this._linkService.page-1;finalPage=startPage;}for(let i=startPage;i<=finalPage;i++){if(this._pendingFindMatches.has(i)){continue;}this._pendingFindMatches.add(i);this._extractTextPromises[i].then(pageIdx=>{this._pendingFindMatches.delete(pageIdx);this._calculateMatch(pageIdx);});}}if(this._query===""){this._updateUIState(FindState.FOUND);return;}if(this._resumePageIdx){return;}const offset=this._offset;this._pagesToSearch=numPages;if(offset.matchIdx!==null){const numPageMatches=this._pageMatches[offset.pageIdx].length;if(!previous&&offset.matchIdx+1<numPageMatches||previous&&offset.matchIdx>0){offset.matchIdx=previous?offset.matchIdx-1:offset.matchIdx+1;this._updateMatch(true);return;}if(this.state.currentPage){if(previous){offset.matchIdx=numPageMatches-1;}else{offset.matchIdx=0;}this._updateMatch(true);this._updateUIState(FindState.WRAPPED);return;}else{this._advanceOffsetPage(previous);}}this._nextPageMatch();}_matchesReady(matches){const offset=this._offset;const numMatches=matches.length;const previous=this._state.findPrevious;if(numMatches){offset.matchIdx=previous?numMatches-1:0;this._updateMatch(true);return true;}this._advanceOffsetPage(previous);if(offset.wrapped){offset.matchIdx=null;if(this._pagesToSearch<0){this._updateMatch(false);return true;}}return false;}_nextPageMatch(){if(this._resumePageIdx!==null){globalThis.ngxConsole.error("There can only be one pending page.");}let matches=null;do{const pageIdx=this._offset.pageIdx;matches=this._pageMatches[pageIdx];if(!matches){this._resumePageIdx=pageIdx;break;}}while(!this._matchesReady(matches));}_advanceOffsetPage(previous){const offset=this._offset;const numPages=this._linkService.pagesCount;offset.pageIdx=previous?offset.pageIdx-1:offset.pageIdx+1;offset.matchIdx=null;this._pagesToSearch--;if(offset.pageIdx>=numPages||offset.pageIdx<0){offset.pageIdx=previous?numPages-1:0;offset.wrapped=true;}}_updateMatch(){let found=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;let state=FindState.NOT_FOUND;const wrapped=this._offset.wrapped;this._offset.wrapped=false;if(found){const previousPage=this._selected.pageIdx;this._selected.pageIdx=this._offset.pageIdx;this._selected.matchIdx=this._offset.matchIdx;state=wrapped?FindState.WRAPPED:FindState.FOUND;if(previousPage!==-1&&previousPage!==this._selected.pageIdx){this._updatePage(previousPage);}}this._updateUIState(state,this._state.findPrevious);if(this._selected.pageIdx!==-1){this._scrollMatches=true;this._updatePage(this._selected.pageIdx);}}_onFindBarClose(evt){const pdfDocument=this._pdfDocument;this._firstPageCapability.promise.then(()=>{if(!this._pdfDocument||pdfDocument&&this._pdfDocument!==pdfDocument){return;}if(this._findTimeout){clearTimeout(this._findTimeout);this._findTimeout=null;}if(this._resumePageIdx){this._resumePageIdx=null;this._dirtyMatch=true;}this._updateUIState(FindState.FOUND);this._highlightMatches=false;this._updateAllPages();});}_requestMatchesCount(){const{pageIdx,matchIdx}=this._selected;let current=0,total=this._matchesCountTotal;if(matchIdx!==-1){for(let i=0;i<pageIdx;i++){var _this$_pageMatches$i;current+=((_this$_pageMatches$i=this._pageMatches[i])===null||_this$_pageMatches$i===void 0?void 0:_this$_pageMatches$i.length)||0;}current+=matchIdx+1;}if(current<1||current>total){current=total=0;}return{current,total};}_updateUIResultsCount(){this._eventBus.dispatch("updatefindmatchescount",{source:this,matchesCount:this._requestMatchesCount()});}_updateUIState(state){var _this$_state;let previous=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;this._eventBus.dispatch("updatefindcontrolstate",{source:this,state,previous,matchesCount:this._requestMatchesCount(),rawQuery:((_this$_state=this._state)===null||_this$_state===void 0?void 0:_this$_state.query)??null});}}exports.PDFFindController=PDFFindController;

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.deburr=deburr;var INFINITY=1/0;var symbolTag='[object Symbol]';var reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;var rsComboMarksRange='\\u0300-\\u036f\\ufe20-\\ufe23',rsComboSymbolsRange='\\u20d0-\\u20f0';var rsCombo='['+rsComboMarksRange+rsComboSymbolsRange+']';var reComboMark=RegExp(rsCombo,'g');var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcc':'I','\xcd':'I','\xce':'I','\xcf':'I','\xec':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss','\u0100':'A','\u0102':'A','\u0104':'A','\u0101':'a','\u0103':'a','\u0105':'a','\u0106':'C','\u0108':'C','\u010a':'C','\u010c':'C','\u0107':'c','\u0109':'c','\u010b':'c','\u010d':'c','\u010e':'D','\u0110':'D','\u010f':'d','\u0111':'d','\u0112':'E','\u0114':'E','\u0116':'E','\u0118':'E','\u011a':'E','\u0113':'e','\u0115':'e','\u0117':'e','\u0119':'e','\u011b':'e','\u011c':'G','\u011e':'G','\u0120':'G','\u0122':'G','\u011d':'g','\u011f':'g','\u0121':'g','\u0123':'g','\u0124':'H','\u0126':'H','\u0125':'h','\u0127':'h','\u0128':'I','\u012a':'I','\u012c':'I','\u012e':'I','\u0130':'I','\u0129':'i','\u012b':'i','\u012d':'i','\u012f':'i','\u0131':'i','\u0134':'J','\u0135':'j','\u0136':'K','\u0137':'k','\u0138':'k','\u0139':'L','\u013b':'L','\u013d':'L','\u013f':'L','\u0141':'L','\u013a':'l','\u013c':'l','\u013e':'l','\u0140':'l','\u0142':'l','\u0143':'N','\u0145':'N','\u0147':'N','\u014a':'N','\u0144':'n','\u0146':'n','\u0148':'n','\u014b':'n','\u014c':'O','\u014e':'O','\u0150':'O','\u014d':'o','\u014f':'o','\u0151':'o','\u0154':'R','\u0156':'R','\u0158':'R','\u0155':'r','\u0157':'r','\u0159':'r','\u015a':'S','\u015c':'S','\u015e':'S','\u0160':'S','\u015b':'s','\u015d':'s','\u015f':'s','\u0161':'s','\u0162':'T','\u0164':'T','\u0166':'T','\u0163':'t','\u0165':'t','\u0167':'t','\u0168':'U','\u016a':'U','\u016c':'U','\u016e':'U','\u0170':'U','\u0172':'U','\u0169':'u','\u016b':'u','\u016d':'u','\u016f':'u','\u0171':'u','\u0173':'u','\u0174':'W','\u0175':'w','\u0176':'Y','\u0177':'y','\u0178':'Y','\u0179':'Z','\u017b':'Z','\u017d':'Z','\u017a':'z','\u017c':'z','\u017e':'z','\u0132':'IJ','\u0133':'ij','\u0152':'Oe','\u0153':'oe','\u0149':"'n",'\u017f':'ss'};var freeGlobal=typeof global=='object'&&global&&global.Object===Object&&global;var freeSelf=typeof self=='object'&&self&&self.Object===Object&&self;var root=freeGlobal||freeSelf||Function('return this')();function basePropertyOf(object){return function(key){return object==null?undefined:object[key];};}var deburrLetter=basePropertyOf(deburredLetters);var objectProto=Object.prototype;var objectToString=objectProto.toString;var Symbol=root.Symbol;var symbolProto=Symbol?Symbol.prototype:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;function baseToString(value){if(typeof value=='string'){return value;}if(isSymbol(value)){return symbolToString?symbolToString.call(value):'';}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}function isObjectLike(value){return!!value&&typeof value=='object';}function isSymbol(value){return typeof value=='symbol'||isObjectLike(value)&&objectToString.call(value)==symbolTag;}function toString(value){return value==null?'':baseToString(value);}function deburr(string){string=toString(string);return string&&string.replace(reLatin,deburrLetter).replace(reComboMark,'');}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.CharacterType=void 0;exports.getCharacterType=getCharacterType;const CharacterType={SPACE:0,ALPHA_LETTER:1,PUNCT:2,HAN_LETTER:3,KATAKANA_LETTER:4,HIRAGANA_LETTER:5,HALFWIDTH_KATAKANA_LETTER:6,THAI_LETTER:7};exports.CharacterType=CharacterType;function isAlphabeticalScript(charCode){return charCode<0x2e80;}function isAscii(charCode){return(charCode&0xff80)===0;}function isAsciiAlpha(charCode){return charCode>=0x61&&charCode<=0x7a||charCode>=0x41&&charCode<=0x5a;}function isAsciiDigit(charCode){return charCode>=0x30&&charCode<=0x39;}function isAsciiSpace(charCode){return charCode===0x20||charCode===0x09||charCode===0x0d||charCode===0x0a;}function isHan(charCode){return charCode>=0x3400&&charCode<=0x9fff||charCode>=0xf900&&charCode<=0xfaff;}function isKatakana(charCode){return charCode>=0x30a0&&charCode<=0x30ff;}function isHiragana(charCode){return charCode>=0x3040&&charCode<=0x309f;}function isHalfwidthKatakana(charCode){return charCode>=0xff60&&charCode<=0xff9f;}function isThai(charCode){return(charCode&0xff80)===0x0e00;}function getCharacterType(charCode){if(isAlphabeticalScript(charCode)){if(isAscii(charCode)){if(isAsciiSpace(charCode)){return CharacterType.SPACE;}else if(isAsciiAlpha(charCode)||isAsciiDigit(charCode)||charCode===0x5f){return CharacterType.ALPHA_LETTER;}return CharacterType.PUNCT;}else if(isThai(charCode)){return CharacterType.THAI_LETTER;}else if(charCode===0xa0){return CharacterType.SPACE;}return CharacterType.ALPHA_LETTER;}if(isHan(charCode)){return CharacterType.HAN_LETTER;}else if(isKatakana(charCode)){return CharacterType.KATAKANA_LETTER;}else if(isHiragana(charCode)){return CharacterType.HIRAGANA_LETTER;}else if(isHalfwidthKatakana(charCode)){return CharacterType.HALFWIDTH_KATAKANA_LETTER;}return CharacterType.ALPHA_LETTER;}

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.Levenshtein=void 0;let levenshtein_collator;try{levenshtein_collator=Intl.Collator("und",{sensitivity:"base"});}catch(missingBrowserSupport){try{levenshtein_collator=Intl.Collator("generic",{sensitivity:"base"});}catch(noBrowserSupport){levenshtein_collator=undefined;}}const levenshtein_prevRow=[];const levenshtein_str2Char=[];class Levenshtein{static distance(str1,str2,options){const useCollator=options&&levenshtein_collator&&options.useCollator;const str1Len=str1.length;const str2Len=str2.length;if(str1Len===0){return str2Len;}if(str2Len===0){return str1Len;}let curCol,nextCol,i,j,tmp;for(i=0;i<str2Len;++i){levenshtein_prevRow[i]=i;levenshtein_str2Char[i]=str2.charCodeAt(i);}levenshtein_prevRow[str2Len]=str2Len;let strCmp;if(useCollator){for(i=0;i<str1Len;++i){nextCol=i+1;for(j=0;j<str2Len;++j){curCol=nextCol;strCmp=levenshtein_collator.compare(str1.charAt(i),String.fromCharCode(levenshtein_str2Char[j]))===0;nextCol=levenshtein_prevRow[j]+(strCmp?0:1);tmp=curCol+1;if(nextCol>tmp){nextCol=tmp;}tmp=levenshtein_prevRow[j+1]+1;if(nextCol>tmp){nextCol=tmp;}levenshtein_prevRow[j]=curCol;}levenshtein_prevRow[j]=nextCol;}}else{for(i=0;i<str1Len;++i){nextCol=i+1;for(j=0;j<str2Len;++j){curCol=nextCol;strCmp=str1.charCodeAt(i)===levenshtein_str2Char[j];nextCol=levenshtein_prevRow[j]+(strCmp?0:1);tmp=curCol+1;if(nextCol>tmp){nextCol=tmp;}tmp=levenshtein_prevRow[j+1]+1;if(nextCol>tmp){nextCol=tmp;}levenshtein_prevRow[j]=curCol;}levenshtein_prevRow[j]=nextCol;}}return nextCol;}}exports.Levenshtein=Levenshtein;

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFHistory=void 0;exports.isDestArraysEqual=isDestArraysEqual;exports.isDestHashesEqual=isDestHashesEqual;var _ui_utils=__webpack_require__(3);var _event_utils=__webpack_require__(6);const HASH_CHANGE_TIMEOUT=1000;const POSITION_UPDATED_THRESHOLD=50;const UPDATE_VIEWAREA_TIMEOUT=1000;function getCurrentHash(){return document.location.hash;}class PDFHistory{constructor(_ref){let{linkService,eventBus}=_ref;this.linkService=linkService;this.eventBus=eventBus;this._initialized=false;this._fingerprint="";this.reset();this._boundEvents=null;this.eventBus._on("pagesinit",()=>{this._isPagesLoaded=false;this.eventBus._on("pagesloaded",evt=>{this._isPagesLoaded=!!evt.pagesCount;},{once:true});});}initialize(_ref2){let{fingerprint,resetHistory=false,updateUrl=false}=_ref2;if(!fingerprint||typeof fingerprint!=="string"){globalThis.ngxConsole.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');return;}if(this._initialized){this.reset();}const reInitialized=this._fingerprint!==""&&this._fingerprint!==fingerprint;this._fingerprint=fingerprint;this._updateUrl=updateUrl===true;this._initialized=true;this._bindEvents();const state=window.history.state;this._popStateInProgress=false;this._blockHashChange=0;this._currentHash=getCurrentHash();this._numPositionUpdates=0;this._uid=this._maxUid=0;this._destination=null;this._position=null;if(!this._isValidState(state,true)||resetHistory){const{hash,page,rotation}=this._parseCurrentHash(true);if(!hash||reInitialized||resetHistory){this._pushOrReplaceState(null,true);return;}this._pushOrReplaceState({hash,page,rotation},true);return;}const destination=state.destination;this._updateInternalState(destination,state.uid,true);if(destination.rotation!==undefined){this._initialRotation=destination.rotation;}if(destination.dest){this._initialBookmark=JSON.stringify(destination.dest);this._destination.page=null;}else if(destination.hash){this._initialBookmark=destination.hash;}else if(destination.page){this._initialBookmark=`page=${destination.page}`;}}reset(){if(this._initialized){this._pageHide();this._initialized=false;this._unbindEvents();}if(this._updateViewareaTimeout){clearTimeout(this._updateViewareaTimeout);this._updateViewareaTimeout=null;}this._initialBookmark=null;this._initialRotation=null;}push(_ref3){let{namedDest=null,explicitDest,pageNumber}=_ref3;if(!this._initialized){return;}if(namedDest&&typeof namedDest!=="string"){globalThis.ngxConsole.error("PDFHistory.push: "+`"${namedDest}" is not a valid namedDest parameter.`);return;}else if(!Array.isArray(explicitDest)){globalThis.ngxConsole.error("PDFHistory.push: "+`"${explicitDest}" is not a valid explicitDest parameter.`);return;}else if(!this._isValidPage(pageNumber)){if(pageNumber!==null||this._destination){globalThis.ngxConsole.error("PDFHistory.push: "+`"${pageNumber}" is not a valid pageNumber parameter.`);return;}}const hash=namedDest||JSON.stringify(explicitDest);if(!hash){return;}let forceReplace=false;if(this._destination&&(isDestHashesEqual(this._destination.hash,hash)||isDestArraysEqual(this._destination.dest,explicitDest))){if(this._destination.page){return;}forceReplace=true;}if(this._popStateInProgress&&!forceReplace){return;}this._pushOrReplaceState({dest:explicitDest,hash,page:pageNumber,rotation:this.linkService.rotation},forceReplace);if(!this._popStateInProgress){this._popStateInProgress=true;Promise.resolve().then(()=>{this._popStateInProgress=false;});}}pushPage(pageNumber){var _this$_destination;if(!this._initialized){return;}if(!this._isValidPage(pageNumber)){globalThis.ngxConsole.error(`PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`);return;}if(((_this$_destination=this._destination)===null||_this$_destination===void 0?void 0:_this$_destination.page)===pageNumber){return;}if(this._popStateInProgress){return;}this._pushOrReplaceState({dest:null,hash:`page=${pageNumber}`,page:pageNumber,rotation:this.linkService.rotation});if(!this._popStateInProgress){this._popStateInProgress=true;Promise.resolve().then(()=>{this._popStateInProgress=false;});}}pushCurrentPosition(){if(!this._initialized||this._popStateInProgress){return;}this._tryPushCurrentPosition();}back(){if(!this._initialized||this._popStateInProgress){return;}const state=window.history.state;if(this._isValidState(state)&&state.uid>0){window.history.back();}}forward(){if(!this._initialized||this._popStateInProgress){return;}const state=window.history.state;if(this._isValidState(state)&&state.uid<this._maxUid){window.history.forward();}}get popStateInProgress(){return this._initialized&&(this._popStateInProgress||this._blockHashChange>0);}get initialBookmark(){return this._initialized?this._initialBookmark:null;}get initialRotation(){return this._initialized?this._initialRotation:null;}_pushOrReplaceState(destination){let forceReplace=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const shouldReplace=forceReplace||!this._destination;const newState={fingerprint:this._fingerprint,uid:shouldReplace?this._uid:this._uid+1,destination};this._updateInternalState(destination,newState.uid);let newUrl;if(this._updateUrl&&destination!==null&&destination!==void 0&&destination.hash){const baseUrl=document.location.href.split("#")[0];if(!baseUrl.startsWith("file://")){newUrl=`${baseUrl}#${destination.hash}`;}}if(shouldReplace){window.history.replaceState(newState,"",newUrl);}else{window.history.pushState(newState,"",newUrl);}}_tryPushCurrentPosition(){let temporary=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(!this._position){return;}let position=this._position;if(temporary){position=Object.assign(Object.create(null),this._position);position.temporary=true;}if(!this._destination){this._pushOrReplaceState(position);return;}if(this._destination.temporary){this._pushOrReplaceState(position,true);return;}if(this._destination.hash===position.hash){return;}if(!this._destination.page&&(POSITION_UPDATED_THRESHOLD<=0||this._numPositionUpdates<=POSITION_UPDATED_THRESHOLD)){return;}let forceReplace=false;if(this._destination.page>=position.first&&this._destination.page<=position.page){if(this._destination.dest!==undefined||!this._destination.first){return;}forceReplace=true;}this._pushOrReplaceState(position,forceReplace);}_isValidPage(val){return Number.isInteger(val)&&val>0&&val<=this.linkService.pagesCount;}_isValidState(state){let checkReload=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!state){return false;}if(state.fingerprint!==this._fingerprint){if(checkReload){if(typeof state.fingerprint!=="string"||state.fingerprint.length!==this._fingerprint.length){return false;}const[perfEntry]=performance.getEntriesByType("navigation");if((perfEntry===null||perfEntry===void 0?void 0:perfEntry.type)!=="reload"){return false;}}else{return false;}}if(!Number.isInteger(state.uid)||state.uid<0){return false;}if(state.destination===null||typeof state.destination!=="object"){return false;}return true;}_updateInternalState(destination,uid){let removeTemporary=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(this._updateViewareaTimeout){clearTimeout(this._updateViewareaTimeout);this._updateViewareaTimeout=null;}if(removeTemporary&&destination!==null&&destination!==void 0&&destination.temporary){delete destination.temporary;}this._destination=destination;this._uid=uid;this._maxUid=Math.max(this._maxUid,uid);this._numPositionUpdates=0;}_parseCurrentHash(){let checkNameddest=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;const hash=unescape(getCurrentHash()).substring(1);const params=(0,_ui_utils.parseQueryString)(hash);const nameddest=params.get("nameddest")||"";let page=params.get("page")|0;if(!this._isValidPage(page)||checkNameddest&&nameddest.length>0){page=null;}return{hash,page,rotation:this.linkService.rotation};}_updateViewarea(_ref4){let{location}=_ref4;if(this._updateViewareaTimeout){clearTimeout(this._updateViewareaTimeout);this._updateViewareaTimeout=null;}this._position={hash:location.pdfOpenParams.substring(1),page:this.linkService.page,first:location.pageNumber,rotation:location.rotation};if(this._popStateInProgress){return;}if(POSITION_UPDATED_THRESHOLD>0&&this._isPagesLoaded&&this._destination&&!this._destination.page){this._numPositionUpdates++;}if(UPDATE_VIEWAREA_TIMEOUT>0){this._updateViewareaTimeout=setTimeout(()=>{if(!this._popStateInProgress){this._tryPushCurrentPosition(true);}this._updateViewareaTimeout=null;},UPDATE_VIEWAREA_TIMEOUT);}}_popState(_ref5){let{state}=_ref5;const newHash=getCurrentHash(),hashChanged=this._currentHash!==newHash;this._currentHash=newHash;if(!state){this._uid++;const{hash,page,rotation}=this._parseCurrentHash();this._pushOrReplaceState({hash,page,rotation},true);return;}if(!this._isValidState(state)){return;}this._popStateInProgress=true;if(hashChanged){this._blockHashChange++;(0,_event_utils.waitOnEventOrTimeout)({target:window,name:"hashchange",delay:HASH_CHANGE_TIMEOUT}).then(()=>{this._blockHashChange--;});}const destination=state.destination;this._updateInternalState(destination,state.uid,true);if((0,_ui_utils.isValidRotation)(destination.rotation)){this.linkService.rotation=destination.rotation;}if(destination.dest){this.linkService.goToDestination(destination.dest);}else if(destination.hash){this.linkService.setHash(destination.hash);}else if(destination.page){this.linkService.page=destination.page;}Promise.resolve().then(()=>{this._popStateInProgress=false;});}_pageHide(){if(!this._destination||this._destination.temporary){this._tryPushCurrentPosition();}}_bindEvents(){if(this._boundEvents){return;}this._boundEvents={updateViewarea:this._updateViewarea.bind(this),popState:this._popState.bind(this),pageHide:this._pageHide.bind(this)};this.eventBus._on("updateviewarea",this._boundEvents.updateViewarea);window.addEventListener("popstate",this._boundEvents.popState);window.addEventListener("pagehide",this._boundEvents.pageHide);}_unbindEvents(){if(!this._boundEvents){return;}this.eventBus._off("updateviewarea",this._boundEvents.updateViewarea);window.removeEventListener("popstate",this._boundEvents.popState);window.removeEventListener("pagehide",this._boundEvents.pageHide);this._boundEvents=null;}}exports.PDFHistory=PDFHistory;function isDestHashesEqual(destHash,pushHash){if(typeof destHash!=="string"||typeof pushHash!=="string"){return false;}if(destHash===pushHash){return true;}const nameddest=(0,_ui_utils.parseQueryString)(destHash).get("nameddest");if(nameddest===pushHash){return true;}return false;}function isDestArraysEqual(firstDest,secondDest){function isEntryEqual(first,second){if(typeof first!==typeof second){return false;}if(Array.isArray(first)||Array.isArray(second)){return false;}if(first!==null&&typeof first==="object"&&second!==null){if(Object.keys(first).length!==Object.keys(second).length){return false;}for(const key in first){if(!isEntryEqual(first[key],second[key])){return false;}}return true;}return first===second||Number.isNaN(first)&&Number.isNaN(second);}if(!(Array.isArray(firstDest)&&Array.isArray(secondDest))){return false;}if(firstDest.length!==secondDest.length){return false;}for(let i=0,ii=firstDest.length;i<ii;i++){if(!isEntryEqual(firstDest[i],secondDest[i])){return false;}}return true;}

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFLayerViewer=void 0;var _base_tree_viewer=__webpack_require__(13);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _updateLayers=/*#__PURE__*/new WeakSet();class PDFLayerViewer extends _base_tree_viewer.BaseTreeViewer{constructor(options){super(options);_classPrivateMethodInitSpec(this,_updateLayers);this.l10n=options.l10n;this.eventBus._on("optionalcontentconfigchanged",evt=>{_classPrivateMethodGet(this,_updateLayers,_updateLayers2).call(this,evt.promise);});this.eventBus._on("resetlayers",()=>{_classPrivateMethodGet(this,_updateLayers,_updateLayers2).call(this);});this.eventBus._on("togglelayerstree",this._toggleAllTreeItems.bind(this));}reset(){super.reset();this._optionalContentConfig=null;this._optionalContentHash=null;}_dispatchEvent(layersCount){this.eventBus.dispatch("layersloaded",{source:this,layersCount});}_bindLink(element,_ref){let{groupId,input}=_ref;const setVisibility=()=>{this._optionalContentConfig.setVisibility(groupId,input.checked);this._optionalContentHash=this._optionalContentConfig.getHash();this.eventBus.dispatch("optionalcontentconfig",{source:this,promise:Promise.resolve(this._optionalContentConfig)});};element.onclick=evt=>{if(evt.target===input){setVisibility();return true;}else if(evt.target!==element){return true;}input.checked=!input.checked;setVisibility();return false;};}async _setNestedName(element,_ref2){let{name=null}=_ref2;if(typeof name==="string"){element.textContent=this._normalizeTextContent(name);return;}element.textContent=await this.l10n.get("additional_layers");element.style.fontStyle="italic";}_addToggleButton(div,_ref3){let{name=null}=_ref3;super._addToggleButton(div,name===null);}_toggleAllTreeItems(){if(!this._optionalContentConfig){return;}super._toggleAllTreeItems();}render(_ref4){let{optionalContentConfig,pdfDocument}=_ref4;if(this._optionalContentConfig){this.reset();}this._optionalContentConfig=optionalContentConfig||null;this._pdfDocument=pdfDocument||null;const groups=optionalContentConfig===null||optionalContentConfig===void 0?void 0:optionalContentConfig.getOrder();if(!groups){this._dispatchEvent(0);return;}this._optionalContentHash=optionalContentConfig.getHash();const fragment=document.createDocumentFragment(),queue=[{parent:fragment,groups}];let layersCount=0,hasAnyNesting=false;while(queue.length>0){const levelData=queue.shift();for(const groupId of levelData.groups){const div=document.createElement("div");div.className="treeItem";const element=document.createElement("a");div.append(element);if(typeof groupId==="object"){hasAnyNesting=true;this._addToggleButton(div,groupId);this._setNestedName(element,groupId);const itemsDiv=document.createElement("div");itemsDiv.className="treeItems";div.append(itemsDiv);queue.push({parent:itemsDiv,groups:groupId.order});}else{const group=optionalContentConfig.getGroup(groupId);const input=document.createElement("input");this._bindLink(element,{groupId,input});input.type="checkbox";input.checked=group.visible;const label=document.createElement("label");label.textContent=this._normalizeTextContent(group.name);label.append(input);element.append(label);layersCount++;}levelData.parent.append(div);}}this._finishRendering(fragment,layersCount,hasAnyNesting);}}exports.PDFLayerViewer=PDFLayerViewer;async function _updateLayers2(){let promise=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(!this._optionalContentConfig){return;}const pdfDocument=this._pdfDocument;const optionalContentConfig=await(promise||pdfDocument.getOptionalContentConfig());if(pdfDocument!==this._pdfDocument){return;}if(promise){if(optionalContentConfig.getHash()===this._optionalContentHash){return;}}else{this.eventBus.dispatch("optionalcontentconfig",{source:this,promise:Promise.resolve(optionalContentConfig)});}this.render({optionalContentConfig,pdfDocument:this._pdfDocument});}

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFOutlineViewer=void 0;var _base_tree_viewer=__webpack_require__(13);var _pdfjsLib=__webpack_require__(4);var _ui_utils=__webpack_require__(3);class PDFOutlineViewer extends _base_tree_viewer.BaseTreeViewer{constructor(options){super(options);this.linkService=options.linkService;this.downloadManager=options.downloadManager;this.eventBus._on("toggleoutlinetree",this._toggleAllTreeItems.bind(this));this.eventBus._on("currentoutlineitem",this._currentOutlineItem.bind(this));this.eventBus._on("pagechanging",evt=>{this._currentPageNumber=evt.pageNumber;});this.eventBus._on("pagesloaded",evt=>{this._isPagesLoaded=!!evt.pagesCount;if(this._currentOutlineItemCapability&&!this._currentOutlineItemCapability.settled){this._currentOutlineItemCapability.resolve(this._isPagesLoaded);}});this.eventBus._on("sidebarviewchanged",evt=>{this._sidebarView=evt.view;});}reset(){super.reset();this._outline=null;this._pageNumberToDestHashCapability=null;this._currentPageNumber=1;this._isPagesLoaded=null;if(this._currentOutlineItemCapability&&!this._currentOutlineItemCapability.settled){this._currentOutlineItemCapability.resolve(false);}this._currentOutlineItemCapability=null;}_dispatchEvent(outlineCount){var _this$_pdfDocument;this._currentOutlineItemCapability=(0,_pdfjsLib.createPromiseCapability)();if(outlineCount===0||(_this$_pdfDocument=this._pdfDocument)!==null&&_this$_pdfDocument!==void 0&&_this$_pdfDocument.loadingParams.disableAutoFetch){this._currentOutlineItemCapability.resolve(false);}else if(this._isPagesLoaded!==null){this._currentOutlineItemCapability.resolve(this._isPagesLoaded);}this.eventBus.dispatch("outlineloaded",{source:this,outlineCount,currentOutlineItemPromise:this._currentOutlineItemCapability.promise});}_bindLink(element,_ref){let{url,newWindow,action,attachment,dest,setOCGState}=_ref;const{linkService}=this;if(url){linkService.addLinkAttributes(element,url,newWindow);return;}if(action){element.href=linkService.getAnchorUrl("");element.onclick=()=>{linkService.executeNamedAction(action);return false;};return;}if(attachment){element.href=linkService.getAnchorUrl("");element.onclick=()=>{this.downloadManager.openOrDownloadData(element,attachment.content,attachment.filename);return false;};return;}if(setOCGState){element.href=linkService.getAnchorUrl("");element.onclick=()=>{linkService.executeSetOCGState(setOCGState);return false;};return;}element.href=linkService.getDestinationHash(dest);element.onclick=evt=>{this._updateCurrentTreeItem(evt.target.parentNode);if(dest){linkService.goToDestination(dest);}return false;};}_setStyles(element,_ref2){let{bold,italic}=_ref2;if(bold){element.style.fontWeight="bold";}if(italic){element.style.fontStyle="italic";}}_addToggleButton(div,_ref3){let{count,items}=_ref3;let hidden=false;if(count<0){let totalCount=items.length;if(totalCount>0){const queue=[...items];while(queue.length>0){const{count:nestedCount,items:nestedItems}=queue.shift();if(nestedCount>0&&nestedItems.length>0){totalCount+=nestedItems.length;queue.push(...nestedItems);}}}if(Math.abs(count)===totalCount){hidden=true;}}super._addToggleButton(div,hidden);}_toggleAllTreeItems(){if(!this._outline){return;}super._toggleAllTreeItems();}render(_ref4){let{outline,pdfDocument}=_ref4;if(this._outline){this.reset();}this._outline=outline||null;this._pdfDocument=pdfDocument||null;if(!outline){this._dispatchEvent(0);return;}const fragment=document.createDocumentFragment();const queue=[{parent:fragment,items:outline}];let outlineCount=0,hasAnyNesting=false;while(queue.length>0){const levelData=queue.shift();for(const item of levelData.items){const div=document.createElement("div");div.className="treeItem";const element=document.createElement("a");this._bindLink(element,item);this._setStyles(element,item);element.textContent=this._normalizeTextContent(item.title);div.append(element);if(item.items.length>0){hasAnyNesting=true;this._addToggleButton(div,item);const itemsDiv=document.createElement("div");itemsDiv.className="treeItems";div.append(itemsDiv);queue.push({parent:itemsDiv,items:item.items});}levelData.parent.append(div);outlineCount++;}}this._finishRendering(fragment,outlineCount,hasAnyNesting);}async _currentOutlineItem(){if(!this._isPagesLoaded){throw new Error("_currentOutlineItem: All pages have not been loaded.");}if(!this._outline||!this._pdfDocument){return;}const pageNumberToDestHash=await this._getPageNumberToDestHash(this._pdfDocument);if(!pageNumberToDestHash){return;}this._updateCurrentTreeItem(null);if(this._sidebarView!==_ui_utils.SidebarView.OUTLINE){return;}for(let i=this._currentPageNumber;i>0;i--){const destHash=pageNumberToDestHash.get(i);if(!destHash){continue;}const linkElement=this.container.querySelector(`a[href="${destHash}"]`);if(!linkElement){continue;}this._scrollToCurrentTreeItem(linkElement.parentNode);break;}}async _getPageNumberToDestHash(pdfDocument){if(this._pageNumberToDestHashCapability){return this._pageNumberToDestHashCapability.promise;}this._pageNumberToDestHashCapability=(0,_pdfjsLib.createPromiseCapability)();const pageNumberToDestHash=new Map(),pageNumberNesting=new Map();const queue=[{nesting:0,items:this._outline}];while(queue.length>0){const levelData=queue.shift(),currentNesting=levelData.nesting;for(const{dest,items}of levelData.items){let explicitDest,pageNumber;if(typeof dest==="string"){explicitDest=await pdfDocument.getDestination(dest);if(pdfDocument!==this._pdfDocument){return null;}}else{explicitDest=dest;}if(Array.isArray(explicitDest)){const[destRef]=explicitDest;if(typeof destRef==="object"&&destRef!==null){pageNumber=this.linkService._cachedPageNumber(destRef);if(!pageNumber){try{pageNumber=(await pdfDocument.getPageIndex(destRef))+1;if(pdfDocument!==this._pdfDocument){return null;}this.linkService.cachePageRef(pageNumber,destRef);}catch(ex){}}}else if(Number.isInteger(destRef)){pageNumber=destRef+1;}if(Number.isInteger(pageNumber)&&(!pageNumberToDestHash.has(pageNumber)||currentNesting>pageNumberNesting.get(pageNumber))){const destHash=this.linkService.getDestinationHash(dest);pageNumberToDestHash.set(pageNumber,destHash);pageNumberNesting.set(pageNumber,currentNesting);}}if(items.length>0){queue.push({nesting:currentNesting+1,items});}}}this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size>0?pageNumberToDestHash:null);return this._pageNumberToDestHashCapability.promise;}}exports.PDFOutlineViewer=PDFOutlineViewer;

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFPresentationMode=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const DELAY_BEFORE_HIDING_CONTROLS=3000;const ACTIVE_SELECTOR="pdfPresentationMode";const CONTROLS_SELECTOR="pdfPresentationModeControls";const MOUSE_SCROLL_COOLDOWN_TIME=50;const PAGE_SWITCH_THRESHOLD=0.1;const SWIPE_MIN_DISTANCE_THRESHOLD=50;const SWIPE_ANGLE_THRESHOLD=Math.PI/6;var _state=/*#__PURE__*/new WeakMap();var _args=/*#__PURE__*/new WeakMap();var _mouseWheel=/*#__PURE__*/new WeakSet();var _notifyStateChange=/*#__PURE__*/new WeakSet();var _enter=/*#__PURE__*/new WeakSet();var _exit=/*#__PURE__*/new WeakSet();var _mouseDown=/*#__PURE__*/new WeakSet();var _contextMenu=/*#__PURE__*/new WeakSet();var _showControls=/*#__PURE__*/new WeakSet();var _hideControls=/*#__PURE__*/new WeakSet();var _resetMouseScrollState=/*#__PURE__*/new WeakSet();var _touchSwipe=/*#__PURE__*/new WeakSet();var _addWindowListeners=/*#__PURE__*/new WeakSet();var _removeWindowListeners=/*#__PURE__*/new WeakSet();var _fullscreenChange=/*#__PURE__*/new WeakSet();var _addFullscreenChangeListeners=/*#__PURE__*/new WeakSet();var _removeFullscreenChangeListeners=/*#__PURE__*/new WeakSet();class PDFPresentationMode{constructor(_ref){let{container,pdfViewer,eventBus}=_ref;_classPrivateMethodInitSpec(this,_removeFullscreenChangeListeners);_classPrivateMethodInitSpec(this,_addFullscreenChangeListeners);_classPrivateMethodInitSpec(this,_fullscreenChange);_classPrivateMethodInitSpec(this,_removeWindowListeners);_classPrivateMethodInitSpec(this,_addWindowListeners);_classPrivateMethodInitSpec(this,_touchSwipe);_classPrivateMethodInitSpec(this,_resetMouseScrollState);_classPrivateMethodInitSpec(this,_hideControls);_classPrivateMethodInitSpec(this,_showControls);_classPrivateMethodInitSpec(this,_contextMenu);_classPrivateMethodInitSpec(this,_mouseDown);_classPrivateMethodInitSpec(this,_exit);_classPrivateMethodInitSpec(this,_enter);_classPrivateMethodInitSpec(this,_notifyStateChange);_classPrivateMethodInitSpec(this,_mouseWheel);_classPrivateFieldInitSpec(this,_state,{writable:true,value:_ui_utils.PresentationModeState.UNKNOWN});_classPrivateFieldInitSpec(this,_args,{writable:true,value:null});this.container=container;this.pdfViewer=pdfViewer;this.eventBus=eventBus;this.contextMenuOpen=false;this.mouseScrollTimeStamp=0;this.mouseScrollDelta=0;this.touchSwipeState=null;}async request(){const{container,pdfViewer}=this;if(this.active||!pdfViewer.pagesCount||!container.requestFullscreen){return false;}_classPrivateMethodGet(this,_addFullscreenChangeListeners,_addFullscreenChangeListeners2).call(this);_classPrivateMethodGet(this,_notifyStateChange,_notifyStateChange2).call(this,_ui_utils.PresentationModeState.CHANGING);const promise=container.requestFullscreen();_classPrivateFieldSet(this,_args,{pageNumber:pdfViewer.currentPageNumber,scaleValue:pdfViewer.currentScaleValue,scrollMode:pdfViewer.scrollMode,spreadMode:null,annotationEditorMode:null});if(pdfViewer.spreadMode!==_ui_utils.SpreadMode.NONE&&!(pdfViewer.pageViewsReady&&pdfViewer.hasEqualPageSizes)){console.warn("Ignoring Spread modes when entering PresentationMode, "+"since the document may contain varying page sizes.");_classPrivateFieldGet(this,_args).spreadMode=pdfViewer.spreadMode;}if(pdfViewer.annotationEditorMode!==_pdfjsLib.AnnotationEditorType.DISABLE){_classPrivateFieldGet(this,_args).annotationEditorMode=pdfViewer.annotationEditorMode;}try{await promise;pdfViewer.focus();return true;}catch(reason){_classPrivateMethodGet(this,_removeFullscreenChangeListeners,_removeFullscreenChangeListeners2).call(this);_classPrivateMethodGet(this,_notifyStateChange,_notifyStateChange2).call(this,_ui_utils.PresentationModeState.NORMAL);}return false;}get active(){return _classPrivateFieldGet(this,_state)===_ui_utils.PresentationModeState.CHANGING||_classPrivateFieldGet(this,_state)===_ui_utils.PresentationModeState.FULLSCREEN;}_prepareFullscreenMode(){const domElement=document.getElementsByClassName("zoom")[0].parentElement;const parent=domElement.parentElement;this.ngxContainer=parent;for(let i=0;i<parent.childElementCount;i++){if(parent.children.item(i)===domElement){this.ngxContainerIndex=i;}}parent.removeChild(domElement);document.body.append(domElement);const siblings=document.body.children;for(let i=0;i<siblings.length;i++){const s=siblings.item(i);if(s!==domElement&&s instanceof HTMLElement){s.classList.add("hidden-by-fullscreen");}}document.getElementById("sidebarContainer").classList.add("hidden-by-fullscreen");document.getElementsByClassName("toolbar")[0].classList.add("hidden-by-fullscreen");}_tidyUpFullscreenMode(){if(this.ngxContainer){const domElement=document.getElementsByClassName("zoom")[0].parentElement;document.body.removeChild(domElement);if(this.ngxContainerIndex>=this.ngxContainer.childElementCount){this.ngxContainer.append(domElement);}else{this.ngxContainer.insertBefore(domElement,this.ngxContainer.children.item(this.ngxContainerIndex));}this.ngxContainer=undefined;const siblings=document.body.children;for(let i=0;i<siblings.length;i++){const s=siblings.item(i);if(s!==domElement&&s instanceof HTMLElement){if(s.classList.contains("hidden-by-fullscreen")){s.classList.remove("hidden-by-fullscreen");}}}document.getElementById("sidebarContainer").classList.remove("hidden-by-fullscreen");document.getElementsByClassName("toolbar")[0].classList.remove("hidden-by-fullscreen");}}}exports.PDFPresentationMode=PDFPresentationMode;function _mouseWheel2(evt){if(!this.active){return;}evt.preventDefault();const delta=(0,_ui_utils.normalizeWheelEventDelta)(evt);const currentTime=Date.now();const storedTime=this.mouseScrollTimeStamp;if(currentTime>storedTime&&currentTime-storedTime<MOUSE_SCROLL_COOLDOWN_TIME){return;}if(this.mouseScrollDelta>0&&delta<0||this.mouseScrollDelta<0&&delta>0){_classPrivateMethodGet(this,_resetMouseScrollState,_resetMouseScrollState2).call(this);}this.mouseScrollDelta+=delta;if(Math.abs(this.mouseScrollDelta)>=PAGE_SWITCH_THRESHOLD){const totalDelta=this.mouseScrollDelta;_classPrivateMethodGet(this,_resetMouseScrollState,_resetMouseScrollState2).call(this);const success=totalDelta>0?this.pdfViewer.previousPage():this.pdfViewer.nextPage();if(success){this.mouseScrollTimeStamp=currentTime;}}}function _notifyStateChange2(state){_classPrivateFieldSet(this,_state,state);this.eventBus.dispatch("presentationmodechanged",{source:this,state});}function _enter2(){_classPrivateMethodGet(this,_notifyStateChange,_notifyStateChange2).call(this,_ui_utils.PresentationModeState.FULLSCREEN);this.container.classList.add(ACTIVE_SELECTOR);setTimeout(()=>{this.pdfViewer.scrollMode=_ui_utils.ScrollMode.PAGE;if(_classPrivateFieldGet(this,_args).spreadMode!==null){this.pdfViewer.spreadMode=_ui_utils.SpreadMode.NONE;}this.pdfViewer.currentPageNumber=_classPrivateFieldGet(this,_args).pageNumber;this.pdfViewer.currentScaleValue="page-fit";if(_classPrivateFieldGet(this,_args).annotationEditorMode!==null){this.pdfViewer.annotationEditorMode=_pdfjsLib.AnnotationEditorType.NONE;}},0);_classPrivateMethodGet(this,_addWindowListeners,_addWindowListeners2).call(this);_classPrivateMethodGet(this,_showControls,_showControls2).call(this);this.contextMenuOpen=false;window.getSelection().removeAllRanges();}function _exit2(){const pageNumber=this.pdfViewer.currentPageNumber;this.container.classList.remove(ACTIVE_SELECTOR);setTimeout(()=>{_classPrivateMethodGet(this,_removeFullscreenChangeListeners,_removeFullscreenChangeListeners2).call(this);_classPrivateMethodGet(this,_notifyStateChange,_notifyStateChange2).call(this,_ui_utils.PresentationModeState.NORMAL);this.pdfViewer.scrollMode=_classPrivateFieldGet(this,_args).scrollMode;if(_classPrivateFieldGet(this,_args).spreadMode!==null){this.pdfViewer.spreadMode=_classPrivateFieldGet(this,_args).spreadMode;}this.pdfViewer.currentScaleValue=_classPrivateFieldGet(this,_args).scaleValue;this.pdfViewer.currentPageNumber=pageNumber;if(_classPrivateFieldGet(this,_args).annotationEditorMode!==null){this.pdfViewer.annotationEditorMode=_classPrivateFieldGet(this,_args).annotationEditorMode;}_classPrivateFieldSet(this,_args,null);},0);_classPrivateMethodGet(this,_removeWindowListeners,_removeWindowListeners2).call(this);_classPrivateMethodGet(this,_hideControls,_hideControls2).call(this);_classPrivateMethodGet(this,_resetMouseScrollState,_resetMouseScrollState2).call(this);this.contextMenuOpen=false;}function _mouseDown2(evt){var _evt$target$parentNod;if(this.contextMenuOpen){this.contextMenuOpen=false;evt.preventDefault();return;}if(evt.button!==0){return;}if(evt.target.href&&(_evt$target$parentNod=evt.target.parentNode)!==null&&_evt$target$parentNod!==void 0&&_evt$target$parentNod.hasAttribute("data-internal-link")){return;}evt.preventDefault();if(evt.shiftKey){this.pdfViewer.previousPage();}else{this.pdfViewer.nextPage();}}function _contextMenu2(){this.contextMenuOpen=true;}function _showControls2(){if(this.controlsTimeout){clearTimeout(this.controlsTimeout);}else{this.container.classList.add(CONTROLS_SELECTOR);}this.controlsTimeout=setTimeout(()=>{this.container.classList.remove(CONTROLS_SELECTOR);delete this.controlsTimeout;},DELAY_BEFORE_HIDING_CONTROLS);}function _hideControls2(){if(!this.controlsTimeout){return;}clearTimeout(this.controlsTimeout);this.container.classList.remove(CONTROLS_SELECTOR);delete this.controlsTimeout;}function _resetMouseScrollState2(){this.mouseScrollTimeStamp=0;this.mouseScrollDelta=0;}function _touchSwipe2(evt){if(!this.active){return;}if(evt.touches.length>1){this.touchSwipeState=null;return;}switch(evt.type){case"touchstart":this.touchSwipeState={startX:evt.touches[0].pageX,startY:evt.touches[0].pageY,endX:evt.touches[0].pageX,endY:evt.touches[0].pageY};break;case"touchmove":if(this.touchSwipeState===null){return;}this.touchSwipeState.endX=evt.touches[0].pageX;this.touchSwipeState.endY=evt.touches[0].pageY;evt.preventDefault();break;case"touchend":if(this.touchSwipeState===null){return;}let delta=0;const dx=this.touchSwipeState.endX-this.touchSwipeState.startX;const dy=this.touchSwipeState.endY-this.touchSwipeState.startY;const absAngle=Math.abs(Math.atan2(dy,dx));if(Math.abs(dx)>SWIPE_MIN_DISTANCE_THRESHOLD&&(absAngle<=SWIPE_ANGLE_THRESHOLD||absAngle>=Math.PI-SWIPE_ANGLE_THRESHOLD)){delta=dx;}else if(Math.abs(dy)>SWIPE_MIN_DISTANCE_THRESHOLD&&Math.abs(absAngle-Math.PI/2)<=SWIPE_ANGLE_THRESHOLD){delta=dy;}if(delta>0){this.pdfViewer.previousPage();}else if(delta<0){this.pdfViewer.nextPage();}break;}}function _addWindowListeners2(){this.showControlsBind=_classPrivateMethodGet(this,_showControls,_showControls2).bind(this);this.mouseDownBind=_classPrivateMethodGet(this,_mouseDown,_mouseDown2).bind(this);this.mouseWheelBind=_classPrivateMethodGet(this,_mouseWheel,_mouseWheel2).bind(this);this.resetMouseScrollStateBind=_classPrivateMethodGet(this,_resetMouseScrollState,_resetMouseScrollState2).bind(this);this.contextMenuBind=_classPrivateMethodGet(this,_contextMenu,_contextMenu2).bind(this);this.touchSwipeBind=_classPrivateMethodGet(this,_touchSwipe,_touchSwipe2).bind(this);window.addEventListener("mousemove",this.showControlsBind);window.addEventListener("mousedown",this.mouseDownBind);window.addEventListener("wheel",this.mouseWheelBind,{passive:false});window.addEventListener("keydown",this.resetMouseScrollStateBind);window.addEventListener("contextmenu",this.contextMenuBind);window.addEventListener("touchstart",this.touchSwipeBind);window.addEventListener("touchmove",this.touchSwipeBind);window.addEventListener("touchend",this.touchSwipeBind);}function _removeWindowListeners2(){window.removeEventListener("mousemove",this.showControlsBind);window.removeEventListener("mousedown",this.mouseDownBind);window.removeEventListener("wheel",this.mouseWheelBind,{passive:false});window.removeEventListener("keydown",this.resetMouseScrollStateBind);window.removeEventListener("contextmenu",this.contextMenuBind);window.removeEventListener("touchstart",this.touchSwipeBind);window.removeEventListener("touchmove",this.touchSwipeBind);window.removeEventListener("touchend",this.touchSwipeBind);delete this.showControlsBind;delete this.mouseDownBind;delete this.mouseWheelBind;delete this.resetMouseScrollStateBind;delete this.contextMenuBind;delete this.touchSwipeBind;}function _fullscreenChange2(){if(document.fullscreenElement){_classPrivateMethodGet(this,_enter,_enter2).call(this);}else{_classPrivateMethodGet(this,_exit,_exit2).call(this);}}function _addFullscreenChangeListeners2(){this.fullscreenChangeBind=_classPrivateMethodGet(this,_fullscreenChange,_fullscreenChange2).bind(this);window.addEventListener("fullscreenchange",this.fullscreenChangeBind);}function _removeFullscreenChangeListeners2(){window.removeEventListener("fullscreenchange",this.fullscreenChangeBind);delete this.fullscreenChangeBind;}

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFRenderingQueue=void 0;var _pdfjsLib=__webpack_require__(4);var _ui_utils=__webpack_require__(3);const CLEANUP_TIMEOUT=30000;class PDFRenderingQueue{constructor(){this.pdfViewer=null;this.pdfThumbnailViewer=null;this.onIdle=null;this.highestPriorityPage=null;this.idleTimeout=null;this.printing=false;this.isThumbnailViewEnabled=false;}setViewer(pdfViewer){this.pdfViewer=pdfViewer;}setThumbnailViewer(pdfThumbnailViewer){this.pdfThumbnailViewer=pdfThumbnailViewer;}isHighestPriority(view){return this.highestPriorityPage===view.renderingId;}hasViewer(){return!!this.pdfViewer;}renderHighestPriority(currentlyVisiblePages){var _this$pdfThumbnailVie;if(this.idleTimeout){clearTimeout(this.idleTimeout);this.idleTimeout=null;}if(this.pdfViewer.forceRendering(currentlyVisiblePages)){return;}if(this.isThumbnailViewEnabled&&(_this$pdfThumbnailVie=this.pdfThumbnailViewer)!==null&&_this$pdfThumbnailVie!==void 0&&_this$pdfThumbnailVie.forceRendering()){return;}if(this.printing){return;}if(this.onIdle){this.idleTimeout=setTimeout(this.onIdle.bind(this),CLEANUP_TIMEOUT);}}getHighestPriority(visible,views,scrolledDown){let preRenderExtra=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;const visibleViews=visible.views,numVisible=visibleViews.length;if(numVisible===0){return null;}for(let i=0;i<numVisible;i++){const view=visibleViews[i].view;if(!this.isViewFinished(view)){return view;}}const firstId=visible.first.id,lastId=visible.last.id;if(lastId-firstId+1>numVisible){const visibleIds=visible.ids;for(let i=1,ii=lastId-firstId;i<ii;i++){const holeId=scrolledDown?firstId+i:lastId-i;if(visibleIds.has(holeId)){continue;}const holeView=views[holeId-1];if(!this.isViewFinished(holeView)){return holeView;}}}let preRenderIndex=scrolledDown?lastId:firstId-2;let preRenderView=views[preRenderIndex];if(preRenderView&&!this.isViewFinished(preRenderView)){return preRenderView;}if(preRenderExtra){preRenderIndex+=scrolledDown?1:-1;preRenderView=views[preRenderIndex];if(preRenderView&&!this.isViewFinished(preRenderView)){return preRenderView;}}return null;}isViewFinished(view){return view.renderingState===_ui_utils.RenderingStates.FINISHED;}renderView(view){switch(view.renderingState){case _ui_utils.RenderingStates.FINISHED:return false;case _ui_utils.RenderingStates.PAUSED:this.highestPriorityPage=view.renderingId;view.resume();break;case _ui_utils.RenderingStates.RUNNING:this.highestPriorityPage=view.renderingId;break;case _ui_utils.RenderingStates.INITIAL:this.highestPriorityPage=view.renderingId;view.draw().finally(()=>{this.renderHighestPriority();}).catch(reason=>{if(reason instanceof _pdfjsLib.RenderingCancelledException){return;}globalThis.ngxConsole.error(`renderView: "${reason}"`);});break;}return true;}}exports.PDFRenderingQueue=PDFRenderingQueue;

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFScriptingManager=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);class PDFScriptingManager{constructor(_ref){let{eventBus,sandboxBundleSrc=null,scriptingFactory=null,docPropertiesLookup=null}=_ref;this._pdfDocument=null;this._pdfViewer=null;this._closeCapability=null;this._destroyCapability=null;this._scripting=null;this._ready=false;this._eventBus=eventBus;this._sandboxBundleSrc=sandboxBundleSrc;this._scriptingFactory=scriptingFactory;this._docPropertiesLookup=docPropertiesLookup;}setViewer(pdfViewer){this._pdfViewer=pdfViewer;}async setDocument(pdfDocument){var _this$_scripting3;if(this._pdfDocument){await this._destroyScripting();}this._pdfDocument=pdfDocument;if(!pdfDocument){return;}const[objects,calculationOrder,docActions]=await Promise.all([pdfDocument.getFieldObjects(),pdfDocument.getCalculationOrderIds(),pdfDocument.getJSActions()]);if(!objects&&!docActions){await this._destroyScripting();return;}if(pdfDocument!==this._pdfDocument){return;}try{this._scripting=this._createScripting();}catch(error){globalThis.ngxConsole.error(`PDFScriptingManager.setDocument: "${error===null||error===void 0?void 0:error.message}".`);await this._destroyScripting();return;}this._internalEvents.set("updatefromsandbox",event=>{if((event===null||event===void 0?void 0:event.source)!==window){return;}this._updateFromSandbox(event.detail);});this._internalEvents.set("dispatcheventinsandbox",event=>{var _this$_scripting;(_this$_scripting=this._scripting)===null||_this$_scripting===void 0?void 0:_this$_scripting.dispatchEventInSandbox(event.detail);});this._internalEvents.set("pagechanging",_ref2=>{let{pageNumber,previous}=_ref2;if(pageNumber===previous){return;}this._dispatchPageClose(previous);this._dispatchPageOpen(pageNumber);});this._internalEvents.set("pagerendered",_ref3=>{let{pageNumber}=_ref3;if(!this._pageOpenPending.has(pageNumber)){return;}if(pageNumber!==this._pdfViewer.currentPageNumber){return;}this._dispatchPageOpen(pageNumber);});this._internalEvents.set("pagesdestroy",async event=>{var _this$_scripting2,_this$_closeCapabilit;await this._dispatchPageClose(this._pdfViewer.currentPageNumber);await((_this$_scripting2=this._scripting)===null||_this$_scripting2===void 0?void 0:_this$_scripting2.dispatchEventInSandbox({id:"doc",name:"WillClose"}));(_this$_closeCapabilit=this._closeCapability)===null||_this$_closeCapabilit===void 0?void 0:_this$_closeCapabilit.resolve();});for(const[name,listener]of this._internalEvents){this._eventBus._on(name,listener);}try{const docProperties=await this._getDocProperties();if(pdfDocument!==this._pdfDocument){return;}await this._scripting.createSandbox({objects,calculationOrder,appInfo:{platform:navigator.platform,language:navigator.language},docInfo:{...docProperties,actions:docActions}});this._eventBus.dispatch("sandboxcreated",{source:this});}catch(error){globalThis.ngxConsole.error(`PDFScriptingManager.setDocument: "${error===null||error===void 0?void 0:error.message}".`);await this._destroyScripting();return;}await((_this$_scripting3=this._scripting)===null||_this$_scripting3===void 0?void 0:_this$_scripting3.dispatchEventInSandbox({id:"doc",name:"Open"}));await this._dispatchPageOpen(this._pdfViewer.currentPageNumber,true);Promise.resolve().then(()=>{if(pdfDocument===this._pdfDocument){this._ready=true;}});}async dispatchWillSave(detail){var _this$_scripting4;return(_this$_scripting4=this._scripting)===null||_this$_scripting4===void 0?void 0:_this$_scripting4.dispatchEventInSandbox({id:"doc",name:"WillSave"});}async dispatchDidSave(detail){var _this$_scripting5;return(_this$_scripting5=this._scripting)===null||_this$_scripting5===void 0?void 0:_this$_scripting5.dispatchEventInSandbox({id:"doc",name:"DidSave"});}async dispatchWillPrint(detail){var _this$_scripting6;return(_this$_scripting6=this._scripting)===null||_this$_scripting6===void 0?void 0:_this$_scripting6.dispatchEventInSandbox({id:"doc",name:"WillPrint"});}async dispatchDidPrint(detail){var _this$_scripting7;return(_this$_scripting7=this._scripting)===null||_this$_scripting7===void 0?void 0:_this$_scripting7.dispatchEventInSandbox({id:"doc",name:"DidPrint"});}get destroyPromise(){var _this$_destroyCapabil;return((_this$_destroyCapabil=this._destroyCapability)===null||_this$_destroyCapabil===void 0?void 0:_this$_destroyCapabil.promise)||null;}get ready(){return this._ready;}get _internalEvents(){return(0,_pdfjsLib.shadow)(this,"_internalEvents",new Map());}get _pageOpenPending(){return(0,_pdfjsLib.shadow)(this,"_pageOpenPending",new Set());}get _visitedPages(){return(0,_pdfjsLib.shadow)(this,"_visitedPages",new Map());}async _updateFromSandbox(detail){const isInPresentationMode=this._pdfViewer.isInPresentationMode||this._pdfViewer.isChangingPresentationMode;const{id,siblings,command,value}=detail;if(!id){switch(command){case"clear":globalThis.ngxConsole.clear();break;case"error":globalThis.ngxConsole.error(value);break;case"layout":{if(isInPresentationMode){return;}const modes=(0,_ui_utils.apiPageLayoutToViewerModes)(value);this._pdfViewer.spreadMode=modes.spreadMode;break;}case"page-num":this._pdfViewer.currentPageNumber=value+1;break;case"print":await this._pdfViewer.pagesPromise;this._eventBus.dispatch("print",{source:this});break;case"println":globalThis.ngxConsole.log(value);break;case"zoom":if(isInPresentationMode){return;}this._pdfViewer.currentScaleValue=value;break;case"SaveAs":this._eventBus.dispatch("download",{source:this});break;case"FirstPage":this._pdfViewer.currentPageNumber=1;break;case"LastPage":this._pdfViewer.currentPageNumber=this._pdfViewer.pagesCount;break;case"NextPage":this._pdfViewer.nextPage();break;case"PrevPage":this._pdfViewer.previousPage();break;case"ZoomViewIn":if(isInPresentationMode){return;}this._pdfViewer.increaseScale();break;case"ZoomViewOut":if(isInPresentationMode){return;}this._pdfViewer.decreaseScale();break;}return;}if(isInPresentationMode){if(detail.focus){return;}}delete detail.id;delete detail.siblings;const ids=siblings?[id,...siblings]:[id];for(const elementId of ids){const element=document.querySelector(`[data-element-id="${elementId}"]`);if(element){element.dispatchEvent(new CustomEvent("updatefromsandbox",{detail}));}else{var _this$_pdfDocument;(_this$_pdfDocument=this._pdfDocument)===null||_this$_pdfDocument===void 0?void 0:_this$_pdfDocument.annotationStorage.setValue(elementId,detail);}}}async _dispatchPageOpen(pageNumber){let initialize=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const pdfDocument=this._pdfDocument,visitedPages=this._visitedPages;if(initialize){this._closeCapability=(0,_pdfjsLib.createPromiseCapability)();}if(!this._closeCapability){return;}const pageView=this._pdfViewer.getPageView(pageNumber-1);if((pageView===null||pageView===void 0?void 0:pageView.renderingState)!==_ui_utils.RenderingStates.FINISHED){this._pageOpenPending.add(pageNumber);return;}this._pageOpenPending.delete(pageNumber);const actionsPromise=(async()=>{var _pageView$pdfPage,_this$_scripting8;const actions=await(!visitedPages.has(pageNumber)?(_pageView$pdfPage=pageView.pdfPage)===null||_pageView$pdfPage===void 0?void 0:_pageView$pdfPage.getJSActions():null);if(pdfDocument!==this._pdfDocument){return;}await((_this$_scripting8=this._scripting)===null||_this$_scripting8===void 0?void 0:_this$_scripting8.dispatchEventInSandbox({id:"page",name:"PageOpen",pageNumber,actions}));})();visitedPages.set(pageNumber,actionsPromise);}async _dispatchPageClose(pageNumber){var _this$_scripting9;const pdfDocument=this._pdfDocument,visitedPages=this._visitedPages;if(!this._closeCapability){return;}if(this._pageOpenPending.has(pageNumber)){return;}const actionsPromise=visitedPages.get(pageNumber);if(!actionsPromise){return;}visitedPages.set(pageNumber,null);await actionsPromise;if(pdfDocument!==this._pdfDocument){return;}await((_this$_scripting9=this._scripting)===null||_this$_scripting9===void 0?void 0:_this$_scripting9.dispatchEventInSandbox({id:"page",name:"PageClose",pageNumber}));}async _getDocProperties(){if(this._docPropertiesLookup){return this._docPropertiesLookup(this._pdfDocument);}throw new Error("_getDocProperties: Unable to lookup properties.");}_createScripting(){this._destroyCapability=(0,_pdfjsLib.createPromiseCapability)();if(this._scripting){throw new Error("_createScripting: Scripting already exists.");}if(this._scriptingFactory){return this._scriptingFactory.createScripting({sandboxBundleSrc:this._sandboxBundleSrc});}throw new Error("_createScripting: Cannot create scripting.");}async _destroyScripting(){var _this$_destroyCapabil3;if(!this._scripting){var _this$_destroyCapabil2;this._pdfDocument=null;(_this$_destroyCapabil2=this._destroyCapability)===null||_this$_destroyCapabil2===void 0?void 0:_this$_destroyCapabil2.resolve();return;}if(this._closeCapability){await Promise.race([this._closeCapability.promise,new Promise(resolve=>{setTimeout(resolve,1000);})]).catch(reason=>{});this._closeCapability=null;}this._pdfDocument=null;try{await this._scripting.destroySandbox();}catch(ex){}for(const[name,listener]of this._internalEvents){this._eventBus._off(name,listener);}this._internalEvents.clear();this._pageOpenPending.clear();this._visitedPages.clear();this._scripting=null;this._ready=false;(_this$_destroyCapabil3=this._destroyCapability)===null||_this$_destroyCapabil3===void 0?void 0:_this$_destroyCapabil3.resolve();}}exports.PDFScriptingManager=PDFScriptingManager;

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFSidebar=void 0;var _ui_utils=__webpack_require__(3);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const UI_NOTIFICATION_CLASS="pdfSidebarNotification";var _dispatchEvent=/*#__PURE__*/new WeakSet();var _forceRendering=/*#__PURE__*/new WeakSet();var _updateThumbnailViewer=/*#__PURE__*/new WeakSet();var _showUINotification=/*#__PURE__*/new WeakSet();var _hideUINotification=/*#__PURE__*/new WeakSet();var _addEventListeners=/*#__PURE__*/new WeakSet();class PDFSidebar{constructor(_ref){let{elements,pdfViewer:_pdfViewer,pdfThumbnailViewer:_pdfThumbnailViewer,eventBus,l10n}=_ref;_classPrivateMethodInitSpec(this,_addEventListeners);_classPrivateMethodInitSpec(this,_hideUINotification);_classPrivateMethodInitSpec(this,_showUINotification);_classPrivateMethodInitSpec(this,_updateThumbnailViewer);_classPrivateMethodInitSpec(this,_forceRendering);_classPrivateMethodInitSpec(this,_dispatchEvent);this.isOpen=false;this.active=_ui_utils.SidebarView.THUMBS;this.isInitialViewSet=false;this.isInitialEventDispatched=false;this.onToggled=null;this.pdfViewer=_pdfViewer;this.pdfThumbnailViewer=_pdfThumbnailViewer;this.outerContainer=elements.outerContainer;this.sidebarContainer=elements.sidebarContainer;this.toggleButton=elements.toggleButton;this.thumbnailButton=elements.thumbnailButton;this.outlineButton=elements.outlineButton;this.attachmentsButton=elements.attachmentsButton;this.layersButton=elements.layersButton;this.thumbnailView=elements.thumbnailView;this.outlineView=elements.outlineView;this.attachmentsView=elements.attachmentsView;this.layersView=elements.layersView;this._outlineOptionsContainer=elements.outlineOptionsContainer;this._currentOutlineItemButton=elements.currentOutlineItemButton;this.eventBus=eventBus;this.l10n=l10n;_classPrivateMethodGet(this,_addEventListeners,_addEventListeners2).call(this);}reset(){this.isInitialViewSet=false;this.isInitialEventDispatched=false;_classPrivateMethodGet(this,_hideUINotification,_hideUINotification2).call(this,true);this.switchView(_ui_utils.SidebarView.THUMBS);this.outlineButton.disabled=false;this.attachmentsButton.disabled=false;this.layersButton.disabled=false;this.outlineButton.hidden=false;this.attachmentsButton.hidden=false;this.layersButton.hidden=false;this._currentOutlineItemButton.disabled=true;}get visibleView(){return this.isOpen?this.active:_ui_utils.SidebarView.NONE;}setInitialView(){let view=arguments.length>0&&arguments[0]!==undefined?arguments[0]:_ui_utils.SidebarView.NONE;if(this.isInitialViewSet){return;}this.isInitialViewSet=true;if(view===_ui_utils.SidebarView.NONE||view===_ui_utils.SidebarView.UNKNOWN){_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);return;}this.switchView(view,true);if(!this.isInitialEventDispatched){_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);}}switchView(view){let forceOpen=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const isViewChanged=view!==this.active;let shouldForceRendering=false;switch(view){case _ui_utils.SidebarView.NONE:if(this.isOpen){this.close();}return;case _ui_utils.SidebarView.THUMBS:if(this.isOpen&&isViewChanged){shouldForceRendering=true;}break;case _ui_utils.SidebarView.OUTLINE:if(this.outlineButton.disabled){return;}break;case _ui_utils.SidebarView.ATTACHMENTS:if(this.attachmentsButton.disabled){return;}break;case _ui_utils.SidebarView.LAYERS:if(this.layersButton.disabled){return;}break;default:globalThis.ngxConsole.error(`PDFSidebar.switchView: "${view}" is not a valid view.`);return;}this.active=view;const isThumbs=view===_ui_utils.SidebarView.THUMBS,isOutline=view===_ui_utils.SidebarView.OUTLINE,isAttachments=view===_ui_utils.SidebarView.ATTACHMENTS,isLayers=view===_ui_utils.SidebarView.LAYERS;this.thumbnailButton.classList.toggle("toggled",isThumbs);this.outlineButton.classList.toggle("toggled",isOutline);this.attachmentsButton.classList.toggle("toggled",isAttachments);this.layersButton.classList.toggle("toggled",isLayers);this.thumbnailButton.setAttribute("aria-checked",isThumbs);this.outlineButton.setAttribute("aria-checked",isOutline);this.attachmentsButton.setAttribute("aria-checked",isAttachments);this.layersButton.setAttribute("aria-checked",isLayers);this.thumbnailView.classList.toggle("hidden",!isThumbs);this.outlineView.classList.toggle("hidden",!isOutline);this.attachmentsView.classList.toggle("hidden",!isAttachments);this.layersView.classList.toggle("hidden",!isLayers);this._outlineOptionsContainer.classList.toggle("hidden",!isOutline);if(forceOpen&&!this.isOpen){this.open();return;}if(shouldForceRendering){_classPrivateMethodGet(this,_updateThumbnailViewer,_updateThumbnailViewer2).call(this);_classPrivateMethodGet(this,_forceRendering,_forceRendering2).call(this);}if(isViewChanged){_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);}}open(){if(this.isOpen){return;}this.isOpen=true;this.toggleButton.classList.add("toggled");this.toggleButton.setAttribute("aria-expanded","true");this.outerContainer.classList.add("sidebarMoving","sidebarOpen");if(this.active===_ui_utils.SidebarView.THUMBS){_classPrivateMethodGet(this,_updateThumbnailViewer,_updateThumbnailViewer2).call(this);}_classPrivateMethodGet(this,_forceRendering,_forceRendering2).call(this);_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);_classPrivateMethodGet(this,_hideUINotification,_hideUINotification2).call(this);}close(){if(!this.isOpen){return;}this.isOpen=false;this.toggleButton.classList.remove("toggled");this.toggleButton.setAttribute("aria-expanded","false");this.outerContainer.classList.add("sidebarMoving");this.outerContainer.classList.remove("sidebarOpen");_classPrivateMethodGet(this,_forceRendering,_forceRendering2).call(this);_classPrivateMethodGet(this,_dispatchEvent,_dispatchEvent2).call(this);}toggle(){if(this.isOpen){this.close();}else{this.open();}}}exports.PDFSidebar=PDFSidebar;function _dispatchEvent2(){if(this.isInitialViewSet&&!this.isInitialEventDispatched){this.isInitialEventDispatched=true;}this.eventBus.dispatch("sidebarviewchanged",{source:this,view:this.visibleView});}function _forceRendering2(){if(this.onToggled){this.onToggled();}else{this.pdfViewer.forceRendering();this.pdfThumbnailViewer.forceRendering();}}function _updateThumbnailViewer2(){const{pdfViewer,pdfThumbnailViewer}=this;const pagesCount=pdfViewer.pagesCount;for(let pageIndex=0;pageIndex<pagesCount;pageIndex++){const pageView=pdfViewer.getPageView(pageIndex);if((pageView===null||pageView===void 0?void 0:pageView.renderingState)===_ui_utils.RenderingStates.FINISHED){const thumbnailView=pdfThumbnailViewer.getThumbnail(pageIndex);thumbnailView.setImage(pageView);}}pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);}function _showUINotification2(){this.toggleButton.setAttribute("data-l10n-id","toggle_sidebar_notification2");this.l10n.translate(this.toggleButton);if(!this.isOpen){this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);}}function _hideUINotification2(){let reset=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(this.isOpen||reset){this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);}if(reset){this.toggleButton.setAttribute("data-l10n-id","toggle_sidebar");this.l10n.translate(this.toggleButton);}}function _addEventListeners2(){this.sidebarContainer.addEventListener("transitionend",evt=>{if(evt.target===this.sidebarContainer){this.outerContainer.classList.remove("sidebarMoving");}});this.toggleButton.addEventListener("click",()=>{this.toggle();});this.thumbnailButton.addEventListener("click",()=>{this.switchView(_ui_utils.SidebarView.THUMBS);});this.outlineButton.addEventListener("click",()=>{this.switchView(_ui_utils.SidebarView.OUTLINE);});this.outlineButton.addEventListener("dblclick",()=>{this.eventBus.dispatch("toggleoutlinetree",{source:this});});this.attachmentsButton.addEventListener("click",()=>{this.switchView(_ui_utils.SidebarView.ATTACHMENTS);});this.layersButton.addEventListener("click",()=>{this.switchView(_ui_utils.SidebarView.LAYERS);});this.layersButton.addEventListener("dblclick",()=>{this.eventBus.dispatch("resetlayers",{source:this});});this._currentOutlineItemButton.addEventListener("click",()=>{this.eventBus.dispatch("currentoutlineitem",{source:this});});const onTreeLoaded=(count,button,view)=>{button.disabled=!count;button.hidden=!count;if(count){_classPrivateMethodGet(this,_showUINotification,_showUINotification2).call(this);}else if(this.active===view){this.switchView(_ui_utils.SidebarView.THUMBS);}};this.eventBus._on("outlineloaded",evt=>{onTreeLoaded(evt.outlineCount,this.outlineButton,_ui_utils.SidebarView.OUTLINE);if(evt.enableCurrentOutlineItemButton){if(evt.currentOutlineItemPromise){evt.currentOutlineItemPromise.then(enabled=>{if(!this.isInitialViewSet){return;}this._currentOutlineItemButton.disabled=!enabled;});}}});this.eventBus._on("attachmentsloaded",evt=>{onTreeLoaded(evt.attachmentsCount,this.attachmentsButton,_ui_utils.SidebarView.ATTACHMENTS);});this.eventBus._on("layersloaded",evt=>{onTreeLoaded(evt.layersCount,this.layersButton,_ui_utils.SidebarView.LAYERS);});this.eventBus._on("presentationmodechanged",evt=>{if(evt.state===_ui_utils.PresentationModeState.NORMAL&&this.visibleView===_ui_utils.SidebarView.THUMBS){_classPrivateMethodGet(this,_updateThumbnailViewer,_updateThumbnailViewer2).call(this);}});}

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFSidebarResizer=void 0;var _ui_utils=__webpack_require__(3);const SIDEBAR_WIDTH_VAR="--sidebar-width";const SIDEBAR_MIN_WIDTH=200;const SIDEBAR_RESIZING_CLASS="sidebarResizing";class PDFSidebarResizer{constructor(options,eventBus,l10n){this.isRTL=false;this.sidebarOpen=false;this._width=null;this._outerContainerWidth=null;this._boundEvents=Object.create(null);this.outerContainer=options.outerContainer;this.resizer=options.resizer;this.eventBus=eventBus;l10n.getDirection().then(dir=>{this.isRTL=dir==="rtl";});this._addEventListeners();}get outerContainerWidth(){return this._outerContainerWidth||=this.outerContainer.clientWidth;}_updateWidth(){let width=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;const maxWidth=Math.floor(this.outerContainerWidth/2);if(width>maxWidth){width=maxWidth;}if(width<SIDEBAR_MIN_WIDTH){width=SIDEBAR_MIN_WIDTH;}if(width===this._width){return false;}this._width=width;_ui_utils.docStyle.setProperty(SIDEBAR_WIDTH_VAR,`${width}px`);return true;}_mouseMove(evt){let width=evt.clientX;if(this.isRTL){width=this.outerContainerWidth-width;}this._updateWidth(width);}_mouseUp(evt){this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);this.eventBus.dispatch("resize",{source:this});const _boundEvents=this._boundEvents;window.removeEventListener("mousemove",_boundEvents.mouseMove);window.removeEventListener("mouseup",_boundEvents.mouseUp);}_addEventListeners(){const _boundEvents=this._boundEvents;_boundEvents.mouseMove=this._mouseMove.bind(this);_boundEvents.mouseUp=this._mouseUp.bind(this);this.resizer.addEventListener("mousedown",evt=>{if(evt.button!==0){return;}this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);window.addEventListener("mousemove",_boundEvents.mouseMove);window.addEventListener("mouseup",_boundEvents.mouseUp);});this.eventBus._on("sidebarviewchanged",evt=>{this.sidebarOpen=!!(evt!==null&&evt!==void 0&&evt.view);});this.eventBus._on("resize",evt=>{if((evt===null||evt===void 0?void 0:evt.source)!==window){return;}this._outerContainerWidth=null;if(!this._width){return;}if(!this.sidebarOpen){this._updateWidth(this._width);return;}this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);const updated=this._updateWidth(this._width);Promise.resolve().then(()=>{this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);if(updated){this.eventBus.dispatch("resize",{source:this});}});});}}exports.PDFSidebarResizer=PDFSidebarResizer;

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFThumbnailViewer=void 0;var _ui_utils=__webpack_require__(3);var _pdf_thumbnail_view=__webpack_require__(31);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const THUMBNAIL_SCROLL_MARGIN=-19;const THUMBNAIL_SELECTED_CLASS="selected";var _ensurePdfPageLoaded=/*#__PURE__*/new WeakSet();var _getScrollAhead=/*#__PURE__*/new WeakSet();class PDFThumbnailViewer{constructor(_ref){let{container,linkService,renderingQueue,l10n,pageColors,eventBus}=_ref;_classPrivateMethodInitSpec(this,_getScrollAhead);_classPrivateMethodInitSpec(this,_ensurePdfPageLoaded);this.container=container;this.linkService=linkService;this.renderingQueue=renderingQueue;this.l10n=l10n;this.pageColors=pageColors||null;this.eventBus=eventBus;if(this.pageColors&&!(CSS.supports("color",this.pageColors.background)&&CSS.supports("color",this.pageColors.foreground))){if(this.pageColors.background||this.pageColors.foreground){globalThis.ngxConsole.warn("PDFThumbnailViewer: Ignoring `pageColors`-option, since the browser doesn't support the values used.");}this.pageColors=null;}this.scroll=(0,_ui_utils.watchScroll)(this.container,this._scrollUpdated.bind(this));this._resetView();}_scrollUpdated(){this.renderingQueue.renderHighestPriority();}getThumbnail(index){return this._thumbnails[index];}_getVisibleThumbs(){return(0,_ui_utils.getVisibleElements)({scrollEl:this.container,views:this._thumbnails});}scrollThumbnailIntoView(pageNumber){if(!this.pdfDocument){return;}const thumbnailView=this._thumbnails[pageNumber-1];if(!thumbnailView){globalThis.ngxConsole.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');return;}if(pageNumber!==this._currentPageNumber){const prevThumbnailView=this._thumbnails[this._currentPageNumber-1];prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);}const{first,last,views}=this._getVisibleThumbs();if(views.length>0){let shouldScroll=false;if(pageNumber<=first.id||pageNumber>=last.id){shouldScroll=true;}else{for(const{id,percent}of views){if(id!==pageNumber){continue;}shouldScroll=percent<100;break;}}if(shouldScroll){(0,_ui_utils.scrollIntoView)(thumbnailView.div,{top:THUMBNAIL_SCROLL_MARGIN});}}this._currentPageNumber=pageNumber;}get pagesRotation(){return this._pagesRotation;}set pagesRotation(rotation){if(!(0,_ui_utils.isValidRotation)(rotation)){throw new Error("Invalid thumbnails rotation angle.");}if(!this.pdfDocument){return;}if(this._pagesRotation===rotation){return;}this._pagesRotation=rotation;const updateArgs={rotation};for(const thumbnail of this._thumbnails){thumbnail.update(updateArgs);}}cleanup(){for(const thumbnail of this._thumbnails){if(thumbnail.renderingState!==_ui_utils.RenderingStates.FINISHED){thumbnail.reset();}}_pdf_thumbnail_view.TempImageFactory.destroyCanvas();}_resetView(){this._thumbnails=[];this._currentPageNumber=1;this._pageLabels=null;this._pagesRotation=0;this.container.textContent="";}setDocument(pdfDocument){this.initialized=false;if(this.pdfDocument){this._cancelRendering();this._resetView();}this.pdfDocument=pdfDocument;if(!pdfDocument){return;}if(this.initialized){return;}this.initialized=true;const firstPagePromise=pdfDocument.getPage(1);const optionalContentConfigPromise=pdfDocument.getOptionalContentConfig();firstPagePromise.then(firstPdfPage=>{var _this$_thumbnails$;const pagesCount=pdfDocument.numPages;const viewport=firstPdfPage.getViewport({scale:1});for(let pageNum=1;pageNum<=pagesCount;++pageNum){const thumbnail=new _pdf_thumbnail_view.PDFThumbnailView({container:this.container,id:pageNum,defaultViewport:viewport.clone(),optionalContentConfigPromise,linkService:this.linkService,renderingQueue:this.renderingQueue,l10n:this.l10n,pageColors:this.pageColors,eventBus:this.eventBus});this._thumbnails.push(thumbnail);}(_this$_thumbnails$=this._thumbnails[0])===null||_this$_thumbnails$===void 0?void 0:_this$_thumbnails$.setPdfPage(firstPdfPage);const thumbnailView=this._thumbnails[this._currentPageNumber-1];thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);}).catch(reason=>{globalThis.ngxConsole.error("Unable to initialize thumbnail viewer",reason);});}_cancelRendering(){for(const thumbnail of this._thumbnails){thumbnail.cancelRendering();}}setPageLabels(labels){if(!this.pdfDocument){return;}if(!labels){this._pageLabels=null;}else if(!(Array.isArray(labels)&&this.pdfDocument.numPages===labels.length)){this._pageLabels=null;globalThis.ngxConsole.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");}else{this._pageLabels=labels;}for(let i=0,ii=this._thumbnails.length;i<ii;i++){var _this$_pageLabels;this._thumbnails[i].setPageLabel(((_this$_pageLabels=this._pageLabels)===null||_this$_pageLabels===void 0?void 0:_this$_pageLabels[i])??null);}}forceRendering(){const visibleThumbs=this._getVisibleThumbs();const scrollAhead=_classPrivateMethodGet(this,_getScrollAhead,_getScrollAhead2).call(this,visibleThumbs);const thumbView=this.renderingQueue.getHighestPriority(visibleThumbs,this._thumbnails,scrollAhead);if(thumbView){_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,thumbView).then(()=>{this.renderingQueue.renderView(thumbView);});return true;}return false;}stopRendering(){this._cancelRendering();}}exports.PDFThumbnailViewer=PDFThumbnailViewer;async function _ensurePdfPageLoaded2(thumbView){if(thumbView.pdfPage){return thumbView.pdfPage;}try{const pdfPage=await this.pdfDocument.getPage(thumbView.id);if(!thumbView.pdfPage){thumbView.setPdfPage(pdfPage);}return pdfPage;}catch(reason){globalThis.ngxConsole.error("Unable to get page for thumb view",reason);return null;}}function _getScrollAhead2(visible){var _visible$first,_visible$last;if(((_visible$first=visible.first)===null||_visible$first===void 0?void 0:_visible$first.id)===1){return true;}else if(((_visible$last=visible.last)===null||_visible$last===void 0?void 0:_visible$last.id)===this._thumbnails.length){return false;}return this.scroll.down;}

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.TempImageFactory=exports.PDFThumbnailView=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);const DRAW_UPSCALE_FACTOR=2;const MAX_NUM_SCALING_STEPS=3;const THUMBNAIL_CANVAS_BORDER_WIDTH=1;const THUMBNAIL_WIDTH=98;class TempImageFactory{static#tempCanvas=null;static getCanvas(width,height){const tempCanvas=this.#tempCanvas||=document.createElement("canvas");tempCanvas.width=width;tempCanvas.height=height;const options1=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true,alpha:false}:{alpha:false};const options2=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true}:undefined;const ctx=tempCanvas.getContext("2d",options1);ctx.save();ctx.fillStyle="rgb(255, 255, 255)";ctx.fillRect(0,0,width,height);ctx.restore();return[tempCanvas,tempCanvas.getContext("2d",options2)];}static destroyCanvas(){const tempCanvas=this.#tempCanvas;if(tempCanvas){tempCanvas.width=0;tempCanvas.height=0;}this.#tempCanvas=null;}}exports.TempImageFactory=TempImageFactory;class PDFThumbnailView{constructor(_ref){let{container,id,defaultViewport,optionalContentConfigPromise,linkService,renderingQueue,l10n,pageColors,eventBus}=_ref;this.id=id;this.renderingId="thumbnail"+id;this.pageLabel=null;this.pdfPage=null;this.rotation=0;this.viewport=defaultViewport;this.pdfPageRotate=defaultViewport.rotation;this._optionalContentConfigPromise=optionalContentConfigPromise||null;this.pageColors=pageColors||null;this.linkService=linkService;this.renderingQueue=renderingQueue;this.eventBus=eventBus;this.renderTask=null;this.renderingState=_ui_utils.RenderingStates.INITIAL;this.resume=null;const pageWidth=this.viewport.width,pageHeight=this.viewport.height,pageRatio=pageWidth/pageHeight;this.canvasWidth=THUMBNAIL_WIDTH;this.canvasHeight=this.canvasWidth/pageRatio|0;this.scale=this.canvasWidth/pageWidth;this.l10n=l10n;if(window.pdfThumbnailGenerator){window.pdfThumbnailGenerator(this,linkService,id,container,this._thumbPageTitle);}else{this.createThumbnail(this,linkService,id,container,this._thumbPageTitle);}}createThumbnail(pdfThumbnailView,linkService,id,container,thumbPageTitlePromise){const anchor=document.createElement("a");anchor.href=linkService.getAnchorUrl("#page="+id);thumbPageTitlePromise.then(msg=>{anchor.title=msg;});anchor.onclick=function(){linkService.goToPage(id);return false;};pdfThumbnailView.anchor=anchor;const div=document.createElement("div");div.className="thumbnail";div.setAttribute("data-page-number",this.id);pdfThumbnailView.div=div;const ring=document.createElement("div");ring.className="thumbnailSelectionRing";const borderAdjustment=2*THUMBNAIL_CANVAS_BORDER_WIDTH;ring.style.width=this.canvasWidth+borderAdjustment+"px";ring.style.height=this.canvasHeight+borderAdjustment+"px";pdfThumbnailView.ring=ring;div.append(ring);anchor.append(div);container.append(anchor);}setPdfPage(pdfPage){this.pdfPage=pdfPage;this.pdfPageRotate=pdfPage.rotate;const totalRotation=(this.rotation+this.pdfPageRotate)%360;this.viewport=pdfPage.getViewport({scale:1,rotation:totalRotation});this.reset();}reset(){this.cancelRendering();this.renderingState=_ui_utils.RenderingStates.INITIAL;const pageWidth=this.viewport.width,pageHeight=this.viewport.height,pageRatio=pageWidth/pageHeight;this.canvasHeight=this.canvasWidth/pageRatio|0;this.scale=this.canvasWidth/pageWidth;this.div.removeAttribute("data-loaded");const ring=this.ring;ring.textContent="";const borderAdjustment=2*THUMBNAIL_CANVAS_BORDER_WIDTH;ring.style.width=this.canvasWidth+borderAdjustment+"px";ring.style.height=this.canvasHeight+borderAdjustment+"px";if(this.canvas){this.canvas.width=0;this.canvas.height=0;delete this.canvas;}if(this.image){this.image.removeAttribute("src");delete this.image;}}update(_ref2){let{rotation=null}=_ref2;if(typeof rotation==="number"){this.rotation=rotation;}const totalRotation=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:1,rotation:totalRotation});this.reset();}cancelRendering(){if(this.renderTask){this.renderTask.cancel();this.renderTask=null;}this.resume=null;}_getPageDrawContext(){let upscaleFactor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;const canvas=document.createElement("canvas");const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true,alpha:false}:{alpha:false};const ctx=canvas.getContext("2d",options);const outputScale=new _ui_utils.OutputScale();canvas.width=upscaleFactor*this.canvasWidth*outputScale.sx|0;canvas.height=upscaleFactor*this.canvasHeight*outputScale.sy|0;const transform=outputScale.scaled?[outputScale.sx,0,0,outputScale.sy,0,0]:null;return{ctx,canvas,transform};}_convertCanvasToImage(canvas){if(this.renderingState!==_ui_utils.RenderingStates.FINISHED){throw new Error("_convertCanvasToImage: Rendering has not finished.");}const reducedCanvas=this._reduceImage(canvas);const image=document.createElement("img");image.className="thumbnailImage";this._thumbPageCanvas.then(msg=>{image.setAttribute("aria-label",msg);});image.style.width=this.canvasWidth+"px";image.style.height=this.canvasHeight+"px";image.src=reducedCanvas.toDataURL();this.image=image;this.div.setAttribute("data-loaded",true);this.ring.append(image);reducedCanvas.width=0;reducedCanvas.height=0;}draw(){var _this=this;if(this.renderingState!==_ui_utils.RenderingStates.INITIAL){globalThis.ngxConsole.error("Must be in new state before drawing");return Promise.resolve();}const{pdfPage}=this;if(!pdfPage){this.renderingState=_ui_utils.RenderingStates.FINISHED;return Promise.reject(new Error("pdfPage is not loaded"));}this.renderingState=_ui_utils.RenderingStates.RUNNING;const finishRenderTask=async function(){let error=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(renderTask===_this.renderTask){_this.renderTask=null;}if(error instanceof _pdfjsLib.RenderingCancelledException){return;}_this.renderingState=_ui_utils.RenderingStates.FINISHED;_this._convertCanvasToImage(canvas);if(error){throw error;}_this.eventBus.dispatch("thumbnailRendered",_this.id);};const{ctx,canvas,transform}=this._getPageDrawContext(DRAW_UPSCALE_FACTOR);const drawViewport=this.viewport.clone({scale:DRAW_UPSCALE_FACTOR*this.scale});const renderContinueCallback=cont=>{if(!this.renderingQueue.isHighestPriority(this)){this.renderingState=_ui_utils.RenderingStates.PAUSED;this.resume=()=>{this.renderingState=_ui_utils.RenderingStates.RUNNING;cont();};return;}cont();};const renderContext={canvasContext:ctx,transform,viewport:drawViewport,optionalContentConfigPromise:this._optionalContentConfigPromise,pageColors:this.pageColors};const renderTask=this.renderTask=pdfPage.render(renderContext);renderTask.onContinue=renderContinueCallback;const resultPromise=renderTask.promise.then(function(){return finishRenderTask(null);},function(error){return finishRenderTask(error);});resultPromise.finally(()=>{canvas.width=0;canvas.height=0;const pageCached=this.linkService.isPageCached(this.id);if(!pageCached){var _this$pdfPage;(_this$pdfPage=this.pdfPage)===null||_this$pdfPage===void 0?void 0:_this$pdfPage.cleanup();}});return resultPromise;}setImage(pageView){if(this.renderingState!==_ui_utils.RenderingStates.INITIAL){return;}const{thumbnailCanvas:canvas,pdfPage,scale}=pageView;if(!canvas){return;}if(!this.pdfPage){this.setPdfPage(pdfPage);}if(scale<this.scale){return;}this.renderingState=_ui_utils.RenderingStates.FINISHED;this._convertCanvasToImage(canvas);}_reduceImage(img){const{ctx,canvas}=this._getPageDrawContext();if(img.width<=2*canvas.width){ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);return canvas;}let reducedWidth=canvas.width<<MAX_NUM_SCALING_STEPS;let reducedHeight=canvas.height<<MAX_NUM_SCALING_STEPS;const[reducedImage,reducedImageCtx]=TempImageFactory.getCanvas(reducedWidth,reducedHeight);while(reducedWidth>img.width||reducedHeight>img.height){reducedWidth>>=1;reducedHeight>>=1;}reducedImageCtx.drawImage(img,0,0,img.width,img.height,0,0,reducedWidth,reducedHeight);while(reducedWidth>2*canvas.width){reducedImageCtx.drawImage(reducedImage,0,0,reducedWidth,reducedHeight,0,0,reducedWidth>>1,reducedHeight>>1);reducedWidth>>=1;reducedHeight>>=1;}ctx.drawImage(reducedImage,0,0,reducedWidth,reducedHeight,0,0,canvas.width,canvas.height);return canvas;}get _thumbPageTitle(){return this.l10n.get("thumb_page_title",{page:this.pageLabel??this.id});}get _thumbPageCanvas(){return this.l10n.get("thumb_page_canvas",{page:this.pageLabel??this.id});}setPageLabel(label){this.pageLabel=typeof label==="string"?label:null;this._thumbPageTitle.then(msg=>{this.anchor.title=msg;});if(this.renderingState!==_ui_utils.RenderingStates.FINISHED){return;}this._thumbPageCanvas.then(msg=>{var _this$image;(_this$image=this.image)===null||_this$image===void 0?void 0:_this$image.setAttribute("aria-label",msg);});}}exports.PDFThumbnailView=PDFThumbnailView;

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PagesCountLimit=exports.PDFViewer=exports.PDFPageViewBuffer=void 0;var _pdfjsLib=__webpack_require__(4);var _ui_utils=__webpack_require__(3);var _l10n_utils=__webpack_require__(33);var _pageFlipModule=__webpack_require__(34);var _pdf_page_view=__webpack_require__(35);var _pdf_rendering_queue=__webpack_require__(26);var _pdf_link_service=__webpack_require__(7);let _Symbol$iterator;function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}const DEFAULT_CACHE_SIZE=10;const ENABLE_PERMISSIONS_CLASS="enablePermissions";const PagesCountLimit={FORCE_SCROLL_MODE_PAGE:15000,FORCE_LAZY_PAGE_INIT:7500,PAUSE_EAGER_PAGE_INIT:250};exports.PagesCountLimit=PagesCountLimit;function isValidAnnotationEditorMode(mode){return Object.values(_pdfjsLib.AnnotationEditorType).includes(mode)&&mode!==_pdfjsLib.AnnotationEditorType.DISABLE;}var _buf=/*#__PURE__*/new WeakMap();var _size=/*#__PURE__*/new WeakMap();var _destroyFirstView=/*#__PURE__*/new WeakSet();_Symbol$iterator=Symbol.iterator;class PDFPageViewBuffer{constructor(size){_classPrivateMethodInitSpec(this,_destroyFirstView);_classPrivateFieldInitSpec(this,_buf,{writable:true,value:new Set()});_classPrivateFieldInitSpec(this,_size,{writable:true,value:0});_classPrivateFieldSet(this,_size,size);}push(view){const buf=_classPrivateFieldGet(this,_buf);if(buf.has(view)){buf.delete(view);}buf.add(view);if(buf.size>_classPrivateFieldGet(this,_size)){_classPrivateMethodGet(this,_destroyFirstView,_destroyFirstView2).call(this);}}resize(newSize){let idsToKeep=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;_classPrivateFieldSet(this,_size,newSize);const buf=_classPrivateFieldGet(this,_buf);if(idsToKeep){const ii=buf.size;let i=1;for(const view of buf){if(idsToKeep.has(view.id)){buf.delete(view);buf.add(view);}if(++i>ii){break;}}}while(buf.size>_classPrivateFieldGet(this,_size)){_classPrivateMethodGet(this,_destroyFirstView,_destroyFirstView2).call(this);}}has(view){return _classPrivateFieldGet(this,_buf).has(view);}[_Symbol$iterator](){return _classPrivateFieldGet(this,_buf).keys();}}exports.PDFPageViewBuffer=PDFPageViewBuffer;function _destroyFirstView2(){const firstView=_classPrivateFieldGet(this,_buf).keys().next().value;firstView===null||firstView===void 0?void 0:firstView.destroy();_classPrivateFieldGet(this,_buf).delete(firstView);}var _buffer=/*#__PURE__*/new WeakMap();var _annotationEditorMode=/*#__PURE__*/new WeakMap();var _annotationEditorUIManager=/*#__PURE__*/new WeakMap();var _annotationMode=/*#__PURE__*/new WeakMap();var _containerTopLeft=/*#__PURE__*/new WeakMap();var _enablePermissions=/*#__PURE__*/new WeakMap();var _previousContainerHeight=/*#__PURE__*/new WeakMap();var _resizeObserver=/*#__PURE__*/new WeakMap();var _scrollModePageState=/*#__PURE__*/new WeakMap();var _onVisibilityChange=/*#__PURE__*/new WeakMap();var _scaleTimeoutId=/*#__PURE__*/new WeakMap();var _layerProperties=/*#__PURE__*/new WeakSet();var _initializePermissions=/*#__PURE__*/new WeakSet();var _onePageRenderedOrForceFetch=/*#__PURE__*/new WeakSet();var _ensurePageViewVisible=/*#__PURE__*/new WeakSet();var _scrollIntoView=/*#__PURE__*/new WeakSet();var _isSameScale=/*#__PURE__*/new WeakSet();var _setScaleUpdatePages=/*#__PURE__*/new WeakSet();var _pageWidthScaleFactor=/*#__PURE__*/new WeakMap();var _setScale=/*#__PURE__*/new WeakSet();var _resetCurrentPageView=/*#__PURE__*/new WeakSet();var _ensurePdfPageLoaded=/*#__PURE__*/new WeakSet();var _getScrollAhead=/*#__PURE__*/new WeakSet();var _updateContainerHeightCss=/*#__PURE__*/new WeakSet();var _resizeObserverCallback=/*#__PURE__*/new WeakSet();class PDFViewer{constructor(_options){var _this$container,_this$viewer;_classPrivateMethodInitSpec(this,_resizeObserverCallback);_classPrivateMethodInitSpec(this,_updateContainerHeightCss);_classPrivateMethodInitSpec(this,_getScrollAhead);_classPrivateMethodInitSpec(this,_ensurePdfPageLoaded);_classPrivateMethodInitSpec(this,_resetCurrentPageView);_classPrivateMethodInitSpec(this,_setScale);_classPrivateFieldInitSpec(this,_pageWidthScaleFactor,{get:_get_pageWidthScaleFactor,set:void 0});_classPrivateMethodInitSpec(this,_setScaleUpdatePages);_classPrivateMethodInitSpec(this,_isSameScale);_classPrivateMethodInitSpec(this,_scrollIntoView);_classPrivateMethodInitSpec(this,_ensurePageViewVisible);_classPrivateMethodInitSpec(this,_onePageRenderedOrForceFetch);_classPrivateMethodInitSpec(this,_initializePermissions);_classPrivateMethodInitSpec(this,_layerProperties);_classPrivateFieldInitSpec(this,_buffer,{writable:true,value:null});_classPrivateFieldInitSpec(this,_annotationEditorMode,{writable:true,value:_pdfjsLib.AnnotationEditorType.NONE});_classPrivateFieldInitSpec(this,_annotationEditorUIManager,{writable:true,value:null});_classPrivateFieldInitSpec(this,_annotationMode,{writable:true,value:_pdfjsLib.AnnotationMode.ENABLE_FORMS});_classPrivateFieldInitSpec(this,_containerTopLeft,{writable:true,value:null});_classPrivateFieldInitSpec(this,_enablePermissions,{writable:true,value:false});_classPrivateFieldInitSpec(this,_previousContainerHeight,{writable:true,value:0});_classPrivateFieldInitSpec(this,_resizeObserver,{writable:true,value:new ResizeObserver(_classPrivateMethodGet(this,_resizeObserverCallback,_resizeObserverCallback2).bind(this))});_classPrivateFieldInitSpec(this,_scrollModePageState,{writable:true,value:null});_classPrivateFieldInitSpec(this,_onVisibilityChange,{writable:true,value:null});_classPrivateFieldInitSpec(this,_scaleTimeoutId,{writable:true,value:null});const viewerVersion='3.5.547';if(_pdfjsLib.version!==viewerVersion){throw new Error(`The API version "${_pdfjsLib.version}" does not match the Viewer version "${viewerVersion}".`);}this.container=_options.container;this.viewer=_options.viewer||_options.container.firstElementChild;this.pageViewMode=_options.pageViewMode||"multiple";if(((_this$container=this.container)===null||_this$container===void 0?void 0:_this$container.tagName)!=="DIV"||((_this$viewer=this.viewer)===null||_this$viewer===void 0?void 0:_this$viewer.tagName)!=="DIV"){throw new Error("Invalid `container` and/or `viewer` option.");}if(this.container.offsetParent&&getComputedStyle(this.container).position!=="absolute"){throw new Error("The `container` must be absolutely positioned.");}_classPrivateFieldGet(this,_resizeObserver).observe(this.container);this.eventBus=_options.eventBus;this.linkService=_options.linkService||new _pdf_link_service.SimpleLinkService();this.downloadManager=_options.downloadManager||null;this.findController=_options.findController||null;this._scriptingManager=_options.scriptingManager||null;this.textLayerMode=_options.textLayerMode??_ui_utils.TextLayerMode.ENABLE;_classPrivateFieldSet(this,_annotationMode,_options.annotationMode??_pdfjsLib.AnnotationMode.ENABLE_FORMS);_classPrivateFieldSet(this,_annotationEditorMode,_options.annotationEditorMode??_pdfjsLib.AnnotationEditorType.NONE);this.imageResourcesPath=_options.imageResourcesPath||"";this.enablePrintAutoRotate=_options.enablePrintAutoRotate||false;this.removePageBorders=_options.removePageBorders||false;this.renderer=_options.renderer||_ui_utils.RendererType.CANVAS;this.useOnlyCssZoom=_options.useOnlyCssZoom||false;this.isOffscreenCanvasSupported=_options.isOffscreenCanvasSupported??true;this.maxCanvasPixels=_options.maxCanvasPixels;this.l10n=_options.l10n||_l10n_utils.NullL10n;_classPrivateFieldSet(this,_enablePermissions,_options.enablePermissions||false);this.pageColors=_options.pageColors||null;if(this.pageColors&&!(CSS.supports("color",this.pageColors.background)&&CSS.supports("color",this.pageColors.foreground))){if(this.pageColors.background||this.pageColors.foreground){console.warn("PDFViewer: Ignoring `pageColors`-option, since the browser doesn't support the values used.");}this.pageColors=null;}this.defaultRenderingQueue=!_options.renderingQueue;if(this.defaultRenderingQueue){this.renderingQueue=new _pdf_rendering_queue.PDFRenderingQueue();this.renderingQueue.setViewer(this);}else{this.renderingQueue=_options.renderingQueue;}this.scroll=(0,_ui_utils.watchScroll)(this.container,this._scrollUpdate.bind(this));this.presentationModeState=_ui_utils.PresentationModeState.UNKNOWN;this._onBeforeDraw=this._onAfterDraw=null;this._resetView();if(this.removePageBorders){this.viewer.classList.add("removePageBorders");}_classPrivateMethodGet(this,_updateContainerHeightCss,_updateContainerHeightCss2).call(this);}get pagesCount(){return this._pages.length;}getPageView(index){return this._pages[index];}get pageViewsReady(){if(!this._pagesCapability.settled){return false;}return this._pages.every(function(pageView){return pageView===null||pageView===void 0?void 0:pageView.pdfPage;});}get renderForms(){return _classPrivateFieldGet(this,_annotationMode)===_pdfjsLib.AnnotationMode.ENABLE_FORMS;}get enableScripting(){return!!this._scriptingManager;}get currentPageNumber(){return this._currentPageNumber;}set currentPageNumber(val){if(!Number.isInteger(val)){throw new Error("Invalid page number.");}if(!this.pdfDocument){return;}const flip=Math.abs(this._currentPageNumber-val)<=2;if(!this._setCurrentPageNumber(val,true)){globalThis.ngxConsole.error(`currentPageNumber: "${val}" is not a valid page.`);}if(this.pageFlip){if(flip){this.pageFlip.flip(val-1);}else{this.pageFlip.turnToPage(val-1);}}}hidePagesDependingOnpageViewMode(){if(this.pageViewMode==="book"){if(!this.pageFlip){setTimeout(()=>{if(!this.pageFlip){const page1=this._pages[0].div;const htmlParentElement=page1.parentElement;const viewer=htmlParentElement.parentElement;viewer.style.width=2*page1.clientWidth+"px";viewer.style.overflow="hidden";viewer.style.marginLeft="auto";viewer.style.marginRight="auto";this.pageFlip=new _pageFlipModule.PageFlip(htmlParentElement,{width:page1.clientWidth,height:page1.clientHeight,showCover:true,size:"fixed"});this.pageFlip.loadFromHTML(document.querySelectorAll(".page"));this.ensureAdjecentPagesAreLoaded();this.pageFlip.on("flip",e=>{if(this._currentPageNumber!==e.data+1){this._setCurrentPageNumber(e.data+1,false);}});}},100);}}}_setCurrentPageNumber(val){var _this$_pageLabels;let resetCurrentPageView=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(this._currentPageNumber===val){if(resetCurrentPageView){_classPrivateMethodGet(this,_resetCurrentPageView,_resetCurrentPageView2).call(this);}return true;}if(!(0<val&&val<=this.pagesCount)){return false;}const previous=this._currentPageNumber;this._currentPageNumber=val;this.hidePagesDependingOnpageViewMode();if(this.pageViewMode==="book"||this.pageViewMode==="infinite-scroll"){const pageView=this._pages[this.currentPageNumber-1];if(pageView.div.parentElement.classList.contains("spread")){pageView.div.parentElement.childNodes.forEach(div=>{const pageNumber=Number(div.getAttribute("data-page-number"));const pv=this._pages[pageNumber-1];_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pv).then(()=>{this.renderingQueue.renderView(pv);});div.style.display="inline-block";});}else{_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pageView).then(()=>{this.renderingQueue.renderView(pageView);});if(this.pageViewMode==="book"){this.ensureAdjecentPagesAreLoaded();}}}this.eventBus.dispatch("pagechanging",{source:this,pageNumber:val,pageLabel:((_this$_pageLabels=this._pageLabels)===null||_this$_pageLabels===void 0?void 0:_this$_pageLabels[val-1])??null,previous});if(resetCurrentPageView){_classPrivateMethodGet(this,_resetCurrentPageView,_resetCurrentPageView2).call(this);}return true;}addPageToRenderQueue(){let pageIndex=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;if(pageIndex>=0&&pageIndex<=this._pages.length-1){const pageView=this._pages[pageIndex];const isLoading=pageView.renderingState===_ui_utils.RenderingStates.INITIAL;if(isLoading){_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pageView).then(()=>{this.renderingQueue.renderView(pageView);});return true;}}return false;}async ensureAdjecentPagesAreLoaded(){const advances=[0,1,-1,2,-2];for(const advance of advances){const pageIndex=this.currentPageNumber+advance;if(pageIndex>=0&&pageIndex<this._pages.length){const pageView=this._pages[pageIndex];await _classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pageView);}}const loader=()=>this.adjacentPagesLoader(loader);this.eventBus._on("pagerendered",loader);this.eventBus._on("thumbnailRendered",loader);}adjacentPagesLoader(self){const advances=[0,1,-1,2,-2];const isAlreadyRendering=this._pages.some(pageView=>pageView.renderingState===_ui_utils.RenderingStates.RUNNING);if(isAlreadyRendering){return;}const pausedRendering=this._pages.find(pageView=>pageView.renderingState===_ui_utils.RenderingStates.PAUSED);if(pausedRendering){this.renderingQueue.renderView(pausedRendering);return;}for(const advance of advances){const pageIndex=this.currentPageNumber+advance;if(pageIndex>=0&&pageIndex<this._pages.length){const pageView=this._pages[pageIndex];const needsToBeRendered=pageView.renderingState===_ui_utils.RenderingStates.INITIAL;if(needsToBeRendered){this.renderingQueue.renderView(pageView);return;}}}this.eventBus._off("pagerendered",self);this.eventBus._off("thumbnailRendered",self);}get currentPageLabel(){var _this$_pageLabels2;return((_this$_pageLabels2=this._pageLabels)===null||_this$_pageLabels2===void 0?void 0:_this$_pageLabels2[this._currentPageNumber-1])??null;}set currentPageLabel(val){if(!this.pdfDocument){return;}let page=val|0;if(this._pageLabels){const i=this._pageLabels.indexOf(val);if(i>=0){page=i+1;}}if(!this._setCurrentPageNumber(page,true)){globalThis.ngxConsole.error(`currentPageLabel: "${val}" is not a valid page.`);}}get currentScale(){return this._currentScale!==_ui_utils.UNKNOWN_SCALE?this._currentScale:_ui_utils.DEFAULT_SCALE;}set currentScale(val){if(isNaN(val)){throw new Error("Invalid numeric scale.");}if(!this.pdfDocument){return;}_classPrivateMethodGet(this,_setScale,_setScale2).call(this,val,{noScroll:false});}get currentScaleValue(){return this._currentScaleValue;}set currentScaleValue(val){if(!this.pdfDocument){return;}_classPrivateMethodGet(this,_setScale,_setScale2).call(this,val,{noScroll:false});}get pagesRotation(){return this._pagesRotation;}set pagesRotation(rotation){if(!(0,_ui_utils.isValidRotation)(rotation)){throw new Error("Invalid pages rotation angle.");}if(!this.pdfDocument){return;}rotation%=360;if(rotation<0){rotation+=360;}if(this._pagesRotation===rotation){return;}this._pagesRotation=rotation;const pageNumber=this._currentPageNumber;this.refresh(true,{rotation});if(this._currentScaleValue){_classPrivateMethodGet(this,_setScale,_setScale2).call(this,this._currentScaleValue,{noScroll:true});}this.eventBus.dispatch("rotationchanging",{source:this,pagesRotation:rotation,pageNumber});if(this.defaultRenderingQueue){this.update();}}get firstPagePromise(){return this.pdfDocument?this._firstPageCapability.promise:null;}get onePageRendered(){return this.pdfDocument?this._onePageRenderedCapability.promise:null;}get pagesPromise(){return this.pdfDocument?this._pagesCapability.promise:null;}setDocument(pdfDocument){if(this.pdfDocument){var _this$findController,_this$_scriptingManag;this.eventBus.dispatch("pagesdestroy",{source:this});this._cancelRendering();this._resetView();(_this$findController=this.findController)===null||_this$findController===void 0?void 0:_this$findController.setDocument(null);(_this$_scriptingManag=this._scriptingManager)===null||_this$_scriptingManag===void 0?void 0:_this$_scriptingManag.setDocument(null);if(_classPrivateFieldGet(this,_annotationEditorUIManager)){_classPrivateFieldGet(this,_annotationEditorUIManager).destroy();_classPrivateFieldSet(this,_annotationEditorUIManager,null);}}this.pdfDocument=pdfDocument;if(!pdfDocument){return;}const pagesCount=pdfDocument.numPages;const firstPagePromise=pdfDocument.getPage(1);const optionalContentConfigPromise=pdfDocument.getOptionalContentConfig();const permissionsPromise=_classPrivateFieldGet(this,_enablePermissions)?pdfDocument.getPermissions():Promise.resolve();if(pagesCount>PagesCountLimit.FORCE_SCROLL_MODE_PAGE){console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");const mode=this._scrollMode=_ui_utils.ScrollMode.PAGE;this.eventBus.dispatch("scrollmodechanged",{source:this,mode});}this._pagesCapability.promise.then(()=>{this.eventBus.dispatch("pagesloaded",{source:this,pagesCount});},()=>{});this._onBeforeDraw=evt=>{const pageView=this._pages[evt.pageNumber-1];if(!pageView){return;}_classPrivateFieldGet(this,_buffer).push(pageView);};this.eventBus._on("pagerender",this._onBeforeDraw);this._onAfterDraw=evt=>{if(evt.cssTransform||this._onePageRenderedCapability.settled){return;}this._onePageRenderedCapability.resolve({timestamp:evt.timestamp});this.eventBus._off("pagerendered",this._onAfterDraw);this._onAfterDraw=null;if(_classPrivateFieldGet(this,_onVisibilityChange)){document.removeEventListener("visibilitychange",_classPrivateFieldGet(this,_onVisibilityChange));_classPrivateFieldSet(this,_onVisibilityChange,null);}};this.eventBus._on("pagerendered",this._onAfterDraw);Promise.all([firstPagePromise,permissionsPromise]).then(_ref=>{let[firstPdfPage,permissions]=_ref;if(pdfDocument!==this.pdfDocument){return;}this._firstPageCapability.resolve(firstPdfPage);this._optionalContentConfigPromise=optionalContentConfigPromise;const{annotationEditorMode,annotationMode,textLayerMode}=_classPrivateMethodGet(this,_initializePermissions,_initializePermissions2).call(this,permissions);if(annotationEditorMode!==_pdfjsLib.AnnotationEditorType.DISABLE){const mode=annotationEditorMode;if(pdfDocument.isPureXfa){console.warn("Warning: XFA-editing is not implemented.");}else if(isValidAnnotationEditorMode(mode)){_classPrivateFieldSet(this,_annotationEditorUIManager,new _pdfjsLib.AnnotationEditorUIManager(this.container,this.eventBus,pdfDocument===null||pdfDocument===void 0?void 0:pdfDocument.annotationStorage));if(mode!==_pdfjsLib.AnnotationEditorType.NONE){_classPrivateFieldGet(this,_annotationEditorUIManager).updateMode(mode);}}else{console.error(`Invalid AnnotationEditor mode: ${mode}`);}}const layerProperties=_classPrivateMethodGet(this,_layerProperties,_layerProperties2).bind(this);const viewerElement=this._scrollMode===_ui_utils.ScrollMode.PAGE?null:this.viewer;const scale=this.currentScale;const viewport=firstPdfPage.getViewport({scale:scale*_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS});this.viewer.style.setProperty("--scale-factor",viewport.scale);for(let pageNum=1;pageNum<=pagesCount;++pageNum){const pageView=new _pdf_page_view.PDFPageView({container:viewerElement,eventBus:this.eventBus,id:pageNum,scale,defaultViewport:viewport.clone(),optionalContentConfigPromise,renderingQueue:this.renderingQueue,textLayerMode,annotationMode,imageResourcesPath:this.imageResourcesPath,removePageBorders:this.removePageBorders,renderer:this.renderer,useOnlyCssZoom:this.useOnlyCssZoom,isOffscreenCanvasSupported:this.isOffscreenCanvasSupported,maxCanvasPixels:this.maxCanvasPixels,pageColors:this.pageColors,l10n:this.l10n,layerProperties});this._pages.push(pageView);}const firstPageView=this._pages[0];if(firstPageView){firstPageView.setPdfPage(firstPdfPage);this.linkService.cachePageRef(1,firstPdfPage.ref);}if(this._scrollMode===_ui_utils.ScrollMode.PAGE){_classPrivateMethodGet(this,_ensurePageViewVisible,_ensurePageViewVisible2).call(this);}else if(this._spreadMode!==_ui_utils.SpreadMode.NONE){this._updateSpreadMode();}_classPrivateMethodGet(this,_onePageRenderedOrForceFetch,_onePageRenderedOrForceFetch2).call(this).then(async()=>{var _this$findController2,_this$_scriptingManag2;(_this$findController2=this.findController)===null||_this$findController2===void 0?void 0:_this$findController2.setDocument(pdfDocument);(_this$_scriptingManag2=this._scriptingManager)===null||_this$_scriptingManag2===void 0?void 0:_this$_scriptingManag2.setDocument(pdfDocument);if(_classPrivateFieldGet(this,_annotationEditorUIManager)){this.eventBus.dispatch("annotationeditormodechanged",{source:this,mode:_classPrivateFieldGet(this,_annotationEditorMode)});}if(pdfDocument.loadingParams.disableAutoFetch||pagesCount>PagesCountLimit.FORCE_LAZY_PAGE_INIT){this._pagesCapability.resolve();return;}let getPagesLeft=pagesCount-1;if(getPagesLeft<=0){this._pagesCapability.resolve();return;}for(let pageNum=2;pageNum<=pagesCount;++pageNum){const promise=pdfDocument.getPage(pageNum).then(pdfPage=>{const pageView=this._pages[pageNum-1];if(!pageView.pdfPage){pageView.setPdfPage(pdfPage);}this.linkService.cachePageRef(pageNum,pdfPage.ref);if(--getPagesLeft===0){this._pagesCapability.resolve();}},reason=>{console.error(`Unable to get page ${pageNum} to initialize viewer`,reason);if(--getPagesLeft===0){this._pagesCapability.resolve();}});if(pageNum%PagesCountLimit.PAUSE_EAGER_PAGE_INIT===0){await promise;}}});this.hidePagesDependingOnpageViewMode();this.eventBus.dispatch("pagesinit",{source:this});pdfDocument.getMetadata().then(_ref2=>{let{info}=_ref2;if(pdfDocument!==this.pdfDocument){return;}if(info.Language){this.viewer.lang=info.Language;}});if(this.defaultRenderingQueue){this.update();}}).catch(reason=>{globalThis.ngxConsole.error("Unable to initialize viewer",reason);this._pagesCapability.reject(reason);});}setPageLabels(labels){if(!this.pdfDocument){return;}if(!labels){this._pageLabels=null;}else if(!(Array.isArray(labels)&&this.pdfDocument.numPages===labels.length)){this._pageLabels=null;globalThis.ngxConsole.error(`setPageLabels: Invalid page labels.`);}else{this._pageLabels=labels;}for(let i=0,ii=this._pages.length;i<ii;i++){var _this$_pageLabels3;this._pages[i].setPageLabel(((_this$_pageLabels3=this._pageLabels)===null||_this$_pageLabels3===void 0?void 0:_this$_pageLabels3[i])??null);}}_resetView(){this._pages=[];this._currentPageNumber=1;this._currentScale=_ui_utils.UNKNOWN_SCALE;this._currentScaleValue=null;this._pageLabels=null;const bufferSize=Number(PDFViewerApplicationOptions.get("defaultCacheSize"))||DEFAULT_CACHE_SIZE;_classPrivateFieldSet(this,_buffer,new PDFPageViewBuffer(bufferSize));this._location=null;this._pagesRotation=0;this._optionalContentConfigPromise=null;this._firstPageCapability=(0,_pdfjsLib.createPromiseCapability)();this._onePageRenderedCapability=(0,_pdfjsLib.createPromiseCapability)();this._pagesCapability=(0,_pdfjsLib.createPromiseCapability)();this._scrollMode=_ui_utils.ScrollMode.VERTICAL;this._previousScrollMode=_ui_utils.ScrollMode.UNKNOWN;this._spreadMode=_ui_utils.SpreadMode.NONE;_classPrivateFieldSet(this,_scrollModePageState,{previousPageNumber:1,scrollDown:true,pages:[]});if(this._onBeforeDraw){this.eventBus._off("pagerender",this._onBeforeDraw);this._onBeforeDraw=null;}if(this._onAfterDraw){this.eventBus._off("pagerendered",this._onAfterDraw);this._onAfterDraw=null;}if(_classPrivateFieldGet(this,_onVisibilityChange)){document.removeEventListener("visibilitychange",_classPrivateFieldGet(this,_onVisibilityChange));_classPrivateFieldSet(this,_onVisibilityChange,null);}this.viewer.textContent="";this._updateScrollMode();this.viewer.removeAttribute("lang");this.viewer.classList.remove(ENABLE_PERMISSIONS_CLASS);}_scrollUpdate(){if(this.pagesCount===0){return;}this.update();}scrollPagePosIntoView(pageNumber,pageSpot){const pageDiv=this._pages[pageNumber-1].div;if(pageSpot){const targetPageSpot={...pageSpot};if(typeof targetPageSpot.top==="string"){if(targetPageSpot.top.endsWith("%")){var _this$viewer$querySel;const percent=Number(targetPageSpot.top.replace("%",""));const viewerHeight=(_this$viewer$querySel=this.viewer.querySelector(".page"))===null||_this$viewer$querySel===void 0?void 0:_this$viewer$querySel.clientHeight;let height=pageDiv.clientHeight?pageDiv.clientHeight:viewerHeight;const visibleWindowHeight=this.viewer.parentElement.clientHeight;height=Math.max(0,height-visibleWindowHeight);targetPageSpot.top=percent*height/100;}}if(typeof targetPageSpot.left==="string"){if(targetPageSpot.left.endsWith("%")){var _this$viewer$querySel2;const percent=Number(targetPageSpot.left.replace("%",""));const viewerWidth=(_this$viewer$querySel2=this.viewer.querySelector(".page"))===null||_this$viewer$querySel2===void 0?void 0:_this$viewer$querySel2.clientWidth;const width=pageDiv.clientWidth?pageDiv.clientWidth:viewerWidth;targetPageSpot.left=percent*width/100;}}_classPrivateMethodGet(this,_scrollIntoView,_scrollIntoView2).call(this,{div:pageDiv,id:pageNumber},targetPageSpot);}else{_classPrivateMethodGet(this,_scrollIntoView,_scrollIntoView2).call(this,{pageDiv,pageNumber});}}pageLabelToPageNumber(label){if(!this._pageLabels){return null;}const i=this._pageLabels.indexOf(label);if(i<0){return null;}return i+1;}scrollPageIntoView(_ref3){let{pageNumber,destArray=null,allowNegativeOffset=false,ignoreDestinationZoom=false}=_ref3;if(!this.pdfDocument){return;}const pageView=Number.isInteger(pageNumber)&&this._pages[pageNumber-1];if(!pageView){console.error(`scrollPageIntoView: "${pageNumber}" is not a valid pageNumber parameter.`);return;}if(this.isInPresentationMode||!destArray){this._setCurrentPageNumber(pageNumber,true);return;}let x=0,y=0;let width=0,height=0,widthScale,heightScale;const changeOrientation=pageView.rotation%180!==0;const pageWidth=(changeOrientation?pageView.height:pageView.width)/pageView.scale/_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;const pageHeight=(changeOrientation?pageView.width:pageView.height)/pageView.scale/_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;let scale=0;switch(destArray[1].name){case"XYZ":x=destArray[2];y=destArray[3];scale=destArray[4];x=x!==null?x:0;y=y!==null?y:pageHeight;break;case"Fit":case"FitB":scale="page-fit";break;case"FitH":case"FitBH":y=destArray[2];scale="page-width";if(y===null&&this._location){x=this._location.left;y=this._location.top;}else if(typeof y!=="number"||y<0){y=pageHeight;}break;case"FitV":case"FitBV":x=destArray[2];width=pageWidth;height=pageHeight;scale="page-height";break;case"FitR":x=destArray[2];y=destArray[3];width=destArray[4]-x;height=destArray[5]-y;let hPadding=_ui_utils.SCROLLBAR_PADDING,vPadding=_ui_utils.VERTICAL_PADDING;if(this.removePageBorders){hPadding=vPadding=0;}widthScale=(this.container.clientWidth-hPadding)/width/_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;heightScale=(this.container.clientHeight-vPadding)/height/_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;scale=Math.min(Math.abs(widthScale),Math.abs(heightScale));break;default:console.error(`scrollPageIntoView: "${destArray[1].name}" is not a valid destination type.`);return;}if(!ignoreDestinationZoom){if(scale&&scale!==this._currentScale){this.currentScaleValue=scale;}else if(this._currentScale===_ui_utils.UNKNOWN_SCALE){this.currentScaleValue=_ui_utils.DEFAULT_SCALE_VALUE;}}_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pageView).then(()=>{this.renderingQueue.renderView(pageView);if(this.pageViewMode==="single"){if(this.currentPageNumber!==pageNumber){this.currentPageNumber=pageNumber;}}});if(scale==="page-fit"&&!destArray[4]){_classPrivateMethodGet(this,_scrollIntoView,_scrollIntoView2).call(this,pageView);return;}const boundingRect=[pageView.viewport.convertToViewportPoint(x,y),pageView.viewport.convertToViewportPoint(x+width,y+height)];let left=Math.min(boundingRect[0][0],boundingRect[1][0]);let top=Math.min(boundingRect[0][1],boundingRect[1][1]);if(!allowNegativeOffset){left=Math.max(left,0);top=Math.max(top,0);}_classPrivateMethodGet(this,_scrollIntoView,_scrollIntoView2).call(this,pageView,{left,top});}_updateLocation(firstPage){const currentScale=this._currentScale;const currentScaleValue=this._currentScaleValue;const normalizedScaleValue=parseFloat(currentScaleValue)===currentScale?Math.round(currentScale*10000)/100:currentScaleValue;const pageNumber=firstPage.id;const currentPageView=this._pages[pageNumber-1];const container=this.container;const topLeft=currentPageView.getPagePoint(container.scrollLeft-firstPage.x,container.scrollTop-firstPage.y);const intLeft=Math.round(topLeft[0]);const intTop=Math.round(topLeft[1]);let pdfOpenParams=`#page=${pageNumber}`;if(!this.isInPresentationMode){pdfOpenParams+=`&zoom=${normalizedScaleValue},${intLeft},${intTop}`;}this._location={pageNumber,scale:normalizedScaleValue,top:intTop,left:intLeft,rotation:this._pagesRotation,pdfOpenParams};}update(){if(this.scrollMode===_ui_utils.ScrollMode.PAGE){this.viewer.classList.add("singlePageView");}else{this.viewer.classList.remove("singlePageView");}const visible=this._getVisiblePages();const visiblePages=visible.views,numVisiblePages=visiblePages.length;if(numVisiblePages===0){return;}const bufferSize=Number(PDFViewerApplicationOptions.get("defaultCacheSize"))||DEFAULT_CACHE_SIZE;const newCacheSize=Math.max(bufferSize,2*numVisiblePages+1);_classPrivateFieldGet(this,_buffer).resize(newCacheSize,visible.ids);this.renderingQueue.renderHighestPriority(visible);const isSimpleLayout=this._spreadMode===_ui_utils.SpreadMode.NONE&&(this._scrollMode===_ui_utils.ScrollMode.PAGE||this._scrollMode===_ui_utils.ScrollMode.VERTICAL);const currentId=this._currentPageNumber;let stillFullyVisible=false;for(const page of visiblePages){if(page.percent<100){break;}if(page.id===currentId&&isSimpleLayout){stillFullyVisible=true;break;}}this._setCurrentPageNumber(stillFullyVisible?currentId:visiblePages[0].id);this._updateLocation(visible.first);this.eventBus.dispatch("updateviewarea",{source:this,location:this._location});this.hidePagesDependingOnpageViewMode();}containsElement(element){return this.container.contains(element);}focus(){this.container.focus();}get _isContainerRtl(){return getComputedStyle(this.container).direction==="rtl";}get isInPresentationMode(){return this.presentationModeState===_ui_utils.PresentationModeState.FULLSCREEN;}get isChangingPresentationMode(){return this.presentationModeState===_ui_utils.PresentationModeState.CHANGING;}get isHorizontalScrollbarEnabled(){return this.isInPresentationMode?false:this.container.scrollWidth>this.container.clientWidth;}get isVerticalScrollbarEnabled(){return this.isInPresentationMode?false:this.container.scrollHeight>this.container.clientHeight;}_getVisiblePages(){const views=this._scrollMode===_ui_utils.ScrollMode.PAGE?_classPrivateFieldGet(this,_scrollModePageState).pages:this._pages,horizontal=this._scrollMode===_ui_utils.ScrollMode.HORIZONTAL,rtl=horizontal&&this._isContainerRtl;return(0,_ui_utils.getVisibleElements)({scrollEl:this.container,views,sortByVisibility:true,horizontal,rtl});}isPageVisible(pageNumber){if(!this.pdfDocument){return false;}if(!(Number.isInteger(pageNumber)&&pageNumber>0&&pageNumber<=this.pagesCount)){console.error(`isPageVisible: "${pageNumber}" is not a valid page.`);return false;}return this._getVisiblePages().ids.has(pageNumber);}isPageCached(pageNumber){if(!this.pdfDocument){return false;}if(!(Number.isInteger(pageNumber)&&pageNumber>0&&pageNumber<=this.pagesCount)){console.error(`isPageCached: "${pageNumber}" is not a valid page.`);return false;}const pageView=this._pages[pageNumber-1];return _classPrivateFieldGet(this,_buffer).has(pageView);}cleanup(){for(const pageView of this._pages){if(pageView.renderingState!==_ui_utils.RenderingStates.FINISHED){pageView.reset();}}}_cancelRendering(){for(const pageView of this._pages){pageView.cancelRendering();}}forceRendering(currentlyVisiblePages){const visiblePages=currentlyVisiblePages||this._getVisiblePages();const scrollAhead=_classPrivateMethodGet(this,_getScrollAhead,_getScrollAhead2).call(this,visiblePages);const preRenderExtra=this._spreadMode!==_ui_utils.SpreadMode.NONE&&this._scrollMode!==_ui_utils.ScrollMode.HORIZONTAL;const pageView=this.renderingQueue.getHighestPriority(visiblePages,this._pages,scrollAhead,preRenderExtra);if(pageView){_classPrivateMethodGet(this,_ensurePdfPageLoaded,_ensurePdfPageLoaded2).call(this,pageView).then(()=>{this.renderingQueue.renderView(pageView);});return true;}return false;}get hasEqualPageSizes(){const firstPageView=this._pages[0];for(let i=1,ii=this._pages.length;i<ii;++i){const pageView=this._pages[i];if(pageView.width!==firstPageView.width||pageView.height!==firstPageView.height){return false;}}return true;}getPagesOverview(){return this._pages.map(pageView=>{const viewport=pageView.pdfPage.getViewport({scale:1});if(!this.enablePrintAutoRotate||(0,_ui_utils.isPortraitOrientation)(viewport)){return{width:viewport.width,height:viewport.height,rotation:viewport.rotation};}return{width:viewport.height,height:viewport.width,rotation:(viewport.rotation-90)%360};});}get optionalContentConfigPromise(){if(!this.pdfDocument){return Promise.resolve(null);}if(!this._optionalContentConfigPromise){console.error("optionalContentConfigPromise: Not initialized yet.");return this.pdfDocument.getOptionalContentConfig();}return this._optionalContentConfigPromise;}set optionalContentConfigPromise(promise){if(!(promise instanceof Promise)){throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);}if(!this.pdfDocument){return;}if(!this._optionalContentConfigPromise){return;}this._optionalContentConfigPromise=promise;this.refresh(false,{optionalContentConfigPromise:promise});this.eventBus.dispatch("optionalcontentconfigchanged",{source:this,promise});}get scrollMode(){return this._scrollMode;}set scrollMode(mode){if(this._scrollMode===mode){return;}if(!(0,_ui_utils.isValidScrollMode)(mode)){throw new Error(`Invalid scroll mode: ${mode}`);}if(this.pagesCount>PagesCountLimit.FORCE_SCROLL_MODE_PAGE){return;}this._previousScrollMode=this._scrollMode;this._scrollMode=mode;this.eventBus.dispatch("scrollmodechanged",{source:this,mode});this._updateScrollMode(this._currentPageNumber);}_updateScrollMode(){let pageNumber=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;const scrollMode=this._scrollMode,viewer=this.viewer;viewer.classList.toggle("scrollHorizontal",scrollMode===_ui_utils.ScrollMode.HORIZONTAL);viewer.classList.toggle("scrollWrapped",scrollMode===_ui_utils.ScrollMode.WRAPPED);if(!this.pdfDocument||!pageNumber){return;}if(scrollMode===_ui_utils.ScrollMode.PAGE){_classPrivateMethodGet(this,_ensurePageViewVisible,_ensurePageViewVisible2).call(this);}else if(this._previousScrollMode===_ui_utils.ScrollMode.PAGE){this._updateSpreadMode();}if(this._currentScaleValue&&isNaN(this._currentScaleValue)){_classPrivateMethodGet(this,_setScale,_setScale2).call(this,this._currentScaleValue,{noScroll:true});}this._setCurrentPageNumber(pageNumber,true);this.update();}get spreadMode(){return this._spreadMode;}set spreadMode(mode){if(this._spreadMode===mode){return;}if(!(0,_ui_utils.isValidSpreadMode)(mode)){throw new Error(`Invalid spread mode: ${mode}`);}this._spreadMode=mode;this.eventBus.dispatch("spreadmodechanged",{source:this,mode});this._updateSpreadMode(this._currentPageNumber);}_updateSpreadMode(){let pageNumber=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(!this.pdfDocument){return;}const viewer=this.viewer,pages=this._pages;if(this._scrollMode===_ui_utils.ScrollMode.PAGE){_classPrivateMethodGet(this,_ensurePageViewVisible,_ensurePageViewVisible2).call(this);}else{viewer.textContent="";if(this._spreadMode===_ui_utils.SpreadMode.NONE){for(const pageView of this._pages){viewer.append(pageView.div);}}else{const parity=this._spreadMode-1;let spread=null;for(let i=0,ii=pages.length;i<ii;++i){if(spread===null){spread=document.createElement("div");spread.className="spread";viewer.append(spread);}else if(i%2===parity){spread=spread.cloneNode(false);viewer.append(spread);}spread.append(pages[i].div);}}}this.hidePagesDependingOnpageViewMode();if(!pageNumber){return;}if(this._currentScaleValue&&isNaN(this._currentScaleValue)){_classPrivateMethodGet(this,_setScale,_setScale2).call(this,this._currentScaleValue,{noScroll:true});}this._setCurrentPageNumber(pageNumber,true);this.update();}_getPageAdvance(currentPageNumber){let previous=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(this.pageViewMode==="book"){return 2;}switch(this._scrollMode){case _ui_utils.ScrollMode.WRAPPED:{const{views}=this._getVisiblePages(),pageLayout=new Map();for(const{id,y,percent,widthPercent}of views){if(percent===0||widthPercent<100){continue;}let yArray=pageLayout.get(y);if(!yArray){pageLayout.set(y,yArray||=[]);}yArray.push(id);}for(const yArray of pageLayout.values()){const currentIndex=yArray.indexOf(currentPageNumber);if(currentIndex===-1){continue;}const numPages=yArray.length;if(numPages===1){break;}if(previous){for(let i=currentIndex-1,ii=0;i>=ii;i--){const currentId=yArray[i],expectedId=yArray[i+1]-1;if(currentId<expectedId){return currentPageNumber-expectedId;}}}else{for(let i=currentIndex+1,ii=numPages;i<ii;i++){const currentId=yArray[i],expectedId=yArray[i-1]+1;if(currentId>expectedId){return expectedId-currentPageNumber;}}}if(previous){const firstId=yArray[0];if(firstId<currentPageNumber){return currentPageNumber-firstId+1;}}else{const lastId=yArray[numPages-1];if(lastId>currentPageNumber){return lastId-currentPageNumber+1;}}break;}break;}case _ui_utils.ScrollMode.HORIZONTAL:{break;}case _ui_utils.ScrollMode.PAGE:case _ui_utils.ScrollMode.VERTICAL:{if(this._spreadMode===_ui_utils.SpreadMode.NONE){break;}const parity=this._spreadMode-1;if(previous&&currentPageNumber%2!==parity){break;}else if(!previous&&currentPageNumber%2===parity){break;}const{views}=this._getVisiblePages(),expectedId=previous?currentPageNumber-1:currentPageNumber+1;for(const{id,percent,widthPercent}of views){if(id!==expectedId){continue;}if(percent>0&&widthPercent===100){return 2;}break;}break;}}return 1;}nextPage(){const currentPageNumber=this._currentPageNumber,pagesCount=this.pagesCount;if(currentPageNumber>=pagesCount){return false;}const advance=this._getPageAdvance(currentPageNumber,false)||1;this.currentPageNumber=Math.min(currentPageNumber+advance,pagesCount);return true;}previousPage(){const currentPageNumber=this._currentPageNumber;if(currentPageNumber<=1){return false;}const advance=this._getPageAdvance(currentPageNumber,true)||1;this.currentPageNumber=Math.max(currentPageNumber-advance,1);return true;}increaseScale(){let{drawingDelay,scaleFactor,steps}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(!this.pdfDocument){return;}let newScale=this._currentScale;if(scaleFactor>1){newScale=Math.round(newScale*scaleFactor*100)/100;}else{steps??=1;do{newScale=Math.ceil((newScale*_ui_utils.DEFAULT_SCALE_DELTA).toFixed(2)*10)/10;}while(--steps>0&&newScale<_ui_utils.MAX_SCALE);}let maxScale=Number(PDFViewerApplicationOptions.get("maxZoom"));if(!maxScale){maxScale=_ui_utils.MAX_SCALE;}_classPrivateMethodGet(this,_setScale,_setScale2).call(this,Math.min(maxScale,newScale),{noScroll:false,drawingDelay});}decreaseScale(){let{drawingDelay,scaleFactor,steps}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(!this.pdfDocument){return;}let newScale=this._currentScale;if(scaleFactor>0&&scaleFactor<1){newScale=Math.round(newScale*scaleFactor*100)/100;}else{steps??=1;do{newScale=Math.floor((newScale/_ui_utils.DEFAULT_SCALE_DELTA).toFixed(2)*10)/10;}while(--steps>0&&newScale>_ui_utils.MIN_SCALE);}let minScale=Number(PDFViewerApplicationOptions.get("minZoom"));if(!minScale){minScale=_ui_utils.MIN_SCALE;}_classPrivateMethodGet(this,_setScale,_setScale2).call(this,Math.max(minScale,newScale),{noScroll:false,drawingDelay});}get containerTopLeft(){return _classPrivateFieldGet(this,_containerTopLeft)||_classPrivateFieldSet(this,_containerTopLeft,[this.container.offsetTop,this.container.offsetLeft]);}get annotationEditorMode(){return _classPrivateFieldGet(this,_annotationEditorUIManager)?_classPrivateFieldGet(this,_annotationEditorMode):_pdfjsLib.AnnotationEditorType.DISABLE;}set annotationEditorMode(mode){if(!_classPrivateFieldGet(this,_annotationEditorUIManager)){throw new Error(`The AnnotationEditor is not enabled.`);}if(_classPrivateFieldGet(this,_annotationEditorMode)===mode){return;}if(!isValidAnnotationEditorMode(mode)){throw new Error(`Invalid AnnotationEditor mode: ${mode}`);}if(!this.pdfDocument){return;}_classPrivateFieldSet(this,_annotationEditorMode,mode);this.eventBus.dispatch("annotationeditormodechanged",{source:this,mode});_classPrivateFieldGet(this,_annotationEditorUIManager).updateMode(mode);}set annotationEditorParams(_ref4){let{type,value}=_ref4;if(!_classPrivateFieldGet(this,_annotationEditorUIManager)){throw new Error(`The AnnotationEditor is not enabled.`);}_classPrivateFieldGet(this,_annotationEditorUIManager).updateParams(type,value);}refresh(){let noUpdate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;let updateArgs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:Object.create(null);if(!this.pdfDocument){return;}for(const pageView of this._pages){pageView.update(updateArgs);}if(_classPrivateFieldGet(this,_scaleTimeoutId)!==null){clearTimeout(_classPrivateFieldGet(this,_scaleTimeoutId));_classPrivateFieldSet(this,_scaleTimeoutId,null);}if(!noUpdate){this.update();}}getSerializedAnnotations(){const rawAnnotations=this.pdfDocument.annotationStorage.getAll();if(rawAnnotations){const annotations=Object.values(rawAnnotations);return annotations.map(a=>a.serialize());}return null;}addEditorAnnotation(data){if(!Array.isArray(data)){data=[data];}_classPrivateFieldGet(this,_annotationEditorUIManager).addSerializedEditor(data,true);}removeEditorAnnotations(){let filter=arguments.length>0&&arguments[0]!==undefined?arguments[0]:()=>true;_classPrivateFieldGet(this,_annotationEditorUIManager).removeEditors(filter);}destroyBookMode(){if(this.pageFlip){this.pageFlip.destroy();this.pageFlip=null;}}stopRendering(){this._cancelRendering();}}exports.PDFViewer=PDFViewer;function _layerProperties2(){const self=this;return{get annotationEditorUIManager(){return _classPrivateFieldGet(self,_annotationEditorUIManager);},get annotationStorage(){var _self$pdfDocument;return(_self$pdfDocument=self.pdfDocument)===null||_self$pdfDocument===void 0?void 0:_self$pdfDocument.annotationStorage;},get downloadManager(){return self.downloadManager;},get enableScripting(){return!!self._scriptingManager;},get fieldObjectsPromise(){var _self$pdfDocument2;return(_self$pdfDocument2=self.pdfDocument)===null||_self$pdfDocument2===void 0?void 0:_self$pdfDocument2.getFieldObjects();},get findController(){return self.findController;},get hasJSActionsPromise(){var _self$pdfDocument3;return(_self$pdfDocument3=self.pdfDocument)===null||_self$pdfDocument3===void 0?void 0:_self$pdfDocument3.hasJSActions();},get linkService(){return self.linkService;}};}function _initializePermissions2(permissions){const params={annotationEditorMode:_classPrivateFieldGet(this,_annotationEditorMode),annotationMode:_classPrivateFieldGet(this,_annotationMode),textLayerMode:this.textLayerMode};if(!permissions){return params;}if(!permissions.includes(_pdfjsLib.PermissionFlag.COPY)){this.viewer.classList.add(ENABLE_PERMISSIONS_CLASS);}if(!permissions.includes(_pdfjsLib.PermissionFlag.MODIFY_CONTENTS)){params.annotationEditorMode=_pdfjsLib.AnnotationEditorType.DISABLE;}if(!permissions.includes(_pdfjsLib.PermissionFlag.MODIFY_ANNOTATIONS)&&!permissions.includes(_pdfjsLib.PermissionFlag.FILL_INTERACTIVE_FORMS)&&_classPrivateFieldGet(this,_annotationMode)===_pdfjsLib.AnnotationMode.ENABLE_FORMS){params.annotationMode=_pdfjsLib.AnnotationMode.ENABLE;}return params;}function _onePageRenderedOrForceFetch2(){if(document.visibilityState==="hidden"||!this.container.offsetParent||this._getVisiblePages().views.length===0){return Promise.resolve();}const visibilityChangePromise=new Promise(resolve=>{_classPrivateFieldSet(this,_onVisibilityChange,()=>{if(document.visibilityState!=="hidden"){return;}resolve();document.removeEventListener("visibilitychange",_classPrivateFieldGet(this,_onVisibilityChange));_classPrivateFieldSet(this,_onVisibilityChange,null);});document.addEventListener("visibilitychange",_classPrivateFieldGet(this,_onVisibilityChange));});return Promise.race([this._onePageRenderedCapability.promise,visibilityChangePromise]);}function _ensurePageViewVisible2(){if(this._scrollMode!==_ui_utils.ScrollMode.PAGE){throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");}const pageNumber=this._currentPageNumber,state=_classPrivateFieldGet(this,_scrollModePageState),viewer=this.viewer;viewer.textContent="";state.pages.length=0;if(this._spreadMode===_ui_utils.SpreadMode.NONE&&!this.isInPresentationMode){const pageView=this._pages[pageNumber-1];viewer.append(pageView.div);state.pages.push(pageView);}else{const pageIndexSet=new Set(),parity=this._spreadMode-1;if(parity===-1){pageIndexSet.add(pageNumber-1);}else if(pageNumber%2!==parity){pageIndexSet.add(pageNumber-1);pageIndexSet.add(pageNumber);}else{pageIndexSet.add(pageNumber-2);pageIndexSet.add(pageNumber-1);}const spread=document.createElement("div");spread.className="spread";if(this.isInPresentationMode){const dummyPage=document.createElement("div");dummyPage.className="dummyPage";spread.append(dummyPage);}for(const i of pageIndexSet){const pageView=this._pages[i];if(!pageView){continue;}spread.append(pageView.div);state.pages.push(pageView);}viewer.append(spread);}state.scrollDown=pageNumber>=state.previousPageNumber;state.previousPageNumber=pageNumber;}function _scrollIntoView2(pageView){let pageSpot=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!pageView){return;}const{div,id}=pageView;if(this._currentPageNumber!==id){this._setCurrentPageNumber(id);}if(this._scrollMode===_ui_utils.ScrollMode.PAGE){_classPrivateMethodGet(this,_ensurePageViewVisible,_ensurePageViewVisible2).call(this);this.update();}if(!pageSpot&&!this.isInPresentationMode){const left=div.offsetLeft+div.clientLeft,right=left+div.clientWidth;const{scrollLeft,clientWidth}=this.container;if(this._scrollMode===_ui_utils.ScrollMode.HORIZONTAL||left<scrollLeft||right>scrollLeft+clientWidth){pageSpot={left:0,top:0};}}(0,_ui_utils.scrollIntoView)(div,pageSpot,false,this.pageViewMode==="infinite-scroll");if(!this._currentScaleValue&&this._location){this._location=null;}}function _isSameScale2(newScale){return newScale===this._currentScale||Math.abs(newScale-this._currentScale)<1e-15;}function _setScaleUpdatePages2(newScale,newValue,_ref5){let{noScroll=false,preset=false,drawingDelay=-1}=_ref5;const previousScale=isNaN(Number(this.currentScale))?undefined:Number(this.currentScale);const previousScaleValue=this.currentScaleValue;this._currentScaleValue=newValue.toString();if(_classPrivateMethodGet(this,_isSameScale,_isSameScale2).call(this,newScale)){if(preset){this.eventBus.dispatch("scalechanging",{source:this,scale:newScale,presetValue:newValue,previousScale,previousPresetValue:previousScaleValue});}return;}this.viewer.style.setProperty("--scale-factor",newScale*_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS);const postponeDrawing=drawingDelay>=0&&drawingDelay<1000;this.refresh(true,{scale:newScale,drawingDelay:postponeDrawing?drawingDelay:-1});if(postponeDrawing){_classPrivateFieldSet(this,_scaleTimeoutId,setTimeout(()=>{_classPrivateFieldSet(this,_scaleTimeoutId,null);this.refresh();},drawingDelay));}this._currentScale=newScale;if(!noScroll){let page=this._currentPageNumber,dest;if(this._location&&!(this.isInPresentationMode||this.isChangingPresentationMode)){page=this._location.pageNumber;dest=[null,{name:"XYZ"},this._location.left,this._location.top,null];}this.scrollPageIntoView({pageNumber:page,destArray:dest,allowNegativeOffset:true});}this.eventBus.dispatch("scalechanging",{source:this,scale:newScale,presetValue:preset?newValue:undefined,previousScale,previousPresetValue:previousScaleValue});if(this.defaultRenderingQueue){this.update();}}function _get_pageWidthScaleFactor(){if(this._spreadMode!==_ui_utils.SpreadMode.NONE&&this._scrollMode!==_ui_utils.ScrollMode.HORIZONTAL){return 2;}return 1;}function _setScale2(value,options){if(!value){value="auto";}let scale=parseFloat(value);if(this._currentScale===scale){return;}if(scale>0){options.preset=false;_classPrivateMethodGet(this,_setScaleUpdatePages,_setScaleUpdatePages2).call(this,scale,value,options);}else{const currentPage=this._pages[this._currentPageNumber-1];if(!currentPage){return;}let hPadding=_ui_utils.SCROLLBAR_PADDING,vPadding=_ui_utils.VERTICAL_PADDING;if(this.isInPresentationMode){hPadding=vPadding=4;if(this._spreadMode!==_ui_utils.SpreadMode.NONE){hPadding*=2;}}else if(this.removePageBorders){hPadding=vPadding=0;}else if(this._scrollMode===_ui_utils.ScrollMode.HORIZONTAL){[hPadding,vPadding]=[vPadding,hPadding];}const pageWidthScale=(this.container.clientWidth-hPadding)/currentPage.width*currentPage.scale/_classPrivateFieldGet(this,_pageWidthScaleFactor);const pageHeightScale=(this.container.clientHeight-vPadding)/currentPage.height*currentPage.scale;switch(value){case"page-actual":scale=1;break;case"page-width":scale=pageWidthScale;break;case"page-height":scale=pageHeightScale;break;case"page-fit":scale=Math.min(pageWidthScale,pageHeightScale);break;case"auto":const horizontalScale=(0,_ui_utils.isPortraitOrientation)(currentPage)?pageWidthScale:Math.min(pageHeightScale,pageWidthScale);scale=Math.min(_ui_utils.MAX_AUTO_SCALE,horizontalScale);break;default:globalThis.ngxConsole.error(`#setScale: "${value}" is an unknown zoom value.`);return;}options.preset=true;_classPrivateMethodGet(this,_setScaleUpdatePages,_setScaleUpdatePages2).call(this,scale,value,options);}}function _resetCurrentPageView2(){const pageView=this._pages[this._currentPageNumber-1];if(this.isInPresentationMode){_classPrivateMethodGet(this,_setScale,_setScale2).call(this,this._currentScaleValue,{noScroll:true});}_classPrivateMethodGet(this,_scrollIntoView,_scrollIntoView2).call(this,pageView);}async function _ensurePdfPageLoaded2(pageView){if(pageView.pdfPage){return pageView.pdfPage;}try{var _this$linkService$_ca,_this$linkService;const pdfPage=await this.pdfDocument.getPage(pageView.id);if(!pageView.pdfPage){pageView.setPdfPage(pdfPage);}if(!((_this$linkService$_ca=(_this$linkService=this.linkService)._cachedPageNumber)!==null&&_this$linkService$_ca!==void 0&&_this$linkService$_ca.call(_this$linkService,pdfPage.ref))){this.linkService.cachePageRef(pageView.id,pdfPage.ref);}return pdfPage;}catch(reason){console.error("Unable to get page for page view",reason);return null;}}function _getScrollAhead2(visible){var _visible$first,_visible$last;if(((_visible$first=visible.first)===null||_visible$first===void 0?void 0:_visible$first.id)===1){return true;}else if(((_visible$last=visible.last)===null||_visible$last===void 0?void 0:_visible$last.id)===this.pagesCount){return false;}switch(this._scrollMode){case _ui_utils.ScrollMode.PAGE:return _classPrivateFieldGet(this,_scrollModePageState).scrollDown;case _ui_utils.ScrollMode.HORIZONTAL:return this.scroll.right;}return this.scroll.down;}function _updateContainerHeightCss2(){let height=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.container.clientHeight;if(height!==_classPrivateFieldGet(this,_previousContainerHeight)){_classPrivateFieldSet(this,_previousContainerHeight,height);_ui_utils.docStyle.setProperty("--viewer-container-height",`${height}px`);}}function _resizeObserverCallback2(entries){for(const entry of entries){if(entry.target===this.container){_classPrivateMethodGet(this,_updateContainerHeightCss,_updateContainerHeightCss2).call(this,Math.floor(entry.borderBoxSize[0].blockSize));_classPrivateFieldSet(this,_containerTopLeft,null);break;}}}

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.NullL10n=void 0;exports.fixupLangCode=fixupLangCode;exports.getL10nFallback=getL10nFallback;const DEFAULT_L10N_STRINGS={of_pages:"of {{pagesCount}}",page_of_pages:"({{pageNumber}} of {{pagesCount}})",document_properties_kb:"{{size_kb}} KB ({{size_b}} bytes)",document_properties_mb:"{{size_mb}} MB ({{size_b}} bytes)",document_properties_date_string:"{{date}}, {{time}}",document_properties_page_size_unit_inches:"in",document_properties_page_size_unit_millimeters:"mm",document_properties_page_size_orientation_portrait:"portrait",document_properties_page_size_orientation_landscape:"landscape",document_properties_page_size_name_a3:"A3",document_properties_page_size_name_a4:"A4",document_properties_page_size_name_letter:"Letter",document_properties_page_size_name_legal:"Legal",document_properties_page_size_dimension_string:"{{width}} × {{height}} {{unit}} ({{orientation}})",document_properties_page_size_dimension_name_string:"{{width}} × {{height}} {{unit}} ({{name}}, {{orientation}})",document_properties_linearized_yes:"Yes",document_properties_linearized_no:"No",additional_layers:"Additional Layers",page_landmark:"Page {{page}}",thumb_page_title:"Page {{page}}",thumb_page_canvas:"Thumbnail of Page {{page}}",find_reached_top:"Reached top of document, continued from bottom",find_reached_bottom:"Reached end of document, continued from top","find_match_count[one]":"{{current}} of {{total}} match","find_match_count[other]":"{{current}} of {{total}} matches","find_match_count_limit[one]":"More than {{limit}} match","find_match_count_limit[other]":"More than {{limit}} matches",find_not_found:"Phrase not found",page_scale_width:"Page Width",page_scale_fit:"Page Fit",page_scale_auto:"Automatic Zoom",page_scale_actual:"Actual Size",page_scale_percent:"{{scale}}%",loading_error:"An error occurred while loading the PDF.",invalid_file_error:"Invalid or corrupted PDF file.",missing_file_error:"Missing PDF file.",unexpected_response_error:"Unexpected server response.",rendering_error:"An error occurred while rendering the page.",printing_not_supported:"Warning: Printing is not fully supported by this browser.",printing_not_ready:"Warning: The PDF is not fully loaded for printing.",web_fonts_disabled:"Web fonts are disabled: unable to use embedded PDF fonts.",free_text2_default_content:"Start typing…",editor_free_text2_aria_label:"Text Editor",editor_ink2_aria_label:"Draw Editor",editor_ink_canvas_aria_label:"User-created image"};{DEFAULT_L10N_STRINGS.print_progress_percent="{{progress}}%";}function getL10nFallback(key,args){switch(key){case"find_match_count":key=`find_match_count[${args.total===1?"one":"other"}]`;break;case"find_match_count_limit":key=`find_match_count_limit[${args.limit===1?"one":"other"}]`;break;}return DEFAULT_L10N_STRINGS[key]||"";}const PARTIAL_LANG_CODES={en:"en-US",es:"es-ES",fy:"fy-NL",ga:"ga-IE",gu:"gu-IN",hi:"hi-IN",hy:"hy-AM",nb:"nb-NO",ne:"ne-NP",nn:"nn-NO",pa:"pa-IN",pt:"pt-PT",sv:"sv-SE",zh:"zh-CN"};function fixupLangCode(langCode){return PARTIAL_LANG_CODES[langCode===null||langCode===void 0?void 0:langCode.toLowerCase()]||langCode;}function formatL10nValue(text,args){if(!args){return text;}return text.replaceAll(/\{\{\s*(\w+)\s*\}\}/g,(all,name)=>{return name in args?args[name]:"{{"+name+"}}";});}const NullL10n={async getLanguage(){return"en-us";},async getDirection(){return"ltr";},async get(key){let args=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;let fallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:getL10nFallback(key,args);return formatL10nValue(fallback,args);},async translate(element){}};exports.NullL10n=NullL10n;

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PageFlip=void 0;class Page{constructor(render,density){this.state={angle:0,area:[],position:{x:0,y:0},hardAngle:0,hardDrawingAngle:0};this.createdDensity=density;this.nowDrawingDensity=this.createdDensity;this.render=render;}setDensity(density){this.createdDensity=density;this.nowDrawingDensity=density;}setDrawingDensity(density){this.nowDrawingDensity=density;}setPosition(pagePos){this.state.position=pagePos;}setAngle(angle){this.state.angle=angle;}setArea(area){this.state.area=area;}setHardDrawingAngle(angle){this.state.hardDrawingAngle=angle;}setHardAngle(angle){this.state.hardAngle=angle;this.state.hardDrawingAngle=angle;}setOrientation(orientation){this.orientation=orientation;}getDrawingDensity(){return this.nowDrawingDensity;}getDensity(){return this.createdDensity;}getHardAngle(){return this.state.hardAngle;}}class ImagePage extends Page{constructor(render,href,density){super(render,density);this.image=null;this.isLoad=false;this.loadingAngle=0;this.image=new Image();this.image.src=href;}draw(tempDensity){const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true}:undefined;const ctx=canvas.getContext("2d",options);const pagePos=this.render.convertToGlobal(this.state.position);const pageWidth=this.render.getRect().pageWidth;const pageHeight=this.render.getRect().height;ctx.save();ctx.translate(pagePos.x,pagePos.y);ctx.beginPath();for(let p of this.state.area){if(p!==null){p=this.render.convertToGlobal(p);ctx.lineTo(p.x-pagePos.x,p.y-pagePos.y);}}ctx.rotate(this.state.angle);ctx.clip();if(!this.isLoad){this.drawLoader(ctx,{x:0,y:0},pageWidth,pageHeight);}else{ctx.drawImage(this.image,0,0,pageWidth,pageHeight);}ctx.restore();}simpleDraw(orient){const rect=this.render.getRect();const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true}:undefined;const ctx=canvas.getContext("2d",options);const pageWidth=rect.pageWidth;const pageHeight=rect.height;const x=orient===1?rect.left+rect.pageWidth:rect.left;const y=rect.top;if(!this.isLoad){this.drawLoader(ctx,{x,y},pageWidth,pageHeight);}else{ctx.drawImage(this.image,x,y,pageWidth,pageHeight);}}drawLoader(ctx,shiftPos,pageWidth,pageHeight){ctx.beginPath();ctx.strokeStyle='rgb(200, 200, 200)';ctx.fillStyle='rgb(255, 255, 255)';ctx.lineWidth=1;ctx.rect(shiftPos.x+1,shiftPos.y+1,pageWidth-1,pageHeight-1);ctx.stroke();ctx.fill();const middlePoint={x:shiftPos.x+pageWidth/2,y:shiftPos.y+pageHeight/2};ctx.beginPath();ctx.lineWidth=10;ctx.arc(middlePoint.x,middlePoint.y,20,this.loadingAngle,3*Math.PI/2+this.loadingAngle);ctx.stroke();ctx.closePath();this.loadingAngle+=0.07;if(this.loadingAngle>=2*Math.PI){this.loadingAngle=0;}}load(){if(!this.isLoad)this.image.onload=()=>{this.isLoad=true;};}newTemporaryCopy(){return this;}getTemporaryCopy(){return this;}hideTemporaryCopy(){}}class PageCollection{constructor(app,render){this.pages=[];this.currentPageIndex=0;this.currentSpreadIndex=0;this.landscapeSpread=[];this.portraitSpread=[];this.render=render;this.app=app;this.currentPageIndex=0;this.isShowCover=this.app.getSettings().showCover;}destroy(){this.pages=[];}createSpread(){this.landscapeSpread=[];this.portraitSpread=[];for(let i=0;i<this.pages.length;i++){this.portraitSpread.push([i]);}let start=0;if(this.isShowCover){this.pages[0].setDensity("hard");this.landscapeSpread.push([start]);start++;}for(let i=start;i<this.pages.length;i+=2){if(i<this.pages.length-1)this.landscapeSpread.push([i,i+1]);else{this.landscapeSpread.push([i]);this.pages[i].setDensity("hard");}}}getSpread(){return this.render.getOrientation()==="landscape"?this.landscapeSpread:this.portraitSpread;}getSpreadIndexByPage(pageNum){const spread=this.getSpread();for(let i=0;i<spread.length;i++)if(pageNum===spread[i][0]||pageNum===spread[i][1])return i;return null;}getPageCount(){return this.pages.length;}getPages(){return this.pages;}getPage(pageIndex){if(pageIndex>=0&&pageIndex<this.pages.length){return this.pages[pageIndex];}throw new Error('Invalid page number');}nextBy(current){const idx=this.pages.indexOf(current);if(idx<this.pages.length-1)return this.pages[idx+1];return null;}prevBy(current){const idx=this.pages.indexOf(current);if(idx>0)return this.pages[idx-1];return null;}getFlippingPage(direction){const current=this.currentSpreadIndex;if(this.render.getOrientation()==="portrait"){return direction===0?this.pages[current].newTemporaryCopy():this.pages[current-1];}else{const spread=direction===0?this.getSpread()[current+1]:this.getSpread()[current-1];if(spread.length===1)return this.pages[spread[0]];return direction===0?this.pages[spread[0]]:this.pages[spread[1]];}}getBottomPage(direction){const current=this.currentSpreadIndex;if(this.render.getOrientation()==="portrait"){return direction===0?this.pages[current+1]:this.pages[current-1];}else{const spread=direction===0?this.getSpread()[current+1]:this.getSpread()[current-1];if(spread.length===1)return this.pages[spread[0]];return direction===0?this.pages[spread[1]]:this.pages[spread[0]];}}showNext(){if(this.currentSpreadIndex<this.getSpread().length){this.currentSpreadIndex++;this.showSpread();}}showPrev(){if(this.currentSpreadIndex>0){this.currentSpreadIndex--;this.showSpread();}}getCurrentPageIndex(){return this.currentPageIndex;}show(){let pageNum=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(pageNum===null)pageNum=this.currentPageIndex;if(pageNum<0||pageNum>=this.pages.length)return;const spreadIndex=this.getSpreadIndexByPage(pageNum);if(spreadIndex!==null){this.currentSpreadIndex=spreadIndex;this.showSpread();}}getCurrentSpreadIndex(){return this.currentSpreadIndex;}setCurrentSpreadIndex(newIndex){if(newIndex>=0&&newIndex<this.getSpread().length){this.currentSpreadIndex=newIndex;}else{throw new Error('Invalid page');}}showSpread(){const spread=this.getSpread()[this.currentSpreadIndex];if(spread.length===2){this.render.setLeftPage(this.pages[spread[0]]);this.render.setRightPage(this.pages[spread[1]]);}else{if(this.render.getOrientation()==="landscape"){if(spread[0]===this.pages.length-1){this.render.setLeftPage(this.pages[spread[0]]);this.render.setRightPage(null);}else{this.render.setLeftPage(null);this.render.setRightPage(this.pages[spread[0]]);}}else{this.render.setLeftPage(null);this.render.setRightPage(this.pages[spread[0]]);}}this.currentPageIndex=spread[0];this.app.updatePageIndex(this.currentPageIndex);}}class ImagePageCollection extends PageCollection{constructor(app,render,imagesHref){super(app,render);this.imagesHref=imagesHref;}load(){for(const href of this.imagesHref){const page=new ImagePage(this.render,href,"soft");page.load();this.pages.push(page);}this.createSpread();}}class Helper{static GetDistanceBetweenTwoPoint(point1,point2){if(point1===null||point2===null){return Infinity;}return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2));}static GetSegmentLength(segment){return Helper.GetDistanceBetweenTwoPoint(segment[0],segment[1]);}static GetAngleBetweenTwoLine(line1,line2){const A1=line1[0].y-line1[1].y;const A2=line2[0].y-line2[1].y;const B1=line1[1].x-line1[0].x;const B2=line2[1].x-line2[0].x;return Math.acos((A1*A2+B1*B2)/(Math.sqrt(A1*A1+B1*B1)*Math.sqrt(A2*A2+B2*B2)));}static PointInRect(rect,pos){if(pos===null){return null;}if(pos.x>=rect.left&&pos.x<=rect.width+rect.left&&pos.y>=rect.top&&pos.y<=rect.top+rect.height){return pos;}return null;}static GetRotatedPoint(transformedPoint,startPoint,angle){return{x:transformedPoint.x*Math.cos(angle)+transformedPoint.y*Math.sin(angle)+startPoint.x,y:transformedPoint.y*Math.cos(angle)-transformedPoint.x*Math.sin(angle)+startPoint.y};}static LimitPointToCircle(startPoint,radius,limitedPoint){if(Helper.GetDistanceBetweenTwoPoint(startPoint,limitedPoint)<=radius){return limitedPoint;}const a=startPoint.x;const b=startPoint.y;const n=limitedPoint.x;const m=limitedPoint.y;let x=Math.sqrt(Math.pow(radius,2)*Math.pow(a-n,2)/(Math.pow(a-n,2)+Math.pow(b-m,2)))+a;if(limitedPoint.x<0){x*=-1;}let y=(x-a)*(b-m)/(a-n)+b;if(a-n+b===0){y=radius;}return{x,y};}static GetIntersectBetweenTwoSegment(rectBorder,one,two){return Helper.PointInRect(rectBorder,Helper.GetIntersectBeetwenTwoLine(one,two));}static GetIntersectBeetwenTwoLine(one,two){const A1=one[0].y-one[1].y;const A2=two[0].y-two[1].y;const B1=one[1].x-one[0].x;const B2=two[1].x-two[0].x;const C1=one[0].x*one[1].y-one[1].x*one[0].y;const C2=two[0].x*two[1].y-two[1].x*two[0].y;const det1=A1*C2-A2*C1;const det2=B1*C2-B2*C1;const x=-((C1*B2-C2*B1)/(A1*B2-A2*B1));const y=-((A1*C2-A2*C1)/(A1*B2-A2*B1));if(isFinite(x)&&isFinite(y)){return{x,y};}else{if(Math.abs(det1-det2)<0.1)throw new Error('Segment included');}return null;}static GetCordsFromTwoPoint(pointOne,pointTwo){const sizeX=Math.abs(pointOne.x-pointTwo.x);const sizeY=Math.abs(pointOne.y-pointTwo.y);const lengthLine=Math.max(sizeX,sizeY);const result=[pointOne];function getCord(c1,c2,size,length,index){if(c2>c1){return c1+index*(size/length);}else if(c2<c1){return c1-index*(size/length);}return c1;}for(let i=1;i<=lengthLine;i+=1){result.push({x:getCord(pointOne.x,pointTwo.x,sizeX,lengthLine,i),y:getCord(pointOne.y,pointTwo.y,sizeY,lengthLine,i)});}return result;}}class HTMLPage extends Page{constructor(render,element,density){super(render,density);this.copiedElement=null;this.temporaryCopy=null;this.isLoad=false;this.element=element;this.element.classList.add('stf__item');this.element.classList.add('--'+density);}newTemporaryCopy(){if(this.nowDrawingDensity==="hard"){return this;}if(this.temporaryCopy===null){this.copiedElement=this.element.cloneNode(true);this.element.parentElement.appendChild(this.copiedElement);this.temporaryCopy=new HTMLPage(this.render,this.copiedElement,this.nowDrawingDensity);}return this.getTemporaryCopy();}getTemporaryCopy(){return this.temporaryCopy;}hideTemporaryCopy(){if(this.temporaryCopy!==null){this.copiedElement.remove();this.copiedElement=null;this.temporaryCopy=null;}}draw(tempDensity){const density=tempDensity?tempDensity:this.nowDrawingDensity;const pagePos=this.render.convertToGlobal(this.state.position);const pageWidth=this.render.getRect().pageWidth;const pageHeight=this.render.getRect().height;this.element.classList.remove('--simple');const commonStyle=`
            position: absolute;
            display: block;
            z-index: ${this.element.style.zIndex};
            left: 0;
            top: 0;
            width: ${pageWidth}px;
            height: ${pageHeight}px;
        `;density==="hard"?this.drawHard(commonStyle):this.drawSoft(pagePos,commonStyle);}drawHard(){let commonStyle=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';const pos=this.render.getRect().left+this.render.getRect().width/2;const angle=this.state.hardDrawingAngle;const newStyle=commonStyle+`
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                clip-path: none;
                -webkit-clip-path: none;
            `+(this.orientation===0?`transform-origin: ${this.render.getRect().pageWidth}px 0;
                   transform: translate3d(0, 0, 0) rotateY(${angle}deg);`:`transform-origin: 0 0;
                   transform: translate3d(${pos}px, 0, 0) rotateY(${angle}deg);`);this.element.style.cssText=newStyle;}drawSoft(position){let commonStyle=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';let polygon='polygon( ';for(const p of this.state.area){if(p!==null){let g=this.render.getDirection()===1?{x:-p.x+this.state.position.x,y:p.y-this.state.position.y}:{x:p.x-this.state.position.x,y:p.y-this.state.position.y};g=Helper.GetRotatedPoint(g,{x:0,y:0},this.state.angle);polygon+=g.x+'px '+g.y+'px, ';}}polygon=polygon.slice(0,-2);polygon+=')';const newStyle=commonStyle+`transform-origin: 0 0; clip-path: ${polygon}; -webkit-clip-path: ${polygon};`+(this.render.isSafari()&&this.state.angle===0?`transform: translate(${position.x}px, ${position.y}px);`:`transform: translate3d(${position.x}px, ${position.y}px, 0) rotate(${this.state.angle}rad);`);this.element.style.cssText=newStyle;}simpleDraw(orient){const rect=this.render.getRect();const pageWidth=rect.pageWidth;const pageHeight=rect.height;const x=orient===1?rect.left+rect.pageWidth:rect.left;const y=rect.top;this.element.classList.add('--simple');this.element.style.cssText=`
            position: absolute;
            display: block;
            height: ${pageHeight}px;
            left: ${x}px;
            top: ${y}px;
            width: ${pageWidth}px;
            z-index: ${this.render.getSettings().startZIndex+1};`;}getElement(){return this.element;}load(){this.isLoad=true;}setOrientation(orientation){super.setOrientation(orientation);this.element.classList.remove('--left','--right');this.element.classList.add(orientation===1?'--right':'--left');}setDrawingDensity(density){this.element.classList.remove('--soft','--hard');this.element.classList.add('--'+density);super.setDrawingDensity(density);}}class HTMLPageCollection extends PageCollection{constructor(app,render,element,items){super(app,render);this.element=element;this.pagesElement=items;}load(){for(const pageElement of this.pagesElement){const page=new HTMLPage(this.render,pageElement,pageElement.dataset['density']==='hard'?"hard":"soft");page.load();this.pages.push(page);}this.createSpread();}}class FlipCalculation{constructor(direction,corner,pageWidth,pageHeight){this.direction=direction;this.corner=corner;this.topIntersectPoint=null;this.sideIntersectPoint=null;this.bottomIntersectPoint=null;this.pageWidth=parseInt(pageWidth,10);this.pageHeight=parseInt(pageHeight,10);}calc(localPos){try{this.position=this.calcAngleAndPosition(localPos);this.calculateIntersectPoint(this.position);return true;}catch(e){return false;}}getFlippingClipArea(){const result=[];let clipBottom=false;result.push(this.rect.topLeft);result.push(this.topIntersectPoint);if(this.sideIntersectPoint===null){clipBottom=true;}else{result.push(this.sideIntersectPoint);if(this.bottomIntersectPoint===null)clipBottom=false;}result.push(this.bottomIntersectPoint);if(clipBottom||this.corner==="bottom"){result.push(this.rect.bottomLeft);}return result;}getBottomClipArea(){const result=[];result.push(this.topIntersectPoint);if(this.corner==="top"){result.push({x:this.pageWidth,y:0});}else{if(this.topIntersectPoint!==null){result.push({x:this.pageWidth,y:0});}result.push({x:this.pageWidth,y:this.pageHeight});}if(this.sideIntersectPoint!==null){if(Helper.GetDistanceBetweenTwoPoint(this.sideIntersectPoint,this.topIntersectPoint)>=10)result.push(this.sideIntersectPoint);}else{if(this.corner==="top"){result.push({x:this.pageWidth,y:this.pageHeight});}}result.push(this.bottomIntersectPoint);result.push(this.topIntersectPoint);return result;}getAngle(){if(this.direction===0){return-this.angle;}return this.angle;}getRect(){return this.rect;}getPosition(){return this.position;}getActiveCorner(){if(this.direction===0){return this.rect.topLeft;}return this.rect.topRight;}getDirection(){return this.direction;}getFlippingProgress(){return Math.abs((this.position.x-this.pageWidth)/(2*this.pageWidth)*100);}getCorner(){return this.corner;}getBottomPagePosition(){if(this.direction===1){return{x:this.pageWidth,y:0};}return{x:0,y:0};}getShadowStartPoint(){if(this.corner==="top"){return this.topIntersectPoint;}else{if(this.sideIntersectPoint!==null)return this.sideIntersectPoint;return this.topIntersectPoint;}}getShadowAngle(){const angle=Helper.GetAngleBetweenTwoLine(this.getSegmentToShadowLine(),[{x:0,y:0},{x:this.pageWidth,y:0}]);if(this.direction===0){return angle;}return Math.PI-angle;}calcAngleAndPosition(pos){let result=pos;this.updateAngleAndGeometry(result);if(this.corner==="top"){result=this.checkPositionAtCenterLine(result,{x:0,y:0},{x:0,y:this.pageHeight});}else{result=this.checkPositionAtCenterLine(result,{x:0,y:this.pageHeight},{x:0,y:0});}if(Math.abs(result.x-this.pageWidth)<1&&Math.abs(result.y)<1){throw new Error('Point is too small');}return result;}updateAngleAndGeometry(pos){this.angle=this.calculateAngle(pos);this.rect=this.getPageRect(pos);}calculateAngle(pos){const left=this.pageWidth-pos.x+1;const top=this.corner==="bottom"?this.pageHeight-pos.y:pos.y;let angle=2*Math.acos(left/Math.sqrt(top*top+left*left));if(top<0)angle=-angle;const da=Math.PI-angle;if(!isFinite(angle)||da>=0&&da<0.003)throw new Error('The G point is too small');if(this.corner==="bottom")angle=-angle;return angle;}getPageRect(localPos){if(this.corner==="top"){return this.getRectFromBasePoint([{x:0,y:0},{x:this.pageWidth,y:0},{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}],localPos);}return this.getRectFromBasePoint([{x:0,y:-this.pageHeight},{x:this.pageWidth,y:-this.pageHeight},{x:0,y:0},{x:this.pageWidth,y:0}],localPos);}getRectFromBasePoint(points,localPos){return{topLeft:this.getRotatedPoint(points[0],localPos),topRight:this.getRotatedPoint(points[1],localPos),bottomLeft:this.getRotatedPoint(points[2],localPos),bottomRight:this.getRotatedPoint(points[3],localPos)};}getRotatedPoint(transformedPoint,startPoint){return{x:transformedPoint.x*Math.cos(this.angle)+transformedPoint.y*Math.sin(this.angle)+startPoint.x,y:transformedPoint.y*Math.cos(this.angle)-transformedPoint.x*Math.sin(this.angle)+startPoint.y};}calculateIntersectPoint(pos){const boundRect={left:-1,top:-1,width:this.pageWidth+2,height:this.pageHeight+2};if(this.corner==="top"){this.topIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[pos,this.rect.topRight],[{x:0,y:0},{x:this.pageWidth,y:0}]);this.sideIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[pos,this.rect.bottomLeft],[{x:this.pageWidth,y:0},{x:this.pageWidth,y:this.pageHeight}]);this.bottomIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[this.rect.bottomLeft,this.rect.bottomRight],[{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}]);}else{this.topIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[this.rect.topLeft,this.rect.topRight],[{x:0,y:0},{x:this.pageWidth,y:0}]);this.sideIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[pos,this.rect.topLeft],[{x:this.pageWidth,y:0},{x:this.pageWidth,y:this.pageHeight}]);this.bottomIntersectPoint=Helper.GetIntersectBetweenTwoSegment(boundRect,[this.rect.bottomLeft,this.rect.bottomRight],[{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}]);}}checkPositionAtCenterLine(checkedPos,centerOne,centerTwo){let result=checkedPos;const tmp=Helper.LimitPointToCircle(centerOne,this.pageWidth,result);if(result!==tmp){result=tmp;this.updateAngleAndGeometry(result);}const rad=Math.sqrt(Math.pow(this.pageWidth,2)+Math.pow(this.pageHeight,2));let checkPointOne=this.rect.bottomRight;let checkPointTwo=this.rect.topLeft;if(this.corner==="bottom"){checkPointOne=this.rect.topRight;checkPointTwo=this.rect.bottomLeft;}if(checkPointOne.x<=0){const bottomPoint=Helper.LimitPointToCircle(centerTwo,rad,checkPointTwo);if(bottomPoint!==result){result=bottomPoint;this.updateAngleAndGeometry(result);}}return result;}getSegmentToShadowLine(){const first=this.getShadowStartPoint();const second=first!==this.sideIntersectPoint&&this.sideIntersectPoint!==null?this.sideIntersectPoint:this.bottomIntersectPoint;return[first,second];}}class Flip{constructor(render,app){this.flippingPage=null;this.bottomPage=null;this.calc=null;this.state="read";this.render=render;this.app=app;}fold(globalPos){this.setState("user_fold");if(this.calc===null)this.start(globalPos);this.do(this.render.convertToPage(globalPos));}flip(globalPos){if(this.app.getSettings().disableFlipByClick&&!this.isPointOnCorners(globalPos))return;if(this.calc!==null)this.render.finishAnimation();if(!this.start(globalPos))return;const rect=this.getBoundsRect();this.setState("flipping");const topMargins=rect.height/10;const yStart=this.calc.getCorner()==="bottom"?rect.height-topMargins:topMargins;const yDest=this.calc.getCorner()==="bottom"?rect.height:0;this.calc.calc({x:rect.pageWidth-topMargins,y:yStart});this.animateFlippingTo({x:rect.pageWidth-topMargins,y:yStart},{x:-rect.pageWidth,y:yDest},true);}start(globalPos){this.reset();const bookPos=this.render.convertToBook(globalPos);const rect=this.getBoundsRect();const direction=this.getDirectionByPoint(bookPos);const flipCorner=bookPos.y>=rect.height/2?"bottom":"top";if(!this.checkDirection(direction))return false;try{this.flippingPage=this.app.getPageCollection().getFlippingPage(direction);this.bottomPage=this.app.getPageCollection().getBottomPage(direction);if(this.render.getOrientation()==="landscape"){if(direction===1){const nextPage=this.app.getPageCollection().nextBy(this.flippingPage);if(nextPage!==null){if(this.flippingPage.getDensity()!==nextPage.getDensity()){this.flippingPage.setDrawingDensity("hard");nextPage.setDrawingDensity("hard");}}}else{const prevPage=this.app.getPageCollection().prevBy(this.flippingPage);if(prevPage!==null){if(this.flippingPage.getDensity()!==prevPage.getDensity()){this.flippingPage.setDrawingDensity("hard");prevPage.setDrawingDensity("hard");}}}}this.render.setDirection(direction);this.calc=new FlipCalculation(direction,flipCorner,rect.pageWidth.toString(10),rect.height.toString(10));return true;}catch(e){return false;}}do(pagePos){if(this.calc===null)return;if(this.calc.calc(pagePos)){const progress=this.calc.getFlippingProgress();this.bottomPage.setArea(this.calc.getBottomClipArea());this.bottomPage.setPosition(this.calc.getBottomPagePosition());this.bottomPage.setAngle(0);this.bottomPage.setHardAngle(0);this.flippingPage.setArea(this.calc.getFlippingClipArea());this.flippingPage.setPosition(this.calc.getActiveCorner());this.flippingPage.setAngle(this.calc.getAngle());if(this.calc.getDirection()===0){this.flippingPage.setHardAngle(90*(200-progress*2)/100);}else{this.flippingPage.setHardAngle(-90*(200-progress*2)/100);}this.render.setPageRect(this.calc.getRect());this.render.setBottomPage(this.bottomPage);this.render.setFlippingPage(this.flippingPage);this.render.setShadowData(this.calc.getShadowStartPoint(),this.calc.getShadowAngle(),progress,this.calc.getDirection());}}flipToPage(page,corner){const current=this.app.getPageCollection().getCurrentSpreadIndex();const next=this.app.getPageCollection().getSpreadIndexByPage(page);try{if(next>current){this.app.getPageCollection().setCurrentSpreadIndex(next-1);this.flipNext(corner);}if(next<current){this.app.getPageCollection().setCurrentSpreadIndex(next+1);this.flipPrev(corner);}}catch(e){}}flipNext(corner){this.flip({x:this.render.getRect().left+this.render.getRect().pageWidth*2-10,y:corner==="top"?1:this.render.getRect().height-2});}flipPrev(corner){this.flip({x:10,y:corner==="top"?1:this.render.getRect().height-2});}stopMove(){if(this.calc===null)return;const pos=this.calc.getPosition();const rect=this.getBoundsRect();const y=this.calc.getCorner()==="bottom"?rect.height:0;if(pos.x<=0)this.animateFlippingTo(pos,{x:-rect.pageWidth,y},true);else this.animateFlippingTo(pos,{x:rect.pageWidth,y},false);}showCorner(globalPos){if(!this.checkState("read","fold_corner"))return;const rect=this.getBoundsRect();const pageWidth=rect.pageWidth;if(this.isPointOnCorners(globalPos)){if(this.calc===null){if(!this.start(globalPos))return;this.setState("fold_corner");this.calc.calc({x:pageWidth-1,y:1});const fixedCornerSize=50;const yStart=this.calc.getCorner()==="bottom"?rect.height-1:1;const yDest=this.calc.getCorner()==="bottom"?rect.height-fixedCornerSize:fixedCornerSize;this.animateFlippingTo({x:pageWidth-1,y:yStart},{x:pageWidth-fixedCornerSize,y:yDest},false,false);}else{this.do(this.render.convertToPage(globalPos));}}else{this.setState("read");this.render.finishAnimation();this.stopMove();}}animateFlippingTo(start,dest,isTurned){let needReset=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;const points=Helper.GetCordsFromTwoPoint(start,dest);const frames=[];for(const p of points)frames.push(()=>this.do(p));const duration=this.getAnimationDuration(points.length);this.render.startAnimation(frames,duration,()=>{if(!this.calc)return;if(isTurned){if(this.calc.getDirection()===1)this.app.turnToPrevPage();else this.app.turnToNextPage();}if(needReset){this.render.setBottomPage(null);this.render.setFlippingPage(null);this.render.clearShadow();this.setState("read");this.reset();}});}getCalculation(){return this.calc;}getState(){return this.state;}setState(newState){if(this.state!==newState){this.app.updateState(newState);this.state=newState;}}getDirectionByPoint(touchPos){const rect=this.getBoundsRect();if(this.render.getOrientation()==="portrait"){if(touchPos.x-rect.pageWidth<=rect.width/5){return 1;}}else if(touchPos.x<rect.width/2){return 1;}return 0;}getAnimationDuration(size){const defaultTime=this.app.getSettings().flippingTime;if(size>=1000)return defaultTime;return size/1000*defaultTime;}checkDirection(direction){if(direction===0)return this.app.getCurrentPageIndex()<this.app.getPageCount()-1;return this.app.getCurrentPageIndex()>=1;}reset(){this.calc=null;this.flippingPage=null;this.bottomPage=null;}getBoundsRect(){return this.render.getRect();}checkState(){for(var _len=arguments.length,states=new Array(_len),_key=0;_key<_len;_key++){states[_key]=arguments[_key];}for(const state of states){if(this.state===state)return true;}return false;}isPointOnCorners(globalPos){const rect=this.getBoundsRect();const pageWidth=rect.pageWidth;const operatingDistance=Math.sqrt(Math.pow(pageWidth,2)+Math.pow(rect.height,2))/5;const bookPos=this.render.convertToBook(globalPos);return bookPos.x>0&&bookPos.y>0&&bookPos.x<rect.width&&bookPos.y<rect.height&&(bookPos.x<operatingDistance||bookPos.x>rect.width-operatingDistance)&&(bookPos.y<operatingDistance||bookPos.y>rect.height-operatingDistance);}}class Render{constructor(app,setting){this.leftPage=null;this.rightPage=null;this.flippingPage=null;this.bottomPage=null;this.direction=null;this.orientation=null;this.shadow=null;this.animation=null;this.pageRect=null;this.boundsRect=null;this.timer=0;this.safari=false;this.setting=setting;this.app=app;const regex=new RegExp('Version\\/[\\d\\.]+.*Safari/');this.safari=regex.exec(window.navigator.userAgent)!==null;}render(timer){if(this.animation!==null){const frameIndex=Math.round((timer-this.animation.startedAt)/this.animation.durationFrame);if(frameIndex<this.animation.frames.length){this.animation.frames[frameIndex]();}else{this.animation.onAnimateEnd();this.animation=null;}}this.timer=timer;this.drawFrame();}start(){this.update();const loop=timer=>{window.ngxZone.runOutsideAngular(()=>{this.render(timer);requestAnimationFrame(loop);});};window.ngxZone.runOutsideAngular(()=>{requestAnimationFrame(loop);});}startAnimation(frames,duration,onAnimateEnd){this.finishAnimation();this.animation={frames,duration,durationFrame:duration/frames.length,onAnimateEnd,startedAt:this.timer};}finishAnimation(){if(this.animation!==null){this.animation.frames[this.animation.frames.length-1]();if(this.animation.onAnimateEnd!==null){this.animation.onAnimateEnd();}}this.animation=null;}update(){this.boundsRect=null;const orientation=this.calculateBoundsRect();if(this.orientation!==orientation){this.orientation=orientation;this.app.updateOrientation(orientation);}}calculateBoundsRect(){let orientation="landscape";const blockWidth=this.getBlockWidth();const middlePoint={x:blockWidth/2,y:this.getBlockHeight()/2};const ratio=this.setting.width/this.setting.height;let pageWidth=this.setting.width;let pageHeight=this.setting.height;let left=middlePoint.x-pageWidth;if(this.setting.size==="stretch"){if(blockWidth<this.setting.minWidth*2&&this.app.getSettings().usePortrait)orientation="portrait";pageWidth=orientation==="portrait"?this.getBlockWidth():this.getBlockWidth()/2;if(pageWidth>this.setting.maxWidth)pageWidth=this.setting.maxWidth;pageHeight=pageWidth/ratio;if(pageHeight>this.getBlockHeight()){pageHeight=this.getBlockHeight();pageWidth=pageHeight*ratio;}left=orientation==="portrait"?middlePoint.x-pageWidth/2-pageWidth:middlePoint.x-pageWidth;}else{if(blockWidth<pageWidth*2){if(this.app.getSettings().usePortrait){orientation="portrait";left=middlePoint.x-pageWidth/2-pageWidth;}}}this.boundsRect={left,top:middlePoint.y-pageHeight/2,width:pageWidth*2,height:pageHeight,pageWidth:pageWidth};return orientation;}setShadowData(pos,angle,progress,direction){if(!this.app.getSettings().drawShadow)return;const maxShadowOpacity=100*this.getSettings().maxShadowOpacity;this.shadow={pos,angle,width:this.getRect().pageWidth*3/4*progress/100,opacity:(100-progress)*maxShadowOpacity/100/100,direction,progress:progress*2};}clearShadow(){this.shadow=null;}getBlockWidth(){return this.app.getUI().getDistElement().offsetWidth;}getBlockHeight(){return this.app.getUI().getDistElement().offsetHeight;}getDirection(){return this.direction;}getRect(){if(this.boundsRect===null)this.calculateBoundsRect();return this.boundsRect;}getSettings(){return this.app.getSettings();}getOrientation(){return this.orientation;}setPageRect(pageRect){this.pageRect=pageRect;}setDirection(direction){this.direction=direction;}setRightPage(page){if(page!==null)page.setOrientation(1);this.rightPage=page;}setLeftPage(page){if(page!==null)page.setOrientation(0);this.leftPage=page;}setBottomPage(page){if(page!==null)page.setOrientation(this.direction===1?0:1);this.bottomPage=page;}setFlippingPage(page){if(page!==null)page.setOrientation(this.direction===0&&this.orientation!=="portrait"?0:1);this.flippingPage=page;}convertToBook(pos){const rect=this.getRect();return{x:pos.x-rect.left,y:pos.y-rect.top};}isSafari(){return this.safari;}convertToPage(pos,direction){if(!direction)direction=this.direction;const rect=this.getRect();const x=direction===0?pos.x-rect.left-rect.width/2:rect.width/2-pos.x+rect.left;return{x,y:pos.y-rect.top};}convertToGlobal(pos,direction){if(!direction)direction=this.direction;if(pos==null)return null;const rect=this.getRect();const x=direction===0?pos.x+rect.left+rect.width/2:rect.width/2-pos.x+rect.left;return{x,y:pos.y+rect.top};}convertRectToGlobal(rect,direction){if(!direction)direction=this.direction;return{topLeft:this.convertToGlobal(rect.topLeft,direction),topRight:this.convertToGlobal(rect.topRight,direction),bottomLeft:this.convertToGlobal(rect.bottomLeft,direction),bottomRight:this.convertToGlobal(rect.bottomRight,direction)};}}class CanvasRender extends Render{constructor(app,setting,inCanvas){super(app,setting);this.canvas=inCanvas;const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true}:undefined;const ctx=canvas.getContext("2d",options);}getContext(){return this.ctx;}reload(){}drawFrame(){this.clear();if(this.orientation!=="portrait")if(this.leftPage!=null)this.leftPage.simpleDraw(0);if(this.rightPage!=null)this.rightPage.simpleDraw(1);if(this.bottomPage!=null)this.bottomPage.draw();this.drawBookShadow();if(this.flippingPage!=null)this.flippingPage.draw();if(this.shadow!=null){this.drawOuterShadow();this.drawInnerShadow();}const rect=this.getRect();if(this.orientation==="portrait"){this.ctx.beginPath();this.ctx.rect(rect.left+rect.pageWidth,rect.top,rect.width,rect.height);this.ctx.clip();}}drawBookShadow(){const rect=this.getRect();this.ctx.save();this.ctx.beginPath();const shadowSize=rect.width/20;this.ctx.rect(rect.left,rect.top,rect.width,rect.height);const shadowPos={x:rect.left+rect.width/2-shadowSize/2,y:0};this.ctx.translate(shadowPos.x,shadowPos.y);const outerGradient=this.ctx.createLinearGradient(0,0,shadowSize,0);outerGradient.addColorStop(0,'rgba(0, 0, 0, 0)');outerGradient.addColorStop(0.4,'rgba(0, 0, 0, 0.2)');outerGradient.addColorStop(0.49,'rgba(0, 0, 0, 0.1)');outerGradient.addColorStop(0.5,'rgba(0, 0, 0, 0.5)');outerGradient.addColorStop(0.51,'rgba(0, 0, 0, 0.4)');outerGradient.addColorStop(1,'rgba(0, 0, 0, 0)');this.ctx.clip();this.ctx.fillStyle=outerGradient;this.ctx.fillRect(0,0,shadowSize,rect.height*2);this.ctx.restore();}drawOuterShadow(){const rect=this.getRect();this.ctx.save();this.ctx.beginPath();this.ctx.rect(rect.left,rect.top,rect.width,rect.height);const shadowPos=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y});this.ctx.translate(shadowPos.x,shadowPos.y);this.ctx.rotate(Math.PI+this.shadow.angle+Math.PI/2);const outerGradient=this.ctx.createLinearGradient(0,0,this.shadow.width,0);if(this.shadow.direction===0){this.ctx.translate(0,-100);outerGradient.addColorStop(0,'rgba(0, 0, 0, '+this.shadow.opacity+')');outerGradient.addColorStop(1,'rgba(0, 0, 0, 0)');}else{this.ctx.translate(-this.shadow.width,-100);outerGradient.addColorStop(0,'rgba(0, 0, 0, 0)');outerGradient.addColorStop(1,'rgba(0, 0, 0, '+this.shadow.opacity+')');}this.ctx.clip();this.ctx.fillStyle=outerGradient;this.ctx.fillRect(0,0,this.shadow.width,rect.height*2);this.ctx.restore();}drawInnerShadow(){const rect=this.getRect();this.ctx.save();this.ctx.beginPath();const shadowPos=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y});const pageRect=this.convertRectToGlobal(this.pageRect);this.ctx.moveTo(pageRect.topLeft.x,pageRect.topLeft.y);this.ctx.lineTo(pageRect.topRight.x,pageRect.topRight.y);this.ctx.lineTo(pageRect.bottomRight.x,pageRect.bottomRight.y);this.ctx.lineTo(pageRect.bottomLeft.x,pageRect.bottomLeft.y);this.ctx.translate(shadowPos.x,shadowPos.y);this.ctx.rotate(Math.PI+this.shadow.angle+Math.PI/2);const isw=this.shadow.width*3/4;const innerGradient=this.ctx.createLinearGradient(0,0,isw,0);if(this.shadow.direction===0){this.ctx.translate(-isw,-100);innerGradient.addColorStop(1,'rgba(0, 0, 0, '+this.shadow.opacity+')');innerGradient.addColorStop(0.9,'rgba(0, 0, 0, 0.05)');innerGradient.addColorStop(0.7,'rgba(0, 0, 0, '+this.shadow.opacity+')');innerGradient.addColorStop(0,'rgba(0, 0, 0, 0)');}else{this.ctx.translate(0,-100);innerGradient.addColorStop(0,'rgba(0, 0, 0, '+this.shadow.opacity+')');innerGradient.addColorStop(0.1,'rgba(0, 0, 0, 0.05)');innerGradient.addColorStop(0.3,'rgba(0, 0, 0, '+this.shadow.opacity+')');innerGradient.addColorStop(1,'rgba(0, 0, 0, 0)');}this.ctx.clip();this.ctx.fillStyle=innerGradient;this.ctx.fillRect(0,0,isw,rect.height*2);this.ctx.restore();}clear(){this.ctx.fillStyle='white';this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);}}class UI{constructor(inBlock,app,setting){this.touchPoint=null;this.swipeTimeout=250;this.onResize=()=>{this.update();};this.onMouseDown=e=>{if(this.checkTarget(e.target)){const pos=this.getMousePos(e.clientX,e.clientY);this.app.startUserTouch(pos);e.preventDefault();}};this.onTouchStart=e=>{if(this.checkTarget(e.target)){if(e.changedTouches.length>0){const t=e.changedTouches[0];const pos=this.getMousePos(t.clientX,t.clientY);this.touchPoint={point:pos,time:Date.now()};setTimeout(()=>{if(this.touchPoint!==null){this.app.startUserTouch(pos);}},this.swipeTimeout);if(!this.app.getSettings().mobileScrollSupport)e.preventDefault();}}};this.onMouseUp=e=>{const pos=this.getMousePos(e.clientX,e.clientY);this.app.userStop(pos);};this.onMouseMove=e=>{const pos=this.getMousePos(e.clientX,e.clientY);this.app.userMove(pos,false);};this.onTouchMove=e=>{if(e.changedTouches.length>0){const t=e.changedTouches[0];const pos=this.getMousePos(t.clientX,t.clientY);if(this.app.getSettings().mobileScrollSupport){if(this.touchPoint!==null){if(Math.abs(this.touchPoint.point.x-pos.x)>10||this.app.getState()!=="read"){if(e.cancelable)this.app.userMove(pos,true);}}if(this.app.getState()!=="read"){e.preventDefault();}}else{this.app.userMove(pos,true);}}};this.onTouchEnd=e=>{if(e.changedTouches.length>0){const t=e.changedTouches[0];const pos=this.getMousePos(t.clientX,t.clientY);let isSwipe=false;if(this.touchPoint!==null){const dx=pos.x-this.touchPoint.point.x;const distY=Math.abs(pos.y-this.touchPoint.point.y);if(Math.abs(dx)>this.swipeDistance&&distY<this.swipeDistance*2&&Date.now()-this.touchPoint.time<this.swipeTimeout){if(dx>0){this.app.flipPrev(this.touchPoint.point.y<this.app.getRender().getRect().height/2?"top":"bottom");}else{this.app.flipNext(this.touchPoint.point.y<this.app.getRender().getRect().height/2?"top":"bottom");}isSwipe=true;}this.touchPoint=null;}this.app.userStop(pos,isSwipe);}};this.parentElement=inBlock;inBlock.classList.add('stf__parent');inBlock.insertAdjacentHTML('afterbegin','<div class="stf__wrapper"></div>');this.wrapper=inBlock.querySelector('.stf__wrapper');this.app=app;const k=this.app.getSettings().usePortrait?1:2;inBlock.style.minWidth=setting.minWidth*k+'px';inBlock.style.minHeight=setting.minHeight+'px';if(setting.size==="fixed"){inBlock.style.minWidth=setting.width*k+'px';inBlock.style.minHeight=setting.height+'px';}if(setting.autoSize){inBlock.style.width='100%';inBlock.style.maxWidth=setting.maxWidth*2+'px';}inBlock.style.display='block';window.addEventListener('resize',this.onResize,false);this.swipeDistance=setting.swipeDistance;}destroy(){if(this.app.getSettings().useMouseEvents)this.removeHandlers();this.distElement.remove();this.wrapper.remove();}getDistElement(){return this.distElement;}getWrapper(){return this.wrapper;}setOrientationStyle(orientation){this.wrapper.classList.remove('--portrait','--landscape');if(orientation==="portrait"){if(this.app.getSettings().autoSize)this.wrapper.style.paddingBottom=this.app.getSettings().height/this.app.getSettings().width*100+'%';this.wrapper.classList.add('--portrait');}else{if(this.app.getSettings().autoSize)this.wrapper.style.paddingBottom=this.app.getSettings().height/(this.app.getSettings().width*2)*100+'%';this.wrapper.classList.add('--landscape');}this.update();}removeHandlers(){window.removeEventListener('resize',this.onResize);this.distElement.removeEventListener('mousedown',this.onMouseDown);this.distElement.removeEventListener('touchstart',this.onTouchStart);window.removeEventListener('mousemove',this.onMouseMove);window.removeEventListener('touchmove',this.onTouchMove);window.removeEventListener('mouseup',this.onMouseUp);window.removeEventListener('touchend',this.onTouchEnd);}setHandlers(){window.addEventListener('resize',this.onResize,false);if(!this.app.getSettings().useMouseEvents)return;this.distElement.addEventListener('mousedown',this.onMouseDown);this.distElement.addEventListener('touchstart',this.onTouchStart);window.addEventListener('mousemove',this.onMouseMove);window.addEventListener('touchmove',this.onTouchMove,{passive:!this.app.getSettings().mobileScrollSupport});window.addEventListener('mouseup',this.onMouseUp);window.addEventListener('touchend',this.onTouchEnd);}getMousePos(x,y){const rect=this.distElement.getBoundingClientRect();return{x:x-rect.left,y:y-rect.top};}checkTarget(targer){if(!this.app.getSettings().clickEventForward)return true;if(['a','button'].includes(targer.tagName.toLowerCase())){return false;}return true;}}class HTMLUI extends UI{constructor(inBlock,app,setting,items){super(inBlock,app,setting);this.wrapper.insertAdjacentHTML('afterbegin','<div class="stf__block"></div>');this.distElement=inBlock.querySelector('.stf__block');this.items=items;for(const item of items){this.distElement.appendChild(item);}this.setHandlers();}clear(){for(const item of this.items){this.parentElement.appendChild(item);}}updateItems(items){this.removeHandlers();this.distElement.innerHTML='';for(const item of items){this.distElement.appendChild(item);}this.items=items;this.setHandlers();}update(){this.app.getRender().update();}}class CanvasUI extends UI{constructor(inBlock,app,setting){super(inBlock,app,setting);this.wrapper.innerHTML='<canvas class="stf__canvas"></canvas>';this.canvas=inBlock.querySelectorAll('canvas')[0];this.distElement=this.canvas;this.resizeCanvas();this.setHandlers();}resizeCanvas(){const cs=getComputedStyle(this.canvas);const width=parseInt(cs.getPropertyValue('width'),10);const height=parseInt(cs.getPropertyValue('height'),10);this.canvas.width=width;this.canvas.height=height;}getCanvas(){return this.canvas;}update(){this.resizeCanvas();this.app.getRender().update();}}class EventObject{constructor(){this.events=new Map();}on(eventName,callback){if(!this.events.has(eventName)){this.events.set(eventName,[callback]);}else{this.events.get(eventName).push(callback);}return this;}off(event){this.events.delete(event);}trigger(eventName,app){let data=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!this.events.has(eventName))return;for(const callback of this.events.get(eventName)){callback({data,object:app});}}}class HTMLRender extends Render{constructor(app,setting,element){super(app,setting);this.outerShadow=null;this.innerShadow=null;this.hardShadow=null;this.hardInnerShadow=null;this.element=element;this.createShadows();}createShadows(){this.element.insertAdjacentHTML('beforeend',`<div class="stf__outerShadow"></div>
             <div class="stf__innerShadow"></div>
             <div class="stf__hardShadow"></div>
             <div class="stf__hardInnerShadow"></div>`);this.outerShadow=this.element.querySelector('.stf__outerShadow');this.innerShadow=this.element.querySelector('.stf__innerShadow');this.hardShadow=this.element.querySelector('.stf__hardShadow');this.hardInnerShadow=this.element.querySelector('.stf__hardInnerShadow');}clearShadow(){super.clearShadow();this.outerShadow.style.cssText='display: none';this.innerShadow.style.cssText='display: none';this.hardShadow.style.cssText='display: none';this.hardInnerShadow.style.cssText='display: none';}reload(){const testShadow=this.element.querySelector('.stf__outerShadow');if(!testShadow){this.createShadows();}}drawHardInnerShadow(){const rect=this.getRect();const progress=this.shadow.progress>100?200-this.shadow.progress:this.shadow.progress;let innerShadowSize=(100-progress)*(2.5*rect.pageWidth)/100+20;if(innerShadowSize>rect.pageWidth)innerShadowSize=rect.pageWidth;let newStyle=`
            display: block;
            z-index: ${(this.getSettings().startZIndex+5).toString(10)};
            width: ${innerShadowSize}px;
            height: ${rect.height}px;
            background: linear-gradient(to right,
                rgba(0, 0, 0, ${this.shadow.opacity*progress/100}) 5%,
                rgba(0, 0, 0, 0) 100%);
            left: ${rect.left+rect.width/2}px;
            transform-origin: 0 0;
        `;newStyle+=this.getDirection()===0&&this.shadow.progress>100||this.getDirection()===1&&this.shadow.progress<=100?`transform: translate3d(0, 0, 0);`:`transform: translate3d(0, 0, 0) rotateY(180deg);`;this.hardInnerShadow.style.cssText=newStyle;}drawHardOuterShadow(){const rect=this.getRect();const progress=this.shadow.progress>100?200-this.shadow.progress:this.shadow.progress;let shadowSize=(100-progress)*(2.5*rect.pageWidth)/100+20;if(shadowSize>rect.pageWidth)shadowSize=rect.pageWidth;let newStyle=`
            display: block;
            z-index: ${(this.getSettings().startZIndex+4).toString(10)};
            width: ${shadowSize}px;
            height: ${rect.height}px;
            background: linear-gradient(to left, rgba(0, 0, 0, ${this.shadow.opacity}) 5%, rgba(0, 0, 0, 0) 100%);
            left: ${rect.left+rect.width/2}px;
            transform-origin: 0 0;
        `;newStyle+=this.getDirection()===0&&this.shadow.progress>100||this.getDirection()===1&&this.shadow.progress<=100?`transform: translate3d(0, 0, 0) rotateY(180deg);`:`transform: translate3d(0, 0, 0);`;this.hardShadow.style.cssText=newStyle;}drawInnerShadow(){const rect=this.getRect();const innerShadowSize=this.shadow.width*3/4;const shadowTranslate=this.getDirection()===0?innerShadowSize:0;const shadowDirection=this.getDirection()===0?'to left':'to right';const shadowPos=this.convertToGlobal(this.shadow.pos);const angle=this.shadow.angle+3*Math.PI/2;const clip=[this.pageRect.topLeft,this.pageRect.topRight,this.pageRect.bottomRight,this.pageRect.bottomLeft];let polygon='polygon( ';for(const p of clip){let g=this.getDirection()===1?{x:-p.x+this.shadow.pos.x,y:p.y-this.shadow.pos.y}:{x:p.x-this.shadow.pos.x,y:p.y-this.shadow.pos.y};g=Helper.GetRotatedPoint(g,{x:shadowTranslate,y:100},angle);polygon+=g.x+'px '+g.y+'px, ';}polygon=polygon.slice(0,-2);polygon+=')';const newStyle=`
            display: block;
            z-index: ${(this.getSettings().startZIndex+10).toString(10)};
            width: ${innerShadowSize}px;
            height: ${rect.height*2}px;
            background: linear-gradient(${shadowDirection},
                rgba(0, 0, 0, ${this.shadow.opacity}) 5%,
                rgba(0, 0, 0, 0.05) 15%,
                rgba(0, 0, 0, ${this.shadow.opacity}) 35%,
                rgba(0, 0, 0, 0) 100%);
            transform-origin: ${shadowTranslate}px 100px;
            transform: translate3d(${shadowPos.x-shadowTranslate}px, ${shadowPos.y-100}px, 0) rotate(${angle}rad);
            clip-path: ${polygon};
            -webkit-clip-path: ${polygon};
        `;this.innerShadow.style.cssText=newStyle;}drawOuterShadow(){const rect=this.getRect();const shadowPos=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y});const angle=this.shadow.angle+3*Math.PI/2;const shadowTranslate=this.getDirection()===1?this.shadow.width:0;const shadowDirection=this.getDirection()===0?'to right':'to left';const clip=[{x:0,y:0},{x:rect.pageWidth,y:0},{x:rect.pageWidth,y:rect.height},{x:0,y:rect.height}];let polygon='polygon( ';for(const p of clip){if(p!==null){let g=this.getDirection()===1?{x:-p.x+this.shadow.pos.x,y:p.y-this.shadow.pos.y}:{x:p.x-this.shadow.pos.x,y:p.y-this.shadow.pos.y};g=Helper.GetRotatedPoint(g,{x:shadowTranslate,y:100},angle);polygon+=g.x+'px '+g.y+'px, ';}}polygon=polygon.slice(0,-2);polygon+=')';const newStyle=`
            display: block;
            z-index: ${(this.getSettings().startZIndex+10).toString(10)};
            width: ${this.shadow.width}px;
            height: ${rect.height*2}px;
            background: linear-gradient(${shadowDirection}, rgba(0, 0, 0, ${this.shadow.opacity}), rgba(0, 0, 0, 0));
            transform-origin: ${shadowTranslate}px 100px;
            transform: translate3d(${shadowPos.x-shadowTranslate}px, ${shadowPos.y-100}px, 0) rotate(${angle}rad);
            clip-path: ${polygon};
            -webkit-clip-path: ${polygon};
        `;this.outerShadow.style.cssText=newStyle;}drawLeftPage(){if(this.orientation==="portrait"||this.leftPage===null)return;if(this.direction===1&&this.flippingPage!==null&&this.flippingPage.getDrawingDensity()==="hard"){const angle=this.flippingPage.getHardAngle();if(angle<-90){this.leftPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10);this.leftPage.setHardDrawingAngle(180+this.flippingPage.getHardAngle());this.leftPage.draw(this.flippingPage.getDrawingDensity());}else{this.leftPage.getElement().style.display="none";}}else{this.leftPage.simpleDraw(0);}}drawRightPage(){if(this.rightPage===null)return;if(this.direction===0&&this.flippingPage!==null&&this.flippingPage.getDrawingDensity()==="hard"){const angle=this.flippingPage.getHardAngle();if(angle>90){this.rightPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10);this.rightPage.setHardDrawingAngle(180+this.flippingPage.getHardAngle());this.rightPage.draw(this.flippingPage.getDrawingDensity());}else{this.rightPage.getElement().style.display="none";}}else{this.rightPage.simpleDraw(1);}}drawBottomPage(){if(this.bottomPage===null)return;const tempDensity=this.flippingPage!=null?this.flippingPage.getDrawingDensity():null;if(!(this.orientation==="portrait"&&this.direction===1)){this.bottomPage.getElement().style.zIndex=(this.getSettings().startZIndex+3).toString(10);this.bottomPage.draw(tempDensity);}}drawFrame(){if(this.flippingPage!==null){if(this.flippingPage.getHardAngle()===this.lastAngle){return;}this.lastAngle=this.flippingPage.getHardAngle();}else{this.lastAngle=-1234;}this.clear();this.drawLeftPage();this.drawRightPage();this.drawBottomPage();if(this.flippingPage!=null){const angle=this.flippingPage.state.hardDrawingAngle;if(angle<=90){this.flippingPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10);this.flippingPage.draw();}else{this.flippingPage.getElement().style.display="none";}}if(this.shadow!=null&&this.flippingPage!==null){if(this.flippingPage.getDrawingDensity()==="soft"){this.drawOuterShadow();this.drawInnerShadow();}else{this.drawHardOuterShadow();this.drawHardInnerShadow();}}}clear(){for(const page of this.app.getPageCollection().getPages()){if(page!==this.leftPage&&page!==this.rightPage&&page!==this.flippingPage&&page!==this.bottomPage){const style=page.getElement().style;if(style.display!=='none'){style.cssText='display: none';}}if(page.getTemporaryCopy()!==this.flippingPage){page.hideTemporaryCopy();}}}update(){super.update();if(this.rightPage!==null){this.rightPage.setOrientation(1);}if(this.leftPage!==null){this.leftPage.setOrientation(0);}}}class Settings{constructor(){this._default={startPage:0,size:"fixed",width:0,height:0,minWidth:0,maxWidth:0,minHeight:0,maxHeight:0,drawShadow:true,flippingTime:1000,usePortrait:true,startZIndex:0,autoSize:true,maxShadowOpacity:1,showCover:false,mobileScrollSupport:true,swipeDistance:30,clickEventForward:true,useMouseEvents:true,showPageCorners:true,disableFlipByClick:false};}getSettings(userSetting){const result=this._default;Object.assign(result,userSetting);if(result.size!=="stretch"&&result.size!=="fixed")throw new Error('Invalid size type. Available only "fixed" and "stretch" value');if(result.width<=0||result.height<=0)throw new Error('Invalid width or height');if(result.flippingTime<=0)throw new Error('Invalid flipping time');if(result.size==="stretch"){if(result.minWidth<=0)result.minWidth=100;if(result.maxWidth<result.minWidth)result.maxWidth=2000;if(result.minHeight<=0)result.minHeight=100;if(result.maxHeight<result.minHeight)result.maxHeight=2000;}else{result.minWidth=result.width;result.maxWidth=result.width;result.minHeight=result.height;result.maxHeight=result.height;}return result;}}function styleInject(css,ref){if(ref===void 0)ref={};var insertAt=ref.insertAt;if(!css||typeof document==='undefined'){return;}var head=document.head||document.getElementsByTagName('head')[0];var style=document.createElement('style');style.type='text/css';if(insertAt==='top'){if(head.firstChild){head.insertBefore(style,head.firstChild);}else{head.appendChild(style);}}else{head.appendChild(style);}if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}}var css_248z=".stf__parent {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  transform: translateZ(0);\n\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n\n.sft__wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.stf__parent canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n\n.stf__block {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  perspective: 2000px;\n}\n\n.stf__item {\n  display: none;\n  position: absolute;\n  transform-style: preserve-3d;\n}\n\n.stf__outerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__innerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardInnerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}";styleInject(css_248z);class PageFlip extends EventObject{constructor(inBlock,setting){super();this.isUserTouch=false;this.isUserMove=false;this.setting=null;this.pages=null;this.setting=new Settings().getSettings(setting);this.block=inBlock;}destroy(){this.ui.destroy();}update(){this.render.update();this.pages.show();}loadFromImages(imagesHref){this.ui=new CanvasUI(this.block,this,this.setting);const canvas=this.ui.getCanvas();this.render=new CanvasRender(this,this.setting,canvas);this.flipController=new Flip(this.render,this);this.pages=new ImagePageCollection(this,this.render,imagesHref);this.pages.load();this.render.start();this.pages.show(this.setting.startPage);setTimeout(()=>{this.ui.update();this.trigger('init',this,{page:this.setting.startPage,mode:this.render.getOrientation()});},1);}loadFromHTML(items){this.ui=new HTMLUI(this.block,this,this.setting,items);this.render=new HTMLRender(this,this.setting,this.ui.getDistElement());this.flipController=new Flip(this.render,this);this.pages=new HTMLPageCollection(this,this.render,this.ui.getDistElement(),items);this.pages.load();this.render.start();this.pages.show(this.setting.startPage);setTimeout(()=>{this.ui.update();this.trigger('init',this,{page:this.setting.startPage,mode:this.render.getOrientation()});},1);}updateFromImages(imagesHref){const current=this.pages.getCurrentPageIndex();this.pages.destroy();this.pages=new ImagePageCollection(this,this.render,imagesHref);this.pages.load();this.pages.show(current);this.trigger('update',this,{page:current,mode:this.render.getOrientation()});}updateFromHtml(items){const current=this.pages.getCurrentPageIndex();this.pages.destroy();this.pages=new HTMLPageCollection(this,this.render,this.ui.getDistElement(),items);this.pages.load();this.ui.updateItems(items);this.render.reload();this.pages.show(current);this.trigger('update',this,{page:current,mode:this.render.getOrientation()});}clear(){this.pages.destroy();this.ui.clear();}turnToPrevPage(){this.pages.showPrev();}turnToNextPage(){this.pages.showNext();}turnToPage(page){this.pages.show(page);}flipNext(){let corner=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"top";this.flipController.flipNext(corner);}flipPrev(){let corner=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"top";this.flipController.flipPrev(corner);}flip(page){let corner=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"top";this.flipController.flipToPage(page,corner);}updateState(newState){this.trigger('changeState',this,newState);}updatePageIndex(newPage){this.trigger('flip',this,newPage);}updateOrientation(newOrientation){this.ui.setOrientationStyle(newOrientation);this.update();this.trigger('changeOrientation',this,newOrientation);}getPageCount(){return this.pages.getPageCount();}getCurrentPageIndex(){return this.pages.getCurrentPageIndex();}getPage(pageIndex){return this.pages.getPage(pageIndex);}getRender(){return this.render;}getFlipController(){return this.flipController;}getOrientation(){return this.render.getOrientation();}getBoundsRect(){return this.render.getRect();}getSettings(){return this.setting;}getUI(){return this.ui;}getState(){return this.flipController.getState();}getPageCollection(){return this.pages;}startUserTouch(pos){this.mousePosition=pos;this.isUserTouch=true;this.isUserMove=false;}userMove(pos,isTouch){if(!this.isUserTouch&&!isTouch&&this.setting.showPageCorners){this.flipController.showCorner(pos);}else if(this.isUserTouch){if(Helper.GetDistanceBetweenTwoPoint(this.mousePosition,pos)>5){this.isUserMove=true;this.flipController.fold(pos);}}}userStop(pos){let isSwipe=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(this.isUserTouch){this.isUserTouch=false;if(!isSwipe){if(!this.isUserMove)this.flipController.flip(pos);else this.flipController.stopMove();}}}}exports.PageFlip=PageFlip;

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFPageView=void 0;var _pdfjsLib=__webpack_require__(4);var _ui_utils=__webpack_require__(3);var _annotation_editor_layer_builder=__webpack_require__(36);var _annotation_layer_builder=__webpack_require__(37);var _app_options=__webpack_require__(5);var _l10n_utils=__webpack_require__(33);var _pdf_link_service=__webpack_require__(7);var _struct_tree_layer_builder=__webpack_require__(38);var _text_accessibility=__webpack_require__(39);var _canvasSize=_interopRequireDefault(__webpack_require__(40));var _util=__webpack_require__(41);var _text_highlighter=__webpack_require__(177);var _text_layer_builder=__webpack_require__(178);var _xfa_layer_builder=__webpack_require__(179);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}const MAX_CANVAS_PIXELS=_app_options.compatibilityParams.maxCanvasPixels||16777216;const DEFAULT_LAYER_PROPERTIES=()=>{return null;};var _annotationMode=/*#__PURE__*/new WeakMap();var _layerProperties=/*#__PURE__*/new WeakMap();var _loadingId=/*#__PURE__*/new WeakMap();var _previousRotation=/*#__PURE__*/new WeakMap();var _renderingState=/*#__PURE__*/new WeakMap();var _useThumbnailCanvas=/*#__PURE__*/new WeakMap();var _setDimensions=/*#__PURE__*/new WeakSet();var _renderAnnotationLayer=/*#__PURE__*/new WeakSet();var _renderAnnotationEditorLayer=/*#__PURE__*/new WeakSet();var _renderXfaLayer=/*#__PURE__*/new WeakSet();var _renderTextLayer=/*#__PURE__*/new WeakSet();var _renderStructTreeLayer=/*#__PURE__*/new WeakSet();var _buildXfaTextContentItems=/*#__PURE__*/new WeakSet();class PDFPageView{constructor(options){var _this$renderingQueue;_classPrivateMethodInitSpec(this,_buildXfaTextContentItems);_classPrivateMethodInitSpec(this,_renderStructTreeLayer);_classPrivateMethodInitSpec(this,_renderTextLayer);_classPrivateMethodInitSpec(this,_renderXfaLayer);_classPrivateMethodInitSpec(this,_renderAnnotationEditorLayer);_classPrivateMethodInitSpec(this,_renderAnnotationLayer);_classPrivateMethodInitSpec(this,_setDimensions);_classPrivateFieldInitSpec(this,_annotationMode,{writable:true,value:_pdfjsLib.AnnotationMode.ENABLE_FORMS});_classPrivateFieldInitSpec(this,_layerProperties,{writable:true,value:null});_classPrivateFieldInitSpec(this,_loadingId,{writable:true,value:null});_classPrivateFieldInitSpec(this,_previousRotation,{writable:true,value:null});_classPrivateFieldInitSpec(this,_renderingState,{writable:true,value:_ui_utils.RenderingStates.INITIAL});_classPrivateFieldInitSpec(this,_useThumbnailCanvas,{writable:true,value:{initialOptionalContent:true,regularAnnotations:true}});const container=options.container;const defaultViewport=options.defaultViewport;this.id=options.id;this.renderingId="page"+this.id;_classPrivateFieldSet(this,_layerProperties,options.layerProperties||DEFAULT_LAYER_PROPERTIES);this.pdfPage=null;this.pageLabel=null;this.rotation=0;this.scale=options.scale||_ui_utils.DEFAULT_SCALE;this.viewport=defaultViewport;this.pdfPageRotate=defaultViewport.rotation;this._optionalContentConfigPromise=options.optionalContentConfigPromise||null;this.hasRestrictedScaling=false;this.textLayerMode=options.textLayerMode??_ui_utils.TextLayerMode.ENABLE;_classPrivateFieldSet(this,_annotationMode,options.annotationMode??_pdfjsLib.AnnotationMode.ENABLE_FORMS);this.imageResourcesPath=options.imageResourcesPath||"";this.useOnlyCssZoom=options.useOnlyCssZoom||false;this.isOffscreenCanvasSupported=options.isOffscreenCanvasSupported??true;this.maxCanvasPixels=options.maxCanvasPixels||MAX_CANVAS_PIXELS;this.pageColors=options.pageColors||null;this.eventBus=options.eventBus;this.renderingQueue=options.renderingQueue;this.renderer=options.renderer||_ui_utils.RendererType.CANVAS;this.l10n=options.l10n||_l10n_utils.NullL10n;this.paintTask=null;this.paintedViewportMap=new WeakMap();this.resume=null;this._renderError=null;this._isStandalone=!((_this$renderingQueue=this.renderingQueue)!==null&&_this$renderingQueue!==void 0&&_this$renderingQueue.hasViewer());this._annotationCanvasMap=null;this.annotationLayer=null;this.annotationEditorLayer=null;this.textLayer=null;this.zoomLayer=null;this.xfaLayer=null;this.structTreeLayer=null;const div=document.createElement("div");div.className="page";div.setAttribute("data-page-number",this.id);div.setAttribute("role","region");this.l10n.get("page_landmark",{page:this.id}).then(msg=>{div.setAttribute("aria-label",msg);});this.div=div;_classPrivateMethodGet(this,_setDimensions,_setDimensions2).call(this);container===null||container===void 0?void 0:container.append(div);if(this._isStandalone){container===null||container===void 0?void 0:container.style.setProperty("--scale-factor",this.scale*_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS);const{optionalContentConfigPromise}=options;if(optionalContentConfigPromise){optionalContentConfigPromise.then(optionalContentConfig=>{if(optionalContentConfigPromise!==this._optionalContentConfigPromise){return;}_classPrivateFieldGet(this,_useThumbnailCanvas).initialOptionalContent=optionalContentConfig.hasInitialVisibility;});}}}get renderingState(){return _classPrivateFieldGet(this,_renderingState);}set renderingState(state){if(state===_classPrivateFieldGet(this,_renderingState)){return;}_classPrivateFieldSet(this,_renderingState,state);if(_classPrivateFieldGet(this,_loadingId)){clearTimeout(_classPrivateFieldGet(this,_loadingId));_classPrivateFieldSet(this,_loadingId,null);}switch(state){case _ui_utils.RenderingStates.PAUSED:this.div.classList.remove("loading");break;case _ui_utils.RenderingStates.RUNNING:this.div.classList.add("loadingIcon");_classPrivateFieldSet(this,_loadingId,setTimeout(()=>{this.div.classList.add("loading");_classPrivateFieldSet(this,_loadingId,null);},0));break;case _ui_utils.RenderingStates.INITIAL:case _ui_utils.RenderingStates.FINISHED:this.div.classList.remove("loadingIcon","loading");break;}}setPdfPage(pdfPage){this.pdfPage=pdfPage;this.pdfPageRotate=pdfPage.rotate;const totalRotation=(this.rotation+this.pdfPageRotate)%360;this.viewport=pdfPage.getViewport({scale:this.scale*_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,rotation:totalRotation});_classPrivateMethodGet(this,_setDimensions,_setDimensions2).call(this);this.reset();}destroy(){var _this$pdfPage;this.reset();(_this$pdfPage=this.pdfPage)===null||_this$pdfPage===void 0?void 0:_this$pdfPage.cleanup();}get _textHighlighter(){return(0,_pdfjsLib.shadow)(this,"_textHighlighter",new _text_highlighter.TextHighlighter({pageIndex:this.id-1,eventBus:this.eventBus,findController:_classPrivateFieldGet(this,_layerProperties).call(this).findController}));}_resetZoomLayer(){let removeFromDOM=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(!this.zoomLayer){return;}const zoomLayerCanvas=this.zoomLayer.firstChild;this.paintedViewportMap.delete(zoomLayerCanvas);zoomLayerCanvas.width=0;zoomLayerCanvas.height=0;if(removeFromDOM){this.zoomLayer.remove();}this.zoomLayer=null;}reset(){var _this$annotationLayer,_this$annotationEdito,_this$xfaLayer,_this$textLayer,_this$structTreeLayer;let{keepZoomLayer=false,keepAnnotationLayer=false,keepAnnotationEditorLayer=false,keepXfaLayer=false,keepTextLayer=false}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};this.cancelRendering({keepAnnotationLayer,keepAnnotationEditorLayer,keepXfaLayer,keepTextLayer});this.renderingState=_ui_utils.RenderingStates.INITIAL;const div=this.div;const childNodes=div.childNodes,zoomLayerNode=keepZoomLayer&&this.zoomLayer||null,annotationLayerNode=keepAnnotationLayer&&((_this$annotationLayer=this.annotationLayer)===null||_this$annotationLayer===void 0?void 0:_this$annotationLayer.div)||null,annotationEditorLayerNode=keepAnnotationEditorLayer&&((_this$annotationEdito=this.annotationEditorLayer)===null||_this$annotationEdito===void 0?void 0:_this$annotationEdito.div)||null,xfaLayerNode=keepXfaLayer&&((_this$xfaLayer=this.xfaLayer)===null||_this$xfaLayer===void 0?void 0:_this$xfaLayer.div)||null,textLayerNode=keepTextLayer&&((_this$textLayer=this.textLayer)===null||_this$textLayer===void 0?void 0:_this$textLayer.div)||null;for(let i=childNodes.length-1;i>=0;i--){const node=childNodes[i];switch(node){case zoomLayerNode:case annotationLayerNode:case annotationEditorLayerNode:case xfaLayerNode:case textLayerNode:continue;}node.remove();}div.removeAttribute("data-loaded");if(annotationLayerNode){this.annotationLayer.hide();}if(annotationEditorLayerNode){this.annotationEditorLayer.hide();}if(xfaLayerNode){this.xfaLayer.hide();}if(textLayerNode){this.textLayer.hide();}(_this$structTreeLayer=this.structTreeLayer)===null||_this$structTreeLayer===void 0?void 0:_this$structTreeLayer.hide();if(!zoomLayerNode){if(this.canvas){this.paintedViewportMap.delete(this.canvas);this.canvas.width=0;this.canvas.height=0;delete this.canvas;}this._resetZoomLayer();}if(this.svg){this.paintedViewportMap.delete(this.svg);delete this.svg;}}update(_ref){let{scale=0,rotation=null,optionalContentConfigPromise=null,drawingDelay=-1}=_ref;this.scale=scale||this.scale;if(typeof rotation==="number"){this.rotation=rotation;}if(optionalContentConfigPromise instanceof Promise){this._optionalContentConfigPromise=optionalContentConfigPromise;optionalContentConfigPromise.then(optionalContentConfig=>{if(optionalContentConfigPromise!==this._optionalContentConfigPromise){return;}_classPrivateFieldGet(this,_useThumbnailCanvas).initialOptionalContent=optionalContentConfig.hasInitialVisibility;});}const totalRotation=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:this.scale*_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,rotation:totalRotation});_classPrivateMethodGet(this,_setDimensions,_setDimensions2).call(this);if(this._isStandalone){var _this$div$parentNode;(_this$div$parentNode=this.div.parentNode)===null||_this$div$parentNode===void 0?void 0:_this$div$parentNode.style.setProperty("--scale-factor",this.viewport.scale);}if(this.svg){this.cssTransform({target:this.svg,redrawAnnotationLayer:true,redrawAnnotationEditorLayer:true,redrawXfaLayer:true,redrawTextLayer:true});this.eventBus.dispatch("pagerendered",{source:this,pageNumber:this.id,cssTransform:true,timestamp:performance.now(),error:this._renderError});return;}let isScalingRestricted=false;if(this.canvas&&this.maxCanvasPixels>0){const outputScale=this.outputScale;if((Math.floor(this.viewport.width)*outputScale.sx|0)*(Math.floor(this.viewport.height)*outputScale.sy|0)>this.maxCanvasPixels){isScalingRestricted=true;}}const onlyCssZoom=this.useOnlyCssZoom||this.hasRestrictedScaling&&isScalingRestricted;const postponeDrawing=!onlyCssZoom&&drawingDelay>=0&&drawingDelay<1000;if(this.canvas){if(postponeDrawing||onlyCssZoom){if(postponeDrawing&&this.renderingState!==_ui_utils.RenderingStates.FINISHED){this.cancelRendering({keepZoomLayer:true,keepAnnotationLayer:true,keepAnnotationEditorLayer:true,keepXfaLayer:true,keepTextLayer:true,cancelExtraDelay:drawingDelay});this.renderingState=_ui_utils.RenderingStates.FINISHED;}this.cssTransform({target:this.canvas,redrawAnnotationLayer:true,redrawAnnotationEditorLayer:true,redrawXfaLayer:true,redrawTextLayer:!postponeDrawing,hideTextLayer:postponeDrawing});this.eventBus.dispatch("pagerendered",{source:this,pageNumber:this.id,cssTransform:true,timestamp:performance.now(),error:this._renderError});return;}if(!this.zoomLayer&&!this.canvas.hidden){this.zoomLayer=this.canvas.parentNode;this.zoomLayer.style.position="absolute";}}if(this.zoomLayer){this.cssTransform({target:this.zoomLayer.firstChild});}this.reset({keepZoomLayer:true,keepAnnotationLayer:true,keepAnnotationEditorLayer:true,keepXfaLayer:true,keepTextLayer:true});}cancelRendering(){let{keepAnnotationLayer=false,keepAnnotationEditorLayer=false,keepXfaLayer=false,keepTextLayer=false,cancelExtraDelay=0}=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(this.paintTask){this.paintTask.cancel(cancelExtraDelay);this.paintTask=null;}this.resume=null;if(this.textLayer&&(!keepTextLayer||!this.textLayer.div)){this.textLayer.cancel();this.textLayer=null;}if(this.structTreeLayer&&!this.textLayer){this.structTreeLayer=null;}if(this.annotationLayer&&(!keepAnnotationLayer||!this.annotationLayer.div)){this.annotationLayer.cancel();this.annotationLayer=null;this._annotationCanvasMap=null;}if(this.annotationEditorLayer&&(!keepAnnotationEditorLayer||!this.annotationEditorLayer.div)){this.annotationEditorLayer.cancel();this.annotationEditorLayer=null;}if(this.xfaLayer&&(!keepXfaLayer||!this.xfaLayer.div)){var _this$_textHighlighte;this.xfaLayer.cancel();this.xfaLayer=null;(_this$_textHighlighte=this._textHighlighter)===null||_this$_textHighlighte===void 0?void 0:_this$_textHighlighte.disable();}}cssTransform(_ref2){let{target,redrawAnnotationLayer=false,redrawAnnotationEditorLayer=false,redrawXfaLayer=false,redrawTextLayer=false,hideTextLayer=false}=_ref2;if(target instanceof HTMLCanvasElement){if(!target.hasAttribute("zooming")){target.setAttribute("zooming",true);const{style}=target;style.width=style.height="";}}else{const div=this.div;const{width,height}=this.viewport;target.style.width=target.parentNode.style.width=div.style.width=Math.floor(width)+"px";target.style.height=target.parentNode.style.height=div.style.height=Math.floor(height)+"px";}const originalViewport=this.paintedViewportMap.get(target);if(this.viewport!==originalViewport){const relativeRotation=this.viewport.rotation-originalViewport.rotation;const absRotation=Math.abs(relativeRotation);let scaleX=1,scaleY=1;if(absRotation===90||absRotation===270){const{width,height}=this.viewport;scaleX=height/width;scaleY=width/height;}target.style.transform=`rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;}if(redrawAnnotationLayer&&this.annotationLayer){_classPrivateMethodGet(this,_renderAnnotationLayer,_renderAnnotationLayer2).call(this);}if(redrawAnnotationEditorLayer&&this.annotationEditorLayer){_classPrivateMethodGet(this,_renderAnnotationEditorLayer,_renderAnnotationEditorLayer2).call(this);}if(redrawXfaLayer&&this.xfaLayer){_classPrivateMethodGet(this,_renderXfaLayer,_renderXfaLayer2).call(this);}if(this.textLayer){if(hideTextLayer){var _this$structTreeLayer2;this.textLayer.hide();(_this$structTreeLayer2=this.structTreeLayer)===null||_this$structTreeLayer2===void 0?void 0:_this$structTreeLayer2.hide();}else if(redrawTextLayer){_classPrivateMethodGet(this,_renderTextLayer,_renderTextLayer2).call(this);}}}get width(){return this.viewport.width;}get height(){return this.viewport.height;}getPagePoint(x,y){return this.viewport.convertToPdfPoint(x,y);}draw(){var _this=this;if(this.renderingState!==_ui_utils.RenderingStates.INITIAL){globalThis.ngxConsole.error("Must be in new state before drawing");this.reset();}const{div,pdfPage}=this;if(!pdfPage){this.renderingState=_ui_utils.RenderingStates.FINISHED;return Promise.reject(new Error("pdfPage is not loaded"));}this.renderingState=_ui_utils.RenderingStates.RUNNING;const canvasWrapper=document.createElement("div");canvasWrapper.classList.add("canvasWrapper");div.append(canvasWrapper);if(!this.textLayer&&this.textLayerMode!==_ui_utils.TextLayerMode.DISABLE&&!pdfPage.isPureXfa){this._accessibilityManager||=new _text_accessibility.TextAccessibilityManager();this.textLayer=new _text_layer_builder.TextLayerBuilder({highlighter:this._textHighlighter,accessibilityManager:this._accessibilityManager,isOffscreenCanvasSupported:this.isOffscreenCanvasSupported});div.append(this.textLayer.div);}if(!this.annotationLayer&&_classPrivateFieldGet(this,_annotationMode)!==_pdfjsLib.AnnotationMode.DISABLE){const{annotationStorage,downloadManager,enableScripting,fieldObjectsPromise,hasJSActionsPromise,linkService}=_classPrivateFieldGet(this,_layerProperties).call(this);this._annotationCanvasMap||=new Map();this.annotationLayer=new _annotation_layer_builder.AnnotationLayerBuilder({pageDiv:div,pdfPage,annotationStorage,imageResourcesPath:this.imageResourcesPath,renderForms:_classPrivateFieldGet(this,_annotationMode)===_pdfjsLib.AnnotationMode.ENABLE_FORMS,linkService,downloadManager,l10n:this.l10n,enableScripting,hasJSActionsPromise,fieldObjectsPromise,annotationCanvasMap:this._annotationCanvasMap,accessibilityManager:this._accessibilityManager});}let renderContinueCallback=null;if(this.renderingQueue){renderContinueCallback=cont=>{if(!this.renderingQueue.isHighestPriority(this)){this.renderingState=_ui_utils.RenderingStates.PAUSED;this.resume=()=>{this.renderingState=_ui_utils.RenderingStates.RUNNING;cont();};return;}cont();};}const finishPaintTask=async function(){let error=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(paintTask===_this.paintTask){_this.paintTask=null;}if(error instanceof _pdfjsLib.RenderingCancelledException){_this._renderError=null;return;}_this._renderError=error;_this.renderingState=_ui_utils.RenderingStates.FINISHED;_this._resetZoomLayer(true);_classPrivateFieldGet(_this,_useThumbnailCanvas).regularAnnotations=!paintTask.separateAnnots;_this.eventBus.dispatch("pagerendered",{source:_this,pageNumber:_this.id,cssTransform:false,timestamp:performance.now(),error:_this._renderError});if(error){throw error;}};const paintTask=this.renderer===_ui_utils.RendererType.SVG?this.paintOnSvg(canvasWrapper):this.paintOnCanvas(canvasWrapper);paintTask.onRenderContinue=renderContinueCallback;this.paintTask=paintTask;const resultPromise=paintTask.promise.then(()=>{return finishPaintTask(null).then(async()=>{_classPrivateMethodGet(this,_renderTextLayer,_renderTextLayer2).call(this);if(this.annotationLayer){await _classPrivateMethodGet(this,_renderAnnotationLayer,_renderAnnotationLayer2).call(this);}if(!this.annotationEditorLayer){const{annotationEditorUIManager}=_classPrivateFieldGet(this,_layerProperties).call(this);if(!annotationEditorUIManager){return;}this.annotationEditorLayer=new _annotation_editor_layer_builder.AnnotationEditorLayerBuilder({uiManager:annotationEditorUIManager,pageDiv:div,pdfPage,l10n:this.l10n,accessibilityManager:this._accessibilityManager});}_classPrivateMethodGet(this,_renderAnnotationEditorLayer,_renderAnnotationEditorLayer2).call(this);});},function(reason){return finishPaintTask(reason);});if(pdfPage.isPureXfa){if(!this.xfaLayer){const{annotationStorage,linkService}=_classPrivateFieldGet(this,_layerProperties).call(this);this.xfaLayer=new _xfa_layer_builder.XfaLayerBuilder({pageDiv:div,pdfPage,annotationStorage,linkService});}else if(this.xfaLayer.div){div.append(this.xfaLayer.div);}_classPrivateMethodGet(this,_renderXfaLayer,_renderXfaLayer2).call(this);}div.setAttribute("data-loaded",true);this.eventBus.dispatch("pagerender",{source:this,pageNumber:this.id});return resultPromise;}paintOnCanvas(canvasWrapper){var _this$pageColors,_this$pageColors2;const renderCapability=(0,_pdfjsLib.createPromiseCapability)();const result={promise:renderCapability.promise,onRenderContinue(cont){cont();},cancel(){let extraDelay=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;renderTask.cancel(extraDelay);},get separateAnnots(){return renderTask.separateAnnots;}};const viewport=this.viewport;let{width,height}=viewport;const canvas=document.createElement("canvas");canvas.setAttribute("role","presentation");canvas.hidden=true;let isCanvasHidden=true;const hasHCM=!!((_this$pageColors=this.pageColors)!==null&&_this$pageColors!==void 0&&_this$pageColors.background&&(_this$pageColors2=this.pageColors)!==null&&_this$pageColors2!==void 0&&_this$pageColors2.foreground);const showCanvas=function(isLastShow){if(isCanvasHidden&&(!hasHCM||isLastShow)){canvas.hidden=false;isCanvasHidden=false;}};canvasWrapper.append(canvas);this.canvas=canvas;const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true,alpha:false}:{alpha:false};const ctx=canvas.getContext("2d",options);const outputScale=this.outputScale=new _ui_utils.OutputScale();if(this.useOnlyCssZoom){const actualSizeViewport=viewport.clone({scale:_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS});outputScale.sx*=actualSizeViewport.width/width;outputScale.sy*=actualSizeViewport.height/height;}if(this.maxCanvasPixels>0){const pixelsInViewport=width*height;const maxScale=Math.sqrt(this.maxCanvasPixels/pixelsInViewport);if(outputScale.sx>maxScale||outputScale.sy>maxScale){outputScale.sx=maxScale;outputScale.sy=maxScale;this.hasRestrictedScaling=true;}else{this.hasRestrictedScaling=false;}}const sfx=(0,_ui_utils.approximateFraction)(outputScale.sx);const sfy=(0,_ui_utils.approximateFraction)(outputScale.sy);width=(0,_ui_utils.roundToDivide)(width*outputScale.sx,sfx[0]);height=(0,_ui_utils.roundToDivide)(height*outputScale.sy,sfy[0]);let divisor=1;if(width>=4096||height>=4096){if(!!this.maxWidth||!_canvasSize.default.test({width,height})){const max=this.determineMaxDimensions();divisor=Math.max(width/max,height/max);if(divisor>1){const newScale=Math.floor(100*this.scale/divisor)/100;divisor=this.scale/newScale;viewport.width/=divisor;viewport.height/=divisor;(0,_util.warn)(`Page ${this.id}: Reduced the maximum zoom to ${newScale} because the browser can't render larger canvases.`);}else{divisor=1;}}}canvas.width=(0,_ui_utils.roundToDivide)(viewport.width*outputScale.sx,sfx[0]);canvas.height=(0,_ui_utils.roundToDivide)(viewport.height*outputScale.sy,sfy[0]);const{style}=canvas;style.width=(0,_ui_utils.roundToDivide)(viewport.width*divisor,sfx[1])+"px";style.height=(0,_ui_utils.roundToDivide)(viewport.height*divisor,sfy[1])+"px";this.paintedViewportMap.set(canvas,viewport);const transform=outputScale.scaled?[outputScale.sx,0,0,outputScale.sy,0,0]:null;const renderContext={canvasContext:ctx,transform,viewport,annotationMode:_classPrivateFieldGet(this,_annotationMode),optionalContentConfigPromise:this._optionalContentConfigPromise,annotationCanvasMap:this._annotationCanvasMap,pageColors:this.pageColors};const renderTask=this.pdfPage.render(renderContext);renderTask.onContinue=function(cont){showCanvas(false);if(result.onRenderContinue){result.onRenderContinue(cont);}else{cont();}};renderTask.promise.then(function(){showCanvas(true);renderCapability.resolve();},function(error){if(!(error instanceof _pdfjsLib.RenderingCancelledException)){showCanvas(true);}renderCapability.reject(error);});return result;}paintOnSvg(wrapper){let cancelled=false;const ensureNotCancelled=()=>{if(cancelled){throw new _pdfjsLib.RenderingCancelledException(`Rendering cancelled, page ${this.id}`,"svg");}};const pdfPage=this.pdfPage;const actualSizeViewport=this.viewport.clone({scale:_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS});const promise=pdfPage.getOperatorList({annotationMode:_classPrivateFieldGet(this,_annotationMode)}).then(opList=>{ensureNotCancelled();const svgGfx=new _pdfjsLib.SVGGraphics(pdfPage.commonObjs,pdfPage.objs);return svgGfx.getSVG(opList,actualSizeViewport).then(svg=>{ensureNotCancelled();this.svg=svg;this.paintedViewportMap.set(svg,actualSizeViewport);svg.style.width=wrapper.style.width;svg.style.height=wrapper.style.height;this.renderingState=_ui_utils.RenderingStates.FINISHED;wrapper.append(svg);});});return{promise,onRenderContinue(cont){cont();},cancel(){cancelled=true;},get separateAnnots(){return false;}};}setPageLabel(label){this.pageLabel=typeof label==="string"?label:null;if(this.pageLabel!==null){this.div.setAttribute("data-page-label",this.pageLabel);}else{this.div.removeAttribute("data-page-label");}}determineMaxDimensions(){if(this.maxWidth){return this.maxWidth;}const checklist=[4096,8192,10836,11180,11402,14188,16384];for(const width of checklist){if(!_canvasSize.default.test({width:width+1,height:width+1})){this.maxWidth=width;return this.maxWidth;}}return 16384;}get thumbnailCanvas(){const{initialOptionalContent,regularAnnotations}=_classPrivateFieldGet(this,_useThumbnailCanvas);return initialOptionalContent&&regularAnnotations?this.canvas:null;}}exports.PDFPageView=PDFPageView;function _setDimensions2(){const{viewport}=this;if(this.pdfPage){if(_classPrivateFieldGet(this,_previousRotation)===viewport.rotation){return;}_classPrivateFieldSet(this,_previousRotation,viewport.rotation);}(0,_pdfjsLib.setLayerDimensions)(this.div,viewport,true,false);}async function _renderAnnotationLayer2(){let error=null;try{await this.annotationLayer.render(this.viewport,"display");}catch(ex){console.error(`#renderAnnotationLayer: "${ex}".`);error=ex;}finally{this.eventBus.dispatch("annotationlayerrendered",{source:this,pageNumber:this.id,error});}}async function _renderAnnotationEditorLayer2(){let error=null;try{await this.annotationEditorLayer.render(this.viewport,"display");}catch(ex){console.error(`#renderAnnotationEditorLayer: "${ex}".`);error=ex;}finally{this.eventBus.dispatch("annotationeditorlayerrendered",{source:this,pageNumber:this.id,error});}}async function _renderXfaLayer2(){let error=null;try{const result=await this.xfaLayer.render(this.viewport,"display");if(result!==null&&result!==void 0&&result.textDivs&&this._textHighlighter){_classPrivateMethodGet(this,_buildXfaTextContentItems,_buildXfaTextContentItems2).call(this,result.textDivs);}}catch(ex){console.error(`#renderXfaLayer: "${ex}".`);error=ex;}finally{this.eventBus.dispatch("xfalayerrendered",{source:this,pageNumber:this.id,error});}}async function _renderTextLayer2(){const{pdfPage,textLayer,viewport}=this;if(!textLayer){return;}let error=null;try{if(!textLayer.renderingDone){const readableStream=pdfPage.streamTextContent({includeMarkedContent:true});textLayer.setTextContentSource(readableStream);}await textLayer.render(viewport);}catch(ex){if(ex instanceof _pdfjsLib.AbortException){return;}console.error(`#renderTextLayer: "${ex}".`);error=ex;}this.eventBus.dispatch("textlayerrendered",{source:this,pageNumber:this.id,numTextDivs:textLayer.numTextDivs,error});_classPrivateMethodGet(this,_renderStructTreeLayer,_renderStructTreeLayer2).call(this);}async function _renderStructTreeLayer2(){var _this$structTreeLayer3,_this$structTreeLayer4;if(!this.textLayer){return;}this.structTreeLayer||=new _struct_tree_layer_builder.StructTreeLayerBuilder();const tree=await(!this.structTreeLayer.renderingDone?this.pdfPage.getStructTree():null);const treeDom=(_this$structTreeLayer3=this.structTreeLayer)===null||_this$structTreeLayer3===void 0?void 0:_this$structTreeLayer3.render(tree);if(treeDom){var _this$canvas;(_this$canvas=this.canvas)===null||_this$canvas===void 0?void 0:_this$canvas.append(treeDom);}(_this$structTreeLayer4=this.structTreeLayer)===null||_this$structTreeLayer4===void 0?void 0:_this$structTreeLayer4.show();}async function _buildXfaTextContentItems2(textDivs){const text=await this.pdfPage.getTextContent();const items=[];for(const item of text.items){items.push(item.str);}this._textHighlighter.setTextMapping(textDivs,items);this._textHighlighter.enable();}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.AnnotationEditorLayerBuilder=void 0;var _pdfjsLib=__webpack_require__(4);var _l10n_utils=__webpack_require__(33);class AnnotationEditorLayerBuilder{#uiManager;constructor(options){this.pageDiv=options.pageDiv;this.pdfPage=options.pdfPage;this.accessibilityManager=options.accessibilityManager;this.l10n=options.l10n||_l10n_utils.NullL10n;this.annotationEditorLayer=null;this.div=null;this._cancelled=false;this.#uiManager=options.uiManager;}async render(viewport){let intent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"display";if(intent!=="display"){return;}if(this._cancelled){return;}const clonedViewport=viewport.clone({dontFlip:true});if(this.div){this.annotationEditorLayer.update({viewport:clonedViewport});this.show();return;}const div=this.div=document.createElement("div");div.className="annotationEditorLayer";div.tabIndex=0;div.hidden=true;this.pageDiv.append(div);this.annotationEditorLayer=new _pdfjsLib.AnnotationEditorLayer({uiManager:this.#uiManager,div,accessibilityManager:this.accessibilityManager,pageIndex:this.pdfPage.pageNumber-1,l10n:this.l10n,viewport:clonedViewport});const parameters={viewport:clonedViewport,div,annotations:null,intent};this.annotationEditorLayer.render(parameters);this.show();}cancel(){this._cancelled=true;if(!this.div){return;}this.pageDiv=null;this.annotationEditorLayer.destroy();this.div.remove();}hide(){if(!this.div){return;}this.div.hidden=true;}show(){if(!this.div||this.annotationEditorLayer.isEmpty){return;}this.div.hidden=false;}}exports.AnnotationEditorLayerBuilder=AnnotationEditorLayerBuilder;

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.AnnotationLayerBuilder=void 0;var _pdfjsLib=__webpack_require__(4);var _l10n_utils=__webpack_require__(33);var _ui_utils=__webpack_require__(3);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}var _numAnnotations=/*#__PURE__*/new WeakMap();var _onPresentationModeChanged=/*#__PURE__*/new WeakMap();var _updatePresentationModeState=/*#__PURE__*/new WeakSet();class AnnotationLayerBuilder{constructor(_ref){let{pageDiv,pdfPage,linkService,downloadManager,annotationStorage=null,imageResourcesPath="",renderForms=true,l10n=_l10n_utils.NullL10n,enableScripting=false,hasJSActionsPromise=null,fieldObjectsPromise=null,annotationCanvasMap=null,accessibilityManager=null}=_ref;_classPrivateMethodInitSpec(this,_updatePresentationModeState);_classPrivateFieldInitSpec(this,_numAnnotations,{writable:true,value:0});_classPrivateFieldInitSpec(this,_onPresentationModeChanged,{writable:true,value:null});this.pageDiv=pageDiv;this.pdfPage=pdfPage;this.linkService=linkService;this.downloadManager=downloadManager;this.imageResourcesPath=imageResourcesPath;this.renderForms=renderForms;this.l10n=l10n;this.annotationStorage=annotationStorage;this.enableScripting=enableScripting;this._hasJSActionsPromise=hasJSActionsPromise||Promise.resolve(false);this._fieldObjectsPromise=fieldObjectsPromise||Promise.resolve(null);this._annotationCanvasMap=annotationCanvasMap;this._accessibilityManager=accessibilityManager;this.div=null;this._cancelled=false;this._eventBus=linkService.eventBus;}async render(viewport){let intent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"display";if(this.div){if(this._cancelled||_classPrivateFieldGet(this,_numAnnotations)===0){return;}_pdfjsLib.AnnotationLayer.update({viewport:viewport.clone({dontFlip:true}),div:this.div,annotationCanvasMap:this._annotationCanvasMap});return;}const[annotations,hasJSActions,fieldObjects]=await Promise.all([this.pdfPage.getAnnotations({intent}),this._hasJSActionsPromise,this._fieldObjectsPromise]);if(this._cancelled){return;}_classPrivateFieldSet(this,_numAnnotations,annotations.length);this.div=document.createElement("div");this.div.className="annotationLayer";this.pageDiv.append(this.div);if(_classPrivateFieldGet(this,_numAnnotations)===0){this.hide();return;}_pdfjsLib.AnnotationLayer.render({viewport:viewport.clone({dontFlip:true}),div:this.div,annotations,page:this.pdfPage,imageResourcesPath:this.imageResourcesPath,renderForms:this.renderForms,linkService:this.linkService,downloadManager:this.downloadManager,annotationStorage:this.annotationStorage,enableScripting:this.enableScripting,hasJSActions,fieldObjects,annotationCanvasMap:this._annotationCanvasMap,accessibilityManager:this._accessibilityManager});this.l10n.translate(this.div);if(this.linkService.isInPresentationMode){_classPrivateMethodGet(this,_updatePresentationModeState,_updatePresentationModeState2).call(this,_ui_utils.PresentationModeState.FULLSCREEN);}if(!_classPrivateFieldGet(this,_onPresentationModeChanged)){var _this$_eventBus;_classPrivateFieldSet(this,_onPresentationModeChanged,evt=>{_classPrivateMethodGet(this,_updatePresentationModeState,_updatePresentationModeState2).call(this,evt.state);});(_this$_eventBus=this._eventBus)===null||_this$_eventBus===void 0?void 0:_this$_eventBus._on("presentationmodechanged",_classPrivateFieldGet(this,_onPresentationModeChanged));}}cancel(){this._cancelled=true;if(_classPrivateFieldGet(this,_onPresentationModeChanged)){var _this$_eventBus2;(_this$_eventBus2=this._eventBus)===null||_this$_eventBus2===void 0?void 0:_this$_eventBus2._off("presentationmodechanged",_classPrivateFieldGet(this,_onPresentationModeChanged));_classPrivateFieldSet(this,_onPresentationModeChanged,null);}}hide(){if(!this.div){return;}this.div.hidden=true;}}exports.AnnotationLayerBuilder=AnnotationLayerBuilder;function _updatePresentationModeState2(state){if(!this.div){return;}let disableFormElements=false;switch(state){case _ui_utils.PresentationModeState.FULLSCREEN:disableFormElements=true;break;case _ui_utils.PresentationModeState.NORMAL:break;default:return;}for(const section of this.div.childNodes){if(section.hasAttribute("data-internal-link")){continue;}section.inert=disableFormElements;}}

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.StructTreeLayerBuilder=void 0;function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}const PDF_ROLE_TO_HTML_ROLE={Document:null,DocumentFragment:null,Part:"group",Sect:"group",Div:"group",Aside:"note",NonStruct:"none",P:null,H:"heading",Title:null,FENote:"note",Sub:"group",Lbl:null,Span:null,Em:null,Strong:null,Link:"link",Annot:"note",Form:"form",Ruby:null,RB:null,RT:null,RP:null,Warichu:null,WT:null,WP:null,L:"list",LI:"listitem",LBody:null,Table:"table",TR:"row",TH:"columnheader",TD:"cell",THead:"columnheader",TBody:null,TFoot:null,Caption:null,Figure:"figure",Formula:null,Artifact:null};const HEADING_PATTERN=/^H(\d+)$/;var _treeDom=/*#__PURE__*/new WeakMap();var _setAttributes=/*#__PURE__*/new WeakSet();var _walk=/*#__PURE__*/new WeakSet();class StructTreeLayerBuilder{constructor(){_classPrivateMethodInitSpec(this,_walk);_classPrivateMethodInitSpec(this,_setAttributes);_classPrivateFieldInitSpec(this,_treeDom,{writable:true,value:undefined});}get renderingDone(){return _classPrivateFieldGet(this,_treeDom)!==undefined;}render(structTree){if(_classPrivateFieldGet(this,_treeDom)!==undefined){return _classPrivateFieldGet(this,_treeDom);}const treeDom=_classPrivateMethodGet(this,_walk,_walk2).call(this,structTree);treeDom===null||treeDom===void 0?void 0:treeDom.classList.add("structTree");return _classPrivateFieldSet(this,_treeDom,treeDom);}hide(){if(_classPrivateFieldGet(this,_treeDom)&&!_classPrivateFieldGet(this,_treeDom).hidden){_classPrivateFieldGet(this,_treeDom).hidden=true;}}show(){var _classPrivateFieldGet2;if((_classPrivateFieldGet2=_classPrivateFieldGet(this,_treeDom))!==null&&_classPrivateFieldGet2!==void 0&&_classPrivateFieldGet2.hidden){_classPrivateFieldGet(this,_treeDom).hidden=false;}}}exports.StructTreeLayerBuilder=StructTreeLayerBuilder;function _setAttributes2(structElement,htmlElement){if(structElement.alt!==undefined){htmlElement.setAttribute("aria-label",structElement.alt);}if(structElement.id!==undefined){htmlElement.setAttribute("aria-owns",structElement.id);}if(structElement.lang!==undefined){htmlElement.setAttribute("lang",structElement.lang);}}function _walk2(node){if(!node){return null;}const element=document.createElement("span");if("role"in node){const{role}=node;const match=role.match(HEADING_PATTERN);if(match){element.setAttribute("role","heading");element.setAttribute("aria-level",match[1]);}else if(PDF_ROLE_TO_HTML_ROLE[role]){element.setAttribute("role",PDF_ROLE_TO_HTML_ROLE[role]);}}_classPrivateMethodGet(this,_setAttributes,_setAttributes2).call(this,node,element);if(node.children){if(node.children.length===1&&"id"in node.children[0]){_classPrivateMethodGet(this,_setAttributes,_setAttributes2).call(this,node.children[0],element);}else{for(const kid of node.children){element.append(_classPrivateMethodGet(this,_walk,_walk2).call(this,kid));}}}return element;}

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.TextAccessibilityManager=void 0;var _ui_utils=__webpack_require__(3);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classStaticPrivateMethodGet(receiver,classConstructor,method){_classCheckPrivateStaticAccess(receiver,classConstructor);return method;}function _classCheckPrivateStaticAccess(receiver,classConstructor){if(receiver!==classConstructor){throw new TypeError("Private static access of wrong provenance");}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}var _enabled=/*#__PURE__*/new WeakMap();var _textChildren=/*#__PURE__*/new WeakMap();var _textNodes=/*#__PURE__*/new WeakMap();var _waitingElements=/*#__PURE__*/new WeakMap();var _addIdToAriaOwns=/*#__PURE__*/new WeakSet();class TextAccessibilityManager{constructor(){_classPrivateMethodInitSpec(this,_addIdToAriaOwns);_classPrivateFieldInitSpec(this,_enabled,{writable:true,value:false});_classPrivateFieldInitSpec(this,_textChildren,{writable:true,value:null});_classPrivateFieldInitSpec(this,_textNodes,{writable:true,value:new Map()});_classPrivateFieldInitSpec(this,_waitingElements,{writable:true,value:new Map()});}setTextMapping(textDivs){_classPrivateFieldSet(this,_textChildren,textDivs);}enable(){if(_classPrivateFieldGet(this,_enabled)){throw new Error("TextAccessibilityManager is already enabled.");}if(!_classPrivateFieldGet(this,_textChildren)){throw new Error("Text divs and strings have not been set.");}_classPrivateFieldSet(this,_enabled,true);_classPrivateFieldSet(this,_textChildren,_classPrivateFieldGet(this,_textChildren).slice());_classPrivateFieldGet(this,_textChildren).sort(_classStaticPrivateMethodGet(TextAccessibilityManager,TextAccessibilityManager,_compareElementPositions));if(_classPrivateFieldGet(this,_textNodes).size>0){const textChildren=_classPrivateFieldGet(this,_textChildren);for(const[id,nodeIndex]of _classPrivateFieldGet(this,_textNodes)){const element=document.getElementById(id);if(!element){_classPrivateFieldGet(this,_textNodes).delete(id);continue;}_classPrivateMethodGet(this,_addIdToAriaOwns,_addIdToAriaOwns2).call(this,id,textChildren[nodeIndex]);}}for(const[element,isRemovable]of _classPrivateFieldGet(this,_waitingElements)){this.addPointerInTextLayer(element,isRemovable);}_classPrivateFieldGet(this,_waitingElements).clear();}disable(){if(!_classPrivateFieldGet(this,_enabled)){return;}_classPrivateFieldGet(this,_waitingElements).clear();_classPrivateFieldSet(this,_textChildren,null);_classPrivateFieldSet(this,_enabled,false);}removePointerInTextLayer(element){var _owns;if(!_classPrivateFieldGet(this,_enabled)){_classPrivateFieldGet(this,_waitingElements).delete(element);return;}const children=_classPrivateFieldGet(this,_textChildren);if(!children||children.length===0){return;}const{id}=element;const nodeIndex=_classPrivateFieldGet(this,_textNodes).get(id);if(nodeIndex===undefined){return;}const node=children[nodeIndex];_classPrivateFieldGet(this,_textNodes).delete(id);let owns=node.getAttribute("aria-owns");if((_owns=owns)!==null&&_owns!==void 0&&_owns.includes(id)){owns=owns.split(" ").filter(x=>x!==id).join(" ");if(owns){node.setAttribute("aria-owns",owns);}else{node.removeAttribute("aria-owns");node.setAttribute("role","presentation");}}}addPointerInTextLayer(element,isRemovable){const{id}=element;if(!id){return;}if(!_classPrivateFieldGet(this,_enabled)){_classPrivateFieldGet(this,_waitingElements).set(element,isRemovable);return;}if(isRemovable){this.removePointerInTextLayer(element);}const children=_classPrivateFieldGet(this,_textChildren);if(!children||children.length===0){return;}const index=(0,_ui_utils.binarySearchFirstItem)(children,node=>_classStaticPrivateMethodGet(TextAccessibilityManager,TextAccessibilityManager,_compareElementPositions).call(TextAccessibilityManager,element,node)<0);const nodeIndex=Math.max(0,index-1);_classPrivateMethodGet(this,_addIdToAriaOwns,_addIdToAriaOwns2).call(this,id,children[nodeIndex]);_classPrivateFieldGet(this,_textNodes).set(id,nodeIndex);}moveElementInDOM(container,element,contentElement,isRemovable){this.addPointerInTextLayer(contentElement,isRemovable);if(!container.hasChildNodes()){container.append(element);return;}const children=Array.from(container.childNodes).filter(node=>node!==element);if(children.length===0){return;}const elementToCompare=contentElement||element;const index=(0,_ui_utils.binarySearchFirstItem)(children,node=>_classStaticPrivateMethodGet(TextAccessibilityManager,TextAccessibilityManager,_compareElementPositions).call(TextAccessibilityManager,elementToCompare,node)<0);if(index===0){children[0].before(element);}else{children[index-1].after(element);}}}exports.TextAccessibilityManager=TextAccessibilityManager;function _compareElementPositions(e1,e2){const rect1=e1.getBoundingClientRect();const rect2=e2.getBoundingClientRect();if(rect1.width===0&&rect1.height===0){return+1;}if(rect2.width===0&&rect2.height===0){return-1;}const top1=rect1.y;const bot1=rect1.y+rect1.height;const mid1=rect1.y+rect1.height/2;const top2=rect2.y;const bot2=rect2.y+rect2.height;const mid2=rect2.y+rect2.height/2;if(mid1<=top2&&mid2>=bot1){return-1;}if(mid2<=top1&&mid1>=bot2){return+1;}const centerX1=rect1.x+rect1.width/2;const centerX2=rect2.x+rect2.width/2;return centerX1-centerX2;}function _addIdToAriaOwns2(id,node){const owns=node.getAttribute("aria-owns");if(!(owns!==null&&owns!==void 0&&owns.includes(id))){node.setAttribute("aria-owns",owns?`${owns} ${id}`:id);}node.removeAttribute("role");}

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1;}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err;}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return;}finally{if(_d)throw _e;}}return _arr;}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;})),keys.push.apply(keys,symbols);}return keys;}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){_defineProperty(target,key,source[key]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}return target;}function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _objectWithoutPropertiesLoose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key];}return target;}function _objectWithoutProperties(source,excluded){if(source==null)return{};var target=_objectWithoutPropertiesLoose(source,excluded);var key,i;if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++){key=sourceSymbolKeys[i];if(excluded.indexOf(key)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(source,key))continue;target[key]=source[key];}}return target;}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter);}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _toPrimitive(input,hint){if(typeof input!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(typeof res!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return typeof key==="symbol"?key:String(key);}function canvasTest(settings){var size=settings.sizes.shift();var width=Math.max(Math.ceil(size[0]),1);var height=Math.max(Math.ceil(size[1]),1);var fill=[width-1,height-1,1,1];var job=Date.now();var isWorker=typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope;var cropCvs,testCvs;if(isWorker){cropCvs=new OffscreenCanvas(1,1);testCvs=new OffscreenCanvas(width,height);}else{cropCvs=document.createElement("canvas");cropCvs.width=1;cropCvs.height=1;testCvs=document.createElement("canvas");testCvs.width=width;testCvs.height=height;}var cropCtx=cropCvs.getContext("2d");var testCtx=testCvs.getContext("2d");if(testCtx){testCtx.fillRect.apply(testCtx,fill);cropCtx.drawImage(testCvs,width-1,height-1,1,1,0,0,1,1);}var isTestPass=cropCtx&&cropCtx.getImageData(0,0,1,1).data[3]!==0;var benchmark=Date.now()-job;[cropCvs,testCvs].forEach(function(cvs){cvs.height=0;cvs.width=0;});if(isWorker){postMessage({width:width,height:height,benchmark:benchmark,isTestPass:isTestPass});if(!isTestPass&&settings.sizes.length){canvasTest(settings);}}else if(isTestPass){settings.onSuccess(width,height,benchmark);}else{settings.onError(width,height,benchmark);if(settings.sizes.length){canvasTest(settings);}}return isTestPass;}var testSizes={area:[16384,14188,11402,11180,10836,8192,4096,1],height:[8388607,65535,32767,16384,8192,4096,1],width:[4194303,65535,32767,16384,8192,4096,1]};var _excluded=["onError","onSuccess"];var defaults={max:null,min:1,sizes:[],step:1024,usePromise:false,useWorker:false,onError:Function.prototype,onSuccess:Function.prototype};var workerJobs={};function createSizesArray(settings){var isArea=settings.width===settings.height;var isWidth=settings.height===1;var isHeight=settings.width===1;var sizes=[];if(!settings.width||!settings.height){settings.sizes.forEach(function(testSize){var width=isArea||isWidth?testSize:1;var height=isArea||isHeight?testSize:1;sizes.push([width,height]);});}else{var testMin=settings.min||defaults.min;var testStep=settings.step||defaults.step;var testSize=Math.max(settings.width,settings.height);while(testSize>=testMin){var width=isArea||isWidth?testSize:1;var height=isArea||isHeight?testSize:1;sizes.push([width,height]);testSize-=testStep;}}return sizes;}function handleMethod(settings){var hasCanvasSupport=window&&"HTMLCanvasElement"in window;var hasOffscreenCanvasSupport=window&&"OffscreenCanvas"in window;var jobID=Date.now();var _onError=settings.onError,_onSuccess=settings.onSuccess,settingsWithoutCallbacks=_objectWithoutProperties(settings,_excluded);var worker=null;if(!hasCanvasSupport){return false;}if(settings.useWorker&&hasOffscreenCanvasSupport){var js="\n            var canvasTest = ".concat(canvasTest.toString(),";\n            onmessage = function(e) {\n                canvasTest(e.data);\n            };\n        ");var blob=new Blob([js],{type:"application/javascript"});var blobURL=URL.createObjectURL(blob);worker=new Worker(blobURL);URL.revokeObjectURL(blobURL);worker.onmessage=function(e){var _e$data=e.data,width=_e$data.width,height=_e$data.height,benchmark=_e$data.benchmark,isTestPass=_e$data.isTestPass;if(isTestPass){workerJobs[jobID].onSuccess(width,height,benchmark);delete workerJobs[jobID];}else{workerJobs[jobID].onError(width,height,benchmark);}};}if(settings.usePromise){return new Promise(function(resolve,reject){var promiseSettings=_objectSpread2(_objectSpread2({},settings),{},{onError:function onError(width,height,benchmark){var isLastTest;if(settings.sizes.length===0){isLastTest=true;}else{var _settings$sizes$slice=settings.sizes.slice(-1),_settings$sizes$slice2=_slicedToArray(_settings$sizes$slice,1),_settings$sizes$slice3=_slicedToArray(_settings$sizes$slice2[0],2),lastWidth=_settings$sizes$slice3[0],lastHeight=_settings$sizes$slice3[1];isLastTest=width===lastWidth&&height===lastHeight;}_onError(width,height,benchmark);if(isLastTest){reject({width:width,height:height,benchmark:benchmark});}},onSuccess:function onSuccess(width,height,benchmark){_onSuccess(width,height,benchmark);resolve({width:width,height:height,benchmark:benchmark});}});if(worker){var onError=promiseSettings.onError,onSuccess=promiseSettings.onSuccess;workerJobs[jobID]={onError:onError,onSuccess:onSuccess};worker.postMessage(settingsWithoutCallbacks);}else{canvasTest(promiseSettings);}});}else{if(worker){workerJobs[jobID]={onError:_onError,onSuccess:_onSuccess};worker.postMessage(settingsWithoutCallbacks);}else{return canvasTest(settings);}}}var canvasSize={maxArea:function maxArea(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var sizes=createSizesArray({width:options.max,height:options.max,min:options.min,step:options.step,sizes:_toConsumableArray(testSizes.area)});var settings=_objectSpread2(_objectSpread2(_objectSpread2({},defaults),options),{},{sizes:sizes});return handleMethod(settings);},maxHeight:function maxHeight(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var sizes=createSizesArray({width:1,height:options.max,min:options.min,step:options.step,sizes:_toConsumableArray(testSizes.height)});var settings=_objectSpread2(_objectSpread2(_objectSpread2({},defaults),options),{},{sizes:sizes});return handleMethod(settings);},maxWidth:function maxWidth(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var sizes=createSizesArray({width:options.max,height:1,min:options.min,step:options.step,sizes:_toConsumableArray(testSizes.width)});var settings=_objectSpread2(_objectSpread2(_objectSpread2({},defaults),options),{},{sizes:sizes});return handleMethod(settings);},test:function test(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var settings=_objectSpread2(_objectSpread2({},defaults),options);settings.sizes=_toConsumableArray(settings.sizes);if(settings.width&&settings.height){settings.sizes=[[settings.width,settings.height]];}return handleMethod(settings);}};exports["default"]=canvasSize;

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.VerbosityLevel=exports.Util=exports.UnknownErrorException=exports.UnexpectedResponseException=exports.TextRenderingMode=exports.RenderingIntentFlag=exports.PermissionFlag=exports.PasswordResponses=exports.PasswordException=exports.PageActionEventType=exports.OPS=exports.MissingPDFException=exports.MAX_IMAGE_SIZE_TO_CACHE=exports.LINE_FACTOR=exports.LINE_DESCENT_FACTOR=exports.InvalidPDFException=exports.ImageKind=exports.IDENTITY_MATRIX=exports.FormatError=exports.FeatureTest=exports.FONT_IDENTITY_MATRIX=exports.DocumentActionEventType=exports.CMapCompressionType=exports.BaseException=exports.BASELINE_FACTOR=exports.AnnotationType=exports.AnnotationStateModelType=exports.AnnotationReviewState=exports.AnnotationReplyType=exports.AnnotationMode=exports.AnnotationMarkedState=exports.AnnotationFlag=exports.AnnotationFieldFlag=exports.AnnotationEditorType=exports.AnnotationEditorPrefix=exports.AnnotationEditorParamsType=exports.AnnotationBorderStyleType=exports.AnnotationActionEventType=exports.AbortException=void 0;exports.assert=assert;exports.bytesToString=bytesToString;exports.createPromiseCapability=createPromiseCapability;exports.createValidAbsoluteUrl=createValidAbsoluteUrl;exports.getModificationDate=getModificationDate;exports.getVerbosityLevel=getVerbosityLevel;exports.info=info;exports.isArrayBuffer=isArrayBuffer;exports.isArrayEqual=isArrayEqual;exports.objectFromMap=objectFromMap;exports.objectSize=objectSize;exports.setVerbosityLevel=setVerbosityLevel;exports.shadow=shadow;exports.string32=string32;exports.stringToBytes=stringToBytes;exports.stringToPDFString=stringToPDFString;exports.stringToUTF8String=stringToUTF8String;exports.unreachable=unreachable;exports.utf8StringToString=utf8StringToString;exports.warn=warn;if(!globalThis._pdfjsCompatibilityChecked){globalThis._pdfjsCompatibilityChecked=true;__webpack_require__(42);}const IDENTITY_MATRIX=[1,0,0,1,0,0];exports.IDENTITY_MATRIX=IDENTITY_MATRIX;const FONT_IDENTITY_MATRIX=[0.001,0,0,0.001,0,0];exports.FONT_IDENTITY_MATRIX=FONT_IDENTITY_MATRIX;const MAX_IMAGE_SIZE_TO_CACHE=10e6;exports.MAX_IMAGE_SIZE_TO_CACHE=MAX_IMAGE_SIZE_TO_CACHE;const LINE_FACTOR=1.35;exports.LINE_FACTOR=LINE_FACTOR;const LINE_DESCENT_FACTOR=0.35;exports.LINE_DESCENT_FACTOR=LINE_DESCENT_FACTOR;const BASELINE_FACTOR=LINE_DESCENT_FACTOR/LINE_FACTOR;exports.BASELINE_FACTOR=BASELINE_FACTOR;const RenderingIntentFlag={ANY:0x01,DISPLAY:0x02,PRINT:0x04,SAVE:0x08,ANNOTATIONS_FORMS:0x10,ANNOTATIONS_STORAGE:0x20,ANNOTATIONS_DISABLE:0x40,OPLIST:0x100};exports.RenderingIntentFlag=RenderingIntentFlag;const AnnotationMode={DISABLE:0,ENABLE:1,ENABLE_FORMS:2,ENABLE_STORAGE:3};exports.AnnotationMode=AnnotationMode;const AnnotationEditorPrefix="pdfjs_internal_editor_";exports.AnnotationEditorPrefix=AnnotationEditorPrefix;const AnnotationEditorType={DISABLE:-1,NONE:0,FREETEXT:3,INK:15};exports.AnnotationEditorType=AnnotationEditorType;const AnnotationEditorParamsType={FREETEXT_SIZE:1,FREETEXT_COLOR:2,FREETEXT_OPACITY:3,INK_COLOR:11,INK_THICKNESS:12,INK_OPACITY:13};exports.AnnotationEditorParamsType=AnnotationEditorParamsType;const PermissionFlag={PRINT:0x04,MODIFY_CONTENTS:0x08,COPY:0x10,MODIFY_ANNOTATIONS:0x20,FILL_INTERACTIVE_FORMS:0x100,COPY_FOR_ACCESSIBILITY:0x200,ASSEMBLE:0x400,PRINT_HIGH_QUALITY:0x800};exports.PermissionFlag=PermissionFlag;const TextRenderingMode={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4};exports.TextRenderingMode=TextRenderingMode;const ImageKind={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3};exports.ImageKind=ImageKind;const AnnotationType={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26};exports.AnnotationType=AnnotationType;const AnnotationStateModelType={MARKED:"Marked",REVIEW:"Review"};exports.AnnotationStateModelType=AnnotationStateModelType;const AnnotationMarkedState={MARKED:"Marked",UNMARKED:"Unmarked"};exports.AnnotationMarkedState=AnnotationMarkedState;const AnnotationReviewState={ACCEPTED:"Accepted",REJECTED:"Rejected",CANCELLED:"Cancelled",COMPLETED:"Completed",NONE:"None"};exports.AnnotationReviewState=AnnotationReviewState;const AnnotationReplyType={GROUP:"Group",REPLY:"R"};exports.AnnotationReplyType=AnnotationReplyType;const AnnotationFlag={INVISIBLE:0x01,HIDDEN:0x02,PRINT:0x04,NOZOOM:0x08,NOROTATE:0x10,NOVIEW:0x20,READONLY:0x40,LOCKED:0x80,TOGGLENOVIEW:0x100,LOCKEDCONTENTS:0x200};exports.AnnotationFlag=AnnotationFlag;const AnnotationFieldFlag={READONLY:0x0000001,REQUIRED:0x0000002,NOEXPORT:0x0000004,MULTILINE:0x0001000,PASSWORD:0x0002000,NOTOGGLETOOFF:0x0004000,RADIO:0x0008000,PUSHBUTTON:0x0010000,COMBO:0x0020000,EDIT:0x0040000,SORT:0x0080000,FILESELECT:0x0100000,MULTISELECT:0x0200000,DONOTSPELLCHECK:0x0400000,DONOTSCROLL:0x0800000,COMB:0x1000000,RICHTEXT:0x2000000,RADIOSINUNISON:0x2000000,COMMITONSELCHANGE:0x4000000};exports.AnnotationFieldFlag=AnnotationFieldFlag;const AnnotationBorderStyleType={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5};exports.AnnotationBorderStyleType=AnnotationBorderStyleType;const AnnotationActionEventType={E:"Mouse Enter",X:"Mouse Exit",D:"Mouse Down",U:"Mouse Up",Fo:"Focus",Bl:"Blur",PO:"PageOpen",PC:"PageClose",PV:"PageVisible",PI:"PageInvisible",K:"Keystroke",F:"Format",V:"Validate",C:"Calculate"};exports.AnnotationActionEventType=AnnotationActionEventType;const DocumentActionEventType={WC:"WillClose",WS:"WillSave",DS:"DidSave",WP:"WillPrint",DP:"DidPrint"};exports.DocumentActionEventType=DocumentActionEventType;const PageActionEventType={O:"PageOpen",C:"PageClose"};exports.PageActionEventType=PageActionEventType;const VerbosityLevel={ERRORS:0,WARNINGS:1,INFOS:5};exports.VerbosityLevel=VerbosityLevel;const CMapCompressionType={NONE:0,BINARY:1};exports.CMapCompressionType=CMapCompressionType;const OPS={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotation:80,endAnnotation:81,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91};exports.OPS=OPS;const PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2};exports.PasswordResponses=PasswordResponses;let verbosity=VerbosityLevel.WARNINGS;function setVerbosityLevel(level){if(Number.isInteger(level)){verbosity=level;}}function getVerbosityLevel(){return verbosity;}function info(msg){if(verbosity>=VerbosityLevel.INFOS){if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope){console.log(`Info: ${msg}`);}else if(Window&&globalThis.ngxConsole){globalThis.ngxConsole.log(`Info: ${msg}`);}else{console.log(`Info: ${msg}`);}}}function warn(msg){if(verbosity>=VerbosityLevel.WARNINGS){if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope){console.log(`Warning: ${msg}`);}else if(Window&&globalThis.ngxConsole){globalThis.ngxConsole.log(`Warning: ${msg}`);}else{console.log(`Warning: ${msg}`);}}}function unreachable(msg){throw new Error(msg);}function assert(cond,msg){if(!cond){unreachable(msg);}}function _isValidProtocol(url){if(!url){return false;}switch(url.protocol){case"http:":case"https:":case"ftp:":case"mailto:":case"tel:":case"capacitor":return true;default:return false;}}function createValidAbsoluteUrl(url){let baseUrl=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;let options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!url){return null;}try{if(options&&typeof url==="string"){if(options.addDefaultProtocol&&url.startsWith("www.")){const dots=url.match(/\./g);if(dots&&dots.length>=2){url=`http://${url}`;}}if(options.tryConvertEncoding){try{url=stringToUTF8String(url);}catch(ex){}}}const absoluteUrl=baseUrl?new URL(url,baseUrl):new URL(url);if(_isValidProtocol(absoluteUrl)){return absoluteUrl;}}catch(ex){}return null;}function shadow(obj,prop,value){let nonSerializable=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;Object.defineProperty(obj,prop,{value,enumerable:!nonSerializable,configurable:true,writable:false});return value;}const BaseException=function BaseExceptionClosure(){function BaseException(message,name){if(this.constructor===BaseException){unreachable("Cannot initialize BaseException.");}this.message=message;this.name=name;}BaseException.prototype=new Error();BaseException.constructor=BaseException;return BaseException;}();exports.BaseException=BaseException;class PasswordException extends BaseException{constructor(msg,code){super(msg,"PasswordException");this.code=code;}}exports.PasswordException=PasswordException;class UnknownErrorException extends BaseException{constructor(msg,details){super(msg,"UnknownErrorException");this.details=details;}}exports.UnknownErrorException=UnknownErrorException;class InvalidPDFException extends BaseException{constructor(msg){super(msg,"InvalidPDFException");}}exports.InvalidPDFException=InvalidPDFException;class MissingPDFException extends BaseException{constructor(msg){super(msg,"MissingPDFException");}}exports.MissingPDFException=MissingPDFException;class UnexpectedResponseException extends BaseException{constructor(msg,status){super(msg,"UnexpectedResponseException");this.status=status;}}exports.UnexpectedResponseException=UnexpectedResponseException;class FormatError extends BaseException{constructor(msg){super(msg,"FormatError");}}exports.FormatError=FormatError;class AbortException extends BaseException{constructor(msg){super(msg,"AbortException");}}exports.AbortException=AbortException;function bytesToString(bytes){if(typeof bytes!=="object"||bytes===null||bytes.length===undefined){unreachable("Invalid argument for bytesToString");}const length=bytes.length;const MAX_ARGUMENT_COUNT=8192;if(length<MAX_ARGUMENT_COUNT){return String.fromCharCode.apply(null,bytes);}const strBuf=[];for(let i=0;i<length;i+=MAX_ARGUMENT_COUNT){const chunkEnd=Math.min(i+MAX_ARGUMENT_COUNT,length);const chunk=bytes.subarray(i,chunkEnd);strBuf.push(String.fromCharCode.apply(null,chunk));}return strBuf.join("");}function stringToBytes(str){if(typeof str!=="string"){unreachable("Invalid argument for stringToBytes");}const length=str.length;const bytes=new Uint8Array(length);for(let i=0;i<length;++i){bytes[i]=str.charCodeAt(i)&0xff;}return bytes;}function string32(value){return String.fromCharCode(value>>24&0xff,value>>16&0xff,value>>8&0xff,value&0xff);}function objectSize(obj){return Object.keys(obj).length;}function objectFromMap(map){const obj=Object.create(null);for(const[key,value]of map){obj[key]=value;}return obj;}function isLittleEndian(){const buffer8=new Uint8Array(4);buffer8[0]=1;const view32=new Uint32Array(buffer8.buffer,0,1);return view32[0]===1;}function isEvalSupported(){try{new Function("");return true;}catch(e){return false;}}class FeatureTest{static get isLittleEndian(){return shadow(this,"isLittleEndian",isLittleEndian());}static get isEvalSupported(){return shadow(this,"isEvalSupported",isEvalSupported());}static get isOffscreenCanvasSupported(){return shadow(this,"isOffscreenCanvasSupported",typeof OffscreenCanvas!=="undefined");}static get platform(){if(typeof navigator==="undefined"){return shadow(this,"platform",{isWin:false,isMac:false});}return shadow(this,"platform",{isWin:navigator.platform.includes("Win"),isMac:navigator.platform.includes("Mac")});}}exports.FeatureTest=FeatureTest;const hexNumbers=[...Array(256).keys()].map(n=>n.toString(16).padStart(2,"0"));class Util{static makeHexColor(r,g,b){return`#${hexNumbers[r]}${hexNumbers[g]}${hexNumbers[b]}`;}static scaleMinMax(transform,minMax){let temp;if(transform[0]){if(transform[0]<0){temp=minMax[0];minMax[0]=minMax[1];minMax[1]=temp;}minMax[0]*=transform[0];minMax[1]*=transform[0];if(transform[3]<0){temp=minMax[2];minMax[2]=minMax[3];minMax[3]=temp;}minMax[2]*=transform[3];minMax[3]*=transform[3];}else{temp=minMax[0];minMax[0]=minMax[2];minMax[2]=temp;temp=minMax[1];minMax[1]=minMax[3];minMax[3]=temp;if(transform[1]<0){temp=minMax[2];minMax[2]=minMax[3];minMax[3]=temp;}minMax[2]*=transform[1];minMax[3]*=transform[1];if(transform[2]<0){temp=minMax[0];minMax[0]=minMax[1];minMax[1]=temp;}minMax[0]*=transform[2];minMax[1]*=transform[2];}minMax[0]+=transform[4];minMax[1]+=transform[4];minMax[2]+=transform[5];minMax[3]+=transform[5];}static transform(m1,m2){return[m1[0]*m2[0]+m1[2]*m2[1],m1[1]*m2[0]+m1[3]*m2[1],m1[0]*m2[2]+m1[2]*m2[3],m1[1]*m2[2]+m1[3]*m2[3],m1[0]*m2[4]+m1[2]*m2[5]+m1[4],m1[1]*m2[4]+m1[3]*m2[5]+m1[5]];}static applyTransform(p,m){const xt=p[0]*m[0]+p[1]*m[2]+m[4];const yt=p[0]*m[1]+p[1]*m[3]+m[5];return[xt,yt];}static applyInverseTransform(p,m){const d=m[0]*m[3]-m[1]*m[2];const xt=(p[0]*m[3]-p[1]*m[2]+m[2]*m[5]-m[4]*m[3])/d;const yt=(-p[0]*m[1]+p[1]*m[0]+m[4]*m[1]-m[5]*m[0])/d;return[xt,yt];}static getAxialAlignedBoundingBox(r,m){const p1=Util.applyTransform(r,m);const p2=Util.applyTransform(r.slice(2,4),m);const p3=Util.applyTransform([r[0],r[3]],m);const p4=Util.applyTransform([r[2],r[1]],m);return[Math.min(p1[0],p2[0],p3[0],p4[0]),Math.min(p1[1],p2[1],p3[1],p4[1]),Math.max(p1[0],p2[0],p3[0],p4[0]),Math.max(p1[1],p2[1],p3[1],p4[1])];}static inverseTransform(m){const d=m[0]*m[3]-m[1]*m[2];return[m[3]/d,-m[1]/d,-m[2]/d,m[0]/d,(m[2]*m[5]-m[4]*m[3])/d,(m[4]*m[1]-m[5]*m[0])/d];}static singularValueDecompose2dScale(m){const transpose=[m[0],m[2],m[1],m[3]];const a=m[0]*transpose[0]+m[1]*transpose[2];const b=m[0]*transpose[1]+m[1]*transpose[3];const c=m[2]*transpose[0]+m[3]*transpose[2];const d=m[2]*transpose[1]+m[3]*transpose[3];const first=(a+d)/2;const second=Math.sqrt((a+d)**2-4*(a*d-c*b))/2;const sx=first+second||1;const sy=first-second||1;return[Math.sqrt(sx),Math.sqrt(sy)];}static normalizeRect(rect){const r=rect.slice(0);if(rect[0]>rect[2]){r[0]=rect[2];r[2]=rect[0];}if(rect[1]>rect[3]){r[1]=rect[3];r[3]=rect[1];}return r;}static intersect(rect1,rect2){const xLow=Math.max(Math.min(rect1[0],rect1[2]),Math.min(rect2[0],rect2[2]));const xHigh=Math.min(Math.max(rect1[0],rect1[2]),Math.max(rect2[0],rect2[2]));if(xLow>xHigh){return null;}const yLow=Math.max(Math.min(rect1[1],rect1[3]),Math.min(rect2[1],rect2[3]));const yHigh=Math.min(Math.max(rect1[1],rect1[3]),Math.max(rect2[1],rect2[3]));if(yLow>yHigh){return null;}return[xLow,yLow,xHigh,yHigh];}static bezierBoundingBox(x0,y0,x1,y1,x2,y2,x3,y3){const tvalues=[],bounds=[[],[]];let a,b,c,t,t1,t2,b2ac,sqrtb2ac;for(let i=0;i<2;++i){if(i===0){b=6*x0-12*x1+6*x2;a=-3*x0+9*x1-9*x2+3*x3;c=3*x1-3*x0;}else{b=6*y0-12*y1+6*y2;a=-3*y0+9*y1-9*y2+3*y3;c=3*y1-3*y0;}if(Math.abs(a)<1e-12){if(Math.abs(b)<1e-12){continue;}t=-c/b;if(0<t&&t<1){tvalues.push(t);}continue;}b2ac=b*b-4*c*a;sqrtb2ac=Math.sqrt(b2ac);if(b2ac<0){continue;}t1=(-b+sqrtb2ac)/(2*a);if(0<t1&&t1<1){tvalues.push(t1);}t2=(-b-sqrtb2ac)/(2*a);if(0<t2&&t2<1){tvalues.push(t2);}}let j=tvalues.length,mt;const jlen=j;while(j--){t=tvalues[j];mt=1-t;bounds[0][j]=mt*mt*mt*x0+3*mt*mt*t*x1+3*mt*t*t*x2+t*t*t*x3;bounds[1][j]=mt*mt*mt*y0+3*mt*mt*t*y1+3*mt*t*t*y2+t*t*t*y3;}bounds[0][jlen]=x0;bounds[1][jlen]=y0;bounds[0][jlen+1]=x3;bounds[1][jlen+1]=y3;bounds[0].length=bounds[1].length=jlen+2;return[Math.min(...bounds[0]),Math.min(...bounds[1]),Math.max(...bounds[0]),Math.max(...bounds[1])];}}exports.Util=Util;const PDFStringTranslateTable=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x2d8,0x2c7,0x2c6,0x2d9,0x2dd,0x2db,0x2da,0x2dc,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x2022,0x2020,0x2021,0x2026,0x2014,0x2013,0x192,0x2044,0x2039,0x203a,0x2212,0x2030,0x201e,0x201c,0x201d,0x2018,0x2019,0x201a,0x2122,0xfb01,0xfb02,0x141,0x152,0x160,0x178,0x17d,0x131,0x142,0x153,0x161,0x17e,0,0x20ac];function stringToPDFString(str){if(str[0]>="\xEF"){let encoding;if(str[0]==="\xFE"&&str[1]==="\xFF"){encoding="utf-16be";}else if(str[0]==="\xFF"&&str[1]==="\xFE"){encoding="utf-16le";}else if(str[0]==="\xEF"&&str[1]==="\xBB"&&str[2]==="\xBF"){encoding="utf-8";}if(encoding){try{const decoder=new TextDecoder(encoding,{fatal:true});const buffer=stringToBytes(str);return decoder.decode(buffer);}catch(ex){warn(`stringToPDFString: "${ex}".`);}}}const strBuf=[];for(let i=0,ii=str.length;i<ii;i++){const code=PDFStringTranslateTable[str.charCodeAt(i)];strBuf.push(code?String.fromCharCode(code):str.charAt(i));}return strBuf.join("");}function stringToUTF8String(str){return decodeURIComponent(escape(str));}function utf8StringToString(str){return unescape(encodeURIComponent(str));}function isArrayBuffer(v){return typeof v==="object"&&v!==null&&v.byteLength!==undefined;}function isArrayEqual(arr1,arr2){if(arr1.length!==arr2.length){return false;}for(let i=0,ii=arr1.length;i<ii;i++){if(arr1[i]!==arr2[i]){return false;}}return true;}function getModificationDate(){let date=arguments.length>0&&arguments[0]!==undefined?arguments[0]:new Date();const buffer=[date.getUTCFullYear().toString(),(date.getUTCMonth()+1).toString().padStart(2,"0"),date.getUTCDate().toString().padStart(2,"0"),date.getUTCHours().toString().padStart(2,"0"),date.getUTCMinutes().toString().padStart(2,"0"),date.getUTCSeconds().toString().padStart(2,"0")];return buffer.join("");}function createPromiseCapability(){const capability=Object.create(null);let isSettled=false;Object.defineProperty(capability,"settled",{get(){return isSettled;}});capability.promise=new Promise(function(resolve,reject){capability.resolve=function(data){isSettled=true;resolve(data);};capability.reject=function(reason){isSettled=true;reject(reason);};});return capability;}

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
const isNodeJS=false;(function checkDOMMatrix(){if(globalThis.DOMMatrix||!isNodeJS){return;}globalThis.DOMMatrix=require("canvas").DOMMatrix;})();(function checkPath2D(){if(globalThis.Path2D||!isNodeJS){return;}const{CanvasRenderingContext2D}=require("canvas");const{polyfillPath2D}=require("path2d-polyfill");globalThis.CanvasRenderingContext2D=CanvasRenderingContext2D;polyfillPath2D(globalThis);})();(function checkReadableStream(){if(globalThis.ReadableStream||!isNodeJS){return;}globalThis.ReadableStream=require("web-streams-polyfill/dist/ponyfill.js").ReadableStream;})();(function checkArrayAt(){if(Array.prototype.at){return;}__webpack_require__(43);})();(function checkTypedArrayAt(){if(Uint8Array.prototype.at){return;}__webpack_require__(117);})();(function checkStructuredClone(){if(globalThis.structuredClone){return;}__webpack_require__(129);})();

/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(44);
var entryUnbind = __webpack_require__(116);
module.exports = entryUnbind('Array', 'at');

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(45);
var toObject = __webpack_require__(82);
var lengthOfArrayLike = __webpack_require__(106);
var toIntegerOrInfinity = __webpack_require__(104);
var addToUnscopables = __webpack_require__(111);
$({
 target: 'Array',
 proto: true
}, {
 at: function at(index) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return k < 0 || k >= len ? undefined : O[k];
 }
});
addToUnscopables('at');

/***/ }),
/* 45 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var getOwnPropertyDescriptor = (__webpack_require__(47).f);
var createNonEnumerableProperty = __webpack_require__(86);
var defineBuiltIn = __webpack_require__(90);
var defineGlobalProperty = __webpack_require__(80);
var copyConstructorProperties = __webpack_require__(98);
var isForced = __webpack_require__(110);
module.exports = function (options, source) {
 var TARGET = options.target;
 var GLOBAL = options.global;
 var STATIC = options.stat;
 var FORCED, target, key, targetProperty, sourceProperty, descriptor;
 if (GLOBAL) {
  target = global;
 } else if (STATIC) {
  target = global[TARGET] || defineGlobalProperty(TARGET, {});
 } else {
  target = (global[TARGET] || {}).prototype;
 }
 if (target)
  for (key in source) {
   sourceProperty = source[key];
   if (options.dontCallGetSet) {
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
   defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),
/* 46 */
/***/ ((module) => {

var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || (function () {
 return this;
}()) || Function('return this')();

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var call = __webpack_require__(50);
var propertyIsEnumerableModule = __webpack_require__(52);
var createPropertyDescriptor = __webpack_require__(53);
var toIndexedObject = __webpack_require__(54);
var toPropertyKey = __webpack_require__(60);
var hasOwn = __webpack_require__(81);
var IE8_DOM_DEFINE = __webpack_require__(84);
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
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
module.exports = !fails(function () {
 return Object.defineProperty({}, 1, {
  get: function () {
   return 7;
  }
 })[1] != 7;
});

/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(51);
var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
 return call.apply(call, arguments);
};

/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
module.exports = !fails(function () {
 var test = function () {
 }.bind();
 return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IndexedObject = __webpack_require__(55);
var requireObjectCoercible = __webpack_require__(58);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 55 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var fails = __webpack_require__(49);
var classof = __webpack_require__(57);
var $Object = Object;
var split = uncurryThis(''.split);
module.exports = fails(function () {
 return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),
/* 56 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(51);
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
 return function () {
  return call.apply(fn, arguments);
 };
};

/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function (it) {
 return stringSlice(toString(it), 8, -1);
};

/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(59);
var $TypeError = TypeError;
module.exports = function (it) {
 if (isNullOrUndefined(it))
  throw $TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = function (it) {
 return it === null || it === undefined;
};

/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(61);
var isSymbol = __webpack_require__(65);
module.exports = function (argument) {
 var key = toPrimitive(argument, 'string');
 return isSymbol(key) ? key : key + '';
};

/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(50);
var isObject = __webpack_require__(62);
var isSymbol = __webpack_require__(65);
var getMethod = __webpack_require__(72);
var ordinaryToPrimitive = __webpack_require__(75);
var wellKnownSymbol = __webpack_require__(76);
var $TypeError = TypeError;
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
  throw $TypeError("Can't convert object to primitive value");
 }
 if (pref === undefined)
  pref = 'number';
 return ordinaryToPrimitive(input, pref);
};

/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(63);
var $documentAll = __webpack_require__(64);
var documentAll = $documentAll.all;
module.exports = $documentAll.IS_HTMLDDA ? function (it) {
 return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
 return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $documentAll = __webpack_require__(64);
var documentAll = $documentAll.all;
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
 return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
 return typeof argument == 'function';
};

/***/ }),
/* 64 */
/***/ ((module) => {

var documentAll = typeof document == 'object' && document.all;
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;
module.exports = {
 all: documentAll,
 IS_HTMLDDA: IS_HTMLDDA
};

/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(66);
var isCallable = __webpack_require__(63);
var isPrototypeOf = __webpack_require__(67);
var USE_SYMBOL_AS_UID = __webpack_require__(68);
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
 return typeof it == 'symbol';
} : function (it) {
 var $Symbol = getBuiltIn('Symbol');
 return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),
/* 66 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var isCallable = __webpack_require__(63);
var aFunction = function (argument) {
 return isCallable(argument) ? argument : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),
/* 68 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_SYMBOL = __webpack_require__(69);
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 69 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var V8_VERSION = __webpack_require__(70);
var fails = __webpack_require__(49);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 var symbol = Symbol();
 return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),
/* 70 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var userAgent = __webpack_require__(71);
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
/* 71 */
/***/ ((module) => {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

/***/ }),
/* 72 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(73);
var isNullOrUndefined = __webpack_require__(59);
module.exports = function (V, P) {
 var func = V[P];
 return isNullOrUndefined(func) ? undefined : aCallable(func);
};

/***/ }),
/* 73 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(63);
var tryToString = __webpack_require__(74);
var $TypeError = TypeError;
module.exports = function (argument) {
 if (isCallable(argument))
  return argument;
 throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),
/* 74 */
/***/ ((module) => {

var $String = String;
module.exports = function (argument) {
 try {
  return $String(argument);
 } catch (error) {
  return 'Object';
 }
};

/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(50);
var isCallable = __webpack_require__(63);
var isObject = __webpack_require__(62);
var $TypeError = TypeError;
module.exports = function (input, pref) {
 var fn, val;
 if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
  return val;
 if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)))
  return val;
 if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
  return val;
 throw $TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 76 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var shared = __webpack_require__(77);
var hasOwn = __webpack_require__(81);
var uid = __webpack_require__(83);
var NATIVE_SYMBOL = __webpack_require__(69);
var USE_SYMBOL_AS_UID = __webpack_require__(68);
var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function (name) {
 if (!hasOwn(WellKnownSymbolsStore, name)) {
  WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
 }
 return WellKnownSymbolsStore[name];
};

/***/ }),
/* 77 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(78);
var store = __webpack_require__(79);
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.30.0',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
 license: 'https://github.com/zloirock/core-js/blob/v3.30.0/LICENSE',
 source: 'https://github.com/zloirock/core-js'
});

/***/ }),
/* 78 */
/***/ ((module) => {

module.exports = false;

/***/ }),
/* 79 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var defineGlobalProperty = __webpack_require__(80);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),
/* 80 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
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
/* 81 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var toObject = __webpack_require__(82);
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
module.exports = Object.hasOwn || function hasOwn(it, key) {
 return hasOwnProperty(toObject(it), key);
};

/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(58);
var $Object = Object;
module.exports = function (argument) {
 return $Object(requireObjectCoercible(argument));
};

/***/ }),
/* 83 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function (key) {
 return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),
/* 84 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var fails = __webpack_require__(49);
var createElement = __webpack_require__(85);
module.exports = !DESCRIPTORS && !fails(function () {
 return Object.defineProperty(createElement('div'), 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 85 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var isObject = __webpack_require__(62);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var definePropertyModule = __webpack_require__(87);
var createPropertyDescriptor = __webpack_require__(53);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var IE8_DOM_DEFINE = __webpack_require__(84);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(88);
var anObject = __webpack_require__(89);
var toPropertyKey = __webpack_require__(60);
var $TypeError = TypeError;
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
  throw $TypeError('Accessors not supported');
 if ('value' in Attributes)
  O[P] = Attributes.value;
 return O;
};

/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var fails = __webpack_require__(49);
module.exports = DESCRIPTORS && fails(function () {
 return Object.defineProperty(function () {
 }, 'prototype', {
  value: 42,
  writable: false
 }).prototype != 42;
});

/***/ }),
/* 89 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(62);
var $String = String;
var $TypeError = TypeError;
module.exports = function (argument) {
 if (isObject(argument))
  return argument;
 throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(63);
var definePropertyModule = __webpack_require__(87);
var makeBuiltIn = __webpack_require__(91);
var defineGlobalProperty = __webpack_require__(80);
module.exports = function (O, key, value, options) {
 if (!options)
  options = {};
 var simple = options.enumerable;
 var name = options.name !== undefined ? options.name : key;
 if (isCallable(value))
  makeBuiltIn(value, name, options);
 if (options.global) {
  if (simple)
   O[key] = value;
  else
   defineGlobalProperty(key, value);
 } else {
  try {
   if (!options.unsafe)
    delete O[key];
   else if (O[key])
    simple = true;
  } catch (error) {
  }
  if (simple)
   O[key] = value;
  else
   definePropertyModule.f(O, key, {
    value: value,
    enumerable: false,
    configurable: !options.nonConfigurable,
    writable: !options.nonWritable
   });
 }
 return O;
};

/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var fails = __webpack_require__(49);
var isCallable = __webpack_require__(63);
var hasOwn = __webpack_require__(81);
var DESCRIPTORS = __webpack_require__(48);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(92).CONFIGURABLE);
var inspectSource = __webpack_require__(93);
var InternalStateModule = __webpack_require__(94);
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
 return defineProperty(function () {
 }, 'length', { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split('String');
var makeBuiltIn = module.exports = function (value, name, options) {
 if (stringSlice($String(name), 0, 7) === 'Symbol(') {
  name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
 }
 if (options && options.getter)
  name = 'get ' + name;
 if (options && options.setter)
  name = 'set ' + name;
 if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
  if (DESCRIPTORS)
   defineProperty(value, 'name', {
    value: name,
    configurable: true
   });
  else
   value.name = name;
 }
 if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
  defineProperty(value, 'length', { value: options.arity });
 }
 try {
  if (options && hasOwn(options, 'constructor') && options.constructor) {
   if (DESCRIPTORS)
    defineProperty(value, 'prototype', { writable: false });
  } else if (value.prototype)
   value.prototype = undefined;
 } catch (error) {
 }
 var state = enforceInternalState(value);
 if (!hasOwn(state, 'source')) {
  state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
 }
 return value;
};
Function.prototype.toString = makeBuiltIn(function toString() {
 return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),
/* 92 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var hasOwn = __webpack_require__(81);
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
/* 93 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var isCallable = __webpack_require__(63);
var store = __webpack_require__(79);
var functionToString = uncurryThis(Function.toString);
if (!isCallable(store.inspectSource)) {
 store.inspectSource = function (it) {
  return functionToString(it);
 };
}
module.exports = store.inspectSource;

/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(95);
var global = __webpack_require__(46);
var isObject = __webpack_require__(62);
var createNonEnumerableProperty = __webpack_require__(86);
var hasOwn = __webpack_require__(81);
var shared = __webpack_require__(79);
var sharedKey = __webpack_require__(96);
var hiddenKeys = __webpack_require__(97);
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
 store.get = store.get;
 store.has = store.has;
 store.set = store.set;
 set = function (it, metadata) {
  if (store.has(it))
   throw TypeError(OBJECT_ALREADY_INITIALIZED);
  metadata.facade = it;
  store.set(it, metadata);
  return metadata;
 };
 get = function (it) {
  return store.get(it) || {};
 };
 has = function (it) {
  return store.has(it);
 };
} else {
 var STATE = sharedKey('state');
 hiddenKeys[STATE] = true;
 set = function (it, metadata) {
  if (hasOwn(it, STATE))
   throw TypeError(OBJECT_ALREADY_INITIALIZED);
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
/* 95 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var isCallable = __webpack_require__(63);
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(77);
var uid = __webpack_require__(83);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 97 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 98 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(81);
var ownKeys = __webpack_require__(99);
var getOwnPropertyDescriptorModule = __webpack_require__(47);
var definePropertyModule = __webpack_require__(87);
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
/* 99 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(66);
var uncurryThis = __webpack_require__(56);
var getOwnPropertyNamesModule = __webpack_require__(100);
var getOwnPropertySymbolsModule = __webpack_require__(109);
var anObject = __webpack_require__(89);
var concat = uncurryThis([].concat);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(101);
var enumBugKeys = __webpack_require__(108);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var hasOwn = __webpack_require__(81);
var toIndexedObject = __webpack_require__(54);
var indexOf = (__webpack_require__(102).indexOf);
var hiddenKeys = __webpack_require__(97);
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
/* 102 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(54);
var toAbsoluteIndex = __webpack_require__(103);
var lengthOfArrayLike = __webpack_require__(106);
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
/* 103 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(104);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toIntegerOrInfinity(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(105);
module.exports = function (argument) {
 var number = +argument;
 return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),
/* 105 */
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = Math.trunc || function trunc(x) {
 var n = +x;
 return (n > 0 ? floor : ceil)(n);
};

/***/ }),
/* 106 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(107);
module.exports = function (obj) {
 return toLength(obj.length);
};

/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(104);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 108 */
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
/* 109 */
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
var isCallable = __webpack_require__(63);
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
/* 111 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(76);
var create = __webpack_require__(112);
var defineProperty = (__webpack_require__(87).f);
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == undefined) {
 defineProperty(ArrayPrototype, UNSCOPABLES, {
  configurable: true,
  value: create(null)
 });
}
module.exports = function (key) {
 ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),
/* 112 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(89);
var definePropertiesModule = __webpack_require__(113);
var enumBugKeys = __webpack_require__(108);
var hiddenKeys = __webpack_require__(97);
var html = __webpack_require__(115);
var documentCreateElement = __webpack_require__(85);
var sharedKey = __webpack_require__(96);
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
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(48);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(88);
var definePropertyModule = __webpack_require__(87);
var anObject = __webpack_require__(89);
var toIndexedObject = __webpack_require__(54);
var objectKeys = __webpack_require__(114);
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
/* 114 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(101);
var enumBugKeys = __webpack_require__(108);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 115 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(66);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 116 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var uncurryThis = __webpack_require__(56);
module.exports = function (CONSTRUCTOR, METHOD) {
 return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(118);

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(119);
var lengthOfArrayLike = __webpack_require__(106);
var toIntegerOrInfinity = __webpack_require__(104);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
exportTypedArrayMethod('at', function at(index) {
 var O = aTypedArray(this);
 var len = lengthOfArrayLike(O);
 var relativeIndex = toIntegerOrInfinity(index);
 var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
 return k < 0 || k >= len ? undefined : O[k];
});

/***/ }),
/* 119 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(120);
var DESCRIPTORS = __webpack_require__(48);
var global = __webpack_require__(46);
var isCallable = __webpack_require__(63);
var isObject = __webpack_require__(62);
var hasOwn = __webpack_require__(81);
var classof = __webpack_require__(121);
var tryToString = __webpack_require__(74);
var createNonEnumerableProperty = __webpack_require__(86);
var defineBuiltIn = __webpack_require__(90);
var defineBuiltInAccessor = __webpack_require__(123);
var isPrototypeOf = __webpack_require__(67);
var getPrototypeOf = __webpack_require__(124);
var setPrototypeOf = __webpack_require__(126);
var wellKnownSymbol = __webpack_require__(76);
var uid = __webpack_require__(83);
var InternalStateModule = __webpack_require__(94);
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
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
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
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
var getTypedArrayConstructor = function (it) {
 var proto = getPrototypeOf(it);
 if (!isObject(proto))
  return;
 var state = getInternalState(proto);
 return state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
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
  defineBuiltIn(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
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
    return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
   } catch (error) {
   }
  } else
   return;
 }
 for (ARRAY in TypedArrayConstructorsList) {
  TypedArrayConstructor = global[ARRAY];
  if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
   defineBuiltIn(TypedArrayConstructor, KEY, property);
  }
 }
};
for (NAME in TypedArrayConstructorsList) {
 Constructor = global[NAME];
 Prototype = Constructor && Constructor.prototype;
 if (Prototype)
  enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
 else
  NATIVE_ARRAY_BUFFER_VIEWS = false;
}
for (NAME in BigIntArrayConstructorsList) {
 Constructor = global[NAME];
 Prototype = Constructor && Constructor.prototype;
 if (Prototype)
  enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
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
 defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
  configurable: true,
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
 TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
 aTypedArray: aTypedArray,
 aTypedArrayConstructor: aTypedArrayConstructor,
 exportTypedArrayMethod: exportTypedArrayMethod,
 exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
 getTypedArrayConstructor: getTypedArrayConstructor,
 isView: isView,
 isTypedArray: isTypedArray,
 TypedArray: TypedArray,
 TypedArrayPrototype: TypedArrayPrototype
};

/***/ }),
/* 120 */
/***/ ((module) => {

module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

/***/ }),
/* 121 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(122);
var isCallable = __webpack_require__(63);
var classofRaw = __webpack_require__(57);
var wellKnownSymbol = __webpack_require__(76);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;
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
 return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),
/* 122 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(76);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 123 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var makeBuiltIn = __webpack_require__(91);
var defineProperty = __webpack_require__(87);
module.exports = function (target, name, descriptor) {
 if (descriptor.get)
  makeBuiltIn(descriptor.get, name, { getter: true });
 if (descriptor.set)
  makeBuiltIn(descriptor.set, name, { setter: true });
 return defineProperty.f(target, name, descriptor);
};

/***/ }),
/* 124 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(81);
var isCallable = __webpack_require__(63);
var toObject = __webpack_require__(82);
var sharedKey = __webpack_require__(96);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(125);
var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
 var object = toObject(O);
 if (hasOwn(object, IE_PROTO))
  return object[IE_PROTO];
 var constructor = object.constructor;
 if (isCallable(constructor) && object instanceof constructor) {
  return constructor.prototype;
 }
 return object instanceof $Object ? ObjectPrototype : null;
};

/***/ }),
/* 125 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 126 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThisAccessor = __webpack_require__(127);
var anObject = __webpack_require__(89);
var aPossiblePrototype = __webpack_require__(128);
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? (function () {
 var CORRECT_SETTER = false;
 var test = {};
 var setter;
 try {
  setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
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
/* 127 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var aCallable = __webpack_require__(73);
module.exports = function (object, key, method) {
 try {
  return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
 } catch (error) {
 }
};

/***/ }),
/* 128 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(63);
var $String = String;
var $TypeError = TypeError;
module.exports = function (argument) {
 if (typeof argument == 'object' || isCallable(argument))
  return argument;
 throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};

/***/ }),
/* 129 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(130);
__webpack_require__(137);
__webpack_require__(139);
__webpack_require__(162);
__webpack_require__(164);
var path = __webpack_require__(176);
module.exports = path.structuredClone;

/***/ }),
/* 130 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(54);
var addToUnscopables = __webpack_require__(111);
var Iterators = __webpack_require__(131);
var InternalStateModule = __webpack_require__(94);
var defineProperty = (__webpack_require__(87).f);
var defineIterator = __webpack_require__(132);
var createIterResultObject = __webpack_require__(136);
var IS_PURE = __webpack_require__(78);
var DESCRIPTORS = __webpack_require__(48);
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
  return createIterResultObject(undefined, true);
 }
 if (kind == 'keys')
  return createIterResultObject(index, false);
 if (kind == 'values')
  return createIterResultObject(target[index], false);
 return createIterResultObject([
  index,
  target[index]
 ], false);
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
/* 131 */
/***/ ((module) => {

module.exports = {};

/***/ }),
/* 132 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(45);
var call = __webpack_require__(50);
var IS_PURE = __webpack_require__(78);
var FunctionName = __webpack_require__(92);
var isCallable = __webpack_require__(63);
var createIteratorConstructor = __webpack_require__(133);
var getPrototypeOf = __webpack_require__(124);
var setPrototypeOf = __webpack_require__(126);
var setToStringTag = __webpack_require__(135);
var createNonEnumerableProperty = __webpack_require__(86);
var defineBuiltIn = __webpack_require__(90);
var wellKnownSymbol = __webpack_require__(76);
var Iterators = __webpack_require__(131);
var IteratorsCore = __webpack_require__(134);
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
     defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
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
     defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
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
  defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
 }
 Iterators[NAME] = defaultIterator;
 return methods;
};

/***/ }),
/* 133 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(134).IteratorPrototype);
var create = __webpack_require__(112);
var createPropertyDescriptor = __webpack_require__(53);
var setToStringTag = __webpack_require__(135);
var Iterators = __webpack_require__(131);
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
/* 134 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(49);
var isCallable = __webpack_require__(63);
var isObject = __webpack_require__(62);
var create = __webpack_require__(112);
var getPrototypeOf = __webpack_require__(124);
var defineBuiltIn = __webpack_require__(90);
var wellKnownSymbol = __webpack_require__(76);
var IS_PURE = __webpack_require__(78);
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
var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
 var test = {};
 return IteratorPrototype[ITERATOR].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE)
 IteratorPrototype = {};
else if (IS_PURE)
 IteratorPrototype = create(IteratorPrototype);
if (!isCallable(IteratorPrototype[ITERATOR])) {
 defineBuiltIn(IteratorPrototype, ITERATOR, function () {
  return this;
 });
}
module.exports = {
 IteratorPrototype: IteratorPrototype,
 BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 135 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(87).f);
var hasOwn = __webpack_require__(81);
var wellKnownSymbol = __webpack_require__(76);
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
/* 136 */
/***/ ((module) => {

module.exports = function (value, done) {
 return {
  value: value,
  done: done
 };
};

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(122);
var defineBuiltIn = __webpack_require__(90);
var toString = __webpack_require__(138);
if (!TO_STRING_TAG_SUPPORT) {
 defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 138 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(122);
var classof = __webpack_require__(121);
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
 return '[object ' + classof(this) + ']';
};

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(140);

/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(141);
var collectionStrong = __webpack_require__(159);
collection('Map', function (init) {
 return function Map() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionStrong);

/***/ }),
/* 141 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(45);
var global = __webpack_require__(46);
var uncurryThis = __webpack_require__(56);
var isForced = __webpack_require__(110);
var defineBuiltIn = __webpack_require__(90);
var InternalMetadataModule = __webpack_require__(142);
var iterate = __webpack_require__(149);
var anInstance = __webpack_require__(156);
var isCallable = __webpack_require__(63);
var isNullOrUndefined = __webpack_require__(59);
var isObject = __webpack_require__(62);
var fails = __webpack_require__(49);
var checkCorrectnessOfIteration = __webpack_require__(157);
var setToStringTag = __webpack_require__(135);
var inheritIfRequired = __webpack_require__(158);
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
  defineBuiltIn(NativePrototype, KEY, KEY == 'add' ? function add(value) {
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
    if (!isNullOrUndefined(iterable))
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
  constructor: true,
  forced: Constructor != NativeConstructor
 }, exported);
 setToStringTag(Constructor, CONSTRUCTOR_NAME);
 if (!IS_WEAK)
  common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
 return Constructor;
};

/***/ }),
/* 142 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(45);
var uncurryThis = __webpack_require__(56);
var hiddenKeys = __webpack_require__(97);
var isObject = __webpack_require__(62);
var hasOwn = __webpack_require__(81);
var defineProperty = (__webpack_require__(87).f);
var getOwnPropertyNamesModule = __webpack_require__(100);
var getOwnPropertyNamesExternalModule = __webpack_require__(143);
var isExtensible = __webpack_require__(146);
var uid = __webpack_require__(83);
var FREEZING = __webpack_require__(148);
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
/* 143 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(57);
var toIndexedObject = __webpack_require__(54);
var $getOwnPropertyNames = (__webpack_require__(100).f);
var arraySlice = __webpack_require__(144);
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
/* 144 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toAbsoluteIndex = __webpack_require__(103);
var lengthOfArrayLike = __webpack_require__(106);
var createProperty = __webpack_require__(145);
var $Array = Array;
var max = Math.max;
module.exports = function (O, start, end) {
 var length = lengthOfArrayLike(O);
 var k = toAbsoluteIndex(start, length);
 var fin = toAbsoluteIndex(end === undefined ? length : end, length);
 var result = $Array(max(fin - k, 0));
 for (var n = 0; k < fin; k++, n++)
  createProperty(result, n, O[k]);
 result.length = n;
 return result;
};

/***/ }),
/* 145 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(60);
var definePropertyModule = __webpack_require__(87);
var createPropertyDescriptor = __webpack_require__(53);
module.exports = function (object, key, value) {
 var propertyKey = toPropertyKey(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 146 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
var isObject = __webpack_require__(62);
var classof = __webpack_require__(57);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(147);
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
/* 147 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
module.exports = fails(function () {
 if (typeof ArrayBuffer == 'function') {
  var buffer = new ArrayBuffer(8);
  if (Object.isExtensible(buffer))
   Object.defineProperty(buffer, 'a', { value: 8 });
 }
});

/***/ }),
/* 148 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
module.exports = !fails(function () {
 return Object.isExtensible(Object.preventExtensions({}));
});

/***/ }),
/* 149 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(150);
var call = __webpack_require__(50);
var anObject = __webpack_require__(89);
var tryToString = __webpack_require__(74);
var isArrayIteratorMethod = __webpack_require__(152);
var lengthOfArrayLike = __webpack_require__(106);
var isPrototypeOf = __webpack_require__(67);
var getIterator = __webpack_require__(153);
var getIteratorMethod = __webpack_require__(154);
var iteratorClose = __webpack_require__(155);
var $TypeError = TypeError;
var Result = function (stopped, result) {
 this.stopped = stopped;
 this.result = result;
};
var ResultPrototype = Result.prototype;
module.exports = function (iterable, unboundFunction, options) {
 var that = options && options.that;
 var AS_ENTRIES = !!(options && options.AS_ENTRIES);
 var IS_RECORD = !!(options && options.IS_RECORD);
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
 if (IS_RECORD) {
  iterator = iterable.iterator;
 } else if (IS_ITERATOR) {
  iterator = iterable;
 } else {
  iterFn = getIteratorMethod(iterable);
  if (!iterFn)
   throw $TypeError(tryToString(iterable) + ' is not iterable');
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
 next = IS_RECORD ? iterable.next : iterator.next;
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
/* 150 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(151);
var aCallable = __webpack_require__(73);
var NATIVE_BIND = __webpack_require__(51);
var bind = uncurryThis(uncurryThis.bind);
module.exports = function (fn, that) {
 aCallable(fn);
 return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function () {
  return fn.apply(that, arguments);
 };
};

/***/ }),
/* 151 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classofRaw = __webpack_require__(57);
var uncurryThis = __webpack_require__(56);
module.exports = function (fn) {
 if (classofRaw(fn) === 'Function')
  return uncurryThis(fn);
};

/***/ }),
/* 152 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(76);
var Iterators = __webpack_require__(131);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 153 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(50);
var aCallable = __webpack_require__(73);
var anObject = __webpack_require__(89);
var tryToString = __webpack_require__(74);
var getIteratorMethod = __webpack_require__(154);
var $TypeError = TypeError;
module.exports = function (argument, usingIterator) {
 var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
 if (aCallable(iteratorMethod))
  return anObject(call(iteratorMethod, argument));
 throw $TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),
/* 154 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(121);
var getMethod = __webpack_require__(72);
var isNullOrUndefined = __webpack_require__(59);
var Iterators = __webpack_require__(131);
var wellKnownSymbol = __webpack_require__(76);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (!isNullOrUndefined(it))
  return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),
/* 155 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(50);
var anObject = __webpack_require__(89);
var getMethod = __webpack_require__(72);
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
/* 156 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototypeOf = __webpack_require__(67);
var $TypeError = TypeError;
module.exports = function (it, Prototype) {
 if (isPrototypeOf(Prototype, it))
  return it;
 throw $TypeError('Incorrect invocation');
};

/***/ }),
/* 157 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(76);
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
/* 158 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(63);
var isObject = __webpack_require__(62);
var setPrototypeOf = __webpack_require__(126);
module.exports = function ($this, dummy, Wrapper) {
 var NewTarget, NewTargetPrototype;
 if (setPrototypeOf && isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
  setPrototypeOf($this, NewTargetPrototype);
 return $this;
};

/***/ }),
/* 159 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var create = __webpack_require__(112);
var defineBuiltInAccessor = __webpack_require__(123);
var defineBuiltIns = __webpack_require__(160);
var bind = __webpack_require__(150);
var anInstance = __webpack_require__(156);
var isNullOrUndefined = __webpack_require__(59);
var iterate = __webpack_require__(149);
var defineIterator = __webpack_require__(132);
var createIterResultObject = __webpack_require__(136);
var setSpecies = __webpack_require__(161);
var DESCRIPTORS = __webpack_require__(48);
var fastKey = (__webpack_require__(142).fastKey);
var InternalStateModule = __webpack_require__(94);
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
   if (!isNullOrUndefined(iterable))
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
  defineBuiltIns(Prototype, {
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
  defineBuiltIns(Prototype, IS_MAP ? {
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
   defineBuiltInAccessor(Prototype, 'size', {
    configurable: true,
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
    return createIterResultObject(undefined, true);
   }
   if (kind == 'keys')
    return createIterResultObject(entry.key, false);
   if (kind == 'values')
    return createIterResultObject(entry.value, false);
   return createIterResultObject([
    entry.key,
    entry.value
   ], false);
  }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
  setSpecies(CONSTRUCTOR_NAME);
 }
};

/***/ }),
/* 160 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineBuiltIn = __webpack_require__(90);
module.exports = function (target, src, options) {
 for (var key in src)
  defineBuiltIn(target, key, src[key], options);
 return target;
};

/***/ }),
/* 161 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(66);
var defineBuiltInAccessor = __webpack_require__(123);
var wellKnownSymbol = __webpack_require__(76);
var DESCRIPTORS = __webpack_require__(48);
var SPECIES = wellKnownSymbol('species');
module.exports = function (CONSTRUCTOR_NAME) {
 var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
 if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
  defineBuiltInAccessor(Constructor, SPECIES, {
   configurable: true,
   get: function () {
    return this;
   }
  });
 }
};

/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(163);

/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(141);
var collectionStrong = __webpack_require__(159);
collection('Set', function (init) {
 return function Set() {
  return init(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionStrong);

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(78);
var $ = __webpack_require__(45);
var global = __webpack_require__(46);
var getBuiltin = __webpack_require__(66);
var uncurryThis = __webpack_require__(56);
var fails = __webpack_require__(49);
var uid = __webpack_require__(83);
var isCallable = __webpack_require__(63);
var isConstructor = __webpack_require__(165);
var isNullOrUndefined = __webpack_require__(59);
var isObject = __webpack_require__(62);
var isSymbol = __webpack_require__(65);
var iterate = __webpack_require__(149);
var anObject = __webpack_require__(89);
var classof = __webpack_require__(121);
var hasOwn = __webpack_require__(81);
var createProperty = __webpack_require__(145);
var createNonEnumerableProperty = __webpack_require__(86);
var lengthOfArrayLike = __webpack_require__(106);
var validateArgumentsLength = __webpack_require__(166);
var getRegExpFlags = __webpack_require__(167);
var MapHelpers = __webpack_require__(169);
var SetHelpers = __webpack_require__(170);
var ERROR_STACK_INSTALLABLE = __webpack_require__(171);
var PROPER_TRANSFER = __webpack_require__(172);
var Object = global.Object;
var Array = global.Array;
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
var Map = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapGet = MapHelpers.get;
var mapSet = MapHelpers.set;
var Set = SetHelpers.Set;
var setAdd = SetHelpers.add;
var objectKeys = getBuiltin('Object', 'keys');
var push = uncurryThis([].push);
var thisBooleanValue = uncurryThis(true.valueOf);
var thisNumberValue = uncurryThis(1.0.valueOf);
var thisStringValue = uncurryThis(''.valueOf);
var thisTimeValue = uncurryThis(Date.prototype.getTime);
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
var checkErrorsCloning = function (structuredCloneImplementation, $Error) {
 return !fails(function () {
  var error = new $Error();
  var test = structuredCloneImplementation({
   a: error,
   b: error
  });
  return !(test && test.a === test.b && test.a instanceof $Error && test.a.stack === error.stack);
 });
};
var checkNewErrorsCloningSemantic = function (structuredCloneImplementation) {
 return !fails(function () {
  var test = structuredCloneImplementation(new global.AggregateError([1], PERFORMANCE_MARK, { cause: 3 }));
  return test.name != 'AggregateError' || test.errors[0] != 1 || test.message != PERFORMANCE_MARK || test.cause != 3;
 });
};
var nativeStructuredClone = global.structuredClone;
var FORCED_REPLACEMENT = IS_PURE || !checkErrorsCloning(nativeStructuredClone, Error) || !checkErrorsCloning(nativeStructuredClone, DOMException) || !checkNewErrorsCloningSemantic(nativeStructuredClone);
var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
 return new PerformanceMark(PERFORMANCE_MARK, { detail: value }).detail;
});
var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;
var throwUncloneable = function (type) {
 throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR);
};
var throwUnpolyfillable = function (type, action) {
 throw new DOMException((action || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR);
};
var createDataTransfer = function () {
 var dataTransfer;
 try {
  dataTransfer = new global.DataTransfer();
 } catch (error) {
  try {
   dataTransfer = new global.ClipboardEvent('').clipboardData;
  } catch (error2) {
  }
 }
 return dataTransfer && dataTransfer.items && dataTransfer.files ? dataTransfer : null;
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
 var C, name, cloned, dataTransfer, i, length, keys, key, source, target, options;
 switch (type) {
 case 'Array':
  cloned = Array(lengthOfArrayLike(value));
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
  cloned = new RegExp(value.source, getRegExpFlags(value));
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
  dataTransfer = createDataTransfer();
  if (dataTransfer) {
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
    cloned = Object(thisBooleanValue(value));
    break;
   case 'Number':
    cloned = Object(thisNumberValue(value));
    break;
   case 'String':
    cloned = Object(thisStringValue(value));
    break;
   case 'Date':
    cloned = new Date(thisTimeValue(value));
    break;
   case 'ArrayBuffer':
    C = global.DataView;
    if (!C && typeof value.slice != 'function')
     throwUnpolyfillable(type);
    try {
     if (typeof value.slice == 'function' && !value.resizable) {
      cloned = value.slice(0);
     } else {
      length = value.byteLength;
      options = 'maxByteLength' in value ? { maxByteLength: value.maxByteLength } : undefined;
      cloned = new ArrayBuffer(length, options);
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
   case 'CropTarget':
   case 'CryptoKey':
   case 'FileSystemDirectoryHandle':
   case 'FileSystemFileHandle':
   case 'FileSystemHandle':
   case 'GPUCompilationInfo':
   case 'GPUCompilationMessage':
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
    if (!isCallable(value.transfer))
     throwUnpolyfillable(type, TRANSFERRING);
    transferred = value.transfer();
    break;
   case 'MediaSourceHandle':
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
  var options = validateArgumentsLength(arguments.length, 1) > 1 && !isNullOrUndefined(arguments[1]) ? anObject(arguments[1]) : undefined;
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
/* 165 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var fails = __webpack_require__(49);
var isCallable = __webpack_require__(63);
var classof = __webpack_require__(121);
var getBuiltIn = __webpack_require__(66);
var inspectSource = __webpack_require__(93);
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
/* 166 */
/***/ ((module) => {

var $TypeError = TypeError;
module.exports = function (passed, required) {
 if (passed < required)
  throw $TypeError('Not enough arguments');
 return passed;
};

/***/ }),
/* 167 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(50);
var hasOwn = __webpack_require__(81);
var isPrototypeOf = __webpack_require__(67);
var regExpFlags = __webpack_require__(168);
var RegExpPrototype = RegExp.prototype;
module.exports = function (R) {
 var flags = R.flags;
 return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R) ? call(regExpFlags, R) : flags;
};

/***/ }),
/* 168 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(89);
module.exports = function () {
 var that = anObject(this);
 var result = '';
 if (that.hasIndices)
  result += 'd';
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
 if (that.unicodeSets)
  result += 'v';
 if (that.sticky)
  result += 'y';
 return result;
};

/***/ }),
/* 169 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var MapPrototype = Map.prototype;
module.exports = {
 Map: Map,
 set: uncurryThis(MapPrototype.set),
 get: uncurryThis(MapPrototype.get),
 has: uncurryThis(MapPrototype.has),
 remove: uncurryThis(MapPrototype['delete']),
 proto: MapPrototype
};

/***/ }),
/* 170 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(56);
var SetPrototype = Set.prototype;
module.exports = {
 Set: Set,
 add: uncurryThis(SetPrototype.add),
 has: uncurryThis(SetPrototype.has),
 remove: uncurryThis(SetPrototype['delete']),
 proto: SetPrototype
};

/***/ }),
/* 171 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(49);
var createPropertyDescriptor = __webpack_require__(53);
module.exports = !fails(function () {
 var error = Error('a');
 if (!('stack' in error))
  return true;
 Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
 return error.stack !== 7;
});

/***/ }),
/* 172 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
var fails = __webpack_require__(49);
var V8 = __webpack_require__(70);
var IS_BROWSER = __webpack_require__(173);
var IS_DENO = __webpack_require__(174);
var IS_NODE = __webpack_require__(175);
var structuredClone = global.structuredClone;
module.exports = !!structuredClone && !fails(function () {
 if (IS_DENO && V8 > 92 || IS_NODE && V8 > 94 || IS_BROWSER && V8 > 97)
  return false;
 var buffer = new ArrayBuffer(8);
 var clone = structuredClone(buffer, { transfer: [buffer] });
 return buffer.byteLength != 0 || clone.byteLength != 8;
});

/***/ }),
/* 173 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_DENO = __webpack_require__(174);
var IS_NODE = __webpack_require__(175);
module.exports = !IS_DENO && !IS_NODE && typeof window == 'object' && typeof document == 'object';

/***/ }),
/* 174 */
/***/ ((module) => {

module.exports = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

/***/ }),
/* 175 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(57);
module.exports = typeof process != 'undefined' && classof(process) == 'process';

/***/ }),
/* 176 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(46);
module.exports = global;

/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.TextHighlighter=void 0;class TextHighlighter{constructor(_ref){let{findController,eventBus,pageIndex}=_ref;this.findController=findController;this.matches=[];this.eventBus=eventBus;this.pageIdx=pageIndex;this._onUpdateTextLayerMatches=null;this.textDivs=null;this.textContentItemsStr=null;this.enabled=false;}setTextMapping(divs,texts){this.textDivs=divs;this.textContentItemsStr=texts;}enable(){if(!this.textDivs||!this.textContentItemsStr){throw new Error("Text divs and strings have not been set.");}if(this.enabled){return;}this.enabled=true;if(!this._onUpdateTextLayerMatches){this._onUpdateTextLayerMatches=evt=>{if(evt.pageIndex===this.pageIdx||evt.pageIndex===-1){this._updateMatches();}};this.eventBus._on("updatetextlayermatches",this._onUpdateTextLayerMatches);}this._updateMatches();}disable(){if(!this.enabled){return;}this.enabled=false;if(this._onUpdateTextLayerMatches){this.eventBus._off("updatetextlayermatches",this._onUpdateTextLayerMatches);this._onUpdateTextLayerMatches=null;}this._updateMatches(true);}_convertMatches(matches,matchesLength,matchesColor){if(!matches){return[];}const{textContentItemsStr}=this;let i=0,iIndex=0;const end=textContentItemsStr.length-1;const result=[];for(let m=0,mm=matches.length;m<mm;m++){let matchIdx=matches[m];while(i!==end&&matchIdx>=iIndex+textContentItemsStr[i].length){iIndex+=textContentItemsStr[i].length;i++;}if(i===textContentItemsStr.length){globalThis.ngxConsole.error("Could not find a matching mapping");}const match={color:matchesColor?matchesColor[m]:0,begin:{divIdx:i,offset:matchIdx-iIndex}};matchIdx+=matchesLength[m];while(i!==end&&matchIdx>iIndex+textContentItemsStr[i].length){iIndex+=textContentItemsStr[i].length;i++;}match.end={divIdx:i,offset:matchIdx-iIndex};result.push(match);}return result;}_renderMatches(matches){if(matches.length===0){return;}const{findController,pageIdx}=this;const{textContentItemsStr,textDivs}=this;const isSelectedPage=pageIdx===findController.selected.pageIdx;const selectedMatchIdx=findController.selected.matchIdx;const highlightAll=findController.state.highlightAll;let prevEnd=null;const infinity={divIdx:-1,offset:undefined};function beginText(begin,className){const divIdx=begin.divIdx;textDivs[divIdx].textContent="";return appendTextToDiv(divIdx,0,begin.offset,className);}function appendTextToDiv(divIdx,fromOffset,toOffset,className){let div=textDivs[divIdx];if(div.nodeType===Node.TEXT_NODE){const span=document.createElement("span");div.before(span);span.append(div);textDivs[divIdx]=span;div=span;}const content=textContentItemsStr[divIdx].substring(fromOffset,toOffset);const node=document.createTextNode(content);if(className){const span=document.createElement("span");span.className=`${className} appended`;span.append(node);div.append(span);return className.includes("selected")?span.offsetLeft:0;}div.append(node);return 0;}let i0=selectedMatchIdx,i1=i0+1;if(highlightAll){i0=0;i1=matches.length;}else if(!isSelectedPage){return;}for(let i=i0;i<i1;i++){const match=matches[i];const begin=match.begin;const end=match.end;const isSelected=isSelectedPage&&i===selectedMatchIdx;const colorNumber=match.color%5;const highlightSuffix=(isSelected?" selected":"")+" color"+colorNumber;let selectedLeft=0;if(!prevEnd||begin.divIdx!==prevEnd.divIdx){if(prevEnd!==null){appendTextToDiv(prevEnd.divIdx,prevEnd.offset,infinity.offset);}beginText(begin);}else{appendTextToDiv(prevEnd.divIdx,prevEnd.offset,begin.offset);}if(begin.divIdx===end.divIdx){selectedLeft=appendTextToDiv(begin.divIdx,begin.offset,end.offset,"highlight"+highlightSuffix);}else{selectedLeft=appendTextToDiv(begin.divIdx,begin.offset,infinity.offset,"highlight begin"+highlightSuffix);for(let n0=begin.divIdx+1,n1=end.divIdx;n0<n1;n0++){textDivs[n0].className="highlight middle"+highlightSuffix;}beginText(end,"highlight end"+highlightSuffix);}prevEnd=end;if(isSelected){findController.scrollMatchIntoView({element:textDivs[begin.divIdx],selectedLeft,pageIndex:pageIdx,matchIndex:selectedMatchIdx});}}if(prevEnd){appendTextToDiv(prevEnd.divIdx,prevEnd.offset,infinity.offset);}}_updateMatches(){let reset=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(!this.enabled&&!reset){return;}const{findController,matches,pageIdx}=this;const{textContentItemsStr,textDivs}=this;let clearedUntilDivIdx=-1;for(const match of matches){const begin=Math.max(clearedUntilDivIdx,match.begin.divIdx);for(let n=begin,end=match.end.divIdx;n<=end;n++){const div=textDivs[n];div.textContent=textContentItemsStr[n];div.className="";}clearedUntilDivIdx=match.end.divIdx+1;}if(!(findController!==null&&findController!==void 0&&findController.highlightMatches)||reset){return;}const pageMatches=findController.pageMatches[pageIdx]||null;const pageMatchesLength=findController.pageMatchesLength[pageIdx]||null;const pageMatchesColor=findController.pageMatchesColor[pageIdx]||null;this.matches=this._convertMatches(pageMatches,pageMatchesLength,pageMatchesColor);this._renderMatches(this.matches);}}exports.TextHighlighter=TextHighlighter;

/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.TextLayerBuilder=void 0;var _pdfjsLib=__webpack_require__(4);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _rotation=/*#__PURE__*/new WeakMap();var _scale=/*#__PURE__*/new WeakMap();var _textContentSource=/*#__PURE__*/new WeakMap();var _finishRendering=/*#__PURE__*/new WeakSet();var _bindMouse=/*#__PURE__*/new WeakSet();class TextLayerBuilder{constructor(_ref){let{highlighter=null,accessibilityManager=null,isOffscreenCanvasSupported=true}=_ref;_classPrivateMethodInitSpec(this,_bindMouse);_classPrivateMethodInitSpec(this,_finishRendering);_classPrivateFieldInitSpec(this,_rotation,{writable:true,value:0});_classPrivateFieldInitSpec(this,_scale,{writable:true,value:0});_classPrivateFieldInitSpec(this,_textContentSource,{writable:true,value:null});this.textContentItemsStr=[];this.renderingDone=false;this.textDivs=[];this.textDivProperties=new WeakMap();this.textLayerRenderTask=null;this.highlighter=highlighter;this.accessibilityManager=accessibilityManager;this.isOffscreenCanvasSupported=isOffscreenCanvasSupported;this.div=document.createElement("div");this.div.className="textLayer";this.hide();}get numTextDivs(){return this.textDivs.length;}async render(viewport){var _this$highlighter,_this$accessibilityMa,_this$accessibilityMa2;if(!_classPrivateFieldGet(this,_textContentSource)){throw new Error('No "textContentSource" parameter specified.');}const scale=viewport.scale*(globalThis.devicePixelRatio||1);const{rotation}=viewport;if(this.renderingDone){const mustRotate=rotation!==_classPrivateFieldGet(this,_rotation);const mustRescale=scale!==_classPrivateFieldGet(this,_scale);if(mustRotate||mustRescale){this.hide();(0,_pdfjsLib.updateTextLayer)({container:this.div,viewport,textDivs:this.textDivs,textDivProperties:this.textDivProperties,isOffscreenCanvasSupported:this.isOffscreenCanvasSupported,mustRescale,mustRotate});_classPrivateFieldSet(this,_scale,scale);_classPrivateFieldSet(this,_rotation,rotation);}this.show();return;}this.cancel();(_this$highlighter=this.highlighter)===null||_this$highlighter===void 0?void 0:_this$highlighter.setTextMapping(this.textDivs,this.textContentItemsStr);(_this$accessibilityMa=this.accessibilityManager)===null||_this$accessibilityMa===void 0?void 0:_this$accessibilityMa.setTextMapping(this.textDivs);this.textLayerRenderTask=(0,_pdfjsLib.renderTextLayer)({textContentSource:_classPrivateFieldGet(this,_textContentSource),container:this.div,viewport,textDivs:this.textDivs,textDivProperties:this.textDivProperties,textContentItemsStr:this.textContentItemsStr,isOffscreenCanvasSupported:this.isOffscreenCanvasSupported});await this.textLayerRenderTask.promise;_classPrivateMethodGet(this,_finishRendering,_finishRendering2).call(this);_classPrivateFieldSet(this,_scale,scale);_classPrivateFieldSet(this,_rotation,rotation);this.show();(_this$accessibilityMa2=this.accessibilityManager)===null||_this$accessibilityMa2===void 0?void 0:_this$accessibilityMa2.enable();}hide(){if(!this.div.hidden){var _this$highlighter2;(_this$highlighter2=this.highlighter)===null||_this$highlighter2===void 0?void 0:_this$highlighter2.disable();this.div.hidden=true;}}show(){if(this.div.hidden&&this.renderingDone){var _this$highlighter3;this.div.hidden=false;(_this$highlighter3=this.highlighter)===null||_this$highlighter3===void 0?void 0:_this$highlighter3.enable();}}cancel(){var _this$highlighter4,_this$accessibilityMa3;if(this.textLayerRenderTask){this.textLayerRenderTask.cancel();this.textLayerRenderTask=null;}(_this$highlighter4=this.highlighter)===null||_this$highlighter4===void 0?void 0:_this$highlighter4.disable();(_this$accessibilityMa3=this.accessibilityManager)===null||_this$accessibilityMa3===void 0?void 0:_this$accessibilityMa3.disable();this.textContentItemsStr.length=0;this.textDivs.length=0;this.textDivProperties=new WeakMap();}setTextContentSource(source){this.cancel();_classPrivateFieldSet(this,_textContentSource,source);}}exports.TextLayerBuilder=TextLayerBuilder;function _finishRendering2(){this.renderingDone=true;const endOfContent=document.createElement("div");endOfContent.className="endOfContent";this.div.append(endOfContent);_classPrivateMethodGet(this,_bindMouse,_bindMouse2).call(this);}function _bindMouse2(){const{div}=this;div.addEventListener("mousedown",evt=>{const end=div.querySelector(".endOfContent");if(!end){return;}let adjustTop=evt.target!==div;adjustTop&&=getComputedStyle(end).getPropertyValue("-moz-user-select")!=="none";if(adjustTop){const divBounds=div.getBoundingClientRect();const r=Math.max(0,(evt.pageY-divBounds.top)/divBounds.height);end.style.top=(r*100).toFixed(2)+"%";}end.classList.add("active");});div.addEventListener("mouseup",()=>{const end=div.querySelector(".endOfContent");if(!end){return;}end.style.top="";end.classList.remove("active");});}

/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.XfaLayerBuilder=void 0;var _pdfjsLib=__webpack_require__(4);class XfaLayerBuilder{constructor(_ref){let{pageDiv,pdfPage,annotationStorage=null,linkService,xfaHtml=null}=_ref;this.pageDiv=pageDiv;this.pdfPage=pdfPage;this.annotationStorage=annotationStorage;this.linkService=linkService;this.xfaHtml=xfaHtml;this.div=null;this._cancelled=false;}async render(viewport){let intent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"display";if(intent==="print"){const parameters={viewport:viewport.clone({dontFlip:true}),div:this.div,xfaHtml:this.xfaHtml,annotationStorage:this.annotationStorage,linkService:this.linkService,intent};const div=document.createElement("div");this.pageDiv.append(div);parameters.div=div;return _pdfjsLib.XfaLayer.render(parameters);}const xfaHtml=await this.pdfPage.getXfa();if(this._cancelled||!xfaHtml){return{textDivs:[]};}const parameters={viewport:viewport.clone({dontFlip:true}),div:this.div,xfaHtml,annotationStorage:this.annotationStorage,linkService:this.linkService,intent};if(this.div){return _pdfjsLib.XfaLayer.update(parameters);}this.div=document.createElement("div");this.pageDiv.append(this.div);parameters.div=this.div;return _pdfjsLib.XfaLayer.render(parameters);}cancel(){this._cancelled=true;}hide(){if(!this.div){return;}this.div.hidden=true;}}exports.XfaLayerBuilder=XfaLayerBuilder;

/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.SecondaryToolbar=void 0;var _ui_utils=__webpack_require__(3);var _pdf_viewer=__webpack_require__(32);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}var _updateUIState=/*#__PURE__*/new WeakSet();var _bindClickListeners=/*#__PURE__*/new WeakSet();var _bindCursorToolsListener=/*#__PURE__*/new WeakSet();var _bindScrollModeListener=/*#__PURE__*/new WeakSet();var _bindSpreadModeListener=/*#__PURE__*/new WeakSet();class SecondaryToolbar{constructor(options,eventBus,externalServices){_classPrivateMethodInitSpec(this,_bindSpreadModeListener);_classPrivateMethodInitSpec(this,_bindScrollModeListener);_classPrivateMethodInitSpec(this,_bindCursorToolsListener);_classPrivateMethodInitSpec(this,_bindClickListeners);_classPrivateMethodInitSpec(this,_updateUIState);this.toolbar=options.toolbar;this.toggleButton=options.toggleButton;this.buttons=[{element:options.presentationModeButton,eventName:"presentationmode",close:true},{element:options.printButton,eventName:"print",close:true},{element:options.downloadButton,eventName:"download",close:true},{element:options.viewBookmarkButton,eventName:null,close:true},{element:options.firstPageButton,eventName:"firstpage",close:true},{element:options.lastPageButton,eventName:"lastpage",close:true},{element:options.pageRotateCwButton,eventName:"rotatecw",close:false},{element:options.pageRotateCcwButton,eventName:"rotateccw",close:false},{element:options.cursorSelectToolButton,eventName:"switchcursortool",eventDetails:{tool:_ui_utils.CursorTool.SELECT},close:true},{element:options.cursorHandToolButton,eventName:"switchcursortool",eventDetails:{tool:_ui_utils.CursorTool.HAND},close:true},{element:options.scrollPageButton,eventName:"switchscrollmode",eventDetails:{mode:_ui_utils.ScrollMode.PAGE},close:true},{element:options.scrollVerticalButton,eventName:"switchscrollmode",eventDetails:{mode:_ui_utils.ScrollMode.VERTICAL},close:true},{element:options.scrollHorizontalButton,eventName:"switchscrollmode",eventDetails:{mode:_ui_utils.ScrollMode.HORIZONTAL},close:true},{element:options.scrollWrappedButton,eventName:"switchscrollmode",eventDetails:{mode:_ui_utils.ScrollMode.WRAPPED},close:true},{element:options.spreadNoneButton,eventName:"switchspreadmode",eventDetails:{mode:_ui_utils.SpreadMode.NONE},close:true},{element:options.spreadOddButton,eventName:"switchspreadmode",eventDetails:{mode:_ui_utils.SpreadMode.ODD},close:true},{element:options.spreadEvenButton,eventName:"switchspreadmode",eventDetails:{mode:_ui_utils.SpreadMode.EVEN},close:true},{element:options.documentPropertiesButton,eventName:"documentproperties",close:true}];this.buttons.push({element:options.openFileButton,eventName:"openfile",close:true});this.items={firstPage:options.firstPageButton,lastPage:options.lastPageButton,pageRotateCw:options.pageRotateCwButton,pageRotateCcw:options.pageRotateCcwButton};this.eventBus=eventBus;this.externalServices=externalServices;this.opened=false;_classPrivateMethodGet(this,_bindClickListeners,_bindClickListeners2).call(this);_classPrivateMethodGet(this,_bindCursorToolsListener,_bindCursorToolsListener2).call(this,options);_classPrivateMethodGet(this,_bindScrollModeListener,_bindScrollModeListener2).call(this,options);_classPrivateMethodGet(this,_bindSpreadModeListener,_bindSpreadModeListener2).call(this,options);this.reset();}get isOpen(){return this.opened;}setPageNumber(pageNumber){this.pageNumber=pageNumber;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this);}setPagesCount(pagesCount){this.pagesCount=pagesCount;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this);}reset(){this.pageNumber=0;this.pagesCount=0;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this);this.eventBus.dispatch("secondarytoolbarreset",{source:this});}open(){if(this.opened){return;}this.opened=true;this.toggleButton.classList.add("toggled");this.toggleButton.setAttribute("aria-expanded","true");this.toolbar.classList.remove("hidden");}close(){if(!this.opened){return;}this.opened=false;this.toolbar.classList.add("hidden");this.toggleButton.classList.remove("toggled");this.toggleButton.setAttribute("aria-expanded","false");}toggle(){if(this.opened){this.close();}else{this.open();}}}exports.SecondaryToolbar=SecondaryToolbar;function _updateUIState2(){this.items.firstPage.disabled=this.pageNumber<=1;if(document.getElementById("previousPage")){document.getElementById("previousPage").disabled=this.pageNumber<=1;}this.items.lastPage.disabled=this.pageNumber>=this.pagesCount;if(document.getElementById("nextPage")){document.getElementById("nextPage").disabled=this.pageNumber>=this.pagesCount;}this.items.pageRotateCw.disabled=this.pagesCount===0;this.items.pageRotateCcw.disabled=this.pagesCount===0;this.eventBus.dispatch("updateuistate",{source:this,widget:"SecondaryToolbar",pageNumber:this.pageNumber,pagesCount:this.pagesCount});}function _bindClickListeners2(){this.toggleButton.addEventListener("click",this.toggle.bind(this));for(const{element,eventName,close,eventDetails}of this.buttons){element===null||element===void 0?void 0:element.addEventListener("click",evt=>{if(eventName!==null){this.eventBus.dispatch(eventName,{source:this,...eventDetails});}if(close){this.close();}this.externalServices.reportTelemetry({type:"buttons",data:{id:element.id}});});}}function _bindCursorToolsListener2(_ref){let{cursorSelectToolButton,cursorHandToolButton}=_ref;this.eventBus._on("cursortoolchanged",function(_ref2){let{tool}=_ref2;const isSelect=tool===_ui_utils.CursorTool.SELECT,isHand=tool===_ui_utils.CursorTool.HAND;cursorSelectToolButton.classList.toggle("toggled",isSelect);cursorHandToolButton.classList.toggle("toggled",isHand);cursorSelectToolButton.setAttribute("aria-checked",isSelect);cursorHandToolButton.setAttribute("aria-checked",isHand);});}function _bindScrollModeListener2(_ref3){let{scrollPageButton,scrollVerticalButton,scrollHorizontalButton,scrollWrappedButton,spreadNoneButton,spreadOddButton,spreadEvenButton}=_ref3;const scrollModeChanged=_ref4=>{let{mode}=_ref4;const isPage=mode===_ui_utils.ScrollMode.PAGE,isVertical=mode===_ui_utils.ScrollMode.VERTICAL,isHorizontal=mode===_ui_utils.ScrollMode.HORIZONTAL,isWrapped=mode===_ui_utils.ScrollMode.WRAPPED;scrollPageButton.classList.toggle("toggled",isPage);scrollVerticalButton.classList.toggle("toggled",isVertical);scrollHorizontalButton.classList.toggle("toggled",isHorizontal);scrollWrappedButton.classList.toggle("toggled",isWrapped);scrollPageButton.setAttribute("aria-checked",isPage);scrollVerticalButton.setAttribute("aria-checked",isVertical);scrollHorizontalButton.setAttribute("aria-checked",isHorizontal);scrollWrappedButton.setAttribute("aria-checked",isWrapped);const forceScrollModePage=this.pagesCount>_pdf_viewer.PagesCountLimit.FORCE_SCROLL_MODE_PAGE;scrollPageButton.disabled=forceScrollModePage;scrollVerticalButton.disabled=forceScrollModePage;scrollHorizontalButton.disabled=forceScrollModePage;scrollWrappedButton.disabled=forceScrollModePage;spreadNoneButton.disabled=isHorizontal;spreadOddButton.disabled=isHorizontal;spreadEvenButton.disabled=isHorizontal;};this.eventBus._on("scrollmodechanged",scrollModeChanged);this.eventBus._on("secondarytoolbarreset",evt=>{if(evt.source===this){scrollModeChanged({mode:_ui_utils.ScrollMode.VERTICAL});}});}function _bindSpreadModeListener2(_ref5){let{spreadNoneButton,spreadOddButton,spreadEvenButton}=_ref5;function spreadModeChanged(_ref6){let{mode}=_ref6;const isNone=mode===_ui_utils.SpreadMode.NONE,isOdd=mode===_ui_utils.SpreadMode.ODD,isEven=mode===_ui_utils.SpreadMode.EVEN;spreadNoneButton.classList.toggle("toggled",isNone);spreadOddButton.classList.toggle("toggled",isOdd);spreadEvenButton.classList.toggle("toggled",isEven);spreadNoneButton.setAttribute("aria-checked",isNone);spreadOddButton.setAttribute("aria-checked",isOdd);spreadEvenButton.setAttribute("aria-checked",isEven);}this.eventBus._on("spreadmodechanged",spreadModeChanged);this.eventBus._on("secondarytoolbarreset",evt=>{if(evt.source===this){spreadModeChanged({mode:_ui_utils.SpreadMode.NONE});}});}

/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.Toolbar=void 0;var _ui_utils=__webpack_require__(3);var _pdfjsLib=__webpack_require__(4);function _classPrivateMethodInitSpec(obj,privateSet){_checkPrivateRedeclaration(obj,privateSet);privateSet.add(obj);}function _classPrivateFieldInitSpec(obj,privateMap,value){_checkPrivateRedeclaration(obj,privateMap);privateMap.set(obj,value);}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classExtractFieldDescriptor(receiver,privateMap,action){if(!privateMap.has(receiver)){throw new TypeError("attempted to "+action+" private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _classPrivateMethodGet(receiver,privateSet,fn){if(!privateSet.has(receiver)){throw new TypeError("attempted to get private field on non-instance");}return fn;}const PAGE_NUMBER_LOADING_INDICATOR="visiblePageIsLoading";var _wasLocalized=/*#__PURE__*/new WeakMap();var _bindListeners=/*#__PURE__*/new WeakSet();var _bindEditorToolsListener=/*#__PURE__*/new WeakSet();var _updateUIState=/*#__PURE__*/new WeakSet();var _adjustScaleWidth=/*#__PURE__*/new WeakSet();class Toolbar{constructor(_options,eventBus,_l10n){_classPrivateMethodInitSpec(this,_adjustScaleWidth);_classPrivateMethodInitSpec(this,_updateUIState);_classPrivateMethodInitSpec(this,_bindEditorToolsListener);_classPrivateMethodInitSpec(this,_bindListeners);_classPrivateFieldInitSpec(this,_wasLocalized,{writable:true,value:false});this.toolbar=_options.container;this.eventBus=eventBus;this.l10n=_l10n;this.buttons=[{element:_options.previous,eventName:"previouspage"},{element:_options.next,eventName:"nextpage"},{element:_options.zoomIn,eventName:"zoomin"},{element:_options.zoomOut,eventName:"zoomout"},{element:_options.print,eventName:"print"},{element:_options.download,eventName:"download"},{element:_options.editorFreeTextButton,eventName:"switchannotationeditormode",eventDetails:{get mode(){const{classList}=_options.editorFreeTextButton;return classList.contains("toggled")?_pdfjsLib.AnnotationEditorType.NONE:_pdfjsLib.AnnotationEditorType.FREETEXT;}}},{element:_options.editorInkButton,eventName:"switchannotationeditormode",eventDetails:{get mode(){const{classList}=_options.editorInkButton;return classList.contains("toggled")?_pdfjsLib.AnnotationEditorType.NONE:_pdfjsLib.AnnotationEditorType.INK;}}}];this.buttons.push({element:_options.openFile,eventName:"openfile"});this.items={numPages:_options.numPages,pageNumber:_options.pageNumber,scaleSelect:_options.scaleSelect,customScaleOption:_options.customScaleOption,previous:_options.previous,next:_options.next,zoomIn:_options.zoomIn,zoomOut:_options.zoomOut};_classPrivateMethodGet(this,_bindListeners,_bindListeners2).call(this,_options);this.reset();}setPageNumber(pageNumber,pageLabel){this.pageNumber=pageNumber;this.pageLabel=pageLabel;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this,false);}setPagesCount(pagesCount,hasPageLabels){this.pagesCount=pagesCount;this.hasPageLabels=hasPageLabels;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this,true);}setPageScale(pageScaleValue,pageScale){this.pageScaleValue=(pageScaleValue||pageScale).toString();this.pageScale=pageScale;_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this,false);}reset(){this.pageNumber=0;this.pageLabel=null;this.hasPageLabels=false;this.pagesCount=0;const defaultZoomOption=PDFViewerApplicationOptions.get('defaultZoomValue');if(defaultZoomOption){this.pageScaleValue=defaultZoomOption;if(!!Number(defaultZoomOption)){this.pageScale=Number(defaultZoomOption);}}else{this.pageScaleValue=_ui_utils.DEFAULT_SCALE_VALUE;this.pageScale=_ui_utils.DEFAULT_SCALE;}_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this,true);this.updateLoadingIndicatorState();this.eventBus.dispatch("toolbarreset",{source:this});}updateLoadingIndicatorState(){let loading=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;const{pageNumber}=this.items;pageNumber.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR,loading);}}exports.Toolbar=Toolbar;function _bindListeners2(options){const{pageNumber,scaleSelect}=this.items;const self=this;for(const{element,eventName,eventDetails}of this.buttons){element===null||element===void 0?void 0:element.addEventListener("click",evt=>{if(eventName!==null){this.eventBus.dispatch(eventName,{source:this,...eventDetails});}});}pageNumber.addEventListener("click",function(){this.select();});pageNumber.addEventListener("change",function(){self.eventBus.dispatch("pagenumberchanged",{source:self,value:this.value});});scaleSelect.addEventListener("change",function(){if(this.value==="custom"){return;}self.eventBus.dispatch("scalechanged",{source:self,value:this.value});});scaleSelect.addEventListener("click",function(evt){const target=evt.target;if(this.value===self.pageScaleValue&&target.tagName.toUpperCase()==="OPTION"){this.blur();}});scaleSelect.oncontextmenu=_ui_utils.noContextMenuHandler;this.eventBus._on("localized",()=>{_classPrivateFieldSet(this,_wasLocalized,true);_classPrivateMethodGet(this,_adjustScaleWidth,_adjustScaleWidth2).call(this);_classPrivateMethodGet(this,_updateUIState,_updateUIState2).call(this,true);});_classPrivateMethodGet(this,_bindEditorToolsListener,_bindEditorToolsListener2).call(this,options);}function _bindEditorToolsListener2(_ref){let{editorFreeTextButton,editorFreeTextParamsToolbar,editorInkButton,editorInkParamsToolbar}=_ref;const editorModeChanged=function(evt){let disableButtons=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const editorButtons=[{mode:_pdfjsLib.AnnotationEditorType.FREETEXT,button:editorFreeTextButton,toolbar:editorFreeTextParamsToolbar},{mode:_pdfjsLib.AnnotationEditorType.INK,button:editorInkButton,toolbar:editorInkParamsToolbar}];for(const{mode,button,toolbar}of editorButtons){const checked=mode===evt.mode;button.classList.toggle("toggled",checked);button.setAttribute("aria-checked",checked);button.disabled=disableButtons;toolbar===null||toolbar===void 0?void 0:toolbar.classList.toggle("hidden",!checked);}};this.eventBus._on("annotationeditormodechanged",editorModeChanged);this.eventBus._on("toolbarreset",evt=>{if(evt.source===this){editorModeChanged({mode:_pdfjsLib.AnnotationEditorType.NONE},true);}});}function _updateUIState2(){let resetNumPages=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(!_classPrivateFieldGet(this,_wasLocalized)){return;}const{pageNumber,pagesCount,pageScaleValue,pageScale,items}=this;if(resetNumPages){if(this.hasPageLabels){items.pageNumber.type="text";}else{items.pageNumber.type="number";this.l10n.get("of_pages",{pagesCount}).then(msg=>{items.numPages.textContent=msg;});}items.pageNumber.max=pagesCount;}if(this.hasPageLabels){items.pageNumber.value=this.pageLabel;this.l10n.get("page_of_pages",{pageNumber,pagesCount}).then(msg=>{items.numPages.textContent=msg;});}else{items.pageNumber.value=pageNumber;}items.previous.disabled=pageNumber<=1;items.next.disabled=pageNumber>=pagesCount;items.zoomOut.disabled=pageScale<=_ui_utils.MIN_SCALE;items.zoomIn.disabled=pageScale>=_ui_utils.MAX_SCALE;this.l10n.get("page_scale_percent",{scale:Math.round(pageScale*10000)/100}).then(msg=>{let predefinedValueFound=false;if(items.scaleSelect.options){for(const option of items.scaleSelect.options){if(option.value!==pageScaleValue){option.selected=false;continue;}option.selected=true;predefinedValueFound=true;}}if(!predefinedValueFound){items.customScaleOption.textContent=msg;items.customScaleOption.selected=true;}});this.eventBus.dispatch("updateuistate",{source:this,widget:"Toolbar",pageNumber,pagesCount,pageScaleValue,pageScale});}async function _adjustScaleWidth2(){const{items,l10n}=this;const predefinedValuesPromise=Promise.all([l10n.get("page_scale_auto"),l10n.get("page_scale_actual"),l10n.get("page_scale_fit"),l10n.get("page_scale_width")]);await _ui_utils.animationStarted;const style=getComputedStyle(items.scaleSelect);const scaleSelectWidth=parseFloat(style.getPropertyValue("--scale-select-width"));const canvas=document.createElement("canvas");const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true,alpha:false}:{alpha:false};const ctx=canvas.getContext("2d",options);ctx.font=`${style.fontSize} ${style.fontFamily}`;let maxWidth=0;for(const predefinedValue of await predefinedValuesPromise){try{const{width}=ctx.measureText(predefinedValue);if(width>maxWidth){maxWidth=width;}}catch(fingerprintIsBlockedException){}}maxWidth+=0.3*scaleSelectWidth;if(maxWidth>scaleSelectWidth){const container=items.scaleSelect.parentNode;container.style.setProperty("--scale-select-width",`${maxWidth}px`);}canvas.width=0;canvas.height=0;}

/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.ViewHistory=void 0;var _app_options=__webpack_require__(5);const DEFAULT_VIEW_HISTORY_CACHE_SIZE=20;class ViewHistory{constructor(fingerprint){let cacheSize=arguments.length>1&&arguments[1]!==undefined?arguments[1]:DEFAULT_VIEW_HISTORY_CACHE_SIZE;this.fingerprint=fingerprint;this.cacheSize=cacheSize;this._initializedPromise=this._readFromStorage().then(databaseStr=>{const database=JSON.parse(databaseStr||"{}");let index=-1;if(!Array.isArray(database.files)){database.files=[];}else{while(database.files.length>=this.cacheSize){database.files.shift();}for(let i=0,ii=database.files.length;i<ii;i++){const branch=database.files[i];if(branch.fingerprint===this.fingerprint){index=i;break;}}}if(index===-1){index=database.files.push({fingerprint:this.fingerprint})-1;}this.file=database.files[index];this.database=database;});}async _writeToStorage(){if(_app_options.AppOptions.get("disableHistory")){return;}const databaseStr=JSON.stringify(this.database);try{localStorage.setItem("pdfjs.history",databaseStr);}catch(safariSecurityException){}}async _readFromStorage(){if(_app_options.AppOptions.get("disableHistory")){return undefined;}try{return localStorage.getItem("pdfjs.history");}catch(safariSecurityException){return undefined;}}async set(name,val){await this._initializedPromise;this.file[name]=val;return this._writeToStorage();}async setMultiple(properties){await this._initializedPromise;for(const name in properties){this.file[name]=properties[name];}return this._writeToStorage();}async get(name,defaultValue){await this._initializedPromise;const val=this.file[name];return val!==undefined?val:defaultValue;}async getMultiple(properties){await this._initializedPromise;const values=Object.create(null);for(const name in properties){const val=this.file[name];values[name]=val!==undefined?val:properties[name];}return values;}}exports.ViewHistory=ViewHistory;

/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.BasePreferences=void 0;var _app_options=__webpack_require__(5);class BasePreferences{#defaults=Object.freeze({"annotationEditorMode":0,"annotationMode":2,"cursorToolOnLoad":0,"defaultZoomDelay":400,"defaultZoomValue":"","disablePageLabels":false,"enablePermissions":false,"enablePrintAutoRotate":true,"enableScripting":true,"externalLinkTarget":0,"historyUpdateUrl":false,"ignoreDestinationZoom":false,"forcePageColors":false,"pageColorsBackground":"Canvas","pageColorsForeground":"CanvasText","pdfBugEnabled":false,"removePageBorders":false,"sidebarViewOnLoad":-1,"scrollModeOnLoad":-1,"spreadModeOnLoad":-1,"textLayerMode":1,"useOnlyCssZoom":false,"viewerCssTheme":0,"viewOnLoad":0,"disableAutoFetch":false,"disableFontFace":false,"disableRange":false,"disableStream":false,"enableXfa":true,"renderer":"canvas"});#prefs=Object.create(null);#initializedPromise=null;constructor(){if(this.constructor===BasePreferences){throw new Error("Cannot initialize BasePreferences.");}this.#initializedPromise=this._readFromStorage(this.#defaults).then(prefs=>{for(const name in this.#defaults){const prefValue=prefs===null||prefs===void 0?void 0:prefs[name];if(typeof prefValue===typeof this.#defaults[name]){this.#prefs[name]=prefValue;}}});}async _writeToStorage(prefObj){throw new Error("Not implemented: _writeToStorage");}async _readFromStorage(prefObj){throw new Error("Not implemented: _readFromStorage");}async reset(){await this.#initializedPromise;const prefs=this.#prefs;this.#prefs=Object.create(null);return this._writeToStorage(this.#defaults).catch(reason=>{this.#prefs=prefs;throw reason;});}async set(name,value){await this.#initializedPromise;const defaultValue=this.#defaults[name],prefs=this.#prefs;if(defaultValue===undefined){throw new Error(`Set preference: "${name}" is undefined.`);}else if(value===undefined){throw new Error("Set preference: no value is specified.");}const valueType=typeof value,defaultType=typeof defaultValue;if(valueType!==defaultType){if(valueType==="number"&&defaultType==="string"){value=value.toString();}else{throw new Error(`Set preference: "${value}" is a ${valueType}, expected a ${defaultType}.`);}}else{if(valueType==="number"&&!Number.isInteger(value)){throw new Error(`Set preference: "${value}" must be an integer.`);}}this.#prefs[name]=value;return this._writeToStorage(this.#prefs).catch(reason=>{this.#prefs=prefs;throw reason;});}async get(name){await this.#initializedPromise;const defaultValue=this.#defaults[name];if(defaultValue===undefined){throw new Error(`Get preference: "${name}" is undefined.`);}return this.#prefs[name]??defaultValue;}async getAll(){await this.#initializedPromise;const obj=Object.create(null);for(const name in this.#defaults){obj[name]=this.#prefs[name]??this.#defaults[name];}return obj;}}exports.BasePreferences=BasePreferences;

/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.DownloadManager=void 0;var _pdfjsLib=__webpack_require__(4);;function download(blobUrl,filename){const a=document.createElement("a");if(!a.click){throw new Error('DownloadManager: "a.click()" is not supported.');}a.href=blobUrl;a.target="_parent";if("download"in a){a.download=filename;}(document.body||document.documentElement).append(a);a.click();a.remove();}class DownloadManager{#openBlobUrls=new WeakMap();downloadUrl(url,filename){if(!(0,_pdfjsLib.createValidAbsoluteUrl)(url,"http://example.com")){globalThis.ngxConsole.error(`downloadUrl - not a valid URL: ${url}`);return;}download(url+"#pdfjs.action=download",filename);}downloadData(data,filename,contentType){const blobUrl=URL.createObjectURL(new Blob([data],{type:contentType}));download(blobUrl,filename);}openOrDownloadData(element,data,filename){const isPdfData=(0,_pdfjsLib.isPdfFile)(filename);const contentType=isPdfData?"application/pdf":"";if(isPdfData){let blobUrl=this.#openBlobUrls.get(element);if(!blobUrl){blobUrl=URL.createObjectURL(new Blob([data],{type:contentType}));this.#openBlobUrls.set(element,blobUrl);}try{window.open(blobUrl);return true;}catch(ex){globalThis.ngxConsole.error(`openOrDownloadData: ${ex}`);URL.revokeObjectURL(blobUrl);this.#openBlobUrls.delete(element);}}this.downloadData(data,filename,contentType);return false;}download(blob,url,filename){const blobUrl=URL.createObjectURL(blob);download(blobUrl,filename);}}exports.DownloadManager=DownloadManager;

/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.GenericL10n=void 0;__webpack_require__(186);var _l10n_utils=__webpack_require__(33);const webL10n=document.webL10n;class GenericL10n{constructor(lang){this._lang=lang;this._ready=new Promise((resolve,reject)=>{webL10n.setLanguage((0,_l10n_utils.fixupLangCode)(lang),()=>{resolve(webL10n);});});}async getLanguage(){const l10n=await this._ready;return l10n.getLanguage();}async getDirection(){const l10n=await this._ready;return l10n.getDirection();}async get(key){let args=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;let fallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:(0,_l10n_utils.getL10nFallback)(key,args);const l10n=await this._ready;return l10n.get(key,args,fallback);}async translate(element){const l10n=await this._ready;return l10n.translate(element);}}exports.GenericL10n=GenericL10n;

/***/ }),
/* 186 */
/***/ (() => {

"use strict";
document.webL10n=function(window,document,undefined){var gL10nData={};var gTextData="";var gTextProp="textContent";var gLanguage="";var gMacros={};var gReadyState="loading";var gAsyncResourceLoading=true;function getL10nResourceLinks(){return document.querySelectorAll('link[type="application/l10n"]');}function getL10nDictionary(){var script=document.querySelector('script[type="application/l10n"]');return script?JSON.parse(script.innerHTML):null;}function getTranslatableChildren(element){return element?element.querySelectorAll("*[data-l10n-id]"):[];}function getL10nAttributes(element){if(!element)return{};var l10nId=element.getAttribute("data-l10n-id");var l10nArgs=element.getAttribute("data-l10n-args");var args={};if(l10nArgs){try{args=JSON.parse(l10nArgs);}catch(e){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn("could not parse arguments for #"+l10nId);}}}return{id:l10nId,args:args};}function fireL10nReadyEvent(lang){var evtObject=document.createEvent("Event");evtObject.initEvent("localized",true,false);evtObject.language=lang;document.dispatchEvent(evtObject);}function xhrLoadText(url,onSuccess,onFailure){onSuccess=onSuccess||function _onSuccess(data){};onFailure=onFailure||function _onFailure(){};var xhr=new XMLHttpRequest();xhr.open("GET",url,gAsyncResourceLoading);if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=utf-8");}xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200||xhr.status===0){onSuccess(xhr.responseText);}else{onFailure();}}};xhr.onerror=onFailure;xhr.ontimeout=onFailure;try{xhr.send(null);}catch(e){onFailure();}}function parseResource(href,lang,successCallback,failureCallback){var baseURL=href.replace(/[^\/]*$/,"")||"./";function evalString(text){if(text.lastIndexOf("\\")<0)return text;return text.replace(/\\\\/g,"\\").replace(/\\n/g,"\n").replace(/\\r/g,"\r").replace(/\\t/g,"\t").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\{/g,"{").replace(/\\}/g,"}").replace(/\\"/g,'"').replace(/\\'/g,"'");}function parseProperties(text,parsedPropertiesCallback){var dictionary={};var reBlank=/^\s*|\s*$/;var reComment=/^\s*#|^\s*$/;var reSection=/^\s*\[(.*)\]\s*$/;var reImport=/^\s*@import\s+url\((.*)\)\s*$/i;var reSplit=/^([^=\s]*)\s*=\s*(.+)$/;function parseRawLines(rawText,extendedSyntax,parsedRawLinesCallback){var entries=rawText.replace(reBlank,"").split(/[\r\n]+/);var currentLang="*";var genericLang=lang.split("-",1)[0];var skipLang=false;var match="";var languagefound=false;function nextEntry(){var genericMatch=undefined;while(true){if(!entries.length&&genericMatch){if(!languagefound){loadImport(genericMatch,nextEntry);}else{nextEntry();}return;}else if(!entries.length){parsedRawLinesCallback();return;}var line=entries.shift();if(reComment.test(line))continue;if(extendedSyntax){match=reSection.exec(line);if(match){currentLang=match[1].toLowerCase();skipLang=currentLang!=="*"&&currentLang!==lang&&currentLang!==genericLang;continue;}else if(skipLang){continue;}match=reImport.exec(line);if(match){if(currentLang==="*"||currentLang===lang){loadImport(baseURL+match[1],nextEntry);languagefound=true;return;}else{genericMatch=baseURL+match[1];}}}var tmp=line.match(reSplit);if(tmp&&tmp.length==3){dictionary[tmp[1]]=evalString(tmp[2]);}}}nextEntry();}function loadImport(url,callback){xhrLoadText(url,function(content){parseRawLines(content,false,callback);},function(){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn(url+" not found.");}callback();});}parseRawLines(text,true,function(){parsedPropertiesCallback(dictionary);});}xhrLoadText(href,function(response){gTextData+=response;parseProperties(response,function(data){for(var key in data){var id,prop,index=key.lastIndexOf(".");if(index>0){id=key.substring(0,index);prop=key.substring(index+1);}else{id=key;prop=gTextProp;}if(!gL10nData[id]){gL10nData[id]={};}gL10nData[id][prop]=data[key];}if(successCallback){successCallback();}});},failureCallback);}function loadLocale(lang,callback){let originalCaseLang=lang;if(lang){lang=lang.toLowerCase();}callback=callback||function _callback(){};clear();gLanguage=lang;var langLinks=getL10nResourceLinks();var langCount=langLinks.length;if(langCount===0){var dict=getL10nDictionary();if(dict&&dict.locales&&dict.default_locale){globalThis.ngxConsole.log("The PDF viewer uses the pre-compiled language bundle stored in the HTML page.");gL10nData=dict.locales[originalCaseLang];if(!gL10nData){var defaultLocale=dict.default_locale.toLowerCase();for(var anyCaseLang in dict.locales){originalCaseLang=anyCaseLang;anyCaseLang=anyCaseLang.toLowerCase();if(anyCaseLang===lang){gL10nData=dict.locales[originalCaseLang];break;}else if(anyCaseLang===defaultLocale){gL10nData=dict.locales[originalCaseLang];}}}callback();}else{globalThis.ngxConsole.log("Could not load the translation files for the PDF viewer. Check the flag useBrowserLocale, check the locales subfolder of the assets folder, or add the locale definition to the index.html");}fireL10nReadyEvent(lang);gReadyState="complete";return;}var onResourceLoaded=null;var gResourceCount=0;onResourceLoaded=function(){gResourceCount++;if(gResourceCount>=langCount){callback();fireL10nReadyEvent(lang);gReadyState="complete";}};function L10nResourceLink(link){var href=link.href;this.load=function(lang,callback){parseResource(href,lang,callback,function(){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn(href+" not found.");globalThis.ngxConsole.warn('"'+lang+'" resource not found');}gLanguage="";callback();});};}for(var i=0;i<langCount;i++){var resource=new L10nResourceLink(langLinks[i]);resource.load(lang,onResourceLoaded);}}function clear(){gL10nData={};gTextData="";gLanguage="";}function getPluralRules(lang){var locales2rules={af:3,ak:4,am:4,ar:1,asa:3,az:0,be:11,bem:3,bez:3,bg:3,bh:4,bm:0,bn:3,bo:0,br:20,brx:3,bs:11,ca:3,cgg:3,chr:3,cs:12,cy:17,da:3,de:3,dv:3,dz:0,ee:3,el:3,en:3,eo:3,es:3,et:3,eu:3,fa:0,ff:5,fi:3,fil:4,fo:3,fr:5,fur:3,fy:3,ga:8,gd:24,gl:3,gsw:3,gu:3,guw:4,gv:23,ha:3,haw:3,he:2,hi:4,hr:11,hu:0,id:0,ig:0,ii:0,is:3,it:3,iu:7,ja:0,jmc:3,jv:0,ka:0,kab:5,kaj:3,kcg:3,kde:0,kea:0,kk:3,kl:3,km:0,kn:0,ko:0,ksb:3,ksh:21,ku:3,kw:7,lag:18,lb:3,lg:3,ln:4,lo:0,lt:10,lv:6,mas:3,mg:4,mk:16,ml:3,mn:3,mo:9,mr:3,ms:0,mt:15,my:0,nah:3,naq:7,nb:3,nd:3,ne:3,nl:3,nn:3,no:3,nr:3,nso:4,ny:3,nyn:3,om:3,or:3,pa:3,pap:3,pl:13,ps:3,pt:3,rm:3,ro:9,rof:3,ru:11,rwk:3,sah:0,saq:3,se:7,seh:3,ses:0,sg:0,sh:11,shi:19,sk:12,sl:14,sma:7,smi:7,smj:7,smn:7,sms:7,sn:3,so:3,sq:3,sr:11,ss:3,ssy:3,st:3,sv:3,sw:3,syr:3,ta:3,te:3,teo:3,th:0,ti:4,tig:3,tk:3,tl:4,tn:3,to:0,tr:0,ts:3,tzm:22,uk:11,ur:3,ve:3,vi:0,vun:3,wa:4,wae:3,wo:0,xh:3,xog:3,yo:0,zh:0,zu:3};function isIn(n,list){return list.indexOf(n)!==-1;}function isBetween(n,start,end){return start<=n&&n<=end;}var pluralRules={"0":function(n){return"other";},"1":function(n){if(isBetween(n%100,3,10))return"few";if(n===0)return"zero";if(isBetween(n%100,11,99))return"many";if(n==2)return"two";if(n==1)return"one";return"other";},"2":function(n){if(n!==0&&n%10===0)return"many";if(n==2)return"two";if(n==1)return"one";return"other";},"3":function(n){if(n==1)return"one";return"other";},"4":function(n){if(isBetween(n,0,1))return"one";return"other";},"5":function(n){if(isBetween(n,0,2)&&n!=2)return"one";return"other";},"6":function(n){if(n===0)return"zero";if(n%10==1&&n%100!=11)return"one";return"other";},"7":function(n){if(n==2)return"two";if(n==1)return"one";return"other";},"8":function(n){if(isBetween(n,3,6))return"few";if(isBetween(n,7,10))return"many";if(n==2)return"two";if(n==1)return"one";return"other";},"9":function(n){if(n===0||n!=1&&isBetween(n%100,1,19))return"few";if(n==1)return"one";return"other";},"10":function(n){if(isBetween(n%10,2,9)&&!isBetween(n%100,11,19))return"few";if(n%10==1&&!isBetween(n%100,11,19))return"one";return"other";},"11":function(n){if(isBetween(n%10,2,4)&&!isBetween(n%100,12,14))return"few";if(n%10===0||isBetween(n%10,5,9)||isBetween(n%100,11,14))return"many";if(n%10==1&&n%100!=11)return"one";return"other";},"12":function(n){if(isBetween(n,2,4))return"few";if(n==1)return"one";return"other";},"13":function(n){if(isBetween(n%10,2,4)&&!isBetween(n%100,12,14))return"few";if(n!=1&&isBetween(n%10,0,1)||isBetween(n%10,5,9)||isBetween(n%100,12,14))return"many";if(n==1)return"one";return"other";},"14":function(n){if(isBetween(n%100,3,4))return"few";if(n%100==2)return"two";if(n%100==1)return"one";return"other";},"15":function(n){if(n===0||isBetween(n%100,2,10))return"few";if(isBetween(n%100,11,19))return"many";if(n==1)return"one";return"other";},"16":function(n){if(n%10==1&&n!=11)return"one";return"other";},"17":function(n){if(n==3)return"few";if(n===0)return"zero";if(n==6)return"many";if(n==2)return"two";if(n==1)return"one";return"other";},"18":function(n){if(n===0)return"zero";if(isBetween(n,0,2)&&n!==0&&n!=2)return"one";return"other";},"19":function(n){if(isBetween(n,2,10))return"few";if(isBetween(n,0,1))return"one";return"other";},"20":function(n){if((isBetween(n%10,3,4)||n%10==9)&&!(isBetween(n%100,10,19)||isBetween(n%100,70,79)||isBetween(n%100,90,99)))return"few";if(n%1000000===0&&n!==0)return"many";if(n%10==2&&!isIn(n%100,[12,72,92]))return"two";if(n%10==1&&!isIn(n%100,[11,71,91]))return"one";return"other";},"21":function(n){if(n===0)return"zero";if(n==1)return"one";return"other";},"22":function(n){if(isBetween(n,0,1)||isBetween(n,11,99))return"one";return"other";},"23":function(n){if(isBetween(n%10,1,2)||n%20===0)return"one";return"other";},"24":function(n){if(isBetween(n,3,10)||isBetween(n,13,19))return"few";if(isIn(n,[2,12]))return"two";if(isIn(n,[1,11]))return"one";return"other";}};var index=locales2rules[lang.replace(/-.*$/,"")];if(!(index in pluralRules)){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn("plural form unknown for ["+lang+"]");}return function(){return"other";};}return pluralRules[index];}gMacros.plural=function(str,param,key,prop){var n=parseFloat(param);if(isNaN(n))return str;if(prop!=gTextProp)return str;if(!gMacros._pluralRules){gMacros._pluralRules=getPluralRules(gLanguage);}var index="["+gMacros._pluralRules(n)+"]";if(n===0&&key+"[zero]"in gL10nData){str=gL10nData[key+"[zero]"][prop];}else if(n==1&&key+"[one]"in gL10nData){str=gL10nData[key+"[one]"][prop];}else if(n==2&&key+"[two]"in gL10nData){str=gL10nData[key+"[two]"][prop];}else if(key+index in gL10nData){str=gL10nData[key+index][prop];}else if(key+"[other]"in gL10nData){str=gL10nData[key+"[other]"][prop];}return str;};function getL10nData(key,args,fallback){var data=gL10nData[key];if(!data){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn("Translation for the key #"+key+" is missing.");}if(!fallback){return null;}data=fallback;}var rv={};for(var prop in data){var str=data[prop];str=substIndexes(str,args,key,prop);str=substArguments(str,args,key);rv[prop]=str;}return rv;}function substIndexes(str,args,key,prop){var reIndex=/\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;var reMatch=reIndex.exec(str);if(!reMatch||!reMatch.length)return str;var macroName=reMatch[1];var paramName=reMatch[2];var param;if(args&&paramName in args){param=args[paramName];}else if(paramName in gL10nData){param=gL10nData[paramName];}if(macroName in gMacros){var macro=gMacros[macroName];str=macro(str,param,key,prop);}return str;}function substArguments(str,args,key){var reArgs=/\{\{\s*(.+?)\s*\}\}/g;return str.replace(reArgs,function(matched_text,arg){if(args&&arg in args){return args[arg];}if(arg in gL10nData){return gL10nData[arg];}globalThis.ngxConsole.log("argument {{"+arg+"}} for #"+key+" is undefined.");return matched_text;});}function translateElement(element){var l10n=getL10nAttributes(element);if(!l10n.id)return;var data=getL10nData(l10n.id,l10n.args);if(!data){const PDFViewerApplicationOptions=window.PDFViewerApplicationOptions;if(!PDFViewerApplicationOptions||PDFViewerApplicationOptions.get("verbosity")>0){globalThis.ngxConsole.warn("#"+l10n.id+" is undefined.");}return;}if(data[gTextProp]){if(getChildElementCount(element)===0){element[gTextProp]=data[gTextProp];}else{var children=element.childNodes;var found=false;for(var i=0,l=children.length;i<l;i++){if(children[i].nodeType===3&&/\S/.test(children[i].nodeValue)){if(found){children[i].nodeValue="";}else{children[i].nodeValue=data[gTextProp];found=true;}}}if(!found){var textNode=document.createTextNode(data[gTextProp]);element.prepend(textNode);}}delete data[gTextProp];}for(var k in data){element[k]=data[k];}}function getChildElementCount(element){if(element.children){return element.children.length;}if(typeof element.childElementCount!=="undefined"){return element.childElementCount;}var count=0;for(var i=0;i<element.childNodes.length;i++){count+=element.nodeType===1?1:0;}return count;}function translateFragment(element){element=element||document.documentElement;var children=getTranslatableChildren(element);var elementCount=children.length;for(var i=0;i<elementCount;i++){translateElement(children[i]);}translateElement(element);}return{get:function(key,args,fallbackString){var index=key.lastIndexOf(".");var prop=gTextProp;if(index>0){prop=key.substring(index+1);key=key.substring(0,index);}var fallback;if(fallbackString){fallback={};fallback[prop]=fallbackString;}var data=getL10nData(key,args,fallback);if(data&&prop in data){return data[prop];}return"{{"+key+"}}";},getData:function(){return gL10nData;},getText:function(){return gTextData;},getLanguage:function(){return gLanguage;},setLanguage:function(lang,callback){loadLocale(lang,function(){if(callback)callback();});},getDirection:function(){var rtlList=["ar","he","fa","ps","ur"];var shortCode=gLanguage.split("-",1)[0];return rtlList.indexOf(shortCode)>=0?"rtl":"ltr";},translate:translateFragment,getReadyState:function(){return gReadyState;},ready:function(callback){if(!callback){return;}else if(gReadyState=="complete"||gReadyState=="interactive"){window.setTimeout(function(){callback();});}else if(document.addEventListener){document.addEventListener("localized",function once(){document.removeEventListener("localized",once);callback();});}}};}(window,document);

/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.GenericScripting=void 0;exports.docPropertiesLookup=docPropertiesLookup;var _pdfjsLib=__webpack_require__(4);async function docPropertiesLookup(pdfDocument){const url="",baseUrl=url.split("#")[0];let{info,metadata,contentDispositionFilename,contentLength}=await pdfDocument.getMetadata();if(!contentLength){const{length}=await pdfDocument.getDownloadInfo();contentLength=length;}return{...info,baseURL:baseUrl,filesize:contentLength,filename:contentDispositionFilename||(0,_pdfjsLib.getPdfFilenameFromUrl)(url),metadata:metadata===null||metadata===void 0?void 0:metadata.getRaw(),authors:metadata===null||metadata===void 0?void 0:metadata.get("dc:creator"),numPages:pdfDocument.numPages,URL:url};}class GenericScripting{constructor(sandboxBundleSrc){this._ready=(0,_pdfjsLib.loadScript)(sandboxBundleSrc,true).then(()=>{return window.pdfjsSandbox.QuickJSSandbox();});}async createSandbox(data){const sandbox=await this._ready;sandbox.create(data);}async dispatchEventInSandbox(event){const sandbox=await this._ready;setTimeout(()=>sandbox.dispatchEvent(event),0);}async destroySandbox(){const sandbox=await this._ready;sandbox.nukeSandbox();}}exports.GenericScripting=GenericScripting;

/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.PDFPrintService=PDFPrintService;var _pdfjsLib=__webpack_require__(4);var _app=__webpack_require__(2);var _canvasSize=_interopRequireDefault(__webpack_require__(40));var _print_utils=__webpack_require__(189);var _util=__webpack_require__(41);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}let activeService=null;let dialog=null;let overlayManager=null;function renderPage(activeServiceOnEntry,pdfDocument,pageNumber,size,printResolution,optionalContentConfigPromise,printAnnotationStoragePromise){const scratchCanvas=activeService.scratchCanvas;let PRINT_UNITS=printResolution/_pdfjsLib.PixelsPerInch.PDF;let scale=1;const canvasWidth=Math.floor(size.width*PRINT_UNITS);const canvasHeight=Math.floor(size.height*PRINT_UNITS);if(canvasWidth>=4096||canvasHeight>=4096){if(!_canvasSize.default.test({width:canvasWidth,height:canvasHeight})){const max=determineMaxDimensions();scale=Math.min(max/canvasWidth,max/canvasHeight)*0.95;}(0,_util.warn)("Page "+pageNumber+": Reduced the [printResolution] to "+Math.floor(printResolution*scale)+" because the browser can't render larger canvases. If you see blank page in the print preview, reduce [printResolution] manually to a lower value.");}PRINT_UNITS*=scale;scratchCanvas.width=Math.floor(size.width*PRINT_UNITS);scratchCanvas.height=Math.floor(size.height*PRINT_UNITS);const options=window.pdfDefaultOptions.activateWillReadFrequentlyFlag?{willReadFrequently:true}:undefined;const ctx=scratchCanvas.getContext("2d",options);ctx.save();ctx.fillStyle="rgb(255, 255, 255)";ctx.fillRect(0,0,scratchCanvas.width,scratchCanvas.height);ctx.restore();return Promise.all([pdfDocument.getPage(pageNumber),printAnnotationStoragePromise]).then(function(_ref){let[pdfPage,printAnnotationStorage]=_ref;const renderContext={canvasContext:ctx,transform:[PRINT_UNITS,0,0,PRINT_UNITS,0,0],viewport:pdfPage.getViewport({scale:1,rotation:size.rotation}),intent:"print",annotationMode:_pdfjsLib.AnnotationMode.ENABLE_STORAGE,optionalContentConfigPromise,printAnnotationStorage};return pdfPage.render(renderContext).promise;});}function determineMaxDimensions(){const checklist=[4096,8192,10836,11180,11402,14188,16384];for(let width of checklist){if(!_canvasSize.default.test({width:width+1,height:width+1})){return width;}}return 16384;}function PDFPrintService(pdfDocument,pagesOverview,printContainer,printResolution){let optionalContentConfigPromise=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;let printAnnotationStoragePromise=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null;let l10n=arguments.length>6?arguments[6]:undefined;let eventBus=arguments.length>7?arguments[7]:undefined;this.pdfDocument=pdfDocument;this.pagesOverview=pagesOverview;this.printContainer=printContainer;this._printResolution=printResolution||150;this._optionalContentConfigPromise=optionalContentConfigPromise||pdfDocument.getOptionalContentConfig();this._printAnnotationStoragePromise=printAnnotationStoragePromise||Promise.resolve();this.l10n=l10n;this.currentPage=-1;this.scratchCanvas=document.createElement("canvas");this.eventBus=eventBus;}PDFPrintService.prototype={layout(){this.throwIfInactive();const body=document.querySelector("body");body.setAttribute("data-pdfjsprinting",true);const html=document.querySelector("html");html.setAttribute("data-pdfjsprinting",true);const hasEqualPageSizes=this.pagesOverview.every(function(size){return size.width===this.pagesOverview[0].width&&size.height===this.pagesOverview[0].height;},this);if(!hasEqualPageSizes){globalThis.ngxConsole.warn("Not all pages have the same size. The printed result may be incorrect!");}this.pageStyleSheet=document.createElement("style");const pageSize=this.pagesOverview[0];this.pageStyleSheet.textContent="@page { size: "+pageSize.width+"pt "+pageSize.height+"pt;}";body.append(this.pageStyleSheet);},destroy(){if(activeService!==this){return;}this.printContainer.textContent="";const body=document.querySelector("body");body.removeAttribute("data-pdfjsprinting");const html=document.querySelector("html");html.removeAttribute("data-pdfjsprinting");if(this.pageStyleSheet){this.pageStyleSheet.remove();this.pageStyleSheet=null;}this.scratchCanvas.width=this.scratchCanvas.height=0;this.scratchCanvas=null;activeService=null;ensureOverlay().then(function(){if(overlayManager.active===dialog){overlayManager.close(dialog);overlayManager.unregister(dialog);}});overlayPromise=undefined;},renderPages(){if(this.pdfDocument.isPureXfa){(0,_print_utils.getXfaHtmlForPrinting)(this.printContainer,this.pdfDocument);return Promise.resolve();}const pageCount=this.pagesOverview.length;const renderNextPage=(resolve,reject)=>{this.throwIfInactive();while(true){++this.currentPage;if(this.currentPage>=pageCount){break;}if(!window.isInPDFPrintRange||window.isInPDFPrintRange(this.currentPage)){break;}}if(this.currentPage>=pageCount){renderProgress(window.filteredPageCount|pageCount,window.filteredPageCount|pageCount,this.l10n,this.eventBus);resolve();return;}const index=this.currentPage;renderProgress(index,window.filteredPageCount|pageCount,this.l10n,this.eventBus);renderPage(this,this.pdfDocument,index+1,this.pagesOverview[index],this._printResolution,this._optionalContentConfigPromise,this._printAnnotationStoragePromise).then(this.useRenderedPage.bind(this)).then(function(){renderNextPage(resolve,reject);},reject);};return new Promise(renderNextPage);},useRenderedPage(){this.throwIfInactive();const img=document.createElement("img");const scratchCanvas=this.scratchCanvas;if("toBlob"in scratchCanvas){scratchCanvas.toBlob(function(blob){img.src=URL.createObjectURL(blob);});}else{img.src=scratchCanvas.toDataURL();}const wrapper=document.createElement("div");wrapper.className="printedPage";wrapper.append(img);this.printContainer.append(wrapper);return new Promise(function(resolve,reject){img.onload=resolve;img.onerror=reject;});},performPrint(){this.throwIfInactive();return new Promise(resolve=>{setTimeout(()=>{if(!this.active){resolve();return;}print.call(window);const isIOS=navigator.platform&&["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document;setTimeout(resolve,isIOS?1500:20);},0);});},get active(){return this===activeService;},throwIfInactive(){if(!this.active){throw new Error("This print request was cancelled or completed.");}}};const print=window.print;window.printPDF=function printPdf(){if(!_app.PDFViewerApplication.enablePrint){return;}if(activeService){globalThis.ngxConsole.warn("Ignored window.printPDF() because of a pending print job.");return;}ensureOverlay().then(function(){if(activeService){overlayManager.open(dialog);}});try{dispatchEvent("beforeprint");}finally{if(!activeService){globalThis.ngxConsole.error("Expected print service to be initialized.");ensureOverlay().then(function(){if(overlayManager.active===dialog){overlayManager.close(dialog);}});return;}const activeServiceOnEntry=activeService;activeService.renderPages().then(function(){const progressIndicator=document.getElementById("printServiceDialog");if(progressIndicator){progressIndicator.classList.add("hidden");}return activeServiceOnEntry.performPrint();}).catch(function(){}).then(function(){if(activeServiceOnEntry.active){abort();}});}};function dispatchEvent(eventType){const event=document.createEvent("CustomEvent");event.initCustomEvent(eventType,false,false,"custom");window.dispatchEvent(event);}function abort(){if(activeService){activeService.destroy();dispatchEvent("afterprint");}}function renderProgress(index,total,l10n,eventBus){dialog=document.getElementById("printServiceDialog");const progress=Math.round(100*index/total);const progressBar=dialog.querySelector("progress");const progressPerc=dialog.querySelector(".relative-progress");progressBar.value=progress;l10n.get("print_progress_percent",{progress}).then(msg=>{progressPerc.textContent=msg;});eventBus.dispatch("progress",{source:this,type:"print",total,page:index,percent:100*index/total});}window.addEventListener("keydown",function(event){if(event.keyCode===80&&(event.ctrlKey||event.metaKey)&&!event.altKey&&(!event.shiftKey||window.chrome||window.opera)){window.print();event.preventDefault();event.stopImmediatePropagation();}},true);if("onbeforeprint"in window){const stopPropagationIfNeeded=function(event){if(event.detail!=="custom"){event.stopImmediatePropagation();}};window.addEventListener("beforeprint",stopPropagationIfNeeded);window.addEventListener("afterprint",stopPropagationIfNeeded);}let overlayPromise;function ensureOverlay(){if(!overlayPromise){overlayManager=_app.PDFViewerApplication.overlayManager;if(!overlayManager){throw new Error("The overlay manager has not yet been initialized.");}dialog=document.getElementById("printServiceDialog");overlayPromise=overlayManager.register(dialog,true);document.getElementById("printCancel").onclick=abort;dialog.addEventListener("close",abort);}return overlayPromise;}_app.PDFPrintServiceFactory.instance={supportsPrinting:true,createPrintService(pdfDocument,pagesOverview,printContainer,printResolution,optionalContentConfigPromise,printAnnotationStoragePromise,l10n,eventBus){if(activeService){throw new Error("The print service is created and active.");}activeService=new PDFPrintService(pdfDocument,pagesOverview,printContainer,printResolution,optionalContentConfigPromise,printAnnotationStoragePromise,l10n,eventBus);return activeService;}};

/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.getXfaHtmlForPrinting=getXfaHtmlForPrinting;var _pdfjsLib=__webpack_require__(4);var _pdf_link_service=__webpack_require__(7);var _xfa_layer_builder=__webpack_require__(179);function getXfaHtmlForPrinting(printContainer,pdfDocument){const xfaHtml=pdfDocument.allXfaHtml;const linkService=new _pdf_link_service.SimpleLinkService();const scale=Math.round(_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS*100)/100;for(const xfaPage of xfaHtml.children){const page=document.createElement("div");page.className="xfaPrintedPage";printContainer.append(page);const builder=new _xfa_layer_builder.XfaLayerBuilder({pageDiv:page,pdfPage:null,annotationStorage:pdfDocument.annotationStorage,linkService,xfaHtml:xfaPage});const viewport=(0,_pdfjsLib.getXfaPageViewport)(xfaPage,{scale});builder.render(viewport,"print");}}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "PDFViewerApplication", ({enumerable:true,get:function(){return _app.PDFViewerApplication;}}));exports.PDFViewerApplicationConstants=void 0;Object.defineProperty(exports, "PDFViewerApplicationOptions", ({enumerable:true,get:function(){return _app_options.AppOptions;}}));__webpack_require__(1);__webpack_require__(188);var _ui_utils=__webpack_require__(3);var _app_options=__webpack_require__(5);var _pdf_link_service=__webpack_require__(7);var _app=__webpack_require__(2);var _document$blockUnbloc,_document;const pdfjsVersion='3.5.547';const pdfjsBuild='86ba271f3';const AppConstants={LinkTarget:_pdf_link_service.LinkTarget,RenderingStates:_ui_utils.RenderingStates,ScrollMode:_ui_utils.ScrollMode,SpreadMode:_ui_utils.SpreadMode};exports.PDFViewerApplicationConstants=AppConstants;window.PDFViewerApplication=_app.PDFViewerApplication;window.PDFViewerApplicationConstants=AppConstants;window.PDFViewerApplicationOptions=_app_options.AppOptions;if(!HTMLCollection.prototype[Symbol.iterator]){HTMLCollection.prototype[Symbol.iterator]=Array.prototype[Symbol.iterator];}(function(){if(typeof window.CustomEvent==="function"){return;}function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:null};const evt=document.createEvent("CustomEvent");evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;}window.CustomEvent=CustomEvent;})();function getViewerConfiguration(){return{appContainer:document.body,mainContainer:document.getElementById("viewerContainer"),viewerContainer:document.getElementById("viewer"),toolbar:{container:document.getElementById("toolbarViewer"),numPages:document.getElementById("numPages"),pageNumber:document.getElementById("pageNumber"),scaleSelect:document.getElementById("scaleSelect"),customScaleOption:document.getElementById("customScaleOption"),previous:document.getElementById("previous"),next:document.getElementById("next"),zoomIn:document.getElementById("zoomIn"),zoomOut:document.getElementById("zoomOut"),viewFind:document.getElementById("viewFind"),openFile:document.getElementById("openFile"),print:document.getElementById("print"),editorFreeTextButton:document.getElementById("editorFreeText"),editorFreeTextParamsToolbar:document.getElementById("editorFreeTextParamsToolbar"),editorInkButton:document.getElementById("editorInk"),editorInkParamsToolbar:document.getElementById("editorInkParamsToolbar"),download:document.getElementById("download")},secondaryToolbar:{toolbar:document.getElementById("secondaryToolbar"),toggleButton:document.getElementById("secondaryToolbarToggle"),presentationModeButton:document.getElementById("presentationMode"),openFileButton:document.getElementById("secondaryOpenFile"),printButton:document.getElementById("secondaryPrint"),downloadButton:document.getElementById("secondaryDownload"),viewBookmarkButton:document.getElementById("viewBookmark"),firstPageButton:document.getElementById("firstPage"),lastPageButton:document.getElementById("lastPage"),pageRotateCwButton:document.getElementById("pageRotateCw"),pageRotateCcwButton:document.getElementById("pageRotateCcw"),cursorSelectToolButton:document.getElementById("cursorSelectTool"),cursorHandToolButton:document.getElementById("cursorHandTool"),scrollPageButton:document.getElementById("scrollPage"),scrollVerticalButton:document.getElementById("scrollVertical"),scrollHorizontalButton:document.getElementById("scrollHorizontal"),scrollWrappedButton:document.getElementById("scrollWrapped"),spreadNoneButton:document.getElementById("spreadNone"),spreadOddButton:document.getElementById("spreadOdd"),spreadEvenButton:document.getElementById("spreadEven"),documentPropertiesButton:document.getElementById("documentProperties")},sidebar:{outerContainer:document.getElementById("outerContainer"),sidebarContainer:document.getElementById("sidebarContainer"),toggleButton:document.getElementById("sidebarToggle"),thumbnailButton:document.getElementById("viewThumbnail"),outlineButton:document.getElementById("viewOutline"),attachmentsButton:document.getElementById("viewAttachments"),layersButton:document.getElementById("viewLayers"),thumbnailView:document.getElementById("thumbnailView"),outlineView:document.getElementById("outlineView"),attachmentsView:document.getElementById("attachmentsView"),layersView:document.getElementById("layersView"),outlineOptionsContainer:document.getElementById("outlineOptionsContainer"),currentOutlineItemButton:document.getElementById("currentOutlineItem")},sidebarResizer:{outerContainer:document.getElementById("outerContainer"),resizer:document.getElementById("sidebarResizer")},findBar:{bar:document.getElementById("findbar"),toggleButton:document.getElementById("viewFind"),findField:document.getElementById("findInput"),findFieldMultiline:document.getElementById("findInputMultiline"),highlightAllCheckbox:document.getElementById("findHighlightAll"),findCurrentPageCheckbox:document.getElementById("findCurrentPage"),findPageRangeField:document.getElementById("findRange"),caseSensitiveCheckbox:document.getElementById("findMatchCase"),matchDiacriticsCheckbox:document.getElementById("findMatchDiacritics"),entireWordCheckbox:document.getElementById("findEntireWord"),findMultipleSearchTextsCheckbox:document.getElementById("findMultipleSearchTexts"),ignoreAccentsCheckbox:document.getElementById("findIgnoreAccents"),fuzzyCheckbox:document.getElementById("findFuzzy"),findMsg:document.getElementById("findMsg"),findResultsCount:document.getElementById("findResultsCount"),findPreviousButton:document.getElementById("findPrevious"),findNextButton:document.getElementById("findNext")},passwordOverlay:{dialog:document.getElementById("passwordDialog"),label:document.getElementById("passwordText"),input:document.getElementById("password"),submitButton:document.getElementById("passwordSubmit"),cancelButton:document.getElementById("passwordCancel")},documentProperties:{dialog:document.getElementById("documentPropertiesDialog"),closeButton:document.getElementById("documentPropertiesClose"),fields:{fileName:document.getElementById("fileNameField"),fileSize:document.getElementById("fileSizeField"),title:document.getElementById("titleField"),author:document.getElementById("authorField"),subject:document.getElementById("subjectField"),keywords:document.getElementById("keywordsField"),creationDate:document.getElementById("creationDateField"),modificationDate:document.getElementById("modificationDateField"),creator:document.getElementById("creatorField"),producer:document.getElementById("producerField"),version:document.getElementById("versionField"),pageCount:document.getElementById("pageCountField"),pageSize:document.getElementById("pageSizeField"),linearized:document.getElementById("linearizedField")}},annotationEditorParams:{editorFreeTextFontSize:document.getElementById("editorFreeTextFontSize"),editorFreeTextColor:document.getElementById("editorFreeTextColor"),editorInkColor:document.getElementById("editorInkColor"),editorInkThickness:document.getElementById("editorInkThickness"),editorInkOpacity:document.getElementById("editorInkOpacity")},printContainer:document.getElementById("printContainer"),openFileInput:document.getElementById("fileInput"),debuggerScriptPath:"./debugger.js"};}function webViewerLoad(){const config=getViewerConfiguration();const event=document.createEvent("CustomEvent");event.initCustomEvent("webviewerloaded",true,true,{source:window});try{parent.document.dispatchEvent(event);}catch(ex){console.error(`webviewerloaded: ${ex}`);document.dispatchEvent(event);}_app.PDFViewerApplication.run(config);}(_document$blockUnbloc=(_document=document).blockUnblockOnload)===null||_document$blockUnbloc===void 0?void 0:_document$blockUnbloc.call(_document,true);window.webViewerLoad=webViewerLoad;
})();

/******/ })()
;
});
