import { AutoScalingGroup, UpdateAutoScalingGroupType } from '@aws-sdk/client-auto-scaling';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class AutoScalingApi {
    private config;
    private autoScaling;
    constructor(config: FluentAwsConfig);
    describeGroups(idOrArns?: string[]): Promise<AutoScalingGroup[]>;
    describeGroup(idOrArn: string): Promise<AutoScalingGroup>;
    update(updateData: UpdateAutoScalingGroupType): Promise<void>;
    setInstanceProtection(idOrArn: string, instanceIds: string[], value: boolean): Promise<void>;
}
