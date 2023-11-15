import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { Role } from '@aws-sdk/client-iam';
export declare class IamRole extends AwsDataApiNode<Role> {
    name: string;
    constructor(parent: ApiNode, name: string);
    loadAwsData(): Promise<Role>;
}
