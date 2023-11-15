import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsAlias } from './KmsAlias';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { AliasListEntry } from '@aws-sdk/client-kms';

export class KmsAliasCollection extends ApiNodeCollection<
  KmsAlias,
  AliasListEntry
> {
  public async load(): Promise<AliasListEntry[]> {
    return AwsApi.kms(this.config()).listAliases();
  }

  public apiNodeFromAwsData(data: AliasListEntry): KmsAlias {
    return ApiNodeFactory.kmsAlias(this, data.AliasName);
  }

  public apiNodeFromId(id: string): KmsAlias {
    return ApiNodeFactory.kmsAlias(this, id);
  }
}
