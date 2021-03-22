export class LocaleSetNamespace {
    static calendarSymbols(attrs: any): CalendarSymbols;
    static currencySymbol(attrs: any): CurrencySymbol;
    static currencySymbols(attrs: any): CurrencySymbols;
    static datePattern(attrs: any): DatePattern;
    static datePatterns(attrs: any): DatePatterns;
    static dateTimeSymbols(attrs: any): DateTimeSymbols;
    static day(attrs: any): Day;
    static dayNames(attrs: any): DayNames;
    static era(attrs: any): Era;
    static eraNames(attrs: any): EraNames;
    static locale(attrs: any): Locale;
    static localeSet(attrs: any): LocaleSet;
    static meridiem(attrs: any): Meridiem;
    static meridiemNames(attrs: any): MeridiemNames;
    static month(attrs: any): Month;
    static monthNames(attrs: any): MonthNames;
    static numberPattern(attrs: any): NumberPattern;
    static numberPatterns(attrs: any): NumberPatterns;
    static numberSymbol(attrs: any): NumberSymbol;
    static numberSymbols(attrs: any): NumberSymbols;
    static timePattern(attrs: any): TimePattern;
    static timePatterns(attrs: any): TimePatterns;
    static typeFace(attrs: any): TypeFace;
    static typeFaces(attrs: any): TypeFaces;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class CalendarSymbols extends XFAObject {
    constructor(attributes: any);
    name: string;
    dayNames: XFAObjectArray;
    eraNames: any;
    meridiemNames: any;
    monthNames: XFAObjectArray;
}
declare class CurrencySymbol extends StringObject {
    constructor(attributes: any);
    name: any;
}
declare class CurrencySymbols extends XFAObject {
    constructor(attributes: any);
    currencySymbol: XFAObjectArray;
}
declare class DatePattern extends StringObject {
    constructor(attributes: any);
    name: any;
}
declare class DatePatterns extends XFAObject {
    constructor(attributes: any);
    datePattern: XFAObjectArray;
}
declare class DateTimeSymbols extends ContentObject {
    constructor(attributes: any);
}
declare class Day extends StringObject {
    constructor(attributes: any);
}
declare class DayNames extends XFAObject {
    constructor(attributes: any);
    abbr: any;
    day: XFAObjectArray;
}
declare class Era extends StringObject {
    constructor(attributes: any);
}
declare class EraNames extends XFAObject {
    constructor(attributes: any);
    era: XFAObjectArray;
}
declare class Locale extends XFAObject {
    constructor(attributes: any);
    desc: any;
    name: string;
    calendarSymbols: any;
    currencySymbols: any;
    datePatterns: any;
    dateTimeSymbols: any;
    numberPatterns: any;
    numberSymbols: any;
    timePatterns: any;
    typeFaces: any;
}
declare class LocaleSet extends XFAObject {
    constructor(attributes: any);
    locale: XFAObjectArray;
}
declare class Meridiem extends StringObject {
    constructor(attributes: any);
}
declare class MeridiemNames extends XFAObject {
    constructor(attributes: any);
    meridiem: XFAObjectArray;
}
declare class Month extends StringObject {
    constructor(attributes: any);
}
declare class MonthNames extends XFAObject {
    constructor(attributes: any);
    abbr: any;
    month: XFAObjectArray;
}
declare class NumberPattern extends StringObject {
    constructor(attributes: any);
    name: any;
}
declare class NumberPatterns extends XFAObject {
    constructor(attributes: any);
    numberPattern: XFAObjectArray;
}
declare class NumberSymbol extends StringObject {
    constructor(attributes: any);
    name: any;
}
declare class NumberSymbols extends XFAObject {
    constructor(attributes: any);
    numberSymbol: XFAObjectArray;
}
declare class TimePattern extends StringObject {
    constructor(attributes: any);
    name: any;
}
declare class TimePatterns extends XFAObject {
    constructor(attributes: any);
    timePattern: XFAObjectArray;
}
declare class TypeFace extends XFAObject {
    constructor(attributes: any);
    name: number;
}
declare class TypeFaces extends XFAObject {
    constructor(attributes: any);
    typeFace: XFAObjectArray;
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
import { XFAObjectArray } from "./xfa_object.js";
import { StringObject } from "./xfa_object.js";
import { ContentObject } from "./xfa_object.js";
export {};
