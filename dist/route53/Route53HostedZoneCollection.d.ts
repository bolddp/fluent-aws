import { Route53HostedZone } from './Route53HostedZone';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { HostedZone } from '@aws-sdk/client-route-53';
export declare class Route53HostedZoneCollection extends ApiNodeCollection<Route53HostedZone, HostedZone> {
    apiNodeFromAwsData(awsData: HostedZone): Route53HostedZone;
    apiNodeFromId(id: string): Route53HostedZone;
    load(): Promise<HostedZone[]>;
}
