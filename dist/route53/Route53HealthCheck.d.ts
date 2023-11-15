import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { HealthCheck } from '@aws-sdk/client-route-53';
export declare class Route53HealthCheck extends AwsDataApiNode<HealthCheck> {
    id: string;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<HealthCheck>;
    delete(): Promise<void>;
}
