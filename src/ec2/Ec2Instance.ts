import * as AWS from 'aws-sdk';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { IamRole } from '../iam/IamRole';
import { ApiNodeFactory } from '../node/ApiNodeFactory';

export class Ec2Instance extends AwsDataApiNode<AWS.EC2.Instance> {
  instanceId: string;
  iamRoleInstance: IamRole;

  constructor(parent: ApiNode, instanceId: string) {
    super(parent);
    this.instanceId = instanceId;
  }

  loadAwsData() {
    return AwsApi.ec2.describeInstance(this.instanceId);
  }

  iamRole(): IamRole {
    if (!this.iamRoleInstance) {
      this.iamRoleInstance = ApiNodeFactory.iamRole(this, undefined);
      // Add a promise that feeds the correct role name to the IamRole instance
      this.promiseChain.add(async () => {
        const awsData = await this.loadAwsData();
        if (!awsData.IamInstanceProfile) {
          throw new Error('EC2 instance has no IAM role');
        }
        const instanceProfile = await AwsApi.iam.getInstanceProfile(awsData.IamInstanceProfile.Arn.split('/')[1]);
        if (instanceProfile.Roles.length == 0) {
          throw new Error(`No role in EC2 instance profile (profile ARN: ${awsData.IamInstanceProfile.Arn})`);
        }
        this.iamRoleInstance.name = instanceProfile.Roles[0].RoleName;
      });
    }
    return this.iamRoleInstance;
  }
}