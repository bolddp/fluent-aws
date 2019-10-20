import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CloudFormationStack } from './CloudFormationStack';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class CloudFormationStackCollection extends ApiNodeCollection<CloudFormationStack, AWS.CloudFormation.Stack> {
  apiNodeFromAwsData(data: AWS.CloudFormation.Stack) {
    return ApiNodeFactory.cloudFormationStack(this, data.StackName);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.cloudFormationStack(this, id);
  }

  load(): Promise<AWS.CloudFormation.Stack[]> {
    return AwsApi.cloudFormation.describeStacks();
  }
}