import { ApiNode } from '../node/ApiNode';
import { KmsKey } from './KmsKey';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class KmsAlias extends ApiNode {
  aliasName: string;
  kmsKeyInstance: KmsKey;

  constructor(parent: ApiNode, aliasName: string) {
    super(parent);
    this.aliasName = aliasName;
  }

  key(): KmsKey {
    if (!this.kmsKeyInstance) {
      this.kmsKeyInstance = ApiNodeFactory.kmsKey(this, undefined);
      // We add a promise that will lazy loads the correct id of the key
      this.promiseChain.add(async () => {
        const aliases = await AwsApi.kms(this.config()).listAliases();
        const alias = aliases.find(x => x.AliasName == this.aliasName);
        if (!alias) {
          throw new Error(`Alias not found: ${this.aliasName}`);
        }
        if (!alias.TargetKeyId) {
          throw new Error(`Alias does not reference any key: ${this.aliasName}`);
        }
        this.kmsKeyInstance.id = alias.TargetKeyId;
      });
    }
    return this.kmsKeyInstance;
  }
}