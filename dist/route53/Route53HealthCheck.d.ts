import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { ApiNode } from "../node/ApiNode";
export declare class Route53HealthCheck extends AwsDataApiNode<AWS.Route53.HealthCheck> {
    id: string;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<import("aws-sdk/clients/route53").HealthCheck>;
    delete(): Promise<void>;
}
