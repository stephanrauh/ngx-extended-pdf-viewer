export class Binder {
    constructor(root: any);
    root: any;
    datasets: any;
    emptyMerge: boolean;
    data: any;
    form: any;
    _isConsumeData(): boolean | undefined;
    _isMatchTemplate(): boolean;
    bind(): any;
    getData(): any;
    _bindValue(formNode: any, data: any, picture: any): void;
    _findDataByNameToConsume(name: any, dataNode: any, global: any): any;
    _setProperties(formNode: any, dataNode: any): void;
    _bindItems(formNode: any, dataNode: any): void;
    _bindOccurrences(formNode: any, matches: any, picture: any): void;
    _createOccurrences(formNode: any): void;
    _getOccurInfo(formNode: any): any[];
    _bindElement(formNode: any, dataNode: any): void;
    _mergeMode: boolean | undefined;
}
