import { AutoScalingGroup as AwsAutoScalingGroup } from '@aws-sdk/client-auto-scaling';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { AutoScalingGroup } from './AutoScalingGroup';
export declare class AutoScalingGroupCollection extends ApiNodeCollection<AutoScalingGroup, AwsAutoScalingGroup> {
    apiNodeFromAwsData(awsData: AwsAutoScalingGroup): AutoScalingGroup;
    apiNodeFromId(id: string): AutoScalingGroup;
    load(): Promise<AwsAutoScalingGroup[]>;
}
