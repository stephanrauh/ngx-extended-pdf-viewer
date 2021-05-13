export class BindItems extends XFAObject {
    constructor(attributes: any);
    connection: any;
    labelRef: any;
    ref: any;
    valueRef: any;
}
export class Field extends XFAObject {
    constructor(attributes: any);
    access: any;
    accessKey: any;
    anchorType: any;
    colSpan: any;
    h: any;
    hAlign: any;
    id: any;
    locale: any;
    maxH: any;
    maxW: any;
    minH: any;
    minW: any;
    name: any;
    presence: any;
    relevant: any;
    rotate: any;
    usehref: any;
    w: any;
    x: any;
    y: any;
    assist: any;
    bind: any;
    border: any;
    calculate: any;
    caption: any;
    desc: any;
    extras: any;
    font: any;
    format: any;
    items: XFAObjectArray;
    keep: any;
    margin: any;
    para: any;
    traversal: any;
    ui: any;
    validate: any;
    value: any;
    bindItems: XFAObjectArray;
    connect: XFAObjectArray;
    event: XFAObjectArray;
    setProperty: XFAObjectArray;
}
export class Items extends XFAObject {
    constructor(attributes: any);
    id: any;
    name: any;
    presence: any;
    ref: any;
    save: any;
    usehref: any;
    boolean: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    decimal: XFAObjectArray;
    exData: XFAObjectArray;
    float: XFAObjectArray;
    image: XFAObjectArray;
    integer: XFAObjectArray;
    text: XFAObjectArray;
    time: XFAObjectArray;
}
export class SetProperty extends XFAObject {
    constructor(attributes: any);
    connection: any;
    ref: any;
    target: any;
}
export class Template extends XFAObject {
    constructor(attributes: any);
    baseProfile: any;
    extras: any;
    subform: XFAObjectArray;
}
export class TemplateNamespace {
    static appearanceFilter(attrs: any): AppearanceFilter;
    static arc(attrs: any): Arc;
    static area(attrs: any): Area;
    static assist(attrs: any): Assist;
    static barcode(attrs: any): Barcode;
    static bind(attrs: any): Bind;
    static bindItems(attrs: any): BindItems;
    static bookend(attrs: any): Bookend;
    static boolean(attrs: any): BooleanElement;
    static border(attrs: any): Border;
    static break(attrs: any): Break;
    static breakAfter(attrs: any): BreakAfter;
    static breakBefore(attrs: any): BreakBefore;
    static button(attrs: any): Button;
    static calculate(attrs: any): Calculate;
    static caption(attrs: any): Caption;
    static certificate(attrs: any): Certificate;
    static certificates(attrs: any): Certificates;
    static checkButton(attrs: any): CheckButton;
    static choiceList(attrs: any): ChoiceList;
    static color(attrs: any): Color;
    static comb(attrs: any): Comb;
    static connect(attrs: any): Connect;
    static contentArea(attrs: any): ContentArea;
    static corner(attrs: any): Corner;
    static date(attrs: any): DateElement;
    static dateTime(attrs: any): DateTime;
    static dateTimeEdit(attrs: any): DateTimeEdit;
    static decimal(attrs: any): Decimal;
    static defaultUi(attrs: any): DefaultUi;
    static desc(attrs: any): Desc;
    static digestMethod(attrs: any): DigestMethod;
    static digestMethods(attrs: any): DigestMethods;
    static draw(attrs: any): Draw;
    static edge(attrs: any): Edge;
    static encoding(attrs: any): Encoding;
    static encodings(attrs: any): Encodings;
    static encrypt(attrs: any): Encrypt;
    static encryptData(attrs: any): EncryptData;
    static encryption(attrs: any): Encryption;
    static encryptionMethod(attrs: any): EncryptionMethod;
    static encryptionMethods(attrs: any): EncryptionMethods;
    static event(attrs: any): Event;
    static exData(attrs: any): ExData;
    static exObject(attrs: any): ExObject;
    static exclGroup(attrs: any): ExclGroup;
    static execute(attrs: any): Execute;
    static extras(attrs: any): Extras;
    static field(attrs: any): Field;
    static fill(attrs: any): Fill;
    static filter(attrs: any): Filter;
    static float(attrs: any): Float;
    static font(attrs: any): Font;
    static format(attrs: any): Format;
    static handler(attrs: any): Handler;
    static hyphenation(attrs: any): Hyphenation;
    static image(attrs: any): Image;
    static imageEdit(attrs: any): ImageEdit;
    static integer(attrs: any): Integer;
    static issuers(attrs: any): Issuers;
    static items(attrs: any): Items;
    static keep(attrs: any): Keep;
    static keyUsage(attrs: any): KeyUsage;
    static line(attrs: any): Line;
    static linear(attrs: any): Linear;
    static lockDocument(attrs: any): LockDocument;
    static manifest(attrs: any): Manifest;
    static margin(attrs: any): Margin;
    static mdp(attrs: any): Mdp;
    static medium(attrs: any): Medium;
    static message(attrs: any): Message;
    static numericEdit(attrs: any): NumericEdit;
    static occur(attrs: any): Occur;
    static oid(attrs: any): Oid;
    static oids(attrs: any): Oids;
    static overflow(attrs: any): Overflow;
    static pageArea(attrs: any): PageArea;
    static pageSet(attrs: any): PageSet;
    static para(attrs: any): Para;
    static passwordEdit(attrs: any): PasswordEdit;
    static pattern(attrs: any): Pattern;
    static picture(attrs: any): Picture;
    static proto(attrs: any): Proto;
    static radial(attrs: any): Radial;
    static reason(attrs: any): Reason;
    static reasons(attrs: any): Reasons;
    static rectangle(attrs: any): Rectangle;
    static ref(attrs: any): RefElement;
    static script(attrs: any): Script;
    static setProperty(attrs: any): SetProperty;
    static signData(attrs: any): SignData;
    static signature(attrs: any): Signature;
    static signing(attrs: any): Signing;
    static solid(attrs: any): Solid;
    static speak(attrs: any): Speak;
    static stipple(attrs: any): Stipple;
    static subform(attrs: any): Subform;
    static subformSet(attrs: any): SubformSet;
    static subjectDN(attrs: any): SubjectDN;
    static subjectDNs(attrs: any): SubjectDNs;
    static submit(attrs: any): Submit;
    static template(attrs: any): Template;
    static text(attrs: any): Text;
    static textEdit(attrs: any): TextEdit;
    static time(attrs: any): Time;
    static timeStamp(attrs: any): TimeStamp;
    static toolTip(attrs: any): ToolTip;
    static traversal(attrs: any): Traversal;
    static traverse(attrs: any): Traverse;
    static ui(attrs: any): Ui;
    static validate(attrs: any): Validate;
    static value(attrs: any): Value;
    static variables(attrs: any): Variables;
    static [$buildXFAObject](name: any, attributes: any): any;
}
export class Text extends ContentObject {
    constructor(attributes: any);
    id: any;
    maxChars: any;
    name: any;
    rid: any;
    usehref: any;
}
export class Value extends XFAObject {
    constructor(attributes: any);
    id: any;
    override: any;
    relevant: any;
    usehref: any;
    arc: any;
    boolean: any;
    date: any;
    dateTime: any;
    decimal: any;
    exData: any;
    float: any;
    image: any;
    integer: any;
    line: any;
    rectangle: any;
    text: any;
    time: any;
}
import { XFAObject } from "./xfa_object.js";
import { XFAObjectArray } from "./xfa_object.js";
declare class AppearanceFilter extends StringObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
}
declare class Arc extends XFAObject {
    constructor(attributes: any);
    circular: any;
    hand: any;
    id: any;
    startAngle: any;
    sweepAngle: any;
    usehref: any;
    edge: any;
    fill: any;
}
declare class Area extends XFAObject {
    constructor(attributes: any);
    colSpan: any;
    id: any;
    name: any;
    relevant: any;
    usehref: any;
    x: any;
    y: any;
    desc: any;
    extras: any;
    area: XFAObjectArray;
    draw: XFAObjectArray;
    exObject: XFAObjectArray;
    exclGroup: XFAObjectArray;
    field: XFAObjectArray;
    subform: XFAObjectArray;
    subformSet: XFAObjectArray;
}
declare class Assist extends XFAObject {
    constructor(attributes: any);
    id: any;
    role: any;
    usehref: any;
    speak: any;
    toolTip: any;
}
declare class Barcode extends XFAObject {
    constructor(attributes: any);
    charEncoding: any;
    checksum: any;
    dataColumnCount: any;
    dataLength: any;
    dataPrep: any;
    dataRowCount: any;
    endChar: any;
    errorCorrectionLevel: any;
    id: any;
    moduleHeight: any;
    moduleWidth: any;
    printCheckDigit: any;
    rowColumnRatio: {
        num: any;
        den: any;
    };
    startChar: any;
    textLocation: any;
    truncate: any;
    type: any;
    upsMode: any;
    usehref: any;
    wideNarrowRatio: {
        num: any;
        den: any;
    };
    encrypt: any;
    extras: any;
}
declare class Bind extends XFAObject {
    constructor(attributes: any);
    match: any;
    ref: any;
    picture: any;
}
declare class Bookend extends XFAObject {
    constructor(attributes: any);
    id: any;
    leader: any;
    trailer: any;
    usehref: any;
}
declare class BooleanElement extends Option01 {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Border extends XFAObject {
    constructor(attributes: any);
    break: any;
    hand: any;
    id: any;
    presence: any;
    relevant: any;
    usehref: any;
    corner: XFAObjectArray;
    edge: XFAObjectArray;
    extras: any;
    fill: any;
    margin: any;
}
declare class Break extends XFAObject {
    constructor(attributes: any);
    after: any;
    afterTarget: any;
    before: any;
    beforeTarget: any;
    bookendLeader: any;
    bookendTrailer: any;
    id: any;
    overflowLeader: any;
    overflowTarget: any;
    overflowTrailer: any;
    startNew: any;
    usehref: any;
    extras: any;
}
declare class BreakAfter extends XFAObject {
    constructor(attributes: any);
    id: any;
    leader: any;
    startNew: any;
    target: any;
    targetType: any;
    trailer: any;
    usehref: any;
    script: any;
}
declare class BreakBefore extends XFAObject {
    constructor(attributes: any);
    id: any;
    leader: any;
    startNew: any;
    target: any;
    targetType: any;
    trailer: any;
    usehref: any;
    script: any;
}
declare class Button extends XFAObject {
    constructor(attributes: any);
    highlight: any;
    id: any;
    usehref: any;
    extras: any;
}
declare class Calculate extends XFAObject {
    constructor(attributes: any);
    id: any;
    override: any;
    usehref: any;
    extras: any;
    message: any;
    script: any;
}
declare class Caption extends XFAObject {
    constructor(attributes: any);
    id: any;
    placement: any;
    presence: any;
    reserve: any;
    usehref: any;
    extras: any;
    font: any;
    margin: any;
    para: any;
    value: any;
}
declare class Certificate extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Certificates extends XFAObject {
    constructor(attributes: any);
    credentialServerPolicy: any;
    id: any;
    url: any;
    urlPolicy: any;
    usehref: any;
    encryption: any;
    issuers: any;
    keyUsage: any;
    oids: any;
    signing: any;
    subjectDNs: any;
}
declare class CheckButton extends XFAObject {
    constructor(attributes: any);
    id: any;
    mark: any;
    shape: any;
    size: any;
    usehref: any;
    border: any;
    extras: any;
    margin: any;
}
declare class ChoiceList extends XFAObject {
    constructor(attributes: any);
    commitOn: any;
    id: any;
    open: any;
    textEntry: any;
    usehref: any;
    border: any;
    extras: any;
    margin: any;
}
declare class Color extends XFAObject {
    constructor(attributes: any);
    cSpace: any;
    id: any;
    usehref: any;
    value: {
        r: number;
        g: number;
        b: number;
    };
    extras: any;
}
declare class Comb extends XFAObject {
    constructor(attributes: any);
    id: any;
    numberOfCells: any;
    usehref: any;
}
declare class Connect extends XFAObject {
    constructor(attributes: any);
    connection: any;
    id: any;
    ref: any;
    usage: any;
    usehref: any;
    picture: any;
}
declare class ContentArea extends XFAObject {
    constructor(attributes: any);
    h: any;
    id: any;
    name: any;
    relevant: any;
    usehref: any;
    w: any;
    x: any;
    y: any;
    desc: any;
    extras: any;
}
declare class Corner extends XFAObject {
    constructor(attributes: any);
    id: any;
    inverted: any;
    join: any;
    presence: any;
    radius: any;
    stroke: any;
    thickness: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class DateElement extends ContentObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class DateTime extends ContentObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class DateTimeEdit extends XFAObject {
    constructor(attributes: any);
    hScrollPolicy: any;
    id: any;
    picker: any;
    usehref: any;
    border: any;
    comb: any;
    extras: any;
    margin: any;
}
declare class Decimal extends ContentObject {
    constructor(attributes: any);
    fracDigits: any;
    id: any;
    leadDigits: any;
    name: any;
    usehref: any;
}
declare class DefaultUi extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    extras: any;
}
declare class Desc extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    boolean: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    decimal: XFAObjectArray;
    exData: XFAObjectArray;
    float: XFAObjectArray;
    image: XFAObjectArray;
    integer: XFAObjectArray;
    text: XFAObjectArray;
    time: XFAObjectArray;
}
declare class DigestMethod extends OptionObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
}
declare class DigestMethods extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    digestMethod: XFAObjectArray;
}
declare class Draw extends XFAObject {
    constructor(attributes: any);
    anchorType: any;
    colSpan: any;
    h: any;
    hAlign: any;
    id: any;
    locale: any;
    maxH: any;
    maxW: any;
    minH: any;
    minW: any;
    name: any;
    presence: any;
    relevant: any;
    rotate: any;
    usehref: any;
    w: any;
    x: any;
    y: any;
    assist: any;
    border: any;
    caption: any;
    desc: any;
    extras: any;
    font: any;
    keep: any;
    margin: any;
    para: any;
    traversal: any;
    ui: any;
    value: any;
    setProperty: XFAObjectArray;
}
declare class Edge extends XFAObject {
    constructor(attributes: any);
    cap: any;
    id: any;
    presence: any;
    stroke: any;
    thickness: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class Encoding extends OptionObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
}
declare class Encodings extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    encoding: XFAObjectArray;
}
declare class Encrypt extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    certificate: any;
}
declare class EncryptData extends XFAObject {
    constructor(attributes: any);
    id: any;
    operation: any;
    target: any;
    usehref: any;
    filter: any;
    manifest: any;
}
declare class Encryption extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    certificate: XFAObjectArray;
}
declare class EncryptionMethod extends OptionObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
}
declare class EncryptionMethods extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    encryptionMethod: XFAObjectArray;
}
declare class Event extends XFAObject {
    constructor(attributes: any);
    activity: any;
    id: any;
    listen: any;
    name: any;
    ref: any;
    usehref: any;
    extras: any;
    encryptData: any;
    execute: any;
    script: any;
    signData: any;
    submit: any;
}
declare class ExData extends ContentObject {
    constructor(attributes: any);
    contentType: any;
    href: any;
    id: any;
    maxLength: any;
    name: any;
    rid: any;
    transferEncoding: any;
    usehref: any;
}
declare class ExObject extends XFAObject {
    constructor(attributes: any);
    archive: any;
    classId: any;
    codeBase: any;
    codeType: any;
    id: any;
    name: any;
    usehref: any;
    extras: any;
    boolean: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    decimal: XFAObjectArray;
    exData: XFAObjectArray;
    exObject: XFAObjectArray;
    float: XFAObjectArray;
    image: XFAObjectArray;
    integer: XFAObjectArray;
    text: XFAObjectArray;
    time: XFAObjectArray;
}
declare class ExclGroup extends XFAObject {
    constructor(attributes: any);
    access: any;
    accessKey: any;
    anchorType: any;
    colSpan: any;
    h: any;
    hAlign: any;
    id: any;
    layout: any;
    maxH: any;
    maxW: any;
    minH: any;
    minW: any;
    name: any;
    presence: any;
    relevant: any;
    usehref: any;
    w: any;
    x: any;
    y: any;
    assist: any;
    bind: any;
    border: any;
    calculate: any;
    caption: any;
    desc: any;
    extras: any;
    margin: any;
    para: any;
    traversal: any;
    validate: any;
    connect: XFAObjectArray;
    event: XFAObjectArray;
    field: XFAObjectArray;
    setProperty: XFAObjectArray;
}
declare class Execute extends XFAObject {
    constructor(attributes: any);
    connection: any;
    executeType: any;
    id: any;
    runAt: any;
    usehref: any;
}
declare class Extras extends XFAObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
    boolean: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    decimal: XFAObjectArray;
    exData: XFAObjectArray;
    extras: XFAObjectArray;
    float: XFAObjectArray;
    image: XFAObjectArray;
    integer: XFAObjectArray;
    text: XFAObjectArray;
    time: XFAObjectArray;
}
declare class Fill extends XFAObject {
    constructor(attributes: any);
    id: any;
    presence: any;
    usehref: any;
    color: any;
    extras: any;
    linear: any;
    pattern: any;
    radial: any;
    solid: any;
    stipple: any;
}
declare class Filter extends XFAObject {
    constructor(attributes: any);
    addRevocationInfo: any;
    id: any;
    name: any;
    usehref: any;
    version: any;
    appearanceFilter: any;
    certificates: any;
    digestMethods: any;
    encodings: any;
    encryptionMethods: any;
    handler: any;
    lockDocument: any;
    mdp: any;
    reasons: any;
    timeStamp: any;
}
declare class Float extends ContentObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Font extends XFAObject {
    constructor(attributes: any);
    baselineShift: any;
    fontHorizontalScale: any;
    fontVerticalScale: any;
    id: any;
    kerningMode: any;
    letterSpacing: any;
    lineThrough: any;
    lineThroughPeriod: any;
    overline: any;
    overlinePeriod: any;
    posture: any;
    size: any;
    typeface: any;
    underline: any;
    underlinePeriod: any;
    usehref: any;
    weight: any;
    extras: any;
    fill: any;
}
declare class Format extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    extras: any;
    picture: any;
}
declare class Handler extends StringObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
}
declare class Hyphenation extends XFAObject {
    constructor(attributes: any);
    excludeAllCaps: any;
    excludeInitialCap: any;
    hyphenate: any;
    id: any;
    pushCharacterCount: any;
    remainCharacterCount: any;
    usehref: any;
    wordCharacterCount: any;
}
declare class Image extends StringObject {
    constructor(attributes: any);
    aspect: any;
    contentType: any;
    href: any;
    id: any;
    name: any;
    transferEncoding: any;
    usehref: any;
}
declare class ImageEdit extends XFAObject {
    constructor(attributes: any);
    data: any;
    id: any;
    usehref: any;
    border: any;
    extras: any;
    margin: any;
}
declare class Integer extends ContentObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Issuers extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    certificate: XFAObjectArray;
}
declare class Keep extends XFAObject {
    constructor(attributes: any);
    id: any;
    intact: any;
    next: any;
    previous: any;
    usehref: any;
    extras: any;
}
declare class KeyUsage extends XFAObject {
    constructor(attributes: any);
    crlSign: any;
    dataEncipherment: any;
    decipherOnly: any;
    digitalSignature: any;
    encipherOnly: any;
    id: any;
    keyAgreement: any;
    keyCertSign: any;
    keyEncipherment: any;
    nonRepudiation: any;
    type: any;
    usehref: any;
}
declare class Line extends XFAObject {
    constructor(attributes: any);
    hand: any;
    id: any;
    slope: any;
    usehref: any;
    edge: any;
}
declare class Linear extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class LockDocument extends ContentObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
}
declare class Manifest extends XFAObject {
    constructor(attributes: any);
    action: any;
    id: any;
    name: any;
    usehref: any;
    extras: any;
    ref: XFAObjectArray;
}
declare class Margin extends XFAObject {
    constructor(attributes: any);
    bottomInset: any;
    id: any;
    leftInset: any;
    rightInset: any;
    topInset: any;
    usehref: any;
    extras: any;
}
declare class Mdp extends XFAObject {
    constructor(attributes: any);
    id: any;
    permissions: any;
    signatureType: any;
    usehref: any;
}
declare class Medium extends XFAObject {
    constructor(attributes: any);
    id: any;
    imagingBBox: {
        x: any;
        y: any;
        width: any;
        height: any;
    };
    long: any;
    orientation: any;
    short: any;
    stock: any;
    trayIn: any;
    trayOut: any;
    usehref: any;
}
declare class Message extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    text: XFAObjectArray;
}
declare class NumericEdit extends XFAObject {
    constructor(attributes: any);
    hScrollPolicy: any;
    id: any;
    usehref: any;
    border: any;
    comb: any;
    extras: any;
    margin: any;
}
declare class Occur extends XFAObject {
    constructor(attributes: any);
    id: any;
    initial: any;
    max: any;
    min: any;
    usehref: any;
    extras: any;
}
declare class Oid extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Oids extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    oid: XFAObjectArray;
}
declare class Overflow extends XFAObject {
    constructor(attributes: any);
    id: any;
    leader: any;
    target: any;
    trailer: any;
    usehref: any;
}
declare class PageArea extends XFAObject {
    constructor(attributes: any);
    blankOrNotBlank: any;
    id: any;
    initialNumber: any;
    name: any;
    numbered: any;
    oddOrEven: any;
    pagePosition: any;
    relevant: any;
    usehref: any;
    desc: any;
    extras: any;
    medium: any;
    occur: any;
    area: XFAObjectArray;
    contentArea: XFAObjectArray;
    draw: XFAObjectArray;
    exclGroup: XFAObjectArray;
    field: XFAObjectArray;
    subform: XFAObjectArray;
}
declare class PageSet extends XFAObject {
    constructor(attributes: any);
    duplexImposition: any;
    id: any;
    name: any;
    relation: any;
    relevant: any;
    usehref: any;
    extras: any;
    occur: any;
    pageArea: XFAObjectArray;
    pageSet: XFAObjectArray;
}
declare class Para extends XFAObject {
    constructor(attributes: any);
    hAlign: any;
    id: any;
    lineHeight: any;
    marginLeft: any;
    marginRight: any;
    orphans: any;
    preserve: any;
    radixOffset: any;
    spaceAbove: any;
    spaceBelow: any;
    tabDefault: any;
    tabStops: any;
    textIndent: any;
    usehref: any;
    vAlign: any;
    widows: any;
    hyphenation: any;
}
declare class PasswordEdit extends XFAObject {
    constructor(attributes: any);
    hScrollPolicy: any;
    id: any;
    passwordChar: any;
    usehref: any;
    border: any;
    extras: any;
    margin: any;
}
declare class Pattern extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class Picture extends StringObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
}
declare class Proto extends XFAObject {
    constructor(attributes: any);
    appearanceFilter: XFAObjectArray;
    arc: XFAObjectArray;
    area: XFAObjectArray;
    assist: XFAObjectArray;
    barcode: XFAObjectArray;
    bindItems: XFAObjectArray;
    bookend: XFAObjectArray;
    boolean: XFAObjectArray;
    border: XFAObjectArray;
    break: XFAObjectArray;
    breakAfter: XFAObjectArray;
    breakBefore: XFAObjectArray;
    button: XFAObjectArray;
    calculate: XFAObjectArray;
    caption: XFAObjectArray;
    certificate: XFAObjectArray;
    certificates: XFAObjectArray;
    checkButton: XFAObjectArray;
    choiceList: XFAObjectArray;
    color: XFAObjectArray;
    comb: XFAObjectArray;
    connect: XFAObjectArray;
    contentArea: XFAObjectArray;
    corner: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    dateTimeEdit: XFAObjectArray;
    decimal: XFAObjectArray;
    defaultUi: XFAObjectArray;
    desc: XFAObjectArray;
    digestMethod: XFAObjectArray;
    digestMethods: XFAObjectArray;
    draw: XFAObjectArray;
    edge: XFAObjectArray;
    encoding: XFAObjectArray;
    encodings: XFAObjectArray;
    encrypt: XFAObjectArray;
    encryptData: XFAObjectArray;
    encryption: XFAObjectArray;
    encryptionMethod: XFAObjectArray;
    encryptionMethods: XFAObjectArray;
    event: XFAObjectArray;
    exData: XFAObjectArray;
    exObject: XFAObjectArray;
    exclGroup: XFAObjectArray;
    execute: XFAObjectArray;
    extras: XFAObjectArray;
    field: XFAObjectArray;
    fill: XFAObjectArray;
    filter: XFAObjectArray;
    float: XFAObjectArray;
    font: XFAObjectArray;
    format: XFAObjectArray;
    handler: XFAObjectArray;
    hyphenation: XFAObjectArray;
    image: XFAObjectArray;
    imageEdit: XFAObjectArray;
    integer: XFAObjectArray;
    issuers: XFAObjectArray;
    items: XFAObjectArray;
    keep: XFAObjectArray;
    keyUsage: XFAObjectArray;
    line: XFAObjectArray;
    linear: XFAObjectArray;
    lockDocument: XFAObjectArray;
    manifest: XFAObjectArray;
    margin: XFAObjectArray;
    mdp: XFAObjectArray;
    medium: XFAObjectArray;
    message: XFAObjectArray;
    numericEdit: XFAObjectArray;
    occur: XFAObjectArray;
    oid: XFAObjectArray;
    oids: XFAObjectArray;
    overflow: XFAObjectArray;
    pageArea: XFAObjectArray;
    pageSet: XFAObjectArray;
    para: XFAObjectArray;
    passwordEdit: XFAObjectArray;
    pattern: XFAObjectArray;
    picture: XFAObjectArray;
    radial: XFAObjectArray;
    reason: XFAObjectArray;
    reasons: XFAObjectArray;
    rectangle: XFAObjectArray;
    ref: XFAObjectArray;
    script: XFAObjectArray;
    setProperty: XFAObjectArray;
    signData: XFAObjectArray;
    signature: XFAObjectArray;
    signing: XFAObjectArray;
    solid: XFAObjectArray;
    speak: XFAObjectArray;
    stipple: XFAObjectArray;
    subform: XFAObjectArray;
    subformSet: XFAObjectArray;
    subjectDN: XFAObjectArray;
    subjectDNs: XFAObjectArray;
    submit: XFAObjectArray;
    text: XFAObjectArray;
    textEdit: XFAObjectArray;
    time: XFAObjectArray;
    timeStamp: XFAObjectArray;
    toolTip: XFAObjectArray;
    traversal: XFAObjectArray;
    traverse: XFAObjectArray;
    ui: XFAObjectArray;
    validate: XFAObjectArray;
    value: XFAObjectArray;
    variables: XFAObjectArray;
}
declare class Radial extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class Reason extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Reasons extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    reason: XFAObjectArray;
}
declare class Rectangle extends XFAObject {
    constructor(attributes: any);
    hand: any;
    id: any;
    usehref: any;
    corner: XFAObjectArray;
    edge: XFAObjectArray;
    fill: any;
}
declare class RefElement extends StringObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
}
declare class Script extends StringObject {
    constructor(attributes: any);
    binding: any;
    contentType: any;
    id: any;
    name: any;
    runAt: any;
    usehref: any;
}
declare class SignData extends XFAObject {
    constructor(attributes: any);
    id: any;
    operation: any;
    ref: any;
    target: any;
    usehref: any;
    filter: any;
    manifest: any;
}
declare class Signature extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    border: any;
    extras: any;
    filter: any;
    manifest: any;
    margin: any;
}
declare class Signing extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    certificate: XFAObjectArray;
}
declare class Solid extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    extras: any;
}
declare class Speak extends StringObject {
    constructor(attributes: any);
    disable: any;
    id: any;
    priority: any;
    rid: any;
    usehref: any;
}
declare class Stipple extends XFAObject {
    constructor(attributes: any);
    id: any;
    rate: any;
    usehref: any;
    color: any;
    extras: any;
}
declare class Subform extends XFAObject {
    constructor(attributes: any);
    access: any;
    allowMacro: any;
    anchorType: any;
    colSpan: any;
    columnWidths: any;
    h: any;
    hAlign: any;
    id: any;
    layout: any;
    locale: any;
    maxH: any;
    maxW: any;
    mergeMode: any;
    minH: any;
    minW: any;
    name: any;
    presence: any;
    relevant: any;
    restoreState: any;
    scope: any;
    usehref: any;
    w: any;
    x: any;
    y: any;
    assist: any;
    bind: any;
    bookend: any;
    border: any;
    break: any;
    calculate: any;
    desc: any;
    extras: any;
    keep: any;
    margin: any;
    occur: any;
    overflow: any;
    pageSet: any;
    para: any;
    traversal: any;
    validate: any;
    variables: any;
    area: XFAObjectArray;
    breakAfter: XFAObjectArray;
    breakBefore: XFAObjectArray;
    connect: XFAObjectArray;
    draw: XFAObjectArray;
    event: XFAObjectArray;
    exObject: XFAObjectArray;
    exclGroup: XFAObjectArray;
    field: XFAObjectArray;
    proto: XFAObjectArray;
    setProperty: XFAObjectArray;
    subform: XFAObjectArray;
    subformSet: XFAObjectArray;
    [$extra]: any;
}
declare class SubformSet extends XFAObject {
    constructor(attributes: any);
    id: any;
    name: any;
    relation: any;
    relevant: any;
    usehref: any;
    bookend: any;
    break: any;
    desc: any;
    extras: any;
    occur: any;
    overflow: any;
    breakAfter: XFAObjectArray;
    breakBefore: XFAObjectArray;
    subform: XFAObjectArray;
    subformSet: XFAObjectArray;
}
declare class SubjectDN extends ContentObject {
    constructor(attributes: any);
    delimiter: any;
    id: any;
    name: any;
    usehref: any;
}
declare class SubjectDNs extends XFAObject {
    constructor(attributes: any);
    id: any;
    type: any;
    usehref: any;
    subjectDN: XFAObjectArray;
}
declare class Submit extends XFAObject {
    constructor(attributes: any);
    embedPDF: any;
    format: any;
    id: any;
    target: any;
    textEncoding: any;
    usehref: any;
    xdpContent: any;
    encrypt: any;
    encryptData: XFAObjectArray;
    signData: XFAObjectArray;
}
declare class TextEdit extends XFAObject {
    constructor(attributes: any);
    allowRichText: any;
    hScrollPolicy: any;
    id: any;
    multiLine: any;
    usehref: any;
    vScrollPolicy: any;
    border: any;
    comb: any;
    extras: any;
    margin: any;
}
declare class Time extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class TimeStamp extends XFAObject {
    constructor(attributes: any);
    id: any;
    server: any;
    type: any;
    usehref: any;
}
declare class ToolTip extends StringObject {
    constructor(attributes: any);
    id: any;
    rid: any;
    usehref: any;
}
declare class Traversal extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    extras: any;
    traverse: XFAObjectArray;
}
declare class Traverse extends XFAObject {
    constructor(attributes: any);
    id: any;
    operation: any;
    ref: any;
    usehref: any;
    extras: any;
    script: any;
    get name(): any;
}
declare class Ui extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    extras: any;
    picture: any;
    barcode: any;
    button: any;
    checkButton: any;
    choiceList: any;
    dateTimeEdit: any;
    defaultUi: any;
    imageEdit: any;
    numericEdit: any;
    passwordEdit: any;
    signature: any;
    textEdit: any;
}
declare class Validate extends XFAObject {
    constructor(attributes: any);
    formatTest: any;
    id: any;
    nullTest: any;
    scriptTest: any;
    usehref: any;
    extras: any;
    message: any;
    picture: any;
    script: any;
}
declare class Variables extends XFAObject {
    constructor(attributes: any);
    id: any;
    usehref: any;
    boolean: XFAObjectArray;
    date: XFAObjectArray;
    dateTime: XFAObjectArray;
    decimal: XFAObjectArray;
    exData: XFAObjectArray;
    float: XFAObjectArray;
    image: XFAObjectArray;
    integer: XFAObjectArray;
    manifest: XFAObjectArray;
    script: XFAObjectArray;
    text: XFAObjectArray;
    time: XFAObjectArray;
}
import { $buildXFAObject } from "./namespaces.js";
import { ContentObject } from "./xfa_object.js";
import { StringObject } from "./xfa_object.js";
import { Option01 } from "./xfa_object.js";
import { OptionObject } from "./xfa_object.js";
import { $extra } from "./xfa_object.js";
export {};
