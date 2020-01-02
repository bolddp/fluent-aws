import * as AWS from 'aws-sdk';
import { ApiNode } from "../node/ApiNode";
import { Ec2InstanceCollection } from '../ec2/Ec2InstanceCollection';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
/**
 * Representation of an AWS Autoscaling group.
 */
export declare class AutoScalingGroup extends AwsDataApiNode<AWS.AutoScaling.AutoScalingGroup> {
    name: string;
    ec2InstanceCollection: Ec2InstanceCollection;
    constructor(parent: ApiNode, name: string);
    loadAwsData(): Promise<AWS.AutoScaling.AutoScalingGroup>;
    ec2Instances(): Ec2InstanceCollection;
    updateSize(minSize: number, maxSize: number, desiredSize: number): Promise<void>;
    setInstanceProtection(instanceIds: string[], value: boolean): Promise<void>;
}
