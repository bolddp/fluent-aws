import { AutoScalingGroup as AwsAutoScalingGroup } from '@aws-sdk/client-auto-scaling';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { AutoScalingGroup } from './AutoScalingGroup';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class AutoScalingGroupCollection extends ApiNodeCollection<
  AutoScalingGroup,
  AwsAutoScalingGroup
> {
  apiNodeFromAwsData(awsData: AwsAutoScalingGroup): AutoScalingGroup {
    return ApiNodeFactory.autoScalingGroup(this, awsData.AutoScalingGroupName);
  }

  apiNodeFromId(id: string): AutoScalingGroup {
    return ApiNodeFactory.autoScalingGroup(this, id);
  }

  async load(): Promise<AwsAutoScalingGroup[]> {
    return await AwsApi.autoScaling(this.config()).describeGroups();
  }
}
