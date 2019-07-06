import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { ApiNode } from "../node/ApiNode";
import { AwsApi } from "../awsapi/AwsApi";

export class IamRole extends AwsDataApiNode<AWS.IAM.Role> {
  name: string;

  constructor(parent: ApiNode, name: string, awsData?: AWS.IAM.Role) {
    super(parent, awsData);
  }

  loadAwsData() {
    return AwsApi.iam.getRole(this.name);
  }

  async resolve() {
    await this.resolveNode();
    return this;
  }
}