import { ApiNode } from '../node/ApiNode';
export declare class SqsQueue extends ApiNode {
    private url;
    constructor(parent: ApiNode, url: string);
    sendJson(obj: any): Promise<void>;
    sendJsonBatch(objs: any[]): Promise<void>;
}
