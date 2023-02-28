/**
 * Class representing a main PageFlip object
 *
 * @extends EventObject
 */
export class PageFlip extends EventObject {
    /**
     * Create a new PageFlip instance
     *
     * @constructor
     * @param {HTMLElement} inBlock - Root HTML Element
     * @param {Object} setting - Configuration object
     */
    constructor(inBlock: HTMLElement, setting: Object);
    isUserTouch: boolean;
    isUserMove: boolean;
    setting: FlipSetting;
    pages: ImagePageCollection | HTMLPageCollection | null;
    block: HTMLElement;
    /**
     * Destructor. Remove a root HTML element and all event handlers
     */
    destroy(): void;
    /**
     * Update the render area. Re-show current page.
     */
    update(): void;
    /**
     * Load pages from images on the Canvas mode
     *
     * @param {string[]} imagesHref - List of paths to images
     */
    loadFromImages(imagesHref: string[]): void;
    ui: HTMLUI | CanvasUI | undefined;
    render: CanvasRender | HTMLRender | undefined;
    flipController: Flip | undefined;
    /**
     * Load pages from HTML elements on the HTML mode
     *
     * @param {(NodeListOf<HTMLElement>|HTMLElement[])} items - List of pages as HTML Element
     */
    loadFromHTML(items: (NodeListOf<HTMLElement> | HTMLElement[])): void;
    /**
     * Update current pages from images
     *
     * @param {string[]} imagesHref - List of paths to images
     */
    updateFromImages(imagesHref: string[]): void;
    /**
     * Update current pages from HTML
     *
     * @param {(NodeListOf<HTMLElement>|HTMLElement[])} items - List of pages as HTML Element
     */
    updateFromHtml(items: (NodeListOf<HTMLElement> | HTMLElement[])): void;
    /**
     * Clear pages from HTML (remove to initinalState)
     */
    clear(): void;
    /**
     * Turn to the previous page (without animation)
     */
    turnToPrevPage(): void;
    /**
     * Turn to the next page (without animation)
     */
    turnToNextPage(): void;
    /**
     * Turn to the specified page number (without animation)
     *
     * @param {number} page - New page number
     */
    turnToPage(page: number): void;
    /**
     * Turn to the next page (with animation)
     *
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flipNext(corner?: FlipCorner): void;
    /**
     * Turn to the prev page (with animation)
     *
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flipPrev(corner?: FlipCorner): void;
    /**
     * Turn to the specified page number (with animation)
     *
     * @param {number} page - New page number
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flip(page: number, corner?: FlipCorner): void;
    /**
     * Call a state change event trigger
     *
     * @param {FlippingState} newState - New  state of the object
     */
    updateState(newState: FlippingState): void;
    /**
     * Call a page number change event trigger
     *
     * @param {number} newPage - New page Number
     */
    updatePageIndex(newPage: number): void;
    /**
     * Call a page orientation change event trigger. Update UI and rendering area
     *
     * @param {Orientation} newOrientation - New page orientation (portrait, landscape)
     */
    updateOrientation(newOrientation: Orientation): void;
    /**
     * Get the total number of pages in a book
     *
     * @returns {number}
     */
    getPageCount(): number;
    /**
     * Get the index of the current page in the page list (starts at 0)
     *
     * @returns {number}
     */
    getCurrentPageIndex(): number;
    /**
     * Get page from collection by number
     *
     * @param {number} pageIndex
     * @returns {Page}
     */
    getPage(pageIndex: number): Page;
    /**
     * Get the current rendering object
     *
     * @returns {Render}
     */
    getRender(): Render;
    /**
     * Get current object responsible for flipping
     *
     * @returns {Flip}
     */
    getFlipController(): Flip;
    /**
     * Get current page orientation
     *
     * @returns {Orientation} Сurrent orientation: portrait or landscape
     */
    getOrientation(): Orientation;
    /**
     * Get current book sizes and position
     *
     * @returns {PageRect}
     */
    getBoundsRect(): PageRect;
    /**
     * Get configuration object
     *
     * @returns {FlipSetting}
     */
    getSettings(): FlipSetting;
    /**
     * Get UI object
     *
     * @returns {UI}
     */
    getUI(): UI;
    /**
     * Get current flipping state
     *
     * @returns {FlippingState}
     */
    getState(): FlippingState;
    /**
     * Get page collection
     *
     * @returns {PageCollection}
     */
    getPageCollection(): PageCollection;
    /**
     * Start page turning. Called when a user clicks or touches
     *
     * @param {Point} pos - Touch position in coordinates relative to the book
     */
    startUserTouch(pos: Point): void;
    mousePosition: any;
    /**
     * Called when a finger / mouse moves
     *
     * @param {Point} pos - Touch position in coordinates relative to the book
     * @param {boolean} isTouch - True if there was a touch event, not a mouse click
     */
    userMove(pos: Point, isTouch: boolean): void;
    /**
     * Сalled when the user has stopped touching
     *
     * @param {Point} pos - Touch end position in coordinates relative to the book
     * @param {boolean} isSwipe - true if there was a mobile swipe event
     */
    userStop(pos: Point, isSwipe?: boolean): void;
}
/**
 * A class implementing a basic event model
 */
