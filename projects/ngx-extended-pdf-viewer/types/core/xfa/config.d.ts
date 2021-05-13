export class ConfigNamespace {
    static acrobat(attrs: any): Acrobat;
    static acrobat7(attrs: any): Acrobat7;
    static ADBE_JSConsole(attrs: any): ADBE_JSConsole;
    static ADBE_JSDebugger(attrs: any): ADBE_JSDebugger;
    static addSilentPrint(attrs: any): AddSilentPrint;
    static addViewerPreferences(attrs: any): AddViewerPreferences;
    static adjustData(attrs: any): AdjustData;
    static adobeExtensionLevel(attrs: any): AdobeExtensionLevel;
    static agent(attrs: any): Agent;
    static alwaysEmbed(attrs: any): AlwaysEmbed;
    static amd(attrs: any): Amd;
    static area(attrs: any): Area;
    static attributes(attrs: any): Attributes;
    static autoSave(attrs: any): AutoSave;
    static base(attrs: any): Base;
    static batchOutput(attrs: any): BatchOutput;
    static behaviorOverride(attrs: any): BehaviorOverride;
    static cache(attrs: any): Cache;
    static change(attrs: any): Change;
    static common(attrs: any): Common;
    static compress(attrs: any): Compress;
    static compressLogicalStructure(attrs: any): CompressLogicalStructure;
    static compressObjectStream(attrs: any): CompressObjectStream;
    static compression(attrs: any): Compression;
    static config(attrs: any): Config;
    static conformance(attrs: any): Conformance;
    static contentCopy(attrs: any): ContentCopy;
    static copies(attrs: any): Copies;
    static creator(attrs: any): Creator;
    static currentPage(attrs: any): CurrentPage;
    static data(attrs: any): Data;
    static debug(attrs: any): Debug;
    static defaultTypeface(attrs: any): DefaultTypeface;
    static destination(attrs: any): Destination;
    static documentAssembly(attrs: any): DocumentAssembly;
    static driver(attrs: any): Driver;
    static duplexOption(attrs: any): DuplexOption;
    static dynamicRender(attrs: any): DynamicRender;
    static embed(attrs: any): Embed;
    static encrypt(attrs: any): Encrypt;
    static encryption(attrs: any): Encryption;
    static encryptionLevel(attrs: any): EncryptionLevel;
    static enforce(attrs: any): Enforce;
    static equate(attrs: any): Equate;
    static equateRange(attrs: any): EquateRange;
    static exclude(attrs: any): Exclude;
    static excludeNS(attrs: any): ExcludeNS;
    static flipLabel(attrs: any): FlipLabel;
    static fontInfo(attrs: any): FontInfo;
    static formFieldFilling(attrs: any): FormFieldFilling;
    static groupParent(attrs: any): GroupParent;
    static ifEmpty(attrs: any): IfEmpty;
    static includeXDPContent(attrs: any): IncludeXDPContent;
    static incrementalLoad(attrs: any): IncrementalLoad;
    static incrementalMerge(attrs: any): IncrementalMerge;
    static interactive(attrs: any): Interactive;
    static jog(attrs: any): Jog;
    static labelPrinter(attrs: any): LabelPrinter;
    static layout(attrs: any): Layout;
    static level(attrs: any): Level;
    static linearized(attrs: any): Linearized;
    static locale(attrs: any): Locale;
    static localeSet(attrs: any): LocaleSet;
    static log(attrs: any): Log;
    static map(attrs: any): MapElement;
    static mediumInfo(attrs: any): MediumInfo;
    static message(attrs: any): Message;
    static messaging(attrs: any): Messaging;
    static mode(attrs: any): Mode;
    static modifyAnnots(attrs: any): ModifyAnnots;
    static msgId(attrs: any): MsgId;
    static nameAttr(attrs: any): NameAttr;
    static neverEmbed(attrs: any): NeverEmbed;
    static numberOfCopies(attrs: any): NumberOfCopies;
    static openAction(attrs: any): OpenAction;
    static output(attrs: any): Output;
    static outputBin(attrs: any): OutputBin;
    static outputXSL(attrs: any): OutputXSL;
    static overprint(attrs: any): Overprint;
    static packets(attrs: any): Packets;
    static pageOffset(attrs: any): PageOffset;
    static pageRange(attrs: any): PageRange;
    static pagination(attrs: any): Pagination;
    static paginationOverride(attrs: any): PaginationOverride;
    static part(attrs: any): Part;
    static pcl(attrs: any): Pcl;
    static pdf(attrs: any): Pdf;
    static pdfa(attrs: any): Pdfa;
    static permissions(attrs: any): Permissions;
    static pickTrayByPDFSize(attrs: any): PickTrayByPDFSize;
    static picture(attrs: any): Picture;
    static plaintextMetadata(attrs: any): PlaintextMetadata;
    static presence(attrs: any): Presence;
    static present(attrs: any): Present;
    static print(attrs: any): Print;
    static printHighQuality(attrs: any): PrintHighQuality;
    static printScaling(attrs: any): PrintScaling;
    static printerName(attrs: any): PrinterName;
    static producer(attrs: any): Producer;
    static ps(attrs: any): Ps;
    static range(attrs: any): Range;
    static record(attrs: any): Record;
    static relevant(attrs: any): Relevant;
    static rename(attrs: any): Rename;
    static renderPolicy(attrs: any): RenderPolicy;
    static runScripts(attrs: any): RunScripts;
    static script(attrs: any): Script;
    static scriptModel(attrs: any): ScriptModel;
    static severity(attrs: any): Severity;
    static silentPrint(attrs: any): SilentPrint;
    static staple(attrs: any): Staple;
    static startNode(attrs: any): StartNode;
    static startPage(attrs: any): StartPage;
    static submitFormat(attrs: any): SubmitFormat;
    static submitUrl(attrs: any): SubmitUrl;
    static subsetBelow(attrs: any): SubsetBelow;
    static suppressBanner(attrs: any): SuppressBanner;
    static tagged(attrs: any): Tagged;
    static template(attrs: any): Template;
    static templateCache(attrs: any): TemplateCache;
    static threshold(attrs: any): Threshold;
    static to(attrs: any): To;
    static trace(attrs: any): Trace;
    static transform(attrs: any): Transform;
    static type(attrs: any): Type;
    static uri(attrs: any): Uri;
    static validate(attrs: any): Validate;
    static validateApprovalSignatures(attrs: any): ValidateApprovalSignatures;
    static validationMessaging(attrs: any): ValidationMessaging;
    static version(attrs: any): Version;
    static versionControl(attrs: any): VersionControl;
    static viewerPreferences(attrs: any): ViewerPreferences;
    static webClient(attrs: any): WebClient;
    static whitespace(attrs: any): Whitespace;
    static window(attrs: any): Window;
    static xdc(attrs: any): Xdc;
    static xdp(attrs: any): Xdp;
    static xsl(attrs: any): Xsl;
    static zpl(attrs: any): Zpl;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class Acrobat extends XFAObject {
    constructor(attributes: any);
    acrobat7: any;
    autoSave: any;
    common: any;
    validate: any;
    validateApprovalSignatures: any;
    submitUrl: XFAObjectArray;
}
declare class Acrobat7 extends XFAObject {
    constructor(attributes: any);
    dynamicRender: any;
}
declare class ADBE_JSConsole extends OptionObject {
    constructor(attributes: any);
}
declare class ADBE_JSDebugger extends OptionObject {
    constructor(attributes: any);
}
declare class AddSilentPrint extends Option01 {
    constructor(attributes: any);
}
declare class AddViewerPreferences extends Option01 {
    constructor(attributes: any);
}
declare class AdjustData extends Option10 {
    constructor(attributes: any);
}
declare class AdobeExtensionLevel extends IntegerObject {
    constructor(attributes: any);
}
declare class Agent extends XFAObject {
    constructor(attributes: any);
    name: any;
    common: XFAObjectArray;
}
declare class AlwaysEmbed extends ContentObject {
    constructor(attributes: any);
}
declare class Amd extends StringObject {
    constructor(attributes: any);
}
declare class Area extends XFAObject {
    constructor(attributes: any);
    level: any;
    name: any;
}
declare class Attributes extends OptionObject {
    constructor(attributes: any);
}
declare class AutoSave extends OptionObject {
    constructor(attributes: any);
}
declare class Base extends StringObject {
    constructor(attributes: any);
}
declare class BatchOutput extends XFAObject {
    constructor(attributes: any);
    format: any;
}
declare class BehaviorOverride extends ContentObject {
    constructor(attributes: any);
}
declare class Cache extends XFAObject {
    constructor(attributes: any);
    templateCache: any;
}
declare class Change extends Option01 {
    constructor(attributes: any);
}
declare class Common extends XFAObject {
    constructor(attributes: any);
    data: any;
    locale: any;
    localeSet: any;
    messaging: any;
    suppressBanner: any;
    template: any;
    validationMessaging: any;
    versionControl: any;
    log: XFAObjectArray;
}
declare class Compress extends XFAObject {
    constructor(attributes: any);
    scope: any;
}
declare class CompressLogicalStructure extends Option01 {
    constructor(attributes: any);
}
declare class CompressObjectStream extends Option10 {
    constructor(attributes: any);
}
declare class Compression extends XFAObject {
    constructor(attributes: any);
    compressLogicalStructure: any;
    compressObjectStream: any;
    level: any;
    type: any;
}
declare class Config extends XFAObject {
    constructor(attributes: any);
    acrobat: any;
    present: any;
    trace: any;
    agent: XFAObjectArray;
}
declare class Conformance extends OptionObject {
    constructor(attributes: any);
}
declare class ContentCopy extends Option01 {
    constructor(attributes: any);
}
declare class Copies extends IntegerObject {
    constructor(attributes: any);
}
declare class Creator extends StringObject {
    constructor(attributes: any);
}
declare class CurrentPage extends IntegerObject {
    constructor(attributes: any);
}
declare class Data extends XFAObject {
    constructor(attributes: any);
    adjustData: any;
    attributes: any;
    incrementalLoad: any;
    outputXSL: any;
    range: any;
    record: any;
    startNode: any;
    uri: any;
    window: any;
    xsl: any;
    excludeNS: XFAObjectArray;
    transform: XFAObjectArray;
}
declare class Debug extends XFAObject {
    constructor(attributes: any);
    uri: any;
}
declare class DefaultTypeface extends ContentObject {
    constructor(attributes: any);
    writingScript: any;
}
declare class Destination extends OptionObject {
    constructor(attributes: any);
}
declare class DocumentAssembly extends Option01 {
    constructor(attributes: any);
}
declare class Driver extends XFAObject {
    constructor(attributes: any);
    name: any;
    fontInfo: any;
    xdc: any;
}
declare class DuplexOption extends OptionObject {
    constructor(attributes: any);
}
declare class DynamicRender extends OptionObject {
    constructor(attributes: any);
}
declare class Embed extends Option01 {
    constructor(attributes: any);
}
declare class Encrypt extends Option01 {
    constructor(attributes: any);
}
declare class Encryption extends XFAObject {
    constructor(attributes: any);
    encrypt: any;
    encryptionLevel: any;
    permissions: any;
}
declare class EncryptionLevel extends OptionObject {
    constructor(attributes: any);
}
declare class Enforce extends StringObject {
    constructor(attributes: any);
}
declare class Equate extends XFAObject {
    constructor(attributes: any);
    force: any;
    from: any;
    to: any;
}
declare class EquateRange extends XFAObject {
    constructor(attributes: any);
    from: any;
    to: any;
    _unicodeRange: any;
    get unicodeRange(): any;
}
declare class Exclude extends ContentObject {
    constructor(attributes: any);
}
declare class ExcludeNS extends StringObject {
    constructor(attributes: any);
}
declare class FlipLabel extends OptionObject {
    constructor(attributes: any);
}
declare class FontInfo extends XFAObject {
    constructor(attributes: any);
    embed: any;
    map: any;
    subsetBelow: any;
    alwaysEmbed: XFAObjectArray;
    defaultTypeface: XFAObjectArray;
    neverEmbed: XFAObjectArray;
}
declare class FormFieldFilling extends Option01 {
    constructor(attributes: any);
}
declare class GroupParent extends StringObject {
    constructor(attributes: any);
}
declare class IfEmpty extends OptionObject {
    constructor(attributes: any);
}
declare class IncludeXDPContent extends StringObject {
    constructor(attributes: any);
}
declare class IncrementalLoad extends OptionObject {
    constructor(attributes: any);
}
declare class IncrementalMerge extends Option01 {
    constructor(attributes: any);
}
declare class Interactive extends Option01 {
    constructor(attributes: any);
}
declare class Jog extends OptionObject {
    constructor(attributes: any);
}
declare class LabelPrinter extends XFAObject {
    constructor(attributes: any);
    name: any;
    batchOutput: any;
    flipLabel: any;
    fontInfo: any;
    xdc: any;
}
declare class Layout extends OptionObject {
    constructor(attributes: any);
}
declare class Level extends IntegerObject {
    constructor(attributes: any);
}
declare class Linearized extends Option01 {
    constructor(attributes: any);
}
declare class Locale extends StringObject {
    constructor(attributes: any);
}
declare class LocaleSet extends StringObject {
    constructor(attributes: any);
}
declare class Log extends XFAObject {
    constructor(attributes: any);
    mode: any;
    threshold: any;
    to: any;
    uri: any;
}
declare class MapElement extends XFAObject {
    constructor(attributes: any);
    equate: XFAObjectArray;
    equateRange: XFAObjectArray;
}
declare class MediumInfo extends XFAObject {
    constructor(attributes: any);
    map: any;
}
declare class Message extends XFAObject {
    constructor(attributes: any);
    msgId: any;
    severity: any;
}
declare class Messaging extends XFAObject {
    constructor(attributes: any);
    message: XFAObjectArray;
}
declare class Mode extends OptionObject {
    constructor(attributes: any);
}
declare class ModifyAnnots extends Option01 {
    constructor(attributes: any);
}
declare class MsgId extends IntegerObject {
    constructor(attributes: any);
}
declare class NameAttr extends StringObject {
    constructor(attributes: any);
}
declare class NeverEmbed extends ContentObject {
    constructor(attributes: any);
}
declare class NumberOfCopies extends IntegerObject {
    constructor(attributes: any);
}
declare class OpenAction extends XFAObject {
    constructor(attributes: any);
    destination: any;
}
declare class Output extends XFAObject {
    constructor(attributes: any);
    to: any;
    type: any;
    uri: any;
}
declare class OutputBin extends StringObject {
    constructor(attributes: any);
}
declare class OutputXSL extends XFAObject {
    constructor(attributes: any);
    uri: any;
}
declare class Overprint extends OptionObject {
    constructor(attributes: any);
}
declare class Packets extends StringObject {
    constructor(attributes: any);
}
declare class PageOffset extends XFAObject {
    constructor(attributes: any);
    x: any;
    y: any;
}
declare class PageRange extends StringObject {
    constructor(attributes: any);
}
declare class Pagination extends OptionObject {
    constructor(attributes: any);
}
declare class PaginationOverride extends OptionObject {
    constructor(attributes: any);
}
declare class Part extends IntegerObject {
    constructor(attributes: any);
}
declare class Pcl extends XFAObject {
    constructor(attributes: any);
    name: any;
    batchOutput: any;
    fontInfo: any;
    jog: any;
    mediumInfo: any;
    outputBin: any;
    pageOffset: any;
    staple: any;
    xdc: any;
}
declare class Pdf extends XFAObject {
    constructor(attributes: any);
    name: any;
    adobeExtensionLevel: any;
    batchOutput: any;
    compression: any;
    creator: any;
    encryption: any;
    fontInfo: any;
    interactive: any;
    linearized: any;
    openAction: any;
    pdfa: any;
    producer: any;
    renderPolicy: any;
    scriptModel: any;
    silentPrint: any;
    submitFormat: any;
    tagged: any;
    version: any;
    viewerPreferences: any;
    xdc: any;
}
declare class Pdfa extends XFAObject {
    constructor(attributes: any);
    amd: any;
    conformance: any;
    includeXDPContent: any;
    part: any;
}
declare class Permissions extends XFAObject {
    constructor(attributes: any);
    accessibleContent: any;
    change: any;
    contentCopy: any;
    documentAssembly: any;
    formFieldFilling: any;
    modifyAnnots: any;
    plaintextMetadata: any;
    print: any;
    printHighQuality: any;
}
declare class PickTrayByPDFSize extends Option01 {
    constructor(attributes: any);
}
declare class Picture extends StringObject {
    constructor(attributes: any);
}
declare class PlaintextMetadata extends Option01 {
    constructor(attributes: any);
}
declare class Presence extends OptionObject {
    constructor(attributes: any);
}
declare class Present extends XFAObject {
    constructor(attributes: any);
    behaviorOverride: any;
    cache: any;
    common: any;
    copies: any;
    destination: any;
    incrementalMerge: any;
    layout: any;
    output: any;
    overprint: any;
    pagination: any;
    paginationOverride: any;
    script: any;
    validate: any;
    xdp: any;
    driver: XFAObjectArray;
    labelPrinter: XFAObjectArray;
    pcl: XFAObjectArray;
    pdf: XFAObjectArray;
    ps: XFAObjectArray;
    submitUrl: XFAObjectArray;
    webClient: XFAObjectArray;
    zpl: XFAObjectArray;
}
declare class Print extends Option01 {
    constructor(attributes: any);
}
declare class PrintHighQuality extends Option01 {
    constructor(attributes: any);
}
declare class PrintScaling extends OptionObject {
    constructor(attributes: any);
}
declare class PrinterName extends StringObject {
    constructor(attributes: any);
}
declare class Producer extends StringObject {
    constructor(attributes: any);
}
declare class Ps extends XFAObject {
    constructor(attributes: any);
    name: any;
    batchOutput: any;
    fontInfo: any;
    jog: any;
    mediumInfo: any;
    outputBin: any;
    staple: any;
    xdc: any;
}
declare class Range extends ContentObject {
    constructor(attributes: any);
}
declare class Record extends ContentObject {
    constructor(attributes: any);
}
declare class Relevant extends ContentObject {
    constructor(attributes: any);
}
declare class Rename extends ContentObject {
    constructor(attributes: any);
}
declare class RenderPolicy extends OptionObject {
    constructor(attributes: any);
}
declare class RunScripts extends OptionObject {
    constructor(attributes: any);
}
declare class Script extends XFAObject {
    constructor(attributes: any);
    currentPage: any;
    exclude: any;
    runScripts: any;
}
declare class ScriptModel extends OptionObject {
    constructor(attributes: any);
}
declare class Severity extends OptionObject {
    constructor(attributes: any);
}
declare class SilentPrint extends XFAObject {
    constructor(attributes: any);
    addSilentPrint: any;
    printerName: any;
}
declare class Staple extends XFAObject {
    constructor(attributes: any);
    mode: any;
}
declare class StartNode extends StringObject {
    constructor(attributes: any);
}
declare class StartPage extends IntegerObject {
    constructor(attributes: any);
}
declare class SubmitFormat extends OptionObject {
    constructor(attributes: any);
}
declare class SubmitUrl extends StringObject {
    constructor(attributes: any);
}
declare class SubsetBelow extends IntegerObject {
    constructor(attributes: any);
}
declare class SuppressBanner extends Option01 {
    constructor(attributes: any);
}
declare class Tagged extends Option01 {
    constructor(attributes: any);
}
declare class Template extends XFAObject {
    constructor(attributes: any);
    base: any;
    relevant: any;
    startPage: any;
    uri: any;
    xsl: any;
}
declare class TemplateCache extends XFAObject {
    constructor(attributes: any);
    maxEntries: any;
}
declare class Threshold extends OptionObject {
    constructor(attributes: any);
}
declare class To extends OptionObject {
    constructor(attributes: any);
}
declare class Trace extends XFAObject {
    constructor(attributes: any);
    area: XFAObjectArray;
}
declare class Transform extends XFAObject {
    constructor(attributes: any);
    groupParent: any;
    ifEmpty: any;
    nameAttr: any;
    picture: any;
    presence: any;
    rename: any;
    whitespace: any;
}
declare class Type extends OptionObject {
    constructor(attributes: any);
}
declare class Uri extends StringObject {
    constructor(attributes: any);
}
declare class Validate extends OptionObject {
    constructor(attributes: any);
}
declare class ValidateApprovalSignatures extends ContentObject {
    constructor(attributes: any);
}
declare class ValidationMessaging extends OptionObject {
    constructor(attributes: any);
}
declare class Version extends OptionObject {
    constructor(attributes: any);
}
declare class VersionControl extends XFAObject {
    constructor(attributes: any);
    outputBelow: any;
    sourceAbove: any;
    sourceBelow: any;
}
declare class ViewerPreferences extends XFAObject {
    constructor(attributes: any);
    ADBE_JSConsole: any;
    ADBE_JSDebugger: any;
    addViewerPreferences: any;
    duplexOption: any;
    enforce: any;
    numberOfCopies: any;
    pageRange: any;
    pickTrayByPDFSize: any;
    printScaling: any;
}
declare class WebClient extends XFAObject {
    constructor(attributes: any);
    name: any;
    fontInfo: any;
    xdc: any;
}
declare class Whitespace extends OptionObject {
    constructor(attributes: any);
}
declare class Window extends ContentObject {
    constructor(attributes: any);
}
declare class Xdc extends XFAObject {
    constructor(attributes: any);
    uri: XFAObjectArray;
    xsl: XFAObjectArray;
}
declare class Xdp extends XFAObject {
    constructor(attributes: any);
    packets: any;
}
declare class Xsl extends XFAObject {
    constructor(attributes: any);
    debug: any;
    uri: any;
}
declare class Zpl extends XFAObject {
    constructor(attributes: any);
    name: any;
    batchOutput: any;
    flipLabel: any;
    fontInfo: any;
    xdc: any;
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
import { XFAObjectArray } from "./xfa_object.js";
import { OptionObject } from "./xfa_object.js";
import { Option01 } from "./xfa_object.js";
import { Option10 } from "./xfa_object.js";
import { IntegerObject } from "./xfa_object.js";
import { ContentObject } from "./xfa_object.js";
import { StringObject } from "./xfa_object.js";
export {};
