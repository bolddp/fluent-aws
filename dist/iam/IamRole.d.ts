import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { ApiNode } from "../node/ApiNode";
export declare class IamRole extends AwsDataApiNode<AWS.IAM.Role> {
    name: string;
    constructor(parent: ApiNode, name: string);
    loadAwsData(): Promise<import("aws-sdk/clients/iam").Role>;
}