declare class EventObject {
    events: Map<any, any>;
    /**
     * Add new event handler
     *
     * @param {string} eventName
     * @param {EventCallback} callback
     */
    on(eventName: string, callback: EventCallback): EventObject;
    /**
     * Removing all handlers from an event
     *
     * @param {string} event - Event name
     */
    off(event: string): void;
    trigger(eventName: any, app: any, data?: null): void;
}
/**
 * Сlass representing a collection of pages as images on the canvas
 */
declare class ImagePageCollection extends PageCollection {
    constructor(app: any, render: any, imagesHref: any);
    imagesHref: any;
    load(): void;
}
/**
 * Сlass representing a collection of pages as HTML Element
 */
declare class HTMLPageCollection extends PageCollection {
    constructor(app: any, render: any, element: any, items: any);
    element: any;
    pagesElement: any;
    load(): void;
}
/**
 * UI for HTML mode
 */
declare class HTMLUI extends UI {
    constructor(inBlock: any, app: any, setting: any, items: any);
    distElement: any;
    items: any;
    clear(): void;
    /**
     * Update page list from HTMLElements
     *
     * @param {(NodeListOf<HTMLElement>|HTMLElement[])} items - List of pages as HTML Element
     */
    updateItems(items: (NodeListOf<HTMLElement> | HTMLElement[])): void;
    update(): void;
}
/**
 * UI for canvas mode
 */
declare class CanvasUI extends UI {
    constructor(inBlock: any, app: any, setting: any);
    canvas: any;
    distElement: any;
    resizeCanvas(): void;
    /**
     * Get canvas element
     */
    getCanvas(): any;
    update(): void;
}
/**
 * Class responsible for rendering the Canvas book
 */
declare class CanvasRender extends Render {
    constructor(app: any, setting: any, inCanvas: any);
    canvas: any;
    getContext(): any;
    reload(): void;
    drawFrame(): void;
    drawBookShadow(): void;
    drawOuterShadow(): void;
    drawInnerShadow(): void;
    clear(): void;
}
/**
 * Class responsible for rendering the HTML book
 */
declare class HTMLRender extends Render {
    /**
     * @constructor
     *
     * @param {PageFlip} app - PageFlip object
     * @param {FlipSetting} setting - Configuration object
     * @param {HTMLElement} element - Parent HTML Element
     */
    constructor(app: PageFlip, setting: FlipSetting, element: HTMLElement);
    outerShadow: Element | null;
    innerShadow: Element | null;
    hardShadow: Element | null;
    hardInnerShadow: Element | null;
    element: HTMLElement;
    createShadows(): void;
    reload(): void;
    /**
     * Draw inner shadow to the hard page
     */
    drawHardInnerShadow(): void;
    /**
     * Draw outer shadow to the hard page
     */
    drawHardOuterShadow(): void;
    /**
     * Draw inner shadow to the soft page
     */
    drawInnerShadow(): void;
    /**
     * Draw outer shadow to the soft page
     */
    drawOuterShadow(): void;
    /**
     * Draw left static page
     */
    drawLeftPage(): void;
    /**
     * Draw right static page
     */
    drawRightPage(): void;
    /**
     * Draw the next page at the time of flipping
     */
    drawBottomPage(): void;
    drawFrame(): void;
    lastAngle: any;
    clear(): void;
}
/**
 * Class representing the flipping process
 */
