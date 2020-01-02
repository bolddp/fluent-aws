import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { AutoScalingGroup } from './AutoScalingGroup';
export declare class AutoScalingGroupCollection extends ApiNodeCollection<AutoScalingGroup, AWS.AutoScaling.AutoScalingGroup> {
    apiNodeFromAwsData(awsData: AWS.AutoScaling.AutoScalingGroup): AutoScalingGroup;
    apiNodeFromId(id: string): AutoScalingGroup;
    load(): Promise<AWS.AutoScaling.AutoScalingGroup[]>;
}
