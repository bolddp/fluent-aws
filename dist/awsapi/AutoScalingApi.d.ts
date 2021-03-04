import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class AutoScalingApi {
    config: FluentAwsConfig;
    autoScaling: () => AWS.AutoScaling;
    constructor(config: FluentAwsConfig);
    describeGroups(idOrArns?: string[]): Promise<AWS.AutoScaling.AutoScalingGroup[]>;
    describeGroup(idOrArn: string): Promise<AWS.AutoScaling.AutoScalingGroup>;
    update(updateData: AWS.AutoScaling.UpdateAutoScalingGroupType): Promise<void>;
    setInstanceProtection(idOrArn: string, instanceIds: string[], value: boolean): Promise<void>;
}