declare class Flip {
    constructor(render: any, app: any);
    flippingPage: any;
    bottomPage: any;
    calc: FlipCalculation | null;
    state: string;
    render: any;
    app: any;
    /**
     * Called when the page folding (User drags page corner)
     *
     * @param globalPos - Touch Point Coordinates (relative window)
     */
    fold(globalPos: any): void;
    /**
     * Page turning with animation
     *
     * @param globalPos - Touch Point Coordinates (relative window)
     */
    flip(globalPos: any): void;
    /**
     * Start the flipping process. Find direction and corner of flipping. Creating an object for calculation.
     *
     * @param {Point} globalPos - Touch Point Coordinates (relative window)
     *
     * @returns {boolean} True if flipping is possible, false otherwise
     */
    start(globalPos: Point): boolean;
    /**
     * Perform calculations for the current page position. Pass data to render object
     *
     * @param {Point} pagePos - Touch Point Coordinates (relative active page)
     */
    do(pagePos: Point): void;
    /**
     * Turn to the specified page number (with animation)
     *
     * @param {number} page - New page number
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flipToPage(page: number, corner: FlipCorner): void;
    /**
     * Turn to the next page (with animation)
     *
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flipNext(corner: FlipCorner): void;
    /**
     * Turn to the prev page (with animation)
     *
     * @param {FlipCorner} corner - Active page corner when turning
     */
    flipPrev(corner: FlipCorner): void;
    /**
     * Called when the user has stopped flipping
     */
    stopMove(): void;
    /**
     * Fold the corners of the book when the mouse pointer is over them.
     * Called when the mouse pointer is over the book without clicking
     *
     * @param globalPos
     */
    showCorner(globalPos: any): void;
    /**
     * Starting the flipping animation process
     *
     * @param {Point} start - animation start point
     * @param {Point} dest - animation end point
     * @param {boolean} isTurned - will the page turn over, or just bring it back
     * @param {boolean} needReset - reset the flipping process at the end of the animation
     */
    animateFlippingTo(start: Point, dest: Point, isTurned: boolean, needReset?: boolean): void;
    /**
     * Get the current calculations object
     */
    getCalculation(): FlipCalculation | null;
    /**
     * Get current flipping state
     */
    getState(): string;
    setState(newState: any): void;
    getDirectionByPoint(touchPos: any): 1 | 0;
    getAnimationDuration(size: any): any;
    checkDirection(direction: any): boolean;
    reset(): void;
    getBoundsRect(): any;
    checkState(...states: any[]): boolean;
    isPointOnCorners(globalPos: any): boolean;
}
/**
 * Class representing a book page
 */
declare class Page {
    constructor(render: any, density: any);
    state: {
        angle: number;
        area: never[];
        position: {
            x: number;
            y: number;
        };
        hardAngle: number;
        hardDrawingAngle: number;
    };
    createdDensity: any;
    nowDrawingDensity: any;
    render: any;
    /**
     * Set a constant page density
     *
     * @param {PageDensity} density
     */
    setDensity(density: PageDensity): void;
    /**
     * Set temp page density to next render
     *
     * @param {PageDensity}  density
     */
    setDrawingDensity(density: PageDensity): void;
    /**
     * Set page position
     *
     * @param {Point} pagePos
     */
    setPosition(pagePos: Point): void;
    /**
     * Set page angle
     *
     * @param {number} angle
     */
    setAngle(angle: number): void;
    /**
     * Set page crop area
     *
     * @param {Point[]} area
     */
    setArea(area: Point[]): void;
    /**
     * Rotate angle for hard pages to next render
     *
     * @param {number} angle
     */
    setHardDrawingAngle(angle: number): void;
    /**
     * Rotate angle for hard pages
     *
     * @param {number} angle
     */
    setHardAngle(angle: number): void;
    /**
     * Set page orientation
     *
     * @param {PageOrientation} orientation
     */
    setOrientation(orientation: PageOrientation): void;
    orientation: any;
    /**
     * Get temp page density
     */
    getDrawingDensity(): any;
    /**
     * Get a constant page density
     */
    getDensity(): any;
    /**
     * Get rotate angle for hard pages
     */
    getHardAngle(): number;
}
/**
 * Class responsible for rendering the book
 */
