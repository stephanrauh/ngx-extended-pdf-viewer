export class XRef {
    constructor(stream: any, pdfManager: any);
    stream: any;
    pdfManager: any;
    getNewPersistentRef(obj: any): any;
    getNewTemporaryRef(): any;
    resetNewTemporaryRef(): void;
    setStartXRef(startXRef: any): void;
    startXRefQueue: any[] | undefined;
    parse(recoveryMode?: boolean): void;
    trailer: any;
    encrypt: CipherTransformFactory | undefined;
    root: Dict | undefined;
    processXRefTable(parser: any): Dict;
    readXRefTable(parser: any): any;
    processXRefStream(stream: any): any;
    streamState: {
        entryRanges: any;
        byteWidths: any;
        entryNum: number;
        streamPos: any;
    } | undefined;
    readXRefStream(stream: any): void;
    indexObjects(): any;
    _generationFallback: boolean | undefined;
    readXRef(recoveryMode?: boolean): any;
    countUpdatesAfter(offset: any): number | null;
    getEntry(i: any): any;
    fetchIfRef(obj: any, suppressEncryption?: boolean): any;
    fetch(ref: any, suppressEncryption?: boolean): any;
    fetchUncompressed(ref: any, xrefEntry: any, suppressEncryption?: boolean): any;
    fetchCompressed(ref: any, xrefEntry: any, suppressEncryption?: boolean): any;
    fetchIfRefAsync(obj: any, suppressEncryption: any): Promise<any>;
    fetchAsync(ref: any, suppressEncryption: any): any;
    getCatalogObj(): Dict | undefined;
    #private;
}
import { CipherTransformFactory } from "./crypto.js";
import { Dict } from "./primitives.js";
