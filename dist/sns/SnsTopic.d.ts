import { ApiNode } from '../node/ApiNode';
export declare class SnsTopic extends ApiNode {
    arn: string;
    constructor(parent: ApiNode, arn: string);
    publishJson(obj: any): Promise<void>;
}
