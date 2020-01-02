import * as AWS from 'aws-sdk';
export declare class Ec2Api {
    ec2: () => AWS.EC2;
    describeInstances(instanceIds?: string[]): Promise<AWS.EC2.Instance[]>;
    /**
     * Loads AWS information about one EC2 instance. If the instance is not found,
     * an error is thrown.
     */
    describeInstance(instanceId: string): Promise<AWS.EC2.Instance>;
    describeAccountAttributes(): Promise<AWS.EC2.AccountAttributeList>;
}
