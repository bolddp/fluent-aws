import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class Ec2Api {
    config: FluentAwsConfig;
    ec2: () => AWS.EC2;
    constructor(config: FluentAwsConfig);
    describeInstances(instanceIds?: string[]): Promise<AWS.EC2.Instance[]>;
    /**
     * Loads AWS information about one EC2 instance. If the instance is not found,
     * an error is thrown.
     */
    describeInstance(instanceId: string): Promise<AWS.EC2.Instance>;
    describeAccountAttributes(): Promise<AWS.EC2.AccountAttributeList>;
}
