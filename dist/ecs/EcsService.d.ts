import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { Service } from '@aws-sdk/client-ecs';
export declare class EcsService extends AwsDataApiNode<Service> {
    clusterId: string;
    name: string;
    constructor(parent: ApiNode, clusterId: string, name: string);
    loadAwsData(): Promise<Service>;
}
