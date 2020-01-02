import { Route53HostedZone } from './Route53HostedZone';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
export declare class Route53HostedZoneCollection extends ApiNodeCollection<Route53HostedZone, AWS.Route53.HostedZone> {
    apiNodeFromAwsData(awsData: AWS.Route53.HostedZone): Route53HostedZone;
    apiNodeFromId(id: string): Route53HostedZone;
    load(): Promise<AWS.Route53.HostedZone[]>;
}
