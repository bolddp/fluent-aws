import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { AutoScalingGroup } from './AutoScalingGroup';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class AutoScalingGroupCollection extends ApiNodeCollection<AutoScalingGroup, AWS.AutoScaling.AutoScalingGroup> {
  apiNodeFromAwsData(awsData: AWS.AutoScaling.AutoScalingGroup): AutoScalingGroup {
    return ApiNodeFactory.autoScalingGroup(this, awsData.AutoScalingGroupName);
  }

  apiNodeFromId(id: string): AutoScalingGroup {
    return ApiNodeFactory.autoScalingGroup(this, id);
  }

  async load() : Promise<AWS.AutoScaling.AutoScalingGroup[]> {
    return await AwsApi.autoScaling.describeGroups();
  }
}