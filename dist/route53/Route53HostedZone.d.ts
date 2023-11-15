import { Route53RecordSetCollection } from './Route53RecordSetCollection';
import { ApiNode } from './../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { HostedZone } from '@aws-sdk/client-route-53';
export declare class Route53HostedZone extends AwsDataApiNode<HostedZone> {
    id: string;
    recordSetCollection: Route53RecordSetCollection;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<HostedZone>;
    recordSets(): Route53RecordSetCollection;
}
