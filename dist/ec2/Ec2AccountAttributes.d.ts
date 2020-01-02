import * as AWS from 'aws-sdk';
export interface Ec2AccountAttributes {
    maxInstances: number;
    defaultVpc: string;
}
export declare class Ec2AccountAttributesMapper {
    static fromAwsData(data: AWS.EC2.AccountAttribute[]): Ec2AccountAttributes;
}
