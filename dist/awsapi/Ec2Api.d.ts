import { AccountAttribute, Instance } from '@aws-sdk/client-ec2';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class Ec2Api {
    private config;
    private ec2;
    constructor(config: FluentAwsConfig);
    describeInstances(instanceIds?: string[]): Promise<Instance[]>;
    /**
     * Loads AWS information about one EC2 instance. If the instance is not found,
     * an error is thrown.
     */
    describeInstance(instanceId: string): Promise<Instance>;
    describeAccountAttributes(): Promise<AccountAttribute[]>;
}
