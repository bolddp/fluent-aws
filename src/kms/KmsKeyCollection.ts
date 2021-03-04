import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsKey } from './KmsKey';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class KmsKeyCollection extends ApiNodeCollection<KmsKey, AWS.KMS.KeyMetadata> {
  public async load(): Promise<AWS.KMS.KeyMetadata[]> {
    const allKeys = await AwsApi.kms(this.config()).listKeys();
    let result: AWS.KMS.KeyMetadata[] = [];
    for (const key of allKeys) {
      const metaData = await AwsApi.kms(this.config()).describeKey(key.KeyId);
      result.push(metaData);
    }
    return result;
  }

  public apiNodeFromAwsData(data: AWS.KMS.KeyMetadata): KmsKey {
    return ApiNodeFactory.kmsKey(this, data.KeyId);
  }

  public apiNodeFromId(id: string): KmsKey {
    return ApiNodeFactory.kmsKey(this, id);
  }
}
