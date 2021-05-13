export class PostScriptLexer {
    constructor(stream: any);
    stream: any;
    strBuf: any[];
    nextChar(): any;
    currentChar: any;
    getToken(): any;
    getNumber(): number;
}
export class PostScriptParser {
    constructor(lexer: any);
    lexer: any;
    operators: any[];
    token: any;
    prev: any;
    nextToken(): void;
    accept(type: any): boolean;
    expect(type: any): boolean;
    parse(): any[];
    parseBlock(): void;
    parseCondition(): void;
}