declare class Render {
    constructor(app: any, setting: any);
    /** Left static book page */
    leftPage: any;
    /** Right static book page */
    rightPage: any;
    /** Page currently flipping */
    flippingPage: any;
    /** Next page at the time of flipping */
    bottomPage: any;
    /** Current flipping direction */
    direction: any;
    /** Current book orientation */
    orientation: any;
    /** Сurrent state of the shadows */
    shadow: {
        pos: Point;
        angle: number;
        width: number;
        opacity: number;
        direction: FlipDirection;
        progress: number;
    } | null;
    /** Сurrent animation process */
    animation: {
        frames: FrameAction[];
        duration: number;
        durationFrame: number;
        onAnimateEnd: AnimationSuccessAction;
        startedAt: number;
    } | null;
    /** Page borders while flipping */
    pageRect: any;
    /** Current book area */
    boundsRect: {
        left: number;
        top: number;
        width: number;
        height: any;
        pageWidth: any;
    } | null;
    /** Timer started from start of rendering */
    timer: number;
    /**
     * Safari browser definitions for resolving a bug with a css property clip-area
     *
     * https://bugs.webkit.org/show_bug.cgi?id=126207
     */
    safari: boolean;
    setting: any;
    app: any;
    /**
     * Executed when requestAnimationFrame is called. Performs the current animation process and call drawFrame()
     *
     * @param timer
     */
    render(timer: any): void;
    /**
     * Running requestAnimationFrame, and rendering process
     */
    start(): void;
    /**
     * Start a new animation process
     *
     * @param {FrameAction[]} frames - Frame list
     * @param {number} duration - total animation duration
     * @param {AnimationSuccessAction} onAnimateEnd - Animation callback function
     */
    startAnimation(frames: FrameAction[], duration: number, onAnimateEnd: AnimationSuccessAction): void;
    /**
     * End the current animation process and call the callback
     */
    finishAnimation(): void;
    /**
     * Recalculate the size of the displayed area, and update the page orientation
     */
    update(): void;
    /**
     * Calculate the size and position of the book depending on the parent element and configuration parameters
     */
    calculateBoundsRect(): string;
    /**
     * Set the current parameters of the drop shadow
     *
     * @param {Point} pos - Shadow Position Start Point
     * @param {number} angle - The angle of the shadows relative to the book
     * @param {number} progress - Flipping progress in percent (0 - 100)
     * @param {FlipDirection} direction - Flipping Direction, the direction of the shadow gradients
     */
    setShadowData(pos: Point, angle: number, progress: number, direction: FlipDirection): void;
    /**
     * Clear shadow
     */
    clearShadow(): void;
    /**
     * Get parent block offset width
     */
    getBlockWidth(): any;
    /**
     * Get parent block offset height
     */
    getBlockHeight(): any;
    /**
     * Get current flipping direction
     */
    getDirection(): any;
    /**
     * Сurrent size and position of the book
     */
    getRect(): {
        left: number;
        top: number;
        width: number;
        height: any;
        pageWidth: any;
    } | null;
    /**
     * Get configuration object
     */
    getSettings(): any;
    /**
     * Get current book orientation
     */
    getOrientation(): any;
    /**
     * Set page area while flipping
     *
     * @param direction
     */
    setPageRect(pageRect: any): void;
    /**
     * Set flipping direction
     *
     * @param direction
     */
    setDirection(direction: any): void;
    /**
     * Set right static book page
     *
     * @param page
     */
    setRightPage(page: any): void;
    /**
     * Set left static book page
     * @param page
     */
    setLeftPage(page: any): void;
    /**
     * Set next page at the time of flipping
     * @param page
     */
    setBottomPage(page: any): void;
    /**
     * Set currently flipping page
     *
     * @param page
     */
    setFlippingPage(page: any): void;
    /**
     * Coordinate conversion function. Window coordinates -> to book coordinates
     *
     * @param {Point} pos - Global coordinates relative to the window
     * @returns {Point} Coordinates relative to the book
     */
    convertToBook(pos: Point): Point;
    isSafari(): boolean;
    /**
     * Coordinate conversion function. Window coordinates -> to current coordinates of the working page
     *
     * @param {Point} pos - Global coordinates relative to the window
     * @param {FlipDirection} direction  - Current flipping direction
     *
     * @returns {Point} Coordinates relative to the work page
     */
    convertToPage(pos: Point, direction: FlipDirection): Point;
    /**
     * Coordinate conversion function. Coordinates relative to the work page -> Window coordinates
     *
     * @param {Point} pos - Coordinates relative to the work page
     * @param {FlipDirection} direction  - Current flipping direction
     *
     * @returns {Point} Global coordinates relative to the window
     */
    convertToGlobal(pos: Point, direction: FlipDirection): Point;
    /**
     * Casting the coordinates of the corners of the rectangle in the coordinates relative to the window
     *
     * @param {RectPoints} rect - Coordinates of the corners of the rectangle relative to the work page
     * @param {FlipDirection} direction  - Current flipping direction
     *
     * @returns {RectPoints} Coordinates of the corners of the rectangle relative to the window
     */
    convertRectToGlobal(rect: RectPoints, direction: FlipDirection): RectPoints;
}
/**
 * UI Class, represents work with DOM
 */
