import { AutoScalingGroup as AwsAutoScalingGroup } from '@aws-sdk/client-auto-scaling';
import { ApiNode } from '../node/ApiNode';
import { Ec2InstanceCollection } from '../ec2/Ec2InstanceCollection';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
/**
 * Representation of an AWS Autoscaling group.
 */
export declare class AutoScalingGroup extends AwsDataApiNode<AwsAutoScalingGroup> {
    name: string;
    ec2InstanceCollection: Ec2InstanceCollection;
    constructor(parent: ApiNode, name: string);
    loadAwsData(): Promise<AwsAutoScalingGroup>;
    ec2Instances(): Ec2InstanceCollection;
    updateSize(minSize: number, maxSize: number, desiredSize: number): Promise<void>;
    setInstanceProtection(instanceIds: string[], value: boolean): Promise<void>;
}
