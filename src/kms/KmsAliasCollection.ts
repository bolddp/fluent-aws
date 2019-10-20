import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsAlias } from './KmsAlias';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class KmsAliasCollection extends ApiNodeCollection<KmsAlias, AWS.KMS.AliasListEntry> {
  public async load(): Promise<AWS.KMS.AliasListEntry[]> {
    return AwsApi.kms.listAliases();
  }

  public apiNodeFromAwsData(data: AWS.KMS.AliasListEntry): KmsAlias {
    return ApiNodeFactory.kmsAlias(this, data.AliasName);
  }

  public apiNodeFromId(id: string): KmsAlias {
    return ApiNodeFactory.kmsAlias(this, id);
  }
}
