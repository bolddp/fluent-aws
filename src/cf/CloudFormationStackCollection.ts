import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CloudFormationStack } from './CloudFormationStack';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { Stack } from '@aws-sdk/client-cloudformation';

export class CloudFormationStackCollection extends ApiNodeCollection<
  CloudFormationStack,
  Stack
> {
  apiNodeFromAwsData(data: Stack) {
    return ApiNodeFactory.cloudFormationStack(this, data.StackName);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.cloudFormationStack(this, id);
  }

  load(): Promise<Stack[]> {
    return AwsApi.cloudFormation(this.config()).describeStacks();
  }
}
