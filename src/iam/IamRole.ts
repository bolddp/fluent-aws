import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { Role } from '@aws-sdk/client-iam';

export class IamRole extends AwsDataApiNode<Role> {
  name: string;

  constructor(parent: ApiNode, name: string) {
    super(parent);
    this.name = name;
  }

  loadAwsData() {
    return AwsApi.iam(this.config()).getRole(this.name);
  }
}
