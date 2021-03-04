import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AwsApi } from '../awsapi/AwsApi';

export class KmsKey extends AwsDataApiNode<AWS.KMS.KeyMetadata> {
  id: string;

  constructor(parent: ApiNode, id: string) {
    super(parent);
    this.id = id;
  }

  loadAwsData() {
    return AwsApi.kms(this.config()).describeKey(this.id);
  }
}