import { ApiNode } from "../node/ApiNode";
import { AwsDataApiNode } from "../node/AwsDataApiNode";
export declare class EcsService extends AwsDataApiNode<AWS.ECS.Service> {
    clusterId: string;
    name: string;
    constructor(parent: ApiNode, clusterId: string, name: string);
    loadAwsData(): Promise<import("aws-sdk/clients/ecs").Service>;
}
