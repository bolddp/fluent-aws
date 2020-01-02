import { Route53RecordSetCollection } from './Route53RecordSetCollection';
import { ApiNode } from './../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
export declare class Route53HostedZone extends AwsDataApiNode<AWS.Route53.HostedZone> {
    id: string;
    recordSetCollection: Route53RecordSetCollection;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<import("aws-sdk/clients/route53").HostedZone>;
    recordSets(): Route53RecordSetCollection;
}
