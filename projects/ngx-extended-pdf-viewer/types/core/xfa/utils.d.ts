export function getBBox(data: any): {
    x: any;
    y: any;
    width: any;
    height: any;
};
export function getColor(data: any, def?: number[]): {
    r: number;
    g: number;
    b: number;
};
export function getFloat({ data, defaultValue, validate }: {
    data: any;
    defaultValue: any;
    validate: any;
}): any;
export function getInteger({ data, defaultValue, validate }: {
    data: any;
    defaultValue: any;
    validate: any;
}): any;
export function getKeyword({ data, defaultValue, validate }: {
    data: any;
    defaultValue: any;
    validate: any;
}): any;
export function getMeasurement(str: any, def?: string): any;
export function getRatio(data: any): {
    num: any;
    den: any;
};
export function getRelevant(data: any): any;
export function getStringOption(data: any, options: any): any;
