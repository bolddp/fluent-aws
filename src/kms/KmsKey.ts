import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { KeyMetadata } from '@aws-sdk/client-kms';

export class KmsKey extends AwsDataApiNode<KeyMetadata> {
  id: string;

  constructor(parent: ApiNode, id: string) {
    super(parent);
    this.id = id;
  }

  loadAwsData() {
    return AwsApi.kms(this.config()).describeKey(this.id);
  }
}
