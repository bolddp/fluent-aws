import { ApiNode } from '../node/ApiNode';
import { KmsKeyCollection } from './KmsKeyCollection';
import { KmsKey } from './KmsKey';
import { KmsAliasCollection } from './KmsAliasCollection';
import { KmsAlias } from './KmsAlias';
export declare class Kms extends ApiNode {
    keyCollection: KmsKeyCollection;
    aliasCollection: KmsAliasCollection;
    constructor(parent: ApiNode);
    aliases(): KmsAliasCollection;
    alias(id: string): KmsAlias;
    keys(): KmsKeyCollection;
    key(keyId: string): KmsKey;
}
