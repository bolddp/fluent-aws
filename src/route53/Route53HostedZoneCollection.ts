import { AwsApi } from './../awsapi/AwsApi';
import { ApiNodeFactory } from './../node/ApiNodeFactory';
import { Route53HostedZone } from './Route53HostedZone';
import { ApiNodeCollection } from '../node/ApiNodeCollection';

export class Route53HostedZoneCollection extends ApiNodeCollection<Route53HostedZone, AWS.Route53.HostedZone> {
  apiNodeFromAwsData(awsData: AWS.Route53.HostedZone): Route53HostedZone {
    return ApiNodeFactory.route53HostedZone(this, awsData.Id, awsData);
  }

  apiNodeFromId(id: string): Route53HostedZone {
    return ApiNodeFactory.route53HostedZone(this, id);
  }

  load(): Promise<AWS.Route53.HostedZone[]> {
    return AwsApi.route53.listHostedZones();
  }
}