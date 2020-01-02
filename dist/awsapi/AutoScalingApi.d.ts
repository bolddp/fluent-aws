import * as AWS from 'aws-sdk';
export declare class AutoScalingApi {
    autoScaling: () => AWS.AutoScaling;
    describeGroups(idOrArns?: string[]): Promise<AWS.AutoScaling.AutoScalingGroup[]>;
    describeGroup(idOrArn: string): Promise<AWS.AutoScaling.AutoScalingGroup>;
    update(updateData: AWS.AutoScaling.UpdateAutoScalingGroupType): Promise<void>;
    setInstanceProtection(idOrArn: string, instanceIds: string[], value: boolean): Promise<void>;
}
