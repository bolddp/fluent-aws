import * as AWS from 'aws-sdk';
import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { IamRole } from '../iam/IamRole';
export declare class Ec2Instance extends AwsDataApiNode<AWS.EC2.Instance> {
    instanceId: string;
    iamRoleInstance: IamRole;
    constructor(parent: ApiNode, instanceId: string);
    loadAwsData(): Promise<AWS.EC2.Instance>;
    iamRole(): IamRole;
}
