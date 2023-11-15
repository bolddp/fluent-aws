import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { IamRole } from '../iam/IamRole';
import { Instance } from '@aws-sdk/client-ec2';
export declare class Ec2Instance extends AwsDataApiNode<Instance> {
    instanceId: string;
    iamRoleInstance: IamRole;
    constructor(parent: ApiNode, instanceId: string);
    loadAwsData(): Promise<Instance>;
    iamRole(): IamRole;
}
