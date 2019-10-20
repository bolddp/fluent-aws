import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { KmsKeyCollection } from './KmsKeyCollection';
import { KmsKey } from './KmsKey';
import { KmsAliasCollection } from './KmsAliasCollection';
import { KmsAlias } from './KmsAlias';

export class Kms extends ApiNode {
  keyCollection: KmsKeyCollection;
  aliasCollection: KmsAliasCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.keyCollection = ApiNodeFactory.kmsKeyCollection(this);
    this.aliasCollection = ApiNodeFactory.kmsAliasCollection(this);
  }

  aliases(): KmsAliasCollection {
    return this.aliasCollection;
  }

  alias(id: string): KmsAlias {
    return this.aliasCollection.getById(id);
  }

  keys(): KmsKeyCollection {
    return this.keyCollection;
  }

  key(keyId: string): KmsKey {
    return this.keyCollection.getById(keyId);
  }
}