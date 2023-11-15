import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsKey } from './KmsKey';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { KeyMetadata } from '@aws-sdk/client-kms';

export class KmsKeyCollection extends ApiNodeCollection<KmsKey, KeyMetadata> {
  public async load(): Promise<KeyMetadata[]> {
    const allKeys = await AwsApi.kms(this.config()).listKeys();
    let result: KeyMetadata[] = [];
    for (const key of allKeys) {
      const metaData = await AwsApi.kms(this.config()).describeKey(key.KeyId);
      result.push(metaData);
    }
    return result;
  }

  public apiNodeFromAwsData(data: KeyMetadata): KmsKey {
    return ApiNodeFactory.kmsKey(this, data.KeyId);
  }

  public apiNodeFromId(id: string): KmsKey {
    return ApiNodeFactory.kmsKey(this, id);
  }
}
