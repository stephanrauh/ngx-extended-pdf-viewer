export class OptionalContentConfig {
    static fromSerializable({ data, renderingIntent, groupState }: {
        data: any;
        renderingIntent: any;
        groupState: any;
    }): OptionalContentConfig;
    constructor(data: any, renderingIntent?: number, groupState?: null);
    creator: null;
    name: null;
    renderingIntent: number;
    isVisible(group: any): any;
    setVisibility(id: any, visible?: boolean, preserveRB?: boolean): void;
    setOCGState({ state, preserveRB }: {
        state: any;
        preserveRB: any;
    }): void;
    get hasInitialVisibility(): boolean;
    getOrder(): any;
    getGroup(id: any): any;
    getHash(): string;
    get serializable(): {
        data: any;
        renderingIntent: number;
        groupState: Map<any, any>;
    };
    [Symbol.iterator](): MapIterator<[any, any]>;
    #private;
}
