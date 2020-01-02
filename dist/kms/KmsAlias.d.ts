import { ApiNode } from '../node/ApiNode';
import { KmsKey } from './KmsKey';
export declare class KmsAlias extends ApiNode {
    aliasName: string;
    kmsKeyInstance: KmsKey;
    constructor(parent: ApiNode, aliasName: string);
    key(): KmsKey;
}