declare class UI {
    /**
     * @constructor
     *
     * @param {HTMLElement} inBlock - Root HTML Element
     * @param {PageFlip} app - PageFlip instanse
     * @param {FlipSetting} setting - Configuration object
     */
    constructor(inBlock: HTMLElement, app: PageFlip, setting: FlipSetting);
    touchPoint: {
        point: {
            x: number;
            y: number;
        };
        time: number;
    } | null;
    swipeTimeout: number;
    onResize: () => void;
    onMouseDown: (e: any) => void;
    onTouchStart: (e: any) => void;
    onMouseUp: (e: any) => void;
    onMouseMove: (e: any) => void;
    onTouchMove: (e: any) => void;
    onTouchEnd: (e: any) => void;
    parentElement: HTMLElement;
    wrapper: Element | null;
    app: PageFlip;
    swipeDistance: any;
    /**
     * Destructor. Remove all HTML elements and all event handlers
     */
    destroy(): void;
    /**
     * Get parent element for book
     *
     * @returns {HTMLElement}
     */
    getDistElement(): HTMLElement;
    /**
     * Get wrapper element
     *
     * @returns {HTMLElement}
     */
    getWrapper(): HTMLElement;
    /**
     * Updates styles and sizes based on book orientation
     *
     * @param {Orientation} orientation - New book orientation
     */
    setOrientationStyle(orientation: Orientation): void;
    removeHandlers(): void;
    setHandlers(): void;
    /**
     * Convert global coordinates to relative book coordinates
     *
     * @param x
     * @param y
     */
    getMousePos(x: any, y: any): {
        x: number;
        y: number;
    };
    checkTarget(targer: any): boolean;
}
/**
 * Сlass representing a collection of pages
 */
declare class PageCollection {
    constructor(app: any, render: any);
    /** Pages List */
    pages: any[];
    /** Index of the current page in list */
    currentPageIndex: number;
    /** Number of the current spread in book */
    currentSpreadIndex: number;
    /**  Two-page spread in landscape mode */
    landscapeSpread: any[];
    /**  One-page spread in portrait mode */
    portraitSpread: any[];
    render: any;
    app: any;
    isShowCover: any;
    /**
     * Clear pages list
     */
    destroy(): void;
    /**
     * Split the book on the two-page spread in landscape mode and one-page spread in portrait mode
     */
    createSpread(): void;
    /**
     * Get spread by mode (portrait or landscape)
     */
    getSpread(): any[];
    /**
     * Get spread index by page number
     *
     * @param {number} pageNum - page index
     */
    getSpreadIndexByPage(pageNum: number): number | null;
    /**
     * Get the total number of pages
     */
    getPageCount(): number;
    /**
     * Get the pages list
     */
    getPages(): any[];
    /**
     * Get page by index
     *
     * @param {number} pageIndex
     */
    getPage(pageIndex: number): any;
    /**
     * Get the next page from the specified
     *
     * @param {Page} current
     */
    nextBy(current: Page): any;
    /**
     * Get previous page from specified
     *
     * @param {Page} current
     */
    prevBy(current: Page): any;
    /**
     * Get flipping page depending on the direction
     *
     * @param {FlipDirection} direction
     */
    getFlippingPage(direction: FlipDirection): any;
    /**
     * Get Next page at the time of flipping
     *
     * @param {FlipDirection}  direction
     */
    getBottomPage(direction: FlipDirection): any;
    /**
     * Show next spread
     */
    showNext(): void;
    /**
     * Show prev spread
     */
    showPrev(): void;
    /**
     * Get the number of the current spread in book
     */
    getCurrentPageIndex(): number;
    /**
     * Show specified page
     * @param {number} pageNum - Page index (from 0s)
     */
    show(pageNum?: number): void;
    /**
     * Index of the current page in list
     */
    getCurrentSpreadIndex(): number;
    /**
     * Set new spread index as current
     *
     * @param {number} newIndex - new spread index
     */
    setCurrentSpreadIndex(newIndex: number): void;
    /**
     * Show current spread
     */
    showSpread(): void;
}
/**
 * Class representing mathematical methods for calculating page position (rotation angle, clip area ...)
 */
