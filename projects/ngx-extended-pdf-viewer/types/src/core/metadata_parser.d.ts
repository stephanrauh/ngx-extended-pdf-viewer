export class MetadataParser {
    constructor(data: any);
    _metadataMap: Map<any, any>;
    _data: any;
    _repair(data: any): any;
    _getSequence(entry: any): any;
    _parseArray(entry: any): void;
    _parse(xmlDocument: any): void;
    get serializable(): {
        parsedData: Map<any, any>;
        rawData: any;
    };
}