declare class FlipCalculation {
    /**
     * @constructor
     *
     * @param {FlipDirection} direction - Flipping direction
     * @param {FlipCorner} corner - Flipping corner
     * @param pageWidth - Current page width
     * @param pageHeight - Current page height
     */
    constructor(direction: FlipDirection, corner: FlipCorner, pageWidth: any, pageHeight: any);
    direction: FlipDirection;
    corner: FlipCorner;
    /** The point of intersection of the page with the borders of the book */
    topIntersectPoint: any;
    sideIntersectPoint: any;
    bottomIntersectPoint: any;
    pageWidth: number;
    pageHeight: number;
    /**
     * The main calculation method
     *
     * @param {Point} localPos - Touch Point Coordinates (relative active page!)
     *
     * @returns {boolean} True - if the calculations were successful, false if errors occurred
     */
    calc(localPos: Point): boolean;
    position: any;
    /**
     * Get the crop area for the flipping page
     *
     * @returns {Point[]} Polygon page
     */
    getFlippingClipArea(): Point[];
    /**
     * Get the crop area for the page that is below the page to be flipped
     *
     * @returns {Point[]} Polygon page
     */
    getBottomClipArea(): Point[];
    /**
     * Get page rotation angle
     */
    getAngle(): number | undefined;
    /**
     * Get page area while flipping
     */
    getRect(): {
        topLeft: {
            x: any;
            y: any;
        };
        topRight: {
            x: any;
            y: any;
        };
        bottomLeft: {
            x: any;
            y: any;
        };
        bottomRight: {
            x: any;
            y: any;
        };
    } | undefined;
    /**
     * Get the position of the active angle when turning
     */
    getPosition(): any;
    /**
     * Get the active corner of the page (which pull)
     */
    getActiveCorner(): {
        x: any;
        y: any;
    };
    /**
     * Get flipping direction
     */
    getDirection(): FlipDirection;
    /**
     * Get flipping progress (0-100)
     */
    getFlippingProgress(): number;
    /**
     * Get flipping corner position (top, bottom)
     */
    getCorner(): FlipCorner;
    /**
     * Get start position for the page that is below the page to be flipped
     */
    getBottomPagePosition(): {
        x: number;
        y: number;
    };
    /**
     * Get the starting position of the shadow
     */
    getShadowStartPoint(): any;
    /**
     * Get the rotate angle of the shadow
     */
    getShadowAngle(): number;
    calcAngleAndPosition(pos: any): any;
    updateAngleAndGeometry(pos: any): void;
    angle: number | undefined;
    rect: {
        topLeft: {
            x: any;
            y: any;
        };
        topRight: {
            x: any;
            y: any;
        };
        bottomLeft: {
            x: any;
            y: any;
        };
        bottomRight: {
            x: any;
            y: any;
        };
    } | undefined;
    calculateAngle(pos: any): number;
    getPageRect(localPos: any): {
        topLeft: {
            x: any;
            y: any;
        };
        topRight: {
            x: any;
            y: any;
        };
        bottomLeft: {
            x: any;
            y: any;
        };
        bottomRight: {
            x: any;
            y: any;
        };
    };
    getRectFromBasePoint(points: any, localPos: any): {
        topLeft: {
            x: any;
            y: any;
        };
        topRight: {
            x: any;
            y: any;
        };
        bottomLeft: {
            x: any;
            y: any;
        };
        bottomRight: {
            x: any;
            y: any;
        };
    };
    getRotatedPoint(transformedPoint: any, startPoint: any): {
        x: any;
        y: any;
    };
    calculateIntersectPoint(pos: any): void;
    checkPositionAtCenterLine(checkedPos: any, centerOne: any, centerTwo: any): any;
    getSegmentToShadowLine(): any[];
}
export {};
